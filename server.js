/**
 * server.js — Latidos Niños Local Server
 * Express 기반 로컬 서버
 * - 정적 파일 서빙 (HTML, CSS, JS, assets)
 * - 프로필 데이터를 JSON 파일로 영구 저장
 * - REST API: /api/profiles
 */

const express = require('express');
const fs      = require('fs');
const path    = require('path');
const http    = require('http');
const os      = require('os');

const app  = express();
const PORT = process.env.PORT || 8080;

/* ── 데이터 저장 경로 ───────────────────────────────────────── */
const DATA_DIR  = path.join(__dirname, 'data');
const DATA_FILE = path.join(DATA_DIR, 'profiles.json');

// data 폴더가 없으면 생성
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, JSON.stringify({ profiles: [], activeId: null }, null, 2));

/* ── 헬퍼 함수 ──────────────────────────────────────────────── */
function readData() {
  try {
    return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
  } catch {
    return { profiles: [], activeId: null };
  }
}

function writeData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

function getLocalIPs() {
  const nets = os.networkInterfaces();
  const ips = [];
  for (const iface of Object.values(nets)) {
    for (const net of iface) {
      if (net.family === 'IPv4' && !net.internal) {
        ips.push(net.address);
      }
    }
  }
  return ips;
}

/* ── 미들웨어 ───────────────────────────────────────────────── */
app.use(express.json());
app.use(express.static(path.join(__dirname)));  // 정적 파일 서빙

/* ── API: 프로필 전체 조회 ──────────────────────────────────── */
app.get('/api/profiles', (req, res) => {
  const data = readData();
  res.json(data);
});

/* ── API: 프로필 저장 (전체 덮어쓰기) ──────────────────────── */
app.post('/api/profiles', (req, res) => {
  const { profiles, activeId } = req.body;
  if (!Array.isArray(profiles)) {
    return res.status(400).json({ error: 'profiles must be an array' });
  }
  writeData({ profiles, activeId: activeId || null });
  res.json({ success: true });
});

/* ── API: 단일 프로필 업데이트 ──────────────────────────────── */
app.put('/api/profiles/:id', (req, res) => {
  const data = readData();
  const idx = data.profiles.findIndex(p => p.id === req.params.id);
  if (idx === -1) {
    return res.status(404).json({ error: 'Profile not found' });
  }
  data.profiles[idx] = { ...data.profiles[idx], ...req.body };
  writeData(data);
  res.json(data.profiles[idx]);
});

/* ── API: 단일 프로필 추가 ──────────────────────────────────── */
app.post('/api/profiles/add', (req, res) => {
  const data = readData();
  const profile = req.body;
  if (!profile.id || !profile.playerName) {
    return res.status(400).json({ error: 'id and playerName are required' });
  }
  const existing = data.profiles.findIndex(p => p.id === profile.id);
  if (existing >= 0) {
    data.profiles[existing] = profile;
  } else {
    data.profiles.push(profile);
  }
  writeData(data);
  res.json({ success: true, profile });
});

/* ── API: 프로필 삭제 ───────────────────────────────────────── */
app.delete('/api/profiles/:id', (req, res) => {
  const data = readData();
  const before = data.profiles.length;
  data.profiles = data.profiles.filter(p => p.id !== req.params.id);
  if (data.activeId === req.params.id) {
    data.activeId = data.profiles.length ? data.profiles[0].id : null;
  }
  if (data.profiles.length === before) {
    return res.status(404).json({ error: 'Profile not found' });
  }
  writeData(data);
  res.json({ success: true });
});

/* ── API: 활성 프로필 변경 ──────────────────────────────────── */
app.post('/api/active', (req, res) => {
  const { activeId } = req.body;
  const data = readData();
  data.activeId = activeId;
  writeData(data);
  res.json({ success: true });
});

/* ── API: 서버 상태 확인 ────────────────────────────────────── */
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    version: '1.0.0',
    uptime: Math.floor(process.uptime()),
    profiles: readData().profiles.length
  });
});

/* ── SPA 폴백 (모든 未知 경로 → index.html) ────────────────── */
app.get('/{*splat}', (req, res) => {
  // API 경로가 아닌 경우만 index.html 반환
  if (!req.path.startsWith('/api/')) {
    res.sendFile(path.join(__dirname, 'index.html'));
  } else {
    res.status(404).json({ error: 'API endpoint not found' });
  }
});

/* ── 서버 시작 ──────────────────────────────────────────────── */
app.listen(PORT, '0.0.0.0', () => {
  const localIPs = getLocalIPs();
  
  console.log('');
  console.log('  ╔═══════════════════════════════════════════╗');
  console.log('  ║        🎵 Latidos Niños Server 🎵          ║');
  console.log('  ╠═══════════════════════════════════════════╣');
  console.log(`  ║  ✅ 서버 시작됨 (포트 ${PORT})              ║`);
  console.log('  ║                                           ║');
  console.log(`  ║  💻 로컬:  http://localhost:${PORT}         ║`);
  if (localIPs.length > 0) {
    localIPs.forEach(ip => {
      console.log(`  ║  📱 핸드폰: http://${ip}:${PORT}   ║`);
    });
  }
  console.log('  ║                                           ║');
  console.log('  ║  📂 데이터 저장: data/profiles.json       ║');
  console.log('  ║  🛑 종료: Ctrl+C                          ║');
  console.log('  ╚═══════════════════════════════════════════╝');
  console.log('');
});
