import type { z } from 'zod'
import chalk from 'chalk'

export function printZodErrors(errorMessage: string, zodError: z.ZodError, hint: string): void {
    console.error(
        '\n',
        chalk.bold(chalk.red(errorMessage)),
        '\n',
        chalk.blue(hint), '\n',
    )
    zodError.errors.forEach((validationError, index) => {
        console.error(chalk.red(`Error ${index + 1}:`))
        console.error(`Option: ${validationError.path.join(' -> ')}`)
        console.error(`Message: ${validationError.message}`)
    })
}
