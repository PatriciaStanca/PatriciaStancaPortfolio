# JavaScript Guide

This folder contains the front-end behavior for the portfolio. The JavaScript is written as small browser modules that register themselves and are then started by `main.js`.

## Why This Structure Exists

- `main.js` is the bootstrapper.
- `modules/` contains feature-level behavior.
- `validators.js` contains reusable validation helpers.
- `vendor/` contains third-party browser code loaded locally.

This structure exists so one broken feature does not take down the rest of the page. Each module can fail independently while the site keeps running.

## Startup Flow

1. Page scripts load with `defer`.
2. Individual feature files push initializer functions into `window.SiteApp.initializers`.
3. `main.js` waits until the DOM is ready.
4. `main.js` runs each initializer inside a `try/catch`.
5. Lucide icons are loaded and rendered if needed.
6. Low-priority visual behavior, such as the logo video, starts after the main page is ready.

## Root Files

- `main.js`
  Bootstraps the site, runs registered modules, loads Lucide icons on demand, and schedules non-critical behavior.

- `async-css.js`
  Turns delayed component stylesheets from `media="print"` to active CSS after load, which helps the initial render.

- `validators.js`
  Shared validation helpers used by form-related logic.

### `vendor/`

- `vendor/lucide.min.js`
  Local copy of the Lucide icon library used for icons such as search, phone, weather, and footer symbols.

## `modules/`

- `accordion.js`
  Opens and closes accordion sections and keeps their interaction behavior consistent.

- `contact-form.js`
  Handles client-side validation, user feedback, and submit flow for the contact form.

- `cv-switcher.js`
  Switches between CV language or embedded document states on the CV page.

- `header-dropdown.js`
  Controls the desktop Experience dropdown in the header.

- `logo-slider.js`
  Handles the client/logo carousel interaction.

- `mobile-menu.js`
  Controls the off-canvas or expanded mobile navigation state and submenu behavior.

- `project-reel.js`
  Builds and runs the animated project reel on the home page, including scene transitions and video playback logic.

- `project-video-preview.js`
  Resets preview videos so they always start from a useful point when played.

- `role-slider.js`
  Controls the previous-work slider.

- `scroll-reveal.js`
  Adds reveal-on-scroll behavior by toggling visibility classes when elements enter the viewport.

- `testimonial-slider.js`
  Controls testimonial slider movement and navigation.

- `weather.js`
  Fetches weather data and updates the footer weather widget.

- `search.js`
  Entry point for search behavior. Delegates to the smaller search submodules.

## `modules/search/`

- `core.js`
  Search state and matching logic.

- `ui.js`
  Search drawer rendering, guidance UI, and result display behavior.

- `events.js`
  Event wiring for clicks, typing, focus, close/open actions, and keyboard behavior.

- `index.js`
  Search module assembly point that connects the search parts together.

This search split exists because search mixes state, DOM rendering, and event handling. Keeping those concerns separate makes it easier to debug and change one part without rewriting the others.

## How To Decide Where JS Should Go

- Put it in `main.js` only if it is true app bootstrap behavior.
- Put it in `validators.js` only if the logic is reusable validation logic.
- Put it in `modules/` if it controls one site feature or one page interaction.
- Put it in `modules/search/` if it belongs specifically to search state, UI, or events.
- Put third-party code in `vendor/`, not mixed with your own modules.

## Practical Rule For Future Changes

- If a behavior only matters on one page, scope the module so it exits early when its target DOM is missing.
- If a module grows because it mixes state, rendering, and event listeners, split it like the search module.
- Prefer small initializers over one large global script. That keeps failures isolated and the code easier to trace.

## Maintenance Notes

- Most modules are written defensively and return early if their DOM is not present. That is intentional because the same script bundle is used across multiple pages.
- If you add a new module, follow the existing pattern: create the feature file, register an initializer, and keep page-specific selectors inside that module.
- Avoid placing page behavior directly in HTML. The current structure keeps HTML declarative and JS responsible for interaction.
