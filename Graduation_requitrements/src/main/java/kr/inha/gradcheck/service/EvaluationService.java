package kr.inha.gradcheck.service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.LinkedHashMap;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Optional;
import java.util.Set;

import kr.inha.gradcheck.data.DataStore;
import kr.inha.gradcheck.model.Certification;
import kr.inha.gradcheck.model.Course;
import kr.inha.gradcheck.model.CourseInfo;
import kr.inha.gradcheck.model.Curriculum;
import kr.inha.gradcheck.model.Requirements;
import kr.inha.gradcheck.service.CourseClassifier.Classified;

/**
 * 졸업요건 판정 (POST /api/evaluate). 대시보드의 여의주 4개(총학점, 전공필수, 교양필수, 졸업인증)를 계산한다.
 * 응답 모양은 프론트 js/mock.js 의 evaluateState() 와 같다. 그래서 api.js 의 USE_MOCK 을 false 로 바꿔도 화면 코드는 그대로 쓴다.
 *
 * <p>
 * 규칙
 * <ul>
 * <li>총학점: 담은 과목 학점 합 &gt;= 졸업학점(130)</li>
 * <li>전공필수: 전공필수 + 전공기초 과목을 모두 이수</li>
 * <li>교양필수: 영역(중점·기초·핵심·SW·AI·창의)마다 지정 과목을 모두 이수하고, 택1 목록·핵심교양 영역은 하나씩 이수.
 * 같은 택1 목록이나 같은 핵심교양 영역에서 두 과목을 들으면 첫 과목만 인정</li>
 * <li>졸업인증: certs 에 인정 방법(TOEIC 등) 중 하나라도 있으면 충족</li>
 * <li>재수강, F 학점은 다루지 않는다. 같은 학수번호를 두 번 보내면 한 번만 센다</li>
 * </ul>
 */
public final class EvaluationService {

	private static final int CARD_COUNT = 4;

	private EvaluationService() {
	}

	/** 요청의 과목 한 줄. category 는 학생이 과목 입력 창에서 고른 구분 (없어도 됨). */
	public record TakenCourse(String code, String category) {
	}

	// ---- 응답 (필드 이름은 mock.js 와 같게) ----

	public record Result(Map<String, Object> curriculum, Summary summary, List<Object> cards,
			List<String> unknownCourses) {
	}

	public record Summary(int satisfiedCount, int totalCount, int percent) {
	}

	public record Breakdown(int major, int general, int free) {
	}

	public record TotalCard(String key, String name, boolean satisfied, int earned, int required,
			Breakdown breakdown) {
	}

	public record MajorCard(String key, String name, boolean satisfied, int earnedCourses, int requiredCourses,
			int earned, int required, List<RemainingCourse> remaining) {
	}

	/** grade: 권장 학년 (대시보드의 "n학년" 칩). */
	public record RemainingCourse(String code, String name, int credit, Integer grade) {
	}

	public record GeneralCard(String key, String name, boolean satisfied, int earned, int required,
			List<AreaResult> areas) {
	}

	public record AreaResult(String key, String name, String desc, int earned, int required, boolean satisfied) {
	}

	public record CertCard(String key, String name, boolean satisfied, List<CertOption> options, String rule) {
	}

	public record CertOption(String id, String label) {
	}

	// ---- 판정 ----

