# TaskFlow

TaskFlow is a simple Kanban application built with React, TypeScript, and Express. It helps users organize tasks into three columns: To Do, In Progress, and Done.

## Features

- View tasks grouped by status.
- Create new tasks.
- Update task status.
- Delete tasks.
- Display loading, success, and error messages.
- Responsive layout and keyboard accessibility.

## Technologies

- React
- TypeScript
- Vite
- Node.js and Express
- Fetch API
- Jest

## Project Structure

- `src/` – React frontend.
- `src/services/taskApi.ts` – API requests to the backend.
- `src/utils/` – Helper functions and unit tests.
- `server/` – Express backend.

## Run Locally

### 1. Start the backend

Open a terminal and run:

```bash
cd server
npm install
node server.js
```

The backend runs on port 3001 by default.

### 2. Start the frontend

Open a second terminal in the project root and run:

```bash
npm install
npm run dev
```

The frontend uses `http://localhost:3001` by default for API requests.

To use a different backend URL, set the `VITE_API_URL` environment variable before building the frontend.

## Tests and Build

Run the unit tests:

```bash
npm test
```

Build the frontend for production:

```bash
npm run build
```

## Deployment

The frontend is deployed on Vercel and the backend is deployed on Render.

- Frontend: https://taskflow-sooty-omega-42.vercel.app/
- Backend API: https://taskflow-5xkj.onrender.com/api/tasks