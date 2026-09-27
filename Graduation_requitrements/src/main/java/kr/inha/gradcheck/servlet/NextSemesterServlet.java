package kr.inha.gradcheck.servlet;

import java.util.LinkedHashSet;
import java.util.Locale;
import java.util.Set;

import jakarta.servlet.annotation.WebServlet;
import kr.inha.gradcheck.data.DataStore;
import kr.inha.gradcheck.model.Curriculum;
import kr.inha.gradcheck.service.RecommendService;

/**
 * POST /api/next-semester — 다음 학기 추천 (04 #next).
 *
 * 요청: 판정 API 와 같은 본문 + (선택) "pastSemesters": 지난 학기 수 0~8
 * 응답: {"curriculum": {...}, "pastSemesters", "pastYear", "pastSem", "nextYear", "nextSem", "urgent": [...], "relaxed": [...]}
 * 응답 모양은 프론트 js/render-common.js 의 buildNextSemesterPlan() 과 같다. 자세한 설명은 docs/API.md.
 */
@WebServlet("/api/next-semester")
public class NextSemesterServlet extends PostApiServlet {

	private static final long serialVersionUID = 1L;

	@Override
	protected Object post(StudentRequest body) {
		Curriculum c = curriculum(body);
		Set<String> taken = new LinkedHashSet<>();
		for (CourseEntry e : body.coursesOrEmpty()) {
			if (e.code() != null && !e.code().isBlank()) {
				taken.add(e.code().trim().toUpperCase(Locale.ROOT));
			}
		}
		DataStore store = store();
		return RecommendService.nextSemester(c, taken, body.pastSemesters(), store::timetableFor);
	}
}
