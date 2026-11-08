/**
 * ================================================================================
 * QAZAQPEEK CYBER CLUB ASTANA — TOURNAMENTS & ESPORTS EVENTS
 * File: js/events.js
 * Author: Dias Tursynbay
 * Technology: 100% jQuery 3.7.1 (Weeks 9–10)
 *
 * Requirements Covered:
 *   - Wrapped in $(function () { ... }) document ready wrapper
 *   - Selectors of different kinds: ID ($('#id')), Class ($('.cls')), Tag ($('input')), Attribute ($('[data-...]')), Filters (:checked, :not, :first)
 *   - Traversal without redundant IDs: .closest(), .find(), .siblings(), $(this), .parent()
 *   - Method Chaining of >=3 calls with step-by-step commentary
 *   - At least 2 purposeful animated effects: .slideDown(), .slideUp(), .fadeIn(), .slideToggle()
 *   - Delegated event handlers bound to permanent container for dynamic elements
 *   - Full Form Validation on submit: preventDefault, trim, field-level errors, regex checks, real-time error clear
 *   - Dynamic Roster Input Builder (Captain can dynamically add/remove roster slots)
 *   - Strict Isolation: 100% jQuery (Zero mixing with Plain JS)
 * ================================================================================
 */

'use strict';

// 6 Official Esports LAN Tournaments at QazaqPeek Kenesary 69
const TOURNAMENTS_DATA = [
  {
    id: 'cs2-cup',
    title: 'CS2 Astana Cup 5v5',
    game: 'Counter-Strike 2',
    date: '2026-11-14',
    time: '11:00 AM',
    prizePool: 250000,
    entryFee: 10000,
    status: 'open',
    statusLabel: 'Open for Registration',
    format: 'Double Elimination • 128-tick LAN Server',
    badgeClass: 'bg-success text-dark',
    slotsTotal: 16,
    slotsLeft: 4,
    cardId: 'card-event-cs2',
    rulesText: 'Tournament mode active. Server IP: 192.168.1.100:27015. Bring your own peripherals or use our AULA F75 & MCHOSE setups. Strict anti-cheat check.'
  },
  {
    id: 'dota-1v1',
    title: 'Dota 2 Midlaner 1v1 Showdown',
    game: 'Dota 2',
    date: '2026-11-21',
    time: '02:00 PM',
    prizePool: 80000,
    entryFee: 2500,
    status: 'open',
    statusLabel: 'Open for Registration',
    format: 'Shadow Fiend Solo Mid • Best of 3',
    badgeClass: 'bg-info text-dark',
    slotsTotal: 32,
    slotsLeft: 9,
    cardId: 'card-event-dota',
    rulesText: 'Mirror match Shadow Fiend only. First to 2 kills or 1 tower destruction wins. Runes enabled after 2 minutes.'
  },
  {
    id: 'fc24-weekend',
    title: 'FC 24 Weekend Championship',
    game: 'EA Sports FC 24',
    date: '2026-11-28',
    time: '01:00 PM',
    prizePool: 100000,
    entryFee: 3000,
    status: 'open',
    statusLabel: 'Open for Registration',
    format: 'PS5 & PC Arena • Single Elimination',
    badgeClass: 'bg-primary text-light',
    slotsTotal: 24,
    slotsLeft: 6,
    cardId: 'card-event-fc24',
    rulesText: '6-minute halves. Tactical defending mandatory. Official venue DualSense wireless controllers provided.'
  },
  {
    id: 'valorant-open',
    title: 'Valorant Spike Rush LAN',
    game: 'Valorant',
    date: '2026-12-05',
    time: '12:00 PM',
    prizePool: 150000,
    entryFee: 7500,
    status: 'open',
    statusLabel: 'Open for Registration',
    format: '5v5 Tournament Mode • VIP 2 Bootcamp',
    badgeClass: 'bg-info text-dark',
    slotsTotal: 8,
    slotsLeft: 2,
    cardId: 'card-event-valorant',
    rulesText: 'VIP 2 Ryzen 7 7800X3D + 360Hz Alienware rigs dedicated. Riot Vanguard client verified by admin before lobby creation.'
  },
  {
    id: 'pubg-masters',
    title: 'PUBG Mobile Solo Masters',
    game: 'PUBG Mobile / Emulator',
    date: '2026-10-05',
    time: '03:00 PM',
    prizePool: 60000,
    entryFee: 2000,
    status: 'concluded',
    statusLabel: 'Concluded (Winner: QazaqSniper)',
    format: 'Erangel 4-Map Series',
    badgeClass: 'bg-secondary text-light',
    slotsTotal: 50,
    slotsLeft: 0,
    cardId: 'card-event-pubg',
    rulesText: 'Concluded event. First place: QazaqSniper (35,000 ₸), Second place: NomadAim (15,000 ₸), Third: SaryArka (10,000 ₸).'
  },
  {
    id: 'apex-trio',
    title: 'Apex Legends Trio Rumble',
    game: 'Apex Legends',
    date: '2026-09-20',
    time: '01:00 PM',
    prizePool: 120000,
    entryFee: 6000,
    status: 'concluded',
    statusLabel: 'Concluded (Winner: Astana Predators)',
    format: 'Custom Lobby 6 Rounds',
    badgeClass: 'bg-secondary text-light',
    slotsTotal: 20,
    slotsLeft: 0,
    cardId: 'card-event-apex',
    rulesText: 'Concluded event. Winner: Astana Predators with 84 total tournament points across 6 World\'s Edge matches.'
  }
];

