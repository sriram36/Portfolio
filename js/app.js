/* Start-up: wires the page together once every other file has loaded. */
$('#again').onclick=()=>{setup();if(rm)draw();else go()};
$('#cp').onclick=async()=>{try{await navigator.clipboard.writeText('kollisriram6@gmail.com');$('#cp').textContent='Copied'}catch(e){$('#cp').textContent='Copy it from the link'}};
let rz;addEventListener('resize',()=>{clearTimeout(rz);rz=setTimeout(()=>{const keep=T;setup();T=rm?T:keep;balls.forEach(b=>{if(T>b.delay+4||rm){b.x=b.r.fx;b.y=b.r.fy;b.done=true}});count();draw()},150)});

chips();rcs();tl();sih();lang();nums();rail();skills();clock();setInterval(clock,30000);
onView($('#rcs'),()=>$('#rcs').classList.add('go'),.12);onView($('#lang'),()=>$('#lang').classList.add('in'),.5);onView($('#sih'),()=>$('#sih').classList.add('go'),.4);
addEventListener('scroll',()=>{const h=document.documentElement,m=h.scrollHeight-innerHeight;$('#prog').style.transform='scaleX('+(m>0?Math.min(1,scrollY/m):0)+')'},{passive:true});
$('#last').textContent='Latest public push: '+repos[0].d+'. Outcomes are my labels; the dates were copied from GitHub when I last updated this list.';
sel=repos.find(r=>r.n==='LeaveFlow')||repos[0];show(sel);
setup();draw();if(!rm)go();
