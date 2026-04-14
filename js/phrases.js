/**
 * phrases.js — Latidos Niños English
 * Basic conversational phrases for children
 * Tabs: Learn / Quiz
 */

(function () {
  App.initPage('phrases');

  /* ═══════════════════════════════════════════════════
     PHRASE DATA
  ═══════════════════════════════════════════════════ */
  const CATEGORIES = {
    greetings: {
      label: '👋 Greetings',
      color: 'coral',
      items: [
        { en:'Hello!',              es:'¡Hola!',               emoji:'👋' },
        { en:'Good morning!',       es:'¡Buenos días!',        emoji:'🌅' },
        { en:'Good afternoon!',     es:'¡Buenas tardes!',      emoji:'☀️' },
        { en:'Good night!',         es:'¡Buenas noches!',      emoji:'🌙' },
        { en:'Goodbye!',            es:'¡Adiós!',              emoji:'🙋' },
        { en:'See you later!',      es:'¡Hasta luego!',        emoji:'✌️' },
        { en:'Nice to meet you!',   es:'¡Mucho gusto!',        emoji:'🤝' },
        { en:'How are you?',        es:'¿Cómo estás?',         emoji:'❓' },
        { en:'I am fine!',          es:'¡Estoy bien!',         emoji:'😊' },
        { en:'Welcome!',            es:'¡Bienvenido!',         emoji:'🎉' },
      ]
    },
    feelings: {
      label: '😊 Feelings',
      color: 'yellow',
      items: [
        { en:'I am happy!',         es:'¡Estoy feliz!',        emoji:'😄' },
        { en:'I am sad.',           es:'Estoy triste.',        emoji:'😢' },
        { en:'I am tired.',         es:'Estoy cansado.',       emoji:'😴' },
        { en:'I am hungry!',        es:'¡Tengo hambre!',       emoji:'🍽️' },
        { en:'I am scared.',        es:'Tengo miedo.',         emoji:'😨' },
        { en:'I am excited!',       es:'¡Estoy emocionado!',   emoji:'🥳' },
        { en:'I am angry.',         es:'Estoy enojado.',       emoji:'😠' },
        { en:'I am bored.',         es:'Estoy aburrido.',      emoji:'😑' },
        { en:'I feel great!',       es:'¡Me siento genial!',   emoji:'🌟' },
        { en:'I am thirsty.',       es:'Tengo sed.',           emoji:'💧' },
      ]
    },
    classroom: {
      label: '🏫 Classroom',
      color: 'blue',
      items: [
        { en:'Yes, please.',          es:'Sí, por favor.',       emoji:'✅' },
        { en:'No, thank you.',        es:'No, gracias.',         emoji:'🚫' },
        { en:'I don\'t understand.',  es:'No entiendo.',         emoji:'🤔' },
        { en:'Can you repeat?',       es:'¿Puede repetir?',      emoji:'🔁' },
        { en:'I need help.',          es:'Necesito ayuda.',      emoji:'🙋' },
        { en:'Thank you!',            es:'¡Gracias!',            emoji:'🙏' },
        { en:'You\'re welcome!',      es:'¡De nada!',            emoji:'😊' },
        { en:'Excuse me.',            es:'Con permiso.',         emoji:'🤚' },
        { en:'I\'m sorry.',           es:'Lo siento.',           emoji:'😔' },
        { en:'That\'s great!',        es:'¡Qué bien!',           emoji:'🎊' },
      ]
    },
    about_me: {
      label: '👤 About Me',
      color: 'green',
      items: [
        { en:'What is your name?',    es:'¿Cómo te llamas?',     emoji:'❓' },
        { en:'My name is ...',        es:'Me llamo...',           emoji:'🏷️' },
        { en:'How old are you?',      es:'¿Cuántos años tienes?', emoji:'🎂' },
        { en:'I am ... years old.',   es:'Tengo ... años.',       emoji:'🔢' },
        { en:'I like ...',            es:'Me gusta...',           emoji:'❤️' },
        { en:'I don\'t like ...',     es:'No me gusta...',        emoji:'💔' },
        { en:'Where are you from?',   es:'¿De dónde eres?',      emoji:'🗺️' },
        { en:'I am from Panama.',     es:'Soy de Panamá.',        emoji:'🇵🇦' },
        { en:'I live in ...',         es:'Vivo en...',            emoji:'🏠' },
        { en:'My favorite color is...',es:'Mi color favorito es...',emoji:'🎨' },
      ]
    },
    compliments: {
      label: '🌟 Compliments',
      color: 'purple',
      items: [
        { en:'Very good!',          es:'¡Muy bien!',           emoji:'⭐' },
        { en:'Well done!',          es:'¡Bien hecho!',         emoji:'👏' },
        { en:'You are great!',      es:'¡Eres genial!',        emoji:'🌟' },
        { en:'Keep trying!',        es:'¡Sigue intentando!',   emoji:'💪' },
        { en:'You can do it!',      es:'¡Tú puedes!',          emoji:'🚀' },
        { en:'That\'s correct!',    es:'¡Correcto!',           emoji:'✅' },
        { en:'Excellent!',          es:'¡Excelente!',          emoji:'🏆' },
        { en:'Amazing!',            es:'¡Increíble!',          emoji:'🤩' },
        { en:'I\'m proud of you!',  es:'¡Estoy orgulloso!',    emoji:'🥇' },
        { en:'Perfect!',            es:'¡Perfecto!',           emoji:'💯' },
      ]
    },
    questions: {
      label: '❓ Questions',
      color: 'yellow',
      items: [
        { en:'What is this?',       es:'¿Qué es esto?',        emoji:'🤔' },
        { en:'Where is it?',        es:'¿Dónde está?',         emoji:'📍' },
        { en:'Who is that?',        es:'¿Quién es ese?',       emoji:'👤' },
        { en:'When is it?',         es:'¿Cuándo es?',          emoji:'📅' },
        { en:'Why?',                es:'¿Por qué?',            emoji:'❓' },
        { en:'How much is it?',     es:'¿Cuánto cuesta?',      emoji:'💰' },
        { en:'Can I have...?',      es:'¿Puedo tener...?',     emoji:'🙏' },
        { en:'Do you like it?',     es:'¿Te gusta?',           emoji:'👍' },
        { en:'Is it correct?',      es:'¿Está correcto?',      emoji:'✅' },
        { en:'What time is it?',    es:'¿Qué hora es?',        emoji:'⏰' },
      ]
    },
    daily: {
      label: '🌞 Daily Life',
      color: 'coral',
      items: [
        { en:'I wake up.',          es:'Me despierto.',        emoji:'⏰' },
        { en:'I brush my teeth.',   es:'Me cepillo los dientes.',emoji:'🦷' },
        { en:'I eat breakfast.',    es:'Desayuno.',            emoji:'🍳' },
        { en:'I go to school.',     es:'Voy a la escuela.',    emoji:'🏫' },
        { en:'I study.',            es:'Estudio.',             emoji:'📚' },
        { en:'I play with friends.',es:'Juego con amigos.',    emoji:'🤝' },
        { en:'I eat lunch.',        es:'Almuerzo.',            emoji:'🍽️' },
        { en:'I do homework.',      es:'Hago la tarea.',       emoji:'✏️' },
        { en:'I eat dinner.',       es:'Ceno.',                emoji:'🌙' },
        { en:'I go to sleep.',      es:'Me voy a dormir.',     emoji:'😴' },
      ]
    },
    requests: {
      label: '🙋 Requests',
      color: 'green',
      items: [
        { en:'Can I go to the bathroom?', es:'¿Puedo ir al baño?',  emoji:'🚽' },
        { en:'Can I drink water?',        es:'¿Puedo tomar agua?',  emoji:'💧' },
        { en:'Can I open the window?',    es:'¿Abro la ventana?',   emoji:'🪟' },
        { en:'Please speak slowly.',      es:'Habla más despacio.',  emoji:'🐢' },
        { en:'What does ... mean?',       es:'¿Qué significa...?',  emoji:'📖' },
        { en:'Can you help me?',          es:'¿Me puedes ayudar?',  emoji:'🆘' },
        { en:'May I answer?',             es:'¿Puedo responder?',   emoji:'✋' },
        { en:'I finished!',               es:'¡Terminé!',            emoji:'🎉' },
        { en:'I don\'t know.',            es:'No sé.',               emoji:'🤷' },
        { en:'One more time, please.',    es:'Una vez más, por favor.',emoji:'🔁' },
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

  let currentCat = 'greetings';
  let currentTab = 'learn';

  /* ─── Category Selector ───────────────────────── */
  function renderCatSelector() {
    const wrap = document.getElementById('ph-cat-selector');
    if (!wrap) return;
    wrap.innerHTML = '';
    Object.entries(CATEGORIES).forEach(([key, cat]) => {
      const btn = document.createElement('button');
      btn.className = 'cat-btn' + (key === currentCat ? ' active' : '');
      btn.textContent = cat.label;
      btn.onclick = () => {
        currentCat = key;
        renderCatSelector();
        if (currentTab === 'learn') LEARN.init();
        if (currentTab === 'quiz')  QUIZ.init();
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

      const emojiEl = document.getElementById('ph-emoji');
      const enEl    = document.getElementById('ph-english');
      const esEl    = document.getElementById('ph-spanish');
      const ctrEl   = document.getElementById('ph-counter');

      if (emojiEl) {
        emojiEl.textContent = item.emoji;
        emojiEl.animate(
          [{ transform:'scale(0) rotate(-10deg)', opacity:0 }, { transform:'scale(1.15)', opacity:1 }, { transform:'scale(1)', opacity:1 }],
          { duration:300, easing:'ease-out' }
        );
      }
      if (enEl) {
        enEl.textContent = item.en;
        enEl.animate(
          [{ transform:'translateY(10px)', opacity:0 }, { transform:'translateY(0)', opacity:1 }],
          { duration:280, easing:'ease-out' }
        );
      }
      if (esEl) esEl.textContent = item.es;
      if (ctrEl) ctrEl.textContent = `${this.idx + 1} / ${this.items().length}`;

      // 그리드 하이라이트
      document.querySelectorAll('.ph-mini').forEach((el, i) => {
        el.style.borderColor = i === this.idx ? 'var(--coral)' : 'transparent';
        el.style.background  = i === this.idx ? 'var(--coral-light)' : '#fff';
      });

      // 자동 음성
      if (Speech.isSupported()) Speech.sayEnglish(item.en, { rate: 0.78 });
    },

    _renderGrid() {
      const grid = document.getElementById('ph-mini-grid');
      if (!grid) return;
      grid.innerHTML = '';
      this.items().forEach((item, i) => {
        const el = document.createElement('div');
        el.className = 'ph-mini';
        el.innerHTML = `<span style="font-size:1.5rem;">${item.emoji}</span>
                        <span style="font-size:0.65rem;font-weight:800;color:var(--text-dark);text-align:center;line-height:1.3;">${item.en}</span>`;
        el.style.cssText = 'background:#fff;border-radius:12px;padding:8px 4px;text-align:center;cursor:pointer;border:2.5px solid transparent;transition:all 0.2s;box-shadow:0 2px 8px rgba(0,0,0,0.07);display:flex;flex-direction:column;align-items:center;gap:4px;';
        el.onclick = () => { this.idx = i; this._show(); };
        grid.appendChild(el);
      });
    },

    prev() { this.idx = (this.idx - 1 + this.items().length) % this.items().length; this._show(); },
    next() { this.idx = (this.idx + 1) % this.items().length; this._show(); },
    speak() {
      const item = this.items()[this.idx];
      if (Speech.isSupported()) Speech.sayEnglish(item.en, { rate: 0.75 });
    },
  };

  document.getElementById('ph-prev')?.addEventListener('click',  () => LEARN.prev());
  document.getElementById('ph-next')?.addEventListener('click',  () => LEARN.next());
  document.getElementById('ph-speak')?.addEventListener('click', () => LEARN.speak());
  document.getElementById('ph-emoji')?.addEventListener('click', () => LEARN.speak());

  /* ═══════════════════════════════════════════════════
     TAB 2: QUIZ (emoji 보고 영어 문장 고르기)
  ═══════════════════════════════════════════════════ */
  const QUIZ = {
    gs: null, correct: null, pool: [],

    items() { return CATEGORIES[currentCat].items; },

    init() {
      this.pool = shuffle(this.items());
      const total = Math.min(6, this.items().length);
      this.gs = { score:0, lives:3, q:0, total };
      this._updateUI();
      this._nextQ();
    },

    _updateUI() {
      const g = this.gs;
      const sc = document.getElementById('phq-score');
      const lv = document.getElementById('phq-lives');
      const qn = document.getElementById('phq-q');
      const pr = document.getElementById('phq-progress');
      if (sc) sc.textContent = g.score;
      if (lv) lv.textContent = '💖'.repeat(g.lives);
      if (qn) qn.textContent = `${g.q + 1}/${g.total}`;
      if (pr) pr.style.width = (g.q / g.total * 100) + '%';
    },

    _nextQ() {
      const g = this.gs;
      if (g.q >= g.total) { this._endGame(); return; }

      this.correct = this.pool[g.q % this.pool.length];

      const emojiEl = document.getElementById('phq-emoji');
      const snipEl  = document.getElementById('phq-snippet');

      if (emojiEl) {
        emojiEl.textContent = this.correct.emoji;
        emojiEl.animate(
          [{ transform:'scale(0) rotate(-10deg)', opacity:0 }, { transform:'scale(1.15)', opacity:1 }, { transform:'scale(1)', opacity:1 }],
          { duration:300, easing:'ease-out' }
        );
      }
      // 스페인어 힌트 표시
      if (snipEl) snipEl.textContent = this.correct.es;

      // 음성: 문장 읽어줌
      if (Speech.isSupported()) Speech.sayEnglish(this.correct.en, { rate: 0.78 });

      // 보기 4개
      const allItems = this.items();
      const wrongs = shuffle(allItems.filter(it => it.en !== this.correct.en)).slice(0, 3);
      const options = shuffle([this.correct, ...wrongs]);

      const grid = document.getElementById('phq-options');
      if (!grid) return;
      grid.innerHTML = '';

      options.forEach(item => {
        const btn = document.createElement('button');
        btn.className = 'phq-btn';
        btn.textContent = item.en;
        btn.onclick = () => this._answer(btn, item);
        grid.appendChild(btn);
      });
    },

    _answer(btn, chosen) {
      document.querySelectorAll('.phq-btn').forEach(b => b.onclick = null);
      const ok = chosen.en === this.correct.en;
      btn.classList.add(ok ? 'qw-correct' : 'qw-wrong');

      if (!ok) {
        document.querySelectorAll('.phq-btn').forEach(b => {
          if (b.textContent === this.correct.en) b.classList.add('qw-correct');
        });
      }

      if (Speech.isSupported()) Speech.sayEnglish(this.correct.en, { rate: 0.78 });

      const g = this.gs;
      if (ok) g.score++;
      else    g.lives = Math.max(0, g.lives - 1);

      if (g.lives === 0) { setTimeout(() => this._endGame(), 900); return; }
      g.q++;
      this._updateUI();
      setTimeout(() => this._nextQ(), 1200);
    },

    _endGame() {
      const g = this.gs;
      const stars  = g.lives === 3 ? 3 : g.lives >= 1 ? 2 : g.score >= 3 ? 1 : 0;
      const hearts = g.score * 4;
      App.setStars('phrases', stars);
      const { leveledUp, newLevel } = App.addHearts(hearts);
      if (g.score >= 5) App.addBadge('phrases_star');
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

  /* ─── TAB SWITCHING ─────────────────────────────────── */
  const TABS = { learn: LEARN, quiz: QUIZ };

  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const tab = btn.dataset.tab;
      if (tab === currentTab) return;
      currentTab = tab;
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      document.querySelectorAll('.tab-content').forEach(el => el.style.display = 'none');
      document.querySelector('[data-tab-panel="' + tab + '"]').style.display = '';
      TABS[tab].init();
    });
  });

  // 초기화
  renderCatSelector();
  LEARN.init();

})();
