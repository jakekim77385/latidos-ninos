/**
 * app.js — Latidos Niños
 * Global state manager + shared UI utilities
 * Supports multiple player profiles on the same device.
 *
 * ✅ 서버 API 우선 (data/profiles.json 영구 저장)
 * ✅ 서버 없을 때 localStorage fallback (오프라인 지원)
 */

const App = (function () {

  /* ─── Default Profile Shape ──────────────────────────────── */
  const PROFILE_DEFAULTS = {
    id: null,
    character: null,
    playerName: '',
    hearts: 0,
    level: 1,
    stars: {
      numbers: 0, addition: 0, subtraction: 0,
      multiplication: 0, division: 0, tables: 0,
    },
    badges: [],
    soundEnabled: true,
  };

  const CHARACTERS = {
    bunny: '🐰', bear: '🐻', cat: '🐱',
    fox: '🦊', panda: '🐼', chick: '🐥',
  };

  /* ─── Storage Keys (localStorage fallback) ───────────────── */
  const PROFILES_KEY = 'latidosNinos_profiles';
  const ACTIVE_KEY   = 'latidosNinos_activeId';

  /* ─── Server API flag ────────────────────────────────────── */
  let _useServer = false;   // 서버 사용 가능 여부 (초기화 후 결정)
  let _syncPending = false; // 동기화 대기 중

  /* ─── State ──────────────────────────────────────────────── */
  let profiles  = [];
  let activeId  = null;
  let state     = { ...PROFILE_DEFAULTS, stars: { ...PROFILE_DEFAULTS.stars } };

  /* ─── Utility ────────────────────────────────────────────── */
  function _uid() { return Date.now().toString(36) + Math.random().toString(36).slice(2); }

  function _resolveActive() {
    if (!activeId) return { ...PROFILE_DEFAULTS, stars: { ...PROFILE_DEFAULTS.stars } };
    const p = profiles.find(p => p.id === activeId);
    if (!p) return { ...PROFILE_DEFAULTS, stars: { ...PROFILE_DEFAULTS.stars } };
    return { ...PROFILE_DEFAULTS, ...p, stars: { ...PROFILE_DEFAULTS.stars, ...p.stars } };
  }

  /* ─── localStorage helpers ───────────────────────────────── */
  function _lsLoad() {
    try {
      const raw = localStorage.getItem(PROFILES_KEY);
      const aid = localStorage.getItem(ACTIVE_KEY);
      if (!raw) {
        // Migrate legacy single-profile
        const legacy = localStorage.getItem('latidosNinos_v1');
        if (legacy) {
          const old = JSON.parse(legacy);
          if (old.character && old.playerName) {
            const profile = { ...PROFILE_DEFAULTS, ...old, stars: { ...PROFILE_DEFAULTS.stars, ...old.stars }, id: _uid() };
            return { profiles: [profile], activeId: profile.id };
          }
        }
        return { profiles: [], activeId: null };
      }
      return { profiles: JSON.parse(raw), activeId: aid };
    } catch { return { profiles: [], activeId: null }; }
  }

  function _lsSave() {
    try {
      localStorage.setItem(PROFILES_KEY, JSON.stringify(profiles));
      if (activeId) localStorage.setItem(ACTIVE_KEY, activeId);
      else localStorage.removeItem(ACTIVE_KEY);
    } catch {}
  }

  /* ─── Server API helpers ─────────────────────────────────── */
  async function _apiLoad() {
    try {
      const r = await fetch('/api/profiles', { signal: AbortSignal.timeout(2000) });
      if (!r.ok) throw new Error('Server error');
      return await r.json();
    } catch { return null; }
  }

  async function _apiSave() {
    if (!_useServer) return;
    try {
      await fetch('/api/profiles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ profiles, activeId }),
      });
    } catch {
      // 서버 저장 실패 시 무시 (localStorage는 이미 저장됨)
    }
  }

  /* ─── Init (비동기) ───────────────────────────────────────── */
  async function _init() {
    // 1. localStorage에서 먼저 로드 (빠른 첫 렌더)
    const ls = _lsLoad();
    profiles = ls.profiles;
    activeId = ls.activeId;
    state    = _resolveActive();

    // 2. 서버 API 시도
    const serverData = await _apiLoad();
    if (serverData && Array.isArray(serverData.profiles)) {
      _useServer = true;

      // 서버 데이터와 localStorage 데이터 병합
      // 더 많은 데이터를 가진 쪽 우선
      if (serverData.profiles.length >= profiles.length) {
        profiles = serverData.profiles;
        activeId = serverData.activeId || activeId;
      } else {
        // localStorage가 더 최신 → 서버에 업로드
        await _apiSave();
      }

      // localStorage 동기화
      _lsSave();
      state = _resolveActive();
      updateNavHearts();
    }
  }

  /* ─── Save (localStorage + 서버) ────────────────────────── */
  function _save() {
    _lsSave();
    if (_useServer) _apiSave(); // 비동기, 실패해도 무시
  }

  function _saveCurrentProfile() {
    if (!state.id) return;
    const idx = profiles.findIndex(p => p.id === state.id);
    if (idx >= 0) profiles[idx] = { ...state };
    else profiles.push({ ...state });
    _save();
  }

  /* ─── Profile API ────────────────────────────────────────── */
  function getProfiles()  { return profiles; }
  function getState()     { return state; }
  function getChar()      { return CHARACTERS[state.character] || '🐰'; }
  function getCharKey()   { return state.character || 'bunny'; }

  function addProfile(name, character) {
    const profile = {
      ...PROFILE_DEFAULTS,
      stars: { ...PROFILE_DEFAULTS.stars },
      id: _uid(),
      playerName: name,
      character,
    };
    profiles.push(profile);
    _save();
    switchProfile(profile.id);
    return profile;
  }

  function switchProfile(id) {
    activeId = id;
    if (_useServer) {
      fetch('/api/active', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ activeId: id }),
      }).catch(() => {});
    }
    localStorage.setItem(ACTIVE_KEY, id);
    state = _resolveActive();
    updateNavHearts();
    return state;
  }

  function deleteProfile(id) {
    profiles = profiles.filter(p => p.id !== id);
    if (activeId === id) {
      activeId = profiles.length ? profiles[0].id : null;
    }
    _save();
    if (activeId) localStorage.setItem(ACTIVE_KEY, activeId);
    else localStorage.removeItem(ACTIVE_KEY);
    state = _resolveActive();
  }

  function updateState(patch) {
    Object.assign(state, patch);
    _saveCurrentProfile();
    return state;
  }

  function addHearts(amount) {
    state.hearts += amount;
    const newLevel = Math.floor(state.hearts / 50) + 1;
    const leveledUp = newLevel > state.level;
    state.level = newLevel;
    _saveCurrentProfile();
    updateNavHearts();
    return { leveledUp, newLevel };
  }

  function setStars(module, stars) {
    if ((state.stars[module] || 0) < stars) {
      state.stars[module] = stars;
      _saveCurrentProfile();
    }
  }

  function addBadge(id) {
    if (!state.badges.includes(id)) {
      state.badges.push(id);
      _saveCurrentProfile();
      return true;
    }
    return false;
  }

  /* ─── Nav ────────────────────────────────────────────────── */
  function _base() {
    return window.location.pathname.replace(/\\/g,'/').includes('/pages/') ? '../' : './';
  }

  function renderNav(active) {
    const b = _base();
    const pages = [
      { id:'home',       icon:'🏠', label:'Inicio',  href: b+'index.html' },
      { id:'numbers',    icon:'🔢', label:'Números',  href: b+'pages/numbers.html' },
      { id:'operations', icon:'➕', label:'Juegos',   href: b+'pages/operations.html' },
      { id:'tables',     icon:'✖️', label:'Tablas',   href: b+'pages/tables.html' },
      { id:'rewards',    icon:'🏆', label:'Premios',  href: b+'pages/rewards.html' },
    ];
    return `
      <nav class="navbar" role="navigation" aria-label="Navegación principal">
        <a href="${b}index.html" class="navbar-logo" id="nav-logo">
          <img src="${b}assets/LATIDOS.png" alt="Fundación Latidos" class="logo-img" />
        </a>
        <div class="navbar-nav" role="menubar">
          ${pages.map(p => `
            <a href="${p.href}" class="nav-link${active===p.id?' active':''}" role="menuitem" id="nav-${p.id}">
              <span class="nav-icon">${p.icon}</span><span>${p.label}</span>
            </a>`).join('')}
        </div>
        <div class="navbar-points" id="nav-points-wrap" aria-label="Corazones">
          💖 <span id="nav-hearts">${state.hearts}</span>
          ${_useServer ? '<span title="서버 연결됨" style="font-size:0.7rem;opacity:0.6;margin-left:4px;">🌐</span>' : ''}
        </div>
      </nav>`;
  }

  function updateNavHearts() {
    const el = document.getElementById('nav-hearts');
    if (el) el.textContent = state.hearts;
  }

  async function initPage(active) {
    // 먼저 localStorage로 빠르게 렌더
    const ls = _lsLoad();
    profiles = ls.profiles;
    activeId = ls.activeId;
    state    = _resolveActive();

    const slot = document.getElementById('navbar-container');
    if (slot) slot.innerHTML = renderNav(active);
    updateNavHearts();

    // 백그라운드에서 서버 동기화
    _init().then(() => {
      // 서버 동기화 완료 후 nav 업데이트
      if (slot) slot.innerHTML = renderNav(active);
      updateNavHearts();
      // 페이지가 홈이면 프로필 목록 재렌더
      if (active === 'home' && typeof renderProfiles === 'function') {
        renderProfiles();
      }
    });
  }

  /* ─── Toast ──────────────────────────────────────────────── */
  function showToast(msg, ms = 2600) {
    let t = document.getElementById('global-toast');
    if (!t) {
      t = document.createElement('div');
      t.id = 'global-toast';
      t.className = 'toast';
      document.body.appendChild(t);
    }
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(t._tid);
    t._tid = setTimeout(() => t.classList.remove('show'), ms);
  }

  /* ─── Confetti ───────────────────────────────────────────── */
  function launchConfetti(n = 65) {
    const colors = ['#FF6B6B','#FFD93D','#6BCB77','#4D96FF','#C77DFF','#FF9F43'];
    for (let i = 0; i < n; i++) {
      const p = document.createElement('div');
      p.className = 'confetti-piece';
      p.style.cssText = `
        left:${Math.random()*100}vw; top:-18px;
        background:${colors[Math.floor(Math.random()*colors.length)]};
        width:${6+Math.random()*7}px; height:${6+Math.random()*7}px;
        border-radius:${Math.random()>.5?'50%':'2px'};
        animation-delay:${Math.random()*.45}s;
        animation-duration:${1.2+Math.random()*.9}s;`;
      document.body.appendChild(p);
      setTimeout(() => p.remove(), 2600);
    }
  }

  /* ─── Result Modal ───────────────────────────────────────── */
  function showModal({ emoji='🎉', title='¡Bien hecho!', message='', stars=0, heartsEarned=0, onNext, onHome }) {
    let overlay = document.getElementById('result-modal');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'result-modal';
      overlay.className = 'modal-overlay';
      overlay.innerHTML = `
        <div class="modal-box">
          <span class="modal-emoji" id="m-emoji"></span>
          <h2 id="m-title" style="margin-bottom:6px;"></h2>
          <p id="m-msg" style="color:var(--text-mid);font-weight:600;margin-bottom:12px;"></p>
          <div class="modal-stars" id="m-stars"></div>
          <div id="m-hearts" style="font-weight:800;font-size:1.1rem;color:var(--coral);margin:10px 0;"></div>
          <div style="display:flex;gap:10px;justify-content:center;margin-top:18px;">
            <button class="btn btn-ghost btn-sm" id="m-home">🏠 Inicio</button>
            <button class="btn btn-primary" id="m-next">¡Otra vez! 🎮</button>
          </div>
        </div>`;
      document.body.appendChild(overlay);
    }
    document.getElementById('m-emoji').textContent = emoji;
    document.getElementById('m-title').textContent = title;
    document.getElementById('m-msg').textContent   = message;
    const sh = document.getElementById('m-hearts');
    sh.textContent = heartsEarned ? `+${heartsEarned} 💖` : '';
    const ss = document.getElementById('m-stars');
    ss.innerHTML = [0,1,2].map(i =>
      `<span class="star${i<stars?' filled':''}">⭐</span>`).join('');

    const b = _base();
    document.getElementById('m-next').onclick = () => {
      overlay.classList.remove('active');
      if (onNext) onNext();
    };
    document.getElementById('m-home').onclick = () => {
      if (onHome) onHome(); else window.location.href = b+'index.html';
    };
    overlay.classList.add('active');
  }

  function hideModal() {
    const o = document.getElementById('result-modal');
    if (o) o.classList.remove('active');
  }

  /* ─── 서버 상태 조회 (디버깅용) ──────────────────────────── */
  function getServerStatus() {
    return { connected: _useServer };
  }

  /* ─── Public API ─────────────────────────────────────────── */
  return {
    getState, getProfiles, getChar, getCharKey,
    updateState, addHearts, setStars, addBadge,
    addProfile, switchProfile, deleteProfile,
    initPage, updateNavHearts,
    showToast, launchConfetti, showModal, hideModal,
    getServerStatus,
    CHARACTERS,
  };

})();
