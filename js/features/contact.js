/* contact form */
(()=>{
$('#cch').innerHTML=['Internship','Full-time role','A project','Just saying hi'].map(c=>'<button type="button" aria-pressed="false">'+c+'</button>').join('');
$('#cch').onclick=e=>{const b=e.target.closest('button');if(b)press(b,b.getAttribute('aria-pressed')!=='true')};
$('#cform').onsubmit=e=>{e.preventDefault();const on=[...document.querySelectorAll('#cch [aria-pressed=true]')].map(b=>b.textContent),nm=$('#cname').value.trim(),m=$('#cmsg').value.trim();
 location.href='mailto:kollisriram6@gmail.com?subject='+encodeURIComponent('Hello from your portfolio'+(on.length?': '+on.join(', '):''))+'&body='+encodeURIComponent((m||'Hi Sriram,')+(nm?'\n\n'+nm:''))};
})();
