package kr.inha.gradcheck.data;

/** 서버 시작 때 WEB-INF/data 를 읽지 못했을 때. API 는 503 으로 응답한다. */
public class DataUnavailableException extends RuntimeException {

	private static final long serialVersionUID = 1L;

	public DataUnavailableException(String message, Throwable cause) {
		super(message, cause);
	}
}
