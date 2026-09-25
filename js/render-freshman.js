/* ============================================================
   render-freshman.js — 04-0 새내기 첫 학기 (#freshman)
   1학년 1학기로 편성표에 정해진 과목만 실데이터에서 골라 보여준다.
   (하드코딩 목록이 아니라 recYear=1 · recSem에 1이 포함된 과목을 매번 계산)
   ============================================================ */

var GEN_AREA_LABELS = { focus: '중점교양', basic: '기초교양', core: '핵심교양', swai: 'SW·AI', creative: '창의' };

function getFreshmanCourses() {
  var program = getActiveProgram();
  var isFirstSem = function (c) { return c.recYear === 1 && c.recSem && c.recSem.indexOf(1) !== -1; };

  var school = program.courses.filter(function (c) { return c.category === 'GEN_REQ' && isFirstSem(c); });
  var major = program.courses.filter(function (c) { return (c.category === 'MAJOR_REQ' || c.category === 'MAJOR_ELEC') && isFirstSem(c); });

  return { school: school, major: major };
}

function renderFreshman() {
  var el = document.getElementById('view-freshman');
  var program = getActiveProgram();
  var courses = getFreshmanCourses();

  var schoolCredit = courses.school.reduce(function (s, c) { return s + c.credit; }, 0);
  var majorCredit = courses.major.reduce(function (s, c) { return s + c.credit; }, 0);

  el.innerHTML =
    '<div class="dashboard container">' +
      '<a href="#dashboard" class="guide-back">← 대시보드로</a>' +

      '<div class="dashboard-header">' +
        '<div class="dashboard-header__text">' +
          '<span class="freshman-badge">새내기 모드 · 1학년 1학기</span>' +
          '<h1 class="dashboard-header__title" style="margin-top:10px;">첫 학기, 이것부터 담아요</h1>' +
          '<p class="dashboard-header__subtitle">교과목 편성표에서 1학년 1학기로 정해진 과목만 골랐어요. 분반과 시간은 수강편람에서 확인하세요.</p>' +
        '</div>' +
        '<div class="dashboard-header__actions">' +
          '<button type="button" class="btn btn--primary" data-action="toast-wip">이 과목으로 시간표 짜기 →</button>' +
        '</div>' +
      '</div>' +

      '<div class="next-columns">' +
        '<div class="card next-section">' +
          '<h3 class="next-column-title"><span class="next-dot next-dot--gen"></span>학교가 1학년 1학기로 정해둔 과목 <span class="next-column-count">' + courses.school.length + '과목 · ' + schoolCredit + '학점</span></h3>' +
          '<div class="next-list">' + courses.school.map(buildFreshmanCardHTML).join('') + '</div>' +
        '</div>' +
        '<div class="card next-section">' +
          '<h3 class="next-column-title"><span class="next-dot next-dot--major"></span>전공 첫걸음 <span class="next-column-count">' + courses.major.length + '과목 · ' + majorCredit + '학점</span></h3>' +
          '<div class="next-list">' + courses.major.map(buildFreshmanCardHTML).join('') + '</div>' +

          '<div class="freshman-choice-box">' +
            '<p class="freshman-choice-box__title">골라 듣는 교양 (선택)</p>' +
            '<p class="freshman-choice-box__desc">핵심교양(1·2·4영역)과 창의 영역은 과목을 골라 들어요. 첫 학기에 1과목 정도 넣고 싶다면 취향에 맞는 과목을 추천해 드려요.</p>' +
            '<button type="button" class="btn btn--outline freshman-choice-box__btn" data-action="toast-wip">교양 추천 받기</button>' +
          '</div>' +
        '</div>' +
      '</div>' +

      '<div class="card freshman-info-banner">' +
        '<p><strong>학기가 끝나면</strong> 시간표의 과목을 "들은 과목으로 옮기기" 한 번이면 대시보드에 여의주가 채워져요.</p>' +
      '</div>' +
    '</div>';

  bindFreshmanEvents();
}

function buildFreshmanCardHTML(c) {
  var isGen = c.category === 'GEN_REQ';
  var orbKey = isGen ? 'general' : 'major';
  var categoryLabel = isGen ? (GEN_AREA_LABELS[c.area] || '교양') : (c.category === 'MAJOR_REQ' ? '전공필수' : '전공선택');
  var descLabel = isGen ? (GEN_AREA_LABELS[c.area] || '교양') : categoryLabel;
  return (
    '<div class="freshman-card">' +
      '<div class="freshman-card__row1">' +
        orbSpan(orbKey, 'freshman-card__orb') +
        '<span class="freshman-card__name">' + c.name + '</span>' +
        '<span class="freshman-card__meta">' + categoryLabel + ' · ' + c.credit + '학점</span>' +
      '</div>' +
      '<p class="freshman-card__desc">' + descLabel + ' · 편성표 1학년 1학기 (' + c.code + ')</p>' +
    '</div>'
  );
}

function bindFreshmanEvents() {
  var el = document.getElementById('view-freshman');
  Array.prototype.forEach.call(el.querySelectorAll('[data-action="toast-wip"]'), function (btn) {
    btn.addEventListener('click', function () { showToast('준비 중이에요'); });
  });
}
