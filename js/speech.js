/**
 * speech.js — Latidos Niños English
 * Web Speech API 기반 TTS (Text-to-Speech)
 *
 * 사용법:
 *   Speech.sayEnglish("Hello!");       // 영어 TTS
 *   Speech.saySpanish("Hola!");        // 스페인어 TTS
 *   Speech.say("text", { lang })      // 직접 lang 지정
 *   Speech.isSupported()              // 지원 여부 확인
 */

const Speech = (function () {

  let _voices = [];
  let _enVoice = null;
  let _esVoice = null;

  function _loadVoices() {
    _voices = window.speechSynthesis.getVoices();

    // 영어 음성: en-US 우선
    _enVoice =
      _voices.find(v => v.lang === 'en-US') ||
      _voices.find(v => v.lang.startsWith('en-')) ||
      _voices.find(v => v.lang.startsWith('en')) ||
      null;

    // 스페인어 음성: es-419(중남미) 우선
    _esVoice =
      _voices.find(v => v.lang === 'es-419') ||
      _voices.find(v => v.lang === 'es-MX') ||
      _voices.find(v => v.lang.startsWith('es-')) ||
      _voices.find(v => v.lang.startsWith('es')) ||
      null;
  }

  if (window.speechSynthesis) {
    _loadVoices();
    window.speechSynthesis.onvoiceschanged = _loadVoices;
  }

  function isSupported() {
    return 'speechSynthesis' in window;
  }

  function say(text, { rate = 0.8, pitch = 1.1, lang = 'en-US' } = {}) {
    if (!isSupported()) return;
    window.speechSynthesis.cancel();

    const utt = new SpeechSynthesisUtterance(text + ' . . .');
    utt.lang  = lang;
    utt.rate  = rate;
    utt.pitch = pitch;

    // 언어에 맞는 음성 선택
    if (lang.startsWith('en') && _enVoice) utt.voice = _enVoice;
    if (lang.startsWith('es') && _esVoice) utt.voice = _esVoice;

    window.speechSynthesis.speak(utt);

    // Chrome: 긴 침묵 시 pause 버그 방지
    const keepAlive = setInterval(() => {
      if (window.speechSynthesis.speaking) {
        window.speechSynthesis.pause();
        window.speechSynthesis.resume();
      } else {
        clearInterval(keepAlive);
      }
    }, 10000);
    utt.onend = () => clearInterval(keepAlive);
    return utt;
  }

  function sayEnglish(text, opts = {}) {
    return say(text, { rate: 0.82, pitch: 1.1, lang: 'en-US', ...opts });
  }

  function saySpanish(text, opts = {}) {
    return say(text, { rate: 0.8, pitch: 1.1, lang: 'es-419', ...opts });
  }

  // 알파벳 발음: 천천히, 또렷하게
  function sayLetter(letter, opts = {}) {
    return say(letter, { rate: 0.7, pitch: 1.15, lang: 'en-US', ...opts });
  }

  function getAvailableVoices(langPrefix = 'en') {
    return _voices.filter(v => v.lang.startsWith(langPrefix));
  }

  return { isSupported, say, sayEnglish, saySpanish, sayLetter, getAvailableVoices };
})();
