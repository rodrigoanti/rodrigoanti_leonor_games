# Kitchen game flow
<!-- iaterminal:wiki-page {"type":"flow"} -->

`/cocina` → `app/cocina/page.tsx` → [[components/KitchenGame.tsx]]. Recetas en [[lib/kitchen.ts]]: `DISHES` con ensalada (5 pasos) y sándwich (4 pasos). Estilos `.kitchen-*` en [[app/globals.css]]. Audio [[audio-system]]: `drop`, `stir`, `chop`, `sprinkle` + `correct` por paso y `victory` al plato listo.

Máquina de 3 pantallas en `useState<KitchenScreen>`: `menu` → `cooking` → `done`.
- `menu`: tarjetas grandes ensalada 🥗 y sándwich 🥪 desde `DISHES`.
- `cooking`: un paso activo (`stepIndex`); gestos `drag`, `stir`, `sprinkle`, `cut`, `tap` según `KitchenStep.gesture`. Mal drop vuelve ingrediente sin castigo. Zonas ≥72px (`DRAG_ZONE_MIN_PX`).
- `done`: 😋 + «¡Listo!» → «Cocinar otro» (vuelve a `menu`) o «← Volver» al hub.

Ensalada: drag lechuga/tomate → bowl, stir (~3 círculos o 2s), drag al plato, sprinkle (4 taps). Sándwich: cut pan (3 swipes), drag jamón/queso, tap tapar. Pizza v2 — fuera del MVP.

See [[kitchen-game-brief]] [[routes-and-games-registry]] [[phone-game-flow]].
