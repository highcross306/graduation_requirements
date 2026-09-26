/* ============================================================
   elective.js — 교양 추천 (05 설문 · 06 결과) 계산 로직
   백엔드에 추천 API가 없어서 FE에서 계산한다.

   추천 대상 = 교양필수 중 학생이 골라서 듣는 영역
   - 핵심교양 1·2·4영역 (6영역은 GED6009 지정 과목이라 제외)
   - SW·AI
   - 창의
   충족 여부는 mock.js 판정과 같은 규칙(dedupBy: 'zone' → 영역/트랙당 1과목)으로 본다.
   ============================================================ */

/* 축별 가중치 (임의값 — 여기만 고치면 추천 순위가 바뀐다) */
var ELECTIVE_WEIGHTS = {
  base: { eval: 1, team: 1, writing: 1, attendance: 1, interest: 1.5 },
  // Q6(이번 학기 우선)에 따라 기본 가중치에 곱한다
  priority: {
    grade: { eval: 1.5, attendance: 1.5 },   // 학점 잘 받는 게 우선
    learn: { interest: 2 },                  // 새로운 걸 배우는 게 우선
    easy: { writing: 1.5, team: 1.5 }        // 부담 적고 편한 게 우선
  },
  interestMiss: 0.3,  // Q5에서 고르지 않은 영역 과목의 관심 점수
  teamMiss: 0.3,      // Q2 "오히려 팀플이 좋아요"인데 팀플이 없는 과목
  minPercent: 40,     // 화면에 표시하는 최소 취향 일치 %
  maxResults: 6
};

var ELECTIVE_TARGET_AREAS = [
  { key: 'core1', area: 'core', zone: '1', label: '1영역 인간·가치·공존', short: '인간·가치·공존', kind: '핵심교양 1영역' },
  { key: 'core2', area: 'core', zone: '2', label: '2영역 역사·사상·문화', short: '역사·사상·문화', kind: '핵심교양 2영역' },
  { key: 'core4', area: 'core', zone: '4', label: '4영역 사회·제도·세계', short: '사회·제도·세계', kind: '핵심교양 4영역' },
  { key: 'swai', area: 'swai', zone: 'swai', label: 'SW·AI', short: 'SW·AI', kind: 'SW·AI' },
  { key: 'creative', area: 'creative', zone: 'creative', label: '창의', short: '창의', kind: '창의' }
];

/* 과목(카탈로그 객체)이 어느 추천 대상 영역에 속하는지. 대상이 아니면 null */
function getElectiveTargetOf(course) {
  if (!course || course.category !== 'GEN_REQ') return null;
  var zone = course.zone == null ? course.code : String(course.zone);
  var list = ELECTIVE_TARGET_AREAS.filter(function (t) { return t.area === course.area && t.zone === zone; });
  return list.length ? list[0] : null;
}

/* 이미 이수한 교양필수의 "영역|zone" 목록.
   직접 검색에서 이수구분을 바꿔 담은 과목은 판정과 똑같이 그 구분(c.category)을 따른다. */
function getTakenGeneralZones() {
  var byCode = getActiveCatalogByCode();
  var taken = {};
  state.courses.forEach(function (c) {
    var cat = byCode[c.code];
    if (!cat) return;
    if ((c.category || cat.category) !== 'GEN_REQ') return;
    var zone = cat.zone == null ? cat.code : String(cat.zone);
    taken[cat.area + '|' + zone] = true;
  });
  return taken;
}

/* 아직 못 채운 추천 대상 영역 목록 (ELECTIVE_TARGET_AREAS 순서 유지) */
function getUnmetElectiveAreas() {
  var areaKeys = {};
  getActiveRequirements().generalAreas.forEach(function (a) { areaKeys[a.key] = true; });
  var taken = getTakenGeneralZones();

  return ELECTIVE_TARGET_AREAS.filter(function (t) {
    if (!areaKeys[t.area]) return false; // 이 학과·학번 요건에 없는 영역
    return !taken[t.area + '|' + t.zone];
  });
}

/* ------------------------------------------------------------
   추천 계산
   answers = state.survey 형태 { q1, q2, q3, q4, q5: [...], q6 }
   반환: 점수 높은 순 최대 ELECTIVE_WEIGHTS.maxResults개
     [{ code, name, credit, target, percent, tags }]
   ------------------------------------------------------------ */

