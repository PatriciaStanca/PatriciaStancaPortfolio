const { test, expect } = require('@playwright/test');

test('mobile menu toggles on small screens', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('index.html');

  const menuToggle = page.locator('.menu-toggle');
  await expect(menuToggle).toBeVisible();

  await menuToggle.click();
  await expect(page.locator('body')).toHaveClass(/is-menu-visible/);
});

test('contact form shows validation errors and allows resubmission', async ({ page }) => {
  await page.route('https://formspree.io/*', (route) =>
    route.fulfill({ status: 200, contentType: 'application/json', body: '{}' })
  );

  await page.goto('contact.html');
  await page.getByRole('button', { name: 'Send Email' }).click();

  const errors = page.locator('.form-error');
  await expect(errors.first()).toBeVisible();
  const errorCount = await errors.count();
  expect(errorCount).toBeGreaterThan(0);
  await expect(page.locator('#contact-first-name')).toHaveAttribute('aria-invalid', 'true');

  await page.fill('#contact-first-name', 'Patricia');
  await page.fill('#contact-last-name', 'Stanca');
  await page.fill('#contact-email', 'patricia@example.com');
  await page.fill('#contact-message', 'Hello! This is a test message.');
  await page.check('#contact-consent');

  await page.getByRole('button', { name: 'Send Email' }).click();
  await expect(page.locator('.form-feedback')).toHaveText('Thanks! Your message has been sent.');
});

test('project archive stays compact until requested', async ({ page }) => {
  await page.goto('elements.html');

  const archiveToggle = page.getByRole('button', { name: /List of all projects/i });
  const workArchive = page.locator('#work-project-archive');
  await expect(archiveToggle).toHaveAttribute('aria-expanded', 'false');
  await expect(workArchive).toBeHidden();

  await archiveToggle.click();
  await expect(archiveToggle).toHaveAttribute('aria-expanded', 'true');
  await expect(workArchive).toBeVisible();
  await expect(workArchive.getByText('ASK Core', { exact: false }).first()).toBeVisible();
  await expect(workArchive.getByText('SAP ByDesign', { exact: false }).first()).toBeVisible();
});

test('Personal Projects navigation selects the personal project view', async ({ page }) => {
  await page.goto('elements.html#personal-projects');

  await expect(page.getByRole('button', { name: 'Personal' })).toHaveAttribute('aria-pressed', 'true');
  await expect(page.getByRole('button', { name: 'Work' })).toHaveAttribute('aria-pressed', 'false');
});

test('Previous Work uses the shared scroll reveal motion', async ({ page }) => {
  await page.goto('elements.html');

  const previousWork = page.locator('#previous-work');
  await previousWork.scrollIntoViewIfNeeded();
  const card = previousWork.locator('.role-card').first();
  await expect(card).toHaveClass(/reveal/);
  await expect(card).toHaveClass(/is-visible/);
  await expect(card).toHaveCSS('translate', '0px');
});
