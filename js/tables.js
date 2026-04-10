/**
 * tables.js — Latidos Niños
 * Flashcard, Speed Quiz, Bingo, Full Grid
 */

(function () {
  App.initPage('tables');

  const SPANISH_NUMS = ['cero','uno','dos','tres','cuatro','cinco','seis','siete','ocho','nueve','diez',
    'once','doce','trece','catorce','quince','dieciséis','diecisiete','dieciocho','diecinueve','veinte'];

  function randInt(a, b) { return Math.floor(Math.random() * (b - a + 1)) + a; }
  function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  /* ─── State ─────────────────────────────────────────────── */
  let selectedTable = 3; // default table

  /* ─── Table Pill Selector ───────────────────────────────── */
  const pillsEl = document.getElementById('table-pills');
  for (let t = 1; t <= 10; t++) {
    const pill = document.createElement('button');
    pill.className = 'table-pill' + (t === selectedTable ? ' active' : '');
    pill.textContent = t;
    pill.dataset.table = t;
    pill.setAttribute('aria-label', `Tabla del ${t}`);
    pill.addEventListener('click', () => {
      Sounds.click();
      document.querySelectorAll('.table-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      selectedTable = t;
      onTableChange();
    });
    pillsEl.appendChild(pill);
  }

  function onTableChange() {
    renderLearn();
    renderFullTableList();
    // if quiz/bingo active, restart
    if (!document.getElementById('ttab-tquiz').style.display || document.getElementById('ttab-tquiz').style.display !== 'none') {
      startQuiz();
    }
    if (document.getElementById('ttab-tbingo').style.display !== 'none') {
      initBingo();
    }
    if (document.getElementById('ttab-tgrid').style.display !== 'none') {
      renderGrid();
    }
  }

  /* ══════════════════════════════════════════════
     LEARN — Flashcards
  ══════════════════════════════════════════════ */
  let fcIndex = 0;

  function getFlashFacts(t) {
    return Array.from({ length: 9 }, (_, i) => ({ a: t, b: i + 2, ans: t * (i + 2) }));
    // Show 2–10 multipliers
  }

  function renderLearn() {
    fcIndex = 0;
    renderFlashcard();
    renderFullTableList();
  }

  function renderFlashcard() {
    const facts = getFlashFacts(selectedTable);
    const f     = facts[fcIndex % facts.length];
    const card  = document.getElementById('flashcard');

    card.classList.remove('flipped');
    document.getElementById('fc-eq').textContent      = `${f.a} × ${f.b}`;
    document.getElementById('fc-ans').textContent     = f.ans;
    document.getElementById('fc-back-eq').textContent = `${f.a} × ${f.b} = ${f.ans}`;
    document.getElementById('fc-counter').textContent = `${(fcIndex % facts.length) + 1}/${facts.length}`;
  }

  document.getElementById('flashcard-wrap').addEventListener('click', () => {
    Sounds.click();
    document.getElementById('flashcard').classList.toggle('flipped');
  });

  document.getElementById('fc-next').addEventListener('click', () => {
    Sounds.pop();
    fcIndex++;
    renderFlashcard();
  });
  document.getElementById('fc-prev').addEventListener('click', () => {
    Sounds.pop();
    const facts = getFlashFacts(selectedTable);
    fcIndex = (fcIndex - 1 + facts.length) % facts.length;
    renderFlashcard();
  });

  function renderFullTableList() {
    const t = selectedTable;
    document.getElementById('full-table-title').textContent = `Tabla del ${t}`;
    const list = document.getElementById('full-table-list');
    list.innerHTML = '';
    for (let i = 1; i <= 10; i++) {
      const row = document.createElement('div');
      row.style.cssText = 'display:flex; align-items:center; padding:8px 0; border-bottom:1px solid rgba(0,0,0,0.05); font-weight:700;';
      row.innerHTML = `
        <span style="min-width:50px; font-size:1.1rem; color:var(--coral);">${t}</span>
        <span style="color:var(--text-mid);">× ${i} =</span>
        <span style="margin-left:12px; font-size:1.2rem; color:var(--text-dark);">${t * i}</span>`;
      list.appendChild(row);
    }
  }

  /* ══════════════════════════════════════════════
     SPEED QUIZ
  ══════════════════════════════════════════════ */
  const QUIZ_TOTAL        = 10;
  const QUIZ_TIME_PER_Q   = 10; // seconds

  let qs, timerInterval;

  function startQuiz() {
    clearInterval(timerInterval);
    qs = { score: 0, lives: 3, q: 0, timeLeft: QUIZ_TIME_PER_Q };
    updateQuizUI();
    nextQuizQ();
  }

  function updateQuizUI() {
    document.getElementById('tq-score').textContent  = qs.score;
    document.getElementById('tq-lives').textContent  = '💖'.repeat(qs.lives);
    document.getElementById('tq-progress').style.width = (qs.q / QUIZ_TOTAL * 100) + '%';
  }

  function startTimer() {
    clearInterval(timerInterval);
    qs.timeLeft = QUIZ_TIME_PER_Q;
    updateTimerRing(QUIZ_TIME_PER_Q, QUIZ_TIME_PER_Q);
    timerInterval = setInterval(() => {
      qs.timeLeft--;
      updateTimerRing(qs.timeLeft, QUIZ_TIME_PER_Q);
      Sounds.tick();
      if (qs.timeLeft <= 0) {
        clearInterval(timerInterval);
        qs.lives = Math.max(0, qs.lives - 1);
        if (qs.lives === 0) { finishQuiz(); return; }
        qs.q++;
        updateQuizUI();
        nextQuizQ();
      }
    }, 1000);
  }

  function updateTimerRing(current, total) {
    const pct    = current / total;
    const circum = 163; // 2 * PI * 26
    document.getElementById('timer-arc').style.strokeDashoffset = circum * (1 - pct);
    document.getElementById('timer-arc').style.stroke = pct > 0.4 ? 'var(--coral)' : 'var(--orange)';
    document.getElementById('timer-txt').textContent = current;
  }

  function nextQuizQ() {
    if (qs.q >= QUIZ_TOTAL) { finishQuiz(); return; }

    const b   = randInt(1, 10);
    const ans = selectedTable * b;

    document.getElementById('tq-a').textContent   = selectedTable;
    document.getElementById('tq-b').textContent   = b;
    document.querySelector('.eq-ans').textContent = '?';

    // Build options
    const opts = new Set([ans]);
    while (opts.size < 4) {
      const v = Math.max(1, ans + randInt(-4, 4) * randInt(1, 3));
      if (v !== ans) opts.add(v);
    }
    const options = shuffle([...opts]);

    const grid = document.getElementById('tq-answer-grid');
    grid.innerHTML = '';
    grid.dataset.answered = '';

    options.forEach(opt => {
      const btn = document.createElement('button');
      btn.className = 'answer-btn';
      btn.textContent = opt;
      btn.addEventListener('click', () => {
        if (grid.dataset.answered) return;
        grid.dataset.answered = '1';
        clearInterval(timerInterval);

        const ok = opt === ans;
        btn.classList.add(ok ? 'correct' : 'wrong');
        document.querySelector('.eq-ans').textContent = ans;

        if (ok) { Sounds.correct(); qs.score++; }
        else {
          Sounds.wrong();
          qs.lives = Math.max(0, qs.lives - 1);
          [...grid.children].forEach(b => { if (Number(b.textContent) === ans) b.classList.add('correct'); });
        }

        if (qs.lives === 0) { setTimeout(finishQuiz, 800); return; }

        qs.q++;
        updateQuizUI();
        setTimeout(nextQuizQ, 800);
      });
      grid.appendChild(btn);
    });

    startTimer();
  }

  function finishQuiz() {
    clearInterval(timerInterval);
    const stars  = qs.lives === 3 ? 3 : qs.lives > 0 ? (qs.score >= 6 ? 2 : 1) : 0;
    const hearts = qs.score * 5;
    App.setStars('tables', stars);
    const { leveledUp, newLevel } = App.addHearts(hearts);
    if (qs.score >= 9) App.addBadge('tables_master');
    App.launchConfetti(60);
    App.showModal({
      emoji: stars === 3 ? '🌟' : '✖️',
      title: stars === 3 ? '¡Maestro de tablas!' : '¡Bien hecho!',
      message: `${qs.score} de ${QUIZ_TOTAL} correctas — Tabla del ${selectedTable}`,
      stars, heartsEarned: hearts,
      onNext: startQuiz,
    });
    if (leveledUp) { Sounds.levelUp(); App.showToast(`🎉 ¡Nivel ${newLevel}!`); }
    else if (stars === 3) Sounds.star();
  }

  /* ══════════════════════════════════════════════
     BINGO
  ══════════════════════════════════════════════ */
  let bingoState = null;

  function getBingoPool() {
    // All products in the selected table (1..10) plus some random others for confusion
    const core = [];
    for (let i = 1; i <= 10; i++) core.push(selectedTable * i);
    const extra = new Set(core);
    while (extra.size < 25) {
      const r = randInt(1, 10) * randInt(1, 10);
      extra.add(r);
    }
    return shuffle([...extra]).slice(0, 24); // leave center for FREE
  }

  function initBingo() {
    const pool  = getBingoPool();
    const calls = [];
    for (let i = 1; i <= 10; i++) calls.push({ a: selectedTable, b: i, ans: selectedTable * i });
    shuffle(calls);

    bingoState = {
      grid: [...pool.slice(0, 12), 'FREE', ...pool.slice(12, 24)], // 25 cells with FREE center
      calls: shuffle(calls),
      callIdx: 0,
      marked: new Set([12]), // center always marked
      bingos: 0,
    };

    renderBingoGrid();
    renderBingoCall();
    document.getElementById('bingo-status').textContent = 'Marca los números correctos en tu tarjeta';
  }

  function renderBingoGrid() {
    const gridEl = document.getElementById('bingo-grid');
    gridEl.innerHTML = '';
    bingoState.grid.forEach((val, idx) => {
      const cell = document.createElement('div');
      cell.className = 'bingo-cell' + (idx === 12 ? ' center' : '') + (bingoState.marked.has(idx) ? ' marked' : '');
      cell.textContent = idx === 12 ? '💖' : val;
      cell.dataset.idx = idx;

      if (idx !== 12) {
        cell.addEventListener('click', () => onBingoCellClick(idx, val));
      }
      gridEl.appendChild(cell);
    });
    checkBingo();
  }

  function renderBingoCall() {
    const state = bingoState;
    if (state.callIdx >= state.calls.length) {
      document.getElementById('bingo-call-txt').textContent = '¡Terminado!';
      return;
    }
    const call = state.calls[state.callIdx];
    document.getElementById('bingo-call-txt').textContent = `${call.a} × ${call.b} = ?`;
  }

  function onBingoCellClick(idx, val) {
    if (bingoState.marked.has(idx)) return;
    const state = bingoState;
    if (state.callIdx >= state.calls.length) return;

    const current = state.calls[state.callIdx];
    if (Number(val) === current.ans) {
      Sounds.correct();
      state.marked.add(idx);
      renderBingoGrid();
      document.getElementById('bingo-status').textContent = `¡Correcto! ${current.a} × ${current.b} = ${current.ans}`;
    } else {
      Sounds.wrong();
      document.getElementById('bingo-status').textContent = `❌ Ese no es... sigue buscando`;
      const cell = document.querySelector(`.bingo-cell[data-idx="${idx}"]`);
      if (cell) { cell.classList.add('wrong'); setTimeout(() => cell.classList.remove('wrong'), 500); }
    }
  }

  document.getElementById('bingo-next-btn').addEventListener('click', () => {
    Sounds.pop();
    if (!bingoState) return;
    bingoState.callIdx++;
    renderBingoCall();
    document.getElementById('bingo-status').textContent = 'Busca el resultado en tu tarjeta';
  });

  document.getElementById('bingo-reset-btn').addEventListener('click', () => {
    Sounds.click();
    initBingo();
  });

  function checkBingo() {
    const m = bingoState.marked;
    const lines = [
      [0,1,2,3,4],[5,6,7,8,9],[10,11,12,13,14],[15,16,17,18,19],[20,21,22,23,24], // rows
      [0,5,10,15,20],[1,6,11,16,21],[2,7,12,17,22],[3,8,13,18,23],[4,9,14,19,24], // cols
      [0,6,12,18,24],[4,8,12,16,20], // diags
    ];

    lines.forEach(line => {
      if (line.every(i => m.has(i))) {
        line.forEach(i => {
          const cell = document.querySelector(`.bingo-cell[data-idx="${i}"]`);
          if (cell && !cell.classList.contains('bingo-line')) {
            cell.classList.add('bingo-line');
          }
        });
        if (!bingoState._bingoCelebrated) {
          bingoState._bingoCelebrated = true;
          Sounds.bingo();
          App.addHearts(20);
          App.launchConfetti(80);
          App.showToast('🎊 ¡BINGO! +20 💖');
          App.addBadge('bingo_winner');
        }
      }
    });
  }

  /* ══════════════════════════════════════════════
     FULL GRID
  ══════════════════════════════════════════════ */
  function renderGrid() {
    const gridEl = document.getElementById('mult-table-grid');
    gridEl.innerHTML = '';
    // Header row
    const corner = document.createElement('div');
    corner.className = 'mult-cell header';
    corner.textContent = '×';
    gridEl.appendChild(corner);
    for (let i = 1; i <= 9; i++) {
      const h = document.createElement('div');
      h.className = 'mult-cell header';
      h.textContent = i;
      gridEl.appendChild(h);
    }
    // Data rows
    for (let r = 1; r <= 9; r++) {
      const rh = document.createElement('div');
      rh.className = 'mult-cell header';
      rh.textContent = r;
      gridEl.appendChild(rh);
      for (let c = 1; c <= 9; c++) {
        const cell = document.createElement('div');
        cell.className = 'mult-cell result';
        cell.textContent = r * c;
        // Color intensity based on value
        const alpha = 0.1 + (r * c / 81) * 0.25;
        cell.style.background = `rgba(255,107,107,${alpha})`;
        cell.title = `${r} × ${c} = ${r * c}`;
        cell.addEventListener('click', () => {
          Sounds.pop();
          App.showToast(`${r} × ${c} = ${r * c}`);
        });
        gridEl.appendChild(cell);
      }
    }
  }

  /* ─── Tab Switching ──────────────────────────────────────── */
  const TAB_IDS = ['tlearn','tquiz','tbingo','tgrid'];

  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      Sounds.click();
      const tab = btn.dataset.tab;

      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      TAB_IDS.forEach(id => {
        document.getElementById('ttab-' + id).style.display = (id === tab) ? '' : 'none';
      });

      if (tab === 'tquiz')  startQuiz();
      if (tab === 'tbingo') initBingo();
      if (tab === 'tgrid')  renderGrid();
    });
  });

  /* ─── Boot ───────────────────────────────────────────────── */
  renderLearn();
  renderFullTableList();
})();
