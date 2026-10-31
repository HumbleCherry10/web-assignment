/**
 * QazaqPeek Cyber Club Astana - Previous Plain-JavaScript Archive
 * File: js/old-js-version.js
 * Unlinked file preserved for side-by-side defense comparison with jQuery (Assignment 6).
 */

'use strict';

/* ==============================================================================
 * FEATURE 1 (OLD): Plain JavaScript Dynamic Seating Map Generation
 * Built each element via document.createElement and attached click listeners in a loop.
 * ============================================================================== */
function oldPlainJsRenderSeatingMap(stationsArray, selectedSeatsSet) {
  const seatingCard = document.createElement('div');
  seatingCard.className = 'p-3 bg-dark bg-opacity-75 rounded border border-info mb-4 shadow-sm';
  seatingCard.id = 'dynamic-seating-container';

  const seatingHeader = document.createElement('div');
  seatingHeader.className = 'd-flex flex-wrap justify-content-between align-items-center pb-2 mb-3 border-bottom border-secondary';
  seatingHeader.innerHTML = `
    <h3 class="h6 fw-bold text-accent mb-0">Interactive Floor Map: Select Your Stations</h3>
    <div class="small d-flex gap-3 align-items-center mt-2 mt-sm-0">
      <span><span class="badge border border-info text-info me-1">□</span> Available</span>
      <span><span class="badge bg-info text-dark me-1">■</span> Selected</span>
      <span><span class="badge bg-secondary text-muted me-1">✕</span> Occupied</span>
    </div>
  `;
  seatingCard.appendChild(seatingHeader);

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
    rowHeader.innerHTML = `<span class="fw-bold small text-light">${section.title}</span><span class="badge bg-secondary text-light small">${section.badge}</span>`;
    rowBox.appendChild(rowHeader);

    const buttonsContainer = document.createElement('div');
    buttonsContainer.className = 'd-flex flex-wrap gap-2';

    const zoneStations = stationsArray.filter(s => s.zone === section.zoneKey);
    zoneStations.forEach(station => {
      const seatBtn = document.createElement('button');
      seatBtn.type = 'button';
      seatBtn.className = 'btn btn-sm btn-outline-info text-center';
      seatBtn.dataset.seatId = station.id;
      seatBtn.dataset.zone = station.zone;
      seatBtn.textContent = station.id;

      if (station.status === 'occupied') {
        seatBtn.className = 'btn btn-sm btn-outline-secondary text-muted';
        seatBtn.disabled = true;
      } else {
        // Direct event binding (Old Plain JS way: attaches individual listener to each button)
        seatBtn.addEventListener('click', () => {
          if (selectedSeatsSet.has(station.id)) {
            selectedSeatsSet.delete(station.id);
            seatBtn.className = 'btn btn-sm btn-outline-info text-center';
          } else {
            if (selectedSeatsSet.size >= 5) return;
            selectedSeatsSet.add(station.id);
            seatBtn.className = 'btn btn-sm btn-info text-dark fw-bold text-center';
          }
        });
      }
      buttonsContainer.appendChild(seatBtn);
    });

    rowBox.appendChild(buttonsContainer);
    gridWrapper.appendChild(rowBox);
  });

  seatingCard.appendChild(gridWrapper);
  return seatingCard;
}

/* ==============================================================================
 * FEATURE 2 (OLD): Plain JavaScript Booking Form Validation
 * Replaced: manual error array aggregation and innerHTML alert assembly.
 * ============================================================================== */
function oldPlainJsValidateBookingForm(event) {
  event.preventDefault();

  const nameInput = document.getElementById('client-name');
  const phoneInput = document.getElementById('client-phone');
  const emailInput = document.getElementById('client-email');
  const dateInput = document.getElementById('booking-date');
  const timeInput = document.getElementById('booking-time');
  const policyCheckbox = document.getElementById('policy-agree');

  const errorContainer = document.getElementById('booking-error');
  const confirmationContainer = document.getElementById('booking-confirmation');

  const errors = [];
  const phoneRegex = /^\+?[0-9\s\-()]{10,18}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!nameInput || nameInput.value.trim().length < 2) {
    errors.push('Gamer Tag must be at least 2 characters.');
    if (nameInput) nameInput.classList.add('is-invalid');
  }

  if (!phoneInput || !phoneRegex.test(phoneInput.value.trim())) {
    errors.push('Please enter a valid phone number.');
    if (phoneInput) phoneInput.classList.add('is-invalid');
  }

  if (!emailInput || !emailRegex.test(emailInput.value.trim())) {
    errors.push('Please enter a valid email address.');
    if (emailInput) emailInput.classList.add('is-invalid');
  }

  if (!dateInput || !dateInput.value) {
    errors.push('Reservation date is required.');
    if (dateInput) dateInput.classList.add('is-invalid');
  }

  if (!timeInput || !timeInput.value) {
    errors.push('Arrival time is required.');
    if (timeInput) timeInput.classList.add('is-invalid');
  }

  if (!policyCheckbox || !policyCheckbox.checked) {
    errors.push('You must accept the venue house rules.');
    if (policyCheckbox) policyCheckbox.classList.add('is-invalid');
  }

  if (errors.length > 0) {
    if (errorContainer) {
      errorContainer.innerHTML = `
        <div class="alert alert-danger">
          <strong>Please correct the following errors:</strong>
          <ul class="mb-0 mt-1">${errors.map(e => `<li>${e}</li>`).join('')}</ul>
        </div>
      `;
      errorContainer.classList.remove('d-none');
    }
    return false;
  }

  if (confirmationContainer) {
    confirmationContainer.innerHTML = '<div class="alert alert-success">Reservation Confirmed!</div>';
    confirmationContainer.classList.remove('d-none');
  }
  return true;
}

/* ==============================================================================
 * FEATURE 3 (OLD): Plain JavaScript Tournament Rendering & Filtering
 * Rendered cards using innerHTML inside a loop and updated display manually.
 * ============================================================================== */
function oldPlainJsRenderTournaments(tournamentsArray, containerEl, filterStatus, searchQuery) {
  if (!containerEl) return;
  containerEl.innerHTML = '';

  const q = searchQuery ? searchQuery.trim().toLowerCase() : '';
  const filtered = tournamentsArray.filter(t => {
    const matchStatus = filterStatus === 'all' || t.status === filterStatus;
    const matchSearch = q === '' || t.title.toLowerCase().includes(q) || t.game.toLowerCase().includes(q);
    return matchStatus && matchSearch;
  });

  if (filtered.length === 0) {
    containerEl.innerHTML = '<div class="col-12 text-center text-muted py-5">No tournaments found.</div>';
    return;
  }

  filtered.forEach(item => {
    const col = document.createElement('div');
    col.className = 'col-12 col-md-6 col-lg-4 mb-3';
    col.innerHTML = `
      <div class="card bg-custom-card text-light h-100 p-3 border-secondary">
        <div class="d-flex justify-content-between align-items-center mb-2">
          <span class="small text-muted fw-bold">${item.game}</span>
          <span class="badge ${item.badgeClass}">${item.statusLabel}</span>
        </div>
        <h4 class="h5 text-accent">${item.title}</h4>
        <p class="small text-muted mb-2">Date: ${item.date} • Prize: ${item.prizePool.toLocaleString('ru-KZ')} ₸</p>
      </div>
    `;
    containerEl.appendChild(col);
  });
}
