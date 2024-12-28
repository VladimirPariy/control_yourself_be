import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";


/** @type {import('eslint').Linter.Config[]} */
export default [
  {files: ["src/**/*.{js,mjs,cjs,ts}"]},
  {
    languageOptions: {
      globals: globals.commonjs, ecmaVersion: 2020
    },
    rules: {
      "no-var": "off",
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': ['error', {argsIgnorePattern: '^_', varsIgnorePattern: "^_", }],
      'prettier/prettier': ['off', {endOfLine: 'auto'}]
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,

];