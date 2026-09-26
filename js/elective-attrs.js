/* ============================================================
   elective-attrs.js — 교양 추천용 과목 속성
   강의계획서 기반 예시값 · 실제 데이터 출처 미정 · 학수번호로 curriculum-data.js 과목과 연결

   강의계획서는 로그인 없이 받을 수 없어서(curriculum_data/DATA_NEEDS.md) 평가 비율·팀플·
   출석 정보가 실제 데이터에 없다. 여기 있는 값은 화면 시연용 예시다.
   속성이 없는 과목은 추천 후보에서 빠진다.

   - examRatio, assignRatio, attendance: 비율(%)
   - team: 조별과제·발표 여부
   - writing: 글쓰기 비중 (0 적음, 1 보통, 2 많음)
   ============================================================ */

var ELECTIVE_ATTRS = {
  /* 핵심교양 1영역 인간·가치·공존 */
  GED1005: { examRatio: 30, assignRatio: 50, team: true, writing: 1, attendance: 10 },  // 인간-AI-기계
  GED1014: { examRatio: 60, assignRatio: 30, team: false, writing: 1, attendance: 10 }, // 인공지능 시대의 사랑, 행복, 정의

  /* 핵심교양 2영역 역사·사상·문화 */
  GED2004: { examRatio: 60, assignRatio: 30, team: false, writing: 0, attendance: 10 }, // 서양철학 : 거인들의 어깨
  GED2001: { examRatio: 70, assignRatio: 20, team: false, writing: 0, attendance: 10 }, // 역사 속의 라이벌

  /* 핵심교양 4영역 사회·제도·세계 */
  GED4006: { examRatio: 50, assignRatio: 40, team: false, writing: 1, attendance: 10 }, // 국제관계학개론
  GED4005: { examRatio: 40, assignRatio: 40, team: false, writing: 1, attendance: 20 }, // 글로벌 사회의 이해

  /* SW·AI */
  GEE7014: { examRatio: 40, assignRatio: 50, team: false, writing: 0, attendance: 10 }, // 컴퓨터비전 중심 인공지능 입문
  GEE7018: { examRatio: 40, assignRatio: 50, team: false, writing: 1, attendance: 10 }, // 데이터사이언스 이해
  GEE7007: { examRatio: 30, assignRatio: 50, team: true, writing: 1, attendance: 10 },  // 디지털 경영

  /* 창의 */
  GEE4007: { examRatio: 20, assignRatio: 70, team: false, writing: 1, attendance: 10 }, // 발명과 특허
  GEE4001: { examRatio: 60, assignRatio: 30, team: false, writing: 1, attendance: 15 }, // 지적재산권의 이해
  GEE4019: { examRatio: 10, assignRatio: 70, team: true, writing: 2, attendance: 20 }   // 스타트업 아이디어 발상
};
