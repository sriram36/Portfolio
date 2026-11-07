/* section notes */
(()=>{
 const ids=['about','experience','work','how','decisions','lab','live','negative','numbers','rhythm','skills','education','contact'];
 if(!('IntersectionObserver' in window))return;let last=-1;
 const io=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;const i=ids.indexOf(e.target.id);if(i<0||i===last)return;last=i;if(SND.on)SFX.note(i)}),{rootMargin:'-45% 0px -50% 0px'});
 ids.forEach(id=>{const el=document.getElementById(id);if(el)io.observe(el)});
})();
