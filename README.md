# Backend Movie Watchlist API

A Node.js + Express REST API for managing movies and personal watchlists. It uses Prisma ORM with PostgreSQL and JWT-based authentication.

A focused backend service that lets users register, authenticate, browse a movie catalog, and build a personal watchlist with statuses, ratings, and notes. It is structured as a clean REST API with modular routes, controllers, and middleware, and is designed to be easy to extend with additional endpoints or business rules.

## Features
- User registration and login with JWT auth
- Movie catalog CRUD (basic scaffold)
- Watchlist items per user with status, rating, and notes
- Prisma ORM with PostgreSQL

## Tech Stack
- Node.js (ESM)
- Express
- Prisma + PostgreSQL
- JSON Web Tokens (JWT)

## Getting Started

### 1) Install dependencies
```bash
npm install
```

### 2) Configure environment
Create a `.env` file in the project root:
```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DBNAME?schema=public"
JWT_SECRET="your_jwt_secret"
```

### 3) Prisma setup
```bash
npx prisma generate
npx prisma migrate dev
```

### 4) Run the server
```bash
node src/server.js
```
The API will start on `http://127.0.0.1:5055`.

## Seeding (Movies)
If you want to seed example movies:
```bash
npm run seed:movie
```

## API Overview
- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login and receive JWT
- `GET /movies` - List movies
- `POST /watchlist` - Add a movie to the authenticated user’s watchlist

> Note: Protected routes require an `Authorization: Bearer <token>` header.

## Project Structure
```
src/
  controllers/
  middleware/
  routes/
  config/
prisma/
```

## License
ISC
