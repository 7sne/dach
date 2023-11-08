// @ts-check

module.exports = {
    extends: ['@antfu'],
    rules: {
        'arrow-parens': ['error', 'as-needed'],
        'quote-props': ['error', 'as-needed'],
        indent: ['error', 4],
        '@typescript-eslint/indent': ['error', 4],
        '@typescript-eslint/brace-style': 'off',
        '@typescript-eslint/no-redeclare': 'off',
        '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
        '@typescript-eslint/no-use-before-define': 'off',
        'global-require': 0,
    },
}
