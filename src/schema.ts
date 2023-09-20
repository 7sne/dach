import { z } from 'zod'

const textSchema = z.object({
    text: z.string().min(1,
        { message: '<text> must be at least 1 character long' },
    ),
    color: z.string(),
})

export type BackgroundConfig = z.infer<typeof backgroundSchema>

const colorPresetSchema = z.union([
    z.literal('flora'),
    z.literal('orange'),
    z.literal('blaze'),
    z.literal('funk'),
])

const positionsSchema = z.array(z.object({
    x: z.number(),
    y: z.number(),
}))
    .length(7)

const backgroundSchema = z.union([
    z.object({
        type: z.literal('gradient'),
        colors: z.array(z.string()).length(4)
            .optional(),
        positions: positionsSchema.optional(),
        colorsPreset: colorPresetSchema.optional(),
        positionsPreset: z.number().optional(),
    })
        .refine(data => {
            if ((data.colorsPreset && data.colors)
                || (!data.colorsPreset && !data.colors))
                return false

            if ((data.positionsPreset && data.positions)
                || (!data.positionsPreset && !data.positions))
                return false

            return true
        }),

    z.object({
        type: z.literal('plain'),
        color: z.string(),
    }),
])

const titleSchema = z.object({
    color: z.string().default('#FFFFFF'),
    fontFamily: z.string().default('Sora'),
    // @todo - Add support for custom fonts.
    fontPath: z.string().default(`${process.cwd()}/assets/sora.otf`),
    fontSize: z.number().default(248),
})

const descriptionSchema = z.object({
    color: z.string().default('#FFFFFF'),
    fontFamily: z.string().default('Satoshi'),
    // @todo - Add support for custom fonts.
    fontPath: z.string().default(`${process.cwd()}/assets/satoshi.otf`),
    fontSize: z.number().default(64),
})

export const configSchema = z.object({
    config: z.string().optional(),
    output: z.string().optional(),

    title: textSchema.merge(titleSchema)
        .refine(data => {
            if ((data.fontFamily && !data.fontPath) || (!data.fontFamily && data.fontPath))
                return false
            else
                return true
        }),
    description: textSchema.merge(descriptionSchema),

    dimensions: z.tuple([z.number(), z.number()]).default([3200, 1600]),
    background: backgroundSchema,

    roundedCorners: z.boolean().default(true),
})
    .strict()

export type Config = z.infer<typeof configSchema>

export type GradientBackgroundConfig = BackgroundConfig & { type: 'gradient' }

export type PlainBackgroundConfig = BackgroundConfig & { type: 'plain' }
