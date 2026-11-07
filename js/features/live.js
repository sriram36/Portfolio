/* live wall + GitHub pulse */
(()=>{
const TG=[['LeaveFlow demo','https://leave-flow-cyan.vercel.app'],['FinSight app','https://finsight-wine-tau.vercel.app'],['FinSight API','https://finsight-api-d84z.onrender.com/docs'],['RefillCare app','https://refillcare.vercel.app'],['RefillCare API','https://refillcare.onrender.com/docs'],['School bus tracker','https://location-sharing-chi.vercel.app'],['Wind forecast','https://x7z9p-yxu2.vercel.app']];
const hist={};
$('#wall').innerHTML=TG.map(([n])=>'<div class="wc" id="wc-'+TG.findIndex(x=>x[0]===n)+'"><b>'+n+'</b><div class="ms">…</div><div class="st">waiting</div><svg viewBox="0 0 100 30" preserveAspectRatio="none" aria-hidden="true"></svg></div>').join('');
async function ping1(u){const c=new AbortController(),to=setTimeout(()=>c.abort(),12000),t=performance.now();try{await fetch(u,{mode:'no-cors',cache:'no-store',signal:c.signal});clearTimeout(to);return Math.round(performance.now()-t)}catch(e){clearTimeout(to);return -1}}
function paint(i){
 const h=hist[i],ms=h[h.length-1],el=$('#wc-'+i),good=ms>=0,slow=ms>1500;
 el.querySelector('.ms').textContent=good?ms+' ms':'down';el.querySelector('.ms').style.color=good?(slow?'var(--learned)':'var(--live)'):'var(--killed)';
 el.querySelector('.st').textContent=good?(slow?'reachable, slow (probably waking up)':'reachable'):(psrc==='edge'?'not reachable from the edge right now':'not reachable from your browser right now');
 const ok=h.filter(v=>v>=0),mx=Math.max(1,...ok),n=h.length;
 el.querySelector('svg').innerHTML=(ok.length>1?'<polyline fill="none" stroke="currentColor" stroke-width="1.6" vector-effect="non-scaling-stroke" points="'+h.map((v,k)=>v>=0?((n<2?0:k/(n-1))*100).toFixed(1)+','+(28-(v/mx)*24).toFixed(1):'').filter(Boolean).join(' ')+'"/>':'')+h.map((v,k)=>v<0?'<circle cx="'+((n<2?0:k/(n-1))*100).toFixed(1)+'" cy="26" r="2" fill="var(--killed)"/>':'').join('');
}
let psrc='browser',pcolo=null;
const note=(i,ms)=>{(hist[i]=hist[i]||[]).push(ms);if(hist[i].length>10)hist[i].shift();paint(i)};
async function pingAll(){
 try{const r=await fetch('/api/ping');if(r.ok){const j=await r.json();if(j&&Array.isArray(j.results)&&j.results.length===TG.length){psrc='edge';pcolo=j.colo;j.results.forEach((x,i)=>note(i,x.ok?x.ms:-1));$('#wlead').textContent="Each card shows the latency of the real deployment, measured from Cloudflare's edge"+(pcolo?' ('+pcolo+')':'')+' every 30 seconds, with the last ten results. Free hosts go to sleep, so a first check can be slow.';return}}}catch(e){}
 psrc='browser';await Promise.all(TG.map(async([n,u],i)=>note(i,await ping1(u))));
}
async function pulse(){
 const el=$('#pulse');
 try{
  let ev=null;const g=await GH;
  if(g&&g.events)ev=g.events;
  else{
   let j=JSON.parse(sessionStorage.getItem('ev')||'null');
   if(!j||Date.now()-j.t>6e5){const r=await fetch('https://api.github.com/users/sriram36/events/public?per_page=40');const d=await r.json();if(!Array.isArray(d))throw 0;j={t:Date.now(),d};sessionStorage.setItem('ev',JSON.stringify(j))}
   ev=j.d.filter(e=>e.type==='PushEvent').map(e=>({repo:e.repo.name,size:(e.payload&&e.payload.size)||1,created_at:e.created_at}));
  }
  ev=ev.slice(0,6);
  el.innerHTML=ev.length?ev.map(e=>'<li><a href="https://github.com/'+e.repo+'">'+e.repo.split('/')[1]+'</a><span>'+e.size+' commit'+(e.size===1?'':'s')+', '+ago(e.created_at)+'</span></li>').join(''):"<li>No public pushes in GitHub's recent feed.</li>";
 }catch(x){el.innerHTML="<li>GitHub's public feed is unreachable right now.</li>"}
}
let wallOn=false,wallStarted=false;
if('IntersectionObserver' in window)new IntersectionObserver(es=>{wallOn=es[0].isIntersecting;if(wallOn&&!wallStarted){wallStarted=true;pingAll();pulse()}},{rootMargin:'300px'}).observe($('#live'));
else{wallStarted=true;pingAll();pulse()}
setInterval(()=>{if(wallOn&&!document.hidden)pingAll()},30000);
})();
