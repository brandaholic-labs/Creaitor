import { test, expect } from '@playwright/test';

test.describe('Brand Selector', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/dashboard');
  });

  test('should display active brand in sidebar', async ({ page }) => {
    // Check active brand display
    await expect(page.getByText('Fitness Studio XY')).toBeVisible();
    await expect(page.getByText('Active')).toBeVisible();
  });

  test('should open brand selector dropdown', async ({ page }) => {
    // Click brand selector trigger
    const brandSelectorButton = page.locator('aside').getByRole('button').first();
    await brandSelectorButton.click();

    // Check dropdown is open
    await expect(page.getByText('Your Brands')).toBeVisible();
    await expect(page.getByText('New Brand')).toBeVisible();
  });

  test('should switch active brand', async ({ page }) => {
    // Click brand selector trigger
    const brandSelectorButton = page.locator('aside').getByRole('button').first();
    await brandSelectorButton.click();

    // Click on "Bakery Budapest" brand
    await page.getByText('Bakery Budapest').click();

    // Wait for dropdown to close and brand to update
    await page.waitForTimeout(500);

    // Check that active brand has changed in TopBar
    await expect(page.locator('header').getByText('Bakery Budapest')).toBeVisible();

    // Check that active brand has changed in Sidebar
    await expect(page.locator('aside').getByText('Bakery Budapest')).toBeVisible();
  });

  test('should display brand selector on mobile topbar', async ({ page }) => {
    // Set viewport to mobile size
    await page.setViewportSize({ width: 375, height: 667 });

    // Brand selector should be in TopBar on mobile
    await expect(page.locator('header').getByText(/Fitness Studio XY|Test Brand/i)).toBeVisible();

    // Click brand selector (compact variant)
    const mobileBrandSelector = page.locator('header').getByRole('button').first();
    await mobileBrandSelector.click();

    // Check dropdown is open
    await expect(page.getByText('Your Brands')).toBeVisible();
  });

  test('should persist brand selection across navigation', async ({ page }) => {
    // Select a brand
    const brandSelectorButton = page.locator('aside').getByRole('button').first();
    await brandSelectorButton.click();
    await page.getByText('Tech Startup').click();
    await page.waitForTimeout(500);

    // Navigate to different page
    await page.getByRole('link', { name: /calendar/i }).click();
    await expect(page).toHaveURL('/calendar');

    // Check that brand selection persisted
    await expect(page.getByText('Tech Startup')).toBeVisible();

    // Navigate to another page
    await page.getByRole('link', { name: /brands/i }).click();
    await expect(page).toHaveURL('/brands');

    // Brand should still be Tech Startup
    await expect(page.getByText('Tech Startup')).toBeVisible();
  });
});
