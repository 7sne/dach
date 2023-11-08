export function hexToRgba(hex: string): { r: number, g: number, b: number, a: number } {
  hex = hex.replace("#", ""); // Remove the hash character, if present

  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);

  return { r, g, b, a: 0 };
}
