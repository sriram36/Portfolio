/* mini fraction */
(()=>{
 const m=$('#mini'),n=$('#num'),dn=$('#den');
 const sync=()=>{$('#mn').textContent=n.textContent;$('#md').textContent=dn.textContent;m.setAttribute('aria-label','Back to the top. '+n.textContent+' of '+dn.textContent+' projects live.')};
 sync();new MutationObserver(sync).observe(n,{childList:true,characterData:true,subtree:true});new MutationObserver(sync).observe(dn,{childList:true,characterData:true,subtree:true});
 if('IntersectionObserver' in window)new IntersectionObserver(es=>m.classList.toggle('show',!es[0].isIntersecting),{threshold:0}).observe(document.querySelector('header.hero'));
 m.addEventListener('click',e=>{e.preventDefault();scrollTo({top:0,behavior:rm?'auto':'smooth'})});
})();
