/* ============================================================
   render-electives.js — 06 취향 저격 교양 결과 (#electives)
   추천 계산은 elective.js(recommendElectives), 담은 과목은 state.electivePicks.
   ============================================================ */

var _electivesUi = { results: [] };

/* 라우트 진입 시: 로딩(예외 A)을 잠깐 보여준 뒤 추천을 계산해서 그린다.
   담기/빼기 같은 화면 안 변경은 drawElectives()만 다시 부른다. */
function renderElectives() {
  if (!state.surveyDone || !state.survey) {
    navigate('survey');
    return;
  }
  if (getUnmetElectiveAreas().length === 0) {
    navigate('survey'); // 설문 화면이 "추천할 교양 영역이 없어요" 안내를 보여준다
    return;
  }

  showLoading();
  setTimeout(function () {
    hideLoading();
    if (getCurrentRoute() !== 'electives') return;
    _electivesUi.results = recommendElectives(state.survey);
    pruneElectivePicks();
    drawElectives();
  }, 400);
}

/* 이미 이수 처리된 과목은 담은 목록에서 뺀다 */
function pruneElectivePicks() {
  var taken = {};
  state.courses.forEach(function (c) { taken[c.code] = true; });
  state.electivePicks = state.electivePicks.filter(function (code) { return !taken[code]; });
}

function drawElectives() {
  var el = document.getElementById('view-electives');
  el.innerHTML =
    '<div class="dashboard container">' +
      '<div class="dashboard-header">' +
        '<div class="dashboard-header__text">' +
          '<p class="survey-eyebrow">청록 여의주 찾기 · 결과</p>' +
          '<h1 class="dashboard-header__title">취향 저격 교양, 이렇게 골랐어요</h1>' +
        '</div>' +
        '<div class="dashboard-header__actions">' +
          '<button type="button" class="btn btn--outline" data-action="retake-survey">설문 다시 하기</button>' +
        '</div>' +
      '</div>' +
      buildElectiveConditionsHTML(state.survey) +
      '<div class="electives-grid">' +
        buildElectiveResultsHTML(_electivesUi.results) +
        buildElectivePicksPanelHTML() +
      '</div>' +
    '</div>';

  bindElectivesEvents();
}

/* ------------------------------------------------------------
   적용한 조건 칩 ("상관없어요"를 고른 문항은 칩 없음)
   ------------------------------------------------------------ */

var ELECTIVE_CONDITION_CHIPS = {
  q1: { assign: '과제 중심', exam: '시험 중심' },
  q2: { avoid: '팀플 과목 제외', like: '팀플 좋아요' },
  q3: { burden: '글쓰기 적게', ok: '글쓰기 괜찮음' },
  q4: { like: '출석 반영 좋아요', burden: '출석 반영 적게' },
  q6: { grade: '우선: 학점 잘 받기', learn: '우선: 새로운 배움', easy: '우선: 부담 적게' }
};

function buildElectiveConditionsHTML(answers) {
  var chips = [];
  function add(text, tone) { chips.push('<span class="cond-chip cond-chip--' + tone + '">' + text + '</span>'); }

  ['q1', 'q2', 'q3', 'q4'].forEach(function (id) {
    var text = ELECTIVE_CONDITION_CHIPS[id][answers[id]];
    if (text) add(text, id === 'q2' && answers.q2 === 'avoid' ? 'bad' : 'info');
  });
  (answers.q5 || []).forEach(function (key) {
    var t = ELECTIVE_TARGET_AREAS.filter(function (x) { return x.key === key; })[0];
    if (t) add('관심: ' + t.short, 'gen');
  });
  var q6Text = ELECTIVE_CONDITION_CHIPS.q6[answers.q6];
  if (q6Text) add(q6Text, 'wish');

  return (
    '<div class="electives-conds">' +
      '<span class="electives-conds__label">적용한 조건</span>' +
      chips.join('') +
    '</div>'
  );
}

/* ------------------------------------------------------------
   왼쪽 추천 표
   ------------------------------------------------------------ */

function buildElectiveResultsHTML(results) {
  if (results.length === 0) {
    return (
      '<section class="card electives-empty">' +
        '<p class="electives-empty__title">조건에 맞는 과목을 못 찾았어요. 조건을 조금 풀어볼까요?</p>' +
        '<button type="button" class="btn btn--primary" data-action="retake-survey">설문 다시 하기</button>' +
      '</section>'
    );
  }

  var rowsHTML = results.map(function (r, i) {
    var picked = state.electivePicks.indexOf(r.code) !== -1;
    var tagsHTML = r.tags.map(function (t) { return '<span class="reason-tag">' + t + '</span>'; }).join('');
    return (
      '<tr class="elective-row' + (i === 0 ? ' elective-row--top' : '') + '">' +
        '<td><span class="elective-rank' + (i === 0 ? ' elective-rank--top' : '') + '">' + (i + 1) + '</span></td>' +
        '<td>' +
          '<p class="elective-row__name">' + r.name + '</p>' +
          (tagsHTML ? '<div class="elective-row__tags">' + tagsHTML + '</div>' : '') +
        '</td>' +
        '<td class="elective-row__credit">' + r.credit + '학점</td>' +
        '<td><span class="kind-chip">' + r.target.kind + '</span></td>' +
        '<td>' +
          '<div class="match">' +
            '<div class="progress-bar progress-bar--general match__bar"><div class="progress-bar__fill" style="width:' + r.percent + '%"></div></div>' +
            '<strong class="match__pct">' + r.percent + '%</strong>' +
          '</div>' +
        '</td>' +
        '<td>' +
          '<button type="button" class="btn pick-btn' + (picked ? ' pick-btn--picked' : '') + '" data-pick-code="' + r.code + '" aria-pressed="' + picked + '">' +
            (picked ? '✓ 담김' : '담기') +
          '</button>' +
        '</td>' +
      '</tr>'
    );
  }).join('');

  return (
    '<section class="card electives-results">' +
      '<table class="elective-table">' +
        '<thead><tr><th>순위</th><th>과목명 · 잘 맞는 이유</th><th>학점</th><th>교양 종류</th><th>취향 일치</th><th>담기</th></tr></thead>' +
        '<tbody>' + rowsHTML + '</tbody>' +
      '</table>' +
      '<p class="electives-note">과목명은 실제 교양 과목 · 매칭률과 평가·팀플·출석 태그는 예시예요 (강의계획서 기준이라 분반마다 달라요) · 평가 정보가 있는 과목만 추천해요</p>' +
    '</section>'
  );
}

