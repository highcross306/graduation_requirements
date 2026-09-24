package kr.inha.gradcheck.servlet;

import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServletRequest;

/**
 * GET /api/curricula — 학과·입학연도 목록 (01 학과·학번 선택).
 * 응답: {"curricula": [{"id": "ai_2025", "departmentCode": "AIE", "department": "인공지능공학과", "year": 2025}, ...]}
 */
@WebServlet("/api/curricula")
public class CurriculaServlet extends ApiServlet {

	private static final long serialVersionUID = 1L;

	@Override
	protected Object get(HttpServletRequest req) {
		return obj("curricula", store().curriculumEntries().stream()
				.map(e -> obj("id", e.id(), "departmentCode", e.departmentCode(), "department", e.department(),
						"year", e.year()))
				.toList());
	}
}
