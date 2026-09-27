package kr.inha.gradcheck.servlet;

import java.util.List;
import java.util.Locale;
import java.util.Map;

import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServletRequest;
import kr.inha.gradcheck.data.DataStore;
import kr.inha.gradcheck.model.CourseInfo;
import kr.inha.gradcheck.model.Curriculum;

/**
 * GET /api/courses/search — 과목명·학수번호·교수명 검색 (03-2 직접 검색).
 *
 * 파라미터: curriculum (또는 dept + year, 필수), q (필수), scope (all | own | other | general, 기본 all), limit (1~200, 기본 50).
 * 응답: {"curriculum": {...}, "query": q, "scope": "all", "count": n, "results": [CourseInfo...]}
 * 결과가 없으면 count 0, results [] (와이어프레임 예외 C).
 */
@WebServlet("/api/courses/search")
public class CourseSearchServlet extends ApiServlet {

	private static final long serialVersionUID = 1L;

	@Override
	protected Object get(HttpServletRequest req) {
		return search(store(), curriculum(req), req);
	}

	/** 검색 응답. GET /api/courses?q=... 도 이 결과를 그대로 쓴다. */
	static Map<String, Object> search(DataStore store, Curriculum c, HttpServletRequest req) {
		String q = required(req, "q");
		String scopeParam = optional(req, "scope");
		DataStore.Scope scope;
		try {
			scope = scopeParam == null ? DataStore.Scope.ALL
					: DataStore.Scope.valueOf(scopeParam.toUpperCase(Locale.ROOT));
		} catch (IllegalArgumentException e) {
			throw ApiException.badRequest("scope 는 all, own, other, general 중 하나여야 합니다: " + scopeParam);
		}
		Integer limit = optionalInt(req, "limit", 1, 200);

		List<CourseInfo> results = store.search(c.id(), q, scope, limit == null ? 50 : limit);
		return obj("curriculum", curriculumSummary(c), "query", q, "scope", scope.name().toLowerCase(Locale.ROOT),
				"count", results.size(), "results", results);
	}
}
