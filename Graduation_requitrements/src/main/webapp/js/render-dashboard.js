/* ============================================================
   render-dashboard.js — 02-0 빈 대시보드 / 02 메인 대시보드 (#dashboard)
   예외 E(모든 요건 충족)도 여기서 함께 처리한다.
   ============================================================ */

var _dashUi = { majorExpanded: false };

function renderDashboard() {
  if (!state.result) {
    refreshResult(function () { renderDashboard(); });
    return;
  }

  var el = document.getElementById('view-dashboard');
  var result = state.result;
  var isEmpty = state.courses.length === 0;
  var isComplete = result.summary.satisfiedCount === 4;

  var html = '<div class="dashboard container">';
  html += buildDashboardHeaderHTML(isEmpty, isComplete, result);
  html += buildProgressBannerHTML(result);
  html += buildOverviewSectionHTML();

  if (isEmpty) {
    html += buildEmptyStateCardHTML();
  } else {
    html += buildReqCardsGridHTML(result);
    html += buildNextBannerHTML();
  }

  html += '</div>';
  el.innerHTML = html;

  bindDashboardEvents();
}

/* ------------------------------------------------------------
   상단 헤더 (빈 상태 / 일반 / 예외 E 완성 상태)
   ------------------------------------------------------------ */

function buildDashboardHeaderHTML(isEmpty, isComplete, result) {
  var buttonsHTML;
  if (isEmpty) {
    buttonsHTML =
      '<button type="button" class="btn btn--primary" data-action="open-modal">+ 과목 입력하기</button>' +
      '<button type="button" class="btn btn--outline" data-action="go-survey">교양 추천 받기</button>';
  } else {
    buttonsHTML =
      '<button type="button" class="btn btn--outline" data-action="go-guide">? 이수구분 가이드</button>' +
      '<button type="button" class="btn btn--primary" data-action="open-modal">+ 과목 입력하기</button>' +
      '<button type="button" class="btn btn--outline" data-action="go-survey">교양 추천 받기</button>';
  }

  var titleBlock;
  if (isComplete) {
    titleBlock =
      '<div class="dashboard-header__complete-orbs">' +
        orbSpan('total', 'dashboard-header__orb') +
        orbSpan('major', 'dashboard-header__orb') +
        orbSpan('general', 'dashboard-header__orb') +
        orbSpan('cert', 'dashboard-header__orb') +
      '</div>' +
      '<h1 class="dashboard-header__title">여의주 4개 완성! 이제 학사모만 쓰면 돼요</h1>' +
      '<p class="dashboard-header__subtitle">최종 졸업 여부는 학과 졸업사정에서 확정돼요.</p>';
  } else if (isEmpty) {
    titleBlock =
      '<h1 class="dashboard-header__title">아직 모은 여의주가 없어요</h1>' +
      '<p class="dashboard-header__subtitle">들은 과목을 담으면 여의주가 하나씩 빛나기 시작해요.</p>';
  } else {
    var remain = 4 - result.summary.satisfiedCount;
    titleBlock =
      '<h1 class="dashboard-header__title">나의 여의주 현황</h1>' +
      '<p class="dashboard-header__subtitle">4개 중 ' + result.summary.satisfiedCount + '개 모았어요. 나머지 ' + remain + '개는 아직 캠퍼스 어딘가에.</p>';
  }

  return (
    '<div class="dashboard-header">' +
      '<div class="dashboard-header__text">' + titleBlock + '</div>' +
      '<div class="dashboard-header__actions">' + buttonsHTML + '</div>' +
    '</div>'
  );
}

/* ------------------------------------------------------------
   진행 배너
   ------------------------------------------------------------ */

function buildProgressBannerHTML(result) {
  var order = ['total', 'major', 'general', 'cert'];
  var orbsHTML = order.map(function (key) {
    var card = findCard(result, key);
    var filled = card && card.satisfied;
    var orbClass = filled ? key : 'off';
    return '<span class="orb orb--' + orbClass + ' progress-banner__orb' + (filled ? ' progress-banner__orb--filled' : '') + '"></span>';
  }).join('');

  return (
    '<div class="progress-banner">' +
      '<div class="progress-banner__orbs">' + orbsHTML + '</div>' +
      '<div class="progress-banner__stats">' +
        '<p class="progress-banner__label">전체 진행률 <strong>' + result.summary.percent + '%</strong> 여의주 ' + result.summary.satisfiedCount + ' / 4</p>' +
        '<div class="progress-bar progress-bar--wish"><div class="progress-bar__fill" style="width:' + result.summary.percent + '%"></div></div>' +
      '</div>' +
    '</div>'
  );
}

