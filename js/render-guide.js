/* ============================================================
   render-guide.js — 02-1 이수구분 가이드 (#guide)
   ============================================================ */

function exampleCourseNames(catalog, category, count) {
  var names = catalog
    .filter(function (c) { return c.category === category; })
    .slice(0, count)
    .map(function (c) { return c.name; });
  return names.length ? names.join(' · ') : '-';
}

function buildGuideCards() {
  var program = getActiveProgram();
  var req = program.requirements;
  var catalog = program.courses;
  var coreExample = catalog
    .filter(function (c) { return c.category === 'GEN_REQ' && c.area === 'core'; })
    .slice(0, 2)
    .map(function (c) { return c.name; })
    .join(' · ') || '-';

  return [
    {
      key: 'general', color: 'var(--orb-general)', abbr: '교필', title: '교양필수',
      subtitle: '영역별로 필요 학점이 정해져 있어요',
      bullets: ['5개 영역을 각각 채워야 해요', '핵심교양은 1·2·4·6영역에서 각 1과목씩만 인정돼요'],
      deptValue: req.credits.general + '학점', example: coreExample,
      note: null, hasAreaTable: true
    },
    {
      key: 'major', color: 'var(--primary)', abbr: '전필', title: '전공필수',
      subtitle: '정해진 과목을 모두 들어야 해요 (전공기초 포함)',
      bullets: [req.majorRequiredCount + '과목을 모두 이수해야 충족돼요', '하나라도 빠지면 미충족으로 남아요'],
      deptValue: req.majorRequiredCount + '과목 · ' + req.credits.major + '학점',
      example: exampleCourseNames(catalog, 'MAJOR_REQ', 2),
      note: null, hasAreaTable: false
    },
    {
      key: 'genElective', color: 'var(--text-sub)', abbr: '교선', title: '교양선택',
      subtitle: '필수 외 교양 과목이에요',
      bullets: ['편성표에 별도 기준이 없어요', '인정 기준은 학사 규정 확인이 필요해요'],
      deptValue: '별도 기준 없음(확인 필요)', example: exampleCourseNames(catalog, 'GEN_ELEC', 2),
      note: null, hasAreaTable: false
    },
    {
      key: 'majorElective', color: 'var(--orb-major)', abbr: '전선', title: '전공선택',
      subtitle: '전공 중 골라서 학점만 채우면 돼요',
      bullets: ['전공 과목 중 자유롭게 선택해요', '학점만 채우면 어떤 전공 과목이든 OK'],
      deptValue: req.credits.majorElective + '학점 (단일전공 기준)',
      example: exampleCourseNames(catalog, 'MAJOR_ELEC', 2),
      note: '복수전공·부전공을 하면 필요한 학점이 달라져요', hasAreaTable: false
    },
    {
      key: 'freeElective', color: 'var(--orb-off)', abbr: '일선', title: '일반선택',
      subtitle: '타과·교양 등 무엇이든 OK',
      bullets: ['어느 과목이든 학점만 채우면 돼요', '타과 전공도 자유롭게 들을 수 있어요'],
      deptValue: req.credits.freeElective + '학점 (단일전공 기준)', example: '타과 전공 · 추가로 들은 교양',
      note: null, hasAreaTable: false
    }
  ];
}

function renderGuide() {
  var program = getActiveProgram();
  var el = document.getElementById('view-guide');
  el.innerHTML =
    '<div class="guide container">' +
      '<a href="#dashboard" class="guide-back">← 대시보드로</a>' +
      '<h1 class="guide-title">전필? 교필? 이것만 알면 돼요</h1>' +
      '<p class="guide-subtitle">졸업까지 130학점은 이렇게 나뉘어요. ' + program.departmentName + ' ' + program.admissionYear + '학번 · 단일전공 기준</p>' +

      '<div class="card guide-total-card">' +
        buildStackedCreditBarHTML() +
        '<p class="guide-total-card__note">필수 = <strong>과목·영역이 정해져 있음</strong> · 선택 = <strong>학점만 채우면 됨</strong> · 교양선택은 편성표에 별도 기준 없음</p>' +
      '</div>' +

      '<div class="guide-cards-grid">' + buildGuideCards().map(buildGuideCardHTML).join('') + '</div>' +

      '<div class="guide-next-grid">' +
        '<button type="button" class="guide-next-card guide-next-card--primary" id="guide-go-freshman-btn">' +
          '<span class="guide-next-card__label">새내기예요</span>' +
          '<span class="guide-next-card__title">1학년 1학기에 들을 과목 보기 →</span>' +
        '</button>' +
        '<button type="button" class="guide-next-card" id="guide-add-course-btn">' +
          '<span class="guide-next-card__label">들은 과목이 있어요</span>' +
          '<span class="guide-next-card__title">들은 과목 담기 →</span>' +
        '</button>' +
      '</div>' +

      '<p class="guide-source">출처: 인하대 ' + program.departmentName + ' 교과목 편성표("추후 변경될 수 있음" 표기) · 복수전공·부전공은 전공선택/일반선택 학점이 달라져요</p>' +
    '</div>';

  bindGuideEvents();
}

function buildGuideCardHTML(card) {
  var areaTableHTML = '';
  if (card.hasAreaTable) {
    var rows = getActiveRequirements().generalAreas.map(function (a) {
      return '<tr><td>' + a.name + '</td><td>' + a.required + '</td><td>' + a.desc + '</td></tr>';
    }).join('');
    areaTableHTML =
      '<table class="guide-area-table">' +
        '<thead><tr><th>영역</th><th>학점</th><th>설명</th></tr></thead>' +
        '<tbody>' + rows + '</tbody>' +
      '</table>';
  }

  var bulletsHTML = card.bullets.map(function (b) { return '<li>' + b + '</li>'; }).join('');
  var noteHTML = card.note ? '<p class="guide-card__note">' + card.note + '</p>' : '';

  return (
    '<div class="card guide-card">' +
      '<div class="guide-card__head">' +
        '<span class="orb guide-card__orb" style="--orb-color:' + card.color + '"></span>' +
        '<div class="guide-card__head-text">' +
          '<h3>' + card.title + '</h3>' +
          '<p>' + card.subtitle + '</p>' +
        '</div>' +
        '<span class="guide-card__abbr" style="background:' + card.color + '">' + card.abbr + '</span>' +
      '</div>' +
      '<ul class="guide-card__bullets">' + bulletsHTML + '</ul>' +
      areaTableHTML +
      '<div class="guide-card__stats">' +
        '<div><p class="guide-card__stats-label">우리 학과 기준</p><p class="guide-card__stats-value">' + card.deptValue + '</p></div>' +
        '<div><p class="guide-card__stats-label">예시 과목</p><p class="guide-card__stats-value guide-card__stats-value--example">' + card.example + '</p></div>' +
      '</div>' +
      noteHTML +
    '</div>'
  );
}

function bindGuideEvents() {
  var el = document.getElementById('view-guide');

  Array.prototype.forEach.call(el.querySelectorAll('[data-action="toast-wip"]'), function (btn) {
    btn.addEventListener('click', function () { showToast('준비 중이에요'); });
  });

  var goFreshmanBtn = document.getElementById('guide-go-freshman-btn');
  if (goFreshmanBtn) {
    goFreshmanBtn.addEventListener('click', function () { navigate('freshman'); });
  }

  var addBtn = document.getElementById('guide-add-course-btn');
  if (addBtn) {
    addBtn.addEventListener('click', function () {
      navigate('dashboard');
      renderRoute();
      openCourseModal();
    });
  }
}
