package kr.inha.gradcheck.data;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Comparator;
import java.util.HashSet;
import java.util.LinkedHashMap;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import jakarta.servlet.ServletContext;
import kr.inha.gradcheck.model.Certification;
import kr.inha.gradcheck.model.Course;
import kr.inha.gradcheck.model.CourseInfo;
import kr.inha.gradcheck.model.Curriculum;
import kr.inha.gradcheck.model.DataIndex;
import kr.inha.gradcheck.model.GeneralEducationCourse;
import kr.inha.gradcheck.model.Timetable;

/**
 * 서버 메모리에 올린 데이터와 조회 메서드. DataLoader 가 서버 시작 때 한 번 만들고, 이후 읽기 전용.
 * 서블릿과 서비스(BE B)는 {@link #get(ServletContext)} 로 받아서 쓴다.
 */
public final class DataStore {

	/** 과목 검색 범위 (03-2 직접 검색 탭의 필터). */
	public enum Scope {
		/** 전체 */
		ALL,
		/** 우리 학과 교과과정 */
		OWN,
		/** 타과 전공 */
		OTHER,
		/** 교양 */
		GENERAL
	}

	private final DataIndex index;
	private final Map<String, Curriculum> curricula;
	private final List<GeneralEducationCourse> generalEducation;
	private final Certification certification;
	private final Map<String, Timetable> timetables;
	private final Timetable latestTimetable;
	private final Set<String> latestOfferedCodes;

	DataStore(DataIndex index, Map<String, Curriculum> curricula, List<GeneralEducationCourse> generalEducation,
			Certification certification, Map<String, Timetable> timetables) {
		this.index = index;
		this.curricula = Map.copyOf(curricula);
		this.generalEducation = List.copyOf(generalEducation);
		this.certification = certification;
		this.timetables = new LinkedHashMap<>(timetables);
		this.latestTimetable = timetables.values().stream().reduce((a, b) -> b).orElse(null);
		this.latestOfferedCodes = latestTimetable == null ? Set.of()
				: latestTimetable.sections().stream().map(Timetable.Section::code).collect(Collectors.toSet());
	}

	/**
	 * 서블릿에서 DataStore 를 꺼낸다.
	 *
	 * @throws DataUnavailableException 서버 시작 때 데이터를 읽지 못한 경우
	 */
	public static DataStore get(ServletContext ctx) {
		Object store = ctx.getAttribute(DataLoader.ATTR_STORE);
		if (store instanceof DataStore s) {
			return s;
		}
		Object error = ctx.getAttribute(DataLoader.ATTR_ERROR);
		throw new DataUnavailableException("졸업요건 데이터를 불러오지 못했습니다.",
				error instanceof Throwable t ? t : null);
	}

	// ---- 목록 ----

	/** 학과·입학연도 목록 (index.json 순서). */
	public List<DataIndex.Entry> curriculumEntries() {
		return index.curricula();
	}

	public Optional<Curriculum> curriculum(String id) {
		return Optional.ofNullable(id == null ? null : curricula.get(id));
	}

	/** 해당 교과과정 연도의 교양 과목 전체. */
	public List<GeneralEducationCourse> generalEducation(int year) {
		return generalEducation.stream().filter(g -> g.year() == year).toList();
	}

	public Certification certification() {
		return certification;
	}

	public Optional<Timetable> timetable(String term) {
		return Optional.ofNullable(term == null ? null : timetables.get(term));
	}

	/** 가장 최근 학기 시간표. 없으면 null. */
	public Timetable latestTimetable() {
		return latestTimetable;
	}

	public List<String> timetableTerms() {
		return List.copyOf(timetables.keySet());
	}

	/** 최신 시간표에 분반이 하나라도 있는지. */
	public boolean offeredThisTerm(String code) {
		return latestOfferedCodes.contains(code);
	}

	// ---- 과목 찾기 ----

	/**
	 * 학수번호로 과목을 찾는다. 찾는 순서: 내 학과 교과과정 → 교양 목록 → 다른 학과 교과과정 → 최신 시간표.
	 * 교양 영역 정보는 어디서 찾았든 함께 채운다.
	 *
	 * @param curriculumId 학생의 교과과정 (예: "ai_2025")
	 */
	public Optional<CourseInfo> findCourse(String curriculumId, String code) {
		Curriculum own = curricula.get(curriculumId);
		if (own == null || code == null) {
			return Optional.empty();
		}
		String c = code.trim().toUpperCase(Locale.ROOT);
		List<GeneralEducationCourse> ge = generalEducationEntries(own.year(), c);

		for (Course course : own.courses()) {
			if (course.code().equals(c)) {
				return Optional.of(new CourseInfo(c, course.name(), course.credits(), "curriculum", own.department(),
						course.type(), course, ge, offeredThisTerm(c)));
			}
		}
		if (!ge.isEmpty()) {
			GeneralEducationCourse g = ge.get(0);
			return Optional.of(new CourseInfo(c, g.name(), g.credits(), "generalEducation", geLabel(ge), "교양", null,
					ge, offeredThisTerm(c)));
		}
		for (Curriculum other : curricula.values()) {
			if (other.departmentCode().equals(own.departmentCode())) {
				continue;
			}
			for (Course course : other.courses()) {
				if (course.code().equals(c)) {
					return Optional.of(new CourseInfo(c, course.name(), course.credits(), "otherCurriculum",
							other.department(), "일반선택", null, List.of(), offeredThisTerm(c)));
				}
			}
		}
		if (latestTimetable != null) {
			for (Timetable.Section s : latestTimetable.sections()) {
				if (s.code().equals(c)) {
					return Optional.of(fromSection(own.year(), s));
				}
			}
		}
		return Optional.empty();
	}