/* ------------------------------------------------------------
   02-0 빈 카드
   ------------------------------------------------------------ */

function buildEmptyStateCardHTML() {
  var req = getActiveRequirements();
  var items = [
    { key: 'total', label: '총학점<br>' + req.totalRequired + '학점' },
    { key: 'major', label: '전공필수<br>' + req.majorRequiredCount + '과목' },
    { key: 'general', label: '교양필수<br>' + req.credits.general + '학점' },
    { key: 'cert', label: '졸업인증<br>영어 등' }
  ];
  var orbsHTML = items.map(function (item) {
    return (
      '<div class="empty-card__orb-item">' +
        orbSpan('off', 'empty-card__orb') +
        '<span class="empty-card__orb-label">' + item.label + '</span>' +
      '</div>'
    );
  }).join('');

  return (
    '<div class="card empty-card">' +
      '<div class="empty-card__orbs">' + orbsHTML + '</div>' +
      '<h3 class="empty-card__title">들은 과목부터 담아볼까요?</h3>' +
      '<p class="empty-card__desc">과목만 담으면 여의주 4개 중 몇 개를 모았는지, 남은 과목은 뭔지 바로 계산해 드려요.<br>성적은 입력하지 않아도 돼요.</p>' +
      '<div class="empty-card__actions">' +
        '<button type="button" class="btn btn--primary" data-action="open-modal">+ 들은 과목 담기</button>' +
        '<button type="button" class="btn btn--outline" data-action="go-guide">새내기라 들은 과목이 없어요 · 졸업요건부터 보기</button>' +
      '</div>' +
    '</div>'
  );
}

/* ------------------------------------------------------------
   요건 카드 4개
   ------------------------------------------------------------ */

function buildReqCardsGridHTML(result) {
  return (
    '<div class="req-cards-grid">' +
      buildMajorCardHTML(findCard(result, 'major')) +
      buildGeneralCardHTML(findCard(result, 'general')) +
      buildTotalCardHTML(findCard(result, 'total')) +
      buildCertCardHTML(findCard(result, 'cert')) +
    '</div>'
  );
}

function buildReqCardHeadHTML(orbKey, title, subtitle, badgeHTML, modalCategory) {
  return (
    '<div class="req-card__head">' +
      '<div class="req-card__head-left">' +
        orbSpan(orbKey, 'req-card__orb') +
        '<div>' +
          '<div class="req-card__title-row">' +
            '<h3 class="req-card__title">' + title + '</h3>' +
            '<button type="button" class="req-card__help" data-action="go-guide" title="이수구분 가이드">?</button>' +
          '</div>' +
          '<p class="req-card__subtitle">' + subtitle + '</p>' +
        '</div>' +
      '</div>' +
      '<div class="req-card__head-right">' +
        badgeHTML +
        '<button type="button" class="btn btn--outline req-card__add-btn" data-action="open-modal" data-category="' + (modalCategory || '') + '">과목 추가 +</button>' +
      '</div>' +
    '</div>'
  );
}

function buildReqCardProgressHTML(orbKey, pct) {
  return (
    '<div class="req-card__progress">' +
      '<div class="progress-bar progress-bar--' + orbKey + '"><div class="progress-bar__fill" style="width:' + pct + '%"></div></div>' +
      '<span class="req-card__pct req-card__pct--' + orbKey + '">' + pct + '%</span>' +
    '</div>'
  );
}

function buildMajorCardHTML(card) {
  var pct = Math.min(100, Math.round((card.earnedCourses / card.requiredCourses) * 100));
  var badge = card.satisfied
    ? '<span class="badge badge--ok">✓ 모았어요</span>'
    : '<span class="badge badge--bad">' + (card.requiredCourses - card.earnedCourses) + '과목 남음</span>';

  var visibleCount = _dashUi.majorExpanded ? card.remaining.length : Math.min(3, card.remaining.length);
  var rowsHTML = card.remaining.slice(0, visibleCount).map(function (c) {
    return (
      '<label class="check-row">' +
        '<input type="checkbox" class="check-row__input" data-major-code="' + c.code + '">' +
        '<span class="check-row__name">' + c.name + '</span>' +
        '<span class="check-row__code">' + c.code + '</span>' +
        '<span class="chip chip--grade">' + c.grade + '학년</span>' +
      '</label>'
    );
  }).join('');

  var remainCount = card.remaining.length - visibleCount;
  var moreBtnHTML = (!_dashUi.majorExpanded && remainCount > 0)
    ? '<button type="button" class="req-card__more" data-action="major-more">+ ' + remainCount + '과목 더 보기</button>'
    : '';

  var bodyHTML = card.remaining.length === 0
    ? '<p class="req-card__done-text">전공필수 과목을 모두 담았어요.</p>'
    : '<p class="req-card__list-title">아직 안 들은 과목 · 들었으면 체크</p><div class="check-list">' + rowsHTML + '</div>' + moreBtnHTML;

  return (
    '<div class="req-card">' +
      buildReqCardHeadHTML('major', '전공필수', card.earnedCourses + ' / ' + card.requiredCourses + '과목 이수 · ' + card.earned + ' / ' + card.required + '학점', badge, 'MAJOR_REQ') +
      buildReqCardProgressHTML('major', pct) +
      '<div class="req-card__body">' + bodyHTML + '</div>' +
    '</div>'
  );
}

