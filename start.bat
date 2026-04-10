@echo off
title Latidos Ninos Server
color 0A
echo.
echo  ╔═══════════════════════════════════════════╗
echo  ║        🎵 Latidos Ninos Server 🎵          ║
echo  ╠═══════════════════════════════════════════╣
echo  ║  Starting server...                       ║
echo  ╚═══════════════════════════════════════════╝
echo.

REM Check Node.js
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo  ❌ Node.js not found!
    echo  Please install Node.js from https://nodejs.org
    pause
    exit /b 1
)

REM Install dependencies if needed
if not exist "node_modules" (
    echo  Installing dependencies...
    npm install
    echo.
)

REM Start server
echo  Starting Express server...
timeout /t 1 /nobreak >nul
start "" "http://localhost:8080"
node server.js

pause
