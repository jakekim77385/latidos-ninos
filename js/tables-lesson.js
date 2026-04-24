/**
 * tables-lesson.js — Latidos Niños
 * ─────────────────────────────────────────────────────────────
 * Módulo INDEPENDIENTE de lección teórica de multiplicación.
 * No modifica tables.js — lee el pill activo para saber la tabla.
 *
 * Expone: window.LessonModule.init()
 * ─────────────────────────────────────────────────────────────
 */

window.LessonModule = (function () {

  /* ── Helper: leer tabla seleccionada desde el pill activo ── */
  function getSelectedTable() {
    const active = document.querySelector('.table-pill.active');
    return active ? parseInt(active.dataset.table, 10) : 3;
  }

  /* ══════════════════════════════════════════════════════════
     DATOS: Truco + color para cada tabla del 1 al 10
  ══════════════════════════════════════════════════════════ */
  const TRUCOS = {
    1: {
      color: '#FF6B6B',
      title: 'El número mágico 1',
      body: 'Cualquier número multiplicado por 1 es exactamente ese mismo número. El 1 no cambia nada — ¡es el número más "invisible" de todos!',
      example: '1 × 7 = 7 &nbsp;|&nbsp; 1 × 25 = 25',
      teacher: '💬 Pregúntale al niño: "Si tienes 1 grupo de 7 manzanas, ¿cuántas tienes?"',
      pattern: '1, 2, 3, 4, 5, 6, 7, 8, 9, 10…'
    },
    2: {
      color: '#FF9F43',
      title: 'Doblar y doblar',
      body: 'Multiplicar por 2 es como sumar el número consigo mismo. ¡Y el resultado SIEMPRE es un número par!',
      example: '2 × 6 = 6 + 6 = 12 &nbsp;|&nbsp; 2 × 9 = 18',
      teacher: '💬 Muéstrale: usa dos manos. Cada mano tiene los mismos dedos → el doble.',
      pattern: '2, 4, 6, 8, 10, 12, 14, 16, 18, 20…'
    },
    3: {
      color: '#FECA57',
      title: 'La regla de los dígitos',
      body: 'En la tabla del 3, si sumas los dígitos del resultado, siempre obtienes un múltiplo de 3. ¡Es como magia!',
      example: '3 × 9 = 27 → 2+7 = 9 ✓ &nbsp;|&nbsp; 3 × 8 = 24 → 2+4 = 6 ✓',
      teacher: '💬 Escribe en papel: 3, 6, 9, 12, 15… Pídele que cuente de 3 en 3 con sus dedos.',
      pattern: '3, 6, 9, 12, 15, 18, 21, 24, 27, 30…'
    },
    4: {
      color: '#48DBFB',
      title: '¡Dobla dos veces!',
      body: 'Multiplicar por 4 = multiplicar por 2 y luego multiplicar por 2 otra vez. ¡Dobla y vuelve a doblar!',
      example: '4 × 5: primero 2×5=10, luego 2×10=20 ✓',
      teacher: '💬 Haz que el niño lo haga en dos pasos mentales: "¿Cuánto es el doble? Ahora dóblalo de nuevo."',
      pattern: '4, 8, 12, 16, 20, 24, 28, 32, 36, 40…'
    },
    5: {
      color: '#1DD1A1',
      title: 'Termina en 0 o en 5',
      body: '¡La más fácil! El resultado de la tabla del 5 SIEMPRE termina en 0 o en 5. Nunca hay excepción.',
      example: '5 × 3 = 15 &nbsp;|&nbsp; 5 × 6 = 30 &nbsp;|&nbsp; 5 × 9 = 45',
      teacher: '💬 Enséñale a contar de 5 en 5 con el reloj: 5, 10, 15, 20, 25, 30…',
      pattern: '5, 10, 15, 20, 25, 30, 35, 40, 45, 50…'
    },
    6: {
      color: '#54A0FF',
      title: 'El secreto del 6 par',
      body: 'Cuando multiplicas 6 por un número PAR, ¡el resultado termina igual que ese número! 6×4=24, 6×6=36, 6×8=48.',
      example: '6 × 4 = 24 (termina en 4) &nbsp;|&nbsp; 6 × 8 = 48 (termina en 8)',
      teacher: '💬 Muéstrale el patrón visual: escribe los resultados en columna y resalta la última cifra.',
      pattern: '6, 12, 18, 24, 30, 36, 42, 48, 54, 60…'
    },
    7: {
      color: '#A29BFE',
      title: 'La tabla valiente',
      body: 'La tabla del 7 es la más difícil, ¡pero con repetición se puede! No tiene trucos simples — se aprende con práctica y ritmo.',
      example: '7×1=7, 7×2=14, 7×3=21, 7×4=28, 7×5=35…',
      teacher: '💬 Repite en voz alta con ritmo: "7, 14, 21, 28, 35…" como si fuera una canción. ¡La música ayuda!',
      pattern: '7, 14, 21, 28, 35, 42, 49, 56, 63, 70…'
    },
    8: {
      color: '#00D2D3',
      title: '¡Tres veces el doble!',
      body: 'Multiplicar por 8 = doblar tres veces seguidas. Sigue la cadena: ×2 → ×2 → ×2. ¡El resultado siempre es par!',
      example: '8 × 3: empieza con 3 → 6 → 12 → 24 ✓',
      teacher: '💬 Dibuja una cadena de flechas en el papel: 3 →×2→ 6 →×2→ 12 →×2→ 24.',
      pattern: '8, 16, 24, 32, 40, 48, 56, 64, 72, 80…'
    },
    9: {
      color: '#FD79A8',
      title: '¡El truco de los dedos!',
      body: 'Para 9×N: dobla el dedo número N. Los dedos a la IZQUIERDA son las decenas y los de la DERECHA son las unidades. Además, los dígitos del resultado siempre suman 9.',
      example: '9×3: dobla dedo 3 → 2 dedos izq + 7 der = 27 ✓ &nbsp;|&nbsp; 6+3=9 ✓',
      teacher: '💬 ¡Hazlo físicamente con las manos! Es el truco más memorable para los niños.',
      pattern: '9, 18, 27, 36, 45, 54, 63, 72, 81, 90…'
    },
    10: {
      color: '#6BCB77',
      title: '¡Solo añade un cero!',
      body: 'La regla más simple de todas: multiplicar por 10 es escribir el número y añadir un 0 al final. ¡Así de fácil!',
      example: '10 × 7 = 70 &nbsp;|&nbsp; 10 × 15 = 150 &nbsp;|&nbsp; 10 × 0 = 0',
      teacher: '💬 Dile: "Escribe el número. Ahora ponle un 0 al lado derecho. ¡Listo!"',
      pattern: '10, 20, 30, 40, 50, 60, 70, 80, 90, 100…'
    }
  };

  /* ══════════════════════════════════════════════════════════
     PASO 1 — Visualización de puntos (Dot Array)
  ══════════════════════════════════════════════════════════ */
  let dotB = 4; // el segundo factor (controlado por slider)

  function renderDots() {
    const t   = getSelectedTable();
    const b   = dotB;
    const total = t * b;

    // Tamaño dinámico de punto según la cantidad total
    const dotSize = total > 60 ? 14 : total > 36 ? 18 : total > 20 ? 20 : 26;
    const gap     = total > 60 ?  3 : total > 36 ?  4 : 6;

    const container = document.getElementById('lesson-dot-grid');
    if (!container) return;
    container.innerHTML = '';
    container.style.setProperty('--dot-size', dotSize + 'px');
    container.style.setProperty('--dot-gap',  gap  + 'px');

    for (let row = 0; row < t; row++) {
      const rowEl = document.createElement('div');
      rowEl.className = 'ld-row';
      for (let col = 0; col < b; col++) {
        const dot = document.createElement('span');
        dot.className = 'ld-dot';
        dot.style.animationDelay = ((row * b + col) * 18) + 'ms';
        rowEl.appendChild(dot);
      }
      container.appendChild(rowEl);
    }

    // Ecuación principal
    const eqEl = document.getElementById('lesson-dot-eq');
    if (eqEl) {
      eqEl.innerHTML =
        `<span class="ldeq-a">${t}</span>` +
        `<span class="ldeq-op"> × </span>` +
        `<span class="ldeq-b">${b}</span>` +
        `<span class="ldeq-op"> = </span>` +
        `<span class="ldeq-ans">${total}</span>`;
    }

    // Suma repetida
    const addEl = document.getElementById('lesson-dot-add');
    if (addEl) {
      const parts = Array.from({ length: t }, () => b).join(' + ');
      addEl.textContent = parts + ' = ' + total;
    }

    // Descripción en palabras
    const descEl = document.getElementById('lesson-dot-desc');
    if (descEl) {
      descEl.textContent = `${t} grupos de ${b} = ${total} en total`;
    }
  }

  function bindSlider() {
    const slider = document.getElementById('lesson-slider-b');
    if (!slider) return;
    slider.addEventListener('input', () => {
      dotB = parseInt(slider.value, 10);
      document.getElementById('lesson-slider-val').textContent = dotB;
      renderDots();
    });
  }

  /* ══════════════════════════════════════════════════════════
     PASO 2 — Truco secreto (Truco Card)
  ══════════════════════════════════════════════════════════ */
  function renderTruco() {
    const t     = getSelectedTable();
    const truco = TRUCOS[t];
    const card  = document.getElementById('lesson-truco-card');
    if (!card || !truco) return;

    card.style.borderColor  = truco.color;
    card.style.background   = truco.color + '18';
    card.innerHTML = `
      <div class="lt-header" style="background:${truco.color}">
        <span class="lt-num">×${t}</span>
        <span class="lt-title">${truco.title}</span>
      </div>
      <div class="lt-body">
        <p class="lt-tip">${truco.body}</p>
        <div class="lt-example" style="border-left-color:${truco.color}">
          <span class="lt-example-label">Ejemplo</span>
          <span class="lt-example-text">${truco.example}</span>
        </div>
        <div class="lt-pattern">
          <span class="lt-pattern-label" style="color:${truco.color}">Patrón ↗</span>
          <span class="lt-pattern-nums">${truco.pattern}</span>
        </div>
        <div class="lt-teacher">
          <span class="lt-teacher-tag">Guía del maestro</span>
          <span>${truco.teacher}</span>
        </div>
      </div>
    `;
  }

  /* ══════════════════════════════════════════════════════════
     PASO 3 — Construye la tabla (Build the Table)
  ══════════════════════════════════════════════════════════ */
  let buildState = { t: 3, current: 1, completed: new Set() };

  function initBuild() {
    const t = getSelectedTable();
    buildState = { t, current: 1, completed: new Set() };
    renderBuildGrid();
  }

  function renderBuildGrid() {
    const container = document.getElementById('lesson-build-grid');
    if (!container) return;
    const { t, current, completed } = buildState;
    container.innerHTML = '';

    for (let i = 1; i <= 10; i++) {
      const row = document.createElement('div');

      if (completed.has(i)) {
        row.className = 'lb-row lb-done';
        row.innerHTML =
          `<span class="lb-eq">${t} × ${i}</span>` +
          `<span class="lb-op">=</span>` +
          `<span class="lb-ans lb-ans-done">${t * i} ✓</span>`;
      } else if (i === current) {
        row.className = 'lb-row lb-active';
        row.innerHTML =
          `<span class="lb-eq">${t} × ${i}</span>` +
          `<span class="lb-op">=</span>` +
          `<input class="lb-input" id="lb-input-now" type="number" min="0" max="200" placeholder="?" autocomplete="off" />` +
          `<button class="lb-check-btn" id="lb-check-btn">✓</button>`;
      } else {
        row.className = 'lb-row lb-locked';
        row.innerHTML =
          `<span class="lb-eq" style="opacity:0.3">${t} × ${i}</span>` +
          `<span class="lb-op" style="opacity:0.3">=</span>` +
          `<span class="lb-ans lb-ans-locked">—</span>`;
      }

      container.appendChild(row);
    }

    // Bind input & button
    const input    = document.getElementById('lb-input-now');
    const checkBtn = document.getElementById('lb-check-btn');

    if (input && checkBtn) {
      input.focus();
      const attempt = () => {
        const val     = parseInt(input.value, 10);
        const correct = buildState.t * buildState.current;

        if (val === correct) {
          buildState.completed.add(buildState.current);
          if (buildState.current < 10) buildState.current++;
          if (typeof Sounds !== 'undefined') Sounds.correct();
          renderBuildGrid();
          updateBuildProgress();
          if (buildState.completed.size === 10) onBuildComplete();
        } else {
          input.classList.add('lb-shake');
          setTimeout(() => input.classList.remove('lb-shake'), 450);
          if (typeof Sounds !== 'undefined') Sounds.wrong();
          input.value = '';
        }
      };
      checkBtn.addEventListener('click', attempt);
      input.addEventListener('keydown', e => { if (e.key === 'Enter') attempt(); });
    }
  }

  function updateBuildProgress() {
    const bar = document.getElementById('lesson-build-prog');
    if (bar) bar.style.width = (buildState.completed.size / 10 * 100) + '%';
  }

  function onBuildComplete() {
    if (typeof App !== 'undefined') {
      App.launchConfetti(70);
      App.addHearts(15);
      App.showToast(`🌟 ¡Tabla del ${buildState.t} completada! +15 💖`);
    }
    const resetBtn = document.getElementById('lb-reset-btn');
    if (resetBtn) resetBtn.style.display = 'inline-flex';
  }

  function bindBuildReset() {
    const btn = document.getElementById('lb-reset-btn');
    if (!btn) return;
    btn.addEventListener('click', () => {
      btn.style.display = 'none';
      initBuild();
      updateBuildProgress();
    });
  }

  /* ══════════════════════════════════════════════════════════
     RENDER ALL & INIT
  ══════════════════════════════════════════════════════════ */
  function renderAll() {
    const t = getSelectedTable();

    // Update "Tabla del X" headings
    document.querySelectorAll('[data-lesson-table]').forEach(el => {
      el.textContent = `Tabla del ${t}`;
    });

    // Reset dot slider to match current table
    dotB = parseInt(document.getElementById('lesson-slider-b')?.value || 4, 10);
    renderDots();
    renderTruco();
    initBuild();
    updateBuildProgress();

    // Reset build reset button
    const resetBtn = document.getElementById('lb-reset-btn');
    if (resetBtn) resetBtn.style.display = 'none';
  }

  /* ── Escuchar clicks en pills para re-renderizar ── */
  function bindPills() {
    document.querySelectorAll('.table-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        // tables.js actualiza el pill primero → esperamos un tick
        setTimeout(renderAll, 30);
      });
    });
  }

  /* ── Punto de entrada público ── */
  function init() {
    bindSlider();
    bindPills();
    bindBuildReset();
    renderAll();
  }

  return { init, render: renderAll };

})();
