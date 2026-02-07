@echo off
echo ========================================
echo Git Configuration Setup
echo ========================================
echo.
echo This script will configure Git with your details.
echo.

set /p username="Enter your name (e.g., Riya Shukla): "
set /p email="Enter your email (e.g., riya@example.com): "

echo.
echo Configuring Git...
git config --global user.name "%username%"
git config --global user.email "%email%"

if %errorlevel% neq 0 (
    echo ERROR: Git configuration failed
    echo Make sure Git is installed: https://git-scm.com/download/win
    pause
    exit /b 1
)

echo.
echo ✓ Git configured successfully!
echo.
echo Your settings:
git config --global user.name
git config --global user.email
echo.
echo You can now run: upload-to-github.bat
echo.
pause
