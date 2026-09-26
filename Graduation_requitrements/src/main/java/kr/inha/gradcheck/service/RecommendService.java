package kr.inha.gradcheck.service;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.function.Predicate;

import kr.inha.gradcheck.model.Course;
import kr.inha.gradcheck.model.Curriculum;

/**
 * 다음 학기 추천 (POST /api/next-semester, 화면 04 #next).
 * 전공필수(전공기초 포함) 과목의 편성표 권장 학년·학기를 "지난 학기"와 비교해서 두 묶음으로 나눈다.
 * <ul>
 * <li>urgent (놓치면 1년 밀려요): 권장 학기가 다음 학기와 같거나 더 이전인 과목</li>
 * <li>relaxed (천천히 해도 괜찮아요): 바로 다음 학년에 권장되는 과목만 (목록이 너무 길어지지 않게)</li>
 * </ul>
 * 계산 방식과 응답 모양은 프론트 js/render-common.js 의 buildNextSemesterPlan() 과 같다.
 */
public final class RecommendService {

	private static final ZoneId SEOUL = ZoneId.of("Asia/Seoul");

	private RecommendService() {
	}

	/**
	 * @param pastYear 지난 학기(오늘이 속한 학기 포함)의 학년
	 * @param nextYear 추천 대상 학기의 학년
	 */
	public record Plan(Map<String, Object> curriculum, int pastSemesters, int pastYear, int pastSem, int nextYear,
			int nextSem, List<Item> urgent, List<Item> relaxed) {
	}

	/**
	 * 추천 과목 한 줄.
	 *
	 * @param grade       권장 학년
	 * @param recPosition 권장 학기를 1학년 1학기 = 1 부터 센 번호 (정렬용)
	 * @param reason      화면에 보여줄 이유 문장
	 * @param estimated   권장 학기를 편성표에서 확인하지 못하고 짐작했는지
	 */
	public record Item(String code, String name, int credit, String category, Integer grade, int recPosition,
			String reason, boolean estimated, List<String> prerequisites, boolean offeredThisTerm) {
	}

	/**
	 * @param takenCodes    이미 들은 과목 학수번호 (대문자)
	 * @param pastSemesters 입학 후 지난 학기 수 (0~8). null 이면 오늘 날짜로 계산
	 * @param offered       최신 시간표에 분반이 있는지 확인하는 함수
	 */
	public static Plan nextSemester(Curriculum curriculum, Set<String> takenCodes, Integer pastSemesters,
			Predicate<String> offered) {
		int past = pastSemesters != null ? pastSemesters : pastSemesters(curriculum.year(), LocalDate.now(SEOUL));
		int nextPosition = past + 1;
		int[] pastYs = toYearSem(past);
		int[] nextYs = toYearSem(nextPosition);

		// 전공필수 + 전공기초 과목 (교과과정표 순서)
		Set<String> requiredCodes = CourseClassifier.majorRequiredCodes(curriculum.requirements());
		Map<String, Course> byCode = new HashMap<>();
		for (Course c : curriculum.courses()) {
			if (requiredCodes.contains(c.code())) {
				byCode.put(c.code(), c);
			}
		}

		List<Item> urgent = new ArrayList<>();
		List<Item> relaxed = new ArrayList<>();
		for (String code : requiredCodes) {
			Course c = byCode.get(code);
			if (c == null || takenCodes.contains(code) || c.recommendedYear() == null
					|| c.recommendedTerms() == null || c.recommendedTerms().isEmpty()) {
				continue;
			}
			int recPosition = c.recommendedTerms().stream().mapToInt(t -> position(c.recommendedYear(), t)).min()
					.getAsInt();
			if (recPosition <= nextPosition) {
				urgent.add(item(c, recPosition, true, takenCodes, byCode, offered));
			} else if (c.recommendedYear() == nextYs[0] + 1) {
				relaxed.add(item(c, recPosition, false, takenCodes, byCode, offered));
			}
		}
		urgent.sort(Comparator.comparingInt(Item::recPosition));
		relaxed.sort(Comparator.comparingInt(Item::recPosition));

		Map<String, Object> cur = new LinkedHashMap<>();
		cur.put("id", curriculum.id());
		cur.put("departmentCode", curriculum.departmentCode());
		cur.put("department", curriculum.department());
		cur.put("year", curriculum.year());
		return new Plan(cur, past, pastYs[0], pastYs[1], nextYs[0], nextYs[1], urgent, relaxed);
	}

	private static Item item(Course c, int recPosition, boolean urgent, Set<String> taken, Map<String, Course> byCode,
			Predicate<String> offered) {
		List<String> prereq = c.prerequisites() == null ? List.of() : c.prerequisites();
		boolean allPrereqTaken = !prereq.isEmpty() && prereq.stream().allMatch(taken::contains);
		String terms = String.join("·", c.recommendedTerms().stream().map(String::valueOf).toList());
		String reason;
		if (urgent && allPrereqTaken) {
			List<String> names = prereq.stream().map(p -> byCode.containsKey(p) ? byCode.get(p).name() : p).toList();
			reason = String.join(", ", names) + " 다음 과목이고 " + c.recommendedYear() + "학년 과목(" + c.code() + ")이에요.";
		} else if (urgent) {
			reason = "편성표 권장 학기가 " + c.recommendedYear() + "학년 " + terms + "학기예요.";
		} else {
			reason = c.recommendedYear() + "학년 과목(" + c.code() + ")이라 다음 학년에 들어도 돼요.";
		}
		boolean estimated = c.note() != null && c.note().contains("추정");
		return new Item(c.code(), c.name(), c.credits(), CourseClassifier.MAJOR_REQ, c.recommendedYear(), recPosition,
				reason, estimated, prereq, offered.test(c.code()));
	}

	/**
	 * 입학 후 지난 학기 수 (진행 중인 학기 포함). 3~8월은 그 해 1학기, 9월~다음 해 2월은 2학기로 본다.
	 * 프론트 render-common.js 의 computePastSemesters() 와 같다. 결과는 0~8.
	 */
	public static int pastSemesters(int admissionYear, LocalDate today) {
		int y = today.getYear();
		int m = today.getMonthValue();
		int ay;
		int sem;
		if (m >= 3 && m <= 8) {
			ay = y;
			sem = 1;
		} else if (m >= 9) {
			ay = y;
			sem = 2;
		} else {
			ay = y - 1;
			sem = 2;
		}
		int elapsed = (ay - admissionYear) * 2 + sem;
		return Math.max(0, Math.min(8, elapsed));
	}

	/** 1학년 1학기 = 1, 1학년 2학기 = 2, 2학년 1학기 = 3 ... */
	static int position(int year, int sem) {
		return (year - 1) * 2 + sem;
	}

	/** position → {학년, 학기}. 0 이면 {0, 2} (프론트와 같음). */
	static int[] toYearSem(int position) {
		int year = (int) Math.ceil(position / 2.0);
		int sem = position % 2 == 0 ? 2 : 1;
		return new int[] { year, sem };
	}
}
