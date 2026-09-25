/* ============================================================
   render-modal.js — 03 과목 담기 모달
   탭1: 학과 교과과정에서 선택 (사이드 범주 + 표)
   탭2: 직접 검색해서 추가
   예외 C(검색 결과 없음), 예외 D(과목 0개로 담기 시도) 포함
   ============================================================ */

var CATEGORY_LABELS = {
  MAJOR_REQ: '전공필수',
  MAJOR_ELEC: '전공선택',
  GEN_REQ: '교양필수',
  GEN_ELEC: '교양선택',
  FREE_ELEC: '일반선택'
};

var CORE_ZONE_LABELS = { 1: '1영역', 2: '2영역', 4: '4영역' };

var _modalState = {
  activeTab: 'catalog',
  selectedCategory: 'MAJOR_REQ',
  selectedArea: null,
  selectedGrade: 'all',
  selectedCoreZone: 'all',
  catalogSearchQuery: '',
  searchQuery: '',
  searchScope: 'all',
  draft: []
};

var _modalEscHandler = function (e) {
  if (e.key === 'Escape') closeCourseModal();
};

/* ------------------------------------------------------------
   열기 / 닫기
   ------------------------------------------------------------ */

function openCourseModal(initialCategory) {
  _modalState.activeTab = 'catalog';
  _modalState.draft = [];
  _modalState.catalogSearchQuery = '';
  _modalState.selectedGrade = 'all';
  _modalState.selectedCoreZone = 'all';
  _modalState.searchQuery = '';
  _modalState.searchScope = 'all';

  if (initialCategory === 'GEN_REQ') {
    _modalState.selectedCategory = 'GEN_REQ';
    _modalState.selectedArea = pickDefaultGeneralArea();
  } else if (initialCategory) {
    _modalState.selectedCategory = initialCategory;
    _modalState.selectedArea = null;
  } else {
    _modalState.selectedCategory = 'MAJOR_REQ';
    _modalState.selectedArea = null;
  }

  renderModal();
  document.addEventListener('keydown', _modalEscHandler);
}

function closeCourseModal() {
  document.getElementById('modal-root').innerHTML = '';
  document.removeEventListener('keydown', _modalEscHandler);
}

function pickDefaultGeneralArea() {
  if (!state.result) return 'focus';
  var generalCard = findCard(state.result, 'general');
  if (!generalCard) return 'focus';
  var unsatisfied = generalCard.areas.filter(function (a) { return !a.satisfied; })[0];
  return unsatisfied ? unsatisfied.key : 'focus';
}

