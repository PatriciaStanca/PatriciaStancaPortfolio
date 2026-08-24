const { test, expect } = require('@playwright/test');

test('mobile menu toggles on small screens', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('index.html');

  const menuToggle = page.locator('.menu-toggle');
  await expect(menuToggle).toBeVisible();

  await menuToggle.click();
  await expect(page.locator('body')).toHaveClass(/is-menu-visible/);
  await expect(page.locator('#menu').getByRole('link', { name: 'About', exact: true })).toBeVisible();
  await expect(page.locator('#menu')).not.toContainText('About Me');
});

test('first visible section renders immediately without reveal delay', async ({ page }) => {
  for (const path of ['index.html', 'generic.html', 'elements.html', 'contact.html', 'cv.html']) {
    await page.goto(path);
    await expect(page.locator('.site-main > section:first-child')).not.toHaveClass(/reveal/);
    await expect(page.locator('.site-main > section:first-child .reveal')).toHaveCount(0);
  }
});

test('homepage progress heading stays on one line on desktop', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('index.html');

  const lineCount = await page.getByRole('heading', { name: 'From complexity to practical progress.' }).evaluate((heading) => {
    const styles = getComputedStyle(heading);
    return heading.getBoundingClientRect().height / Number.parseFloat(styles.lineHeight);
  });
  expect(lineCount).toBeLessThanOrEqual(1.1);
});

test('cinematic project cards do not animate against scroll updates', async ({ page }) => {
  await page.goto('/index.html');
  const stage = page.locator('[data-cinematic-stage]');
  await stage.scrollIntoViewIfNeeded();
  await expect(stage).toHaveClass(/is-stage-active/);

  const card = page.locator('[data-cinematic-card]').first();
  const transitionProperty = await card.evaluate((element) => getComputedStyle(element).transitionProperty);
  expect(transitionProperty).not.toContain('transform');
  await expect(card.locator('img')).toHaveAttribute('loading', 'eager');
});

test('mobile menu opens at the top when the page is scrolled to the bottom', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('elements.html');
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
  await page.locator('.menu-toggle').click();
  const menu = page.locator('#menu');
  await expect(menu.getByRole('link', { name: 'Home' })).toBeVisible();
  await expect(menu).toHaveJSProperty('scrollTop', 0);
  const menuTop = await menu.evaluate((element) => element.getBoundingClientRect().top);
  expect(menuTop).toBeGreaterThanOrEqual(0);
  expect(menuTop).toBeLessThan(160);
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

test('contact intro places the heading before the image', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('contact.html');

  const order = await page.locator('.contact-intro').evaluate((intro) =>
    Array.from(intro.children).map((element) => element.className)
  );
  expect(order[0]).toContain('section-kicker');
  expect(order[1]).toContain('contact-title');
  expect(order[2]).toContain('contact-visual');
  await expect(page.locator('.contact-intro .section-kicker')).toHaveText('Contact Me');
  const headingLines = await page.locator('.contact-title').evaluate((heading) => {
    const styles = getComputedStyle(heading);
    return heading.getBoundingClientRect().height / Number.parseFloat(styles.lineHeight);
  });
  expect(headingLines).toBeLessThanOrEqual(2.1);
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

test('Previous Work stays stable without scroll reveal motion', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('elements.html');

  const previousWork = page.locator('#previous-work');
  await previousWork.scrollIntoViewIfNeeded();
  const card = previousWork.locator('.role-card').first();
  await expect(previousWork.locator('.section-title')).not.toHaveClass(/reveal/);
  await expect(card).not.toHaveClass(/reveal/);
  const titleToLogoGap = await previousWork.evaluate((section) => {
    const title = section.querySelector('.section-title').getBoundingClientRect();
    const logo = section.querySelector('.role-card-visual img').getBoundingClientRect();
    return logo.top - title.bottom;
  });
  expect(titleToLogoGap).toBeGreaterThanOrEqual(14);
  expect(titleToLogoGap).toBeLessThanOrEqual(48);
});

test('Previous Work headings and logos scale down on mobile', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('elements.html');

  const roleHeadingSize = await page.locator('#previous-work .role-header h4').first().evaluate((heading) =>
    Number.parseFloat(getComputedStyle(heading).fontSize)
  );
  const employerLogo = page.locator('#previous-work .role-card-visual img').first();
  const logoBox = await employerLogo.evaluate((logo) => logo.getBoundingClientRect().toJSON());
  expect(roleHeadingSize).toBeLessThanOrEqual(21.6);
  expect(logoBox.width).toBeLessThanOrEqual(145);
  expect(logoBox.height).toBeLessThanOrEqual(46);
});

test('Trusted by logos stay compact on mobile', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('index.html');

  const logos = await page.locator('.trusted-strip img').evaluateAll((images) =>
    images.map((logo) => logo.getBoundingClientRect().toJSON())
  );
  expect(Math.max(...logos.map((logo) => logo.width))).toBeLessThanOrEqual(80);
  expect(Math.max(...logos.map((logo) => logo.height))).toBeLessThanOrEqual(22);
});

test('expanded project archive does not use scroll reveal animation', async ({ page }) => {
  await page.goto('elements.html');

  const archiveToggle = page.getByRole('button', { name: /List of all projects/i });
  await expect(archiveToggle).not.toHaveClass(/reveal/);
  await archiveToggle.click();
  await expect(page.locator('#work-project-archive .accordion-trigger').first()).not.toHaveClass(/reveal/);
});
