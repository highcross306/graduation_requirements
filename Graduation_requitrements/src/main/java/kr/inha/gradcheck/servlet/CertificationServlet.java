package kr.inha.gradcheck.servlet;

import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServletRequest;
import kr.inha.gradcheck.model.Certification;
import kr.inha.gradcheck.model.Curriculum;

/**
 * GET /api/certification — 학생에게 적용되는 영어졸업인증 기준 (02 대시보드 졸업인증 카드).
 *
 * 파라미터: curriculum (필수). 학과와 입학연도(교과과정 연도)로 기준을 고른다.
 * 응답: {"curriculum": {...}, "englishGraduation": {name, rule, scoreValidity, howToVerify, ifNotMet,
 * "criteria": 해당 기준 하나 또는 null, "alternatives": [...]}}
 */
@WebServlet("/api/certification")
public class CertificationServlet extends ApiServlet {

	private static final long serialVersionUID = 1L;

	@Override
	protected Object get(HttpServletRequest req) {
		Curriculum c = curriculum(req);
		Certification.EnglishGraduation e = store().certification().englishGraduation();
		Certification.Criteria criteria = e.criteria().stream()
				.filter(cr -> cr.appliesTo(c.departmentCode(), c.year()))
				.findFirst().orElse(null);

		return obj("curriculum", curriculumSummary(c),
				"englishGraduation", obj(
						"name", e.name(),
						"rule", e.rule(),
						"scoreValidity", e.scoreValidity(),
						"howToVerify", e.howToVerify(),
						"ifNotMet", e.ifNotMet(),
						"criteria", criteria,
						"alternatives", e.alternatives()));
	}
}
