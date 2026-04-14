@echo off
chcp 65001 >nul 2>&1
title 🎵 Latidos Niños
color 0A

echo.
echo  ╔══════════════════════════════════════════════════╗
echo  ║          🎵  Latidos Niños  🎵                   ║
echo  ║       수학을 배우는 즐거운 플랫폼                 ║
echo  ╚══════════════════════════════════════════════════╝
echo.

REM ── 현재 폴더로 이동 (bat 파일 위치 기준) ──────────────────
cd /d "%~dp0"

REM ── Node.js 설치 여부 확인 ─────────────────────────────────
echo  [1/3] Node.js 확인 중...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo.
    echo  ╔══════════════════════════════════════════════════╗
    echo  ║  ❌ Node.js가 설치되어 있지 않습니다!            ║
    echo  ║                                                  ║
    echo  ║  아래 주소에서 다운로드 후 설치해주세요:          ║
    echo  ║  https://nodejs.org  (LTS 버전 권장)             ║
    echo  ║                                                  ║
    echo  ║  설치 후 이 파일을 다시 실행하세요.              ║
    echo  ╚══════════════════════════════════════════════════╝
    echo.
    start https://nodejs.org
    pause
    exit /b 1
)
for /f "tokens=*" %%v in ('node --version') do set NODE_VER=%%v
echo  ✅ Node.js %NODE_VER% 확인됨
echo.

REM ── node_modules 없으면 자동 설치 ─────────────────────────
echo  [2/3] 패키지 확인 중...
if not exist "node_modules\" (
    echo  📦 필요한 패키지를 설치합니다 (최초 1회)...
    echo.
    npm install --loglevel=error
    if %errorlevel% neq 0 (
        echo.
        echo  ❌ 패키지 설치 실패! 인터넷 연결을 확인해주세요.
        pause
        exit /b 1
    )
    echo  ✅ 패키지 설치 완료
) else (
    echo  ✅ 패키지 이미 설치됨
)
echo.

REM ── 기존에 실행 중인 서버 종료 (포트 8080) ────────────────
echo  [3/3] 서버 시작 중...
for /f "tokens=5" %%a in ('netstat -aon ^| find ":8080" ^| find "LISTENING" 2^>nul') do (
    taskkill /f /pid %%a >nul 2>&1
)

REM ── 브라우저 열기 (1초 후) ────────────────────────────────
start "" cmd /c "timeout /t 2 /nobreak >nul && start http://localhost:8080"

REM ── 서버 실행 ──────────────────────────────────────────────
echo.
echo  ╔══════════════════════════════════════════════════╗
echo  ║  🚀 서버가 시작됩니다...                         ║
echo  ║  💻 주소: http://localhost:8080                  ║
echo  ║  📱 같은 와이파이 기기에서도 접속 가능            ║
echo  ║  🛑 종료하려면 이 창을 닫거나 Ctrl+C 누르세요    ║
echo  ╚══════════════════════════════════════════════════╝
echo.

node server.js

REM ── 서버가 종료된 경우 ─────────────────────────────────────
echo.
echo  서버가 종료되었습니다.
pause
