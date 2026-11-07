/* The ball board: physics, drawing, hover and the receipt panel. */
const TLM={on:false,playing:false,ms:0,raf:0,last:0,moving:false};const cv=$('#b'),cx=cv.getContext('2d');
let W,H,sp,pegs=[],balls=[],T=0,last=0,sel=null,run=false,top0,pegBot,binTop,landed=-1;
const rnd=i=>{const x=Math.sin(i*127.1+311.7)*43758.5453;return x-Math.floor(x)},PR=3;let R=9;
function setup(){
 const dpr=devicePixelRatio||1;W=cv.clientWidth;const wide=matchMedia('(min-width:900px)').matches;H=wide?cv.parentElement.clientHeight:Math.round(Math.min(520,Math.max(440,W*.62)));
 cv.style.height=wide?'':H+'px';cv.width=W*dpr;cv.height=H*dpr;cx.setTransform(dpr,0,0,dpr,0,0);
 R=wide?11:9;top0=wide?120:60;pegBot=H-190;binTop=H-150;const cols=W<520?7:Math.min(21,Math.round(W/84)),rows=W<520?8:Math.max(6,Math.min(11,Math.round((pegBot-top0)/46)));sp=W/cols;const ry=(pegBot-top0)/(rows-1);
 pegs=[];for(let r=0;r<rows;r++)for(let c=0;c<=cols;c++){const x=(c+(r%2?.5:0))*sp;if(x<=W+1&&!(r%2&&c===cols))pegs.push([x,top0+r*ry,-9])}
 const bw=W/4;
 B.forEach((_,b)=>{
  const m=repos.filter(r=>r.b===b),per=Math.max(1,Math.floor((bw-14)/(2*R+3)));
  m.forEach((r,k)=>{const col=k%per,row=Math.floor(k/per),cnt=Math.min(per,m.length-row*per);
   r.fx=b*bw+bw/2+(col-(cnt-1)/2)*(2*R+3);r.fy=H-32-row*(2*R+3)});
 });
 balls=repos.map((r,i)=>({r,x:W/2+(rnd(i)-.5)*sp*.7,y:-20,vx:(rnd(i+50)-.5)*50,vy:0,delay:.35+i*.13,done:false}));
 T=0;landed=-1;if(rm)balls.forEach(b=>{b.x=b.r.fx;b.y=b.r.fy;b.done=true});
 count();
 if(TLM.on&&typeof tlRestore==='function')tlRestore();
}
function step(dt){
 T+=dt;
 for(const b of balls){
  if(b.done||b.drag||T<b.delay)continue;
  const r=b.r,tx=b.r.b*W/4+W/8,inBin=b.y>binTop;
  b.vy+=900*dt;
  if(mx>-900){const dx=b.x-mx,dy=b.y-my,d=Math.hypot(dx,dy);if(d<90&&d>1){const f=(1-d/90)*1400*dt;b.vx+=dx/d*f;b.vy+=dy/d*f}}
  if(!inBin){const p=Math.max(0,Math.min(1,(b.y-top0)/(pegBot-top0)));b.vx+=(tx-b.x)*(1.5+16*p*p)*dt;b.vx*=1-(.5+3*p*p)*dt}
  else{b.vx+=((r.fx-b.x)*40-b.vx*7)*dt}
  b.x+=b.vx*dt;b.y+=b.vy*dt;
  if(!inBin){for(const pg of pegs){const px=pg[0],py=pg[1];const dx=b.x-px,dy=b.y-py,d=Math.hypot(dx,dy),m=R+PR;
   if(d<m&&d>.01){const nx=dx/d,ny=dy/d;b.x=px+nx*m;b.y=py+ny*m;pg[2]=T;if(SND.on&&T-lastTick>.035){lastTick=T;SFX.tick()}const vn=b.vx*nx+b.vy*ny;if(vn<0){b.vx-=1.45*vn*nx;b.vy-=1.45*vn*ny}}}}
  const bl=r.b*W/4+R,br=(r.b+1)*W/4-R;
  if(b.y>binTop-4){if(b.x<bl){b.x=bl;b.vx*=-.3}if(b.x>br){b.x=br;b.vx*=-.3}}
  if(b.x<R){b.x=R;b.vx*=-.4}if(b.x>W-R){b.x=W-R;b.vx*=-.4}
  if(b.y>=r.fy&&b.y>binTop){b.y=r.fy;b.vy*=-.25;if(Math.abs(b.vy)<40)b.vy=0}
  if(b.y>=r.fy-.5&&Math.abs(b.x-r.fx)<1.5&&b.vy===0){b.x=r.fx;b.y=r.fy;b.done=true;if(SND.on&&T-lastLand>.07){lastLand=T;SFX.land(r.b)}}
 }
 for(let i=0;i<balls.length;i++){const a=balls[i];if(a.done||T<a.delay||a.y>binTop-R)continue;
  for(let j=i+1;j<balls.length;j++){const c=balls[j];if(c.done||T<c.delay||c.y>binTop-R)continue;
   const dx=c.x-a.x,dy=c.y-a.y,d=Math.hypot(dx,dy),m=2*R;
   if(d<m&&d>.01){const nx=dx/d,ny=dy/d,o=(m-d)/2;a.x-=nx*o;a.y-=ny*o;c.x+=nx*o;c.y+=ny*o;const vn=(c.vx-a.vx)*nx+(c.vy-a.vy)*ny;if(vn<0){const k=.8*vn;a.vx+=k*nx;a.vy+=k*ny;c.vx-=k*nx;c.vy-=k*ny}}}}
 if(T>10)balls.forEach(b=>{if(!b.done){b.x=b.r.fx;b.y=b.r.fy;b.done=true}});
}
function count(){if(TLM.on)return;const n=balls.filter(b=>(b.done||b.drag)&&b.r.s==='live').length;if(n!==landed){landed=n;const e=$('#num');e.textContent=n;e.classList.add('b');setTimeout(()=>e.classList.remove('b'),160)}}
let hov=null,mx=-999,my=-999,HL=null;
function binOf(x){return TLM.on?(x.hide?-1:x.tb):x.r.b}
function draw(){
 cx.clearRect(0,0,W,H);
 for(const [x,y,t] of pegs){const a=Math.max(0,1-(T-t)/.35),nr=Math.max(0,1-Math.hypot(x-mx,y-my)/110),q=Math.max(a,nr*.8);cx.fillStyle=q>0?'rgba(255,255,255,'+(.38+.62*q)+')':'rgba(243,245,255,.38)';cx.beginPath();cx.arc(x,y,PR+2.4*q,0,7);cx.fill()}
 cx.strokeStyle='rgba(243,245,255,.5)';cx.lineWidth=1.5;cx.textAlign='center';cx.font='700 13px "Bricolage Grotesque",system-ui,sans-serif';
 const bw=W/4;
 B.forEach((k,b)=>{const n=balls.filter(x=>x.done&&binOf(x)===b).length;if(n){cx.fillStyle=HC[k]+'22';cx.fillRect(b*bw,binTop,bw,H-binTop)}});
 for(let b=0;b<=4;b++){cx.beginPath();cx.moveTo(b*bw,binTop);cx.lineTo(b*bw,H);cx.stroke()}
 B.forEach((k,b)=>{cx.fillStyle=HC[k];cx.fillText((b===3?'Not sorted':NAMES[k])+' '+balls.filter(x=>binOf(x)===b).length,b*bw+bw/2,H-6)});
 for(const b of balls){if(b.hide||(T<b.delay&&!b.done))continue;
  const dim=HL&&!HL.has(b.r.n);if(dim)cx.globalAlpha=.22;
  cx.beginPath();cx.arc(b.x,b.y,R+(b.r===hov?3:0),0,7);cx.fillStyle=HC[TLM.on?B[b.tb]:b.r.s];cx.fill();cx.globalAlpha=1;
  if(HL&&!dim){cx.lineWidth=2.5;cx.strokeStyle='#fff';cx.stroke();cx.lineWidth=1.5;cx.strokeStyle='rgba(243,245,255,.5)'}
  if(b.r===sel){cx.lineWidth=3;cx.strokeStyle='#fff';cx.stroke();cx.lineWidth=1.5;cx.strokeStyle='rgba(243,245,255,.5)'}}
 const L=hov||sel;if(L){const b=balls.find(x=>x.r===L);if(b&&!b.hide&&(b.done||T>=b.delay)){cx.fillStyle='#fff';cx.textAlign=b.x<W/2?'left':'right';cx.fillText(L.n,b.x+(b.x<W/2?-R:R),Math.max(14,b.y-R-8));cx.textAlign='center'}}
}
function frame(t){
 const dt=Math.min(.033,(t-last)/1000||.016);last=t;
 const n=Math.ceil(dt/(1/120));for(let i=0;i<n;i++)step(dt/n);
 count();draw();
 if(balls.some(b=>!b.done)){requestAnimationFrame(frame)}else{run=false}
}
function go(){if(!run){run=true;last=performance.now();requestAnimationFrame(frame)}}

