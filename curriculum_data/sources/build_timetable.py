# 강의시간표(수강신청 사이트 Lec_Time_Search.aspx) HTML -> CSV
# 사용: python build_timetable.py <출력 CSV> <general_education_courses.csv> <시간표 HTML...>  (교시 n = 09:00 + 30분×(n-1), D0T0 = 온라인/시간 없음)
import re,html,csv,sys,glob
DAYS='일월화수목금토'
def slots(td):
    out=[]
    for d,ts in re.findall(r'D(\d)((?:T\d+)+)',td):
        if d=='0': continue
        p=[int(x) for x in re.findall(r'T(\d+)',ts)]
        # 연속 교시끼리 묶음
        runs=[]; 
        for x in sorted(p):
            if runs and x==runs[-1][1]+1: runs[-1][1]=x
            else: runs.append([x,x])
        for a,b in runs:
            s=9*60+(a-1)*30; e=9*60+b*30
            out.append(f'{DAYS[int(d)]} {s//60:02d}:{s%60:02d}-{e//60:02d}:{e%60:02d}')
    return '; '.join(out)
rows=[];seen={}
term=None
OUT=sys.argv[1]
# 교양 영역은 학수번호로 정한다: GED<n>=핵심교양 n영역, GEE<n>=일반교양 n영역, GEB=중점/기초교양
CORE={1:'인간, 가치, 공존',2:'역사, 사상, 문화',3:'문학, 예술, 상징',4:'사회, 제도, 세계',5:'자연, 생명, 환경',6:'수리, 정보, 기술'}
GEN={1:'인문, 예술',2:'사회, 자연',3:'소통, 실천',4:'창의, 도전',5:'실용, 진로',6:'생활, 건강',7:'SW·AI'}
FOCUS={'GEB1112','GEB1113','GEB1114','GEB1118','GEB1119'}
creative={}
for r in csv.DictReader(open(sys.argv[2],encoding='utf-8-sig')):
    if r['대분류']=='창의': creative.setdefault(r['학수번호'],[]).append(r['적용연도'])
def area(code):
    if code.startswith('GED') and int(code[3]) in CORE: return '핵심교양',code[3],CORE[int(code[3])]
    if code.startswith('GEE') and int(code[3]) in GEN: return '일반교양',code[3],GEN[int(code[3])]
    if code.startswith('GEB'): return ('중점교양','','중점교양') if code in FOCUS else ('기초교양','','기초교양')
    return '','',''
for fn in sys.argv[3:]:
    h=open(fn,encoding='utf-8',errors='replace').read()
    t=re.search(r'id="lblYearTerm">([^<]*)',h).group(1).strip(); term=term or t
    title=re.search(r'id="lblTitle">([^<]*)',h).group(1).replace(' 강의시간표 및 강의계획서','').strip()
    for tr in re.findall(r'<tr[^>]*>(.*?)</tr>',h,re.S):
        c=[re.sub(r'\s+',' ',html.unescape(re.sub(r'<[^>]+>',' ',x))).strip() for x in re.findall(r'<td[^>]*>(.*?)</td>',tr,re.S)]
        if len(c)<13 or not re.match(r'^[A-Z]{2,4}\d{3,4}-\d+',c[0]): continue
        code,sec=c[0].split('-',1)
        key=c[0]
        if key in seen:
            if title not in seen[key]['조회구분'].split(' | '): seen[key]['조회구분']+=' | '+title
            continue
        r={'학기':t,'조회구분':title,'학수번호':code,'분반':sec,'분반그룹':c[1],'과목명':c[2],'학년':c[3],'학점':c[4].replace('.0',''),
            '과목구분':c[5],'시간및강의실(원문)':c[6],'요일시간':slots(c[12]),'시간코드':c[12],'담당교수':c[7],'평가방식':c[8],'비고':c[9],
            '강의계획서':c[10],'영문강의계획서':c[11],'ABEEK':c[13] if len(c)>13 else ''}
        a=area(code)
        r['교양대분류'],r['교양영역번호'],r['교양영역명']=a
        r['창의영역인정']='·'.join(sorted(set(creative.get(code,[]))))
        rows.append(r); seen[key]=r
cols=list(rows[0].keys())
w=csv.DictWriter(open(OUT,'w',encoding='utf-8-sig',newline=''),fieldnames=cols); w.writeheader(); w.writerows(rows)
print(term,len(rows),'sections',file=sys.stderr)
