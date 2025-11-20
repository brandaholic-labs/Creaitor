import { test, expect } from '@playwright/test';

test.describe('Smoke Tests', () => {
  test('homepage has title', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Creaitor/);
  });

  test('health check endpoint is accessible', async ({ request }) => {
    const response = await request.get('/api/health');
    expect(response.ok()).toBeTruthy();
    const json = await response.json();
    expect(json.status).toBe('ok');
  });
});
