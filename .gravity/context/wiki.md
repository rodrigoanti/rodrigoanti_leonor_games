# Wiki
<!-- iaterminal:context {"version":1,"id":"iaterminal:wiki","name":"Wiki","fileName":"context/wiki.md","kind":"wiki","icon":"book","color":"#2dd4bf"} -->

<!-- iaterminal:auto -->
## Index
# Wiki index

- [[audio-system]] — Audio system (decision) → links: lib-audio.ts, components-soundtoggle.tsx, routes-and-games-registry, lights-game-flow, bubbles-game-flow, kitchen-game-flow
  Sonidos compartidos vía Web Audio API sintetizada en [[lib/audio.ts]] — sin assets binarios. API pública: `playSound(id)
- [[bubbles-game-flow]] — Bubbles game flow (flow) → links: components-bubblesgame.tsx, lib-bubbles.ts, audio-system, cause-effect-games-brief, routes-and-games-registry
  /burbujas → app/burbujas/page.tsx → [[components/BubblesGame.tsx]]. Config y factory en [[lib/bubbles.ts]]: MAX_BUBBLES 
- [[cause-effect-games-brief]] — Cause-effect games brief (concept) → links: routes-and-games-registry, audio-system, shapes-game-flow, numbers-game-flow, memory-game-flow
  Tres juegos sensoriales propuestos para <3 años: sin puntaje, sin tiempo, sin fallo. Patrón UI como [[routes-and-games-r
- [[kitchen-game-brief]] — Kitchen game brief (concept) → links: kitchen-game-flow, audio-system, phone-game-flow, cause-effect-games-brief
  Juego de rol + secuencia para ~2–4 años en `/cocina`. Locate: [[kitchen-game-flow]]. Audio [[audio-system]].
- [[kitchen-game-flow]] — Kitchen game flow (flow) → links: components-kitchengame.tsx, lib-kitchen.ts, app-globals.css, audio-system, kitchen-game-brief, bubbles-game-flow, routes-and-games-registry, phone-game-flow
  /cocina → app/cocina/page.tsx → [[components/KitchenGame.tsx]]. Recetas [[lib/kitchen.ts]]: ensalada 5 pasos, sándwich 4
- [[lights-game-flow]] — Lights game flow (flow) → links: components-lightsgame.tsx, lib-lights.ts, app-globals.css, lib-audio.ts, audio-system, cause-effect-games-brief, stars-game-flow, lib-games.ts, routes-and-games-registry
  `/luces` → `app/luces/page.tsx` → [[components/LightsGame.tsx]]. Config de switches en [[lib/lights.ts]]: `LIGHT_SWITCHE
