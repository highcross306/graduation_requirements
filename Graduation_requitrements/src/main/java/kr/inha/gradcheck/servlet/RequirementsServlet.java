package kr.inha.gradcheck.servlet;

import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServletRequest;
import kr.inha.gradcheck.model.Curriculum;
import kr.inha.gradcheck.model.Requirements;

/**
 * GET /api/requirements — 졸업요건 규칙과 이수구분별 학점 분배 (02 "전필? 교필? 한눈에 보기", 02-1 이수구분 가이드).
 *
 * 파라미터: curriculum (필수).
 * 응답: {"curriculum": {...}, "distribution": {...}, "requirements": Requirements}
 * distribution 은 단일(심화)전공 기준: 교양필수 + 전공필수 + 전공기초 + 전공선택 + 일반선택 = 총학점.
 */
@WebServlet("/api/requirements")
public class RequirementsServlet extends ApiServlet {

	private static final long serialVersionUID = 1L;

	@Override
	protected Object get(HttpServletRequest req) {
		Curriculum c = curriculum(req);
		Requirements r = c.requirements();
		int major = r.majorCredits().single();
		int majorRequired = r.majorRequired().credits();
		int general = r.generalEducationRequired().credits();
		// 전공기초·일반선택은 학과에 따라 없을 수 있다 (DataLoader 가 필수 항목만 검사)
		Requirements.CourseSet f = r.majorFoundation();
		int foundation = f == null ? 0 : f.credits();
		boolean foundationInMajor = f != null && Boolean.TRUE.equals(f.countsTowardMajor());
		int freeElective = r.freeElective() != null ? r.freeElective().credits()
				: r.totalCredits() - major - general - (foundationInMajor ? 0 : foundation);

		return obj("curriculum", curriculumSummary(c),
				"distribution", obj(
						"total", r.totalCredits(),
						"generalRequired", general,
						"majorRequired", majorRequired,
						"majorFoundation", foundation,
						"majorElective", major - majorRequired - (foundationInMajor ? foundation : 0),
						"freeElective", freeElective,
						"major", major,
						"basis", "단일(심화)전공 기준. 전공 " + major + "학점에 전공필수·전공기초·전공선택 포함"),
				"requirements", r);
	}
}
