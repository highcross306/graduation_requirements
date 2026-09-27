/* ============================================================
   mock.js — 백엔드 연결 전 임시 판정 로직
   과목·요건 원본 데이터는 curriculum-data.js(자동 생성, 실제 커리큘럼
   데이터 기반)에서 가져온다. 이 파일은 그 데이터를 가지고 판정하는
   로직만 담당한다.

   백엔드(Servlet, api/courses, api/evaluate)가 준비되면
   이 파일을 지우고 api.js의 USE_MOCK을 false로 바꾸면 된다.

   범주 코드
   - MAJOR_REQ  전공필수(전공기초 포함)
   - MAJOR_ELEC 전공선택
   - GEN_REQ    교양필수 (area 필드로 세부 영역 구분)
   - GEN_ELEC   교양선택
   - FREE_ELEC  일반선택(타과 포함)

   generalAreas[].dedupBy
   - 'code'  같은 영역 안의 과목은 전부 학점에 더한다 (지정 과목 전부 이수해야 하는 영역)
   - 'zone'  같은 zone(영역/트랙)에서는 첫 과목 학점만 인정한다 (영역·트랙 내 택1)
   ============================================================ */

var DEPT_LABELS = {};
CURRICULUM_DEPTS.forEach(function (d) { DEPT_LABELS[d.code] = d.label; });

/* ------------------------------------------------------------
   현재 선택된 학과·입학연도의 프로그램(요건 + 과목 카탈로그) 조회
   ------------------------------------------------------------ */

function getActiveProgram() {
  var dept = (typeof state !== 'undefined' && state.dept) || CURRICULUM_DEPTS[0].code;
  var year = (typeof state !== 'undefined' && state.year) || CURRICULUM_YEARS[0];
  return (
    CURRICULUM_DATA[dept + '_' + year] ||
    CURRICULUM_DATA[CURRICULUM_DEPTS[0].code + '_' + CURRICULUM_YEARS[0]]
  );
}

function getActiveCatalog() {
  return getActiveProgram().courses;
}

function getActiveCatalogByCode() {
  var map = {};
  getActiveCatalog().forEach(function (c) { map[c.code] = c; });
  return map;
}

function getActiveRequirements() {
  return getActiveProgram().requirements;
}

/* ------------------------------------------------------------
   과목 조회 (03 모달 탭1 / 탭2 에서 사용)
   ------------------------------------------------------------ */

function mockGetCourses(params) {
  params = params || {};
  var catalog = getActiveCatalog();
  var list;

  if (params.scope === 'all' || params.q) {
    // 탭2 직접 검색: 이름 부분일치 또는 학수번호 일치
    var q = (params.q || '').trim();
    list = catalog.filter(function (c) {
      if (!q) return true;
      return c.name.indexOf(q) !== -1 || c.code.toUpperCase().indexOf(q.toUpperCase()) !== -1;
    });
  } else {
    // 탭1 교과과정: 이 학과/학번의 교과과정에 있는 과목만
    list = catalog.filter(function (c) { return c.curriculum; });
  }

  return list;
}

/* ------------------------------------------------------------
   mock 판정
   과목을 담을 때마다 실제로 다시 계산되어야 시연이 가능하다.

   규칙
   - 총학점: 담은 과목 학점의 합 >= totalRequired
   - 전공필수: 지정된 과목(전공필수+전공기초)을 모두 이수해야 충족
   - 교양필수: 영역(중점·기초·핵심·SW·AI·창의)이 각각 필요 학점 이상이어야 충족
     · dedupBy: 'zone'인 영역(핵심교양의 1·2·4·6영역, SW·AI, 창의)은 그 영역/트랙에서
       몇 과목을 담든 첫 과목 학점만 인정한다 (영역·트랙 내 택1).
   - 졸업인증: certs 중 하나라도 있으면 충족
   - 전공선택/교양선택/일반선택은 총학점에만 더하고 여의주 판정에는 영향 없음
   - 재수강, F학점은 다루지 않음
   ------------------------------------------------------------ */

