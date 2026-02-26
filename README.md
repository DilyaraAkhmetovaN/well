# Wellness Platform (Spring Boot + React + PostgreSQL + Docker)

## Project structure

- `backend` — Spring Boot REST API (JWT, RBAC, CRUD, validation, logs, ExceptionHandler)
- `frontend` — React SPA (login/register, dashboard, search/filter/sort, CRUD)
- `docker-compose.yml` — app + db launch

## Run with Docker

```bash
docker compose up --build
```

Frontend: http://localhost:5173
Backend API: http://localhost:8080

## Demo accounts

- Admin: `admin@well.local` / `admin123`
- User: register from UI.

## API summary

- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/reset-password`
- `GET /api/moods?q=&sortBy=entryDate&direction=DESC&page=0&size=10`
- `POST /api/moods`
- `PUT /api/moods/{id}`
- `DELETE /api/moods/{id}`

## Requirements coverage (from rubric)

Implemented:
- registration/auth, JWT, role-based access,
- CRUD + validation + centralized error handling,
- search/filter/sort + pagination,
- reset password,
- PostgreSQL integration,
- logging levels,
- REST endpoints,
- docker + compose,
- seed data via `data.sql`.
