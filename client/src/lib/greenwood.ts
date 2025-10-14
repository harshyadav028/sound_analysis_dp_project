import { GreenwoodSettings } from "@shared/schema";

export function greenwoodForward(x: number, settings: GreenwoodSettings): number {
  const { A, a, k } = settings;
  return A * (Math.pow(10, a * x) - k);
}

export function greenwoodInverse(frequency: number, settings: GreenwoodSettings): number {
  const { A, a, k } = settings;
  return (1 / a) * Math.log10(frequency / A + k);
}

export function frequencyToLEDIndex(frequency: number, settings: GreenwoodSettings): number {
  const x = greenwoodInverse(frequency, settings);
  const ledIndex = Math.round(x * (settings.numLEDs - 1));
  return Math.max(0, Math.min(settings.numLEDs - 1, ledIndex));
}

export function frequencyToPosition(frequency: number, settings: GreenwoodSettings): number {
  const x = greenwoodInverse(frequency, settings);
  return x * settings.cochleaLengthMM;
}

export function ledIndexToBestFrequency(ledIndex: number, settings: GreenwoodSettings): number {
  const x = ledIndex / (settings.numLEDs - 1);
  return greenwoodForward(x, settings);
}

export function getViridisColor(frequency: number, settings: GreenwoodSettings): string {
  const norm = (Math.log10(frequency) - Math.log10(settings.fMin)) / 
                (Math.log10(settings.fMax) - Math.log10(settings.fMin));
  const clampedNorm = Math.max(0, Math.min(1, norm));
  
  const viridisColors = [
    [68, 1, 84],
    [72, 40, 120],
    [62, 73, 137],
    [49, 104, 142],
    [38, 130, 142],
    [31, 158, 137],
    [53, 183, 121],
    [110, 206, 88],
    [181, 222, 43],
    [253, 231, 37]
  ];
  
  const index = clampedNorm * (viridisColors.length - 1);
  const lower = Math.floor(index);
  const upper = Math.ceil(index);
  const t = index - lower;
  
  const color1 = viridisColors[lower];
  const color2 = viridisColors[upper];
  
  const r = Math.round(color1[0] + (color2[0] - color1[0]) * t);
  const g = Math.round(color1[1] + (color2[1] - color1[1]) * t);
  const b = Math.round(color1[2] + (color2[2] - color1[2]) * t);
  
  return `rgb(${r}, ${g}, ${b})`;
}