function evaluateState(payload) {
  payload = payload || {};
  var courses = payload.courses || [];
  var certs = payload.certs || [];
  var dept = payload.dept || (typeof state !== 'undefined' && state.dept);
  var year = payload.year || (typeof state !== 'undefined' && state.year);

  var program = (dept && year && CURRICULUM_DATA[dept + '_' + year]) || getActiveProgram();
  var req = program.requirements;
  var catalogByCode = {};
  program.courses.forEach(function (c) { catalogByCode[c.code] = c; });

  var taken = courses.map(function (c) {
    var cat = catalogByCode[c.code];
    if (!cat) return null;
    return {
      code: c.code,
      name: cat.name,
      credit: cat.credit,
      // 직접 검색으로 담은 과목은 모달에서 고른 이수구분(category)이 있으면 그걸 따르고,
      // 교과과정 과목은 카탈로그의 범주를 그대로 쓴다.
      category: c.category || cat.category,
      area: cat.area,
      zone: cat.zone,
      grade: cat.grade
    };
  }).filter(function (x) { return x; });

  var totalCredit = taken.reduce(function (sum, c) { return sum + c.credit; }, 0);

  /* 전공필수(+전공기초) */
  var majorTaken = taken.filter(function (c) { return c.category === 'MAJOR_REQ'; });
  var majorCredit = majorTaken.reduce(function (s, c) { return s + c.credit; }, 0);
  var majorRequiredList = program.courses.filter(function (c) { return c.category === 'MAJOR_REQ'; });
  var majorTakenCodes = {};
  majorTaken.forEach(function (c) { majorTakenCodes[c.code] = true; });
  var majorTakenCount = Object.keys(majorTakenCodes).length;
  var majorRemaining = majorRequiredList
    .filter(function (c) { return !majorTakenCodes[c.code]; })
    .map(function (c) { return { code: c.code, name: c.name, credit: c.credit, grade: c.grade }; });

  /* 교양필수 */
  var genTaken = taken.filter(function (c) { return c.category === 'GEN_REQ'; });
  var areas = req.generalAreas.map(function (def) {
    var inArea = genTaken.filter(function (c) { return c.area === def.key; });
    var earned = 0;
    if (def.dedupBy === 'zone') {
      var zoneCredit = {};
      inArea.forEach(function (c) {
        var z = c.zone == null ? c.code : c.zone;
        if (!(z in zoneCredit)) zoneCredit[z] = c.credit; // 같은 zone은 첫 과목만 인정
      });
      Object.keys(zoneCredit).forEach(function (z) { earned += zoneCredit[z]; });
    } else {
      var seen = {};
      inArea.forEach(function (c) {
        if (!seen[c.code]) { seen[c.code] = true; earned += c.credit; }
      });
    }
    return {
      key: def.key,
      name: def.name,
      desc: def.desc,
      earned: earned,
      required: def.required,
      satisfied: earned >= def.required
    };
  });
  var generalEarned = areas.reduce(function (s, a) { return s + a.earned; }, 0);

  /* 졸업인증 */
  var certSatisfied = certs.length > 0;

  /* 총학점 구성: 전공(전공필수+전공선택) / 교양(교양필수+교양선택) / 일반선택 */
  function sumCredit(categories) {
    return taken
      .filter(function (c) { return categories.indexOf(c.category) !== -1; })
      .reduce(function (s, c) { return s + c.credit; }, 0);
  }
  var breakdownMajor = sumCredit(['MAJOR_REQ', 'MAJOR_ELEC']);
  var breakdownGeneral = sumCredit(['GEN_REQ', 'GEN_ELEC']);
  var freeCredit = sumCredit(['FREE_ELEC']);

  var cards = [
    {
      key: 'total',
      name: '총학점',
      satisfied: totalCredit >= req.totalRequired,
      earned: totalCredit,
      required: req.totalRequired,
      breakdown: { major: breakdownMajor, general: breakdownGeneral, free: freeCredit }
    },
    {
      key: 'major',
      name: '전공필수',
      satisfied: majorTakenCount >= req.majorRequiredCount,
      earnedCourses: majorTakenCount,
      requiredCourses: req.majorRequiredCount,
      earned: majorCredit,
      required: req.credits.major,
      remaining: majorRemaining
    },
    {
      key: 'general',
      name: '교양필수',
      satisfied: areas.every(function (a) { return a.satisfied; }),
      earned: generalEarned,
      required: req.credits.general,
      areas: areas
    },
    {
      key: 'cert',
      name: '졸업인증',
      satisfied: certSatisfied,
      options: req.certOptions,
      rule: 'one-of'
    }
  ];

  var satisfiedCount = cards.filter(function (c) { return c.satisfied; }).length;

  return {
    summary: {
      satisfiedCount: satisfiedCount,
      totalCount: 4,
      percent: Math.round((satisfiedCount / 4) * 100)
    },
    cards: cards
  };
}

/* ------------------------------------------------------------
   개발용: 콘솔에서 devFillAll() 호출 시 예외 E(모든 요건 충족)를 재현
   (현재 선택된 학과·입학연도 기준)
   ------------------------------------------------------------ */

function devFillAll() {
  var program = getActiveProgram();
  var req = program.requirements;

  var majorReq = program.courses.filter(function (c) { return c.category === 'MAJOR_REQ'; });
  var genReq = program.courses.filter(function (c) { return c.category === 'GEN_REQ'; });

  var genPicked = [];
  req.generalAreas.forEach(function (areaDef) {
    var inArea = genReq.filter(function (c) { return c.area === areaDef.key; });
    if (areaDef.dedupBy === 'zone') {
      var seenZone = {};
      inArea.forEach(function (c) {
        var z = c.zone == null ? c.code : c.zone;
        if (!seenZone[z]) { seenZone[z] = true; genPicked.push(c); }
      });
    } else {
      genPicked = genPicked.concat(inArea); // 지정 과목 전부 이수해야 하는 영역은 전부 담는다
    }
  });

  var courses = majorReq.concat(genPicked).map(function (c) { return { code: c.code, category: c.category }; });

  var creditSoFar = courses.reduce(function (sum, c) {
    var cat = program.courses.filter(function (x) { return x.code === c.code; })[0];
    return sum + (cat ? cat.credit : 0);
  }, 0);

  // 총학점을 못 채울 수 있으니 부족분은 가짜 일반선택 과목 하나로 채운다.
  var shortfall = Math.max(0, req.totalRequired - creditSoFar);
  if (shortfall > 0) {
    var fillCode = 'FILL9999';
    if (!program.courses.some(function (c) { return c.code === fillCode; })) {
      program.courses.push({
        code: fillCode, name: '자유선택 채움(임시)', credit: shortfall,
        category: 'FREE_ELEC', curriculum: false, offeringDept: 'gen', offeringLabel: '교양'
      });
    }
    courses.push({ code: fillCode, category: 'FREE_ELEC' });
  }

  state.courses = courses;
  state.certs = req.certOptions.length ? [req.certOptions[0].id] : [];
  state.result = evaluateState({ dept: state.dept, year: state.year, courses: state.courses, certs: state.certs });
  if (typeof renderDashboard === 'function') renderDashboard();
  console.log('devFillAll() 적용됨 — 모든 요건 충족 상태로 전환했어요.', state.result);
}
