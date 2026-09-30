# QazaqPeek Cyber Club — CSS Cleanup & Bootstrap Migration Inventory

**Authors:** Dias Tursynbay & Adilet Ainadinov  
**Course:** Introduction to Web Technologies (Assignment 3)

This document inventory details all custom CSS rules from Assignment 2 that were deleted and replaced by **Bootstrap 5.3.3** framework utility classes and layout components in Assignment 3.

---

## Removals & Replacement Mapping

| # | Removed Custom CSS Rule (Assignment 2) | Bootstrap 5.3.3 Replacement Class(es) |
|---|---------------------------------------|---------------------------------------|
| 1 | **Navigation Flexbox**<br>`nav ul { display: flex; flex-direction: row; justify-content: center; gap: 15px; }` | `.navbar`, `.navbar-expand-lg`, `.navbar-nav`, `.nav-item`, `.nav-link`, `.navbar-toggler` |
| 2 | **Hand-written CSS Grid**<br>`.events-grid, .colophon-grid { display: grid; grid-template-columns: repeat(...); gap: 20px; }` | `.row`, `.col-12`, `.col-md-6`, `.col-lg-4`, `.g-3`, `.g-4` |
| 3 | **Image Floats & Clearing**<br>`.floated-facility-img { float: left }`, `.clear-after-float { clear: left }` | `.row`, `.col-md-4`, `.col-md-8`, `.img-fluid`, `.rounded` |
| 4 | **Form Flexbox Rows**<br>`.form-row-flex { display: flex; flex-wrap: wrap }` | `.row`, `.col-md-6`, `.form-control`, `.form-select` |
| 5 | **Custom Button Styling**<br>`button, .btn-submit { background: #38bdf8; border: ... }` | `.btn`, `.btn-primary`, `.btn-info`, `.btn-outline-info`, `.btn-lg`, `.btn-sm`, `.disabled` |
| 6 | **Main Container Centering**<br>`main { max-width: 1000px; margin: 20px auto }` | `.container`, `.container-fluid`, `.py-4`, `.px-4` |
| 7 | **Custom Badge Positioning**<br>`.badge-popular { position: absolute; background: ... }` | `.badge`, `.bg-warning`, `.bg-info`, `.position-absolute`, `.top-0`, `.end-0` |
| 8 | **Manual Spacing & Margins**<br>`margin-bottom: 25px; padding: 20px;` | `.my-4`, `.mb-3`, `.mb-4`, `.py-3`, `.p-4`, `.gap-3` |
| 9 | **Custom Table Shading & Borders**<br>`table { width: 100% }`, `th, td { border: 1px solid }` | `.table`, `.table-dark`, `.table-hover`, `.table-striped`, `.table-bordered` |
| 10 | **Responsive Media Queries**<br>`@media (max-width: 768px) { ... }` | Bootstrap responsive breakpoints (`col-sm`, `col-md`, `col-lg`, `d-none`, `d-md-block`) |

---

## Retained Correction Layers

Our custom CSS files were reduced to minimal brand overrides:
* **`css/base.css`**: Shared dark theme baseline (`#0f172a` body background, `#1e293b` card fill, `#38bdf8` cyan text accent, focus outline styles).
* **`css/dias.css`**: Dias's custom hero gradient background and image thumbnail hover scaling.
* **`css/adilet.css`**: Adilet's form card container, required field indicator (`::after`), table header color override, and floating back-to-top button.
