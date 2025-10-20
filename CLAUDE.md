# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

STYLE-MATRIX is a full-stack fashion technology platform featuring a virtual 3D fitting room with AI avatars. The application allows users to try on clothing virtually using personalized avatars.

**Architecture**: Monorepo with separate backend (Node.js/Express/Sequelize/PostgreSQL) and frontend (React/TypeScript/Vite/Redux Toolkit)

## Development Commands

### Backend (Node.js/Express/Sequelize)

Navigate to `backend/` directory first:

```bash
npm run dev              # Development server with hot reload (nodemon)
npm start                # Production server (ts-node)
npm test                 # Run all tests
npm run test:watch       # Run tests in watch mode
npm run test:associations # Test model associations only
npm run test:api         # Test API endpoints only
```

Backend runs on port 5000 by default. Health check available at `http://localhost:5000/api/health`

### Frontend (React/Vite)

Navigate to `frontend/` directory first:

```bash
npm run dev              # Development server (Vite)
npm run build            # Production build (TypeScript check + Vite build)
npm run lint             # Run ESLint
npm run preview          # Preview production build
```

Frontend runs on Vite's default port and proxies `/api` requests to `http://localhost:5000`

### Database

Backend uses Sequelize with PostgreSQL. Configuration in `backend/config/db.ts`

- Database credentials are loaded from `backend/.env`
- Migrations stored in `backend/migrations/`
- Seeders stored in `backend/seeders/`
- Use `sequelize.sync({ force: false })` in development (no auto-drop)

## Code Architecture

### Backend Structure

**Entry Point**: `backend/index.ts` - Express server with CORS, JSON middleware, DB connection, and route mounting

**Database Layer**:
- `config/db.ts` - Sequelize instance with PostgreSQL connection
- `models/` - Sequelize models for all entities
- `models/associations.ts` - **CRITICAL**: All model relationships are centralized here. Must call `setupAssociations()` before `sequelize.sync()`. Contains complex relationships including:
  - User has one Avatar (1:1)
  - User has many Clothing items, Ratings, Wardrobe items
  - User has dual Chat relationships (sender/recipient)
  - Avatar has many Outfits and TryOns
  - Clothing belongs to Type and Brand
  - Complex outfit management with current_outfit_id

**API Layer** (follows controller-route pattern):
- `routes/` - Express routers organized by domain (auth, avatar, clothing, wardrobe, chat, tryon, users)
- `controllers/` - Business logic handlers matching route domains
- All routes mounted under `/api` prefix

**Middleware**:
- `middleware/authMiddleware.ts` - JWT authentication via `authenticateToken` and role-based access control via `requireRole()`
- `middleware/errorHandler.ts` - Global error handling and 404 handler
- `middleware/validationMiddleware.ts` - Request validation helpers
- Request object is extended with `req.user` containing `{ userId, email, role }`

**Custom Errors**: `errors/` directory contains custom error classes (UnauthorizedError, ForbiddenError, etc.)

**Type Extensions**: `types/express.d.ts` extends Express Request interface globally

### Frontend Structure

**Entry Point**: `src/main.tsx` - React app with Redux Provider

**State Management**:
- Redux Toolkit in `src/store/`
- `store/index.ts` - Configure store with root reducer
- `store/reducers/` - Feature slices

**Routing**: React Router DOM for navigation

**API Layer**:
- `src/api/axiosInstance.ts` - Configured Axios instance
- Services layer (currently empty but structure exists in `src/services/`)

**Components**:
- `src/components/` - Reusable UI components (Header, Footer, Layout)
- `src/pages/` - Route pages (Home, Chat, FittingRoom)

**PWA**: Configured with vite-plugin-pwa for offline support and installability

### Authentication Flow

1. User registration/login via `/api/auth/register/email` or `/api/auth/login/email`
2. Backend returns JWT token
3. Frontend stores token and includes in Authorization header as `Bearer <token>`
4. Protected routes use `authenticateToken` middleware which decodes JWT and populates `req.user`
5. Role restrictions enforced via `requireRole(['admin'])` middleware

### Model Relationships (Important)

The database schema has intricate relationships managed in `models/associations.ts`. Key patterns:
- Always use the established aliases when querying (e.g., `include: { model: User, as: 'user' }`)
- Aliases are documented with Russian comments in associations.ts (e.g., "← ОРИГИНАЛЬНЫЙ алиас")
- Avatar has bidirectional relationship with AvatarOutfit via both `avatar_id` FK and `current_outfit_id` FK
- Chat messages have dual User relationships (sender vs recipient) with different aliases

## Testing

- Backend uses Jest with ts-jest preset
- Tests in `backend/tests/` directory
- Coverage collected from controllers, models, and middleware
- Test database should be separate from development (configure in .env or test setup)

## Environment Configuration

Backend requires `.env` file with:
- `DB_NAME`, `DB_USER`, `DB_PASSWORD`, `DB_HOST`, `DB_PORT` (PostgreSQL)
- `JWT_SECRET` (for token signing)
- `PORT` (optional, defaults to 5000)
- `NODE_ENV` (enables/disables SQL logging)

## Key Technical Decisions

- **No force sync in production**: `sequelize.sync({ force: false })` prevents data loss
- **Centralized associations**: All Sequelize associations must be in `models/associations.ts` to avoid circular dependency issues
- **Type safety**: TypeScript strict mode enabled on both frontend and backend
- **Proxy setup**: Frontend Vite dev server proxies API calls to avoid CORS in development
- **JWT authentication**: Stateless auth with token in Authorization header
