/* command palette */
(()=>{
const bK=$('#d-skim'),bS=$('#d-sound'),bC=$('#d-cmd'),bpl=$('#tl-play');
const cmd=$('#cmd'),ci=$('#cmdi'),cl=$('#cmdl');let items=[],act=0,opener=null;
const SEC=[['about','What I do'],['experience','Experience'],['work','Selected work'],['how','How they work'],['decisions','Decisions'],['lab','Try the demos'],['live','Live right now'],['negative','What did not work'],['numbers','The numbers'],['rhythm','Commit rhythm'],['skills','Skills'],['education','Education and certificates'],['contact','Contact']];
const WID={'pharma-mlr-compliance':'w-pharma-mlr-compliance'};
function allItems(){
 const a=SEC.map(([id,l])=>({t:l,s:'Section',run:()=>jump(id)}));
 repos.filter(r=>r.f).forEach(r=>a.push({t:r.n,s:'Project',run:()=>{const el=document.getElementById(WID[r.n]||'w-'+r.n);if(el){const dt=el.closest('details');if(dt)dt.open=true;location.hash=el.id}else jump('stopped')}}));
 SK.forEach(([g,l])=>l.forEach(x=>a.push({t:x,s:'Skill',run:()=>{jump('skills');const b=document.querySelector('#sks button[data-s="'+x.replace(/"/g,'')+'"]');if(b&&b.getAttribute('aria-pressed')!=='true')b.click()}})));
 a.push({t:'Toggle skim view',s:'Action',run:()=>bK.click()},{t:'Toggle sound',s:'Action',run:()=>bS.click()},{t:'Play the timeline',s:'Action',run:()=>{jump('board');bpl.click()}},{t:'Drop the balls again',s:'Action',run:()=>{jump('board');$('#again').click()}},{t:'Copy my email',s:'Action',run:()=>$('#cp').click()},{t:'Open my resume',s:'Link',run:()=>{location.href='https://www.dropbox.com/scl/fi/9z4x1fs90tx06ss7lwb0d/Sriram_Kolli_Resume.pdf?rlkey=htf0r9qydxv8kpfi85hj2unyy&st=pr7fg3ys&dl=0'}},{t:'Open GitHub',s:'Link',run:()=>{location.href='https://github.com/sriram36'}},{t:'Open LinkedIn',s:'Link',run:()=>{location.href='https://www.linkedin.com/in/sriram-kolli-979723219/'}},{t:'Print this page',s:'Action',run:()=>print()});
 return a;
}
function cshow(){
 const q=ci.value.toLowerCase().trim().split(/\s+/).filter(Boolean);
 items=allItems().filter(it=>q.every(w=>(it.t+' '+it.s).toLowerCase().includes(w))).slice(0,10);act=Math.min(act,Math.max(0,items.length-1));
 cl.innerHTML=items.length?items.map((it,i)=>'<li role="option" aria-selected="'+(i===act)+'" data-i="'+i+'"><span>'+it.t+'</span><small>'+it.s+'</small></li>').join(''):'<li>Nothing matches. Try a skill, a project or a section.</li>';
}
function copen(){opener=document.activeElement;cmd.hidden=false;ci.value='';act=0;cshow();ci.focus();if(SND.on)SFX.click()}
function cclose(){cmd.hidden=true;if(opener&&opener.focus)opener.focus()}
function crun(i){const it=items[i];if(!it)return;cclose();setTimeout(it.run,30)}
bC.onclick=copen;
ci.oninput=()=>{act=0;cshow()};
cl.onclick=e=>{const li=e.target.closest('li[data-i]');if(li)crun(+li.dataset.i)};
cmd.addEventListener('pointerdown',e=>{if(e.target===cmd)cclose()});
document.addEventListener('keydown',e=>{
 const typing=/^(INPUT|TEXTAREA|SELECT)$/.test((e.target.tagName||''));
 if(cmd.hidden){if((e.key==='/'&&!typing)||((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k')){e.preventDefault();copen()}return}
 if(e.key==='Escape'){e.preventDefault();cclose()}
 else if(e.key==='ArrowDown'){e.preventDefault();act=Math.min(items.length-1,act+1);cshow()}
 else if(e.key==='ArrowUp'){e.preventDefault();act=Math.max(0,act-1);cshow()}
 else if(e.key==='Enter'){e.preventDefault();crun(act)}
});
})();
