module.exports = {
    root: true,
    extends: ['next/core-web-vitals', 'eslint:recommended'],
    parserOptions: {
        babelOptions: {
            presets: [require.resolve('next/babel')],
        },
    },
    rules: {
        'no-unused-vars': 'off',
    },
}
