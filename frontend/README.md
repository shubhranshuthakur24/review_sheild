# Review Shield Frontend

React + Vite frontend for Review Shield.

## Requirements

- Node.js 20+
- npm 10+

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create env file:
   ```bash
   cp .env.example .env
   ```
3. Set backend API URL in `.env`:
   ```env
   VITE_API_URL=http://localhost:8000/api
   ```

## Scripts

- `npm run dev`: start local dev server
- `npm run lint`: run ESLint
- `npm run typecheck`: run TypeScript checks
- `npm run build`: typecheck + production build
- `npm run preview`: preview production build locally

## PowerShell Note (Windows)

If PowerShell blocks `npm.ps1`, run commands with `npm.cmd`:

```powershell
npm.cmd install
npm.cmd run dev
```