function buildGeneralCardHTML(card) {
  var pct = Math.min(100, Math.round((card.earned / card.required) * 100));
  var unsatisfiedCount = card.areas.filter(function (a) { return !a.satisfied; }).length;
  var badge = card.satisfied
    ? '<span class="badge badge--ok">✓ 모았어요</span>'
    : '<span class="badge badge--bad">' + unsatisfiedCount + '개 영역 부족</span>';

  var areasHTML = card.areas.map(function (a) {
    var rowBadge = a.satisfied
      ? '<span class="badge badge--ok">충족</span>'
      : '<span class="badge badge--bad">' + Math.max(0, a.required - a.earned) + '학점 부족</span>';
    return (
      '<div class="area-row">' +
        '<div class="area-row__text">' +
          '<p class="area-row__name">' + a.name + '</p>' +
          '<p class="area-row__desc">' + a.desc + '</p>' +
        '</div>' +
        '<div class="area-row__right">' +
          '<span class="area-row__fraction">' + a.earned + ' / ' + a.required + '</span>' +
          rowBadge +
        '</div>' +
      '</div>'
    );
  }).join('');

  return (
    '<div class="req-card">' +
      buildReqCardHeadHTML('general', '교양필수', card.earned + ' / ' + card.required + '학점 이수', badge, 'GEN_REQ') +
      buildReqCardProgressHTML('general', pct) +
      '<div class="req-card__body">' +
        areasHTML +
        '<a href="#survey" class="req-card__link" data-action="go-survey">취향 맞는 교양으로 채우기 →</a>' +
      '</div>' +
    '</div>'
  );
}

function buildTotalCardHTML(card) {
  var pct = Math.min(100, Math.round((card.earned / card.required) * 100));
  // 서버는 총 130학점 + 전공 65학점(majorCredits)을 함께 본다. 전공 학점도 총학점에 들어가므로 남은 학점은 둘 중 큰 쪽
  var majorShort = card.majorCredits ? Math.max(0, card.majorCredits.required - card.majorCredits.earned) : 0;
  var totalShort = Math.max(0, card.required - card.earned);
  var badgeText = totalShort === 0 && majorShort > 0 ? '전공 ' + majorShort + '학점 부족' : totalShort + '학점 남음';
  var badge = card.satisfied
    ? '<span class="badge badge--ok">✓ 모았어요</span>'
    : '<span class="badge badge--bad">' + badgeText + '</span>';

  var remainingCredit = card.satisfied ? 0 : Math.max(totalShort, majorShort);
  var remainingSemesters = Math.max(0, 8 - computePastSemesters(state.year));
  var perSemester = remainingSemesters > 0 ? Math.ceil(remainingCredit / remainingSemesters) : remainingCredit;

  return (
    '<div class="req-card">' +
      buildReqCardHeadHTML('total', '총학점', card.earned + ' / ' + card.required + '학점 이수', badge, null) +
      buildReqCardProgressHTML('total', pct) +
      '<div class="req-card__body">' +
        '<div class="total-card__box">' +
          '<p><strong>남은 ' + remainingCredit + '학점</strong> · 남은 ' + remainingSemesters + '학기 기준</p>' +
          '<p><strong>학기당 약 ' + perSemester + '학점씩 들으면 제때 졸업할 수 있어요</strong></p>' +
        '</div>' +
        '<p class="total-card__detail">전공 ' + card.breakdown.major + '학점 · 교양 ' + card.breakdown.general + '학점 · 일반선택 ' + card.breakdown.free + '학점</p>' +
      '</div>' +
    '</div>'
  );
}