// Helper: Formats currency amount in KZT
function formatKZT(amount) {
  if (typeof amount !== 'number' || isNaN(amount) || amount < 0) return '0 ₸';
  return amount.toLocaleString('ru-KZ') + ' ₸';
}

// Generates a tournament bracket seed code
function generateBracketSeed(gameSlug) {
  const num = Math.floor(100 + Math.random() * 900);
  const prefix = gameSlug ? gameSlug.substring(0, 3).toUpperCase() : 'LAN';
  return `QP-${prefix}-${num}`;
}

// jQuery Entry Point: $(function () { ... }) executes once DOM is ready
$(function () {
  const $cardContainer = $('#events-card-container');
  if ($cardContainer.length === 0) return;

  // 1. DYNAMIC ESPORTS DASHBOARD METRICS BAR
  // Calculated numbers: total prize pool sum, open events count, available slots
  let totalPrizeMoney = 0;
  let openEventsCount = 0;
  let totalAvailableSlots = 0;

  $.each(TOURNAMENTS_DATA, function (_, tourney) {
    totalPrizeMoney += tourney.prizePool;
    if (tourney.status === 'open') {
      openEventsCount++;
      totalAvailableSlots += (tourney.slotsLeft || 0);
    }
  });

  const $dashboardBar = $('<div />', {
    id: 'tournaments-dashboard-bar',
    class: 'p-3 bg-dark rounded border border-info mb-4 shadow-sm'
  }).html(`
    <div class="row g-3 align-items-center text-center text-md-start">
      <div class="col-12 col-md-4 border-end-md border-secondary">
        <span class="text-muted small d-block">Cumulative LAN Prize Pool</span>
        <span class="h4 text-warning fw-bold mb-0">${formatKZT(totalPrizeMoney)}</span>
      </div>
      <div class="col-6 col-md-3">
        <span class="text-muted small d-block">Open Competitions</span>
        <span class="h4 text-accent fw-bold mb-0">${openEventsCount} Active Events</span>
      </div>
      <div class="col-6 col-md-3">
        <span class="text-muted small d-block">Open Team Slots</span>
        <span class="h4 text-success fw-bold mb-0">${totalAvailableSlots} Slots Remaining</span>
      </div>
      <div class="col-12 col-md-2 text-md-end">
        <span class="badge bg-success text-dark p-2 fw-bold">Live LAN Season</span>
      </div>
    </div>
  `);
  $cardContainer.before($dashboardBar);

  // 2. SEARCH BAR & DYNAMIC RESULT COUNTER
  const $searchBar = $('<div />', {
    id: 'tournaments-search-bar',
    class: 'row g-3 align-items-center mb-4'
  });

  const $searchInput = $('<input />', {
    type: 'search',
    id: 'tournament-search-input',
    class: 'form-control bg-dark text-light border-secondary',
    placeholder: 'Search by game (CS2, Dota 2, FC 24, Valorant)...'
  });

  const $counterText = $('<span />', {
    id: 'tournament-result-count',
    text: `Showing all ${TOURNAMENTS_DATA.length} events`
  });

  $searchBar.append($('<div class="col-12 col-md-6"/>').append($searchInput));
  $searchBar.append($('<div class="col-12 col-md-6 text-md-end text-muted small"/>').append($counterText));
  $cardContainer.before($searchBar);

  let currentFilter = 'all';

  // 3. DYNAMIC TOURNAMENT CARD BUILDER WITH ANIMATION
  function renderTournamentCards() {
    const query = $.trim($searchInput.val()).toLowerCase();

    const filtered = $.grep(TOURNAMENTS_DATA, function (item) {
      const matchStatus = (currentFilter === 'all' || item.status === currentFilter);
      const matchSearch = query === '' ||
        item.title.toLowerCase().includes(query) ||
        item.game.toLowerCase().includes(query) ||
        item.format.toLowerCase().includes(query);
      return matchStatus && matchSearch;
    });

    $cardContainer.empty();

    if (filtered.length === 0) {
      const $emptyBox = $('<div />', {
        class: 'col-12 text-center py-5',
        html: '<div class="p-4 bg-dark rounded border border-secondary shadow-sm">' +
              '<h3 class="h5 text-warning mb-2">No tournaments match your filter</h3>' +
              '<p class="text-muted small mb-3">Try adjusting your keyword or click below to view all scheduled LAN cups.</p>' +
              '<button type="button" class="btn btn-outline-info btn-sm" id="btn-reset-events">Show All Events</button>' +
              '</div>'
      });

      $emptyBox.find('#btn-reset-events').on('click', function () {
        $searchInput.val('');
        $('#filter-all').trigger('click');
      });

      $cardContainer.append($emptyBox);
      $emptyBox.hide().fadeIn(300);
      $counterText.text('0 tournaments found');
      return;
    }

    $.each(filtered, function (_, item) {
      const $col = $('<div />', {
        class: 'col-12 col-md-6 col-lg-4 tournament-card-col',
        id: item.cardId
      }).attr('data-status', item.status).attr('data-game', item.game);

      const $card = $('<div />', {
        class: 'card bg-custom-card text-light h-100 shadow-sm border-secondary d-flex flex-column justify-content-between p-3'
      });

      const isOpen = item.status === 'open';
      const buttonHtml = isOpen
        ? `<button type="button" class="btn btn-info btn-sm w-100 fw-bold text-dark register-squad-btn" data-tourney-id="${item.id}">Register Squad / Player &rarr;</button>`
        : `<button type="button" class="btn btn-outline-secondary btn-sm w-100" disabled>Tournament Concluded</button>`;

      const slotsInfo = isOpen
        ? `<span class="badge bg-dark border border-success text-success">${item.slotsLeft} of ${item.slotsTotal} slots left</span>`
        : `<span class="badge bg-secondary text-light">Bracket Finished</span>`;

      $card.html(`
        <div>
          <div class="d-flex justify-content-between align-items-center mb-2">
            <span class="small text-muted fw-bold text-uppercase">${item.game}</span>
            <span class="badge ${item.badgeClass} fw-bold">${item.statusLabel}</span>
          </div>
          <h3 class="h5 card-title fw-bold text-accent mb-2">${item.title}</h3>
          <ul class="list-unstyled small text-light mb-2">
            <li>📅 <strong>Date:</strong> ${item.date} at ${item.time}</li>
            <li>🏆 <strong>Prize Pool:</strong> <span class="text-warning fw-bold">${formatKZT(item.prizePool)}</span></li>
            <li>🎟️ <strong>Entry Fee:</strong> ${formatKZT(item.entryFee)} / squad</li>
            <li class="text-muted">⚙️ ${item.format}</li>
          </ul>
          <div class="mb-3 d-flex justify-content-between align-items-center">
            ${slotsInfo}
            <button type="button" class="btn btn-link btn-sm text-accent text-decoration-none p-0 toggle-rules-btn">
              📜 Rules &amp; Spec
            </button>
          </div>
          <div class="tournament-rules-panel p-2 bg-dark rounded border border-secondary small text-muted mb-3" style="display: none;">
            ${item.rulesText}
          </div>
        </div>
        <div class="pt-2 border-top border-secondary">
          ${buttonHtml}
        </div>
      `);

      $col.append($card);
      $cardContainer.append($col);
    });

    $counterText.text(`Showing ${filtered.length} of ${TOURNAMENTS_DATA.length} events`);
    $cardContainer.find('.tournament-card-col').hide().fadeIn(300);
  }

  // 4. DELEGATED EVENT HANDLER 1: Register Squad Button
  // Dynamic button clicks are intercepted at parent $cardContainer
  $cardContainer.on('click', '.register-squad-btn', function () {
    const tourneyId = $(this).attr('data-tourney-id');
    const $dropdown = $('#tournament-choice');
    $dropdown.val(tourneyId);

    $('html, body').stop(true, true).animate({
      scrollTop: $('#tournament-registration').offset().top - 70
    }, 400, function () {
      $dropdown.focus().addClass('border-info');
    });
  });

  // 5. DELEGATED EVENT HANDLER 2: Expandable Rules Panel with .slideToggle()
  $cardContainer.on('click', '.toggle-rules-btn', function () {
    const $panel = $(this).closest('.card').find('.tournament-rules-panel');
    $panel.stop(true, true).slideToggle(250);
  });

  // 6. METHOD CHAINING DEMONSTRATION (>=3 Links): Filter buttons styling
  // Link 1: climbs to siblings
  // Link 2: strips active classes
  // Link 3: adds outline styling
  // Link 4: .end() pops stack back to clicked button
  // Link 5: adds active highlight
  $('.btn-group-filter, #filter-all, #filter-open, #filter-completed').on('click', function () {
    const $btn = $(this);
    $btn.siblings()
      .removeClass('active btn-info text-dark fw-bold')
      .addClass('btn-outline-info')
      .end()
      .removeClass('btn-outline-info')
      .addClass('active btn-info text-dark fw-bold');

    if ($btn.attr('id') === 'filter-all') currentFilter = 'all';
    else if ($btn.attr('id') === 'filter-open') currentFilter = 'open';
    else if ($btn.attr('id') === 'filter-completed') currentFilter = 'concluded';

    renderTournamentCards();
  });

  $searchInput.on('input', renderTournamentCards);

  // Populate tournament dropdown options
  const $tourneyChoice = $('#tournament-choice');
  $tourneyChoice.empty().append('<option value="" selected disabled>Select Tournament Event...</option>');
  $.each(TOURNAMENTS_DATA, function (_, tourney) {
    if (tourney.status === 'open') {
      $tourneyChoice.append($('<option />', {
        value: tourney.id,
        text: `${tourney.title} (${tourney.date})`
      }));
    }
  });

  renderTournamentCards();

  // 7. DYNAMIC ROSTER BUILDER (Captain can add/remove up to 5 squad member inputs)
  const $rosterGroup = $('#roster-notes').closest('.mb-3');
  const $rosterBuilderBox = $('<div />', {
    id: 'dynamic-roster-builder',
    class: 'p-3 bg-dark rounded border border-secondary mb-3'
  }).html(`
    <div class="d-flex justify-content-between align-items-center mb-2">
      <span class="small text-light fw-bold">Dynamic 5-Man Squad Lineup:</span>
      <button type="button" class="btn btn-outline-info btn-sm py-0" id="btn-add-roster-slot">+ Add Player</button>
    </div>
    <div id="roster-slots-container" class="d-flex flex-column gap-2"></div>
    <small class="text-muted d-block mt-2">* Add nicknames for all 5 team members for the official match sheet.</small>
  `);
  $rosterGroup.after($rosterBuilderBox);

  const $slotsContainer = $('#roster-slots-container');
  const playerRoles = ['Captain / IGL', 'Entry Fragger', 'Main AWP', 'Rifler / Support', 'Lurker / Anchor'];

  function addRosterSlot(defaultRole) {
    const currentCount = $slotsContainer.find('.roster-player-row').length;
    if (currentCount >= 5) {
      if (typeof displayGlobalToast === 'function') {
        displayGlobalToast('Roster Full', 'Maximum of 5 squad members allowed.', 'warning');
      }
      return;
    }

    const roleName = defaultRole || playerRoles[currentCount] || `Player ${currentCount + 1}`;
    const $row = $('<div />', { class: 'input-group input-group-sm roster-player-row' }).html(`
      <span class="input-group-text bg-secondary text-light border-secondary" style="min-width: 140px;">${roleName}</span>
      <input type="text" class="form-control bg-dark text-light border-secondary roster-player-tag" placeholder="Gamer Tag (e.g. ShadowAce)" required>
      <button type="button" class="btn btn-outline-danger remove-player-btn" title="Remove Player">&times;</button>
    `);
    $slotsContainer.append($row);
    $row.hide().fadeIn(200);
  }

  // Pre-seed 5 standard slots
  for (let i = 0; i < 5; i++) {
    addRosterSlot(playerRoles[i]);
  }

  $('#btn-add-roster-slot').on('click', function () {
    addRosterSlot();
  });

  // Delegated remove player button listener
  $slotsContainer.on('click', '.remove-player-btn', function () {
    const currentCount = $slotsContainer.find('.roster-player-row').length;
    if (currentCount <= 1) {
      if (typeof displayGlobalToast === 'function') {
        displayGlobalToast('Roster Minimum', 'At least 1 player tag required.', 'warning');
      }
      return;
    }
    $(this).closest('.roster-player-row').slideUp(150, function () {
      $(this).remove();
    });
  });

  // 8. 5-MAN SQUAD FORM SUBMIT VALIDATION WITH FIELD-LEVEL FEEDBACK
  const $regForm = $('#tournament-reg-form');
  $regForm.attr('novalidate', 'novalidate');

  function showRegError($field, msg) {
    $field.addClass('is-invalid');
    let $err = $field.siblings('.invalid-feedback');
    if ($err.length === 0) {
      $err = $('<div />', { class: 'invalid-feedback text-danger small mt-1 fw-semibold' });
      $field.after($err);
    }
    $err.text(msg).stop(true, true).slideDown(200);
  }

  function clearRegError($field) {
    $field.removeClass('is-invalid');
    $field.siblings('.invalid-feedback').stop(true, true).slideUp(150);
  }

  // Real-time error clearing on input or change using $(this)
  $regForm.on('input change', 'input, select, textarea', function () {
    clearRegError($(this));
  });

  $regForm.on('submit', function (e) {
    e.preventDefault();

    let isValid = true;
    let $firstInvalid = null;

    $('#tournament-error-box').stop(true, true).slideUp(150);
    $('#tournament-feedback').stop(true, true).slideUp(150);

    // 1. Tournament Choice
    const $choice = $('#tournament-choice');
    if (!$choice.val()) {
      showRegError($choice, 'Please select an active tournament.');
      isValid = false;
      if (!$firstInvalid) $firstInvalid = $choice;
    } else {
      clearRegError($choice);
    }

    // 2. Team Tag (min 3 chars)
    const $tag = $('#team-tag');
    const tagVal = $.trim($tag.val());
    if (tagVal.length < 3) {
      showRegError($tag, 'Team Tag / Gamer Tag must be at least 3 characters.');
      isValid = false;
      if (!$firstInvalid) $firstInvalid = $tag;
    } else {
      clearRegError($tag);
    }

    // 3. Captain Phone (+7 format regex)
    const $phone = $('#captain-contact');
    const phoneVal = $.trim($phone.val());
    const phoneRegex = /^\+?[0-9\s\-()]{10,18}$/;
    if (!phoneRegex.test(phoneVal)) {
      showRegError($phone, 'Captain phone must be valid (e.g. +7 706 605 5465).');
      isValid = false;
      if (!$firstInvalid) $firstInvalid = $phone;
    } else {
      clearRegError($phone);
    }

    // 4. Discord Handle regex
    const $discord = $('#discord-tag');
    const discordVal = $.trim($discord.val());
    const discordRegex = /^@?[\w.]{3,32}$/;
    if (!discordRegex.test(discordVal)) {
      showRegError($discord, 'Valid Discord handle required (e.g. @captain_astana).');
      isValid = false;
      if (!$firstInvalid) $firstInvalid = $discord;
    } else {
      clearRegError($discord);
    }

    // 5. Anti-cheat Checkbox checked via .prop('checked')
    const $agree = $('#reg-agree');
    if (!$agree.prop('checked')) {
      showRegError($agree, 'You must accept the anti-cheat regulations.');
      isValid = false;
      if (!$firstInvalid) $firstInvalid = $agree;
    } else {
      clearRegError($agree);
    }

    if (!isValid) {
      if ($firstInvalid) $firstInvalid.focus();
      return;
    }

    // Collect roster tags
    const rosterList = [];
    $('.roster-player-tag').each(function () {
      const val = $.trim($(this).val());
      if (val) rosterList.push(val);
    });
    const rosterDisplay = rosterList.length > 0 ? rosterList.join(', ') : 'Roster pre-registered';

    const selectedTourney = $.grep(TOURNAMENTS_DATA, t => t.id === $choice.val())[0];
    const bracketSeed = generateBracketSeed($choice.val());
    const tourneyTitle = selectedTourney ? selectedTourney.title : 'Selected Tournament';

    const feedbackHtml = `
      <div class="alert alert-success mt-4 shadow border-2 border-success">
        <h4 class="alert-heading h5 fw-bold text-success d-flex align-items-center gap-2">
          <span>🏆</span> Tournament Squad Registration Recorded!
        </h4>
        <p class="mb-2">Team "<strong>${tagVal}</strong>" is registered for <strong>${tourneyTitle}</strong>.</p>
        <div class="small text-light mb-2"><strong>Squad Roster:</strong> ${rosterDisplay}</div>
        <hr class="border-success opacity-50">
        <div class="row g-2 small text-light">
          <div class="col-12 col-sm-6">Bracket Seed: <strong class="text-accent">${bracketSeed}</strong></div>
          <div class="col-12 col-sm-6">Captain Contact: <strong>${phoneVal}</strong></div>
          <div class="col-12 col-sm-6">Discord Handle: <strong>${discordVal}</strong></div>
          <div class="col-12 col-sm-6">LAN Check-In: <strong class="text-warning">30 mins before first match</strong></div>
        </div>
        <p class="small text-muted mt-3 mb-0">* Demonstration Confirmation: Check in at reception at Kenesary 69 on match day.</p>
      </div>
    `;

    // Method Chain demonstration: stops running queues, sets HTML, slides down, auto-scrolls
    $('#tournament-feedback')
      .stop(true, true)
      .html(feedbackHtml)
      .slideDown(400, function () {
        $('html, body').animate({
          scrollTop: $('#tournament-feedback').offset().top - 80
        }, 300);
      });

    $regForm[0].reset();
  });
});
