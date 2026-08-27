export type LightElementId = "lampara" | "luna" | "ventana" | "estrella";

export type LightSwitchConfig = {
  id: LightElementId;
  label: string;
  emoji: string;
  element: LightElementId;
  surprise?: boolean;
};

export const LIGHT_SWITCHES: LightSwitchConfig[] = [
  { id: "lampara", label: "Lámpara", emoji: "💡", element: "lampara" },
  { id: "luna", label: "Luna", emoji: "🌙", element: "luna" },
  { id: "ventana", label: "Ventana", emoji: "🪟", element: "ventana" },
  {
    id: "estrella",
    label: "Estrella",
    emoji: "⭐",
    element: "estrella",
    surprise: true,
  },
];

export type LightsState = Record<LightElementId, boolean>;

export function createInitialLightsState(): LightsState {
  return {
    lampara: false,
    luna: false,
    ventana: false,
    estrella: false,
  };
}
