#!/usr/bin/env bash
# Arranca PM2 para puzzle, tasks y vendechile (stores) en el VPS.
set -uo pipefail

export NVM_DIR="$HOME/.nvm"
export PATH="$NVM_DIR/versions/node/v18.20.7/bin:$PATH"

ensure_app() {
  local name="$1"
  local dir="$2"
  echo ""
  echo "========================================"
  echo "🚀 ${name} (${dir})"
  echo "========================================"
  if [ ! -d "${dir}" ]; then
    echo "❌ No existe ${dir}"
    return 1
  fi
  cd "${dir}"
  if pm2 describe "${name}" 2>/dev/null | grep -q 'status.*online'; then
    echo "✅ ${name} online — reiniciando"
    pm2 restart "${name}"
    return 0
  fi
  echo "⚠️ ${name} no online — install, build, prod"
  if [ -f package-lock.json ]; then
    npm ci --no-audit --no-fund --no-update-notifier || npm install --no-audit --no-fund --no-update-notifier
  else
    npm install --no-audit --no-fund --no-update-notifier
  fi
  npm run build
  pm2 delete "${name}" 2>/dev/null || true
  npm run prod
  sleep 2
}

ensure_app puzzle-frontend /home/rodrigoanti/dev/puzzle
ensure_app tasks-backend /home/rodrigoanti/dev/tasks/backend
ensure_app tasks-frontend /home/rodrigoanti/dev/tasks/frontend
ensure_app stores-backend /home/rodrigoanti/dev/stores/back
ensure_app stores-frontend /home/rodrigoanti/dev/stores/front

pm2 save 2>/dev/null || true
echo ""
pm2 list

echo ""
echo "=== nginx vendechile / tasks / puzzle ==="
grep -E 'server_name|proxy_pass' /etc/nginx/sites-available/exampledev-subdomains 2>/dev/null \
  | grep -E 'tasks|puzzle|vendechile' || true

echo ""
echo "=== Smoke local ==="
for p in 30124:puzzle 3003:tasks-front 3030:tasks-back 30123:stores-front 31230:stores-back; do
  port="${p%%:*}"
  label="${p##*:}"
  if curl -sI --connect-timeout 3 "http://127.0.0.1:${port}/" 2>/dev/null | head -1; then
    : 
  else
    echo "127.0.0.1:${port} (${label}) sin respuesta"
  fi
done

echo ""
echo "=== Smoke HTTPS ==="
for u in \
  https://puzzle.exampledev.xyz \
  https://tasks.exampledev.xyz \
  https://vendechile.exampledev.xyz; do
  echo "${u}"
  curl -sI --connect-timeout 5 "${u}" 2>/dev/null | head -3 || echo "curl falló"
done
