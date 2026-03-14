# CSS Guide

This folder contains the styling system for the portfolio. The CSS is split by responsibility so each file answers a different question: base tokens, page structure, reusable components, or page-specific visual polish.

## Why This Structure Exists

- `base.css` defines global design tokens, typography, resets, links, buttons, and shared primitives.
- `layout.css` loads the main structural layout rules.
- `utilities.css` loads cross-page helpers, responsive overrides, visual depth layers, and print styles.
- `components/` contains feature-specific styling for reusable sections such as cards, accordion, sliders, footer, weather, and search.

This split exists to keep global rules separate from feature rules. It reduces the chance that a local component change accidentally affects the whole site.

## File Map

### Root files

- `base.css`
  Defines CSS variables, fonts, spacing tokens, global reset behavior, shared element styling, and reusable visual defaults.

- `layout.css`
  Import file for the main page structure:
  - `layout/header.css`
  - `layout/mobile-menu.css`
  - `layout/content.css`

- `utilities.css`
  Import file for cross-cutting rules:
  - `utilities/core.css`
  - `utilities/index-depth.css`
  - `utilities/generic-depth.css`
  - `utilities/print.css`

### `layout/`

- `header.css`
  Header shell, top navigation, logo treatment, dropdown behavior, and header-level positioning.

- `mobile-menu.css`
  Mobile menu container, submenu accordion, open/closed states, and mobile navigation interaction styling.

- `content.css`
  Wrappers, hero, intro, section titles, and shared content layout blocks.

### `utilities/`

- `core.css`
  Global responsive overrides, scroll-reveal defaults, menu-state helpers, and shared layout adjustments used across pages.

- `index-depth.css`
  Decorative layers and atmospheric shapes specific to the home page.

- `generic-depth.css`
  Decorative background treatment for generic and elements pages.

- `print.css`
  Print-specific cleanup that removes interactive or decorative elements and makes content printable.

### `components/`

- `accordion.css`
  Experience/project accordion layout and open/closed panel visuals.

- `cards.css`
  Shared card styling for skills, highlights, contact cards, and similar content blocks.

- `contact.css`
  Contact page hero, form layout, contact details, and page-specific spacing.

- `cv.css`
  Embedded CV layout and language switch area.

- `education-language.css`
  Education and language section styling.

- `footer.css`
  Shared footer layout, grouped columns, decorative footer visuals, and footer spacing.

- `search.css`
  Header search button, search drawer, overlay, results list, and search interaction styling.

- `skills.css`
  Skills section node layout, tags, and supporting visual hierarchy.

- `sliders.css`
  Logo slider, role slider, testimonial slider, and related button states.

- `timeline.css`
  Timeline structure and milestone styling.

- `weather.css`
  Footer weather widget styling.

### `components/project-reel/`

- `project-reel.css`
  Import file for the full project reel.

- `project-reel/base.css`
  Core project reel visuals, scene layers, device frames, scene layouts, and non-responsive reel styling.

- `project-reel/animations.css`
  Keyframes and animation definitions used by the reel.

- `project-reel/responsive-core.css`
  General responsive behavior for reel scenes other than the custom opening phone/device composition.

- `project-reel/responsive-phone.css`
  Responsive tuning for the opening multi-device composition. This file exists separately because that scene required more targeted breakpoint control than the rest of the reel.

## How To Decide Where CSS Should Go

- Put it in `base.css` if it defines tokens or a shared global rule.
- Put it in `layout/` if it controls page structure or global shell layout.
- Put it in `utilities/` if it is a cross-page override, visual layer, or print behavior.
- Put it in `components/` if it belongs to one reusable feature or section.
- Put it in `components/project-reel/` if it only affects the reel.

## Practical Rule For Future Changes

- If a selector starts with page-specific scope such as `body.page-index`, prefer a page-focused file in `utilities/` or a dedicated component file.
- If a selector styles an interaction tied to one JS module, prefer the matching component file.
- If a file starts growing because it mixes layout and decorative effects, split those concerns before adding more rules.

## Maintenance Notes

- Smaller import files are intentional. They keep HTML links stable while allowing internal files to stay readable.
- Avoid adding new giant catch-all files. It is easier to debug CSS when each file has one clear responsibility.
- Before deleting rules that look unused, verify the related page and breakpoint. Several selectors only matter on one page or one screen size.
