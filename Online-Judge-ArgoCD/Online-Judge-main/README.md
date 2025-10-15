# Online Judge Platform — Malzama + Farmer‑John + Tony

A full-stack problem-solving platform composed of:

- Malzama (frontend): React + TypeScript app for users to browse problems, submit code, and view results.
- Farmer‑John (main backend): ASP.NET Core API with users, auth, problems, tags, and submission coordination.
- Tony (execution backend): ASP.NET Core + worker that runs code submissions in isolated Docker containers and returns runtime/memory/output.

## High-level architecture

User (Browser)
  ↳ Malzama (React UI)
     ↳ Farmer‑John API (auth, problems, submissions)
        ↳ Tony service/worker (code execution)
           ↳ Docker sandbox container (per submission)
           ↳ Returns: verdict, runtime, memory, output

Key flow
- User signs in and browses problems in Malzama.
- User submits code; Malzama calls Farmer‑John `POST /api/v1/submissions`.
- Farmer‑John delegates execution to Tony.
- Tony runs code inside a Docker container, collects result (time, memory, output), and returns it back through Farmer‑John to the UI.

## Repos and paths in this workspace

- Frontend: `Malzama/`
- Main backend: `Farmer-John/`
- Execution backend: `Tony/`

## Tech overview

- Frontend: React 18, TypeScript, Vite, React Router, MUI, AntD, Monaco, KaTeX, Axios
- Backends: .NET 7+, ASP.NET Core Web API, Entity Framework Core
- Databases: MySQL 8.x (Farmer‑John DB = `OJ`, Tony DB = `OJT`)
- Execution isolation: Docker (containers per submission)

## Requirements

- Node.js (LTS) and npm (or pnpm/yarn) — for the frontend
- .NET SDK 7+ — for both backends
- MySQL 8.x — databases for Farmer‑John (`OJ`) and Tony (`OJT`)
- Docker — required for isolated code execution by Tony
- dotnet-ef (optional, for applying EF Core migrations locally)

Quick verify
```bash
node -v && npm -v
dotnet --info
mysql --version
docker --version && docker compose version
# optional
dotnet tool install --global dotnet-ef && dotnet ef --version
```

## Configuration

Default connection strings (from code):
- Farmer‑John DbContext: `server=localhost;user=root;password=mysqldatabase123;database=OJ` (MySQL 8.0.31)
- Tony DbContext: `server=localhost;user=root;password=mysqldatabase123;database=OJT` (MySQL 8.0.31)

Notes
- For development, ensure a local MySQL with the above credentials or update the connection strings in the respective DbContexts or appsettings.
- For containerized deploys, prefer loading connection strings from environment variables or configuration files (recommended improvement).
- Malzama’s API base URL is currently `https://localhost:7225` in the service files; consider switching to `VITE_API_BASE_URL` via `.env`.

## Local development — step by step

1) Start MySQL and ensure both databases exist
```sql
CREATE DATABASE IF NOT EXISTS OJ  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE DATABASE IF NOT EXISTS OJT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

2) Apply EF Core migrations
- Farmer‑John (from repo root):
```bash
dotnet tool restore
cd Farmer-John
dotnet ef database update --project FarmerJohnDataAccessLayer/FarmerJohnDataAccessLayer.csproj --startup-project FarmerJohnServiceLayer/FarmerJohnServiceLayer.csproj
cd -
```
- Tony (from repo root):
```bash
cd Tony
dotnet ef database update --project TonyDataAccessLayer/TonyDataAccessLayer.csproj --startup-project TonyServiceLayer/TonyServiceLayer.csproj
cd -
```

3) Run backends
- Run Farmer‑John API:
```bash
cd Farmer-John
dotnet run --project FarmerJohnServiceLayer/FarmerJohnServiceLayer.csproj
```
- Run Tony components (choose one):
  - Worker (recommended for execution):
    ```bash
    cd Tony
    dotnet run --project TonyInfrastructureLayer/TonyInfrastructureLayer.csproj
    ```
  - Tony API (if needed by your integration):
    ```bash
    cd Tony
    dotnet run --project TonyServiceLayer/TonyServiceLayer.csproj
    ```

4) Run frontend (Malzama)
```bash
cd Malzama
npm install
npm run dev
# open http://localhost:5173
```

5) Submit code
- Sign in/register via the UI.
- Open a problem and submit code.
- Farmer‑John will coordinate with Tony; Tony spawns a Docker container to run the code and returns time/memory/output.

## Environments and variables

Recommended envs (examples):
```bash
# Backend (if wired to read env)
ConnectionStrings__Default=server=localhost;user=root;password=mysqldatabase123;database=OJ
# Tony (if wired to read env)
ConnectionStrings__Default=server=localhost;user=root;password=mysqldatabase123;database=OJT

# Frontend (Vite)
VITE_API_BASE_URL=https://localhost:7225
```

Consider creating `.env.example` files in each project for clarity.

## Useful endpoints (Farmer‑John API)

- Auth
  - POST `api/v1/login`
  - POST `api/v1/user`
- Problems
  - GET `api/v1/problems?skip={n}&count={n}`
  - GET `api/v1/problems/{id}`
  - POST `api/v1/problems` (auth required)
- Tags
  - GET `api/v1/tags`
- Submissions
  - POST `api/v1/submissions` (create submission)
  - GET `api/v1/submissions/{userName}` (history)

Tony service
- Runs code in isolated Docker containers.
- Exposes an API and a worker; depending on integration, Farmer‑John may call Tony via HTTP or Tony may poll/process.

## Troubleshooting

- Database connection errors: verify MySQL is running, credentials/DB names match, and migrations were applied.
- Token/CORS issues in frontend: ensure Farmer‑John exposes correct CORS settings for `http://localhost:5173` (Vite dev server).
- Docker permission errors: add your user to the `docker` group or run with appropriate privileges.
- Hardcoded connection strings: consider moving DB config to `appsettings.*.json` and env vars.

## Roadmap / suggested improvements

- Read connection strings from configuration/env in both backends (replace hardcoded strings).
- Provide top-level `docker-compose.yml` that starts MySQL, Farmer‑John, Tony worker/API, and wires env vars.
- Add `.env.example` files for all three projects.
- Add CI workflows and basic test coverage.

## Authors

- [Ahmed Abdelshkor](https://github.com/AhmedAbdelshakour1)
- [Mohamed Saeed](https://github.com/MohamedSaeed003)
- [Omar Maher](https://github.com/Omar-Maher255)
