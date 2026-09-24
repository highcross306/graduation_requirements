package kr.inha.gradcheck.model;

import java.math.BigDecimal;
import java.util.List;

/** 한 학기 강의시간표 (WEB-INF/data/timetable/{term}.json). */
public record Timetable(String term, String note, List<Section> sections) {

	public Timetable {
		sections = Immutables.list(sections);
	}

	/**
	 * 분반 하나.
	 *
	 * @param section          분반 번호 (예: "001")
	 * @param grade            대상 학년 ("1" ~ "4", "전체")
	 * @param slots            요일·시간. 온라인·시간 미지정 분반은 빈 목록
	 * @param timeCode         수강신청 사이트 원본 시간 코드 (D요일T교시...)
	 * @param generalEducation 교양 분반이면 영역 정보, 아니면 null
	 * @param listedIn         수강신청 사이트에서 어느 조회 목록에 나왔는지
	 */
	public record Section(String code, String section, String sectionGroup, String name, String grade,
			BigDecimal credits, String type, List<Slot> slots, String timeCode, String timeAndRoom,
			String professor, String grading, String note, boolean hasSyllabus,
			GeneralEducationInfo generalEducation, List<String> listedIn) {

		public Section {
			slots = Immutables.list(slots);
			listedIn = Immutables.list(listedIn);
		}

		/** "AIE1002-001" 형식의 분반 id. */
		public String id() {
			return code + "-" + section;
		}
	}

	/** @param day 월 ~ 토, start/end 는 "HH:mm" */
	public record Slot(String day, String start, String end) {

		public boolean overlaps(Slot other) {
			return day.equals(other.day) && start.compareTo(other.end) < 0 && other.start.compareTo(end) < 0;
		}
	}

	/** @param creativeYears 창의 영역으로도 인정되는 교과과정 연도 (예: [2025, 2026]) */
	public record GeneralEducationInfo(String category, Integer area, String areaName, List<Integer> creativeYears) {

		public GeneralEducationInfo {
			creativeYears = Immutables.list(creativeYears);
		}
	}
}
