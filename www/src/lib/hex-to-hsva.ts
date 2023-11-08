export function hexToHsva(hex: string): { h: number, s: number, v: number, a: number } {
  hex = hex.replace("#", ""); // Remove the hash character, if present

  const r = parseInt(hex.slice(0, 2), 16) / 255;
  const g = parseInt(hex.slice(2, 4), 16) / 255;
  const b = parseInt(hex.slice(4, 6), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);

  let h = 0;
  let s = 0;
  let v = max;
  const a = parseFloat((parseInt(hex.slice(6, 8), 16) / 255).toFixed(2)); // Extract alpha and round to 2 decimal places

  const d = max - min;

  if (max === 0) {
      s = 0;
  } else {
      s = d / max;
  }

  if (max === min) {
      h = 0;
  } else {
      if (max === r) {
          h = (60 * ((g - b) / d) + 360) % 360;
      } else if (max === g) {
          h = (60 * ((b - r) / d) + 120) % 360;
      } else {
          h = (60 * ((r - g) / d) + 240) % 360;
      }
  }

  h = Math.round(h);
  s = Math.round(s * 100);
  v = Math.round(v * 100);

  return { h, s, v, a };
}
