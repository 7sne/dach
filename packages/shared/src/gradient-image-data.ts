import type * as canvas from 'canvas'

import type { Rgb } from './rgb'

export function gradientImageData(
    canvasContext: canvas.CanvasRenderingContext2D,
    width: number,
    height: number,
    rgb: Rgb[],
    rgbPositions: {
        x: number
        y: number
    }[],
) {
    const id = canvasContext.createImageData(width, height)
    const pixels = id.data
    let offset = 0

    for (let y = 0; y < height; y++) {
        const directPixelY = y / height
        const centerDistanceY = directPixelY - 0.5
        const centerDistanceY2 = centerDistanceY * centerDistanceY

        for (let x = 0; x < width; x++) {
            const directPixelX = x / width

            const centerDistanceX = directPixelX - 0.5
            const centerDistance = Math.sqrt(centerDistanceX * centerDistanceX + centerDistanceY2)
            const swirlFactor = 0.35 * centerDistance
            const theta = swirlFactor * swirlFactor * 0.8 * 8
            const sinTheta = Math.sin(theta)
            const cosTheta = Math.cos(theta)

            const pixelX = Math.max(
                0,
                Math.min(1, 0.5 + centerDistanceX * cosTheta - centerDistanceY * sinTheta),
            )
            const pixelY = Math.max(
                0,
                Math.min(1, 0.5 + centerDistanceX * sinTheta + centerDistanceY * cosTheta),
            )
            let distanceSum = 0
            let r = 0
            let g = 0
            let b = 0

            for (let i = 0; i < rgb.length; i++) {
                const colorX = rgbPositions[i].x
                const colorY = rgbPositions[i].y

                const distanceX = pixelX - colorX
                const distanceY = pixelY - colorY

                let distance = Math.max(
                    0,
                    0.9 - Math.sqrt(distanceX * distanceX + distanceY * distanceY),
                )
                distance = distance * distance * distance * distance
                distanceSum += distance

                r += (distance * rgb[i].r) / 255
                g += (distance * rgb[i].g) / 255
                b += (distance * rgb[i].b) / 255
            }
            pixels[offset++] = (r / distanceSum) * 255
            pixels[offset++] = (g / distanceSum) * 255
            pixels[offset++] = (b / distanceSum) * 255
            pixels[offset++] = 0xff
        }
    }

    return id
}
