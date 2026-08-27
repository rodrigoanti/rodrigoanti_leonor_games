# Kitchen game brief
<!-- iaterminal:wiki-page {"type":"concept"} -->

Juego de rol + secuencia para ~2–4 años: más exigente que [[cause-effect-games-brief]] pero sin puntaje ni tiempo. Ruta propuesta `/cocina` → `app/cocina/page.tsx` → `components/KitchenGame.tsx`; recetas en `lib/kitchen.ts`. Estilos `.kitchen-*` en [[app/globals.css]]. Audio [[audio-system]] — nuevos `SoundId`: `chop`, `stir`, `sprinkle`, `drop` (o reutilizar `tap`/`correct`/`victory`).

**Flujo (3 pantallas, como [[phone-game-flow]]):** `menu` → elegir plato (tarjetas grandes con emoji) → `cooking` → pasos guiados uno a uno → `done` → personaje come + “¡Listo!” → cocinar otro o volver al hub.

**Tipos de paso (gestos simples, zonas ≥72px):**
- `drag` — arrastrar ingrediente a zona (bowl, sartén, plato); suelta fuera = vuelve con animación suave, sin castigo.
- `stir` — círculos en el bowl (~3 vueltas o 2s de movimiento en zona); hint visual de espiral.
- `sprinkle` — 4 taps en el shaker o sobre la comida; partículas cortas.
- `cut` — 3 swipes horizontales sobre el ingrediente (pan, tomate); líneas guía opcionales.
- `tap` — acciones puntuales (tapar sandwich, horno).

**Platos MVP (2 para lanzar, 1 después):**
1. **Ensalada** 🥗 — drag lechuga/tomate → stir → drag al plato → sprinkle.
2. **Sándwich** 🥪 — cut pan → drag jamón/queso → tap tapar.
3. **Pizza** 🍕 (v2) — drag masa → stir salsa → drag toppings → sprinkle.

**UX:** solo el paso actual resaltado; icono grande de acción (sin leer obligatorio); `correct` al completar paso; `victory` al plato listo. Sin fallo duro: reintento libre. `unlockAudio()` en primer gesto.

**No hacer:** temporizador, puntuación, cortar siguiendo trazo exacto, más de 5 pasos por plato, texto largo.

Ver [[routes-and-games-registry]] [[phone-game-flow]] [[shapes-game-flow]].
