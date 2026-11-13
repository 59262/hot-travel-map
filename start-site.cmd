@echo off
chcp 65001 >nul
cd /d "%~dp0"

where node >nul 2>nul
if errorlevel 1 (
  echo Node.js was not found on PATH. Install Node.js 18 or newer first.
  pause
  exit /b 1
)

echo Starting travel website...
echo Project: %cd%
echo URL: http://127.0.0.1:5173/
echo.

start "" "http://127.0.0.1:5173/"

node "%~dp0server.mjs"

echo.
echo The website server has stopped.
echo Keep this window open while using the website.
pause
