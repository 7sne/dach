// @ts-check
module.exports = {
    extends: ['@antfu'],
    rules: {
        indent: 'off',
        'arrow-parens': ['error', 'as-needed'],
        'quote-props': ['error', 'as-needed'],
        '@typescript-eslint/indent': 'off',
        '@typescript-eslint/brace-style': 'off',
        '@typescript-eslint/no-redeclare': 'off',
        '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
        '@typescript-eslint/no-use-before-define': 'off',
        'global-require': 0,
        'antfu/if-newline': 'off',
        'unicorn/number-literal-case': 'off',
        'operator-linebreak': 'off',
    },
}
