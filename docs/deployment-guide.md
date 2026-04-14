# Deployment Guide

## Prerequisites

- Docker & Docker Compose
- Node.js 20+
- .NET SDK 8
- kubectl + Kubernetes cluster (pl. minikube)
- Git

---

## 1. Local Development (Docker Compose)

```bash
git clone https://github.com/danielvarsass/taskmanager.git
cd taskmanager

docker-compose up --build
```

| Service  | URL                       |
|----------|---------------------------|
| Frontend | http://localhost:4200     |
| Backend  | http://localhost:5000     |
| Swagger  | http://localhost:5000/swagger |
| MongoDB  | localhost:27017           |

Leállítás:
```bash
docker-compose down
```

---

## 2. Local dev (without Docker)

**Backend:**
```bash
cd backend/TaskManager.API
# Indíts egy lokális MongoDB-t (pl. docker run -d -p 27017:27017 mongo:7)
dotnet run
```

**Frontend:**
```bash
cd frontend
npm install
npm start
# http://localhost:4200
```

---

## 3. Kubernetes Deployment

### 3.1 Image build & push

```bash
# Cseréld ki danielvarsass-t a saját nevedre
docker build -t ghcr.io/danielvarsass/taskmanager-backend:latest ./backend/TaskManager.API
docker build -t ghcr.io/danielvarsass/taskmanager-frontend:latest ./frontend

docker push ghcr.io/danielvarsass/taskmanager-backend:latest
docker push ghcr.io/danielvarsass/taskmanager-frontend:latest
```

### 3.2 Image név frissítése a manifestekben

Szerkeszd meg a `k8s/backend.yaml` és `k8s/frontend.yaml` fájlokat:
```
image: ghcr.io/danielvarsass/taskmanager-backend:latest
                  ↑ cseréld ki saját GitHub username-re
```

### 3.3 Deploy Kubernetes-re

```bash
kubectl apply -f k8s/mongodb.yaml
kubectl apply -f k8s/backend.yaml
kubectl apply -f k8s/frontend.yaml
```

### 3.4 Ellenőrzés

```bash
kubectl get pods
kubectl get services
```

### 3.5 Frontend elérése (minikube)

```bash
minikube service frontend-service
```

Vagy kézzel: `http://<node-ip>:30080`

---

## 4. CI Pipeline (GitHub Actions)

A `.github/workflows/ci.yml` automatikusan fut minden `main` ágra érkező push esetén:
1. Buildeli a frontend Angular projektet
2. Buildeli a backend .NET projektet
3. Docker image-eket épít és feltolja GHCR-be

**Szükséges:** A repository `packages: write` jogosultsággal rendelkezik (alapértelmezett GITHUB_TOKEN).
