/**
 * ================================================================================
 * QAZAQPEEK CYBER CLUB ASTANA — SERVICES & TARIFFS CONTROLLER
 * File: js/services.js
 * Author: Dias Tursynbay
 * Technology: 100% Plain JavaScript (Weeks 6–8)
 *
 * Requirements Covered:
 *   - Real project data kept in arrays/objects at top of file
 *   - Loops building page markup dynamically
 *   - Custom functions with parameters and return values called from multiple places
 *   - Conditions for project needs (zone rates, package savings, discount thresholds)
 *   - Calculated values (hourly totals, package discounts, percentage savings)
 *   - Events & interaction attached in code (0 onclick attributes in markup)
 *   - Multiple event types: 'click', 'input', 'change', 'reset'
 *   - Deep-linking parameters to booking.html (?zone=...&hours=...&pkg=...)
 *   - Strict Data Security: Zero persistence of credentials or unvalidated inputs
 * ================================================================================
 */

'use strict';

// 7 Official Venue Packages for QazaqPeek Cyber Club at Kenesary 69
const TARIFF_PACKAGES = [
  {
    id: 'hourly',
    title: 'Standard Hourly Rate',
    category: 'flexible',
    durationHoursNum: 1,
    standardRate: 800,
    vip1Rate: 1200,
    vip2Rate: 1500,
    badge: 'Flexible',
    schedule: '24/7 Available Anytime',
    perks: 'Play as you go • Top-up via Kaspi QR'
  },
  {
    id: 'pkg_2plus1',
    title: 'Package "2 + 1" (3 Hours)',
    category: 'discount',
    durationHoursNum: 3,
    standardRate: 1600,
    vip1Rate: 2400,
    vip2Rate: 3000,
    badge: 'Popular',
    schedule: '24/7 Any Day',
    perks: '1 Hour Free • Best for casual ranked'
  },
  {
    id: 'pkg_3plus2',
    title: 'Package "3 + 2" (5 Hours)',
    category: 'discount',
    durationHoursNum: 5,
    standardRate: 2400,
    vip1Rate: 3600,
    vip2Rate: 4500,
    badge: 'Top Value',
    schedule: '24/7 Any Day',
    perks: '2 Hours Free • Ideal for tournament practice'
  },
  {
    id: 'morning',
    title: 'Morning Package (08:00 - 12:00)',
    category: 'fixed_time',
    durationHoursNum: 4,
    standardRate: 1500,
    vip1Rate: 1500,
    vip2Rate: 2000,
    badge: 'Early Bird',
    schedule: 'Daily 08:00 - 12:00',
    perks: 'Lowest rate • Equal VIP1/Standard price'
  },
  {
    id: 'day',
    title: 'Day Package (12:00 - 18:00)',
    category: 'fixed_time',
    durationHoursNum: 6,
    standardRate: 2000,
    vip1Rate: 2500,
    vip2Rate: 3500,
    badge: 'Afternoon',
    schedule: 'Daily 12:00 - 18:00',
    perks: '6 Full Hours • Uninterrupted gaming'
  },
  {
    id: 'night',
    title: 'Night Package (22:00 - 08:00)',
    category: 'fixed_time',
    durationHoursNum: 10,
    standardRate: 3000,
    vip1Rate: 4000,
    vip2Rate: 5000,
    badge: 'All-Nighter',
    schedule: 'Daily 22:00 - 08:00',
    perks: '10 Hours • Photo ID required after 22:00'
  },
  {
    id: 'bootcamp_pass',
    title: 'Squad Bootcamp All-Day Pass',
    category: 'team',
    durationHoursNum: 12,
    standardRate: 7500,
    vip1Rate: 10000,
    vip2Rate: 12000,
    badge: '5-Man Team',
    schedule: 'Bookable 24h in advance',
    perks: 'Full day station lock • Priority LAN routing'
  }
];

/**
 * Reusable Function: Returns hourly rate in KZT for a given club zone.
 * Called from multiple places: calculator, comparison matrix, preset updater.
 * @param {string} zone
 * @returns {number}
 */
function getZoneHourlyRate(zone) {
  switch (zone) {
    case 'vip1':
      return 1200;
    case 'vip2':
      return 1500;
    case 'standard':
    default:
      return 800;
  }
}

/**
 * Reusable Function: Returns the user-friendly zone display title.
 * @param {string} zone
 * @returns {string}
 */
function getZoneDisplayName(zone) {
  switch (zone) {
    case 'vip1':
      return 'VIP 1 Lounge (310Hz)';
    case 'vip2':
      return 'VIP 2 Bootcamp (360Hz)';
    case 'standard':
    default:
      return 'Standard Arena (280Hz)';
  }
}

