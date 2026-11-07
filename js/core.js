/* The project list the whole page uses, built from data.js. */
let repos=P.filter(p=>!HIDE.includes(p[0])).map(p=>({n:p[0],d:p[1],l:p[2],s:p[3],o:p[4],u:p[5],note:p[6],priv:!!p[7],f:FEAT.has(p[0]),b:B.indexOf(p[3]),st:Date.parse(START[p[0]]||p[1]),en:Math.max(Date.parse(p[1]),Date.parse(START[p[0]]||p[1])+2592e5)}));
repos.sort((a,b)=>b.d.localeCompare(a.d));
const N=repos.length,LIVE=repos.filter(r=>r.s==='live').length;
