/**
 * QazaqPeek Cyber Club Astana - Seating Map & Booking Engine
 * Author: Adilet Ainadinov
 * Rewritten with jQuery 3.7.1 for Assignment 6
 */

'use strict';

// Pricing table for different zones and packages (in KZT)
const BOOKING_PRICING = {
  hourly: { standard: 800, vip1: 1200, vip2: 1500, label: 'Hourly Rate' },
  pkg_2plus1: { standard: 1600, vip1: 2400, vip2: 3000, label: 'Package 2+1 (3 Hours)' },
  pkg_3plus2: { standard: 2400, vip1: 3600, vip2: 4500, label: 'Package 3+2 (5 Hours)' },
  morning: { standard: 1500, vip1: 1500, vip2: 2000, label: 'Morning Package (08:00 - 12:00)' },
  day: { standard: 2000, vip1: 2500, vip2: 3500, label: 'Day Package (12:00 - 18:00)' },
  night: { standard: 3000, vip1: 4000, vip2: 5000, label: 'Night Package (22:00 - 08:00)' }
};

// 25 Gaming Stations across 3 club zones (Standard: 10, VIP 1: 10, VIP 2: 5)
const CLUB_STATIONS = [
  { id: 'A1', zone: 'standard', name: 'PC A1', status: 'available' },
  { id: 'A2', zone: 'standard', name: 'PC A2', status: 'available' },
  { id: 'A3', zone: 'standard', name: 'PC A3', status: 'occupied' },
  { id: 'A4', zone: 'standard', name: 'PC A4', status: 'available' },
  { id: 'A5', zone: 'standard', name: 'PC A5', status: 'available' },
  { id: 'A6', zone: 'standard', name: 'PC A6', status: 'available' },
  { id: 'A7', zone: 'standard', name: 'PC A7', status: 'occupied' },
  { id: 'A8', zone: 'standard', name: 'PC A8', status: 'available' },
  { id: 'A9', zone: 'standard', name: 'PC A9', status: 'available' },
  { id: 'A10', zone: 'standard', name: 'PC A10', status: 'available' },
  { id: 'B1', zone: 'vip1', name: 'VIP B1', status: 'available' },
  { id: 'B2', zone: 'vip1', name: 'VIP B2', status: 'available' },
  { id: 'B3', zone: 'vip1', name: 'VIP B3', status: 'available' },
  { id: 'B4', zone: 'vip1', name: 'VIP B4', status: 'occupied' },
  { id: 'B5', zone: 'vip1', name: 'VIP B5', status: 'available' },
  { id: 'B6', zone: 'vip1', name: 'VIP B6', status: 'available' },
  { id: 'B7', zone: 'vip1', name: 'VIP B7', status: 'available' },
  { id: 'B8', zone: 'vip1', name: 'VIP B8', status: 'occupied' },
  { id: 'B9', zone: 'vip1', name: 'VIP B9', status: 'available' },
  { id: 'B10', zone: 'vip1', name: 'VIP B10', status: 'available' },
  { id: 'C1', zone: 'vip2', name: 'Bootcamp C1', status: 'available' },
  { id: 'C2', zone: 'vip2', name: 'Bootcamp C2', status: 'available' },
  { id: 'C3', zone: 'vip2', name: 'Bootcamp C3', status: 'available' },
  { id: 'C4', zone: 'vip2', name: 'Bootcamp C4', status: 'available' },
  { id: 'C5', zone: 'vip2', name: 'Bootcamp C5', status: 'available' }
];

// Helper to format currency
function formatKZT(amount) {
  if (typeof amount !== 'number' || isNaN(amount) || amount < 0) return '0 ₸';
  return amount.toLocaleString('ru-KZ') + ' ₸';
}

// Calculate total cost for selected stations and tariff
function calculateBookingPrice(zone, packageKey, seatCount) {
  const rates = BOOKING_PRICING[packageKey] || BOOKING_PRICING.hourly;
  const pricePerSeat = rates[zone] || 800;
  return pricePerSeat * Math.max(1, seatCount);
}

