import { test, expect } from '@playwright/test';
import path from 'path';

// Load environment variables natively (Node.js 20.12+)
const envPath = process.env.CI ? '.env.example' : '.env';
try {
  process.loadEnvFile(
    path.resolve(new URL('.', import.meta.url).pathname, '..', envPath)
  );
} catch (error) {
  // If it's already loaded via CLI flag or the file doesn't exist, we can ignore
}

const { LASTFM_API_BASE_URL, LASTFM_API_KEY } = process.env;

const environmentVarWarning =
  '❗ No environment variable found, use the .env.example file to create your own .env file with required properties and values.';

test.describe('Environment variables present and configured', async () => {
  test('LASTFM_API_BASE_URL is present', async () => {
    expect(LASTFM_API_BASE_URL, environmentVarWarning).toBeDefined();
  });

  test('LASTFM_API_KEY is present', async () => {
    expect(LASTFM_API_KEY, environmentVarWarning).toBeDefined();
  });
});
