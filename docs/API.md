# 졸업요건 앱 API (BE A: 데이터·조회)

조회 API는 `GET`, 학생이 담은 과목을 보내는 판정·추천 API(아래 [BE B](#be-b-판정추천-api))는 `POST`. 응답은 오류를 포함해 항상 `application/json; charset=UTF-8`. FE에서는 상대 경로(`api/...`)로 호출한다.
데이터는 서버 시작 때 `WEB-INF/data`에서 한 번 읽는다 (`DataLoader`). 데이터를 바꾸면 서버를 다시 시작해야 한다.

## 오류 응답 (와이어프레임 예외 B)

```json
{ "error": "NOT_FOUND", "message": "교과과정을 찾을 수 없습니다: ai_2099" }
```

| 상태 | error | 언제 |
|---|---|---|
| 400 | `BAD_REQUEST` | 필수 파라미터 없음, 값 형식·범위 오류, POST 본문이 UTF-8 이 아님 |
| 404 | `NOT_FOUND` | 없는 교과과정 id, 학기, 분반, `/api/` 아래 없는 경로 (예: 끝에 `/`) |
| 405 | `METHOD_NOT_ALLOWED` | 조회 API 를 GET 외 메서드로, 판정·추천 API 를 POST 외 메서드로 호출 |
| 503 | `DATA_UNAVAILABLE` | 서버 시작 때 데이터 로딩 실패 → "학과 정보를 불러올 수 없어요" 팝업 |
| 500 | `INTERNAL_ERROR` | 그 밖의 서버 오류 |

## 교과과정 id

`{학과}_{입학연도}`: `ai_2025`, `ai_2026`, `cse_2025`, `cse_2026`. 목록은 `/api/curricula`.

`curriculum` 파라미터를 받는 조회 API는 모두 `dept` + `year`(예: `dept=ai&year=2025`)로 보내도 된다 (POST 본문과 같은 규칙). 둘 다 보내면 같아야 하고, 다르면 400.

---

## GET /api/curricula — 01 학과·학번 선택

```json
{ "curricula": [ { "id": "ai_2025", "departmentCode": "AIE", "department": "인공지능공학과", "year": 2025 }, ... ] }
```

## GET /api/courses — 03 과목 입력 · 교과과정 탭

| 파라미터 | 필수 | 설명 |
|---|---|---|
| `curriculum` | ✅ | 교과과정 id (또는 `dept` + `year`) |
| `type` | | 이수구분: `전공필수` `전공선택` `전공기초` `기초교양` `중점교양` `교양선택` |
| `category` | | `major` \| `general` |
| `grade` | | 권장 학년 1~4 (학년 필터) |
| `q` | | 있으면 직접 검색으로 보고 [`/api/courses/search`](#get-apicoursessearch--03-2-직접-검색-예외-c)와 같은 응답(`query`, `scope`, `count`, `results`)을 준다. `scope`, `limit`도 그대로 받는다. FE `apiGetCourses({ q, scope })` 호환용 |

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
| `curriculum` 또는 `year` | ✅ 둘 중 하나 | 교과과정 적용연도 (입학연도). 둘 다 보내면 연도가 같아야 함 (다르면 400) |
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
- `scope=other`에는 내 학과 교과과정에 있는 과목이 나오지 않음 (두 학과 공통 과목인 일반수학 등).
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
| `term` | | `2026-2` 형식. 없으면 최신 학기 (학기 순서로 판단) |
| `codes` | | 학수번호 쉼표 목록, 대소문자 무시. 없으면 전체 분반(527개, 약 400KB) |

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
| `sections` | ✅ | 분반 id 쉼표 목록 (예: `AIE1002-001,GEB1107-021`). 대소문자 무시, 중복은 한 번으로 침 |
| `candidate` | | 새로 담으려는 분반 id. 있으면 `sections`와 겹치는지만 검사. `sections`에 들어 있어도 자기 자신과는 비교하지 않음 |
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
Optional<Timetable> t = store.timetableFor("2027-1");     // 그 학기 시간표, 없으면 같은 학기(1·2학기) 최근 시간표
```
- `findCourse` 찾는 순서: 내 학과 교과과정 → 교양 목록 → 다른 학과 교과과정 → 최신 시간표. 없으면 `Optional.empty()`.
- 모델의 목록·맵은 읽기 전용이다. `add`/`remove` 하면 `UnsupportedOperationException`. 가공이 필요하면 `new ArrayList<>(...)`로 복사해서 쓴다.
- `null`인 목록은 의미가 있다: 핵심교양 `Area.courses == null`이면 영역 안 아무 과목이나 인정.
- 시간 겹침은 `service.TimetableService.conflicts(...)`.

---

# BE B: 판정·추천 API

학생이 담은 과목을 JSON 본문으로 보낸다. 두 API 모두 요청 본문이 같고, **FE `js/api.js`의 `apiEvaluate(payload)`가 이미 보내는 모양 그대로** 받는다.
응답도 FE mock(`js/mock.js`의 `evaluateState`, `js/render-common.js`의 `buildNextSemesterPlan`)과 같은 필드라서, `USE_MOCK = false`로 바꿔도 화면 코드는 바꿀 필요가 없다.

## 요청 본문 (공통)

```json
{ "dept": "ai", "year": 2025,
  "courses": [ { "code": "AIE1001", "category": "MAJOR_REQ" }, { "code": "CSE3207", "category": "GEN_ELEC" } ],
  "certs": ["toeic"] }
```

| 필드 | 필수 | 설명 |
|---|---|---|
| `dept` + `year` | ✅ | 학과 코드(`ai`, `cse`)와 입학연도. 서버에서 `ai_2025`처럼 교과과정 id로 바꾼다. `year`는 `"2025"` 문자열도 됨 |
| `curriculum` | | `dept`+`year` 대신 교과과정 id(`ai_2025`)로 보내도 된다. 둘 다 보내면 같아야 함 (다르면 400) |
| `courses` | | 이수한 과목. `code`는 대소문자·앞뒤 공백 무시, 같은 과목은 한 번만 센다. 최대 300개 |
| `courses[].category` | | 학생이 과목 입력 창에서 고른 구분. **전공필수·교양필수처럼 교과과정이 정한 과목은 무시**하고, 그 밖의 과목만 `MAJOR_ELEC`·`GEN_ELEC`·`FREE_ELEC` 선택을 따른다 |
| `certs` | | 취득한 졸업인증 id (`toeic`, `toeic_speaking`, `toefl_pbt`, `toefl_cbt`, `toefl_ibt`, `new_teps`, `opic`, `ielts`, `course`, `specialLecture`) |
| `pastSemesters` | | **다음 학기 추천만.** 입학 후 지난 학기 수 0~8. 없으면 서버가 오늘 날짜(한국 시간)로 계산 (FE `computePastSemesters`와 같은 규칙) |

범주 코드 (FE와 같음): `MAJOR_REQ` 전공필수+전공기초, `MAJOR_ELEC` 전공선택, `GEN_REQ` 교양필수(영역 `focus` `basic` `core` `swai` `creative`), `GEN_ELEC` 교양선택, `FREE_ELEC` 일반선택.

## POST /api/evaluate — 02 대시보드 여의주 4개

```json
{ "curriculum": { "id": "ai_2025", "departmentCode": "AIE", "department": "인공지능공학과", "year": 2025 },
  "summary": { "satisfiedCount": 1, "totalCount": 4, "percent": 25 },
  "cards": [
    { "key": "total", "name": "총학점", "satisfied": false, "earned": 17, "required": 130,
      "breakdown": { "major": 3, "general": 11, "free": 3 },
      "majorCredits": { "earned": 3, "required": 65, "satisfied": false } },
    { "key": "major", "name": "전공필수", "satisfied": false, "earnedCourses": 1, "requiredCourses": 14,
      "earned": 3, "required": 43,
      "remaining": [ { "code": "AIE1002", "name": "객체지향프로그래밍 2", "credit": 3, "grade": 1 } ] },
    { "key": "general", "name": "교양필수", "satisfied": false, "earned": 8, "required": 34,
      "areas": [ { "key": "focus", "name": "중점교양", "desc": "공통 지정 과목: ...", "earned": 2, "required": 4, "satisfied": false } ] },
    { "key": "cert", "name": "졸업인증", "satisfied": true,
      "options": [ { "id": "toeic", "label": "TOEIC 700점 이상" }, ... ], "rule": "one-of",
      "satisfiedBy": ["toeic"] } ],
  "extraRequirements": [
    { "id": "microMajor", "name": "SW중심대학 마이크로전공 이수", "rule": "...", "autoCheck": true, "satisfied": false,
      "components": [ { "name": "미래사회와 소프트웨어-IT계열 GEB1143", "satisfied": true, "course": "GEB1143" },
                      { "name": "핵심교양 6영역 GED6009", "satisfied": false, "course": null }, ... ],
      "alternatives": [] },
    { "id": "gradExam", "name": "졸업고사 응시(졸업학기)", "rule": null, "autoCheck": false, "satisfied": null,
      "components": [], "alternatives": ["전공성적 3.3 이상 성적표", "정보처리기사", ...] },
    { "id": "topcit", "name": "TOPCIT 응시 필수", "rule": "3학년 이상 재학 중 총 2회 응시", "autoCheck": false,
      "satisfied": null, "components": [], "alternatives": [] } ],
  "unknownCourses": ["ZZZ9999"] }
```

- `cards` 순서는 항상 total → major → general → cert.
- **총학점 카드는 학점 요건 두 가지를 함께 본다**: 총학점 >= 130 **그리고** 전공 학점 >= 65(단일전공). `satisfied`는 둘 다 채워야 `true`. 전공 학점은 `majorCredits`에 따로 준다 — 132/130이어도 전공이 모자라면 미충족이니, 화면에서 `majorCredits`를 보여줘서 이유를 알 수 있게 해야 한다.
  - 전공 학점 = 전공필수 + 전공기초(`countsTowardMajor`) + 전공선택(`MAJOR_ELEC`, 학생이 타과 과목을 전공선택으로 고른 것 포함).
  - `breakdown.major`는 전공필수·전공기초·전공선택 합이라 보통 `majorCredits.earned`와 같다 (전공기초가 전공 학점에 안 들어가는 교과과정만 다름).
- 전공필수 카드는 전공기초(일반수학 1·2, 통계학 등)를 포함한다. `remaining`은 교과과정표 순서, `grade`는 권장 학년.
- 교양필수: 지정 과목(`allOf`)은 모두, 택1 목록(`oneOf`)과 핵심교양 영역은 하나씩. **같은 택1 목록·같은 영역에서 두 과목을 들어도 첫 과목만 인정**한다.
  - mock과 다른 점 한 가지: mock은 의사소통 영어(GEB1107~1109)를 두 과목 이상 담으면 학점을 모두 더해서, 지정 과목을 안 들어도 기초교양이 충족될 수 있었다. 서버는 영어 한 과목만 인정한다.
- `breakdown`: 총학점을 전공(전공필수·전공기초·전공선택) / 교양(교양필수·교양선택, 영역 인정과 상관없이 학점 합) / 일반선택(`FREE_ELEC`)으로 나눈 것. 세 값의 합 = `earned`.
- `unknownCourses`: 데이터 어디에도 없는 학수번호. 학점 계산에서 빠진다 (200 응답).
- 졸업인증 선택지는 `GET /api/certification`과 같은 데이터로 학과·입학연도에 맞게 만든다.
- `extraRequirements`: 여의주 4개 밖의 졸업요건. **`summary`(여의주 개수)에는 세지 않으니** 대시보드에 따로 보여줘야 한다.
  - 인공지능공학과: `microMajor`('탄소중립' 마이크로전공) 하나. 컴퓨터공학과: `microMajor`(SW중심대학 마이크로전공), `gradExam`(졸업고사), `topcit`(TOPCIT 2회 응시).
  - `autoCheck: true`(마이크로전공): `components`마다 지정 과목 중 하나를 담았는지 판정. 모두 채우면 `satisfied: true`. `course`는 그 조건을 채운 과목.
    - 인공지능공학과 마이크로전공의 7영역은 **탄소중립 트랙 과목만** 인정한다(GEE7008·7012·7013·7014·7015·7016). 신기술(융합) 트랙 과목은 교양필수 SW·AI 영역은 채우지만 마이크로전공은 못 채운다.
  - `autoCheck: false`(졸업고사, TOPCIT): 앱이 알 수 없어서 `satisfied: null`. "직접 확인 필요"로 표시하고, `alternatives`(대체 인정 방법)가 있으면 함께 보여준다.
  - 판정 기준 데이터는 `curricula/*.json`의 `requirements.extraRequirements[].components` (`curriculum_data/sources/build_requirements.py`에서 생성). `GET /api/requirements`에도 같은 값이 들어 있다.
- 졸업인증 충족: `certs`에 선택지 id가 하나라도 있거나, **`courses`에 졸업인증실용영어(GEE3001)가 있으면** (`course` 선택지). `satisfiedBy`는 충족한 선택지 id 목록 — FE는 이걸로 체크박스를 켜 두면 된다. 모르는 id는 무시.

## POST /api/next-semester — 04 다음 학기 추천

요청 예: `{ "dept": "cse", "year": 2025, "courses": [ { "code": "CSE1101" }, { "code": "MTH1901" } ], "pastSemesters": 2 }`

```json
{ "curriculum": { ... }, "pastSemesters": 2,
  "pastYear": 1, "pastSem": 2, "nextYear": 2, "nextSem": 1,
  "nextTerm": "2026-1", "offeredBasis": null, "extraSemester": false,
  "urgent": [
    { "code": "CSE1103", "name": "객체지향프로그래밍 2", "credit": 3, "category": "MAJOR_REQ", "grade": 1,
      "recPosition": 2, "reason": "객체지향프로그래밍 1 다음 과목이고 1학년 과목(CSE1103)이에요.",
      "estimated": false, "prerequisites": ["CSE1101"], "offeredNextTerm": null } ],
  "relaxed": [] }
```

- 후보: 아직 안 들은 전공필수+전공기초 중 권장 학년·학기가 있는 과목.
- `urgent` (놓치면 1년 밀려요): 권장 학기가 다음 학기와 같거나 더 이전. `relaxed` (천천히 해도 괜찮아요): 다음 학기 학년의 바로 다음 학년 과목만 (목록이 너무 길어지지 않게).
- `recPosition`: 1학년 1학기 = 1, 1학년 2학기 = 2 … 두 목록 모두 이 순서로 정렬.
- `nextTerm`: 추천 대상 학기(달력). 입학연도 + 지난 학기 수로 계산 (2025 입학, 4학기 지남 → `"2027-1"`).
- `offeredNextTerm`: 추천 대상 학기에 열릴지. **같은 학기(1·2학기) 시간표로만 판단**한다 — 그 학기 시간표가 있으면 그것, 없으면 같은 학기의 가장 최근 시간표(`offeredBasis`, 예: 2027-2 → `"2026-2"`). 같은 학기 시간표가 없으면 `offeredBasis`와 `offeredNextTerm`이 모두 `null`(모름). 지금 데이터는 2026-2 뿐이라 1학기 대상이면 `null`.
  - 이전 이름 `offeredThisTerm`(항상 최신 시간표 기준)은 1학기 과목을 2학기 시간표로 판단해서 "미개설"로 잘못 나와 바꿨다.
- `extraSemester`: 추천 대상 학기가 9학기째 이상(초과학기). 이때 `nextYear`는 5가 될 수 있다.
- `prerequisites`, `offeredNextTerm`, `nextTerm`, `offeredBasis`, `extraSemester`는 mock에 없는 추가 필드. 화면에서 안 쓰면 무시해도 된다.

### FE 연결 예 (api.js)

```js
function apiNextSemester(payload) {
  if (USE_MOCK) return mockDelay(function () { return buildNextSemesterPlan(payload.pastSemesters); });
  return fetch('api/next-semester', {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload)
  }).then(handleFetchResponse);
}
// 호출: apiNextSemester({ dept: state.dept, year: state.year, courses: state.courses })
```

## 서버 코드 위치

| 파일 | 하는 일 |
|---|---|
| `service/CourseClassifier.java` | 학수번호 → 범주 코드·교양 영역 (FE `curriculum-data.js`의 category/area와 같게) |
| `service/EvaluationService.java` | 판정 (카드 4개) |
| `service/RecommendService.java` | 다음 학기 추천 |
| `servlet/PostApiServlet.java` | POST 공통: JSON 본문 읽기, dept+year → 교과과정, 오류 응답 |
| `servlet/EvaluateServlet.java`, `servlet/NextSemesterServlet.java` | 위 두 API |
