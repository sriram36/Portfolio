/* resume to proof */
(()=>{
const PF={A:[0,'#w-pharma-mlr-compliance','#w-pharma-mlr-compliance','#w-pharma-mlr-compliance'],Z:[0,0],P:[0,0]};
let pfn=0,pft=0;
document.querySelectorAll('.xp').forEach(x=>{const m=PF[x.dataset.r]||[];x.querySelectorAll('li').forEach((li,i)=>{
 pft++;const h=m[i];
 if(h){pfn++;li.insertAdjacentHTML('beforeend','<a class="pf" href="'+h+'">See the receipt</a>');
  const card=()=>document.querySelector(h);li.addEventListener('pointerenter',()=>{const c=card();if(c)c.classList.add('glow')});li.addEventListener('pointerleave',()=>{const c=card();if(c)c.classList.remove('glow')})}
 else li.insertAdjacentHTML('beforeend','<span class="pf w">My word</span>');
})});
$('#pfsum').textContent=pfn+' of '+pft+' bullets have a receipt below. The rest describe private employer work, so they are my word.';
})();