- [[memory-game-flow]] — Memoria game flow (flow) → links: components-memorygame.tsx, lib-memory.ts, lib-games.ts, routes-and-games-registry
  `/memoria` → `app/memoria/page.tsx` → [[components/MemoryGame.tsx]]. Deck: `createShuffledDeck()` en [[lib/memory.ts]] (
- [[next15-hydration-runtime-bugs]] — Random en primer render rompe hidratación (decision) → links: nextjs-version-constraint, memory-game-flow, shapes-game-flow, numbers-game-flow
  Regla: en rutas estáticas, nunca generar datos con `Math.random()` durante el render (ni en el initializer de `useState`
- [[nextjs-version-constraint]] — Next.js version constraint (decision) → links: production-deploy-flow, routes-and-games-registry, paint-canvas-sizing-constraint
  Next **15.5.9** con React **18.3.1** (pin exacto de `next` y `eslint-config-next` en `package.json`). React 18 es peer v
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
- [[routes-and-games-registry]] — Rutas y registro de juegos (concept) → links: app-page.tsx, components-hubcontent.tsx, app-pintar-page.tsx, components-paintgame.tsx, components-memorygame.tsx, lib-memory.ts, components-shapesgame.tsx, lib-shapes.ts, components-numbersgame.tsx, lib-numbers.ts, components-phonegame.tsx, lib-phone.ts, components-starsgame.tsx, stars-game-flow, components-lightsgame.tsx, lib-lights.ts, lights-game-flow, components-bubblesgame.tsx, lib-bubbles.ts, bubbles-game-flow, components-kitchengame.tsx, lib-kitchen.ts, kitchen-game-flow, lib-games.ts, components-gamecard.tsx, app-globals.css, cause-effect-games-brief, memory-game-flow, shapes-game-flow, numbers-game-flow, phone-game-flow, paint-game-controls-flow
  Hub en [[app/page.tsx]] (`/`) → [[components/HubContent.tsx]]. Pinta Leo en [[app/pintar/page.tsx]] (`/pintar`) vía [[co
- [[shapes-game-flow]] — Shapes game flow (flow) → links: components-shapesgame.tsx, lib-shapes.ts, lib-games.ts, routes-and-games-registry, memory-game-flow
  `/formas` → `app/formas/page.tsx` → [[components/ShapesGame.tsx]]. Rondas: `createGameRounds()` en [[lib/shapes.ts]] (8 
- [[stars-game-flow]] — Stars game flow (flow) → links: components-starsgame.tsx, app-globals.css, lib-audio.ts, audio-system, cause-effect-games-brief, lib-games.ts, routes-and-games-registry
  `/estrellas` → `app/estrellas/page.tsx` → [[components/StarsGame.tsx]]. Sin lib de lógica: todo el estado vive en el com

### audio-system
Sonidos compartidos vía Web Audio API sintetizada en [[lib/audio.ts]] — sin assets binarios. API pública: `playSound(id)`, `unlockAudio()`, `stopRing()`, `isMuted()`, `setMuted()`, `toggleMuted()`. Toggle UI en [[components/SoundToggle.tsx]] (🔊/🔇 en `.app-header` o `.hub-header`).

**Unlock obligatorio:** llamar `unlockAudio()` en el primer gesto del usuario (click/tap) antes de reproducir; política autoplay móvil. Cada juego lo invoca en sus handlers de interacción; `SoundToggle` también lo llama al pulsar.

**Persistencia mute:** clave `leonor-sound-muted` en `localStorage` (`MUTE_STORAGE_KEY`). `true` = silenciado.

**SoundIds** (`SoundId`): `tap`, `correct`, `wrong`, `victory`, `flip`, `ring`, `connect`, `hangup`, `clear`, `draw`, `sparkle`, `switchOn`, `switchOff`, `pop`, `drop`, `stir`, `chop`, `sprinkle`. Volumen moderado (~0.22), duración corta (~0.3s). `ring` se repite en intervalo hasta `stopRing()` (conectar o colgar). `switchOn` es una secuencia ascendente 587→880 en `triangle`; `switchOff` desciende 494→294 en `sine` — deben oírse distintos entre sí. `pop` es una caída corta 1245→831 en `sine` (~0.13s total): a propósito distinto de `tap` (880 plano) y de `sparkle` (ascendente triple). `drop` es 392→523 en `triangle`; `stir` es tono corto 440; `chop` es 280→180 en `square`; `sprinkle` es 988→1318 en `triangle`.

Integración por juego — ver [[routes-and-games-registry]]: hub `tap` en tarjeta activa; Memoria `flip`/`correct`/`wrong`/`victory`; Formas y Números `tap`/`correct`/`wrong`/`victory`; Pinta Leo `tap` en herramienta/color/tamaño y `clear` al borrado confirmado (no por trazo); Teléfono `tap`/`ring`/`connect`/`hangup`; Estrellas `sparkle` en cada tap sobre `.stars-sky`; Luces `switchOn`/`switchOff` por toggle — ver [[lights-game-flow]]; Burbujas `pop` en cada tap sobre una burbuja — ver [[bubbles-game-flow]]; Cocina `drop`/`stir`/`chop`/`sprinkle` por gesto, `correct` al completar paso y `victory` al plato listo — ver [[kitchen-game-flow]].

### bubbles-game-flow
/burbujas → app/burbujas/page.tsx → [[components/BubblesGame.tsx]]. Config y factory en [[lib/bubbles.ts]]: MAX_BUBBLES 4, createInitialBubbles(n), createBubble(id, others) posiciona lejos de las existentes.

Estado en el componente: `bubbles` (flotando) y `pops` (partículas efímeras). handlePointerDown → playSound("pop") de [[audio-system]], agrega un Pop, programa un setTimeout de POP_MS 520ms para retirarlo, y handlePop reemplaza la burbuja tocada por una nueva lejos del punto. Sin puntaje, sin fallo, sin fin — patrón del [[cause-effect-games-brief]].

Regla de timers: el efecto de cleanup debe leer `popTimersRef.current` dentro del return, nunca capturar el array antes. Cada timeout que ejecuta reasigna el ref a un array nuevo (filter), así que una referencia capturada al montar deja timers vivos tras unmount. Bug encontrado por QA y corregido.

Registrado en [[routes-and-games-registry]].

### cause-effect-games-brief
Tres juegos sensoriales propuestos para <3 años: sin puntaje, sin tiempo, sin fallo. Patrón UI como [[routes-and-games-registry]] (`.app-container`, `.app-header`, `SoundToggle`). Audio vía [[audio-system]] — nuevos `SoundId` sugeridos: `pop`, `switchOn`, `switchOff`, `sparkle`.

**Estrellas** (`/estrellas`, prioridad 1): cielo oscuro; cada tap crea estrella en el punto con brillo ~800ms + `sparkle`. Acumulan hasta ~15, luego desvanecen suave en bloque. Solo volver atrás.

**Luces** (`/luces`, prioridad 2): escena nocturna; 3–4 interruptores grandes (≥72px). Cada uno enciende/apaga un elemento (lámpara, luna, ventana). Estado persiste; `switchOn`/`switchOff`. Sin secuencia obligatoria.

**Burbujas** (`/burbujas`, prioridad 3): fondo claro; 2–4 burbujas flotando (movimiento lento). Tap → `pop` + partículas; respawn en otro lugar. Sin límite ni victoria.

No copiar flujo de rondas de [[shapes-game-flow]] ni [[numbers-game-flow]]. Ver [[memory-game-flow]] solo por layout de tarjeta.

### kitchen-game-brief
Juego de rol + secuencia para ~2–4 años en `/cocina`. Locate: [[kitchen-game-flow]]. Audio [[audio-system]].

## UX v2 (obligatorio — reemplaza drag a contenedores)

**Problema v1:** zonas con borde punteado, grid 2 columnas, íconos 40–44px y drag preciso = interfaz web, no cocina. Un niño de 2 años no “mete cosas en contenedores”.

**Principio:** una escena de cocina por paso, no un panel con cajas. Sin `border dashed`. Sin grid de zonas visibles.

**Interacción principal = TAP, no drag:**
- Tap en ingrediente → vuela al lugar correcto con animación + `drop`.
- Drag solo como fallback magnético: zona de drop = mitad superior de pantalla entera, no un rectángulo chico.
- Nunca dos ingredientes arrastrables a la vez.

**Un foco por paso:** pantalla muestra solo lo necesario ahora. Ej. paso lechuga = mesa + bowl grande centro + lechuga grande abajo pulsando. No bowl + plato + dos ingredientes juntos.

**Tamaños mínimos (dedo 2 años):**
- Ingrediente activo: emoji ≥96px, área táctil ≥120px.
- Bowl/plato/pan: ≥40% del alto visible.
- Hint de acción: una sola animación grande (mano 👆 o gesto), no fila de dots 40px.
- Quitar `.kitchen-step-dot` como progreso; opcional barra simple 1/5 sin íconos chicos.

**Escena realista:**
- Fondo mesa de madera / encimera, no tarjetas blancas.
- Bowl y plato como objetos grandes centrados, no “zones”.
- Ingredientes en la mesa (abajo), no esquinas absolutas.

**Gestos por tipo:**
- `tap-place` (antes `drag`) — tap ingrediente → anima al bowl/plato/sándwich.
- `stir` — dedo en bowl entero; hint espiral grande.
- `sprinkle` — shaker grande que rebota; tap 4× sobre comida (área = plato entero).
- `cut` — pan gigante en tabla; swipe en cualquier parte del pan.
- `tap` — tap en objeto único (tapar sándwich).

**Ensalada v2 (5 pasos, todos tap o gesto amplio):** tap lechuga→bowl → tap tomate→bowl → revolver bowl → tap bowl→vierte al plato → salpicar plato.

**Sándwich v2:** cortar pan → tap jamón→pan → tap queso→pan → tap rebanada arriba.

**No hacer:** drag preciso, zonas punteadas, múltiples targets visibles, íconos <80px, texto como única guía, puntaje, tiempo.

Ver [[phone-game-flow]] (máquina de pantallas) [[cause-effect-games-brief]] (simplicidad táctil).

### kitchen-game-flow
/cocina → app/cocina/page.tsx → [[components/KitchenGame.tsx]]. Recetas [[lib/kitchen.ts]]: ensalada 5 pasos, sándwich 4. Estilos `.kitchen-*` en [[app/globals.css]]. Audio [[audio-system]]: tap/drop/stir/chop/sprinkle + correct/victory.

Pantallas: `menu` (DISHES) → `cooking` (stepIndex) → `done`. Pizza fuera del MVP.

UX v2 (reemplaza drag): cada `KitchenStep` trae `scene` (`bowl | pour | plate | bread | sandwich`) y el componente renderiza UNA escena por paso — objeto central grande + `.kitchen-tray` con un solo ingrediente. Gesto `tap-place`: tap en el ingrediente → `handleTapPlace` mide origen y `targetRef`, anima `.kitchen-fly` con `--kitchen-fly-dx/dy` durante `FLY_DURATION_MS`, y al terminar suena `drop`, aplica visual y avanza. `busyRef` bloquea taps durante el vuelo. No hay drag, ghost ni zonas punteadas. Ver [[kitchen-game-brief]].

Stir: primer `pointermove` sobre el bowl arma `stirQuietTimerRef` (`STIR_TIME_MS`); también completa por `STIR_CIRCLES_REQUIRED`. Cut: swipe ≥`CUT_SWIPE_MIN_PX` en cualquier parte del pan, 3 veces. Sprinkle: 4 taps sobre el plato entero. Timers UI en `uiTimersRef` con cleanup en unmount — mismo patrón que [[bubbles-game-flow]]. See [[routes-and-games-registry]] [[phone-game-flow]].

### lights-game-flow
`/luces` → `app/luces/page.tsx` → [[components/LightsGame.tsx]]. Config de switches en [[lib/lights.ts]]: `LIGHT_SWITCHES` (4 entradas `{ id, label, emoji, element, surprise? }`) y `createInitialLightsState()` → `Record<LightElementId, boolean>` todo en false.

Toggle: click en `.lights-switch` → `handleToggle(element, surprise)` → `unlockAudio()` → lee `lightsRef.current[id]` (ref espejo, no updater de estado, para no disparar audio dos veces en StrictMode) → `setLights` con el objeto nuevo → `playSound(next ? 'switchOn' : 'switchOff')`.

Cada elemento es un SVG absoluto en `.lights-scene` con clase `lights-element lights-element--<id>` y `is-on` cuando está encendido; el look de apagado/encendido es solo CSS (`color`, `opacity`, `drop-shadow`). Elementos: `lampara`, `luna`, `ventana`, `estrella`.

Sorpresa: el switch `estrella` tiene `surprise: true`. Al ENCENDER (no al apagar) incrementa `confettiKey`, monta `.lights-confetti` con 10 piezas deterministas (`CONFETTI_PIECES`, sin Math.random) y un `setTimeout` de `CONFETTI_MS = 1800` la desmonta; el `key` reinicia la animación en toggles rápidos y el timer se limpia en unmount.

Sin puntaje, temporizador, secuencia obligatoria ni estado de fallo: el estado persiste mientras el niño juega. Header claro `.app-header` con `← Volver` y `SoundToggle`; el fondo oscuro vive en `.lights-main` (nunca en `body`).

Estilos `.lights-*` en [[app/globals.css]]: `.lights-switches` es grid de 4 columnas fijas y los botones miden 84px de alto. Audio `switchOn`/`switchOff` en [[lib/audio.ts]] — ver [[audio-system]]. Segundo juego del brief [[cause-effect-games-brief]]; hermano de [[stars-game-flow]]. Registro en [[lib/games.ts]] — ver [[routes-and-games-registry]].

### memory-game-flow
`/memoria` → `app/memoria/page.tsx` → [[components/MemoryGame.tsx]]. Deck: `createShuffledDeck()` en [[lib/memory.ts]] (12 cartas, 6 pares). Volteo: 2 cartas; match → `memory-card--matched`; fallo → revert tras ~1s. Victoria 6 pares → overlay "¡Lo lograste! 🎉". Reinicio: header o victoria llaman `createShuffledDeck()`. Hub: `memoria` `available: true` en [[lib/games.ts]]. See [[routes-and-games-registry]].

### next15-hydration-runtime-bugs
Regla: en rutas estáticas, nunca generar datos con `Math.random()` durante el render (ni en el initializer de `useState`). El HTML se hornea en el build con un valor y el cliente genera otro al hidratar → hydration mismatch.

Patrón obligatorio: estado inicial determinista + aleatorizar en un `useEffect` de montaje. Ya aplicado en `components/MemoryGame.tsx`, `components/ShapesGame.tsx` y `components/NumbersGame.tsx`, con las factories deterministas `createOrderedDeck()` en `lib/memory.ts` y `createOrderedRounds()` en `lib/shapes.ts` y `lib/numbers.ts`. Las variantes aleatorias siguen usándose en `restart`.

No era un bug de Next 15: existía con Next 14, el upgrade solo lo hizo visible. Ver [[nextjs-version-constraint]].

Cómo verificar: compilar dos veces desde cero y diffear `.next/server/app/<ruta>.html`; solo debe cambiar el build ID de Next.

Costo aceptado: un frame con la ronda determinista antes de aleatorizar. See [[memory-game-flow]] [[shapes-game-flow]] [[numbers-game-flow]].

### nextjs-version-constraint
Next **15.5.9** con React **18.3.1** (pin exacto de `next` y `eslint-config-next` en `package.json`). React 18 es peer válido de Next 15 (`^18.2.0 || ^19.0.0`): no migrar a React 19 salvo que se necesite una feature suya.

Engine: `^18.18.0 || >= 20`. CI (`node-version: 18`) y servidor (`v18.20.7`) cumplen — no bajar de 18.18.

`tsconfig.json` requiere `"target": "ES2017"`; si falta, Next lo reescribe entero y ensucia el diff.

El upgrade no tocó `app/`, `components/` ni `lib/`: el repo no usa ninguna API que Next 15 volvió async (`cookies`, `headers`, `params`, `searchParams`, `draftMode`). Único contacto con el framework: `next/font/google` en `app/layout.tsx`.

Deuda: `next lint` está deprecado y desaparece en Next 16 (hoy solo warning). Antes de subir a 16, correr `npx @next/codemod@canary next-lint-to-eslint-cli .`. See [[production-deploy-flow]] [[routes-and-games-registry]] [[paint-canvas-sizing-constraint]].

### numbers-game-flow
`/numeros` → `app/numeros/page.tsx` → [[components/NumbersGame.tsx]]. Rondas: `createGameRounds()` en [[lib/numbers.ts]] (8 rondas, cuenta 1–5 con emojis, sin `count` consecutivo). Acierto → animación ~600ms y avanza; fallo → shake ~400ms y reintento. Victoria tras ronda 8 → overlay "¡Lo lograste! 🎉". Reinicio solo en victoria. Hub: `numeros` `available: true` en [[lib/games.ts]]. See [[routes-and-games-registry]] [[shapes-game-flow]].

### paint-canvas-sizing-constraint
`components/PaintCanvas.tsx` mide su `parentElement` con ResizeObserver y limpia con `clientWidth/clientHeight`. Regla: el div contenedor inmediato del canvas debe tener alto concreto (`flex: 1; min-height: 0; overflow: hidden; position: relative`) y el canvas debe ser su único hijo. Si el padre colapsa, el canvas queda en 0px y no dibuja. See [[paint-game-controls-flow]] [[routes-and-games-registry]].

### paint-game-controls-flow
Pinta Leo vive en [[routes-and-games-registry]]: `/pintar` renderiza `app/pintar/page.tsx` → `components/PaintGame.tsx` → `components/PaintCanvas.tsx`. Controles: `Toolbar` cambia tool, `BrushSizePicker` cambia brushSize, `ColorPalette` cambia color. Canvas maneja pointer events; `ClearButton` requiere doble toque: primero banner, segundo `PaintCanvas.clear()`. See [[routes-and-games-registry]].

### paint-ui-class-prefix
Los estilos de Pinta Leo usan prefijo `.paint-*` en `app/globals.css` (migración ya aplicada), alineados con `.memory-*`, `.shapes-*` y `.numbers-*`: border-radius 20px, box-shadow 0 4px 20px rgba(0,0,0,0.08), `:active` scale(0.96), estado activo con ring inset.

Clases vivas: `paint-main`, `paint-canvas-card`, `paint-panel` (+ modificadores `--tools` / `--colors`), `paint-tool-grid`, `paint-tool-btn`, `paint-tool-label`, `paint-size-picker`, `paint-size-btn`, `paint-size-dot`, `paint-color-palette`, `paint-color-btn`, `paint-clear-btn`, `paint-banner`, `paint-banner-message`. Estados como sufijo de clase: `is-active`, `is-pending`, `is-pop`.

Las clases viejas sin prefijo (`tool-btn`, `color-btn`, `size-btn`, `canvas-area`, `tools-bar`, `colors-bar`, `clear-btn`, `clear-banner`) fueron eliminadas y no quedan referencias. El banner de borrado mantiene `pointer-events: none` para que el segundo toque llegue al botón del header.

Móvil (`max-width: 767px`): `paint-panel--tools` apila `paint-tool-grid` y `paint-size-picker` en dos filas (`flex-wrap` + `flex-basis: 100%`); `paint-tool-btn` lleva `min-width: 56px`. Paleta: `paint-panel--colors` con `overflow: hidden`, `paint-color-palette` con `justify-content: flex-start` y scroll horizontal. See [[paint-game-controls-flow]] [[paint-canvas-sizing-constraint]] [[routes-and-games-registry]].

### phone-game-flow
`/telefono` → `app/telefono/page.tsx` → [[components/PhoneGame.tsx]]. Datos: `CONTACTS` en [[lib/phone.ts]] (6 contactos: id, name, emoji, phrases[3]).

Máquina de 3 pantallas en un solo `useState<Screen>`: `contacts` → `ringing` → `call`.
- `contacts`: grid de botones `.phone-contact`; tocar uno guarda el contacto y pasa a `ringing`.
- `ringing`: un `useEffect` con `setTimeout(RINGING_MS = 2000)` pasa a `call` y pone `visiblePhrases = 1`. El cleanup cancela la transición si el niño cuelga antes.
- `call`: segundo `useEffect` incrementa `visiblePhrases` cada `PHRASE_DELAY_MS = 1500` hasta `phrases.length`; se renderiza `phrases.slice(0, visiblePhrases)`.

Termina con `hangUp()`: vuelve a `contacts` y resetea contacto y `visiblePhrases`, así la siguiente llamada arranca desde la primera frase. Sin audio, sin `getUserMedia`, sin links `tel:` — todo es simulado. Estilos `.phone-*` al final de [[app/globals.css]]. See [[routes-and-games-registry]] [[shapes-game-flow]].

### production-deploy-flow
Push a `develop` → `.github/workflows/integration.yml` (install, lint, typecheck, build, deploy SSH). Repo: `rodrigoanti/rodrigoanti_leonor_games`. Servidor: `/home/rodrigoanti/dev/leonor_games` (clona en primer deploy si falta). PM2 `leonor-games` vía `ecosystem.config.js` + `npm run prod`. Puerto **30125** (puzzle en 30124). Secrets: `SSH_HOST`, `SSH_USERNAME`, `SSH_PRIVATE_KEY`, `SSH_PASSPHRASE`, `GH_TOKEN`. Nginx `games.exampledev.xyz` → 30125: configuración manual en `/etc/nginx/sites-available/exampledev-subdomains` (referencia `deploy/nginx/games.conf`); el CI no toca nginx. See [[routes-and-games-registry]].

### routes-and-games-registry
Hub en [[app/page.tsx]] (`/`) → [[components/HubContent.tsx]]. Pinta Leo en [[app/pintar/page.tsx]] (`/pintar`) vía [[components/PaintGame.tsx]]. Memoria en `app/memoria/page.tsx` (`/memoria`) vía [[components/MemoryGame.tsx]]; lógica en [[lib/memory.ts]]. Formas en `app/formas/page.tsx` (`/formas`) vía [[components/ShapesGame.tsx]]; lógica en [[lib/shapes.ts]]. Números en `app/numeros/page.tsx` (`/numeros`) vía [[components/NumbersGame.tsx]]; lógica en [[lib/numbers.ts]]. Teléfono en `app/telefono/page.tsx` (`/telefono`) vía [[components/PhoneGame.tsx]]; datos en [[lib/phone.ts]]. Estrellas en `app/estrellas/page.tsx` (`/estrellas`) vía [[components/StarsGame.tsx]]; sin lib, estado en el componente — ver [[stars-game-flow]]. Luces en `app/luces/page.tsx` (`/luces`) vía [[components/LightsGame.tsx]]; config en [[lib/lights.ts]] — ver [[lights-game-flow]]. Burbujas en `app/burbujas/page.tsx` (`/burbujas`) vía [[components/BubblesGame.tsx]]; config y factory en [[lib/bubbles.ts]] — ver [[bubbles-game-flow]]. Cocina Leo en `app/cocina/page.tsx` (`/cocina`) vía [[components/KitchenGame.tsx]]; recetas en [[lib/kitchen.ts]] — ver [[kitchen-game-flow]].

Registro tipado en [[lib/games.ts]] (`GAMES`: id, title, emoji, href, available) — 9 juegos activos. Hub UI: [[components/GameCard.tsx]]; `.hub-grid` es 1 columna y 2 desde 600px, sirve para 9 tarjetas sin cambios.

Estilos hub, `.paint-*`, `.memory-*`, `.shapes-*`, `.numbers-*`, `.phone-*`, `.stars-*`, `.lights-*`, `.bubbles-*` y `.kitchen-*` en [[app/globals.css]]; los juegos comparten `.app-container`, `.app-header` y `.back-link`. Estrellas y Luces son los de fondo oscuro, aplicado en `.stars-main` / `.lights-main`; Burbujas usa fondo claro en `.bubbles-main`; Cocina usa fondo claro en `.kitchen-main` (nunca en `body`, que tiene el gradiente rosado global).

Los tres juegos causa-efecto del brief [[cause-effect-games-brief]] (Estrellas, Luces, Burbujas) ya están completos y activos.

See [[memory-game-flow]] [[shapes-game-flow]] [[numbers-game-flow]] [[phone-game-flow]] [[paint-game-controls-flow]] [[stars-game-flow]] [[lights-game-flow]] [[bubbles-game-flow]] [[kitchen-game-flow]] [[cause-effect-games-brief]].

### shapes-game-flow
`/formas` → `app/formas/page.tsx` → [[components/ShapesGame.tsx]]. Rondas: `createGameRounds()` en [[lib/shapes.ts]] (8 rondas, 4 formas SVG, sin `correctId` consecutivo). Acierto → animación ~600ms y avanza; fallo → shake ~400ms y reintento. Victoria tras ronda 8 → overlay "¡Lo lograste! 🎉". Reinicio solo en victoria. Hub: `formas` `available: true` en [[lib/games.ts]]. See [[routes-and-games-registry]] [[memory-game-flow]].

### stars-game-flow
`/estrellas` → `app/estrellas/page.tsx` → [[components/StarsGame.tsx]]. Sin lib de lógica: todo el estado vive en el componente.

Tap: `onPointerDown` en `.stars-sky` → `getBoundingClientRect()` para x/y en % → `unlockAudio()` + `playSound('sparkle')` → nueva estrella al array `stars`. Ids desde `nextIdRef` (no index, no Date.now).

Límite: `MAX_STARS = 15` contado en `activeCountRef` (ref, no state, para sobrevivir al batching de taps rápidos). Al llegar a 15 todas las estrellas del array se marcan `fading: true`, `activeCountRef` vuelve a 0 y un `setTimeout` de `FADE_MS = 1500` las elimina con `filter(s => !s.fading)`. Los taps durante el fade crean estrellas nuevas sin `fading`, así el filtro no las borra. Fin del ciclo: array vacío, listo para seguir tocando.

Sin puntaje, contador, temporizador ni estado de fallo. Header comparte `.app-header` claro con `← Volver` y `SoundToggle`; el fondo nocturno vive solo en `.stars-main`.

Estilos `.stars-*` en [[app/globals.css]]: `.stars-star` con `pointer-events: none` (los taps siempre llegan al cielo) y `animation: stars-appear 800ms forwards`; `.stars-star--fading` sobreescribe con `stars-fade 1500ms`. `touch-action: none` en `.stars-sky` evita scroll/zoom.

Audio: `sparkle` en [[lib/audio.ts]] — ver [[audio-system]]. Primer juego del brief [[cause-effect-games-brief]]. Registro en [[lib/games.ts]] — ver [[routes-and-games-registry]].

## Log
- `2026-08-27T02:08:59.848Z` — [fullstack] Puerto 30125 confirmado en prod; workflow ahora clona en primer deploy.
- `2026-08-27T02:10:42.516Z` — [product-designer] Brief de producto para tres juegos causa-efecto: Estrellas, Luces, Burbujas.
- `2026-08-27T02:50:52.300Z` — [fullstack] Wiki: workflow Server Recovery y ops en VPS
- `2026-08-27T02:56:46.288Z` — [fullstack] Wiki: fail2ban como causa de connection refused en 22222; fix-ssh-access
- `2026-08-27T03:13:57.240Z` — [tech-lead-copy] [tl] Estrellas en /estrellas: flujo documentado y registro actualizado a 6 juegos.
- `2026-08-27T03:15:02.035Z` — [qa] Actualicé audio-system: el SoundId sparkle y su integración en Estrellas ya existen en código.
- `2026-08-27T03:16:58.040Z` — [tech-lead-copy] [tech-lead-copy] [tl] Luces en /luces: flujo documentado, switchOn/switchOff en audio y registro a 7 juegos.
- `2026-08-27T03:21:02.622Z` — [tech-lead-copy] [tech-lead-copy] [tl] Burbujas en /burbujas: flujo documentado, SoundId pop en audio y registro a 8 juegos.
- `2026-08-27T03:22:03.755Z` — [qa] bubbles-game-flow corregido: timers de pop tienen bug de cleanup al desmontar tras reasignar el ref
- `2026-08-27T03:22:39.911Z` — [tech-lead-copy] bubbles-game-flow: documentada la regla de cleanup de timers (leer el ref al desmontar) tras el fix del bug reportado por QA
- `2026-08-27T03:30:11.647Z` — [fullstack] paint-ui-class-prefix: reglas de layout móvil para tools en dos filas y paleta con scroll
- `2026-08-27T03:37:17.502Z` — [product-designer] Brief de producto para juego Cocina: flujo, gestos, platos MVP y restricciones UX.
- `2026-08-27T03:45:46.939Z` — [tl] kitchen-game-flow: flujo MVP ensalada/sándwich y locate archivos tras implementación
- `2026-08-27T03:46:51.960Z` — [qa] kitchen-game-flow registra bugs QA reproducibles de Stir y cleanup de timers
- `2026-08-27T03:48:26.641Z` — [tl] kitchen-game-flow: stir quiet timer y uiTimersRef cleanup tras fix QA bugs
- `2026-08-27T16:16:04.655Z` — [product-designer] Kitchen UX v2: tap-to-place, escena única, sin zonas punteadas ni íconos chicos.
- `2026-08-27T16:24:46.206Z` — [tech-lead-copy] kitchen-game-flow: v2 tap-place con scene por paso, fly animation y sin drag/zonas
- `2026-08-27T17:01:53.929Z` — [tech-lead-copy] Next 15.5.9 + React 18.3.1 en prod: engine node 18.18+, target ES2017 y deuda de next lint antes de Next 16
- `2026-08-27T17:12:35.348Z` — [qa] QA registró hydration mismatches reproducibles tras Next 15 en juegos con aleatoriedad inicial.
- `2026-08-27T17:19:19.212Z` — [tech-lead-copy] next15-hydration-runtime-bugs pasa de inventario de bugs a regla: sin Math.random en render, factories deterministas ya aplicadas y bug corregido en 994ca18
<!-- /iaterminal:auto -->

<!-- iaterminal:notes -->
(no annotations yet)
<!-- /iaterminal:notes -->
