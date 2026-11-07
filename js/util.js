/* Small shared helpers. */
const $=s=>document.querySelector(s),rm=matchMedia('(prefers-reduced-motion:reduce)').matches;
function onView(el,fn,th){if(!el)return;if(rm||!('IntersectionObserver' in window)){fn(true);return}const o=new IntersectionObserver(es=>{if(es[0].isIntersecting){o.disconnect();fn(false)}},{threshold:th||.3});o.observe(el)}
const INST=rm||!('IntersectionObserver' in window);
function mulberry(a){return()=>{a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
const store={get:k=>{try{return localStorage.getItem(k)}catch(e){return null}},set:(k,v)=>{try{localStorage.setItem(k,v)}catch(e){}}};
const press=(b,on)=>b.setAttribute('aria-pressed',String(!!on));
const jump=id=>{const el=document.getElementById(id);if(el)el.scrollIntoView({behavior:rm?'auto':'smooth',block:'start'})};
const ago=iso=>{const m=Math.max(1,Math.round((Date.now()-new Date(iso))/6e4));if(m<60)return m+' min ago';const h=Math.round(m/60);if(h<48)return h+' hours ago';return Math.round(h/24)+' days ago'};