function escapeAttr(str) {
  return String(str || '').replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/* ------------------------------------------------------------
   모달 틀 (헤더 / 탭 / 본문 컨테이너 / 하단)
   ------------------------------------------------------------ */

function renderModal() {
  var root = document.getElementById('modal-root');
  root.innerHTML =
    '<div class="modal-overlay" id="modal-overlay">' +
      '<div class="modal-panel" role="dialog" aria-modal="true" aria-label="들은 과목 담기">' +
        '<div class="modal-header">' +
          '<div>' +
            '<p class="modal-header__eyebrow">여의주 찾기</p>' +
            '<h2 class="modal-header__title">들은 과목 담기</h2>' +
          '</div>' +
          '<button type="button" class="modal-close" id="modal-close-btn" aria-label="닫기">✕</button>' +
        '</div>' +
        '<div class="modal-tabs">' +
          '<button type="button" class="modal-tab modal-tab--active" data-tab="catalog">학과 교과과정에서 선택</button>' +
          '<button type="button" class="modal-tab" data-tab="search">직접 검색해서 추가</button>' +
        '</div>' +
        '<div class="modal-body" id="modal-body"></div>' +
        '<div class="modal-footer" id="modal-footer"></div>' +
      '</div>' +
    '</div>';

  document.getElementById('modal-overlay').addEventListener('click', function (e) {
    if (e.target === e.currentTarget) closeCourseModal();
  });
  document.getElementById('modal-close-btn').addEventListener('click', closeCourseModal);

  bindModalTabs();
  renderModalBody();
}

function bindModalTabs() {
  Array.prototype.forEach.call(document.querySelectorAll('.modal-tab'), function (btn) {
    btn.addEventListener('click', function () {
      _modalState.activeTab = btn.dataset.tab;
      Array.prototype.forEach.call(document.querySelectorAll('.modal-tab'), function (b) {
        b.classList.toggle('modal-tab--active', b === btn);
      });
      renderModalBody();
    });
  });
}

function renderModalBody() {
  var bodyEl = document.getElementById('modal-body');
  if (_modalState.activeTab === 'catalog') {
    bodyEl.innerHTML = renderCatalogTabBody();
    bindCatalogTabEvents();
  } else {
    bodyEl.innerHTML = renderSearchTabBody();
    bindSearchTabEvents();
  }
  renderModalFooter();
}

/* ============================================================
   탭 1 — 학과 교과과정에서 선택
   ============================================================ */

function buildSidebarHTML() {
  var req = getActiveRequirements();
  var catalogByCode = getActiveCatalogByCode();
  var result = state.result;
  var generalCard = result ? findCard(result, 'general') : null;
  var majorCard = result ? findCard(result, 'major') : null;

  function areaProgress(key) {
    var def = req.generalAreas.filter(function (a) { return a.key === key; })[0];
    var required = def ? def.required : 0;
    if (!generalCard) return { earned: 0, required: required };
    var a = generalCard.areas.filter(function (x) { return x.key === key; })[0];
    return a ? { earned: a.earned, required: a.required } : { earned: 0, required: required };
  }

  var areaRowsHTML = req.generalAreas.map(function (def) {
    var p = areaProgress(def.key);
    var active = _modalState.selectedCategory === 'GEN_REQ' && _modalState.selectedArea === def.key;
    return (
      '<button type="button" class="modal-sidebar__sub' + (active ? ' modal-sidebar__sub--active' : '') + '" data-sidebar-category="GEN_REQ" data-sidebar-area="' + def.key + '">' +
        '<span>' + def.name + '</span>' +
        '<span class="modal-sidebar__count">' + p.earned + '/' + p.required + '</span>' +
      '</button>'
    );
  }).join('');

  var majorEarned = majorCard ? majorCard.earnedCourses : 0;

  function electiveEarnedCredit(category) {
    return state.courses.reduce(function (sum, c) {
      var cat = catalogByCode[c.code];
      var effectiveCat = c.category || (cat && cat.category);
      return effectiveCat === category ? sum + (cat ? cat.credit : 0) : sum;
    }, 0);
  }

  function topItem(category, label, dotColor) {
    var active = _modalState.selectedCategory === category;
    var count = category === 'MAJOR_REQ'
      ? majorEarned + '/' + req.majorRequiredCount
      : electiveEarnedCredit(category) + '학점';
    return (
      '<button type="button" class="modal-sidebar__item' + (active ? ' modal-sidebar__item--active' : '') + '" data-sidebar-category="' + category + '">' +
        '<span class="modal-sidebar__dot" style="background:' + dotColor + '"></span>' +
        '<span>' + label + '</span>' +
        '<span class="modal-sidebar__count">' + count + '</span>' +
      '</button>'
    );
  }

  return (
    '<div class="modal-sidebar__group">' +
      '<div class="modal-sidebar__group-label"><span class="modal-sidebar__dot" style="background:var(--orb-general)"></span>교양필수 <span class="modal-sidebar__group-total">' + req.credits.general + '학점</span></div>' +
      areaRowsHTML +
    '</div>' +
    topItem('MAJOR_REQ', '전공필수', 'var(--primary)') +
    topItem('MAJOR_ELEC', '전공선택', 'var(--orb-major)') +
    topItem('GEN_ELEC', '교양선택', 'var(--orb-general)') +
    topItem('FREE_ELEC', '일반선택·타과', 'var(--orb-off)') +
    '<p class="modal-sidebar__hint">목록에 없는 과목은 위의 "직접 검색해서 추가"에서 찾을 수 있어요.</p>'
  );
}

function getCategoryHeaderInfo() {
  var cat = _modalState.selectedCategory;
  var req = getActiveRequirements();
  var program = getActiveProgram();
  if (cat === 'MAJOR_REQ') {
    return { title: '전공필수', desc: program.admissionYear + '학번 기준 ' + req.majorRequiredCount + '과목 · ' + req.credits.major + '학점 · 이미 들은 과목은 회색' };
  }
  if (cat === 'GEN_REQ') {
    var areaDef = req.generalAreas.filter(function (a) { return a.key === _modalState.selectedArea; })[0] || req.generalAreas[0];
    var desc = areaDef.required + '학점 · ' + areaDef.desc;
    return { title: areaDef.name, desc: desc };
  }
  if (cat === 'MAJOR_ELEC') return { title: '전공선택', desc: program.admissionYear + '학번 기준 ' + req.credits.majorElective + '학점(단일전공) · 전공 중 골라서 학점만 채우면 돼요 · 이미 들은 과목은 회색' };
  if (cat === 'GEN_ELEC') return { title: '교양선택', desc: '필수 외 교양 · 인정 기준 확인 필요 · 학점만 채우면 OK' };
  if (cat === 'FREE_ELEC') return { title: '일반선택·타과', desc: '타과 전공·교양 등 무엇이든 OK · "직접 검색해서 추가"에서 찾아보세요' };
  return { title: '', desc: '' };
}

function getCatalogFilterChips() {
  if (_modalState.selectedCategory === 'GEN_REQ' && _modalState.selectedArea === 'core') {
    return {
      colorClass: 'modal-chip--gen',
      activeValue: _modalState.selectedCoreZone,
      items: [
        { value: 'all', label: '전체' },
        { value: '1', label: '1영역 인간·가치·공존' },
        { value: '2', label: '2영역 역사·사상·문화' },
        { value: '4', label: '4영역 사회·제도·세계' },
        { value: '6', label: '6영역 수리·정보·기술' }
      ]
    };
  }
  if (_modalState.selectedCategory === 'MAJOR_REQ' || _modalState.selectedCategory === 'MAJOR_ELEC') {
    return {
      colorClass: 'modal-chip--major',
      activeValue: _modalState.selectedGrade,
      items: [
        { value: 'all', label: '전체' },
        { value: '1', label: '1학년' },
        { value: '2', label: '2학년' },
        { value: '3', label: '3학년' },
        { value: '4', label: '4학년' }
      ]
    };
  }
  return null;
}

function getCatalogRows() {
  var cat = _modalState.selectedCategory;
  var catalog = getActiveCatalog();
  var rows;
  if (cat === 'GEN_REQ') {
    rows = catalog.filter(function (c) { return c.curriculum && c.category === 'GEN_REQ' && c.area === _modalState.selectedArea; });
  } else {
    rows = catalog.filter(function (c) { return c.curriculum && c.category === cat; });
  }

  if ((cat === 'MAJOR_REQ' || cat === 'MAJOR_ELEC') && _modalState.selectedGrade !== 'all') {
    rows = rows.filter(function (c) { return String(c.grade) === _modalState.selectedGrade; });
  }
  if (cat === 'GEN_REQ' && _modalState.selectedArea === 'core' && _modalState.selectedCoreZone !== 'all') {
    rows = rows.filter(function (c) { return String(c.zone) === _modalState.selectedCoreZone; });
  }

  var q = (_modalState.catalogSearchQuery || '').trim();
  if (q) {
    rows = rows.filter(function (c) { return c.name.indexOf(q) !== -1 || c.code.toUpperCase().indexOf(q.toUpperCase()) !== -1; });
  }
  return rows;
}

function renderCatalogTabBody() {
  var info = getCategoryHeaderInfo();
  var chips = getCatalogFilterChips();
  var chipsHTML = '';
  if (chips) {
    chipsHTML = '<div class="modal-filter-chips">' + chips.items.map(function (chip) {
      var active = chip.value === chips.activeValue;
      return '<button type="button" class="modal-chip ' + chips.colorClass + (active ? ' modal-chip--active' : '') + '" data-chip-value="' + chip.value + '">' + chip.label + '</button>';
    }).join('') + '</div>';
  }

  return (
    '<div class="modal-catalog">' +
      '<aside class="modal-sidebar">' + buildSidebarHTML() + '</aside>' +
      '<div class="modal-catalog-main">' +
        '<div class="modal-catalog-main__head">' +
          '<div>' +
            '<h3 class="modal-catalog-main__title">' + info.title + '</h3>' +
            '<p class="modal-catalog-main__desc">' + info.desc + '</p>' +
          '</div>' +
          '<input type="text" id="catalog-search-input" class="modal-search-input" placeholder="이 범주에서 검색" value="' + escapeAttr(_modalState.catalogSearchQuery) + '">' +
        '</div>' +
        chipsHTML +
        '<div class="modal-table-wrap" id="catalog-table-wrap">' + buildCatalogTableHTML() + '</div>' +
      '</div>' +
    '</div>'
  );
}

function buildCatalogTableHTML() {
  var rows = getCatalogRows();
  if (rows.length === 0) return buildEmptySearchStateHTML();

  var isCore = _modalState.selectedCategory === 'GEN_REQ' && _modalState.selectedArea === 'core';
  var lastColHeader = isCore ? '영역' : '권장 학년';
  var VISIBLE = 6;
  var moreCount = Math.max(0, rows.length - VISIBLE);
  var bodyRowsHTML = rows.map(function (c) { return buildCatalogRowHTML(c, isCore); }).join('');
  var hintHTML = moreCount > 0 ? '<p class="modal-table__hint">아래로 스크롤하면 ' + moreCount + '과목 더 있어요.</p>' : '';

  return (
    '<table class="modal-table">' +
      '<thead><tr><th></th><th>과목명</th><th>학점</th><th>학수번호</th><th>' + lastColHeader + '</th><th>상태</th></tr></thead>' +
      '<tbody>' + bodyRowsHTML + '</tbody>' +
    '</table>' + hintHTML
  );
}

function buildCatalogRowHTML(c, isCore) {
  var isTaken = state.courses.some(function (x) { return x.code === c.code; });
  var draftEntry = _modalState.draft.filter(function (d) { return d.code === c.code; })[0];

  var rowClass = 'modal-row';
  var statusHTML = '';
  var checked = false;

  if (isTaken && (!draftEntry || draftEntry.mode !== 'remove')) {
    rowClass += ' modal-row--taken';
    statusHTML = '<span class="modal-row__status modal-row__status--taken">이수 완료</span>';
    checked = true;
  } else if (isTaken && draftEntry && draftEntry.mode === 'remove') {
    rowClass += ' modal-row--pending-remove';
    statusHTML = '<span class="modal-row__status modal-row__status--remove">빼는 중</span>';
  } else if (!isTaken && draftEntry && draftEntry.mode === 'add') {
    rowClass += (c.category === 'GEN_REQ') ? ' modal-row--draft-gen' : ' modal-row--draft-major';
    statusHTML = '<span class="modal-row__status modal-row__status--draft">담는 중</span>';
    checked = true;
  }

  var lastColValue = isCore ? (CORE_ZONE_LABELS[c.zone] || '') : (c.grade ? c.grade + '학년' : '-');

  return (
    '<tr class="' + rowClass + '" data-row-code="' + c.code + '">' +
      '<td><input type="checkbox" class="modal-row__checkbox" data-row-code="' + c.code + '"' + (checked ? ' checked' : '') + '></td>' +
      '<td class="modal-row__name">' + c.name + '</td>' +
      '<td>' + c.credit + '</td>' +
      '<td class="modal-row__code">' + c.code + '</td>' +
      '<td>' + lastColValue + '</td>' +
      '<td>' + statusHTML + '</td>' +
    '</tr>'
  );
}

function buildEmptySearchStateHTML() {
  return (
    '<div class="modal-empty-state">' +
      '<p class="modal-empty-state__title">이 과목은 아직 못 찾았어요</p>' +
      '<p class="modal-empty-state__desc">과목명 일부만 입력해 보세요.</p>' +
      '<p class="modal-empty-state__example">예: 알고리즘 → 알고</p>' +
    '</div>'
  );
}

function bindCatalogTabEvents() {
  var body = document.getElementById('modal-body');

  Array.prototype.forEach.call(body.querySelectorAll('[data-sidebar-category]'), function (btn) {
    btn.addEventListener('click', function () {
      _modalState.selectedCategory = btn.dataset.sidebarCategory;
      _modalState.selectedArea = btn.dataset.sidebarArea || null;
      _modalState.catalogSearchQuery = '';
      _modalState.selectedGrade = 'all';
      _modalState.selectedCoreZone = 'all';
      renderModalBody();
    });
  });

  bindCatalogMainEvents();
}

function bindCatalogMainEvents() {
  var body = document.getElementById('modal-body');

  var searchInput = document.getElementById('catalog-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', function () {
      _modalState.catalogSearchQuery = searchInput.value;
      document.getElementById('catalog-table-wrap').innerHTML = buildCatalogTableHTML();
      bindCatalogRowEvents();
    });
  }

  Array.prototype.forEach.call(body.querySelectorAll('[data-chip-value]'), function (btn) {
    btn.addEventListener('click', function () {
      if (_modalState.selectedCategory === 'MAJOR_REQ' || _modalState.selectedCategory === 'MAJOR_ELEC') {
        _modalState.selectedGrade = btn.dataset.chipValue;
      } else {
        _modalState.selectedCoreZone = btn.dataset.chipValue;
      }
      renderModalBody();
    });
  });

  bindCatalogRowEvents();
}

