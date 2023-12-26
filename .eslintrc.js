module.exports = {
    root: true,
    env: {
        node: true,
        browser: true,
        es2021: true
    },
    extends: [
        'eslint:recommended',
        'plugin:vue/vue3-recommended',
        'plugin:import/typescript',
        '@vue/typescript/recommended',
        'plugin:storybook/recommended'
    ],
    parser: 'vue-eslint-parser',
    parserOptions: {
        ecmaVersion: 13,
        parser: '@typescript-eslint/parser',
        sourceType: 'module',
        extraFileExtensions: ['.vue']
    },
    plugins: ['vue', '@typescript-eslint', 'prettier'],
    ignorePatterns: ['node_modules', 'dist', '*.d.ts'],
    rules: {
        'vue/multi-word-component-names': 'off',
        'no-var': 'error',
        'vue/no-unused-vars': 'error',
        '@typescript-eslint/consistent-type-definitions': [
            'error',
            'interface'
        ],
        '@typescript-eslint/no-unused-vars': 'error', // 使用 ts 未使用变量的规则 比如枚举类型在es中会报错
        'no-extend-native': 0,
        'no-new': 0,
        'no-useless-escape': 0,
        'no-useless-constructor': 0,
        'no-trailing-spaces': ['error', { skipBlankLines: true }],
        indent: [
            'error',
            4,
            {
                SwitchCase: 1
            }
        ],
        'space-infix-ops': ['error', { int32Hint: false }],
        'space-before-function-paren': [
            'error',
            {
                anonymous: 'always',
                named: 'always',
                asyncArrow: 'always'
            }
        ],
        'comma-dangle': 0,
        'no-console': 0,
        'no-debugger': 0,
        'id-length': 0,
        'eol-last': 0,
        'object-curly-spacing': ['error', 'always'],
        'array-bracket-spacing': ['error', 'always'],
        'arrow-spacing': 'error',
        'no-multiple-empty-lines': 'error',
        'no-unused-vars': 'error',
        'spaced-comment': 'error',
        quotes: ['error', 'single', { allowTemplateLiterals: true }],
        'no-unreachable': 'error',
        'keyword-spacing': 'error',
        'space-before-blocks': 'error',
        'semi-spacing': 'error',
        'comma-spacing': 'error',
        'key-spacing': 'error',
        'prefer-const': [
            'error',
            {
                destructuring: 'any',
                ignoreReadBeforeAssign: false
            }
        ],
        'no-irregular-whitespace': 2,
        'vue/require-default-prop': 'off',
        // 'vue/multi-word-component-names': 'off',
        // 'prettier/prettier': ['error'],
        // 'vue/require-default-prop': 0,
        'vue/html-indent': ['error', 4]
        // 'vue/singleline-html-element-content-newline': 0,
        // 'vue/component-name-in-template-casing': ['error', 'PascalCase'],
        // '@typescript-eslint/no-explicit-any': ['off']
    },
    settings: {
        'import/resolver': {
            node: {
                extensions: [
                    '.ts',
                    '.js',
                    '.tsx',
                    '.jsx',
                    '.mjs',
                    '.png',
                    '.jpg'
                ]
            },
            typescript: {}
        }
    }
}
