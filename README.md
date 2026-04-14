# Task Manager

Egyszerű full-stack feladatkezelő alkalmazás – egyetemi beadandó projekt.

## Tech stack

| Réteg      | Technológia              |
|------------|--------------------------|
| Frontend   | Angular 17 (TypeScript)  |
| Backend    | ASP.NET Web API (.NET 8) |
| Adatbázis  | MongoDB 7                |
| Container  | Docker + Docker Compose  |
| CI         | GitHub Actions → GHCR    |
| Deploy     | Kubernetes manifests     |

## Quick Start

```bash
git clone https://github.com/danielvarsass/taskmanager.git
cd taskmanager
docker-compose up --build
```

- Frontend: http://localhost:4200  
- Backend / Swagger: http://localhost:5000/swagger

## Docs

- [Deployment Guide](docs/deployment-guide.md)
- [User Guide](docs/user-guide.md)

## Project structure

```
taskmanager/
├── frontend/               # Angular 17 SPA
├── backend/
│   └── TaskManager.API/    # ASP.NET Web API
├── k8s/                    # Kubernetes manifests
├── docs/                   # Documentation
├── .github/workflows/      # CI pipeline
└── docker-compose.yml
```
