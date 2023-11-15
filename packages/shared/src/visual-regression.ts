import type { Buffer } from 'node:buffer'
import { PNG } from 'pngjs'
import pixelmatch from 'pixelmatch'

export function visualRegression(
    baselineImageBuf: Buffer,
    generatedImageBuf: Buffer,
    threshold = 0,
): Error | undefined {
    const baseline = PNG.sync.read(baselineImageBuf)
    const generated = PNG.sync.read(generatedImageBuf)

    if (baseline.width !== generated.width || baseline.height !== generated.height)
        return Error('Image dimensions do not match.')

    const { width, height } = baseline

    const diff = new PNG({ width, height })

    const numDiffPixels = pixelmatch(baseline.data, generated.data, diff.data, width, height, {
        threshold: 0.1,
    })

    if (numDiffPixels > threshold)
        return new Error(`Differences found, ${numDiffPixels} pixels do not match.`)
}
