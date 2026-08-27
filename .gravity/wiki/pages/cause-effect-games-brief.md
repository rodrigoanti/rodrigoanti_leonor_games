# Cause-effect games brief
<!-- iaterminal:wiki-page {"type":"concept"} -->

Tres juegos sensoriales propuestos para <3 años: sin puntaje, sin tiempo, sin fallo. Patrón UI como [[routes-and-games-registry]] (`.app-container`, `.app-header`, `SoundToggle`). Audio vía [[audio-system]] — nuevos `SoundId` sugeridos: `pop`, `switchOn`, `switchOff`, `sparkle`.

**Estrellas** (`/estrellas`, prioridad 1): cielo oscuro; cada tap crea estrella en el punto con brillo ~800ms + `sparkle`. Acumulan hasta ~15, luego desvanecen suave en bloque. Solo volver atrás.

**Luces** (`/luces`, prioridad 2): escena nocturna; 3–4 interruptores grandes (≥72px). Cada uno enciende/apaga un elemento (lámpara, luna, ventana). Estado persiste; `switchOn`/`switchOff`. Sin secuencia obligatoria.

**Burbujas** (`/burbujas`, prioridad 3): fondo claro; 2–4 burbujas flotando (movimiento lento). Tap → `pop` + partículas; respawn en otro lugar. Sin límite ni victoria.

No copiar flujo de rondas de [[shapes-game-flow]] ni [[numbers-game-flow]]. Ver [[memory-game-flow]] solo por layout de tarjeta.