	/**
	 * @param courses 이수한 과목 (학수번호 + 학생이 고른 구분)
	 * @param certs   취득한 졸업인증 id (certOptions 의 id)
	 */
	public static Result evaluate(DataStore store, Curriculum curriculum, List<TakenCourse> courses,
			List<String> certs) {
		Requirements r = curriculum.requirements();

		// 1) 과목 분류 (같은 학수번호는 처음 것만)
		List<Classified> taken = new ArrayList<>();
		List<String> unknown = new ArrayList<>();
		Set<String> seen = new HashSet<>();
		for (TakenCourse t : courses) {
			if (t == null || t.code() == null || t.code().isBlank()) {
				continue;
			}
			String code = t.code().trim().toUpperCase(Locale.ROOT);
			if (!seen.add(code)) {
				continue;
			}
			Optional<Classified> c = CourseClassifier.classify(store, curriculum, code, t.category());
			if (c.isPresent()) {
				taken.add(c.get());
			} else {
				unknown.add(code);
			}
		}

		TotalCard total = totalCard(r, taken);
		MajorCard major = majorCard(store, curriculum, taken);
		GeneralCard general = generalCard(store, curriculum, taken);
		CertCard cert = certCard(store, curriculum, certs);

		List<Object> cards = List.of(total, major, general, cert);
		int satisfied = (total.satisfied() ? 1 : 0) + (major.satisfied() ? 1 : 0) + (general.satisfied() ? 1 : 0)
				+ (cert.satisfied() ? 1 : 0);
		Summary summary = new Summary(satisfied, CARD_COUNT, Math.round(satisfied * 100f / CARD_COUNT));

		Map<String, Object> cur = new LinkedHashMap<>();
		cur.put("id", curriculum.id());
		cur.put("departmentCode", curriculum.departmentCode());
		cur.put("department", curriculum.department());
		cur.put("year", curriculum.year());
		return new Result(cur, summary, cards, unknown);
	}

	/** 총학점. breakdown 은 mock.js 와 같이 전공필수 / 교양필수 / 그 밖(전공선택·교양선택·일반선택). */
	private static TotalCard totalCard(Requirements r, List<Classified> taken) {
		int sum = 0;
		int major = 0;
		int general = 0;
		int free = 0;
		for (Classified c : taken) {
			sum += c.credits();
			switch (c.category()) {
				case CourseClassifier.MAJOR_REQ -> major += c.credits();
				case CourseClassifier.GEN_REQ -> general += c.credits();
				default -> free += c.credits();
			}
		}
		return new TotalCard("total", "총학점", sum >= r.totalCredits(), sum, r.totalCredits(),
				new Breakdown(major, general, free));
	}

	/** 전공필수 + 전공기초. 남은 과목은 교과과정표 순서. */
	private static MajorCard majorCard(DataStore store, Curriculum curriculum, List<Classified> taken) {
		Set<String> required = CourseClassifier.majorRequiredCodes(curriculum.requirements());
		Set<String> takenCodes = new HashSet<>();
		for (Classified c : taken) {
			if (CourseClassifier.MAJOR_REQ.equals(c.category())) {
				takenCodes.add(c.code());
			}
		}

		int earnedCourses = 0;
		int earned = 0;
		int requiredCredits = 0;
		List<RemainingCourse> remaining = new ArrayList<>();
		for (String code : required) {
			Optional<CourseInfo> info = store.findCourse(curriculum.id(), code);
			int credit = info.map(i -> i.credits().intValue()).orElse(0);
			requiredCredits += credit;
			if (takenCodes.contains(code)) {
				earnedCourses++;
				earned += credit;
			} else {
				String name = info.map(CourseInfo::name).orElse(code);
				Course course = info.map(CourseInfo::course).orElse(null);
				remaining.add(new RemainingCourse(code, name, credit, CourseClassifier.grade(course, code)));
			}
		}
		return new MajorCard("major", "전공필수", earnedCourses >= required.size(), earnedCourses, required.size(),
				earned, requiredCredits, remaining);
	}

	/** 교양필수 영역별 판정. */
	private static GeneralCard generalCard(DataStore store, Curriculum curriculum, List<Classified> taken) {
		Requirements.GeneralEducation ge = curriculum.requirements().generalEducationRequired();
		List<AreaResult> areas = new ArrayList<>();
		int earnedSum = 0;
		boolean allSatisfied = true;

		for (Requirements.Group g : ge.groups()) {
			// 이 영역으로 인정된 과목 (slot 이 같으면 첫 과목만)
			Map<String, Classified> bySlot = new LinkedHashMap<>();
			for (Classified c : taken) {
				if (CourseClassifier.GEN_REQ.equals(c.category()) && g.id().equals(c.area())) {
					bySlot.putIfAbsent(c.slot() == null ? "code:" + c.code() : c.slot(), c);
				}
			}
			int earned = bySlot.values().stream().mapToInt(Classified::credits).sum();

			boolean ok = earned >= g.credits();
			if (g.allOf() != null) {
				for (String code : g.allOf()) {
					ok &= bySlot.containsKey("code:" + code);
				}
			}
			if (g.oneOf() != null) {
				for (int i = 0; i < g.oneOf().size(); i++) {
					ok &= bySlot.containsKey(g.id() + ":oneOf" + i);
				}
			}
			if (g.areas() != null) {
				for (Requirements.Area a : g.areas()) {
					ok &= bySlot.containsKey(g.id() + ":" + a.area());
				}
			}

			areas.add(new AreaResult(g.id(), g.name(), describe(store, curriculum, g), earned, g.credits(), ok));
			earnedSum += earned;
			allSatisfied &= ok;
		}
		return new GeneralCard("general", "교양필수", allSatisfied, earnedSum, ge.credits(), areas);
	}

