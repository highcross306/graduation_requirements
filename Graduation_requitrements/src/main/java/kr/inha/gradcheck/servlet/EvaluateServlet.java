package kr.inha.gradcheck.servlet;

import java.io.IOException;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import com.google.gson.Gson;

import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

/**
 * 졸업요건 판정 API. 지금은 FE 연동 확인용 Mock으로 고정 JSON을 반환한다.
 * TODO(BE B): EvaluationService 연결 후 요청 본문(수강 과목 목록)으로 실제 판정 결과를 반환.
 */
@WebServlet("/api/evaluate")
public class EvaluateServlet extends HttpServlet {

	private static final long serialVersionUID = 1L;
	private static final Gson GSON = new Gson();

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
		writeJson(resp, mockResult());
	}

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException {
		writeJson(resp, mockResult());
	}

	private static Map<String, Object> mockResult() {
		Map<String, Object> result = new LinkedHashMap<>();
		result.put("mock", true);
		result.put("curriculum", "ai_2025");
		result.put("totalCredits", Map.of("required", 130, "earned", 96));
		result.put("categories", List.of(
				Map.of("name", "전공필수", "required", 30, "earned", 24, "passed", false),
				Map.of("name", "전공선택", "required", 30, "earned", 33, "passed", true),
				Map.of("name", "교양필수", "required", 18, "earned", 18, "passed", true)));
		result.put("graduatable", false);
		return result;
	}

	private static void writeJson(HttpServletResponse resp, Object body) throws IOException {
		resp.setContentType("application/json; charset=UTF-8");
		resp.getWriter().write(GSON.toJson(body));
	}
}
