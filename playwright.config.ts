import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',                
  timeout: 30 * 1000,                // Each test timeout (30s)
  expect: {
    timeout: 5000                    // Timeout for expect() assertions (5s)
  },
  fullyParallel: false,              // Run tests in parallel
  retries: 0,                        // Retry failing tests (set >0 for CI)
  workers: 1,                        // Default: # of CPU cores (set to 1 for debug)
  reporter: 'html',                  // Report format (html | list | dot | etc.)
  use: {
    baseURL: 'http://localhost:3000',
    headless: false,
    viewport: { width: 1280, height: 720 },
    actionTimeout: 0,
    ignoreHTTPSErrors: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium' },
    },
    // {
    //   name: 'firefox',
    //   use: { browserName: 'firefox' },
    // },
    // {
    //   name: 'webkit',
    //   use: { browserName: 'webkit' },
    // },
    {
      name: 'api',
      use: {},
      testMatch: 'tests/api/*.spec.ts'
    },
  ],
});