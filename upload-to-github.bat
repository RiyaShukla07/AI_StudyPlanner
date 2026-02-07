@echo off
echo ========================================
echo AI Study Planner - GitHub Upload Script
echo ========================================
echo.

echo Step 1: Initializing Git repository...
git init
if %errorlevel% neq 0 (
    echo ERROR: Git initialization failed. Make sure Git is installed.
    echo Download Git from: https://git-scm.com/download/win
    pause
    exit /b 1
)
echo ✓ Git initialized successfully
echo.

echo Step 2: Adding remote repository...
git remote remove origin 2>nul
git remote add origin https://github.com/RiyaShukla07/AI_StudyPlanner.git
if %errorlevel% neq 0 (
    echo ERROR: Failed to add remote repository
    pause
    exit /b 1
)
echo ✓ Remote repository added
echo.

echo Step 3: Adding all files...
git add .
if %errorlevel% neq 0 (
    echo ERROR: Failed to add files
    pause
    exit /b 1
)
echo ✓ All files added
echo.

echo Step 4: Creating commit...
git commit -m "Initial commit: AI Study Planner with all features and documentation"
if %errorlevel% neq 0 (
    echo ERROR: Failed to create commit
    echo Make sure you have configured Git with your name and email:
    echo   git config --global user.name "Your Name"
    echo   git config --global user.email "your.email@example.com"
    pause
    exit /b 1
)
echo ✓ Commit created successfully
echo.

echo Step 5: Setting main branch...
git branch -M main
echo ✓ Branch set to main
echo.

echo Step 6: Pushing to GitHub...
echo.
echo IMPORTANT: You will be asked for your GitHub credentials.
echo Username: RiyaShukla07
echo Password: Use your Personal Access Token (NOT your GitHub password)
echo.
echo If you don't have a token, create one at:
echo https://github.com/settings/tokens
echo.
pause

git push -u origin main
if %errorlevel% neq 0 (
    echo.
    echo ERROR: Failed to push to GitHub
    echo.
    echo Common issues:
    echo 1. Wrong credentials - Use Personal Access Token as password
    echo 2. Repository doesn't exist - Create it on GitHub first
    echo 3. No internet connection
    echo.
    echo To create a Personal Access Token:
    echo 1. Go to: https://github.com/settings/tokens
    echo 2. Click "Generate new token (classic)"
    echo 3. Select "repo" scope
    echo 4. Copy the token and use it as your password
    echo.
    pause
    exit /b 1
)

echo.
echo ========================================
echo ✓ SUCCESS! Your code is now on GitHub!
echo ========================================
echo.
echo View your repository at:
echo https://github.com/RiyaShukla07/AI_StudyPlanner
echo.
pause
