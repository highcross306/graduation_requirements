// 서버 API 호출 모음. 컨텍스트 경로가 바뀌어도 동작하도록 상대 경로를 쓴다.
const Api = {
  async evaluate(takenCourses = []) {
    const res = await fetch('api/evaluate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ takenCourses })
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  }
};
