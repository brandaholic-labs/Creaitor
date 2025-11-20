import { test, expect } from '@playwright/test';

test.describe('Layout and Navigation', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to dashboard (will work once we have auth, for now just test UI)
    await page.goto('/dashboard');
  });

  test('should display main layout with sidebar and topbar', async ({ page }) => {
    // Check sidebar is visible
    await expect(page.locator('aside')).toBeVisible();

    // Check topbar is visible
    await expect(page.locator('header')).toBeVisible();

    // Check Creaitor logo
    await expect(page.getByText('Creaitor')).toBeVisible();

    // Check active brand display
    await expect(page.getByText(/Fitness Studio XY|Test Brand/i)).toBeVisible();
  });

  test('should navigate between pages', async ({ page }) => {
    // Click Dashboard link
    await page.getByRole('link', { name: /dashboard/i }).click();
    await expect(page).toHaveURL('/dashboard');
    await expect(page.getByRole('heading', { name: /dashboard/i })).toBeVisible();

    // Click Brands link
    await page.getByRole('link', { name: /brands/i }).click();
    await expect(page).toHaveURL('/brands');
    await expect(page.getByRole('heading', { name: /brands/i })).toBeVisible();

    // Click Calendar link
    await page.getByRole('link', { name: /calendar/i }).click();
    await expect(page).toHaveURL('/calendar');
    await expect(page.getByRole('heading', { name: /calendar/i })).toBeVisible();

    // Click Settings link
    await page.getByRole('link', { name: /settings/i }).click();
    await expect(page).toHaveURL('/settings');
    await expect(page.getByRole('heading', { name: /settings/i })).toBeVisible();
  });

  test('should highlight active route in sidebar', async ({ page }) => {
    // Navigate to Dashboard
    await page.getByRole('link', { name: /dashboard/i }).click();

    // Check Dashboard link has active styling
    const dashboardButton = page.getByRole('link', { name: /dashboard/i }).locator('button');
    await expect(dashboardButton).toHaveClass(/bg-brand/);

    // Navigate to Brands
    await page.getByRole('link', { name: /brands/i }).click();

    // Check Brands link has active styling
    const brandsButton = page.getByRole('link', { name: /brands/i }).locator('button');
    await expect(brandsButton).toHaveClass(/bg-brand/);
  });

  test('should toggle sidebar on mobile', async ({ page }) => {
    // Set viewport to mobile size
    await page.setViewportSize({ width: 375, height: 667 });

    // Sidebar should be hidden initially on mobile
    const sidebar = page.locator('aside');
    await expect(sidebar).not.toBeVisible();

    // Click hamburger menu button
    await page.getByRole('button', { name: /toggle sidebar/i }).click();

    // Sidebar should be visible now
    await expect(sidebar).toBeVisible();

    // Click overlay to close
    await page.locator('div[aria-hidden="true"]').click();

    // Sidebar should be hidden again
    await expect(sidebar).not.toBeVisible();
  });

  test('should display user menu dropdown', async ({ page }) => {
    // Click user avatar button
    const userMenuButton = page.locator('header').getByRole('button').last();
    await userMenuButton.click();

    // Check dropdown menu items
    await expect(page.getByText(/profile/i)).toBeVisible();
    await expect(page.getByText(/settings/i)).toBeVisible();
    await expect(page.getByText(/log out/i)).toBeVisible();
  });
});
