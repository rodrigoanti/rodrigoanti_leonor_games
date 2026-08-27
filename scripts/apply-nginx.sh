#!/usr/bin/env bash
set -euo pipefail

NGINX_SITES="/etc/nginx/sites-available/exampledev-subdomains"
MARKER="games.exampledev.xyz"
REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
GAMES_CONF="${REPO_ROOT}/deploy/nginx/games.conf"

if [ ! -f "${GAMES_CONF}" ]; then
  echo "❌ No existe ${GAMES_CONF}"
  exit 1
fi

if ! grep -q "${MARKER}" "${NGINX_SITES}"; then
  echo "🔧 Añadiendo bloque nginx para ${MARKER}"
  printf '\n' >> "${NGINX_SITES}"
  sed -n '/^server {/,$p' "${GAMES_CONF}" >> "${NGINX_SITES}"
  nginx -t
  systemctl reload nginx
  echo "✅ Nginx recargado con ${MARKER}"
else
  echo "✅ Bloque ${MARKER} ya presente en ${NGINX_SITES}"
fi

if command -v ufw >/dev/null 2>&1; then
  ufw deny 30125/tcp 2>/dev/null || true
fi
