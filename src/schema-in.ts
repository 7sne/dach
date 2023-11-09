import * as process from 'node:process'
import { z } from 'zod'

const hexStringSchema = z.string().refine(
    hex => /^#[0-9a-fA-F]+$/.test(hex),
    {
        message: 'Must be a valid hexadecimal string starting with a hash (#).',
    },
)

const positionsStringSchema = z.string().refine(
    // Example, correct position string: `[{"x":0.49618420439786215,"y":0.22918175634846816},{"x":0.3972361237377757,"y":1}]`.
    str => {
        try {
            const serialized = JSON.parse(str)

            if (!Array.isArray(serialized))
                return false
            if (serialized.length === 0)
                return false
            for (const o of serialized) {
                if (typeof o !== 'object')
                    return false
                if (typeof o?.x !== 'number' || typeof o?.y !== 'number')
                    return false
                if (o?.x > 1 || o?.x < 0 || o?.y > 1 || o?.y < 0)
                    return false
            }
            return true
        } catch {
            return false
        }
    },
    {
        message: 'Must be a valid positions string, i.e `[{"x":0.49618420439786215,"y":0.22918175634846816},{"x":0.3972361237377757,"y":1}]`',
    })

const colorsStringSchema = z.string().refine(
    // Example, correct colors string: `["#fafafa", "#fafafa"]`
    colors => {
        try {
            const serialized = JSON.parse(colors)
            if (!Array.isArray(serialized))
                return false
            if (serialized.length === 0)
                return false
            for (const hex of serialized) {
                if (typeof hex !== 'string')
                    return false
                if (!/^#[0-9a-fA-F]+$/.test(hex))
                    return false
            }
            return true
        } catch {
            return false
        }
    },
    {
        message: 'Must be a valid colors string, i.e `[{"x":0.49618420439786215,"y":0.22918175634846816},{"x":0.3972361237377757,"y":1}]`',
    })

export const inConfigSchemaAdd = z.object({
    name: z.string().min(3, {
        message: 'Name must be at least 3 characters long',
    }).max(20, {
        message: 'Name must be at most 20 characters long',
    }),
    colors: colorsStringSchema,
    positions: positionsStringSchema,
    titleColor: hexStringSchema,
    descriptionColor: hexStringSchema,
})
    .strict()

// Schema for config provided by user to generate new banner.
export const inConfigSchemaGenerate = z.object({
    output: z.string().refine(path => {
        return validateOsSpecificPath(path)
    }, { message: 'Invalid path' }),

    title: z.string().min(1,
        { message: 'Title must be at least 1 character long' },
    ).max(20,
        { message: 'Title must be at most 20 characters long' }),
    description: z.string().min(1,
        { message: 'Description must be at least 1 character long' },
    ).max(36,
        { message: 'Description must be at most 36 characters long' }),
    dimensions: z.string().regex(
        /^\d+x\d+$/,
        { message: 'Dimensions must be in format <width>x<height>' },
    ),
    ratio: z.string().regex(
        /^\d+:\d+$/,
        { message: 'Ratio must be in format <width>:<height>' },
    ).optional(),
    roundedCorners: z.boolean(),
    // @todo better validation?
    theme: z.string(),
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
