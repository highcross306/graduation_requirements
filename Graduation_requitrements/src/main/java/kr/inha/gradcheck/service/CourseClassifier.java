package kr.inha.gradcheck.service;

import java.util.LinkedHashSet;
import java.util.List;
import java.util.Locale;
import java.util.Optional;
import java.util.Set;

import kr.inha.gradcheck.data.DataStore;
import kr.inha.gradcheck.model.Course;
import kr.inha.gradcheck.model.CourseInfo;
import kr.inha.gradcheck.model.Curriculum;
import kr.inha.gradcheck.model.GeneralEducationCourse;
import kr.inha.gradcheck.model.Requirements;

/**
 * 학수번호 하나가 학생의 교과과정에서 어떤 이수구분으로 인정되는지 정한다.
 * 결과의 범주 코드는 프론트(js/mock.js)와 같다.
 *
 * <pre>
 * MAJOR_REQ   전공필수 + 전공기초 (모두 이수해야 하는 과목)
 * MAJOR_ELEC  전공선택
 * GEN_REQ     교양필수. area 로 영역을 나눈다 (focus, basic, core, swai, creative)
 * GEN_ELEC    교양선택 (필수 영역에 들지 않는 교양)
 * FREE_ELEC   일반선택 (타과 전공 등)
 * </pre>
 */
public final class CourseClassifier {

	public static final String MAJOR_REQ = "MAJOR_REQ";
	public static final String MAJOR_ELEC = "MAJOR_ELEC";
	public static final String GEN_REQ = "GEN_REQ";
	public static final String GEN_ELEC = "GEN_ELEC";
	public static final String FREE_ELEC = "FREE_ELEC";

	/** 학생이 과목 입력 창에서 직접 고를 수 있는 구분 (render-modal.js 의 선택 상자와 같음). */
	private static final Set<String> USER_SELECTABLE = Set.of(MAJOR_ELEC, GEN_ELEC, FREE_ELEC);

	private CourseClassifier() {
	}

	/**
	 * 인정 구분이 정해진 과목 하나.
	 *
	 * @param category 범주 코드 (MAJOR_REQ 등)
	 * @param area     GEN_REQ 일 때 교양필수 영역 id (focus, basic, core, swai, creative). 그 외 null
	 * @param slot     같은 slot 끼리는 한 과목만 인정한다. 핵심교양은 "core:1" 처럼 영역, 택1 목록은 "basic:oneOf0" 처럼 선택지.
	 *                 과목마다 따로 인정하면 null
	 * @param fixed    교과과정이 정한 구분이라 학생이 바꿀 수 없는지 (전공필수·교양필수)
	 */
	public record Classified(String code, String name, int credits, String category, String area, String slot,
			Integer grade, boolean fixed) {
	}

	/**
	 * 과목을 분류한다. 데이터 어디에도 없는 학수번호면 empty.
	 *
	 * @param requestedCategory 프론트가 보낸 category. 전공필수·교양필수처럼 교과과정이 정한 과목에는 무시하고,
	 *                          나머지 과목은 학생이 고른 전공선택·교양선택·일반선택을 그대로 따른다.
	 */
	public static Optional<Classified> classify(DataStore store, Curriculum curriculum, String code,
			String requestedCategory) {
		if (code == null || code.isBlank()) {
			return Optional.empty();
		}
		String c = code.trim().toUpperCase(Locale.ROOT);
		Optional<CourseInfo> found = store.findCourse(curriculum.id(), c);
		if (found.isEmpty()) {
			return Optional.empty();
		}
		CourseInfo info = found.get();
		int credits = info.credits().intValue();
		Integer grade = grade(info.course(), c);

		Classified fixed = fixedCategory(curriculum.requirements(), info, c, credits, grade);
		if (fixed != null) {
			return Optional.of(fixed);
		}
		String category = defaultCategory(info);
		if (requestedCategory != null && USER_SELECTABLE.contains(requestedCategory)) {
			category = requestedCategory;
		}
		return Optional.of(new Classified(c, info.name(), credits, category, null, null, grade, false));
	}

	/** 전공필수·전공기초와 교양필수 영역 과목. 해당 없으면 null. */
	private static Classified fixedCategory(Requirements r, CourseInfo info, String code, int credits,
			Integer grade) {
		if (majorRequiredCodes(r).contains(code)) {
			return new Classified(code, info.name(), credits, MAJOR_REQ, null, null, grade, true);
		}
		for (Requirements.Group g : r.generalEducationRequired().groups()) {
			if (contains(g.allOf(), code)) {
				return new Classified(code, info.name(), credits, GEN_REQ, g.id(), null, grade, true);
			}
			if (g.oneOf() != null) {
				for (int i = 0; i < g.oneOf().size(); i++) {
					if (contains(g.oneOf().get(i).courses(), code)) {
						return new Classified(code, info.name(), credits, GEN_REQ, g.id(), g.id() + ":oneOf" + i,
								grade, true);
					}
				}
			}
			if (g.areas() != null) {
				for (Requirements.Area a : g.areas()) {
					if (inArea(a, info, code)) {
						return new Classified(code, info.name(), credits, GEN_REQ, g.id(), g.id() + ":" + a.area(),
								grade, true);
					}
				}
			}
		}
		return null;
	}

	/**
	 * 핵심교양 영역에 드는 과목인지. 영역에 지정 과목(courses)이 있으면 그 과목만, 없으면 해당 영역 번호의 핵심교양 아무 과목.
	 */
	private static boolean inArea(Requirements.Area a, CourseInfo info, String code) {
		if (a.courses() != null && !a.courses().isEmpty()) {
			return a.courses().contains(code);
		}
		for (GeneralEducationCourse g : info.generalEducation()) {
			if ("핵심교양".equals(g.category()) && g.area() != null && g.area() == a.area()) {
				return true;
			}
		}
		return false;
	}

	/** 필수가 아닌 과목의 기본 구분. */
	private static String defaultCategory(CourseInfo info) {
		Course course = info.course();
		if (course != null) {
			if (course.isMajor()) {
				return MAJOR_ELEC; // 전공필수·전공기초는 위에서 이미 걸러짐
			}
			return GEN_ELEC;
		}
		if (!info.generalEducation().isEmpty() || "교양".equals(info.countsAs())) {
			return GEN_ELEC;
		}
		return FREE_ELEC;
	}

	/** 전공필수 + 전공기초 학수번호 (교과과정표 순서). */
	public static Set<String> majorRequiredCodes(Requirements r) {
		Set<String> codes = new LinkedHashSet<>(r.majorRequired().courses());
		if (r.majorFoundation() != null && r.majorFoundation().courses() != null) {
			codes.addAll(r.majorFoundation().courses());
		}
		return codes;
	}

	/** 권장 학년. 교과과정에 없으면 학수번호 네 번째 글자(AIE2001 → 2)로 짐작한다. */
	static Integer grade(Course course, String code) {
		if (course != null && course.recommendedYear() != null) {
			return course.recommendedYear();
		}
		if (code.length() >= 4 && Character.isDigit(code.charAt(3))) {
			int g = code.charAt(3) - '0';
			return g >= 1 && g <= 4 ? g : null;
		}
		return null;
	}

	private static boolean contains(List<String> list, String code) {
		return list != null && list.contains(code);
	}
}