function bindCatalogRowEvents() {
  var wrap = document.getElementById('catalog-table-wrap');
  if (!wrap) return;

  Array.prototype.forEach.call(wrap.querySelectorAll('tr[data-row-code]'), function (tr) {
    tr.addEventListener('click', function (e) {
      if (e.target.tagName === 'INPUT') return;
      toggleCatalogRow(tr.getAttribute('data-row-code'));
    });
  });

  Array.prototype.forEach.call(wrap.querySelectorAll('.modal-row__checkbox'), function (input) {
    input.addEventListener('click', function (e) { e.stopPropagation(); });
    input.addEventListener('change', function () {
      toggleCatalogRow(input.dataset.rowCode);
    });
  });
}

function toggleCatalogRow(code) {
  var cat = getActiveCatalogByCode()[code];
  if (!cat) return;
  var isTaken = state.courses.some(function (c) { return c.code === code; });
  var draftIndex = -1;
  for (var i = 0; i < _modalState.draft.length; i++) {
    if (_modalState.draft[i].code === code) { draftIndex = i; break; }
  }

  if (isTaken) {
    if (draftIndex !== -1 && _modalState.draft[draftIndex].mode === 'remove') {
      _modalState.draft.splice(draftIndex, 1);
    } else {
      _modalState.draft.push({ code: code, category: cat.category, label: cat.name, mode: 'remove', source: 'catalog' });
    }
  } else {
    if (draftIndex !== -1) {
      _modalState.draft.splice(draftIndex, 1);
    } else {
      _modalState.draft.push({ code: code, category: cat.category, label: cat.name, mode: 'add', source: 'catalog' });
    }
  }

  document.getElementById('catalog-table-wrap').innerHTML = buildCatalogTableHTML();
  bindCatalogRowEvents();
  renderModalFooter();
}

