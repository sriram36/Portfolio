/* grader inspector */
(()=>{
const IN=[{t:'Our product helps you feel better.',d:'pass',w:'a known safe phrase'},{t:'Clinically proven to cure joint pain in 7 days.',d:'fail',w:'an unsubstantiated cure claim'},{t:'Supports mobility for many adults.',d:null}];
const dcache={};let llmCalls=0,ii=0,itimers=[];
const NODES=['Phrase','Dictionary','Disk cache','LLM','Verdict'];
function ipre(){$('#ipre').innerHTML=IN.map((x,i)=>'<button type="button" data-i="'+i+'" aria-pressed="'+(i===ii)+'">'+x.t+'</button>').join('')}
function inode(){$('#ipipe').innerHTML=NODES.map((n,k)=>'<div class="pn" data-k="'+k+'">'+n+'<small></small><span class="bd"></span></div>').join('')}
function iset(k,cls,txt,note){const n=document.querySelector('#ipipe .pn[data-k="'+k+'"]');n.className='pn '+cls;n.querySelector('.bd').textContent=txt||'';n.querySelector('small').textContent=note||''}
function irun(){
 itimers.forEach(clearTimeout);itimers=[];const x=IN[ii];inode();$('#iver').textContent='';
 const at=(ms,fn)=>{if(rm)fn();else itimers.push(setTimeout(fn,ms))};
 const hit=k=>{iset(k,'on hit','HIT');if(SND.on)SFX.chime(4)},miss=k=>{iset(k,'on miss','MISS');if(SND.on)SFX.pop()};
 const verdict=(ok,why,tier)=>{iset(4,'on '+(ok?'hit':'bad'),ok?'PASS':'FAIL','');$('#iver').textContent=(ok?'Pass. ':'Fail. ')+why+'. Decided by the '+tier+'. LLM calls so far: '+llmCalls+'.';if(SND.on){ok?SFX.chime(2):SFX.fail()}};
 iset(0,'on','',x.t);
 at(500,()=>{
  if(x.d){hit(1);iset(2,'skip','skipped');iset(3,'skip','skipped');at(500,()=>verdict(x.d==='pass','This is '+x.w,'dictionary'))}
  else{miss(1);at(500,()=>{
   if(dcache[ii]){hit(2);iset(3,'skip','skipped');at(500,()=>verdict(true,'Same answer as last time, read back from the cache','disk cache'))}
   else{miss(2);at(500,()=>{llmCalls++;iset(3,'on hit','ASKED','one LLM call');dcache[ii]=true;at(600,()=>verdict(true,'Mild wording with no cure or guarantee language, and the answer is now cached','LLM tier'))})}
  })}
 });
}
$('#ipre').onclick=e=>{const b=e.target.closest('button');if(!b)return;ii=+b.dataset.i;ipre();irun()};
$('#i-run').onclick=irun;
$('#i-reset').onclick=()=>{for(const k in dcache)delete dcache[k];llmCalls=0;irun()};
ipre();inode();onView($('#insp'),irun,.5);
})();
