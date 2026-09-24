# 교과과정표(HTML) -> CSV. 선수과목은 기준 CSV(2026, 사용자 검토본)에서 학수번호/과목명으로 가져온다.
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
tag,src,ref,out_fn,has_track=sys.argv[1],sys.argv[2],sys.argv[3],sys.argv[4],sys.argv[5]=='1'
old={}
for r in csv.DictReader(open(ref,encoding='utf-8-sig')):
    old[r['학수번호'] or r['과목명']]=r['선수과목']; old[r['과목명']]=r['선수과목']
out=[]
for c in parse(src):
    grp,ish,area,trk,code,name,cr,when,bigo=c[1],c[2],c[3],c[4],c[5],c[6],c[7],c[10],c[11]
    y,s=sem(when)
    subtype = area if grp=='교양' else ish
    if grp=='교양' and ish=='교양선택': subtype='교양선택'
    key=code or name
    note='' if bigo in('','교양교과과정참조') else bigo
    if key in old: pre=old[key]
    elif name in old: pre=old[name]
    else:
        pre=''
        if grp=='전공': note=(note+'; ' if note else '')+'선수과목 미검토(2026 교과과정에 없는 과목)'
        print(tag,'NEW vs ref:',key,name,file=sys.stderr)
    row={'구분':grp,'이수구분':subtype,'학수번호':code,'과목명':name,'학점':num(cr),'권장학년':y,'권장학기':s,'이수시기(원문)':when,'선수과목':pre,'비고':note}
    if has_track: row['트랙']= trk if grp=='전공' else ''
    out.append(row)
refkeys={r['학수번호'] or r['과목명'] for r in csv.DictReader(open(ref,encoding='utf-8-sig'))}
for m in sorted(refkeys-{r['학수번호'] or r['과목명'] for r in out}): print(tag,'ONLY in ref:',m,file=sys.stderr)
cols=['구분','이수구분']+(['트랙'] if has_track else [])+['학수번호','과목명','학점','권장학년','권장학기','이수시기(원문)','선수과목','비고']
w=csv.DictWriter(open(out_fn,'w',encoding='utf-8-sig',newline=''),fieldnames=cols); w.writeheader(); w.writerows(out)
print(tag,len(out),'rows',file=sys.stderr)
