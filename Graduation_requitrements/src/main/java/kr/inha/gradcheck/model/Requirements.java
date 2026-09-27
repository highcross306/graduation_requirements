package kr.inha.gradcheck.model;

import java.util.List;

/**
 * 졸업요건 규칙 (curricula/{id}.json 의 requirements).
 * 과목은 학수번호로만 참조하고, 과목 정보는 DataStore.findCourse 로 찾는다.
 */
public record Requirements(
		String departmentCode,
		String departmentName,
		int admissionYear,
		int totalCredits,
		MajorCredits majorCredits,
		CourseSet majorRequired,
		CourseSet majorFoundation,
		GeneralEducation generalEducationRequired,
		FreeElective freeElective,
		List<ExtraRequirement> extraRequirements,
		List<String> certifications,
		List<String> notices) {

	public Requirements {
		extraRequirements = Immutables.list(extraRequirements);
		certifications = Immutables.list(certifications);
		notices = Immutables.list(notices);
	}

	/** 전공 이수학점: 단일(심화)전공 / 다중전공 / 부전공. */
	public record MajorCredits(int single, @com.google.gson.annotations.SerializedName("double") int doubleMajor,
			int minor, String note) {
	}

	/**
	 * 모두 이수해야 하는 과목 묶음 (전공필수, 전공기초).
	 *
	 * @param countsTowardMajor 전공기초만 사용. true면 전공 학점에 포함
	 */
	public record CourseSet(List<String> courses, Integer courseCount, int credits, String rule,
			Boolean countsTowardMajor, String note) {

		public CourseSet {
			courses = Immutables.list(courses);
		}
	}

	/** 교양필수 전체. groups 는 중점·기초·핵심·SW·AI·창의 순서. */
	public record GeneralEducation(int credits, List<Group> groups) {

		public GeneralEducation {
			groups = Immutables.list(groups);
		}
	}

	/**
	 * 교양필수 영역 하나.
	 *
	 * @param id    focus, basic, core, swai, creative
	 * @param allOf 모두 이수해야 하는 과목
	 * @param oneOf 목록 중 하나만 이수하면 되는 선택지
	 * @param areas 핵심교양처럼 영역별로 채워야 하는 경우
	 */
	public record Group(String id, String name, int credits, List<String> allOf, List<Choice> oneOf,
			List<Area> areas, String note) {

		public Group {
			allOf = Immutables.list(allOf);
			oneOf = Immutables.list(oneOf);
			areas = Immutables.list(areas);
		}
	}

	/** oneOf 의 선택지: courses 중 하나를 이수하면 credits 충족. */
	public record Choice(String name, List<String> courses, int credits) {

		public Choice {
			courses = Immutables.list(courses);
		}
	}

	/**
	 * 핵심교양 영역. courses 가 있으면 그 과목만 인정(6영역 = GED6009), 없으면 영역 내 아무 과목.
	 */
	public record Area(int area, String name, int credits, String rule, List<String> courses) {

		public Area {
			courses = Immutables.list(courses);
		}
	}

	/** 일반선택 학점 = 130 - 전공 65(전공기초 포함) - 교양필수. */
	public record FreeElective(int credits, String note) {
	}

	/**
	 * 학점 외 졸업요건 (마이크로전공, 졸업고사, TOPCIT).
	 *
	 * @param coveredBy 이 요건이 어떤 교양 그룹 충족으로 함께 채워지는지 (예: "core.area6")
	 * @param autoCheck  false 면 앱이 판정할 수 없는 항목 (학생이 직접 체크)
	 * @param components autoCheck 항목의 판정 기준. 모든 component 를 채우면 충족
	 */
	public record ExtraRequirement(String id, String name, String rule, List<String> coveredBy,
			boolean autoCheck, List<String> alternatives, List<Component> components) {

		public ExtraRequirement {
			coveredBy = Immutables.list(coveredBy);
			alternatives = Immutables.list(alternatives);
			components = Immutables.list(components);
		}
	}

	/** 학점 외 요건의 한 부분: courses 중 한 과목 이상 이수하면 충족. */
	public record Component(String name, List<String> courses) {

		public Component {
			courses = Immutables.list(courses);
		}
	}
}
