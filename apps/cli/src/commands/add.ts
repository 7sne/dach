import { Command } from 'commander'

import { logger } from '../logger'
import { inConfigSchemaAdd } from '../schema/schema-in'
import { themeStore } from '../theme-store'

export const add = new Command()
    .name('add')
    .description('Add a new theme.')

    .argument('<name>', 'Name of the theme.')
    .option('-c, --colors <colors>', 'Colors of theme.')
    .option(
        '-p, --positions <positions>',
        'Position coordinates for each color.',
    )
    .option('-t, --title-color <color>', 'Color of title.')
    .option('-d, --description-color <color>', 'Color of the description.')

    .action(handleAddCmd)

// @internal
export function handleAddCmd(themeName: any, options: Record<string, any>) {
    const parsedOptionsResult = inConfigSchemaAdd.safeParse({
        name: themeName,
        ...options,
    })

    if (!parsedOptionsResult.success) {
        logger.printErrors(
            'Invalid add theme config.',
            parsedOptionsResult.error,
            'Make sure to use https://dach.kukielka.xyz/ for the best UX.',
        )
        return
    }

    themeStore.set('dach-themes', {
        themes: [
            ...(themeStore.get('dach-themes').themes ?? []),
            parsedOptionsResult.data,
        ],
    })
}
