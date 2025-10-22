module.exports = {
  root: true,
  env: {
    node: true,
    es2021: true,
    jest: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['./tsconfig.json'],
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
    'prettier',
    'import',
    'node',
    'jest',
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:node/recommended',
    'plugin:jest/recommended',
    'plugin:import/typescript',
    'plugin:prettier/recommended',
  ],
  rules: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        semi: true,
        trailingComma: 'all',
        printWidth: 100,
      },
    ],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-unused-vars': [
        'warn',
        {
            argsIgnorePattern: '^_',
            varsIgnorePattern: '^_',
            caughtErrorsIgnorePattern: '^_',
        },
    ],
    '@typescript-eslint/no-explicit-any': 'warn',
    'node/no-unsupported-features/es-syntax': 'off',
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', ['parent', 'sibling', 'index']],
        'newlines-between': 'always',
      },
    ],
    'node/no-missing-import': 'off',
    'node/no-unpublished-import': 'off',
    'jest/no-disabled-tests': 'warn',
    'jest/no-focused-tests': 'error',
  },
  ignorePatterns: [
    'dist/',
    'coverage/',
    '*.js',
    'node_modules/',
    'prisma/generated/',
  ],
};
