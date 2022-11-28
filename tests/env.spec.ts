import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();
dotenv.config({ path: path.resolve(__dirname, '..', process.env.CI ? '.env.example' : '.env') });

const { LASTFM_API_BASE_URL, LASTFM_API_KEY } = process.env;
console.log(LASTFM_API_BASE_URL, LASTFM_API_KEY);

let environmentVarWarning =
  '❗ No environment variable found, use the .env.example file to create your own .env file with required properties adn values.';

test.describe('Environment variables present and configured', async () => {
  test('LASTFM_API_BASE_URL is present', async () => {
    expect(LASTFM_API_BASE_URL, environmentVarWarning).toBeDefined();
  });

  test('LASTFM_API_KEY is present', async () => {
    expect(LASTFM_API_KEY, environmentVarWarning).toBeDefined();
  });
});
