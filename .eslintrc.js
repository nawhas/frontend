module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
    '@vue/typescript',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // don't require .vue extension when importing
    'import/extensions': ['error', 'always', {
      js: 'never',
      ts: 'never',
      vue: 'always',
    }],
    'max-len': ['error', { code: 120, ignoreUrls: true }],
    'no-restricted-syntax': 0,
    'no-shadow': 0,
    'arrow-parens': ['error', 'always'],
    'no-param-reassign': ['error', {
      props: true,
      ignorePropertyModificationsFor: [
        'acc', // for reduce accumulators
        'e', // for e.returnvalue
        'ctx', // for Koa routing
        'req', // for Express requests
        'request', // for Express requests
        'res', // for Express responses
        'response', // for Express responses
        '$scope', // for Angular 1 scopes
        'state', // for Vuex mutations
      ],
    }],
  },
  parserOptions: {
    parser: 'typescript-eslint-parser',
  },
};
