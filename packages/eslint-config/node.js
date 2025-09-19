import globals from 'globals';
import baseConfig from './base.js';

export default [
  ...baseConfig,
  {
    languageOptions: {
      globals: globals.node,
    },
    rules: {
      // Node.js específico - permite console
      'no-console': 'off',
    },
  },
];
