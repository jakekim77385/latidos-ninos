/**
 * rewards.js — Latidos Niños
 * Displays badges, progress, and encouragement
 */

(function () {
  App.initPage('rewards');

  /* ─── All Possible Badges ───────────────────────────────── */
  const ALL_BADGES = [
    { id: 'numbers_master',       icon: '🔢', name: '¡Experto en Números!',     desc: 'Consigue 8+ correctas en Números'    },
    { id: 'addition_player',      icon: '➕', name: '¡Sumador!',                desc: 'Completa 5 sumas correctas'          },
    { id: 'addition_expert',      icon: '🌟', name: '¡Maestro de Sumas!',       desc: 'Consigue 9+ en el juego de Sumas'    },
    { id: 'subtraction_player',   icon: '➖', name: '¡Restador!',               desc: 'Completa 5 restas correctas'         },
    { id: 'subtraction_expert',   icon: '🎯', name: '¡Maestro de Restas!',      desc: 'Consigue 9+ en Restas'               },
    { id: 'multiplication_player',icon: '✖️', name: '¡Multiplicador!',          desc: 'Completa 5 mult. correctas'          },
    { id: 'multiplication_expert',icon: '💥', name: '¡Maestro de Mult.!',       desc: 'Consigue 9+ en Multiplicación'       },
    { id: 'division_player',      icon: '➗', name: '¡Divisor!',                desc: 'Completa 5 divisiones correctas'     },
    { id: 'division_expert',      icon: '🎓', name: '¡Maestro de División!',    desc: 'Consigue 9+ en División'             },
    { id: 'tables_master',        icon: '📋', name: '¡Rey de las Tablas!',      desc: 'Consigue 9+ en Quiz de Tablas'       },
    { id: 'bingo_winner',         icon: '🎊', name: '¡Ganador del Bingo!',      desc: 'Haz BINGO en el juego de tablas'     },
    { id: 'first_star',           icon: '⭐', name: 'Primera Estrella',          desc: 'Consigue tu 1ra estrella'            },
    { id: 'three_stars',          icon: '🌠', name: 'Triple Estrella',           desc: 'Consigue 3 estrellas en un juego'    },
    { id: 'heart_collector',      icon: '💖', name: 'Coleccionista',             desc: 'Acumula 50 corazones'                },
    { id: 'level_2',              icon: '🚀', name: '¡Nivel 2!',                 desc: 'Llega al nivel 2'                    },
    { id: 'level_5',              icon: '🦅', name: '¡Nivel 5!',                 desc: 'Llega al nivel 5'                    },
  ];

  /* ─── Module Progress Config ────────────────────────────── */
  const MODULES = [
    { key: 'numbers',       icon: '🔢', label: 'Números'      },
    { key: 'addition',      icon: '➕', label: 'Suma'         },
    { key: 'subtraction',   icon: '➖', label: 'Resta'        },
    { key: 'multiplication',icon: '✖️', label: 'Multiplicar'  },
    { key: 'division',      icon: '➗', label: 'División'     },
    { key: 'tables',        icon: '📋', label: 'Tablas'       },
  ];

  /* ─── Auto-award badges based on state ─────────────────── */
  function autoAwardBadges(s) {
    const totalStars = Object.values(s.stars).reduce((a, b) => a + b, 0);
    if (totalStars >= 1)           App.addBadge('first_star');
    if (Object.values(s.stars).some(v => v >= 3)) App.addBadge('three_stars');
    if (s.hearts >= 50)            App.addBadge('heart_collector');
    if (s.level >= 2)              App.addBadge('level_2');
    if (s.level >= 5)              App.addBadge('level_5');
  }

  /* ─── Encouragement messages ─────────────────────────────── */
  const ENCOURAGEMENTS = [
    '¡Cada día que practicas, tu corazón y tu mente se hacen más fuertes! 💪',
    '¡Los campeones no nacen, se hacen con práctica y mucho amor! 🌺',
    '¡Sigue así! Los errores son escalones hacia el éxito. 🚀',
    '¡Eres increíble! ¡Sigue jugando y aprendiendo! ⭐',
    '¡Las matemáticas son tu superpoder! 🦸',
  ];

  /* ─── RENDER ─────────────────────────────────────────────── */
  function render() {
    const s = App.getState();
    autoAwardBadges(s);

    // Trophy banner
    document.getElementById('trophy-char').textContent    = App.getChar();
    document.getElementById('trophy-name').textContent    = `¡Hola, ${s.playerName}!`;
    document.getElementById('trophy-sub').textContent     = s.badges.length > 0
      ? `¡Has conseguido ${s.badges.length} medalla${s.badges.length > 1 ? 's' : ''}!`
      : '¡Empieza a jugar para ganar medallas!';
    document.getElementById('trophy-level').textContent   = `⭐ Nivel ${s.level}`;
    document.getElementById('trophy-hearts').textContent  = `${s.hearts} 💖 corazones`;

    // Quick stats
    const totalStars = Object.values(s.stars).reduce((a, b) => a + b, 0);
    document.getElementById('sw-hearts').textContent = s.hearts;
    document.getElementById('sw-stars').textContent  = totalStars;
    document.getElementById('sw-badges').textContent = s.badges.length;

    // Module progress
    const mpEl = document.getElementById('module-progress');
    mpEl.innerHTML = '';
    MODULES.forEach(m => {
      const stars = s.stars[m.key] || 0;
      const row   = document.createElement('div');
      row.className = 'mp-row';
      row.innerHTML = `
        <span class="mp-icon">${m.icon}</span>
        <span class="mp-name">${m.label}</span>
        <div class="mp-stars">
          ${[0,1,2].map(i => `<span class="star${i < stars ? ' filled' : ''}">⭐</span>`).join('')}
        </div>
        <div class="mp-bar-wrap">
          <div class="progress-wrap"><div class="progress-bar" style="width:${(stars/3)*100}%"></div></div>
        </div>`;
      mpEl.appendChild(row);
    });

    // Badges
    const bgEl = document.getElementById('badge-grid');
    bgEl.innerHTML = '';
    ALL_BADGES.forEach(badge => {
      const earned = s.badges.includes(badge.id);
      const el = document.createElement('div');
      el.className = 'badge-item' + (earned ? '' : ' locked');
      el.innerHTML = `
        <span class="badge-icon">${badge.icon}</span>
        <div class="badge-name">${badge.name}</div>
        <div class="badge-desc">${badge.desc}</div>`;
      if (earned) {
        el.title = '¡Conseguida!';
        el.style.border = '2px solid var(--yellow)';
      }
      bgEl.appendChild(el);
    });

    // Encouragement
    const day = new Date().getDay();
    document.getElementById('encourage-msg').textContent = ENCOURAGEMENTS[day % ENCOURAGEMENTS.length];
  }

  render();

  // Celebrate if recent achievement
  const s = App.getState();
  if (s.hearts > 0) {
    setTimeout(() => App.launchConfetti(30), 400);
  }
})();
