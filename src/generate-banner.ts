import * as process from 'node:process'
import * as canvas from 'canvas'
import * as Yoga from 'yoga-layout-prebuilt'

import { hexCodesToRgb } from './rgb'
import { gradientImageData } from './gradient-image-data'
import type { BackgroundConfig, BannerSettings, Theme } from './schema'
import { colorPresetToColor } from './color-presets'
import { positionPresetToPositions } from './position-presets'

export type Position = {
    x: number
    y: number
}

export function generateBanner(
    {
        theme,
        title,
        description,
        dimensions,
        roundedCorners,
    }: BannerSettings,
): Error | canvas.Canvas {
    let coreCanvas = canvas.createCanvas(...dimensions)
    let coreCanvasContext = coreCanvas.getContext('2d')

    const backgroundConfig = makeCanvasBackground(coreCanvas, coreCanvasContext, theme, dimensions)

    const registerFontsError = registerFonts()

    if (registerFontsError)
        return registerFontsError

    if (roundedCorners) {
        const [roundedBannerCanvas, roundedBannerContext] = makeBannerRounded(
            coreCanvas,
            dimensions,
        )
        coreCanvas = roundedBannerCanvas
        coreCanvasContext = roundedBannerContext
    }

    // Generic settings for every banner.
    coreCanvasContext.globalAlpha = 0.98
    coreCanvasContext.textAlign = 'center'
    coreCanvasContext.textBaseline = 'middle'

    // Create text nodes for title and description.
    const titleNode = Yoga.Node.create()
    const descriptionNode = Yoga.Node.create()

    // Create space between title and description.
    titleNode.setPadding(Yoga.EDGE_BOTTOM, 296 * 0.8)

    // Arrange title and description in the center of the canvas.
    makeLayout(coreCanvas, { title: titleNode, description: descriptionNode })

    // Draw title and description.
    // @todo - Handle these things better!
    coreCanvasContext.fillStyle = backgroundConfig.text.titleColor ?? '#ffffff'
    coreCanvasContext.font = 'extrabold 296px Geist sans'
    coreCanvasContext.fillText(
        title,
        titleNode.getComputedLeft(),
        titleNode.getComputedTop(),
    )

    // @todo - Handle these things better!
    coreCanvasContext.fillStyle = backgroundConfig.text.descriptionColor ?? '#ffffff'
    coreCanvasContext.font = '112px Geist sans'
    coreCanvasContext.fillText(
        description,
        descriptionNode.getComputedLeft(),
        descriptionNode.getComputedTop(),
    )

    return coreCanvas
}

/* eslint-disable @typescript-eslint/indent */
function convertThemeToBackgroundConfig(theme: Theme): BackgroundConfig {
    switch (theme) {
    case 'blaze':
        return {
            type: 'gradient',
            text: {
                titleColor: '#f5f5f5',
                descriptionColor: '#f5f5f5',
            },
            background: {
                colorsPreset: 'blaze',
                positionsPreset: 14,
            },
        }

    case 'flora':
        return {
            type: 'gradient',
            text: {
                titleColor: '#050505',
                descriptionColor: '#050505',
            },
            background: {
                colorsPreset: 'flora',
                positionsPreset: 2,
            },
        }
    case 'funk':
        return {
            type: 'gradient',
            text: {
                titleColor: '#f5f5f5',
                descriptionColor: '#f5f5f5',
            },
            background: {
                colorsPreset: 'funk',
                positionsPreset: 20,
            },
        }
    case 'orange':
        return {
            type: 'gradient',
            text: {
                titleColor: '#050505',
                descriptionColor: '#050505',
            },
            background: {
                colorsPreset: 'orange',
                positionsPreset: 4,
            },
        }
    case 'elegant':
        return {
            type: 'plain',
            text: {
                titleColor: '#f5f5f5',
                descriptionColor: '#f5f5f5',
            },
            background: {
                color: '#080808',
            },
        }
    default:
        return {
            type: 'plain',
            text: {
                titleColor: '#f5f5f5',
                descriptionColor: '#f5f5f5',
            },
            background: {
                color: '#080808',
            },
        }
    }
}

function makeCanvasBackground(
    coreCanvas: canvas.Canvas,
    coreCanvasContext: canvas.CanvasRenderingContext2D,
    theme: Theme,
    dimensions: [number, number],
): BackgroundConfig {
    const { background, text, type } = convertThemeToBackgroundConfig(theme)

    if (type === 'gradient') {
        const colors = colorPresetToColor[background.colorsPreset]
        const positions = positionPresetToPositions[background.positionsPreset]

        makeBackgroundGradient(
            coreCanvas,
            coreCanvasContext,
            dimensions,
            {
                ...background,
                colors,
                positions,
            },
        )
    }

    if (type === 'plain') {
        makeBackgroundPlainColor(
            coreCanvasContext,
            dimensions,
            background.color,
        )
    }

    return { background, text, type } as BackgroundConfig
}

function makeBackgroundGradient(
    canvas: canvas.Canvas,
    context: canvas.CanvasRenderingContext2D,
    dimensions: [number, number],
    gradientConfig: {
        colors: string[]
        positions: Position[]
    },
): void {
    const { positions, colors } = gradientConfig
    const rgbGradientColors = hexCodesToRgb(colors)
    const imageData = gradientImageData(
        context,
        ...dimensions,
        rgbGradientColors,
        positions,
    )

    context.putImageData(imageData, 0, 0)
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
        const geistFontPath = `${process.cwd()}/assets/Geist.ttf`
        canvas.registerFont(geistFontPath, { family: 'Geist' })
        canvas.registerFont(geistFontPath, { family: 'Geist' })
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

function makeBannerRounded(canvasToWriteTo: canvas.Canvas, dimensions: [number, number]): CanvasWithContext {
    const [canvas, context] = makeCanvasWithDimensions(dimensions)

    context.roundRect(0, 0, ...dimensions, 60)
    context.clip()
    context.drawImage(canvasToWriteTo, 0, 0, ...dimensions)

    return [canvas, context]
}

function makeCanvasWithDimensions(dimensions: [number, number]): CanvasWithContext {
    const newCanvas = canvas.createCanvas(...dimensions)
    const newCanvasContext = newCanvas.getContext('2d')

    return [newCanvas, newCanvasContext]
}

type CanvasWithContext = [canvas.Canvas, canvas.CanvasRenderingContext2D]
