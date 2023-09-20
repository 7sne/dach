import type { z } from 'zod'

export function printZodErrors(error: z.ZodError): void {
    console.error('Error: Invalid config file')
    error.errors.forEach((validationError, index) => {
        console.error(`Error ${index + 1}:`)
        console.error(`  Path: ${validationError.path.join(' -> ')}`)
        console.error(`  Message: ${validationError.message}`)
    })
}
