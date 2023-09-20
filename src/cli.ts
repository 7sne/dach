#!/usr/bin/env node

import * as process from 'node:process'
import * as promise from 'node:fs/promises'
import { Command } from 'commander'

import { configSchema } from './schema'
import { generateBanner } from './generate-banner'
import { printZodErrors } from './print-zod-errors'
import { writeCanvasToPngFile } from './write-canvas-to-png'

const program = new Command()

program
    .name('Versei')
    .description('Elegant project banners from your terminal')

// @todo - Add config file initialization.
program
    .option('-c, --config <path>',
        'Path to config file',
        `${process.cwd()}/assets/dach.config.json`,
    )

    .option('-o, --output <path>',
        'Output directory, defaults to `cwd/assets`',
        `${process.cwd()}/assets`,
    )

    .option('-t, --title <text>', 'Project title')

    .option('-tf, --title-font <path>',
        'Path to title font, defaults to `cwd/assets/title-font.ttf`',
        `${process.cwd()}/assets/title-font.ttf`,
    )

    .option('-tc, --title-color <path>',
        'Color of title font, defaults to `#ffffff`',
        '#ffffff',
    )

    .option('-d, --description <text>', 'Project description')

    .option('-df, --description-font <path>',
        'Path to description font, defaults to `cwd/assets/description-font.ttf`',
        `${process.cwd()}/assets/description-font.ttf`,
    )

    .option('-df, --description-color <path>',
        'Color of description font, defaults to `#ffffff`',
        '#ffffff',
    )

    .option('-dim, --dimensions <width>x<height>',
        'Dimensions of the sandbox image, defaults to `4000x1600`',
        '4000x1600',
    )

    .option('-o, --sandbox <path>',
        'Path to sandbox file, defaults to `cwd/assets/minimal.png`, the file extension must be a `.png`',
        `${process.cwd()}/assets/project-banner.png`,
    )

    .option('-gp, --gradient-positions <positions>',
        'Gradient positions, defaults to `0,0,0,1`',
        '0,0,0,1',
    )

    .option('-gpp, --gradient-positions-preset <preset>',
        'Gradient positions preset, defaults to `none`',
        'none',
    )

    .option('-gc, --gradient-colors <colors>',
        'Gradient colors, defaults to `#000000, #ffffff`',
        '#000000, #ffffff',
    )

    .option('-gcp, --gradient-colors-preset <preset>',
        'Gradient colors preset, defaults to `none`',
        'none',
    )

    .option('-b, --background-type <type>',
        'Background type, defaults to `plain`',
        'plain',
    )

async function run(): Promise<void> {
    program.parse()
    const options = program.opts()

    if (options.config) {
        const config = await promise.readFile(options.config, 'utf-8')
        const jsonConfig = JSON.parse(config)
        const parseConfigResult = configSchema.safeParse(jsonConfig)

        if (!parseConfigResult.success) {
            printZodErrors(parseConfigResult.error)
            process.exit(1)
        }

        const generateBannerResult = generateBanner(parseConfigResult.data)

        if (generateBannerResult instanceof Error) {
            console.error(generateBannerResult.message)
            process.exit(1)
        }

        const writeCanvasToPngFileResult = writeCanvasToPngFile(generateBannerResult, options.output, 'project-banner')

        if (writeCanvasToPngFileResult instanceof Error) {
            console.error(writeCanvasToPngFileResult.message)
            process.exit(1)
        }

        console.info(`Dach banner generated at ${options.output}`)
    } else {
        // @todo - Handle passed arguments
    }
}

void run()
