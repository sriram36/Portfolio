/* commit rhythm */
(()=>{
const RHC=['#0a8f5a','#a87000','#c0123f','#5f6aa6'],RHN=['live','learned','killed','not yet sorted'];
const RHS=RH.w.map(a=>a[0]+a[1]+a[2]+a[3]);
const rhd=i=>{const t=new Date(RH.start+'T00:00:00');t.setDate(t.getDate()+7*i);return t};
const RHHINT='Hover a bar to see its week. Bar height is the square root of the count, so quiet weeks stay visible.';
let rhp=0,rhx=-1;
function rhdraw(){
 const c=$('#rh'),dpr=devicePixelRatio||1,w=c.clientWidth,h=230;if(!w)return;
 c.width=w*dpr;c.height=h*dpr;const g=c.getContext('2d');g.setTransform(dpr,0,0,dpr,0,0);g.clearRect(0,0,w,h);
 const n=RH.w.length,pad=8,bw=(w-pad*2)/n,top=18,base=h-26,mx=Math.sqrt(Math.max(...RHS));
 g.font='600 11px "Bricolage Grotesque",system-ui,sans-serif';g.textAlign='left';
 let lastM=-1,lastI=-9;
 RH.w.forEach((a,i)=>{
  const x=pad+i*bw,dt=rhd(i),m=dt.getMonth();
  if(m!==lastM&&i-lastI>=3){lastM=m;lastI=i;g.fillStyle='#4a5385';g.fillText(dt.toLocaleDateString('en-GB',{month:'short'})+(m===0||i===0?' '+String(dt.getFullYear()).slice(2):''),x,h-8)}
  const tot=RHS[i];if(!tot)return;
  const H=(Math.sqrt(tot)/mx)*(base-top)*rhp;let y=base;
  a.forEach((v,b)=>{if(!v)return;const hh=H*v/tot;y-=hh;g.fillStyle=RHC[b];g.globalAlpha=rhx===-1||rhx===i?1:.55;g.fillRect(x+1,y,Math.max(2,bw-2),hh)});
  g.globalAlpha=1;
  if(rhx===i){g.fillStyle='#0a0f33';g.fillRect(x+1,base+3,Math.max(2,bw-2),3)}
 });
 g.strokeStyle='#c9cffa';g.lineWidth=1;g.beginPath();g.moveTo(pad,base+.5);g.lineTo(w-pad,base+.5);g.stroke();
}
(()=>{
 const tot=RHS.reduce((a,b)=>a+b,0),act=RHS.filter(x=>x>0).length,n=RHS.length,mx=Math.max(...RHS);
 $('#rhs').textContent=tot+' of my commits over '+n+' weeks. '+act+' weeks had commits and '+(n-act)+' were quiet. The busiest week had '+mx+'. Colours are what happened to each project.';
 const by=[0,0,0,0];RH.w.forEach(a=>a.forEach((v,b)=>by[b]+=v));
 $('#rhl').innerHTML=RHN.map((k,b)=>'<span><b style="background:'+RHC[b]+'"></b>'+k+' '+by[b]+'</span>').join('');
 $('#rht').textContent=RHHINT;
})();
$('#rh').addEventListener('pointermove',e=>{
 const c=$('#rh'),r=c.getBoundingClientRect(),n=RH.w.length,pad=8,bw=(r.width-pad*2)/n,i=Math.max(0,Math.min(n-1,Math.floor((e.clientX-r.left-pad)/bw)));
 if(i===rhx)return;rhx=i;const a=RH.w[i],parts=a.map((v,b)=>v?v+' '+RHN[b]:'').filter(Boolean);
 $('#rht').textContent='Week of '+rhd(i).toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric'})+': '+(RHS[i]?RHS[i]+' commit'+(RHS[i]===1?'':'s')+' ('+parts.join(', ')+')':'no commits')+'.';
 rhdraw();
});
$('#rh').addEventListener('pointerleave',()=>{rhx=-1;$('#rht').textContent=RHHINT;rhdraw()});
onView($('#rh'),()=>{if(rm){rhp=1;rhdraw();return}const t0=performance.now(),f=t=>{const k=Math.min(1,(t-t0)/900);rhp=1-Math.pow(1-k,3);rhdraw();if(k<1)requestAnimationFrame(f)};requestAnimationFrame(f)},.3);
let rhr;addEventListener('resize',()=>{clearTimeout(rhr);rhr=setTimeout(rhdraw,160)});
})();