/* ---------- panel + interaction ---------- */
function show(r){
 $('#panel').innerHTML='<h3>'+r.n+' <span class="pill" style="color:var(--'+r.s+')">'+NAMES[r.s]+'</span></h3><p>'+r.note+'</p><p class="m">'+ORI[r.o]+'. Last push '+r.d+'.</p><p>'+(r.priv?'Private repo, so there is no link.':'<a href="https://github.com/sriram36/'+r.n+'">Open the repo</a>')+(r.u?' &nbsp; <a href="'+r.u+'">Open the live app</a>':'')+'</p>';
}
function pick(e){
 const R0=cv.getBoundingClientRect(),x=e.clientX-R0.left,y=e.clientY-R0.top;
 let best=null,bd=18;for(const b of balls){if(b.hide||(T<b.delay&&!b.done))continue;const d=Math.hypot(b.x-x,b.y-y);if(d<bd){bd=d;best=b.r}}
 cv.style.cursor=best?'pointer':'default';
 if(best&&(e.type==='click'||e.pointerType==='mouse'&&sel!==best)){sel=best;show(sel)}
 if(e.pointerType==='mouse'){mx=x;my=y;hov=best;if(!run)draw()}else if(!run)draw();
}
cv.addEventListener('pointermove',pick);cv.addEventListener('click',pick);cv.addEventListener('pointerleave',()=>{mx=my=-999;hov=null;if(!run)draw()});
cv.addEventListener('keydown',e=>{
 if(e.key!=='ArrowRight'&&e.key!=='ArrowLeft')return;e.preventDefault();
 const i=repos.indexOf(sel),j=(i+(e.key==='ArrowRight'?1:-1)+N)%N;sel=repos[j];show(sel);if(!run)draw();
});
