import { describe, expect, test, vi } from 'vitest'

import { logger } from '../logger'
import { themeStore } from '../theme-store'
import { handleAddCmd } from './add'

describe(handleAddCmd.name, () => {
    test('should add theme to store.', () => {
        const loggerSpy = vi.spyOn(logger, 'printErrors')
        const themeStoreSetSpy = vi.spyOn(themeStore, 'set')

        handleAddCmd('hello', {
            colors: '["#000000", "#ffffff"]',
            positions: '[{"x":0.49618420439786215,"y":0.22918175634846816}]',
            titleColor: '#000000',
            descriptionColor: '#ffffff',
        })

        expect(loggerSpy).toHaveBeenCalledTimes(0)
        expect(themeStoreSetSpy).toHaveBeenCalledTimes(1)
    })

    test('should print error on wrong `positions`.', () => {
        const loggerSpy = vi.spyOn(logger, 'printErrors')
        const themeStoreSetSpy = vi.spyOn(themeStore, 'set')

        handleAddCmd('hello', {
            colors: '["#000000", "#ffffff"]',
            positions: '[{"x":0.49618420439786215]',
            titleColor: '#000000',
            descriptionColor: '#ffffff',
        })

        expect(loggerSpy).toHaveBeenCalledTimes(1)
        expect(themeStoreSetSpy).toHaveBeenCalledTimes(0)
    })

    test('should print error on wrong colors.', () => {
        const loggerSpy = vi.spyOn(logger, 'printErrors')
        const themeStoreSetSpy = vi.spyOn(themeStore, 'set')

        handleAddCmd('should print error on wrong colors', {
            colors: '["#ffffff"]',
            positions: '[{"x":0.49618420439786215,"y":0.22918175634846816}]',
            titleColor: '#000000',
            descriptionColor: '#ffffff',
        })

        expect(loggerSpy).toHaveBeenCalledTimes(1)
        expect(themeStoreSetSpy).toHaveBeenCalledTimes(0)
    })

    test('should print error on wrong title color.', () => {
        const loggerSpy = vi.spyOn(logger, 'printErrors')
        const themeStoreSetSpy = vi.spyOn(themeStore, 'set')

        handleAddCmd('should print error on wrong colors', {
            colors: '["#000000", "#ffffff"]',
            positions: '[{"x":0.49618420439786215]',
            titleColor: '000000',
            descriptionColor: '#ffffff',
        })

        expect(loggerSpy).toHaveBeenCalledTimes(1)
        expect(themeStoreSetSpy).toHaveBeenCalledTimes(0)
    })

    test('should print error on wrong description color.', () => {
        const loggerSpy = vi.spyOn(logger, 'printErrors')
        const themeStoreSetSpy = vi.spyOn(themeStore, 'set')

        handleAddCmd('should print error on wrong colors', {
            colors: '["#000000", "#ffffff"]',
            positions: '[{"x":0.49618420439786215]',
            titleColor: '#000000',
            descriptionColor: '#fffff',
        })

        expect(loggerSpy).toHaveBeenCalledTimes(1)
        expect(themeStoreSetSpy).toHaveBeenCalledTimes(0)
    })

    test('should print error on theme name.', () => {
        const loggerSpy = vi.spyOn(logger, 'printErrors')
        const themeStoreSetSpy = vi.spyOn(themeStore, 'set')

        handleAddCmd(0, {
            colors: '["#000000", "#ffffff"]',
            positions: '[{"x":0.49618420439786215]',
            titleColor: '#000000',
            descriptionColor: '#fffff',
        })

        expect(loggerSpy).toHaveBeenCalledTimes(1)
        expect(themeStoreSetSpy).toHaveBeenCalledTimes(0)
    })
})
