package kr.inha.gradcheck.model;

import java.util.List;

/**
 * 학수번호로 찾은 과목 정보. 학과 교과과정·교양 목록·다른 학과 교과과정·시간표를 한 형태로 합친 것.
 * 과목 검색(03-2) 결과와 졸업 판정(BE B)에서 과목 정보를 찾을 때 쓴다.
 *
 * @param source           어디서 찾았는지: curriculum(내 학과 교과과정), generalEducation(교양 목록),
 *                         otherCurriculum(다른 학과 교과과정), timetable(시간표에만 있음)
 * @param offeredBy        화면 표시용 개설 구분 (예: "인공지능공학과", "교양 · 핵심교양 1영역")
 * @param countsAs         기본 인정 구분. 내 학과 과목이면 교과과정 이수구분(전공필수 등),
 *                         교양 목록 과목이면 "교양", 그 외는 "일반선택"
 * @param course           내 학과 교과과정 과목이면 그 과목, 아니면 null
 * @param generalEducation 교양이면 해당 연도의 영역 정보 (창의 + 일반교양 4영역처럼 여러 개일 수 있음)
 * @param offeredThisTerm  최신 시간표에 분반이 있는지
 */
public record CourseInfo(
		String code,
		String name,
		Number credits,
		String source,
		String offeredBy,
		String countsAs,
		Course course,
		List<GeneralEducationCourse> generalEducation,
		boolean offeredThisTerm) {

	public CourseInfo {
		generalEducation = Immutables.list(generalEducation);
	}
}
