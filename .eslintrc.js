module.exports = {
  root: true,
  env: {
    es2021: true,
    node: true,
  },
  extends: ['airbnb-base', 'plugin:@typescript-eslint/recommended', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'import'],
  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
      },
    },
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
  },
  rules: {
    'no-await-in-loop': 'off',
    'no-restricted-syntax': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
    'no-underscore-dangle': ['error', { allow: ['_id'] }],
    'import/extensions': 'off',
    'import/no-unresolved': 'error',
    'no-console': 'off',
  },
};
