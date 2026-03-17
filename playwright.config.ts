import { devices, PlaywrightTestConfig } from '@playwright/test';
import path from 'path';

try {
  process.loadEnvFile(path.resolve(import.meta.dirname, '.env'));
} catch {
  // CI uses env vars injected directly
}

/**
 * See https://playwright.dev/docs/test-configuration.
 */
const config: PlaywrightTestConfig = {
  testDir: './tests',
  timeout: 30 * 1000,
  expect: {
    timeout: 5000,
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    actionTimeout: 0,
    trace: 'on-first-retry',
    headless: true,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  // outputDir: 'test-results/',
  // webServer: {
  //   command: 'npm run dev',
  //   port: 3000,
  // },
};

export default config;
