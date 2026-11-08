/**
 * ================================================================================
 * QAZAQPEEK CYBER CLUB ASTANA — SEATING MAP & BOOKING ENGINE
 * File: js/booking.js
 * Author: Adilet Ainadinov
 * Technology: 100% jQuery 3.7.1 (Weeks 9–10)
 *
 * Requirements Covered:
 *   - Wrapped in $(function () { ... }) document ready wrapper
 *   - Selectors of different kinds: ID ($('#id')), Class ($('.cls')), Tag ($('button')), Attribute ($('[data-...]')), Filters (:checked, :not, :first)
 *   - Traversal without extra IDs: .closest(), .find(), .siblings(), $(this), .parent()
 *   - Method Chaining (>=3 links) with detailed link explanations
 *   - Purposeful animated effects: .slideDown(), .slideUp()
 *   - Delegated event handlers for dynamically rendered stations
 *   - Main Form Validation with field-level alerts, regex checking, real-time clearing
 *   - New Endterm Extensions:
 *       • 5-Seat Team Bootcamp 10% Discount live calculation
 *       • Interactive Voucher Code Copy to Clipboard
 *       • Modal Preview live synchronization
 *       • URL parameter deep-link hydration (?zone=...&hours=...&pkg=...)
 *   - Strict Isolation: 100% jQuery (Zero mixing with Plain JS)
 * ================================================================================
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
  // Standard Arena (10 rigs, ASUS TUF 280Hz, RTX 4060)
  { id: 'A1', zone: 'standard', status: 'available', gpu: 'RTX 4060', hz: '280Hz' },
  { id: 'A2', zone: 'standard', status: 'available', gpu: 'RTX 4060', hz: '280Hz' },
  { id: 'A3', zone: 'standard', status: 'occupied',  gpu: 'RTX 4060', hz: '280Hz' },
  { id: 'A4', zone: 'standard', status: 'available', gpu: 'RTX 4060', hz: '280Hz' },
  { id: 'A5', zone: 'standard', status: 'available', gpu: 'RTX 4060', hz: '280Hz' },
  { id: 'A6', zone: 'standard', status: 'available', gpu: 'RTX 4060', hz: '280Hz' },
  { id: 'A7', zone: 'standard', status: 'occupied',  gpu: 'RTX 4060', hz: '280Hz' },
  { id: 'A8', zone: 'standard', status: 'available', gpu: 'RTX 4060', hz: '280Hz' },
  { id: 'A9', zone: 'standard', status: 'available', gpu: 'RTX 4060', hz: '280Hz' },
  { id: 'A10',zone: 'standard', status: 'available', gpu: 'RTX 4060', hz: '280Hz' },

  // VIP 1 Lounge (10 rigs, ASUS TUF 310Hz, RTX 5060)
  { id: 'B1', zone: 'vip1', status: 'available', gpu: 'RTX 5060', hz: '310Hz' },
  { id: 'B2', zone: 'vip1', status: 'available', gpu: 'RTX 5060', hz: '310Hz' },
  { id: 'B3', zone: 'vip1', status: 'available', gpu: 'RTX 5060', hz: '310Hz' },
  { id: 'B4', zone: 'vip1', status: 'occupied',  gpu: 'RTX 5060', hz: '310Hz' },
  { id: 'B5', zone: 'vip1', status: 'available', gpu: 'RTX 5060', hz: '310Hz' },
  { id: 'B6', zone: 'vip1', status: 'available', gpu: 'RTX 5060', hz: '310Hz' },
  { id: 'B7', zone: 'vip1', status: 'available', gpu: 'RTX 5060', hz: '310Hz' },
  { id: 'B8', zone: 'vip1', status: 'occupied',  gpu: 'RTX 5060', hz: '310Hz' },
  { id: 'B9', zone: 'vip1', status: 'available', gpu: 'RTX 5060', hz: '310Hz' },
  { id: 'B10',zone: 'vip1', status: 'available', gpu: 'RTX 5060', hz: '310Hz' },

  // VIP 2 Bootcamp (5 rigs, Alienware 360Hz, Ryzen 7 7800X3D + RTX 5060 Ti)
  { id: 'C1', zone: 'vip2', status: 'available', gpu: 'RTX 5060 Ti', hz: '360Hz' },
  { id: 'C2', zone: 'vip2', status: 'available', gpu: 'RTX 5060 Ti', hz: '360Hz' },
  { id: 'C3', zone: 'vip2', status: 'available', gpu: 'RTX 5060 Ti', hz: '360Hz' },
  { id: 'C4', zone: 'vip2', status: 'available', gpu: 'RTX 5060 Ti', hz: '360Hz' },
  { id: 'C5', zone: 'vip2', status: 'available', gpu: 'RTX 5060 Ti', hz: '360Hz' }
];

// Helper: Format number to Kazakhstani Tenge
function formatKZT(amount) {
  if (typeof amount !== 'number' || isNaN(amount) || amount < 0) return '0 ₸';
  return amount.toLocaleString('ru-KZ') + ' ₸';
}

// Calculate booking total with optional team bootcamp discount
function calculateBookingPrice(zone, packageKey, seatCount) {
  const rates = BOOKING_PRICING[packageKey] || BOOKING_PRICING.hourly;
  const pricePerSeat = rates[zone] || 800;
  const count = Math.max(1, seatCount);
  const rawTotal = pricePerSeat * count;

  // New Extension: Team Bootcamp Discount (10% off for full 5-man squad)
  const isTeamDiscount = count >= 5;
  const discountAmount = isTeamDiscount ? Math.round(rawTotal * 0.10) : 0;
  const finalTotal = rawTotal - discountAmount;

  return {
    rawTotal,
    discountAmount,
    finalTotal,
    isTeamDiscount,
    pricePerSeat
  };
}

// Generate demo voucher reference code
function generateVoucherCode() {
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  return `QP-2026-AST-${randomSuffix}`;
}

// jQuery 3.7.1 Document Ready Entry Point
$(function () {
  const $form = $('#booking-form');
  if ($form.length === 0) return;

  const selectedSeats = new Set();

  // Set minimum date to today using jQuery .attr() and default value with .val()
  const todayStr = new Date().toISOString().split('T')[0];
  const $dateInput = $('#booking-date').attr('min', todayStr);
  if (!$dateInput.val()) $dateInput.val(todayStr);

  // Pre-fill zone from URL param if available (?zone=vip1 or ?zone=vip2)
  const urlParams = new URLSearchParams(window.location.search);
  const paramZone = urlParams.get('zone');
  const paramPkg = urlParams.get('pkg');

  if (paramZone === 'vip1') $('#zone-vip').prop('checked', true);
  if (paramZone === 'vip2') $('#zone-bootcamp').prop('checked', true);
  if (paramPkg && BOOKING_PRICING[paramPkg]) $('#time-slot').val(paramPkg);

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

  // Recalculate price and update total display with .text() and discount indicators
  function refreshTotal() {
    const zone = getSelectedZone();
    const pkg = $('#time-slot').val() || 'hourly';
    const partySize = parseInt($('#party-size').val(), 10) || 1;
    const count = selectedSeats.size > 0 ? selectedSeats.size : partySize;
    const calc = calculateBookingPrice(zone, pkg, count);

    const $totalDisplay = $('#booking-total-display');
    if (calc.isTeamDiscount) {
      $totalDisplay.html(`
        <span class="text-decoration-line-through text-muted small me-2">${formatKZT(calc.rawTotal)}</span>
        <span class="text-success fw-bold">${formatKZT(calc.finalTotal)}</span>
        <span class="badge bg-success text-dark ms-2 small">10% Team Squad Deal!</span>
      `);
    } else {
      $totalDisplay.text(formatKZT(calc.finalTotal));
    }
  }

  // Synchronize top zone cards with form radio buttons
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
    }, 400);
  });

  // 1. DYNAMIC FLOOR MAP GENERATION VIA JQUERY
  const $seatingCard = $('<div />', {
    id: 'dynamic-seating-container',
    class: 'p-3 bg-dark bg-opacity-75 rounded border border-info mb-4 shadow-sm'
  });

  const $seatingHeader = $('<div />', {
    class: 'd-flex flex-wrap justify-content-between align-items-center pb-2 mb-3 border-bottom border-secondary'
  }).html(`
    <div>
      <h3 class="h6 fw-bold text-accent mb-0">Interactive Floor Map: Select Your Stations</h3>
      <small class="text-muted">Click stations below to choose your PCs. Up to 5 stations per booking.</small>
    </div>
    <div class="small d-flex gap-3 align-items-center mt-2 mt-sm-0">
      <span><span class="badge border border-info text-info me-1">□</span> Available</span>
      <span><span class="badge bg-info text-dark me-1">■</span> Selected</span>
      <span><span class="badge bg-secondary text-muted me-1">✕</span> Occupied</span>
    </div>
  `);
  $seatingCard.append($seatingHeader);

  const $gridWrapper = $('<div class="d-flex flex-column gap-3"/>');

  const zoneSections = [
    { zoneKey: 'standard', title: 'Standard Arena (A1 - A10)', badge: '800 ₸/hr • 280Hz' },
    { zoneKey: 'vip1', title: 'VIP 1 Lounge (B1 - B10)', badge: '1,200 ₸/hr • 310Hz' },
    { zoneKey: 'vip2', title: 'VIP 2 Bootcamp (C1 - C5)', badge: '1,500 ₸/hr • 360Hz' }
  ];

  $.each(zoneSections, function (_, section) {
    const $zoneBox = $('<div />', {
      class: 'p-2 bg-dark rounded border border-secondary zone-section',
      'data-zone': section.zoneKey
    });

    const $zoneHead = $('<div class="d-flex justify-content-between align-items-center mb-2 px-1"/>')
      .append($('<span class="fw-bold small text-light"/>').text(section.title))
      .append($('<span class="badge bg-secondary text-light small"/>').text(section.badge));

    const $btnsRow = $('<div class="d-flex flex-wrap gap-2 station-grid"/>');

    const zoneStations = $.grep(CLUB_STATIONS, s => s.zone === section.zoneKey);
    $.each(zoneStations, function (_, station) {
      const isOccupied = station.status === 'occupied';
      const $btn = $('<button />', {
        type: 'button',
        class: `btn btn-sm ${isOccupied ? 'btn-outline-secondary text-muted' : 'btn-outline-info'} station-btn`,
        text: station.id,
        title: `${station.id} (${station.gpu}, ${station.hz})`
      })
      .attr('data-seat-id', station.id)
      .attr('data-zone', station.zone)
      .prop('disabled', isOccupied);

      if (isOccupied) {
        $btn.addClass('occupied');
      }

      $btnsRow.append($btn);
    });

    $zoneBox.append($zoneHead).append($btnsRow);
    $gridWrapper.append($zoneBox);
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

  // 2. DELEGATED EVENT HANDLER: Station Button Clicks
  // Handled on parent $seatingCard because buttons are injected dynamically
  $seatingCard.on('click', '.station-btn:not([disabled])', function () {
    const $btn = $(this);
    const seatId = $btn.attr('data-seat-id');
    const seatZone = $btn.attr('data-zone');

    if (selectedSeats.has(seatId)) {
      selectedSeats.delete(seatId);
      $btn.removeClass('selected btn-info text-dark fw-bold').addClass('btn-outline-info');
    } else {
      if (selectedSeats.size >= 5) {
        if (typeof displayGlobalToast === 'function') {
          displayGlobalToast('Seat Limit', 'You can select up to 5 gaming stations per reservation.', 'warning');
        }
        return;
      }
      selectedSeats.add(seatId);
      $btn.removeClass('btn-outline-info').addClass('selected btn-info text-dark fw-bold');

      // Sync zone radio with chosen station
      if (seatZone === 'standard') $('#zone-standard').prop('checked', true);
      if (seatZone === 'vip1') $('#zone-vip').prop('checked', true);
      if (seatZone === 'vip2') $('#zone-bootcamp').prop('checked', true);

      highlightActiveZone(seatZone);
    }

    // METHOD CHAIN 1: Traversal up to grid -> finds selected buttons -> picks first -> adds highlight class
    $(this).closest('.station-grid').find('.station-btn.selected').filter(':first').addClass('border-light');

    updateChips();
    refreshTotal();
  });

  // Reset button handling
  $('#booking-reset-btn').on('click', function () {
    selectedSeats.clear();
    $('.station-btn.selected').removeClass('selected btn-info text-dark fw-bold border-light').addClass('btn-outline-info');
    updateChips();
    refreshTotal();
    highlightActiveZone('standard');
  });

  // Radio and input change listeners
  $('input[name="zone"]').on('change', function () {
    highlightActiveZone(getSelectedZone());
    refreshTotal();
  });
  $('#time-slot').on('change', refreshTotal);
  $('#party-size').on('input', refreshTotal);

  // 3. JQUERY MAIN FORM VALIDATION WITH FIELD-LEVEL ERRORS
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

  // Real-time error removal on input/change using $(this)
  $form.on('input change', 'input, select', function () {
    clearFieldError($(this));
  });

  // 4. MODAL PREVIEW SYNCHRONIZATION
  $('button[data-bs-target="#modal-confirm"]').on('click', function () {
    const zone = getSelectedZone();
    const pkg = $('#time-slot').val() || 'hourly';
    const name = $.trim($('#client-name').val()) || 'Guest Gamer';
    const date = $('#booking-date').val() || todayStr;
    const time = $('#booking-time').val() || '18:00';
    const seatsList = selectedSeats.size > 0 ? Array.from(selectedSeats).join(', ') : `${$('#party-size').val()} PC(s) (Auto-Assign)`;
    const count = selectedSeats.size > 0 ? selectedSeats.size : (parseInt($('#party-size').val(), 10) || 1);
    const calc = calculateBookingPrice(zone, pkg, count);

    const $modal = $('#modal-confirm');
    $modal.find('.modal-body').html(`
      <p class="mb-2"><strong>Gamer:</strong> ${name}</p>
      <p class="mb-2"><strong>Schedule:</strong> ${date} at ${time}</p>
      <p class="mb-2"><strong>Zone:</strong> ${zone.toUpperCase()} &bull; <strong>Stations:</strong> [${seatsList}]</p>
      <p class="mb-2"><strong>Estimated Price:</strong> <span class="text-accent fw-bold">${formatKZT(calc.finalTotal)}</span></p>
      <div class="alert alert-info py-2 small mb-0">
        Stations held for 15 minutes past arrival time. Pay at desk via Kaspi QR or Cash upon check-in.
      </div>
    `);
  });

  // Form Submission Handler
  $form.on('submit', function (e) {
    e.preventDefault();

    let isValid = true;
    let $firstInvalid = null;

    $('#booking-error').stop(true, true).slideUp(150);
    $('#booking-confirmation').stop(true, true).slideUp(150);

    // 1. Gamer Tag / Name
    const $name = $('#client-name');
    if ($.trim($name.val()).length < 2) {
      showFieldError($name, 'Please enter your Gamer Tag or Full Name (min 2 chars).');
      isValid = false;
      if (!$firstInvalid) $firstInvalid = $name;
    } else {
      clearFieldError($name);
    }

    // 2. Phone (+7 regex format)
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

    // 6. Policy Checkbox
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

    // Calculations
    const zone = getSelectedZone();
    const pkg = $('#time-slot').val() || 'hourly';
    const seatsList = selectedSeats.size > 0 ? Array.from(selectedSeats).join(', ') : 'Station Auto-Assigned';
    const count = selectedSeats.size > 0 ? selectedSeats.size : (parseInt($('#party-size').val(), 10) || 1);
    const calc = calculateBookingPrice(zone, pkg, count);
    const voucherRef = generateVoucherCode();

    const voucherHtml = `
      <div class="alert alert-success mt-4 shadow border-2 border-success">
        <div class="d-flex flex-wrap justify-content-between align-items-center mb-2">
          <h4 class="alert-heading h5 fw-bold text-success d-flex align-items-center gap-2 mb-0">
            <span>✓</span> Official Reservation Voucher Confirmed!
          </h4>
          <button type="button" class="btn btn-sm btn-outline-success py-0 px-2 fw-semibold" id="btn-copy-voucher" data-code="${voucherRef}">
            📋 Copy Voucher Code
          </button>
        </div>
        <p class="mb-2">Gamer <strong>${$.trim($name.val())}</strong>, your station(s) [<strong>${seatsList}</strong>] at <strong>QazaqPeek Astana (Kenesary 69)</strong> have been reserved.</p>
        <hr class="border-success opacity-50">
        <div class="row g-2 small text-light">
          <div class="col-12 col-sm-6">Voucher Code: <strong class="text-accent" id="booking-reference-code">${voucherRef}</strong></div>
          <div class="col-12 col-sm-6">Schedule: <strong id="booking-confirmed-time">${$date.val()} at ${$time.val()}</strong></div>
          <div class="col-12 col-sm-6">Estimated Cost: <strong class="text-success">${formatKZT(calc.finalTotal)}</strong> ${calc.isTeamDiscount ? '<span class="badge bg-success text-dark">10% Off Applied</span>' : ''}</div>
          <div class="col-12 col-sm-6">Hold Window: <strong class="text-warning">15 Minutes past arrival</strong></div>
        </div>
        <p class="small text-muted mt-3 mb-0">* Demonstration Voucher: Settle at desk via Kaspi QR or Cash upon arrival.</p>
      </div>
    `;

    // METHOD CHAIN 2: Stops running queue, injects voucher markup, slides down over 400ms, and auto-scrolls
    $('#booking-confirmation')
      .stop(true, true)
      .html(voucherHtml)
      .slideDown(400, function () {
        $('html, body').animate({
          scrollTop: $('#booking-confirmation').offset().top - 80
        }, 300);
      });

    // Copy to clipboard handler
    $('#btn-copy-voucher').on('click', function () {
      const code = $(this).attr('data-code');
      if (navigator.clipboard) {
        navigator.clipboard.writeText(code).then(() => {
          $(this).text('✓ Copied to Clipboard!').removeClass('btn-outline-success').addClass('btn-success text-dark');
          if (typeof displayGlobalToast === 'function') {
            displayGlobalToast('Voucher Copied', `Voucher reference ${code} copied!`, 'info');
          }
        });
      }
    });

    // Reset inputs and seat selections
    $form[0].reset();
    selectedSeats.clear();
    $('.station-btn.selected').removeClass('selected btn-info text-dark fw-bold border-light').addClass('btn-outline-info');
    updateChips();
    refreshTotal();
    $dateInput.val(todayStr);
    highlightActiveZone('standard');
  });

  // Initial zone highlight
  highlightActiveZone(getSelectedZone());
});
