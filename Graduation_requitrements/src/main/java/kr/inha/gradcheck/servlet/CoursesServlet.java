package kr.inha.gradcheck.servlet;

import java.util.List;
import java.util.Set;

import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServletRequest;
import kr.inha.gradcheck.model.Course;
import kr.inha.gradcheck.model.Curriculum;

/**
 * GET /api/courses — 학과 교과과정 과목 (03 과목 입력 · 교과과정 탭).
 *
 * 파라미터: curriculum (필수, 예: ai_2025), type (이수구분, 예: 전공필수), category (major | general),
 * grade (권장 학년 1~4).
 * 응답: {"curriculum": {...}, "count": n, "courses": [Course...]}
 */
@WebServlet("/api/courses")
public class CoursesServlet extends ApiServlet {

	private static final long serialVersionUID = 1L;
	private static final Set<String> CATEGORIES = Set.of("major", "general");

	@Override
	protected Object get(HttpServletRequest req) {
		Curriculum c = curriculum(req);
		String type = optional(req, "type");
		String category = optional(req, "category");
		if (category != null && !CATEGORIES.contains(category)) {
			throw ApiException.badRequest("category 는 major 또는 general 이어야 합니다: " + category);
		}
		Integer grade = optionalInt(req, "grade", 1, 4);

		List<Course> courses = c.courses().stream()
				.filter(co -> type == null || type.equals(co.type()))
				.filter(co -> category == null || category.equals(co.category()))
				.filter(co -> grade == null || grade.equals(co.recommendedYear()))
				.toList();
		return obj("curriculum", curriculumSummary(c), "count", courses.size(), "courses", courses);
	}
}
