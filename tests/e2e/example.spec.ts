import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/');

  // Expect a title "to contain" a substring.
  // Note: You might need to update this expectation based on the actual title of your landing page
  await expect(page).toHaveTitle(/Creaitor/);
});
