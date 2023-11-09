/* eslint-disable indent */
import { Command } from 'commander'
import { inConfigSchemaAdd, inConfigSchemaGenerate } from './schema-in'
import { config } from './themes'
import { printZodErrors } from './print-zod-errors'
import { generateBanner } from './generate-banner'
import { writeCanvasToPngFile } from './write-canvas-to-png'

export const add = new Command()
    .name('add')
    .description('Add a new theme.')
    .argument('<name>', 'Name of the theme.')
    .option('-c, --colors <colors>', 'Colors of the theme.')
    .option('-p, --positions <positions>', 'Position coordinates for each color.')
    .option('-t, --title-color <color>', 'Color of the title.')
    .option('-d, --description-color <color>', 'Color of the description.')

    .action((themeName, options) => {
        const parsedOptionsResult = inConfigSchemaAdd.safeParse({
            name: themeName,
            ...options,
        })

        if (parsedOptionsResult.success) {
            const parsedOptions = parsedOptionsResult.data

            config.set('dach-themes', {
                themes: [
                    ...config.get('dach-themes').themes,
                    parsedOptions,
                ],
            })
        } else {
            printZodErrors(
                'Invalid add theme config.',
                parsedOptionsResult.error,
                'Make sure to use https://dach.kukielka.xyz/ for the best UX.',
            )
            process.exit(1)
        }
    })

export const generate = new Command()
    .name('generate')
    .description('Generate a banner.')
    .option('-o, --output <path>',
        'Output directory, defaults to `cwd/.github`',
        `${process.cwd()}/.github`,
    )
    .option('-t, --title <text>', 'Project title', 'Untitled')
    .option('-d, --description <text>', 'Project description', 'Project description')
    .option('-dim, --dimensions <width>x<height>',
        'Dimensions of the banner, defaults to `3000x1685`.',
        '4000x1600',
    )
    .option('-r, --ratio <width>:<height>',
        'Ratio of the banner, defaults to `16:9`.',
        '16:9',
    )
    .option('--theme <name>', 'Theme of the banner.', 'elegant')
    .option('-rc, --rounded-corners', 'Rounded corners', false)

    .action(options => {
        const inSchemaParseResult = inConfigSchemaGenerate.safeParse(options)

        if (inSchemaParseResult.success) {
            let dimensions = inSchemaParseResult.data.dimensions
            const ratio = inSchemaParseResult.data.ratio

            if (ratio) {
                switch (ratio) {
                    case '2:1':
                        dimensions = '3000x1500'
                        break
                    case '21:9':
                        dimensions = '3000x1285'
                        break
                    case '16:10':
                        dimensions = '3000x1875'
                        break
                    case '16:9':
                        dimensions = '3000x1685'
                        break
                    default:
                        console.error('Invalid ratio.')
                        process.exit(1)
                }
            }

            const generateBannerResult = generateBanner({
                ...inSchemaParseResult.data,
                theme: inSchemaParseResult.data.theme,
                dimensions: dimensions.split('x').map(Number) as [number, number],
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
                // eslint-disable-next-line no-console
                console.info(`Dach banner generated at ${options.output}`)
        } else {
            printZodErrors(
                'Invalid generate theme config.',
                inSchemaParseResult.error,
                'Make sure to use https://dach.kukielka.xyz/ for the best UX.',
            )
            process.exit(1)
        }
    })
