const $=s=>document.querySelector(s);
const participants=[];
function updateGoal(){
 const type=$('#goalType').value;
 const raw=type==='likes'?Number($('#likes').textContent):Number($('#subs').textContent.replace('.',''));
 const target=Math.max(1,Number($('#goalTarget').value)||1);
 $('#previewText').textContent=$('#goalText').value;
 $('#currentGoal').textContent=raw.toLocaleString('pt-BR');
 $('#targetGoal').textContent=target.toLocaleString('pt-BR');
 $('#barFill').style.width=Math.min(100,(raw/target)*100)+'%';
}
['#goalText','#goalTarget','#goalType'].forEach(s=>$(s).addEventListener('input',updateGoal));
$('#demo').onclick=()=>{
 const names=['Lucas Gamer','Ana Plays','Rafael','Bruno Live','Carol XP','MarcosBR','Gabi Games'];
 const name=names[participants.length%names.length];
 if(!participants.includes(name)) participants.push(name);
 $('#chat').innerHTML=participants.map(n=>'<div class="msg"><b>'+n+'</b>: '+$('#keyword').value+'</div>').join('');
 $('#count').textContent=participants.length+' participante'+(participants.length===1?'':'s');
 $('#liveParticipantCount').textContent=participants.length;
};
$('#draw').onclick=()=>{
 if(!participants.length){alert('Ainda não há participantes. Use SIMULAR PARTICIPANTE para testar.');return}
 const w=participants[Math.floor(Math.random()*participants.length)];
 $('#winner strong').textContent=w; $('#winner').classList.remove('hidden');
};
updateGoal();
const livePanel=$('#liveChatPanel');
$('#openLiveChat').onclick=()=>{livePanel.classList.remove('hidden');syncLiveStats()};
$('#closeLiveChat').onclick=()=>livePanel.classList.add('hidden');
function syncLiveStats(){
 $('#chatSubs').textContent=$('#subs').textContent;
 $('#chatLikes').textContent=$('#likes').textContent;
 $('#chatViewers').textContent=$('#viewers').textContent;
}
const oldDemo=$('#demo').onclick;
$('#demo').onclick=()=>{
 oldDemo();
 const last=participants[participants.length-1];
 $('#liveChatStream').innerHTML=participants.map(n=>'<div class="live-msg entry"><b>'+n+'</b><span>'+$('#keyword').value+'</span></div>').join('');
 $('#chatMessageCount').textContent=participants.length+' mensagens';
 syncLiveStats();
};

function showLiveWinner(){
 if(!participants.length){alert('Ainda não há participantes no sorteio.');return}
 const w=participants[Math.floor(Math.random()*participants.length)];
 $('#liveWinner strong').textContent=w;
 $('#liveWinner').classList.remove('hidden');
 $('#winner strong').textContent=w;
 $('#winner').classList.remove('hidden');
}
$('#liveDraw').onclick=showLiveWinner;
$('#closeWinner').onclick=()=>$('#liveWinner').classList.add('hidden');
