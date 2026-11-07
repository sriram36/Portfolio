/* time-lapse */
(()=>{
const T0=Math.min(...repos.map(r=>r.st)),T1=Math.max(...repos.map(r=>r.en));
const rng=$('#tl-range'),tdate=$('#tl-date'),bpl=$('#tl-play'),bnow=$('#tl-now');
const asOf=(r,ms)=>ms<r.st?-1:(ms<r.en?3:r.b);
function slotXY(b,k,n){const bw=W/4,per=Math.max(1,Math.floor((bw-14)/(2*R+3))),col=k%per,row=Math.floor(k/per),cnt=Math.min(per,n-row*per);return[b*bw+bw/2+(col-(cnt-1)/2)*(2*R+3),H-32-row*(2*R+3)]}
function tlLabel(){tdate.textContent=TLM.ms>=T1?'Now':new Date(TLM.ms).toLocaleDateString('en-GB',{month:'short',year:'numeric'})}
function tlApply(d){
 const by=[[],[],[],[]];
 balls.forEach(b=>{b.tbOld=b.tb;b.tb=asOf(b.r,TLM.ms);if(b.tb>=0)by[b.tb].push(b)});
 by.forEach((m,bi)=>m.forEach((b,k)=>{const q=slotXY(bi,k,m.length);b.tx=q[0];b.ty=q[1]}));
 let moving=false,live=0,present=0;
 balls.forEach(b=>{
  if(b.tb<0){b.hide=true;return}
  present++;if(b.tb===0)live++;
  if(b.hide){b.hide=false;b.x=W/2+(rnd(b.idx||0)-.5)*sp*.7;b.y=-12;if(SND.on&&d>0)SFX.pop()}
  else if(d>0&&b.tbOld!==b.tb&&b.tbOld>=0&&b.tb!==3&&SND.on)SFX.land(b.tb);
  const k=(rm||d===0)?1:1-Math.exp(-7*d);
  b.x+=(b.tx-b.x)*k;b.y+=(b.ty-b.y)*k;
  if(Math.abs(b.tx-b.x)+Math.abs(b.ty-b.y)>.8)moving=true;
 });
 TLM.moving=moving;$('#num').textContent=live;$('#den').textContent=present;
}
function tlFrame(t){
 const d=Math.min(.05,(t-TLM.last)/1000||.016);TLM.last=t;
 if(TLM.playing){TLM.ms+=d*(T1-T0)/16;if(TLM.ms>=T1){TLM.ms=T1;TLM.playing=false;bpl.textContent='Play the timeline'}rng.value=Math.round((TLM.ms-T0)/(T1-T0)*1000)}
 tlApply(d);tlLabel();draw();
 if(TLM.playing||TLM.moving)TLM.raf=requestAnimationFrame(tlFrame);else TLM.raf=0;
}
function tlGo(){if(!TLM.raf){TLM.last=performance.now();TLM.raf=requestAnimationFrame(tlFrame)}}
function tlEnter(){if(TLM.on)return;TLM.on=true;balls.forEach((b,i)=>{b.idx=i;b.done=true;b.hide=false;b.tb=b.r.b;b.x=b.r.fx;b.y=b.r.fy});bnow.hidden=false}
function tlExit(){if(!TLM.on)return;TLM.playing=false;if(TLM.raf){cancelAnimationFrame(TLM.raf);TLM.raf=0}TLM.on=false;balls.forEach(b=>{b.x=b.r.fx;b.y=b.r.fy;b.hide=false;b.done=true});rng.value=1000;$('#num').textContent=LIVE;$('#den').textContent=N;landed=-1;count();bnow.hidden=true;bpl.textContent='Play the timeline';tdate.textContent='Now';draw()}
window.tlRestore=()=>{balls.forEach((b,i)=>{b.idx=i;b.done=true;b.hide=false;b.tb=b.r.b});tlApply(0);draw()};
rng.oninput=()=>{tlEnter();TLM.playing=false;bpl.textContent='Play the timeline';TLM.ms=T0+(rng.value/1000)*(T1-T0);tlGo()};
bpl.onclick=()=>{if(TLM.playing){TLM.playing=false;bpl.textContent='Resume';return}tlEnter();if(!TLM.ms||TLM.ms>=T1){TLM.ms=T0}TLM.playing=true;bpl.textContent='Pause';tlGo()};
bnow.onclick=tlExit;
$('#again').addEventListener('click',tlExit,true);
window.tlExit=tlExit;
})();
