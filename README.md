# QazaqPeek Cyber Club — Assignment 3 (Bootstrap 5 Responsive Design)

## Project Overview
This is the third assignment for Introduction to Web Technologies course. We rebuilt the layout of our website for **QazaqPeek Cyber Club** located at Kenesary Street 69 in Astana using **Bootstrap 5.3.3 CDN**. 

Bootstrap handles the core layout, responsive grid system, mobile navigation toggler, buttons, and component structure. Our custom CSS stylesheets were reduced to a minimal correction layer for QazaqPeek brand colors (`#0f172a`, `#1e293b`, `#38bdf8`).

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

* **Both Students Together**:
  - `css/base.css` (Shared brand color corrections and dark mode overrides)
  - `css_changes.txt` (Inventory of deleted custom CSS rules and replacement Bootstrap classes)
  - Screenshots in `screenshots/` directory

## Key Assignment 3 Features Included
* **Bootstrap 5.3.3 CDN**: Linked from CDN in `<head>` before custom stylesheets, with JS bundle before `</body>`. Version comments included on every page.
* **Containers & Grid System**: Used `.container` across most pages and `.container-fluid` on `services.html` with justification comments. Grid columns respond across 3 breakpoints (`col-12 col-md-6 col-lg-4`).
* **Nested Grid**: Demonstrated grid nesting on `services.html` (`.row` inside `.col-12 col-lg-8`), `booking.html`, and `rules.html`.
* **Responsive Navigation**: Working Bootstrap mobile hamburger toggler menu (`navbar-toggler`) on all 7 pages. Zero horizontal scrollbar at 375px mobile width.
* **Responsive Utilities**: Applied `d-none d-md-block` and `text-center text-md-start` responsive display/text classes.
* **Typography & Buttons**: Display headings (`display-6`), lead text, muted small text, and button variants (`.btn-primary`, `.btn-info`, `.btn-outline-info`, `.btn-lg`/`.btn-sm`, `.disabled`).
* **Bootstrap Components**:
  - **Accordion**: Integrated on `services.html` and `rules.html` for Club Rules & FAQ with documentation comments.
  - **Cards & Badges**: Integrated across `index.html`, `events.html`, `pc-specs.html`, `booking.html`, and `rules.html`.
  - **Modal**: Integrated on `booking.html` for Station Reservation Verification.
* **CSS Cleanup**: Deleted hand-built floats, flex navigation, manual grids, and button styles. Listed all removals in `css_changes.txt`.

## File Organization
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
