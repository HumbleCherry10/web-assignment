/**
 * ================================================================================
 * QAZAQPEEK CYBER CLUB ASTANA — SERVICES & TARIFFS CONTROLLER
 * File: js/services.js
 * Author: Dias Tursynbay
 * Features:
 *   - Comprehensive Tariff & Package Data Array (6+ official venue packages)
 *   - Interactive Session Cost & Savings Optimizer
 *   - Package Recommendation Engine (Compares hourly vs package rates)
 *   - Tariff Filter & Search Controls with Dynamic Result Count
 *   - Deep-linking parameters to Booking Reservation page
 * ================================================================================
 */

'use strict';

/**
 * 1. OFFICIAL VENUE TARIFF DATA ARRAY
 * Array of 7 packages with pricing across Standard, VIP 1, and VIP 2 zones.
 */
const TARIFF_PACKAGES = [
  {
    id: 'hourly',
    title: 'Standard Hourly Rate',
    category: 'flexible',
    durationHours: 1,
    standardRate: 800,
    vip1Rate: 1200,
    vip2Rate: 1500,
    schedule: '24/7 Available Anytime',
    perks: 'Play at your own pace, pay upon leaving'
  },
  {
    id: 'pkg_2plus1',
    title: 'Package "2 + 1" (3 Hours)',
    category: 'discount',
    durationHours: 3,
    standardRate: 1600,
    vip1Rate: 2400,
    vip2Rate: 3000,
    schedule: '24/7 Any Day',
    perks: 'Buy 2 hours and get 1 bonus hour free (Save up to 1,500 ₸)'
  },
  {
    id: 'pkg_3plus2',
    title: 'Package "3 + 2" (5 Hours)',
    category: 'discount',
    durationHours: 5,
    standardRate: 2400,
    vip1Rate: 3600,
    vip2Rate: 4500,
    schedule: '24/7 Any Day',
    perks: 'Buy 3 hours and get 2 bonus hours free (Save up to 3,000 ₸)'
  },
  {
    id: 'morning',
    title: 'Morning Package (08:00 - 12:00)',
    category: 'fixed_time',
    durationHours: 4,
    standardRate: 1500,
    vip1Rate: 1500,
    vip2Rate: 2000,
    schedule: 'Daily from 08:00 to 12:00',
    perks: 'Low latency morning queue, optimal solo training hours'
  },
  {
    id: 'day',
    title: 'Day Package (12:00 - 18:00)',
    category: 'fixed_time',
    durationHours: 6,
    standardRate: 2000,
    vip1Rate: 2500,
    vip2Rate: 3500,
    schedule: 'Daily from 12:00 to 18:00',
    perks: 'Afternoon grind package, popular for students'
  },
  {
    id: 'night',
    title: 'Night Package (22:00 - 08:00)',
    category: 'fixed_time',
    durationHours: 10,
    standardRate: 3000,
    vip1Rate: 4000,
    vip2Rate: 5000,
    schedule: 'Daily from 22:00 to 08:00',
    perks: '10-hour LAN marathon, free chilled water, quiet arena vibe'
  },
  {
    id: 'bootcamp_pass',
    title: 'Squad Bootcamp All-Day Pass',
    category: 'team',
    durationHours: 12,
    standardRate: 7500,
    vip1Rate: 10000,
    vip2Rate: 12000,
    schedule: 'Bookable 24 hours in advance',
    perks: 'Dedicated 5-rig row in VIP 2, tactical whiteboard, personal power outlets'
  }
];

/**
 * 2. REUSABLE FUNCTIONS WITH PARAMETERS & RETURN VALUES
 */

/**
 * Get hourly rate for a specific zone tier.
 * @param {'standard'|'vip1'|'vip2'} zone - Zone identifier
 * @returns {number} Rate in KZT per hour
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
 * Calculate standard hourly cost and find the best promotional package recommendation.
 * @param {'standard'|'vip1'|'vip2'} zone - Zone tier
 * @param {number} hours - Session length in hours (1 - 12)
 * @returns {{ baseCost: number, bestDeal: Object|null, savings: number }}
 */
