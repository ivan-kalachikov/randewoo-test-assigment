module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'jsx-a11y/control-has-associated-label': 0,
    'jsx-a11y/label-has-associated-control': 0,
    'no-param-reassign': ['error', { props: false }],
    'react/prop-types': 0,
  },
};
