import type { Position } from '../generate-banner'

export function randomRgbPositions(count: number): Position[] {
    const rgbPositions: Position[] = []
    for (let i = 0; i < count; i++) {
        const position: Position = {
            x: Math.random(), // Generates a random x coordinate between 0 and 1
            y: Math.random(), // Generates a random y coordinate between 0 and 1
        }
        rgbPositions.push(position)
    }
    return rgbPositions
}
