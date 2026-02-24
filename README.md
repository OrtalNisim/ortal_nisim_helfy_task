# ortal_nisim_helfy_task - Task Manager App

## Backend Setup
1. cd backend
2. npm install
3. npm run dev (runs on port 4000)

## Frontend Setup
1. cd frontend
2. npm install
3. npm run dev (runs on port 5174)

## API Endpoints
- GET /api/tasks - Create a new task
- POST POST /api/tasks – Create a new task
- PUT /api/tasks/:id – Update a task
- DELETE /api/tasks/:id – Delete a task
- PATCH /api/tasks/:id/toggle – Toggle task completion status


## Time spent on each part:
- Infrastructure setup (~60 minutes) - Project structure, environment configuration, initial setup.

- Backend implementation (~90 minutes) - API routes, validation, error handling, in-memory store.

- Frontend implementation (~90 minutes) - UI components, state management, API integration, validation.

## Assumptions & Design Decisions
- Single-user application (no authentication required).
- No persistent database required (in-memory store is sufficient).
- Small dataset (no pagination needed).
- API runs locally on port 4000.
- Used useMemo for derived state instead of duplicating filtered data.
- Used TypeScript for type safety and maintainability.
- Kept the UI minimal and responsive, prioritizing functionality.
