/* ============================================================
   render-common.js — 화면 여러 곳에서 재사용하는 조각들
   (여의주 구슬, 130학점 누적 막대, 약어 미니카드, 재판정 헬퍼)
   ============================================================ */

/* 130학점 = 교양필수 + 전공필수(전공기초 포함) + 전공선택 + 일반선택 (교양선택은 별도 기준 없음이라 막대에는 없음) */
function getCreditSegments() {
  var credits = getActiveRequirements().credits;
  return [
    { key: 'general', label: '교양필수', abbr: '교필', credit: credits.general, color: 'var(--orb-general)' },
    { key: 'major', label: '전공필수', abbr: '전필', credit: credits.major, color: 'var(--primary)' },
    { key: 'majorElective', label: '전공선택', abbr: '전선', credit: credits.majorElective, color: 'var(--orb-major)' },
    { key: 'freeElective', label: '일반선택', abbr: '일선', credit: credits.freeElective, color: 'var(--orb-off)' }
  ];
}

var CATEGORY_MINI_INFO = [
  { abbr: '교필', label: '교양필수', desc: '영역 5개를 각각 채워야 해요', color: 'var(--orb-general)' },
  { abbr: '전필', label: '전공필수', desc: '정해진 과목, 하나라도 빠지면 미충족', color: 'var(--primary)' },
  { abbr: '전선', label: '전공선택', desc: '전공 중 골라서 학점만 채우면 OK', color: 'var(--orb-major)' },
  { abbr: '일선', label: '일반선택', desc: '타과·교양 등 무엇이든 OK', color: 'var(--orb-off)' },
  { abbr: '교선', label: '교양선택', desc: '필수 외 교양 · 인정 기준 확인 필요', color: 'var(--text-sub)' }
];

function orbSpan(key, extraClass) {
  return '<span class="orb orb--' + key + (extraClass ? ' ' + extraClass : '') + '"></span>';
}

function findCard(result, key) {
  var list = result.cards.filter(function (c) { return c.key === key; });
  return list.length ? list[0] : null;
}

function buildStackedCreditBarHTML() {
  var total = getActiveRequirements().totalRequired;
  var segments = getCreditSegments();
  var segsHTML = segments.map(function (seg) {
    var widthPct = (seg.credit / total * 100).toFixed(2);
    return '<div class="stacked-bar__seg" style="width:' + widthPct + '%; background:' + seg.color + ';" title="' + seg.label + ' ' + seg.credit + '학점"></div>';
  }).join('');
  var legendHTML = segments.map(function (seg) {
    return '<span class="stacked-bar__legend-item"><span class="stacked-bar__dot" style="background:' + seg.color + '"></span>' + seg.label + ' ' + seg.credit + '</span>';
  }).join('');
  return '<div class="stacked-bar">' + segsHTML + '</div><div class="stacked-bar__legend">' + legendHTML + '</div>';
}

function buildCategoryMiniCardsHTML() {
  var cardsHTML = CATEGORY_MINI_INFO.map(function (info) {
    return (
      '<div class="mini-card">' +
        '<span class="mini-card__abbr" style="background:' + info.color + '">' + info.abbr + '</span>' +
        '<p class="mini-card__desc"><strong>' + info.label + '</strong> · ' + info.desc + '</p>' +
      '</div>'
    );
  }).join('');
  return '<div class="mini-cards">' + cardsHTML + '</div>';
}

function buildOverviewSectionHTML() {
  return (
    '<div class="card overview-card">' +
      '<div class="overview-card__head">' +
        '<div>' +
          '<h3 class="overview-card__title">전필? 교필? 한눈에 보기</h3>' +
          '<p class="overview-card__hint">졸업까지 130학점은 이렇게 나뉘어요 · 필수는 과목·영역이 정해져 있고, 선택은 학점만 채우면 돼요</p>' +
        '</div>' +
        '<a href="#guide" class="overview-card__link">전체 가이드 보기 →</a>' +
      '</div>' +
      buildStackedCreditBarHTML() +
      buildCategoryMiniCardsHTML() +
    '</div>'
  );
}

/* ------------------------------------------------------------
   남은 학기 계산 (총학점 카드에서 사용)
   가정: 3~8월은 그 해 1학기, 9월~다음해 2월은 2학기로 본다.
   입학연도 1학기부터 오늘이 속한 학기(진행 중 포함)까지를 "지난 학기"로 센다.
   ------------------------------------------------------------ */

