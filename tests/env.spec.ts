import { test, expect, type Page } from '@playwright/test';
import fetch, { Request } from 'cross-fetch';

const ENV_EXAMPLE = fetch('./.env.example');

console.log('🧪 ENV');

test.describe('Environment variables present and confiured', () => {
  test('.env file is present', async () => {});
  test('.env file has required variables', async () => {});
});
