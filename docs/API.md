# 졸업요건 앱 API (BE A: 데이터·조회)

모든 API는 `GET`, 응답은 `application/json; charset=UTF-8`. FE에서는 상대 경로(`api/...`)로 호출한다.
데이터는 서버 시작 때 `WEB-INF/data`에서 한 번 읽는다 (`DataLoader`). 데이터를 바꾸면 서버를 다시 시작해야 한다.

## 오류 응답 (와이어프레임 예외 B)

```json
{ "error": "NOT_FOUND", "message": "교과과정을 찾을 수 없습니다: ai_2099" }
```

| 상태 | error | 언제 |
|---|---|---|
| 400 | `BAD_REQUEST` | 필수 파라미터 없음, 값 형식·범위 오류 |
| 404 | `NOT_FOUND` | 없는 교과과정 id, 학기, 분반 |
| 503 | `DATA_UNAVAILABLE` | 서버 시작 때 데이터 로딩 실패 → "학과 정보를 불러올 수 없어요" 팝업 |
| 500 | `INTERNAL_ERROR` | 그 밖의 서버 오류 |

## 교과과정 id

`{학과}_{입학연도}`: `ai_2025`, `ai_2026`, `cse_2025`, `cse_2026`. 목록은 `/api/curricula`.

---

## GET /api/curricula — 01 학과·학번 선택

```json
{ "curricula": [ { "id": "ai_2025", "departmentCode": "AIE", "department": "인공지능공학과", "year": 2025 }, ... ] }
```

## GET /api/courses — 03 과목 입력 · 교과과정 탭

| 파라미터 | 필수 | 설명 |
|---|---|---|
| `curriculum` | ✅ | 교과과정 id |
| `type` | | 이수구분: `전공필수` `전공선택` `전공기초` `기초교양` `중점교양` `교양선택` |
| `category` | | `major` \| `general` |
| `grade` | | 권장 학년 1~4 (학년 필터) |

```json
{
  "curriculum": { "id": "ai_2025", "departmentCode": "AIE", "department": "인공지능공학과", "year": 2025 },
  "count": 4,
  "courses": [
    { "code": "AIE2004", "name": "인공지능확률론", "credits": 3, "category": "major", "type": "전공필수",
      "track": null, "recommendedYear": 2, "recommendedTerms": [2], "recommendedSemester": "2-2",
      "prerequisites": ["AIE2001", "AIE2011"], "note": null }
  ]
}
```
- `recommendedSemester`: "학년-학기". 1·2학기 둘 다 권장이면 앞 학기, 전체는 `recommendedTerms`.
- `track`: 컴공만 (공통, 시스템SW, 응용SW, 데이터사이언스, 전공기초).

## GET /api/general-education — 03-1 과목 입력 · 교양 영역 탭

| 파라미터 | 필수 | 설명 |
|---|---|---|
| `curriculum` 또는 `year` | ✅ 둘 중 하나 | 교과과정 적용연도 (입학연도) |
| `category` | | `중점교양` `기초교양` `핵심교양` `일반교양` `창의` |
| `area` | | 영역 번호 1~7 (핵심·일반교양) |
| `offered` | | `true`면 이번 학기 개설 과목만 |
| `description` | | `true`면 과목 개요 포함 (교양 추천용, 기본은 뺌) |

```json
{ "year": 2025, "count": 14, "courses": [
  { "code": "GED1005", "name": "인간-AI-기계", "credits": 3, "category": "핵심교양", "area": 1,
    "areaName": "인간, 가치, 공존", "offeredThisTerm": true, "swMicroMajorTrack": null, "note": null } ] }
```
- 창의 영역 과목은 `category=창의`로도, `category=일반교양&area=4`로도 나온다 (같은 학수번호).

## GET /api/courses/search — 03-2 직접 검색 (예외 C)

| 파라미터 | 필수 | 설명 |
|---|---|---|
| `curriculum` | ✅ | 학생의 교과과정 (인정 구분 계산에 씀) |
| `q` | ✅ | 과목명 일부·학수번호·교수명 (공백·대소문자 무시) |
| `scope` | | `all`(기본) \| `own`(우리 학과) \| `other`(타과 전공) \| `general`(교양) |
| `limit` | | 1~200, 기본 50 |

```json
{ "query": "데이터", "scope": "all", "count": 12, "results": [
  { "code": "AIE3007", "name": "데이터베이스", "credits": 3, "source": "curriculum", "offeredBy": "인공지능공학과",
    "countsAs": "전공선택", "course": { ... }, "generalEducation": [], "offeredThisTerm": false },
  { "code": "GEE7018", "name": "데이터사이언스 이해", "credits": 3, "source": "generalEducation",
    "offeredBy": "교양 · 일반교양 7영역", "countsAs": "교양", "course": null, "generalEducation": [ ... ], "offeredThisTerm": true },
  { "code": "CSE3207", "name": "데이터베이스", "credits": 3, "source": "otherCurriculum", "offeredBy": "컴퓨터공학과",
    "countsAs": "일반선택", ... } ] }
```
- 결과 없음: `count: 0`, `results: []` (200). 화면에서 예외 C 문구를 띄운다.
- `countsAs`(담기면 인정): 우리 학과 과목 → 교과과정 이수구분, 교양 → `"교양"`(영역은 `generalEducation`), 그 외 → `"일반선택"`.
- `source`: `curriculum` → `generalEducation` → `otherCurriculum` → `timetable` 순으로 정렬.
- 교양 목록에 없고 시간표에만 있는 교양(예: GED1002)은 학수번호로 영역을 정한다 (GED n = 핵심 n영역, GEE n = 일반 n영역).

