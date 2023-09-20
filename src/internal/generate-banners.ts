import process from 'node:process'
import { configSchema } from '../schema'
import { generateBanner } from '../generate-banner'
import { printZodErrors } from '../print-zod-errors'
import { writeCanvasToPngFile } from '../write-canvas-to-png'
import { randomRgbPositions } from './rand-rgb-positions'

/**
 * @description Internal function to generate banners for testing purposes.
 * Eventually it will probably become a feature lol.
 */
export function generateBanners(count = 100): void {
    for (let i = 0; i <= count; ++i) {
        // eslint-disable-next-line no-console
        console.log('generating banner variation', i)

        const randomPositions = randomRgbPositions(7)

        const config = {
            title: {
                text: 'Presets',
                color: '#080808',
            },
            description: {
                text: 'Elegant banners from terminal',
                color: '#080808',
            },
            background: {
                type: 'gradient',
                colorsPreset: 'hawaii',
                positions: randomPositions,
            },
            output: 'examples',
        }
        const parseConfigResult = configSchema.safeParse(config)

        if (!parseConfigResult.success) {
            printZodErrors(parseConfigResult.error)
            process.exit(1)
        }
        const generateBannerResult = generateBanner(parseConfigResult.data)

        if (generateBannerResult instanceof Error) {
            console.error('generate error', generateBannerResult.message)
            process.exit(1)
        }
        const writeCanvasToPngFileResult = writeCanvasToPngFile(generateBannerResult, 'examples', `project-banner-${i}`)

        if (writeCanvasToPngFileResult instanceof Error) {
            console.error(writeCanvasToPngFileResult.message)
            process.exit(1)
        }

        // eslint-disable-next-line no-console
        console.log(`Number: ${i} banner variation generated with opts: `)
        // eslint-disable-next-line no-console
        console.dir(randomPositions, {
            compact: true,
            depth: null,
        })
    }
}
