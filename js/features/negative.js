/* negative results */
(()=>{
const bars=(rows,lead)=>rows.map((r,i)=>'<div class="bar'+(i===lead?' lead':'')+'"><span>'+r[0]+'</span><i style="--w:'+r[2]+'%"></i><b>'+r[1]+'</b></div>').join('');
$('#neg').innerHTML=[
 '<article class="ng"><h3>knowledge-shift-rag</h3><p class="sub">Accuracy on 100 questions</p>'+bars([['Plain RAG','76',76],['Self-critique','72',72],['Repair','72',72]],0)+'<p>The extra passes cost 1.6 to 2 times the latency and scored lower, so I kept the result and stopped.</p><a class="tag" href="https://github.com/sriram36/knowledge-shift-rag">Check it</a></article>',
 '<article class="ng"><h3>ClaimLens</h3><p class="sub">F1 on the dev set (axis starts at 0.98)</p>'+bars([['Before','0.987',35],['After','1.000',100]],1)+'<p>That gain is about the size of run-to-run variance, so it is calibration, not generalization.</p><a class="tag" href="https://github.com/sriram36/ClaimLens">Check it</a></article>'
].join('');
document.querySelectorAll('#neg .ng').forEach(n=>onView(n,()=>n.classList.add('in'),.4));
})();