/* ------------------------------------------------------------
   오른쪽 "담은 교양" 패널
   ------------------------------------------------------------ */

function getPickedElectiveCourses() {
  var byCode = getActiveCatalogByCode();
  return state.electivePicks.map(function (code) { return byCode[code]; }).filter(function (c) { return c; });
}

function buildElectivePicksPanelHTML() {
  var picked = getPickedElectiveCourses();
  var credit = picked.reduce(function (s, c) { return s + c.credit; }, 0);

  var listHTML = picked.length === 0
    ? '<p class="picks-panel__empty">마음에 드는 과목을 담아보세요</p>'
    : '<ul class="picks-panel__list">' + picked.map(function (c) {
        return '<li class="picks-panel__row"><span>' + c.name + '</span><span class="picks-panel__credit">' + c.credit + '학점</span></li>';
      }).join('') + '</ul>';

  // 같은 영역 과목을 2개 이상 담으면 판정에서 1과목만 인정된다 (dedupBy: 'zone')
  var seen = {};
  var hasDup = picked.some(function (c) {
    var t = getElectiveTargetOf(c);
    if (!t) return false;
    if (seen[t.key]) return true;
    seen[t.key] = true;
    return false;
  });
  var dupHTML = hasDup ? '<p class="picks-panel__warn">같은 영역 과목은 1과목만 인정돼요</p>' : '';

  return (
    '<aside class="card picks-panel">' +
      '<div class="picks-panel__head">' +
        '<span class="orb orb--general survey-orb picks-panel__orb">' + SURVEY_BOOK_ICON + '</span>' +
        '<div>' +
          '<h2 class="picks-panel__title">담은 교양</h2>' +
          '<p class="picks-panel__sum">' + picked.length + '과목 · ' + credit + '학점</p>' +
        '</div>' +
      '</div>' +
      listHTML +
      dupHTML +
      '<div class="picks-panel__info">담으면 대시보드의 <strong>교양필수</strong> 부족 학점이 바로 줄어들어요.</div>' +
      '<button type="button" class="btn btn--primary picks-panel__btn" id="electives-apply-btn"' + (picked.length === 0 ? ' disabled' : '') + '>대시보드에 반영하기</button>' +
      '<button type="button" class="btn btn--outline picks-panel__btn" id="electives-timetable-btn">시간표에 넣어 겹치는지 보기</button>' +
    '</aside>'
  );
}

/* ------------------------------------------------------------
   이벤트
   ------------------------------------------------------------ */

function bindElectivesEvents() {
  var el = document.getElementById('view-electives');

  Array.prototype.forEach.call(el.querySelectorAll('[data-action="retake-survey"]'), function (btn) {
    btn.addEventListener('click', function () {
      resetSurvey();
      navigate('survey');
    });
  });

  Array.prototype.forEach.call(el.querySelectorAll('[data-pick-code]'), function (btn) {
    btn.addEventListener('click', function () {
      toggleElectivePick(btn.dataset.pickCode);
    });
  });

  document.getElementById('electives-apply-btn').addEventListener('click', applyElectivesToDashboard);

  document.getElementById('electives-timetable-btn').addEventListener('click', function () {
    if (ROUTES.indexOf('timetable') !== -1) navigate('timetable');
    else showToast('준비 중이에요');
  });
}

function toggleElectivePick(code) {
  var i = state.electivePicks.indexOf(code);
  if (i === -1) state.electivePicks.push(code);
  else state.electivePicks.splice(i, 1);
  drawElectives();
}

/* ------------------------------------------------------------
   대시보드에 반영하기
   ⚠️ 가정: 와이어프레임 문구대로 "반영 = 이수 처리"로 구현한다.
   나중에 "이번 학기 계획" 상태로 바뀔 수 있으니 이 동작은 이 함수 하나에만 둔다.
   ------------------------------------------------------------ */

function applyElectivesToDashboard() {
  var picked = getPickedElectiveCourses();
  if (picked.length === 0) return;

  picked.forEach(function (c) {
    if (!state.courses.some(function (x) { return x.code === c.code; })) {
      state.courses.push({ code: c.code, category: 'GEN_REQ' });
    }
  });
  state.electivePicks = [];

  var count = picked.length;
  function evaluateAndGo() {
    showLoading();
    apiEvaluate({ dept: state.dept, year: state.year, courses: state.courses, certs: state.certs })
      .then(function (result) {
        state.result = result;
        hideLoading();
        navigate('dashboard');
        showToast('교양 ' + count + '과목을 대시보드에 반영했어요');
      })
      .catch(function () {
        hideLoading();
        showErrorOverlay(evaluateAndGo);
      });
  }
  evaluateAndGo();
}
