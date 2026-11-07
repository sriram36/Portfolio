/* dock: skim, sound, search, print */
(()=>{
const html=document.documentElement;
const bK=$('#d-skim'),bS=$('#d-sound'),bC=$('#d-cmd'),bP=$('#d-print');
function skim(on){html.classList.toggle('skim',on);store.set('skim',on?'1':'0');press(bK,on)}
function sound(on){SND.on=on;press(bS,on);if(on){snd();SFX.on()}}
bK.onclick=()=>skim(!html.classList.contains('skim'));
bS.onclick=()=>sound(!SND.on);
bP.onclick=()=>print();
press(bK,html.classList.contains('skim'));
document.addEventListener('click',e=>{if(SND.on&&e.target.closest('.dock button,.tabs button,.flow button,.cch button,#sks button,.qb button,.demo button,#mpills button,#dtabs button,.tlc button'))SFX.click()});
})();
