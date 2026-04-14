#!/bin/bash
# ============================================================
#  Task Manager – GitHub repository setup script
#  Használat: ./setup-repo.sh <github_username> <repo_name>
#  Példa:     ./setup-repo.sh danipetho taskmanager
# ============================================================

set -e

GITHUB_USER=${1:-"danielvarsass"}
REPO_NAME=${2:-"taskmanager"}

echo "=== Task Manager – repo init ==="
echo "GitHub user : $GITHUB_USER"
echo "Repo name   : $REPO_NAME"
echo ""

# 1. Replace placeholder username in k8s msanifests
sed -i "s/GITHUB_USERNAME/$GITHUB_USER/g" k8s/backend.yaml
sed -i "s/GITHUB_USERNAME/$GITHUB_USER/g" k8s/frontend.yaml
sed -i "s/GITHUB_USERNAME/$GITHUB_USER/g" docs/deployment-guide.md
sed -i "s/GITHUB_USERNAME/$GITHUB_USER/g" README.md
echo "[✓] Replaced GITHUB_USERNAME with '$GITHUB_USER' in manifests"

# 2. Git init + initial commit
git init
git add .
git commit -m "feat: initial project setup

- Angular 17 frontend (task list, create, edit, detail)
- ASP.NET 8 Web API backend (CRUD /tasks)
- MongoDB integration
- Docker + docker-compose
- GitHub Actions CI (build + push to GHCR)
- Kubernetes manifests (frontend, backend, mongodb)
- Deployment guide + user guide"

echo "[✓] Initial commit created"

# 3. Connect remote and push
git branch -M main
git remote add origin "https://github.com/$GITHUB_USER/$REPO_NAME.git"
git push -u origin main

echo ""
echo "=== Done! ==="
echo "Repo: https://github.com/$GITHUB_USER/$REPO_NAME"
echo "CI will start automatically on push."
