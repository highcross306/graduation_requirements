/* ============================================================
   api.js — 모든 서버 호출은 이 파일에만 모아둔다.
   USE_MOCK = true  → mock.js의 함수를 사용 (지연 500ms 포함)
   USE_MOCK = false → 아래 필드 이름 그대로 실제 fetch(상대경로) 사용

   ------------------------------------------------------------
   API 형식 (백엔드와 확정 전 가정안 — 바뀌면 이 주석과 아래 코드만 고치면 됨)

   GET  api/courses?dept=ai&year=2025        → 교과과정 과목 목록 (범주별)
   GET  api/courses?q=데이터&scope=all        → 직접 검색 결과

   POST api/evaluate
     요청: { dept, year, courses: [{ code, category }], certs: [...] }
     응답:
     {
       "summary": { "satisfiedCount": 1, "totalCount": 4, "percent": 25 },
       "cards": [
         { "key": "total",   "name": "총학점",   "satisfied": false, "earned": 12, "required": 130,
           "breakdown": { "major": 5, "general": 7, "free": 0 } },
         { "key": "major",   "name": "전공필수", "satisfied": false, "earnedCourses": 2, "requiredCourses": 12,
           "earned": 5, "required": 36,
           "remaining": [ { "code": "AIE1002", "name": "객체지향프로그래밍2", "credit": 3, "grade": 1 } ] },
         { "key": "general", "name": "교양필수", "satisfied": false, "earned": 7, "required": 39,
           "areas": [ { "name": "중점교양", "desc": "크로스오버", "earned": 2, "required": 4 } ] },
         { "key": "cert",    "name": "졸업인증", "satisfied": true,
           "options": [ { "id": "toeic", "label": "TOEIC 700점 이상" } ], "rule": "one-of" }
       ]
     }
   ------------------------------------------------------------ */

var USE_MOCK = true;

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

  return fetch('api/evaluate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  }).then(handleFetchResponse);
}
