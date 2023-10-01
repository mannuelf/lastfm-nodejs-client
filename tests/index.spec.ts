import npmPackage from '../src/index';

import { expect, test } from '@playwright/test';

test.describe('NPM Package', () => {
  test('should be an object', () => {
    expect(npmPackage).toBeTruthy();
  });
});
