// @internal
export function randomRgbPositions(count: number): Position[] {
    const rgbPositions: Position[] = []
    for (let i = 0; i < count; i++) {
        const position: Position = {
            x: Math.random(),
            y: Math.random(),
        }
        rgbPositions.push(position)
    }
    return rgbPositions
}

type Position = {
    x: number
    y: number
}
