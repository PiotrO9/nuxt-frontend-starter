import withNuxt from './.nuxt/eslint.config.mjs';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import eslintPluginPrettier from 'eslint-plugin-prettier';

export default withNuxt(eslintConfigPrettier, {
    plugins: {
        prettier: eslintPluginPrettier,
    },
    rules: {
        indent: 'off',
        'vue/html-indent': 'off',
        'vue/script-indent': 'off',
        'vue/html-closing-bracket-newline': 'off',
        'vue/multi-word-component-names': 'off',
        'prettier/prettier': [
            'error',
            {
                tabWidth: 4,
                useTabs: false,
                singleQuote: true,
                semi: true,
            },
        ],
        'padding-line-between-statements': [
            'error',
            {
                blankLine: 'always',
                prev: ['const', 'let', 'var'],
                next: '*',
            },
            {
                blankLine: 'any',
                prev: ['const', 'let', 'var'],
                next: ['const', 'let', 'var'],
            },
            {
                blankLine: 'always',
                prev: '*',
                next: 'return',
            },
            {
                blankLine: 'always',
                prev: 'block-like',
                next: '*',
            },
            {
                blankLine: 'always',
                prev: '*',
                next: ['if', 'for', 'while', 'switch', 'try'],
            },
            {
                blankLine: 'always',
                prev: ['if', 'for', 'while', 'switch', 'try'],
                next: '*',
            },
        ],
        'no-multiple-empty-lines': [
            'error',
            {
                max: 2,
                maxEOF: 1,
                maxBOF: 0,
            },
        ],
        'keyword-spacing': [
            'error',
            {
                before: true,
                after: true,
            },
        ],
        'vue/define-macros-order': [
            'error',
            {
                order: [
                    'defineOptions',
                    'defineProps',
                    'defineEmits',
                    'defineSlots',
                ],
            },
        ],
        'vue/component-name-in-template-casing': [
            'error',
            'PascalCase',
            {
                registeredComponentsOnly: false,
            },
        ],
        'vue/block-order': [
            'error',
            {
                order: ['script', 'template', 'style'],
            },
        ],
    },
});
