package kr.inha.gradcheck.model;

import java.util.List;

/** WEB-INF/data/index.json: 어떤 데이터 파일이 있는지 알려주는 목차. */
public record DataIndex(String collectedAt, List<Entry> curricula, String generalEducation, String certification,
		List<TimetableEntry> timetables) {

	public DataIndex {
		curricula = Immutables.list(curricula);
		timetables = Immutables.list(timetables);
	}

	public record Entry(String id, String departmentCode, String department, int year, String file) {
	}

	public record TimetableEntry(String term, String file) {
	}
}
