export function hexToRgba(hex: string): { r: number, g: number, b: number, a: number } {
  hex = hex.replace("#", "");

  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);
  const a = parseInt(hex.slice(6, 8), 16) / 255;

  return { r, g, b, a };
}
