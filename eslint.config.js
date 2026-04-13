// eslint.config.js
import js from '@eslint/js';
import importPlugin from 'eslint-plugin-import';
import prettier from 'eslint-config-prettier';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import globals from 'globals';

export default [
  js.configs.recommended,
  { ignores: ['node_modules', 'dist', 'example/dist'] },
  {
    files: ['src/**/*.js', 'scripts/**/*.{js,mjs}', 'example/**/*.js'],
    languageOptions: {
      ecmaVersion: 2023,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2023,
      },
    },
    plugins: { import: importPlugin, prettier: eslintPluginPrettier },
    rules: {
      ...js.configs.recommended.rules,
      ...importPlugin.configs.recommended.rules,

      // airbnb-base style

      'array-bracket-spacing': ['error', 'never'],
      'arrow-body-style': ['error', 'as-needed'],
      'arrow-parens': ['error', 'as-needed'],
      'comma-dangle': ['error', 'always-multiline'],
      'no-console': 'warn',
      'no-continue': 'off',
      'no-param-reassign': ['error', { props: false }],
      'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
      'no-underscore-dangle': [
        'error',
        {
          allowAfterThis: true,
          allow: ['__filename', '__dirname'],
        },
      ],
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'no-var': 'error',
      'object-curly-spacing': ['error', 'always'],
      'object-shorthand': ['error', 'always'],
      'prefer-const': ['error', { destructuring: 'all' }],
      'prefer-template': 'error',
      'quote-props': ['error', 'as-needed'],
      eqeqeq: ['error', 'always', { null: 'ignore' }],

      // other stuff
      'prettier/prettier': 'error',
      'import/extensions': ['error', 'ignorePackages', { js: 'always' }],
      'max-len': [
        'error',
        {
          code: 80,
          ignoreComments: true,
          ignoreStrings: true,
          ignoreTemplateLiterals: true,
        },
      ],
      quotes: ['error', 'single', { avoidEscape: true }],
    },
  },
  {
    files: ['scripts/**/*.{js,mjs}'],
    rules: {
      'no-console': 'off',
    },
  },
  /*
   * 📏 File & function size control (optional block)
   *
   * Guidelines:
   * - Ideal: 100–200 lines per responsibility (soft warning)
   * - Acceptable maximum: 400–500 lines per file (hard error)
   *
   * To disable completely:
   * - Comment out this entire block.
   */
  {
    files: ['**/*.js'],
    ignores: [
      '**/tests/**',
      '**/*.spec.js',
      '**/*.test.js',

      // Types/schema files may be naturally verbose
      '**/types.js',
      '**/schema.js',
    ],
    rules: {
      // Hard limit per file
      'max-lines': ['error', { max: 500, skipBlankLines: true, skipComments: true }],

      // Soft limit per function
      'max-lines-per-function': [
        'warn',
        {
          max: 200,
          skipBlankLines: true,
          skipComments: true,
          IIFEs: true,
        },
      ],
    },
  },

  /*
   * 🧩 Soft limits for src/utils/**
   *
   * Utilities should not grow into "dump files",
   * but this must not break CI.
   *
   * To disable:
   * - Comment out this block independently.
   */
  {
    files: ['src/utils/**/*.js'],
    rules: {
      'max-lines': ['warn', { max: 300, skipBlankLines: true, skipComments: true }],
      'max-lines-per-function': [
        'warn',
        {
          max: 150,
          skipBlankLines: true,
          skipComments: true,
          IIFEs: true,
        },
      ],
    },
  },

  prettier,
];
