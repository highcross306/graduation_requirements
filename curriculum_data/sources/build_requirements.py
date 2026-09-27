# 교과과정 CSV + 교양 CSV -> graduation_requirements.json (학과·입학연도별 졸업요건 규칙)
# 사용: python build_requirements.py <curriculum_data 폴더>
import csv,json,sys,os
D=sys.argv[1]
ge=list(csv.DictReader(open(os.path.join(D,'general_education_courses.csv'),encoding='utf-8-sig')))
DEPTS={'AIE':('인공지능공학과','aie'),'CSE':('컴퓨터공학과','cse')}
def codes(rows,**kw): return [r['학수번호'] for r in rows if all(r[k]==v for k,v in kw.items())]
def credits(rows,cs): return sum(int(r['학점']) for r in rows if r['학수번호'] in cs)
programs=[]
for dc,(dn,tag) in DEPTS.items():
    for yr in (2025,2026):
        fn=f'{tag}_{yr}_courses.csv'
        rows=list(csv.DictReader(open(os.path.join(D,fn),encoding='utf-8-sig')))
        req=codes(rows,구분='전공',이수구분='전공필수'); fnd=codes(rows,구분='전공',이수구분='전공기초')
        sw=[r['학수번호'] for r in ge if r['적용연도']==str(yr) and r['대분류']=='일반교양' and r['영역번호']=='7' and r['SW마이크로전공트랙']]
        creative=[r['학수번호'] for r in ge if r['적용연도']==str(yr) and r['대분류']=='창의']
        core_areas=[{'area':n,'name':nm,'credits':3,'rule':'영역 내 1과목 이상 (3학점)'} for n,nm in [(1,'인간, 가치, 공존'),(2,'역사, 사상, 문화'),(4,'사회, 제도, 세계')]]
        core_areas.append({'area':6,'name':'수리, 정보, 기술','credits':3,'rule':'GED6009 지정','courses':['GED6009']})
        gen=[
          {'id':'focus','name':'중점교양','credits':4,'allOf':['GEB1112','GEB1114']},
          {'id':'basic','name':'기초교양','credits':12,'allOf':['GEB1117','GEB1126','GEB1143','GEB1151'],
           'oneOf':[{'name':'의사소통 영어(영어 기초학력평가로 1과목 지정)','courses':['GEB1107','GEB1108','GEB1109'],'credits':3}]},
          {'id':'core','name':'핵심교양','credits':12,'areas':core_areas,'note':'같은 영역 2과목은 1과목만 영역 충족으로 인정(와이어프레임 문구, 학사 규정 미확인)'},
          {'id':'swai','name':'SW·AI (일반교양 7영역)','credits':3,'oneOf':[{'name':'SW·AI기반 탄소중립 / 신기술(융합) 트랙 과목','courses':sw,'credits':3}]},
          {'id':'creative','name':'창의','credits':3,'oneOf':[{'name':'창의 영역 택1','courses':creative,'credits':3}]},
        ]
        # 마이크로전공 판정용: components 마다 courses 중 한 과목 이상 이수하면 충족 (autoCheck 항목)
        sw_carbon=[r['학수번호'] for r in ge if r['적용연도']==str(yr) and r['대분류']=='일반교양' and r['영역번호']=='7'
                   and r['SW마이크로전공트랙']=='SW·AI기반 탄소중립']
        extra=[]
        if dc=='AIE':
            extra.append({'id':'microMajor','name':"'탄소중립' 마이크로전공 이수 (2023학년도 신입생부터)",
                          'rule':'핵심교양 6영역 GED6009 + 창의영역 택1 + 일반교양 7영역(탄소중립 마이크로전공 교과) 택1 = 9학점',
                          'coveredBy':['core.area6','creative','swai'],'autoCheck':True,
                          'components':[{'name':'핵심교양 6영역 GED6009','courses':['GED6009']},
                                        {'name':'창의영역 택1','courses':creative},
                                        {'name':'일반교양 7영역 탄소중립 트랙 택1','courses':sw_carbon}]})
        else:
            extra+=[{'id':'microMajor','name':'SW중심대학 마이크로전공 이수',
                     'rule':'미래사회와 소프트웨어-IT계열(GEB1143) + 핵심교양 6영역 GED6009 + 일반교양 7영역(탄소중립/신기술(융합) 트랙) 택1',
                     'coveredBy':['basic','core.area6','swai'],'autoCheck':True,
                     'components':[{'name':'미래사회와 소프트웨어-IT계열 GEB1143','courses':['GEB1143']},
                                   {'name':'핵심교양 6영역 GED6009','courses':['GED6009']},
                                   {'name':'일반교양 7영역 탄소중립/신기술(융합) 트랙 택1','courses':sw}]},
                    {'id':'gradExam','name':'졸업고사 응시(졸업학기)','autoCheck':False,
                     'alternatives':['전공성적 3.3 이상 성적표','정보처리기사','제1저자 논문 게재확인서 또는 논문 첫장·개요','TOPCIT 270점 이상','i-PAC 인증서 B등급 이상']},
                    {'id':'topcit','name':'TOPCIT 응시 필수','rule':'3학년 이상 재학 중 총 2회 응시','autoCheck':False}]
        gen_total=sum(g['credits'] for g in gen)
        programs.append({
          'departmentCode':dc,'departmentName':dn,'admissionYear':yr,'curriculumFile':fn,
          'totalCredits':130,
          'majorCredits':{'single':65,'double':39,'minor':48,'note':'단일(심화)전공 65 / 다중전공 39 / 부전공 48 (교과과정표 상단)'},
          'majorRequired':{'courses':req,'courseCount':len(req),'credits':credits(rows,req),'rule':'모든 과목 이수'},
          'majorFoundation':{'courses':fnd,'credits':credits(rows,fnd),'rule':'모든 과목 이수',
                             'countsTowardMajor':True,'note':'교과과정표 이수구분 "전공기초". 전공 65학점에 포함 (PM 확인 2026-09-24)'},
          'generalEducationRequired':{'credits':gen_total,'groups':gen},
          'freeElective':{'credits':130-65-gen_total,
                          'note':'130 - 전공 65(전공기초 포함) - 교양필수. 교과과정표에 일반선택 학점 명시는 없음'},
          'extraRequirements':extra,
          'certifications':['englishGraduation'],
          'notices':['재수강 과목과 F 학점은 반영하지 않음','최종 졸업 판정은 학과 졸업사정 기준']
        })
out={'_meta':{'description':'인하대 학과·입학연도별 졸업요건 규칙 (졸업요건 앱용 원천 데이터)',
              'collectedAt':'2026-09-24',
              'sources':{'curriculum':'https://sugang.inha.ac.kr/sugang/SU_51001/curriculum_all.aspx',
                         'generalEducation':'https://newdept.inha.ac.kr/generaledu/16885/subview.do',
                         'microMajor':'https://swuniv.inha.ac.kr/swuniv/12694/subview.do'},
              'courseCodesResolveIn':['<dept>_<year>_courses.csv','general_education_courses.csv']},
     'programs':programs}
json.dump(out,open(os.path.join(D,'graduation_requirements.json'),'w',encoding='utf-8'),ensure_ascii=False,indent=2)
for p in programs: print(p['departmentCode'],p['admissionYear'],'전필',p['majorRequired']['courseCount'],p['majorRequired']['credits'],'전기',p['majorFoundation']['credits'],'교필',p['generalEducationRequired']['credits'],'SW',len(p['generalEducationRequired']['groups'][3]['oneOf'][0]['courses']),'창의',len(p['generalEducationRequired']['groups'][4]['oneOf'][0]['courses']),'일선',p['freeElective'])
