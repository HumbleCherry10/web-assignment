/**
 * QazaqPeek Cyber Club Astana - Specs & Rules Controller
 * Author: Adilet Ainadinov
 */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Driver Pre-Load Form (pc-specs.html)
  const driverForm = document.getElementById('driver-request-form');
  const driverSoftware = document.getElementById('driver-software');
  const targetZone = document.getElementById('target-zone');
  const gamerPhone = document.getElementById('gamer-phone');
  const driverFeedback = document.getElementById('driver-feedback');

  if (driverForm && driverSoftware && targetZone && gamerPhone && driverFeedback) {
    driverForm.noValidate = true;

    driverForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const phone = gamerPhone.value.trim();
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

      if (!phoneRegex.test(phone)) {
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
      const driver = driverSoftware.options[driverSoftware.selectedIndex].text;
      const zone = targetZone.options[targetZone.selectedIndex].text;

      driverFeedback.className = 'alert alert-success mt-4';
      driverFeedback.innerHTML = `
        <h4 class="alert-heading h5 fw-bold">⚙️ Pre-Load Configuration Request Recorded!</h4>
        <p class="mb-1">Our administrators will pre-install <strong>${driver}</strong> on an available station in <strong>${zone}</strong>.</p>
        <hr class="border-secondary">
        <div class="d-flex flex-wrap justify-content-between small">
          <span>Ticket: <strong>${ticketRef}</strong></span>
          <span>Contact: <strong>${phone}</strong></span>
          <span>Status: <strong>Queued for Bench Setup</strong></span>
        </div>
        <p class="small text-muted mt-2 mb-0">* Demonstration Request (No network commands sent).</p>
      `;
      driverFeedback.classList.remove('d-none');
      driverFeedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      driverForm.reset();
    });
  }

  // 2. Live FAQ Search & Filter (rules.html)
  const faq = document.getElementById('faqAccordion');
  if (faq) {
    const searchBox = document.createElement('div');
    searchBox.className = 'mb-4';
    searchBox.innerHTML = `
      <input type="search" id="faq-search-input" class="form-control bg-dark text-light border-secondary" placeholder="Search rules & FAQ (e.g. food, peripherals, age, night package)...">
      <div class="text-muted small mt-2" id="faq-search-status"></div>
    `;
    faq.before(searchBox);

    const searchInput = document.getElementById('faq-search-input');
    const statusText = document.getElementById('faq-search-status');
    const items = faq.querySelectorAll('.accordion-item');

    searchInput.addEventListener('input', () => {
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

      statusText.textContent = q === '' ? '' : `Found ${matches} matching rules in FAQ.`;
    });
  }

  // 3. Ask an Administrator Form (rules.html)
  const inquiryForm = document.getElementById('inquiry-form');
  const inquiryName = document.getElementById('inquiry-name');
  const inquiryContact = document.getElementById('inquiry-contact');
  const inquiryMessage = document.getElementById('inquiry-message');
  const inquiryFeedback = document.getElementById('inquiry-feedback');

  if (inquiryForm && inquiryName && inquiryContact && inquiryMessage && inquiryFeedback) {
    inquiryForm.noValidate = true;

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
      inquiryFeedback.className = 'alert alert-success mt-4';
      inquiryFeedback.innerHTML = `
        <h4 class="alert-heading h5 fw-bold">Inquiry Sent to Club Administrators!</h4>
        <p class="mb-1">Thank you, <strong>${name}</strong>. Your question has been routed to the reception desk.</p>
        <hr class="border-secondary">
        <div class="d-flex flex-wrap justify-content-between small">
          <span>Ticket: <strong>${ref}</strong></span>
          <span>Contact: <strong>${contact}</strong></span>
          <span>Status: <strong>Response within 15 mins</strong></span>
        </div>
        <p class="small text-muted mt-2 mb-0">* Demonstration Submission.</p>
      `;
      inquiryFeedback.classList.remove('d-none');
      inquiryFeedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      inquiryForm.reset();
      charCounter.textContent = '0 / 300 (min 10 chars)';
    });
  }
});
