# Run With Docker

This project has three Docker services:

- `postgres`: PostgreSQL database
- `backend`: Express API with Prisma
- `frontend`: Vite React app served by Nginx

## Start Locally

From this folder:

```bash
docker compose up --build
```

Open:

- Frontend: http://localhost:8080
- Backend API: http://localhost:5000

The backend runs Prisma migrations automatically when the container starts.

## Create Login Users

The Docker database starts empty. Seed the default users with:

```bash
docker compose exec backend npm run seed
```

Then log in with either:

```text
admin@taskflow.com / admin123
pm@taskflow.com / pm123
```

## Stop

```bash
docker compose down
```

To also delete the local database volume:

```bash
docker compose down -v
```

## Before Publishing

Change these values in `docker-compose.yml` before deploying publicly:

- `JWT_SECRET`
- `REFRESH_TOKEN_SECRET`
- `POSTGRES_PASSWORD`
- `ALLOWED_ORIGINS`
- `VITE_API_URL`

For HTTPS production hosting, set:

```env
COOKIE_SECURE=true
```

## Build Images Manually

```bash
docker build -t internship-backend -f backend/Dockerfile .
docker build -t internship-frontend -f frontend/Dockerfile --build-arg VITE_API_URL=http://localhost:5000/api .
```
