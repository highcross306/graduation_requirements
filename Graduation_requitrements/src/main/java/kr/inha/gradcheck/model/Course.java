package kr.inha.gradcheck.model;

import java.util.List;

/**
 * 학과 교과과정의 과목 한 개 (WEB-INF/data/curricula/*.json 의 courses[]).
 *
 * @param category            "major" 또는 "general"
 * @param type                교과과정표의 이수구분 (전공필수, 전공선택, 전공기초, 기초교양, 중점교양, 교양선택)
 * @param track               컴공 트랙 (공통, 시스템SW, ...). 인공지능·교양은 null
 * @param recommendedTerms    권장 학기 목록. 1·2학기 모두면 [1, 2]
 * @param recommendedSemester "학년-학기" (예: "2-1"). 권장 학기가 둘이면 앞 학기, 없으면 null
 * @param prerequisites       선수과목 학수번호
 */
public record Course(
		String code,
		String name,
		int credits,
		String category,
		String type,
		String track,
		Integer recommendedYear,
		List<Integer> recommendedTerms,
		String recommendedSemester,
		List<String> prerequisites,
		String note) {

	public Course {
		recommendedTerms = Immutables.list(recommendedTerms);
		prerequisites = Immutables.list(prerequisites);
	}

	public boolean isMajor() {
		return "major".equals(category);
	}
}
