/**
 * QazaqPeek Cyber Club Astana - Tournaments & Events
 * Author: Dias Tursynbay
 * Rewritten with jQuery 3.7.1 for Assignment 6
 */

'use strict';

// 6 Esports LAN Tournaments at Kenesary 69
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
    cardId: 'card-event-cs2'
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
    cardId: 'card-event-dota'
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
    cardId: 'card-event-fc24'
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
    cardId: 'card-event-valorant'
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
    cardId: 'card-event-pubg'
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
    cardId: 'card-event-apex'
  }
];

function formatKZT(amount) {
  if (typeof amount !== 'number' || isNaN(amount) || amount < 0) return '0 ₸';
  return amount.toLocaleString('ru-KZ') + ' ₸';
}

function generateBracketSeed(gameSlug) {
  const num = Math.floor(100 + Math.random() * 900);
  const prefix = gameSlug ? gameSlug.substring(0, 3).toUpperCase() : 'LAN';
  return `QP-${prefix}-${num}`;
}

// jQuery 3.7.1: $(document).ready ensures HTML structure is loaded before scripts bind listeners
$(document).ready(function () {
  const $cardContainer = $('#events-card-container');
  if ($cardContainer.length === 0) return;

  // REWRITTEN FEATURE 1: Search Bar & Result Counter
  // Replaced ~30 lines of createElement with jQuery $('<div/>') and .before().
  // Result is concise and easy to read.
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

  // REWRITTEN FEATURE 2: Dynamic Tournament Cards
  // Replaced ~80 lines of manual DOM loops with jQuery $.grep, $.each, and .append().
  // Clearer because cards are built declaratively with safe .text() methods.
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
              '<button type="button" class="btn btn-outline-info btn-sm mt-2" id="btn-reset-events">Show All Events</button>' +
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
        ? `<button type="button" class="btn btn-info btn-sm w-100 fw-bold text-dark register-squad-btn" data-tourney-id="${item.id}">Register Squad / Player</button>`
        : `<button type="button" class="btn btn-outline-secondary btn-sm w-100" disabled>Tournament Concluded</button>`;

      $card.html(`
        <div>
          <div class="d-flex justify-content-between align-items-center mb-2">
            <span class="small text-muted fw-bold text-uppercase">${item.game}</span>
            <span class="badge ${item.badgeClass} fw-bold">${item.statusLabel}</span>
          </div>
          <h3 class="h5 card-title fw-bold text-accent mb-2">${item.title}</h3>
          <ul class="list-unstyled small text-light mb-3">
            <li>📅 Date: ${item.date} at ${item.time}</li>
            <li>🏆 Prize Pool: ${formatKZT(item.prizePool)}</li>
            <li class="text-muted">⚙️ ${item.format}</li>
          </ul>
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

  // Delegated event handler: handles dynamically created tournament registration buttons
  // Direct binding would not attach to cards rendered after search/filter operations
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

  // Method Chain: switches active styling on clicked filter button and resets siblings
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

  // REWRITTEN FEATURE 3: 5-Man Squad Form Validation
  // Replaced manual error alerts with jQuery .addClass('is-invalid') and .slideDown(400, callback).
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

  $regForm.on('input change', 'input, select, textarea', function () {
    clearRegError($(this));
  });

  $regForm.on('submit', function (e) {
    // preventDefault halts default browser page refresh, keeping user roster data intact
    e.preventDefault();

    // Client validation provides immediate feedback, but server validation is essential for actual security
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

    const selectedTourney = $.grep(TOURNAMENTS_DATA, t => t.id === $choice.val())[0];
    const bracketSeed = generateBracketSeed($choice.val());
    const tourneyTitle = selectedTourney ? selectedTourney.title : 'Selected Tournament';

    const feedbackHtml = `
      <div class="alert alert-success mt-4 shadow border-2 border-success">
        <h4 class="alert-heading h5 fw-bold text-success d-flex align-items-center gap-2">
          <span>🏆</span> Tournament Squad Registration Recorded!
        </h4>
        <p class="mb-2">Team "<strong>${tagVal}</strong>" is registered for <strong>${tourneyTitle}</strong>.</p>
        <hr class="border-success opacity-50">
        <div class="row g-2 small text-light">
          <div class="col-12 col-sm-6">Bracket Seed: <strong class="text-accent">${bracketSeed}</strong></div>
          <div class="col-12 col-sm-6">Captain Contact: <strong>${phoneVal}</strong></div>
          <div class="col-12 col-sm-6">Discord Handle: <strong>${discordVal}</strong></div>
          <div class="col-12 col-sm-6">LAN Check-In: <strong class="text-warning">30 mins before first match</strong></div>
        </div>
        <p class="small text-muted mt-3 mb-0">* Demonstration Confirmation: Check in at reception before match schedule.</p>
      </div>
    `;

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
