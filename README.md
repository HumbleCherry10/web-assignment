# QazaqPeek Cyber Club Astana — Midterm Project

## 1. Project Overview & Venue Information
* **Course:** Introduction to Web Technologies
* **Assignment:** Midterm Project (Complete Logic, Unified Site & Markup Freeze for JavaScript)
* **Organization:** QazaqPeek Cyber Club (Esports Lounge & Gaming Arena)
* **Physical Address:** Kenesary Street 69, 2nd Floor, Astana, Kazakhstan
* **Operating Hours:** 24/7, Open Every Day
* **Contact Phone:** +7 (706) 605 5465 | **Email:** info@qazaqpeek.kz
* **Interactive Map:** [2GIS Map — Kenesary Street 69](https://2gis.kz/astana)
* **Framework:** Bootstrap 5.3.3 CDN + Minimal Custom CSS Correction Layer

This project delivers a complete, cohesive, and production-ready web platform for QazaqPeek Cyber Club. Every user pathway has a concrete start, working interactive steps, and an on-screen conclusion. In strict adherence to the midterm specification, no custom JavaScript logic is executed; instead, all elements, lowercase hyphenated DOM IDs, empty dynamic containers, and CSS state classes have been prepared and frozen for the upcoming JavaScript assignments.

<<<<<<< HEAD
---

## 2. Team Work Division (2 Students)
=======
## Authors & Work Division
* **Dias Tursynbay**:
  - `index.html` (Home page — Bootstrap grid, cards, badges, responsive utilities)
  - `services.html` (Zones & Tariffs page — `container-fluid`, nested grid, Accordion component)
  - `events.html` (Tournaments page — Grid cards, registration badges, button variants)
  - `pc-specs.html` (Hardware Specs page — Grid cards, maintenance table, badge status)
  - `css/dias.css` (Dias's minimal correction layer)

* **Adilet Ainadinov**:
  - `booking.html` (Book a Station page — Form grid, Modal component, floating controls)
  - `login.html` (Login & Register page — Card layout for forms)
  - `rules.html` (House Rules & FAQ page — Accordion component & nested grid cards)
  - `css/adilet.css` (Adilet's minimal correction layer)
>>>>>>> origin/main

The project work, page authoring, and architectural responsibilities are divided equally between two team members:

### Dias Tursynbay
* **`index.html` (Club Home & Overview):** Authored the main landing page, hero banner with direct call-to-action buttons, quick in-page anchor jump navigation, real quotation figure with cite, verified 2GIS player reviews section (4.8★ rating with authentic client links), club photo gallery with semantic figure/figcaption tags, operating hours aside, and newsletter subscription form with status feedback.
* **`services.html` (Zones & Tariffs):** Authored the tariff catalog with uniform cards for Standard, VIP 1, and VIP 2, official venue price & spec posters gallery, complete rate matrix table with semantic caption/scope covering hourly, 2+1, 3+2, morning, day, and night packages, interactive session cost estimator form with DOM calculation hooks, and billing/payment FAQ accordion.
* **`events.html` (Tournaments & Schedule):** Authored the esports LAN competition calendar, tournament status badges, filter buttons with JavaScript hooks, direct tournament entry & team sign-up form with on-screen confirmation, and tournament server connection guide with semantic `code`, `pre`, `kbd`, and `samp` tags.
* **`css/dias.css`:** Authored Dias's custom stylesheet layer (hero banner gradient, image scale transitions, card highlight classes).

<<<<<<< HEAD
### Adilet Ainadinov
* **`booking.html` (Station Reservation):** Authored the comprehensive seat booking page with uniform cards for Standard, VIP 1, and VIP 2, guidelines with nested lists, simplified 3-step reservation form with full HTML5 input types, real tariff packages (Hourly, 2+1, 3+2, Morning, Day, Night), estimated base rate indicator, modal reservation preview dialog, and on-screen booking voucher confirmation container.
* **`login.html` (Member Portal & Registration):** Authored the dual authentication page with separate Member Login and New Account Registration forms, collapsible PIN recovery assistance helper, membership perks grid (welcome bonus, Kaspi QR top-up, priority seating), and status feedback containers.
* **`pc-specs.html` (Hardware Specs & Care):** Authored the technical hardware breakdown with uniform cards for Standard (i5-14400F, RTX 4060/5060, 280Hz ASUS), VIP 1 (i5-14600KF, RTX 5060, 310Hz ASUS), and VIP 2 (Ryzen 7 7800X3D, RTX 5060 Ti, 360Hz Alienware), hardware sanitization and maintenance table with caption/scope, and custom peripheral driver pre-configuration request form with confirmation alert.
* **`rules.html` (House Rules & Conduct):** Authored the venue conduct cards, accordion FAQ for club house rules, esports terminology definition list (`dl`, `dt`, `dd`), and "Ask an Administrator" question submission form with status container.
* **`css/adilet.css`:** Authored Adilet's custom stylesheet layer (form containers, required field indicator pseudo-elements, input focus styling).

### Joint Collaboration (Dias Tursynbay & Adilet Ainadinov)
* **`css/base.css`:** Collaboratively designed the 5-color dark esports brand palette, high-contrast text overrides, Bootstrap dark component corrections, and JavaScript freeze state classes (`.hidden`, `.active`, `.selected`, `.error`, `.success`).
* **Design Harmonization:** Standardized identical navbar structure with mobile hamburger toggler, uniform title format (`QazaqPeek Cyber Club - [Page Name]`), matching footer with contact info across all 7 pages, and zero horizontal scrollbar on mobile viewports.
* **Quality Pass & Testing:** Cross-reviewed each other's pages, validated all links, tested form inputs, and verified 100% W3C compliance.

---

## 3. Site Pages & Technical Summary

| File | Page Title | Author | Key Components & Logic | W3C Status |
| :--- | :--- | :--- | :--- | :--- |
| **`index.html`** | Home | Dias Tursynbay | Hero banner, CTA buttons, verified 2GIS reviews (4.8★), gallery cards with captions, quotes, newsletter form | 0 Errors |
| **`services.html`** | Zones & Tariffs | Dias Tursynbay | Uniform Standard/VIP1/VIP2 cards, official poster gallery, complete rate matrix, cost estimator, billing FAQ | 0 Errors |
| **`events.html`** | Tournaments & Events | Dias Tursynbay | LAN schedule, event filters, team sign-up form, server terminal guide | 0 Errors |
| **`booking.html`** | Book a Station | Adilet Ainadinov | Uniform zone cards, 3-step booking form, real tariff packages, live voucher preview modal | 0 Errors |
| **`login.html`** | Login & Register | Adilet Ainadinov | Member login, new player registration, PIN recovery collapse, perks cards | 0 Errors |
| **`pc-specs.html`** | PC Specs & Hardware | Adilet Ainadinov | Uniform rig cards (Standard/VIP1/VIP2), maintenance schedule table, driver pre-load request form | 0 Errors |
| **`rules.html`** | Rules & FAQ | Adilet Ainadinov | Conduct cards, club rules accordion, esports definition list, inquiry form | 0 Errors |

---

## 4. Three Complete User Journeys

In accordance with the midterm requirements, every visitor path starts, proceeds through logical steps, and reaches a concrete, on-screen conclusion without dead links or missing steps:

### Journey 1: Checking Tariffs, Estimating Costs, and Reserving a Gaming Station
* **Visitor Goal:** A gamer wants to view PC zone rates, calculate the price for a 3-hour evening session, and reserve a Standard Zone station.
* **Start:** Visitor lands on `index.html` and clicks the hero CTA button **"View Zones & Tariffs"**.
* **Steps:**
  1. Visitor arrives at `services.html`, reviews the uniform tariff cards (Standard: 800 KZT/hr; VIP 1: 1,200 KZT/hr; VIP 2: 1,500 KZT/hr) and the detailed rate matrix table.
  2. Scrolls down to the **Tariff & Session Cost Estimator**, selects "Standard Zone" (800 KZT/hr) and enters "3" hours.
  3. Reviews the estimated total display box (`#calc-total-display`: 2,400 KZT) and clicks **"Proceed to Reservation"**.
  4. Visitor arrives at `booking.html`, reviews the uniform Standard, VIP 1, and VIP 2 cards, and uses the 3-step reservation form to specify Gamer Tag ("Dias / ShadowAce"), phone number, email, reservation date, arrival time (18:00), chooses Standard Arena with Package "2+1" (or Hourly), and checks the house rules agreement box.
  5. Visitor clicks **"Confirm & Reserve Station"** (or opens **"Preview Voucher"** modal to double-check).
* **End:** The booking form's dedicated confirmation container (`#booking-confirmation`) displays the official confirmation voucher, reservation reference code (`QP-2026-AST`), and instructions that the station is held for 15 minutes at Kenesary 69.

### Journey 2: Registering a 5-Man Squad for the CS2 LAN Tournament
* **Visitor Goal:** A team captain wants to explore upcoming esports events, check tournament regulations, and register their team for the CS2 LAN tournament.
* **Start:** Visitor clicks **"Events"** in the top navigation bar from any page.
* **Steps:**
  1. Visitor arrives on `events.html` and browses the Astana Community Schedule.
  2. Locates the **"CS2 Astana Cup 5v5"** card (Date: October 12, 2026; Prize Pool: 250,000 KZT).
  3. Clicks **"Register Squad"**, which smoothly jumps down to the `#tournament-registration` section.
  4. Selects "CS2 Astana Cup 5v5" from the tournament dropdown, enters Team Name ("Astana Titans"), captain phone, Discord handle, and player lineup details.
  5. Reviews the match server practice connect command (`connect 192.168.1.100:27015`) and checks the 128-tick regulation agreement box.
* **End:** Captain clicks **"Submit Tournament Registration"**. The visible confirmation alert (`#tournament-feedback`) displays immediate feedback confirming that the team registration has been recorded for bracket seeding and directs the captain to reception check-in.

### Journey 3: Creating a Member Account and Verifying Club House Rules
* **Visitor Goal:** A newcomer wants to register a player account to receive the 500 KZT bonus balance and check rules regarding bringing personal peripherals and outside beverages.
* **Start:** Visitor clicks **"Login / Register"** in the navigation bar.
* **Steps:**
  1. Visitor lands on `login.html`, scrolls to **"Register New Player Account"**, and enters their desired Gamer Nickname, mobile phone number, and a 6-digit PIN.
  2. Submits the form; the green feedback container (`#register-feedback`) notifies the player that their account was created with a 500 KZT welcome bonus balance.
  3. Reads the membership benefits section highlighting automatic Kaspi QR top-ups and LAN seating priority.
  4. To check venue conduct rules, visitor clicks **"Rules & FAQ"** in the navigation.
  5. On `rules.html`, reads Card #1 (Hardware Care) and Card #2 (Outside Food & Drinks), and clicks the FAQ accordion item **"Can I bring my own gaming mouse, headset, or keyboard?"** to read the peripheral policy.
* **End:** The visitor learns that personal gear is welcome, notes the definition of "Tick Rate" and "DyAc+" in the esports glossary, and uses the "Ask an Administrator" form (`#inquiry-form`) to ask a specific question to the front desk.

---

## 5. JavaScript Readiness & Markup Freeze

As required by the midterm freeze policy, all necessary HTML element hooks, English lowercase hyphenated IDs, empty dynamic containers, and CSS state classes have been authored in advance. No JavaScript scripts or logic are executed yet (except Bootstrap's bundled component library).

### Lowercase Hyphenated IDs Inventory
* **Forms:** `#booking-form`, `#login-form`, `#register-form`, `#tournament-reg-form`, `#calculator-form`, `#driver-request-form`, `#inquiry-form`, `#newsletter-form`
* **Inputs & Controls:** `#client-name`, `#client-email`, `#client-phone`, `#booking-date`, `#booking-time`, `#party-size`, `#time-slot`, `#zone-standard`, `#zone-vip`, `#zone-bootcamp`, `#special-notes`, `#policy-agree`, `#loginPhone`, `#loginPassword`, `#regNickname`, `#regPhone`, `#regPass`, `#tournament-choice`, `#team-tag`, `#captain-contact`, `#discord-tag`, `#roster-notes`, `#reg-agree`, `#calc-zone`, `#calc-hours`, `#driver-software`, `#target-zone`, `#gamer-phone`, `#dpi-notes`, `#inquiry-name`, `#inquiry-contact`, `#inquiry-topic`, `#inquiry-message`, `#newsletter-email`
* **Action Buttons:** `#hero-book-btn`, `#hero-tariffs-btn`, `#booking-submit-btn`, `#booking-reset-btn`, `#login-submit-btn`, `#register-submit-btn`, `#btn-reg-cs2`, `#btn-reg-dota`, `#btn-submit-tournament`, `#btn-reset-tournament`, `#filter-all`, `#filter-open`, `#filter-completed`, `#btn-proceed-booking`, `#btn-reset-calc`, `#btn-submit-driver`, `#btn-reset-driver`, `#btn-submit-inquiry`, `#btn-reset-inquiry`, `#newsletter-submit-btn`
* **Dynamic Content & Result Containers:**
  * `#booking-confirmation`: Station booking voucher output block
  * `#booking-error`: Station booking validation alert block
  * `#booking-total-display`: Live reservation total price container
  * `#tournament-feedback`: Tournament registration confirmation container
  * `#tournament-error-box`: Tournament registration validation error container
  * `#calculator-result`: Tariff calculation summary box
  * `#calc-total-display`: Estimated session cost display
  * `#login-feedback`: Member authentication status container
  * `#register-feedback`: New account creation success container
  * `#driver-feedback`: Peripheral driver pre-load schedule confirmation
  * `#inquiry-feedback`: Administrator question dispatch confirmation
  * `#newsletter-feedback`: Tournament newsletter subscription confirmation

### CSS State Classes (`css/base.css`)
```css
.hidden, .is-hidden { display: none !important; }
.active, .is-active { color: var(--qp-accent) !important; border-color: var(--qp-accent) !important; }
.selected, .is-selected { background-color: rgba(56, 189, 248, 0.15) !important; border-color: var(--qp-accent) !important; }
.error, .is-error { border-color: #ef4444 !important; color: #fca5a5 !important; }
.success, .is-success { border-color: #22c55e !important; color: #86efac !important; }
```

---

## 6. Quality Pass & Cross-Review Log

Two days prior to submission, each team member performed an end-to-end audit of the other member's pages:

| Review Date | Reviewer | Target Pages | Defects Found | Resolution & Fix Applied |
| :--- | :--- | :--- | :--- | :--- |
| **Oct 3, 2026** | Dias Tursynbay | `booking.html`, `login.html`, `rules.html` | Missing `<h1>` headings on `booking.html` and `rules.html`; unclosed `<article>` tag on `booking.html`; `href="#"` and `action="#"` on `login.html`. | Added unique `<h1>` tags to both pages; closed the unclosed `<article>` tag; replaced dead `#` links with working collapsible recovery helper `#pin-recovery-help` and valid form action targets. |
| **Oct 3, 2026** | Adilet Ainadinov | `services.html`, `events.html`, `index.html` | Tariff prices on `booking.html` (600/1500 ₸) did not match `services.html` (700/1200 KZT); tournament cards on `events.html` redirected to generic booking form without a tournament registration mechanism. | Synchronized all rates across all 7 pages to official club prices; authored dedicated Tournament Registration section with squad roster form and server terminal guide on `events.html`. |
| **Oct 4, 2026** | Both Students | All 7 Pages & Stylesheets | Duplicate FAQ questions between `services.html` and `rules.html`; missing state classes for JavaScript freeze; tables missing `<caption>`. | Refactored `services.html` FAQ to focus exclusively on billing, Kaspi payments, and hourly rates; added definition list to `rules.html`; added descriptive `<caption>` tags to all tables; declared state classes in `css/base.css`. |
| **Oct 7, 2026** | Both Students | All 7 Pages & Images | Mismatched hardware specs and tariffs vs authentic venue reception posters; booking form was cluttered; missing verified 2GIS player reviews. | Replaced all fictional specs with official club hardware (Intel 14th Gen, Ryzen 7 7800X3D, RTX 50-series, ASUS TUF 280Hz/310Hz, Alienware 360Hz, AULA F75, VGN, MCHOSE mice); standardized uniform cards for Standard, VIP 1, and VIP 2; integrated real 2GIS verified reviews with direct URLs; redesigned booking flow into an intuitive 3-step visual interface. |

---

## 7. Progressive Fulfillment of Course Assignments

The project demonstrates complete, cumulative fulfillment of every assignment in ascending order:

1. **Assignment 1 (HTML Basics & Semantics):**
   * Complete semantic skeleton: `<header>`, `<nav>`, `<main>`, `<footer>`, `<section>`, `<article>`, `<aside>`, `<figure>`, `<figcaption>`.
   * Exactly one `<h1>` per page without skipped heading levels (`h1` &rarr; `h2` &rarr; `h3` &rarr; `h4`).
   * Semantic tables with `<caption>`, `<thead>`, `<tbody>`, and `<th scope="...">`.
   * Real lists: Nested unordered lists (`<ul>/<li>/<ul>`), ordered list with attributes (`<ol type="1" start="1">`), and definition list (`<dl>`, `<dt>`, `<dd>`).
   * Rich semantic text tags: `<strong>`, `<em>`, `<b>`, `<i>`, `<mark>`, `<small>`, `<sub>`, `<sup>`, `<abbr title="...">`, `<blockquote>`, `<q>`, `<cite>`, `<code>`, `<pre>`, `<kbd>`, `<samp>`, `<hr>`, `<br>`.
   * Real HTML entities: `&copy;`, `&bull;`, `&deg;`, `&rdquo;`, `&ldquo;`, `&times;`, `&rarr;`.
   * Comprehensive forms with `fieldset`, `legend`, `label for`, and input types: `text`, `email`, `tel`, `number`, `date`, `time`, `radio`, `checkbox`, `select/option`, `textarea`, `submit`, `reset`.

2. **Assignment 2 (CSS Fundamentals & Layouts):**
   * 5-color palette documented in `css/base.css` (`#0f172a`, `#1e293b`, `#162032`, `#334155`, `#38bdf8`).
   * Box model with `box-sizing: border-box`.
   * Flexbox and CSS Grid layout structures.
   * Positioning (`relative`, `absolute`, `fixed` back-to-top button).
   * Pseudo-classes (`:hover`, `:focus`) and pseudo-elements (`::before`, `::after`, `*::after`).
   * Selectors & specificity demonstrations preserved in `checklist.txt`.

3. **Assignment 3 (Bootstrap 5.3.3 Responsive Framework):**
   * Bootstrap 5.3.3 CDN stylesheet linked in `<head>` and JS bundle before `</body>`.
   * Container justification: `.container` for standard readability, `.container-fluid` on `services.html` for wide pricing matrices.
   * 12-column responsive grid (`col-12 col-md-6 col-lg-4`) adapting seamlessly across mobile (375px), tablet (768px), and desktop.
   * Nested grid demonstration (`.row` inside `.col-lg-8` and `.col-lg-4`).
   * Components: Cards, Badges, Accordion, Modal, Alert.
   * Minimal CSS correction layer maintaining brand colors without overriding Bootstrap grid.

4. **Midterm Project (Coherence, Finished Logic, JavaScript Freeze):**
   * Zero dead links, zero `href="#"`, zero broken images, zero console errors.
   * All visitor flows reach a finished, on-screen conclusion.
   * Three detailed, fully functional user journeys.
   * Complete DOM ID hooks, empty containers, and state classes for upcoming JavaScript assignments.
   * W3C validation clean across all 7 pages.
   * Frozen structure tagged as `midterm`.

---

## 8. Git Freeze Tag

To freeze the HTML and CSS architecture for the remainder of the semester:
```bash
git add .
git commit -m "feat: complete Midterm Project with finished logic, unified design, and JavaScript freeze"
git tag midterm
```

---

## 9. File Organization
* `index.html`: Home page
* `services.html`: Zones and price matrix (with Accordion component & nested grid)
* `events.html`: Upcoming tournament schedule
* `booking.html`: Station reservation form (with Modal component)
* `login.html`: Member login and registration
* `pc-specs.html`: Gaming PC hardware & peripheral specifications
* `rules.html`: House Rules & FAQ (with Accordion component & nested grid)
* `css/base.css`: Shared Bootstrap correction layer
* `css/dias.css`: Dias's correction layer
* `css/adilet.css`: Adilet's correction layer
* `css_changes.txt`: Inventory of removed CSS rules and replacement Bootstrap classes
* `ai_log.md`: AI interaction log
* `screenshots/`: Responsive screenshots at mobile (375px), tablet (768px), and desktop widths
* `images/`: Local photos from Kenesary 69
