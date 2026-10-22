/**
 * ================================================================================
 * QAZAQPEEK CYBER CLUB ASTANA — THEATER-STYLE SEATING MAP & BOOKING ENGINE
 * File: js/booking.js
 * Author: Adilet Ainadinov
 * Features:
 *   - Visual Cyber Club Seating Map dynamically injected via JavaScript DOM methods
 *   - 20 Stations across Standard Arena, VIP 1 Lounge, and VIP 2 Bootcamp
 *   - Real-time Station Selection, Zone Sync & Party Size Auto-Adjustment
 *   - Live Price Calculator synchronizing tariff packages and duration
 *   - Complete 4-Field Form Validation + Date & Cross-field validations
 *   - Instant Demonstration Voucher with Math.random() Reference Code
 * ================================================================================
 */

'use strict';

/**
 * 1. OFFICIAL VENUE PRICING MATRIX & SEATING DATA
 */
const BOOKING_PRICING = {
  hourly: { standard: 800, vip1: 1200, vip2: 1500, label: 'Hourly Rate' },
  pkg_2plus1: { standard: 1600, vip1: 2400, vip2: 3000, label: 'Package "2+1" (3 Hours)' },
  pkg_3plus2: { standard: 2400, vip1: 3600, vip2: 4500, label: 'Package "3+2" (5 Hours)' },
  morning: { standard: 1500, vip1: 1500, vip2: 2000, label: 'Morning Package (08:00 - 12:00)' },
  day: { standard: 2000, vip1: 2500, vip2: 3500, label: 'Day Package (12:00 - 18:00)' },
  night: { standard: 3000, vip1: 4000, vip2: 5000, label: 'Night Package (22:00 - 08:00)' }
};

/**
 * Station map configuration: 20 real rigs
 */
const CLUB_STATIONS = [
  // Standard Arena (A1 - A10)
  { id: 'A1', zone: 'standard', name: 'PC A1', specs: 'i5-14400F • RTX 4060 • 280Hz ASUS', status: 'available' },
  { id: 'A2', zone: 'standard', name: 'PC A2', specs: 'i5-14400F • RTX 4060 • 280Hz ASUS', status: 'available' },
  { id: 'A3', zone: 'standard', name: 'PC A3', specs: 'i5-14400F • RTX 4060 • 280Hz ASUS', status: 'occupied' },
  { id: 'A4', zone: 'standard', name: 'PC A4', specs: 'i5-14400F • RTX 4060 • 280Hz ASUS', status: 'available' },
  { id: 'A5', zone: 'standard', name: 'PC A5', specs: 'i5-14400F • RTX 4060 • 280Hz ASUS', status: 'available' },
  { id: 'A6', zone: 'standard', name: 'PC A6', specs: 'i5-14400F • RTX 5060 • 280Hz ASUS', status: 'available' },
  { id: 'A7', zone: 'standard', name: 'PC A7', specs: 'i5-14400F • RTX 5060 • 280Hz ASUS', status: 'occupied' },
  { id: 'A8', zone: 'standard', name: 'PC A8', specs: 'i5-14400F • RTX 5060 • 280Hz ASUS', status: 'available' },
  { id: 'A9', zone: 'standard', name: 'PC A9', specs: 'i5-14400F • RTX 5060 • 280Hz ASUS', status: 'available' },
  { id: 'A10', zone: 'standard', name: 'PC A10', specs: 'i5-14400F • RTX 5060 • 280Hz ASUS', status: 'available' },
  // VIP 1 Lounge (B1 - B6)
  { id: 'B1', zone: 'vip1', name: 'VIP B1', specs: 'i5-14600KF • RTX 5060 • 310Hz ASUS', status: 'available' },
  { id: 'B2', zone: 'vip1', name: 'VIP B2', specs: 'i5-14600KF • RTX 5060 • 310Hz ASUS', status: 'available' },
  { id: 'B3', zone: 'vip1', name: 'VIP B3', specs: 'i5-14600KF • RTX 5060 • 310Hz ASUS', status: 'available' },
  { id: 'B4', zone: 'vip1', name: 'VIP B4', specs: 'i5-14600KF • RTX 5060 • 310Hz ASUS', status: 'occupied' },
  { id: 'B5', zone: 'vip1', name: 'VIP B5', specs: 'i5-14600KF • RTX 5060 • 310Hz ASUS', status: 'available' },
  { id: 'B6', zone: 'vip1', name: 'VIP B6', specs: 'i5-14600KF • RTX 5060 • 310Hz ASUS', status: 'available' },
  // VIP 2 Bootcamp (C1 - C4)
  { id: 'C1', zone: 'vip2', name: 'Bootcamp C1', specs: 'Ryzen 7 7800X3D • RTX 5060 Ti • 360Hz Alienware', status: 'available' },
  { id: 'C2', zone: 'vip2', name: 'Bootcamp C2', specs: 'Ryzen 7 7800X3D • RTX 5060 Ti • 360Hz Alienware', status: 'available' },
  { id: 'C3', zone: 'vip2', name: 'Bootcamp C3', specs: 'Ryzen 7 7800X3D • RTX 5060 Ti • 360Hz Alienware', status: 'available' },
  { id: 'C4', zone: 'vip2', name: 'Bootcamp C4', specs: 'Ryzen 7 7800X3D • RTX 5060 Ti • 360Hz Alienware', status: 'available' }
];