function buildCertCardHTML(card) {
  var pct = card.satisfied ? 100 : 0;
  var badge = card.satisfied
    ? '<span class="badge badge--ok">✓ 모았어요</span>'
    : '<span class="badge badge--bad">미충족</span>';

  var satisfiedBy = card.satisfiedBy || [];
  var optionsHTML = card.options.map(function (opt) {
    var byCourse = state.certs.indexOf(opt.id) === -1 && satisfiedBy.indexOf(opt.id) !== -1;
    var checked = state.certs.indexOf(opt.id) !== -1 || byCourse ? ' checked' : '';
    if (byCourse) checked += ' disabled';
    return (
      '<label class="check-row">' +
        '<input type="checkbox" class="check-row__input" data-cert-id="' + opt.id + '"' + checked + '>' +
        '<span class="check-row__name">' + opt.label + '</span>' +
      '</label>'
    );
  }).join('');

  return (
    '<div class="req-card">' +
      buildReqCardHeadHTML('cert', '졸업인증', (card.satisfied ? 1 : 0) + ' / 1 충족', badge, null) +
      buildReqCardProgressHTML('cert', pct) +
      '<div class="req-card__body">' +
        '<p class="req-card__list-title">아래 중 하나만 충족하면 돼요</p>' +
        '<div class="check-list">' + optionsHTML + '</div>' +
        '<p class="req-card__footnote">인정 기준은 PM 시안 예시 · 학사 규정 확인 후 확정</p>' +
      '</div>' +
    '</div>'
  );
}

/* ------------------------------------------------------------
   하단 배너
   ------------------------------------------------------------ */

function buildNextBannerHTML() {
  return (
    '<div class="next-banner">' +
      '<span class="next-banner__sparkle" aria-hidden="true">✦</span>' +
      '<div class="next-banner__text">' +
        '<p class="next-banner__title">이번에 안 들으면 나중에 꼬이는 과목부터 골라뒀어요</p>' +
        '<p class="next-banner__desc">선수과목 순서를 고려해서 다음 학기에 들으면 좋은 과목을 정리해 뒀어요.</p>' +
      '</div>' +
      '<button type="button" class="btn btn--primary" data-action="go-next">다음 학기 추천 보기 →</button>' +
    '</div>' +
    '<p class="dashboard-footnote">※ 재수강 과목과 F 학점은 반영되지 않아요. 최종 졸업 판정은 학과 졸업사정 기준을 따라요.</p>'
  );
}

/* ------------------------------------------------------------
   이벤트 바인딩
   ------------------------------------------------------------ */

function bindDashboardEvents() {
  var root = document.getElementById('view-dashboard');

  Array.prototype.forEach.call(root.querySelectorAll('[data-action="open-modal"]'), function (btn) {
    btn.addEventListener('click', function () {
      var category = btn.dataset.category || null;
      if (typeof openCourseModal === 'function') openCourseModal(category);
    });
  });

  Array.prototype.forEach.call(root.querySelectorAll('[data-action="toast-wip"]'), function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      showToast('준비 중이에요');
    });
  });

  Array.prototype.forEach.call(root.querySelectorAll('[data-action="go-survey"]'), function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      goSurvey();
    });
  });

  Array.prototype.forEach.call(root.querySelectorAll('[data-action="go-guide"]'), function (btn) {
    btn.addEventListener('click', function () { navigate('guide'); });
  });

  Array.prototype.forEach.call(root.querySelectorAll('[data-action="go-next"]'), function (btn) {
    btn.addEventListener('click', function () { navigate('next'); });
  });

  var moreBtn = root.querySelector('[data-action="major-more"]');
  if (moreBtn) {
    moreBtn.addEventListener('click', function () {
      _dashUi.majorExpanded = true;
      renderDashboard();
    });
  }

  Array.prototype.forEach.call(root.querySelectorAll('[data-major-code]'), function (input) {
    input.addEventListener('change', function () {
      handleMajorCheck(input.dataset.majorCode, input.checked);
    });
  });

  Array.prototype.forEach.call(root.querySelectorAll('[data-cert-id]'), function (input) {
    input.addEventListener('change', function () {
      handleCertToggle(input.dataset.certId, input.checked);
    });
  });
}

function handleMajorCheck(code, checked) {
  if (checked) {
    if (!state.courses.some(function (c) { return c.code === code; })) {
      state.courses.push({ code: code, category: 'MAJOR_REQ' });
    }
  } else {
    state.courses = state.courses.filter(function (c) { return c.code !== code; });
  }
  refreshResult(function () { renderDashboard(); });
}

function handleCertToggle(id, checked) {
  if (checked) {
    if (state.certs.indexOf(id) === -1) state.certs.push(id);
  } else {
    state.certs = state.certs.filter(function (c) { return c !== id; });
  }
  refreshResult(function () { renderDashboard(); });
}
