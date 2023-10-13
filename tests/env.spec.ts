import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();
dotenv.config({ path: path.resolve(new URL('.', import.meta.url).pathname, '..', process.env.CI ? '.env.example' : '.env') });

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
