# Developer Portfolio (Student Project)

A responsive developer portfolio built with vanilla HTML, CSS, and JavaScript.
The site presents my background, skills, experience, and contact details, and is structured
as a multi-page portfolio using the Solid State base theme.

## Tech Stack
- HTML (semantic structure)
- CSS split into `assets/css/base.css`, `assets/css/layout.css`, `assets/css/components.css`, `assets/css/utilities.css`
- JavaScript (vanilla only, `assets/js/main.js`)

## Validation (Regex Library)
Form validation uses a small regex helper in `assets/js/validators.js` (name, email, and min‑length checks) and vanilla JS in `assets/js/main.js`.

## Where To Find Things
- Pages: `index.html` (home), `generic.html` (about), `elements.html` (experience/projects), `contact.html` (contact + weather), `privacy.html` (privacy policy)
- Styles: `assets/css/base.css` (variables + typography + form base), `assets/css/layout.css` (layout + header + grids), `assets/css/components.css` (cards, sliders, accordions, weather), `assets/css/utilities.css` (responsive + overrides)
- Scripts: `assets/js/main.js` (menu, sliders, accordion, weather fetch, form validation + Formspree), `assets/js/validators.js` (regex helpers)
- Assets: `images/` (content images), `assets/webfonts/` (icon fonts)

## HTTPS
External resources (Formspree and Lucide) are loaded over HTTPS.

## Credits
- Icons: Lucide (loaded via CDN).

## Requirements Checklist

### Must Have (G)
- [x] Vanilla HTML, CSS, and JavaScript only — `index.html`, `generic.html`, `elements.html`, `contact.html`, `privacy.html`, `assets/js/main.js`
- [ ] CV download button — not implemented
- [x] Navbar — all pages `header` + `.top-nav` (`index.html`, `generic.html`, `elements.html`, `contact.html`, `privacy.html`)
- [x] Social links (GitHub/LinkedIn) — footer links in all pages
- [x] About Me section — `generic.html`
- [x] Skills section — `index.html` and `generic.html`
- [ ] Portfolio projects with GitHub + live demo links — missing live demo/GitHub links for each project
- [ ] References/Testimonials section — not implemented
- [x] Contact form that sends an email — `contact.html` + `assets/js/main.js` (Formspree)
- [x] Footer — all pages
- [x] Uses Flex/Grid layout — `assets/css/layout.css`, `assets/css/components.css`, `assets/css/utilities.css`
- [x] Input validation for form (no invalid data) — `contact.html`, `assets/js/main.js`, `assets/js/validators.js`
- [x] Tested for edge cases and errors (manual + automated testing below) — “Testing” sections
- [x] README with methods/principles (this file)

### Nice to Have (VG)
- [ ] Feature branches + meaningful git commits
- [x] Validation warnings and retry on invalid input — `assets/js/main.js`
- [x] Strong UX/UI (consistent, responsive, accessible) — spacing/typography in `assets/css/base.css`, layout in `assets/css/layout.css`, components in `assets/css/components.css`, a11y updates in HTML/JS/CSS
- [x] External weather API (current temp + location + icon) — `contact.html` + `assets/js/main.js`
- [x] Responsive layout — media queries in `assets/css/utilities.css` and component layouts

## Key Sections (Current)
- Home/Intro
- About
- Skills (technical + business)
- Experience / Projects
- Contact + Footer

## Icons
Icons: Uses the Lucide icon library to render `<i data-lucide>` placeholders as SVGs.

## Requirements Mapping (Your List)
- (G1) Appen ska testas ordentligt: manual checklist + automated tests (Playwright, Lighthouse CI, HTML/CSS lint) — see “Testing”.
- (G2) Omöjligt att mata in felaktiga uppgifter: HTML5 constraints + regex + JS validation — `contact.html`, `assets/js/main.js`, `assets/js/validators.js` (client-side).
- (G4) Appen ska köras utan fel: no build step; static HTML/CSS/JS; core logic in `assets/js/main.js`.
- (G5) Best practices: semantic HTML in all pages; reusable CSS in `assets/css/base.css`, `assets/css/layout.css`, `assets/css/components.css`, `assets/css/utilities.css`; vanilla JS in `assets/js/main.js`.
- (G6) README med metoder/principer: see “Methods/Principles”.
- (G7) Använd flex/grid: `assets/css/layout.css`, `assets/css/components.css`.
- (VG10) Felaktig inmatning visar varningar + retry: inline errors + focus to first invalid field — `assets/js/main.js`.
- (VG11) UX/UI användarvänlig och snygg: consistent layout/spacing + accessibility improvements — CSS files above + HTML updates.
- (VG12) Professionell klass (genomförande/dokumentation/testning): documentation + manual + automated testing included here.
- (VG13) Externt väder-API: Open‑Meteo fetch in `assets/js/main.js`, rendered in `contact.html`.
- (VG14) Responsive: media queries in `assets/css/utilities.css` and component layouts.

## Methods / Principles
- Semantic HTML structure with clear sections and headings.
- Separation of concerns: layout, components, utilities split into CSS files.
- Progressive enhancement: JS adds behavior, core content works without JS.
- Accessibility basics: labels, aria attributes, keyboard-friendly menus.
- Client-side validation with clear feedback and retry flow.

## Testing (Manual)
Last tested: 2026-02-13.
- Contact form: required fields, invalid email, short message, invalid name, invalid phone pattern, consent checkbox.
- Error UX: inline warnings, focus to first invalid field, retry path.
- Formspree fetch: success + network error messaging (simulated by blocking request).
- Weather widget: success render and failure fallback text.
- Mobile menu: open/close, Escape key, submenu accordion.
- Sliders: clients and roles scroll buttons.
- Responsive layout: 1200px, 980px, 736px, 375px widths.

## Testing (Automated)
Automated tests are configured to validate behavior, performance, accessibility, and code quality.
Last automated run: 2026-02-14 (LHCI assertions passed, HTML/CSS lint passed).

**Why**
- Ensure core UX flows don’t regress (form, menu, responsiveness).
- Measure performance/accessibility regularly.
- Keep HTML/CSS clean and standards‑compliant.

**How To Run**
- Install dependencies: `npm install`
- Run all automated checks: `npm test`
- E2E (Playwright): `npm run e2e`
- Lighthouse CI: `npm run lhci`
- HTML lint: `npm run lint:html`
- CSS lint: `npm run lint:css`

**Where**
- Playwright config: `playwright.config.js`
- E2E tests: `tests/e2e.spec.js`
- Lighthouse CI config: `lighthouserc.json`
- HTML lint rules: `.htmlvalidate.json`
- CSS lint rules: `.stylelintrc.cjs`

## Accessibility Notes
- Skip to content link: implemented (`.skip-link` in `assets/css/base.css`, link in all pages).
- Focus styles: implemented in `assets/css/base.css`.
- Inline error `aria-live`: implemented in `assets/js/main.js`.

---
