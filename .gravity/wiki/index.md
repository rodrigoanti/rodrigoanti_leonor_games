# Wiki index

- [[audio-system]] — Audio system (decision) → links: lib-audio.ts, components-soundtoggle.tsx, routes-and-games-registry, lights-game-flow, bubbles-game-flow
  Sonidos compartidos vía Web Audio API sintetizada en [[lib/audio.ts]] — sin assets binarios. API pública: `playSound(id)
- [[bubbles-game-flow]] — Bubbles game flow (flow) → links: components-bubblesgame.tsx, lib-bubbles.ts, audio-system, cause-effect-games-brief, routes-and-games-registry
  /burbujas → app/burbujas/page.tsx → [[components/BubblesGame.tsx]]. Config y factory en [[lib/bubbles.ts]]: MAX_BUBBLES 
- [[cause-effect-games-brief]] — Cause-effect games brief (concept) → links: routes-and-games-registry, audio-system, shapes-game-flow, numbers-game-flow, memory-game-flow
  Tres juegos sensoriales propuestos para <3 años: sin puntaje, sin tiempo, sin fallo. Patrón UI como [[routes-and-games-r
- [[kitchen-game-brief]] — Kitchen game brief (concept) → links: cause-effect-games-brief, app-globals.css, audio-system, phone-game-flow, routes-and-games-registry, shapes-game-flow
  Juego de rol + secuencia para ~2–4 años: más exigente que [[cause-effect-games-brief]] pero sin puntaje ni tiempo. Ruta 
- [[lights-game-flow]] — Lights game flow (flow) → links: components-lightsgame.tsx, lib-lights.ts, app-globals.css, lib-audio.ts, audio-system, cause-effect-games-brief, stars-game-flow, lib-games.ts, routes-and-games-registry
  `/luces` → `app/luces/page.tsx` → [[components/LightsGame.tsx]]. Config de switches en [[lib/lights.ts]]: `LIGHT_SWITCHE
- [[memory-game-flow]] — Memoria game flow (flow) → links: components-memorygame.tsx, lib-memory.ts, lib-games.ts, routes-and-games-registry
  `/memoria` → `app/memoria/page.tsx` → [[components/MemoryGame.tsx]]. Deck: `createShuffledDeck()` en [[lib/memory.ts]] (
- [[numbers-game-flow]] — Numbers game flow (flow) → links: components-numbersgame.tsx, lib-numbers.ts, lib-games.ts, routes-and-games-registry, shapes-game-flow
  `/numeros` → `app/numeros/page.tsx` → [[components/NumbersGame.tsx]]. Rondas: `createGameRounds()` en [[lib/numbers.ts]]
- [[paint-canvas-sizing-constraint]] — Paint canvas sizing constraint (decision) → links: paint-game-controls-flow, routes-and-games-registry
  `components/PaintCanvas.tsx` mide su `parentElement` con ResizeObserver y limpia con `clientWidth/clientHeight`. Regla: 
- [[paint-game-controls-flow]] — Pinta Leo controls flow (flow) → links: routes-and-games-registry
  Pinta Leo vive en [[routes-and-games-registry]]: `/pintar` renderiza `app/pintar/page.tsx` → `components/PaintGame.tsx` 
- [[paint-ui-class-prefix]] — Paint UI class prefix (decision) → links: paint-game-controls-flow, paint-canvas-sizing-constraint, routes-and-games-registry
  Los estilos de Pinta Leo usan prefijo `.paint-*` en `app/globals.css` (migración ya aplicada), alineados con `.memory-*`
- [[phone-game-flow]] — Phone game flow (flow) → links: components-phonegame.tsx, lib-phone.ts, app-globals.css, routes-and-games-registry, shapes-game-flow
  `/telefono` → `app/telefono/page.tsx` → [[components/PhoneGame.tsx]]. Datos: `CONTACTS` en [[lib/phone.ts]] (6 contactos
- [[production-deploy-flow]] — Production deploy flow (flow) → links: routes-and-games-registry
  Push a `develop` → `.github/workflows/integration.yml` (install, lint, typecheck, build, deploy SSH). Repo: `rodrigoanti
- [[routes-and-games-registry]] — Rutas y registro de juegos (concept) → links: app-page.tsx, components-hubcontent.tsx, app-pintar-page.tsx, components-paintgame.tsx, components-memorygame.tsx, lib-memory.ts, components-shapesgame.tsx, lib-shapes.ts, components-numbersgame.tsx, lib-numbers.ts, components-phonegame.tsx, lib-phone.ts, components-starsgame.tsx, stars-game-flow, components-lightsgame.tsx, lib-lights.ts, lights-game-flow, components-bubblesgame.tsx, lib-bubbles.ts, bubbles-game-flow, lib-games.ts, components-gamecard.tsx, app-globals.css, cause-effect-games-brief, memory-game-flow, shapes-game-flow, numbers-game-flow, phone-game-flow, paint-game-controls-flow
  Hub en [[app/page.tsx]] (`/`) → [[components/HubContent.tsx]]. Pinta Leo en [[app/pintar/page.tsx]] (`/pintar`) vía [[co
- [[shapes-game-flow]] — Shapes game flow (flow) → links: components-shapesgame.tsx, lib-shapes.ts, lib-games.ts, routes-and-games-registry, memory-game-flow
  `/formas` → `app/formas/page.tsx` → [[components/ShapesGame.tsx]]. Rondas: `createGameRounds()` en [[lib/shapes.ts]] (8 
- [[stars-game-flow]] — Stars game flow (flow) → links: components-starsgame.tsx, app-globals.css, lib-audio.ts, audio-system, cause-effect-games-brief, lib-games.ts, routes-and-games-registry
  `/estrellas` → `app/estrellas/page.tsx` → [[components/StarsGame.tsx]]. Sin lib de lógica: todo el estado vive en el com
