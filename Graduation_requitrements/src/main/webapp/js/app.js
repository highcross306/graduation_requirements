/* ============================================================
   app.js — 전역 상태, 라우팅, 공통 헤더, 오버레이 유틸
   ============================================================ */

/* 나중에 localStorage에 저장하기 쉽도록 직렬화 가능한 형태로 유지한다. */
var state = {
  dept: null,      // 학과 코드 (예: 'ai')
  year: null,      // 입학연도 (예: 2025)
  courses: [],      // 이수한 과목 [{ code, category }]
  certs: [],        // 취득한 졸업인증 id 목록
  result: null,     // 판정 결과 (apiEvaluate 응답)
  survey: null,     // 교양 취향 설문 답 { q1, q2, q3, q4, q5: [...], q6 }
  surveyDone: false, // 이번 세션에 설문을 끝까지 마쳤는지 (헤더 "교양 추천" 이동 기준)
  electivePicks: [] // 06 결과에서 담은 교양 학수번호 목록 (대시보드 반영 전)
};

var ROUTES = ['start', 'dashboard', 'guide', 'next', 'freshman', 'survey', 'electives'];

function getCurrentRoute() {
  var hash = location.hash.replace('#', '');
  return ROUTES.indexOf(hash) !== -1 ? hash : 'start';
}

function navigate(route) {
  location.hash = '#' + route;
}

/* 교양 추천 진입 버튼(대시보드·새내기·다음 학기 추천)에서 공통으로 사용 */
function goSurvey() {
  navigate('survey');
}

/* ------------------------------------------------------------
   공통 헤더
   ------------------------------------------------------------ */

function renderHeader() {
  var route = getCurrentRoute();
  var isStart = route === 'start';

  var menuEl = document.getElementById('header-menu');
  var deptInfoEl = document.getElementById('header-dept-info');
  var taglineEl = document.getElementById('header-tagline');

  menuEl.hidden = isStart;
  deptInfoEl.hidden = isStart;
  taglineEl.hidden = !isStart;

  if (!isStart) {
    var deptLabel = DEPT_LABELS[state.dept] || '';
    document.getElementById('header-dept-text').textContent =
      (deptLabel ? deptLabel + ' · ' : '') + (state.year ? state.year + '학번' : '');

    Array.prototype.forEach.call(menuEl.querySelectorAll('.menu-item'), function (item) {
      var active = item.dataset.route === route ||
        (item.dataset.route === 'next' && route === 'freshman') ||
        (item.dataset.route === 'survey' && route === 'electives');
      item.classList.toggle('menu-item--active', active);
    });
  }
}

function bindHeaderEvents() {
  var menuEl = document.getElementById('header-menu');
  Array.prototype.forEach.call(menuEl.querySelectorAll('.menu-item'), function (item) {
    item.addEventListener('click', function (e) {
      e.preventDefault();
      var action = item.dataset.action;
      if (action === 'navigate') {
        navigate(item.dataset.route);
      } else if (action === 'go-next-or-freshman') {
        navigate(state.courses.length === 0 ? 'freshman' : 'next');
      } else if (action === 'go-survey-or-electives') {
        navigate(state.surveyDone ? 'electives' : 'survey');
      } else if (action === 'open-modal') {
        if (typeof openCourseModal === 'function') openCourseModal();
      } else if (action === 'toast-wip') {
        showToast('준비 중이에요');
      }
    });
  });

  document.getElementById('header-change-dept').addEventListener('click', function (e) {
    e.preventDefault();
    navigate('start');
  });

  document.getElementById('header-brand').addEventListener('click', function () {
    navigate('dashboard');
  });
}

/* ------------------------------------------------------------
   예외 A(로딩) / 예외 B(오류) 오버레이 유틸
   ------------------------------------------------------------ */

function showLoading() {
  document.getElementById('loading-overlay').classList.add('overlay--visible');
}

function hideLoading() {
  document.getElementById('loading-overlay').classList.remove('overlay--visible');
}

var _errorRetryAction = null;

/* retryFn: "다시 시도"를 눌렀을 때 처음 시도와 똑같이 다시 실행할 함수.
   생략하면 이전에 등록된 재시도 함수를 그대로 유지한다. */
function showErrorOverlay(retryFn) {
  if (retryFn) _errorRetryAction = retryFn;
  document.getElementById('error-overlay').classList.add('overlay--visible');
}

function hideErrorOverlay() {
  document.getElementById('error-overlay').classList.remove('overlay--visible');
}

function bindErrorOverlayEvents() {
  document.getElementById('error-retry-btn').addEventListener('click', function () {
    hideErrorOverlay();
    if (_errorRetryAction) _errorRetryAction();
  });
}

/* ------------------------------------------------------------
   라우팅
   ------------------------------------------------------------ */

function placeholderView(id, text) {
  var el = document.getElementById(id);
  el.innerHTML = '<div style="padding:80px 24px;text-align:center;color:var(--text-sub);">' + text + '</div>';
}

function renderRoute() {
  var route = getCurrentRoute();

  Array.prototype.forEach.call(document.querySelectorAll('.view'), function (sec) {
    sec.hidden = sec.id !== 'view-' + route;
  });

  renderHeader();

  if (route === 'start') {
    if (typeof renderStart === 'function') renderStart();
    else placeholderView('view-start', '01 시작 화면 (다음 단계에서 구현)');
  } else if (route === 'dashboard') {
    if (typeof renderDashboard === 'function') renderDashboard();
    else placeholderView('view-dashboard', '02 대시보드 (다음 단계에서 구현)');
  } else if (route === 'guide') {
    if (typeof renderGuide === 'function') renderGuide();
    else placeholderView('view-guide', '02-1 이수구분 가이드 (다음 단계에서 구현)');
  } else if (route === 'next') {
    if (typeof renderNext === 'function') renderNext();
    else placeholderView('view-next', '다음 학기 추천 (다음 단계에서 구현)');
  } else if (route === 'freshman') {
    if (typeof renderFreshman === 'function') renderFreshman();
    else placeholderView('view-freshman', '새내기 첫 학기 (다음 단계에서 구현)');
  } else if (route === 'survey') {
    if (typeof renderSurvey === 'function') renderSurvey();
    else placeholderView('view-survey', '05 교양 취향 테스트 (다음 단계에서 구현)');
  } else if (route === 'electives') {
    if (typeof renderElectives === 'function') renderElectives();
    else placeholderView('view-electives', '06 취향 저격 교양 결과 (다음 단계에서 구현)');
  }
}

window.addEventListener('hashchange', renderRoute);

window.addEventListener('DOMContentLoaded', function () {
  if (!location.hash) location.hash = '#start';
  bindHeaderEvents();
  bindErrorOverlayEvents();
  renderRoute();
});
