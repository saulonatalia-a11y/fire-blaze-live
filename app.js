const $ = (s) => document.querySelector(s);
const participants = [];
let drawTimer = null;

function updateGoal() {
  const type = $('#goalType').value;
  const raw = type === 'likes' ? Number($('#likes').textContent) : Number($('#subs').textContent.replaceAll('.', ''));
  const target = Math.max(1, Number($('#goalTarget').value) || 1);
  $('#previewText').textContent = $('#goalText').value;
  $('#currentGoal').textContent = raw.toLocaleString('pt-BR');
  $('#targetGoal').textContent = target.toLocaleString('pt-BR');
  $('#barFill').style.width = Math.min(100, (raw / target) * 100) + '%';
}

function syncLiveStats() {
  $('#chatSubs').textContent = $('#subs').textContent;
  $('#chatLikes').textContent = $('#likes').textContent;
  $('#chatViewers').textContent = $('#viewers').textContent;
}

function renderParticipants() {
  const keyword = $('#keyword').value || 'sorteio';
  $('#chat').innerHTML = participants.map(n => '<div class="msg"><b>' + n + '</b>: ' + keyword + '</div>').join('');
  $('#liveChatStream').innerHTML = participants.length
    ? participants.map(n => '<div class="live-msg entry"><b>' + n + '</b><span>' + keyword + '</span></div>').join('')
    : '<div class="live-chat-empty"><b>💬 CHAT DA TRANSMISSÃO</b><span>Quando conectarmos o YouTube, as mensagens aparecerão aqui em tempo real.</span></div>';
  $('#count').textContent = participants.length + ' participante' + (participants.length === 1 ? '' : 's');
  $('#liveParticipantCount').textContent = participants.length;
  $('#chatMessageCount').textContent = participants.length + ' mensagens';
}

function makeConfetti() {
  const box = $('#confetti');
  box.innerHTML = '';
  for (let i = 0; i < 70; i++) {
    const p = document.createElement('i');
    p.style.left = (Math.random() * 100) + '%';
    p.style.animationDelay = (Math.random() * 1.2) + 's';
    p.style.animationDuration = (2 + Math.random() * 2) + 's';
    box.appendChild(p);
  }
}

function startDraw() {
  if (!participants.length) {
    alert('Ainda não há participantes no sorteio. Use SIMULAR PARTICIPANTE para testar.');
    return;
  }
  if (drawTimer) clearInterval(drawTimer);
  const winner = participants[Math.floor(Math.random() * participants.length)];
  $('#liveWinner').classList.remove('hidden');
  $('#drawCountdown').classList.remove('hidden');
  $('#winnerReveal').classList.add('hidden');
  let n = 10;
  $('#countdownNumber').textContent = n;
  drawTimer = setInterval(() => {
    n -= 1;
    $('#countdownNumber').textContent = Math.max(0, n);
    if (n <= 0) {
      clearInterval(drawTimer);
      drawTimer = null;
      $('#drawCountdown').classList.add('hidden');
      $('#winnerName').textContent = winner;
      $('#winnerReveal').classList.remove('hidden');
      $('#winner strong').textContent = winner;
      $('#winner').classList.remove('hidden');
      makeConfetti();
    }
  }, 1000);
}

['#goalText', '#goalTarget', '#goalType'].forEach(s => $(s).addEventListener('input', updateGoal));

$('#openLiveChat').addEventListener('click', function () {
  syncLiveStats();
  renderParticipants();
  $('#liveChatPanel').classList.remove('hidden');
});

$('#closeLiveChat').addEventListener('click', function () {
  $('#liveChatPanel').classList.add('hidden');
});

$('#demo').addEventListener('click', function () {
  const names = ['Lucas Gamer', 'Ana Plays', 'Rafael', 'Bruno Live', 'Carol XP', 'MarcosBR', 'Gabi Games'];
  const name = names[participants.length % names.length];
  if (!participants.includes(name)) participants.push(name);
  renderParticipants();
  syncLiveStats();
});

$('#draw').addEventListener('click', startDraw);
$('#liveDraw').addEventListener('click', startDraw);

$('#closeWinner').addEventListener('click', function () {
  $('#liveWinner').classList.add('hidden');
  $('#confetti').innerHTML = '';
});

updateGoal();
renderParticipants();
