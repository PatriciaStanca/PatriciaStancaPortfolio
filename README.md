# Developer Portfolio (Student Project)

A multi‑page, responsive developer portfolio built with vanilla HTML, CSS, and JavaScript.

## Tech Stack
- HTML
- CSS (`assets/css/base.css`, `assets/css/layout.css`, `assets/css/components/*.css`, `assets/css/utilities.css`)
- JavaScript (`assets/js/main.js`, `assets/js/validators.js`)

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
- Weather widget (Open‑Meteo, current temperature + icon)
- Projects accordion with alternating image/text layout
- References slider
- CV page with embedded PDF + language switch (EN/SE)
- Scroll‑reveal animations (subtle fade + translate)

## Where Things Live
- **CSS:** `assets/css/`
- **JS:** `assets/js/`
- **Images:** `assets/media/images/`
- **Video:** `assets/media/videos/`
- **CV PDFs:** `assets/docs/`
- **Dev artifacts:** `dev/review_pdfs/`, `dev/test-results/`

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

## Kurskrav enligt uppgift (Webbutv. Frontend)

### Minimikrav på innehåll i portföljen
- [x] Porträttbild
- [x] Knapp/länk för CV (nedladdning/öppning)
- [x] Navbar
- [x] Länkar till sociala medier/GitHub
- [x] About Me-sektion
- [x] Kunskap/teknologier-sektion
- [x] Portföljsektion med projekt
- [x] Referenser/testimonials-sektion
- [x] Kontaktformulär som skickar e-post
- [x] Footer

### Kravlista G (status i detta repo)
1. (G) Appen ska testas ordentligt för att undvika oönskat beteende eller fel.  
Status: Uppfylld med automatiska kontroller (`npm test`: lint + Playwright + Lighthouse) och manuell testning.
2. (G) Det ska vara omöjligt för användaren att mata in felaktiga uppgifter.  
Status: Delvis/bedömningsfråga. Starkt klientskydd finns (HTML5 constraints + JS-validering + felmeddelanden), men absolut garanti kräver servervalidering.
4. (G) Koden ska fungera och applikationen ska gå att köra utan fel.  
Status: Uppfylld i lokal körning och testpipeline.
5. (G) Best practices, bra namn, DRY (särskilt relevant för t.ex. C# Razor Pages).  
Status: Uppfylld för denna stack (HTML/CSS/JS), med modulär struktur och separerade komponentfiler.
6. (G) README ska finnas och beskriva projektet samt metoder/principer.  
Status: Uppfylld (`README.md`).
7. (G) Använd `display: grid` eller `display: flex`.  
Status: Uppfylld (används brett i `assets/css/layout.css` och `assets/css/components/*.css`).

### Kravlista VG (status i detta repo)
9. (VG) Git commits och feature branches med relevanta meddelanden.  
Status: Uppfylld. Exempelbranch: `chore/vg-proof-links-and-branch-workflow` med separata, meningsfulla commits.
10. (VG) Vid felaktig inmatning visas relevanta varningar och användaren kan försöka igen.  
Status: Uppfylld (`assets/js/modules/contact-form.js`).
11. (VG) Samtliga miljöer ska vara användarvänliga och snygga (UX/UI).  
Status: Uppfylld enligt egen implementation; slutbedömning görs av examinator.
12. (VG) Professionell klass avseende genomförande, dokumentation och testning.  
Status: Uppfylld enligt egen implementation; slutbedömning görs av examinator.
13. (VG) Externt väder-API med temperatur i Celsius, plats och relevant info/ikon.  
Status: Uppfylld (Open‑Meteo i kontaktsektionen).
14. (VG) Portföljen ska vara responsiv för mobil och desktop.  
Status: Uppfylld (media queries + flex/grid-layouts).

### VG-bevis: live-länkar till projekt
- Needs‑Driven Analytics, Data Modeling & BI Architecture: `https://patriciastanca.com/experience#proj-needs-driven-analytics`
- Analytics Platform Implementation: `https://patriciastanca.com/experience#proj-analytics-platform-implementation`
- Energy Consumption Behavior Analytics: `https://patriciastanca.com/experience#proj-energy-consumption-behavior`
- Energy Consumption Prediction & Clustering: `https://patriciastanca.com/experience#proj-energy-prediction-clustering`
- Marketing Process & Reporting Automation: `https://patriciastanca.com/experience#proj-marketing-process-automation`
- Customer Segmentation & Information Modeling: `https://patriciastanca.com/experience#proj-customer-segmentation-modeling`
- Operational Customer Data & Business Rules: `https://patriciastanca.com/experience#proj-operational-customer-data-rules`
- Data Quality & CRM Migration Rules: `https://patriciastanca.com/experience#proj-data-quality-crm-migration`
- NKI Surveys – Structure & Analysis: `https://patriciastanca.com/experience#proj-nki-surveys-structure-analysis`
- AI Training for Marketing Teams: `https://patriciastanca.com/experience#proj-ai-training-marketing-teams`
- Strategic Change & Process Leadership: `https://patriciastanca.com/experience#proj-strategic-change-process-leadership`
- Core Business System Requirements & User Perspective: `https://patriciastanca.com/experience#proj-core-business-system-requirements`
- Process Change & Facilitation: `https://patriciastanca.com/experience#proj-process-change-facilitation`
- External Reporting & Partner Insights: `https://patriciastanca.com/experience#proj-external-reporting-partner-insights`
- Behavioral Insights Mentorship: `https://patriciastanca.com/experience#proj-behavioral-insights-mentorship`
- Antura Implementation Support: `https://patriciastanca.com/experience#proj-antura-implementation-support`
- PatriciaStancaPortfolio: `https://patriciastanca.com/experience#proj-patriciastancaportfolio`
- Shotgun Game: `https://patriciastanca.com/experience#proj-shotgun-game`
- AddressBookAvaloniaGroup: `https://patriciastanca.com/experience#proj-addressbookavaloniagroup`
- StancaBlogApi: `https://patriciastanca.com/experience#proj-stancablogapi`
- StancaBankApi: `https://patriciastanca.com/experience#proj-stancabankapi`
- blackjack.py: `https://patriciastanca.com/experience#proj-blackjack-py`

### Redovisning och inlämning (från uppgiften)
- Muntlig redovisning ca 5–10 minuter.
- Länk till privat GitHub-repo lämnas in i skolportalen.
- `RichardChalk` ska vara inbjuden som collaborator.

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
