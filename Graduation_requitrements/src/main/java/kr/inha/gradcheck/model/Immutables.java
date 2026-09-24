package kr.inha.gradcheck.model;

import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

/**
 * 모델 record 생성자에서 쓰는 읽기 전용 복사.
 * Gson 은 목록을 수정 가능한 ArrayList 로 채우는데, 서버 메모리의 데이터는 모든 요청이 함께 쓰므로 바뀌면 안 된다.
 * null 은 "값 없음"이라는 의미가 있을 수 있어서(예: Requirements.Area.courses) 그대로 둔다.
 */
final class Immutables {

	private Immutables() {
	}

	static <T> List<T> list(List<T> list) {
		return list == null ? null : Collections.unmodifiableList(List.copyOf(list));
	}

	/** 키 순서를 유지한다 (Map.copyOf 는 순서를 섞는다). */
	static <K, V> Map<K, V> map(Map<K, V> map) {
		return map == null ? null : Collections.unmodifiableMap(new LinkedHashMap<>(map));
	}
}
