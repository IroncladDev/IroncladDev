import eslintPluginAstro from 'eslint-plugin-astro'
import js from '@eslint/js'
import typescriptEslint from '@typescript-eslint/eslint-plugin'
import typescriptParser from '@typescript-eslint/parser'
import astroParser from 'astro-eslint-parser'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import globals from 'globals'

export default [
    ...eslintPluginAstro.configs.recommended,
    eslintPluginPrettierRecommended,
    js.configs.recommended,
    // Start with JS recommended, but keep browser‑only
    {
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
            },
        },
    },
    {
        files: ['**/*.ts', '**/*.tsx'],
        languageOptions: {
            parser: typescriptParser,
            parserOptions: {
                project: true,
                sourceType: 'module',
                extraFileExtensions: ['.astro'],
            },
            globals: {
                ...globals.browser,
            },
        },
        plugins: {
            '@typescript-eslint': typescriptEslint,
        },
        rules: {
            ...typescriptEslint.configs['recommended'].rules,
            '@typescript-eslint/no-unused-vars': 'warn',
            '@typescript-eslint/no-explicit-any': 'warn',
        },
    },
    {
        files: ['**/*.astro'],
        languageOptions: {
            parser: astroParser,
            parserOptions: {
                parser: typescriptParser,
                sourceType: 'module',
            },
            globals: {
                ...globals.browser,
            },
        },
        rules: {
            'astro/no-unused-define-vars-in-style': 'error',
            'astro/no-conflict-set-directives': 'error',
        },
    },
]
