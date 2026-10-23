/**
 * ================================================================================
 * QAZAQPEEK CYBER CLUB ASTANA — PC SPECS & HOUSE RULES CONTROLLER
 * File: js/specs.js
 * Author: Adilet Ainadinov
 * Features:
 *   - Peripheral Driver & DPI Pre-Configuration Request Validation (pc-specs.html)
 *   - Random Hardware Ticket Reference Generator via Math.random()
 *   - Real-Time FAQ Keyword Search & Filter Engine (rules.html)
 *   - Administrator Inquiry Form Validation with Character Counter (rules.html)
 * ================================================================================
 */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
  // 1. DRIVER PRE-LOAD FORM (pc-specs.html)
  const driverForm = document.getElementById('driver-request-form');
  const driverSoftware = document.getElementById('driver-software');
  const targetZone = document.getElementById('target-zone');
  const gamerPhone = document.getElementById('gamer-phone');
  const dpiNotes = document.getElementById('dpi-notes');
  const driverFeedback = document.getElementById('driver-feedback');

  if (driverForm && driverSoftware && targetZone && gamerPhone && driverFeedback) {
    driverForm.noValidate = true;

    driverForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const phoneVal = gamerPhone.value.trim();
      const phoneRegex = /^\+?[0-9\s\-()]{10,18}$/;
      let firstInvalid = null;

      if (!driverSoftware.value) {
        driverSoftware.classList.add('is-invalid');
        if (!firstInvalid) firstInvalid = driverSoftware;
      } else {
        driverSoftware.classList.remove('is-invalid');
      }

      if (!targetZone.value) {
        targetZone.classList.add('is-invalid');
        if (!firstInvalid) firstInvalid = targetZone;
      } else {
        targetZone.classList.remove('is-invalid');
      }

      if (!phoneRegex.test(phoneVal)) {
        gamerPhone.classList.add('is-invalid');
        if (!firstInvalid) firstInvalid = gamerPhone;
      } else {
        gamerPhone.classList.remove('is-invalid');
      }

      if (firstInvalid) {
        firstInvalid.focus();
        return;
      }

      const ticketRef = `QP-CFG-${Math.floor(100 + Math.random() * 900)}`;
      const selectedDriver = driverSoftware.options[driverSoftware.selectedIndex].text;
      const selectedZone = targetZone.options[targetZone.selectedIndex].text;

      driverFeedback.className = 'alert alert-success mt-4';
      driverFeedback.innerHTML = `
        <h4 class="alert-heading h5 fw-bold">⚙️ Pre-Load Configuration Request Recorded!</h4>
        <p class="mb-1">Our technical administrators will pre-install <strong>${selectedDriver}</strong> on an available station in <strong>${selectedZone}</strong>.</p>
        <hr class="border-secondary">
        <div class="d-flex flex-wrap justify-content-between small">
          <span>Ticket: <strong>${ticketRef}</strong></span>
          <span>Contact: <strong>${phoneVal}</strong></span>
          <span>Status: <strong>Queued for Bench Setup</strong></span>
        </div>
        <p class="small text-muted mt-2 mb-0">* Demonstration Request: No network configuration commands were sent.</p>
      `;
      driverFeedback.classList.remove('d-none');
      driverFeedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      driverForm.reset();
    });
  }

  // 2. LIVE FAQ SEARCH & ACCORDION FILTER (rules.html)
  const faqAccordion = document.getElementById('faqAccordion');
  if (faqAccordion) {
    const searchWrapper = document.createElement('div');
    searchWrapper.className = 'mb-4';

    const searchInput = document.createElement('input');
    searchInput.type = 'search';
    searchInput.id = 'faq-search-input';
    searchInput.className = 'form-control bg-dark text-light border-secondary';
    searchInput.placeholder = 'Search house rules & FAQ (e.g. food, peripherals, age, night package)...';

    const countStatus = document.createElement('div');
    countStatus.className = 'text-muted small mt-2';
    countStatus.id = 'faq-search-status';

    searchWrapper.appendChild(searchInput);
    searchWrapper.appendChild(countStatus);
    faqAccordion.parentNode.insertBefore(searchWrapper, faqAccordion);

    const accordionItems = faqAccordion.querySelectorAll('.accordion-item');

    searchInput.addEventListener('input', () => {
      const query = searchInput.value.trim().toLowerCase();
      let matchCount = 0;

      accordionItems.forEach(item => {
        const text = item.textContent.toLowerCase();
        const collapseEl = item.querySelector('.accordion-collapse');
        const buttonEl = item.querySelector('.accordion-button');

        if (query === '' || text.includes(query)) {
          item.classList.remove('d-none');
          matchCount++;
          if (query !== '' && collapseEl) {
            collapseEl.classList.add('show');
            if (buttonEl) buttonEl.classList.remove('collapsed');
          }
        } else {
          item.classList.add('d-none');
          if (collapseEl) {
            collapseEl.classList.remove('show');
            if (buttonEl) buttonEl.classList.add('collapsed');
          }
        }
      });

      if (query === '') {
        countStatus.textContent = '';
      } else {
        countStatus.textContent = `Found ${matchCount} matching rules in FAQ.`;
      }
    });
  }

  // 3. ASK AN ADMINISTRATOR INQUIRY FORM (rules.html)
  const inquiryForm = document.getElementById('inquiry-form');
  const inquiryName = document.getElementById('inquiry-name');
  const inquiryContact = document.getElementById('inquiry-contact');
  const inquiryTopic = document.getElementById('inquiry-topic');
  const inquiryMessage = document.getElementById('inquiry-message');
  const inquiryFeedback = document.getElementById('inquiry-feedback');

  if (inquiryForm && inquiryName && inquiryContact && inquiryMessage && inquiryFeedback) {
    inquiryForm.noValidate = true;

    // Add Character Counter to Inquiry Message
    const charCountEl = document.createElement('div');
    charCountEl.className = 'text-end text-muted small mt-1';
    charCountEl.textContent = '0 / 300 characters (minimum 10 required)';
    inquiryMessage.parentNode.appendChild(charCountEl);

    inquiryMessage.addEventListener('input', () => {
      const len = inquiryMessage.value.length;
      charCountEl.textContent = `${len} / 300 characters (minimum 10 required)`;
      if (len >= 10) {
        charCountEl.className = 'text-end text-muted small mt-1';
      } else {
        charCountEl.className = 'text-end text-danger small mt-1';
      }
    });

    inquiryForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const nameVal = inquiryName.value.trim();
      const contactVal = inquiryContact.value.trim();
      const messageVal = inquiryMessage.value.trim();
      let firstInvalid = null;

      if (nameVal.length < 2) {
        inquiryName.classList.add('is-invalid');
        if (!firstInvalid) firstInvalid = inquiryName;
      } else {
        inquiryName.classList.remove('is-invalid');
      }

      if (contactVal.length < 5) {
        inquiryContact.classList.add('is-invalid');
        if (!firstInvalid) firstInvalid = inquiryContact;
      } else {
        inquiryContact.classList.remove('is-invalid');
      }

      if (messageVal.length < 10) {
        inquiryMessage.classList.add('is-invalid');
        if (!firstInvalid) firstInvalid = inquiryMessage;
      } else {
        inquiryMessage.classList.remove('is-invalid');
      }

      if (firstInvalid) {
        firstInvalid.focus();
        return;
      }

      const inquiryRef = `QP-INQ-${Math.floor(1000 + Math.random() * 9000)}`;

      inquiryFeedback.className = 'alert alert-success mt-4';
      inquiryFeedback.innerHTML = `
        <h4 class="alert-heading h5 fw-bold">Inquiry Sent to Club Administrators!</h4>
        <p class="mb-1">Thank you, <strong>${nameVal}</strong>. Your question regarding <strong>${inquiryTopic ? inquiryTopic.options[inquiryTopic.selectedIndex].text : 'General Club Inquiries'}</strong> has been routed to the reception desk.</p>
        <hr class="border-secondary">
        <div class="d-flex flex-wrap justify-content-between small">
          <span>Inquiry Ticket: <strong>${inquiryRef}</strong></span>
          <span>Contact: <strong>${contactVal}</strong></span>
          <span>Avg Response: <strong>Within 15 minutes</strong></span>
        </div>
        <p class="small text-muted mt-2 mb-0">* Demonstration Submission: No actual inquiry dispatched to server.</p>
      `;
      inquiryFeedback.classList.remove('d-none');
      inquiryFeedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      inquiryForm.reset();
      charCountEl.textContent = '0 / 300 characters (minimum 10 required)';
    });
  }
});
