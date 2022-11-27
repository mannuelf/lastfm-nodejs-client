import { test, expect, type Page } from '@playwright/test';
import fetch, { Request } from 'cross-fetch';

const ENV_EXAMPLE = fetch('./.env.example');

console.log(ENV_EXAMPLE);
