package kr.inha.gradcheck.model;

import java.util.List;
import java.util.Map;

/** 인하졸업인증 (WEB-INF/data/certification.json). 지금은 영어졸업인증만 있다. */
public record Certification(EnglishGraduation englishGraduation) {

	public record EnglishGraduation(String name, String rule, String scoreValidity, String howToVerify,
			String ifNotMet, List<Criteria> criteria, List<Alternative> alternatives) {
	}

	/**
	 * 학과·입학연도별 기준 점수.
	 *
	 * @param admissionYearTo 없으면 이후 모든 입학연도
	 * @param scores          시험명 → 기준 (예: "TOEIC" → "700", "OPIc" → "IM1")
	 */
	public record Criteria(String departmentCode, String departmentName, String appliesTo, int admissionYearFrom,
			Integer admissionYearTo, Map<String, String> scores) {

		public boolean appliesTo(String deptCode, int admissionYear) {
			return departmentCode.equals(deptCode) && admissionYear >= admissionYearFrom
					&& (admissionYearTo == null || admissionYear <= admissionYearTo);
		}
	}

	/** 점수 대신 인정받는 방법 (졸업인증실용영어, 토익특강). */
	public record Alternative(String id, String name, String rule, String eligibility, String schedule) {
	}
}
