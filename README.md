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
- [x] Feature branches + many meaningful commits (workflow documented and used)
- [x] Live demo links for every project (stable anchors on the live site)

## VG Evidence

### Feature Branch Workflow
- Work is done in feature branch: `chore/vg-proof-links-and-branch-workflow`
- Commits are split by purpose (HTML anchors, then documentation updates)

### Live Demo URLs (All Projects)
- Needs‑Driven Analytics, Data Modeling & BI Architecture: `https://patriciastanca.com/elements.html#proj-needs-driven-analytics`
- Analytics Platform Implementation: `https://patriciastanca.com/elements.html#proj-analytics-platform-implementation`
- Energy Consumption Behavior Analytics: `https://patriciastanca.com/elements.html#proj-energy-consumption-behavior`
- Energy Consumption Prediction & Clustering: `https://patriciastanca.com/elements.html#proj-energy-prediction-clustering`
- Marketing Process & Reporting Automation: `https://patriciastanca.com/elements.html#proj-marketing-process-automation`
- Customer Segmentation & Information Modeling: `https://patriciastanca.com/elements.html#proj-customer-segmentation-modeling`
- Operational Customer Data & Business Rules: `https://patriciastanca.com/elements.html#proj-operational-customer-data-rules`
- Data Quality & CRM Migration Rules: `https://patriciastanca.com/elements.html#proj-data-quality-crm-migration`
- NKI Surveys – Structure & Analysis: `https://patriciastanca.com/elements.html#proj-nki-surveys-structure-analysis`
- AI Training for Marketing Teams: `https://patriciastanca.com/elements.html#proj-ai-training-marketing-teams`
- Strategic Change & Process Leadership: `https://patriciastanca.com/elements.html#proj-strategic-change-process-leadership`
- Core Business System Requirements & User Perspective: `https://patriciastanca.com/elements.html#proj-core-business-system-requirements`
- Process Change & Facilitation: `https://patriciastanca.com/elements.html#proj-process-change-facilitation`
- External Reporting & Partner Insights: `https://patriciastanca.com/elements.html#proj-external-reporting-partner-insights`
- Behavioral Insights Mentorship: `https://patriciastanca.com/elements.html#proj-behavioral-insights-mentorship`
- Antura Implementation Support: `https://patriciastanca.com/elements.html#proj-antura-implementation-support`
- PatriciaStancaPortfolio: `https://patriciastanca.com/elements.html#proj-patriciastancaportfolio`
- Shotgun Game: `https://patriciastanca.com/elements.html#proj-shotgun-game`
- AddressBookAvaloniaGroup: `https://patriciastanca.com/elements.html#proj-addressbookavaloniagroup`
- StancaBlogApi: `https://patriciastanca.com/elements.html#proj-stancablogapi`
- StancaBankApi: `https://patriciastanca.com/elements.html#proj-stancabankapi`
- blackjack.py: `https://patriciastanca.com/elements.html#proj-blackjack-py`

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
 - `netlify.toml` in repo defines build/publish settings
