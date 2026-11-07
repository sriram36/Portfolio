/* concurrency sandbox */
(()=>{
const SCN=[
 {name:'Same payment, double click',call:100,lanes:[
  {t:'No protection',ev:[['A','reads the match: not approved yet',0],['B','reads the match: not approved yet',0],['A','adds 100 to the line item',100],['B','adds 100 to the line item',200]],out:['bad','Over-funded: 200 of 100 called']},
  {t:'Database check only',ev:[['A','reads the match: not approved yet',0],['B','reads the match: not approved yet',0],['A','adds 100 to the line item',100],['B','tries to add 100: the database refuses',100]],out:['warn','Blocked, but B gets an error']},
  {t:'Locks plus check',ev:[['A','locks the transaction row',0],['B','waits for that lock',0],['A','funds 100 and commits',100],['B','gets the lock and sees it is reconciled',100]],out:['good','B gets a clean 409. Funded 100 of 100']}]},
 {name:'Two payments, one line item',call:100,lanes:[
  {t:'No protection',ev:[['A','reads the remaining amount: 100',0],['B','reads the remaining amount: 100',0],['A','adds 60',60],['B','adds 60',120]],out:['bad','Over-funded: 120 of 100 called']},
  {t:'Database check only',ev:[['A','reads the remaining amount: 100',0],['B','reads the remaining amount: 100',0],['A','adds 60',60],['B','tries to add 60: the database refuses',60]],out:['warn','Blocked, but B gets an error']},
  {t:'Locks plus check',ev:[['A','locks the line item',0],['B','waits on the line item',0],['A','adds 60 and commits',60],['B','re-checks: only 40 left, so 409',60]],out:['good','B gets a clean 409. Funded 60 of 100']}]}
];
let sc=0,stm=[];
function stabs(){$('#stabs').innerHTML=SCN.map((x,i)=>'<button type="button" data-i="'+i+'" aria-pressed="'+(i===sc)+'">'+x.name+'</button>').join('')}
function lanes(){$('#lanes').innerHTML=SCN[sc].lanes.map((l,i)=>'<div class="lane" id="ln'+i+'"><h4>'+l.t+'</h4><div class="fund">Funded 0 of '+SCN[sc].call+'</div><ol class="evs"></ol><div class="res"></div></div>').join('')}
function sfire(){
 stm.forEach(clearTimeout);stm=[];lanes();const cal=SCN[sc].call;
 SCN[sc].lanes.forEach((l,i)=>{
  const el=$('#ln'+i),ev=el.querySelector('.evs'),fd=el.querySelector('.fund'),rs=el.querySelector('.res');
  const at=(ms,fn)=>{if(rm)fn();else stm.push(setTimeout(fn,ms))};
  l.ev.forEach((e,k)=>at(650*(k+1),()=>{ev.insertAdjacentHTML('beforeend','<li><b class="'+e[0]+'">'+e[0]+'</b><span>'+e[1]+'</span></li>');fd.textContent='Funded '+e[2]+' of '+cal;fd.classList.toggle("bad",e[2]>cal);if(SND.on&&i===0)SFX.tick()}));
  at(650*(l.ev.length+1),()=>{rs.className='res '+l.out[0];rs.textContent=l.out[1];if(SND.on&&i===2){l.out[0]==='good'?SFX.chime(5):SFX.fail()}});
 });
}
$('#stabs').onclick=e=>{const b=e.target.closest('button');if(!b)return;sc=+b.dataset.i;stabs();sfire()};
$('#s-fire').onclick=sfire;
stabs();lanes();onView($('#sbx'),sfire,.4);
})();
