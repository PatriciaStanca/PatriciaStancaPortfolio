// @ts-check
const { defineConfig } = require('@playwright/test');

const baseURL = process.env.PW_BASE_URL || 'http://127.0.0.1:4173';
const useWebServer = !baseURL.startsWith('file://');

module.exports = defineConfig({
  testDir: './tests',
  outputDir: 'dev/test-results',
  timeout: 30000,
  retries: 0,
  use: {
    baseURL,
    headless: process.env.PW_HEADLESS !== 'false',
  },
  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium' },
    },
  ],
  webServer: useWebServer
    ? {
        command: 'npx http-server -a 127.0.0.1 -p 4173 -c-1',
        port: 4173,
        reuseExistingServer: true,
        timeout: 120000,
      }
    : undefined,
});
