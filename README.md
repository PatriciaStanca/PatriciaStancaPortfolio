# Developer Portfolio (Student Project)

A multi‑page, responsive developer portfolio built with vanilla HTML, CSS, and JavaScript.

## Tech Stack
- HTML
- CSS (`assets/css/base.css`, `assets/css/layout.css`, `assets/css/components/*.css`, `assets/css/utilities.css`)
- JavaScript (`assets/js/main.js`, `assets/js/validators.js`)

## Pages
- `index.html` (Home)
- `generic.html` (About)
- `elements.html` (Experience / Projects / References)
- `contact.html` (Contact + Weather)
- `cv.html` (Embedded CV)
- `privacy.html` (Privacy policy)

## Key Features
- Responsive layout (flex/grid)
- Contact form with client‑side validation + Formspree submit
- Weather widget (Open‑Meteo, current temperature + icon)
- Projects accordion with alternating image/text layout
- References slider
- CV page with embedded PDF + language switch (EN/SE)
- Scroll‑reveal animations (subtle fade + translate)

## Where Things Live
- **CSS:** `assets/css/`
- **JS:** `assets/js/`
- **Images:** `images/`
- **Video:** `assets/videos/`
- **CV PDFs:** `assets/docs/`

### CSS Structure Note
`assets/css/components.css` was split into smaller files under `assets/css/components/` for easier maintenance.
Current component files:
- `assets/css/components/cards.css`
- `assets/css/components/sliders.css`
- `assets/css/components/accordion.css`
- `assets/css/components/timeline.css`
- `assets/css/components/skills.css`
- `assets/css/components/education-language.css`
- `assets/css/components/contact.css`
- `assets/css/components/cv.css`
- `assets/css/components/footer.css`
- `assets/css/components/weather.css`

## Requirements Checklist

### Must Have (G)
- [x] HTML/CSS/JS only
- [x] Portrait image (`index.html` / `images/`)
- [x] CV download/open button (`cv.html` + footer link)
- [x] Navbar (all pages)
- [x] Social links (footer)
- [x] About Me section (`generic.html`)
- [x] Skills section (`index.html`, `generic.html`)
- [x] Portfolio section (`elements.html`)
- [x] References/Testimonials section (`elements.html`)
- [x] Contact form (Formspree)
- [x] Footer
- [x] Flex/Grid used (`assets/css/layout.css`, `assets/css/components/*.css`)

### Nice to Have (VG)
- [x] Validation warnings + retry on invalid input (`assets/js/main.js`)
- [x] UX/UI polish + responsive layout
- [x] External weather API (Open‑Meteo)
- [x] Responsive design
- [ ] Feature branches + many meaningful commits (Inte implementerat ännu)
- [ ] Live demo links for every project (not all projects have live demos yet)

## Validation Notes
- Input validation is client‑side only using HTML5 constraints + JS regex helpers.
- Server‑side validation is not applicable (static site).

## Testing
Manual testing only.
- Form validation (required fields, invalid email, min length, consent)
- Weather widget fallback
- Mobile menu
- Sliders
- Responsive layouts

## Methods / Principles
- Semantic HTML structure
- Separation of concerns: base/layout/components/utilities CSS
- Progressive enhancement
- Accessibility basics (labels, aria, keyboard support)

## Repository
Private GitHub repository:
`https://github.com/PatriciaStanca/PatriciaStancaPortfolio.git`

## Notes for Deployment (Netlify)
- Build command: none
- Publish directory: `.`
- Custom domain configured via Netlify + Cloudflare DNS
