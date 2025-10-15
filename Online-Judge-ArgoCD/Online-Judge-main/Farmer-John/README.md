# Farmer-John — Online Judge API (Backend)

Farmer-John is a .NET backend service for an Online Judge platform. It exposes REST APIs for user auth, problems, tags, and submissions. The project follows a layered architecture with clear separation of concerns: Service (Web API), Business, Data Access, and Common shared types.

## Repository layout

- `FarmerJohnServiceLayer/` — ASP.NET Core Web API project (controllers and app startup)
- `FarmerJohnBusinessLayer/` — Business logic and handlers (auth, problems, submissions)
- `FarmerJohnDataAccessLayer/` — Entity Framework Core DbContext, DAOs, migrations, and models
- `FarmerJohnCommon/` — Shared DTOs and enums

## Architecture

- Controllers delegate to Business Layer handlers (`IAuthServiceHandler`, `IProblemsListHandler`, `ICreateProblemHandler`, `ISubmissionHandler`).
- Business Layer coordinates validation and calls into DAOs.
- Data Access Layer uses EF Core with MySQL provider (MySQL 8.0.31) via `FramerJohnDbContext`.
- Common project contains DTOs for requests/responses and shared enums.

## Requirements

- .NET SDK 7+ — build/run the API
- MySQL 8.x — primary database (EF Core configured for MySQL 8.0.31)
- dotnet-ef — EF Core CLI for migrations
- Docker & Docker Compose (optional) — run MySQL locally without installing it

### Required tools (install & verify)

- Verify .NET SDK:
	```bash
	dotnet --info
	```

- Install/verify dotnet-ef:
	```bash
	dotnet tool install --global dotnet-ef
	export PATH="$PATH:$HOME/.dotnet/tools"
	dotnet ef --version
	```

- Verify Docker (optional):
	```bash
	docker --version
	docker compose version
	```

- Verify MySQL server or run via Docker (see below):
	```bash
	mysql --version || echo "Use Docker Compose to run MySQL if not installed"
	```

## Configuration

The DbContext currently configures MySQL in `FarmerJohnDataAccessLayer/FramerJohnDbContext.cs` with:

- Server: `localhost`
- User: `root`
- Password: `mysqldatabase123`
- Database: `OJ`
- ServerVersion: MySQL 8.0.31

You can change this connection string as needed. For production, prefer using environment variables or appsettings rather than hardcoding.

## Run locally — Option A: .NET SDK + local MySQL

1) Ensure MySQL is running and create the database:
```sql
CREATE DATABASE IF NOT EXISTS OJ CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

2) Apply EF Core migrations from repo root:
```bash
dotnet tool restore
dotnet ef database update --project FarmerJohnDataAccessLayer/FarmerJohnDataAccessLayer.csproj --startup-project FarmerJohnServiceLayer/FarmerJohnServiceLayer.csproj
```

3) Run the API:
```bash
dotnet build
dotnet run --project FarmerJohnServiceLayer/FarmerJohnServiceLayer.csproj
```

The API will start on the URL/port defined in `FarmerJohnServiceLayer/Properties/launchSettings.json`.

## Run locally — Option B: Docker Compose (MySQL + API)

Use Docker Compose to start MySQL and the API without installing MySQL locally. Example compose file (create `docker-compose.yml` at repo root):

```yaml
version: '3.8'
services:
	mysql:
		image: mysql:8.0
		environment:
			MYSQL_ROOT_PASSWORD: mysqldatabase123
			MYSQL_DATABASE: OJ
		ports:
			- "3306:3306"
		volumes:
			- mysql-data:/var/lib/mysql

	api:
		build: .
		command: dotnet run --project FarmerJohnServiceLayer/FarmerJohnServiceLayer.csproj --urls http://0.0.0.0:5001
		environment:
			- ASPNETCORE_ENVIRONMENT=Development
			# If you switch DbContext to read from env/appsettings, use this conn string:
			- ConnectionStrings__Default=server=mysql;user=root;password=mysqldatabase123;database=OJ
		ports:
			- "5001:5001"
		depends_on:
			- mysql

volumes:
	mysql-data:
```

Then run:
```bash
docker compose up --build
```

Note: The current DbContext uses a hardcoded connection string. To leverage the Docker network host `mysql`, you can change the connection string in `FramerJohnDbContext.cs` to `server=mysql;user=root;password=mysqldatabase123;database=OJ` or load it from configuration/environment.

## Database and migrations

- Migrations live under `FarmerJohnDataAccessLayer/Migrations/`.
- To add a new migration:
	```bash
	dotnet ef migrations add <MigrationName> --project FarmerJohnDataAccessLayer/FarmerJohnDataAccessLayer.csproj --startup-project FarmerJohnServiceLayer/FarmerJohnServiceLayer.csproj
	```
- To update DB:
	```bash
	dotnet ef database update --project FarmerJohnDataAccessLayer/FarmerJohnDataAccessLayer.csproj --startup-project FarmerJohnServiceLayer/FarmerJohnServiceLayer.csproj
	```

## API endpoints (v1)

Auth
- POST `api/v1/login` — Login with `LoginRequestDto` → `BaseAuthResponseDto`
- POST `api/v1/user` — Register with `RegisterRequestDto` → `BaseResponseDto`

Problems
- GET `api/v1/problems` — List problems (supports `PaginationFilterDto`)
- GET `api/v1/problems/{id}` — Get single problem by id
- POST `api/v1/problems` — Create problem (requires auth) with `ProblemDto` → `BaseResponseDto`

Tags
- GET `api/v1/tags` — List available tags

Submissions
- POST `api/v1/submissions` — Create submission (requires auth) with `SubmissionRequestDto` → `SubmissionResponseDto`
- GET `api/v1/submissions/{userName}` — Get submissions history for user (requires auth) → `List<HistoryResponseDto>`

## Example request/response

Create submission
```http
POST /api/v1/submissions HTTP/1.1
Content-Type: application/json
Authorization: Bearer <token>

{
	"problemId": 1,
	"language": "CSharp",
	"sourceCode": "using System; class Program { static void Main(){ Console.WriteLine(\"Hello\"); } }"
}
```

Response (example)
```json
{
	"submissionId": 42,
	"state": "Queued"
}
```

## Troubleshooting

- MySQL connection refused: ensure MySQL is running and the connection string matches host, user, and password.
- Migration errors: make sure `dotnet-ef` is installed and the `--startup-project` points to `FarmerJohnServiceLayer`.
- Ports already in use: change the port mapping in Docker compose or `launchSettings.json`.
- Hardcoded connection string: consider moving DB config to `appsettings.json` and environment variables for flexibility.

## Authors

- [Ahmed Abdelshkor](https://github.com/AhmedAbdelshakour1)
- [Mohamed Saeed](https://github.com/MohamedSaeed003)
- [Omar Maher](https://github.com/Omar-Maher255)