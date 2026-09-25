/* ============================================================
   curriculum-data.js — 자동 생성 파일 (직접 수정하지 말 것)
   원본: curriculum_data/ (수정 금지, 학과×입학연도 실제 졸업요건 원천 데이터)
   생성: tools/build-curriculum-data.js (원본이 바뀌면 다시 실행해서 갱신)
   ============================================================ */

var CURRICULUM_DEPTS = [
  {
    "code": "ai",
    "label": "인공지능공학과"
  },
  {
    "code": "cse",
    "label": "컴퓨터공학과"
  }
];

var CURRICULUM_YEARS = [
  2025,
  2026
];

var CURRICULUM_DATA = {
  "ai_2025": {
    "id": "ai_2025",
    "departmentCode": "AIE",
    "departmentName": "인공지능공학과",
    "admissionYear": 2025,
    "requirements": {
      "totalRequired": 130,
      "credits": {
        "general": 34,
        "major": 43,
        "majorElective": 22,
        "freeElective": 31
      },
      "majorRequiredCount": 14,
      "generalAreas": [
        {
          "key": "focus",
          "name": "중점교양",
          "required": 4,
          "dedupBy": "code",
          "desc": "공통 지정 과목: 크로스오버1 : 인간의 탐색, 크로스오버3 : 사회의 탐색"
        },
        {
          "key": "basic",
          "name": "기초교양",
          "required": 12,
          "dedupBy": "code",
          "desc": "공통 지정 과목 전체 + 의사소통 영어(영어 기초학력평가로 1과목 지정) 중 택1"
        },
        {
          "key": "core",
          "name": "핵심교양",
          "required": 12,
          "dedupBy": "zone",
          "desc": "1·2·4·6영역에서 각 1과목씩 (6영역은 GED6009 지정) · 같은 영역 2과목은 1과목만 인정"
        },
        {
          "key": "swai",
          "name": "SW·AI (일반교양 7영역)",
          "required": 3,
          "dedupBy": "zone",
          "desc": "SW·AI 트랙 지정 과목 중 택1"
        },
        {
          "key": "creative",
          "name": "창의",
          "required": 3,
          "dedupBy": "zone",
          "desc": "창의 영역 지정 과목 중 택1"
        }
      ],
      "certOptions": [
        {
          "id": "toeic",
          "label": "TOEIC 700점 이상"
        },
        {
          "id": "toeic_speaking",
          "label": "TOEIC Speaking 130점 이상"
        },
        {
          "id": "toefl_pbt",
          "label": "TOEFL PBT 540점 이상"
        },
        {
          "id": "toefl_cbt",
          "label": "TOEFL CBT 207점 이상"
        },
        {
          "id": "toefl_ibt",
          "label": "TOEFL iBT 76점 이상"
        },
        {
          "id": "new_teps",
          "label": "NEW TEPS 327점 이상"
        },
        {
          "id": "opic",
          "label": "OPIc IM1 이상"
        },
        {
          "id": "ielts",
          "label": "IELTS 6.0 이상"
        },
        {
          "id": "course",
          "label": "졸업인증실용영어 (GEE3001) 이수"
        },
        {
          "id": "specialLecture",
          "label": "졸업인증 토익특강"
        }
      ],
      "notices": [
        "재수강 과목과 F 학점은 반영하지 않음",
        "최종 졸업 판정은 학과 졸업사정 기준"
      ]
    },
    "courses": [
      {
        "code": "AIE1001",
        "name": "객체지향프로그래밍 1",
        "credit": 3,
        "category": "MAJOR_REQ",
        "grade": 1,
        "recYear": 1,
        "recSem": [
          1
        ],
        "recEstimated": false,
        "curriculum": true,
        "offeringDept": "ai",
        "offeringLabel": "인공지능공학과",
        "prereq": []
      },
      {
        "code": "AIE1002",
        "name": "객체지향프로그래밍 2",
        "credit": 3,
        "category": "MAJOR_REQ",
        "grade": 1,
        "recYear": 1,
        "recSem": [
          2
        ],
        "recEstimated": false,
        "curriculum": true,
        "offeringDept": "ai",
        "offeringLabel": "인공지능공학과",
        "prereq": [
          "AIE1001"
        ]
      },
      {
        "code": "AIE1005",
        "name": "이산구조",
        "credit": 3,
        "category": "MAJOR_REQ",
        "grade": 1,
        "recYear": 1,
        "recSem": [
          2
        ],
        "recEstimated": false,
        "curriculum": true,
        "offeringDept": "ai",
        "offeringLabel": "인공지능공학과",
        "prereq": []
      },
      {
        "code": "AIE2001",
        "name": "자료구조",
        "credit": 4,
        "category": "MAJOR_REQ",
        "grade": 2,
        "recYear": 2,
        "recSem": [
          1
        ],
        "recEstimated": false,
        "curriculum": true,
        "offeringDept": "ai",
        "offeringLabel": "인공지능공학과",
        "prereq": [
          "AIE1002"
        ]
      },
      {
        "code": "AIE2002",
        "name": "인공지능프로그래밍",
        "credit": 3,
        "category": "MAJOR_REQ",
        "grade": 2,
        "recYear": 2,
        "recSem": [
          2
        ],
        "recEstimated": false,
        "curriculum": true,
        "offeringDept": "ai",
        "offeringLabel": "인공지능공학과",
        "prereq": [
          "AIE2001"
        ]
      },
      {
        "code": "AIE2003",
        "name": "선형대수",
        "credit": 3,
        "category": "MAJOR_REQ",
        "grade": 2,
        "recYear": 2,
        "recSem": [
          1
        ],
        "recEstimated": false,
        "curriculum": true,
        "offeringDept": "ai",
        "offeringLabel": "인공지능공학과",
        "prereq": []
      },
      {
        "code": "AIE2004",
        "name": "인공지능확률론",
        "credit": 3,
        "category": "MAJOR_REQ",
        "grade": 2,
        "recYear": 2,
        "recSem": [
          2
        ],
        "recEstimated": false,
        "curriculum": true,
        "offeringDept": "ai",
        "offeringLabel": "인공지능공학과",
        "prereq": [
          "AIE2001",
          "AIE2011"
        ]
      },
      {
        "code": "AIE3001",
        "name": "기계학습",
        "credit": 3,
        "category": "MAJOR_REQ",
        "grade": 3,
        "recYear": 3,
        "recSem": [
          1
        ],
        "recEstimated": false,
        "curriculum": true,
        "offeringDept": "ai",
        "offeringLabel": "인공지능공학과",
        "prereq": [
          "AIE2001"
        ]
      },
      {
        "code": "AIE3002",
        "name": "알고리즘",
        "credit": 3,
        "category": "MAJOR_REQ",
        "grade": 3,
        "recYear": 3,
        "recSem": [
          1
        ],
        "recEstimated": false,
        "curriculum": true,
        "offeringDept": "ai",
        "offeringLabel": "인공지능공학과",
        "prereq": [
          "AIE2001",
          "AIE2002"
        ]
      },
      {
        "code": "AIE3003",
        "name": "인공신경망",
        "credit": 3,
        "category": "MAJOR_REQ",
        "grade": 3,
        "recYear": 3,
        "recSem": [
          2
        ],
        "recEstimated": false,
        "curriculum": true,
        "offeringDept": "ai",
        "offeringLabel": "인공지능공학과",
        "prereq": [
          "AIE2001",
          "AIE3001"
        ]
      },
      {
        "code": "AIE4001",
        "name": "인공지능종합설계",
        "credit": 3,
        "category": "MAJOR_REQ",
        "grade": 4,
        "recYear": 4,
        "recSem": [
          1,
          2
        ],
        "recEstimated": false,
        "curriculum": true,
        "offeringDept": "ai",
        "offeringLabel": "인공지능공학과",
        "prereq": [
          "AIE2001",
          "AIE3002"
        ]
      },
      {
        "code": "AIE2011",
        "name": "통계학",
        "credit": 3,
        "category": "MAJOR_REQ",
        "grade": 2,
        "recYear": 2,
        "recSem": [
          1
        ],
        "recEstimated": false,
        "curriculum": true,
        "offeringDept": "ai",
        "offeringLabel": "인공지능공학과",
        "prereq": [
          "MTH1902"
        ]
      },
      {
        "code": "MTH1901",
        "name": "일반수학 1",
        "credit": 3,
        "category": "MAJOR_REQ",
        "grade": 1,
        "recYear": 1,
        "recSem": [
          1
        ],
        "recEstimated": false,
        "curriculum": true,
        "offeringDept": "ai",
        "offeringLabel": "인공지능공학과",
        "prereq": []
      },
      {
        "code": "MTH1902",
        "name": "일반수학 2",
        "credit": 3,
        "category": "MAJOR_REQ",
        "grade": 1,
        "recYear": 1,
        "recSem": [
          2
        ],
        "recEstimated": false,
        "curriculum": true,
        "offeringDept": "ai",
        "offeringLabel": "인공지능공학과",
        "prereq": [
          "MTH1901"
        ]
      },
      {
        "code": "AIE1004",
        "name": "인공지능창의설계",
        "credit": 3,
        "category": "MAJOR_ELEC",
        "grade": 1,
        "recYear": 1,
        "recSem": [
          2
        ],
        "recEstimated": false,
        "curriculum": true,
        "offeringDept": "ai",
        "offeringLabel": "인공지능공학과",
        "prereq": []
      },
      {
        "code": "AIE1006",
        "name": "인공지능 입문",
        "credit": 2,
        "category": "MAJOR_ELEC",
        "grade": 1,
        "recYear": 1,
        "recSem": [
          1
        ],
        "recEstimated": false,
        "curriculum": true,
        "offeringDept": "ai",
        "offeringLabel": "인공지능공학과",
        "prereq": []
      },
      {
        "code": "AIE2005",
        "name": "파이썬기반응용프로그래밍",
        "credit": 3,
        "category": "MAJOR_ELEC",
        "grade": 2,
        "recYear": 2,
        "recSem": [
          1
        ],
        "recEstimated": false,
        "curriculum": true,
        "offeringDept": "ai",
        "offeringLabel": "인공지능공학과",
        "prereq": [
          "AIE1002"
        ]
      },
      {
        "code": "AIE2008",
        "name": "디지털 신호처리",
        "credit": 3,
        "category": "MAJOR_ELEC",
        "grade": 2,
        "recYear": 2,
        "recSem": [
          2
        ],
        "recEstimated": false,
        "curriculum": true,
        "offeringDept": "ai",
        "offeringLabel": "인공지능공학과",
        "prereq": [
          "AIE2001"
        ]
      },
      {
        "code": "AIE2009",
        "name": "오픈소스SW개론",
        "credit": 3,
        "category": "MAJOR_ELEC",
        "grade": 2,
        "recYear": 2,
        "recSem": [
          1
        ],
        "recEstimated": false,
        "curriculum": true,
        "offeringDept": "ai",
        "offeringLabel": "인공지능공학과",
        "prereq": []
      },
      {
        "code": "AIE2010",
        "name": "논리회로",
        "credit": 3,
        "category": "MAJOR_ELEC",
        "grade": 2,
        "recYear": 2,
        "recSem": [
          2
        ],
        "recEstimated": false,
        "curriculum": true,
        "offeringDept": "ai",
        "offeringLabel": "인공지능공학과",
        "prereq": []
      },
      {
        "code": "AIE3004",
        "name": "자연어처리",
        "credit": 3,
        "category": "MAJOR_ELEC",
        "grade": 3,
        "recYear": 3,
        "recSem": [
          2
        ],
        "recEstimated": false,
        "curriculum": true,
        "offeringDept": "ai",
        "offeringLabel": "인공지능공학과",
        "prereq": [
          "AIE2001"
        ]
      },
      {
        "code": "AIE3006",
        "name": "운영체제론",
        "credit": 3,
        "category": "MAJOR_ELEC",
        "grade": 3,
        "recYear": 3,
        "recSem": [
          1
        ],
        "recEstimated": false,
        "curriculum": true,
        "offeringDept": "ai",
        "offeringLabel": "인공지능공학과",
        "prereq": [
          "AIE2001",
          "AIE2008"
        ]
      },
      {
        "code": "AIE3007",
        "name": "데이터베이스",
        "credit": 3,
        "category": "MAJOR_ELEC",
        "grade": 3,
        "recYear": 3,
        "recSem": [
          1
        ],
        "recEstimated": false,
        "curriculum": true,
        "offeringDept": "ai",
        "offeringLabel": "인공지능공학과",
        "prereq": [
          "AIE2001"
        ]
      },
      {
        "code": "AIE3008",
        "name": "컴퓨터 비전",
        "credit": 3,
        "category": "MAJOR_ELEC",
        "grade": 3,
        "recYear": 3,
        "recSem": [
          2
        ],
        "recEstimated": false,
        "curriculum": true,
        "offeringDept": "ai",
        "offeringLabel": "인공지능공학과",
        "prereq": [
          "AIE2001"
        ]
      },
      {
        "code": "AIE3009",
        "name": "컴퓨터 네트워크",
        "credit": 3,
        "category": "MAJOR_ELEC",
        "grade": 3,
        "recYear": 3,
        "recSem": [
          2
        ],
        "recEstimated": false,
        "curriculum": true,
        "offeringDept": "ai",
        "offeringLabel": "인공지능공학과",
        "prereq": [
          "AIE2001"
        ]
      },
      {
        "code": "AIE3010",
        "name": "컴퓨터구조론",
        "credit": 3,
        "category": "MAJOR_ELEC",
        "grade": 3,
        "recYear": 3,
        "recSem": [
          1
        ],
        "recEstimated": false,
        "curriculum": true,
        "offeringDept": "ai",
        "offeringLabel": "인공지능공학과",
        "prereq": [
          "AIE2001"
        ]
      },
      {
        "code": "AIE3011",
        "name": "문제해결기법",
        "credit": 4,
        "category": "MAJOR_ELEC",
        "grade": 3,
        "recYear": 3,
        "recSem": [
          2
        ],
        "recEstimated": false,
        "curriculum": true,
        "offeringDept": "ai",
        "offeringLabel": "인공지능공학과",
        "prereq": [
          "AIE2001"
        ]
      },
      {
        "code": "AIE3012",
        "name": "인공지능",
        "credit": 3,
        "category": "MAJOR_ELEC",
        "grade": 3,
        "recYear": 3,
        "recSem": [
          1
        ],
        "recEstimated": false,
        "curriculum": true,
        "offeringDept": "ai",
        "offeringLabel": "인공지능공학과",
        "prereq": [
          "AIE2001"
        ]
      },
      {
        "code": "AIE3013",
        "name": "병렬컴퓨팅",
        "credit": 3,
        "category": "MAJOR_ELEC",
        "grade": 3,
        "recYear": 3,
        "recSem": [
          2
        ],
        "recEstimated": false,
        "curriculum": true,
        "offeringDept": "ai",
        "offeringLabel": "인공지능공학과",
        "prereq": [
          "AIE2001"
        ]
      },
      {
        "code": "AIE4003",
        "name": "강화학습",
        "credit": 3,
        "category": "MAJOR_ELEC",
        "grade": 4,
        "recYear": 4,
        "recSem": [
          1
        ],
        "recEstimated": false,
        "curriculum": true,
        "offeringDept": "ai",
        "offeringLabel": "인공지능공학과",
        "prereq": [
          "AIE2001"
        ]
      },
      {
        "code": "AIE4004",
        "name": "인공지능보안",
        "credit": 3,
        "category": "MAJOR_ELEC",
        "grade": 4,
        "recYear": 4,
        "recSem": [
          1
        ],
        "recEstimated": false,
        "curriculum": true,
        "offeringDept": "ai",
        "offeringLabel": "인공지능공학과",
        "prereq": [
          "AIE2001"
        ]
      },
      {
        "code": "AIE4005",
        "name": "데이터마이닝",
        "credit": 3,
        "category": "MAJOR_ELEC",
        "grade": 4,
        "recYear": 4,
        "recSem": [
          1
        ],
        "recEstimated": false,
        "curriculum": true,
        "offeringDept": "ai",
        "offeringLabel": "인공지능공학과",
        "prereq": [
          "AIE2001"
        ]
      },
      {
        "code": "AIE4006",
        "name": "인간-컴퓨터상호작용",
        "credit": 3,
        "category": "MAJOR_ELEC",
        "grade": 4,
        "recYear": 4,
        "recSem": [
          2
        ],
        "recEstimated": false,
        "curriculum": true,
        "offeringDept": "ai",
        "offeringLabel": "인공지능공학과",
        "prereq": [
          "AIE2001"
        ]
      },
      {
        "code": "AIE4008",
        "name": "심화전공탐색",
        "credit": 3,
        "category": "MAJOR_ELEC",
        "grade": 4,
        "recYear": 4,
        "recSem": [
          2
        ],
        "recEstimated": false,
        "curriculum": true,
        "offeringDept": "ai",
        "offeringLabel": "인공지능공학과",
        "prereq": [
          "AIE2001"
        ]
      },
      {
        "code": "AIE4009",
        "name": "멀티미디어 컴퓨팅",
        "credit": 3,
        "category": "MAJOR_ELEC",
        "grade": 4,
        "recYear": 4,
        "recSem": [
          1
        ],
        "recEstimated": false,
        "curriculum": true,
        "offeringDept": "ai",
        "offeringLabel": "인공지능공학과",
        "prereq": [
          "AIE2001"
        ]
      },
      {
        "code": "AIE4010",
        "name": "바이오 인공지능",
        "credit": 3,
        "category": "MAJOR_ELEC",
        "grade": 4,
        "recYear": 4,
        "recSem": [
          1
        ],
        "recEstimated": false,
        "curriculum": true,
        "offeringDept": "ai",
        "offeringLabel": "인공지능공학과",
        "prereq": [
          "AIE2001"
        ]
      },
      {
        "code": "GEB1112",
        "name": "크로스오버1 : 인간의 탐색",
        "credit": 2,
        "category": "GEN_REQ",
        "area": "focus",
        "zone": null,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양",
        "recYear": 1,
        "recSem": [
          1
        ],
        "recEstimated": false
      },
      {
        "code": "GEB1114",
        "name": "크로스오버3 : 사회의 탐색",
        "credit": 2,
        "category": "GEN_REQ",
        "area": "focus",
        "zone": null,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양",
        "recYear": 1,
        "recSem": [
          1,
          2
        ],
        "recEstimated": false
      },
      {
        "code": "GEB1117",
        "name": "커리어디자인 1",
        "credit": 2,
        "category": "GEN_REQ",
        "area": "basic",
        "zone": null,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양",
        "recYear": 1,
        "recSem": [
          1
        ],
        "recEstimated": false
      },
      {
        "code": "GEB1126",
        "name": "문제해결을 위한 글쓰기",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "basic",
        "zone": null,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양",
        "recYear": 1,
        "recSem": [
          1
        ],
        "recEstimated": false
      },
      {
        "code": "GEB1143",
        "name": "미래사회와 소프트웨어(IT계열)",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "basic",
        "zone": null,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양",
        "recYear": 1,
        "recSem": [
          2
        ],
        "recEstimated": false
      },
      {
        "code": "GEB1151",
        "name": "커리어 디자인 2",
        "credit": 1,
        "category": "GEN_REQ",
        "area": "basic",
        "zone": null,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양",
        "recYear": 3,
        "recSem": [
          1
        ],
        "recEstimated": false
      },
      {
        "code": "GEB1107",
        "name": "의사소통 영어",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "basic",
        "zone": null,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양",
        "recYear": 1,
        "recSem": [
          2
        ],
        "recEstimated": false
      },
      {
        "code": "GEB1108",
        "name": "의사소통 영어 : 중급",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "basic",
        "zone": null,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양",
        "recYear": 1,
        "recSem": [
          2
        ],
        "recEstimated": false
      },
      {
        "code": "GEB1109",
        "name": "의사소통 영어 : 고급",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "basic",
        "zone": null,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양",
        "recYear": 1,
        "recSem": [
          2
        ],
        "recEstimated": false
      },
      {
        "code": "GED1003",
        "name": "나눔 프로젝트",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "core",
        "zone": 1,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED1004",
        "name": "가치창조를 위한 명저 읽기",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "core",
        "zone": 1,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED1005",
        "name": "인간-AI-기계",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "core",
        "zone": 1,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED1006",
        "name": "창의적 사고와 소통",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "core",
        "zone": 1,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED1007",
        "name": "독서세미나 : 인간, 가치, 공존",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "core",
        "zone": 1,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED1008",
        "name": "인하 라이프 아카데미 : 인간, 가치, 공존",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "core",
        "zone": 1,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED1009",
        "name": "마음을 움직이는 리더십",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "core",
        "zone": 1,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED1010",
        "name": "오래된 미래: 동양고전에서의 인간다움",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "core",
        "zone": 1,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED1011",
        "name": "SF와 인간의 미래",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "core",
        "zone": 1,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED1012",
        "name": "4차 산업혁명 시대의 리더십",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "core",
        "zone": 1,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED1013",
        "name": "현대 사회의 가치관",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "core",
        "zone": 1,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED1014",
        "name": "인공지능 시대의 사랑, 행복, 정의",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "core",
        "zone": 1,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED1015",
        "name": "ESG와 사회적 가치 실천",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "core",
        "zone": 1,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED1016",
        "name": "윤리적 리더십",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "core",
        "zone": 1,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED2001",
        "name": "역사 속의 라이벌",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "core",
        "zone": 2,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED2002",
        "name": "한국 역사속의 생활과 민속",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "core",
        "zone": 2,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED2003",
        "name": "종교와 문화",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "core",
        "zone": 2,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED2004",
        "name": "서양철학 : 거인들의 어깨",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "core",
        "zone": 2,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED2005",
        "name": "동양철학 : 마르지 않는 샘",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "core",
        "zone": 2,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED2006",
        "name": "인간의 성장과 발달",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "core",
        "zone": 2,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED2007",
        "name": "현대사회와패션",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "core",
        "zone": 2,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED2008",
        "name": "문화유산의 이해",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "core",
        "zone": 2,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED2009",
        "name": "문화심리",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "core",
        "zone": 2,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED2010",
        "name": "축제와 인간사회",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "core",
        "zone": 2,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED2011",
        "name": "지역인문학",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "core",
        "zone": 2,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED2012",
        "name": "문제탐색을 위한 명저읽기",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "core",
        "zone": 2,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED2013",
        "name": "독서세미나 : 역사, 사상, 문화",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "core",
        "zone": 2,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED2014",
        "name": "인하 라이프 아카데미 : 역사, 사상, 문화",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "core",
        "zone": 2,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED2016",
        "name": "그리스신화의 이해",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "core",
        "zone": 2,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED2018",
        "name": "전염병의 지리학",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "core",
        "zone": 2,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED2019",
        "name": "디지털 시민성과 관계적 인간",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "core",
        "zone": 2,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED4001",
        "name": "다문화사회와 공존의 인문학",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "core",
        "zone": 4,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED4002",
        "name": "세계이해를 위한 명저 읽기",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "core",
        "zone": 4,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED4004",
        "name": "부와 빈곤의 글로벌 지도",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "core",
        "zone": 4,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED4005",
        "name": "글로벌 사회의 이해",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "core",
        "zone": 4,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED4006",
        "name": "국제관계학개론",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "core",
        "zone": 4,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED4007",
        "name": "동아시아 정치와 철학의 재발견",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "core",
        "zone": 4,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED4008",
        "name": "결혼과 부모역할",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "core",
        "zone": 4,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED4009",
        "name": "동북아와 한일관계",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "core",
        "zone": 4,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED4010",
        "name": "인권의 이해",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "core",
        "zone": 4,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED4011",
        "name": "지식재산 이론과 실제",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "core",
        "zone": 4,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED4014",
        "name": "독서세미나 : 사회, 제도, 세계",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "core",
        "zone": 4,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED4015",
        "name": "인류문명과 에너지원의 변천사",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "core",
        "zone": 4,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED6009",
        "name": "인공지능과 소프트웨어를 활용한 탄소중립",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "core",
        "zone": 6,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE7005",
        "name": "이차전지와 인공지능",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "swai",
        "zone": "swai",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE7006",
        "name": "보건의료정보학과 인공지능",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "swai",
        "zone": "swai",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE7007",
        "name": "디지털 경영",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "swai",
        "zone": "swai",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE7008",
        "name": "탄소중립과 4차산업",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "swai",
        "zone": "swai",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE7010",
        "name": "게임 기획 및 시각화",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "swai",
        "zone": "swai",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE7011",
        "name": "스마트 시티와 미래모빌리티",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "swai",
        "zone": "swai",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE7012",
        "name": "신소재와 에너지",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "swai",
        "zone": "swai",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE7013",
        "name": "신재생에너지의 이해",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "swai",
        "zone": "swai",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE7014",
        "name": "컴퓨터비전 중심 인공지능 입문",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "swai",
        "zone": "swai",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE7015",
        "name": "친환경 항공우주 시스템",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "swai",
        "zone": "swai",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE7016",
        "name": "탄소중립과 에너지의 흐름",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "swai",
        "zone": "swai",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE7018",
        "name": "데이터사이언스 이해",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "swai",
        "zone": "swai",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE7019",
        "name": "미래산업과 AI이미지",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "swai",
        "zone": "swai",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE4001",
        "name": "지적재산권의 이해",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "creative",
        "zone": "creative",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE4004",
        "name": "효율적 기술개발과 기업가 정신",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "creative",
        "zone": "creative",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE4005",
        "name": "경영전략과 스타트업",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "creative",
        "zone": "creative",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE4006",
        "name": "기술경영 창업",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "creative",
        "zone": "creative",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE4007",
        "name": "발명과 특허",
        "credit": 2,
        "category": "GEN_REQ",
        "area": "creative",
        "zone": "creative",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE4009",
        "name": "스타트업 이슈 리서치",
        "credit": 1,
        "category": "GEN_REQ",
        "area": "creative",
        "zone": "creative",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE4010",
        "name": "인하특강 : 기업가 정신과 창업",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "creative",
        "zone": "creative",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE4012",
        "name": "벤처기업과 히든챔피언에 대한 이해",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "creative",
        "zone": "creative",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE4013",
        "name": "인하특강 : CEO와 기업가 정신",
        "credit": 2,
        "category": "GEN_REQ",
        "area": "creative",
        "zone": "creative",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE4014",
        "name": "취업 및 창업 특강",
        "credit": 2,
        "category": "GEN_REQ",
        "area": "creative",
        "zone": "creative",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE4016",
        "name": "창업 실습",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "creative",
        "zone": "creative",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE4018",
        "name": "스타트업시작의 이해",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "creative",
        "zone": "creative",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE4019",
        "name": "스타트업 아이디어 발상",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "creative",
        "zone": "creative",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE4020",
        "name": "창업 시뮬레이션",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "creative",
        "zone": "creative",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE4021",
        "name": "실전 스타트업",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "creative",
        "zone": "creative",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE4025",
        "name": "글로벌 스타트업의 이해",
        "credit": 2,
        "category": "GEN_REQ",
        "area": "creative",
        "zone": "creative",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE4026",
        "name": "성공하는 비즈니스 모델 개발",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "creative",
        "zone": "creative",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE4027",
        "name": "캠퍼스CEO",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "creative",
        "zone": "creative",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE4028",
        "name": "사내벤처기업 경영전략",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "creative",
        "zone": "creative",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE4029",
        "name": "기업가정신과 지역문제 해결",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "creative",
        "zone": "creative",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE4030",
        "name": "성공 스타트업 실무",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "creative",
        "zone": "creative",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE4031",
        "name": "사내벤처기업 경영전략",
        "credit": 2,
        "category": "GEN_REQ",
        "area": "creative",
        "zone": "creative",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE4032",
        "name": "기업가정신과 지역문제 해결",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "creative",
        "zone": "creative",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE4033",
        "name": "성공 스타트업 실무",
        "credit": 2,
        "category": "GEN_REQ",
        "area": "creative",
        "zone": "creative",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE4034",
        "name": "캠퍼스 CEO",
        "credit": 2,
        "category": "GEN_REQ",
        "area": "creative",
        "zone": "creative",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED3001",
        "name": "대중문학의 이해",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED3002",
        "name": "영화로보는문학세계",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED3005",
        "name": "사이언스 픽션: 과학, 문학, 상상력",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED3007",
        "name": "인문학으로 바라본 마케팅",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED3009",
        "name": "풍경에 관하여 : 인문학과 시각예술의 만남",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED3014",
        "name": "영화와 테크놀러지",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED3015",
        "name": "희곡의 이해",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED3016",
        "name": "애니메이션속의 상상과 인식",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED3017",
        "name": "지평융합을 위한 명저 읽기",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED3018",
        "name": "그래픽 디자인 이야기",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED3019",
        "name": "스포츠 창의융합 프로젝트",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED3020",
        "name": "독서세미나 : 문학, 예술, 상징",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED3021",
        "name": "예술가곡의 가창실습",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED3022",
        "name": "영화 속 클래식 음악",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED5001",
        "name": "환경과 인간",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED5002",
        "name": "생활 속 바이오이야기",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED5003",
        "name": "생활과과학",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED5004",
        "name": "지속가능성을 위한 화학 이야기",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED5005",
        "name": "현대생명과학의 이해",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED5007",
        "name": "첨단 바이오테크놀로지의 이해",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED5008",
        "name": "과학으로 세상읽기",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED5010",
        "name": "신비로운 인체와 맞춤운동",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED5011",
        "name": "독서세미나 : 자연, 생명, 환경",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED6002",
        "name": "초연결사회와 모바일 소프트웨어",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED6003",
        "name": "컴퓨팅사고와 데이터분석 기초",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED6004",
        "name": "블록코딩과 AI기초",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED6005",
        "name": "지능정보서비스와 소프트웨어",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED6007",
        "name": "디지털 트랜스포메이션과 미래사회의 이해",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED6008",
        "name": "4차 산업혁명 기술의 이해",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED6010",
        "name": "배터리속 소재 이야기",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED6011",
        "name": "프로그래밍과 문제해결",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE1001",
        "name": "명언으로 배우는 한자와 한문",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE1002",
        "name": "동화와 마법의 상상력",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE1005",
        "name": "영화로 보는 한국문화",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE1006",
        "name": "동화의이해",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE1012",
        "name": "창작을 위한 글쓰기 실습",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE1016",
        "name": "평생교육실습",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE1019",
        "name": "와인으로 보는 세계 문화",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE1022",
        "name": "한중 서사콘텐츠의 이해",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE1023",
        "name": "인하특강 : 인하와 인천",
        "credit": 2,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE1024",
        "name": "클래식 음악 감상 실습",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE1025",
        "name": "생각하는 힘: 논리와 사고의 기술",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE1026",
        "name": "드로잉의 기초",
        "credit": 2,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE1027",
        "name": "영화로 만나는 패션",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE1028",
        "name": "스무살에 읽는 동양고전",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE1029",
        "name": "미술과 여행",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE1030",
        "name": "세계디자인여행",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE1031",
        "name": "영화와 대중문화",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE1033",
        "name": "철학의 기본 질문들",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE2001",
        "name": "긍정심리학",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE2003",
        "name": "Korean Society and Politics",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE2005",
        "name": "경제학의 이해",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE2006",
        "name": "지리와 여행",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE2007",
        "name": "생활 속의 경제 원리",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE2008",
        "name": "영화 속의 법이야기",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE2009",
        "name": "법학의 이해",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE2010",
        "name": "범죄와 사회",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE2015",
        "name": "기초수학",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE2016",
        "name": "기초물리학",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE2017",
        "name": "고급물리학",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE2018",
        "name": "광고의 이해",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE2020",
        "name": "세계시민교육: 차이를 넘어 공존으로",
        "credit": 2,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE2021",
        "name": "과학수사 들여다보기",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE2023",
        "name": "뉴스 속의 법이야기",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE2024",
        "name": "미디어와 콘텐츠",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE2025",
        "name": "생각보다 가까운 FTA",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE2027",
        "name": "바다의 불편한 진실",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE2028",
        "name": "브랜드 생성의 원리",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE2030",
        "name": "숲의 이해",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE2031",
        "name": "실크로드 문명의 이해",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE2032",
        "name": "함께 사는 법",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE2033",
        "name": "반려동물과 사회생활",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE2035",
        "name": "중국 지역 문화",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE2036",
        "name": "에너지와 기후환경",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE2037",
        "name": "권력과 사회문화",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE2039",
        "name": "인공지능과 데이터의 윤리",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE2040",
        "name": "영화로 보는 생명공학",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE2041",
        "name": "차세대 해양리더 양성 아카데미",
        "credit": 2,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE3001",
        "name": "졸업인증실용영어",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE3003",
        "name": "외국인전용초급한국어",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE3004",
        "name": "외국인전용중급한국어",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE3012",
        "name": "스타트일본어",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE3013",
        "name": "대학기초영어",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE3014",
        "name": "토크쇼로 배우는 영어대화기술",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE3016",
        "name": "초급일본어",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE3017",
        "name": "초급 프랑스어",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE3019",
        "name": "외국인전용 기초한국어",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE3021",
        "name": "미국문화의 이해",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE3025",
        "name": "장애인과 함께 하는 삶",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE3026",
        "name": "생활한문",
        "credit": 1,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE3027",
        "name": "실용영어 L/S",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE3028",
        "name": "실용영어 R/W",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE3030",
        "name": "외국인전용 한국어 레포트쓰기",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE3031",
        "name": "외국인전용 한국어 프레젠테이션",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE3032",
        "name": "외국인전용 미디어 한국어",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE3033",
        "name": "외국인전용 한국과 세계의 비교문화",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE3035",
        "name": "서바이벌베트남어",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE3037",
        "name": "국제 비즈니스 영어회화와 작문",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE3038",
        "name": "자원봉사로 이해하는 지역사회",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE3039",
        "name": "교환학생 전용 신나는 인하 한국어",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE3040",
        "name": "한중 언어문화 비교",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE3041",
        "name": "스페인·중남미 문화의 이해",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE3042",
        "name": "실용중국어회화",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE3043",
        "name": "미국드라마로 배우는 영어표현",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE4003",
        "name": "기업 수요지향기술 종합설계",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE4022",
        "name": "취업을 위한 글쓰기 실습",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE4023",
        "name": "사회적기업의 비즈니스모델 이해",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE5002",
        "name": "증권투자의 이해",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE5006",
        "name": "생활과 재테크",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE5007",
        "name": "공학과 여성",
        "credit": 2,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE5012",
        "name": "인하특강 : 언론을 통한 세상보기",
        "credit": 2,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE5014",
        "name": "인하 스콜라 특강",
        "credit": 1,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE5015",
        "name": "적성탐색과 자기관리",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE5016",
        "name": "진로설계 이해와 전략",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE5017",
        "name": "품질의 차원",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE6001",
        "name": "건강한 체중조절을 위한 맞춤영양",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE6002",
        "name": "댄스스포츠",
        "credit": 1,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE6003",
        "name": "수영",
        "credit": 1,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE6004",
        "name": "테니스",
        "credit": 1,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE6005",
        "name": "요가와 명상",
        "credit": 1,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE6006",
        "name": "호신술",
        "credit": 1,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE6007",
        "name": "골프",
        "credit": 1,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE6008",
        "name": "스키",
        "credit": 1,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE6009",
        "name": "야구소프트볼",
        "credit": 1,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE6014",
        "name": "미술치료로 알아가는 가족이야기",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE6015",
        "name": "피트니스 트레이닝",
        "credit": 1,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE6016",
        "name": "금연과 건강한 삶",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE6017",
        "name": "스포츠 트레이닝 과학",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE6018",
        "name": "운동과 건강",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE6019",
        "name": "스포츠과학과 건강",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE6020",
        "name": "암세포 이야기",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE6021",
        "name": "피아노 연주 실습",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE6022",
        "name": "합창 실기 및 연주",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE6023",
        "name": "시창청음실습",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE6024",
        "name": "웰니스를 위한 걷기와 달리기",
        "credit": 1,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE7002",
        "name": "객체지향 기반 응용 프로그래밍",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE7003",
        "name": "인공지능 개론 및 프로그래밍 기초",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE7004",
        "name": "객체지향언어와 SW활용",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE7017",
        "name": "소프트웨어와 인공지능 이해 및 응용",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEB1113",
        "name": "크로스오버2 : 자연의 탐색",
        "credit": 2,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEB1118",
        "name": "우리가 만드는 세계(WWM1)",
        "credit": 2,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEB1119",
        "name": "우리가 만나는 세계(WWM2)",
        "credit": 2,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEB1141",
        "name": "미래사회와 소프트웨어(인문사회계열)",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEB1142",
        "name": "미래사회와 소프트웨어(이공계열)",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      }
    ]
  },
  "ai_2026": {
    "id": "ai_2026",
    "departmentCode": "AIE",
    "departmentName": "인공지능공학과",
    "admissionYear": 2026,
    "requirements": {
      "totalRequired": 130,
      "credits": {
        "general": 34,
        "major": 43,
        "majorElective": 22,
        "freeElective": 31
      },
      "majorRequiredCount": 14,
      "generalAreas": [
        {
          "key": "focus",
          "name": "중점교양",
          "required": 4,
          "dedupBy": "code",
          "desc": "공통 지정 과목: 크로스오버1 : 인간의 탐색, 크로스오버3 : 사회의 탐색"
        },
        {
          "key": "basic",
          "name": "기초교양",
          "required": 12,
          "dedupBy": "code",
          "desc": "공통 지정 과목 전체 + 의사소통 영어(영어 기초학력평가로 1과목 지정) 중 택1"
        },
        {
          "key": "core",
          "name": "핵심교양",
          "required": 12,
          "dedupBy": "zone",
          "desc": "1·2·4·6영역에서 각 1과목씩 (6영역은 GED6009 지정) · 같은 영역 2과목은 1과목만 인정"
        },
        {
          "key": "swai",
          "name": "SW·AI (일반교양 7영역)",
          "required": 3,
          "dedupBy": "zone",
          "desc": "SW·AI 트랙 지정 과목 중 택1"
        },
        {
          "key": "creative",
          "name": "창의",
          "required": 3,
          "dedupBy": "zone",
          "desc": "창의 영역 지정 과목 중 택1"
        }
      ],
      "certOptions": [
        {
          "id": "toeic",
          "label": "TOEIC 700점 이상"
        },
        {
          "id": "toeic_speaking",
          "label": "TOEIC Speaking 130점 이상"
        },
        {
          "id": "toefl_pbt",
          "label": "TOEFL PBT 540점 이상"
        },
        {
          "id": "toefl_cbt",
          "label": "TOEFL CBT 207점 이상"
        },
        {
          "id": "toefl_ibt",
          "label": "TOEFL iBT 76점 이상"
        },
        {
          "id": "new_teps",
          "label": "NEW TEPS 327점 이상"
        },
        {
          "id": "opic",
          "label": "OPIc IM1 이상"
        },
        {
          "id": "ielts",
          "label": "IELTS 6.0 이상"
        },
        {
          "id": "course",
          "label": "졸업인증실용영어 (GEE3001) 이수"
        },
        {
          "id": "specialLecture",
          "label": "졸업인증 토익특강"
        }
      ],
      "notices": [
        "재수강 과목과 F 학점은 반영하지 않음",
        "최종 졸업 판정은 학과 졸업사정 기준"
      ]
    },
    "courses": [
      {
        "code": "AIE1001",
        "name": "객체지향프로그래밍 1",
        "credit": 3,
        "category": "MAJOR_REQ",
        "grade": 1,
        "recYear": 1,
        "recSem": [
          1
        ],
        "recEstimated": false,
        "curriculum": true,
        "offeringDept": "ai",
        "offeringLabel": "인공지능공학과",
        "prereq": []
      },
      {
        "code": "AIE1002",
        "name": "객체지향프로그래밍 2",
        "credit": 3,
        "category": "MAJOR_REQ",
        "grade": 1,
        "recYear": 1,
        "recSem": [
          2
        ],
        "recEstimated": false,
        "curriculum": true,
        "offeringDept": "ai",
        "offeringLabel": "인공지능공학과",
        "prereq": [
          "AIE1001"
        ]
      },
      {
        "code": "AIE1005",
        "name": "이산구조",
        "credit": 3,
        "category": "MAJOR_REQ",
        "grade": 1,
        "recYear": 1,
        "recSem": [
          2
        ],
        "recEstimated": false,
        "curriculum": true,
        "offeringDept": "ai",
        "offeringLabel": "인공지능공학과",
        "prereq": []
      },
      {
        "code": "AIE2001",
        "name": "자료구조",
        "credit": 4,
        "category": "MAJOR_REQ",
        "grade": 2,
        "recYear": 2,
        "recSem": [
          1
        ],
        "recEstimated": false,
        "curriculum": true,
        "offeringDept": "ai",
        "offeringLabel": "인공지능공학과",
        "prereq": [
          "AIE1002"
        ]
      },
      {
        "code": "AIE2002",
        "name": "인공지능프로그래밍",
        "credit": 3,
        "category": "MAJOR_REQ",
        "grade": 2,
        "recYear": 2,
        "recSem": [
          2
        ],
        "recEstimated": false,
        "curriculum": true,
        "offeringDept": "ai",
        "offeringLabel": "인공지능공학과",
        "prereq": [
          "AIE2001"
        ]
      },
      {
        "code": "AIE2003",
        "name": "선형대수",
        "credit": 3,
        "category": "MAJOR_REQ",
        "grade": 2,
        "recYear": 2,
        "recSem": [
          1
        ],
        "recEstimated": false,
        "curriculum": true,
        "offeringDept": "ai",
        "offeringLabel": "인공지능공학과",
        "prereq": []
      },
      {
        "code": "AIE2004",
        "name": "인공지능확률론",
        "credit": 3,
        "category": "MAJOR_REQ",
        "grade": 2,
        "recYear": 2,
        "recSem": [
          2
        ],
        "recEstimated": false,
        "curriculum": true,
        "offeringDept": "ai",
        "offeringLabel": "인공지능공학과",
        "prereq": [
          "AIE2001",
          "AIE2011"
        ]
      },
      {
        "code": "AIE3001",
        "name": "기계학습",
        "credit": 3,
        "category": "MAJOR_REQ",
        "grade": 3,
        "recYear": 3,
        "recSem": [
          1
        ],
        "recEstimated": false,
        "curriculum": true,
        "offeringDept": "ai",
        "offeringLabel": "인공지능공학과",
        "prereq": [
          "AIE2001"
        ]
      },
      {
        "code": "AIE3002",
        "name": "알고리즘",
        "credit": 3,
        "category": "MAJOR_REQ",
        "grade": 3,
        "recYear": 3,
        "recSem": [
          1
        ],
        "recEstimated": false,
        "curriculum": true,
        "offeringDept": "ai",
        "offeringLabel": "인공지능공학과",
        "prereq": [
          "AIE2001",
          "AIE2002"
        ]
      },
      {
        "code": "AIE3003",
        "name": "인공신경망",
        "credit": 3,
        "category": "MAJOR_REQ",
        "grade": 3,
        "recYear": 3,
        "recSem": [
          2
        ],
        "recEstimated": false,
        "curriculum": true,
        "offeringDept": "ai",
        "offeringLabel": "인공지능공학과",
        "prereq": [
          "AIE2001",
          "AIE3001"
        ]
      },
      {
        "code": "AIE4001",
        "name": "인공지능종합설계",
        "credit": 3,
        "category": "MAJOR_REQ",
        "grade": 4,
        "recYear": 4,
        "recSem": [
          1,
          2
        ],
        "recEstimated": false,
        "curriculum": true,
        "offeringDept": "ai",
        "offeringLabel": "인공지능공학과",
        "prereq": [
          "AIE2001",
          "AIE3002"
        ]
      },
      {
        "code": "AIE2011",
        "name": "통계학",
        "credit": 3,
        "category": "MAJOR_REQ",
        "grade": 2,
        "recYear": 2,
        "recSem": [
          1
        ],
        "recEstimated": false,
        "curriculum": true,
        "offeringDept": "ai",
        "offeringLabel": "인공지능공학과",
        "prereq": [
          "MTH1902"
        ]
      },
      {
        "code": "MTH1901",
        "name": "일반수학 1",
        "credit": 3,
        "category": "MAJOR_REQ",
        "grade": 1,
        "recYear": 1,
        "recSem": [
          1
        ],
        "recEstimated": false,
        "curriculum": true,
        "offeringDept": "ai",
        "offeringLabel": "인공지능공학과",
        "prereq": []
      },
      {
        "code": "MTH1902",
        "name": "일반수학 2",
        "credit": 3,
        "category": "MAJOR_REQ",
        "grade": 1,
        "recYear": 1,
        "recSem": [
          2
        ],
        "recEstimated": false,
        "curriculum": true,
        "offeringDept": "ai",
        "offeringLabel": "인공지능공학과",
        "prereq": [
          "MTH1901"
        ]
      },
      {
        "code": "AIE1004",
        "name": "인공지능창의설계",
        "credit": 3,
        "category": "MAJOR_ELEC",
        "grade": 1,
        "recYear": 1,
        "recSem": [
          2
        ],
        "recEstimated": false,
        "curriculum": true,
        "offeringDept": "ai",
        "offeringLabel": "인공지능공학과",
        "prereq": []
      },
      {
        "code": "AIE1006",
        "name": "인공지능 입문",
        "credit": 2,
        "category": "MAJOR_ELEC",
        "grade": 1,
        "recYear": 1,
        "recSem": [
          1
        ],
        "recEstimated": false,
        "curriculum": true,
        "offeringDept": "ai",
        "offeringLabel": "인공지능공학과",
        "prereq": []
      },
      {
        "code": "AIE2005",
        "name": "파이썬기반응용프로그래밍",
        "credit": 3,
        "category": "MAJOR_ELEC",
        "grade": 2,
        "recYear": 2,
        "recSem": [
          1
        ],
        "recEstimated": false,
        "curriculum": true,
        "offeringDept": "ai",
        "offeringLabel": "인공지능공학과",
        "prereq": [
          "AIE1002"
        ]
      },
      {
        "code": "AIE2008",
        "name": "디지털 신호처리",
        "credit": 3,
        "category": "MAJOR_ELEC",
        "grade": 2,
        "recYear": 2,
        "recSem": [
          2
        ],
        "recEstimated": false,
        "curriculum": true,
        "offeringDept": "ai",
        "offeringLabel": "인공지능공학과",
        "prereq": [
          "AIE2001"
        ]
      },
      {
        "code": "AIE2009",
        "name": "오픈소스SW개론",
        "credit": 3,
        "category": "MAJOR_ELEC",
        "grade": 2,
        "recYear": 2,
        "recSem": [
          1
        ],
        "recEstimated": false,
        "curriculum": true,
        "offeringDept": "ai",
        "offeringLabel": "인공지능공학과",
        "prereq": []
      },
      {
        "code": "AIE2010",
        "name": "논리회로",
        "credit": 3,
        "category": "MAJOR_ELEC",
        "grade": 2,
        "recYear": 2,
        "recSem": [
          2
        ],
        "recEstimated": false,
        "curriculum": true,
        "offeringDept": "ai",
        "offeringLabel": "인공지능공학과",
        "prereq": []
      },
      {
        "code": "AIE3004",
        "name": "자연어처리",
        "credit": 3,
        "category": "MAJOR_ELEC",
        "grade": 3,
        "recYear": 3,
        "recSem": [
          2
        ],
        "recEstimated": false,
        "curriculum": true,
        "offeringDept": "ai",
        "offeringLabel": "인공지능공학과",
        "prereq": [
          "AIE2001"
        ]
      },
      {
        "code": "AIE3006",
        "name": "운영체제론",
        "credit": 3,
        "category": "MAJOR_ELEC",
        "grade": 3,
        "recYear": 3,
        "recSem": [
          1
        ],
        "recEstimated": false,
        "curriculum": true,
        "offeringDept": "ai",
        "offeringLabel": "인공지능공학과",
        "prereq": [
          "AIE2001",
          "AIE2008"
        ]
      },
      {
        "code": "AIE3007",
        "name": "데이터베이스",
        "credit": 3,
        "category": "MAJOR_ELEC",
        "grade": 3,
        "recYear": 3,
        "recSem": [
          1
        ],
        "recEstimated": false,
        "curriculum": true,
        "offeringDept": "ai",
        "offeringLabel": "인공지능공학과",
        "prereq": [
          "AIE2001"
        ]
      },
      {
        "code": "AIE3008",
        "name": "컴퓨터 비전",
        "credit": 3,
        "category": "MAJOR_ELEC",
        "grade": 3,
        "recYear": 3,
        "recSem": [
          2
        ],
        "recEstimated": false,
        "curriculum": true,
        "offeringDept": "ai",
        "offeringLabel": "인공지능공학과",
        "prereq": [
          "AIE2001"
        ]
      },
      {
        "code": "AIE3009",
        "name": "컴퓨터 네트워크",
        "credit": 3,
        "category": "MAJOR_ELEC",
        "grade": 3,
        "recYear": 3,
        "recSem": [
          2
        ],
        "recEstimated": false,
        "curriculum": true,
        "offeringDept": "ai",
        "offeringLabel": "인공지능공학과",
        "prereq": [
          "AIE2001"
        ]
      },
      {
        "code": "AIE3010",
        "name": "컴퓨터구조론",
        "credit": 3,
        "category": "MAJOR_ELEC",
        "grade": 3,
        "recYear": 3,
        "recSem": [
          1
        ],
        "recEstimated": false,
        "curriculum": true,
        "offeringDept": "ai",
        "offeringLabel": "인공지능공학과",
        "prereq": [
          "AIE2001"
        ]
      },
      {
        "code": "AIE3011",
        "name": "문제해결기법",
        "credit": 4,
        "category": "MAJOR_ELEC",
        "grade": 3,
        "recYear": 3,
        "recSem": [
          2
        ],
        "recEstimated": false,
        "curriculum": true,
        "offeringDept": "ai",
        "offeringLabel": "인공지능공학과",
        "prereq": [
          "AIE2001"
        ]
      },
      {
        "code": "AIE3012",
        "name": "인공지능",
        "credit": 3,
        "category": "MAJOR_ELEC",
        "grade": 3,
        "recYear": 3,
        "recSem": [
          1
        ],
        "recEstimated": false,
        "curriculum": true,
        "offeringDept": "ai",
        "offeringLabel": "인공지능공학과",
        "prereq": [
          "AIE2001"
        ]
      },
      {
        "code": "AIE3013",
        "name": "병렬컴퓨팅",
        "credit": 3,
        "category": "MAJOR_ELEC",
        "grade": 3,
        "recYear": 3,
        "recSem": [
          2
        ],
        "recEstimated": false,
        "curriculum": true,
        "offeringDept": "ai",
        "offeringLabel": "인공지능공학과",
        "prereq": [
          "AIE2001"
        ]
      },
      {
        "code": "AIE4003",
        "name": "강화학습",
        "credit": 3,
        "category": "MAJOR_ELEC",
        "grade": 4,
        "recYear": 4,
        "recSem": [
          1
        ],
        "recEstimated": false,
        "curriculum": true,
        "offeringDept": "ai",
        "offeringLabel": "인공지능공학과",
        "prereq": [
          "AIE2001"
        ]
      },
      {
        "code": "AIE4004",
        "name": "인공지능보안",
        "credit": 3,
        "category": "MAJOR_ELEC",
        "grade": 4,
        "recYear": 4,
        "recSem": [
          1
        ],
        "recEstimated": false,
        "curriculum": true,
        "offeringDept": "ai",
        "offeringLabel": "인공지능공학과",
        "prereq": [
          "AIE2001"
        ]
      },
      {
        "code": "AIE4005",
        "name": "데이터마이닝",
        "credit": 3,
        "category": "MAJOR_ELEC",
        "grade": 4,
        "recYear": 4,
        "recSem": [
          1
        ],
        "recEstimated": false,
        "curriculum": true,
        "offeringDept": "ai",
        "offeringLabel": "인공지능공학과",
        "prereq": [
          "AIE2001"
        ]
      },
      {
        "code": "AIE4006",
        "name": "인간-컴퓨터상호작용",
        "credit": 3,
        "category": "MAJOR_ELEC",
        "grade": 4,
        "recYear": 4,
        "recSem": [
          2
        ],
        "recEstimated": false,
        "curriculum": true,
        "offeringDept": "ai",
        "offeringLabel": "인공지능공학과",
        "prereq": [
          "AIE2001"
        ]
      },
      {
        "code": "AIE4008",
        "name": "심화전공탐색",
        "credit": 3,
        "category": "MAJOR_ELEC",
        "grade": 4,
        "recYear": 4,
        "recSem": [
          2
        ],
        "recEstimated": false,
        "curriculum": true,
        "offeringDept": "ai",
        "offeringLabel": "인공지능공학과",
        "prereq": [
          "AIE2001"
        ]
      },
      {
        "code": "AIE4009",
        "name": "멀티미디어 컴퓨팅",
        "credit": 3,
        "category": "MAJOR_ELEC",
        "grade": 4,
        "recYear": 4,
        "recSem": [
          1
        ],
        "recEstimated": false,
        "curriculum": true,
        "offeringDept": "ai",
        "offeringLabel": "인공지능공학과",
        "prereq": [
          "AIE2001"
        ]
      },
      {
        "code": "AIE4010",
        "name": "바이오 인공지능",
        "credit": 3,
        "category": "MAJOR_ELEC",
        "grade": 4,
        "recYear": 4,
        "recSem": [
          1
        ],
        "recEstimated": false,
        "curriculum": true,
        "offeringDept": "ai",
        "offeringLabel": "인공지능공학과",
        "prereq": [
          "AIE2001"
        ]
      },
      {
        "code": "GEB1112",
        "name": "크로스오버1 : 인간의 탐색",
        "credit": 2,
        "category": "GEN_REQ",
        "area": "focus",
        "zone": null,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양",
        "recYear": 1,
        "recSem": [
          1
        ],
        "recEstimated": false
      },
      {
        "code": "GEB1114",
        "name": "크로스오버3 : 사회의 탐색",
        "credit": 2,
        "category": "GEN_REQ",
        "area": "focus",
        "zone": null,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양",
        "recYear": 1,
        "recSem": [
          1,
          2
        ],
        "recEstimated": false
      },
      {
        "code": "GEB1117",
        "name": "커리어디자인 1",
        "credit": 2,
        "category": "GEN_REQ",
        "area": "basic",
        "zone": null,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양",
        "recYear": 1,
        "recSem": [
          1
        ],
        "recEstimated": false
      },
      {
        "code": "GEB1126",
        "name": "문제해결을 위한 글쓰기",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "basic",
        "zone": null,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양",
        "recYear": 1,
        "recSem": [
          1
        ],
        "recEstimated": false
      },
      {
        "code": "GEB1143",
        "name": "미래사회와 소프트웨어(IT계열)",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "basic",
        "zone": null,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양",
        "recYear": 1,
        "recSem": [
          2
        ],
        "recEstimated": false
      },
      {
        "code": "GEB1151",
        "name": "커리어 디자인 2",
        "credit": 1,
        "category": "GEN_REQ",
        "area": "basic",
        "zone": null,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양",
        "recYear": 3,
        "recSem": [
          1
        ],
        "recEstimated": false
      },
      {
        "code": "GEB1107",
        "name": "의사소통 영어",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "basic",
        "zone": null,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양",
        "recYear": 1,
        "recSem": [
          2
        ],
        "recEstimated": false
      },
      {
        "code": "GEB1108",
        "name": "의사소통 영어 : 중급",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "basic",
        "zone": null,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양",
        "recYear": 1,
        "recSem": [
          2
        ],
        "recEstimated": false
      },
      {
        "code": "GEB1109",
        "name": "의사소통 영어 : 고급",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "basic",
        "zone": null,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양",
        "recYear": 1,
        "recSem": [
          2
        ],
        "recEstimated": false
      },
      {
        "code": "GED1003",
        "name": "나눔 프로젝트",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "core",
        "zone": 1,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED1004",
        "name": "가치창조를 위한 명저 읽기",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "core",
        "zone": 1,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED1005",
        "name": "인간-AI-기계",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "core",
        "zone": 1,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED1006",
        "name": "창의적 사고와 소통",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "core",
        "zone": 1,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED1007",
        "name": "독서세미나 : 인간, 가치, 공존",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "core",
        "zone": 1,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED1008",
        "name": "인하 라이프 아카데미 : 인간, 가치, 공존",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "core",
        "zone": 1,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED1009",
        "name": "마음을 움직이는 리더십",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "core",
        "zone": 1,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED1010",
        "name": "오래된 미래: 동양고전에서의 인간다움",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "core",
        "zone": 1,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED1011",
        "name": "SF와 인간의 미래",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "core",
        "zone": 1,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED1012",
        "name": "4차 산업혁명 시대의 리더십",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "core",
        "zone": 1,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED1013",
        "name": "현대 사회의 가치관",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "core",
        "zone": 1,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED1014",
        "name": "인공지능 시대의 사랑, 행복, 정의",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "core",
        "zone": 1,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED1015",
        "name": "ESG와 사회적 가치 실천",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "core",
        "zone": 1,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED1016",
        "name": "윤리적 리더십",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "core",
        "zone": 1,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED1017",
        "name": "우리가 배우는 이유, 대학과 좋은 삶",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "core",
        "zone": 1,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED2001",
        "name": "역사 속의 라이벌",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "core",
        "zone": 2,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED2002",
        "name": "한국 역사속의 생활과 민속",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "core",
        "zone": 2,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED2003",
        "name": "종교와 문화",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "core",
        "zone": 2,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED2004",
        "name": "서양철학 : 거인들의 어깨",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "core",
        "zone": 2,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED2005",
        "name": "동양철학 : 마르지 않는 샘",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "core",
        "zone": 2,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED2006",
        "name": "인간의 성장과 발달",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "core",
        "zone": 2,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED2007",
        "name": "현대사회와패션",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "core",
        "zone": 2,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED2008",
        "name": "문화유산의 이해",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "core",
        "zone": 2,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED2009",
        "name": "문화심리",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "core",
        "zone": 2,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED2010",
        "name": "축제와 인간사회",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "core",
        "zone": 2,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED2011",
        "name": "지역인문학",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "core",
        "zone": 2,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED2012",
        "name": "문제탐색을 위한 명저읽기",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "core",
        "zone": 2,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED2013",
        "name": "독서세미나 : 역사, 사상, 문화",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "core",
        "zone": 2,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED2014",
        "name": "인하 라이프 아카데미 : 역사, 사상, 문화",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "core",
        "zone": 2,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED2016",
        "name": "그리스신화의 이해",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "core",
        "zone": 2,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED2018",
        "name": "전염병의 지리학",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "core",
        "zone": 2,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED2019",
        "name": "디지털 시민성과 관계적 인간",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "core",
        "zone": 2,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED4001",
        "name": "다문화사회와 공존의 인문학",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "core",
        "zone": 4,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED4002",
        "name": "세계이해를 위한 명저 읽기",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "core",
        "zone": 4,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED4004",
        "name": "부와 빈곤의 글로벌 지도",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "core",
        "zone": 4,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED4005",
        "name": "글로벌 사회의 이해",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "core",
        "zone": 4,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED4006",
        "name": "국제관계학개론",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "core",
        "zone": 4,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED4007",
        "name": "동아시아 정치와 철학의 재발견",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "core",
        "zone": 4,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED4008",
        "name": "결혼과 부모역할",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "core",
        "zone": 4,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED4009",
        "name": "동북아와 한일관계",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "core",
        "zone": 4,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED4010",
        "name": "인권의 이해",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "core",
        "zone": 4,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED4011",
        "name": "지식재산 이론과 실제",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "core",
        "zone": 4,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED4014",
        "name": "독서세미나 : 사회, 제도, 세계",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "core",
        "zone": 4,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED4015",
        "name": "인류문명과 에너지원의 변천사",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "core",
        "zone": 4,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED6009",
        "name": "인공지능과 소프트웨어를 활용한 탄소중립",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "core",
        "zone": 6,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE7005",
        "name": "이차전지와 인공지능",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "swai",
        "zone": "swai",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE7006",
        "name": "보건의료정보학과 인공지능",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "swai",
        "zone": "swai",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE7007",
        "name": "디지털 경영",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "swai",
        "zone": "swai",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE7008",
        "name": "탄소중립과 4차산업",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "swai",
        "zone": "swai",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE7010",
        "name": "게임 기획 및 시각화",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "swai",
        "zone": "swai",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE7011",
        "name": "스마트 시티와 미래모빌리티",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "swai",
        "zone": "swai",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE7012",
        "name": "신소재와 에너지",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "swai",
        "zone": "swai",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE7013",
        "name": "신재생에너지의 이해",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "swai",
        "zone": "swai",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE7014",
        "name": "컴퓨터비전 중심 인공지능 입문",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "swai",
        "zone": "swai",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE7015",
        "name": "친환경 항공우주 시스템",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "swai",
        "zone": "swai",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE7016",
        "name": "탄소중립과 에너지의 흐름",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "swai",
        "zone": "swai",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE7018",
        "name": "데이터사이언스 이해",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "swai",
        "zone": "swai",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE7019",
        "name": "미래산업과 AI이미지",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "swai",
        "zone": "swai",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE4001",
        "name": "지적재산권의 이해",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "creative",
        "zone": "creative",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE4004",
        "name": "효율적 기술개발과 기업가 정신",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "creative",
        "zone": "creative",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE4005",
        "name": "경영전략과 스타트업",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "creative",
        "zone": "creative",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE4006",
        "name": "기술경영 창업",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "creative",
        "zone": "creative",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE4007",
        "name": "발명과 특허",
        "credit": 2,
        "category": "GEN_REQ",
        "area": "creative",
        "zone": "creative",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE4009",
        "name": "스타트업 이슈 리서치",
        "credit": 1,
        "category": "GEN_REQ",
        "area": "creative",
        "zone": "creative",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE4010",
        "name": "인하특강 : 기업가 정신과 창업",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "creative",
        "zone": "creative",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE4012",
        "name": "벤처기업과 히든챔피언에 대한 이해",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "creative",
        "zone": "creative",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE4013",
        "name": "인하특강 : CEO와 기업가 정신",
        "credit": 2,
        "category": "GEN_REQ",
        "area": "creative",
        "zone": "creative",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE4014",
        "name": "취업 및 창업 특강",
        "credit": 2,
        "category": "GEN_REQ",
        "area": "creative",
        "zone": "creative",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE4016",
        "name": "창업 실습",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "creative",
        "zone": "creative",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE4018",
        "name": "스타트업시작의 이해",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "creative",
        "zone": "creative",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE4019",
        "name": "스타트업 아이디어 발상",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "creative",
        "zone": "creative",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE4020",
        "name": "창업 시뮬레이션",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "creative",
        "zone": "creative",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE4021",
        "name": "실전 스타트업",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "creative",
        "zone": "creative",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE4025",
        "name": "글로벌 스타트업의 이해",
        "credit": 2,
        "category": "GEN_REQ",
        "area": "creative",
        "zone": "creative",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE4026",
        "name": "성공하는 비즈니스 모델 개발",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "creative",
        "zone": "creative",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE4035",
        "name": "사내벤처기업 경영전략",
        "credit": 2,
        "category": "GEN_REQ",
        "area": "creative",
        "zone": "creative",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE4036",
        "name": "기업가정신과 지역문제 해결",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "creative",
        "zone": "creative",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE4037",
        "name": "성공 스타트업 실무",
        "credit": 2,
        "category": "GEN_REQ",
        "area": "creative",
        "zone": "creative",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE4038",
        "name": "캠퍼스 CEO",
        "credit": 2,
        "category": "GEN_REQ",
        "area": "creative",
        "zone": "creative",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED3001",
        "name": "대중문학의 이해",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED3002",
        "name": "영화로보는문학세계",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED3005",
        "name": "사이언스 픽션: 과학, 문학, 상상력",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED3007",
        "name": "인문학으로 바라본 마케팅",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED3009",
        "name": "풍경에 관하여 : 인문학과 시각예술의 만남",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED3014",
        "name": "영화와 테크놀러지",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED3015",
        "name": "희곡의 이해",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED3016",
        "name": "애니메이션속의 상상과 인식",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED3018",
        "name": "그래픽 디자인 이야기",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED3019",
        "name": "스포츠 창의융합 프로젝트",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED3020",
        "name": "독서세미나 : 문학, 예술, 상징",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED3021",
        "name": "예술가곡의 가창실습",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED3022",
        "name": "영화 속 클래식 음악",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED3023",
        "name": "문명비판을 위한 명저 읽기",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED5001",
        "name": "환경과 인간",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED5002",
        "name": "생활 속 바이오이야기",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED5003",
        "name": "생활과과학",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED5004",
        "name": "지속가능성을 위한 화학 이야기",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED5005",
        "name": "현대생명과학의 이해",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED5007",
        "name": "첨단 바이오테크놀로지의 이해",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED5008",
        "name": "과학으로 세상읽기",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED5010",
        "name": "신비로운 인체와 맞춤운동",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED5011",
        "name": "독서세미나 : 자연, 생명, 환경",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED6002",
        "name": "초연결사회와 모바일 소프트웨어",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED6003",
        "name": "컴퓨팅사고와 데이터분석 기초",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED6004",
        "name": "블록코딩과 AI기초",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED6005",
        "name": "지능정보서비스와 소프트웨어",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED6007",
        "name": "디지털 트랜스포메이션과 미래사회의 이해",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED6008",
        "name": "4차 산업혁명 기술의 이해",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED6010",
        "name": "배터리속 소재 이야기",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED6011",
        "name": "프로그래밍과 문제해결",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE1001",
        "name": "명언으로 배우는 한자와 한문",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE1002",
        "name": "동화와 마법의 상상력",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE1005",
        "name": "영화로 보는 한국문화",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE1006",
        "name": "동화의이해",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE1012",
        "name": "창작을 위한 글쓰기 실습",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE1016",
        "name": "평생교육실습",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE1019",
        "name": "와인으로 보는 세계 문화",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE1022",
        "name": "한중 서사콘텐츠의 이해",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE1023",
        "name": "인하특강 : 인하와 인천",
        "credit": 2,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE1024",
        "name": "클래식 음악 감상 실습",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE1025",
        "name": "생각하는 힘: 논리와 사고의 기술",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE1026",
        "name": "드로잉의 기초",
        "credit": 2,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE1027",
        "name": "영화로 만나는 패션",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE1028",
        "name": "스무살에 읽는 동양고전",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE1029",
        "name": "미술과 여행",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE1030",
        "name": "세계디자인여행",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE1031",
        "name": "영화와 대중문화",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE1033",
        "name": "철학의 기본 질문들",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE2001",
        "name": "긍정심리학",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE2003",
        "name": "Korean Society and Politics",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE2005",
        "name": "경제학의 이해",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE2006",
        "name": "지리와 여행",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE2007",
        "name": "생활 속의 경제 원리",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE2008",
        "name": "영화 속의 법이야기",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE2009",
        "name": "법학의 이해",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE2015",
        "name": "기초수학",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE2016",
        "name": "기초물리학",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE2017",
        "name": "고급물리학",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE2018",
        "name": "광고의 이해",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE2020",
        "name": "세계시민교육: 차이를 넘어 공존으로",
        "credit": 2,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE2021",
        "name": "과학수사 들여다보기",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE2023",
        "name": "뉴스 속의 법이야기",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE2024",
        "name": "미디어와 콘텐츠",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE2025",
        "name": "생각보다 가까운 FTA",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE2027",
        "name": "바다의 불편한 진실",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE2028",
        "name": "브랜드 생성의 원리",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE2030",
        "name": "숲의 이해",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE2032",
        "name": "함께 사는 법",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE2033",
        "name": "반려동물과 사회생활",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE2035",
        "name": "중국 지역 문화",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE2036",
        "name": "에너지와 기후환경",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE2037",
        "name": "권력과 사회문화",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE2039",
        "name": "인공지능과 데이터의 윤리",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE2040",
        "name": "영화로 보는 생명공학",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE2041",
        "name": "차세대 해양리더 양성 아카데미",
        "credit": 2,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE2042",
        "name": "통찰경영",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE3001",
        "name": "졸업인증실용영어",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE3003",
        "name": "외국인전용초급한국어",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE3004",
        "name": "외국인전용중급한국어",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE3012",
        "name": "스타트일본어",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE3013",
        "name": "대학기초영어",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE3014",
        "name": "토크쇼로 배우는 영어대화기술",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE3016",
        "name": "초급일본어",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE3017",
        "name": "초급 프랑스어",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE3019",
        "name": "외국인전용 기초한국어",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE3021",
        "name": "미국문화의 이해",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE3025",
        "name": "장애인과 함께 하는 삶",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE3026",
        "name": "생활한문",
        "credit": 1,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE3027",
        "name": "실용영어 L/S",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE3028",
        "name": "실용영어 R/W",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE3031",
        "name": "외국인전용 한국어 프레젠테이션",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE3032",
        "name": "외국인전용 미디어 한국어",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE3033",
        "name": "외국인전용 한국과 세계의 비교문화",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE3035",
        "name": "서바이벌베트남어",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE3037",
        "name": "국제 비즈니스 영어회화와 작문",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE3039",
        "name": "교환학생 전용 신나는 인하 한국어",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE3040",
        "name": "한중 언어문화 비교",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE3041",
        "name": "스페인·중남미 문화의 이해",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE3043",
        "name": "미국드라마로 배우는 영어표현",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE4003",
        "name": "기업 수요지향기술 종합설계",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE4022",
        "name": "취업을 위한 글쓰기 실습",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE4023",
        "name": "사회적기업의 비즈니스모델 이해",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE5002",
        "name": "증권투자의 이해",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE5006",
        "name": "생활과 재테크",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE5007",
        "name": "공학과 여성",
        "credit": 2,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE5009",
        "name": "여대생 진로와 경력개발",
        "credit": 2,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE5012",
        "name": "인하특강 : 언론을 통한 세상보기",
        "credit": 2,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE5014",
        "name": "인하 스콜라 특강",
        "credit": 1,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE5015",
        "name": "적성탐색과 자기관리",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE5016",
        "name": "진로설계 이해와 전략",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE5017",
        "name": "품질의 차원",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE6001",
        "name": "건강한 체중조절을 위한 맞춤영양",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE6002",
        "name": "댄스스포츠",
        "credit": 1,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE6003",
        "name": "수영",
        "credit": 1,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE6004",
        "name": "테니스",
        "credit": 1,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE6005",
        "name": "요가와 명상",
        "credit": 1,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE6006",
        "name": "호신술",
        "credit": 1,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE6007",
        "name": "골프",
        "credit": 1,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE6008",
        "name": "스키",
        "credit": 1,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE6009",
        "name": "야구소프트볼",
        "credit": 1,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE6014",
        "name": "미술치료로 알아가는 가족이야기",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE6015",
        "name": "피트니스 트레이닝",
        "credit": 1,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE6016",
        "name": "금연과 건강한 삶",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE6017",
        "name": "스포츠 트레이닝 과학",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE6018",
        "name": "운동과 건강",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE6019",
        "name": "스포츠과학과 건강",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE6020",
        "name": "암세포 이야기",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE6021",
        "name": "피아노 연주 실습",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE6023",
        "name": "시창청음실습",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE6024",
        "name": "웰니스를 위한 걷기와 달리기",
        "credit": 1,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE7002",
        "name": "객체지향 기반 응용 프로그래밍",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE7003",
        "name": "인공지능 개론 및 프로그래밍 기초",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE7004",
        "name": "객체지향언어와 SW활용",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE7017",
        "name": "소프트웨어와 인공지능 이해 및 응용",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEB1113",
        "name": "크로스오버2 : 자연의 탐색",
        "credit": 2,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEB1118",
        "name": "우리가 만드는 세계(WWM1)",
        "credit": 2,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEB1119",
        "name": "우리가 만나는 세계(WWM2)",
        "credit": 2,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEB1141",
        "name": "미래사회와 소프트웨어(인문사회계열)",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEB1142",
        "name": "미래사회와 소프트웨어(이공계열)",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      }
    ]
  },
  "cse_2025": {
    "id": "cse_2025",
    "departmentCode": "CSE",
    "departmentName": "컴퓨터공학과",
    "admissionYear": 2025,
    "requirements": {
      "totalRequired": 130,
      "credits": {
        "general": 34,
        "major": 25,
        "majorElective": 40,
        "freeElective": 31
      },
      "majorRequiredCount": 8,
      "generalAreas": [
        {
          "key": "focus",
          "name": "중점교양",
          "required": 4,
          "dedupBy": "code",
          "desc": "공통 지정 과목: 크로스오버1 : 인간의 탐색, 크로스오버3 : 사회의 탐색"
        },
        {
          "key": "basic",
          "name": "기초교양",
          "required": 12,
          "dedupBy": "code",
          "desc": "공통 지정 과목 전체 + 의사소통 영어(영어 기초학력평가로 1과목 지정) 중 택1"
        },
        {
          "key": "core",
          "name": "핵심교양",
          "required": 12,
          "dedupBy": "zone",
          "desc": "1·2·4·6영역에서 각 1과목씩 (6영역은 GED6009 지정) · 같은 영역 2과목은 1과목만 인정"
        },
        {
          "key": "swai",
          "name": "SW·AI (일반교양 7영역)",
          "required": 3,
          "dedupBy": "zone",
          "desc": "SW·AI 트랙 지정 과목 중 택1"
        },
        {
          "key": "creative",
          "name": "창의",
          "required": 3,
          "dedupBy": "zone",
          "desc": "창의 영역 지정 과목 중 택1"
        }
      ],
      "certOptions": [
        {
          "id": "toeic",
          "label": "TOEIC 700점 이상"
        },
        {
          "id": "toeic_speaking",
          "label": "TOEIC Speaking 130점 이상"
        },
        {
          "id": "toefl_pbt",
          "label": "TOEFL PBT 540점 이상"
        },
        {
          "id": "toefl_cbt",
          "label": "TOEFL CBT 207점 이상"
        },
        {
          "id": "toefl_ibt",
          "label": "TOEFL iBT 76점 이상"
        },
        {
          "id": "new_teps",
          "label": "NEW TEPS 327점 이상"
        },
        {
          "id": "opic",
          "label": "OPIc IM1 이상"
        },
        {
          "id": "ielts",
          "label": "IELTS 6.0 이상"
        },
        {
          "id": "course",
          "label": "졸업인증실용영어 (GEE3001) 이수"
        },
        {
          "id": "specialLecture",
          "label": "졸업인증 토익특강"
        }
      ],
      "notices": [
        "재수강 과목과 F 학점은 반영하지 않음",
        "최종 졸업 판정은 학과 졸업사정 기준"
      ]
    },
    "courses": [
      {
        "code": "CSE1101",
        "name": "객체지향프로그래밍 1",
        "credit": 3,
        "category": "MAJOR_REQ",
        "grade": 1,
        "recYear": 1,
        "recSem": [
          1
        ],
        "recEstimated": false,
        "curriculum": true,
        "offeringDept": "cse",
        "offeringLabel": "컴퓨터공학과",
        "prereq": []
      },
      {
        "code": "CSE1103",
        "name": "객체지향프로그래밍 2",
        "credit": 3,
        "category": "MAJOR_REQ",
        "grade": 1,
        "recYear": 1,
        "recSem": [
          2
        ],
        "recEstimated": false,
        "curriculum": true,
        "offeringDept": "cse",
        "offeringLabel": "컴퓨터공학과",
        "prereq": [
          "CSE1101"
        ]
      },
      {
        "code": "CSE1312",
        "name": "이산구조",
        "credit": 3,
        "category": "MAJOR_REQ",
        "grade": 1,
        "recYear": 1,
        "recSem": [
          2
        ],
        "recEstimated": false,
        "curriculum": true,
        "offeringDept": "cse",
        "offeringLabel": "컴퓨터공학과",
        "prereq": []
      },
      {
        "code": "CSE2112",
        "name": "자료구조",
        "credit": 4,
        "category": "MAJOR_REQ",
        "grade": 2,
        "recYear": 2,
        "recSem": [
          1
        ],
        "recEstimated": false,
        "curriculum": true,
        "offeringDept": "cse",
        "offeringLabel": "컴퓨터공학과",
        "prereq": [
          "CSE1103",
          "MTH1902"
        ]
      },
      {
        "code": "CSE4205",
        "name": "컴퓨터공학 종합설계",
        "credit": 3,
        "category": "MAJOR_REQ",
        "grade": 4,
        "recYear": 4,
        "recSem": [
          1,
          2
        ],
        "recEstimated": false,
        "curriculum": true,
        "offeringDept": "cse",
        "offeringLabel": "컴퓨터공학과",
        "prereq": [
          "CSE2112"
        ]
      },
      {
        "code": "CSE2904",
        "name": "통계학",
        "credit": 3,
        "category": "MAJOR_REQ",
        "grade": 2,
        "recYear": 2,
        "recSem": [
          1
        ],
        "recEstimated": false,
        "curriculum": true,
        "offeringDept": "cse",
        "offeringLabel": "컴퓨터공학과",
        "prereq": []
      },
      {
        "code": "MTH1901",
        "name": "일반수학 1",
        "credit": 3,
        "category": "MAJOR_REQ",
        "grade": 1,
        "recYear": 1,
        "recSem": [
          1
        ],
        "recEstimated": false,
        "curriculum": true,
        "offeringDept": "cse",
        "offeringLabel": "컴퓨터공학과",
        "prereq": []
      },
      {
        "code": "MTH1902",
        "name": "일반수학 2",
        "credit": 3,
        "category": "MAJOR_REQ",
        "grade": 1,
        "recYear": 1,
        "recSem": [
          2
        ],
        "recEstimated": false,
        "curriculum": true,
        "offeringDept": "cse",
        "offeringLabel": "컴퓨터공학과",
        "prereq": [
          "MTH1901"
        ]
      },
      {
        "code": "CSE3111",
        "name": "실전산학프로젝트 1",
        "credit": 1,
        "category": "MAJOR_ELEC",
        "grade": null,
        "recYear": 3,
        "recSem": [
          1
        ],
        "recEstimated": true,
        "curriculum": true,
        "offeringDept": "cse",
        "offeringLabel": "컴퓨터공학과",
        "prereq": [
          "CSE2112"
        ]
      },
      {
        "code": "CSE1122",
        "name": "컴퓨터공학입문 프로그래밍",
        "credit": 3,
        "category": "MAJOR_ELEC",
        "grade": 1,
        "recYear": 1,
        "recSem": [
          1
        ],
        "recEstimated": false,
        "curriculum": true,
        "offeringDept": "cse",
        "offeringLabel": "컴퓨터공학과",
        "prereq": []
      },
      {
        "code": "CSE2105",
        "name": "컴퓨터기반선형대수",
        "credit": 3,
        "category": "MAJOR_ELEC",
        "grade": 2,
        "recYear": 2,
        "recSem": [
          2
        ],
        "recEstimated": false,
        "curriculum": true,
        "offeringDept": "cse",
        "offeringLabel": "컴퓨터공학과",
        "prereq": [
          "CSE2112"
        ]
      },
      {
        "code": "CSE2113",
        "name": "오픈소스SW개론",
        "credit": 3,
        "category": "MAJOR_ELEC",
        "grade": 2,
        "recYear": 2,
        "recSem": [
          1
        ],
        "recEstimated": false,
        "curriculum": true,
        "offeringDept": "cse",
        "offeringLabel": "컴퓨터공학과",
        "prereq": []
      },
      {
        "code": "CSE2211",
        "name": "논리회로",
        "credit": 3,
        "category": "MAJOR_ELEC",
        "grade": 2,
        "recYear": 2,
        "recSem": [
          2
        ],
        "recEstimated": false,
        "curriculum": true,
        "offeringDept": "cse",
        "offeringLabel": "컴퓨터공학과",
        "prereq": []
      },
      {
        "code": "CSE3104",
        "name": "컴퓨터응용확률",
        "credit": 3,
        "category": "MAJOR_ELEC",
        "grade": 3,
        "recYear": 3,
        "recSem": [
          2
        ],
        "recEstimated": false,
        "curriculum": true,
        "offeringDept": "cse",
        "offeringLabel": "컴퓨터공학과",
        "prereq": [
          "CSE2112"
        ]
      },
      {
        "code": "CSE3203",
        "name": "컴퓨터구조론",
        "credit": 3,
        "category": "MAJOR_ELEC",
        "grade": 3,
        "recYear": 3,
        "recSem": [
          1
        ],
        "recEstimated": false,
        "curriculum": true,
        "offeringDept": "cse",
        "offeringLabel": "컴퓨터공학과",
        "prereq": [
          "CSE2112"
        ]
      },
      {
        "code": "CSE3212",
        "name": "컴퓨터 네트워크",
        "credit": 3,
        "category": "MAJOR_ELEC",
        "grade": 3,
        "recYear": 3,
        "recSem": [
          1,
          2
        ],
        "recEstimated": false,
        "curriculum": true,
        "offeringDept": "cse",
        "offeringLabel": "컴퓨터공학과",
        "prereq": [
          "CSE2112"
        ]
      },
      {
        "code": "CSE3308",
        "name": "시스템분석",
        "credit": 3,
        "category": "MAJOR_ELEC",
        "grade": 3,
        "recYear": 3,
        "recSem": [
          1
        ],
        "recEstimated": false,
        "curriculum": true,
        "offeringDept": "cse",
        "offeringLabel": "컴퓨터공학과",
        "prereq": [
          "CSE2112"
        ]
      },
      {
        "code": "CSE3309",
        "name": "문제해결기법",
        "credit": 4,
        "category": "MAJOR_ELEC",
        "grade": 3,
        "recYear": 3,
        "recSem": [
          2
        ],
        "recEstimated": false,
        "curriculum": true,
        "offeringDept": "cse",
        "offeringLabel": "컴퓨터공학과",
        "prereq": [
          "CSE2112"
        ]
      },
      {
        "code": "CSE4201",
        "name": "소프트웨어공학",
        "credit": 3,
        "category": "MAJOR_ELEC",
        "grade": 4,
        "recYear": 4,
        "recSem": [
          2
        ],
        "recEstimated": false,
        "curriculum": true,
        "offeringDept": "cse",
        "offeringLabel": "컴퓨터공학과",
        "prereq": [
          "CSE2112"
        ]
      },
      {
        "code": "CSE4204",
        "name": "알고리즘",
        "credit": 3,
        "category": "MAJOR_ELEC",
        "grade": 3,
        "recYear": 3,
        "recSem": [
          1
        ],
        "recEstimated": false,
        "curriculum": true,
        "offeringDept": "cse",
        "offeringLabel": "컴퓨터공학과",
        "prereq": [
          "CSE2112"
        ]
      },
      {
        "code": "CSE4232",
        "name": "프로그래밍언어 이론",
        "credit": 3,
        "category": "MAJOR_ELEC",
        "grade": 4,
        "recYear": 4,
        "recSem": [
          1
        ],
        "recEstimated": false,
        "curriculum": true,
        "offeringDept": "cse",
        "offeringLabel": "컴퓨터공학과",
        "prereq": [
          "CSE2112"
        ]
      },
      {
        "code": "CSE3207",
        "name": "데이터베이스",
        "credit": 3,
        "category": "MAJOR_ELEC",
        "grade": 3,
        "recYear": 3,
        "recSem": [
          1
        ],
        "recEstimated": false,
        "curriculum": true,
        "offeringDept": "cse",
        "offeringLabel": "컴퓨터공학과",
        "prereq": [
          "CSE2112"
        ]
      },
      {
        "code": "CSE4111",
        "name": "클라우드컴퓨팅",
        "credit": 3,
        "category": "MAJOR_ELEC",
        "grade": 4,
        "recYear": 4,
        "recSem": [
          1
        ],
        "recEstimated": false,
        "curriculum": true,
        "offeringDept": "cse",
        "offeringLabel": "컴퓨터공학과",
        "prereq": [
          "CSE2112",
          "CSE3212"
        ]
      },
      {
        "code": "CSE4206",
        "name": "데이터마이닝",
        "credit": 3,
        "category": "MAJOR_ELEC",
        "grade": 4,
        "recYear": 4,
        "recSem": [
          2
        ],
        "recEstimated": false,
        "curriculum": true,
        "offeringDept": "cse",
        "offeringLabel": "컴퓨터공학과",
        "prereq": [
          "CSE2112"
        ]
      },
      {
        "code": "CSE4302",
        "name": "인공지능",
        "credit": 3,
        "category": "MAJOR_ELEC",
        "grade": 2,
        "recYear": 2,
        "recSem": [
          2
        ],
        "recEstimated": false,
        "curriculum": true,
        "offeringDept": "cse",
        "offeringLabel": "컴퓨터공학과",
        "prereq": [
          "CSE2112"
        ]
      },
      {
        "code": "CSE4315",
        "name": "기계학습",
        "credit": 3,
        "category": "MAJOR_ELEC",
        "grade": 4,
        "recYear": 4,
        "recSem": [
          1
        ],
        "recEstimated": false,
        "curriculum": true,
        "offeringDept": "cse",
        "offeringLabel": "컴퓨터공학과",
        "prereq": [
          "CSE2112",
          "CSE2105"
        ]
      },
      {
        "code": "CSE4317",
        "name": "딥러닝",
        "credit": 3,
        "category": "MAJOR_ELEC",
        "grade": 4,
        "recYear": 4,
        "recSem": [
          2
        ],
        "recEstimated": false,
        "curriculum": true,
        "offeringDept": "cse",
        "offeringLabel": "컴퓨터공학과",
        "prereq": [
          "CSE2112"
        ]
      },
      {
        "code": "CSE3206",
        "name": "오퍼레이팅시스템",
        "credit": 3,
        "category": "MAJOR_ELEC",
        "grade": 3,
        "recYear": 3,
        "recSem": [
          1
        ],
        "recEstimated": false,
        "curriculum": true,
        "offeringDept": "cse",
        "offeringLabel": "컴퓨터공학과",
        "prereq": [
          "CSE2112"
        ]
      },
      {
        "code": "CSE3209",
        "name": "시스템 프로그래밍",
        "credit": 3,
        "category": "MAJOR_ELEC",
        "grade": 2,
        "recYear": 2,
        "recSem": [
          2
        ],
        "recEstimated": false,
        "curriculum": true,
        "offeringDept": "cse",
        "offeringLabel": "컴퓨터공학과",
        "prereq": [
          "CSE2112"
        ]
      },
      {
        "code": "CSE3213",
        "name": "디지털시스템설계",
        "credit": 3,
        "category": "MAJOR_ELEC",
        "grade": 3,
        "recYear": 3,
        "recSem": [
          2
        ],
        "recEstimated": false,
        "curriculum": true,
        "offeringDept": "cse",
        "offeringLabel": "컴퓨터공학과",
        "prereq": [
          "CSE2112",
          "CSE3203"
        ]
      },
      {
        "code": "CSE3214",
        "name": "병렬 프로그래밍",
        "credit": 3,
        "category": "MAJOR_ELEC",
        "grade": 3,
        "recYear": 3,
        "recSem": [
          2
        ],
        "recEstimated": false,
        "curriculum": true,
        "offeringDept": "cse",
        "offeringLabel": "컴퓨터공학과",
        "prereq": [
          "CSE2112"
        ]
      },
      {
        "code": "CSE3304",
        "name": "임베디드소프트웨어",
        "credit": 3,
        "category": "MAJOR_ELEC",
        "grade": 3,
        "recYear": 3,
        "recSem": [
          2
        ],
        "recEstimated": false,
        "curriculum": true,
        "offeringDept": "cse",
        "offeringLabel": "컴퓨터공학과",
        "prereq": [
          "CSE2112",
          "CSE3206"
        ]
      },
      {
        "code": "CSE4312",
        "name": "컴파일러",
        "credit": 3,
        "category": "MAJOR_ELEC",
        "grade": 4,
        "recYear": 4,
        "recSem": [
          1
        ],
        "recEstimated": false,
        "curriculum": true,
        "offeringDept": "cse",
        "offeringLabel": "컴퓨터공학과",
        "prereq": [
          "CSE2112"
        ]
      },
      {
        "code": "CSE4313",
        "name": "컴퓨터보안",
        "credit": 3,
        "category": "MAJOR_ELEC",
        "grade": 4,
        "recYear": 4,
        "recSem": [
          1
        ],
        "recEstimated": false,
        "curriculum": true,
        "offeringDept": "cse",
        "offeringLabel": "컴퓨터공학과",
        "prereq": [
          "CSE2112"
        ]
      },
      {
        "code": "CSE2104",
        "name": "인터넷 프로그래밍",
        "credit": 3,
        "category": "MAJOR_ELEC",
        "grade": 2,
        "recYear": 2,
        "recSem": [
          1
        ],
        "recEstimated": false,
        "curriculum": true,
        "offeringDept": "cse",
        "offeringLabel": "컴퓨터공학과",
        "prereq": []
      },
      {
        "code": "CSE2107",
        "name": "자바기반응용프로그래밍",
        "credit": 3,
        "category": "MAJOR_ELEC",
        "grade": 2,
        "recYear": 2,
        "recSem": [
          1
        ],
        "recEstimated": false,
        "curriculum": true,
        "offeringDept": "cse",
        "offeringLabel": "컴퓨터공학과",
        "prereq": []
      },
      {
        "code": "CSE3204",
        "name": "컴퓨터그래픽스",
        "credit": 3,
        "category": "MAJOR_ELEC",
        "grade": 3,
        "recYear": 3,
        "recSem": [
          2
        ],
        "recEstimated": false,
        "curriculum": true,
        "offeringDept": "cse",
        "offeringLabel": "컴퓨터공학과",
        "prereq": [
          "CSE2112"
        ]
      },
      {
        "code": "CSE3210",
        "name": "오픈소스응용프로그래밍",
        "credit": 3,
        "category": "MAJOR_ELEC",
        "grade": 2,
        "recYear": 2,
        "recSem": [
          2
        ],
        "recEstimated": false,
        "curriculum": true,
        "offeringDept": "cse",
        "offeringLabel": "컴퓨터공학과",
        "prereq": [
          "CSE2112",
          "CSE2113"
        ]
      },
      {
        "code": "CSE4303",
        "name": "게임프로그래밍",
        "credit": 3,
        "category": "MAJOR_ELEC",
        "grade": 4,
        "recYear": 4,
        "recSem": [
          1
        ],
        "recEstimated": false,
        "curriculum": true,
        "offeringDept": "cse",
        "offeringLabel": "컴퓨터공학과",
        "prereq": [
          "CSE2112",
          "CSE3204"
        ]
      },
      {
        "code": "CSE4307",
        "name": "멀티미디어 컴퓨팅",
        "credit": 3,
        "category": "MAJOR_ELEC",
        "grade": 4,
        "recYear": 4,
        "recSem": [
          1
        ],
        "recEstimated": false,
        "curriculum": true,
        "offeringDept": "cse",
        "offeringLabel": "컴퓨터공학과",
        "prereq": [
          "CSE2112"
        ]
      },
      {
        "code": "CSE4316",
        "name": "IoT와 엣지컴퓨팅 개론",
        "credit": 3,
        "category": "MAJOR_ELEC",
        "grade": 4,
        "recYear": 4,
        "recSem": [
          2
        ],
        "recEstimated": false,
        "curriculum": true,
        "offeringDept": "cse",
        "offeringLabel": "컴퓨터공학과",
        "prereq": [
          "CSE2112"
        ]
      },
      {
        "code": "GEB1112",
        "name": "크로스오버1 : 인간의 탐색",
        "credit": 2,
        "category": "GEN_REQ",
        "area": "focus",
        "zone": null,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양",
        "recYear": 1,
        "recSem": [
          1
        ],
        "recEstimated": false
      },
      {
        "code": "GEB1114",
        "name": "크로스오버3 : 사회의 탐색",
        "credit": 2,
        "category": "GEN_REQ",
        "area": "focus",
        "zone": null,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양",
        "recYear": 1,
        "recSem": [
          1,
          2
        ],
        "recEstimated": false
      },
      {
        "code": "GEB1117",
        "name": "커리어디자인 1",
        "credit": 2,
        "category": "GEN_REQ",
        "area": "basic",
        "zone": null,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양",
        "recYear": 1,
        "recSem": [
          1
        ],
        "recEstimated": false
      },
      {
        "code": "GEB1126",
        "name": "문제해결을 위한 글쓰기",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "basic",
        "zone": null,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양",
        "recYear": 1,
        "recSem": [
          1
        ],
        "recEstimated": false
      },
      {
        "code": "GEB1143",
        "name": "미래사회와 소프트웨어(IT계열)",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "basic",
        "zone": null,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양",
        "recYear": 1,
        "recSem": [
          2
        ],
        "recEstimated": false
      },
      {
        "code": "GEB1151",
        "name": "커리어 디자인 2",
        "credit": 1,
        "category": "GEN_REQ",
        "area": "basic",
        "zone": null,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양",
        "recYear": 3,
        "recSem": [
          1
        ],
        "recEstimated": false
      },
      {
        "code": "GEB1107",
        "name": "의사소통 영어",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "basic",
        "zone": null,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양",
        "recYear": 1,
        "recSem": [
          2
        ],
        "recEstimated": false
      },
      {
        "code": "GEB1108",
        "name": "의사소통 영어 : 중급",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "basic",
        "zone": null,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양",
        "recYear": 1,
        "recSem": [
          2
        ],
        "recEstimated": false
      },
      {
        "code": "GEB1109",
        "name": "의사소통 영어 : 고급",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "basic",
        "zone": null,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양",
        "recYear": 1,
        "recSem": [
          2
        ],
        "recEstimated": false
      },
      {
        "code": "GED1003",
        "name": "나눔 프로젝트",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "core",
        "zone": 1,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED1004",
        "name": "가치창조를 위한 명저 읽기",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "core",
        "zone": 1,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED1005",
        "name": "인간-AI-기계",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "core",
        "zone": 1,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED1006",
        "name": "창의적 사고와 소통",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "core",
        "zone": 1,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED1007",
        "name": "독서세미나 : 인간, 가치, 공존",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "core",
        "zone": 1,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED1008",
        "name": "인하 라이프 아카데미 : 인간, 가치, 공존",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "core",
        "zone": 1,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED1009",
        "name": "마음을 움직이는 리더십",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "core",
        "zone": 1,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED1010",
        "name": "오래된 미래: 동양고전에서의 인간다움",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "core",
        "zone": 1,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED1011",
        "name": "SF와 인간의 미래",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "core",
        "zone": 1,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED1012",
        "name": "4차 산업혁명 시대의 리더십",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "core",
        "zone": 1,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED1013",
        "name": "현대 사회의 가치관",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "core",
        "zone": 1,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED1014",
        "name": "인공지능 시대의 사랑, 행복, 정의",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "core",
        "zone": 1,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED1015",
        "name": "ESG와 사회적 가치 실천",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "core",
        "zone": 1,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED1016",
        "name": "윤리적 리더십",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "core",
        "zone": 1,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED2001",
        "name": "역사 속의 라이벌",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "core",
        "zone": 2,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED2002",
        "name": "한국 역사속의 생활과 민속",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "core",
        "zone": 2,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED2003",
        "name": "종교와 문화",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "core",
        "zone": 2,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED2004",
        "name": "서양철학 : 거인들의 어깨",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "core",
        "zone": 2,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED2005",
        "name": "동양철학 : 마르지 않는 샘",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "core",
        "zone": 2,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED2006",
        "name": "인간의 성장과 발달",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "core",
        "zone": 2,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED2007",
        "name": "현대사회와패션",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "core",
        "zone": 2,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED2008",
        "name": "문화유산의 이해",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "core",
        "zone": 2,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED2009",
        "name": "문화심리",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "core",
        "zone": 2,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED2010",
        "name": "축제와 인간사회",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "core",
        "zone": 2,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED2011",
        "name": "지역인문학",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "core",
        "zone": 2,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED2012",
        "name": "문제탐색을 위한 명저읽기",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "core",
        "zone": 2,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED2013",
        "name": "독서세미나 : 역사, 사상, 문화",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "core",
        "zone": 2,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED2014",
        "name": "인하 라이프 아카데미 : 역사, 사상, 문화",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "core",
        "zone": 2,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED2016",
        "name": "그리스신화의 이해",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "core",
        "zone": 2,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED2018",
        "name": "전염병의 지리학",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "core",
        "zone": 2,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED2019",
        "name": "디지털 시민성과 관계적 인간",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "core",
        "zone": 2,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED4001",
        "name": "다문화사회와 공존의 인문학",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "core",
        "zone": 4,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED4002",
        "name": "세계이해를 위한 명저 읽기",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "core",
        "zone": 4,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED4004",
        "name": "부와 빈곤의 글로벌 지도",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "core",
        "zone": 4,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED4005",
        "name": "글로벌 사회의 이해",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "core",
        "zone": 4,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED4006",
        "name": "국제관계학개론",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "core",
        "zone": 4,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED4007",
        "name": "동아시아 정치와 철학의 재발견",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "core",
        "zone": 4,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED4008",
        "name": "결혼과 부모역할",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "core",
        "zone": 4,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED4009",
        "name": "동북아와 한일관계",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "core",
        "zone": 4,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED4010",
        "name": "인권의 이해",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "core",
        "zone": 4,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED4011",
        "name": "지식재산 이론과 실제",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "core",
        "zone": 4,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED4014",
        "name": "독서세미나 : 사회, 제도, 세계",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "core",
        "zone": 4,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED4015",
        "name": "인류문명과 에너지원의 변천사",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "core",
        "zone": 4,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED6009",
        "name": "인공지능과 소프트웨어를 활용한 탄소중립",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "core",
        "zone": 6,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE7005",
        "name": "이차전지와 인공지능",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "swai",
        "zone": "swai",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE7006",
        "name": "보건의료정보학과 인공지능",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "swai",
        "zone": "swai",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE7007",
        "name": "디지털 경영",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "swai",
        "zone": "swai",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE7008",
        "name": "탄소중립과 4차산업",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "swai",
        "zone": "swai",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE7010",
        "name": "게임 기획 및 시각화",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "swai",
        "zone": "swai",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE7011",
        "name": "스마트 시티와 미래모빌리티",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "swai",
        "zone": "swai",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE7012",
        "name": "신소재와 에너지",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "swai",
        "zone": "swai",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE7013",
        "name": "신재생에너지의 이해",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "swai",
        "zone": "swai",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE7014",
        "name": "컴퓨터비전 중심 인공지능 입문",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "swai",
        "zone": "swai",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE7015",
        "name": "친환경 항공우주 시스템",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "swai",
        "zone": "swai",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE7016",
        "name": "탄소중립과 에너지의 흐름",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "swai",
        "zone": "swai",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE7018",
        "name": "데이터사이언스 이해",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "swai",
        "zone": "swai",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE7019",
        "name": "미래산업과 AI이미지",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "swai",
        "zone": "swai",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE4001",
        "name": "지적재산권의 이해",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "creative",
        "zone": "creative",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE4004",
        "name": "효율적 기술개발과 기업가 정신",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "creative",
        "zone": "creative",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE4005",
        "name": "경영전략과 스타트업",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "creative",
        "zone": "creative",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE4006",
        "name": "기술경영 창업",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "creative",
        "zone": "creative",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE4007",
        "name": "발명과 특허",
        "credit": 2,
        "category": "GEN_REQ",
        "area": "creative",
        "zone": "creative",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE4009",
        "name": "스타트업 이슈 리서치",
        "credit": 1,
        "category": "GEN_REQ",
        "area": "creative",
        "zone": "creative",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE4010",
        "name": "인하특강 : 기업가 정신과 창업",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "creative",
        "zone": "creative",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE4012",
        "name": "벤처기업과 히든챔피언에 대한 이해",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "creative",
        "zone": "creative",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE4013",
        "name": "인하특강 : CEO와 기업가 정신",
        "credit": 2,
        "category": "GEN_REQ",
        "area": "creative",
        "zone": "creative",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE4014",
        "name": "취업 및 창업 특강",
        "credit": 2,
        "category": "GEN_REQ",
        "area": "creative",
        "zone": "creative",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE4016",
        "name": "창업 실습",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "creative",
        "zone": "creative",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE4018",
        "name": "스타트업시작의 이해",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "creative",
        "zone": "creative",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE4019",
        "name": "스타트업 아이디어 발상",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "creative",
        "zone": "creative",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE4020",
        "name": "창업 시뮬레이션",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "creative",
        "zone": "creative",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE4021",
        "name": "실전 스타트업",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "creative",
        "zone": "creative",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE4025",
        "name": "글로벌 스타트업의 이해",
        "credit": 2,
        "category": "GEN_REQ",
        "area": "creative",
        "zone": "creative",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE4026",
        "name": "성공하는 비즈니스 모델 개발",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "creative",
        "zone": "creative",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE4027",
        "name": "캠퍼스CEO",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "creative",
        "zone": "creative",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE4028",
        "name": "사내벤처기업 경영전략",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "creative",
        "zone": "creative",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE4029",
        "name": "기업가정신과 지역문제 해결",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "creative",
        "zone": "creative",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE4030",
        "name": "성공 스타트업 실무",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "creative",
        "zone": "creative",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE4031",
        "name": "사내벤처기업 경영전략",
        "credit": 2,
        "category": "GEN_REQ",
        "area": "creative",
        "zone": "creative",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE4032",
        "name": "기업가정신과 지역문제 해결",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "creative",
        "zone": "creative",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE4033",
        "name": "성공 스타트업 실무",
        "credit": 2,
        "category": "GEN_REQ",
        "area": "creative",
        "zone": "creative",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE4034",
        "name": "캠퍼스 CEO",
        "credit": 2,
        "category": "GEN_REQ",
        "area": "creative",
        "zone": "creative",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED3001",
        "name": "대중문학의 이해",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED3002",
        "name": "영화로보는문학세계",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED3005",
        "name": "사이언스 픽션: 과학, 문학, 상상력",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED3007",
        "name": "인문학으로 바라본 마케팅",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED3009",
        "name": "풍경에 관하여 : 인문학과 시각예술의 만남",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED3014",
        "name": "영화와 테크놀러지",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED3015",
        "name": "희곡의 이해",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED3016",
        "name": "애니메이션속의 상상과 인식",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED3017",
        "name": "지평융합을 위한 명저 읽기",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED3018",
        "name": "그래픽 디자인 이야기",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED3019",
        "name": "스포츠 창의융합 프로젝트",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED3020",
        "name": "독서세미나 : 문학, 예술, 상징",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED3021",
        "name": "예술가곡의 가창실습",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED3022",
        "name": "영화 속 클래식 음악",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED5001",
        "name": "환경과 인간",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED5002",
        "name": "생활 속 바이오이야기",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED5003",
        "name": "생활과과학",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED5004",
        "name": "지속가능성을 위한 화학 이야기",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED5005",
        "name": "현대생명과학의 이해",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED5007",
        "name": "첨단 바이오테크놀로지의 이해",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED5008",
        "name": "과학으로 세상읽기",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED5010",
        "name": "신비로운 인체와 맞춤운동",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED5011",
        "name": "독서세미나 : 자연, 생명, 환경",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED6002",
        "name": "초연결사회와 모바일 소프트웨어",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED6003",
        "name": "컴퓨팅사고와 데이터분석 기초",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED6004",
        "name": "블록코딩과 AI기초",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED6005",
        "name": "지능정보서비스와 소프트웨어",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED6007",
        "name": "디지털 트랜스포메이션과 미래사회의 이해",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED6008",
        "name": "4차 산업혁명 기술의 이해",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED6010",
        "name": "배터리속 소재 이야기",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED6011",
        "name": "프로그래밍과 문제해결",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE1001",
        "name": "명언으로 배우는 한자와 한문",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE1002",
        "name": "동화와 마법의 상상력",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE1005",
        "name": "영화로 보는 한국문화",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE1006",
        "name": "동화의이해",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE1012",
        "name": "창작을 위한 글쓰기 실습",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE1016",
        "name": "평생교육실습",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE1019",
        "name": "와인으로 보는 세계 문화",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE1022",
        "name": "한중 서사콘텐츠의 이해",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE1023",
        "name": "인하특강 : 인하와 인천",
        "credit": 2,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE1024",
        "name": "클래식 음악 감상 실습",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE1025",
        "name": "생각하는 힘: 논리와 사고의 기술",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE1026",
        "name": "드로잉의 기초",
        "credit": 2,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE1027",
        "name": "영화로 만나는 패션",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE1028",
        "name": "스무살에 읽는 동양고전",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE1029",
        "name": "미술과 여행",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE1030",
        "name": "세계디자인여행",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE1031",
        "name": "영화와 대중문화",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE1033",
        "name": "철학의 기본 질문들",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE2001",
        "name": "긍정심리학",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE2003",
        "name": "Korean Society and Politics",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE2005",
        "name": "경제학의 이해",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE2006",
        "name": "지리와 여행",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE2007",
        "name": "생활 속의 경제 원리",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE2008",
        "name": "영화 속의 법이야기",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE2009",
        "name": "법학의 이해",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE2010",
        "name": "범죄와 사회",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE2015",
        "name": "기초수학",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE2016",
        "name": "기초물리학",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE2017",
        "name": "고급물리학",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE2018",
        "name": "광고의 이해",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE2020",
        "name": "세계시민교육: 차이를 넘어 공존으로",
        "credit": 2,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE2021",
        "name": "과학수사 들여다보기",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE2023",
        "name": "뉴스 속의 법이야기",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE2024",
        "name": "미디어와 콘텐츠",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE2025",
        "name": "생각보다 가까운 FTA",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE2027",
        "name": "바다의 불편한 진실",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE2028",
        "name": "브랜드 생성의 원리",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE2030",
        "name": "숲의 이해",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE2031",
        "name": "실크로드 문명의 이해",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE2032",
        "name": "함께 사는 법",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE2033",
        "name": "반려동물과 사회생활",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE2035",
        "name": "중국 지역 문화",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE2036",
        "name": "에너지와 기후환경",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE2037",
        "name": "권력과 사회문화",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE2039",
        "name": "인공지능과 데이터의 윤리",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE2040",
        "name": "영화로 보는 생명공학",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE2041",
        "name": "차세대 해양리더 양성 아카데미",
        "credit": 2,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE3001",
        "name": "졸업인증실용영어",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE3003",
        "name": "외국인전용초급한국어",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE3004",
        "name": "외국인전용중급한국어",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE3012",
        "name": "스타트일본어",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE3013",
        "name": "대학기초영어",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE3014",
        "name": "토크쇼로 배우는 영어대화기술",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE3016",
        "name": "초급일본어",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE3017",
        "name": "초급 프랑스어",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE3019",
        "name": "외국인전용 기초한국어",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE3021",
        "name": "미국문화의 이해",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE3025",
        "name": "장애인과 함께 하는 삶",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE3026",
        "name": "생활한문",
        "credit": 1,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE3027",
        "name": "실용영어 L/S",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE3028",
        "name": "실용영어 R/W",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE3030",
        "name": "외국인전용 한국어 레포트쓰기",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE3031",
        "name": "외국인전용 한국어 프레젠테이션",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE3032",
        "name": "외국인전용 미디어 한국어",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE3033",
        "name": "외국인전용 한국과 세계의 비교문화",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE3035",
        "name": "서바이벌베트남어",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE3037",
        "name": "국제 비즈니스 영어회화와 작문",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE3038",
        "name": "자원봉사로 이해하는 지역사회",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE3039",
        "name": "교환학생 전용 신나는 인하 한국어",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE3040",
        "name": "한중 언어문화 비교",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE3041",
        "name": "스페인·중남미 문화의 이해",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE3042",
        "name": "실용중국어회화",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE3043",
        "name": "미국드라마로 배우는 영어표현",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE4003",
        "name": "기업 수요지향기술 종합설계",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE4022",
        "name": "취업을 위한 글쓰기 실습",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE4023",
        "name": "사회적기업의 비즈니스모델 이해",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE5002",
        "name": "증권투자의 이해",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE5006",
        "name": "생활과 재테크",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE5007",
        "name": "공학과 여성",
        "credit": 2,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE5012",
        "name": "인하특강 : 언론을 통한 세상보기",
        "credit": 2,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE5014",
        "name": "인하 스콜라 특강",
        "credit": 1,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE5015",
        "name": "적성탐색과 자기관리",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE5016",
        "name": "진로설계 이해와 전략",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE5017",
        "name": "품질의 차원",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE6001",
        "name": "건강한 체중조절을 위한 맞춤영양",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE6002",
        "name": "댄스스포츠",
        "credit": 1,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE6003",
        "name": "수영",
        "credit": 1,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE6004",
        "name": "테니스",
        "credit": 1,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE6005",
        "name": "요가와 명상",
        "credit": 1,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE6006",
        "name": "호신술",
        "credit": 1,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE6007",
        "name": "골프",
        "credit": 1,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE6008",
        "name": "스키",
        "credit": 1,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE6009",
        "name": "야구소프트볼",
        "credit": 1,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE6014",
        "name": "미술치료로 알아가는 가족이야기",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE6015",
        "name": "피트니스 트레이닝",
        "credit": 1,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE6016",
        "name": "금연과 건강한 삶",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE6017",
        "name": "스포츠 트레이닝 과학",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE6018",
        "name": "운동과 건강",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE6019",
        "name": "스포츠과학과 건강",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE6020",
        "name": "암세포 이야기",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE6021",
        "name": "피아노 연주 실습",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE6022",
        "name": "합창 실기 및 연주",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE6023",
        "name": "시창청음실습",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE6024",
        "name": "웰니스를 위한 걷기와 달리기",
        "credit": 1,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE7002",
        "name": "객체지향 기반 응용 프로그래밍",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE7003",
        "name": "인공지능 개론 및 프로그래밍 기초",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE7004",
        "name": "객체지향언어와 SW활용",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE7017",
        "name": "소프트웨어와 인공지능 이해 및 응용",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEB1113",
        "name": "크로스오버2 : 자연의 탐색",
        "credit": 2,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEB1118",
        "name": "우리가 만드는 세계(WWM1)",
        "credit": 2,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEB1119",
        "name": "우리가 만나는 세계(WWM2)",
        "credit": 2,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEB1141",
        "name": "미래사회와 소프트웨어(인문사회계열)",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEB1142",
        "name": "미래사회와 소프트웨어(이공계열)",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      }
    ]
  },
  "cse_2026": {
    "id": "cse_2026",
    "departmentCode": "CSE",
    "departmentName": "컴퓨터공학과",
    "admissionYear": 2026,
    "requirements": {
      "totalRequired": 130,
      "credits": {
        "general": 34,
        "major": 25,
        "majorElective": 40,
        "freeElective": 31
      },
      "majorRequiredCount": 8,
      "generalAreas": [
        {
          "key": "focus",
          "name": "중점교양",
          "required": 4,
          "dedupBy": "code",
          "desc": "공통 지정 과목: 크로스오버1 : 인간의 탐색, 크로스오버3 : 사회의 탐색"
        },
        {
          "key": "basic",
          "name": "기초교양",
          "required": 12,
          "dedupBy": "code",
          "desc": "공통 지정 과목 전체 + 의사소통 영어(영어 기초학력평가로 1과목 지정) 중 택1"
        },
        {
          "key": "core",
          "name": "핵심교양",
          "required": 12,
          "dedupBy": "zone",
          "desc": "1·2·4·6영역에서 각 1과목씩 (6영역은 GED6009 지정) · 같은 영역 2과목은 1과목만 인정"
        },
        {
          "key": "swai",
          "name": "SW·AI (일반교양 7영역)",
          "required": 3,
          "dedupBy": "zone",
          "desc": "SW·AI 트랙 지정 과목 중 택1"
        },
        {
          "key": "creative",
          "name": "창의",
          "required": 3,
          "dedupBy": "zone",
          "desc": "창의 영역 지정 과목 중 택1"
        }
      ],
      "certOptions": [
        {
          "id": "toeic",
          "label": "TOEIC 700점 이상"
        },
        {
          "id": "toeic_speaking",
          "label": "TOEIC Speaking 130점 이상"
        },
        {
          "id": "toefl_pbt",
          "label": "TOEFL PBT 540점 이상"
        },
        {
          "id": "toefl_cbt",
          "label": "TOEFL CBT 207점 이상"
        },
        {
          "id": "toefl_ibt",
          "label": "TOEFL iBT 76점 이상"
        },
        {
          "id": "new_teps",
          "label": "NEW TEPS 327점 이상"
        },
        {
          "id": "opic",
          "label": "OPIc IM1 이상"
        },
        {
          "id": "ielts",
          "label": "IELTS 6.0 이상"
        },
        {
          "id": "course",
          "label": "졸업인증실용영어 (GEE3001) 이수"
        },
        {
          "id": "specialLecture",
          "label": "졸업인증 토익특강"
        }
      ],
      "notices": [
        "재수강 과목과 F 학점은 반영하지 않음",
        "최종 졸업 판정은 학과 졸업사정 기준"
      ]
    },
    "courses": [
      {
        "code": "CSE1101",
        "name": "객체지향프로그래밍 1",
        "credit": 3,
        "category": "MAJOR_REQ",
        "grade": 1,
        "recYear": 1,
        "recSem": [
          1
        ],
        "recEstimated": false,
        "curriculum": true,
        "offeringDept": "cse",
        "offeringLabel": "컴퓨터공학과",
        "prereq": []
      },
      {
        "code": "CSE1103",
        "name": "객체지향프로그래밍 2",
        "credit": 3,
        "category": "MAJOR_REQ",
        "grade": 1,
        "recYear": 1,
        "recSem": [
          2
        ],
        "recEstimated": false,
        "curriculum": true,
        "offeringDept": "cse",
        "offeringLabel": "컴퓨터공학과",
        "prereq": [
          "CSE1101"
        ]
      },
      {
        "code": "CSE1312",
        "name": "이산구조",
        "credit": 3,
        "category": "MAJOR_REQ",
        "grade": 1,
        "recYear": 1,
        "recSem": [
          2
        ],
        "recEstimated": false,
        "curriculum": true,
        "offeringDept": "cse",
        "offeringLabel": "컴퓨터공학과",
        "prereq": []
      },
      {
        "code": "CSE2112",
        "name": "자료구조",
        "credit": 4,
        "category": "MAJOR_REQ",
        "grade": 2,
        "recYear": 2,
        "recSem": [
          1
        ],
        "recEstimated": false,
        "curriculum": true,
        "offeringDept": "cse",
        "offeringLabel": "컴퓨터공학과",
        "prereq": [
          "CSE1103",
          "MTH1902"
        ]
      },
      {
        "code": "CSE4205",
        "name": "컴퓨터공학 종합설계",
        "credit": 3,
        "category": "MAJOR_REQ",
        "grade": 4,
        "recYear": 4,
        "recSem": [
          1,
          2
        ],
        "recEstimated": false,
        "curriculum": true,
        "offeringDept": "cse",
        "offeringLabel": "컴퓨터공학과",
        "prereq": [
          "CSE2112"
        ]
      },
      {
        "code": "CSE2904",
        "name": "통계학",
        "credit": 3,
        "category": "MAJOR_REQ",
        "grade": 2,
        "recYear": 2,
        "recSem": [
          1
        ],
        "recEstimated": false,
        "curriculum": true,
        "offeringDept": "cse",
        "offeringLabel": "컴퓨터공학과",
        "prereq": []
      },
      {
        "code": "MTH1901",
        "name": "일반수학 1",
        "credit": 3,
        "category": "MAJOR_REQ",
        "grade": 1,
        "recYear": 1,
        "recSem": [
          1
        ],
        "recEstimated": false,
        "curriculum": true,
        "offeringDept": "cse",
        "offeringLabel": "컴퓨터공학과",
        "prereq": []
      },
      {
        "code": "MTH1902",
        "name": "일반수학 2",
        "credit": 3,
        "category": "MAJOR_REQ",
        "grade": 1,
        "recYear": 1,
        "recSem": [
          2
        ],
        "recEstimated": false,
        "curriculum": true,
        "offeringDept": "cse",
        "offeringLabel": "컴퓨터공학과",
        "prereq": [
          "MTH1901"
        ]
      },
      {
        "code": "CSE1122",
        "name": "컴퓨터공학입문 프로그래밍",
        "credit": 3,
        "category": "MAJOR_ELEC",
        "grade": 1,
        "recYear": 1,
        "recSem": [
          1
        ],
        "recEstimated": false,
        "curriculum": true,
        "offeringDept": "cse",
        "offeringLabel": "컴퓨터공학과",
        "prereq": []
      },
      {
        "code": "CSE2105",
        "name": "컴퓨터기반선형대수",
        "credit": 3,
        "category": "MAJOR_ELEC",
        "grade": 2,
        "recYear": 2,
        "recSem": [
          2
        ],
        "recEstimated": false,
        "curriculum": true,
        "offeringDept": "cse",
        "offeringLabel": "컴퓨터공학과",
        "prereq": [
          "CSE2112"
        ]
      },
      {
        "code": "CSE2113",
        "name": "오픈소스SW개론",
        "credit": 3,
        "category": "MAJOR_ELEC",
        "grade": 2,
        "recYear": 2,
        "recSem": [
          1
        ],
        "recEstimated": false,
        "curriculum": true,
        "offeringDept": "cse",
        "offeringLabel": "컴퓨터공학과",
        "prereq": []
      },
      {
        "code": "CSE2211",
        "name": "논리회로",
        "credit": 3,
        "category": "MAJOR_ELEC",
        "grade": 2,
        "recYear": 2,
        "recSem": [
          2
        ],
        "recEstimated": false,
        "curriculum": true,
        "offeringDept": "cse",
        "offeringLabel": "컴퓨터공학과",
        "prereq": []
      },
      {
        "code": "CSE3104",
        "name": "컴퓨터응용확률",
        "credit": 3,
        "category": "MAJOR_ELEC",
        "grade": 3,
        "recYear": 3,
        "recSem": [
          2
        ],
        "recEstimated": false,
        "curriculum": true,
        "offeringDept": "cse",
        "offeringLabel": "컴퓨터공학과",
        "prereq": [
          "CSE2112"
        ]
      },
      {
        "code": "CSE3111",
        "name": "실전산학프로젝트 1",
        "credit": 1,
        "category": "MAJOR_ELEC",
        "grade": 3,
        "recYear": 3,
        "recSem": [
          1,
          2
        ],
        "recEstimated": false,
        "curriculum": true,
        "offeringDept": "cse",
        "offeringLabel": "컴퓨터공학과",
        "prereq": [
          "CSE2112"
        ]
      },
      {
        "code": "CSE3112",
        "name": "실전산학프로젝트 2",
        "credit": 1,
        "category": "MAJOR_ELEC",
        "grade": 3,
        "recYear": 3,
        "recSem": [
          1,
          2
        ],
        "recEstimated": false,
        "curriculum": true,
        "offeringDept": "cse",
        "offeringLabel": "컴퓨터공학과",
        "prereq": [
          "CSE2112"
        ]
      },
      {
        "code": "CSE3203",
        "name": "컴퓨터구조론",
        "credit": 3,
        "category": "MAJOR_ELEC",
        "grade": 3,
        "recYear": 3,
        "recSem": [
          1
        ],
        "recEstimated": false,
        "curriculum": true,
        "offeringDept": "cse",
        "offeringLabel": "컴퓨터공학과",
        "prereq": [
          "CSE2112"
        ]
      },
      {
        "code": "CSE3212",
        "name": "컴퓨터 네트워크",
        "credit": 3,
        "category": "MAJOR_ELEC",
        "grade": 3,
        "recYear": 3,
        "recSem": [
          1,
          2
        ],
        "recEstimated": false,
        "curriculum": true,
        "offeringDept": "cse",
        "offeringLabel": "컴퓨터공학과",
        "prereq": [
          "CSE2112"
        ]
      },
      {
        "code": "CSE3308",
        "name": "시스템분석",
        "credit": 3,
        "category": "MAJOR_ELEC",
        "grade": 3,
        "recYear": 3,
        "recSem": [
          1
        ],
        "recEstimated": false,
        "curriculum": true,
        "offeringDept": "cse",
        "offeringLabel": "컴퓨터공학과",
        "prereq": [
          "CSE2112"
        ]
      },
      {
        "code": "CSE3309",
        "name": "문제해결기법",
        "credit": 4,
        "category": "MAJOR_ELEC",
        "grade": 3,
        "recYear": 3,
        "recSem": [
          2
        ],
        "recEstimated": false,
        "curriculum": true,
        "offeringDept": "cse",
        "offeringLabel": "컴퓨터공학과",
        "prereq": [
          "CSE2112"
        ]
      },
      {
        "code": "CSE4201",
        "name": "소프트웨어공학",
        "credit": 3,
        "category": "MAJOR_ELEC",
        "grade": 4,
        "recYear": 4,
        "recSem": [
          2
        ],
        "recEstimated": false,
        "curriculum": true,
        "offeringDept": "cse",
        "offeringLabel": "컴퓨터공학과",
        "prereq": [
          "CSE2112"
        ]
      },
      {
        "code": "CSE4204",
        "name": "알고리즘",
        "credit": 3,
        "category": "MAJOR_ELEC",
        "grade": 3,
        "recYear": 3,
        "recSem": [
          1
        ],
        "recEstimated": false,
        "curriculum": true,
        "offeringDept": "cse",
        "offeringLabel": "컴퓨터공학과",
        "prereq": [
          "CSE2112"
        ]
      },
      {
        "code": "CSE4232",
        "name": "프로그래밍언어 이론",
        "credit": 3,
        "category": "MAJOR_ELEC",
        "grade": 4,
        "recYear": 4,
        "recSem": [
          1
        ],
        "recEstimated": false,
        "curriculum": true,
        "offeringDept": "cse",
        "offeringLabel": "컴퓨터공학과",
        "prereq": [
          "CSE2112"
        ]
      },
      {
        "code": "CSE3207",
        "name": "데이터베이스",
        "credit": 3,
        "category": "MAJOR_ELEC",
        "grade": 3,
        "recYear": 3,
        "recSem": [
          1
        ],
        "recEstimated": false,
        "curriculum": true,
        "offeringDept": "cse",
        "offeringLabel": "컴퓨터공학과",
        "prereq": [
          "CSE2112"
        ]
      },
      {
        "code": "CSE4111",
        "name": "클라우드컴퓨팅",
        "credit": 3,
        "category": "MAJOR_ELEC",
        "grade": 4,
        "recYear": 4,
        "recSem": [
          1
        ],
        "recEstimated": false,
        "curriculum": true,
        "offeringDept": "cse",
        "offeringLabel": "컴퓨터공학과",
        "prereq": [
          "CSE2112",
          "CSE3212"
        ]
      },
      {
        "code": "CSE4206",
        "name": "데이터마이닝",
        "credit": 3,
        "category": "MAJOR_ELEC",
        "grade": 4,
        "recYear": 4,
        "recSem": [
          2
        ],
        "recEstimated": false,
        "curriculum": true,
        "offeringDept": "cse",
        "offeringLabel": "컴퓨터공학과",
        "prereq": [
          "CSE2112"
        ]
      },
      {
        "code": "CSE4302",
        "name": "인공지능",
        "credit": 3,
        "category": "MAJOR_ELEC",
        "grade": 2,
        "recYear": 2,
        "recSem": [
          2
        ],
        "recEstimated": false,
        "curriculum": true,
        "offeringDept": "cse",
        "offeringLabel": "컴퓨터공학과",
        "prereq": [
          "CSE2112"
        ]
      },
      {
        "code": "CSE4315",
        "name": "기계학습",
        "credit": 3,
        "category": "MAJOR_ELEC",
        "grade": 4,
        "recYear": 4,
        "recSem": [
          1
        ],
        "recEstimated": false,
        "curriculum": true,
        "offeringDept": "cse",
        "offeringLabel": "컴퓨터공학과",
        "prereq": [
          "CSE2112",
          "CSE2105"
        ]
      },
      {
        "code": "CSE4317",
        "name": "딥러닝",
        "credit": 3,
        "category": "MAJOR_ELEC",
        "grade": 4,
        "recYear": 4,
        "recSem": [
          2
        ],
        "recEstimated": false,
        "curriculum": true,
        "offeringDept": "cse",
        "offeringLabel": "컴퓨터공학과",
        "prereq": [
          "CSE2112"
        ]
      },
      {
        "code": "CSE3206",
        "name": "오퍼레이팅시스템",
        "credit": 3,
        "category": "MAJOR_ELEC",
        "grade": 3,
        "recYear": 3,
        "recSem": [
          1
        ],
        "recEstimated": false,
        "curriculum": true,
        "offeringDept": "cse",
        "offeringLabel": "컴퓨터공학과",
        "prereq": [
          "CSE2112"
        ]
      },
      {
        "code": "CSE3209",
        "name": "시스템 프로그래밍",
        "credit": 3,
        "category": "MAJOR_ELEC",
        "grade": 2,
        "recYear": 2,
        "recSem": [
          2
        ],
        "recEstimated": false,
        "curriculum": true,
        "offeringDept": "cse",
        "offeringLabel": "컴퓨터공학과",
        "prereq": [
          "CSE2112"
        ]
      },
      {
        "code": "CSE3213",
        "name": "디지털시스템설계",
        "credit": 3,
        "category": "MAJOR_ELEC",
        "grade": 3,
        "recYear": 3,
        "recSem": [
          2
        ],
        "recEstimated": false,
        "curriculum": true,
        "offeringDept": "cse",
        "offeringLabel": "컴퓨터공학과",
        "prereq": [
          "CSE2112",
          "CSE3203"
        ]
      },
      {
        "code": "CSE3214",
        "name": "병렬 프로그래밍",
        "credit": 3,
        "category": "MAJOR_ELEC",
        "grade": 3,
        "recYear": 3,
        "recSem": [
          2
        ],
        "recEstimated": false,
        "curriculum": true,
        "offeringDept": "cse",
        "offeringLabel": "컴퓨터공학과",
        "prereq": [
          "CSE2112"
        ]
      },
      {
        "code": "CSE3304",
        "name": "임베디드소프트웨어",
        "credit": 3,
        "category": "MAJOR_ELEC",
        "grade": 3,
        "recYear": 3,
        "recSem": [
          2
        ],
        "recEstimated": false,
        "curriculum": true,
        "offeringDept": "cse",
        "offeringLabel": "컴퓨터공학과",
        "prereq": [
          "CSE2112",
          "CSE3206"
        ]
      },
      {
        "code": "CSE4312",
        "name": "컴파일러",
        "credit": 3,
        "category": "MAJOR_ELEC",
        "grade": 4,
        "recYear": 4,
        "recSem": [
          1
        ],
        "recEstimated": false,
        "curriculum": true,
        "offeringDept": "cse",
        "offeringLabel": "컴퓨터공학과",
        "prereq": [
          "CSE2112"
        ]
      },
      {
        "code": "CSE4313",
        "name": "컴퓨터보안",
        "credit": 3,
        "category": "MAJOR_ELEC",
        "grade": 4,
        "recYear": 4,
        "recSem": [
          1
        ],
        "recEstimated": false,
        "curriculum": true,
        "offeringDept": "cse",
        "offeringLabel": "컴퓨터공학과",
        "prereq": [
          "CSE2112"
        ]
      },
      {
        "code": "CSE2104",
        "name": "인터넷 프로그래밍",
        "credit": 3,
        "category": "MAJOR_ELEC",
        "grade": 2,
        "recYear": 2,
        "recSem": [
          1
        ],
        "recEstimated": false,
        "curriculum": true,
        "offeringDept": "cse",
        "offeringLabel": "컴퓨터공학과",
        "prereq": []
      },
      {
        "code": "CSE2107",
        "name": "자바기반응용프로그래밍",
        "credit": 3,
        "category": "MAJOR_ELEC",
        "grade": 2,
        "recYear": 2,
        "recSem": [
          1
        ],
        "recEstimated": false,
        "curriculum": true,
        "offeringDept": "cse",
        "offeringLabel": "컴퓨터공학과",
        "prereq": []
      },
      {
        "code": "CSE3204",
        "name": "컴퓨터그래픽스",
        "credit": 3,
        "category": "MAJOR_ELEC",
        "grade": 3,
        "recYear": 3,
        "recSem": [
          2
        ],
        "recEstimated": false,
        "curriculum": true,
        "offeringDept": "cse",
        "offeringLabel": "컴퓨터공학과",
        "prereq": [
          "CSE2112"
        ]
      },
      {
        "code": "CSE3210",
        "name": "오픈소스응용프로그래밍",
        "credit": 3,
        "category": "MAJOR_ELEC",
        "grade": 2,
        "recYear": 2,
        "recSem": [
          2
        ],
        "recEstimated": false,
        "curriculum": true,
        "offeringDept": "cse",
        "offeringLabel": "컴퓨터공학과",
        "prereq": [
          "CSE2112",
          "CSE2113"
        ]
      },
      {
        "code": "CSE4303",
        "name": "게임프로그래밍",
        "credit": 3,
        "category": "MAJOR_ELEC",
        "grade": 4,
        "recYear": 4,
        "recSem": [
          1
        ],
        "recEstimated": false,
        "curriculum": true,
        "offeringDept": "cse",
        "offeringLabel": "컴퓨터공학과",
        "prereq": [
          "CSE2112",
          "CSE3204"
        ]
      },
      {
        "code": "CSE4307",
        "name": "멀티미디어 컴퓨팅",
        "credit": 3,
        "category": "MAJOR_ELEC",
        "grade": 4,
        "recYear": 4,
        "recSem": [
          1
        ],
        "recEstimated": false,
        "curriculum": true,
        "offeringDept": "cse",
        "offeringLabel": "컴퓨터공학과",
        "prereq": [
          "CSE2112"
        ]
      },
      {
        "code": "CSE4316",
        "name": "IoT와 엣지컴퓨팅 개론",
        "credit": 3,
        "category": "MAJOR_ELEC",
        "grade": 4,
        "recYear": 4,
        "recSem": [
          2
        ],
        "recEstimated": false,
        "curriculum": true,
        "offeringDept": "cse",
        "offeringLabel": "컴퓨터공학과",
        "prereq": [
          "CSE2112"
        ]
      },
      {
        "code": "GEB1112",
        "name": "크로스오버1 : 인간의 탐색",
        "credit": 2,
        "category": "GEN_REQ",
        "area": "focus",
        "zone": null,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양",
        "recYear": 1,
        "recSem": [
          1
        ],
        "recEstimated": false
      },
      {
        "code": "GEB1114",
        "name": "크로스오버3 : 사회의 탐색",
        "credit": 2,
        "category": "GEN_REQ",
        "area": "focus",
        "zone": null,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양",
        "recYear": 1,
        "recSem": [
          1,
          2
        ],
        "recEstimated": false
      },
      {
        "code": "GEB1117",
        "name": "커리어디자인 1",
        "credit": 2,
        "category": "GEN_REQ",
        "area": "basic",
        "zone": null,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양",
        "recYear": 1,
        "recSem": [
          1
        ],
        "recEstimated": false
      },
      {
        "code": "GEB1126",
        "name": "문제해결을 위한 글쓰기",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "basic",
        "zone": null,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양",
        "recYear": 1,
        "recSem": [
          1
        ],
        "recEstimated": false
      },
      {
        "code": "GEB1143",
        "name": "미래사회와 소프트웨어(IT계열)",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "basic",
        "zone": null,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양",
        "recYear": 1,
        "recSem": [
          2
        ],
        "recEstimated": false
      },
      {
        "code": "GEB1151",
        "name": "커리어 디자인 2",
        "credit": 1,
        "category": "GEN_REQ",
        "area": "basic",
        "zone": null,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양",
        "recYear": 3,
        "recSem": [
          1
        ],
        "recEstimated": false
      },
      {
        "code": "GEB1107",
        "name": "의사소통 영어",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "basic",
        "zone": null,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양",
        "recYear": 1,
        "recSem": [
          2
        ],
        "recEstimated": false
      },
      {
        "code": "GEB1108",
        "name": "의사소통 영어 : 중급",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "basic",
        "zone": null,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양",
        "recYear": 1,
        "recSem": [
          2
        ],
        "recEstimated": false
      },
      {
        "code": "GEB1109",
        "name": "의사소통 영어 : 고급",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "basic",
        "zone": null,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양",
        "recYear": 1,
        "recSem": [
          2
        ],
        "recEstimated": false
      },
      {
        "code": "GED1003",
        "name": "나눔 프로젝트",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "core",
        "zone": 1,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED1004",
        "name": "가치창조를 위한 명저 읽기",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "core",
        "zone": 1,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED1005",
        "name": "인간-AI-기계",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "core",
        "zone": 1,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED1006",
        "name": "창의적 사고와 소통",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "core",
        "zone": 1,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED1007",
        "name": "독서세미나 : 인간, 가치, 공존",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "core",
        "zone": 1,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED1008",
        "name": "인하 라이프 아카데미 : 인간, 가치, 공존",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "core",
        "zone": 1,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED1009",
        "name": "마음을 움직이는 리더십",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "core",
        "zone": 1,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED1010",
        "name": "오래된 미래: 동양고전에서의 인간다움",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "core",
        "zone": 1,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED1011",
        "name": "SF와 인간의 미래",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "core",
        "zone": 1,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED1012",
        "name": "4차 산업혁명 시대의 리더십",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "core",
        "zone": 1,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED1013",
        "name": "현대 사회의 가치관",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "core",
        "zone": 1,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED1014",
        "name": "인공지능 시대의 사랑, 행복, 정의",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "core",
        "zone": 1,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED1015",
        "name": "ESG와 사회적 가치 실천",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "core",
        "zone": 1,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED1016",
        "name": "윤리적 리더십",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "core",
        "zone": 1,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED1017",
        "name": "우리가 배우는 이유, 대학과 좋은 삶",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "core",
        "zone": 1,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED2001",
        "name": "역사 속의 라이벌",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "core",
        "zone": 2,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED2002",
        "name": "한국 역사속의 생활과 민속",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "core",
        "zone": 2,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED2003",
        "name": "종교와 문화",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "core",
        "zone": 2,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED2004",
        "name": "서양철학 : 거인들의 어깨",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "core",
        "zone": 2,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED2005",
        "name": "동양철학 : 마르지 않는 샘",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "core",
        "zone": 2,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED2006",
        "name": "인간의 성장과 발달",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "core",
        "zone": 2,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED2007",
        "name": "현대사회와패션",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "core",
        "zone": 2,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED2008",
        "name": "문화유산의 이해",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "core",
        "zone": 2,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED2009",
        "name": "문화심리",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "core",
        "zone": 2,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED2010",
        "name": "축제와 인간사회",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "core",
        "zone": 2,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED2011",
        "name": "지역인문학",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "core",
        "zone": 2,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED2012",
        "name": "문제탐색을 위한 명저읽기",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "core",
        "zone": 2,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED2013",
        "name": "독서세미나 : 역사, 사상, 문화",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "core",
        "zone": 2,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED2014",
        "name": "인하 라이프 아카데미 : 역사, 사상, 문화",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "core",
        "zone": 2,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED2016",
        "name": "그리스신화의 이해",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "core",
        "zone": 2,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED2018",
        "name": "전염병의 지리학",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "core",
        "zone": 2,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED2019",
        "name": "디지털 시민성과 관계적 인간",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "core",
        "zone": 2,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED4001",
        "name": "다문화사회와 공존의 인문학",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "core",
        "zone": 4,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED4002",
        "name": "세계이해를 위한 명저 읽기",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "core",
        "zone": 4,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED4004",
        "name": "부와 빈곤의 글로벌 지도",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "core",
        "zone": 4,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED4005",
        "name": "글로벌 사회의 이해",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "core",
        "zone": 4,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED4006",
        "name": "국제관계학개론",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "core",
        "zone": 4,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED4007",
        "name": "동아시아 정치와 철학의 재발견",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "core",
        "zone": 4,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED4008",
        "name": "결혼과 부모역할",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "core",
        "zone": 4,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED4009",
        "name": "동북아와 한일관계",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "core",
        "zone": 4,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED4010",
        "name": "인권의 이해",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "core",
        "zone": 4,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED4011",
        "name": "지식재산 이론과 실제",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "core",
        "zone": 4,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED4014",
        "name": "독서세미나 : 사회, 제도, 세계",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "core",
        "zone": 4,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED4015",
        "name": "인류문명과 에너지원의 변천사",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "core",
        "zone": 4,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED6009",
        "name": "인공지능과 소프트웨어를 활용한 탄소중립",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "core",
        "zone": 6,
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE7005",
        "name": "이차전지와 인공지능",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "swai",
        "zone": "swai",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE7006",
        "name": "보건의료정보학과 인공지능",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "swai",
        "zone": "swai",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE7007",
        "name": "디지털 경영",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "swai",
        "zone": "swai",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE7008",
        "name": "탄소중립과 4차산업",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "swai",
        "zone": "swai",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE7010",
        "name": "게임 기획 및 시각화",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "swai",
        "zone": "swai",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE7011",
        "name": "스마트 시티와 미래모빌리티",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "swai",
        "zone": "swai",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE7012",
        "name": "신소재와 에너지",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "swai",
        "zone": "swai",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE7013",
        "name": "신재생에너지의 이해",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "swai",
        "zone": "swai",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE7014",
        "name": "컴퓨터비전 중심 인공지능 입문",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "swai",
        "zone": "swai",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE7015",
        "name": "친환경 항공우주 시스템",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "swai",
        "zone": "swai",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE7016",
        "name": "탄소중립과 에너지의 흐름",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "swai",
        "zone": "swai",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE7018",
        "name": "데이터사이언스 이해",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "swai",
        "zone": "swai",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE7019",
        "name": "미래산업과 AI이미지",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "swai",
        "zone": "swai",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE4001",
        "name": "지적재산권의 이해",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "creative",
        "zone": "creative",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE4004",
        "name": "효율적 기술개발과 기업가 정신",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "creative",
        "zone": "creative",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE4005",
        "name": "경영전략과 스타트업",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "creative",
        "zone": "creative",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE4006",
        "name": "기술경영 창업",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "creative",
        "zone": "creative",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE4007",
        "name": "발명과 특허",
        "credit": 2,
        "category": "GEN_REQ",
        "area": "creative",
        "zone": "creative",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE4009",
        "name": "스타트업 이슈 리서치",
        "credit": 1,
        "category": "GEN_REQ",
        "area": "creative",
        "zone": "creative",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE4010",
        "name": "인하특강 : 기업가 정신과 창업",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "creative",
        "zone": "creative",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE4012",
        "name": "벤처기업과 히든챔피언에 대한 이해",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "creative",
        "zone": "creative",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE4013",
        "name": "인하특강 : CEO와 기업가 정신",
        "credit": 2,
        "category": "GEN_REQ",
        "area": "creative",
        "zone": "creative",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE4014",
        "name": "취업 및 창업 특강",
        "credit": 2,
        "category": "GEN_REQ",
        "area": "creative",
        "zone": "creative",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE4016",
        "name": "창업 실습",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "creative",
        "zone": "creative",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE4018",
        "name": "스타트업시작의 이해",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "creative",
        "zone": "creative",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE4019",
        "name": "스타트업 아이디어 발상",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "creative",
        "zone": "creative",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE4020",
        "name": "창업 시뮬레이션",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "creative",
        "zone": "creative",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE4021",
        "name": "실전 스타트업",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "creative",
        "zone": "creative",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE4025",
        "name": "글로벌 스타트업의 이해",
        "credit": 2,
        "category": "GEN_REQ",
        "area": "creative",
        "zone": "creative",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE4026",
        "name": "성공하는 비즈니스 모델 개발",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "creative",
        "zone": "creative",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE4035",
        "name": "사내벤처기업 경영전략",
        "credit": 2,
        "category": "GEN_REQ",
        "area": "creative",
        "zone": "creative",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE4036",
        "name": "기업가정신과 지역문제 해결",
        "credit": 3,
        "category": "GEN_REQ",
        "area": "creative",
        "zone": "creative",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE4037",
        "name": "성공 스타트업 실무",
        "credit": 2,
        "category": "GEN_REQ",
        "area": "creative",
        "zone": "creative",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE4038",
        "name": "캠퍼스 CEO",
        "credit": 2,
        "category": "GEN_REQ",
        "area": "creative",
        "zone": "creative",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED3001",
        "name": "대중문학의 이해",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED3002",
        "name": "영화로보는문학세계",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED3005",
        "name": "사이언스 픽션: 과학, 문학, 상상력",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED3007",
        "name": "인문학으로 바라본 마케팅",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED3009",
        "name": "풍경에 관하여 : 인문학과 시각예술의 만남",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED3014",
        "name": "영화와 테크놀러지",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED3015",
        "name": "희곡의 이해",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED3016",
        "name": "애니메이션속의 상상과 인식",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED3018",
        "name": "그래픽 디자인 이야기",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED3019",
        "name": "스포츠 창의융합 프로젝트",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED3020",
        "name": "독서세미나 : 문학, 예술, 상징",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED3021",
        "name": "예술가곡의 가창실습",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED3022",
        "name": "영화 속 클래식 음악",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED3023",
        "name": "문명비판을 위한 명저 읽기",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED5001",
        "name": "환경과 인간",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED5002",
        "name": "생활 속 바이오이야기",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED5003",
        "name": "생활과과학",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED5004",
        "name": "지속가능성을 위한 화학 이야기",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED5005",
        "name": "현대생명과학의 이해",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED5007",
        "name": "첨단 바이오테크놀로지의 이해",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED5008",
        "name": "과학으로 세상읽기",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED5010",
        "name": "신비로운 인체와 맞춤운동",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED5011",
        "name": "독서세미나 : 자연, 생명, 환경",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED6002",
        "name": "초연결사회와 모바일 소프트웨어",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED6003",
        "name": "컴퓨팅사고와 데이터분석 기초",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED6004",
        "name": "블록코딩과 AI기초",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED6005",
        "name": "지능정보서비스와 소프트웨어",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED6007",
        "name": "디지털 트랜스포메이션과 미래사회의 이해",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED6008",
        "name": "4차 산업혁명 기술의 이해",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED6010",
        "name": "배터리속 소재 이야기",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GED6011",
        "name": "프로그래밍과 문제해결",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE1001",
        "name": "명언으로 배우는 한자와 한문",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE1002",
        "name": "동화와 마법의 상상력",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE1005",
        "name": "영화로 보는 한국문화",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE1006",
        "name": "동화의이해",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE1012",
        "name": "창작을 위한 글쓰기 실습",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE1016",
        "name": "평생교육실습",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE1019",
        "name": "와인으로 보는 세계 문화",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE1022",
        "name": "한중 서사콘텐츠의 이해",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE1023",
        "name": "인하특강 : 인하와 인천",
        "credit": 2,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE1024",
        "name": "클래식 음악 감상 실습",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE1025",
        "name": "생각하는 힘: 논리와 사고의 기술",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE1026",
        "name": "드로잉의 기초",
        "credit": 2,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE1027",
        "name": "영화로 만나는 패션",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE1028",
        "name": "스무살에 읽는 동양고전",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE1029",
        "name": "미술과 여행",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE1030",
        "name": "세계디자인여행",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE1031",
        "name": "영화와 대중문화",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE1033",
        "name": "철학의 기본 질문들",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE2001",
        "name": "긍정심리학",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE2003",
        "name": "Korean Society and Politics",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE2005",
        "name": "경제학의 이해",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE2006",
        "name": "지리와 여행",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE2007",
        "name": "생활 속의 경제 원리",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE2008",
        "name": "영화 속의 법이야기",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE2009",
        "name": "법학의 이해",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE2015",
        "name": "기초수학",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE2016",
        "name": "기초물리학",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE2017",
        "name": "고급물리학",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE2018",
        "name": "광고의 이해",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE2020",
        "name": "세계시민교육: 차이를 넘어 공존으로",
        "credit": 2,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE2021",
        "name": "과학수사 들여다보기",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE2023",
        "name": "뉴스 속의 법이야기",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE2024",
        "name": "미디어와 콘텐츠",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE2025",
        "name": "생각보다 가까운 FTA",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE2027",
        "name": "바다의 불편한 진실",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE2028",
        "name": "브랜드 생성의 원리",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE2030",
        "name": "숲의 이해",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE2032",
        "name": "함께 사는 법",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE2033",
        "name": "반려동물과 사회생활",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE2035",
        "name": "중국 지역 문화",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE2036",
        "name": "에너지와 기후환경",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE2037",
        "name": "권력과 사회문화",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE2039",
        "name": "인공지능과 데이터의 윤리",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE2040",
        "name": "영화로 보는 생명공학",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE2041",
        "name": "차세대 해양리더 양성 아카데미",
        "credit": 2,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE2042",
        "name": "통찰경영",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE3001",
        "name": "졸업인증실용영어",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE3003",
        "name": "외국인전용초급한국어",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE3004",
        "name": "외국인전용중급한국어",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE3012",
        "name": "스타트일본어",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE3013",
        "name": "대학기초영어",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE3014",
        "name": "토크쇼로 배우는 영어대화기술",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE3016",
        "name": "초급일본어",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE3017",
        "name": "초급 프랑스어",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE3019",
        "name": "외국인전용 기초한국어",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE3021",
        "name": "미국문화의 이해",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE3025",
        "name": "장애인과 함께 하는 삶",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE3026",
        "name": "생활한문",
        "credit": 1,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE3027",
        "name": "실용영어 L/S",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE3028",
        "name": "실용영어 R/W",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE3031",
        "name": "외국인전용 한국어 프레젠테이션",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE3032",
        "name": "외국인전용 미디어 한국어",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE3033",
        "name": "외국인전용 한국과 세계의 비교문화",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE3035",
        "name": "서바이벌베트남어",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE3037",
        "name": "국제 비즈니스 영어회화와 작문",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE3039",
        "name": "교환학생 전용 신나는 인하 한국어",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE3040",
        "name": "한중 언어문화 비교",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE3041",
        "name": "스페인·중남미 문화의 이해",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE3043",
        "name": "미국드라마로 배우는 영어표현",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE4003",
        "name": "기업 수요지향기술 종합설계",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE4022",
        "name": "취업을 위한 글쓰기 실습",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE4023",
        "name": "사회적기업의 비즈니스모델 이해",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE5002",
        "name": "증권투자의 이해",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE5006",
        "name": "생활과 재테크",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE5007",
        "name": "공학과 여성",
        "credit": 2,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE5009",
        "name": "여대생 진로와 경력개발",
        "credit": 2,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE5012",
        "name": "인하특강 : 언론을 통한 세상보기",
        "credit": 2,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE5014",
        "name": "인하 스콜라 특강",
        "credit": 1,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE5015",
        "name": "적성탐색과 자기관리",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE5016",
        "name": "진로설계 이해와 전략",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE5017",
        "name": "품질의 차원",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE6001",
        "name": "건강한 체중조절을 위한 맞춤영양",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE6002",
        "name": "댄스스포츠",
        "credit": 1,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE6003",
        "name": "수영",
        "credit": 1,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE6004",
        "name": "테니스",
        "credit": 1,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE6005",
        "name": "요가와 명상",
        "credit": 1,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE6006",
        "name": "호신술",
        "credit": 1,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE6007",
        "name": "골프",
        "credit": 1,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE6008",
        "name": "스키",
        "credit": 1,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE6009",
        "name": "야구소프트볼",
        "credit": 1,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE6014",
        "name": "미술치료로 알아가는 가족이야기",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE6015",
        "name": "피트니스 트레이닝",
        "credit": 1,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE6016",
        "name": "금연과 건강한 삶",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE6017",
        "name": "스포츠 트레이닝 과학",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE6018",
        "name": "운동과 건강",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE6019",
        "name": "스포츠과학과 건강",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE6020",
        "name": "암세포 이야기",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE6021",
        "name": "피아노 연주 실습",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE6023",
        "name": "시창청음실습",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE6024",
        "name": "웰니스를 위한 걷기와 달리기",
        "credit": 1,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE7002",
        "name": "객체지향 기반 응용 프로그래밍",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE7003",
        "name": "인공지능 개론 및 프로그래밍 기초",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE7004",
        "name": "객체지향언어와 SW활용",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEE7017",
        "name": "소프트웨어와 인공지능 이해 및 응용",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEB1113",
        "name": "크로스오버2 : 자연의 탐색",
        "credit": 2,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEB1118",
        "name": "우리가 만드는 세계(WWM1)",
        "credit": 2,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEB1119",
        "name": "우리가 만나는 세계(WWM2)",
        "credit": 2,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEB1141",
        "name": "미래사회와 소프트웨어(인문사회계열)",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      },
      {
        "code": "GEB1142",
        "name": "미래사회와 소프트웨어(이공계열)",
        "credit": 3,
        "category": "GEN_ELEC",
        "curriculum": true,
        "offeringDept": "gen",
        "offeringLabel": "교양"
      }
    ]
  }
};
