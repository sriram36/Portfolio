/* Start-up: wires the page together once every other file has loaded. */
$('#again').onclick=()=>{setup();if(rm)draw();else go()};
$('#cp').onclick=async()=>{try{await navigator.clipboard.writeText('kollisriram6@gmail.com');$('#cp').textContent='Copied'}catch(e){$('#cp').textContent='Copy it from the link'}};
let rz;addEventListener('resize',()=>{clearTimeout(rz);rz=setTimeout(()=>{const keep=T;setup();T=rm?T:keep;balls.forEach(b=>{if(T>b.delay+4||rm){b.x=b.r.fx;b.y=b.r.fy;b.done=true}});count();draw()},150)});

chips();rcs();tl();sih();lang();nums();rail();skills();clock();setInterval(clock,30000);
onView($('#rcs'),()=>$('#rcs').classList.add('go'),.12);onView($('#lang'),()=>$('#lang').classList.add('in'),.5);onView($('#sih'),()=>$('#sih').classList.add('go'),.4);
addEventListener('scroll',()=>{const h=document.documentElement,m=h.scrollHeight-innerHeight;$('#prog').style.transform='scaleX('+(m>0?Math.min(1,scrollY/m):0)+')'},{passive:true});
$('#last').textContent='Latest public push: '+repos[0].d+'. Outcomes are my labels; the dates come from GitHub.';
sel=repos.find(r=>r.n==='LeaveFlow')||repos[0];show(sel);
setup();draw();if(!rm)go();
const GH=(async()=>{
 try{const r=await fetch('/api/github');if(r.ok){const j=await r.json();if(j&&Array.isArray(j.repos))return{repos:j.repos,events:j.events||null,edge:true}}}catch(e){}
 try{const c=new AbortController();setTimeout(()=>c.abort(),2500);const j=await(await fetch('https://api.github.com/users/sriram36/repos?per_page=100',{signal:c.signal})).json();if(Array.isArray(j))return{repos:j.map(g=>({name:g.name,pushed_at:g.pushed_at})),events:null,edge:false}}catch(e){}
 return null})();
GH.then(g=>{if(!g)return;g.repos.forEach(x=>{const r=repos.find(y=>y.n===x.name);if(r)r.d=x.pushed_at.slice(0,10)});$('#last').textContent='Latest public push: '+repos.map(r=>r.d).sort().pop()+'. Outcomes are my labels; the dates come from GitHub'+(g.edge?', through a cached copy at the edge.':'.')});