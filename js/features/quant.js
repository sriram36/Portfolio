/* be the quant */
(()=>{
const qc=$('#qc');let qrun=0,qs=null;
function qgen(){const r=mulberry(777+qrun*31),K=40,L=160,S=100,cur=[];for(let i=0;i<K;i++){let v=0;const a=[0];for(let t=1;t<L;t++){const u=Math.max(r(),1e-9),w=r();v+=Math.sqrt(-2*Math.log(u))*Math.cos(2*Math.PI*w);a.push(v)}cur.push(a)}qs={cur,K,L,S,pick:-1,hover:-1}}
function qgeo(){const w=qc.clientWidth,h=260,{cur,L}=qs;let lo=0,hi=0;cur.forEach(a=>a.forEach(v=>{lo=Math.min(lo,v);hi=Math.max(hi,v)}));const pad=20;return{w,h,pad,X:t=>pad+t/(L-1)*(w-2*pad),Y:v=>h-26-(v-lo)/(hi-lo)*(h-60)}}
function qdraw(){
 if(!qs||!qc.clientWidth)return;const dpr=devicePixelRatio||1,{w,h,pad,X,Y}=qgeo(),g=qc.getContext('2d'),{cur,L,S,pick,hover}=qs,reveal=pick>=0;
 qc.width=w*dpr;qc.height=h*dpr;g.setTransform(dpr,0,0,dpr,0,0);g.clearRect(0,0,w,h);
 g.strokeStyle='rgba(243,245,255,.5)';g.lineWidth=1;g.setLineDash([4,4]);g.beginPath();g.moveTo(X(S),12);g.lineTo(X(S),h-22);g.stroke();g.setLineDash([]);
 g.font='700 12px "Bricolage Grotesque",system-ui,sans-serif';g.fillStyle='#fff';g.textAlign='right';g.fillText('what you can see',X(S)-6,h-6);g.textAlign='left';g.fillText(reveal?'what happened next':'hidden until you pick',X(S)+6,h-6);
 g.strokeStyle='rgba(243,245,255,.25)';g.beginPath();g.moveTo(pad,Y(0));g.lineTo(w-pad,Y(0));g.stroke();
 const end=reveal?L-1:S;
 cur.forEach((a,i)=>{if(i===pick)return;g.beginPath();for(let t=0;t<=end;t++){const x=X(t),y=Y(a[t]);t?g.lineTo(x,y):g.moveTo(x,y)}const hv=i===hover&&!reveal;g.strokeStyle=hv?'#ffd23f':'rgba(243,245,255,'+(reveal?.22:.42)+')';g.lineWidth=hv?3:1.2;g.stroke()});
 if(reveal){const a=cur[pick];g.beginPath();for(let t=0;t<=L-1;t++){const x=X(t),y=Y(a[t]);t?g.lineTo(x,y):g.moveTo(x,y)}g.strokeStyle='#ff5c7d';g.lineWidth=3.2;g.stroke()}
}
function qnear(e){const R0=qc.getBoundingClientRect(),x=e.clientX-R0.left,y=e.clientY-R0.top,{pad,X,Y,w}=qgeo(),{cur,L,S}=qs;const t=Math.max(0,Math.min(S,Math.round((x-pad)/(w-2*pad)*(L-1))));let bi=-1,bd=22;cur.forEach((a,i)=>{const d=Math.abs(Y(a[t])-y);if(d<bd){bd=d;bi=i}});return bi}
const pc=v=>(v>=0?'+':'')+v.toFixed(1)+'%';
function qreveal(i,auto){
 qs.pick=i;const{cur,L,S}=qs,ins=cur[i][S],oos=cur[i][L-1]-cur[i][S];let bi=0;cur.forEach((a,k)=>{if(a[S]>cur[bi][S])bi=k});const avg=cur.reduce((s,a)=>s+a[L-1]-a[S],0)/cur.length;
 $('#qres').textContent=(auto?'The best-looking curve at the cut':'The curve you picked')+' was '+pc(ins)+'. After the cut it moved '+pc(oos)+'. Across all 40, the average move after the cut was '+pc(avg)+'. None of them had any skill, so picking the winner only picked luck.';
 qdraw();if(SND.on){oos<0?SFX.fail():SFX.chime(3)}
}
function qreset(){qgen();$('#qres').textContent='';qdraw()}
qc.addEventListener('pointermove',e=>{if(!qs||qs.pick>=0)return;const h=qnear(e);if(h!==qs.hover){qs.hover=h;qc.style.cursor=h>=0?'pointer':'crosshair';qdraw()}});
qc.addEventListener('click',e=>{if(!qs||qs.pick>=0)return;const h=qnear(e);if(h>=0)qreveal(h,false)});
$('#q-best').onclick=()=>{if(qs.pick>=0)qreset();let bi=0;qs.cur.forEach((a,k)=>{if(a[qs.S]>qs.cur[bi][qs.S])bi=k});qreveal(bi,true)};
$('#q-new').onclick=()=>{qrun++;qreset()};

qreset();
let rq;addEventListener('resize',()=>{clearTimeout(rq);rq=setTimeout(qdraw,160)});
onView($('#quant'),()=>qdraw(),.1);
})();
