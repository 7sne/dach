export type Rgb = {
    r: number
    g: number
    b: number
}

export function hexCodesToRgb(hexCodes: string[]): Rgb[] {
    return hexCodes
        .reduce((acc, current) =>
            [...acc, tryColorToRgb(current)], [] as Rgb[],
        )
}

function tryColorToRgb(color: string): Rgb {
    const rgb = hexToRgb(color)

    if (!rgb)
        throw new Error('tryColorToRgb: Invalid hex color.')
    else
        return rgb
}

function hexToRgb(hex: string): Rgb | null {
    const result = isHexColor(hex)

    return result
        ? {
            r: Number.parseInt(result[1]!, 16),
            g: Number.parseInt(result[2]!, 16),
            b: Number.parseInt(result[3]!, 16),
        }
        : null
}

function isHexColor(hex: string): RegExpExecArray | null {
    if (hex.length === 4)
        hex = `${hex[1]}${hex[1]}${hex[2]}${hex[2]}${hex[3]}${hex[3]}`

    return /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
}
