# QT-Global-software

This repository contains a TypeScript/Node backend and a React frontend (Vite + SWC).

## Overview

- Backend: `backend/` (Node + TypeScript).
- Frontend: `frontend/` (Vite + React + SWC). Vite is configured to serve on port 8080 (`frontend/vite.config.ts`).

> This project is commonly developed inside the provided dev container (Ubuntu 24.04.2 LTS). The instructions below assume you're in the dev container or otherwise have Node.js and a package manager installed.

## Prerequisites

- Node.js (v16 or newer recommended)
- npm, yarn, or pnpm
- (Optional) Docker / devcontainer tooling if you want to run inside the repo dev container

## Setup (one-time)

Install dependencies for both frontend and backend from the repository root:

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

You can also run both installs in parallel from the repo root (example with npm):

```bash
npm --prefix frontend install &
npm --prefix backend install &
wait
```

## Run in development

Start backend and frontend in separate terminals (or use a process manager / tmux).

1) Start backend

```bash
cd backend
npm run dev    # or `npm start` depending on the project's scripts
```

2) Start frontend (Vite) — binds to all interfaces and uses port 8080

```bash
# QT-Global-software

This repository contains a TypeScript/Node backend and a React frontend (Vite + SWC).

## Overview

- Backend: `backend/` (Node + TypeScript).
- Frontend: `frontend/` (Vite + React + SWC). Vite is configured to serve on port 8080 (`frontend/vite.config.ts`).

> This project is commonly developed inside the provided dev container (Ubuntu 24.04.2 LTS). The instructions below assume you're in the dev container or otherwise have Node.js and a package manager installed.

## Prerequisites

- Node.js (v16 or newer recommended)
- npm, yarn, or pnpm
- (Optional) Docker / devcontainer tooling if you want to run inside the repo dev container

## Setup (one-time)

Install dependencies for both frontend and backend from the repository root:

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

You can also run both installs in parallel from the repo root (example with npm):

```bash
npm --prefix frontend install &
npm --prefix backend install &
wait
```

## Run in development

Start backend and frontend in separate terminals (or use a process manager / tmux).

1) Start backend

```bash
cd backend
npm run dev    # or `npm start` depending on the project's scripts
```

2) Start frontend (Vite) — binds to all interfaces and uses port 8080
# QT-Global-software

This repository contains a TypeScript/Node backend and a React frontend (Vite + SWC).

## Overview

- Backend: `backend/` (Node + TypeScript).
- Frontend: `frontend/` (Vite + React + SWC). Vite is configured to serve on port 8080 (`frontend/vite.config.ts`).

> This project is commonly developed inside the provided dev container (Ubuntu 24.04.2 LTS). The instructions below assume you're in the dev container or otherwise have Node.js and a package manager installed.

## Prerequisites

- Node.js (v16 or newer recommended)
- npm, yarn, or pnpm
- (Optional) Docker / devcontainer tooling if you want to run inside the repo dev container

## Setup (one-time)

Install dependencies for both frontend and backend from the repository root:

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

You can also run both installs in parallel from the repo root (example with npm):

```bash
npm --prefix frontend install &
npm --prefix backend install &
wait
```

## Run in development

Start backend and frontend in separate terminals (or use a process manager / tmux).

1) Start backend

```bash
cd backend
npm run dev    # or `npm start` depending on the project's scripts
```

2) Start frontend (Vite) — binds to all interfaces and uses port 8080

```bash
cd frontend
npm run dev
```

Open the frontend at: http://localhost:8080

If you're running inside the dev container and want to open the app in the host browser, use the host $BROWSER from the container (if available):

```bash
# QT-Global-software

This repository contains a TypeScript/Node backend and a React frontend (Vite + SWC).

## Overview

- Backend: `backend/` (Node + TypeScript).
- Frontend: `frontend/` (Vite + React + SWC). Vite is configured to serve on port 8080 (`frontend/vite.config.ts`).

> This project is commonly developed inside the provided dev container (Ubuntu 24.04.2 LTS). The instructions below assume you're in the dev container or otherwise have Node.js and a package manager installed.

## Prerequisites

- Node.js (v16 or newer recommended)
- npm, yarn, or pnpm
- (Optional) Docker / devcontainer tooling if you want to run inside the repo dev container

## Setup (one-time)

Install dependencies for both frontend and backend from the repository root:

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

You can also run both installs in parallel from the repo root (example with npm):

```bash
npm --prefix frontend install &
npm --prefix backend install &
wait
```

## Run in development

Start backend and frontend in separate terminals (or use a process manager / tmux).

1) Start backend

```bash
cd backend
npm run dev    # or `npm start` depending on the project's scripts
```

2) Start frontend (Vite) — binds to all interfaces and uses port 8080

```bash
cd frontend
npm run dev
```

Open the frontend at: http://localhost:8080

If you're running inside the dev container and want to open the app in the host browser, use the host $BROWSER from the container (if available):

```bash
"$BROWSER" "http://localhost:8080"
```

If the backend exposes a different port or requires environment variables, inspect `backend/package.json` and any `.env.example` files and export those variables before starting the backend.

## Build & Preview (production)

To build the frontend and preview the production bundle locally:

```bash
cd frontend
npm run build
npm run preview -- --port 8080
```

For the backend, if there's a build step:

```bash
cd backend
npm run build
npm start
```

## Troubleshooting

- Port conflict: change the port in `frontend/vite.config.ts` or pass a custom port to Vite (`npm run dev -- --port 3000`).
- Missing scripts: inspect `frontend/package.json` and `backend/package.json` for available scripts and adjust the commands above accordingly.

## Notes

- Vite config: see `frontend/vite.config.ts` (host set to `::`, port `8080`).
- Backend services, proto files, or other infrastructure may require additional setup (databases, gRPC servers, environment variables). Check `backend/` for service-specific README or env examples.

If you'd like, I can add a top-level npm/pnpm workspace or convenience scripts to start both services together.