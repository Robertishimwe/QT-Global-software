# QT-Global-software

This repository contains a TypeScript/Node backend and a React frontend (Vite + SWC).

## Overview

- Backend: `backend/` (Node + TypeScript)
- Frontend: `frontend/` (Vite + React + SWC). Vite is configured to serve on port 8080 (`frontend/vite.config.ts`).

> These instructions assume you're working inside the provided dev container or otherwise have Node.js and a package manager available.

## Prerequisites

- Node.js (v16 or newer recommended)
- npm, yarn, or pnpm
- (Optional) Docker / devcontainer tooling

## Setup (one-time)

From the repository root install dependencies for both projects:

```bash
# install frontend deps
cd frontend
npm install    # or `pnpm install` / `yarn`

# install backend deps
cd ../backend
npm install    # or `pnpm install` / `yarn`

# return to repo root
cd ..
```

Run both installs in parallel (optional):

```bash
npm --prefix frontend install &
npm --prefix backend install &
wait
```

## Run (development)

Start backend and frontend in separate terminals (or use a multiplexer/process manager):

Backend (run from `backend/`):

```bash
cd backend
npm run dev    # or `npm start` depending on available scripts
```

Frontend (Vite — serves on port 8080):

```bash
# QT-Global-software

This repository contains a TypeScript/Node backend and a React frontend (Vite + SWC).

## Overview

- Backend: `backend/` (Node + TypeScript)
- Frontend: `frontend/` (Vite + React + SWC). Vite is configured to serve on port 8080 (`frontend/vite.config.ts`).

> These instructions assume you're working inside the provided dev container or otherwise have Node.js and a package manager available.

## Prerequisites

- Node.js (v16 or newer recommended)
- npm, yarn, or pnpm
- (Optional) Docker / devcontainer tooling

## Setup (one-time)

From the repository root install dependencies for both projects:

```bash
# install frontend deps
cd frontend
npm install    # or `pnpm install` / `yarn`

# install backend deps
cd ../backend
npm install    # or `pnpm install` / `yarn`

# return to repo root
cd ..
```

Run both installs in parallel (optional):

```bash
npm --prefix frontend install &
npm --prefix backend install &
wait
```

## Run (development)

Start backend and frontend in separate terminals (or use a multiplexer/process manager):

Backend (run from `backend/`):

```bash
cd backend
npm run dev    # or `npm start` depending on available scripts
```

Frontend (Vite — serves on port 8080):

```bash
cd frontend
npm run dev
```

Open the frontend at http://localhost:8080

If you're inside the dev container and want to open the host browser from the container (host $BROWSER must be exposed), run:

```bash
"$BROWSER" "http://localhost:8080"
```

If the backend needs env variables or a database, check for `.env.example` or docs inside `backend/` and export the variables before starting the service.

## Build & Preview (production)

Frontend build & preview:

```bash
cd frontend
npm run build
npm run preview -- --port 8080
```

Backend build & run (if applicable):

```bash
cd backend
npm run build
npm start
```

## Troubleshooting

- Port conflicts: change the port in `frontend/vite.config.ts` or pass `--port <n>` to Vite.
- Missing scripts: inspect `frontend/package.json` and `backend/package.json` for available scripts and adjust commands accordingly.
- Dev container networking: ensure ports are forwarded from the container to the host if needed.

---

If anything is missing or you want me to add convenient top-level scripts (or a devcontainer README), tell me which approach you prefer and I will add it.