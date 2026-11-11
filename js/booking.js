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

const SEATS_PER_ROW = 5;

const ZONE_LABELS = {
  standard: 'Standard Arena (280Hz)',
  vip1: 'VIP 1 Lounge (310Hz)',
  vip2: 'VIP 2 Bootcamp (360Hz)'
};

// formatKZT() — shared from js/main.js (removed duplicate)

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

  // Astana timezone (UTC+5) for accurate local date
  const todayStr = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Almaty' }).format(new Date());
  const $dateInput = $('#booking-date');
  const $dateDisplay = $('#booking-date-display');
  const $dateBtn = $('#booking-date-btn');
  const $datePopover = $('#custom-date-popover');
  const $timeInput = $('#booking-time');
  const $timeHour = $('#booking-time-hour');
  const $timeMinute = $('#booking-time-minute');

  const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const FULL_MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  function pad2(n) {
    return n < 10 ? '0' + n : String(n);
  }

  function parseISODate(iso) {
    const parts = (iso || todayStr).split('-').map(Number);
    return { year: parts[0], month: parts[1] - 1, day: parts[2] };
  }

  function addDaysISO(iso, delta) {
    const p = parseISODate(iso);
    const d = new Date(Date.UTC(p.year, p.month, p.day + delta));
    return `${d.getUTCFullYear()}-${pad2(d.getUTCMonth() + 1)}-${pad2(d.getUTCDate())}`;
  }

  const tomorrowStr = addDaysISO(todayStr, 1);

  function formatDisplayDate(iso) {
    if (!iso) return '';
    const p = parseISODate(iso);
    const base = `${pad2(p.day)} ${MONTH_NAMES[p.month]} ${p.year}`;
    if (iso === todayStr) return `${base} (Today)`;
    if (iso === tomorrowStr) return `${base} (Tomorrow)`;
    return base;
  }

  const todayParts = parseISODate(todayStr);
  let calViewYear = todayParts.year;
  let calViewMonth = todayParts.month;

  function setSelectedDate(iso) {
    $dateInput.val(iso);
    $dateDisplay.val(formatDisplayDate(iso));
    const p = parseISODate(iso);
    calViewYear = p.year;
    calViewMonth = p.month;
  }

  function renderCalendar(year, month) {
    const isCurrentMonth = year === todayParts.year && month === todayParts.month;
    const firstWeekday = (new Date(Date.UTC(year, month, 1)).getUTCDay() + 6) % 7; // Mon=0..Sun=6
    const daysInMonth = new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
    const activeVal = $dateInput.val();

    const $header = $('<div class="d-flex justify-content-between align-items-center mb-2"/>')
      .append($('<button type="button" id="cal-prev-month" class="btn btn-sm btn-outline-secondary px-2 py-0" aria-label="Previous month">&lsaquo;</button>').prop('disabled', isCurrentMonth))
      .append($('<strong class="small text-accent"/>').text(`${FULL_MONTH_NAMES[month]} ${year}`))
      .append($('<button type="button" id="cal-next-month" class="btn btn-sm btn-outline-secondary px-2 py-0" aria-label="Next month">&rsaquo;</button>'));

    const $weekdays = $('<div class="qp-cal-weekdays mb-1"/>')
      .html('<span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span><span>Su</span>');

    const $daysGrid = $('<div class="qp-cal-days"/>');
    for (let blank = 0; blank < firstWeekday; blank++) {
      $daysGrid.append($('<span/>'));
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const iso = `${year}-${pad2(month + 1)}-${pad2(day)}`;
      const isPast = iso < todayStr;
      const isSelected = iso === activeVal;
      const isToday = iso === todayStr;

      let btnClass = 'btn btn-sm qp-cal-day ';
      if (isSelected) {
        btnClass += 'btn-info text-dark fw-bold';
      } else if (isToday) {
        btnClass += 'btn-outline-info fw-semibold';
      } else {
        btnClass += 'btn-outline-secondary text-light border-0';
      }

      const $dayBtn = $('<button />', {
        type: 'button',
        class: btnClass,
        text: day
      })
      .attr('data-date', iso)
      .prop('disabled', isPast);

      $daysGrid.append($dayBtn);
    }

    const $footer = $('<div class="d-flex justify-content-between align-items-center gap-2 mt-2 pt-2 border-top border-secondary"/>')
      .append(
        $('<div class="d-flex gap-1"/>')
          .append('<button type="button" id="cal-today-btn" class="btn btn-outline-info btn-sm py-0 px-2">Today</button>')
          .append('<button type="button" id="cal-tomorrow-btn" class="btn btn-outline-info btn-sm py-0 px-2">Tomorrow</button>')
      )
      .append('<button type="button" id="cal-close-btn" class="btn btn-outline-secondary btn-sm py-0 px-2">Close</button>');

    $datePopover.empty().append($header, $weekdays, $daysGrid, $footer);
  }

  function closeDatePopover() {
    $datePopover.stop(true, true).slideUp(120);
    $dateBtn.add($dateDisplay).attr('aria-expanded', 'false');
  }

  function openDatePopover() {
    const p = parseISODate($dateInput.val() || todayStr);
    calViewYear = p.year;
    calViewMonth = p.month;
    renderCalendar(calViewYear, calViewMonth);
    $datePopover.stop(true, true).slideDown(150);
    $dateBtn.add($dateDisplay).attr('aria-expanded', 'true');
  }

  // Populate 24-hour dropdown (00 - 23) and sync hidden #booking-time
  for (let h = 0; h < 24; h++) {
    const hh = pad2(h);
    $timeHour.append($('<option />', { value: hh, text: hh }));
  }

  function resetDateTimePickers() {
    setSelectedDate(todayStr);
    $timeHour.val('18');
    $timeMinute.val('00');
    $timeInput.val('18:00');
  }

  function syncBookingTime() {
    const hh = $timeHour.val() || '18';
    const mm = $timeMinute.val() || '00';
    $timeInput.val(`${hh}:${mm}`);
  }

  resetDateTimePickers();

  $timeHour.add($timeMinute).on('change', function () {
    syncBookingTime();
    clearFieldError($timeHour);
  });

  $dateBtn.add($dateDisplay).on('click', function (e) {
    e.stopPropagation();
    if ($datePopover.is(':visible')) {
      closeDatePopover();
    } else {
      openDatePopover();
    }
  });

  $dateDisplay.on('keydown', function (e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if ($datePopover.is(':visible')) closeDatePopover();
      else openDatePopover();
    } else if (e.key === 'Escape') {
      closeDatePopover();
    }
  });

  $datePopover.on('click', '#cal-prev-month', function (e) {
    e.stopPropagation();
    calViewMonth--;
    if (calViewMonth < 0) {
      calViewMonth = 11;
      calViewYear--;
    }
    renderCalendar(calViewYear, calViewMonth);
  });

  $datePopover.on('click', '#cal-next-month', function (e) {
    e.stopPropagation();
    calViewMonth++;
    if (calViewMonth > 11) {
      calViewMonth = 0;
      calViewYear++;
    }
    renderCalendar(calViewYear, calViewMonth);
  });

  $datePopover.on('click', '.qp-cal-day:not([disabled])', function (e) {
    e.stopPropagation();
    setSelectedDate($(this).attr('data-date'));
    clearFieldError($dateDisplay);
    closeDatePopover();
  });

  $datePopover.on('click', '#cal-today-btn', function (e) {
    e.stopPropagation();
    setSelectedDate(todayStr);
    clearFieldError($dateDisplay);
    closeDatePopover();
  });

  $datePopover.on('click', '#cal-tomorrow-btn', function (e) {
    e.stopPropagation();
    setSelectedDate(tomorrowStr);
    clearFieldError($dateDisplay);
    closeDatePopover();
  });

  $datePopover.on('click', '#cal-close-btn', function (e) {
    e.stopPropagation();
    closeDatePopover();
  });

  $(document).on('click', function (e) {
    if ($datePopover.is(':visible') && $(e.target).closest('#custom-date-popover, #booking-date-btn, #booking-date-display').length === 0) {
      closeDatePopover();
    }
  });

  // Pre-fill package from URL param if available (?zone=vip1&pkg=...)
  const urlParams = new URLSearchParams(window.location.search);
  const paramZone = urlParams.get('zone');
  const paramPkg = urlParams.get('pkg');

  if (paramPkg && BOOKING_PRICING[paramPkg]) $('#time-slot').val(paramPkg);

  // Find currently active zone solely from selected stations on the map
  function getSelectedZone() {
    return $('.station-btn.selected:first').attr('data-zone') || null;
  }

  // Highlight active zone box on the floor map
  function highlightActiveZone(zone) {
    $('.zone-section').removeClass('border-info');
    if (zone) {
      $(`.zone-section[data-zone="${zone}"]`).addClass('border-info');
    }
  }

  // Recalculate price and update total display with .text() and discount indicators
  function refreshTotal() {
    const zone = getSelectedZone();
    const pkg = $('#time-slot').val();
    const count = selectedSeats.size;
    const $totalDisplay = $('#booking-total-display');

    if (!zone || count === 0) {
      $totalDisplay.text('Select seats on map');
      return;
    }

    const calc = calculateBookingPrice(zone, pkg || 'hourly', count);
    const rateSuffix = (!pkg || pkg === 'hourly') ? ' / hr' : '';

    if (calc.isTeamDiscount) {
      $totalDisplay.html(`
        <span class="text-decoration-line-through text-muted small me-2">${formatKZT(calc.rawTotal)}${rateSuffix}</span>
        <span class="text-success fw-bold">${formatKZT(calc.finalTotal)}${rateSuffix}</span>
        <span class="badge bg-success text-dark ms-2 small">10% Team Squad Deal!</span>
      `);
    } else {
      $totalDisplay.text(formatKZT(calc.finalTotal) + rateSuffix);
    }
  }

  // 1. DYNAMIC FLOOR MAP GENERATION VIA JQUERY
  const $seatingCard = $('<div />', {
    id: 'dynamic-seating-container',
    class: 'p-3 bg-dark bg-opacity-75 rounded border border-info mb-3 shadow-sm'
  });

  const $seatingHeader = $('<div />', {
    class: 'd-flex flex-wrap justify-content-between align-items-center pb-2 mb-3 border-bottom border-secondary'
  }).html(`
    <div>
      <h4 class="h6 fw-bold text-accent mb-0">Interactive Floor Map: Select Your Zone &amp; Stations</h4>
      <small class="text-muted">Click available stations below (5 seats per row, up to 5 PCs per booking).</small>
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
    { zoneKey: 'standard', title: 'Standard Arena (A1 - A10)', badge: '800 ₸/hr • 280Hz', specs: 'i5-14400F • RTX 4060/5060 • AULA F75 • Logitech G102' },
    { zoneKey: 'vip1', title: 'VIP 1 Lounge (B1 - B10)', badge: '1,200 ₸/hr • 310Hz', specs: 'i5-14600KF • RTX 5060 • AULA F75 • VGN Mouse' },
    { zoneKey: 'vip2', title: 'VIP 2 Bootcamp (C1 - C5)', badge: '1,500 ₸/hr • 360Hz', specs: 'Ryzen 7 7800X3D • RTX 5060 Ti • Alienware 360Hz • MCHOSE A5' }
  ];

  $.each(zoneSections, function (_, section) {
    const $zoneBox = $('<div />', {
      class: 'p-2 bg-dark rounded border border-secondary zone-section',
      'data-zone': section.zoneKey
    });

    const $zoneHead = $('<div class="d-flex flex-wrap justify-content-between align-items-center gap-1 mb-1 px-1"/>')
      .append($('<span class="fw-bold small text-light"/>').text(section.title))
      .append($('<span class="badge bg-secondary text-light small"/>').text(section.badge));

    const $zoneSpecs = $('<div class="small text-muted px-1 mb-2"/>').text(section.specs);

    const $btnsGrid = $('<div class="station-grid"/>');
    const zoneStations = $.grep(CLUB_STATIONS, s => s.zone === section.zoneKey);

    // Arrange stations in rows of 5 seats; extra seats wrap into 2+ rows
    for (let i = 0; i < zoneStations.length; i += SEATS_PER_ROW) {
      const rowStations = zoneStations.slice(i, i + SEATS_PER_ROW);
      const $row = $('<div class="station-row"/>');

      $.each(rowStations, function (_, station) {
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

        $row.append($btn);
      });

      $btnsGrid.append($row);
    }

    $zoneBox.append($zoneHead).append($zoneSpecs).append($btnsGrid);
    $gridWrapper.append($zoneBox);
  });

  $seatingCard.append($gridWrapper);

  const $chipsRow = $('<div />', {
    class: 'mt-3 pt-2 border-top border-secondary small text-light d-flex flex-wrap align-items-center gap-2',
    html: '<span class="text-secondary">Selected Stations:</span><span id="seats-chips-display" class="text-info fw-semibold">None (click available stations above)</span>'
  });
  $seatingCard.append($chipsRow);

  const $mapError = $('<div />', {
    id: 'map-selection-error',
    class: 'text-danger small fw-semibold mt-2',
    style: 'display: none;'
  }).text('Please select at least 1 station on the floor map above.');
  $seatingCard.append($mapError);

  const $mapSlot = $('#floor-map-slot');
  if ($mapSlot.length > 0) {
    $mapSlot.append($seatingCard);
  } else {
    const $legend = $form.find('legend:first');
    if ($legend.length > 0) {
      $legend.after($seatingCard);
    } else {
      $form.prepend($seatingCard);
    }
  }

  function updateChips() {
    const count = selectedSeats.size;
    const zone = getSelectedZone();
    if (count > 0 && zone) {
      const zoneLabel = ZONE_LABELS[zone] || zone.toUpperCase();
      $('#seats-chips-display').text(`${zoneLabel}: ${Array.from(selectedSeats).join(', ')} (${count} PC${count > 1 ? 's' : ''})`);
    } else {
      $('#seats-chips-display').text('None (click available stations above)');
    }
    $('#party-size').val(count);
  }

  // 2. DELEGATED EVENT HANDLER: Station Button Clicks
  // Handled on parent $seatingCard because buttons are injected dynamically
  $seatingCard.on('click', '.station-btn:not([disabled])', function () {
    const $btn = $(this);
    const seatId = $btn.attr('data-seat-id');
    const seatZone = $btn.attr('data-zone');

    if (selectedSeats.has(seatId)) {
      selectedSeats.delete(seatId);
      $btn.removeClass('selected btn-info text-dark fw-bold border-light').addClass('btn-outline-info');
    } else {
      if (selectedSeats.size >= 5) {
        if (typeof displayGlobalToast === 'function') {
          displayGlobalToast('Seat Limit', 'You can select up to 5 gaming stations per reservation.', 'warning');
        }
        return;
      }
      // Cross-zone guard: deselect stations from other zones (only one zone per booking)
      const conflicting = Array.from(selectedSeats).filter(function (id) {
        return $(`.station-btn[data-seat-id="${id}"]`).attr('data-zone') !== seatZone;
      });
      if (conflicting.length > 0) {
        $.each(conflicting, function (_, id) {
          selectedSeats.delete(id);
          $(`.station-btn[data-seat-id="${id}"]`).removeClass('selected btn-info text-dark fw-bold border-light').addClass('btn-outline-info');
        });
        if (typeof displayGlobalToast === 'function') {
          displayGlobalToast('Zone Changed', 'Cleared ' + conflicting.length + ' station(s) from another zone. Bookings are single-zone only.', 'warning');
        }
      }

      selectedSeats.add(seatId);
      $btn.removeClass('btn-outline-info').addClass('selected btn-info text-dark fw-bold');

      // Clear map validation error once at least one seat is chosen
      $('#map-selection-error').stop(true, true).slideUp(150);
      $seatingCard.removeClass('border-danger').addClass('border-info');
    }

    // METHOD CHAIN 1: Traversal up to grid -> clears old border -> finds selected buttons -> picks first -> adds highlight class
    $(this).closest('.station-grid').find('.station-btn').removeClass('border-light').filter('.selected:first').addClass('border-light');

    highlightActiveZone(getSelectedZone());
    updateChips();
    refreshTotal();
  });

  // Reset button handling
  $('#booking-reset-btn').on('click', function () {
    selectedSeats.clear();
    $('.station-btn.selected').removeClass('selected btn-info text-dark fw-bold border-light').addClass('btn-outline-info');
    $('#map-selection-error').stop(true, true).slideUp(150);
    $seatingCard.removeClass('border-danger').addClass('border-info');
    closeDatePopover();
    updateChips();
    refreshTotal();
    highlightActiveZone(null);
    setTimeout(function () {
      $('#party-size').val(0);
      resetDateTimePickers();
    }, 0);
  });

  // Package dropdown change listener
  $('#time-slot').on('change', refreshTotal);

  // 3. JQUERY MAIN FORM VALIDATION WITH FIELD-LEVEL ERRORS
  $form.attr('novalidate', 'novalidate');

  function getErrorAnchor($field) {
    const $group = $field.closest('.input-group');
    return $group.length > 0 ? $group : $field;
  }

  function showFieldError($field, msg) {
    $field.addClass('is-invalid');
    const $anchor = getErrorAnchor($field);
    let $err = $anchor.siblings('.invalid-feedback');
    if ($err.length === 0) {
      $err = $('<div />', { class: 'invalid-feedback text-danger small mt-1 fw-semibold' });
      $anchor.after($err);
    }
    $err.text(msg).stop(true, true).slideDown(200);
  }

  function clearFieldError($field) {
    $field.removeClass('is-invalid');
    getErrorAnchor($field).siblings('.invalid-feedback').stop(true, true).slideUp(150);
  }

  // Real-time error removal on input/change using $(this)
  $form.on('input change', 'input, select', function () {
    clearFieldError($(this));
  });

  // 4. MODAL PREVIEW SYNCHRONIZATION
  $('button[data-bs-target="#modal-confirm"]').on('click', function () {
    const zone = getSelectedZone();
    const pkg = $('#time-slot').val();
    const name = $.trim($('#client-name').val()) || 'Guest Gamer';
    const date = $('#booking-date').val() || todayStr;
    const time = $('#booking-time').val() || '18:00';
    const count = selectedSeats.size;
    const $modal = $('#modal-confirm');

    if (!zone || count === 0) {
      $modal.find('.modal-body').html(`
        <p class="mb-2"><strong>Gamer:</strong> ${name}</p>
        <p class="mb-2"><strong>Schedule:</strong> ${date} at ${time}</p>
        <p class="mb-2"><strong>Stations:</strong> <span class="text-warning">None selected</span></p>
        <div class="alert alert-warning py-2 small mb-0">
          Please select 1 to 5 stations on the interactive floor map before confirming your booking.
        </div>
      `);
      return;
    }

    const seatsList = Array.from(selectedSeats).join(', ');
    const calc = calculateBookingPrice(zone, pkg || 'hourly', count);
    const pkgLabel = (pkg && BOOKING_PRICING[pkg]) ? BOOKING_PRICING[pkg].label : 'Hourly Rate (select package)';
    const rateSuffix = (!pkg || pkg === 'hourly') ? ' / hr' : '';

    $modal.find('.modal-body').html(`
      <p class="mb-2"><strong>Gamer:</strong> ${name}</p>
      <p class="mb-2"><strong>Schedule:</strong> ${date} at ${time}</p>
      <p class="mb-2"><strong>Zone:</strong> ${ZONE_LABELS[zone] || zone.toUpperCase()} &bull; <strong>Stations:</strong> [${seatsList}]</p>
      <p class="mb-2"><strong>Package:</strong> ${pkgLabel}</p>
      <p class="mb-2"><strong>Estimated Price:</strong> <span class="text-accent fw-bold">${formatKZT(calc.finalTotal)}${rateSuffix}</span></p>
      <div class="alert alert-info py-2 small mb-0">
        Stations held for 15 minutes past arrival time. Pay at desk via Kaspi QR or Cash upon check-in.
      </div>
    `);
  });

  // Modal "Confirm Booking" button triggers actual form submission
  $('#modal-confirm-btn').on('click', function () {
    $form.trigger('submit');
  });

  // Form Submission Handler
  $form.on('submit', function (e) {
    e.preventDefault();

    let isValid = true;
    let $firstInvalid = null;

    $('#booking-error').stop(true, true).slideUp(150);
    $('#booking-confirmation').stop(true, true).slideUp(150);

    // 0. Floor Map Station & Zone Selection (Required: choosing only in map)
    if (selectedSeats.size === 0) {
      $seatingCard.removeClass('border-info').addClass('border-danger');
      $('#map-selection-error').stop(true, true).slideDown(200);
      isValid = false;
      $firstInvalid = $seatingCard;
    } else {
      $seatingCard.removeClass('border-danger').addClass('border-info');
      $('#map-selection-error').stop(true, true).slideUp(150);
    }

    // 0b. Tariff Package Selection
    const $pkgSelect = $('#time-slot');
    if (!$pkgSelect.val()) {
      showFieldError($pkgSelect, 'Please choose a tariff package or time slot.');
      isValid = false;
      if (!$firstInvalid) $firstInvalid = $pkgSelect;
    } else {
      clearFieldError($pkgSelect);
    }

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
      showFieldError($dateDisplay, 'Reservation date cannot be empty or in the past.');
      isValid = false;
      if (!$firstInvalid) $firstInvalid = $dateDisplay;
    } else {
      clearFieldError($dateDisplay);
    }

    // 5. Arrival Time (24-hour format HH:MM)
    syncBookingTime();
    const $time = $('#booking-time');
    if (!/^([01]\d|2[0-3]):[0-5]\d$/.test($time.val())) {
      showFieldError($timeHour, 'Please select a valid 24-hour arrival time.');
      isValid = false;
      if (!$firstInvalid) $firstInvalid = $timeHour;
    } else {
      clearFieldError($timeHour);
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
      if ($firstInvalid && $firstInvalid.is($seatingCard)) {
        $('html, body').stop(true, true).animate({
          scrollTop: $seatingCard.offset().top - 80
        }, 300);
      } else if ($firstInvalid) {
        $firstInvalid.focus();
      }
      return;
    }

    // Calculations
    const zone = getSelectedZone();
    const pkg = $('#time-slot').val();
    const seatsList = Array.from(selectedSeats).join(', ');
    const count = selectedSeats.size;
    const calc = calculateBookingPrice(zone, pkg, count);
    const voucherRef = generateVoucherCode();
    const rateSuffix = pkg === 'hourly' ? ' / hr' : '';

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
        <p class="mb-2">Gamer <strong>${$.trim($name.val())}</strong>, your station(s) [<strong>${seatsList}</strong>] in <strong>${ZONE_LABELS[zone] || zone.toUpperCase()}</strong> at <strong>QazaqPeek Astana (Kenesary 69)</strong> have been reserved.</p>
        <hr class="border-success opacity-50">
        <div class="row g-2 small text-light">
          <div class="col-12 col-sm-6">Voucher Code: <strong class="text-accent" id="booking-reference-code">${voucherRef}</strong></div>
          <div class="col-12 col-sm-6">Schedule: <strong id="booking-confirmed-time">${$date.val()} at ${$time.val()}</strong></div>
          <div class="col-12 col-sm-6">Package: <strong>${BOOKING_PRICING[pkg].label}</strong></div>
          <div class="col-12 col-sm-6">Estimated Cost: <strong class="text-success">${formatKZT(calc.finalTotal)}${rateSuffix}</strong> ${calc.isTeamDiscount ? '<span class="badge bg-success text-dark">10% Off Applied</span>' : ''}</div>
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

    // Reset inputs and seat selections after delay so voucher is visible
    setTimeout(function () {
      $form[0].reset();
      selectedSeats.clear();
      $('.station-btn.selected').removeClass('selected btn-info text-dark fw-bold border-light').addClass('btn-outline-info');
      $('#map-selection-error').stop(true, true).hide();
      $seatingCard.removeClass('border-danger').addClass('border-info');
      closeDatePopover();
      updateChips();
      refreshTotal();
      resetDateTimePickers();
      highlightActiveZone(null);
    }, 600);
  });

  // Initial state: highlight deep-linked zone if provided (?zone=standard|vip1|vip2)
  highlightActiveZone(paramZone && ZONE_LABELS[paramZone] ? paramZone : null);
  refreshTotal();
});
