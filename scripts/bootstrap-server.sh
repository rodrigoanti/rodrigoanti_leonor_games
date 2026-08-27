#!/usr/bin/env bash
set -euo pipefail

REPO_URL="https://github.com/rodrigoanti/rodrigoanti_leonor_games.git"
DEPLOY_DIR="/home/rodrigoanti/dev/leonor_games"
BRANCH="develop"
NODE_BIN="$HOME/.nvm/versions/node/v18.20.7/bin"

echo "==> Preparando directorio de deploy"
mkdir -p /home/rodrigoanti/dev

if [ ! -d "${DEPLOY_DIR}/.git" ]; then
  echo "==> Clonando ${REPO_URL} en ${DEPLOY_DIR}"
  git clone --branch "${BRANCH}" "${REPO_URL}" "${DEPLOY_DIR}"
else
  echo "==> Repo ya existe en ${DEPLOY_DIR}"
  cd "${DEPLOY_DIR}"
  git fetch origin "${BRANCH}"
  git checkout "${BRANCH}"
  git reset --hard "origin/${BRANCH}"
fi

cd "${DEPLOY_DIR}"

export NVM_DIR="$HOME/.nvm"
export PATH="${NODE_BIN}:$PATH"

echo "==> Node: $(node -v)"
echo "==> Instalando dependencias"
npm ci --no-audit --no-fund --no-update-notifier

echo "==> Build de producción"
npm run build

echo "==> Iniciando PM2 (leonor-games)"
npm run prod

sleep 3
if pm2 status leonor-games > /dev/null 2>&1; then
  echo "✅ leonor-games corriendo en puerto 3004"
  pm2 status leonor-games
else
  echo "❌ PM2 no reporta leonor-games"
  exit 1
fi
