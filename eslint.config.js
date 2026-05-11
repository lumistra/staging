import { fixupPluginRules } from '@eslint/compat';
import js from '@eslint/js';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import nextConfig from 'eslint-config-next/core-web-vitals';
import importPlugin from 'eslint-plugin-import';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import globals from 'globals';

// next/core-web-vitals already exports flat config in Next.js 16.
const nextConfigArray = Array.isArray(nextConfig) ? nextConfig : [nextConfig];

// Collect the @next/next plugin (and others) registered by Next.js config
const nextPlugins = nextConfigArray.reduce((acc, cfg) => {
  if (cfg.plugins) Object.assign(acc, cfg.plugins);

  return acc;
}, {});

/* eslint-disable import/no-anonymous-default-export */
export default [
  {
    ignores: ['.next/**', 'node_modules/**', 'out/**', 'public/**', 'eslint.config.js'],
  },
  // Base JS recommended
  js.configs.recommended,
  // Register all plugins once; wrap legacy plugins to shim deprecated ESLint ≤8 context APIs.
  {
    plugins: {
      '@next/next': nextPlugins['@next/next'],
      react: fixupPluginRules(reactPlugin),
      'react-hooks': fixupPluginRules(reactHooksPlugin),
      'jsx-a11y': fixupPluginRules(jsxA11yPlugin),
      import: fixupPluginRules(importPlugin),
      '@typescript-eslint': tsPlugin,
    },
  },
  // Include Next.js rules (strip parser and plugin registrations; we manage them above)
  ...nextConfigArray.map(({ plugins: _plugins, languageOptions: _lo, ...rest }) => rest),
  // TypeScript-specific: use @typescript-eslint v8 flat config
  ...tsPlugin.configs['flat/recommended'].map((cfg) => ({
    ...cfg,
    files: ['**/*.ts', '**/*.tsx'],
  })),
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: ['./tsconfig.json'],
        sourceType: 'module',
      },
    },
  },
  // Shared rules for all JS/TS files
  {
    files: ['**/*.{js,jsx,ts,tsx,mjs,cjs}'],
    settings: {
      react: { version: 'detect' },
    },
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
        assert: true,
      },
    },
    rules: {
      // ── Arrow / functions ─────────────────────────────────────────
      'arrow-parens': 0,
      'class-methods-use-this': 0,
      'consistent-return': 0,
      'curly': 0,
      'function-paren-newline': 0,
      'global-require': 0,
      'prefer-rest-params': 0,
      'prefer-template': 0,
      'space-before-function-paren': 0,
      'require-await': 'error',

      // ── Imports ───────────────────────────────────────────────────
      'import/extensions': 0,
      'import/no-cycle': 0,
      'import/no-extraneous-dependencies': 0,
      'import/no-named-as-default': 0,
      'import/no-named-as-default-member': 0,
      'import/no-unresolved': [2],
      'import/prefer-default-export': 0,
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', ['index', 'parent', 'sibling', 'object'], 'type', 'unknown'],
          pathGroups: [
            { pattern: 'react', group: 'builtin', position: 'before' },
            { pattern: 'next*', group: 'builtin', position: 'before' },
            { pattern: 'next*', group: 'external', position: 'before' },
            { pattern: '*next*', group: 'external', position: 'before' },
            { pattern: 'react*', group: 'external', position: 'before' },
            { pattern: '*react*', group: 'external', position: 'before' },
          ],
          pathGroupsExcludedImportTypes: ['react', 'next'],
          'newlines-between': 'never',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],

      // ── a11y ──────────────────────────────────────────────────────
      'jsx-a11y/anchor-is-valid': 0,
      'jsx-a11y/click-events-have-key-events': 0,
      'jsx-a11y/control-has-associated-label': 0,
      'jsx-a11y/label-has-associated-control': [1, { required: { some: ['nesting', 'id'] } }],
      'jsx-a11y/label-has-for': 0,
      'jsx-a11y/no-static-element-interactions': 0,

      // ── Formatting ────────────────────────────────────────────────
      'jsx-quotes': ['error', 'prefer-double'],
      'linebreak-style': 0,
      'max-len': 0,
      'semi': 1,
      'padding-line-between-statements': ['error', { blankLine: 'always', prev: '*', next: 'return' }],

      // ── General JS ───────────────────────────────────────────────
      'no-case-declarations': 0,
      'no-console': 1,
      'no-else-return': 0,
      'no-extra-bind': 1,
      'no-extra-semi': 1,
      'no-irregular-whitespace': 1,
      'no-multi-spaces': 1,
      'no-param-reassign': 0,
      'no-plusplus': 0,
      'no-restricted-syntax': [0, 'ForInStatement'],
      'no-sparse-arrays': 1,
      'no-undef': 1,
      'no-underscore-dangle': 0,
      'no-unexpected-multiline': 1,
      'no-unreachable': 0,

      // ── React ─────────────────────────────────────────────────────
      'react/react-in-jsx-scope': 0,
      'react/button-has-type': 0,
      'react/default-props-match-prop-types': 0,
      'react/destructuring-assignment': 0,
      'react/display-name': 0,
      'react/forbid-prop-types': 0,
      'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
      'react/jsx-curly-newline': 0,
      'react/jsx-no-bind': 0,
      'react/jsx-no-target-blank': 0,
      'react/jsx-one-expression-per-line': 0,
      'react/jsx-props-no-spreading': 0,
      'react/no-access-state-in-setstate': 0,
      'react/prefer-stateless-function': 0,
      'react/require-default-props': 0,
      'react/sort-comp': 0,
      'react/state-in-constructor': 0,
      'react/static-property-placement': 0,
      'react/prefer-exact-props': 0,

      // ── React Hooks ───────────────────────────────────────────────
      'react-hooks/rules-of-hooks': 2,
      'react-hooks/exhaustive-deps': 1,

      // ── Sort ─────────────────────────────────────────────────────
      'sort-imports': [
        'error',
        {
          ignoreCase: false,
          ignoreDeclarationSort: true,
          ignoreMemberSort: false,
          memberSyntaxSortOrder: ['single', 'multiple', 'all', 'none'],
          allowSeparatedGroups: false,
        },
      ],
    },
  },
  // Jest globals for test/mock files
  {
    files: ['**/__tests__/**/*', '**/*.test.*', '**/__mocks__/**/*', '**/jest.setup.*'],
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
  },
  // TypeScript-only rule overrides
  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      // Relax TS rules not enforced in original config
      '@typescript-eslint/no-explicit-any': 0,
      '@typescript-eslint/no-unsafe-function-type': 0,

      // TypeScript equivalents for JS rules
      'no-shadow': 0,
      '@typescript-eslint/no-shadow': 'error',
      'no-use-before-define': 0,
      '@typescript-eslint/no-use-before-define': ['error'],
      'no-unused-vars': 0,
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'no-useless-constructor': 0,
      '@typescript-eslint/no-useless-constructor': 'error',
      'default-param-last': 0,
      '@typescript-eslint/default-param-last': 'error',
      'dot-notation': 0,
      '@typescript-eslint/dot-notation': ['error'],
      'require-await': 0,
      '@typescript-eslint/require-await': 'error',
      '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],
    },
  },
];