/* ============================================================
   탭 2 — 직접 검색해서 추가
   ============================================================ */

function isFixedCategoryCourse(cat) {
  return !!(cat.curriculum || cat.offeringDept === state.dept);
}

function getSearchScopeFilteredCatalog() {
  var q = (_modalState.searchQuery || '').trim();
  var myDept = state.dept;
  var rows = getActiveCatalog().filter(function (c) {
    if (!q) return true;
    return c.name.indexOf(q) !== -1 || c.code.toUpperCase().indexOf(q.toUpperCase()) !== -1;
  });

  var scope = _modalState.searchScope;
  if (scope === 'mine') rows = rows.filter(function (c) { return c.offeringDept === myDept; });
  else if (scope === 'other') rows = rows.filter(function (c) { return c.offeringDept !== myDept && c.offeringDept !== 'gen'; });
  else if (scope === 'gen') rows = rows.filter(function (c) { return c.offeringDept === 'gen'; });

  return rows;
}

function renderSearchTabBody() {
  return (
    '<div class="modal-search">' +
      '<input type="text" id="search-query-input" class="modal-search-input modal-search-input--big" placeholder="과목명 · 학수번호" value="' + escapeAttr(_modalState.searchQuery) + '">' +
      '<div class="modal-filter-chips">' + buildSearchScopeChipsHTML() + '</div>' +
      '<div class="modal-notice"><strong>안내</strong> 교과과정에 없는 과목은 <strong>일반선택</strong>으로 담겨요. 다르게 인정받는 과목이면 아래 담은 과목에서 구분을 바꿔주세요.</div>' +
      '<div class="modal-table-wrap" id="search-table-wrap">' + buildSearchTableHTML() + '</div>' +
    '</div>'
  );
}

