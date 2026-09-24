package kr.inha.gradcheck.servlet;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Set;

import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServletRequest;
import kr.inha.gradcheck.model.Timetable;
import kr.inha.gradcheck.service.TimetableService;

/**
 * 강의시간표 (07 시간표).
 *
 * GET /api/timetable — 분반 목록.
 * 파라미터: term (예: 2026-2, 없으면 최신 학기), codes (학수번호 쉼표 목록, 없으면 전체).
 * 응답: {"term": "2026-2", "availableTerms": [...], "note": "...", "count": n, "sections": [Section...]}
 *
 * GET /api/timetable/conflicts — 분반끼리 시간 겹침 검사.
 * 파라미터: term (없으면 최신), sections (필수, 분반 id 쉼표 목록, 예: AIE1002-001,GEB1107-021),
 * candidate (선택, 새로 담으려는 분반 id. 있으면 sections 와 겹치는지만 검사, sections 에 들어 있어도 자기 자신과는 비교 안 함).
 * 학수번호·분반 id 는 대소문자 무시, 같은 분반을 여러 번 보내도 한 번으로 친다.
 * 응답: {"term": ..., "hasConflict": bool, "conflicts": [{a, b, overlaps: [{day, start, end}]}], "unknownSections": [...]}
 */
@WebServlet({ "/api/timetable", "/api/timetable/conflicts" })
public class TimetableServlet extends ApiServlet {

	private static final long serialVersionUID = 1L;

	@Override
	protected Object get(HttpServletRequest req) {
		Timetable t = timetable(req);
		return req.getServletPath().endsWith("/conflicts") ? conflicts(req, t) : sections(req, t);
	}

	private Object sections(HttpServletRequest req, Timetable t) {
		List<String> codes = upper(optionalList(req, "codes"));
		List<Timetable.Section> sections = codes.isEmpty() ? t.sections()
				: t.sections().stream().filter(s -> codes.contains(s.code())).toList();
		return obj("term", t.term(), "availableTerms", store().timetableTerms(), "note", t.note(),
				"count", sections.size(), "sections", sections);
	}

	private Object conflicts(HttpServletRequest req, Timetable t) {
		// 같은 분반을 두 번 보내도 자기 자신과 겹친다고 하지 않도록 중복 제거
		Set<String> ids = new LinkedHashSet<>(upper(optionalList(req, "sections")));
		if (ids.isEmpty()) {
			throw ApiException.badRequest("sections 파라미터가 필요합니다. 예: AIE1002-001,GEB1107-021");
		}
		String candidateId = optional(req, "candidate");
		if (candidateId != null) {
			candidateId = candidateId.toUpperCase(Locale.ROOT);
			// 이미 담은 목록에 후보가 들어 있어도 후보 자신은 비교 대상에서 뺀다
			ids.remove(candidateId);
		}
		Map<String, Timetable.Section> byId = new LinkedHashMap<>();
		t.sections().forEach(s -> byId.put(s.id(), s));

		List<String> unknown = new ArrayList<>();
		List<Timetable.Section> picked = new ArrayList<>();
		for (String id : ids) {
			Timetable.Section s = byId.get(id);
			if (s == null) {
				unknown.add(id);
			} else {
				picked.add(s);
			}
		}
		List<TimetableService.Conflict> conflicts;
		if (candidateId == null) {
			conflicts = TimetableService.conflicts(picked);
		} else {
			Timetable.Section candidate = byId.get(candidateId);
			if (candidate == null) {
				throw ApiException.notFound(t.term() + " 시간표에 없는 분반입니다: " + candidateId);
			}
			conflicts = TimetableService.conflictsWith(candidate, picked);
		}
		return obj("term", t.term(), "hasConflict", !conflicts.isEmpty(), "conflicts", conflicts,
				"unknownSections", unknown);
	}

	/** 학수번호·분반 id 는 대소문자를 구분하지 않는다 (검색 API 와 같게). */
	private static List<String> upper(List<String> values) {
		return values.stream().map(v -> v.toUpperCase(Locale.ROOT)).toList();
	}

	private Timetable timetable(HttpServletRequest req) {
		String term = optional(req, "term");
		if (term == null) {
			Timetable latest = store().latestTimetable();
			if (latest == null) {
				throw ApiException.notFound("시간표 데이터가 없습니다.");
			}
			return latest;
		}
		return store().timetable(term)
				.orElseThrow(() -> ApiException.notFound("시간표가 없는 학기입니다: " + term
						+ " (있는 학기: " + store().timetableTerms() + ")"));
	}
}
