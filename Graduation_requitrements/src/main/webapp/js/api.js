/* ============================================================
   api.js — 모든 서버 호출은 이 파일에만 모아둔다.
   USE_MOCK = true  → mock.js의 함수를 사용 (지연 500ms 포함, 서버 없이 화면만 볼 때)
   USE_MOCK = false → 실제 서버(Servlet) 호출 (상대경로 api/...)

   ------------------------------------------------------------
   API 형식 — 자세한 설명은 docs/API.md

   POST api/evaluate          졸업요건 판정 (대시보드 여의주 4개)
     요청: { dept, year, courses: [{ code, category }], certs: [...] }
     응답: { summary, cards: [total, major, general, cert], extraRequirements, unknownCourses }
       - total.majorCredits  { earned, required, satisfied }  전공 65학점. 총학점 카드는 130 + 전공 65 둘 다 채워야 충족
       - cert.satisfiedBy    충족한 선택지 id (졸업인증실용영어 GEE3001 을 담으면 'course' 가 자동으로 들어감)
       - extraRequirements   여의주 밖 요건 (마이크로전공, 컴공 졸업고사·TOPCIT). satisfied 가 null 이면 직접 확인

   POST api/next-semester     다음 학기 추천 (#next)
     요청: { dept, year, courses: [{ code }] }
     응답: { pastYear, pastSem, nextYear, nextSem, nextTerm, offeredBasis, extraSemester, urgent: [...], relaxed: [...] }
       - urgent/relaxed[].offeredNextTerm  offeredBasis 시간표 기준 개설 여부 (시간표 없으면 null)

   GET  api/courses?dept=ai&year=2025          교과과정 과목 목록
   GET  api/courses?dept=ai&year=2025&q=데이터   직접 검색 결과
     ※ 지금 과목 입력 창은 curriculum-data.js 카탈로그를 바로 쓰고 이 API는 쓰지 않는다.
   ------------------------------------------------------------ */

var USE_MOCK = false;

/* 예외 B(네트워크 오류) 재현용 스위치. true로 바꾸면 mock 호출이 전부 실패한다. */
var FORCE_ERROR = false;

function mockDelay(producer) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      if (FORCE_ERROR) {
        reject(new Error('NETWORK_ERROR'));
        return;
      }
      try {
        resolve(producer());
      } catch (e) {
        reject(e);
      }
    }, 500);
  });
}

function handleFetchResponse(res) {
  if (!res.ok) throw new Error('NETWORK_ERROR');
  return res.json();
}

function postJson(url, payload) {
  return fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  }).then(handleFetchResponse);
}

function apiGetCourses(params) {
  params = params || {};

  if (USE_MOCK) {
    return mockDelay(function () { return mockGetCourses(params); });
  }

  var qs = new URLSearchParams();
  if (params.dept) qs.set('dept', params.dept);
  if (params.year) qs.set('year', params.year);
  if (params.q) qs.set('q', params.q);
  if (params.scope) qs.set('scope', params.scope);

  return fetch('api/courses?' + qs.toString()).then(handleFetchResponse);
}

function apiEvaluate(payload) {
  if (USE_MOCK) {
    return mockDelay(function () { return evaluateState(payload); });
  }

  return postJson('api/evaluate', payload);
}

/* 다음 학기 추천. mock 은 render-common.js 의 buildNextSemesterPlan() (개설 여부 정보 없음). */
function apiNextSemester(payload) {
  if (USE_MOCK) {
    return mockDelay(function () { return buildNextSemesterPlan(); });
  }

  return postJson('api/next-semester', payload);
}
