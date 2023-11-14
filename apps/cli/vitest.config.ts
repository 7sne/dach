/// <reference types="vitest" />

import { defineConfig } from 'vitest/config'

export default defineConfig({
    test: {
        // https://github.com/vitest-dev/vitest/issues/740#issuecomment-1042648373.
        watch: false,
        threads: false,
        globals: true,
        include: ['test/**/*.test.ts', 'src/**/*.test.ts'],
    },
})