/**
 * Reusable Calculation Function: Evaluates standard hourly billing vs best promotional package.
 * Computes baseCost, bestDeal, maxSavings, and percentage savings.
 * Called from multiple places: updateEstimate(), renderComparisonTable(), and preset selectors.
 * @param {string} zone
 * @param {number} hours
 * @returns {Object}
 */
function calculateTariffOptimization(zone, hours) {
  const safeHours = Math.max(1, Math.min(12, Math.floor(hours || 1)));
  const rate = getZoneHourlyRate(zone);
  const baseCost = safeHours * rate;
  let bestDeal = null;
  let maxSavings = 0;

  for (let i = 0; i < TARIFF_PACKAGES.length; i++) {
    const pkg = TARIFF_PACKAGES[i];
    const pkgHours = pkg.durationHoursNum || 1;

    if (pkg.category !== 'flexible' && safeHours >= pkgHours) {
      const packageCost = zone === 'vip1'
        ? pkg.vip1Rate
        : zone === 'vip2'
          ? pkg.vip2Rate
          : pkg.standardRate;

      if (packageCost < baseCost) {
        const savings = baseCost - packageCost;
        if (savings > maxSavings) {
          maxSavings = savings;
          bestDeal = {
            package: pkg,
            cost: packageCost,
            savings,
            discountPct: Math.round((savings / baseCost) * 100)
          };
        }
      }
    }
  }

  return {
    hours: safeHours,
    rate,
    baseCost,
    bestDeal,
    savings: maxSavings
  };
}

