package kr.inha.gradcheck.servlet;

import java.util.List;
import java.util.Map;

import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServletRequest;
import kr.inha.gradcheck.model.Curriculum;
import kr.inha.gradcheck.model.GeneralEducationCourse;

/**
 * GET /api/general-education — 교양 과목 목록 (03-1 과목 입력 · 교양 영역 탭).
 *
 * 파라미터: curriculum 또는 year (둘 중 하나 필수, 교과과정 적용연도. 둘 다 보내면 연도가 같아야 함), category (중점교양 | 기초교양 | 핵심교양 |
 * 일반교양 | 창의), area (영역 번호 1~7), offered (true 면 이번 학기 개설 과목만), description (true 면 과목 개요 포함).
 * 응답: {"year": 2025, "count": n, "courses": [...]}
 */
@WebServlet("/api/general-education")
public class GeneralEducationServlet extends ApiServlet {

	private static final long serialVersionUID = 1L;
	private static final List<String> CATEGORIES = List.of("중점교양", "기초교양", "핵심교양", "일반교양", "창의");

	@Override
	protected Object get(HttpServletRequest req) {
		int year = year(req);
		String category = optional(req, "category");
		if (category != null && !CATEGORIES.contains(category)) {
			throw ApiException.badRequest("category 는 " + CATEGORIES + " 중 하나여야 합니다: " + category);
		}
		Integer area = optionalInt(req, "area", 1, 7);
		Boolean offered = optionalBoolean(req, "offered");
		boolean withDescription = Boolean.TRUE.equals(optionalBoolean(req, "description"));

		List<Map<String, Object>> courses = store().generalEducation(year).stream()
				.filter(g -> category == null || category.equals(g.category()))
				.filter(g -> area == null || area.equals(g.area()))
				.filter(g -> offered == null || offered.equals(isOffered(g)))
				.map(g -> row(g, withDescription))
				.toList();
		return obj("year", year, "count", courses.size(), "courses", courses);
	}

	/** curriculum 이 있으면 그 교과과정 연도. year 도 같이 왔는데 다르면 어느 쪽인지 모호하므로 400. */
	private int year(HttpServletRequest req) {
		Integer year = optionalInt(req, "year", 2000, 2100);
		if (optional(req, "curriculum") != null) {
			Curriculum c = curriculum(req);
			if (year != null && year != c.year()) {
				throw ApiException.badRequest("curriculum(" + c.id() + ", " + c.year() + "학년도)과 year(" + year
						+ ")가 다릅니다. 둘 중 하나만 보내세요.");
			}
			return c.year();
		}
		if (year == null) {
			throw ApiException.badRequest("curriculum 또는 year 파라미터가 필요합니다.");
		}
		if (store().generalEducation(year).isEmpty()) {
			throw ApiException.notFound(year + "학년도 교양 데이터가 없습니다.");
		}
		return year;
	}

	/** 개설 여부: 교양 목록의 "금학기 개설" 표시가 없으면(중점·기초교양) 최신 시간표로 판단. */
	private boolean isOffered(GeneralEducationCourse g) {
		return g.offeredThisTerm() != null ? g.offeredThisTerm() : store().offeredThisTerm(g.code());
	}

	private Map<String, Object> row(GeneralEducationCourse g, boolean withDescription) {
		Map<String, Object> m = obj("code", g.code(), "name", g.name(), "credits", g.credits(),
				"category", g.category(), "area", g.area(), "areaName", g.areaName(),
				"offeredThisTerm", isOffered(g), "swMicroMajorTrack", g.swMicroMajorTrack(), "note", g.note());
		if (withDescription) {
			m.put("description", g.description());
		}
		return m;
	}
}
