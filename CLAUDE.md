# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Development Tasks

### Frontend (React/Vite)
- Start development server: `npm run dev` (from `/frontend`)
- Build for production: `npm run build` (from `/frontend`)
- Lint code: `npm run lint` (from `/frontend`)
- Preview production build: `npm run preview` (from `/frontend`)
- Install dependencies: `npm install` (from `/frontend`)

## Code Architecture

### Frontend Structure
- **Technology Stack**: React 19, Vite, Tailwind CSS, Redux Toolkit (planned for state management)
- **Entry Point**: `frontend/src/main.jsx` renders `<App />` via ReactDOM
- **Root Component**: `frontend/src/App.jsx` - main application component
- **Styling**:
  - Global CSS: `frontend/src/index.css`
  - Component-level: `frontend/src/App.css`
  - Utility-first styling via Tailwind CSS (configured in `vite.config.js` and `postcss` implicitly)
- **Assets**: Images and icons in `frontend/src/assets/`
- **Public Assets**: Favicon and SVG icons in `frontend/public/`

### State Management
Redux Toolkit is set up for application-wide state management. The store is configured in `frontend/src/store.js` and made available via `<Provider>` in `main.jsx`. This includes:
- A counter slice for demonstration
- Planned extensions for Public Review Funnel System state
- Business Dashboard state (Review Inbox, Replies, Alerts, Funnel Builder)
- Authentication and API integration state

### Key Directories
- `frontend/src/` - Source code for React application
- `frontend/public/` - Static assets served at root URL
- `node_modules/` - Dependencies (not committed)

## Development Guidelines

1. **Component Creation**: Follow React functional component patterns with hooks
2. **Styling**: Use Tailwind CSS utility classes; avoid custom CSS when possible
3. **State Management**: When implementing features, use Redux Toolkit slices and hooks (`useSelector`, `useDispatch`)
4. **Code Organization**: Keep components small and focused; extract reusable components
5. **Performance**: Leverage React.memo and useCallback/useMemo appropriately for expensive operations

## Notes
- The project is currently in Phase 1 implementation focusing on UI components
- No test files exist yet; testing strategy will be defined in later phases
- Configuration files:
  - Vite: `frontend/vite.config.js`
  - ESLint: `frontend/eslint.config.js`
  - Tailwind CSS: Configured via `postcss` and `autoprefixer` dependencies