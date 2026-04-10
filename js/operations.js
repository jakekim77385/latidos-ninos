/**
 * operations.js — Latidos Niños
 * Addition, Subtraction, Multiplication, Division games
 */

(function () {
  App.initPage('operations');

  /* ─── Helpers ───────────────────────────────────────────── */
  function randInt(a, b) { return Math.floor(Math.random() * (b - a + 1)) + a; }

  function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function uniqueOptions(correct, count = 3, min = 0, max = 100) {
    const s = new Set([correct]);
    let tries = 0;
    while (s.size < count + 1 && tries++ < 200) {
      const delta = randInt(1, Math.max(3, Math.floor((max - min) / 4)));
      const sign  = Math.random() > 0.5 ? 1 : -1;
      const opt   = Math.max(min, Math.min(max, correct + delta * sign));
      if (opt !== correct) s.add(opt);
    }
    return shuffle([...s]);
  }

  /* ─── Level config ──────────────────────────────────────── */
  const LEVEL_CFG = {
    add: {
      1: { aMin:1, aMax:9,  bMin:1, bMax:9  },
      2: { aMin:5, aMax:20, bMin:5, bMax:20 },
      3: { aMin:10,aMax:50, bMin:10,bMax:50 },
    },
    sub: {
      1: { aMin:2, aMax:10, bMin:1, bMax:5  },
      2: { aMin:10,aMax:30, bMin:1, bMax:15 },
      3: { aMin:20,aMax:80, bMin:5, bMax:40 },
    },
    mul: {
      1: { aMin:1, aMax:5,  bMin:1, bMax:5  },
      2: { aMin:1, aMax:9,  bMin:1, bMax:9  },
      3: { aMin:2, aMax:12, bMin:2, bMax:12 },
    },
    div: {
      1: { tables: [1,2,3,4,5] },
      2: { tables: [2,3,4,5,6,7] },
      3: { tables: [2,3,4,5,6,7,8,9] },
    },
  };

  const OP_META = {
    add: { sym:'+', module:'addition',       maxAns:100, hint: (a,b) => `¿Cuánto es ${a} + ${b}?` },
    sub: { sym:'−', module:'subtraction',    maxAns:80,  hint: (a,b) => `¿Cuánto es ${a} − ${b}?` },
    mul: { sym:'×', module:'multiplication', maxAns:144, hint: (a,b) => `¿Cuánto es ${a} × ${b}?` },
    div: { sym:'÷', module:'division',       maxAns:12,  hint: (a,b) => `¿Cuánto es ${a} ÷ ${b}?` },
  };

  /* ─── Game State ────────────────────────────────────────── */
  let currentOp    = 'add';
  let currentLevel = 1;
  let gs = null;

  function makeGS() {
    return { score: 0, lives: 3, q: 0, total: 10 };
  }

  /* ─── Generate Question ─────────────────────────────────── */
  function genQuestion(op, level) {
    const cfg = LEVEL_CFG[op][level];
    let a, b, ans;

    if (op === 'add') {
      a = randInt(cfg.aMin, cfg.aMax);
      b = randInt(cfg.bMin, cfg.bMax);
      ans = a + b;
    } else if (op === 'sub') {
      a = randInt(cfg.aMin, cfg.aMax);
      b = randInt(cfg.bMin, Math.min(cfg.bMax, a));
      ans = a - b;
    } else if (op === 'mul') {
      a = randInt(cfg.aMin, cfg.aMax);
      b = randInt(cfg.bMin, cfg.bMax);
      ans = a * b;
    } else { // div
      const t = cfg.tables[Math.floor(Math.random() * cfg.tables.length)];
      b = t;
      ans = randInt(1, 10);
      a = b * ans; // ensures clean division
    }
    return { a, b, ans };
  }

  /* ─── Render ─────────────────────────────────────────────── */
  function renderStarsBadge(op) {
    const moduleKey = OP_META[op].module;
    const stars = App.getState().stars[moduleKey] || 0;
    const id = 'stars-' + op.replace('add','add').replace('sub','sub').replace('mul','mul').replace('div','div');
    const el = document.getElementById(id);
    if (el) el.textContent = ['☆☆☆','⭐☆☆','⭐⭐☆','⭐⭐⭐'][stars] || '☆☆☆';
  }
  ['add','sub','mul','div'].forEach(renderStarsBadge);

  function updateStats() {
    document.getElementById('op-score').textContent  = gs.score;
    document.getElementById('op-lives').textContent  = '💖'.repeat(gs.lives);
    document.getElementById('op-q').textContent      = gs.q + 1;
    document.getElementById('op-progress').style.width = (gs.q / gs.total * 100) + '%';
  }

  function startGame() {
    gs = makeGS();
    updateStats();
    nextQuestion();
  }

  function nextQuestion() {
    if (gs.q >= gs.total) { finishGame(); return; }

    const { a, b, ans } = genQuestion(currentOp, currentLevel);
    const meta = OP_META[currentOp];

    document.getElementById('eq-a').textContent  = a;
    document.getElementById('eq-op').textContent = meta.sym;
    document.getElementById('eq-b').textContent  = b;
    document.getElementById('eq-hint').textContent = meta.hint(a, b);
    document.querySelector('.eq-ans').textContent = '?';

    const opts = uniqueOptions(ans, 3, 0, meta.maxAns);
    const grid = document.getElementById('op-answer-grid');
    grid.innerHTML = '';
    grid.dataset.answered = '';

    opts.forEach(opt => {
      const btn = document.createElement('button');
      btn.className = 'answer-btn';
      btn.textContent = opt;
      btn.addEventListener('click', () => {
        if (grid.dataset.answered) return;
        grid.dataset.answered = '1';

        const ok = opt === ans;
        btn.classList.add(ok ? 'correct' : 'wrong');
        document.querySelector('.eq-ans').textContent = ans;

        if (ok) { Sounds.correct(); gs.score++; }
        else {
          Sounds.wrong();
          gs.lives = Math.max(0, gs.lives - 1);
          [...grid.children].forEach(b => {
            if (Number(b.textContent) === ans) b.classList.add('correct');
          });
        }

        if (gs.lives === 0) { setTimeout(finishGame, 900); return; }

        gs.q++;
        updateStats();
        setTimeout(nextQuestion, 900);
      });
      grid.appendChild(btn);
    });
  }

  function finishGame() {
    const meta = OP_META[currentOp];
    const stars  = gs.lives === 3 ? 3 : gs.lives > 0 ? (gs.score >= 6 ? 2 : 1) : 0;
    const hearts = gs.score * 4;

    App.setStars(meta.module, stars);
    const { leveledUp, newLevel } = App.addHearts(hearts);
    if (gs.score >= 9) App.addBadge(`${meta.module}_expert`);
    if (gs.score >= 5) App.addBadge(`${meta.module}_player`);

    App.launchConfetti(55);
    renderStarsBadge(currentOp);

    const EMOJIS = { add:'➕', sub:'➖', mul:'✖️', div:'➗' };
    App.showModal({
      emoji: stars === 3 ? '🌟' : stars >= 1 ? EMOJIS[currentOp] : '💪',
      title: stars === 3 ? '¡Perfecto!' : stars >= 1 ? '¡Muy bien!' : '¡Sigue practicando!',
      message: `${gs.score} de ${gs.total} correctas`,
      stars, heartsEarned: hearts,
      onNext: startGame,
    });

    if (leveledUp) { Sounds.levelUp(); App.showToast(`🎉 ¡Nivel ${newLevel}!`); }
    else if (stars === 3) Sounds.star();
  }

  /* ─── Op Selector ────────────────────────────────────────── */
  document.querySelectorAll('.op-card').forEach(card => {
    card.addEventListener('click', () => {
      Sounds.click();
      document.querySelectorAll('.op-card').forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      currentOp = card.dataset.op;
      startGame();
    });
  });

  /* ─── Level Selector ─────────────────────────────────────── */
  document.querySelectorAll('.level-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      Sounds.click();
      document.querySelectorAll('.level-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentLevel = Number(btn.dataset.level);
      startGame();
    });
  });

  /* ─── Boot ───────────────────────────────────────────────── */
  startGame();
})();
