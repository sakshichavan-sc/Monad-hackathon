@echo off
setlocal
where node >nul 2>nul || (echo Node.js is not installed or not on PATH. Install Node.js 22 LTS from https://nodejs.org/ and reopen this terminal.& pause & exit /b 1)
for /f "tokens=1 delims=.v" %%v in ('node -p "process.versions.node.split('.')[0]"') do set NODE_MAJOR=%%v
if %NODE_MAJOR% LSS 22 (echo Node.js 22 LTS or newer is required. Current version: & node -v & pause & exit /b 1)
if not exist node_modules (echo Installing dependencies... & call npm install || (echo Dependency installation failed. Check internet access and npm output.& pause & exit /b 1))
echo Starting DataForge at http://localhost:8080 ...
call npm run dev
pause
