/**
 * numbers.js — Latidos Niños
 * Three modes: Count, Compare, Quiz
 */

(function () {
  App.initPage('numbers');

  const OBJECTS = ['🫀','⭐','🍎','🌸','🦋','🍭','🎈','🐠','🐣','🌺'];

  /* ─── Utility ──────────────────────────────────────────── */
  function randInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }

  function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function wrongOptions(correct, count = 3, min = 0, max = 20) {
    const opts = new Set([correct]);
    while (opts.size < count + 1) {
      const o = Math.max(min, Math.min(max, correct + randInt(-5, 5)));
      if (o !== correct) opts.add(o);
    }
    return shuffle([...opts]);
  }

  function makeAnswerGrid(container, options, correctVal, onResult) {
    container.innerHTML = '';
    container.style.display = 'grid';
    options.forEach(opt => {
      const btn = document.createElement('button');
      btn.className = 'answer-btn';
      btn.textContent = opt;
      btn.addEventListener('click', () => {
        if (container.dataset.answered) return;
        container.dataset.answered = '1';
        const isCorrect = opt === correctVal;
        btn.classList.add(isCorrect ? 'correct' : 'wrong');
        if (isCorrect) Sounds.correct(); else Sounds.wrong();
        // Highlight correct if wrong chosen
        if (!isCorrect) {
          [...container.children].forEach(b => {
            if (Number(b.textContent) === correctVal) b.classList.add('correct');
          });
        }
        setTimeout(() => {
          container.dataset.answered = '';
          onResult(isCorrect);
        }, 900);
      });
      container.appendChild(btn);
    });
  }

  /* ─── GAME STATE FACTORY ────────────────────────────────── */
  function makeGameState(onFinish) {
    return { score: 0, lives: 3, q: 0, total: 10, onFinish };
  }

  function endGame(gs, module) {
    const stars = gs.lives === 3 ? 3 : gs.lives === 2 ? 2 : gs.score >= 5 ? 1 : 0;
    const hearts = gs.score * 3;
    App.setStars(module, stars);
    const { leveledUp, newLevel } = App.addHearts(hearts);
    if (gs.score >= 8) App.addBadge('numbers_master');
    App.launchConfetti(50);
    App.showModal({
      emoji: stars === 3 ? '🌟' : stars >= 1 ? '😊' : '💪',
      title: stars === 3 ? '¡Perfecto!' : stars >= 1 ? '¡Bien hecho!' : '¡Sigue intentando!',
      message: `Respondiste ${gs.score} de ${gs.total} correctas`,
      stars, heartsEarned: hearts,
      onNext: gs.onFinish,
    });
    if (leveledUp) {
      Sounds.levelUp();
      App.showToast(`🎉 ¡Subiste al nivel ${newLevel}!`);
    }
  }

  /* ══════════════════════════════════════════════
     MODE 1: CONTAR
  ══════════════════════════════════════════════ */
  const COUNT = {
    gs: null, correct: 0, obj: '',
    init() {
      this.gs = makeGameState(() => this.start());
      this.start();
    },
    start() {
      this.gs = makeGameState(() => this.start());
      this.updateUI();
      this.nextQ();
    },
    updateUI() {
      const g = this.gs;
      document.getElementById('count-score').textContent = g.score;
      document.getElementById('count-lives').textContent = '💖'.repeat(g.lives);
      document.getElementById('count-q').textContent = g.q + 1;
      document.getElementById('count-progress').style.width = (g.q / g.total * 100) + '%';
    },
    nextQ() {
      const g = this.gs;
      if (g.q >= g.total) { endGame(g, 'numbers'); return; }
      this.correct = randInt(1, 12);
      this.obj = OBJECTS[g.q % OBJECTS.length];
      // render objects
      const objs = document.getElementById('count-objects');
      objs.innerHTML = '';
      for (let i = 0; i < this.correct; i++) {
        const s = document.createElement('span');
        s.className = 'count-obj';
        s.textContent = this.obj;
        s.style.animationDelay = (i * 0.05) + 's';
        objs.appendChild(s);
      }
      // answer options
      const opts = wrongOptions(this.correct, 3, 1, 15);
      const grid = document.getElementById('count-answer-grid');
      makeAnswerGrid(grid, opts, this.correct, (ok) => {
        if (ok) { g.score++; Sounds.pop(); }
        else { g.lives = Math.max(0, g.lives - 1); }
        if (g.lives === 0) { endGame(g, 'numbers'); return; }
        g.q++;
        this.updateUI();
        this.nextQ();
      });
    },
  };

  /* ══════════════════════════════════════════════
     MODE 2: COMPARAR
  ══════════════════════════════════════════════ */
  const CMP = {
    gs: null, a: 0, b: 0, askMajor: true,
    init() { this.start(); },
    start() {
      this.gs = makeGameState(() => this.start());
      this.updateUI();
      this.nextQ();
    },
    updateUI() {
      const g = this.gs;
      document.getElementById('cmp-score').textContent = g.score;
      document.getElementById('cmp-lives').textContent = '💖'.repeat(g.lives);
      document.getElementById('cmp-q').textContent = g.q + 1;
      document.getElementById('cmp-progress').style.width = (g.q / g.total * 100) + '%';
    },
    nextQ() {
      const g = this.gs;
      if (g.q >= g.total) { endGame(g, 'numbers'); return; }
      do {
        this.a = randInt(0, 50);
        this.b = randInt(0, 50);
      } while (this.a === this.b);
      this.askMajor = Math.random() > 0.5;

      const dir = document.getElementById('cmp-direction');
      dir.textContent = this.askMajor ? 'mayor' : 'menor';

      const elA = document.getElementById('cmp-a');
      const elB = document.getElementById('cmp-b');
      elA.textContent = this.a;
      elB.textContent = this.b;
      elA.className = 'compare-num';
      elB.className = 'compare-num';

      const correct = this.askMajor
        ? (this.a > this.b ? this.a : this.b)
        : (this.a < this.b ? this.a : this.b);

      const handle = (el, val) => {
        el.onclick = null;
        elA.onclick = null;
        elB.onclick = null;
        const ok = val === correct;
        el.classList.add(ok ? 'correct' : 'wrong');
        if (!ok) {
          const other = (el === elA) ? elB : elA;
          other.classList.add('correct');
        }
        if (ok) { Sounds.correct(); g.score++; } else Sounds.wrong();
        g.lives = ok ? g.lives : Math.max(0, g.lives - 1);
        if (g.lives === 0) { setTimeout(() => endGame(g, 'numbers'), 800); return; }
        g.q++;
        this.updateUI();
        setTimeout(() => this.nextQ(), 900);
      };

      elA.onclick = () => handle(elA, this.a);
      elB.onclick = () => handle(elB, this.b);
    },
  };

  /* ══════════════════════════════════════════════
     MODE 3: QUIZ (visual number recognition)
  ══════════════════════════════════════════════ */
  const QUIZ = {
    gs: null, correct: 0,
    init() { this.start(); },
    start() {
      this.gs = makeGameState(() => this.start());
      this.updateUI();
      this.nextQ();
    },
    updateUI() {
      const g = this.gs;
      document.getElementById('quiz-score').textContent = g.score;
      document.getElementById('quiz-lives').textContent = '💖'.repeat(g.lives);
      document.getElementById('quiz-q').textContent = g.q + 1;
      document.getElementById('quiz-progress').style.width = (g.q / g.total * 100) + '%';
    },
    nextQ() {
      const g = this.gs;
      if (g.q >= g.total) { endGame(g, 'numbers'); return; }
      this.correct = randInt(1, 20);
      document.getElementById('quiz-number').textContent = this.correct;

      // visual helpers (hearts)
      const vis = document.getElementById('quiz-hearts-visual');
      vis.innerHTML = '';
      for (let i = 0; i < Math.min(this.correct, 20); i++) {
        const h = document.createElement('span');
        h.className = 'heart-item';
        h.textContent = '🫀';
        h.style.animationDelay = (i * 0.04) + 's';
        vis.appendChild(h);
      }

      const opts = wrongOptions(this.correct, 3, 1, 25);
      makeAnswerGrid(document.getElementById('quiz-answer-grid'), opts, this.correct, (ok) => {
        if (ok) { g.score++; }
        else { g.lives = Math.max(0, g.lives - 1); }
        if (g.lives === 0) { endGame(g, 'numbers'); return; }
        g.q++;
        this.updateUI();
        this.nextQ();
      });
    },
  };

  /* ══════════════════════════════════════════════
     MODE 4: LEER (음성 읽기)
  ══════════════════════════════════════════════ */
  const LEER = {
    numbers: [],    // 현재 모드의 숫자 배열
    idx: 0,         // 현재 인덱스
    mode: '1-10',

    init() {
      // 음성 미지원 경고
      const warn = document.getElementById('no-speech-warn');
      if (warn) warn.style.display = Speech.isSupported() ? 'none' : 'block';

      this.setMode('1-10');
      this._bindEvents();
    },

    setMode(mode) {
      this.mode = mode;
      document.querySelectorAll('.leer-mode-btn').forEach(b => {
        b.classList.toggle('active', b.dataset.lmode === mode);
      });

      if (mode === 'libre') {
        // 무작위 10개
        this.numbers = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100) + 1);
      } else {
        const [, max] = mode.split('-').map(Number);
        this.numbers = Array.from({ length: max }, (_, i) => i + 1);
      }
      this.idx = 0;
      this._renderGrid();
      this._show();
    },

    _show() {
      const n = this.numbers[this.idx];
      const word = Speech.getWord(n);

      // 큰 숫자
      const numEl = document.getElementById('leer-number');
      numEl.textContent = n;
      numEl.style.transform = 'scale(1)';
      numEl.animate([
        { transform: 'scale(0.7)', opacity: 0 },
        { transform: 'scale(1.05)', opacity: 1 },
        { transform: 'scale(1)', opacity: 1 }
      ], { duration: 300, easing: 'ease-out' });

      // 단어 (글자별 애니메이션)
      const wordEl = document.getElementById('leer-word');
      wordEl.innerHTML = word.split('').map((ch, i) =>
        `<span class="letter" style="animation-delay:${i * 0.05}s">${ch}</span>`
      ).join('');

      // 카운터
      document.getElementById('leer-counter').textContent =
        `${this.idx + 1} / ${this.numbers.length}`;

      // 그리드 하이라이트
      document.querySelectorAll('.leer-mini-num').forEach(el => {
        el.style.borderColor = Number(el.dataset.n) === n ? 'var(--coral)' : 'transparent';
        el.style.background  = Number(el.dataset.n) === n ? 'var(--coral-light)' : '#fff';
      });

      // 자동 읽기
      this._speak();
    },

    _speak() {
      if (!Speech.isSupported()) return;
      const n = this.numbers[this.idx];
      const btn = document.getElementById('leer-speak-btn');
      btn.classList.add('speaking');
      btn.textContent = '🔊 Leyendo...';
      const utt = Speech.sayNumber(n, { rate: 0.8, pitch: 1.15 });
      if (utt) {
        utt.onend = () => {
          btn.classList.remove('speaking');
          btn.textContent = '🔊 Escuchar';
        };
      } else {
        setTimeout(() => {
          btn.classList.remove('speaking');
          btn.textContent = '🔊 Escuchar';
        }, 1200);
      }
    },

    _renderGrid() {
      const grid = document.getElementById('leer-grid');
      grid.innerHTML = '';
      this.numbers.forEach(n => {
        const cell = document.createElement('div');
        cell.className = 'leer-mini-num';
        cell.dataset.n = n;
        cell.innerHTML = `
          <div class="mini-n">${n}</div>
          <div class="mini-w">${Speech.getWord(n)}</div>
        `;
        cell.addEventListener('click', () => {
          this.idx = this.numbers.indexOf(n);
          this._show();
          Sounds.click && Sounds.click();
        });
        grid.appendChild(cell);
      });
    },

    _bindEvents() {
      // 숫자 클릭 → 읽기
      document.getElementById('leer-number')?.addEventListener('click', () => this._speak());

      // 읽기 버튼
      document.getElementById('leer-speak-btn')?.addEventListener('click', () => this._speak());

      // 이전 / 다음
      document.getElementById('leer-prev')?.addEventListener('click', () => {
        this.idx = (this.idx - 1 + this.numbers.length) % this.numbers.length;
        this._show();
        Sounds.click && Sounds.click();
      });
      document.getElementById('leer-next')?.addEventListener('click', () => {
        this.idx = (this.idx + 1) % this.numbers.length;
        this._show();
        Sounds.click && Sounds.click();
      });

      // 키보드 지원
      document.addEventListener('keydown', e => {
        if (document.getElementById('tab-leer').style.display === 'none') return;
        if (e.key === 'ArrowRight') document.getElementById('leer-next').click();
        if (e.key === 'ArrowLeft')  document.getElementById('leer-prev').click();
        if (e.key === ' ') { e.preventDefault(); this._speak(); }
      });

      // 모드 버튼
      document.querySelectorAll('.leer-mode-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          Sounds.click && Sounds.click();
          this.setMode(btn.dataset.lmode);
        });
      });
    },
  };

  /* ─── TAB SWITCHING ─────────────────────────────────────── */
  const TABS = { count: COUNT, compare: CMP, leer: LEER, quiz: QUIZ };
  let activeTab = 'count';

  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      Sounds.click();
      const tab = btn.dataset.tab;
      if (tab === activeTab) return;
      activeTab = tab;

      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      document.querySelectorAll('.tab-content').forEach(el => el.style.display = 'none');
      document.getElementById('tab-' + tab).style.display = '';

      TABS[tab].init();
    });
  });

  // Start first tab
  COUNT.init();
})();
