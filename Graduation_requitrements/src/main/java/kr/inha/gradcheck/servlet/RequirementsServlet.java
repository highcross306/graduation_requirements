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
		int foundation = r.majorFoundation().credits();
		int foundationInMajor = Boolean.TRUE.equals(r.majorFoundation().countsTowardMajor()) ? foundation : 0;

		return obj("curriculum", curriculumSummary(c),
				"distribution", obj(
						"total", r.totalCredits(),
						"generalRequired", r.generalEducationRequired().credits(),
						"majorRequired", majorRequired,
						"majorFoundation", foundation,
						"majorElective", major - majorRequired - foundationInMajor,
						"freeElective", r.freeElective().credits(),
						"major", major,
						"basis", "단일(심화)전공 기준. 전공 " + major + "학점에 전공필수·전공기초·전공선택 포함"),
				"requirements", r);
	}
}