	/**
	 * 과목명·학수번호·교수명으로 검색 (03-2 직접 검색). 공백과 대소문자는 무시한다.
	 * 결과가 없으면 빈 목록 (와이어프레임 예외 C).
	 */
	public List<CourseInfo> search(String curriculumId, String keyword, Scope scope, int limit) {
		Curriculum own = curricula.get(curriculumId);
		String q = normalize(keyword);
		if (own == null || q.isEmpty()) {
			return List.of();
		}
		Set<String> ownCodes = own.courses().stream().map(Course::code).collect(Collectors.toSet());

		// 과목명·학수번호로 후보 모으기
		Map<String, String> candidates = new LinkedHashMap<>(); // code -> name
		if (scope == Scope.ALL || scope == Scope.OWN) {
			own.courses().forEach(co -> candidates.putIfAbsent(co.code(), co.name()));
		}
		if (scope == Scope.ALL || scope == Scope.GENERAL) {
			generalEducation(own.year()).forEach(g -> candidates.putIfAbsent(g.code(), g.name()));
		}
		if (scope == Scope.ALL || scope == Scope.OTHER) {
			for (Curriculum other : curricula.values()) {
				if (!other.departmentCode().equals(own.departmentCode())) {
					other.courses().stream().filter(Course::isMajor)
							.forEach(co -> candidates.putIfAbsent(co.code(), co.name()));
				}
			}
		}
		Set<String> matched = new LinkedHashSet<>();
		candidates.forEach((code, name) -> {
			if (normalize(name).contains(q) || code.contains(q.toUpperCase(Locale.ROOT))) {
				matched.add(code);
			}
		});
		// 시간표: 교수명으로도 찾고, 교과과정·교양 목록에 없는 과목도 찾는다
		if (latestTimetable != null) {
			for (Timetable.Section s : latestTimetable.sections()) {
				boolean general = s.generalEducation() != null;
				boolean inScope = switch (scope) {
					case ALL -> true;
					case OWN -> ownCodes.contains(s.code());
					case GENERAL -> general;
					case OTHER -> !general && !ownCodes.contains(s.code());
				};
				if (inScope && (normalize(s.name()).contains(q) || s.code().contains(q.toUpperCase(Locale.ROOT))
						|| (s.professor() != null && normalize(s.professor()).contains(q)))) {
					matched.add(s.code());
				}
			}
		}

		List<CourseInfo> results = new ArrayList<>();
		for (String code : matched) {
			findCourse(curriculumId, code).ifPresent(results::add);
		}
		results.sort(Comparator.comparingInt((CourseInfo r) -> sourceOrder(r.source())).thenComparing(CourseInfo::name));
		return results.size() > limit ? List.copyOf(results.subList(0, limit)) : results;
	}

	// ---- 내부 ----

	private List<GeneralEducationCourse> generalEducationEntries(int year, String code) {
		return generalEducation.stream().filter(g -> g.year() == year && g.code().equals(code)).toList();
	}

	private CourseInfo fromSection(int year, Timetable.Section s) {
		Number credits = s.credits().stripTrailingZeros().scale() <= 0 ? s.credits().intValue() : s.credits();
		Timetable.GeneralEducationInfo g = s.generalEducation();
		if (g != null) {
			// 교양 목록에는 없지만 학수번호로 영역이 정해지는 과목 (예: GED1002 공학윤리와 토론)
			GeneralEducationCourse synthetic = new GeneralEducationCourse(year, g.category(), g.area(), g.areaName(),
					s.code(), s.name(), s.credits().intValue(), true, null, "교양 목록에 없음. 학수번호로 영역을 정함", null);
			return new CourseInfo(s.code(), s.name(), credits, "timetable", geLabel(List.of(synthetic)), "교양", null,
					List.of(synthetic), true);
		}
		String dept = s.listedIn().isEmpty() ? null : s.listedIn().get(0).split(" / ")[0];
		return new CourseInfo(s.code(), s.name(), credits, "timetable", dept, "일반선택", null, List.of(), true);
	}

	/** "교양 · 일반교양 4영역 · 창의" 형식. */
	private static String geLabel(Collection<GeneralEducationCourse> entries) {
		Set<String> parts = new LinkedHashSet<>();
		for (GeneralEducationCourse g : entries) {
			parts.add(g.area() == null ? g.category() : g.category() + " " + g.area() + "영역");
		}
		return "교양 · " + String.join(" · ", parts);
	}

	private static int sourceOrder(String source) {
		return switch (source) {
			case "curriculum" -> 0;
			case "generalEducation" -> 1;
			case "otherCurriculum" -> 2;
			default -> 3;
		};
	}

	private static String normalize(String s) {
		return s == null ? "" : s.replaceAll("\\s+", "").toLowerCase(Locale.ROOT);
	}

	String summary() {
		Set<Integer> years = new HashSet<>();
		generalEducation.forEach(g -> years.add(g.year()));
		return "교과과정 " + curricula.keySet() + ", 교양 " + generalEducation.size() + "건(" + years + "), 시간표 "
				+ timetables.keySet() + (latestTimetable == null ? "" : " " + latestTimetable.sections().size() + "개 분반");
	}
}
