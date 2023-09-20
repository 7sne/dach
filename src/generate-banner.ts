import * as canvas from 'canvas'
import * as Yoga from 'yoga-layout-prebuilt'

import { hexCodesToRgb } from './rgb'
import { gradientImageData } from './gradient-image-data'
import type { Config, GradientBackgroundConfig, PlainBackgroundConfig } from './schema'
import { colorPresetNameToColors } from './color-presets'
import { positionPresetToPositions } from './position-presets'

export type Position = {
    x: number
    y: number
}

export function generateBanner(
    {
        title,
        description,
        dimensions,
        background,
        roundedCorners,
    }: Omit<Config, 'output' | 'config' | 'bannerPath' | 'configPath'>,
): Error | canvas.Canvas {
    let coreCanvas = canvas.createCanvas(...dimensions)
    let coreCanvasContext = coreCanvas.getContext('2d')

    if (background.type === 'gradient') {
        let colors = background.colors
        let positions = background.positions

        if (background.colorsPreset)
            colors = colorPresetNameToColors[background.colorsPreset!]

        if (background.positionsPreset)
            positions = positionPresetToPositions[background.positionsPreset!]

        makeBackgroundGradient(
            coreCanvas,
            coreCanvasContext,
            dimensions,
            {
                ...background,
                colors: colors!,
                positions: positions!,
            },
        )
    }
    if (background.type === 'plain') {
        makeBackgroundPlainColor(
            coreCanvasContext,
            background,
            dimensions,
        )
    }

    const registerFontsError = registerFonts(
        { path: title.fontPath, family: title.fontFamily },
        { path: description.fontPath, family: description.fontFamily },
    )

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
    titleNode.setPadding(Yoga.EDGE_BOTTOM, title.fontSize * 0.8)

    // Arrange title and description in the center of the canvas.
    makeLayout(coreCanvas, { title: titleNode, description: descriptionNode })

    // Draw title and description.
    coreCanvasContext.fillStyle = title.color
    coreCanvasContext.font = `${title.fontSize}px ${title.fontFamily}, sans`
    coreCanvasContext.fillText(
        title.text,
        titleNode.getComputedLeft(),
        titleNode.getComputedTop(),
    )

    coreCanvasContext.fillStyle = description.color
    coreCanvasContext.font = `${description.fontSize}px ${description.fontFamily}, sans`
    coreCanvasContext.fillText(
        description.text,
        descriptionNode.getComputedLeft(),
        descriptionNode.getComputedTop(),
    )

    return coreCanvas
}

function makeBackgroundGradient(
    canvas: canvas.Canvas,
    context: canvas.CanvasRenderingContext2D,
    dimensions: [number, number],
    gradientConfig: GradientBackgroundConfig,
): void {
    const rgbGradientColors = hexCodesToRgb(gradientConfig.colors!)

    const imageData = gradientImageData(
        context,
        ...dimensions,
        rgbGradientColors,
        gradientConfig.positions!,
    )

    context.putImageData(imageData, 0, 0)
    context.drawImage(canvas, 0, 0, ...dimensions)
}

function makeBackgroundPlainColor(
    context: canvas.CanvasRenderingContext2D,
    backgroundConfig: PlainBackgroundConfig,
    dimensions: [number, number],
): void {
    context.fillStyle = backgroundConfig.color
    context.fillRect(0, 0, ...dimensions)
}

function registerFonts(
    titleFont: { family: string; path: string },
    descriptionFont: { family: string; path: string },
): Error | void {
    try {
        canvas.registerFont(titleFont.path, { family: titleFont.family })
        canvas.registerFont(descriptionFont.path, { family: descriptionFont.family })
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
