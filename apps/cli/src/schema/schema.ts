import { z } from 'zod'

export const themeSchema = z.union([
    z.literal('flora'),
    z.literal('orange'),
    z.literal('blaze'),
    z.literal('funk'),
    z.literal('elegant'),
])

export type Theme = z.infer<typeof themeSchema>

const backgroundSchema = z.union([
    z.object({
        type: z.literal('gradient'),
        background: z.object({
            colorsPreset: themeSchema,
            positionsPreset: z.number(),
        }),
    }),
    z.object({
        type: z.literal('plain'),
        background: z.object({
            color: z.string(),
        }),
    }),
])

export type BackgroundConfig = z.infer<typeof backgroundSchema>

const textSchema = z.object({
    titleColor: z.string(),
    descriptionColor: z.string(),
})

export type TextConfig = z.infer<typeof textSchema>

export const bannerSettingsSchema = z
    .object({
        title: z.string(),
        description: z.string(),
        dimensions: z.tuple([z.number(), z.number()]),
        roundedCorners: z.boolean(),
        // User might also provide a custom theme.
        theme: z.union([themeSchema, z.string()]),
    })
    .strict()

export type BannerSettings = z.infer<typeof bannerSettingsSchema>
