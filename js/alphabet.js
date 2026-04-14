/**
 * alphabet.js — Latidos Niños English
 * Three tabs: Learn (Aprende) / Memory (Memoria) / Quiz
 */

(function () {
  App.initPage('alphabet');

  /* ═══════════════════════════════════════════════════
     ALPHABET DATA
  ═══════════════════════════════════════════════════ */
  const ALPHA = [
    { L:'A', l:'a', word:'Apple',    emoji:'🍎', phrase:'A is for Apple' },
    { L:'B', l:'b', word:'Ball',     emoji:'⚽', phrase:'B is for Ball' },
    { L:'C', l:'c', word:'Cat',      emoji:'🐱', phrase:'C is for Cat' },
    { L:'D', l:'d', word:'Dog',      emoji:'🐶', phrase:'D is for Dog' },
    { L:'E', l:'e', word:'Elephant', emoji:'🐘', phrase:'E is for Elephant' },
    { L:'F', l:'f', word:'Fish',     emoji:'🐟', phrase:'F is for Fish' },
    { L:'G', l:'g', word:'Grape',    emoji:'🍇', phrase:'G is for Grape' },
    { L:'H', l:'h', word:'Hat',      emoji:'🎩', phrase:'H is for Hat' },
    { L:'I', l:'i', word:'Ice cream',emoji:'🍦', phrase:'I is for Ice cream' },
    { L:'J', l:'j', word:'Juice',    emoji:'🧃', phrase:'J is for Juice' },
    { L:'K', l:'k', word:'Kite',     emoji:'🪁', phrase:'K is for Kite' },
    { L:'L', l:'l', word:'Lion',     emoji:'🦁', phrase:'L is for Lion' },
    { L:'M', l:'m', word:'Monkey',   emoji:'🐒', phrase:'M is for Monkey' },
    { L:'N', l:'n', word:'Nose',     emoji:'👃', phrase:'N is for Nose' },
    { L:'O', l:'o', word:'Orange',   emoji:'🍊', phrase:'O is for Orange' },
    { L:'P', l:'p', word:'Pizza',    emoji:'🍕', phrase:'P is for Pizza' },
    { L:'Q', l:'q', word:'Queen',    emoji:'👸', phrase:'Q is for Queen' },
    { L:'R', l:'r', word:'Rain',     emoji:'🌧️', phrase:'R is for Rain' },
    { L:'S', l:'s', word:'Sun',      emoji:'☀️', phrase:'S is for Sun' },
    { L:'T', l:'t', word:'Tree',     emoji:'🌳', phrase:'T is for Tree' },
    { L:'U', l:'u', word:'Umbrella', emoji:'☂️', phrase:'U is for Umbrella' },
    { L:'V', l:'v', word:'Violin',   emoji:'🎻', phrase:'V is for Violin' },
    { L:'W', l:'w', word:'Water',    emoji:'💧', phrase:'W is for Water' },
    { L:'X', l:'x', word:'X-ray',    emoji:'🩻', phrase:'X is for X-ray' },
    { L:'Y', l:'y', word:'Yo-yo',    emoji:'🪀', phrase:'Y is for Yo-yo' },
    { L:'Z', l:'z', word:'Zebra',    emoji:'🦓', phrase:'Z is for Zebra' },
  ];

  /* ─── Utilities ─────────────────────────────────── */
  function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function randPick(arr, n) {
    return shuffle(arr).slice(0, n);
  }

  /* ═══════════════════════════════════════════════════
     TAB 1: LEARN (카드 플리퍼)
  ═══════════════════════════════════════════════════ */
  const LEARN = {
    idx: 0,
    group: 'A-E',   // 현재 그룹

    groups: {
      'A-E':  ALPHA.slice(0, 5),
      'F-J':  ALPHA.slice(5, 10),
      'K-O':  ALPHA.slice(10, 15),
      'P-T':  ALPHA.slice(15, 20),
      'U-Z':  ALPHA.slice(20, 26),
    },

    items() { return this.groups[this.group]; },

    init() {
      this.idx = 0;
      this._renderGroupBtns();
      this._show();
      this._bindEvents();
    },

    _renderGroupBtns() {
      const wrap = document.getElementById('learn-group-btns');
      if (!wrap) return;
      wrap.innerHTML = '';
      Object.keys(this.groups).forEach(key => {
        const btn = document.createElement('button');
        btn.className = 'leer-mode-btn' + (key === this.group ? ' active' : '');
        btn.textContent = key;
        btn.dataset.group = key;
        btn.onclick = () => {
          this.group = key;
          this.idx   = 0;
          this._renderGroupBtns();
          this._show();
          if (Speech.isSupported()) Speech.sayLetter(this.items()[0].L);
        };
        wrap.appendChild(btn);
      });
    },

    _show() {
      const item = this.items()[this.idx];
      if (!item) return;

      // 대문자
      const bigEl = document.getElementById('learn-big');
      if (bigEl) {
        bigEl.textContent = item.L;
        bigEl.animate(
          [{ transform:'scale(0.7)', opacity:0 }, { transform:'scale(1.05)', opacity:1 }, { transform:'scale(1)', opacity:1 }],
          { duration: 280, easing:'ease-out' }
        );
      }
      // 소문자
      const smEl = document.getElementById('learn-small');
      if (smEl) smEl.textContent = item.l;

      // 이모지
      const emEl = document.getElementById('learn-emoji');
      if (emEl) {
        emEl.textContent = item.emoji;
        emEl.animate(
          [{ transform:'scale(0) rotate(-20deg)', opacity:0 }, { transform:'scale(1.2) rotate(5deg)', opacity:1 }, { transform:'scale(1) rotate(0)', opacity:1 }],
          { duration:350, easing:'ease-out' }
        );
      }
      // 단어
      const wdEl = document.getElementById('learn-word');
      if (wdEl) wdEl.textContent = item.word;

      // 카운터
      const ctr = document.getElementById('learn-counter');
      if (ctr) ctr.textContent = `${this.idx + 1} / ${this.items().length}`;

      // 그리드 하이라이트
      document.querySelectorAll('.learn-mini').forEach(el => {
        const active = el.dataset.i == this.idx;
        el.style.borderColor  = active ? 'var(--coral)' : 'transparent';
        el.style.background   = active ? 'var(--coral-light)' : '#fff';
      });

      // 자동 음성
      if (Speech.isSupported()) Speech.sayEnglish(item.phrase, { rate: 0.78 });
    },

    _renderMiniGrid() {
      const grid = document.getElementById('learn-mini-grid');
      if (!grid) return;
      grid.innerHTML = '';
      this.items().forEach((item, i) => {
        const el = document.createElement('div');
        el.className = 'learn-mini';
        el.dataset.i = i;
        el.innerHTML = `<div style="font-size:1.5rem;font-weight:900;color:var(--coral);">${item.L}</div>
                        <div style="font-size:1.6rem;">${item.emoji}</div>
                        <div style="font-size:0.65rem;color:var(--text-mid);font-weight:700;">${item.word}</div>`;
        el.style.cssText = 'background:#fff;border-radius:12px;padding:10px 6px;text-align:center;cursor:pointer;border:2.5px solid transparent;transition:all 0.2s;box-shadow:0 2px 8px rgba(0,0,0,0.07);';
        el.onclick = () => { this.idx = i; this._show(); };
        grid.appendChild(el);
      });
    },

    _bindEvents() {
      const prev = () => {
        this.idx = (this.idx - 1 + this.items().length) % this.items().length;
        this._show();
      };
      const next = () => {
        this.idx = (this.idx + 1) % this.items().length;
        this._show();
      };
      const speak = () => {
        const item = this.items()[this.idx];
        if (Speech.isSupported()) Speech.sayEnglish(item.phrase, { rate: 0.75 });
      };

      const prevEl  = document.getElementById('learn-prev');
      const nextEl  = document.getElementById('learn-next');
      const speakEl = document.getElementById('learn-speak');
      const bigEl   = document.getElementById('learn-big');

      if (prevEl)  prevEl.onclick  = prev;
      if (nextEl)  nextEl.onclick  = next;
      if (speakEl) speakEl.onclick = speak;
      if (bigEl)   bigEl.onclick   = speak;

      this._renderMiniGrid();
    },
  };

  /* ═══════════════════════════════════════════════════
     TAB 2: MEMORY MATCH (대문자 ↔ 소문자)
  ═══════════════════════════════════════════════════ */
  const MEMORY = {
    group: 'A-E',
    pairs: 0, moves: 0, flipped: [], locked: false,

    groups: {
      'A-E': ALPHA.slice(0,5),
      'F-J': ALPHA.slice(5,10),
      'K-O': ALPHA.slice(10,15),
      'P-T': ALPHA.slice(15,20),
      'U-Z': ALPHA.slice(20,26),
    },

    items() { return this.groups[this.group]; },

    init() {
      this._renderGroupBtns();
      this._startGame();
      this._bindEvents();
    },

    _renderGroupBtns() {
      const wrap = document.getElementById('mem-group-btns');
      if (!wrap) return;
      wrap.innerHTML = '';
      Object.keys(this.groups).forEach(key => {
        const btn = document.createElement('button');
        btn.className = 'leer-mode-btn' + (key === this.group ? ' active' : '');
        btn.textContent = key;
        btn.onclick = () => {
          this.group = key;
          this._renderGroupBtns();
          this._startGame();
        };
        wrap.appendChild(btn);
      });
    },

    _startGame() {
      this.pairs  = 0; this.moves = 0;
      this.flipped = []; this.locked = false;
      const done = document.getElementById('mem-complete');
      if (done) done.style.display = 'none';
      this._updateStats();
      this._buildGrid();
    },

    _updateStats() {
      const n = this.items().length;
      const movEl = document.getElementById('mem-moves');
      const pairEl = document.getElementById('mem-pairs');
      if (movEl)  movEl.textContent  = `🃏 ${this.moves} tries`;
      if (pairEl) pairEl.textContent = `⭐ ${this.pairs} / ${n} pairs`;
    },

    _buildGrid() {
      const items = this.items();
      // 카드 쌍: 대문자 카드 + 소문자 카드
      const cards = [];
      items.forEach(a => {
        cards.push({ pair: a.L, type: 'upper', display: a.L,   emoji: a.emoji });
        cards.push({ pair: a.L, type: 'lower', display: a.l,   emoji: a.emoji });
      });
      const shuffled = shuffle(cards);

      const grid = document.getElementById('mem-grid');
      if (!grid) return;
      grid.innerHTML = '';
      // 카드 수에 따라 컬럼 조정
      const cols = items.length <= 5 ? 5 : 5;
      grid.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;

      shuffled.forEach((c, idx) => {
        const el = document.createElement('div');
        el.className = 'mc';
        el.dataset.pair = c.pair;
        el.dataset.type = c.type;

        const frontColor = 'linear-gradient(135deg, var(--coral), #FF9F43)';
        const backColor  = c.type === 'upper'
          ? 'linear-gradient(135deg, #fff 0%, var(--coral-light) 100%)'
          : 'linear-gradient(135deg, #fff 0%, var(--blue-light) 100%)';
        const textColor  = c.type === 'upper' ? 'var(--coral)' : 'var(--blue-dark)';
        const border     = c.type === 'upper' ? 'var(--coral-light)' : 'var(--blue-light)';

        el.innerHTML = `
          <div class="mc-inner">
            <div class="mc-front" style="background:${frontColor}; color:rgba(255,255,255,0.7); font-size:1.8rem; font-weight:900;">?</div>
            <div class="mc-back" style="transform:rotateY(180deg); background:${backColor}; border:2.5px solid ${border}; color:${textColor}; font-size:clamp(1.6rem,4vw,2.4rem); font-weight:900; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:2px; border-radius:var(--radius-md);">
              <span>${c.display}</span>
              <span style="font-size:0.9rem;">${c.type === 'lower' ? c.emoji : ''}</span>
            </div>
          </div>`;
        el.style.animationDelay = (idx * 0.04) + 's';
        el.addEventListener('click', () => this._onCardClick(el, c));
        grid.appendChild(el);
      });
    },

    _onCardClick(el, c) {
      if (this.locked) return;
      if (el.classList.contains('matched')) return;
      if (this.flipped.includes(el)) return;

      el.classList.add('flipped');
      this.flipped.push(el);
      if (Speech.isSupported()) Speech.sayLetter(c.pair);

      if (this.flipped.length === 2) {
        this.moves++;
        this._updateStats();
        this._checkMatch();
      }
    },

    _checkMatch() {
      const [c1, c2] = this.flipped;
      const samePair = c1.dataset.pair === c2.dataset.pair;
      const diffType = c1.dataset.type !== c2.dataset.type;

      if (samePair && diffType) {
        c1.classList.add('matched'); c2.classList.add('matched');
        this.pairs++;
        this._updateStats();
        this.flipped = [];
        if (Speech.isSupported()) {
          const item = ALPHA.find(a => a.L === c1.dataset.pair);
          if (item) Speech.sayEnglish(item.phrase, { rate: 0.78 });
        }
        if (this.pairs === this.items().length) {
          setTimeout(() => this._showComplete(), 500);
        }
      } else {
        this.locked = true;
        c1.classList.add('wrong'); c2.classList.add('wrong');
        setTimeout(() => {
          c1.classList.remove('flipped','wrong');
          c2.classList.remove('flipped','wrong');
          this.flipped = []; this.locked = false;
        }, 900);
      }
    },

    _showComplete() {
      const el = document.getElementById('mem-complete');
      const mv = document.getElementById('mem-complete-moves');
      if (mv) mv.textContent = this.moves;
      if (el) el.style.display = 'block';
      App.launchConfetti(40);
      const { leveledUp, newLevel } = App.addHearts(15);
      if (leveledUp) App.showToast(`🎉 ¡Nivel ${newLevel}!`);
    },

    _bindEvents() {
      document.getElementById('mem-restart')?.addEventListener('click', () => this._startGame());
      document.getElementById('mem-next-group')?.addEventListener('click', () => {
        const keys  = Object.keys(this.groups);
        const next  = keys[(keys.indexOf(this.group) + 1) % keys.length];
        this.group  = next;
        this._renderGroupBtns();
        this._startGame();
      });
    },
  };

  /* ═══════════════════════════════════════════════════
     TAB 3: QUIZ (대문자 보고 소문자 고르기)
  ═══════════════════════════════════════════════════ */
  const QUIZ = {
    gs: null, correct: null,
    _total: 10, _pool: [],

    init() { this._start(); },

    _start() {
      this._pool = shuffle(ALPHA);
      this.gs = { score:0, lives:3, q:0, total: this._total };
      this._updateUI();
      this._nextQ();
    },

    _updateUI() {
      const g = this.gs;
      const sc = document.getElementById('quiz-score');
      const lv = document.getElementById('quiz-lives');
      const qn = document.getElementById('quiz-q');
      const pr = document.getElementById('quiz-progress');
      if (sc) sc.textContent = g.score;
      if (lv) lv.textContent = '💖'.repeat(g.lives);
      if (qn) qn.textContent = g.q + 1;
      if (pr) pr.style.width = (g.q / g.total * 100) + '%';
    },

    _nextQ() {
      const g = this.gs;
      if (g.q >= g.total) { this._endGame(); return; }

      // 정답
      this.correct = this._pool[g.q % this._pool.length];

      // 대문자 카드 표시
      const bigEl = document.getElementById('quiz-letter');
      if (bigEl) {
        bigEl.textContent = this.correct.L;
        bigEl.animate(
          [{ transform:'scale(0.5)', opacity:0 }, { transform:'scale(1.1)', opacity:1 }, { transform:'scale(1)', opacity:1 }],
          { duration:300, easing:'ease-out' }
        );
      }
      const emojiEl = document.getElementById('quiz-emoji');
      if (emojiEl) emojiEl.textContent = this.correct.emoji;

      // 음성
      if (Speech.isSupported()) Speech.sayLetter(this.correct.L, { rate:0.7 });

      // 보기 4개: 소문자 버튼
      const wrongItems = shuffle(ALPHA.filter(a => a.L !== this.correct.L)).slice(0, 3);
      const options    = shuffle([this.correct, ...wrongItems]);

      const grid = document.getElementById('quiz-options');
      if (!grid) return;
      grid.innerHTML = '';

      options.forEach(item => {
        const btn = document.createElement('button');
        btn.className = 'answer-btn';
        btn.style.fontSize = 'clamp(2rem,6vw,3rem)';
        btn.textContent = item.l;
        btn.onclick = () => this._answer(btn, item);
        grid.appendChild(btn);
      });
    },

    _answer(btn, chosen) {
      document.querySelectorAll('#quiz-options .answer-btn').forEach(b => b.onclick = null);
      const ok = chosen.L === this.correct.L;
      btn.classList.add(ok ? 'correct' : 'wrong');

      if (!ok) {
        document.querySelectorAll('#quiz-options .answer-btn').forEach(b => {
          if (b.textContent === this.correct.l) b.classList.add('correct');
        });
      }

      if (Speech.isSupported()) Speech.sayEnglish(this.correct.phrase, { rate: 0.78 });

      const g = this.gs;
      if (ok) { g.score++; }
      else    { g.lives = Math.max(0, g.lives - 1); }

      if (g.lives === 0) {
        setTimeout(() => this._endGame(), 900);
        return;
      }
      g.q++;
      this._updateUI();
      setTimeout(() => this._nextQ(), 1100);
    },

    _endGame() {
      const g = this.gs;
      const stars = g.lives === 3 ? 3 : g.lives >= 1 ? 2 : g.score >= 5 ? 1 : 0;
      const hearts = g.score * 3;
      App.setStars('alphabet', stars);
      const { leveledUp, newLevel } = App.addHearts(hearts);
      if (g.score >= 8) App.addBadge('alpha_master');
      App.launchConfetti(50);
      App.showModal({
        emoji: stars === 3 ? '🌟' : stars >= 1 ? '😊' : '💪',
        title: stars === 3 ? '¡Perfecto!' : stars >= 1 ? '¡Bien hecho!' : '¡Sigue intentando!',
        message: `${g.score} of ${g.total} correct!`,
        stars, heartsEarned: hearts,
        onNext: () => this._start(),
      });
      if (leveledUp) {
        App.showToast(`🎉 Level ${newLevel}!`);
      }
    },
  };

  /* ─── TAB SWITCHING ──────────────────────────────────────── */
  const TABS = { learn: LEARN, memory: MEMORY, quiz: QUIZ };
  let activeTab = 'learn';

  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const tab = btn.dataset.tab;
      if (tab === activeTab) return;
      activeTab = tab;
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      document.querySelectorAll('.tab-content').forEach(el => el.style.display = 'none');
      document.querySelector('[data-tab-panel="' + tab + '"]').style.display = '';
      TABS[tab].init();
    });
  });

  // 시작
  LEARN.init();

})();
