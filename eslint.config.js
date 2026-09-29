import js from '@eslint/js';
import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';
import react from '@eslint-react/eslint-plugin';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';

export default defineConfig([
    globalIgnores(['dist/**', 'node_modules/**']),
    {
        files: ['**/*.{ts,tsx}'],
        extends: [
            js.configs.recommended,
            tseslint.configs.recommended,
            react.configs['recommended-typescript'],
            reactRefresh.configs.vite,
        ],
        languageOptions: {
            globals: globals.browser,
        },
        plugins: {
            'react-hooks': reactHooks,
        },
        rules: {
            'react-hooks/rules-of-hooks': 'error',
            'react-hooks/exhaustive-deps': 'error',
            indent: ['error', 4, { SwitchCase: 1 }],
            quotes: ['error', 'single'],
            semi: ['error', 'always'],
        },
    },
    {
        files: ['eslint.config.js'],
        extends: [js.configs.recommended],
        languageOptions: { globals: globals.node },
    },
]);
