/* ============================================================
   render-start.js — 01 시작 화면 (#start)
   ============================================================ */

function renderStart() {
  var el = document.getElementById('view-start');

  var deptOptionsHTML = CURRICULUM_DEPTS.map(function (d) {
    return '<option value="' + d.code + '">' + d.label + '</option>';
  }).join('');
  var yearOptionsHTML = CURRICULUM_YEARS.map(function (y) {
    return '<option value="' + y + '">' + y + '</option>';
  }).join('');

  el.innerHTML =
    '<div class="start-screen container">' +
      '<div class="start-grid">' +

        '<div class="start-panel">' +
          '<span class="start-badge" id="start-badge"></span>' +
          '<h1 class="start-title">소원은 하나,<br>여의주는 넷</h1>' +
          '<p class="start-desc">들은 과목만 담으면 몇 개 모았는지, 나머지는 어디 있는지 알려드려요.</p>' +
          '<div class="start-wish-pill">✦ 넷 다 모으면 빌 수 있는 소원 <strong class="start-wish-text">학사모</strong></div>' +

          '<div class="start-orbs">' +
            '<div class="start-orb-item start-orb-item--1">' +
              '<span class="sparkle sparkle--a" aria-hidden="true">✦</span>' +
              '<span class="orb orb--total start-orb"></span>' +
              '<span class="start-orb-label" id="start-orb-label-total"></span>' +
            '</div>' +
            '<div class="start-orb-item start-orb-item--2">' +
              '<span class="orb orb--major start-orb"></span>' +
              '<span class="sparkle sparkle--b" aria-hidden="true">✦</span>' +
              '<span class="start-orb-label" id="start-orb-label-major"></span>' +
            '</div>' +
            '<div class="start-orb-item start-orb-item--3">' +
              '<span class="orb orb--general start-orb"></span>' +
              '<span class="start-orb-label" id="start-orb-label-general"></span>' +
            '</div>' +
            '<div class="start-orb-item start-orb-item--4">' +
              '<span class="sparkle sparkle--c" aria-hidden="true">✦</span>' +
              '<span class="orb orb--cert start-orb"></span>' +
              '<span class="start-orb-label">졸업인증<br>영어 등</span>' +
            '</div>' +
          '</div>' +
        '</div>' +

        '<div class="card start-card">' +
          '<h2 class="start-card__title">내 여의주 찾기</h2>' +
          '<p class="start-card__desc">학과와 입학연도로 모을 여의주가 정해져요.</p>' +

          '<label class="start-field">' +
            '<span class="start-field__label">학과</span>' +
            '<select id="start-dept-select" class="start-select">' + deptOptionsHTML + '</select>' +
          '</label>' +

          '<label class="start-field">' +
            '<span class="start-field__label">입학연도</span>' +
            '<select id="start-year-select" class="start-select">' + yearOptionsHTML + '</select>' +
          '</label>' +

          '<button type="button" id="start-confirm-btn" class="btn btn--primary start-confirm-btn">내 여의주 확인하기</button>' +

          '<div class="start-resume-box" hidden>' +
            '<p class="start-resume-box__title">모으던 여의주가 있어요</p>' +
            '<button type="button" class="btn btn--outline start-resume-btn">이어하기</button>' +
          '</div>' +
        '</div>' +

      '</div>' +
    '</div>';

  document.getElementById('start-confirm-btn').addEventListener('click', handleStartConfirm);
  document.getElementById('start-dept-select').addEventListener('change', updateStartSummary);
  document.getElementById('start-year-select').addEventListener('change', updateStartSummary);
  updateStartSummary();
}

function updateStartSummary() {
  var dept = document.getElementById('start-dept-select').value;
  var year = document.getElementById('start-year-select').value;
  var program = CURRICULUM_DATA[dept + '_' + year];
  if (!program) return;
  var req = program.requirements;

  document.getElementById('start-badge').textContent = program.departmentName + ' ' + program.admissionYear + '학번';
  document.getElementById('start-orb-label-total').innerHTML = '총학점<br>' + req.totalRequired + '학점';
  document.getElementById('start-orb-label-major').innerHTML = '전공필수<br>' + req.majorRequiredCount + '과목';
  document.getElementById('start-orb-label-general').innerHTML = '교양필수<br>' + req.credits.general + '학점';
}

function handleStartConfirm() {
  var dept = document.getElementById('start-dept-select').value;
  var year = parseInt(document.getElementById('start-year-select').value, 10);

  state.dept = dept;
  state.year = year;

  showLoading();
  apiEvaluate({ dept: dept, year: year, courses: state.courses, certs: state.certs })
    .then(function (result) {
      state.result = result;
      hideLoading();
      navigate('dashboard');
    })
    .catch(function () {
      hideLoading();
      showErrorOverlay(handleStartConfirm);
    });
}
