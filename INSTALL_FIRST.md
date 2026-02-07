# ⚠️ IMPORTANT: Install Dependencies First!

Before the application can run, you need to install all dependencies.

## Quick Install

Run this command in your terminal:

```bash
npm install
```

This will install:
- React and React DOM
- TypeScript and type definitions
- Vite (build tool)
- Tailwind CSS
- Zustand (state management)
- date-fns (date utilities)
- React Router
- React Icons
- All other dependencies

## After Installation

Once `npm install` completes successfully, you can:

1. **Start development server:**
   ```bash
   npm run dev
   ```

2. **Build for production:**
   ```bash
   npm run build
   ```

## Troubleshooting

### If npm install fails:

1. **Check Node.js version:**
   ```bash
   node --version
   ```
   You need Node.js 18 or higher.

2. **Clear npm cache:**
   ```bash
   npm cache clean --force
   npm install
   ```

3. **Delete node_modules and try again:**
   ```bash
   rmdir /s /q node_modules
   del package-lock.json
   npm install
   ```

### If you see TypeScript errors:

These are normal before running `npm install`. The errors will disappear once all packages are installed.

## What Gets Installed

The `npm install` command will create a `node_modules` folder with approximately:
- **Size**: ~300-400 MB
- **Packages**: ~1000+ packages (including dependencies)
- **Time**: 1-3 minutes depending on your internet speed

## Next Steps

After successful installation:
1. Read `QUICKSTART.md` for usage guide
2. Read `README.md` for full documentation
3. Run `npm run dev` to start the app
4. Open `http://localhost:5173` in your browser

---

**Note**: The TypeScript errors you see in the IDE will resolve automatically after running `npm install`.
