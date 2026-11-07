/* print */
(()=>{
addEventListener('beforeprint',()=>{if(window.tlExit)window.tlExit();document.querySelectorAll('#tl i[data-f="1"]').forEach(e=>e.classList.add('f'));$('#tn').textContent=document.querySelectorAll('#tl i[data-f="1"]').length;document.querySelectorAll('#nums b').forEach(b=>{b.textContent=Math.round(+b.dataset.v).toLocaleString('en-US')+b.dataset.s});$('#rcs').classList.add('go');$('#lang').classList.add('in');$('#sih').classList.add('go');balls.forEach(b=>{b.x=b.r.fx;b.y=b.r.fy;b.done=true;b.hide=false});landed=-1;count()});
})();
