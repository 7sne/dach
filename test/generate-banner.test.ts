import * as fs from 'node:fs/promises'
import * as fssync from 'node:fs'
import { execa } from 'execa'
import { describe } from 'vitest'
import { visualRegression } from '../src/internal/visual-regression'

const sandboxDirectoryPath = `${process.cwd()}/test/sandbox`

describe.skip('Generate banner', () => {
    beforeAll(async () => {
        if (fssync.existsSync(sandboxDirectoryPath))
            await fs.rm(sandboxDirectoryPath, { recursive: true })
    })

    beforeEach(async () => {
        await execa('pnpm', ['build'])
        await fs.mkdir(sandboxDirectoryPath)
    })

    afterEach(async () => {
        await fs.rm(sandboxDirectoryPath, { recursive: true })
    })

    test('should generate banner with default configuration.', async () => {
        await execa('node', ['dist/cli.cjs'])
        expect(
            visualRegression(
                './test/baseline/default-test-banner.png',
                './.github/project-banner.png',
            ),
        ).not.instanceOf(Error)
    })

    test('should generate banner with `output` provided.', async () => {
        await execa('pnpm', ['build'])
        await execa('node', ['dist/cli.cjs'])
        await execa('node', ['dist/cli.cjs', '--output', '.'])
        await execa('node', ['dist/cli.cjs', '--output', 'assets'])
        await execa('node', ['dist/cli.cjs', '--output', 'assets/'])
        await execa('node', ['dist/cli.cjs', '-o', './assets'])
        await execa('node', ['dist/cli.cjs', '-o', '/tmp'])
    }, 15_000)

    test('should generate banner with `title` provided.', async () => {
        await execa('node', ['dist/cli.cjs', '--output', './test/sandbox', '-t', 'Title test', '-r'])
        await execa('node', ['dist/cli.cjs', '--output', './test/sandbox', '--title', 'Title test', '-r'])
        expect(
            visualRegression('./test/baseline/title-test-banner.png', './test/sandbox/project-banner.png'),
        ).not.instanceOf(Error)
    }, 15_000)

    test('should generate banner with `title`, `description` and `rounded-corners` provided.', async () => {
        await execa('node', ['dist/cli.cjs', '--output', './test/sandbox', '-t', 'Title test', '-d', 'Description test', '-r'])
        await execa('node', ['dist/cli.cjs', '--output', './test/sandbox', '--title', 'Title test', '--description', 'Description test', '--rounded-corners'])
        expect(
            visualRegression('./test/baseline/title-desc-test-banner.png', './test/sandbox/project-banner.png'),
        ).not.instanceOf(Error)
    }, 15_000)
})

describe('Generate themed banner.', () => {
    beforeAll(async () => {
        if (fssync.existsSync(sandboxDirectoryPath))
            await fs.rm(sandboxDirectoryPath, { recursive: true })
    })

    beforeEach(async () => {
        await execa('pnpm', ['build'])
        await fs.mkdir(sandboxDirectoryPath)
    })

    afterEach(async () => {
        await fs.rm(sandboxDirectoryPath, { recursive: true })
    })

    test('', async () => {
        await execa('node', ['dist/cli.cjs', '--output', './test/sandbox', '-t', 'Title test', '-d', 'Description test'])
        await execa('node', ['dist/cli.cjs', '--output', './test/sandbox', '--title', 'Title test', '--description', 'Description test'])
        expect(
            visualRegression('./test/baseline/title-desc-test-banner.png', './test/sandbox/project-banner.png'),
        ).not.instanceOf(Error)
    }, 15_000)
})
