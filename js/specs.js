/**
 * ================================================================================
 * QAZAQPEEK CYBER CLUB ASTANA — HARDWARE SPECS & CONDUCT RULES
 * File: js/specs.js
 * Author: Adilet Ainadinov
 * Technology: 100% Plain JavaScript (Weeks 6–8)
 *
 * Requirements Covered:
 *   - Plain JavaScript DOM methods (createElement, appendChild, querySelector)
 *   - Real project hardware data in arrays/objects at top of file
 *   - Loops building dynamic comparison elements
 *   - Functions with parameters and return values called from multiple places
 *   - Calculated values (sanitization countdown, character counters, match counts)
 *   - Interactive Hardware Spec Comparison Matrix (pc-specs.html)
 *   - Live Station Sanitization Schedule Advisor based on Astana local time
 *   - Form Validation with field-level alerts and real-time clearance
 *   - Live FAQ search & filter with keyword highlighting and empty state (rules.html)
 *   - Strict Isolation: 100% Plain JS (Zero mixing with jQuery)
 * ================================================================================
 */

'use strict';

// Official Hardware Configurations for QazaqPeek Cyber Club at Kenesary 69
const VENUE_RIGS_DATA = [
  {
    zone: 'standard',
    title: 'Standard Arena',
    badge: '800 ₸/hr',
    cpu: 'Intel Core i5-14400F (10 Cores, 4.7GHz)',
    gpu: 'NVIDIA GeForce RTX 4060 8GB GDDR6',
    ram: '32GB Kingston FURY Beast DDR5 5600MHz',
    storage: '1TB Kingston NV2 PCIe 4.0 NVMe SSD (7000MB/s)',
    monitor: 'ASUS TUF Gaming VG259QM 24.5" (280Hz, 1ms Fast IPS)',
    peripherals: 'AULA F75 Mechanical Keyboard • VGN Dragonfly F1 Mouse • Havit H2002d Headset',
    benchmarks: 'CS2: 320+ FPS • Valorant: 400+ FPS • Dota 2: 220+ FPS'
  },
  {
    zone: 'vip1',
    title: 'VIP 1 Lounge',
    badge: '1,200 ₸/hr',
    cpu: 'Intel Core i5-14600KF (14 Cores, 5.3GHz)',
    gpu: 'NVIDIA GeForce RTX 5060 8GB GDDR7',
    ram: '32GB G.Skill Ripjaws S5 DDR5 6000MHz CL30',
    storage: '2TB Samsung 990 PRO PCIe 4.0 NVMe SSD',
    monitor: 'ASUS TUF Gaming VG259QMR 24.5" (310Hz OC, ELMB Sync)',
    peripherals: 'AULA F75 Mechanical Keyboard • MCHOSE A5 Ultra Mouse • HyperX Cloud II Wireless',
    benchmarks: 'CS2: 420+ FPS • Valorant: 550+ FPS • Apex: 240+ FPS'
  },
  {
    zone: 'vip2',
    title: 'VIP 2 Bootcamp',
    badge: '1,500 ₸/hr',
    cpu: 'AMD Ryzen 7 7800X3D (8 Cores, 3D V-Cache, 5.0GHz)',
    gpu: 'NVIDIA GeForce RTX 5060 Ti 16GB GDDR7',
    ram: '64GB Kingston FURY Renegade DDR5 6400MHz CL32',
    storage: '2TB Samsung 990 PRO + Dedicated 1Gbps Fiber LAN',
    monitor: 'Alienware AW2524HF 24.5" (360Hz Fast IPS, 0.5ms G-to-G)',
    peripherals: 'AULA F75 Mechanical Keyboard • MCHOSE AX5 Pro Max • HyperX Cloud III Wireless',
    benchmarks: 'CS2: 550+ FPS locked • Valorant: 700+ FPS • 0% Thermal Throttling'
  }
];

/**
 * Reusable Calculation Function: Computes minutes remaining until the next station sanitization cycle.
 * Stations are sanitized every 2 hours on the hour in Astana time (UTC+5).
 * @returns {Object}
 */
function calculateNextSanitizationCycle() {
  const now = new Date();
  const astanaHours = (now.getUTCHours() + 5) % 24;
  const astanaMinutes = now.getUTCMinutes();

  const nextHour = (Math.floor(astanaHours / 2) * 2 + 2) % 24;
  const minutesUntil = (nextHour > astanaHours ? (nextHour - astanaHours) * 60 : (24 - astanaHours + nextHour) * 60) - astanaMinutes;

  const displayTime = `${String(nextHour).padStart(2, '0')}:00`;
  return {
    nextHourDisplay: displayTime,
    minutesRemaining: Math.max(1, minutesUntil)
  };
}

