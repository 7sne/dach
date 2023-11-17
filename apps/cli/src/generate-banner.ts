import * as path from 'node:path'

import { gradientImageData, hexCodesToRgb } from '@dach/shared'
import * as canvas from 'canvas'
import * as Yoga from 'yoga-layout-prebuilt'

import { colorPresetToColors } from './presets/color-presets'
import { positionPresetToPositions } from './presets/position-presets'
import type {
    BackgroundConfig,
    BannerSettings,
    TextConfig,
} from './schema/schema'
import { themeSchema } from './schema/schema'
import { themeStore } from './theme-store'

export function generateBanner({
    theme,
    title,
    description,
    dimensions,
    roundedCorners,
}: BannerSettings): Error | canvas.Canvas {
    let coreCanvas = canvas.createCanvas(...dimensions)
    let coreCanvasContext = coreCanvas.getContext('2d')

    const text = convertThemeToTextConfig(theme)

    if (isPredefinedTheme(theme)) {
        createBackgroundFromUserTheme(theme, text, {
            coreCanvas,
            coreCanvasContext,
            dimensions,
        })
    } else {
        createBackgroundFromTheme(theme, text, {
            coreCanvas,
            coreCanvasContext,
            dimensions,
        })
    }

    const registerFontsError = registerFonts()

    if (registerFontsError) return registerFontsError

    // Generic settings for every banner.
    coreCanvasContext.globalAlpha = 0.98
    coreCanvasContext.textAlign = 'center'
    coreCanvasContext.textBaseline = 'middle'

    // Create text nodes for title and description.
    const titleNode = Yoga.Node.create()
    const descriptionNode = Yoga.Node.create()

    // Create space between title and description.
    titleNode.setPadding(Yoga.EDGE_BOTTOM, 296 * 0.74)

    // Arrange title and description in the center of the canvas.
    makeLayout(coreCanvas, { title: titleNode, description: descriptionNode })

    // Draw title and description.
    // @todo - Handle these things better.
    coreCanvasContext.fillStyle = text.titleColor
    coreCanvasContext.font = 'bold 296px "GeistBold"'
    coreCanvasContext.fillText(
        title,
        titleNode.getComputedLeft(),
        titleNode.getComputedTop(),
    )

    coreCanvasContext.fillStyle = text.descriptionColor
    coreCanvasContext.font = 'medium 100px "GeistMedium"'
    coreCanvasContext.fillText(
        description,
        descriptionNode.getComputedLeft(),
        descriptionNode.getComputedTop(),
    )

    if (roundedCorners) {
        const [roundedBannerCanvas, roundedBannerContext] = makeBannerRounded(
            coreCanvas,
            dimensions,
        )
        coreCanvas = roundedBannerCanvas
        coreCanvasContext = roundedBannerContext
    }

    return coreCanvas
}

function convertThemeToTextConfig(theme: string): TextConfig {
    switch (theme) {
        case 'flora':
            return {
                titleColor: '#050505',
                descriptionColor: '#050505',
            }
        case 'blaze':
        case 'funk':
        case 'elegant':
        default:
            return {
                titleColor: '#f5f5f5',
                descriptionColor: '#f5f5f5',
            }
    }
}

function convertThemeToBackgroundConfig(theme: string): BackgroundConfig {
    switch (theme) {
        case 'blaze':
            return {
                type: 'gradient',
                background: {
                    colorsPreset: 'blaze',
                    positionsPreset: 14,
                },
            }
        case 'flora':
            return {
                type: 'gradient',
                background: {
                    colorsPreset: 'flora',
                    positionsPreset: 2,
                },
            }
        case 'funk':
            return {
                type: 'gradient',
                background: {
                    colorsPreset: 'funk',
                    positionsPreset: 20,
                },
            }
        case 'orange':
            return {
                type: 'gradient',
                background: {
                    colorsPreset: 'orange',
                    positionsPreset: 4,
                },
            }
        case 'elegant':
        default:
            return {
                type: 'plain',
                background: {
                    color: '#080808',
                },
            }
    }
}

type CanvasContext = {
    coreCanvas: canvas.Canvas
    coreCanvasContext: canvas.CanvasRenderingContext2D
    dimensions: [number, number]
}

