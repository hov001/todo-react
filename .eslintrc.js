module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'airbnb'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'no-console': ['warn'],
    semi: ['off'],
    quotes: ['error', 'single'],
    curly: ['off'],
    'prefer-stateless-function': ['off'],
    'no-useless-constructor': ['off'],
    'no-unused-state': ['off'],
  },
}
