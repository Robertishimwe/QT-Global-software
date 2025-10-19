
# QT Global Software - Full-Stack Practical Test

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)![SQLite](https://img.shields.io/badge/SQLite-003B57?style=for-the-badge&logo=sqlite&logoColor=white)![Protobuf](https://img.shields.io/badge/Protobuf-086DD7?style=for-the-badge&logo=google&logoColor=white)

This repository contains the full-stack solution for the practical test, featuring a Node.js/Express backend and a React/TypeScript frontend. The application is a mini admin panel that fulfills all mandatory requirements for user management, data serialization, and cryptography.

## Table of Contents

- [✨ Core Features](#-core-features)
- [🛠️ Technology Stack](#️-technology-stack)
- [🚀 Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation & Setup](#installation--setup)
- [🖥️ Running the Application](#️-running-the-application)
- [📝 API Endpoint Documentation (Backend)](#-api-endpoint-documentation-backend)
- [🏛️ Architectural Notes & Decisions](#️-architectural-notes--decisions)

## ✨ Core Features

This application successfully implements all mandatory requirements:

-   **✅ Full User Management (CRUD):** The backend provides a complete set of endpoints to Create, Read, Update, and Delete users.
-   **✅ Cryptographic Signature Verification:** The backend signs user data with an RSA keypair. The frontend cryptographically verifies this signature in the browser and **only displays users who pass verification**.
-   **✅ Protocol Buffer Serialization:** The backend exposes a dedicated endpoint (`/users/export`) that serves the user list in a binary Protobuf format. The frontend fetches, decodes, and displays this data.
-   **✅ Data Visualization:** The frontend displays a bar chart of users created per day over the last 7 days, powered by a dedicated backend statistics endpoint.
-   **✅ Type-Safe Codebase:** Both backend and frontend are built entirely with TypeScript, ensuring a robust and maintainable application.

## 🛠️ Technology Stack

| Backend | Frontend |
| :--- | :--- |
| Node.js | React |
| Express.js | TypeScript |
| TypeScript | Vite (Build Tool) |
| SQLite (Database) | recharts (Data Visualization) |
| `express-validator` (Validation) | `protobufjs` (Protobuf Decoding) |
| `uuid` (Unique IDs) | Web Crypto API (Browser Cryptography) |

## 🚀 Getting Started

Follow these instructions to get the project up and running on your local machine.

### Prerequisites

-   Node.js (v16 or higher)
-   npm (v8 or higher)

### Installation & Setup

The setups required to install dependencies.

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Robertishimwe/QT-Global-software.git
    ```

2.  **Setup the Backend:**
    ```bash
    cd backend
    npm install
    cd ..
    ```

3.  **Setup the Frontend:**
    ```bash
    cd frontend
    npm install
    cd ..
    ```

## 🖥️ Running the Application

You must have both the backend and frontend servers running simultaneously.

### 1. Running the Backend

Open a terminal window, navigate to the `/backend` directory, and run:

```bash
cd backend
npm run dev
```
The backend server will start on `http://localhost:8000`.

### 2. Running the Frontend

Open a **second** terminal window, navigate to the `/frontend` directory, and run:

```bash
cd frontend
npm run dev
```
The React development server will start, and your browser will open to `http://localhost:8080` (or another available port).

Note: If you are not running backend locally (meaning the backend is not running on `http://localhost:8000`), you have to change BASEURL in frontend folder -> src -> config -> api.ts 

## 📝 API Endpoint Documentation (Backend)

The backend exposes the following endpoints:

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/users` | Create a new user. |
| `GET` | `/users` | **(JSON)** Get all users, including `signature` and `publicKey` for crypto verification. |
| `GET` | `/users/:id` | Get a single user by their ID. |
| `PATCH` | `/users/:id` | Update a user's details. |
| `DELETE`| `/users/:id` | Delete a user. |
| `GET` | `/users/export`| **(Protobuf)** Get all users serialized in a binary Protobuf format. |
| `GET` | `/users/stats/creations-by-day`| **(Stats)** Get user creation counts for the last 7 days for the chart. |

