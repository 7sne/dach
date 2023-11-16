module.exports = {
    root: true,
    extends: [
        'next/core-web-vitals',
        'eslint:recommended',
        'plugin:cypress/recommended',
    ],
    env: {
        browser: true,
        es2021: true,
        node: true,
        'cypress/globals': true,
    },
    parserOptions: {
        babelOptions: {
            presets: [require.resolve('next/babel')],
        },
    },
    rules: {
        'no-unused-vars': 'off',
    },
}
