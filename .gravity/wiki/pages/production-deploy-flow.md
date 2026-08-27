# Production deploy flow
<!-- iaterminal:wiki-page {"type":"flow"} -->

Push a `develop` → `.github/workflows/integration.yml` (install, lint, typecheck, build, deploy SSH). Repo: `rodrigoanti/rodrigoanti_leonor_games`. Servidor: `/home/rodrigoanti/dev/leonor_games` (clona en primer deploy si falta). PM2 `leonor-games` vía `ecosystem.config.js` + `npm run prod`. Puerto **30125** (puzzle en 30124). Secrets: `SSH_HOST`, `SSH_USERNAME`, `SSH_PRIVATE_KEY`, `SSH_PASSPHRASE`, `GH_TOKEN`. Nginx `games.exampledev.xyz` → 30125: configuración manual en `/etc/nginx/sites-available/exampledev-subdomains` (referencia `deploy/nginx/games.conf`); el CI no toca nginx. See [[routes-and-games-registry]].
