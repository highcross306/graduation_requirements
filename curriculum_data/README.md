# 교과과정 데이터 (졸업요건 앱)

2025·2026학년도 주전공 교과과정, 교양, 졸업요건, 졸업인증, 시간표 원천 자료. 앱이 읽는 데이터는 `sources/build_webapp_data.py`로 변환해 `Graduation_requitrements/src/main/webapp/WEB-INF/data/`에 넣는다.
와이어프레임 화면별로 어떤 파일을 쓰는지와 확인 필요 사항은 `DATA_NEEDS.md`에 정리했다.

| 파일 | 내용 |
|---|---|
| `aie_2026_courses.csv` / `aie_2025_courses.csv` | 인공지능공학과 교과과정 (각 52행) |
| `cse_2026_courses.csv` / `cse_2025_courses.csv` | 컴퓨터공학과 교과과정 (57행 / 56행) |
| `general_education_courses.csv` | 교양 과목: 중점·기초·핵심(1–6영역)·일반(1–7영역)·창의, 2025·2026 (509행). SW 마이크로전공 트랙, 금학기 개설 여부, 과목 개요 포함 |
| `graduation_requirements.json` | 학과×입학연도(AIE/CSE × 2025/2026)별 졸업요건 규칙. 과목은 학수번호로 참조 |
| `graduation_certification.json` | 영어졸업인증 기준 점수와 대체 인정 과정 |
| `timetable_2026_2.csv` | 2026-2학기 강의시간표 (527개 분반: 인공지능·컴공·프런티어창의대학·교양) |
| `DATA_NEEDS.md` | 화면 → 데이터 → 파일 대응표, 확인 필요 사항 |

## 기준
- **학수번호·과목명·학점·이수구분·트랙·권장 학년/학기**: 수강신청 사이트 교과과정표
  (https://sugang.inha.ac.kr/sugang/SU_51001/curriculum_all.aspx → AI융합대학 → 학과 → 주전공 "보기").
  이수체계도와 다르면 교과과정표를 따른다. 2025는 연도 드롭다운 postback으로 받음 (2025년에는 소프트웨어융합대학 소속).
- **선수과목**: 이수체계도 연결선 + "자료구조는 2학년 2학기~4학년 모든 전공과목의 선수과목" 규칙 + 교과목 개요. 사용자 검토 완료(2026-09-24).
  - 예외: 논리회로(CSE2211, AIE2010)는 선수과목 없음.
  - 2025 CSV의 선수과목은 2026 검토본에서 학수번호로 가져옴 (2025에만 있는 전공과목은 없음).
- 이수체계도 출처
  - 컴공: https://cse.inha.ac.kr/cse/18176/subview.do (2026)
  - 인공지능: https://swuniv.inha.ac.kr/swuniv/12661/subview.do (2023 이미지, 학과 홈페이지 메뉴는 깨져 있음)
- **교양**: 프런티어창의대학 https://newdept.inha.ac.kr/generaledu/16885/subview.do (이수체계 2026-2025) 및 영역별 페이지 (연도 선택은 `enc` 파라미터로 받음)
- **마이크로전공 트랙**: SW중심대학사업단 https://swuniv.inha.ac.kr/swuniv/12694/subview.do
- **졸업인증**: https://www.inha.ac.kr/kr/1051/subview.do
- **시간표**: https://sugang.inha.ac.kr/sugang/SU_51001/Lec_Time_Search.aspx (로그인 불필요)

## 졸업요건 요약 (교과과정표 하단 + 교양 이수체계)
- 총 130학점 / 전공 65 (다중전공 39, 부전공 48)
- 교양필수 34학점 = 중점 4 + 기초 12 + 핵심 1·2·4·6영역 12 + SW·AI 3 + 창의 3
- 전공기초 9학점 (일반수학 1·2, 통계학) — 전공 65학점에 포함 → 일반선택 31학점
- 인공지능: 전공필수 11과목 34학점, '탄소중립' 마이크로전공 필수 (2023 신입생부터)
- 컴공: 전공필수 5과목 16학점, SW중심대학 마이크로전공, 졸업고사(대체요건 있음), TOPCIT 3학년 이상 2회 응시
- 영어졸업인증: TOEIC 700 등 (`graduation_certification.json`)

## sources/
원본 HTML과 재생성 스크립트. 스크립트는 `sources/`에서 실행한다 (curl로 받은 HTML 기준, Python 표준 라이브러리만 사용).

| 스크립트 | 만드는 파일 |
|---|---|
| `rebuild_from_table.py` | 2026 교과과정 CSV (처음 만들 때 쓴 것) |
| `build_courses_for_year.py <tag> <html> <기준CSV> <출력> <트랙열 0/1>` | 다른 연도 교과과정 CSV (선수과목은 기준 CSV에서) |
| `build_general_education.py generaledu swuniv_micro_major.html ../general_education_courses.csv` | 교양 CSV |
| `build_timetable.py ../timetable_2026_2.csv ../general_education_courses.csv timetable_2026_2/*.html` | 시간표 CSV (교양 CSV를 먼저 만들어야 함) |
| `build_requirements.py ..` | `graduation_requirements.json` (위 CSV들을 읽음) |
| `build_webapp_data.py` | `WEB-INF/data/*.json` (위 파일 전부를 읽음, 마지막에 실행) |

`graduation_certification.json`은 졸업인증 페이지(`inha_graduation_certification.html`)를 보고 직접 옮겨 적었다.

## WEB-INF/data (앱용)
| 파일 | 내용 |
|---|---|
| `index.json` | 커리큘럼 목록(학과·입학연도 선택용)과 나머지 파일 경로 |
| `curricula/{ai,cse}_{2025,2026}.json` | 교과과정 과목(`courses`) + 졸업요건(`requirements`). id는 mock API의 `ai_2025`와 같은 형식 |
| `general_education.json` | 교양 과목 (연도·대분류·영역별) |
| `certification.json` | 영어졸업인증 기준 |
| `timetable/2026-2.json` | 2026-2학기 분반 (요일·시간 `slots`, 교양 영역 `generalEducation`) |

- 과목 `recommendedSemester`는 mock과 같은 "학년-학기" 형식. 권장 학기가 1·2 둘 다면 앞 학기를 쓰고, 전체는 `recommendedTerms`에 있다.
- `prerequisites`는 학수번호 목록.
- "핵심교양-1" 같은 영역 자리표시 행은 `courses`에서 빼고 `requirements.generalEducationRequired`로 표현한다.

## 다음 할 일
- `DATA_NEEDS.md`의 "확인이 필요한 것" (교양선택 인정 등)
- DataLoader·모델 클래스(BE A)가 `WEB-INF/data` JSON을 읽도록 구현, 판정 로직(BE B)과 필드 합의
- 권장 학기 "1·2" 과목 처리 방식 결정
