# AI Interaction Log — Web Assignments 2 & 3

In accordance with course AI policy, this log records questions asked to AI during the development of Assignment 2 (CSS Fundamentals) and Assignment 3 (Bootstrap 5 Responsive Layouts).

## Session 1 — September 18, 2026
* **Prompt:** How do CSS Grid `minmax()` and `repeat(auto-fit, ...)` work together for responsive cards without media queries?
* **Response Summary:** `grid-template-columns: repeat(auto-fit, minmax(200px, 1fr))` dynamically fits as many columns of at least 200px width as can fit in the container, stretching remaining space evenly using `1fr`.

## Session 2 — September 19, 2026
* **Prompt:** What is the difference between `position: relative` and `position: absolute` when making a badge on a card?
* **Response Summary:** Setting `position: relative` on the parent card establishes it as the containing block for absolute positioning. The child badge with `position: absolute` is then positioned relative to the top-right corner of the parent card rather than the page body.

## Session 3 — September 20, 2026
* **Prompt:** How to calculate CSS selector specificity for `(0, 1, 1, 0)` versus `(0, 0, 1, 0)`?
* **Response Summary:** Specificity is measured as (inline, IDs, classes/attributes/pseudo-classes, type/elements). `(0, 1, 1, 0)` has one ID and one class selector, which beats `(0, 0, 1, 0)` which only has one class selector regardless of rule order in the stylesheet.

## Session 4 — September 27, 2026 (Assignment 3)
* **Prompt:** How do Bootstrap 5 container and container-fluid differ, and when should each be chosen?
* **Response Summary:** `.container` has a max-width responsive cap at each breakpoint, centering content on large screens. `.container-fluid` takes 100% width across all viewports, ideal for wide data tables or pricing matrices.

## Session 5 — September 27, 2026 (Assignment 3)
* **Prompt:** How to structure Bootstrap 5 responsive grid column classes like `col-12 col-md-6 col-lg-4`?
* **Response Summary:** Mobile screens (<768px) stack 1 item per row (`col-12`), tablets (>=768px) display 2 items per row (`col-md-6`), and desktop screens (>=992px) display 3 items per row (`col-lg-4`).

## Session 6 — September 27, 2026 (Assignment 3)
* **Prompt:** How to customize Bootstrap Accordion components using dark utility background classes?
* **Response Summary:** Add `bg-dark`, `text-light`, and `bg-custom-card` classes to `.accordion-item` and `.accordion-button` to blend the official Bootstrap accordion markup seamlessly into dark gaming lounge color themes.

## Session 7 — September 30, 2026 (Assignment 3 Sync)
* **Prompt:** How to sync and harmonize navigation bars across all 7 Bootstrap pages after pulling new branch commits?
* **Response Summary:** Standardize navigation markup to use `<nav class="navbar navbar-expand-lg navbar-dark ...">` with `navbar-toggler` on all 7 pages (`index.html`, `services.html`, `events.html`, `booking.html`, `login.html`, `pc-specs.html`, `rules.html`), ensuring active state highlights and zero horizontal scrollbar on mobile.

## Session 8 — October 3, 2026 (Midterm Project — JavaScript Freeze & DOM Hooks)
* **Prompt:** What does an HTML/CSS freeze mean for preparing JavaScript DOM hooks, and how should ID naming and empty result containers be structured?
* **Response Summary:** An HTML/CSS freeze means all static elements, interactive hooks, and presentation state classes that JavaScript will later interact with must exist in advance in markup and stylesheets. This requires assigning lowercase, hyphenated English IDs to all forms, inputs, buttons, and dynamic blocks, adding empty result/alert containers with IDs for future data injection, and defining state classes (`.hidden`, `.active`, `.selected`, `.error`, `.success`) in CSS so JavaScript only needs to toggle classes on and off.

## Session 9 — October 4, 2026 (Midterm Project — User Journeys & Flow Completeness)
* **Prompt:** How can a multi-page static website ensure end-to-end logical completeness for a single visitor without a database server?
* **Response Summary:** Logical completeness requires that every interaction pathway has a definite beginning, working steps, and an on-screen conclusion: every call-to-action button navigates to an actual form or section, forms explicitly explain the submission outcome and feature dedicated visible confirmation blocks, tables and price cards provide calculation hooks and booking links, and no dead links or placeholder elements exist.

## Session 10 — October 20, 2026 (Interactive Theater-Style Seating Booking)
* **Prompt:** How to convert a standard cyber club reservation form into an interactive theater/cinema-style seat selection system that clearly indicates available vs occupied stations and assists users in understanding the booking process?
* **Response Summary:** Structure the booking interface like a modern cinema seating map with a front stage/screen indicator, distinct rows of stations across hardware zones (Standard Arena, VIP 1 Lounge, VIP 2 Bootcamp), visual color coding for seat statuses (Available in green/cyan, Occupied in red, Selected in glowing cyan), a clear status legend, real-time hardware specs inspection on hover, live cart synchronization and price calculation, quick-pick squad shortcuts (adjacent duo and 5-man team), and an instant confirmation ticket voucher with printable layout.

## Session 11 — October 24, 2026 (Assignment 4 — Variables, Arrays & Modular Data Engine)
* **Prompt:** How should we structure real venue data arrays (reviews, tournaments, tariffs, stations) in JavaScript using `const`, objects with 4+ properties, and traversals without modifying the frozen HTML?
* **Response Summary:** Define centralized, immutable arrays of objects (e.g. `REVIEWS_DATA`, `TOURNAMENTS_DATA`, `TARIFF_PACKAGES`, `CLUB_STATIONS`) at the top of each page-specific module. Use array methods like `.filter()`, `.find()`, and loops for search, filtering, and cost calculations. Keep functions pure with parameters and return values, and load scripts with `defer` to ensure execution after DOM parsing.

## Session 12 — October 24, 2026 (Assignment 5 — Dynamic DOM Creation & HTML Freeze Compliance)
* **Prompt:** How can we dynamically create and render complex interactive UI components (such as a 20-station cyber club seating map and tournament cards) entirely through DOM methods while adhering strictly to the midterm HTML/CSS freeze?
* **Response Summary:** Use `document.createElement()`, assign prepared Bootstrap classes and midterm state classes (`.selected`, `.active`, `.hidden`, `.error`, `.success`), attach event listeners via `addEventListener()`, and insert new elements into existing frozen containers (`#booking-form`, `#events-card-container`, `#reviews-section`) using `appendChild()` or `insertBefore()`. This satisfies the dynamic DOM requirements of Assignment 5 while maintaining zero unauthorized markup modifications.

## Session 13 — October 24, 2026 (Assignment 5 — Form Validation & Regex Password Checklist)
* **Prompt:** How should client-side form validation be structured to display field-level error messages, focus the first invalid field, and display a live regular expression password checklist without saving passwords?
* **Response Summary:** Listen to `input` events on the password and confirmation inputs to dynamically evaluate length (`/.{8,}/`), uppercase (`/[A-Z]/`), lowercase (`/[a-z]/`), digit (`/[0-9]/`), special character, and equality, updating checklist icon states and colors in real time. On form submission, run field-level checks, focus `firstInvalidField`, prevent default browser submission, and display a demonstration summary voucher with a `Math.random()` reference number while never persisting password values.
