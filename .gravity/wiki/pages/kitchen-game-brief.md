# Kitchen game brief
<!-- iaterminal:wiki-page {"type":"concept"} -->

Juego de rol + secuencia para ~2–4 años en `/cocina`. Locate: [[kitchen-game-flow]]. Audio [[audio-system]].

## v3 — drag magnético (vigente)

El niño quiere mover cosas con el dedo, no solo tocarlas. Gesto principal `drag-place`: el ingrediente sigue el dedo y al soltar cerca del objeto central hace snap. La zona magnética es el rect del objeto + ~20% (piso 24px) y NUNCA se dibuja: el feedback es que el objeto central crece y brilla (`.kitchen-object--magnet`). Soltar lejos no es error — el ingrediente vuelve suave a la bandeja y el paso no avanza.

Tap sigue siendo válido como atajo para los más chicos: movimiento ≤12px se interpreta como tap y usa la animación de vuelo. Un solo ingrediente arrastrable a la vez (`busyRef` durante snap y retorno).

Menú: 10 platos en grid scrollable, tarjetas ≥120px táctiles.

## Principios v2 que siguen obligatorios

**Una escena de cocina por paso**, no un panel con cajas. Sin `border dashed`, sin grid de zonas visibles, sin dos targets a la vez. Pantalla muestra solo lo necesario ahora.

**Tamaños mínimos (dedo 2 años):** ingrediente activo emoji ≥96px y área táctil ≥120px; objeto central ≥40% del alto visible; un solo hint grande animado (👋 arrastrando en pasos drag, 🌀 stir, 👉 cut, 👆 tap); progreso = barra simple, nunca fila de dots.

**Escena realista:** fondo mesa de madera, objetos grandes centrados, ingredientes abajo en la mesa.

**Gestos:** `drag-place` (arrastrar o tocar el ingrediente), `stir` (dedo en el objeto entero), `sprinkle` (4 taps sobre el objeto), `cut` (swipe en cualquier parte), `tap` (un tap en el objeto central: cascar, voltear, servir, hornear).

**No hacer:** drag preciso con zona chica, zonas punteadas, múltiples targets visibles, íconos <80px, texto como única guía, puntaje, tiempo, castigo por soltar mal.

Ver [[phone-game-flow]] (máquina de pantallas) [[cause-effect-games-brief]] (simplicidad táctil).
