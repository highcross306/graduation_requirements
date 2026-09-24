# 와이어프레임 기준 필요 데이터 정리 (2026-09-24)

기준 와이어프레임: https://claude.ai/artifact/KpLCm3tEZH3wpA2hPbwe9d (화면 01–07 + 예외 A–E)

## 화면별 필요 데이터 → 파일

| 화면 | 필요한 데이터 | 파일 | 상태 |
|---|---|---|---|
| 01 학과·학번 선택 | 학과 목록, 입학연도(2025/2026) | `graduation_requirements.json` `programs[]` (학과×연도 4개) | ✅ |
| 02 대시보드: 총학점 카드 | 총 130학점, 학기당 권장 학점 계산용 값 | `graduation_requirements.json` `totalCredits` | ✅ |
| 02 대시보드: 전공필수 카드 | 전필 과목 목록·학점·권장 학년/학기 | `<학과>_<연도>_courses.csv` (이수구분=전공필수), JSON `majorRequired` | ✅ |
| 02 대시보드: 교양필수 카드 | 영역(중점·기초·핵심·SW·AI·창의)별 기준 학점과 과목 | JSON `generalEducationRequired.groups`, `general_education_courses.csv` | ✅ |
| 02 대시보드: 졸업인증 카드 | 영어졸업인증 기준 점수, 대체 인정 과정 | `graduation_certification.json` | ✅ |
| 02 "전필? 교필? 한눈에 보기" / 02-1 가이드 | 이수구분별 학점 분배(교필·전필·전선·일선) | JSON `majorCredits`, `majorFoundation`, `freeElective` | ✅ 일반선택 31학점 = 130 − 전공 65(전공기초 포함) − 교양필수 34 |
| 03 과목 입력 · 교과과정 탭 | 학과 교과과정(학년 필터, 학수번호, 학점) | `<학과>_<연도>_courses.csv` | ✅ |
| 03-1 과목 입력 · 핵심교양 탭 | 핵심교양 영역별 과목 목록 | `general_education_courses.csv` (대분류=핵심교양) | ✅ 2025·2026 둘 다 |
| 03-2 직접 검색 | 교과과정 밖 과목(교양 전체, 타과 전공) | `general_education_courses.csv` + `cse_*`/`aie_*` CSV + `timetable_2026_2.csv` | ⚠ 타과는 컴공·인공지능만 수집 |
| 04-0 새내기 첫 학기 / 04 다음 학기 추천 | 권장 학년·학기, 선수과목 | `<학과>_<연도>_courses.csv` (권장학년, 권장학기, 선수과목) | ✅ |
| 05·06 교양 취향 설문·추천 | 교양 과목 + 과제/시험 비율·팀플·출석 | `general_education_courses.csv` (과목명·학점·영역·개요만) | ❌ 평가 비율·팀플은 강의계획서에만 있음(아래 확인 필요 2) |
| 07 시간표 | 분반별 요일·시간·강의실·교수 | `timetable_2026_2.csv` (2026-2학기, 527개 분반) | ✅ 이번 학기만 |
| 예외 E / 대시보드 하단 문구 | 재수강·F 미반영, 졸업사정 안내 | JSON `notices` | ✅ |

## 파일 형식

- **CSV (UTF-8 BOM, 엑셀로 바로 열림)**: 행 단위 목록 데이터(과목, 교양, 시간표). 팀원이 확인·수정하기 쉬움.
- **JSON**: 규칙 데이터(졸업요건, 졸업인증). 과목은 학수번호로만 참조하고, 과목 정보는 CSV에서 찾는다.
  → 나중에 `WEB-INF/data`로 옮길 때 CSV→JSON 변환만 하면 된다. (아직 프로젝트에는 넣지 않음)

### `graduation_requirements.json` 구조 (programs[] 한 개)
```
departmentCode, departmentName, admissionYear, curriculumFile
totalCredits                              130
majorCredits {single, double, minor}      65 / 39 / 48
majorRequired {courses[], courseCount, credits}
majorFoundation {courses[], credits, countsTowardMajor}  일반수학1·2, 통계학 (전공 65에 포함)
generalEducationRequired {credits, groups[]}
  group: {id, name, credits, allOf[], oneOf[{courses[], credits}], areas[]}
freeElective {credits}                    31
extraRequirements[]                       마이크로전공, (컴공) 졸업고사·TOPCIT — autoCheck=false는 앱이 판정 못 하는 항목
certifications[]                          → graduation_certification.json 키
notices[]
```

### `timetable_2026_2.csv` 열
`요일시간`은 사람이 읽는 형식(`월 13:00-15:00; 수 13:00-15:00`), `시간코드`는 원본(`D1T9T10...`, D=요일 1월~6토, T=교시, 교시 n = 09:00 + 30분×(n−1)).
시간이 없는 분반(온라인·웹강의)은 `요일시간`이 비어 있다.
교양 분반은 학수번호로 영역을 나눴다: `GED<n>` = 핵심교양 n영역, `GEE<n>` = 일반교양 n영역, `GEB` = 중점교양(크로스오버·WWM) / 기초교양 → `교양대분류`·`교양영역번호`·`교양영역명` 열.
창의 영역 과목은 학수번호가 `GEE4`(일반교양 4영역)이므로 따로 `창의영역인정` 열에 창의 목록에 들어간 교과과정 연도(`2025·2026`, `2026` 등)를 적었다.

## 확인된 사항

- 전공기초(일반수학 1·2, 통계학 9학점)는 전공 65학점에 포함 (2026-09-24 확인)
- 와이어프레임의 학점·기준 숫자는 임시 값이라 데이터 기준으로 쓰지 않음

## 아직 확인이 필요한 것 (PM)

1. 교양선택(필수 외 교양)이 일반선택으로 인정되는지. 교과과정표에는 별도 기준 없음 (와이어프레임 PM 확인 7번과 같은 내용).
2. 교양 추천 설문용 평가 비율·팀플·출석: 강의계획서(`LecPlan_Rpt.aspx`)는 로그인 없이 받을 수 없어서 수집하지 못함. `timetable_2026_2.csv`의 `강의계획서` 열(Y/N)로 계획서가 있는지만 알 수 있음. 설문 MVP는 과목 `개요` 키워드 매칭이나 직접 입력으로 대체 필요.
3. 핵심교양 "한 영역에서 두 과목을 들어도 한 과목만 인정" 규칙의 학사 규정 근거 (못 찾음). JSON `core` note에 들어 있음.
4. 컴공 2025 교과과정표의 실전산학프로젝트 1(CSE3111) 이수시기가 "1학년"으로 되어 있고 CSE3112는 없음. 원문 그대로 둠.
5. 시간표는 2026-2학기만 있음. 다른 학기는 개설 시점에 `sources/build_timetable.py`로 다시 받아야 함.
6. 인공지능·컴공 2025 교과과정은 2026과 거의 같음(SW·AI 항목 이름, CSE3111/3112 차이만). 2025 선수과목은 2026 검토본을 그대로 가져옴.
