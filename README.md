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

---

## 2. Team Work Division (2 Students)
* **Dias Tursynbay**:
  - `index.html` (Club Home & Overview — 2GIS Reviews engine, Hero CTA, Gallery highlights, Newsletter)
  - `services.html` (Zones & Tariffs — Tariff catalog, Rate matrix, Interactive Session Cost Estimator)
  - `events.html` (Tournaments & Schedule — LAN schedule, Category filters, 5-Man Squad Registration)
  - `css/dias.css` (Dias's minimal correction layer)

* **Adilet Ainadinov**:
  - `booking.html` (Station Reservation — Dynamic Station Seating Engine, Live Price Calculator, Voucher Generation)
  - `login.html` (Member Security Portal — Dual authentication, Regex Password Checklist, Show/Hide Password)
  - `pc-specs.html` (Hardware Specs & Care — Rig specs, Maintenance schedule, Driver pre-load request form)
  - `rules.html` (House Rules & FAQ — Conduct cards, FAQ accordion filter, Inquiry form)
  - `css/adilet.css` (Adilet's minimal correction layer)

The project work, page authoring, and architectural responsibilities are divided equally between two team members:

### Dias Tursynbay
* **`index.html` (Club Home & Overview):** Authored the main landing page, hero banner with direct call-to-action buttons, quick in-page anchor jump navigation, real quotation figure with cite, verified 2GIS player reviews section (4.8★ rating with authentic client links), club photo gallery with semantic figure/figcaption tags, operating hours aside, and newsletter subscription form with status feedback.
* **`services.html` (Zones & Tariffs):** Authored the tariff catalog with uniform cards for Standard, VIP 1, and VIP 2, official venue price & spec posters gallery, complete rate matrix table with semantic caption/scope covering hourly, 2+1, 3+2, morning, day, and night packages, interactive session cost estimator form with DOM calculation hooks, and billing/payment FAQ accordion.
* **`events.html` (Tournaments & Schedule):** Authored the esports LAN competition calendar, tournament status badges, filter buttons with JavaScript hooks, direct tournament entry & team sign-up form with on-screen confirmation, and tournament server connection guide with semantic `code`, `pre`, `kbd`, and `samp` tags.
* **`css/dias.css`:** Authored Dias's custom stylesheet layer (hero banner gradient, image scale transitions, card highlight classes).

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

---

## 10. Assignment 4–5 Functionality Plan (JavaScript & DOM)

In strict accordance with the Assignment 4–5 specification, HTML and CSS markup remain frozen from the `midterm` tag (`af0f2d5`). Only script links with `defer` are introduced. All new dynamic elements are injected through JavaScript DOM methods, and states are managed via `classList` using midterm state classes (`.active`, `.selected`, `.hidden`, `.error`, `.success`).

### Individual & Team Substantial Features Matrix

| Page | Visitor Goal | Planned Function | Expected Result | Responsible Student |
| :--- | :--- | :--- | :--- | :--- |
| **All Pages** | Check if club is open and navigate smoothly with accessible feedback | `initSiteWideFeatures()` in `js/main.js` | Highlights active navbar link; live Astana UTC+5 24/7 club open status; smooth back-to-top button; accessible toast messages. | **Dias & Adilet (Team)** |
| **`index.html`** | Read authentic player experiences, filter by category/rating, search reviews, and submit personal review | `renderReviews()`, `filterReviews()`, `handleReviewSubmit()` in `js/home.js` | Displays 2GIS reviews from an array of 6+ objects; dynamic category filtering & live search; dynamic submission form with character counter and safe `textContent` injection. | **Dias Tursynbay** |
| **`events.html`** | Browse upcoming LAN competitions, filter by registration status, and register a 5-man squad | `renderEvents()`, `filterEvents()`, `handleTournamentSignup()` in `js/events.js` | Renders tournament cards from an array of 6+ events; filter by All/Open/Concluded with count and empty state; form validation (team tag, captain phone, Discord handle, 5-player check); demo seed code generated via `Math.random()`. | **Dias Tursynbay** |
| **`services.html`** | Calculate total gaming costs for selected zones/hours and discover package savings (2+1, 3+2, Night) | `calculateSessionCost()`, `renderPackageRecommendation()` in `js/services.js` | Real-time calculation on input/change events; displays total price in KZT; dynamically recommends best-fit discounted packages; deep-links selections to reservation. | **Dias Tursynbay** |
| **`booking.html`** | Select stations on an interactive seating map, choose package, and receive instant booking voucher | `renderSeatMap()`, `calculateBookingTotal()`, `validateBookingForm()` in `js/booking.js` | Dynamic DOM generation of PC stations across Standard, VIP 1, and VIP 2 zones; live pay-at-desk total; 4-field validation (name, phone, email, date/time, seat-to-party cross check); instant demo voucher with `Math.random()` reference number. | **Adilet Ainadinov** |
| **`login.html`** | Create a member account with a secure password and test credentials with immediate feedback | `initPasswordValidator()`, `validateAuthForm()` in `js/login.js` | DOM-generated live regex password strength checklist (8+ chars, uppercase, lowercase, number, special char); confirm password matching; accessible Show/Hide password toggle; demo disclaimer. | **Adilet Ainadinov** |
| **`pc-specs.html`** | Request driver and DPI pre-configuration for tournament peripherals before visiting | `handleDriverRequest()`, `renderDriverSummary()` in `js/specs.js` | Form validation for peripheral software, zone selection, phone, and DPI notes; on-screen confirmation banner with timestamp and demo reference code. | **Adilet Ainadinov** |
| **`rules.html`** | Search club house rules and submit an inquiry to club management | `filterFAQ()`, `handleInquirySubmit()` in `js/specs.js` | Live keyword filter across accordion FAQ items; question inquiry form validation with character counter and demonstration response alert. | **Adilet Ainadinov** |

### Milestone Stages & Git Tags
* **Assignment 4 (`tag: assignment-4`):** Variables (`const`/`let`), operators, `Math.random()`, conditions, logical operators, arrays ($\ge 6$ objects with $\ge 4$ properties), loops/traversals, and $\ge 4$ reusable functions with parameters and return values.
* **Assignment 5 (`tag: assignment-5`):** DOM creation/removal, attributes/classes, events (`submit`, `click`, `input`/`change`), and complete 4-field form validation flows with field-level errors and demonstration summaries.

---

## 11. Assignment 6: jQuery Migration & Defense Preparation Guide

### 11.1 Project Overview & Architecture
In this final milestone prior to the project defense, we migrate key site interactions to **jQuery 3.7.1** while maintaining strict adherence to the midterm freeze:
* Zero new hand-written HTML elements (except the official CDN `<script>` tag).
* Zero new CSS rules or style tags.
* All new interactive elements are instantiated through jQuery DOM methods (`$('<div/>')`, `$('<button/>')`).
* Presentation state is modified strictly through existing stylesheet classes (`.selected`, `.active`, `.hidden`, `is-invalid`, Bootstrap utilities).
* Every script is wrapped in `$(document).ready()` to guarantee complete DOM readiness before selection or traversal.
* The unlinked archive `js/old-js-version.js` contains the original plain-JavaScript implementations for side-by-side examination during defense.

---

### 11.2 Three Rewritten Features — Side-by-Side Comparison

| Feature | Original Plain JS (`js/old-js-version.js`) | jQuery 3.7.1 Implementation (`js/booking.js` & `js/events.js`) | Replaced Methods & Architectural Verdict |
| :--- | :--- | :--- | :--- |
| **Feature 1: Dynamic Seating Grid & List Builder** | `document.createElement('button')`<br>`seatBtn.dataset.seatId = id`<br>`seatBtn.addEventListener('click', ...)` in a loop<br>`appendChild()` | `$('<button/>', { class: 'station-btn' })`<br>`.attr('data-seat-id', id)`<br>`.prop('disabled', isOccupied)`<br>`.append()` & delegated `.on('click', '.station-btn')` | **Replaces ~70 lines of verbose manual node creation and per-item listeners.**<br>*Verdict:* Dramatically shorter and clearer. Building elements declaratively and delegating clicks to the parent prevents memory leaks and catches future dynamic items. |
| **Feature 2: Main Form Validation Flow** | `form.addEventListener('submit', ...)`<br>`document.getElementById()` for every input<br>Manual error array pushing<br>`classList.add('is-invalid')`<br>Form-level alert container | `$('#booking-form').on('submit', ...)`<br>`$.trim($(this).val())`<br>`$field.addClass('is-invalid')`<br>`$field.siblings('.invalid-feedback').text(msg).slideDown(200)`<br>Real-time clear on `.on('input change')` | **Replaces ~80 lines of manual error loops and messy innerHTML feedback.**<br>*Verdict:* Substantially shorter and more robust. Field-level error alerts provide immediate visual feedback next to the invalid input, clearing instantly on keystroke. |
| **Feature 3: Animated Show/Hide & Status Filters** | `container.innerHTML = ''`<br>Manual `.forEach()` loop for card creation<br>`btn.className = 'btn...'` loop<br>`addEventListener('input', ...)` | `$cardContainer.empty()`<br>Fluent chaining: `$(this).siblings().removeClass('active').end().addClass('active')`<br>`.slideDown(400, callback)`<br>`.slideUp(200)`, `.fadeToggle()` | **Replaces complex manual DOM rebuilding and brittle display styling.**<br>*Verdict:* Much clearer and visually superior. jQuery effects provide smooth, hardware-accelerated animations with duration parameters and post-animation completion callbacks. |

---

### 11.3 Comprehensive jQuery Technical Audit

#### 1. Selectors & Filters
* **By ID:** `$('#booking-form')`, `$('#dynamic-seating-container')`, `$('#booking-confirmation')`, `$('#events-card-container')`, `$('#tournament-reg-form')`
* **By Class:** `$('.station-btn')`, `$('.tournament-card-col')`, `$('.invalid-feedback')`, `$('.zone-section')`
* **By Element:** `$('input')`, `$('select')`, `$('button')`, `$('legend:first')`
* **By Attribute:** `$('[data-zone]')`, `$('[data-seat-id]')`, `$('[data-tourney-id]')`, `$('input[name="zone"]')`
* **Filter Selectors:**
  * `:checked` — `$('input[name="zone"]:checked')` to identify active zone radio button.
  * `:not()` — `$('.station-btn:not(.occupied)')` to prevent clicking occupied rigs.
  * `:first` — `filter(':first')` and `find('legend:first')` to select the boundary element.

#### 2. Traversal Methods
* `.find()`: `$(this).closest('.station-grid').find('.station-btn.selected')` (locates nested child stations).
* `.closest()`: `$(this).closest('.station-grid')` and `$(this).closest('.mb-3')` (traverses up to parent row/card).
* `.parent()`: `$(this).parent()` (reaches immediate parent).
* `.siblings()`: `$(this).siblings('.station-btn')` and `$field.siblings('.invalid-feedback')` (navigates sibling elements).
* `.each()` / `$.each()`: `$.each(CLUB_STATIONS, ...)` and `$.each(TOURNAMENTS_DATA, ...)` (clean array iteration).

#### 3. Chaining Demonstrations (with Link Explanations)
* **Chain 1 (`js/booking.js`, Line 299):**
  ```javascript
  $(this).closest('.station-grid').find('.station-btn.selected').filter(':first').addClass('border-light');
  ```
  * *Link 1:* `$(this).closest('.station-grid')` — climbs the DOM tree to locate the parent station row container.
  * *Link 2:* `.find('.station-btn.selected')` — searches descendants for all station buttons currently in selected state.
  * *Link 3:* `.filter(':first')` — narrows the collection to strictly the first selected station button.
  * *Link 4:* `.addClass('border-light')` — adds the high-contrast border state class to that element.
* **Chain 2 (`js/events.js`, Line 333):**
  ```javascript
  $btn.siblings().removeClass('active btn-info text-dark fw-bold').addClass('btn-outline-info').end().removeClass('btn-outline-info').addClass('active btn-info text-dark fw-bold');
  ```
  * *Link 1:* `$btn.siblings()` — targets all sibling filter buttons.
  * *Link 2:* `.removeClass(...)` — strips active styling from siblings.
  * *Link 3:* `.addClass('btn-outline-info')` — restores outline border on siblings.
  * *Link 4:* `.end()` — pops the internal stack, returning selection back to the clicked button `$btn`.
  * *Link 5:* `.removeClass(...)` & `.addClass(...)` — highlights the clicked button as active.

#### 4. DOM Manipulation Semantics
* `.text()`: Used for numerical totals, station counts, card titles, and error messages to safely escape HTML entities and prevent XSS.
* `.html()`: Used to inject structured ticket voucher markup (`<span>`, `<strong>`, `<div>`) and badge icons.
* `.val()`: Reads and updates user inputs (`#party-size`, `#time-slot`, `#booking-date`, `#tournament-choice`).
* `.attr()`: Sets and reads HTML attributes (`data-seat-id`, `data-zone`, `title`, `min`, `novalidate`).
* `.prop()`: Manages live boolean properties (`prop('checked', true)` on radio/checkbox and `prop('disabled', true)` on buttons).

#### 5. Events & Delegation Mechanics
* All listeners are bound using `.on()`, covering `'click'`, `'submit'`, `'input'`, and `'change'`.
* **Delegated Event Listener (`js/booking.js`):**
  ```javascript
  $seatingCard.on('click', '.station-btn:not(.occupied)', function (event) { ... });
  ```
  * *Why binding directly fails:* Station buttons are generated dynamically from JavaScript data. If we called `$('.station-btn').on('click')` on initial page load, 0 matching elements would exist in the DOM, so 0 listeners would be attached. Delegation attaches a single listener to the permanent parent container (`$seatingCard`), intercepting clicks during the bubbling phase.

#### 6. Purposeful Animated Effects
* `.slideDown(400, callback)`: Smoothly reveals confirmation voucher and auto-scrolls to the result.
* `.slideUp(200)`: Dismisses previous error alerts and collapses invalid feedback.
* `.fadeIn(300)`: Smoothly fades in newly filtered tournament cards and empty state alerts.
* `.stop(true, true)`: Clears running animation queues to prevent UI stutter during rapid user interaction.

#### 7. Form Validation with Field-Level Feedback
* Submissions intercepted with `event.preventDefault()` (preventing page refresh).
* Values trimmed using `$.trim()`.
* Email and Phone validated against standard Regular Expressions.
* Errors displayed **directly next to the invalid input** using `.addClass('is-invalid')` and individual `.invalid-feedback` text.
* Real-time removal: Listening to `.on('input change')` removes `is-invalid` and slides up the error the moment the user edits the field.
* On full success: Renders a comprehensive demonstration voucher and resets the form via `$form[0].reset()`.

---

### 11.4 Oral Defense Viva Questions & Answers

#### Q1: "What does this line of jQuery do, and what would be the plain-JavaScript equivalent?"
* **Example Line:** `$('#booking-form').find('.station-btn.selected').addClass('border-light');`
* **jQuery Explanation:** Selects the element with ID `booking-form`, traverses downward to find all descendant elements with classes `station-btn` and `selected`, then adds the CSS class `border-light` to every matching node.
* **Plain JS Equivalent:**
  ```javascript
  const form = document.getElementById('booking-form');
  if (form) {
    const buttons = form.querySelectorAll('.station-btn.selected');
    buttons.forEach(btn => btn.classList.add('border-light'));
  }
  ```

#### Q2: "Why does a delegated handler catch elements that did not exist yet when the page loaded?"
* **Answer:** When an event occurs on a child element (e.g. a dynamically created station button), the browser triggers the event in the **bubbling phase**, propagating it upward through its parent, ancestors, and ultimately `document`. A delegated listener is attached to an ancestor that was already present in the initial HTML. When the bubbling event reaches that ancestor, jQuery inspects the event's target (`event.target`). If the target matches the delegate selector (e.g. `'.station-btn'`), jQuery executes the handler function, binding `$(this)` to that dynamic target element.

#### Q3: "What is the difference between .text() and .html()?"
* **Answer:** `.text()` gets or sets the combined inner text of the selected elements, escaping special HTML characters (`<`, `>`, `&`) to display characters literally and prevent Cross-Site Scripting (XSS). `.html()` gets or sets the raw inner markup of the element, instructing the browser to parse HTML tags and render them as actual DOM nodes.

#### Q4: "What is the difference between .attr() and .prop() on a checkbox?"
* **Answer:** `.attr()` accesses the element's HTML attribute as written in the markup string (representing its initial/default state). `.prop()` accesses the live JavaScript DOM object property (`HTMLInputElement.checked`), which is a boolean (`true` or `false`) that accurately changes whenever the user clicks or toggles the checkbox. During validation or user interaction, `.prop('checked')` must always be used.

#### Q5: "Why does a check in the browser never replace a check on the server?"
* **Answer:** Browser-side validation exists strictly for **User Experience (UX)** — to give instant visual feedback, catch typos, and save server bandwidth. It provides zero security because the client environment is completely untrusted: any visitor can bypass client validation by turning off JavaScript, editing input attributes (`required`, `maxlength`) via DevTools, or sending raw HTTP POST requests directly to the server using cURL, Postman, or custom Python scripts. The server must always independently sanitize, validate, and authorize all data.

#### Q6: "Live Task Preparation: How do we change an effect, add a field to validation, or extend a chain?"
* **Change an Effect:** Switch `.slideDown(400)` to `.fadeIn(600)` or `.slideToggle(300)`.
* **Add a Field to Validation:** Read new field value via `$.trim($('#new-field').val())`, test condition, call `showFieldError($('#new-field'), 'Error message')`, and clear in the `.on('input change')` listener.
* **Extend a Chain:** Add `.delay(200)` or `.toggleClass('shadow-lg')` onto an existing chain, e.g. `$('#booking-confirmation').stop(true, true).html(html).slideDown(400).delay(200).addClass('border-info');`.
* **Build One More Item from Array:** Append a new object into `CLUB_STATIONS` or `TOURNAMENTS_DATA` and invoke the render function; jQuery automatically builds and injects the new card into the grid.
