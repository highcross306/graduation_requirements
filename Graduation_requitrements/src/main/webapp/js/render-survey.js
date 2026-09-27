/* ============================================================
   render-survey.js — 05 교양 취향 테스트 (#survey)
   답은 state.survey = { q1, q2, q3, q4, q5: [...], q6 } 에 저장한다.
   Q5(관심 주제)는 아직 못 채운 추천 대상 영역만 선택지로 보여준다 (복수 선택).
   ============================================================ */

var SURVEY_Q5_ALL = 'all'; // Q5 "다 좋아요"

var SURVEY_QUESTIONS = [
  {
    id: 'q1', nav: '평가 방식',
    title: '어떤 평가 방식이 더 편한가요?',
    sub: '과제 비율과 시험 비율로 과목을 비교해요.',
    options: [
      { value: 'assign', label: '과제 중심 (보고서, 프로젝트)' },
      { value: 'exam', label: '시험 중심 (중간·기말고사)' },
      { value: 'any', label: '상관없어요' }
    ]
  },
  {
    id: 'q2', nav: '조별과제',
    title: '조별과제는 어떤가요?',
    sub: '조별과제·발표가 있는지 봐요.',
    options: [
      { value: 'avoid', label: '팀플이 있으면 피하고 싶어요' },
      { value: 'ok', label: '있어도 괜찮아요' },
      { value: 'like', label: '오히려 팀플이 좋아요' }
    ]
  },
  {
    id: 'q3', nav: '글쓰기 분량',
    title: '글쓰기 분량이 많은 수업은?',
    sub: '보고서·에세이 과제 비중을 봐요.',
    options: [
      { value: 'burden', label: '부담돼요' },
      { value: 'ok', label: '괜찮아요' },
      { value: 'any', label: '상관없어요' }
    ]
  },
  {
    id: 'q4', nav: '출석 반영',
    title: '출석이 성적에 크게 반영되는 수업은?',
    sub: '출석 점수 비율을 봐요.',
    options: [
      { value: 'like', label: '오히려 좋아요' },
      { value: 'burden', label: '부담돼요' },
      { value: 'any', label: '상관없어요' }
    ]
  },
  {
    id: 'q5', nav: '관심 주제', multi: true,
    title: '관심 있는 주제를 모두 골라주세요',
    sub: '아직 못 채운 영역만 보여드려요. 여러 개 골라도 돼요.',
    options: null // 미충족 영역에서 매번 만든다 (getSurveyOptions)
  },
  {
    id: 'q6', nav: '이번 학기 우선',
    title: '이번 학기 교양은 어떤 쪽이 좋으세요?',
    sub: '위 기준 중 무엇을 더 중요하게 볼지 정해요.',
    options: [
      { value: 'grade', label: '학점 잘 받는 게 우선' },
      { value: 'learn', label: '새로운 걸 배우는 게 우선' },
      { value: 'easy', label: '부담 적고 편한 게 우선' }
    ]
  }
];

var _surveyUi = { step: 0 };

function createEmptySurvey() {
  return { q1: null, q2: null, q3: null, q4: null, q5: [], q6: null };
}

/* 설문 다시 하기: 답을 비우고 Q1부터 (06 결과 화면에서도 사용) */
function resetSurvey() {
  state.survey = createEmptySurvey();
  state.surveyDone = false;
  _surveyUi.step = 0;
}

function getSurveyOptions(q) {
  if (!q.multi) return q.options;
  return getUnmetElectiveAreas()
    .map(function (t) { return { value: t.key, label: t.label }; })
    .concat([{ value: SURVEY_Q5_ALL, label: '다 좋아요' }]);
}

/* 이수 상태가 바뀌어 이미 충족된 영역이 Q5 답에 남아 있으면 뺀다 */
function pruneSurveyQ5() {
  var valid = {};
  getSurveyOptions(SURVEY_QUESTIONS[4]).forEach(function (o) { valid[o.value] = true; });
  state.survey.q5 = state.survey.q5.filter(function (v) { return valid[v]; });
}

function isSurveyAnswered(q) {
  var v = state.survey[q.id];
  return q.multi ? v.length > 0 : v != null;
}

