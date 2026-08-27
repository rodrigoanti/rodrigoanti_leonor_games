export type SoundId =
  | "tap"
  | "correct"
  | "wrong"
  | "victory"
  | "flip"
  | "ring"
  | "connect"
  | "hangup"
  | "clear"
  | "draw"
  | "sparkle"
  | "switchOn"
  | "switchOff"
  | "pop";

export const MUTE_STORAGE_KEY = "leonor-sound-muted";

const DEFAULT_VOLUME = 0.22;

let audioContext: AudioContext | null = null;
let unlocked = false;
let muted = false;
let ringTimer: ReturnType<typeof setInterval> | null = null;

function readMutedFromStorage(): boolean {
  if (typeof window === "undefined") {
    return false;
  }
  try {
    return localStorage.getItem(MUTE_STORAGE_KEY) === "true";
  } catch {
    return false;
  }
}

if (typeof window !== "undefined") {
  muted = readMutedFromStorage();
}

function getContext(): AudioContext | null {
  if (typeof window === "undefined") {
    return null;
  }
  if (!audioContext) {
    const Ctx =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    if (!Ctx) {
      return null;
    }
    audioContext = new Ctx();
  }
  return audioContext;
}

export function isMuted(): boolean {
  return muted;
}

export function setMuted(value: boolean): void {
  muted = value;
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(MUTE_STORAGE_KEY, String(value));
    } catch {
      /* ignore */
    }
  }
  if (value) {
    stopRing();
  }
}

export function toggleMuted(): boolean {
  setMuted(!muted);
  return muted;
}

export function unlockAudio(): void {
  const ctx = getContext();
  if (!ctx) {
    return;
  }
  if (ctx.state === "suspended") {
    void ctx.resume();
  }
  unlocked = true;
}

function playTone(
  frequency: number,
  duration: number,
  type: OscillatorType = "sine",
  volume = DEFAULT_VOLUME,
  startOffset = 0,
): void {
  const ctx = getContext();
  if (!ctx || !unlocked || muted) {
    return;
  }

  const oscillator = ctx.createOscillator();
  const gain = ctx.createGain();
  const start = ctx.currentTime + startOffset;
  const end = start + duration;

  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, start);
  gain.gain.setValueAtTime(0.0001, start);
  gain.gain.exponentialRampToValueAtTime(volume, start + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.0001, end);

  oscillator.connect(gain);
  gain.connect(ctx.destination);
  oscillator.start(start);
  oscillator.stop(end + 0.02);
}

function playSequence(
  notes: { frequency: number; duration: number; delay?: number }[],
  type: OscillatorType = "sine",
): void {
  let offset = 0;
  for (const note of notes) {
    playTone(note.frequency, note.duration, type, DEFAULT_VOLUME, offset);
    offset += note.delay ?? note.duration;
  }
}

function synthesize(id: SoundId): void {
  switch (id) {
    case "tap":
      playTone(880, 0.06, "sine", 0.18);
      break;
    case "flip":
      playTone(520, 0.08, "triangle", 0.16);
      break;
    case "correct":
      playSequence([
        { frequency: 523, duration: 0.1 },
        { frequency: 659, duration: 0.14, delay: 0.08 },
      ]);
      break;
    case "wrong":
      playTone(180, 0.22, "square", 0.12);
      break;
    case "victory":
      playSequence([
        { frequency: 523, duration: 0.1 },
        { frequency: 659, duration: 0.1, delay: 0.1 },
        { frequency: 784, duration: 0.18, delay: 0.1 },
      ]);
      break;
    case "ring":
      playSequence([
        { frequency: 440, duration: 0.18 },
        { frequency: 554, duration: 0.18, delay: 0.2 },
      ]);
      break;
    case "connect":
      playSequence([
        { frequency: 392, duration: 0.08 },
        { frequency: 523, duration: 0.16, delay: 0.08 },
      ]);
      break;
    case "hangup":
      playTone(330, 0.2, "sine", 0.16);
      break;
    case "clear":
      playTone(220, 0.28, "triangle", 0.14);
      break;
    case "draw":
      playTone(640, 0.04, "sine", 0.1);
      break;
    case "sparkle":
      playSequence([
        { frequency: 1174, duration: 0.09 },
        { frequency: 1568, duration: 0.09, delay: 0.07 },
        { frequency: 2093, duration: 0.12, delay: 0.07 },
      ], "triangle");
      break;
    case "switchOn":
      playSequence([
        { frequency: 587, duration: 0.05 },
        { frequency: 880, duration: 0.09, delay: 0.05 },
      ], "triangle");
      break;
    case "switchOff":
      playSequence([
        { frequency: 494, duration: 0.05 },
        { frequency: 294, duration: 0.1, delay: 0.05 },
      ], "sine");
      break;
    case "pop":
      playSequence([
        { frequency: 1245, duration: 0.045 },
        { frequency: 831, duration: 0.09, delay: 0.04 },
      ], "sine");
      break;
  }
}

export function stopRing(): void {
  if (ringTimer) {
    clearInterval(ringTimer);
    ringTimer = null;
  }
}

export function playSound(id: SoundId): void {
  if (muted) {
    return;
  }

  if (id === "ring") {
    stopRing();
    synthesize("ring");
    ringTimer = setInterval(() => synthesize("ring"), 900);
    return;
  }

  stopRing();
  synthesize(id);
}
