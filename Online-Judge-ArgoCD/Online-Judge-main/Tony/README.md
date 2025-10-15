# Tony - Online Judge (Backend)

This repository contains the Tony backend services for the Online Judge project. It's a .NET solution with multiple layers following a simple clean-architecture separation: data access, business logic, infrastructure (worker), and service layers.

## Repository layout

- `TonyServiceLayer/` - ASP.NET Core Web API project exposing HTTP endpoints (Controllers).
- `TonyBusinessLayer/` - Business logic and handlers (submission processing orchestrators).
- `TonyDataAccessLayer/` - Entity Framework Core DbContext, DAOs, and migrations.
- `TonyCommon/` - Shared DTOs and enums used across projects.
- `TonyInfrastructureLayer/` - Infrastructure code for background worker(s). Contains `run.py` and a Dockerfile for the worker.
- `Properties/`, `.idea/`, and configuration files - local environment and IDE settings.

## Key files

- `TonyServiceLayer/Program.cs` - API host and startup configuration.
- `TonyInfrastructureLayer/Worker.cs` - Background worker implementation and `IWorker` interface.
- `TonyDataAccessLayer/TonyDbContext.cs` - EF Core DbContext and model registrations.
- `TonyDataAccessLayer/Migrations/` - EF Core migrations (Initial migration present).
- `TonyBusinessLayer/Handlers/SubmitHandler.cs` - Handles new submission requests.
- `TonyServiceLayer/Controllers/SubmissionsController.cs` - API controller for submissions.

## Requirements

- .NET SDK 7+ (match the project's target framework in the csproj files). Install from https://dotnet.microsoft.com.
- Docker & Docker Compose (optional but recommended) to build/run the `TonyInfrastructureLayer` worker image and local DB for development.
- `dotnet-ef` CLI tool (for applying EF Core migrations) — install with `dotnet tool install --global dotnet-ef` if you need to run migrations locally.
- MySQL 8.x (primary database). The default DbContext is configured for MySQL 8.0.31; see Configuration below.

Notes on versions: the project was developed and tested with .NET 7+. If you need to support a different SDK version, check the `TargetFramework` in the `.csproj` files.

### Required tools (install & verify)

Before running or developing the project locally, install and verify these tools.

- .NET SDK 7+ — required to build and run the API and worker.

   Verify:
   ```bash
   dotnet --info
   ```

- dotnet-ef — EF Core CLI for applying migrations (optional if you use Docker with a pre-seeded DB).

   Install & verify:
   ```bash
   dotnet tool install --global dotnet-ef
   export PATH="$PATH:$HOME/.dotnet/tools" # add to ~/.bashrc for permanence
   dotnet ef --version
   ```

- Docker & Docker Compose — recommended to run a local DB and worker with parity to production.

   Verify:
   ```bash
   docker --version
   docker compose version
   ```

- Git — for source control and cloning the repo.

   Verify:
   ```bash
   git --version
   ```

- (Optional) Python 3 — `TonyInfrastructureLayer/run.py` exists and may be useful for development or scripts.

   Verify:
   ```bash
   python3 --version
   ```

- (Optional) Database clients — `psql` for Postgres or `mysql` for MySQL if you manage the DB locally instead of Docker.

   Verify Postgres client:
   ```bash
   psql --version
   ```

If you see any mismatch between the installed `.NET` SDK and the project's `TargetFramework`, install the matching SDK from https://dotnet.microsoft.com.

## Configuration

The EF Core DbContext (`TonyDataAccessLayer/TonyDbContext.cs`) uses MySQL by default with the following connection string and server version:

- Connection string: `server=localhost;user=root;password=mysqldatabase123;database=OJT`
- Server version: MySQL 8.0.31

For development, you can either:
- Keep this default and start a local MySQL instance with matching credentials, or
- Override the connection string via environment variable `ConnectionStrings__Default` or `appsettings.Development.json` if you wire the DbContext to read from configuration.

Example env var for MySQL:
```
ConnectionStrings__Default=server=localhost;user=root;password=mysqldatabase123;database=OJT
```

## Quickstart - API

1. Configure connection strings and settings in `TonyServiceLayer/appsettings.json` or `TonyServiceLayer/appsettings.Development.json`.
2. From the solution root run:

   dotnet build
   dotnet run --project TonyServiceLayer/TonyServiceLayer.csproj

3. The API will start per `launchSettings.json` (check ports inside `Properties/launchSettings.json`).

## Quickstart - Worker (infrastructure)

Tony includes a background worker (in `TonyInfrastructureLayer`) that can be run via Docker or Python runner for local development.

Docker (recommended):

1. Build the worker image (from repository root):

   docker build -f TonyInfrastructureLayer/Dockerfile -t tony-worker:latest .

2. Run the container with necessary env vars (DB connection, broker URLs, etc.):

   docker run --env-file .env -e ConnectionStrings__Default="<CONN>" tony-worker:latest

Local (python runner):

The repository contains `TonyInfrastructureLayer/run.py` as a helper. It may require Python 3 and dependencies (inspect file and add a venv if needed).

## Database and Migrations

This project uses EF Core migrations located in `TonyDataAccessLayer/Migrations/`. Apply migrations before running the API if the database is empty:

   dotnet ef database update --project TonyDataAccessLayer/TonyDataAccessLayer.csproj --startup-project TonyServiceLayer/TonyServiceLayer.csproj

(Ensure the `dotnet-ef` tool is installed and configured, and connection strings are correct.)

## Run locally (step-by-step)

Below are two common ways to run the project locally: (A) using the .NET SDK directly for development, and (B) using Docker Compose to run the API, worker and a local database.

A) Run with .NET SDK (fast development loop)

