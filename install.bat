@echo off
echo ========================================
echo AI Study Planner - Installation Script
echo ========================================
echo.

echo Checking Node.js installation...
node --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js is not installed!
    echo Please install Node.js from https://nodejs.org/
    echo.
    pause
    exit /b 1
)

echo Node.js version:
node --version
echo.

echo Installing dependencies...
echo This may take 2-3 minutes...
echo.

npm install

if errorlevel 1 (
    echo.
    echo ERROR: Installation failed!
    echo Try running: npm cache clean --force
    echo Then run this script again.
    echo.
    pause
    exit /b 1
)

echo.
echo ========================================
echo Installation completed successfully!
echo ========================================
echo.
echo To start the development server, run:
echo   npm run dev
echo.
echo Then open http://localhost:5173 in your browser
echo.
pause