function buildSearchScopeChipsHTML() {
  var chips = [
    { value: 'all', label: '전체 학과' },
    { value: 'mine', label: '우리 학과' },
    { value: 'other', label: '타과 전공' },
    { value: 'gen', label: '교양' }
  ];
  return chips.map(function (chip) {
    var active = chip.value === _modalState.searchScope;
    return '<button type="button" class="modal-chip modal-chip--major' + (active ? ' modal-chip--active' : '') + '" data-search-scope="' + chip.value + '">' + chip.label + '</button>';
  }).join('');
}

function buildSearchTableHTML() {
  var rows = getSearchScopeFilteredCatalog();
  var q = (_modalState.searchQuery || '').trim();

  if (rows.length === 0) return buildEmptySearchStateHTML();

  var bodyRowsHTML = rows.map(buildSearchRowHTML).join('');
  var countFooter =
    '<p class="modal-search-footer-text">' +
      (q ? '"' + q + '" 검색 결과 ' + rows.length + '개' : '전체 ' + rows.length + '개') +
      ' · 과목은 인하대 교육과정·교양 페이지 기준' +
    '</p>';

  return (
    '<table class="modal-table modal-table--search">' +
      '<thead><tr><th>과목명</th><th>개설</th><th>학점</th><th>학수번호</th><th>담기면 인정</th><th></th></tr></thead>' +
      '<tbody>' + bodyRowsHTML + '</tbody>' +
    '</table>' + countFooter
  );
}

