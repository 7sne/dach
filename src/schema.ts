import { z } from 'zod'

const themeSchema = z.union([
    z.literal('flora'),
    z.literal('orange'),
    z.literal('blaze'),
    z.literal('funk'),
    z.literal('elegant'),
])

export type Theme = z.infer<typeof themeSchema>

const colorPresetSchema = z.union([
    z.literal('flora'),
    z.literal('orange'),
    z.literal('blaze'),
    z.literal('funk'),
])

const backgroundSchema = z.union([
    z.object({
        type: z.literal('gradient'),
        text: z.object({
            titleColor: z.string(),
            descriptionColor: z.string(),
        }),
        background: z.object({
            colorsPreset: colorPresetSchema,
            positionsPreset: z.number(),
        }),
    }),

    z.object({
        type: z.literal('plain'),
        text: z.object({
            titleColor: z.string().optional(),
            descriptionColor: z.string().optional(),
        }),
        background: z.object({
            color: z.string(),
        }),
    }),
])

export type BackgroundConfig = z.infer<typeof backgroundSchema>

export const bannerSettingsSchema = z.object({
    title: z.string(),
    description: z.string(),
    dimensions: z.tuple([z.number(), z.number()]),
    roundedCorners: z.boolean(),
    theme: z.union([
        z.literal('flora'),
        z.literal('orange'),
        z.literal('blaze'),
        z.literal('funk'),
        z.literal('elegant'),
    ]),
})
    .strict()

export type BannerSettings = z.infer<typeof bannerSettingsSchema>
