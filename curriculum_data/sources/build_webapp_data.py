# curriculum_data의 CSV/JSON -> 앱이 읽는 WEB-INF/data JSON (Gson 모델용 영문 키)
# 사용: python build_webapp_data.py  (sources/에서 실행)
import csv,json,os,re,sys
D='..'
OUT=os.path.join('..','..','Graduation_requitrements','src','main','webapp','WEB-INF','data')
# 커리큘럼 id는 mock API(EvaluateServlet)의 "ai_2025"와 맞춘다
PROGRAMS=[('ai','AIE','aie'),('cse','CSE','cse')]
YEARS=(2025,2026)

def read(fn): return list(csv.DictReader(open(os.path.join(D,fn),encoding='utf-8-sig')))
def write(rel,obj):
    p=os.path.join(OUT,rel); os.makedirs(os.path.dirname(p),exist_ok=True)
    json.dump(obj,open(p,'w',encoding='utf-8',newline='\n'),ensure_ascii=False,indent=2)
def num(x): return int(x) if x else None

req={(p['departmentCode'],p['admissionYear']):p for p in json.load(open(os.path.join(D,'graduation_requirements.json'),encoding='utf-8'))['programs']}
index=[]; unresolved=[]
for pid,dc,tag in PROGRAMS:
    for yr in YEARS:
        rows=read(f'{tag}_{yr}_courses.csv')
        byname={r['과목명']:r['학수번호'] for r in rows if r['학수번호']}
        courses=[]
        for r in rows:
            if not r['학수번호']: continue  # "핵심교양-1" 같은 영역 자리표시 행은 requirements의 교양 그룹으로 표현
            terms=[int(t) for t in r['권장학기'].split('·')] if r['권장학기'] else []
            y=num(r['권장학년'])
            pre=[]
            for n in [x.strip() for x in r['선수과목'].split(';') if x.strip()]:
                if n in byname: pre.append(byname[n])
                else: pre.append(n); unresolved.append((pid,yr,r['학수번호'],n))
            courses.append({'code':r['학수번호'],'name':r['과목명'],'credits':int(r['학점']),
                'category':'major' if r['구분']=='전공' else 'general','type':r['이수구분'],
                'track':(r.get('트랙') or None) if r['구분']=='전공' else None,
                'recommendedYear':y,'recommendedTerms':terms,
                'recommendedSemester':f'{y}-{terms[0]}' if y and terms else None,
                'prerequisites':pre,'note':r['비고'] or None})
        p=dict(req[(dc,yr)]); p.pop('curriculumFile',None)
        cid=f'{pid}_{yr}'
        write(f'curricula/{cid}.json',{'id':cid,'departmentCode':dc,'department':p['departmentName'],'year':yr,
                                      'courses':courses,'requirements':p})
        index.append({'id':cid,'departmentCode':dc,'department':p['departmentName'],'year':yr,'file':f'curricula/{cid}.json'})

ge=[]
for r in read('general_education_courses.csv'):
    ge.append({'year':int(r['적용연도']),'category':r['대분류'],'area':num(r['영역번호']),'areaName':r['영역명'],
               'code':r['학수번호'],'name':r['과목명'],'credits':int(r['학점']),
               'offeredThisTerm':{'Y':True,'N':False}.get(r['금학기개설']),
               'swMicroMajorTrack':r['SW마이크로전공트랙'] or None,'note':r['이수대상·비고'] or None,
               'description':r['개요'] or None})
write('general_education.json',{'courses':ge})

cert=json.load(open(os.path.join(D,'graduation_certification.json'),encoding='utf-8'))
write('certification.json',cert)

tt=read('timetable_2026_2.csv')
def slots(s):
    out=[]
    for part in [x.strip() for x in s.split(';') if x.strip()]:
        d,t=part.split(' '); a,b=t.split('-'); out.append({'day':d,'start':a,'end':b})
    return out
sections=[]
for r in tt:
    g=None
    if r['교양대분류']:
        g={'category':r['교양대분류'],'area':num(r['교양영역번호']),'areaName':r['교양영역명'],
           'creativeYears':[int(x) for x in r['창의영역인정'].split('·')] if r['창의영역인정'] else []}
    sections.append({'code':r['학수번호'],'section':r['분반'],'sectionGroup':r['분반그룹'] or None,'name':r['과목명'],
        'grade':r['학년'],'credits':float(r['학점']) if '.' in r['학점'] else int(r['학점']),'type':r['과목구분'],
        'slots':slots(r['요일시간']),'timeCode':r['시간코드'],'timeAndRoom':r['시간및강의실(원문)'],
        'professor':r['담당교수'] or None,'grading':r['평가방식'] or None,'note':r['비고'] or None,
        'hasSyllabus':r['강의계획서']=='Y','generalEducation':g,'listedIn':r['조회구분'].split(' | ')})
m=re.match(r'(\d{4}) 학년도 (\d)학기',tt[0]['학기'])
term=f'{m.group(1)}-{m.group(2)}'
write(f'timetable/{term}.json',{'term':term,'note':'교시 n = 09:00 + 30분×(n-1). slots가 빈 분반은 온라인·시간 미지정',
                                 'sections':sections})

write('index.json',{'collectedAt':'2026-09-24','curricula':index,
                    'generalEducation':'general_education.json','certification':'certification.json',
                    'timetables':[{'term':term,'file':f'timetable/{term}.json'}]})
print('curricula',len(index),'ge',len(ge),'sections',len(sections),'term',term,file=sys.stderr)
for u in sorted(set(unresolved)): print('선수과목 학수번호 못 찾음(이름 유지):',u,file=sys.stderr)
