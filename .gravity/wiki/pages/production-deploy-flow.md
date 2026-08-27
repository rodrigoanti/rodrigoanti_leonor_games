# Production deploy flow
<!-- iaterminal:wiki-page {"type":"flow"} -->

Push a `develop` → `.github/workflows/integration.yml` (install, lint, typecheck, build, deploy SSH). Repo: `rodrigoanti/rodrigoanti_leonor_games`. Servidor: `/home/rodrigoanti/dev/leonor_games`. PM2 `leonor-games` vía `ecosystem.config.js` + `npm run prod`. Puerto **30125** (`dev`/`start`/`ecosystem` alineados). Secrets: `SSH_HOST`, `SSH_USERNAME`, `SSH_PRIVATE_KEY`, `SSH_PASSPHRASE`, `GH_TOKEN`. See [[routes-and-games-registry]].
