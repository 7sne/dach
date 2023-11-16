import * as fs from 'node:fs/promises'
import * as fssync from 'node:fs'
import path from 'node:path'
import { execaCommand } from 'execa'
import { describe } from 'vitest'
import { visualRegression } from '@dach/shared'

const sandboxDirectoryPath = `${process.cwd()}/test/sandbox`
const baselineDirectoryPath = `${process.cwd()}/test/baseline`

describe('Generate banner', () => {
    beforeAll(async () => fs.mkdir(sandboxDirectoryPath))
    afterAll(async () => fs.rmdir(sandboxDirectoryPath, { recursive: true }))

    test('should generate banner with default configuration.', async () => {
        await execaCommand(`pnpm dev generate --output ${sandboxDirectoryPath}`)
        expect(
            visualRegression(
                fssync.readFileSync(
                    path.join(baselineDirectoryPath, 'project-banner.png'),
                ),
                fssync.readFileSync(
                    path.join(sandboxDirectoryPath, 'project-banner.png'),
                ),
                0.3,
            ),
        ).not.instanceOf(Error)
    })

    // test('should generate banner with `output` provided.', async () => {
    //     await execaCommand('node dist/cli.cjs generate --output .')
    //     await execaCommand('node dist/cli.cjs generate --output assets')
    //     await execaCommand('node dist/cli.cjs generate --output assets/')
    //     await execaCommand('node dist/cli.cjs generate -o ./assets')
    //     await execaCommand('node dist/cli.cjs generate -o /tmp')
    // }, 15_000)

    // test('should generate banner with `title` provided.', async () => {
    //     await execa('node', [
    //         'dist/cli.cjs',
    //         'generate',
    //         '--output',
    //         sandboxDirectoryPath,
    //         '-t',
    //         'Title test',
    //     ])
    //     await execa('node', [
    //         'dist/cli.cjs',
    //         'generate',
    //         '--output',
    //         sandboxDirectoryPath,
    //         '--title',
    //         'Title test',
    //     ])
    //     expect(
    //         visualRegression(
    //             fssync.readFileSync('./test/baseline/title-test-banner.png'),
    //             fssync.readFileSync(
    //                 path.join(sandboxDirectoryPath, 'project-banner.png'),
    //             ),
    //         ),
    //     ).not.instanceOf(Error)
    // }, 15_000)

    // test('should generate banner with `title`, `description` and `rounded-corners` provided.', async () => {
    //     await execa('node', [
    //         'dist/cli.cjs',
    //         'generate',
    //         '--output',
    //         sandboxDirectoryPath,
    //         '-t',
    //         'Title test',
    //         '-d',
    //         'Description test',
    //         '-rc',
    //     ])

    //     await execa('node', [
    //         'dist/cli.cjs',
    //         'generate',
    //         '--output',
    //         sandboxDirectoryPath,
    //         '--title',
    //         'Title test',
    //         '--description',
    //         'Description test',
    //         '--rounded-corners',
    //     ])

    //     expect(
    //         visualRegression(
    //             fssync.readFileSync(
    //                 './test/baseline/title-desc-test-banner.png',
    //             ),
    //             fssync.readFileSync(
    //                 path.join(sandboxDirectoryPath, 'project-banner.png'),
    //             ),
    //         ),
    //     ).not.instanceOf(Error)
    // }, 15_000)
})

// describe('Generate themed banner.', () => {
//     beforeAll(async () => fs.mkdir(sandboxDirectoryPath))
//     afterAll(async () => fs.rmdir(sandboxDirectoryPath, { recursive: true }))

//     test('should generate banner using default themes.', async () => {
//         await execa('node', [
//             'dist/cli.cjs',
//             'generate',
//             '--output',
//             sandboxDirectoryPath,
//             '-t',
//             'Title test',
//             '-d',
//             'Description test',
//             '-rc',
//             '--theme',
//             'funk',
//         ])
//         expect(
//             visualRegression(
//                 fssync.readFileSync('./test/baseline/themed-test-banner.png'),
//                 fssync.readFileSync(
//                     path.join(sandboxDirectoryPath, 'project-banner.png'),
//                 ),
//             ),
//         ).not.instanceOf(Error)
//     })

//     test('should add custom theme and generate banner using it.', async () => {
//         const addCommandProcessResult = await execa('node', [
//             'dist/cli.cjs',
//             'add',
//             'custom',
//             '--colors',
//             '["#fd98ff","#c6366d","#000000","#fff244"]',
//             '--positions',
//             '[{"x":0.49618420439786215,"y":0.22918175634846816},{"x":0.5140350877192983,"y":0.5263157894736842},{"x":0.4368421052631579,"y":0.4506578947368421},{"x":0.6508771929824562,"y":0.3848684210526316}]',
//             '--title-color',
//             '#ffffff',
//             '--description-color',
//             '#ffffff',
//         ])

//         expect(addCommandProcessResult.exitCode).toBe(0)

//         await execa('node', [
//             'dist/cli.cjs',
//             'generate',
//             '--output',
//             sandboxDirectoryPath,
//             '-t',
//             'Title test',
//             '-d',
//             'Description test',
//             '--theme',
//             'custom',
//             '--ratio',
//             '16:10',
//             '--rounded-corners',
//         ])

//         expect(
//             visualRegression(
//                 fssync.readFileSync(
//                     './test/baseline/custom-themed-test-banner.png',
//                 ),
//                 fssync.readFileSync(
//                     path.join(sandboxDirectoryPath, 'project-banner.png'),
//                 ),
//             ),
//         ).not.instanceOf(Error)
//     })
// })