// Generate demo voucher reference code
function generateVoucherCode() {
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  return `QP-2026-AST-${randomSuffix}`;
}

// jQuery 3.7.1: $(document).ready ensures DOM is fully parsed before attaching handlers or querying nodes
$(document).ready(function () {
  const $form = $('#booking-form');
  if ($form.length === 0) return;

  const selectedSeats = new Set();

  // Set min date to today using .attr() and default value with .val()
  const todayStr = new Date().toISOString().split('T')[0];
  const $dateInput = $('#booking-date').attr('min', todayStr);
  if (!$dateInput.val()) $dateInput.val(todayStr);

  // Pre-fill zone from URL param if available (e.g. ?zone=vip1)
  const paramZone = new URLSearchParams(window.location.search).get('zone');
  if (paramZone === 'vip1') $('#zone-vip').prop('checked', true);
  if (paramZone === 'vip2') $('#zone-bootcamp').prop('checked', true);

  // Find currently active zone using attribute selector and :checked filter
  function getSelectedZone() {
    const checkedId = $('input[name="zone"]:checked').attr('id');
    if (checkedId === 'zone-bootcamp') return 'vip2';
    if (checkedId === 'zone-vip') return 'vip1';
    return 'standard';
  }

  // Visual synchronization between Cards, Radio buttons, and Map
  function highlightActiveZone(zone) {
    $('.zone-radio-card').removeClass('border-info bg-opacity-75');
    $(`#zone-radio-card-${zone}`).addClass('border-info');

    $('.zone-card').removeClass('border-info shadow-lg');
    $(`#card-zone-${zone}`).addClass('border-info shadow-lg');

    $('.zone-section').removeClass('border-info');
    $(`.zone-section[data-zone="${zone}"]`).addClass('border-info');
  }

  // Recalculate price and update total display with .text()
  function refreshTotal() {
    const zone = getSelectedZone();
    const pkg = $('#time-slot').val() || 'hourly';
    const partySize = parseInt($('#party-size').val(), 10) || 1;
    const count = selectedSeats.size > 0 ? selectedSeats.size : partySize;
    const total = calculateBookingPrice(zone, pkg, count);
    $('#booking-total-display').text(formatKZT(total));
  }

  // Synchronize top zone cards with form radio buttons and scroll to map
  $('.select-zone-btn').on('click', function (e) {
    e.preventDefault();
    const zone = $(this).attr('data-zone');
    if (zone === 'standard') $('#zone-standard').prop('checked', true);
    if (zone === 'vip1') $('#zone-vip').prop('checked', true);
    if (zone === 'vip2') $('#zone-bootcamp').prop('checked', true);

    highlightActiveZone(zone);
    refreshTotal();

    $('html, body').stop(true, true).animate({
      scrollTop: $('#dynamic-seating-container').offset().top - 80
    }, 350);
  });

  // REWRITTEN FEATURE 1: Dynamic Seating Map & Event Delegation
  // Replaced ~70 lines of createElement & per-button loop listeners with jQuery $('<div/>'), .append() and .on().
  // Result is much shorter and clearer because delegation binds a single listener to the parent container.
  const $seatingCard = $('<div />', {
    id: 'dynamic-seating-container',
    class: 'p-3 bg-dark bg-opacity-75 rounded border border-info mb-4 shadow-sm'
  });

  const $seatingHeader = $('<div />', {
    class: 'd-flex flex-wrap justify-content-between align-items-center pb-2 mb-3 border-bottom border-secondary',
    html: '<h3 class="h6 fw-bold text-accent mb-0">Interactive Floor Map: Select Your Stations</h3>' +
          '<div class="small d-flex gap-3 align-items-center mt-2 mt-sm-0">' +
          '<span><span class="badge border border-info text-info me-1">□</span> Available</span>' +
          '<span><span class="badge bg-info text-dark me-1">■</span> Selected</span>' +
          '<span><span class="badge bg-dark border border-secondary text-secondary me-1"><span class="text-danger fw-bold">✕</span></span> Occupied</span></div>'
  });
  $seatingCard.append($seatingHeader);

  const $gridWrapper = $('<div />', { class: 'd-flex flex-column gap-3' });
  const zones = [
    { key: 'standard', title: 'Standard Arena (A1 - A10)', badge: '800 ₸/hr' },
    { key: 'vip1', title: 'VIP 1 Lounge (B1 - B10)', badge: '1,200 ₸/hr' },
    { key: 'vip2', title: 'VIP 2 Bootcamp (C1 - C5)', badge: '1,500 ₸/hr' }
  ];

  $.each(zones, function (_, z) {
    const $row = $('<div />', {
      class: 'p-2 bg-dark rounded border border-secondary zone-section',
      'data-zone': z.key
    });
    const $header = $('<div />', {
      class: 'd-flex justify-content-between align-items-center mb-2 px-1',
      html: `<span class="fw-bold small text-light">${z.title}</span><span class="badge bg-secondary text-light small">${z.badge}</span>`
    });
    const $grid = $('<div />', { class: 'd-flex flex-column gap-2 station-grid' });

    const stationsInZone = $.grep(CLUB_STATIONS, st => st.zone === z.key);
    // Arrange stations in rows of 5; if >5, automatically creates a new row below
    for (let i = 0; i < stationsInZone.length; i += 5) {
      const chunk = stationsInZone.slice(i, i + 5);
      const $stationRow = $('<div />', { class: 'd-flex gap-2 station-row' });

      $.each(chunk, function (_, st) {
        const isOccupied = st.status === 'occupied';
        const $btn = $('<button />', {
          type: 'button',
          class: isOccupied
            ? 'btn btn-sm btn-dark border-secondary text-secondary station-btn occupied fw-semibold flex-fill'
            : 'btn btn-sm btn-outline-info station-btn fw-semibold flex-fill',
          html: isOccupied ? `<span class="text-danger fw-bold me-1">✕</span>${st.id}` : st.id
        });

        $btn.attr('data-seat-id', st.id);
        $btn.attr('data-zone', st.zone);
        $btn.attr('title', `${st.name}${isOccupied ? ' (Occupied)' : ' (Available)'}`);

        if (isOccupied) {
          $btn.prop('disabled', true);
        }

        $stationRow.append($btn);
      });

      $grid.append($stationRow);
    }

    $row.append($header).append($grid);
    $gridWrapper.append($row);
  });

  $seatingCard.append($gridWrapper);

  const $chipsRow = $('<div />', {
    class: 'mt-3 pt-2 border-top border-secondary small text-light d-flex flex-wrap align-items-center gap-2',
    html: '<span class="text-secondary">Selected Stations:</span><span id="seats-chips-display" class="text-info fw-semibold">None (click available stations above)</span>'
  });
  $seatingCard.append($chipsRow);

  const $legend = $form.find('legend:first');
  if ($legend.length > 0) {
    $legend.after($seatingCard);
  } else {
    $form.prepend($seatingCard);
  }

  function updateChips() {
    const text = selectedSeats.size > 0 ? Array.from(selectedSeats).join(', ') : 'None (click available stations above)';
    $('#seats-chips-display').text(text);

    const count = selectedSeats.size;
    if (count > 0) {
      $('#party-size').val(count);
      $('#party-size-mode').text(`${count} selected on map`).removeClass('bg-secondary').addClass('bg-info text-dark fw-bold');
    } else {
      $('#party-size-mode').text('Auto from map').removeClass('bg-info text-dark fw-bold').addClass('bg-secondary text-light');
    }
  }

  // Delegated event handler: binds to parent $seatingCard because station buttons are built dynamically.
  // Direct binding fails for elements created after page load, while delegation intercepts bubbling events.
  $seatingCard.on('click', '.station-btn:not([disabled])', function () {
    const $btn = $(this);
    const seatId = $btn.attr('data-seat-id');
    const seatZone = $btn.attr('data-zone');

    if (selectedSeats.has(seatId)) {
      selectedSeats.delete(seatId);
      $btn.removeClass('selected').addClass('btn-outline-info');
    } else {
      if (selectedSeats.size >= 5) {
        if (typeof displayGlobalToast === 'function') {
          displayGlobalToast('Seat Limit', 'You can select up to 5 gaming stations per reservation.', 'warning');
        }
        return;
      }
      selectedSeats.add(seatId);
      $btn.removeClass('btn-outline-info').addClass('selected');

      // Sync zone radio with chosen station
      if (seatZone === 'standard') $('#zone-standard').prop('checked', true);
      if (seatZone === 'vip1') $('#zone-vip').prop('checked', true);
      if (seatZone === 'vip2') $('#zone-bootcamp').prop('checked', true);

      highlightActiveZone(seatZone);
    }

    // Method Chain 1: reaches parent grid, finds selected buttons, picks first, adds highlight class
    $(this).closest('.station-grid').find('.station-btn.selected').filter(':first').addClass('border-light');

    updateChips();
    refreshTotal();
  });

  // Reset button clears station selections and resets totals
  $('#booking-reset-btn').on('click', function () {
    selectedSeats.clear();
    $('.station-btn.selected').removeClass('selected border-light').addClass('btn-outline-info');
    updateChips();
    refreshTotal();
    highlightActiveZone('standard');
  });

  // Listen to controls for live price calculation and zone highlighting
  $('input[name="zone"]').on('change', function () {
    highlightActiveZone(getSelectedZone());
    refreshTotal();
  });
  $('#time-slot').on('change', refreshTotal);
  $('#party-size').on('input', refreshTotal);

  // REWRITTEN FEATURE 2: jQuery Form Validation
  // Replaced manual error arrays with jQuery .val(), $.trim(), .addClass('is-invalid'), and .slideDown().
  // Result is cleaner and provides immediate field-level feedback that clears on input.
  $form.attr('novalidate', 'novalidate');

  function showFieldError($field, msg) {
    $field.addClass('is-invalid');
    let $err = $field.siblings('.invalid-feedback');
    if ($err.length === 0) {
      $err = $('<div />', { class: 'invalid-feedback text-danger small mt-1 fw-semibold' });
      $field.after($err);
    }
    $err.text(msg).stop(true, true).slideDown(200);
  }

  function clearFieldError($field) {
    $field.removeClass('is-invalid');
    $field.siblings('.invalid-feedback').stop(true, true).slideUp(150);
  }

  // Clear error as soon as user types or changes value using $(this)
  $form.on('input change', 'input, select', function () {
    clearFieldError($(this));
  });

  $form.on('submit', function (e) {
    // preventDefault stops browser reloading page, preserving interactive state and showing confirmation
    e.preventDefault();

    // Note: Browser checks improve UX, but server validation is mandatory because client code can be bypassed
    let isValid = true;
    let $firstInvalid = null;

    $('#booking-error').stop(true, true).slideUp(150);
    $('#booking-confirmation').stop(true, true).slideUp(150);

    // 1. Gamer Tag / Name (min 2 chars)
    const $name = $('#client-name');
    if ($.trim($name.val()).length < 2) {
      showFieldError($name, 'Please enter your Gamer Tag or Full Name (min 2 chars).');
      isValid = false;
      if (!$firstInvalid) $firstInvalid = $name;
    } else {
      clearFieldError($name);
    }

    // 2. Phone (+7 format regex)
    const $phone = $('#client-phone');
    const phoneRegex = /^\+?[0-9\s\-()]{10,18}$/;
    if (!phoneRegex.test($.trim($phone.val()))) {
      showFieldError($phone, 'Please provide a valid phone number (e.g. +7 706 605 5465).');
      isValid = false;
      if (!$firstInvalid) $firstInvalid = $phone;
    } else {
      clearFieldError($phone);
    }

    // 3. Email (format regex)
    const $email = $('#client-email');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test($.trim($email.val()))) {
      showFieldError($email, 'Please enter a valid email address.');
      isValid = false;
      if (!$firstInvalid) $firstInvalid = $email;
    } else {
      clearFieldError($email);
    }

    // 4. Date (not in the past)
    const $date = $('#booking-date');
    if (!$date.val() || $date.val() < todayStr) {
      showFieldError($date, 'Reservation date cannot be empty or in the past.');
      isValid = false;
      if (!$firstInvalid) $firstInvalid = $date;
    } else {
      clearFieldError($date);
    }

    // 5. Arrival Time
    const $time = $('#booking-time');
    if (!$time.val()) {
      showFieldError($time, 'Please select your arrival time.');
      isValid = false;
      if (!$firstInvalid) $firstInvalid = $time;
    } else {
      clearFieldError($time);
    }

    // 6. Policy Checkbox checked via .prop('checked')
    const $policy = $('#policy-agree');
    if (!$policy.prop('checked')) {
      showFieldError($policy, 'You must accept venue house rules.');
      isValid = false;
      if (!$firstInvalid) $firstInvalid = $policy;
    } else {
      clearFieldError($policy);
    }

    if (!isValid) {
      if ($firstInvalid) $firstInvalid.focus();
      return;
    }

    // REWRITTEN FEATURE 3: Confirmation Voucher & Effects
    // Uses jQuery .html(), .slideDown(400, callback), and .stop() for smooth feedback animation.
    const zone = getSelectedZone();
    const pkg = $('#time-slot').val() || 'hourly';
    const seatsList = selectedSeats.size > 0 ? Array.from(selectedSeats).join(', ') : 'Station Auto-Assigned';
    const totalCost = calculateBookingPrice(zone, pkg, selectedSeats.size > 0 ? selectedSeats.size : 1);
    const voucherRef = generateVoucherCode();

    const voucherHtml = `
      <div class="alert alert-success mt-4 shadow border-2 border-success">
        <h4 class="alert-heading h5 fw-bold text-success d-flex align-items-center gap-2">
          <span>✓</span> Official Reservation Voucher Confirmed!
        </h4>
        <p class="mb-2">Gamer <strong>${$.trim($name.val())}</strong>, your station(s) [<strong>${seatsList}</strong>] at <strong>QazaqPeek Astana (Kenesary 69)</strong> have been reserved.</p>
        <hr class="border-success opacity-50">
        <div class="row g-2 small text-light">
          <div class="col-12 col-sm-6">Voucher Code: <strong class="text-accent" id="booking-reference-code">${voucherRef}</strong></div>
          <div class="col-12 col-sm-6">Schedule: <strong id="booking-confirmed-time">${$date.val()} at ${$time.val()}</strong></div>
          <div class="col-12 col-sm-6">Estimated Cost: <strong class="text-success">${formatKZT(totalCost)}</strong></div>
          <div class="col-12 col-sm-6">Hold Window: <strong class="text-warning">15 Minutes past arrival</strong></div>
        </div>
        <p class="small text-muted mt-3 mb-0">* Demonstration Voucher: Pay at desk via Kaspi QR or Cash upon arrival.</p>
      </div>
    `;

    // Method Chain 2: stops queue, updates HTML, slides down over 400ms, and scrolls into view
    $('#booking-confirmation')
      .stop(true, true)
      .html(voucherHtml)
      .slideDown(400, function () {
        $('html, body').animate({
          scrollTop: $('#booking-confirmation').offset().top - 80
        }, 300);
      });

    // Reset form and seat selections
    $form[0].reset();
    selectedSeats.clear();
    $('.station-btn.selected').removeClass('selected border-light').addClass('btn-outline-info');
    updateChips();
    refreshTotal();
    $dateInput.val(todayStr);
    highlightActiveZone('standard');
  });

  // Initial zone highlight
  highlightActiveZone(getSelectedZone());
});
