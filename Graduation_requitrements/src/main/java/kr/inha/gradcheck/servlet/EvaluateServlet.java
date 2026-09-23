package kr.inha.gradcheck.servlet;

import java.io.IOException;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

/**
 * 졸업요건 판정 API. 지금은 FE 연동 확인용 Mock으로 고정 JSON을 반환한다.
 * 응답 형태는 UI/UX 와이어프레임의 03 판정 결과 화면(요건 카드)에 맞춘다.
 * 값은 인공지능공학과 2025 교과과정에서 5과목(15학점)을 들은 학생 기준 예시.
 * TODO(BE B): EvaluationService 연결 후 요청 본문(수강 과목 목록)으로 실제 판정 결과를 반환.
 */
@WebServlet("/api/evaluate")
public class EvaluateServlet extends HttpServlet {

	private static final long serialVersionUID = 1L;
	private static final Gson GSON = new GsonBuilder().serializeNulls().create();

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
		writeJson(resp, mockResult());
	}

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException {
		writeJson(resp, mockResult());
	}

	private static Map<String, Object> mockResult() {
		List<Map<String, Object>> categories = List.of(
				obj("id", "totalCredits", "name", "총학점", "passed", false,
						"earned", 15, "required", 130,
						"breakdown", obj("major", 9, "general", 6)),
				obj("id", "certification", "name", "졸업인증", "passed", true,
						"items", List.of(
								obj("name", "영어졸업인증", "passed", true))),
				obj("id", "majorRequired", "name", "전공필수", "passed", false,
						"earned", 6, "required", 34,
						"earnedCourses", 2, "requiredCourses", 11,
						"remainingCourses", List.of(
								course("AIE1005", "이산구조", 3, "1-2"),
								course("AIE2001", "자료구조", 4, "2-1"),
								course("AIE2003", "선형대수", 3, "2-1"),
								course("AIE2002", "인공지능프로그래밍", 3, "2-2"),
								course("AIE2004", "인공지능확률론", 3, "2-2"),
								course("AIE3001", "기계학습", 3, "3-1"),
								course("AIE3002", "알고리즘", 3, "3-1"),
								course("AIE3003", "인공신경망", 3, "3-2"),
								course("AIE4001", "인공지능종합설계", 3, "4-1"))),
				obj("id", "generalRequired", "name", "교양필수", "passed", false,
						"earned", 6, "required", 34,
						"items", List.of(
								obj("name", "기초교양", "passed", false, "earned", 6, "required", 12),
								obj("name", "중점교양", "passed", false, "earned", 0, "required", 4),
								obj("name", "핵심교양", "passed", false, "earned", 0, "required", 12),
								obj("name", "창의", "passed", false, "earned", 0, "required", 3),
								obj("name", "SW·AI", "passed", false, "earned", 0, "required", 3)),
						"remainingCourses", List.of(
								course("GEB1117", "커리어 디자인 1", 2, "1-1"),
								course("GEB1143", "미래사회와 소프트웨어-IT계열", 3, "1-2"),
								course("GEB1151", "커리어 디자인 2", 1, "3-1"),
								course("GEB1112", "크로스오버 1 : 인간의 탐색", 2, "1-1"),
								course("GEB1114", "크로스오버 3 : 사회의 탐색", 2, "1-2"),
								course("GED6009", "인공지능과 소프트웨어를 활용한 탄소중립", 3, null))));

		long passedCount = categories.stream().filter(c -> Boolean.TRUE.equals(c.get("passed"))).count();

		return obj(
				"mock", true,
				"curriculum", obj("id", "ai_2025", "department", "인공지능공학과", "year", 2025),
				"inputCourseCount", 5,
				"passedCount", passedCount,
				"totalCount", categories.size(),
				"graduatable", passedCount == categories.size(),
				"categories", categories);
	}

	/** 남은 과목 한 줄. recommendedSemester는 "학년-학기" 형식이고 권장 학기가 없으면 null. */
	private static Map<String, Object> course(String code, String name, int credits, String recommendedSemester) {
		return obj("code", code, "name", name, "credits", credits, "recommendedSemester", recommendedSemester);
	}

	/** 키 순서를 유지하는 JSON 객체. 인자는 key, value, key, value, ... 순서. */
	private static Map<String, Object> obj(Object... kv) {
		Map<String, Object> m = new LinkedHashMap<>();
		for (int i = 0; i < kv.length; i += 2) {
			m.put((String) kv[i], kv[i + 1]);
		}
		return m;
	}

	private static void writeJson(HttpServletResponse resp, Object body) throws IOException {
		resp.setContentType("application/json; charset=UTF-8");
		resp.getWriter().write(GSON.toJson(body));
	}
}
