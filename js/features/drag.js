/* drag balls */
(()=>{
 let dg=null,lx=0,ly=0,lt=0,moved=0,just=false,msgT=0;
 cv.addEventListener('click',e=>{if(just){just=false;e.stopImmediatePropagation()}},true);
 cv.addEventListener('pointerdown',e=>{
  if(e.pointerType!=='mouse'||TLM.on||e.button!==0)return;
  const R0=cv.getBoundingClientRect(),x=e.clientX-R0.left,y=e.clientY-R0.top;
  let best=null,bd=R+8;for(const b of balls){if(b.hide||(T<b.delay&&!b.done))continue;const d=Math.hypot(b.x-x,b.y-y);if(d<bd){bd=d;best=b}}
  if(!best)return;dg=best;best.drag=true;best.done=false;best.vx=best.vy=0;lx=x;ly=y;lt=performance.now();moved=0;
  cv.setPointerCapture(e.pointerId);cv.style.cursor='grabbing';window.go();e.preventDefault();
 });
 cv.addEventListener('pointermove',e=>{
  if(!dg)return;const R0=cv.getBoundingClientRect(),x=Math.max(R,Math.min(W-R,e.clientX-R0.left)),y=Math.max(R,Math.min(H-R,e.clientY-R0.top)),now=performance.now(),dt=Math.max(8,now-lt)/1000;
  moved+=Math.hypot(x-lx,y-ly);dg.vx=(x-lx)/dt*.5;dg.vy=(y-ly)/dt*.5;dg.x=x;dg.y=y;lx=x;ly=y;lt=now;
 });
 const end=()=>{
  if(!dg)return;const b=dg;dg=null;b.drag=false;cv.style.cursor='default';
  b.vx=Math.max(-500,Math.min(500,b.vx));b.vy=Math.max(-300,Math.min(300,b.vy));
  if(moved>6){
   just=true;const own=b.r.b*W/4;if(b.y>binTop-4&&(b.x<own||b.x>own+W/4))b.y=pegBot;
   const nm=b.r.f?b.r.n:'That one';$('#panel').innerHTML='<p>'+nm+' belongs in <b>'+NAMES[b.r.s]+'</b>. It found its way back.</p>';
   clearTimeout(msgT);msgT=setTimeout(()=>{if(sel)show(sel)},2600);
  }
  window.go();
 };
 cv.addEventListener('pointerup',end);cv.addEventListener('pointercancel',end);
})();