function buildSearchRowHTML(c) {
  var isTaken = state.courses.some(function (x) { return x.code === c.code; });
  var draftEntry = _modalState.draft.filter(function (d) { return d.code === c.code; })[0];
  var isAdded = !isTaken && draftEntry && draftEntry.mode === 'add';
  var isFixed = isFixedCategoryCourse(c);
  var recognizedLabel = isFixed ? (CATEGORY_LABELS[c.category] + ' (교과과정)') : '일반선택';

  var btnHTML;
  if (isTaken) {
    btnHTML = '<button type="button" class="btn btn--outline modal-search-add-btn" disabled>이수 완료</button>';
  } else if (isAdded) {
    btnHTML = '<button type="button" class="btn modal-search-add-btn modal-search-add-btn--added" data-search-toggle="' + c.code + '">✓ 담김</button>';
  } else {
    btnHTML = '<button type="button" class="btn btn--outline modal-search-add-btn" data-search-toggle="' + c.code + '">담기</button>';
  }

  return (
    '<tr class="modal-row' + (isAdded ? ' modal-row--draft-major' : '') + '">' +
      '<td class="modal-row__name">' + c.name + '</td>' +
      '<td>' + c.offeringLabel + '</td>' +
      '<td>' + c.credit + '</td>' +
      '<td class="modal-row__code">' + c.code + '</td>' +
      '<td>' + recognizedLabel + '</td>' +
      '<td>' + btnHTML + '</td>' +
    '</tr>'
  );
}

