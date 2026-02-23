# Replit MD

## Overview

This is a **Patreon clone** — a creator membership platform where fans can discover and support creators across categories like art, music, podcasts, gaming, writing, and video. The app displays creator profiles with membership tiers, posts, and social links. It's a full-stack TypeScript application with a React frontend and Express backend, backed by PostgreSQL.

The app currently supports browsing creators, viewing creator profiles with tiers and posts, and exploring by category. It seeds sample creator data on startup. There is no authentication or payment processing implemented yet — just the public-facing browsing experience.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight alternative to React Router)
- **State/Data Fetching**: TanStack React Query v5 for server state management
- **Styling**: Tailwind CSS with CSS variables for theming (light/dark mode support)
- **UI Components**: shadcn/ui (new-york style) built on Radix UI primitives
- **Build Tool**: Vite with HMR support in development
- **Path Aliases**: `@/` maps to `client/src/`, `@shared/` maps to `shared/`

Key pages:
- `/` — Home page with featured creators, categories, and stats
- `/explore` — Browse and filter creators by category/search
- `/creator/:slug` — Individual creator profile with tiers and posts tabs
- `/how-it-works` — Informational page about the platform

### Backend
- **Framework**: Express 5 on Node.js
- **Language**: TypeScript, run with `tsx` in development
- **API Pattern**: RESTful JSON API under `/api/` prefix
- **Server Setup**: HTTP server created manually (supports future WebSocket use)
- **Development**: Vite dev server middleware is injected for HMR; in production, static files are served from `dist/public`
- **Build**: Custom build script using esbuild for server bundling + Vite for client

API Routes:
- `GET /api/creators` — All creators
- `GET /api/creators/featured` — Verified/featured creators
- `GET /api/creators/:slug` — Single creator by slug
- `GET /api/creators/:slug/tiers` — Tiers for a creator
- `GET /api/creators/:slug/posts` — Posts for a creator

### Data Layer
- **Database**: PostgreSQL (required, via `DATABASE_URL` environment variable)
- **ORM**: Drizzle ORM with `drizzle-zod` for schema validation
- **Schema Location**: `shared/schema.ts` (shared between client and server)
- **Migrations**: Drizzle Kit with `drizzle-kit push` command (`npm run db:push`)
- **Storage Pattern**: `IStorage` interface in `server/storage.ts` with `DatabaseStorage` implementation — abstracts all DB operations

### Database Schema (4 tables)
1. **users** — id (UUID), username (unique), password
2. **creators** — id (UUID), name, slug (unique), tagline, description, category, avatarUrl, coverUrl, patronCount, postCount, isVerified, socialLinks (JSONB), createdAt
3. **tiers** — id (UUID), creatorId, name, price (integer cents), description, benefits (text array), isPopular
4. **posts** — id (UUID), creatorId, title, content, imageUrl, isPublic, minTierPrice, likeCount, commentCount, createdAt

### Seeding
- `server/seed.ts` automatically seeds sample creators, tiers, and posts on startup if the database is empty

### Shared Code
- The `shared/` directory contains the Drizzle schema and Zod types, used by both frontend (for TypeScript types) and backend (for DB operations and validation)

## External Dependencies

### Required Services
- **PostgreSQL**: Primary database. Connection string must be set via `DATABASE_URL` environment variable. Uses `pg` (node-postgres) driver with connection pooling.

### Key NPM Packages
- **drizzle-orm** + **drizzle-kit**: ORM and migration tooling for PostgreSQL
- **express** v5: HTTP server framework
- **@tanstack/react-query**: Client-side data fetching and caching
- **wouter**: Client-side routing
- **shadcn/ui components**: Full suite of Radix UI-based components (accordion, dialog, tabs, tooltips, etc.)
- **tailwindcss**: Utility-first CSS framework
- **date-fns**: Date formatting utilities
- **react-icons**: Social media icons (Twitter/X, Instagram, YouTube)
- **lucide-react**: General icon library
- **connect-pg-simple**: PostgreSQL session store (available but not yet actively used)
- **zod**: Runtime schema validation

### Development Tools
- **vite**: Frontend build and dev server
- **tsx**: TypeScript execution for the server
- **esbuild**: Server bundle optimization for production
- **@replit/vite-plugin-runtime-error-modal**: Error overlay in development