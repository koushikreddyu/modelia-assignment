# Feature & Test Matrix

| Feature/Test                                        | Implemented | File/Path                                                                                                                           |
| --------------------------------------------------- | :---------: | ----------------------------------------------------------------------------------------------------------------------------------- |
| **JWT Auth (signup/login)**                         |      ✅      | `backend/src/routes/auth.ts`, `backend/src/controllers/authController.ts`, `backend/src/services/authService.ts`                    |
| **Password hashing (bcrypt)**                       |      ✅      | `backend/src/services/authService.ts`                                                                                               |
| **Token-protected routes (middleware)**             |      ✅      | `backend/src/middleware/authMiddleware.ts`                                                                                          |
| **Generations API: POST /generations**              |      ✅      | `backend/src/routes/generations.ts`, `backend/src/controllers/generationController.ts`, `backend/src/services/generationService.ts` |
| **Simulated delay (1–2s) & 20% “Model overloaded”** |      ✅      | `backend/src/services/generationService.ts`                                                                                         |
| **GET last 5 generations**                          |      ✅      | `backend/src/controllers/generationController.ts`                                                                                   |
| **Input validation (zod/joi)**                      |      ✅      | `backend/src/validation/schemas.ts`                                                                                                 |
| **DB models (Prisma + SQLite)**                     |      ✅      | `backend/prisma/schema.prisma`                                                                                                      |
| **OpenAPI spec**                                    |      ✅      | `OPENAPI.yaml`                                                                                                                      |
| **TypeScript strict mode (backend)**                |      ✅      | `backend/tsconfig.json` (`"strict": true`)                                                                                          |
| **ESLint + Prettier (backend)**                     |      ✅      | `backend/.eslintrc.cjs`, `backend/.prettierrc`                                                                                      |
| **Docker (optional)**                               |      ⬜️     | `docker-compose.yml` (left as TODO)                                                                                                 |

# Frontend (Next.js App Router)

| Feature/Test                                   | Implemented | File/Path                                                                                                              |
| ---------------------------------------------- | :---------: | ---------------------------------------------------------------------------------------------------------------------- |
| **Signup & Login forms (JWT persisted)**       |      ✅      | `frontend/src/app/auth/signup/page.tsx`, `frontend/src/app/auth/login/page.tsx`, `frontend/src/lib/auth.ts`, `frontend/src/lib/api.ts` |
| **Studio: Upload (≤10MB, JPEG/PNG) + preview** |      ✅      | `frontend/src/components/Upload.tsx`                                                                                       |
| **Prompt input + Style dropdown (3+ options)** |      ✅      | `frontend/src/components/Upload.tsx`                                                                                       |
| **Generate flow with spinner**                 |      ✅      | `frontend/src/hooks/useGenerate.ts`, `frontend/src/components/Upload.tsx`                                                      |
| **20% overload error handling + retry (≤3)**   |      ✅      | `frontend/src/hooks/useRetry.ts`, `frontend/src/hooks/useGenerate.ts`                                                          |
| **Abort mid-generation**                       |      ✅      | `frontend/src/hooks/useGenerate.ts` (AbortController)                                                                      |
| **History (last 5) + restore on click**        |      ✅      | `frontend/src/app/studio/page.tsx`, `frontend/src/components/GenerationCard.tsx`                                               |
| **A11y (labels, focus, roles)**                |      ✅      | Throughout components; e.g., `Upload.tsx` (aria-labels), alerts                                                        |
| **Responsive layout**                          |      ✅      | Tailwind classes in all pages/components                                                                               |
| **Dark mode toggle (bonus)**                   |      ⬜️     | TODO                                                                             |
| **Image optimization domain allowlist**        |      ✅      | `frontend/next.config.js` (remotePatterns for `localhost:4000`)                                                        |

# Testing & CI
| Feature/Test                              | Implemented | File/Path                                                                                                             |
| ----------------------------------------- | :---------: | --------------------------------------------------------------------------------------------------------------------- |
| **Backend unit tests (Jest + Supertest)** |      ✅      | `backend/tests/auth.test.ts`, `backend/tests/generations.test.ts`                                                     |
| **Validation tests & HTTP codes**         |      ✅      | `backend/tests/validation.test.ts`                                                                                    |
| **Frontend unit tests (RTL + Vitest)**    |       ⬜️     | `frontend/src/tests/Upload.test.tsx`, `frontend/src/tests/useGenerate.test.tsx`, `frontend/src/tests/Studio.test.tsx` (Tests written, still needs fixing as they fail) |
| **E2E (Cypress/Playwright)**              |      ⬜️      | `tests/e2e.spec.ts` (TODO)                                                          |
| **CI workflow & coverage artifact**       |      ✅      | `.github/workflows/ci.yml` (jobs for backend & frontend, uploads coverage)                                            |
