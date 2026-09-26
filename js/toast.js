/* ============================================================
   토스트 공통 컴포넌트
   하단 가운데에 표시되고 2.5초 뒤 자동으로 사라진다.
   ============================================================ */

var _toastTimer = null;

function showToast(message) {
  var root = document.getElementById('toast-root');
  if (!root) return;
  root.textContent = message;
  root.classList.add('toast--visible');
  clearTimeout(_toastTimer);
  _toastTimer = setTimeout(function () {
    root.classList.remove('toast--visible');
  }, 2500);
}
