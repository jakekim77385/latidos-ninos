/**
 * sounds.js — Latidos Niños
 * Web Audio API — no external files needed
 */

const Sounds = (function () {
  let ctx = null;

  function ctx_() {
    if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
    return ctx;
  }

  function enabled() {
    return App.getState().soundEnabled !== false;
  }

  function tone(freq, dur, type = 'sine', vol = 0.28) {
    if (!enabled()) return;
    try {
      const c = ctx_();
      const osc  = c.createOscillator();
      const gain = c.createGain();
      osc.connect(gain);
      gain.connect(c.destination);
      osc.type = type;
      osc.frequency.setValueAtTime(freq, c.currentTime);
      gain.gain.setValueAtTime(vol, c.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + dur);
      osc.start(c.currentTime);
      osc.stop(c.currentTime + dur);
    } catch {}
  }

  function sequence(notes) {
    // notes: [{freq, dur, delay, type, vol}]
    notes.forEach(n => setTimeout(() => tone(n.freq, n.dur, n.type||'sine', n.vol||0.28), n.delay||0));
  }

  return {
    correct() {
      sequence([
        { freq: 523, dur: 0.1, delay: 0 },
        { freq: 659, dur: 0.1, delay: 90 },
        { freq: 784, dur: 0.2, delay: 190 },
      ]);
    },
    wrong() {
      tone(200, 0.3, 'sawtooth', 0.14);
    },
    click() {
      tone(600, 0.07, 'sine', 0.14);
    },
    levelUp() {
      sequence([523,587,659,698,784,880,1047].map((f,i) =>
        ({ freq: f, dur: 0.2, delay: i * 75 })));
    },
    bingo() {
      sequence([392,440,523,659,784,880,1047].map((f,i) =>
        ({ freq: f, dur: 0.25, delay: i * 65 })));
    },
    tick() {
      tone(880, 0.05, 'square', 0.09);
    },
    pop() {
      tone(400, 0.08, 'sine', 0.2);
      setTimeout(() => tone(600, 0.05, 'sine', 0.15), 60);
    },
    star() {
      sequence([784, 1047, 1319].map((f,i) => ({ freq:f, dur:0.15, delay: i*80 })));
    },
  };
})();
