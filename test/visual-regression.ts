import fs from 'node:fs'
import process from 'node:process'
import { PNG } from 'pngjs'
import pixelmatch from 'pixelmatch'

export function visualRegression(baselineImagePath: string, generatedImagePath: string): Error | undefined {
    const baseline = PNG.sync.read(fs.readFileSync(baselineImagePath))
    const generated = PNG.sync.read(fs.readFileSync(generatedImagePath))

    if (baseline.width !== generated.width || baseline.height !== generated.height) {
        console.error('Image dimensions do not match.')
        process.exit(1)
    }

    const { width, height } = baseline

    const diff = new PNG({ width, height })
    const numDiffPixels = pixelmatch(baseline.data, generated.data, diff.data, width, height, { threshold: 0.1 })

    if (numDiffPixels > 0)
        return new Error('Visual regression test failed. Differences found.')
}