function calculateTariffOptimization(zone, hours) {
  const hourlyRate = getZoneHourlyRate(zone);
  const baseCost = hours * hourlyRate;
  let bestDeal = null;
  let maxSavings = 0;

  TARIFF_PACKAGES.forEach(pkg => {
    // Only check applicable packages based on hours requested
    if (pkg.category !== 'flexible') {
      const pkgCost = zone === 'vip1' ? pkg.vip1Rate : zone === 'vip2' ? pkg.vip2Rate : pkg.standardRate;
      
      // If requested hours fit within or match package duration
      if (hours >= pkg.durationHours && pkgCost < baseCost) {
        const potentialSavings = baseCost - pkgCost;
        if (potentialSavings > maxSavings) {
          maxSavings = potentialSavings;
          bestDeal = {
            package: pkg,
            cost: pkgCost,
            savings: potentialSavings
          };
        }
      }
    }
  });

  return { baseCost, bestDeal, savings: maxSavings };
}

/**
 * Format currency using global formatKZT or fallback.
 * @param {number} amount
 * @returns {string}
 */
function displayCurrency(amount) {
  if (typeof formatKZT === 'function') {
    return formatKZT(amount);
  }
  return `${amount.toLocaleString('ru-KZ')} ₸`;
}

/**
 * 3. DOM INTERACTION & EVENT LISTENERS
 */

document.addEventListener('DOMContentLoaded', () => {
  const calculatorForm = document.getElementById('calculator-form');
  const zoneSelect = document.getElementById('calc-zone');
  const hoursInput = document.getElementById('calc-hours');
  const totalDisplay = document.getElementById('calc-total-display');
  const proceedBtn = document.getElementById('btn-proceed-booking');
  const calcResultBox = document.getElementById('calculator-result');

  if (!calculatorForm || !zoneSelect || !hoursInput || !totalDisplay) return;

  // Create Recommendation Output Container
  let recommendationBox = document.getElementById('calc-recommendation-box');
  if (!recommendationBox && calcResultBox) {
    recommendationBox = document.createElement('div');
    recommendationBox.id = 'calc-recommendation-box';
    recommendationBox.className = 'mt-2 pt-2 border-top border-secondary text-info small';
    calcResultBox.appendChild(recommendationBox);
  }

  /**
   * Recalculate price and update DOM display
   */
  function updateSessionEstimate() {
    const zone = zoneSelect.value || 'standard';
    let hours = parseInt(hoursInput.value, 10);

    // Validate bounds
    if (isNaN(hours) || hours < 1) hours = 1;
    if (hours > 12) hours = 12;

    const result = calculateTariffOptimization(zone, hours);

    // Update main total display
    totalDisplay.textContent = displayCurrency(result.baseCost);

    // Display smart package savings recommendation
    if (recommendationBox) {
      if (result.bestDeal) {
        recommendationBox.innerHTML = '';
        const recText = document.createElement('span');
        recText.className = 'badge bg-success text-dark p-2 me-1 fw-bold';
        recText.textContent = `💡 Smart Deal: ${result.bestDeal.package.title}`;

        const savingsText = document.createElement('span');
        savingsText.className = 'text-accent d-block mt-1';
        savingsText.textContent = `Choose package for ${displayCurrency(result.bestDeal.cost)} and save ${displayCurrency(result.savings)}!`;

        recommendationBox.appendChild(recText);
        recommendationBox.appendChild(savingsText);
      } else {
        recommendationBox.innerHTML = '';
        const standardInfo = document.createElement('span');
        standardInfo.className = 'text-muted';
        standardInfo.textContent = `Standard hourly billing at ${displayCurrency(getZoneHourlyRate(zone))} / hour. No advance prepayment required.`;
        recommendationBox.appendChild(standardInfo);
      }
    }

    // Sync proceed to booking button href with pre-filled query parameters
    if (proceedBtn) {
      proceedBtn.href = `booking.html?zone=${encodeURIComponent(zone)}&hours=${hours}`;
    }
  }

  // Event Listeners for Real-Time Calculation
  zoneSelect.addEventListener('change', updateSessionEstimate);
  hoursInput.addEventListener('input', updateSessionEstimate);

  calculatorForm.addEventListener('reset', () => {
    setTimeout(updateSessionEstimate, 10);
  });

  // Initial calculation run
  updateSessionEstimate();
});
