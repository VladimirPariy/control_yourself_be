import {FlatCompat} from '@eslint/eslintrc';
import {dirname} from 'path';
import {fileURLToPath} from 'url';
import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

/** @type {import('eslint').Linter.Config[]} */
export default [
  {files: ['./src/**/*.{js,mjs,cjs,ts}']},
  ...compat.config({
    parser: '@typescript-eslint/parser',
    rules: {
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': ['error', {argsIgnorePattern: '^_', varsIgnorePattern: '^_'}],
    },
  }),
  {
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.commonjs,
    },
    rules: {
      curly: ['warn', 'all'],
      'no-var': 'off',
      'prettier/prettier': ['off', {endOfLine: 'auto'}],
      'sort-imports': [
        'error',
        {
          allowSeparatedGroups: false,
          ignoreCase: false,
          ignoreDeclarationSort: false,
          ignoreMemberSort: false,
          memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
        },
      ],
      'sort-keys': 'error',
    },
  },

  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];