/**
 * 2. REUSABLE FUNCTIONS WITH PARAMETERS & RETURN VALUES
 */

/**
 * Calculate total booking cost based on selected zone tier, package, and seat count.
 * @param {'standard'|'vip1'|'vip2'} zone - Selected zone
 * @param {string} packageKey - Key matching BOOKING_PRICING
 * @param {number} seatCount - Number of stations reserved
 * @returns {number} Total estimated cost in KZT
 */
function calculateBookingPrice(zone, packageKey, seatCount) {
  const packageRates = BOOKING_PRICING[packageKey] || BOOKING_PRICING.hourly;
  const ratePerSeat = packageRates[zone] || 800;
  const validSeats = Math.max(1, seatCount);
  return ratePerSeat * validSeats;
}

/**
 * Generate a random demonstration voucher confirmation code.
 * Meaningful usage: creates realistic venue reservation voucher ID.
 * @returns {string} e.g. "QP-2026-AST-7842"
 */
function generateVoucherCode() {
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  return `QP-2026-AST-${randomSuffix}`;
}

/**
 * 3. DOM SETUP & BOOKING LOGIC
 */

document.addEventListener('DOMContentLoaded', () => {
  const bookingForm = document.getElementById('booking-form');
  if (!bookingForm) return;

  // Midterm Prepared Form Controls
  const zoneStandardRadio = document.getElementById('zone-standard');
  const zoneVipRadio = document.getElementById('zone-vip');
  const zoneBootcampRadio = document.getElementById('zone-bootcamp');
  const timeSlotSelect = document.getElementById('time-slot');
  const partySizeInput = document.getElementById('party-size');
  const clientNameInput = document.getElementById('client-name');
  const clientPhoneInput = document.getElementById('client-phone');
  const clientEmailInput = document.getElementById('client-email');
  const bookingDateInput = document.getElementById('booking-date');
  const bookingTimeInput = document.getElementById('booking-time');
  const specialNotesInput = document.getElementById('special-notes');
  const policyAgreeCheckbox = document.getElementById('policy-agree');
  const totalDisplay = document.getElementById('booking-total-display');
  const confirmationAlert = document.getElementById('booking-confirmation');
  const errorAlert = document.getElementById('booking-error');

  // Currently selected station IDs
  let selectedSeats = new Set();

  // Set min date to today
  if (bookingDateInput) {
    const today = new Date().toISOString().split('T')[0];
    bookingDateInput.min = today;
    if (!bookingDateInput.value) {
      bookingDateInput.value = today;
    }
  }

  // Pre-fill query parameters if routed from services.html
  const urlParams = new URLSearchParams(window.location.search);
  const paramZone = urlParams.get('zone');
  if (paramZone === 'vip1' && zoneVipRadio) {
    zoneVipRadio.checked = true;
  } else if (paramZone === 'vip2' && zoneBootcampRadio) {
    zoneBootcampRadio.checked = true;
  }

  /**
   * Determine currently active zone from radio buttons
   */
  function getSelectedZone() {
    if (zoneBootcampRadio && zoneBootcampRadio.checked) return 'vip2';
    if (zoneVipRadio && zoneVipRadio.checked) return 'vip1';
    return 'standard';
  }

  /**
   * Recalculate and update the live total price display
   */
  function refreshTotalDisplay() {
    const zone = getSelectedZone();
    const pkg = timeSlotSelect ? timeSlotSelect.value : 'hourly';
    const count = selectedSeats.size > 0 ? selectedSeats.size : (parseInt(partySizeInput.value, 10) || 1);
    const total = calculateBookingPrice(zone, pkg, count);

    if (totalDisplay) {
      totalDisplay.textContent = typeof formatKZT === 'function' ? formatKZT(total) : `${total} ₸`;
    }
  }

  // 4. DYNAMIC DOM INJECTION: THEATER SEATING MAP
  // Injected at top of form inside a dedicated dark card
  const seatingCard = document.createElement('div');
  seatingCard.className = 'p-3 bg-dark bg-opacity-75 rounded border border-info mb-4 shadow-sm';
  seatingCard.id = 'dynamic-seating-container';

  const seatingHeader = document.createElement('div');
  seatingHeader.className = 'd-flex flex-wrap justify-content-between align-items-center pb-2 mb-3 border-bottom border-secondary';

  const seatingTitle = document.createElement('h3');
  seatingTitle.className = 'h6 fw-bold text-accent mb-0';
  seatingTitle.textContent = 'Interactive Floor Map: Select Your Stations';

  const legend = document.createElement('div');
  legend.className = 'small d-flex gap-3 align-items-center mt-2 mt-sm-0';
  legend.innerHTML = `
    <span><span class="badge bg-outline-info border border-info text-info me-1">□</span> Available</span>
    <span><span class="badge bg-info text-dark me-1">■</span> Selected</span>
    <span><span class="badge bg-secondary text-muted me-1">✕</span> Occupied</span>
  `;

  seatingHeader.appendChild(seatingTitle);
  seatingHeader.appendChild(legend);
  seatingCard.appendChild(seatingHeader);

  // Group stations by zone
  const gridWrapper = document.createElement('div');
  gridWrapper.className = 'd-flex flex-column gap-3';

  const zoneSections = [
    { zoneKey: 'standard', title: 'Standard Arena (A1 - A10)', badge: '800 ₸/hr • 280Hz' },
    { zoneKey: 'vip1', title: 'VIP 1 Lounge (B1 - B6)', badge: '1,200 ₸/hr • 310Hz' },
    { zoneKey: 'vip2', title: 'VIP 2 Bootcamp (C1 - C4)', badge: '1,500 ₸/hr • 360Hz' }
  ];

  zoneSections.forEach(section => {
    const rowBox = document.createElement('div');
    rowBox.className = 'p-2 bg-dark rounded border border-secondary';

    const rowHeader = document.createElement('div');
    rowHeader.className = 'd-flex justify-content-between align-items-center mb-2 px-1';

    const titleSpan = document.createElement('span');
    titleSpan.className = 'fw-bold small text-light';
    titleSpan.textContent = section.title;

    const badgeSpan = document.createElement('span');
    badgeSpan.className = 'badge bg-secondary text-light small';
    badgeSpan.textContent = section.badge;

    rowHeader.appendChild(titleSpan);
    rowHeader.appendChild(badgeSpan);
    rowBox.appendChild(rowHeader);

    const buttonsContainer = document.createElement('div');
    buttonsContainer.className = 'd-flex flex-wrap gap-2';

    const zoneStations = CLUB_STATIONS.filter(s => s.zone === section.zoneKey);
    zoneStations.forEach(station => {
      const seatBtn = document.createElement('button');
      seatBtn.type = 'button';
      seatBtn.className = 'btn btn-sm btn-outline-info text-center';
      seatBtn.style.minWidth = '54px';
      seatBtn.dataset.seatId = station.id;
      seatBtn.dataset.zone = station.zone;
      seatBtn.title = `${station.name} (${station.specs})`;
      seatBtn.textContent = station.id;

      if (station.status === 'occupied') {
        seatBtn.className = 'btn btn-sm btn-outline-secondary text-muted';
        seatBtn.disabled = true;
        seatBtn.title = `${station.name} - Occupied by active session`;
      } else {
        seatBtn.addEventListener('click', () => {
          // Max 5 seats
          if (selectedSeats.has(station.id)) {
            selectedSeats.delete(station.id);
            seatBtn.className = 'btn btn-sm btn-outline-info';
          } else {
            if (selectedSeats.size >= 5) {
              if (typeof displayGlobalToast === 'function') {
                displayGlobalToast('Seat Limit', 'You can select up to 5 gaming stations per reservation.', 'warning');
              }
              return;
            }
            selectedSeats.add(station.id);
            seatBtn.className = 'btn btn-sm btn-info text-dark fw-bold selected';

            // Auto-select corresponding zone radio
            if (station.zone === 'standard' && zoneStandardRadio) zoneStandardRadio.checked = true;
            if (station.zone === 'vip1' && zoneVipRadio) zoneVipRadio.checked = true;
            if (station.zone === 'vip2' && zoneBootcampRadio) zoneBootcampRadio.checked = true;
          }

          // Sync party size
          if (partySizeInput) {
            partySizeInput.value = selectedSeats.size > 0 ? selectedSeats.size : 1;
          }

          updateChips();
          refreshTotalDisplay();
        });
      }

      buttonsContainer.appendChild(seatBtn);
    });

    rowBox.appendChild(buttonsContainer);
    gridWrapper.appendChild(rowBox);
  });

  seatingCard.appendChild(gridWrapper);

  // Selected stations chips row
  const chipsRow = document.createElement('div');
  chipsRow.className = 'mt-3 pt-2 border-top border-secondary small text-light d-flex flex-wrap align-items-center gap-2';
  chipsRow.id = 'selected-chips-row';

  const chipsLabel = document.createElement('span');
  chipsLabel.className = 'text-muted';
  chipsLabel.textContent = 'Selected Stations:';
  chipsRow.appendChild(chipsLabel);

  const chipsContainer = document.createElement('span');
  chipsContainer.id = 'seats-chips-display';
  chipsContainer.className = 'text-info';
  chipsContainer.textContent = 'None (click available stations above)';
  chipsRow.appendChild(chipsContainer);

  seatingCard.appendChild(chipsRow);

  function updateChips() {
    if (selectedSeats.size === 0) {
      chipsContainer.textContent = 'None (click available stations above)';
    } else {
      chipsContainer.textContent = Array.from(selectedSeats).join(', ');
    }
  }

  // Insert seating map dynamically right after the form fieldset legend
  const legendEl = bookingForm.querySelector('legend');
  if (legendEl && legendEl.nextSibling) {
    legendEl.parentNode.insertBefore(seatingCard, legendEl.nextSibling);
  } else {
    bookingForm.insertBefore(seatingCard, bookingForm.firstChild);
  }

  // Listeners for radio buttons, package select, and party size
  [zoneStandardRadio, zoneVipRadio, zoneBootcampRadio].forEach(radio => {
    if (radio) radio.addEventListener('change', refreshTotalDisplay);
  });
  if (timeSlotSelect) timeSlotSelect.addEventListener('change', refreshTotalDisplay);
  if (partySizeInput) partySizeInput.addEventListener('input', refreshTotalDisplay);

  // 5. COMPREHENSIVE FORM VALIDATION FLOW
  bookingForm.noValidate = true;

  bookingForm.addEventListener('submit', (event) => {
    event.preventDefault();

    // Clear previous feedback
    if (errorAlert) {
      errorAlert.classList.add('d-none');
      errorAlert.innerHTML = '';
    }
    if (confirmationAlert) {
      confirmationAlert.classList.add('d-none');
      confirmationAlert.innerHTML = '';
    }

    const errors = [];
    let firstInvalidField = null;

    // Field 1: Gamer Tag / Client Name (trimmed text, min 2 chars)
    const cleanName = clientNameInput ? clientNameInput.value.trim() : '';
    if (!cleanName || cleanName.length < 2) {
      errors.push('Please enter your Gamer Tag or Full Name (at least 2 characters).');
      if (clientNameInput) {
        clientNameInput.classList.add('is-invalid');
        if (!firstInvalidField) firstInvalidField = clientNameInput;
      }
    } else if (clientNameInput) {
      clientNameInput.classList.remove('is-invalid');
    }

    // Field 2: Phone number (+7 format validation)
    const cleanPhone = clientPhoneInput ? clientPhoneInput.value.trim() : '';
    const phoneRegex = /^\+?[0-9\s\-()]{10,18}$/;
    if (!cleanPhone || !phoneRegex.test(cleanPhone)) {
      errors.push('Please provide a valid contact telephone number (e.g. +7 706 605 5465).');
      if (clientPhoneInput) {
        clientPhoneInput.classList.add('is-invalid');
        if (!firstInvalidField) firstInvalidField = clientPhoneInput;
      }
    } else if (clientPhoneInput) {
      clientPhoneInput.classList.remove('is-invalid');
    }

    // Field 3: Email address
    const cleanEmail = clientEmailInput ? clientEmailInput.value.trim() : '';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!cleanEmail || !emailRegex.test(cleanEmail)) {
      errors.push('Please enter a valid email address (e.g. gamer@example.kz).');
      if (clientEmailInput) {
        clientEmailInput.classList.add('is-invalid');
        if (!firstInvalidField) firstInvalidField = clientEmailInput;
      }
    } else if (clientEmailInput) {
      clientEmailInput.classList.remove('is-invalid');
    }

    // Field 4: Booking Date (no past dates!)
    const dateVal = bookingDateInput ? bookingDateInput.value : '';
    const todayStr = new Date().toISOString().split('T')[0];
    if (!dateVal || dateVal < todayStr) {
      errors.push('Reservation date cannot be in the past.');
      if (bookingDateInput) {
        bookingDateInput.classList.add('is-invalid');
        if (!firstInvalidField) firstInvalidField = bookingDateInput;
      }
    } else if (bookingDateInput) {
      bookingDateInput.classList.remove('is-invalid');
    }

    // Field 5: Arrival Time
    const timeVal = bookingTimeInput ? bookingTimeInput.value : '';
    if (!timeVal) {
      errors.push('Please select your expected arrival time.');
      if (bookingTimeInput) {
        bookingTimeInput.classList.add('is-invalid');
        if (!firstInvalidField) firstInvalidField = bookingTimeInput;
      }
    } else if (bookingTimeInput) {
      bookingTimeInput.classList.remove('is-invalid');
    }

    // Field 6: House Rules Agreement Checkbox
    if (policyAgreeCheckbox && !policyAgreeCheckbox.checked) {
      errors.push('You must acknowledge the club reservation terms and 15-minute station hold policy.');
      policyAgreeCheckbox.classList.add('is-invalid');
      if (!firstInvalidField) firstInvalidField = policyAgreeCheckbox;
    } else if (policyAgreeCheckbox) {
      policyAgreeCheckbox.classList.remove('is-invalid');
    }

    // Output errors if any
    if (errors.length > 0) {
      if (errorAlert) {
        const errorList = document.createElement('ul');
        errorList.className = 'mb-0 ps-3';
        errors.forEach(err => {
          const li = document.createElement('li');
          li.textContent = err;
          errorList.appendChild(li);
        });
        errorAlert.appendChild(errorList);
        errorAlert.classList.remove('d-none');
      }
      if (firstInvalidField) {
        firstInvalidField.focus();
      }
      return;
    }

    // Success State & Voucher Summary
    const zone = getSelectedZone();
    const pkg = timeSlotSelect ? timeSlotSelect.value : 'hourly';
    const seatList = selectedSeats.size > 0 ? Array.from(selectedSeats).join(', ') : 'Station Auto-Assigned';
    const totalCost = calculateBookingPrice(zone, pkg, selectedSeats.size > 0 ? selectedSeats.size : 1);
    const voucherRef = generateVoucherCode();

    if (confirmationAlert) {
      confirmationAlert.className = 'alert alert-success mt-4';
      confirmationAlert.innerHTML = `
        <h4 class="alert-heading h5 fw-bold">Reservation Voucher Confirmed!</h4>
        <p class="mb-1">Guest <strong>${cleanName}</strong>, your station(s) [<strong>${seatList}</strong>] at <strong>QazaqPeek Astana (Kenesary 69)</strong> are held for 15 minutes past arrival.</p>
        <hr class="border-secondary">
        <div class="d-flex flex-wrap justify-content-between small">
          <span>Voucher Code: <strong id="booking-reference-code">${voucherRef}</strong></span>
          <span>Date &amp; Time: <strong id="booking-confirmed-time">${dateVal} at ${timeVal}</strong></span>
          <span>Estimated Total: <strong>${typeof formatKZT === 'function' ? formatKZT(totalCost) : totalCost + ' ₸'}</strong></span>
          <span>Hold Period: <strong>15 Mins Past Arrival</strong></span>
        </div>
        <p class="small text-muted mt-2 mb-0">
          * Demonstration Confirmation: No payment was charged and no server record was saved. Settle upon check-in via Kaspi QR or Cash.
        </p>
      `;
      confirmationAlert.classList.remove('d-none');
      confirmationAlert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    // Reset station selections
    selectedSeats.clear();
    document.querySelectorAll('.btn-info.selected').forEach(btn => {
      btn.className = 'btn btn-sm btn-outline-info';
    });
    updateChips();
  });

  // Handle Form Reset
  bookingForm.addEventListener('reset', () => {
    selectedSeats.clear();
    document.querySelectorAll('.btn-info.selected').forEach(btn => {
      btn.className = 'btn btn-sm btn-outline-info';
    });
    updateChips();
    if (errorAlert) errorAlert.classList.add('d-none');
    if (confirmationAlert) confirmationAlert.classList.add('d-none');
    setTimeout(refreshTotalDisplay, 10);
  });

  // Initial calculation
  refreshTotalDisplay();
});
