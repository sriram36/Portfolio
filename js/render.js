/* Renders the content sections from the data. Each function owns one part of the page. */
function chips(){
 const c=[0,0,0,0];repos.forEach(r=>c[r.b]++);
 $('#chips').innerHTML=B.map((k,i)=>'<span><b style="background:'+HC[k]+'"></b>'+c[i]+' '+(i===3?'not yet sorted':k)+'</span>').join('');
 if(PENDING)$('#chips').insertAdjacentHTML('afterend','<p class="fine" style="margin:10px 0 0">Plus '+PENDING+' more private repos I have not labelled yet, so the real denominator is '+(N+PENDING)+'.</p>');
 $('#den').textContent=N;$('#h1').textContent=(WORDS[LIVE]||LIVE)+' of the '+N+' projects I started are live.';
 document.title='Sriram Kolli: '+LIVE+' of '+N+' live, and the rest';
}
function nums(){
 const fm=(v,s)=>Math.round(v).toLocaleString('en-US')+s;
 $('#nf').textContent=WORDS[FEAT.size]||FEAT.size;
 const it=[[N,'','projects started'],[METRICS.commits,'','commits of my own'],[Math.round(METRICS.loc/1000),'k','lines of source, rounded, generated files excluded'],[METRICS.tests,'','test functions counted, not run'],[LIVE,'','live and reachable'],[METRICS.months,'','months, April 2025 to November 2026']];
 $('#nums').innerHTML=it.map(([v,s,l])=>'<div><b data-v="'+v+'" data-s="'+s+'">'+fm(INST?v:0,s)+'</b><span>'+l+'</span></div>').join('');
 if(!INST)onView($('#nums'),()=>{const t0=performance.now(),bs=[...document.querySelectorAll('#nums b')],f=t=>{const k=Math.min(1,(t-t0)/1100),e=1-Math.pow(1-k,3);bs.forEach(b=>b.textContent=fm(+b.dataset.v*e,b.dataset.s));if(k<1)requestAnimationFrame(f)};requestAnimationFrame(f)},.5);
}
const card=([t,u,L],i)=>'<article class="rc" id="w-'+(RK[t]||t)+'" style="--i:'+i+'"><h3>'+t+'</h3><p class="sub">'+u+'</p><ul>'+L.map(([c,k,h])=>'<li><span>'+c+'</span><i class="ld"></i>'+(k==='c'?'<a class="k" href="'+h+'">Check it</a>':'<span class="k w">My word</span>')+'</li>').join('')+'</ul></article>';
function rcs(){const top=TOPN.map(n=>RC.find(c=>c[0]===n)),more=RC.filter(c=>!TOPN.includes(c[0]));$('#rcs').innerHTML=top.map(card).join('');$('#rcsMore').innerHTML=more.map(card).join('');$('#moreS').textContent=more.length+" more I'm happy to share"}
function hot(r,on){document.querySelectorAll('#tl i[data-r="'+r+'"]').forEach(e=>e.classList.toggle('hot',on));const x=$('#x-'+r);if(x)x.classList.toggle('hot',on)}
function tl(){const Rg=[['P','PixelTests',0,5],['Z','Zennith AI',9,17],['A','Accenture',18,19],['Z','Zennith AI',20,23]],MN=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];let h='',n=0;
 for(let i=0;i<24;i++){const o=Rg.find(r=>i>=r[2]&&i<=r[3]);n+=o?1:0;h+='<i data-r="'+(o?o[0]:'')+'" data-f="'+(o?1:0)+'" class="'+(o&&INST?'f':'')+'" title="'+MN[(11+i)%12]+' '+(2024+Math.floor((11+i)/12))+(o?': '+o[1]:'')+'">'+(o?o[0]:'')+'</i>'}
 $('#tl').innerHTML=h;$('#tn').textContent=INST?n:0;
 if(!INST)onView($('#tl'),()=>{let c=0;[...$('#tl').children].forEach((el,i)=>setTimeout(()=>{if(el.dataset.f==='1'){el.classList.add('f');$('#tn').textContent=++c}},i*70))},.6);
 $('#tl').onpointerover=e=>{const i=e.target.closest('i');if(i&&i.dataset.r)hot(i.dataset.r,true)};
 $('#tl').onpointerout=e=>{const i=e.target.closest('i');if(i&&i.dataset.r)hot(i.dataset.r,false)};
 document.querySelectorAll('.xp').forEach(x=>{x.onpointerenter=()=>hot(x.dataset.r,true);x.onpointerleave=()=>hot(x.dataset.r,false)});
}
function sih(){$('#sih').innerHTML=Array.from({length:150},(_,i)=>'<i style="--i:'+i+'"'+(i===87?' class="on"':'')+'></i>').join('')}
function skills(){
 $('#sks').innerHTML=SK.map(([g,l])=>'<div class="sk"><b>'+g+'</b><span>'+l.map(x=>'<button type="button" aria-pressed="false" data-s="'+x+'">'+x+'</button>').join('')+'</span></div>').join('');
 $('#sks').onclick=e=>{const b=e.target.closest('button');if(!b)return;const on=b.getAttribute('aria-pressed')!=='true';
  document.querySelectorAll('#sks button').forEach(x=>x.setAttribute('aria-pressed','false'));
  const r=$('#skres');if(!on){r.innerHTML='';return}
  b.setAttribute('aria-pressed','true');const u=USES[b.dataset.s]||[];
  r.innerHTML=u.length?'<b>'+b.dataset.s+'</b> shows up in:'+u.map(k=>'<a href="#'+(KN[k]?'x-':'w-')+k+'">'+(KN[k]||k)+'</a>').join(''):'<b>'+b.dataset.s+'</b> is in work I don’t name on this page.'}
}
function clock(){const t=new Intl.DateTimeFormat('en-IN',{timeZone:'Asia/Kolkata',hour:'numeric',minute:'2-digit',hour12:true}).format(new Date());$('#nowt').textContent='It is '+t+' in Bengaluru. Open to internships and entry-level roles.'}
function lang(){const c={};repos.forEach(r=>{c[r.l]=(c[r.l]||0)+1});const e=Object.entries(c).sort((a,b)=>b[1]-a[1]),op=i=>[1,.72,.52,.38,.26][i]||.18;
 $('#lang').innerHTML=e.map(([l,n],i)=>'<i style="flex:'+n+';opacity:'+op(i)+'"></i>').join('');
 $('#lg').innerHTML=e.map(([l,n],i)=>'<span><b style="opacity:'+op(i)+'"></b>'+l+' '+n+'</span>').join('')}
function rail(){
 const by={};repos.forEach(r=>by[r.n]=r);
 $('#rd').innerHTML=repos.slice().sort((a,b)=>a.b-b.b).map(r=>'<i data-n="'+r.n+'" style="background:var(--'+r.s+')"></i>').join('');
 const M={all:[()=>true,N+' projects'],work:[r=>TOPK.has(r.n),'Six ideas'],people:[()=>false,'3 companies'],me:[()=>false,'Me, not repos']};
 const dots=[...document.querySelectorAll('#rd i')];
 const set=k=>{const [f,t]=M[k];$('#rcap').textContent=t;dots.forEach(d=>d.classList.toggle('off',!f(by[d.dataset.n])))};
 const map=[['header.hero','all'],['#about','me'],['#experience','people'],['#work','work'],['#how','work'],['#live','all'],['#numbers','all'],['#skills','me'],['#education','me']];
 set('all');if(!('IntersectionObserver' in window))return;
 const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)set(e.target.dataset.rail)}),{rootMargin:'-48% 0px -48% 0px'});
 map.forEach(([q,k])=>{const el=document.querySelector(q);if(el){el.dataset.rail=k;io.observe(el)}});
}
