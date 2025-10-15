# Malzama — Online Judge Frontend (Vite + React + TS)

Malzama is the frontend for the Online Judge platform. It is built with React, TypeScript, and Vite. The app provides authentication, problem browsing, problem creation, code submission, and viewing submission history. It integrates with the Farmer-John (problems/auth) and Tony (submissions) backend services.

## Tech stack

- React 18 + TypeScript
- Vite 4 (dev server and build)
- React Router v6
- UI: MUI (Material UI), Ant Design, Bootstrap
- State and forms: React Hook Form, Formik, Redux Toolkit (present)
- Editors and markdown: Monaco Editor, MUI Data Grid, KaTeX, @uiw/react-md-editor
- HTTP: Axios

## Project scripts

From the project root (`Malzama/`):

```bash
npm run dev       # start Vite dev server
npm run build     # type-check (tsc) and build for production
npm run preview   # preview the production build
```

## Environment configuration

Backend base URL is currently hardcoded in the services as `https://localhost:7225`:

- `src/services/Auth.ts` and `src/services/Problems.ts`

You can change this to point to your running backend (Farmer-John API gateway or specific service). For a more flexible setup, consider moving the base URL to a Vite env var.

Example `.env` file at project root:

```
VITE_API_BASE_URL=https://localhost:7225
```

And update axios instances to:

```ts
const axiosInstance = axios.create({
	baseURL: import.meta.env.VITE_API_BASE_URL,
});
```

## How to run locally

1) Install dependencies
```bash
npm install
```

2) Start the dev server (default: http://localhost:5173)
```bash
npm run dev
```

3) Ensure backend services are running and reachable at the configured base URL. The UI expects:

- Auth + Problems + Tags endpoints (Farmer-John):
	- POST `api/v1/login`
	- POST `api/v1/user`
	- GET `api/v1/problems` (with `skip`, `count` query params)
	- GET `api/v1/problems/{id}`
	- POST `api/v1/problems`
	- GET `api/v1/tags`
- Submissions (Tony):
	- POST `api/v1/submissions`
	- GET `api/v1/submissions/{username}`

4) Build and preview production bundle
```bash
npm run build
npm run preview
```

## Routing overview

Defined in `src/Router.tsx` using React Router v6:

- `/` — Home
- `/signin` — Login
- `/register` — Register
- `/createproblem` — Protected, create a new problem
- `/problemset` — Protected, browse problem set
- `/problemset/problem/:id` — Protected, problem details
- `/problemset/submit/:name/:id` — Protected, submit code
- `/mysubmissions` — Protected, view your submissions
- `*` — Not Found

ProtectedRoute wraps routes requiring authentication; HomeRoute prevents access to auth routes when already logged in.

## Authentication and storage

- On successful login/register, a JWT is stored in cookies under `Bearer` along with `Username` and `Email`.
- Auth guard checks the presence of `Bearer` cookie.
- To log out, cookies are cleared via `AuthService.logout`.

## API integration

- Axios instances in `Auth.ts` and `Problems.ts` use `baseURL` and attach `Authorization: Bearer <token>` header using the `Bearer` cookie where required.
- Submissions payload (to Tony) includes: `problem_id`, `user_name`, `language` (number), and `code`.
- Problem creation payload includes fields like `name`, `difficulty`, `tags`, `time_limit_in_milliseconds`, `memory_limit_in_kilobytes`, `problem_statement`, and `test_cases` (each with `input`, `output`, `is_sample`, `is_hiden`).

## Project structure

- `src/components/` — UI components (editor, dialogs, tables, navbar, etc.)
- `src/pages/` — Feature pages (Home, Login, Register, ProblemSet, Problem, CreateProblem, SubmitCode, MySubmissions)
- `src/services/` — API service wrappers (Auth, Problems)
- `src/Context/` — React contexts (Problem, Tabs, User)
- `src/Routes/` — Route guards/components (HomeRoute, ProtectedRoute)
- `src/assets/` — Images and static assets
- `public/` — Static public assets and PWA files (manifest, favicon)

## Styling

- Mix of MUI components, Ant Design, Bootstrap, and custom CSS (`src/index.css`, `src/HomeStyles.css`).
- KaTeX and Markdown editor supported via `katex` and `@uiw/react-md-editor`.

## Development tips

- If you enable HTTPS in Vite dev server, `@vitejs/plugin-basic-ssl` or `vite-plugin-mkcert` are included in devDependencies.
- Ensure CORS is configured on the backend to allow requests from the Vite dev origin (e.g., http://localhost:5173).
- Keep the `Bearer` token cookie path as `/` so it’s accessible across routes.

## Troubleshooting

- 401 Unauthorized: ensure you’re logged in (cookie `Bearer` present) and the token is valid.
- CORS errors: configure allowed origins on the backend for the dev server origin.
- API base URL mismatch: update `VITE_API_BASE_URL` or service files accordingly.
- Submission fails: check request payload format and the backend service (Tony) availability.

## Authors

- [Ahmed Abdelshkor](https://github.com/AhmedAbdelshakour1)
- [Mohamed Saeed](https://github.com/MohamedSaeed003)
- [Omar Maher](https://github.com/Omar-Maher255)
