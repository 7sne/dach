#!/usr/bin/env node

import * as process from 'node:process'
import { Command } from 'commander'
import { inConfigSchema } from './schema-in'
import { generateBanner } from './generate-banner'
import { printZodErrors } from './print-zod-errors'
import { writeCanvasToPngFile } from './write-canvas-to-png'

const program = new Command()

program
    .name('Dach')
    .description('Elegant project banners from your terminal')

program
    .option('-o, --output <path>',
        'Output directory, defaults to `cwd/.github`',
        `${process.cwd()}/.github`,
    )

    .option('-t, --title <text>', 'Project title', 'Untitled')

    .option('-d, --description <text>', 'Project description', 'Project description')

    .option('-dim, --dimensions <width>x<height>',
        'Dimensions of the sandbox image, defaults to `4000x1600`',
        '4000x1600',
    )

    .option('-r, --rounded-corners', 'Rounded corners', false)

    .option('--theme <type>', 'Theme of the banner.', 'elegant')

async function run(): Promise<void> {
    program.parse()
    const options = program.opts()

    const inSchemaParseResult = inConfigSchema.safeParse(options)

    if (inSchemaParseResult.success) {
        const generateBannerResult = generateBanner({
            ...inSchemaParseResult.data,
            dimensions: inSchemaParseResult.data.dimensions
                .split('x').map(Number) as [number, number],
        })

        if (generateBannerResult instanceof Error) {
            console.error(generateBannerResult.message)
            process.exit(1)
        }

        const writeCanvasToPngFileResult = writeCanvasToPngFile(
            generateBannerResult, options.output, 'project-banner',
        )

        if (writeCanvasToPngFileResult instanceof Error)
            console.error(writeCanvasToPngFileResult.message)
        else
            console.info(`Dach banner generated at ${options.output}`)
    } else {
        printZodErrors(inSchemaParseResult.error)
        process.exit(1)
    }
}

void run()
