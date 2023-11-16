import { Command } from 'commander'
import { ratioToDimensions } from '@dach/shared'
import { generateBanner } from '../generate-banner'
import { inConfigSchemaGenerate } from '../schema/schema-in'
import { writeCanvasToPngFile } from '../write-canvas-to-png'
import { logger } from '../logger'

export const generate = new Command()
    .name('generate')
    .description('Generate a banner.')

    .option(
        '-o, --output <path>',
        'Output directory',
        `${process.cwd()}/.github`,
    )
    .option('-t, --title <text>', 'Project title', 'Untitled')
    .option(
        '-d, --description <text>',
        'Project description.',
        'Project description',
    )
    .option(
        '-dim, --dimensions <width>x<height>',
        'Dimensions of the banner',
        '3000x1685',
    )
    .option(
        '-r, --ratio <width>:<height>',
        'Width to height ratio of banner.',
        '16:9',
    )
    .option('--theme <name>', 'Theme of banner.', 'elegant')
    .option('-rc, --rounded-corners', 'Rounded corners', false)

    .action(handleGenerateCmd)

// @internal
export function handleGenerateCmd(options: Record<string, any>) {
    const inSchemaParseResult = inConfigSchemaGenerate.safeParse(options)

    if (!inSchemaParseResult.success) {
        logger.printErrors(
            'Invalid generate theme config.',
            inSchemaParseResult.error,
            'Make sure to use https://dach.kukielka.xyz/ for the best UX.',
        )
        return
    }

    let dimensions = inSchemaParseResult.data.dimensions
    const ratio = inSchemaParseResult.data.ratio

    if (ratio) {
        const ratioToDimensionsResult = ratioToDimensions(ratio)

        if (ratioToDimensionsResult instanceof Error) {
            logger.printErrors(ratioToDimensionsResult.message)
            process.exit(1)
        } else {
            dimensions = ratioToDimensionsResult
        }
    }

    if (!dimensions && !ratio) {
        logger.printErrors('Dimensions or ratio must be provided.')
        return
    }

    const generateBannerResult = generateBanner({
        ...inSchemaParseResult.data,
        theme: inSchemaParseResult.data.theme,
        dimensions: dimensions!.split('x').map(Number) as [number, number],
    })

    if (generateBannerResult instanceof Error) {
        console.error(generateBannerResult.message)
        process.exit(1)
    }

    const writeCanvasToPngFileResult = writeCanvasToPngFile(
        generateBannerResult,
        options.output,
        'project-banner',
    )

    if (writeCanvasToPngFileResult instanceof Error)
        console.error(writeCanvasToPngFileResult.message)
    // eslint-disable-next-line no-console
    else console.info(`Dach banner generated at ${options.output}`)
}