function createBackgroundFromUserTheme(
    theme: string,
    text: TextConfig,
    canvasCtx: CanvasContext,
): Error | undefined {
    const { coreCanvas, coreCanvasContext, dimensions } = canvasCtx

    const customThemeConfig = themeStore
        .get('dach-themes')
        .themes?.find(({ name }) => name === theme)

    if (!customThemeConfig) return new Error(`Theme ${theme} not found.`)

    text.titleColor = customThemeConfig.titleColor
    text.descriptionColor = customThemeConfig.descriptionColor

    const makeBackgroundResult = makeBackgroundGradient(
        coreCanvas,
        coreCanvasContext,
        dimensions,
        {
            colors: JSON.parse(customThemeConfig.colors),
            positions: JSON.parse(customThemeConfig.positions),
        },
    )
    return makeBackgroundResult
}

function createBackgroundFromTheme(
    theme: string,
    text: TextConfig,
    canvasCtx: CanvasContext,
): void {
    const { coreCanvas, coreCanvasContext, dimensions } = canvasCtx

    const { background, type } = convertThemeToBackgroundConfig(theme)
    text = convertThemeToTextConfig(theme)

    if (type === 'gradient') {
        const colors = colorPresetToColors[background.colorsPreset]
        const positions = positionPresetToPositions[background.positionsPreset]

        makeBackgroundGradient(coreCanvas, coreCanvasContext, dimensions, {
            colors,
            positions,
        })
    } else {
        makeBackgroundPlainColor(
            coreCanvasContext,
            dimensions,
            background.color,
        )
    }
}

function isPredefinedTheme(theme: string): boolean {
    return !themeSchema.safeParse(theme).success
}

function makeBackgroundGradient(
    canvas: canvas.Canvas,
    context: canvas.CanvasRenderingContext2D,
    dimensions: [number, number],
    gradientConfig: {
        colors: string[]
        positions: {
            x: number
            y: number
        }[]
    },
): Error | undefined {
    const { positions, colors } = gradientConfig

    const hexCodesToRgbResult = hexCodesToRgb(colors)
    if (hexCodesToRgbResult instanceof Error) return hexCodesToRgbResult

    const rgbGradientColors = hexCodesToRgbResult
    const imageData = gradientImageData(
        context,
        ...dimensions,
        rgbGradientColors,
        positions,
    )

    context.putImageData(imageData as canvas.ImageData, 0, 0)
    context.drawImage(canvas, 0, 0, ...dimensions)
}

function makeBackgroundPlainColor(
    context: canvas.CanvasRenderingContext2D,
    dimensions: [number, number],
    backgroundColor: string,
): void {
    context.fillStyle = backgroundColor
    context.fillRect(0, 0, ...dimensions)
}

function registerFonts(): Error | void {
    try {
        canvas.registerFont(path.join(process.cwd(), 'assets', 'Geist.ttf'), {
            family: 'GeistBold',
            weight: 'bold',
        })
        canvas.registerFont(path.join(process.cwd(), 'assets', 'Geist.ttf'), {
            family: 'GeistMedium',
            weight: 'medium',
        })
    } catch (e) {
        return e as Error
    }
}

/**
 * @description Arrange the title and description nodes
 * in the center of the canvas using the Yoga layout engine.
 */
function makeLayout(
    canvas: canvas.Canvas,
    nameToNode: {
        title: Yoga.YogaNode
        description: Yoga.YogaNode
    },
): void {
    const root = Yoga.Node.create()

    root.setWidth(canvas.width)
    root.setHeight(canvas.height)

    root.insertChild(nameToNode.title, 0)
    root.insertChild(nameToNode.description, 1)

    root.setJustifyContent(Yoga.JUSTIFY_CENTER)
    root.setAlignItems(Yoga.ALIGN_CENTER)
    root.setFlex(Yoga.FLEX_DIRECTION_ROW)

    root.calculateLayout(canvas.width, canvas.height, Yoga.DIRECTION_LTR)
}

function makeBannerRounded(
    canvasToWriteTo: canvas.Canvas,
    dimensions: [number, number],
): CanvasWithContext {
    const [canvas, context] = makeCanvasWithDimensions(dimensions)

    context.roundRect(0, 0, ...dimensions, 60)
    context.clip()
    context.drawImage(canvasToWriteTo, 0, 0, ...dimensions)

    return [canvas, context]
}

function makeCanvasWithDimensions(
    dimensions: [number, number],
): CanvasWithContext {
    const newCanvas = canvas.createCanvas(...dimensions)
    const newCanvasContext = newCanvas.getContext('2d')

    return [newCanvas, newCanvasContext]
}

type CanvasWithContext = [canvas.Canvas, canvas.CanvasRenderingContext2D]
