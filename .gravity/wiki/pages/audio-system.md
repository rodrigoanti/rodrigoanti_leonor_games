# Audio system
<!-- iaterminal:wiki-page {"type":"decision"} -->

Sonidos compartidos vía Web Audio API sintetizada en [[lib/audio.ts]] — sin assets binarios. API pública: `playSound(id)`, `unlockAudio()`, `stopRing()`, `isMuted()`, `setMuted()`, `toggleMuted()`. Toggle UI en [[components/SoundToggle.tsx]] (🔊/🔇 en `.app-header` o `.hub-header`).

**Unlock obligatorio:** llamar `unlockAudio()` en el primer gesto del usuario (click/tap) antes de reproducir; política autoplay móvil. Cada juego lo invoca en sus handlers de interacción; `SoundToggle` también lo llama al pulsar.

**Persistencia mute:** clave `leonor-sound-muted` en `localStorage` (`MUTE_STORAGE_KEY`). `true` = silenciado.

**SoundIds** (`SoundId`): `tap`, `correct`, `wrong`, `victory`, `flip`, `ring`, `connect`, `hangup`, `clear`, `draw`. Volumen moderado (~0.22), duración corta (~0.3s). `ring` se repite en intervalo hasta `stopRing()` (conectar o colgar).

Integración por juego — ver [[routes-and-games-registry]]: hub `tap` en tarjeta activa; Memoria `flip`/`correct`/`wrong`/`victory`; Formas y Números `tap`/`correct`/`wrong`/`victory`; Pinta Leo `tap` en herramienta/color/tamaño y `clear` al borrado confirmado (no por trazo); Teléfono `tap`/`ring`/`connect`/`hangup`.