function bindSearchTabEvents() {
  var searchInput = document.getElementById('search-query-input');
  if (searchInput) {
    searchInput.addEventListener('input', function () {
      _modalState.searchQuery = searchInput.value;
      document.getElementById('search-table-wrap').innerHTML = buildSearchTableHTML();
      bindSearchRowEvents();
    });
  }

  Array.prototype.forEach.call(document.querySelectorAll('[data-search-scope]'), function (btn) {
    btn.addEventListener('click', function () {
      _modalState.searchScope = btn.dataset.searchScope;
      renderModalBody();
    });
  });

  bindSearchRowEvents();
}

function bindSearchRowEvents() {
  var wrap = document.getElementById('search-table-wrap');
  if (!wrap) return;
  Array.prototype.forEach.call(wrap.querySelectorAll('[data-search-toggle]'), function (btn) {
    btn.addEventListener('click', function () {
      toggleSearchRow(btn.dataset.searchToggle);
    });
  });
}

function toggleSearchRow(code) {
  var cat = getActiveCatalogByCode()[code];
  if (!cat) return;
  var draftIndex = -1;
  for (var i = 0; i < _modalState.draft.length; i++) {
    if (_modalState.draft[i].code === code) { draftIndex = i; break; }
  }

  if (draftIndex !== -1) {
    _modalState.draft.splice(draftIndex, 1);
  } else {
    var isFixed = isFixedCategoryCourse(cat);
    _modalState.draft.push({
      code: code,
      category: isFixed ? cat.category : 'FREE_ELEC',
      label: cat.name,
      mode: 'add',
      source: 'search',
      editable: !isFixed
    });
  }

  document.getElementById('search-table-wrap').innerHTML = buildSearchTableHTML();
  bindSearchRowEvents();
  renderModalFooter();
}

/* ============================================================
   모달 하단 (두 탭 공통)
   ============================================================ */

function renderModalFooter() {
  var footerEl = document.getElementById('modal-footer');
  if (!footerEl) return;

  var addEntries = _modalState.draft.filter(function (d) { return d.mode === 'add'; });
  var removeEntries = _modalState.draft.filter(function (d) { return d.mode === 'remove'; });

  var addCount = addEntries.length;
  var addCredit = addEntries.reduce(function (s, d) { return s + creditOf(d.code); }, 0);
  var removeCredit = removeEntries.reduce(function (s, d) { return s + creditOf(d.code); }, 0);

  var chipsHTML = _modalState.draft.map(buildDraftChipHTML).join('');

  var existingCount = state.courses.length;
  var existingCredit = state.courses.reduce(function (s, c) { return s + creditOf(c.code); }, 0);
  var totalCount = existingCount - removeEntries.length + addCount;
  var totalCredit = existingCredit - removeCredit + addCredit;

  var isEmpty = _modalState.draft.length === 0;
  var confirmLabel = addCount > 0
    ? addCount + '개 과목 담기'
    : (removeEntries.length > 0 ? removeEntries.length + '과목 빼기' : '과목 담기');

  footerEl.innerHTML =
    '<div class="modal-footer__row1">' +
      '<p class="modal-footer__summary">새로 담은 과목 <strong>' + addCount + '개</strong> · <strong>' + addCredit + '학점</strong></p>' +
      '<div class="modal-footer__chips">' + chipsHTML + '</div>' +
      (isEmpty ? '' : '<button type="button" class="modal-footer__clear" id="modal-clear-btn">전체 삭제</button>') +
    '</div>' +
    '<div class="modal-footer__row2">' +
      '<p class="modal-footer__calc">담으면 총 <strong>' + totalCount + '과목 · ' + totalCredit + '학점</strong>으로 계산돼요</p>' +
      '<button type="button" class="btn btn--primary modal-footer__confirm' + (isEmpty ? ' is-disabled' : '') + '" id="modal-confirm-btn">' + confirmLabel + '</button>' +
    '</div>';

  bindModalFooterEvents();
}

