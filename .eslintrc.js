const fs = require('fs');

const prettierOptions = JSON.parse(fs.readFileSync('./.prettierrc', 'utf8'));

module.exports = {
  parser: '@typescript-eslint/parser',
  env: {
    "browser": true,
    "es2021": true
  },
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "airbnb-typescript/base",
    "prettier",
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
    project: "./tsconfig.json"
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: ['.ts', '.js'],
      },
    },
  },
  ignorePatterns: ['.eslintrc.js'],
  plugins: [
    "@typescript-eslint",
    "prettier"
  ],
  rules: {
    "require-jsdoc": "off",

    "no-plusplus": ["error", { "allowForLoopAfterthoughts": true }],
    "no-negated-condition": "warn",
    "default-case": "off",
    "no-use-before-define": "off",
    "class-methods-use-this": "off",
    "no-shadow": "warn",

    "complexity": ["warn", 20],
    "max-nested-callbacks": "warn",

    "operator-linebreak": "off",
    "implicit-arrow-linebreak": "off",
    "max-len": "off",

    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/ban-types": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/array-type": [
      "error",
      { "default": "array-simple", "readonly": "array-simple" }
    ],
    "@typescript-eslint/consistent-type-assertions": "error",
    "@typescript-eslint/no-array-constructor": "error",
    "@typescript-eslint/no-empty-interface": "error",
    "@typescript-eslint/no-unused-vars": ["warn", { "ignoreRestSiblings": true }],
    "@typescript-eslint/no-use-before-define": [
      "error",
      { "functions": false, "classes": true, "variables": true }
    ],
    "@typescript-eslint/no-var-requires": 0,
    "@typescript-eslint/no-explicit-any": 0,
    "@typescript-eslint/naming-convention": 0,

    "import/prefer-default-export": "off",
    "import/no-unresolved": "off",
    "import/extensions": "off",
    "import/no-extraneous-dependencies": "off",
    "newline-before-return": "error",
    "import/namespace": "off",

    'prettier/prettier': ['error', prettierOptions],
    "arrow-body-style": 0,
    "prefer-arrow-callback": 0
  }
}
