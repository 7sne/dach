import * as process from 'node:process'
import { z } from 'zod'

/**
* @description Schema for input config provided by user.
*/
export const inConfigSchema = z.object({
    output: z.string().refine(path => {
        return validateOsSpecificPath(path)
    }, { message: 'Invalid path' }),

    title: z.string().min(1,
        { message: 'Title must be at least 1 character long' },
    ),
    description: z.string().min(1,
        { message: 'Description must be at least 1 character long' },
    ),
    dimensions: z.string().regex(
        /^\d+x\d+$/,
        { message: 'Dimensions must be in format <width>x<height>' },
    ),
    roundedCorners: z.boolean(),
    theme: z.enum(['flora', 'orange', 'blaze', 'funk', 'elegant']),
})
    .strict()

const WINDOWS_PATH_REGEX = /(^([a-z]|[A-Z]):(?=\\(?![\0-\37<>:"/\\|?*])|\/(?![\0-\37<>:"/\\|?*])|$)|^\\(?=[\\\/][^\0-\37<>:"/\\|?*]+)|^(?=(\\|\/)$)|^\.(?=(\\|\/)$)|^\.\.(?=(\\|\/)$)|^(?=(\\|\/)[^\0-\37<>:"/\\|?*]+)|^\.(?=(\\|\/)[^\0-\37<>:"/\\|?*]+)|^\.\.(?=(\\|\/)[^\0-\37<>:"/\\|?*]+))((\\|\/)[^\0-\37<>:"/\\|?*]+|(\\|\/)$)*()$/
const UNIX_PATH_REGEX = /(^([a-z]|[A-Z]):(?=\\(?![\0-\37<>:"/\\|?*])|\/(?![\0-\37<>:"/\\|?*])|$)|^\\(?=[\\\/][^\0-\37<>:"/\\|?*]+)|^(?=(\\|\/)$)|^\.(?=(\\|\/)$)|^\.\.(?=(\\|\/)$)|^(?=(\\|\/)[^\0-\37<>:"/\\|?*]+)|^\.(?=(\\|\/)[^\0-\37<>:"/\\|?*]+)|^\.\.(?=(\\|\/)[^\0-\37<>:"/\\|?*]+))((\\|\/)[^\0-\37<>:"/\\|?*]+|(\\|\/)$)*()$/
const VALID_UNIX_FILENAME_REGEX = /^[a-zA-Z_][a-zA-Z0-9_]*\/?$/

function validateOsSpecificPath(path: string): boolean {
    let pathRegexRule: RegExp

    const isWin = process.platform === 'win32'
    if (isWin) {
        pathRegexRule = WINDOWS_PATH_REGEX
        return pathRegexRule.test(path)
    } else {
        pathRegexRule = UNIX_PATH_REGEX
        // A valid path might also be a single, valid unix name,
        // optionally ended with `/` character. It might be also a single dot.
        if (!pathRegexRule.test(path)) {
            const unixNamePattern = VALID_UNIX_FILENAME_REGEX
            return unixNamePattern.test(path) || path === '.'
        }
        return true
    }
}
