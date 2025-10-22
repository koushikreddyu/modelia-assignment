# Modelia Assignment

  

## How the Simulation Works

  

 - POST /generations
	 - Validates { prompt, style, image } (zod).
	 - Simulates 1–2s delay.
	 - 20% chance: returns 409 { message: "Model overloaded" }.
	 - Success: persists generation and returns { id, imageUrl, prompt,
	   style, status, createdAt }.
 - Retry & Abort (FE)
	 - useRetry provides exponential backoff up to 3 attempts.
	 - useGenerate creates an AbortController; Abort button cancels
	   in-flight request safely.

  

## Key Paths Overview

 - Backend
	 - backend/src/app.ts — Express app wiring (CORS, JSON, routes).
	 - backend/src/routes/*.ts — Route definitions for auth & generations.
	 - backend/src/controllers/* — Request handling (thin).
	 - backend/src/services/* — Business logic (delay, overload, persistence).
	 - backend/src/middleware/authMiddleware.ts — JWT check.
	 - backend/prisma/schema.prisma — User & Generation models.
	 - OPENAPI.yaml — API surface.
 - Frontend
	 - frontend/app/layout.tsx — Server layout + NavBar (client).
	 - frontend/app/page.tsx — Home.
	 - frontend/app/auth/*/page.tsx — Login/Signup.
	 - frontend/app/studio/page.tsx — Studio (client).
	 - frontend/components/* — Upload, GenerationCard, NavBar.
	 - frontend/hooks/* — useGenerate, useRetry.
	 - frontend/lib/* — api, auth, types.
	 - frontend/next.config.js — images.remotePatterns for backend localhost:4000.

## Notable Decisions

 - **SQLite + Prisma** for simplicity, fast CI, no external deps.
 - **Next.js App Router** with client components where
   browser APIs are needed; next/navigation used (not next/router).
 - **Axios interceptor** attaches JWT from localStorage on each request
   (client). Server-side calls (if added) would use cookies +
   next/headers.
 - **Error parsing helper** to normalize backend messages
   (string or JSON) before showing in UI.

## Known TODOs / Trade-offs

 - Docker Compose: optional, left as TODO (docker-compose.yml).
 - Dark mode toggle: pending (design-ready hooks/classes prepared).
 - CDN/static caching: not wired; can be added via Next Image + proper
   cache headers on backend.
 - Server Actions / Route Handlers: FE currently calls backend directly;
   could be proxied via app/api/*.

  

## Where AI was used

See AI_USAGE.md for prompts and decisions (scaffolding, error handling recipes, test scaffolds, ESLint/Prettier config, React 18 hydration fixes).

  

## Quick Verification Commands

    # Backend
   
    cd backend
    npm ci
    npx prisma generate
    npx prisma migrate deploy
    npx prisma db seed # if configured
    npm test -- --runInBand
    

    # Frontend
    
    cd frontend
    npm ci
    npm run test -- --coverage
    npm run dev
