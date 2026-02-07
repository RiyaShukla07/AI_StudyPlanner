# GitHub Upload Instructions

Follow these steps to upload your AI Study Planner to GitHub repository: **RiyaShukla07/AI_StudyPlanner**

## Option 1: Using Git Commands (Recommended)

### Step 1: Open Command Prompt or PowerShell
Navigate to your project directory:
```cmd
cd path\to\your\AI_StudyPlanner
```

### Step 2: Initialize Git Repository (if not already done)
```cmd
git init
```

### Step 3: Add Remote Repository
```cmd
git remote add origin https://github.com/RiyaShukla07/AI_StudyPlanner.git
```

If you get an error saying remote already exists, remove it first:
```cmd
git remote remove origin
git remote add origin https://github.com/RiyaShukla07/AI_StudyPlanner.git
```

### Step 4: Add All Files
```cmd
git add .
```

### Step 5: Commit Your Changes
```cmd
git commit -m "Initial commit: AI Study Planner with all features"
```

### Step 6: Push to GitHub
```cmd
git push -u origin main
```

If you get an error about branch name, try:
```cmd
git branch -M main
git push -u origin main
```

### Step 7: Enter GitHub Credentials
When prompted, enter your GitHub username and password (or personal access token).

**Note**: GitHub no longer accepts passwords for Git operations. You need to create a Personal Access Token:
1. Go to GitHub.com → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Click "Generate new token (classic)"
3. Give it a name like "AI Study Planner Upload"
4. Select scopes: `repo` (full control of private repositories)
5. Click "Generate token"
6. Copy the token and use it as your password when pushing

---

## Option 2: Using GitHub Desktop (Easier for Beginners)

### Step 1: Download GitHub Desktop
- Download from: https://desktop.github.com/
- Install and sign in with your GitHub account

### Step 2: Add Your Repository
1. Click "File" → "Add local repository"
2. Browse to your AI_StudyPlanner folder
3. Click "Add repository"

If it says "This directory does not appear to be a Git repository":
1. Click "Create a repository instead"
2. Keep the default settings
3. Click "Create repository"

### Step 3: Publish to GitHub
1. Click "Publish repository" button at the top
2. Repository name: `AI_StudyPlanner`
3. Description: "AI-powered study planner for engineering students"
4. Uncheck "Keep this code private" if you want it public
5. Click "Publish repository"

### Step 4: Done!
Your code is now on GitHub at: https://github.com/RiyaShukla07/AI_StudyPlanner

---

## Option 3: Using GitHub Web Interface (Upload Files)

### Step 1: Create Repository on GitHub
1. Go to https://github.com/RiyaShukla07
2. Click "New" or "+" → "New repository"
3. Repository name: `AI_StudyPlanner`
4. Description: "AI-powered study planner for engineering students"
5. Choose Public or Private
6. **DO NOT** initialize with README (we already have one)
7. Click "Create repository"

### Step 2: Upload Files
1. On the repository page, click "uploading an existing file"
2. Drag and drop ALL your project files and folders
3. **Important**: Make sure to include:
   - All source files (src folder)
   - Configuration files (package.json, tsconfig.json, etc.)
   - .kiro folder with specs
   - README.md and other documentation
4. Add commit message: "Initial commit: AI Study Planner"
5. Click "Commit changes"

**Note**: This method might have file size limits and won't upload node_modules (which is good - it's in .gitignore).

---

## What Gets Uploaded?

Based on your `.gitignore` file, these will **NOT** be uploaded (which is correct):
- `node_modules/` (dependencies - users will run `npm install`)
- `dist/` (build output)
- Log files
- `.vscode/` settings
- Local environment files

Everything else will be uploaded, including:
- All source code (`src/` folder)
- Configuration files
- Documentation files
- Spec files (`.kiro/specs/`)
- Package.json (so others can install dependencies)

---

## After Upload - Verify

1. Go to https://github.com/RiyaShukla07/AI_StudyPlanner
2. Check that all files are there
3. Verify README.md displays correctly
4. Check that the repository description is set

---

## Troubleshooting

### "Repository not found" error
- Make sure the repository exists on GitHub
- Check the repository name is exactly: `AI_StudyPlanner`
- Verify you're logged in to the correct GitHub account

### "Permission denied" error
- Use a Personal Access Token instead of password
- Make sure you have write access to the repository

### "Large files" warning
- This is normal for node_modules (but it's excluded by .gitignore)
- If you see this, make sure .gitignore is working

### Files not showing up
- Check .gitignore isn't excluding them
- Make sure you ran `git add .` before committing

---

## Next Steps After Upload

1. **Add Repository Description**: 
   - Go to repository settings
   - Add description: "AI-powered study planner for engineering students"
   - Add topics: `react`, `typescript`, `ai`, `study-planner`, `education`

2. **Enable GitHub Pages** (optional):
   - Settings → Pages
   - Source: Deploy from branch
   - Branch: main, folder: /dist (after building)

3. **Add a License** (optional):
   - Add file → Create new file
   - Name: LICENSE
   - Choose MIT License template

4. **Share Your Project**:
   - Copy the repository URL
   - Share with friends, on LinkedIn, or in your portfolio

---

## Need Help?

If you encounter any issues:
1. Check the error message carefully
2. Google the error message
3. Ask on GitHub Community forums
4. Or contact me for assistance

Good luck! 🚀
