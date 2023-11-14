import { afterAll, describe, expect, test, vi } from 'vitest'
import { logger } from '../logger'
import { handleGenerateCmd } from './generate'

vi.mock('../write-canvas-to-png', () => ({
    writeCanvasToPngFile: vi.fn(),
}))

describe(handleGenerateCmd.name, () => {
    afterAll(() => {
        vi.clearAllMocks()
    })

    test('should generate banner with default options.', () => {
        handleGenerateCmd({
            output: './test/sandbox',
            title: 'Title test',
            description: 'Description test',
            dimensions: '3000x1685',
            ratio: '16:9',
            theme: 'elegant',
            roundedCorners: false,
        })
    })

    test('should print error on wrong `title` or `description` length.', () => {
        const loggerSpy = vi.spyOn(logger, 'printErrors')

        handleGenerateCmd({
            output: 'test/sandbox',
            title: 'ok',
            description:
                'Description test Description test Description test Description test Description test',
            dimensions: '3000x1685',
            ratio: '16:9',
            theme: 'elegant',
            roundedCorners: false,
        })

        expect(loggerSpy).toHaveBeenCalledTimes(1)
    })

    test('should print error on wrong `dimensions`.', () => {
        const loggerSpy = vi.spyOn(logger, 'printErrors')

        handleGenerateCmd({
            output: 'test/sandbox',
            title: 'Title test',
            description: 'Description test',
            dimensions: '3000 1268',
            ratio: '16:9',
            theme: 'elegant',
            roundedCorners: false,
        })

        expect(loggerSpy).toHaveBeenCalledTimes(1)
    })

    test('should print error when `dimensions` and `ratio` are undefined.', () => {
        const loggerSpy = vi.spyOn(logger, 'printErrors')

        handleGenerateCmd({
            output: 'test/sandbox',
            title: 'Title test',
            description: 'Description test',
            theme: 'elegant',
            roundedCorners: false,
        })

        expect(loggerSpy).toHaveBeenCalledTimes(1)
    })

    test('work if `ratio` is defined.', () => {
        const loggerSpy = vi.spyOn(logger, 'printErrors')

        handleGenerateCmd({
            output: 'test/sandbox',
            title: 'Title test',
            description: 'Description test',
            ratio: '16:9',
            theme: 'elegant',
            roundedCorners: false,
        })

        expect(loggerSpy).toHaveBeenCalledTimes(0)
    })
})
