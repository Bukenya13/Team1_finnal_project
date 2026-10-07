# Week 06 — Individual Contributions

Each team member documents two individual contributions toward this week's
deliverables. Replace `[Name]` with your name (or GitHub username) before submitting.

## Member 1 — [Name]

1. **Categories collection** — Created the complete CRUD endpoints
   (GET, GET by id, POST, PUT, DELETE) in `controllers/categories.js` and
   `routes/categories.js`, including POST/PUT data validation and error
   handling (400 for missing fields, 400 for invalid ids, 404 for missing records).
2. **Swagger documentation** — Regenerated `swagger.json` with all four
   collection routes, the auth endpoints, and Bearer security definitions so
   the docs publish correctly at `/api-docs` on Render.

## Member 2 — [Name]

1. **Members collection** — Created the complete CRUD endpoints in
   `controllers/members.js` and `routes/members.js` with validation on POST/PUT,
   including email format validation, plus error handling for bad ids and
   missing records.
2. **REST client test file** — Extended `requests.http` with full CRUD request
   sets for categories and members, validation checks (expect 400), and OAuth
   checks (expect 401 without a token).

## David

1. **GitHub OAuth** — Implemented the GitHub OAuth flow in `routes/auth.js`
   (`/auth/github`, `/auth/github/callback`, `/auth/user`, `/auth/logout`) with
   the `CALLBACK_URL` environment configuration, and built the JWT
   `requireAuth` middleware in `middleware/auth.js`.
2. **Endpoint authorization** — Secured the books and authors POST/PUT
   endpoints behind OAuth (401 without a valid Bearer token) and documented the
   security scheme in Swagger (`securityDefinitions` + per-route `security`).

## Lawrence

1. **Unit testing setup** — Added the Mocha/Chai/Supertest/Sinon test stack,
   refactored `server.js` into `app.js` + `server.js` so the app can be tested
   without a live database, and wired up the `npm test` script.
2. **GET endpoint unit tests** — Wrote 14 unit tests in
   `test/getEndpoints.test.js` covering the GET endpoints of all four
   collections, invalid-id error handling, and the OAuth 401 responses.
