module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: ['no-only-tests', 'simple-import-sort', 'unused-imports'],
    extends: 'typestrict',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: 'tsconfig.json',
        tsconfigRootDir: __dirname,
    },
    rules: {
        indent: 'off',
        'no-unused-vars': 'off',
        'no-only-tests/no-only-tests': 'error',
        '@typescript-eslint/no-floating-promises': 'warn',
        '@typescript-eslint/no-use-before-define': 'off',
        'simple-import-sort/imports': 'error',
        'simple-import-sort/exports': 'error',
        'unused-imports/no-unused-imports': 'error',
        'unused-imports/no-unused-vars': [
            'warn',
            {
                vars: 'all',
                varsIgnorePattern: '^_',
                args: 'after-used',
                argsIgnorePattern: '^_',
            },
        ],
    },
    ignorePatterns: [
        '**/*.d.ts',
        '**/dist/**',
        '**/node_modules/**',
        '**/coverage/**',
    ],
}
