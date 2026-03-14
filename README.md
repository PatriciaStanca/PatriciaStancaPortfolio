# Developer Portfolio (Student Project)

A multi‑page, responsive developer portfolio built with vanilla HTML, CSS, and JavaScript.

## Tech Stack
- HTML
- CSS (`assets/css/base.css`, `assets/css/layout/*.css`, `assets/css/components/*.css`, `assets/css/utilities/*.css`)
- JavaScript (`assets/js/main.js`, `assets/js/modules/*.js`, `assets/js/validators.js`)

`package-lock.json` exists to lock exact dependency versions so installs stay consistent across machines and over time.

## Pages
- `/` (Home)
- `/about` (About)
- `/experience` (Experience / Projects / References)
- `/contact` (Contact + Weather)
- `/cv` (Embedded CV)
- `/privacy` (Privacy policy)

## Key Features
- Responsive layout (flex/grid)
- Contact form with client‑side validation + Formspree submit
- Weather widget (OpenWeather, current temperature + icon)
- Projects accordion with alternating image/text layout
- References slider
- CV page with embedded PDF + language switch (EN/SE)
- Scroll‑reveal animations for page content (project reel excluded)

## Where Things Live
- **CSS:** `assets/css/`
- **JS:** `assets/js/`
- **Images:** `assets/media/images/`
- **Video:** `assets/media/videos/`
- **CV PDFs:** `assets/docs/`
- **Tests:** `tests/`

### CSS Structure Note
CSS is split into `base`, `layout`, `components`, and `utilities` folders for easier maintenance.

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

## Kurskrav enligt uppgift

### Minimikrav på innehåll i portföljen
- [x] Porträttbild
- [x] Knapp/länk för CV (nedladdning/öppning)
- [x] Navbar
- [x] Länkar till sociala medier/GitHub
- [x] About Me-sektion
- [x] Kunskap/teknologier-sektion
- [x] Portföljsektion med projekt
- [x] Referenser
- [x] Kontaktformulär som skickar e-post
- [x] Footer

### Kravlista G (status i detta repo)
1. (G) Appen ska testas ordentligt för att undvika oönskat beteende eller fel.  
Status: Uppfylld i repo:t. `npm run lint` och `npm run e2e` passerar, och sajten har även testats manuellt.
2. (G) Det ska vara omöjligt för användaren att mata in felaktiga uppgifter.  
Status: Klientskydd finns genom HTML5-validering, JavaScript-validering och tydliga felmeddelanden, till exempel krav på ifyllda fält, giltig e-post och minst 2 tecken i namn.
4. (G) Koden ska fungera och applikationen ska gå att köra utan fel.  
Status: Uppfylld i normal användning. Sajten fungerar lokalt och live, och kontaktformulärets Formspree-submit.
5. (G) Best practices, bra namn, DRY (särskilt relevant för t.ex. C# Razor Pages).  
Status: Uppfylld för denna stack (HTML/CSS/JS), med modulär struktur och separerade komponentfiler.
6. (G) README ska finnas och beskriva projektet samt metoder/principer.  
Status: Uppfylld (`README.md`).
7. (G) Använd `display: grid` eller `display: flex`.  
Status: Uppfylld (används brett i `assets/css/layout/*.css` och `assets/css/components/*.css`).

### Kravlista VG (status i detta repo)
9. (VG) Git commits och feature branches med relevanta meddelanden.  
Status: Uppfylld. Exempelbranch: `chore/vg-proof-links-and-branch-workflow` med separata, meningsfulla commits.
10. (VG) Vid felaktig inmatning visas relevanta varningar och användaren kan försöka igen.  
Status: Uppfylld i (`assets/js/modules/contact-form.js`).
11. (VG) Samtliga miljöer ska vara användarvänliga och snygga (UX/UI).  
Status: Bedömning görs av examinator.
12. (VG) Professionell klass avseende genomförande, dokumentation och testning.  
Status: Kodtestkedjan (`lint` + `e2e`) är grön.
13. (VG) Externt väder-API med temperatur i Celsius, plats och relevant info/ikon.  
Status: Uppfylld (OpenWeather i kontaktsektionen).
14. (VG) Portföljen ska vara responsiv för mobil och desktop.  
Status: Uppfylld (media queries + flex/grid-layouts).
15. (VG) Portföljen ska använda minst 3 breakpoints för responsiv anpassning.  
Status: Uppfylld. Följande breakpoints används i CSS: `601px`, `701px`, `737px`, `767px`, `768px`, `820px`, `901px`, `980px`, `981px`, `1201px` och `1280px` i layout-, komponent- och utility-filer.

## Validation Notes
- Input validation is client‑side only using HTML5 constraints + JS regex helpers.
- Server‑side validation is not applicable (static site).

## Testing
Automated and manual testing.
- Automated:
  - `npm run lint` runs HTML lint + CSS lint
  - `npm run e2e` runs Playwright tests
  - `npm run lhci` runs Lighthouse CI when you explicitly want performance audits
- Current status: `npm run lint` passes and `npm run e2e` passes (`3/3`).
- Form validation (required fields, invalid email, min length, consent)
- Weather widget fallback
- Mobile menu
- Sliders
- Responsive layouts

## Methods / Principles
- Semantic HTML structure
- Separation of concerns: base/layout/components/utilities CSS
- Mobile-first responsive strategy in overall layout, with additional max-width refinements where needed
- Progressive enhancement
- Accessibility basics (labels, aria, keyboard support)

## Notes for Deployment (Netlify)
- Build command: none
- Publish directory: `.`
- Custom domain configured via Netlify + Cloudflare DNS
- `netlify.toml` in repo defines build/publish settings
- `_headers` defines security headers such as CSP for the deployed site