## GET /api/requirements — 02 "전필? 교필? 한눈에 보기", 02-1 가이드

파라미터: `curriculum` (필수)

```json
{ "curriculum": { ... },
  "distribution": { "total": 130, "generalRequired": 34, "majorRequired": 34, "majorFoundation": 9,
                    "majorElective": 22, "freeElective": 31, "major": 65, "basis": "단일(심화)전공 기준. ..." },
  "requirements": { "totalCredits": 130, "majorCredits": {...}, "majorRequired": {...}, "majorFoundation": {...},
                    "generalEducationRequired": { "credits": 34, "groups": [...] }, "freeElective": {...},
                    "extraRequirements": [...], "certifications": ["englishGraduation"], "notices": [...] } }
```
- 교양필수 + 전공필수 + 전공기초 + 전공선택 + 일반선택 = 총학점. 전공기초는 전공 65학점에 포함.
- `requirements`의 구조는 `curriculum_data/DATA_NEEDS.md` 참고. 졸업 판정(BE B)이 이 규칙을 쓴다.

## GET /api/certification — 02 졸업인증 카드

파라미터: `curriculum` (필수). 학과·입학연도에 맞는 영어졸업인증 기준 하나를 `criteria`로 준다.

```json
{ "englishGraduation": { "name": "영어졸업인증", "rule": "...", "scoreValidity": "...",
  "criteria": { "departmentCode": "AIE", "appliesTo": "2021학년도 이후 신입생",
                "scores": { "TOEIC": "700", "TOEIC Speaking": "130", "TOEFL iBT": "76", "NEW TEPS": "327",
                            "OPIc": "IM1", "IELTS": "6.0", ... } },
  "alternatives": [ { "id": "course", "name": "졸업인증실용영어 (GEE3001) 이수", ... }, { "id": "specialLecture", ... } ] } }
```
- 점수는 문자열 (OPIc 등급이 섞여 있어서).

## GET /api/timetable — 07 시간표 (Should)

| 파라미터 | 필수 | 설명 |
|---|---|---|
| `term` | | `2026-2` 형식. 없으면 최신 학기 |
| `codes` | | 학수번호 쉼표 목록. 없으면 전체 분반(527개, 약 400KB) |

```json
{ "term": "2026-2", "availableTerms": ["2026-2"], "count": 3, "sections": [
  { "code": "AIE1002", "section": "001", "name": "객체지향프로그래밍 2", "grade": "1", "credits": 3, "type": "전공필수",
    "slots": [ { "day": "월", "start": "13:00", "end": "15:00" }, { "day": "수", "start": "13:00", "end": "15:00" } ],
    "timeAndRoom": "월9,10,11,12,수9,10,11,12(60주년-906)", "professor": "이상선", "grading": "절대평가",
    "hasSyllabus": true, "generalEducation": null, "listedIn": ["인공지능공학과 / 인공지능공학"], ... } ] }
```
- 온라인·시간 미지정 분반은 `slots: []`.
- 교양 분반은 `generalEducation: { category, area, areaName, creativeYears }`.

## GET /api/timetable/conflicts — 분반 시간 겹침 검사

| 파라미터 | 필수 | 설명 |
|---|---|---|
| `sections` | ✅ | 분반 id 쉼표 목록 (예: `AIE1002-001,GEB1107-021`) |
| `candidate` | | 새로 담으려는 분반 id. 있으면 `sections`와 겹치는지만 검사 |
| `term` | | 없으면 최신 학기 |

```json
{ "term": "2026-2", "hasConflict": true,
  "conflicts": [ { "a": "GEB1107-021", "b": "GEB1107-022", "overlaps": [ { "day": "화", "start": "15:00", "end": "16:30" } ] } ],
  "unknownSections": [] }
```

---

## BE B용: 서버 코드에서 데이터 쓰기

```java
DataStore store = DataStore.get(getServletContext());
Curriculum c = store.curriculum("ai_2025").orElseThrow();
Requirements r = c.requirements();                        // 졸업요건 규칙
Optional<CourseInfo> info = store.findCourse("ai_2025", "GEE4001"); // 학점·인정 구분·교양 영역
List<GeneralEducationCourse> ge = store.generalEducation(2025);
boolean open = store.offeredThisTerm("AIE2001");          // 최신 시간표에 분반이 있는지
```
- `findCourse` 찾는 순서: 내 학과 교과과정 → 교양 목록 → 다른 학과 교과과정 → 최신 시간표. 없으면 `Optional.empty()`.
- 시간 겹침은 `service.TimetableService.conflicts(...)`.
