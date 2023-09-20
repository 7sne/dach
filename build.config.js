import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
    entries: [
        'src/cli',
        {
            builder: 'rollup',
            ext: ['cjs'],
            input: 'src/cli',
            outDir: 'dist',
        },
        {
            builder: 'mkdist',
            outDir: 'dist/assets',
            input: 'assets',
            pattern: '*.otf',
        },
    ],
    clean: true,
    rollup: {
        emitCJS: true,
    },
})
