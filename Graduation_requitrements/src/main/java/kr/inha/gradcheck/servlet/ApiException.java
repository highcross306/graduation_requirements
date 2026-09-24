package kr.inha.gradcheck.servlet;

/**
 * API 오류. ApiServlet 이 {"error": code, "message": message} 로 응답한다.
 *
 * @see ApiServlet
 */
public class ApiException extends RuntimeException {

	private static final long serialVersionUID = 1L;

	private final int status;
	private final String code;

	public ApiException(int status, String code, String message) {
		super(message);
		this.status = status;
		this.code = code;
	}

	public int status() {
		return status;
	}

	public String code() {
		return code;
	}

	public static ApiException badRequest(String message) {
		return new ApiException(400, "BAD_REQUEST", message);
	}

	public static ApiException notFound(String message) {
		return new ApiException(404, "NOT_FOUND", message);
	}
}
