# 프런티어창의대학 교양 영역별 페이지(2025/2026) + SW중심대학 마이크로전공 표 -> general_education_courses.csv
# 사용: python build_general_education.py <교양 HTML 폴더> <sw_micro_major.html> <출력 CSV>
import re,html,csv,sys,os
src,swf,out=sys.argv[1],sys.argv[2],sys.argv[3]
AREAS=[('core1','핵심교양',1,'인간, 가치, 공존'),('core2','핵심교양',2,'역사, 사상, 문화'),('core3','핵심교양',3,'문학, 예술, 상징'),
       ('core4','핵심교양',4,'사회, 제도, 세계'),('core5','핵심교양',5,'자연, 생명, 환경'),('core6','핵심교양',6,'수리, 정보, 기술'),
       ('gen1','일반교양',1,'인문, 예술'),('gen2','일반교양',2,'사회, 자연'),('gen3','일반교양',3,'소통, 실천'),('gen4','일반교양',4,'창의, 도전'),
       ('gen5','일반교양',5,'실용, 진로'),('gen6','일반교양',6,'생활, 건강'),('gen7_swai','일반교양',7,'SW·AI'),('creative','창의','','창의')]
# 중점·기초교양: 이수체계 2026-2025 표(https://newdept.inha.ac.kr/generaledu/16885/subview.do)를 옮겨 적음
FIXED=[('중점교양','GEB1112','크로스오버1 : 인간의 탐색',2,'공통(프런티어창의대학 외). 2과목 4학점 이수'),
       ('중점교양','GEB1113','크로스오버2 : 자연의 탐색',2,'인문사회계열'),
       ('중점교양','GEB1114','크로스오버3 : 사회의 탐색',2,'이공계열(컴공·인공지능 교과과정표에 지정)'),
       ('중점교양','GEB1118','우리가 만드는 세계(WWM1)',2,'프런티어창의대학 소속 학생'),
       ('중점교양','GEB1119','우리가 만나는 세계(WWM2)',2,'프런티어창의대학 소속 학생'),
       ('기초교양','GEB1117','커리어디자인 1',2,'모든 신입생'),
       ('기초교양','GEB1126','문제해결을 위한 글쓰기',3,'모든 신입생'),
       ('기초교양','GEB1141','미래사회와 소프트웨어(인문사회계열)',3,'계열별 1과목'),
       ('기초교양','GEB1142','미래사회와 소프트웨어(이공계열)',3,'계열별 1과목'),
       ('기초교양','GEB1143','미래사회와 소프트웨어(IT계열)',3,'계열별 1과목. 인공지능공학과·컴퓨터공학과 = IT계열'),
       ('기초교양','GEB1151','커리어 디자인 2',1,'3학년 이수'),
       ('기초교양','GEB1107','의사소통 영어',3,'영어 기초학력평가로 3과목 중 1과목 지정'),
       ('기초교양','GEB1108','의사소통 영어 : 중급',3,'영어 기초학력평가로 3과목 중 1과목 지정'),
       ('기초교양','GEB1109','의사소통 영어 : 고급',3,'영어 기초학력평가로 3과목 중 1과목 지정')]
norm=lambda s:re.sub(r'\s+','',s)
# 마이크로전공 표: SW 전공학과(컴공·인공지능) 행만
sw=open(swf,encoding='utf-8',errors='replace').read()
t=re.search(r'<table.*?</table>',sw,re.S).group(0)
track={}; cur=None; sw_rows=0
for tr in re.findall(r'<tr.*?</tr>',t,re.S)[1:]:
    cells=[re.sub(r'\s+',' ',html.unescape(re.sub(r'<[^>]+>',' ',c))).strip() for c in re.findall(r'<td[^>]*>(.*?)</td>',tr,re.S)]
    if not cells: continue
    if len(cells)==4:  # 새 수강대상 묶음의 첫 행: [심화교과, 활용교과, 마이크로전공명, 트랙] (수강대상은 th)
        if cells[0].startswith('‘'): break  # 非SW 전공학과 묶음부터는 대상 아님
        cells=cells[1:]
    if len(cells)==3: cur=cells[2]
    track[norm(cells[0])]=cur; sw_rows+=1
rows=[]
for yr in ('2025','2026'):
    for key,big,no,name in AREAS:
        h=open(os.path.join(src,f'ge_{key}_{yr}.html'),encoding='utf-8',errors='replace').read()
        assert f"value='{yr}' selected" in h, (key,yr)
        for m in re.finditer(r'<th><a href="javascript:jf_viewKsynopsis\([^)]*\)">(.*?)</a></th>\s*<td>(.*?)</td>\s*<td>(.*?)</td>\s*<td>(.*?)</td>\s*</tr>\s*<tr>\s*<td[^>]*>(.*?)</td>',h,re.S):
            nm,code,cr,bigo,desc=[re.sub(r'[ \t]+',' ',html.unescape(re.sub(r'<[^>]+>','',x))).strip() for x in m.groups()]
            tk=track.get(norm(nm),'') if key=='gen7_swai' else ''
            if code=='GED6009': tk='SW·AI기반 탄소중립(심화교과, 필수)'
            rows.append({'적용연도':yr,'대분류':big,'영역번호':no,'영역명':name,'학수번호':code,'과목명':nm,'학점':cr.replace('.0',''),
                         '금학기개설':'Y' if '금학기' in bigo else 'N','SW마이크로전공트랙':tk,'이수대상·비고':'','개요':re.sub(r'\s*\n\s*',' / ',desc)})
    for big,code,nm,cr,note in FIXED:
        rows.append({'적용연도':yr,'대분류':big,'영역번호':'','영역명':big,'학수번호':code,'과목명':nm,'학점':cr,'금학기개설':'','SW마이크로전공트랙':'','이수대상·비고':note,'개요':''})
got={norm(r['과목명']) for r in rows if r['SW마이크로전공트랙'] and r['대분류']=='일반교양'}
for k in track:
    if k not in got: print('마이크로전공 과목이 일반교양7영역 목록에 없음:',k,file=sys.stderr)
w=csv.DictWriter(open(out,'w',encoding='utf-8-sig',newline=''),fieldnames=list(rows[0].keys())); w.writeheader(); w.writerows(rows)
from collections import Counter
print(len(rows),'rows',Counter((r['적용연도'],r['대분류']) for r in rows),'SW track rows',sw_rows,file=sys.stderr)
