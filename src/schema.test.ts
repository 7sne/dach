import fs from 'node:fs/promises'
import { describe, expect } from 'vitest'
import type { Config } from './schema'
import { configSchema } from './schema'

describe('configSchema', () => {
    let defaultConfig: Config

    beforeAll(async () => {
        const f = await fs.readFile(`${process.cwd()}/src/fixtures/default.config.json`, 'utf-8')
        defaultConfig = JSON.parse(f)
    })

    test('should default correctly for text config', () => {
        const config = {
            ...defaultConfig,
            title: {
                text: 'Dach',
            },
            description: {
                text: 'Elegant banners from terminal',
            },
        }

        expect(configSchema.parse(config).title.fontFamily).toEqual('Sora')
        expect(configSchema.parse(config).title.fontPath).toEqual(`${process.cwd()}/assets`)
        expect(configSchema.parse(config).description.fontFamily).toEqual('Satoshi')
        expect(configSchema.parse(config).description.fontPath).toEqual(`${process.cwd()}/assets`)
    })

    test('should throw on missing fields in plain background config', () => {
        const config = {
            ...defaultConfig,
            background: {
                type: 'plain',
            },
        }

        expect(() => configSchema.parse(config)).toThrow()
    })

    test('should throw on missing fields in gradient background config', () => {
        const config = {
            ...defaultConfig,
            background: {
                type: 'gradient',
            },
        }

        expect(() => configSchema.parse(config)).toThrow()
    })

    test('should not throw on config with presets', () => {
        const config = {
            ...defaultConfig,
            background: {
                colorsPreset: 'none',
                positionsPreset: 'none',
                type: 'gradient',
            },
        }

        expect(() => configSchema.parse(config)).not.toThrow()
    })

    test('should not throw on config with one preset', () => {
        const config = {
            ...defaultConfig,
            background: {
                colors: [
                    '#fbe37d',
                    '#336f55',
                    '#fff5c5',
                    '#7fa381',
                ],
                positionsPreset: 'none',
                type: 'gradient',
            },
        }

        expect(() => configSchema.parse(config)).not.toThrow()
    })
})