function creditOf(code) {
  var c = getActiveCatalogByCode()[code];
  return c ? c.credit : 0;
}

function buildDraftChipHTML(d) {
  if (d.mode === 'remove') {
    return (
      '<span class="modal-chip-item modal-chip-item--remove">' +
        '빼기 · ' + d.label +
        '<button type="button" class="modal-chip-item__x" data-draft-remove="' + d.code + '">✕</button>' +
      '</span>'
    );
  }
  if (d.editable) {
    var options = ['FREE_ELEC', 'GEN_ELEC', 'MAJOR_ELEC'].map(function (val) {
      var sel = d.category === val ? ' selected' : '';
      return '<option value="' + val + '"' + sel + '>' + CATEGORY_LABELS[val] + '</option>';
    }).join('');
    return (
      '<span class="modal-chip-item">' +
        d.label +
        '<select class="modal-chip-item__select" data-draft-category="' + d.code + '">' + options + '</select>' +
        '<button type="button" class="modal-chip-item__x" data-draft-remove="' + d.code + '">✕</button>' +
      '</span>'
    );
  }
  return (
    '<span class="modal-chip-item">' +
      d.label + ' · ' + CATEGORY_LABELS[d.category] + ' (교과과정)' +
      '<button type="button" class="modal-chip-item__x" data-draft-remove="' + d.code + '">✕</button>' +
    '</span>'
  );
}

function bindModalFooterEvents() {
  var footerEl = document.getElementById('modal-footer');

  Array.prototype.forEach.call(footerEl.querySelectorAll('[data-draft-remove]'), function (btn) {
    btn.addEventListener('click', function () {
      var code = btn.dataset.draftRemove;
      _modalState.draft = _modalState.draft.filter(function (d) { return d.code !== code; });
      renderModalBody();
    });
  });

  Array.prototype.forEach.call(footerEl.querySelectorAll('[data-draft-category]'), function (select) {
    select.addEventListener('change', function () {
      var code = select.dataset.draftCategory;
      var entry = _modalState.draft.filter(function (d) { return d.code === code; })[0];
      if (entry) entry.category = select.value;
      renderModalFooter();
    });
  });

  var clearBtn = document.getElementById('modal-clear-btn');
  if (clearBtn) {
    clearBtn.addEventListener('click', function () {
      _modalState.draft = [];
      renderModalBody();
    });
  }

  var confirmBtn = document.getElementById('modal-confirm-btn');
  if (confirmBtn) {
    confirmBtn.addEventListener('click', commitModalDraft);
  }
}

/* ------------------------------------------------------------
   담기 확정 (예외 D 포함)
   ------------------------------------------------------------ */

function commitModalDraft() {
  if (_modalState.draft.length === 0) {
    showToast('장바구니가 비어 있어요. 들은 과목을 하나 이상 담아주세요.');
    return;
  }

  var adds = _modalState.draft.filter(function (d) { return d.mode === 'add'; });
  var removes = _modalState.draft.filter(function (d) { return d.mode === 'remove'; });

  removes.forEach(function (d) {
    state.courses = state.courses.filter(function (c) { return c.code !== d.code; });
  });
  adds.forEach(function (d) {
    if (!state.courses.some(function (c) { return c.code === d.code; })) {
      state.courses.push({ code: d.code, category: d.category });
    }
  });

  closeCourseModal();
  runEvaluateAfterCommit();
}

function runEvaluateAfterCommit() {
  showLoading();
  apiEvaluate({ dept: state.dept, year: state.year, courses: state.courses, certs: state.certs })
    .then(function (result) {
      state.result = result;
      hideLoading();
      if (getCurrentRoute() === 'dashboard') {
        renderDashboard();
      } else {
        navigate('dashboard');
      }
    })
    .catch(function () {
      hideLoading();
      showErrorOverlay(runEvaluateAfterCommit);
    });
}
