import re,html,csv,sys
def parse(fn):
    h=open(fn,encoding='utf-8').read()
    rows=[]
    for r in re.findall(r'<tr.*?</tr>',h,re.S):
        c=[re.sub(r'\s+',' ',html.unescape(re.sub(r'<[^>]+>','',x))).strip() for x in re.findall(r'<td[^>]*>(.*?)</td>',r,re.S)]
        if len(c)>12 and c[1] in('교양','전공'): rows.append(c)
    return rows
def sem(s):
    m=re.match(r'(\d)학년\(([\d,]+)학기\)',s)
    if m: return m.group(1), m.group(2).replace(',','·')
    m=re.match(r'전체\(([\d,]+)학기\)',s)
    if m: return '', m.group(1).replace(',','·')
    return '',''
def num(x):
    x=x.strip(); return str(int(float(x))) if x else ''
for tag,src,has_track in [('cse','cse.html',True),('aie','ai.html',False)]:
    old={}; oldname={}
    for r in csv.DictReader(open(f'{tag}_2026_courses.bak.csv',encoding='utf-8')):
        key=r['학수번호'] or r['과목명']
        old[key]=r['선수과목']
    out=[]
    for c in parse(src):
        # cols: dept,종별(교양/전공),이수구분,과목영역,트랙,학수번호,교과목명,학점,LEC,LAB,이수시기,비고,...
        grp,ish,area,trk,code,name,cr,_,_,when,bigo=c[1],c[2],c[3],c[4],c[5],c[6],c[7],c[8],c[9],c[10],c[11]
        y,s=sem(when)
        subtype = area if grp=='교양' else ish
        if grp=='교양' and ish=='교양선택': subtype='교양선택'
        key=code or name
        row={'구분':grp,'이수구분':subtype,'학수번호':code,'과목명':name,'학점':num(cr),'권장학년':y,'권장학기':s,
             '이수시기(원문)':when,'선수과목':old.get(key,''),'비고':'' if bigo in('','교양교과과정참조') else bigo}
        if has_track: row['트랙']= trk if grp=='전공' else ''
        out.append(row)
        if key not in old: print(tag,'NEW (no prior prereq):',key,name,file=sys.stderr)
    missing=set(old)-{r['학수번호'] or r['과목명'] for r in out}
    for m in missing: print(tag,'DROPPED from table:',m,file=sys.stderr)
    cols=['구분','이수구분']+(['트랙'] if has_track else [])+['학수번호','과목명','학점','권장학년','권장학기','이수시기(원문)','선수과목','비고']
    w=csv.DictWriter(open(f'{tag}_2026_courses.csv','w',encoding='utf-8-sig',newline=''),fieldnames=cols); w.writeheader(); w.writerows(out)
    print(tag,len(out),'rows',file=sys.stderr)
