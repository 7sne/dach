import { defineConfig } from 'cypress'
import getCompareSnapshotsPlugin from 'cypress-image-diff-js/dist/plugin'

export default defineConfig({
    screenshotsFolder: './cypress/snapeshots/actual',
    trashAssetsBeforeRuns: true,
    watchForFileChanges: false,
    env: {
        failSilently: false,
    },
    e2e: {
        baseUrl: 'http://localhost:3000',
        viewportWidth: 1280,
        viewportHeight: 720,
        video: false,
        supportFile: false,
        setupNodeEvents(on, config) {
            return getCompareSnapshotsPlugin(on, config)
        },
    },
})
