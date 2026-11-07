/* decision log */
(()=>{
const DEC={
 'LeaveFlow':{src:'https://github.com/sriram36/LeaveFlow/blob/main/SYSTEM_DESIGN.md',d:[
  ['Push updates over WebSockets','The dashboard polling the database every five seconds.','Managers see a sick-leave request the moment it lands, and nothing is wasted when nothing changes. The backend sends an event only when state changes.','More moving parts than a plain request: a connection manager, and a token check on the socket.'],
  ['PostgreSQL with async SQLAlchemy','A synchronous ORM that blocks on every query.','Leave balances, requests and reporting lines are relational, and HR data needs ACID. Async sessions keep the event loop free under webhook load.','Async SQLAlchemy is harder to set up. The design notes say the scalability is worth it.'],
  ['Keep the message parser apart from the webhook','Parsing inside the WhatsApp handler.','The parser takes raw text and returns a structured command. Swapping a regex for an LLM later does not touch the webhook or the database.','An extra layer, and a command format to keep stable.']]},
 'FinSight':{src:'https://github.com/sriram36/FinSight/blob/main/docs/ARCHITECTURE.md',d:[
  ['The model never does arithmetic','Letting the language model add up the numbers.','Models write fluent sentences and miss sums. Totals, periods and daily pace are computed in Python, and the model only puts the result into words.','Every number has to be computed first, so the model cannot improvise a new one.'],
  ['Compare daily pace, not raw totals','Comparing a 30-day window with a 60-day window as they are.','Unequal windows create fake anomalies. Normalizing to a daily rate first makes the comparison fair.','Extra rules for edge cases, such as a zero baseline.'],
  ['Treat the advice as untrusted text','Showing whatever the model wrote.','A verifier pulls every number out of the text and matches it to a real transaction within 1%. Years and window lengths are ignored. A number with no match flags the advice.','It can be strict about rounding, so the tolerance matters.']]}
};
let dk='LeaveFlow';
function dlog(){
 $('#dtabs').innerHTML=Object.keys(DEC).map(k=>'<button type="button" data-k="'+k+'" aria-pressed="'+(k===dk)+'">'+k+'</button>').join('');
 $('#dlist').innerHTML=DEC[dk].d.map((x,i)=>'<details class="dl"'+(i===0?' open':'')+'><summary>'+x[0]+'</summary><div class="dlb"><div><h4>Instead of</h4><p>'+x[1]+'</p></div><div><h4>Why</h4><p>'+x[2]+'</p></div><div><h4>What it cost</h4><p>'+x[3]+'</p></div>'+(i===0?'':'')+'<a class="src" href="'+DEC[dk].src+'">Check it in the design notes</a></div></details>').join('');
}
$('#dtabs').onclick=e=>{const b=e.target.closest('button');if(!b)return;dk=b.dataset.k;dlog()};
dlog();
})();
