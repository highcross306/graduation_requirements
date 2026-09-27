package kr.inha.gradcheck.servlet;

import java.io.BufferedReader;
import java.io.IOException;
import java.nio.charset.CharacterCodingException;
import java.util.List;
import java.util.Locale;

import com.google.gson.JsonParseException;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import kr.inha.gradcheck.data.DataStore;
import kr.inha.gradcheck.data.DataUnavailableException;
import kr.inha.gradcheck.model.Curriculum;

/**
 * 학생이 담은 과목을 JSON 본문으로 받는 API 공통 처리 (POST /api/evaluate, POST /api/next-semester).
 * 조회 API(ApiServlet)와 같은 오류 형식 {"error": "...", "message": "..."} 을 쓴다.
 * 하위 클래스는 {@link #post(StudentRequest)} 에서 응답 본문 객체만 돌려주면 된다.
 */
public abstract class PostApiServlet extends jakarta.servlet.http.HttpServlet {

	private static final long serialVersionUID = 1L;

	/** 과목 목록 최대 개수. 4년 동안 들을 수 있는 과목 수보다 넉넉하게. */
	static final int MAX_COURSES = 300;

	protected abstract Object post(StudentRequest body);

	/**
	 * 요청 본문. 프론트 api.js 의 apiEvaluate(payload) 와 같은 모양.
	 *
	 * <pre>
	 * { "dept": "ai", "year": 2025, "courses": [ { "code": "AIE1001", "category": "MAJOR_REQ" } ], "certs": ["toeic"] }
	 * </pre>
	 *
	 * @param curriculum    dept·year 대신 교과과정 id("ai_2025")로 보내도 된다 (조회 API 와 같은 이름)
	 * @param pastSemesters 다음 학기 추천에서만 사용. 입학 후 지난 학기 수(0~8). 없으면 서버가 오늘 날짜로 계산
	 */
	public record StudentRequest(String dept, Integer year, String curriculum, List<CourseEntry> courses,
			List<String> certs, Integer pastSemesters) {

		/** null 목록은 빈 목록으로 바꿔서 돌려준다. */
		public List<CourseEntry> coursesOrEmpty() {
			return courses == null ? List.of() : courses.stream().filter(c -> c != null).toList();
		}

		public List<String> certsOrEmpty() {
			return certs == null ? List.of() : certs.stream().filter(c -> c != null).map(String::trim).toList();
		}
	}

	/** @param category MAJOR_REQ, MAJOR_ELEC, GEN_REQ, GEN_ELEC, FREE_ELEC (없어도 됨) */
	public record CourseEntry(String code, String category) {
	}

	@Override
	protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		String method = req.getMethod();
		if ("POST".equals(method)) {
			handlePost(req, resp);
			return;
		}
		if ("OPTIONS".equals(method)) {
			resp.setHeader("Allow", "POST, OPTIONS");
			return;
		}
		resp.setHeader("Allow", "POST, OPTIONS");
		ApiServlet.writeError(resp, 405, "METHOD_NOT_ALLOWED",
				method + " 는 지원하지 않습니다. POST 로 JSON 본문을 보내세요.");
	}

	private void handlePost(HttpServletRequest req, HttpServletResponse resp) throws IOException {
		try {
			req.setCharacterEncoding("UTF-8");
			StudentRequest body = readBody(req);
			writeJson(resp, post(body));
		} catch (ApiException e) {
			ApiServlet.writeError(resp, e.status(), e.code(), e.getMessage());
		} catch (CharacterCodingException e) {
			// 본문이 UTF-8 이 아님 (Tomcat 기본 HTML 500 대신 JSON 400)
			ApiServlet.writeError(resp, 400, "BAD_REQUEST", "요청 본문은 UTF-8 JSON 이어야 합니다.");
		} catch (DataUnavailableException e) {
			ApiServlet.writeError(resp, 503, "DATA_UNAVAILABLE", e.getMessage());
		} catch (RuntimeException e) {
			log("API 처리 중 오류: " + req.getRequestURI(), e);
			ApiServlet.writeError(resp, 500, "INTERNAL_ERROR", "서버 오류가 발생했습니다.");
		}
	}

	private static StudentRequest readBody(HttpServletRequest req) throws IOException {
		StringBuilder sb = new StringBuilder();
		try (BufferedReader r = req.getReader()) {
			char[] buf = new char[4096];
			int n;
			while ((n = r.read(buf)) != -1) {
				sb.append(buf, 0, n);
				if (sb.length() > 200_000) {
					throw ApiException.badRequest("요청 본문이 너무 큽니다.");
				}
			}
		}
		if (sb.toString().isBlank()) {
			throw ApiException.badRequest("JSON 본문이 필요합니다. 예: {\"dept\": \"ai\", \"year\": 2025, \"courses\": []}");
		}
		StudentRequest body;
		try {
			body = ApiServlet.GSON.fromJson(sb.toString(), StudentRequest.class);
		} catch (JsonParseException | IllegalStateException | NumberFormatException e) {
			// Gson 메시지 첫 줄만 (둘째 줄은 Gson 문서 링크)
			String detail = String.valueOf(e.getMessage()).split("\n")[0].replaceFirst("^[\\w.]+Exception: ", "");
			throw ApiException.badRequest("JSON 형식이 잘못됐습니다 (courses 는 배열, year 는 숫자): " + detail);
		}
		if (body == null) {
			throw ApiException.badRequest("JSON 본문이 필요합니다.");
		}
		if (body.courses() != null && body.courses().size() > MAX_COURSES) {
			throw ApiException.badRequest("courses 는 " + MAX_COURSES + "개까지 보낼 수 있습니다.");
		}
		if (body.pastSemesters() != null && (body.pastSemesters() < 0 || body.pastSemesters() > 8)) {
			throw ApiException.badRequest("pastSemesters 는 0~8 사이여야 합니다: " + body.pastSemesters());
		}
		return body;
	}

	protected DataStore store() {
		return DataStore.get(getServletContext());
	}

	/** dept + year (또는 curriculum) 로 교과과정을 찾는다. 없으면 400, 모르는 교과과정이면 404. */
	protected Curriculum curriculum(StudentRequest body) {
		String id;
		if (body.curriculum() != null && !body.curriculum().isBlank()) {
			id = body.curriculum().trim().toLowerCase(Locale.ROOT);
			if (body.dept() != null && body.year() != null
					&& !id.equals(body.dept().trim().toLowerCase(Locale.ROOT) + "_" + body.year())) {
				throw ApiException.badRequest("curriculum 과 dept·year 가 다릅니다: " + id);
			}
		} else if (body.dept() != null && !body.dept().isBlank() && body.year() != null) {
			id = body.dept().trim().toLowerCase(Locale.ROOT) + "_" + body.year();
		} else {
			throw ApiException.badRequest("dept 와 year (또는 curriculum) 가 필요합니다.");
		}
		final String curriculumId = id;
		return store().curriculum(curriculumId)
				.orElseThrow(() -> ApiException.notFound("교과과정을 찾을 수 없습니다: " + curriculumId));
	}

	private static void writeJson(HttpServletResponse resp, Object body) throws IOException {
		resp.setStatus(200);
		resp.setContentType("application/json; charset=UTF-8");
		resp.getWriter().write(ApiServlet.GSON.toJson(body));
	}
}
