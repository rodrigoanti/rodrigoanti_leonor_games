# Audio system
<!-- iaterminal:wiki-page {"type":"decision"} -->

Sonidos compartidos vía Web Audio API sintetizada en [[lib/audio.ts]] — sin assets binarios. API pública: `playSound(id)`, `unlockAudio()`, `stopRing()`, `isMuted()`, `setMuted()`, `toggleMuted()`. Toggle UI en [[components/SoundToggle.tsx]] (🔊/🔇 en `.app-header` o `.hub-header`).

**Unlock obligatorio:** llamar `unlockAudio()` en el primer gesto del usuario (click/tap) antes de reproducir; política autoplay móvil. Cada juego lo invoca en sus handlers de interacción; `SoundToggle` también lo llama al pulsar.

**Persistencia mute:** clave `leonor-sound-muted` en `localStorage` (`MUTE_STORAGE_KEY`). `true` = silenciado.

**SoundIds** (`SoundId`): `tap`, `correct`, `wrong`, `victory`, `flip`, `ring`, `connect`, `hangup`, `clear`, `draw`, `sparkle`, `switchOn`, `switchOff`, `pop`, `drop`, `stir`, `chop`, `sprinkle`. Volumen moderado (~0.22), duración corta (~0.3s). `ring` se repite en intervalo hasta `stopRing()` (conectar o colgar). `switchOn` es una secuencia ascendente 587→880 en `triangle`; `switchOff` desciende 494→294 en `sine` — deben oírse distintos entre sí. `pop` es una caída corta 1245→831 en `sine` (~0.13s total): a propósito distinto de `tap` (880 plano) y de `sparkle` (ascendente triple). `drop` es 392→523 en `triangle`; `stir` es tono corto 440; `chop` es 280→180 en `square`; `sprinkle` es 988→1318 en `triangle`.

Integración por juego — ver [[routes-and-games-registry]]: hub `tap` en tarjeta activa; Memoria `flip`/`correct`/`wrong`/`victory`; Formas y Números `tap`/`correct`/`wrong`/`victory`; Pinta Leo `tap` en herramienta/color/tamaño y `clear` al borrado confirmado (no por trazo); Teléfono `tap`/`ring`/`connect`/`hangup`; Estrellas `sparkle` en cada tap sobre `.stars-sky`; Luces `switchOn`/`switchOff` por toggle — ver [[lights-game-flow]]; Burbujas `pop` en cada tap sobre una burbuja — ver [[bubbles-game-flow]]; Cocina `drop`/`stir`/`chop`/`sprinkle` por gesto, `correct` al completar paso y `victory` al plato listo — ver [[kitchen-game-flow]].
