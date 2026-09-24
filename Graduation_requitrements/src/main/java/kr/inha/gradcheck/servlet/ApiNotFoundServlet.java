package kr.inha.gradcheck.servlet;

import java.io.IOException;

import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

/**
 * /api/ 아래의 없는 경로 (예: /api/courses/ 처럼 끝에 / 가 붙은 주소). Tomcat 기본 HTML 404 대신 JSON 으로 응답해서
 * FE 가 JSON 파싱 오류 없이 오류 처리를 할 수 있게 한다.
 * 서블릿 매핑은 정확한 경로(/api/courses 등)가 /api/* 보다 먼저 선택되므로 다른 API 를 가리지 않는다.
 */
@WebServlet("/api/*")
public class ApiNotFoundServlet extends HttpServlet {

	private static final long serialVersionUID = 1L;

	@Override
	protected void service(HttpServletRequest req, HttpServletResponse resp) throws IOException {
		ApiServlet.writeError(resp, 404, "NOT_FOUND", "없는 API 입니다: " + req.getRequestURI());
	}
}