	/** 영역 설명 한 줄 (대시보드 교양필수 카드의 회색 글씨). */
	private static String describe(DataStore store, Curriculum curriculum, Requirements.Group g) {
		boolean hasAllOf = g.allOf() != null && !g.allOf().isEmpty();
		boolean hasOneOf = g.oneOf() != null && !g.oneOf().isEmpty();
		if (g.areas() != null && !g.areas().isEmpty()) {
			List<String> nums = new ArrayList<>();
			List<String> fixed = new ArrayList<>();
			for (Requirements.Area a : g.areas()) {
				nums.add(String.valueOf(a.area()));
				if (a.courses() != null && !a.courses().isEmpty()) {
					fixed.add(a.area() + "영역은 " + String.join("·", a.courses()) + " 지정");
				}
			}
			return String.join("·", nums) + "영역에서 각 1과목씩" + (fixed.isEmpty() ? "" : " (" + String.join(", ", fixed) + ")")
					+ " · 같은 영역 2과목은 1과목만 인정";
		}
		if (hasAllOf && hasOneOf) {
			List<String> choices = g.oneOf().stream().map(Requirements.Choice::name).toList();
			return "공통 지정 과목 전체 + " + String.join(", ", choices) + " 중 택1";
		}
		if (hasAllOf) {
			List<String> names = new ArrayList<>();
			for (String code : g.allOf()) {
				names.add(store.findCourse(curriculum.id(), code).map(CourseInfo::name).orElse(code));
			}
			return "공통 지정 과목: " + String.join(", ", names);
		}
		if (hasOneOf) {
			return switch (g.id()) {
				case "swai" -> "SW·AI 트랙 지정 과목 중 택1";
				case "creative" -> "창의 영역 지정 과목 중 택1";
				default -> g.name() + " 지정 과목 중 택1";
			};
		}
		return g.note() == null ? "" : g.note();
	}

	/** 영어졸업인증. 학과·입학연도에 맞는 기준 점수와 대체 방법을 선택지로 준다. */
	private static CertCard certCard(DataStore store, Curriculum curriculum, List<String> certs) {
		List<CertOption> options = certOptions(store.certification(), curriculum);
		Set<String> ids = new LinkedHashSet<>();
		options.forEach(o -> ids.add(o.id()));
		boolean satisfied = certs.stream().anyMatch(ids::contains);
		return new CertCard("cert", "졸업인증", satisfied, options, "one-of");
	}

	/**
	 * 졸업인증 선택지. id 는 프론트 curriculum-data.js 의 certOptions 와 같다 (toeic, toeic_speaking, ..., course,
	 * specialLecture).
	 */
	public static List<CertOption> certOptions(Certification certification, Curriculum curriculum) {
		List<CertOption> options = new ArrayList<>();
		if (certification == null || certification.englishGraduation() == null) {
			return options;
		}
		Certification.EnglishGraduation eg = certification.englishGraduation();
		for (Certification.Criteria c : eg.criteria()) {
			if (c.appliesTo(curriculum.departmentCode(), curriculum.year())) {
				c.scores().forEach((exam, score) -> options.add(new CertOption(examId(exam),
						exam + " " + score + (score.matches("\\d+") ? "점" : "") + " 이상")));
				break;
			}
		}
		for (Certification.Alternative a : eg.alternatives()) {
			options.add(new CertOption(a.id(), a.name()));
		}
		return options;
	}

	/** "TOEIC Speaking" → "toeic_speaking". */
	private static String examId(String exam) {
		return exam.trim().toLowerCase(Locale.ROOT).replaceAll("[^a-z0-9]+", "_");
	}
}
