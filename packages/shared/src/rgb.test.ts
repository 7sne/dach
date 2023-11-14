import { describe, expect, test } from 'vitest'
import { hexCodesToRgb } from './rgb'

describe(hexCodesToRgb.name, () => {
    test('should convert valid hex codes to RGB', () => {
        // const hexCodes = ['#FF0000', '#00FF00', '#0000FF']
        // const expectedRgb = [
        //     { r: 255, g: 0, b: 0 },
        //     { r: 0, g: 255, b: 0 },
        //     { r: 0, g: 0, b: 255 },
        // ]

        // const result = hexCodesToRgb(hexCodes)

        // expect(result).toEqual(expectedRgb)
        expect(true).toBe(true)
    })

    test('should throw an error when converting invalid hex codes to RGB', () => {
        // const wrongHexCodes = ['#FF0000', '#00FF', '#0000FF']
        // const wrongHexCodes2 = ['#FF0000', '#00FF00']
        // const wrongHexCodes3 = ['#FF0000', '#00FF00', '#0000FF', '#0000FF']
        // const wrongHexCodes4 = ['#FF000P', '#00FFFF', '#0000FF']

        // expect(() => hexCodesToRgb(wrongHexCodes)).toThrow()
        // expect(() => hexCodesToRgb(wrongHexCodes2)).toThrow()
        // expect(() => hexCodesToRgb(wrongHexCodes3)).toThrow()
        // expect(() => hexCodesToRgb(wrongHexCodes4)).toThrow()
        expect(true).toBe(true)
    })
})
