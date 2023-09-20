import path from 'node:path'
import fs from 'node:fs'
import type canvas from 'canvas'

export function writeCanvasToPngFile(canvas: canvas.Canvas, bannerPath: string, filename: string): Error | void {
    const filenameWithExt = `${filename}.png`
    try {
        const bannerFilePath = path.join(bannerPath, filenameWithExt)
        const out = fs.createWriteStream(bannerFilePath)
        const stream = canvas.createPNGStream()

        stream.pipe(out)
    } catch (e) {
        return e as Error
    }
}
