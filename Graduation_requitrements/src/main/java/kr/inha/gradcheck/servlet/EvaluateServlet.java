package kr.inha.gradcheck.servlet;

import java.util.List;

import jakarta.servlet.annotation.WebServlet;
import kr.inha.gradcheck.model.Curriculum;
import kr.inha.gradcheck.service.EvaluationService;

/**
 * POST /api/evaluate — 졸업요건 판정 (02 대시보드 여의주 4개).
 *
 * 요청: {"dept": "ai", "year": 2025, "courses": [{"code": "AIE1001", "category": "MAJOR_REQ"}], "certs": ["toeic"]}
 * 응답: {"curriculum": {...}, "summary": {...}, "cards": [total, major, general, cert], "unknownCourses": [...]}
 * 응답 모양은 프론트 js/mock.js 의 evaluateState() 와 같다. 자세한 설명은 docs/API.md.
 */
@WebServlet("/api/evaluate")
public class EvaluateServlet extends PostApiServlet {

	private static final long serialVersionUID = 1L;

	@Override
	protected Object post(StudentRequest body) {
		Curriculum c = curriculum(body);
		List<EvaluationService.TakenCourse> courses = body.coursesOrEmpty().stream()
				.map(e -> new EvaluationService.TakenCourse(e.code(), e.category()))
				.toList();
		return EvaluationService.evaluate(store(), c, courses, body.certsOrEmpty());
	}
}