function renderSurvey() {
  var el = document.getElementById('view-survey');
  if (!state.survey) state.survey = createEmptySurvey();

  if (getUnmetElectiveAreas().length === 0) {
    el.innerHTML =
      '<div class="dashboard container">' +
        '<a href="#dashboard" class="guide-back">← 대시보드로</a>' +
        '<div class="card survey-done-card">' +
          '<span class="orb orb--general survey-orb survey-done-card__orb">' + SURVEY_BOOK_ICON + '</span>' +
          '<p class="survey-done-card__title">추천할 교양 영역이 없어요. 골라 듣는 교양 영역을 모두 채웠어요 🎉</p>' +
          '<button type="button" class="btn btn--primary" id="survey-go-dashboard-btn">대시보드로</button>' +
        '</div>' +
      '</div>';
    document.getElementById('survey-go-dashboard-btn').addEventListener('click', function () { navigate('dashboard'); });
    return;
  }

  pruneSurveyQ5();
  var step = _surveyUi.step;

  el.innerHTML =
    '<div class="dashboard container">' +
      '<a href="#dashboard" class="guide-back">← 대시보드로</a>' +
      '<div class="survey-grid">' +
        buildSurveyNavHTML(step) +
        buildSurveyQuestionHTML(step) +
      '</div>' +
    '</div>';

  bindSurveyEvents();
}

/* 여의주 구슬 안의 책 아이콘 */
var SURVEY_BOOK_ICON =
  '<svg class="survey-orb__icon" viewBox="0 0 24 24" aria-hidden="true">' +
    '<path d="M4 5.5C4 4.7 4.7 4 5.5 4H11v15H5.5A1.5 1.5 0 0 0 4 20.5z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>' +
    '<path d="M20 5.5c0-.8-.7-1.5-1.5-1.5H13v15h5.5c.8 0 1.5.7 1.5 1.5z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>' +
  '</svg>';

/* ------------------------------------------------------------
   왼쪽 패널: 소개 + 문항 목록 + 팀플 제외 안내
   ------------------------------------------------------------ */

function buildSurveyNavHTML(step) {
  var itemsHTML = SURVEY_QUESTIONS.map(function (q, i) {
    var isCurrent = i === step;
    var isAnswered = isSurveyAnswered(q);
    var cls = 'survey-nav__item';
    var mark;
    if (isCurrent) {
      cls += ' survey-nav__item--current';
      mark = String(i + 1);
    } else if (isAnswered) {
      cls += ' survey-nav__item--done';
      mark = '✓';
    } else {
      cls += ' survey-nav__item--todo';
      mark = String(i + 1);
    }
    var clickable = isCurrent || isAnswered;
    return (
      '<li>' +
        '<button type="button" class="' + cls + '"' + (clickable ? ' data-survey-goto="' + i + '"' : ' disabled') + '>' +
          '<span class="survey-nav__mark">' + mark + '</span>' +
          '<span>' + q.nav + '</span>' +
        '</button>' +
      '</li>'
    );
  }).join('');

  var teamNoticeHTML = state.survey.q2 === 'avoid'
    ? '<div class="survey-team-notice">팀플 있는 과목은 추천에서 빠져요</div>'
    : '';

  return (
    '<aside class="card survey-nav">' +
      '<div class="survey-nav__head">' +
        '<span class="orb orb--general survey-orb">' + SURVEY_BOOK_ICON + '</span>' +
        '<div>' +
          '<p class="survey-eyebrow">청록 여의주 찾기</p>' +
          '<h1 class="survey-nav__title">교양 취향 테스트</h1>' +
        '</div>' +
      '</div>' +
      '<p class="survey-nav__desc">6개만 답하면 아직 못 채운 교양 영역에서 취향에 맞는 과목을 골라드려요.</p>' +
      '<ol class="survey-nav__list">' + itemsHTML + '</ol>' +
      teamNoticeHTML +
    '</aside>'
  );
}

/* ------------------------------------------------------------
   오른쪽 질문 카드
   ------------------------------------------------------------ */

