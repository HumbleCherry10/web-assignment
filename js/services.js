/**
 * QazaqPeek Cyber Club Astana - Services & Tariffs Controller
 * Author: Dias Tursynbay
 */

'use strict';

// 7 Official Venue Packages
const TARIFF_PACKAGES = [
  {
    id: 'hourly',
    title: 'Standard Hourly Rate',
    category: 'flexible',
    durationHours: 1,
    standardRate: 800,
    vip1Rate: 1200,
    vip2Rate: 1500,
    schedule: '24/7 Available Anytime'
  },
  {
    id: 'pkg_2plus1',
    title: 'Package "2 + 1" (3 Hours)',
    category: 'discount',
    durationHours: 3,
    standardRate: 1600,
    vip1Rate: 2400,
    vip2Rate: 3000,
    schedule: '24/7 Any Day'
  },
  {
    id: 'pkg_3plus2',
    title: 'Package "3 + 2" (5 Hours)',
    category: 'discount',
    durationHours: 2400,
    durationHoursNum: 5,
    standardRate: 2400,
    vip1Rate: 3600,
    vip2Rate: 4500,
    schedule: '24/7 Any Day'
  },
  {
    id: 'morning',
    title: 'Morning Package (08:00 - 12:00)',
    category: 'fixed_time',
    durationHoursNum: 4,
    standardRate: 1500,
    vip1Rate: 1500,
    vip2Rate: 2000,
    schedule: 'Daily 08:00 - 12:00'
  },
  {
    id: 'day',
    title: 'Day Package (12:00 - 18:00)',
    category: 'fixed_time',
    durationHoursNum: 6,
    standardRate: 2000,
    vip1Rate: 2500,
    vip2Rate: 3500,
    schedule: 'Daily 12:00 - 18:00'
  },
  {
    id: 'night',
    title: 'Night Package (22:00 - 08:00)',
    category: 'fixed_time',
    durationHoursNum: 10,
    standardRate: 3000,
    vip1Rate: 4000,
    vip2Rate: 5000,
    schedule: 'Daily 22:00 - 08:00'
  },
  {
    id: 'bootcamp_pass',
    title: 'Squad Bootcamp All-Day Pass',
    category: 'team',
    durationHoursNum: 12,
    standardRate: 7500,
    vip1Rate: 10000,
    vip2Rate: 12000,
    schedule: 'Bookable 24h in advance'
  }
];

// Switch condition: returns hourly rate by zone
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

// Find / optimizer: calculates base cost and discovers promotional package savings
function calculateTariffOptimization(zone, hours) {
  const rate = getZoneHourlyRate(zone);
  const baseCost = hours * rate;
  let bestDeal = null;
  let maxSavings = 0;

  TARIFF_PACKAGES.forEach(pkg => {
    const pkgHours = pkg.durationHoursNum || pkg.durationHours || 1;
    if (pkg.category !== 'flexible' && hours >= pkgHours) {
      const cost = zone === 'vip1' ? pkg.vip1Rate : zone === 'vip2' ? pkg.vip2Rate : pkg.standardRate;
      if (cost < baseCost) {
        const savings = baseCost - cost;
        if (savings > maxSavings) {
          maxSavings = savings;
          bestDeal = { package: pkg, cost, savings };
        }
      }
    }
  });

  return { baseCost, bestDeal, savings: maxSavings };
}

document.addEventListener('DOMContentLoaded', () => {
  const zoneSelect = document.getElementById('calc-zone');
  const hoursInput = document.getElementById('calc-hours');
  const totalDisplay = document.getElementById('calc-total-display');
  const proceedBtn = document.getElementById('btn-proceed-booking');
  const resultBox = document.getElementById('calculator-result');

  if (!zoneSelect || !hoursInput || !totalDisplay) return;

  // Recommendation box inside result container
  let dealBox = document.getElementById('calc-recommendation-box');
  if (!dealBox && resultBox) {
    dealBox = document.createElement('div');
    dealBox.id = 'calc-recommendation-box';
    dealBox.className = 'mt-2 pt-2 border-top border-secondary text-info small';
    resultBox.appendChild(dealBox);
  }

  function updateEstimate() {
    const zone = zoneSelect.value || 'standard';
    let hours = parseInt(hoursInput.value, 10);
    if (isNaN(hours) || hours < 1) hours = 1;
    if (hours > 12) hours = 12;

    const opt = calculateTariffOptimization(zone, hours);
    const format = typeof formatKZT === 'function' ? formatKZT : n => `${n} ₸`;

    totalDisplay.textContent = format(opt.baseCost);

    if (dealBox) {
      if (opt.bestDeal) {
        dealBox.innerHTML = `
          <span class="badge bg-success text-dark p-2 fw-bold">💡 Deal: ${opt.bestDeal.package.title}</span>
          <span class="text-accent d-block mt-1">Get this package for ${format(opt.bestDeal.cost)} and save ${format(opt.bestDeal.savings)}!</span>
        `;
      } else {
        dealBox.innerHTML = `<span class="text-muted">Standard rate: ${format(getZoneHourlyRate(zone))} / hour. Pay as you go.</span>`;
      }
    }

    if (proceedBtn) {
      proceedBtn.href = `booking.html?zone=${encodeURIComponent(zone)}&hours=${hours}`;
    }
  }

  zoneSelect.addEventListener('change', updateEstimate);
  hoursInput.addEventListener('input', updateEstimate);
  updateEstimate();
});
