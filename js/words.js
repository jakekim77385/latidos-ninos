/**
 * words.js — Latidos Niños English
 * Categories: Colors / Animals / Food / Family / Body / Numbers / School / Weather / Actions
 * Tabs: Learn / Memory / Quiz
 */

(function () {
  App.initPage('words');

  /* ═══════════════════════════════════════════════════
     WORD DATA
  ═══════════════════════════════════════════════════ */
  const CATEGORIES = {
    colors: {
      label: '🎨 Colors',
      color: 'coral',
      items: [
        { word:'Red',       es:'Rojo',      emoji:'🔴' },
        { word:'Blue',      es:'Azul',      emoji:'🔵' },
        { word:'Green',     es:'Verde',     emoji:'🟢' },
        { word:'Yellow',    es:'Amarillo',  emoji:'🟡' },
        { word:'Orange',    es:'Naranja',   emoji:'🟠' },
        { word:'Purple',    es:'Morado',    emoji:'🟣' },
        { word:'Pink',      es:'Rosado',    emoji:'🩷' },
        { word:'White',     es:'Blanco',    emoji:'⬜' },
        { word:'Black',     es:'Negro',     emoji:'⬛' },
        { word:'Brown',     es:'Marrón',    emoji:'🟫' },
        { word:'Gray',      es:'Gris',      emoji:'🩶' },
        { word:'Gold',      es:'Dorado',    emoji:'🌟' },
      ]
    },
    animals: {
      label: '🐾 Animals',
      color: 'green',
      items: [
        { word:'Dog',       es:'Perro',     emoji:'🐶' },
        { word:'Cat',       es:'Gato',      emoji:'🐱' },
        { word:'Bird',      es:'Pájaro',    emoji:'🐦' },
        { word:'Fish',      es:'Pez',       emoji:'🐟' },
        { word:'Lion',      es:'León',      emoji:'🦁' },
        { word:'Elephant',  es:'Elefante',  emoji:'🐘' },
        { word:'Monkey',    es:'Mono',      emoji:'🐒' },
        { word:'Rabbit',    es:'Conejo',    emoji:'🐰' },
        { word:'Cow',       es:'Vaca',      emoji:'🐄' },
        { word:'Horse',     es:'Caballo',   emoji:'🐴' },
        { word:'Tiger',     es:'Tigre',     emoji:'🐯' },
        { word:'Bear',      es:'Oso',       emoji:'🐻' },
        { word:'Zebra',     es:'Cebra',     emoji:'🦓' },
        { word:'Giraffe',   es:'Jirafa',    emoji:'🦒' },
        { word:'Penguin',   es:'Pingüino',  emoji:'🐧' },
      ]
    },
    food: {
      label: '🍎 Food',
      color: 'yellow',
      items: [
        { word:'Apple',      es:'Manzana',   emoji:'🍎' },
        { word:'Banana',     es:'Banana',    emoji:'🍌' },
        { word:'Rice',       es:'Arroz',     emoji:'🍚' },
        { word:'Milk',       es:'Leche',     emoji:'🥛' },
        { word:'Bread',      es:'Pan',       emoji:'🍞' },
        { word:'Egg',        es:'Huevo',     emoji:'🥚' },
        { word:'Water',      es:'Agua',      emoji:'💧' },
        { word:'Juice',      es:'Jugo',      emoji:'🧃' },
        { word:'Pizza',      es:'Pizza',     emoji:'🍕' },
        { word:'Ice cream',  es:'Helado',    emoji:'🍦' },
        { word:'Chicken',    es:'Pollo',     emoji:'🍗' },
        { word:'Soup',       es:'Sopa',      emoji:'🍜' },
        { word:'Cake',       es:'Pastel',    emoji:'🎂' },
        { word:'Cookie',     es:'Galleta',   emoji:'🍪' },
        { word:'Strawberry', es:'Fresa',     emoji:'🍓' },
      ]
    },
    family: {
      label: '👨‍👩‍👧 Family',
      color: 'purple',
      items: [
        { word:'Mom',       es:'Mamá',       emoji:'👩' },
        { word:'Dad',       es:'Papá',       emoji:'👨' },
        { word:'Sister',    es:'Hermana',    emoji:'👧' },
        { word:'Brother',   es:'Hermano',    emoji:'👦' },
        { word:'Baby',      es:'Bebé',       emoji:'👶' },
        { word:'Family',    es:'Familia',    emoji:'👨‍👩‍👧‍👦' },
        { word:'Grandma',   es:'Abuela',     emoji:'👵' },
        { word:'Grandpa',   es:'Abuelo',     emoji:'👴' },
        { word:'Uncle',     es:'Tío',        emoji:'👱' },
        { word:'Aunt',      es:'Tía',        emoji:'👩‍🦰' },
        { word:'Friend',    es:'Amigo',      emoji:'🤝' },
        { word:'Teacher',   es:'Maestra',    emoji:'👩‍🏫' },
      ]
    },
    body: {
      label: '🫀 Body',
      color: 'blue',
      items: [
        { word:'Head',      es:'Cabeza',     emoji:'🗣️' },
        { word:'Eyes',      es:'Ojos',       emoji:'👀' },
        { word:'Nose',      es:'Nariz',      emoji:'👃' },
        { word:'Mouth',     es:'Boca',       emoji:'👄' },
        { word:'Ears',      es:'Orejas',     emoji:'👂' },
        { word:'Hands',     es:'Manos',      emoji:'🙌' },
        { word:'Feet',      es:'Pies',       emoji:'🦶' },
        { word:'Heart',     es:'Corazón',    emoji:'❤️' },
        { word:'Legs',      es:'Piernas',    emoji:'🦵' },
        { word:'Arms',      es:'Brazos',     emoji:'💪' },
        { word:'Hair',      es:'Cabello',    emoji:'💇' },
        { word:'Teeth',     es:'Dientes',    emoji:'🦷' },
      ]
    },
    numbers: {
      label: '🔢 Numbers',
      color: 'orange',
      items: [
        { word:'One',       es:'Uno',        emoji:'1️⃣' },
        { word:'Two',       es:'Dos',        emoji:'2️⃣' },
        { word:'Three',     es:'Tres',       emoji:'3️⃣' },
        { word:'Four',      es:'Cuatro',     emoji:'4️⃣' },
        { word:'Five',      es:'Cinco',      emoji:'5️⃣' },
        { word:'Six',       es:'Seis',       emoji:'6️⃣' },
        { word:'Seven',     es:'Siete',      emoji:'7️⃣' },
        { word:'Eight',     es:'Ocho',       emoji:'8️⃣' },
        { word:'Nine',      es:'Nueve',      emoji:'9️⃣' },
        { word:'Ten',       es:'Diez',       emoji:'🔟' },
        { word:'Eleven',    es:'Once',       emoji:'🔢' },
        { word:'Twelve',    es:'Doce',       emoji:'🎰' },
        { word:'Twenty',    es:'Veinte',     emoji:'💯' },
        { word:'Hundred',   es:'Cien',       emoji:'🏆' },
      ]
    },
    school: {
      label: '🏫 School',
      color: 'blue',
      items: [
        { word:'Pencil',    es:'Lápiz',      emoji:'✏️' },
        { word:'Pen',       es:'Bolígrafo',  emoji:'🖊️' },
        { word:'Book',      es:'Libro',      emoji:'📚' },
        { word:'Backpack',  es:'Mochila',    emoji:'🎒' },
        { word:'Notebook',  es:'Cuaderno',   emoji:'📓' },
        { word:'Eraser',    es:'Borrador',   emoji:'🩹' },
        { word:'Ruler',     es:'Regla',      emoji:'📏' },
        { word:'Scissors',  es:'Tijeras',    emoji:'✂️' },
        { word:'Glue',      es:'Pegamento',  emoji:'🫧' },
        { word:'Desk',      es:'Escritorio', emoji:'🪑' },
        { word:'Classroom', es:'Salón',      emoji:'🏫' },
        { word:'Board',     es:'Pizarrón',   emoji:'📋' },
      ]
    },
    weather: {
      label: '⛅ Weather',
      color: 'blue',
      items: [
        { word:'Sunny',     es:'Soleado',    emoji:'☀️' },
        { word:'Rainy',     es:'Lluvioso',   emoji:'🌧️' },
        { word:'Cloudy',    es:'Nublado',    emoji:'☁️' },
        { word:'Windy',     es:'Ventoso',    emoji:'💨' },
        { word:'Hot',       es:'Caliente',   emoji:'🔥' },
        { word:'Cold',      es:'Frío',       emoji:'🥶' },
        { word:'Warm',      es:'Cálido',     emoji:'🌤️' },
        { word:'Storm',     es:'Tormenta',   emoji:'⛈️' },
        { word:'Rainbow',   es:'Arcoíris',   emoji:'🌈' },
        { word:'Snow',      es:'Nieve',      emoji:'❄️' },
        { word:'Fog',       es:'Niebla',     emoji:'🌫️' },
        { word:'Thunder',   es:'Trueno',     emoji:'⚡' },
      ]
    },
    actions: {
      label: '🏃 Actions',
      color: 'green',
      items: [
        { word:'Run',       es:'Correr',     emoji:'🏃' },
        { word:'Jump',      es:'Saltar',     emoji:'🦘' },
        { word:'Swim',      es:'Nadar',      emoji:'🏊' },
        { word:'Dance',     es:'Bailar',     emoji:'💃' },
        { word:'Sing',      es:'Cantar',     emoji:'🎤' },
        { word:'Read',      es:'Leer',       emoji:'📖' },
        { word:'Write',     es:'Escribir',   emoji:'✍️' },
        { word:'Draw',      es:'Dibujar',    emoji:'🎨' },
        { word:'Play',      es:'Jugar',      emoji:'🎮' },
        { word:'Sleep',     es:'Dormir',     emoji:'😴' },
        { word:'Eat',       es:'Comer',      emoji:'🍽️' },
        { word:'Drink',     es:'Beber',      emoji:'🥤' },
      ]
    },
  };

  /* ─── Utilities ─────────────────────────────────── */
  function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  /* ─── State ────────────────────────────────────── */
  let currentCat = 'colors';
  let currentTab = 'learn';

  /* ═══════════════════════════════════════════════════
     CATEGORY SELECTOR
  ═══════════════════════════════════════════════════ */
  function renderCatSelector(activeTabId) {
    const wrap = document.getElementById('cat-selector');
    if (!wrap) return;
    wrap.innerHTML = '';
    Object.entries(CATEGORIES).forEach(([key, cat]) => {
      const btn = document.createElement('button');
      btn.className = 'cat-btn' + (key === currentCat ? ' active' : '');
      btn.dataset.cat = key;
      btn.innerHTML = `<span>${cat.label}</span>`;
      btn.onclick = () => {
        currentCat = key;
        renderCatSelector(activeTabId);
        if (activeTabId === 'learn')  LEARN.init();
        if (activeTabId === 'memory') MEMORY.init();
        if (activeTabId === 'quiz')   QUIZ.init();
      };
      wrap.appendChild(btn);
    });
  }

  /* ═══════════════════════════════════════════════════
     TAB 1: LEARN
  ═══════════════════════════════════════════════════ */
  const LEARN = {
    idx: 0,

    items() { return CATEGORIES[currentCat].items; },

    init() {
      this.idx = 0;
      this._show();
      this._renderGrid();
    },

    _show() {
      const item = this.items()[this.idx];
      if (!item) return;

      const emojiEl = document.getElementById('learn-emoji');
      const wordEl  = document.getElementById('learn-word');
      const esEl    = document.getElementById('learn-es');
      const ctrEl   = document.getElementById('learn-counter');

      if (emojiEl) {
        emojiEl.textContent = item.emoji;
        emojiEl.animate(
          [{ transform:'scale(0) rotate(-15deg)', opacity:0 }, { transform:'scale(1.15) rotate(5deg)', opacity:1 }, { transform:'scale(1) rotate(0)', opacity:1 }],
          { duration: 320, easing:'ease-out' }
        );
      }
      if (wordEl) {
        wordEl.textContent = item.word;
        wordEl.animate(
          [{ transform:'translateY(12px)', opacity:0 }, { transform:'translateY(0)', opacity:1 }],
          { duration:280, easing:'ease-out' }
        );
      }
      if (esEl) esEl.textContent = item.es;
      if (ctrEl) ctrEl.textContent = `${this.idx + 1} / ${this.items().length}`;

      document.querySelectorAll('.word-mini').forEach((el, i) => {
        el.style.borderColor = i === this.idx ? 'var(--coral)' : 'transparent';
        el.style.background  = i === this.idx ? 'var(--coral-light)' : '#fff';
      });

      if (Speech.isSupported()) Speech.sayEnglish(item.word, { rate: 0.78 });
    },

    _renderGrid() {
      const grid = document.getElementById('learn-word-grid');
      if (!grid) return;
      grid.innerHTML = '';
      this.items().forEach((item, i) => {
        const el = document.createElement('div');
        el.className = 'word-mini';
        el.innerHTML = `<span style="font-size:1.8rem;">${item.emoji}</span>
                        <span style="font-size:0.72rem;font-weight:800;color:var(--text-dark);">${item.word}</span>`;
        el.style.cssText = 'background:#fff;border-radius:12px;padding:10px 6px;text-align:center;cursor:pointer;border:2.5px solid transparent;transition:all 0.2s;box-shadow:0 2px 8px rgba(0,0,0,0.07);display:flex;flex-direction:column;align-items:center;gap:4px;';
        el.onclick = () => { this.idx = i; this._show(); };
        grid.appendChild(el);
      });
    },

    prev() { this.idx = (this.idx - 1 + this.items().length) % this.items().length; this._show(); },
    next() { this.idx = (this.idx + 1) % this.items().length; this._show(); },
    speak() {
      const item = this.items()[this.idx];
      if (Speech.isSupported()) Speech.sayEnglish(item.word, { rate: 0.75 });
    },
  };

  document.getElementById('learn-prev')?.addEventListener('click', () => LEARN.prev());
  document.getElementById('learn-next')?.addEventListener('click', () => LEARN.next());
  document.getElementById('learn-speak')?.addEventListener('click', () => LEARN.speak());

  /* ═══════════════════════════════════════════════════
     TAB 2: MEMORY (emoji ↔ word) — 최대 8쌍
  ═══════════════════════════════════════════════════ */
  const MEMORY = {
    pairs: 0, moves: 0, flipped: [], locked: false,

    items() { return CATEGORIES[currentCat].items.slice(0, 8); },

    init() {
      this.pairs=0; this.moves=0; this.flipped=[]; this.locked=false;
      document.getElementById('wm-complete') && (document.getElementById('wm-complete').style.display='none');
      this._updateStats();
      this._buildGrid();
    },

    _updateStats() {
      const n = this.items().length;
      const mv = document.getElementById('wm-moves');
      const pr = document.getElementById('wm-pairs');
      if (mv) mv.textContent = `🃏 ${this.moves} tries`;
      if (pr) pr.textContent = `⭐ ${this.pairs} / ${n} pairs`;
    },

    _buildGrid() {
      const items = this.items();
      const cards = [];
      items.forEach(it => {
        cards.push({ id: it.word, type:'emoji', display: it.emoji, word: it.word });
        cards.push({ id: it.word, type:'text',  display: it.word,  word: it.word });
      });
      const shuffled = shuffle(cards);

      const grid = document.getElementById('wm-grid');
      if (!grid) return;
      grid.innerHTML = '';
      grid.style.gridTemplateColumns = 'repeat(4, 1fr)';

      shuffled.forEach((c, idx) => {
        const el = document.createElement('div');
        el.className = 'mc';
        el.dataset.id   = c.id;
        el.dataset.type = c.type;

        const isEmoji = c.type === 'emoji';
        const backBg  = isEmoji
          ? 'linear-gradient(135deg,#fff 0%,var(--coral-light) 100%)'
          : 'linear-gradient(135deg,#fff 0%,var(--green-light) 100%)';
        const backBorder = isEmoji ? 'var(--coral-light)' : 'var(--green-light)';
        const fontSize   = isEmoji ? 'clamp(1.6rem,4vw,2.4rem)' : 'clamp(0.75rem,2.5vw,1.05rem)';
        const color      = isEmoji ? 'var(--coral)' : 'var(--green-dark)';

        el.innerHTML = `
          <div class="mc-inner">
            <div class="mc-front" style="background:linear-gradient(135deg,var(--coral),#FF9F43);color:rgba(255,255,255,0.7);font-size:1.8rem;font-weight:900;border-radius:var(--radius-md);position:absolute;inset:0;display:flex;align-items:center;justify-content:center;backface-visibility:hidden;">?</div>
            <div class="mc-back" style="transform:rotateY(180deg);background:${backBg};border:2.5px solid ${backBorder};color:${color};font-size:${fontSize};font-weight:900;line-height:1.2;word-break:break-word;text-align:center;padding:4px;border-radius:var(--radius-md);position:absolute;inset:0;display:flex;align-items:center;justify-content:center;backface-visibility:hidden;">${c.display}</div>
          </div>`;
        el.style.animationDelay = (idx * 0.035) + 's';
        el.addEventListener('click', () => this._onCardClick(el, c));
        grid.appendChild(el);
      });
    },

    _onCardClick(el, c) {
      if (this.locked || el.classList.contains('matched') || this.flipped.includes(el)) return;
      el.classList.add('flipped');
      this.flipped.push(el);
      if (Speech.isSupported() && c.type === 'text') Speech.sayEnglish(c.word, { rate: 0.78 });

      if (this.flipped.length === 2) {
        this.moves++;
        this._updateStats();
        this._checkMatch();
      }
    },

    _checkMatch() {
      const [c1, c2] = this.flipped;
      const sameId   = c1.dataset.id   === c2.dataset.id;
      const diffType = c1.dataset.type !== c2.dataset.type;

      if (sameId && diffType) {
        c1.classList.add('matched'); c2.classList.add('matched');
        this.pairs++;
        this._updateStats();
        this.flipped = [];
        if (Speech.isSupported()) Speech.sayEnglish(c1.dataset.id, { rate: 0.8 });
        if (this.pairs === this.items().length) setTimeout(() => this._showComplete(), 500);
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
      const el = document.getElementById('wm-complete');
      const mv = document.getElementById('wm-complete-moves');
      if (mv) mv.textContent = this.moves;
      if (el) el.style.display = 'block';
      App.launchConfetti(40);
      App.addHearts(10);
    },
  };

  document.getElementById('wm-restart')?.addEventListener('click', () => MEMORY.init());

  /* ═══════════════════════════════════════════════════
     TAB 3: QUIZ (emoji 보고 영어 단어 선택)
  ═══════════════════════════════════════════════════ */
  const QUIZ = {
    gs: null, correct: null, pool: [],

    items() { return CATEGORIES[currentCat].items; },

    init() {
      this.pool = shuffle(this.items());
      this.gs = { score:0, lives:3, q:0, total:Math.min(10, this.items().length) };
      this._updateUI();
      this._nextQ();
    },

    _updateUI() {
      const g = this.gs;
      const sc = document.getElementById('wq-score');
      const lv = document.getElementById('wq-lives');
      const qn = document.getElementById('wq-q');
      const pr = document.getElementById('wq-progress');
      if (sc) sc.textContent = g.score;
      if (lv) lv.textContent = '💖'.repeat(g.lives);
      if (qn) qn.textContent = g.q + 1;
      if (pr) pr.style.width = (g.q / g.total * 100) + '%';
    },

    _nextQ() {
      const g = this.gs;
      if (g.q >= g.total) { this._endGame(); return; }

      this.correct = this.pool[g.q % this.pool.length];

      const emojiEl = document.getElementById('wq-emoji');
      if (emojiEl) {
        emojiEl.textContent = this.correct.emoji;
        emojiEl.animate(
          [{ transform:'scale(0) rotate(-15deg)', opacity:0 }, { transform:'scale(1.15) rotate(5deg)', opacity:1 }, { transform:'scale(1) rotate(0)', opacity:1 }],
          { duration:320, easing:'ease-out' }
        );
      }

      if (Speech.isSupported()) Speech.sayEnglish(this.correct.word, { rate: 0.75 });

      const allItems = this.items();
      const wrongs = shuffle(allItems.filter(it => it.word !== this.correct.word)).slice(0, 3);
      const options = shuffle([this.correct, ...wrongs]);

      const grid = document.getElementById('wq-options');
      if (!grid) return;
      grid.innerHTML = '';

      options.forEach(item => {
        const btn = document.createElement('button');
        btn.className = 'wq-btn';
        btn.innerHTML = `<span class="wq-word">${item.word}</span>`;
        btn.onclick = () => this._answer(btn, item);
        grid.appendChild(btn);
      });
    },

    _answer(btn, chosen) {
      document.querySelectorAll('.wq-btn').forEach(b => b.onclick = null);
      const ok = chosen.word === this.correct.word;
      btn.classList.add(ok ? 'qw-correct' : 'qw-wrong');

      if (!ok) {
        document.querySelectorAll('.wq-btn').forEach(b => {
          if (b.querySelector('.wq-word').textContent === this.correct.word) b.classList.add('qw-correct');
        });
      }

      if (Speech.isSupported()) Speech.sayEnglish(this.correct.word, { rate: 0.75 });

      const g = this.gs;
      if (ok) g.score++;
      else    g.lives = Math.max(0, g.lives - 1);

      if (g.lives === 0) { setTimeout(() => this._endGame(), 900); return; }
      g.q++;
      this._updateUI();
      setTimeout(() => this._nextQ(), 1100);
    },

    _endGame() {
      const g = this.gs;
      const stars  = g.lives === 3 ? 3 : g.lives >= 1 ? 2 : g.score >= 5 ? 1 : 0;
      const hearts = g.score * 3;
      App.setStars('words', stars);
      const { leveledUp, newLevel } = App.addHearts(hearts);
      if (g.score >= 8) App.addBadge('words_master');
      App.launchConfetti(50);
      App.showModal({
        emoji: stars === 3 ? '🌟' : stars >= 1 ? '😊' : '💪',
        title: stars === 3 ? '¡Perfecto!' : stars >= 1 ? '¡Bien hecho!' : '¡Sigue intentando!',
        message: `${g.score} of ${g.total} correct!`,
        stars, heartsEarned: hearts,
        onNext: () => this.init(),
      });
      if (leveledUp) App.showToast(`🎉 Level ${newLevel}!`);
    },
  };

  /* ─── TAB SWITCHING ──────────────────────────────────────── */
  const TABS = { learn: LEARN, memory: MEMORY, quiz: QUIZ };

  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const tab = btn.dataset.tab;
      if (tab === currentTab) return;
      currentTab = tab;
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      document.querySelectorAll('.tab-content').forEach(el => el.style.display = 'none');
      document.querySelector('[data-tab-panel="' + tab + '"]').style.display = '';
      renderCatSelector(tab);
      TABS[tab].init();
    });
  });

  // 초기화
  renderCatSelector('learn');
  LEARN.init();

})();
