document.getElementById('evaluate-btn').addEventListener('click', async () => {
  const out = document.getElementById('result');
  out.textContent = '요청 중...';
  try {
    const data = await Api.evaluate();
    out.textContent = JSON.stringify(data, null, 2);
  } catch (e) {
    out.textContent = '실패: ' + e.message;
  }
});
