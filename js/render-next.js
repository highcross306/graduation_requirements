/* ============================================================
   render-next.js — 04 다음 학기 추천 (#next)
   전공필수(전공기초 포함) 과목의 편성표 권장 학년·학기를 "지난 학기"와
   비교해서 "놓치면 1년 밀려요" / "천천히 해도 괜찮아요"로 나눠 보여준다.
   ============================================================ */

var _nextUi = { relaxedExpanded: false };

function renderNext() {
  var el = document.getElementById('view-next');

  if (state.courses.length === 0) {
    el.innerHTML =
      '<div class="dashboard container">' +
        '<a href="#dashboard" class="guide-back">← 대시보드로</a>' +
        '<div class="card next-empty-card">' +
          '<p class="next-empty-card__title">아직 담은 과목이 없어요.</p>' +
          '<p class="next-empty-card__desc">새내기라면 첫 학기 과목부터 볼까요?</p>' +
          '<button type="button" class="btn btn--primary" id="next-go-freshman-btn">1학년 1학기 과목 보기 →</button>' +
        '</div>' +
      '</div>';
    var goFreshmanBtn = document.getElementById('next-go-freshman-btn');
    if (goFreshmanBtn) goFreshmanBtn.addEventListener('click', function () { navigate('freshman'); });
    return;
  }

  var plan = buildNextSemesterPlan();
  var VISIBLE = 6;
  var visibleRelaxed = _nextUi.relaxedExpanded ? plan.relaxed : plan.relaxed.slice(0, VISIBLE);
  var relaxedMoreCount = plan.relaxed.length - visibleRelaxed.length;

  var urgentCredit = plan.urgent.reduce(function (s, i) { return s + i.credit; }, 0);
  var relaxedCredit = plan.relaxed.reduce(function (s, i) { return s + i.credit; }, 0);

  var bodyHTML;
  if (plan.urgent.length === 0 && plan.relaxed.length === 0) {
    bodyHTML = '<div class="card next-empty-card"><p class="next-empty-card__title">다음 학기에 급하게 들을 필수 과목이 없어요 🎉</p></div>';
  } else {
    bodyHTML =
      '<div class="next-columns">' +
        '<div class="card next-section">' +
          '<h3 class="next-column-title"><span class="next-dot next-dot--bad"></span>놓치면 1년 밀려요 <span class="next-column-count">' + plan.urgent.length + '과목 · ' + urgentCredit + '학점</span></h3>' +
          (plan.urgent.length === 0
            ? '<p class="req-card__done-text">지금 급한 과목은 없어요.</p>'
            : '<div class="next-list">' + plan.urgent.map(function (i) { return buildNextPlanRowHTML(i, 'urgent'); }).join('') + '</div>') +
        '</div>' +
        '<div class="card next-section">' +
          '<h3 class="next-column-title"><span class="next-dot next-dot--sub"></span>천천히 해도 괜찮아요 <span class="next-column-count">' + plan.relaxed.length + '과목 · ' + relaxedCredit + '학점</span></h3>' +
          (plan.relaxed.length === 0
            ? '<p class="req-card__done-text">해당하는 과목이 없어요.</p>'
            : '<div class="next-list">' + visibleRelaxed.map(function (i) { return buildNextPlanRowHTML(i, 'relaxed'); }).join('') +
              (relaxedMoreCount > 0 ? '<button type="button" class="req-card__more" id="next-relaxed-more-btn">+ ' + relaxedMoreCount + '과목 더 보기</button>' : '') +
              '</div>') +
        '</div>' +
      '</div>';
  }

  el.innerHTML =
    '<div class="dashboard container">' +
      '<a href="#dashboard" class="guide-back">← 대시보드로</a>' +
      '<div class="dashboard-header">' +
        '<div class="dashboard-header__text">' +
          '<h1 class="dashboard-header__title">다음 학기 장바구니, 이렇게 담아보세요</h1>' +
          '<p class="dashboard-header__subtitle"><strong>' + plan.pastYear + '학년 ' + plan.pastSem + '학기</strong>까지 들은 기준이에요. 교과목 편성표의 권장 학기와 학수번호 학년을 기준으로 나눴어요. 실제 개설 여부는 수강편람에서 확인하세요.</p>' +
        '</div>' +
        '<div class="dashboard-header__actions">' +
          '<button type="button" class="btn btn--outline" data-action="toast-wip">교양 과목도 추천 받기</button>' +
          '<button type="button" class="btn btn--primary" data-action="toast-wip">시간표 짜기 →</button>' +
        '</div>' +
      '</div>' +
      bodyHTML +
    '</div>';

  bindNextEvents();
}

function buildNextPlanRowHTML(item, kind) {
  var categoryLabel = item.category === 'MAJOR_REQ' ? '전공필수' : '전공선택';
  var chipClass = item.category === 'MAJOR_REQ' ? 'chip--major' : 'chip--elective';
  var reasonClass = kind === 'urgent' ? 'next-row__reason--bad' : 'next-row__reason--sub';
  return (
    '<div class="next-row">' +
      '<div class="next-row__main">' +
        orbSpan(item.category === 'MAJOR_REQ' ? 'major' : 'major', 'next-row__orb') +
        '<span class="next-row__name">' + item.name + '</span>' +
        '<span class="next-row__meta">' + categoryLabel + ' · ' + item.credit + '학점</span>' +
      '</div>' +
      '<p class="next-row__reason ' + reasonClass + '">' + item.reason + '</p>' +
      '<button type="button" class="btn btn--outline next-row__done-btn" data-next-done="' + item.code + '" data-next-category="' + item.category + '">들었어요</button>' +
    '</div>'
  );
}

function bindNextEvents() {
  var el = document.getElementById('view-next');

  Array.prototype.forEach.call(el.querySelectorAll('[data-action="toast-wip"]'), function (btn) {
    btn.addEventListener('click', function () { showToast('준비 중이에요'); });
  });

  var moreBtn = document.getElementById('next-relaxed-more-btn');
  if (moreBtn) {
    moreBtn.addEventListener('click', function () {
      _nextUi.relaxedExpanded = true;
      renderNext();
    });
  }

  Array.prototype.forEach.call(el.querySelectorAll('[data-next-done]'), function (btn) {
    btn.addEventListener('click', function () {
      var code = btn.dataset.nextDone;
      var category = btn.dataset.nextCategory;
      if (!state.courses.some(function (c) { return c.code === code; })) {
        state.courses.push({ code: code, category: category });
      }
      refreshResult(function () { renderNext(); });
    });
  });
}
