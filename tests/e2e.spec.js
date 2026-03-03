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

test('weather widget renders current data', async ({ page }) => {
  await page.addInitScript(() => {
    const originalFetch = window.fetch;
    window.fetch = (input, init) => {
      const url = typeof input === 'string' ? input : input.url;
      if (url && url.startsWith('https://api.openweathermap.org/')) {
        return Promise.resolve(
          new Response(
            JSON.stringify({ main: { temp: 5.4 }, weather: [{ icon: '01d', description: 'clear sky' }] }),
            { status: 200, headers: { 'Content-Type': 'application/json' } }
          )
        );
      }
      return originalFetch(input, init);
    };
  });

  await page.goto('contact.html');
  await expect(page.locator('.weather-temp')).toHaveText('5°C');
});
