import chalk from 'chalk'
import { ZodError } from 'zod'

export const logger = {
    printErrors: printZodErrors,
}

function printZodErrors(
    errorMessage: string,
    zodError?: ZodError | string,
    hint?: string,
): void {
    console.error(
        '\n',
        chalk.bold(chalk.red(errorMessage)),
        '\n',
        chalk.blue(hint),
        '\n',
    )

    if (errorMessage && !zodError) {
        console.error(chalk.red(errorMessage))
        return
    }

    if (zodError instanceof ZodError) {
        zodError.errors.forEach((validationError, index) => {
            console.error(chalk.red(`Error ${index + 1}:`))
            console.error(`Option: ${validationError.path.join(' -> ')}`)
            console.error(`Message: ${validationError.message}`)
        })
    }
}