function recommendElectives(answers) {
  var unmet = {};
  getUnmetElectiveAreas().forEach(function (t) { unmet[t.key] = true; });
  var takenCodes = {};
  state.courses.forEach(function (c) { takenCodes[c.code] = true; });

  var candidates = getActiveCatalog().filter(function (c) {
    var attrs = ELECTIVE_ATTRS[c.code];
    if (!attrs) return false;                          // 1. 속성 데이터가 있는 과목만
    if (takenCodes[c.code]) return false;              // 2. 아직 이수하지 않은 과목만
    var target = getElectiveTargetOf(c);
    if (!target || !unmet[target.key]) return false;   // 3. 미충족 추천 대상 영역만
    if (answers.q2 === 'avoid' && attrs.team) return false; // 4. 팀플 피하기 = 필터
    return true;
  });

  var weights = getElectiveWeights(answers.q6);

  var results = candidates.map(function (c) {
    var attrs = ELECTIVE_ATTRS[c.code];
    var target = getElectiveTargetOf(c);
    var axes = scoreElectiveAxes(attrs, target, answers);
    var sumW = 0;
    var sum = 0;
    Object.keys(axes).forEach(function (axis) {
      sumW += weights[axis];
      sum += weights[axis] * axes[axis];
    });
    // 모든 축이 "상관없어요"면 비교할 기준이 없으니 중간값으로 둔다
    var score = sumW > 0 ? sum / sumW : 0.5;
    return {
      code: c.code,
      name: c.name,
      credit: c.credit,
      target: target,
      score: score,
      percent: Math.max(ELECTIVE_WEIGHTS.minPercent, Math.round(score * 100)),
      tags: buildElectiveReasonTags(attrs, answers)
    };
  });

  var order = ELECTIVE_TARGET_AREAS.map(function (t) { return t.key; });
  results.sort(function (a, b) {
    if (b.score !== a.score) return b.score - a.score;
    var byArea = order.indexOf(a.target.key) - order.indexOf(b.target.key);
    return byArea !== 0 ? byArea : (a.code < b.code ? -1 : 1);
  });

  return results.slice(0, ELECTIVE_WEIGHTS.maxResults);
}

function getElectiveWeights(q6) {
  var w = {};
  var base = ELECTIVE_WEIGHTS.base;
  var mult = ELECTIVE_WEIGHTS.priority[q6] || {};
  Object.keys(base).forEach(function (axis) { w[axis] = base[axis] * (mult[axis] || 1); });
  return w;
}

/* 축별 0~1 점수. "상관없어요"(또는 계산에서 빼는 답)인 축은 결과에 넣지 않는다. */
function scoreElectiveAxes(attrs, target, answers) {
  var axes = {};
  var attendance = Math.min(attrs.attendance / 20, 1);

  if (answers.q1 === 'assign') axes.eval = attrs.assignRatio / 100;
  else if (answers.q1 === 'exam') axes.eval = attrs.examRatio / 100;

  // Q2 ①(피하기)은 필터, ②(괜찮아요)는 축 제외
  if (answers.q2 === 'like') axes.team = attrs.team ? 1 : ELECTIVE_WEIGHTS.teamMiss;

  if (answers.q3 === 'burden') axes.writing = 1 - attrs.writing / 2;
  else if (answers.q3 === 'ok') axes.writing = 0.5 + attrs.writing / 4;

  if (answers.q4 === 'like') axes.attendance = attendance;
  else if (answers.q4 === 'burden') axes.attendance = 1 - attendance;

  var q5 = answers.q5 || [];
  if (q5.length > 0 && q5.indexOf(SURVEY_Q5_ALL) === -1) {
    axes.interest = q5.indexOf(target.key) !== -1 ? 1 : ELECTIVE_WEIGHTS.interestMiss;
  }

  return axes;
}

/* "잘 맞는 이유" 태그 — 사용자의 답과 맞아떨어지는 속성만, 최대 3개 */
function buildElectiveReasonTags(attrs, answers) {
  var tags = [];

  if (answers.q1 === 'exam' && attrs.examRatio > attrs.assignRatio) tags.push('시험 중심');
  if (answers.q1 === 'assign' && attrs.assignRatio > attrs.examRatio) tags.push('과제 중심');

  if (answers.q2 === 'avoid' && !attrs.team) tags.push('팀플 없음');
  if (answers.q2 === 'like' && attrs.team) tags.push('팀플 있음');

  if (answers.q3 === 'burden' && attrs.writing === 0) tags.push('글쓰기 적음');
  if (answers.q3 === 'ok' && attrs.writing >= 1) tags.push(attrs.writing === 2 ? '글쓰기 많음' : '글쓰기 보통');

  if (answers.q4 === 'like' && attrs.attendance >= 10) tags.push('출석 ' + attrs.attendance + '%');
  if (answers.q4 === 'burden' && attrs.attendance <= 10) tags.push('출석 ' + attrs.attendance + '%');

  return tags.slice(0, 3);
}