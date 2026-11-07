/* stack match */
(()=>{
const STK={'LeaveFlow':{t:['FastAPI','PostgreSQL','WebSockets','Python'],n:29,l:12026},'FinSight':{t:['FastAPI','Next.js','PostgreSQL','Python','TypeScript'],n:60,l:15411},'RefillCare':{t:['FastAPI','Next.js','PostgreSQL','Python','TypeScript'],n:95,l:11271},'wirematch':{t:['Django','PostgreSQL','React','Python'],n:64,l:3465},'pharma-mlr-compliance':{t:['FastAPI','LangGraph','Azure OpenAI','Streamlit','Python'],n:31,l:6224},'Scout':{t:['Next.js','n8n','Playwright','Supabase','Azure OpenAI','Node.js','JavaScript','TypeScript'],n:274,l:6843},'ClaimLens':{t:['Python','PostgreSQL'],n:56,l:2207},'geomeasure-api':{t:['FastAPI','GeoPandas','Python'],n:52,l:1613},'knowledge-shift-rag':{t:['Python'],n:30,l:4044},'Location-Sharing':{t:['TypeScript','Supabase'],n:0,l:4386},'x7z9p':{t:['Python'],n:17,l:1514},'stock-ai':{t:['Python','LightGBM'],n:0,l:1308}};
const MP=['FastAPI','PostgreSQL','Next.js','LangGraph','Azure OpenAI','Python','TypeScript','50+ tests'],msel=new Set();
const mhas=(k,x)=>x==='50+ tests'?STK[k].n>=50:STK[k].t.includes(x);
function mpills(){$('#mpills').innerHTML=MP.map(x=>'<button type="button" aria-pressed="'+msel.has(x)+'" data-x="'+x+'">'+x+'</button>').join('')+(msel.size?'<button type="button" data-x="">Clear</button>':'')}
function mrun(){
 const names=Object.keys(STK).filter(k=>[...msel].every(x=>mhas(k,x))),on=msel.size>0;
 document.querySelectorAll('#rcs .rc,#rcsMore .rc').forEach(c=>c.classList.toggle('nm',on&&!names.includes(c.id.slice(2))));
 if(on&&document.querySelector('#rcsMore .rc:not(.nm)'))$('#moreD').open=true;
 HL=on?new Set(names):null;if(typeof draw==='function')draw();
 const t=names.reduce((a,k)=>a+STK[k].n,0),l=names.reduce((a,k)=>a+STK[k].l,0);
 $('#mres').textContent=on?(names.length?names.length+' of '+Object.keys(STK).length+' named projects match: '+names.join(', ')+'. Together they have '+t+' test functions and '+l.toLocaleString('en-US')+' lines of source.':'No named project has all of those. Try removing one.'):'The cards, the board and these totals follow your picks.';
 mpills();
}
$('#mpills').onclick=e=>{const b=e.target.closest('button');if(!b)return;const x=b.dataset.x;if(!x)msel.clear();else if(msel.has(x))msel.delete(x);else msel.add(x);mrun()};
mrun();
})();