// Main Page Execution on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  const estimatorSection = document.getElementById('tariff-estimator');
  const zoneSelect = document.getElementById('calc-zone');
  const hoursInput = document.getElementById('calc-hours');
  const totalDisplay = document.getElementById('calc-total-display');
  const proceedBtn = document.getElementById('btn-proceed-booking');
  const resetBtn = document.getElementById('btn-reset-calc');
  const resultBox = document.getElementById('calculator-result');

  if (!zoneSelect || !hoursInput || !totalDisplay) return;

  const format = typeof formatKZT === 'function' ? formatKZT : n => `${n.toLocaleString('ru-KZ')} ₸`;

  // 1. Dynamic Quick Duration Preset Buttons
  const presetContainer = document.createElement('div');
  presetContainer.className = 'd-flex flex-wrap gap-2 mb-3 align-items-center';
  presetContainer.innerHTML = `
    <span class="small text-muted fw-semibold">Quick Session Presets:</span>
    <button type="button" class="btn btn-sm btn-outline-info calc-preset-btn" data-hours="3">⚡ 3h (2+1 Deal)</button>
    <button type="button" class="btn btn-sm btn-outline-info calc-preset-btn" data-hours="5">🔥 5h (3+2 Deal)</button>
    <button type="button" class="btn btn-sm btn-outline-info calc-preset-btn" data-hours="6">☀️ 6h (Day Pass)</button>
    <button type="button" class="btn btn-sm btn-outline-info calc-preset-btn" data-hours="10">🌙 10h (All-Nighter)</button>
  `;
  hoursInput.closest('.mb-3').after(presetContainer);

  // 2. Dynamic Recommendation Box inside Result Container
  let dealBox = document.getElementById('calc-recommendation-box');
  if (!dealBox && resultBox) {
    dealBox = document.createElement('div');
    dealBox.id = 'calc-recommendation-box';
    dealBox.className = 'mt-2 pt-2 border-top border-secondary text-info small';
    resultBox.appendChild(dealBox);
  }

  // 3. Dynamic Side-by-Side Savings Summary Container
  const summaryBox = document.createElement('div');
  summaryBox.id = 'calc-savings-summary';
  summaryBox.className = 'p-3 bg-dark rounded border border-secondary mb-4 shadow-sm';
  if (estimatorSection) {
    estimatorSection.appendChild(summaryBox);
  }

  function renderSavingsSummary(opt, zone) {
    const stdRate = getZoneHourlyRate('standard');
    const vip1Rate = getZoneHourlyRate('vip1');
    const vip2Rate = getZoneHourlyRate('vip2');

    summaryBox.innerHTML = `
      <div class="d-flex flex-wrap justify-content-between align-items-center mb-2 pb-2 border-bottom border-secondary">
        <h4 class="h6 fw-bold text-accent mb-0">Multi-Zone Rate Comparison for ${opt.hours} Hour(s)</h4>
        <span class="badge bg-secondary text-light">${getZoneDisplayName(zone)}</span>
      </div>
      <div class="row g-2 text-center text-sm-start small">
        <div class="col-12 col-sm-4 p-2 rounded ${zone === 'standard' ? 'border border-info bg-opacity-10 bg-info' : 'border border-secondary'}">
          <div class="fw-bold text-light">Standard Arena</div>
          <div class="text-info">${format(stdRate * opt.hours)} <small class="text-muted">(${format(stdRate)}/hr)</small></div>
        </div>
        <div class="col-12 col-sm-4 p-2 rounded ${zone === 'vip1' ? 'border border-info bg-opacity-10 bg-info' : 'border border-secondary'}">
          <div class="fw-bold text-light">VIP 1 Lounge</div>
          <div class="text-info">${format(vip1Rate * opt.hours)} <small class="text-muted">(${format(vip1Rate)}/hr)</small></div>
        </div>
        <div class="col-12 col-sm-4 p-2 rounded ${zone === 'vip2' ? 'border border-info bg-opacity-10 bg-info' : 'border border-secondary'}">
          <div class="fw-bold text-light">VIP 2 Bootcamp</div>
          <div class="text-info">${format(vip2Rate * opt.hours)} <small class="text-muted">(${format(vip2Rate)}/hr)</small></div>
        </div>
      </div>
      <p class="small text-muted mt-2 mb-0">
        * No advance deposit required at Kenesary 69. Stations held for 15 minutes past arrival time.
      </p>
    `;
  }

  function updateEstimate() {
    const zone = zoneSelect.value || 'standard';
    let hours = parseInt(hoursInput.value, 10);
    if (isNaN(hours) || hours < 1) hours = 1;
    if (hours > 12) hours = 12;

    const opt = calculateTariffOptimization(zone, hours);

    totalDisplay.textContent = format(opt.baseCost);

    if (dealBox) {
      if (opt.bestDeal) {
        dealBox.innerHTML = `
          <div class="alert alert-success bg-opacity-25 border-success text-success p-2 mb-0 mt-2">
            <strong>💡 Recommended Deal: ${opt.bestDeal.package.title}</strong>
            <div class="text-light mt-1">
              Bundle price: <strong class="text-success">${format(opt.bestDeal.cost)}</strong>
              (Saves <strong class="text-warning">${format(opt.bestDeal.savings)}</strong> • ${opt.bestDeal.discountPct}% OFF standard rate)
            </div>
          </div>
        `;
      } else {
        dealBox.innerHTML = `
          <span class="text-muted">
            Standard hourly rate applies: <strong>${format(getZoneHourlyRate(zone))} / hour</strong>. Pay at front desk upon check-in.
          </span>
        `;
      }
    }

    renderSavingsSummary(opt, zone);

    if (proceedBtn) {
      const packageParam = opt.bestDeal ? opt.bestDeal.package.id : 'hourly';
      proceedBtn.href = `booking.html?zone=${encodeURIComponent(zone)}&hours=${hours}&pkg=${encodeURIComponent(packageParam)}`;
    }
  }

  // Quick Preset Listeners
  presetContainer.querySelectorAll('.calc-preset-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const h = btn.getAttribute('data-hours');
      hoursInput.value = h;
      presetContainer.querySelectorAll('.calc-preset-btn').forEach(b => {
        b.classList.remove('btn-info', 'text-dark', 'fw-bold');
        b.classList.add('btn-outline-info');
      });
      btn.classList.remove('btn-outline-info');
      btn.classList.add('btn-info', 'text-dark', 'fw-bold');
      updateEstimate();
    });
  });

  // Input & Change Event Listeners
  zoneSelect.addEventListener('change', updateEstimate);
  hoursInput.addEventListener('input', updateEstimate);

  // Reset button handling
  if (resetBtn) {
    resetBtn.addEventListener('click', (e) => {
      e.preventDefault();
      zoneSelect.value = 'standard';
      hoursInput.value = '3';
      presetContainer.querySelectorAll('.calc-preset-btn').forEach(b => {
        b.classList.remove('btn-info', 'text-dark', 'fw-bold');
        b.classList.add('btn-outline-info');
      });
      updateEstimate();
      if (typeof displayGlobalToast === 'function') {
        displayGlobalToast('Calculator Reset', 'Reset to Standard Arena (3 Hours).', 'info');
      }
    });
  }

  // Synchronize top tariff card buttons to deep-link to booking.html with pre-selected zone
  const btnStandard = document.getElementById('btn-book-standard');
  const btnVip1 = document.getElementById('btn-book-vip');
  const btnVip2 = document.getElementById('btn-book-vip2');

  if (btnStandard) btnStandard.href = 'booking.html?zone=standard';
  if (btnVip1) btnVip1.href = 'booking.html?zone=vip1';
  if (btnVip2) btnVip2.href = 'booking.html?zone=vip2';

  // Initial calculation
  updateEstimate();
});
