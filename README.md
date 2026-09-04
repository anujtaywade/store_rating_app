# Store Rating App

A full-stack store rating application with three roles:

- Users can sign up, browse stores, and submit ratings.
- Store owners can add stores and view their own store ratings.
- Admins can view users, stores, and dashboard totals.

## Tech Stack

- Frontend: React, Vite, Tailwind CSS
- Backend: Node.js, Express
- Database: PostgreSQL
- Authentication: JWT

## Project Structure

```text
Backend/
  db/schema.sql
  src/
Frontend/
  src/
```

## Setup

1. Install dependencies:

```bash
cd Backend
npm install

cd ../Frontend
npm install
```

2. Create environment files:

```bash
cp Backend/.env.example Backend/.env
cp Frontend/.env.example Frontend/.env
```

Update `Backend/.env` with your PostgreSQL `DATABASE_URL` and a strong `JWT_SECRET`.

3. Create the database and schema:

```bash
createdb store_rating_app
psql "postgres://postgres:postgres@localhost:5432/store_rating_app" -f Backend/db/schema.sql
```

The schema creates a default admin account:

```text
Email: admin@example.com
Password: Admin@123
```

Change this account after first login.

4. Start the backend:

```bash
cd Backend
npm run dev
```

5. Start the frontend:

```bash
cd Frontend
npm run dev
```

Local URLs:

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:4000`

## Environment Variables

Backend:

- `PORT`: API port, defaults to `4000`
- `CLIENT_URL`: allowed frontend origin for CORS
- `DATABASE_URL`: PostgreSQL connection string
- `DB_SSL`: set to `true` for hosted databases that require SSL
- `JWT_SECRET`: JWT signing secret

Frontend:

- `VITE_API_URL`: backend API base URL
