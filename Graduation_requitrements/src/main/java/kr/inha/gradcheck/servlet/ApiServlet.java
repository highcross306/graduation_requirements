package kr.inha.gradcheck.servlet;

import java.io.IOException;
import java.util.Arrays;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import kr.inha.gradcheck.data.DataStore;
import kr.inha.gradcheck.data.DataUnavailableException;
import kr.inha.gradcheck.model.Curriculum;

/**
 * 조회 API 공통 처리: JSON 응답, 파라미터 검사, 오류 응답.
 * 하위 클래스는 {@link #get(HttpServletRequest)} 에서 응답 본문 객체만 돌려주면 된다.
 *
 * 오류 응답 (와이어프레임 예외 B): 400 BAD_REQUEST (파라미터 잘못됨), 404 NOT_FOUND (없는 교과과정·학기),
 * 503 DATA_UNAVAILABLE (데이터 로딩 실패), 500 INTERNAL_ERROR. 본문은 {"error": "...", "message": "..."}.
 */
public abstract class ApiServlet extends HttpServlet {

	private static final long serialVersionUID = 1L;
	protected static final Gson GSON = new GsonBuilder().serializeNulls().create();

	protected abstract Object get(HttpServletRequest req);

	@Override
	protected final void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
		try {
			writeJson(resp, 200, get(req));
		} catch (ApiException e) {
			writeError(resp, e.status(), e.code(), e.getMessage());
		} catch (DataUnavailableException e) {
			writeError(resp, 503, "DATA_UNAVAILABLE", e.getMessage());
		} catch (RuntimeException e) {
			log("API 처리 중 오류: " + req.getRequestURI(), e);
			writeError(resp, 500, "INTERNAL_ERROR", "서버 오류가 발생했습니다.");
		}
	}

	protected DataStore store() {
		return DataStore.get(getServletContext());
	}

	/** curriculum 파라미터로 교과과정을 찾는다. 없으면 400, 모르는 id 면 404. */
	protected Curriculum curriculum(HttpServletRequest req) {
		String id = required(req, "curriculum");
		return store().curriculum(id)
				.orElseThrow(() -> ApiException.notFound("교과과정을 찾을 수 없습니다: " + id));
	}

	protected static String required(HttpServletRequest req, String name) {
		String v = optional(req, name);
		if (v == null) {
			throw ApiException.badRequest(name + " 파라미터가 필요합니다.");
		}
		return v;
	}

	/** 비어 있으면 null. */
	protected static String optional(HttpServletRequest req, String name) {
		String v = req.getParameter(name);
		return v == null || v.isBlank() ? null : v.trim();
	}

	protected static Integer optionalInt(HttpServletRequest req, String name, int min, int max) {
		String v = optional(req, name);
		if (v == null) {
			return null;
		}
		int n;
		try {
			n = Integer.parseInt(v);
		} catch (NumberFormatException e) {
			throw ApiException.badRequest(name + " 는 숫자여야 합니다: " + v);
		}
		if (n < min || n > max) {
			throw ApiException.badRequest(name + " 는 " + min + "~" + max + " 사이여야 합니다: " + v);
		}
		return n;
	}

	protected static Boolean optionalBoolean(HttpServletRequest req, String name) {
		String v = optional(req, name);
		if (v == null) {
			return null;
		}
		if (!v.equals("true") && !v.equals("false")) {
			throw ApiException.badRequest(name + " 는 true 또는 false 여야 합니다: " + v);
		}
		return Boolean.valueOf(v);
	}

	/** "a,b,c" → [a, b, c]. 비어 있으면 빈 목록. */
	protected static List<String> optionalList(HttpServletRequest req, String name) {
		String v = optional(req, name);
		return v == null ? List.of()
				: Arrays.stream(v.split(",")).map(String::trim).filter(s -> !s.isEmpty()).toList();
	}

	/** 응답에 넣는 교과과정 요약. */
	protected static Map<String, Object> curriculumSummary(Curriculum c) {
		return obj("id", c.id(), "departmentCode", c.departmentCode(), "department", c.department(), "year", c.year());
	}

	/** 키 순서를 유지하는 JSON 객체. 인자는 key, value, key, value, ... 순서. */
	protected static Map<String, Object> obj(Object... kv) {
		Map<String, Object> m = new LinkedHashMap<>();
		for (int i = 0; i < kv.length; i += 2) {
			m.put((String) kv[i], kv[i + 1]);
		}
		return m;
	}

	private static void writeJson(HttpServletResponse resp, int status, Object body) throws IOException {
		resp.setStatus(status);
		resp.setContentType("application/json; charset=UTF-8");
		resp.getWriter().write(GSON.toJson(body));
	}

	private static void writeError(HttpServletResponse resp, int status, String code, String message)
			throws IOException {
		writeJson(resp, status, obj("error", code, "message", message));
	}
}
