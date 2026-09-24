package kr.inha.gradcheck.service;

import java.util.ArrayList;
import java.util.List;

import kr.inha.gradcheck.model.Timetable;

/** 시간표 분반끼리 시간이 겹치는지 검사 (07 시간표: 겹치는 분반은 담을 때 막고 경고). */
public final class TimetableService {

	private TimetableService() {
	}

	/**
	 * 겹치는 두 분반.
	 *
	 * @param a        분반 id (예: "AIE1002-001")
	 * @param b        분반 id
	 * @param overlaps 실제로 겹치는 시간대 (요일, 겹치는 시작·끝)
	 */
	public record Conflict(String a, String b, List<Timetable.Slot> overlaps) {
	}

	/** 주어진 분반들 중 시간이 겹치는 모든 쌍. 온라인(시간 없음) 분반은 겹치지 않는다. */
	public static List<Conflict> conflicts(List<Timetable.Section> sections) {
		List<Conflict> result = new ArrayList<>();
		for (int i = 0; i < sections.size(); i++) {
			for (int j = i + 1; j < sections.size(); j++) {
				List<Timetable.Slot> overlaps = overlaps(sections.get(i), sections.get(j));
				if (!overlaps.isEmpty()) {
					result.add(new Conflict(sections.get(i).id(), sections.get(j).id(), overlaps));
				}
			}
		}
		return result;
	}

	/** 새 분반을 담을 때: 이미 담은 분반 중 겹치는 것. */
	public static List<Conflict> conflictsWith(Timetable.Section candidate, List<Timetable.Section> existing) {
		List<Conflict> result = new ArrayList<>();
		for (Timetable.Section s : existing) {
			List<Timetable.Slot> overlaps = overlaps(candidate, s);
			if (!overlaps.isEmpty()) {
				result.add(new Conflict(candidate.id(), s.id(), overlaps));
			}
		}
		return result;
	}

	private static List<Timetable.Slot> overlaps(Timetable.Section x, Timetable.Section y) {
		List<Timetable.Slot> result = new ArrayList<>();
		for (Timetable.Slot a : x.slots()) {
			for (Timetable.Slot b : y.slots()) {
				if (a.overlaps(b)) {
					String start = a.start().compareTo(b.start()) >= 0 ? a.start() : b.start();
					String end = a.end().compareTo(b.end()) <= 0 ? a.end() : b.end();
					result.add(new Timetable.Slot(a.day(), start, end));
				}
			}
		}
		return result;
	}
}