1. Ensure .NET SDK is installed.
2. Set environment variables or edit `TonyServiceLayer/appsettings.Development.json` with a local connection string. You can create a `.env` file at the repo root and export it in your shell or use an env tool.

Example environment variables (create `.env` or export in your shell):

```
ASPNETCORE_ENVIRONMENT=Development
ConnectionStrings__Default=server=localhost;user=root;password=mysqldatabase123;database=OJT
WORKER__CONCURRENCY=2
```

3. Apply EF Core migrations (if required) from the repo root:

```
dotnet tool restore
dotnet ef database update --project TonyDataAccessLayer/TonyDataAccessLayer.csproj --startup-project TonyServiceLayer/TonyServiceLayer.csproj
```

4. Run the API (from the repo root):

```
dotnet build
dotnet run --project TonyServiceLayer/TonyServiceLayer.csproj
```

5. Run the worker in a separate terminal (optional):

```
dotnet run --project TonyInfrastructureLayer/TonyInfrastructureLayer.csproj
```

B) Run with Docker Compose (recommended for parity with production)

Create a `docker-compose.yml` in the repo root (or use an existing one). A minimal example is shown below — it starts MySQL 8, the API, and the worker:

```
version: '3.8'
services:
   mysql:
      image: mysql:8.0
      environment:
         MYSQL_ROOT_PASSWORD: mysqldatabase123
         MYSQL_DATABASE: OJT
      ports:
         - '3306:3306'
      volumes:
         - mysql-data:/var/lib/mysql

   api:
      build: .
      command: dotnet run --project TonyServiceLayer/TonyServiceLayer.csproj --urls http://0.0.0.0:5000
      environment:
         - ASPNETCORE_ENVIRONMENT=Development
         - ConnectionStrings__Default=server=mysql;user=root;password=mysqldatabase123;database=OJT
      ports:
         - '5000:5000'
      depends_on:
         - mysql

   worker:
      build:
         context: .
         dockerfile: TonyInfrastructureLayer/Dockerfile
      environment:
         - ConnectionStrings__Default=server=mysql;user=root;password=mysqldatabase123;database=OJT
      depends_on:
         - mysql

volumes:
   mysql-data:
```

Start services with:

```
docker compose up --build
```

This will build the API and worker images and start the database. The API will be accessible at the port you mapped (example above: http://localhost:5000).

Common troubleshooting
- Database errors: ensure connection string matches the DB service (MySQL) and that migrations have been applied.
- Port conflicts: check `Properties/launchSettings.json` and any mapped Docker ports.
- Missing dotnet-ef: run `dotnet tool install --global dotnet-ef` and `dotnet tool restore`.

If you'd like, I can add a `.env.example` and `docker-compose.yml` to the repo and wire README examples to them.

## Development notes

- DTOs and enums are in `TonyCommon` and shared between layers.
- Handlers follow simple interface segregation (e.g., `ISubmitHandler`, `SubmitHandler`).
- The worker polls or consumes submission tasks and uses DAOs in `TonyDataAccessLayer` to persist results.
- Check `TonyInfrastructureLayer/Handlers/Worker.cs` to customize concurrency and polling behavior.

## API endpoints

- POST `api/v1/submissions` — create a submission.

Request body (SubmissionRequestDto):
```
{
   "code": "#include <stdio.h>\nint main(){printf(\"Hello\\n\");}",
   "language": "cpp",
   "input": ""
}
```

Response (SubmissionResponseDto):
```
{
   "submission_id": 42,
   "time_taken_in_milli_seconds": 12,
   "memory_taken_in_kilo_bytes": 1024,
   "output": "Hello\n",
   "state": "Succeeded"
}
```

Supported languages (enum): `c`, `cpp`, `java`, `python`.

## Tests

No tests currently included. Adding unit tests for handlers and integration tests for the API + DB is recommended.

## Contributing

- Follow C# style conventions used in the repo.
- Add migrations via EF Core only when data models change.
- Keep infra changes (Dockerfile/run.py) backwards compatible.

## Contact

If you need help understanding the code, open an issue or reach out to the project maintainers.

## Authors

- [Ahmed Abdelshkor](https://github.com/AhmedAbdelshakour1)
- [Mohamed Saeed](https://github.com/MohamedSaeed003)
- [Omar Maher](https://github.com/Omar-Maher255)