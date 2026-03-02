/* eslint-disable no-underscore-dangle */
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';
import globals from 'globals';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  {
    ignores: [
      '**/dist/**',
      '**/node_modules/**',
      '**/.yarn/**',
      '**/.pnpm-store/**',
      '**/src/css/**',
    ],
  },

  ...compat.extends('airbnb-base', 'plugin:prettier/recommended'),

  {
    files: ['**/*.js'],

    languageOptions: {
      ecmaVersion: 2023,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },

    settings: {
      'import/ignore': [
        'node_modules',
        '\\.(coffee|scss|css|less|hbs|svg|json)$',
      ],
    },

    rules: {
      'import/no-extraneous-dependencies': 'off',
      'import/extensions': [
        'error',
        'ignorePackages',
        {
          js: 'always',
          jsx: 'always',
          ts: 'never',
          tsx: 'never',
        },
      ],
      'max-len': [
        'error',
        {
          ignoreComments: true,
          ignoreStrings: true,
          ignoreTemplateLiterals: true,
        },
      ],
      'no-multi-spaces': [
        'error',
        {
          exceptions: {
            BinaryExpression: true,
            VariableDeclarator: true,
          },
        },
      ],
      'no-plusplus': [
        'error',
        {
          allowForLoopAfterthoughts: true,
        },
      ],
      quotes: ['error', 'single'],
    },
  },
];
