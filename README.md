# QT-Global-software

This repository contains a TypeScript/Node backend and a React frontend.

## Overview

- Backend: `backend/` (Node + TypeScript)
- Frontend: `frontend/` (Vite + React).



## Prerequisites

- Node.js (v18 or newer recommended)
- npm, yarn, or pnpm

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

```


## Run (development)

Start backend and frontend in separate terminals (or use a multiplexer/process manager):

Backend (run from `backend/`):

```bash
cd backend
npm run dev    # or `npm start` depending on available scripts
```
Backend runs on http://localhost:8000


```bash
cd frontend
npm run dev
```

Open the frontend at http://localhost:8080


## Build & Preview (production)
