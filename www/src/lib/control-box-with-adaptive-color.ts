import { CONTROL_BOX_SIZE_PX } from "./mesh-gradient-canvas-const";

export function controlBoxWithAdaptiveColor(
  context: CanvasRenderingContext2D,
  position: { x: number; y: number },
  canvasWidth: number,
  canvasHeight: number,
) {
  const x = Math.floor(position.x * canvasWidth)
  const y = Math.floor(position.y * canvasHeight)

  const sampleSize = 25

  // Get the colors of the surrounding pixels.
  const imageData = context.getImageData(
      x - sampleSize,
      y - sampleSize,
      sampleSize * 2,
      sampleSize * 2,
  )
  const data = imageData.data

  let totalRed = 0
  let totalGreen = 0
  let totalBlue = 0

  for (let i = 0; i < data.length; i += 4) {
      totalRed += data[i]
      totalGreen += data[i + 1]
      totalBlue += data[i + 2]
  }

  const averageRed = totalRed / (data.length / 4)
  const averageGreen = totalGreen / (data.length / 4)
  const averageBlue = totalBlue / (data.length / 4)

  const luminance =
      0.299 * averageRed + 0.587 * averageGreen + 0.114 * averageBlue

  if (luminance > 128) {
      context.fillStyle = 'black'
  } else {
      context.fillStyle = 'white'
  }

  context.fillRect(x - 5, y - 5, CONTROL_BOX_SIZE_PX, CONTROL_BOX_SIZE_PX)
}
