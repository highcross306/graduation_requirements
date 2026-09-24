package kr.inha.gradcheck.model;

/**
 * 교양 과목 한 개 (WEB-INF/data/general_education.json).
 * 같은 과목이 연도별로, 또 창의 영역과 일반교양 4영역에 한 번씩 따로 들어 있다.
 *
 * @param year              교과과정 적용연도 (입학연도 기준)
 * @param category          중점교양, 기초교양, 핵심교양, 일반교양, 창의
 * @param area              핵심·일반교양 영역 번호. 그 외 null
 * @param offeredThisTerm   이번 학기 개설 여부. 중점·기초교양은 null
 * @param swMicroMajorTrack SW중심대학 마이크로전공 트랙 (일반교양 7영역, GED6009). 해당 없으면 null
 */
public record GeneralEducationCourse(
		int year,
		String category,
		Integer area,
		String areaName,
		String code,
		String name,
		int credits,
		Boolean offeredThisTerm,
		String swMicroMajorTrack,
		String note,
		String description) {
}
