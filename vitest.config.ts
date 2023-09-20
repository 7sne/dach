/// <reference types="vitest" />

import { defineConfig } from 'vitest/config'

export default defineConfig({
    test: {
        globals: true,
        include: ['src/**/*.ts', 'test/**/*.ts'],
        includeSource: ['src/**/*.ts'],
    },
})
