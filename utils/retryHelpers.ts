import { APIResponse } from '@playwright/test';

export async function withRetry(fn: () => Promise<APIResponse>, retries = 5) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    const response = await fn();
    if (response.ok()) {
      return response;
    }
    console.warn(`Request attempt ${attempt} failed with status ${response.status()}`);
  }
  throw new Error(`Failed after ${retries} attempts`);
}