function buildSurveyQuestionHTML(step) {
  var q = SURVEY_QUESTIONS[step];
  var total = SURVEY_QUESTIONS.length;
  var pct = Math.round(((step + 1) / total) * 100);
  var answer = state.survey[q.id];

  var optionsHTML = getSurveyOptions(q).map(function (opt) {
    var selected = q.multi ? answer.indexOf(opt.value) !== -1 : answer === opt.value;
    return (
      '<button type="button" class="survey-option' + (q.multi ? ' survey-option--multi' : '') + (selected ? ' survey-option--selected' : '') + '"' +
        ' role="' + (q.multi ? 'checkbox' : 'radio') + '" aria-checked="' + selected + '" data-survey-option="' + opt.value + '">' +
        '<span class="survey-option__mark">' + (selected ? '✓' : '') + '</span>' +
        '<span class="survey-option__label">' + opt.label + '</span>' +
      '</button>'
    );
  }).join('');

  var isLast = step === total - 1;

  return (
    '<section class="card survey-question">' +
      '<div class="survey-progress">' +
        '<span class="survey-progress__q">Q' + (step + 1) + '</span>' +
        '<div class="progress-bar progress-bar--general"><div class="progress-bar__fill" style="width:' + pct + '%"></div></div>' +
        '<span class="survey-progress__count">' + (step + 1) + ' / ' + total + '</span>' +
      '</div>' +
      '<h2 class="survey-question__title">' + q.title + '</h2>' +
      '<p class="survey-question__sub">' + q.sub + '</p>' +
      '<div class="survey-options" role="' + (q.multi ? 'group' : 'radiogroup') + '">' + optionsHTML + '</div>' +
      '<div class="survey-actions">' +
        '<button type="button" class="btn btn--outline survey-actions__prev" id="survey-prev-btn"' + (step === 0 ? ' disabled' : '') + '>이전</button>' +
        '<button type="button" class="btn btn--primary survey-actions__next" id="survey-next-btn"' + (isSurveyAnswered(q) ? '' : ' disabled') + '>' +
          (isLast ? '결과 보기' : '다음') +
        '</button>' +
      '</div>' +
    '</section>'
  );
}

/* ------------------------------------------------------------
   이벤트
   ------------------------------------------------------------ */

function bindSurveyEvents() {
  var el = document.getElementById('view-survey');
  var q = SURVEY_QUESTIONS[_surveyUi.step];

  Array.prototype.forEach.call(el.querySelectorAll('[data-survey-goto]'), function (btn) {
    btn.addEventListener('click', function () {
      _surveyUi.step = parseInt(btn.dataset.surveyGoto, 10);
      renderSurvey();
    });
  });

  Array.prototype.forEach.call(el.querySelectorAll('[data-survey-option]'), function (btn) {
    btn.addEventListener('click', function () {
      selectSurveyOption(q, btn.dataset.surveyOption);
      renderSurvey();
    });
  });

  document.getElementById('survey-prev-btn').addEventListener('click', function () {
    if (_surveyUi.step > 0) {
      _surveyUi.step--;
      renderSurvey();
    }
  });

  document.getElementById('survey-next-btn').addEventListener('click', function () {
    if (!isSurveyAnswered(q)) return;
    if (_surveyUi.step < SURVEY_QUESTIONS.length - 1) {
      _surveyUi.step++;
      renderSurvey();
    } else {
      state.surveyDone = true;
      navigate('electives');
    }
  });
}

function selectSurveyOption(q, value) {
  if (!q.multi) {
    state.survey[q.id] = value;
    return;
  }
  // Q5: "다 좋아요"와 개별 영역은 서로 배타적
  var list = state.survey.q5;
  if (value === SURVEY_Q5_ALL) {
    state.survey.q5 = list.indexOf(SURVEY_Q5_ALL) !== -1 ? [] : [SURVEY_Q5_ALL];
  } else if (list.indexOf(value) !== -1) {
    state.survey.q5 = list.filter(function (v) { return v !== value; });
  } else {
    state.survey.q5 = list.filter(function (v) { return v !== SURVEY_Q5_ALL; }).concat([value]);
  }
}
