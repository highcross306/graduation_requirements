package kr.inha.gradcheck.model;

import java.util.List;

/**
 * 학과·입학연도 하나의 교과과정과 졸업요건 (WEB-INF/data/curricula/{id}.json).
 *
 * @param id 예: "ai_2025", "cse_2026"
 */
public record Curriculum(
		String id,
		String departmentCode,
		String department,
		int year,
		List<Course> courses,
		Requirements requirements) {
}
