import js from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['dist/', 'tsconfig*.json'] },
  js.configs.recommended,
  tseslint.configs.recommended,
  {
    rules: {
      'no-console': 'error',
    },
  },
);
