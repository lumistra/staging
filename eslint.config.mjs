import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default defineConfig([globalIgnores(['**/node_modules', '**/.next', '**/out', 'next-env.d.ts']), {
  extends: [
    ...compat.extends('next/core-web-vitals'),
    ...compat.extends('eslint:recommended'),
    ...compat.extends('eslint-config-airbnb'),
  ],

  plugins: {
    '@typescript-eslint': typescriptEslint,
  },

  languageOptions: {
    globals: {
      ...globals.browser,
      window: true,
      document: true,
      HTMLElement: true,
      localStorage: true,
      sessionStorage: true,
      assert: true,
    },

    parser: tsParser,
  },

  rules: {
    'arrow-parens': 0,
    'class-methods-use-this': 0,
    'consistent-return': 0,
    curly: 0,
    'function-paren-newline': 0,
    'global-require': 0,
    'import/extensions': 0,
    'import/no-cycle': 0,
    'import/no-extraneous-dependencies': 0,
    'import/no-named-as-default': 0,
    'import/no-named-as-default-member': 0,
    'import/no-unresolved': [2],
    'import/prefer-default-export': 0,
    'jsx-a11y/anchor-is-valid': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/control-has-associated-label': 0,

    'jsx-a11y/label-has-associated-control': [1, {
      required: {
        some: ['nesting', 'id'],
      },
    }],

    'jsx-a11y/label-has-for': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'jsx-quotes': ['error', 'prefer-double'],
    'linebreak-style': 0,
    'max-len': 0,
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
    'prefer-rest-params': 0,
    'prefer-template': 0,

    'padding-line-between-statements': ['error', {
      blankLine: 'always',
      prev: '*',
      next: 'return',
    }],

    'react/react-in-jsx-scope': 0,
    'react/button-has-type': 0,
    'react/default-props-match-prop-types': 0,
    'react/destructuring-assignment': 0,
    'react/forbid-prop-types': 0,

    'react/jsx-filename-extension': [1, {
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    }],

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
    'react-hooks/rules-of-hooks': 2,
    'react-hooks/exhaustive-deps': 1,
    'space-before-function-paren': 0,
    semi: 1,
    'require-await': 'error',

    '@typescript-eslint/consistent-type-imports': ['error', {
      prefer: 'type-imports',
    }],

    'import/order': ['error', {
      groups: [
        'builtin',
        'external',
        'internal',
        ['index', 'parent', 'sibling', 'object'],
        'type',
        'unknown',
      ],

      pathGroups: [{
        pattern: 'react',
        group: 'builtin',
        position: 'before',
      }, {
        pattern: 'next*',
        group: 'builtin',
        position: 'before',
      }, {
        pattern: 'next*',
        group: 'external',
        position: 'before',
      }, {
        pattern: '*next*',
        group: 'external',
        position: 'before',
      }, {
        pattern: 'react*',
        group: 'external',
        position: 'before',
      }, {
        pattern: '*react*',
        group: 'external',
        position: 'before',
      }],

      pathGroupsExcludedImportTypes: ['react', 'next'],
      'newlines-between': 'never',

      alphabetize: {
        order: 'asc',
        caseInsensitive: true,
      },
    }],

    'sort-imports': ['error', {
      ignoreCase: false,
      ignoreDeclarationSort: true,
      ignoreMemberSort: false,
      memberSyntaxSortOrder: ['single', 'multiple', 'all', 'none'],
      allowSeparatedGroups: false,
    }],
  },
}, {
  files: ['**/*.ts', '**/*.tsx'],
  extends: [...compat.extends('eslint-config-airbnb-typescript')],

  languageOptions: {
    ecmaVersion: 5,
    sourceType: 'script',

    parserOptions: {
      project: ['./tsconfig.json'],
    },
  },
}]);
