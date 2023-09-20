import fs from 'node:fs/promises'
import { execa } from 'execa'
import { afterAll, describe, expect } from 'vitest'
import type { Config } from '../src/schema'
import { visualRegression } from './visual-regression'

describe('generate-banner', () => {
    let defaultConfig: Config

    beforeAll(async () => {
        await fs.mkdir(`${process.cwd()}/test/sandbox`)
    })

    afterAll(async () => {
        await fs.rm(`${process.cwd()}/test/sandbox`, { recursive: true })
    })

    test('should generate banner using minimal config', async () => {
        const baselineBannerPath = `${process.cwd()}/test/baseline/minimal.png`
        const newBannerPath = `${process.cwd()}/test/sandbox/project-banner.png`

        await execa('pnpm', ['build'])
        await execa('node', ['dist/cli.cjs', '--config', 'test/fixtures/minimal.config.json', '--output', 'test/sandbox'])

        expect(async () => await fs.readFile(newBannerPath)).not.toThrow()
        expect(visualRegression(baselineBannerPath, newBannerPath)).not.instanceOf(Error)
    })

    test('should generate banner using blaze config', async () => {
        const baselineBannerPath = `${process.cwd()}/test/baseline/blaze.png`
        const newBannerPath = `${process.cwd()}/test/sandbox/project-banner.png`

        await execa('pnpm', ['build'])
        await execa('node', ['dist/cli.cjs', '--config', 'test/fixtures/blaze.config.json', '--output', 'test/sandbox'])

        expect(async () => await fs.readFile(newBannerPath)).not.toThrow()
        expect(visualRegression(baselineBannerPath, newBannerPath)).not.instanceOf(Error)
    })

    test('should generate banner using funk config', async () => {
        const baselineBannerPath = `${process.cwd()}/test/baseline/funk.png`
        const newBannerPath = `${process.cwd()}/test/sandbox/project-banner.png`

        await execa('pnpm', ['build'])
        await execa('node', ['dist/cli.cjs', '--config', 'test/fixtures/funk.config.json', '--output', 'test/sandbox'])

        expect(async () => await fs.readFile(newBannerPath)).not.toThrow()
        expect(visualRegression(baselineBannerPath, newBannerPath)).not.instanceOf(Error)
    })

    test('should generate banner using flora config', async () => {
        const baselineBannerPath = `${process.cwd()}/test/baseline/flora.png`
        const newBannerPath = `${process.cwd()}/test/sandbox/project-banner.png`

        await execa('pnpm', ['build'])
        await execa('node', ['dist/cli.cjs', '--config', 'test/fixtures/flora.config.json', '--output', 'test/sandbox'])

        expect(async () => await fs.readFile(newBannerPath)).not.toThrow()
        expect(visualRegression(baselineBannerPath, newBannerPath)).not.instanceOf(Error)
    })
})