function computePastSemesters(admissionYear) {
  var now = new Date();
  var y = now.getFullYear();
  var m = now.getMonth() + 1;
  var ay, sem;
  if (m >= 3 && m <= 8) {
    ay = y; sem = 1;
  } else if (m >= 9) {
    ay = y; sem = 2;
  } else {
    ay = y - 1; sem = 2;
  }
  var elapsed = (ay - admissionYear) * 2 + sem;
  if (elapsed < 0) elapsed = 0;
  if (elapsed > 8) elapsed = 8;
  return elapsed;
}

/* ------------------------------------------------------------
   다음 학기 추천 — 전공필수(전공기초 포함) 과목의 편성표 권장 학년·학기를
   "지난 학기"(대시보드 남은 학기 계산과 같은 computePastSemesters)와 비교해
   - 놓치면 1년 밀려요: 권장 학기가 다음 학기와 같거나 더 이전인 과목
   - 천천히 해도 괜찮아요: 그중 바로 다음 학년에 권장되는 과목만 (목록이 너무 길어지지 않게)
   로 나눈다. (계열교양이었던 일반수학·통계학은 실제 데이터에서 전공기초로
   전공필수에 이미 합쳐져 있어서, 후보 = MAJOR_REQ 전체가 곧 "전공필수+계열교양"이다.)
   ------------------------------------------------------------ */

function semesterPosition(year, sem) {
  return (year - 1) * 2 + sem;
}

function positionToYearSem(position) {
  var year = Math.ceil(position / 2);
  var sem = position % 2 === 0 ? 2 : 1;
  return { year: year, sem: sem };
}

function buildNextSemesterPlanItem(c, recPosition, isUrgent, takenSet, byCode) {
  var allPrereqTaken = c.prereq && c.prereq.length > 0 && c.prereq.every(function (p) { return takenSet[p]; });
  var recSemText = c.recSem.join('·');
  var reason;
  if (isUrgent && allPrereqTaken) {
    var prereqNames = c.prereq.map(function (p) { return byCode[p] ? byCode[p].name : p; }).join(', ');
    reason = prereqNames + ' 다음 과목이고 ' + c.recYear + '학년 과목(' + c.code + ')이에요.';
  } else if (isUrgent) {
    reason = '편성표 권장 학기가 ' + c.recYear + '학년 ' + recSemText + '학기예요.';
  } else if (c.category === 'MAJOR_REQ') {
    reason = c.recYear + '학년 과목(' + c.code + ')이라 다음 학년에 들어도 돼요.';
  } else {
    reason = '편성표 권장 학기가 ' + c.recYear + '학년 ' + recSemText + '학기예요.';
  }
  return {
    code: c.code, name: c.name, credit: c.credit, category: c.category, grade: c.recYear,
    recPosition: recPosition, reason: reason, estimated: !!c.recEstimated
  };
}

function buildNextSemesterPlan(pastElapsed) {
  if (pastElapsed == null) pastElapsed = computePastSemesters(state.year);
  var nextPosition = pastElapsed + 1;
  var past = positionToYearSem(pastElapsed);
  var next = positionToYearSem(nextPosition);

  var program = getActiveProgram();
  var majorCourses = program.courses.filter(function (c) { return c.category === 'MAJOR_REQ'; });
  var byCode = {};
  majorCourses.forEach(function (c) { byCode[c.code] = c; });

  var takenSet = {};
  state.courses.forEach(function (c) { takenSet[c.code] = true; });

  var candidates = majorCourses.filter(function (c) {
    return !takenSet[c.code] && c.recYear != null && c.recSem && c.recSem.length > 0;
  });

  var urgent = [];
  var relaxed = [];

  candidates.forEach(function (c) {
    var recPosition = Math.min.apply(null, c.recSem.map(function (s) { return semesterPosition(c.recYear, s); }));
    if (recPosition <= nextPosition) {
      urgent.push(buildNextSemesterPlanItem(c, recPosition, true, takenSet, byCode));
    } else if (c.recYear === next.year + 1) {
      relaxed.push(buildNextSemesterPlanItem(c, recPosition, false, takenSet, byCode));
    }
  });

  urgent.sort(function (a, b) { return a.recPosition - b.recPosition; });
  relaxed.sort(function (a, b) { return a.recPosition - b.recPosition; });

  return {
    pastYear: past.year, pastSem: past.sem,
    nextYear: next.year, nextSem: next.sem,
    urgent: urgent, relaxed: relaxed
  };
}

/* ------------------------------------------------------------
   과목/졸업인증 변경 후 다시 판정
   ------------------------------------------------------------ */

function refreshResult(onDone) {
  return apiEvaluate({ dept: state.dept, year: state.year, courses: state.courses, certs: state.certs })
    .then(function (result) {
      state.result = result;
      if (onDone) onDone();
    })
    .catch(function () {
      showErrorOverlay(function () { refreshResult(onDone); });
    });
}