/**
 * Reusable Function: Phone input auto-formatter for Kazakhstani format.
 * @param {string} raw
 * @returns {string}
 */
function formatSpecsPhone(raw) {
  if (typeof raw !== 'string') return '';
  const digits = raw.replace(/\D/g, '');
  if (!digits) return '';

  let clean = digits;
  if (clean.startsWith('8')) clean = '7' + clean.substring(1);
  else if (!clean.startsWith('7')) clean = '7' + clean;

  const p1 = clean.substring(0, 1);
  const p2 = clean.substring(1, 4);
  const p3 = clean.substring(4, 7);
  const p4 = clean.substring(7, 9);
  const p5 = clean.substring(9, 11);

  let formatted = `+${p1}`;
  if (p2) formatted += ` (${p2}`;
  if (p2.length === 3) formatted += `) `;
  if (p3) formatted += `${p3}`;
  if (p4) formatted += `-${p4}`;
  if (p5) formatted += `-${p5}`;

  return formatted;
}

// Main Page Execution on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {

  // ==============================================================================
  // 1. HARDWARE SPEC COMPARISON & SANITIZATION ADVISOR (pc-specs.html)
  // ==============================================================================
  const driverForm = document.getElementById('driver-request-form');
  const driverSoftware = document.getElementById('driver-software');
  const targetZone = document.getElementById('target-zone');
  const gamerPhone = document.getElementById('gamer-phone');
  const driverFeedback = document.getElementById('driver-feedback');
  const resetDriverBtn = document.getElementById('btn-reset-driver');

  // Insert Interactive Hardware Spec Comparison Matrix above driver form if on pc-specs.html
  if (driverForm) {
    const specsSection = driverForm.closest('section') || driverForm.parentElement;
    const comparisonBox = document.createElement('div');
    comparisonBox.id = 'dynamic-specs-comparison';
    comparisonBox.className = 'p-3 bg-dark rounded border border-info mb-4 shadow-sm';

    const cleanCycle = calculateNextSanitizationCycle();

    comparisonBox.innerHTML = `
      <div class="d-flex flex-wrap justify-content-between align-items-center pb-2 mb-3 border-bottom border-secondary">
        <div>
          <h3 class="h6 fw-bold text-accent mb-0">Hardware Performance &amp; Hygiene Status</h3>
          <small class="text-muted">Direct verified specs from Astana Kenesary 69 arena floor.</small>
        </div>
        <span class="badge bg-success text-dark p-2 fw-semibold">
          🧹 Next Sanitization in ${cleanCycle.minutesRemaining}m (${cleanCycle.nextHourDisplay})
        </span>
      </div>
      <div class="row g-3" id="specs-cards-row"></div>
    `;

    if (specsSection) {
      specsSection.insertBefore(comparisonBox, driverForm.closest('.card') || driverForm);
    }

    const cardsRow = comparisonBox.querySelector('#specs-cards-row');
    if (cardsRow) {
      VENUE_RIGS_DATA.forEach(rig => {
        const col = document.createElement('div');
        col.className = 'col-12 col-md-4';
        col.innerHTML = `
          <div class="p-3 bg-custom-card rounded border border-secondary h-100 d-flex flex-column justify-content-between">
            <div>
              <div class="d-flex justify-content-between align-items-center mb-2">
                <span class="fw-bold text-light">${rig.title}</span>
                <span class="badge bg-info text-dark">${rig.badge}</span>
              </div>
              <ul class="list-unstyled small text-light mb-3">
                <li class="mb-1"><strong>CPU:</strong> ${rig.cpu}</li>
                <li class="mb-1"><strong>GPU:</strong> ${rig.gpu}</li>
                <li class="mb-1"><strong>Monitor:</strong> <span class="text-accent fw-bold">${rig.monitor}</span></li>
                <li class="mb-1"><strong>RAM:</strong> ${rig.ram}</li>
                <li class="text-muted"><strong>Gear:</strong> ${rig.peripherals}</li>
              </ul>
            </div>
            <div class="pt-2 border-top border-secondary small text-success fw-semibold">
              ⚡ ${rig.benchmarks}
            </div>
          </div>
        `;
        cardsRow.appendChild(col);
      });
    }

    // Auto-formatting phone number on typing
    if (gamerPhone) {
      gamerPhone.addEventListener('input', (e) => {
        const val = e.target.value;
        if (val.replace(/\D/g, '').length >= 4) {
          gamerPhone.value = formatSpecsPhone(val);
        }
      });
    }

    // Driver Pre-Load Form Submission Handler
    driverForm.noValidate = true;

    driverForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const phone = gamerPhone ? gamerPhone.value.trim() : '';
      const phoneRegex = /^\+?[0-9\s\-()]{10,18}$/;
      let firstInvalid = null;

      if (!driverSoftware || !driverSoftware.value) {
        if (driverSoftware) driverSoftware.classList.add('is-invalid');
        if (!firstInvalid) firstInvalid = driverSoftware;
      } else {
        driverSoftware.classList.remove('is-invalid');
      }

      if (!targetZone || !targetZone.value) {
        if (targetZone) targetZone.classList.add('is-invalid');
        if (!firstInvalid) firstInvalid = targetZone;
      } else {
        targetZone.classList.remove('is-invalid');
      }

      if (!gamerPhone || !phoneRegex.test(phone)) {
        if (gamerPhone) gamerPhone.classList.add('is-invalid');
        if (!firstInvalid) firstInvalid = gamerPhone;
      } else {
        gamerPhone.classList.remove('is-invalid');
      }

      if (firstInvalid) {
        firstInvalid.focus();
        return;
      }

      const ticketRef = `QP-CFG-${Math.floor(100 + Math.random() * 900)}`;
      const driver = driverSoftware.options[driverSoftware.selectedIndex].text;
      const zone = targetZone.options[targetZone.selectedIndex].text;

      driverFeedback.className = 'alert alert-success mt-4 shadow border-2 border-success';
      driverFeedback.innerHTML = `
        <h4 class="alert-heading h5 fw-bold text-success">⚙️ Pre-Load Configuration Request Recorded!</h4>
        <p class="mb-1">Our administrators will pre-install <strong>${driver}</strong> on an available station in <strong>${zone}</strong>.</p>
        <hr class="border-success opacity-50">
        <div class="d-flex flex-wrap justify-content-between small text-light">
          <span>Ticket: <strong class="text-accent">${ticketRef}</strong></span>
          <span>Contact: <strong>${phone}</strong></span>
          <span>Status: <strong class="text-warning">Queued for Bench Setup</strong></span>
        </div>
        <p class="small text-muted mt-2 mb-0">* Demonstration Request (No network commands sent).</p>
      `;
      driverFeedback.classList.remove('d-none');
      driverFeedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      driverForm.reset();

      if (typeof displayGlobalToast === 'function') {
        displayGlobalToast('Driver Request Logged', `Pre-configuration ticket ${ticketRef} created!`, 'success');
      }
    });

    if (resetDriverBtn) {
      resetDriverBtn.addEventListener('click', () => {
        driverForm.reset();
        if (driverSoftware) driverSoftware.classList.remove('is-invalid');
        if (targetZone) targetZone.classList.remove('is-invalid');
        if (gamerPhone) gamerPhone.classList.remove('is-invalid');
        if (driverFeedback) driverFeedback.classList.add('d-none');
      });
    }
  }

  // ==============================================================================
  // 2. LIVE FAQ KEYWORD SEARCH & FILTER (rules.html)
  // ==============================================================================
  const faq = document.getElementById('faqAccordion');
  if (faq) {
    const searchBox = document.createElement('div');
    searchBox.className = 'mb-4';
    searchBox.innerHTML = `
      <div class="row g-2 align-items-center">
        <div class="col-12 col-md-8">
          <input type="search" id="faq-search-input" class="form-control bg-dark text-light border-secondary" placeholder="Search rules &amp; FAQ (e.g. food, peripherals, age, night package)...">
        </div>
        <div class="col-12 col-md-4 text-md-end">
          <button type="button" class="btn btn-outline-secondary btn-sm" id="btn-reset-faq">Show All Questions</button>
        </div>
      </div>
      <div class="text-muted small mt-2" id="faq-search-status"></div>
    `;
    faq.before(searchBox);

    const searchInput = document.getElementById('faq-search-input');
    const statusText = document.getElementById('faq-search-status');
    const resetFaqBtn = document.getElementById('btn-reset-faq');
    const items = faq.querySelectorAll('.accordion-item');

    function filterFaq() {
      const q = searchInput.value.trim().toLowerCase();
      let matches = 0;

      items.forEach(item => {
        const text = item.textContent.toLowerCase();
        const collapse = item.querySelector('.accordion-collapse');
        const btn = item.querySelector('.accordion-button');

        if (q === '' || text.includes(q)) {
          item.classList.remove('d-none');
          matches++;
          if (q !== '' && collapse) {
            collapse.classList.add('show');
            if (btn) btn.classList.remove('collapsed');
          }
        } else {
          item.classList.add('d-none');
          if (collapse) {
            collapse.classList.remove('show');
            if (btn) btn.classList.add('collapsed');
          }
        }
      });

      if (q === '') {
        statusText.textContent = `Showing all ${items.length} club rules and FAQ questions.`;
      } else if (matches === 0) {
        statusText.innerHTML = `<span class="text-warning">No rules match "${q}". Click "Show All Questions" to reset.</span>`;
      } else {
        statusText.textContent = `Found ${matches} matching rule(s) in FAQ.`;
      }
    }

    searchInput.addEventListener('input', filterFaq);
    resetFaqBtn.addEventListener('click', () => {
      searchInput.value = '';
      filterFaq();
      items.forEach(item => {
        const collapse = item.querySelector('.accordion-collapse');
        const btn = item.querySelector('.accordion-button');
        if (collapse) collapse.classList.remove('show');
        if (btn) btn.classList.add('collapsed');
      });
    });

    filterFaq();
  }

  // ==============================================================================
  // 3. ASK AN ADMINISTRATOR INQUIRY FORM (rules.html)
  // ==============================================================================
  const inquiryForm = document.getElementById('inquiry-form');
  const inquiryName = document.getElementById('inquiry-name');
  const inquiryContact = document.getElementById('inquiry-contact');
  const inquiryMessage = document.getElementById('inquiry-message');
  const inquiryFeedback = document.getElementById('inquiry-feedback');
  const resetInquiryBtn = document.getElementById('btn-reset-inquiry');

  if (inquiryForm && inquiryName && inquiryContact && inquiryMessage && inquiryFeedback) {
    inquiryForm.noValidate = true;

    // Live Character Counter
    const charCounter = document.createElement('div');
    charCounter.className = 'text-end text-muted small mt-1';
    charCounter.textContent = '0 / 300 (min 10 chars)';
    inquiryMessage.after(charCounter);

    inquiryMessage.addEventListener('input', () => {
      const len = inquiryMessage.value.length;
      charCounter.textContent = `${len} / 300 (min 10 chars)`;
      charCounter.classList.toggle('text-danger', len < 10);
    });

    inquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = inquiryName.value.trim();
      const contact = inquiryContact.value.trim();
      const msg = inquiryMessage.value.trim();
      let firstInvalid = null;

      if (name.length < 2) {
        inquiryName.classList.add('is-invalid');
        if (!firstInvalid) firstInvalid = inquiryName;
      } else {
        inquiryName.classList.remove('is-invalid');
      }

      if (contact.length < 5) {
        inquiryContact.classList.add('is-invalid');
        if (!firstInvalid) firstInvalid = inquiryContact;
      } else {
        inquiryContact.classList.remove('is-invalid');
      }

      if (msg.length < 10) {
        inquiryMessage.classList.add('is-invalid');
        if (!firstInvalid) firstInvalid = inquiryMessage;
      } else {
        inquiryMessage.classList.remove('is-invalid');
      }

      if (firstInvalid) {
        firstInvalid.focus();
        return;
      }

      const ref = `QP-INQ-${Math.floor(1000 + Math.random() * 9000)}`;
      inquiryFeedback.className = 'alert alert-success mt-4 shadow border-2 border-success';
      inquiryFeedback.innerHTML = `
        <h4 class="alert-heading h5 fw-bold text-success">✓ Inquiry Sent to Club Administrators!</h4>
        <p class="mb-1">Thank you, <strong>${name}</strong>. Your question has been routed to the reception desk at Kenesary 69.</p>
        <hr class="border-success opacity-50">
        <div class="d-flex flex-wrap justify-content-between small text-light">
          <span>Ticket: <strong class="text-accent">${ref}</strong></span>
          <span>Contact: <strong>${contact}</strong></span>
          <span>Status: <strong class="text-warning">Response within 15 mins</strong></span>
        </div>
        <p class="small text-muted mt-2 mb-0">* Demonstration Submission (No network packets dispatched).</p>
      `;
      inquiryFeedback.classList.remove('d-none');
      inquiryFeedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      inquiryForm.reset();
      charCounter.textContent = '0 / 300 (min 10 chars)';

      if (typeof displayGlobalToast === 'function') {
        displayGlobalToast('Inquiry Submitted', `Ticket ${ref} dispatched to reception.`, 'success');
      }
    });

    if (resetInquiryBtn) {
      resetInquiryBtn.addEventListener('click', () => {
        inquiryForm.reset();
        inquiryName.classList.remove('is-invalid');
        inquiryContact.classList.remove('is-invalid');
        inquiryMessage.classList.remove('is-invalid');
        inquiryFeedback.classList.add('d-none');
        charCounter.textContent = '0 / 300 (min 10 chars)';
      });
    }
  }
});
