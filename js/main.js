/**
 * QazaqPeek Cyber Club Astana - Shared Scripts
 * Authors: Dias Tursynbay & Adilet Ainadinov
 */

'use strict';

// Format number to Kazakhstani Tenge (e.g. "2 400 ₸")
function formatKZT(amount) {
  if (typeof amount !== 'number' || isNaN(amount) || amount < 0) return '0 ₸';
  return amount.toLocaleString('ru-KZ') + ' ₸';
}

// Trim user text to prevent blank spaces
function sanitizeString(input) {
  return typeof input === 'string' ? input.trim() : '';
}

// Returns club operating status in Astana time (UTC+5)
function getAstanaClubStatus() {
  const now = new Date();
  const time = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Almaty',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  }).format(now);

  return {
    isOpen: true,
    timeText: `Open 24/7 • Astana Time: ${time}`
  };
}

// Show a floating toast notification
function displayGlobalToast(title, message, type = 'info') {
  let container = document.getElementById('qp-global-toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'qp-global-toast-container';
    container.className = 'position-fixed bottom-0 end-0 p-3';
    document.body.appendChild(container);
  }

  const alertType = type === 'error' ? 'danger' : type;
  const toast = document.createElement('div');
  toast.className = `alert alert-${alertType} alert-dismissible fade show shadow mb-2`;
  toast.setAttribute('role', 'alert');

  const strong = document.createElement('strong');
  strong.className = 'd-block mb-1';
  strong.textContent = sanitizeString(title);

  const span = document.createElement('span');
  span.textContent = sanitizeString(message);

  const closeBtn = document.createElement('button');
  closeBtn.type = 'button';
  closeBtn.className = 'btn-close';
  closeBtn.setAttribute('aria-label', 'Close');
  closeBtn.addEventListener('click', () => toast.remove());

  toast.appendChild(strong);
  toast.appendChild(span);
  toast.appendChild(closeBtn);
  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 200);
  }, 4000);
}

// Highlight the current page in the top navbar
function syncActiveNavigation() {
  const current = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === current || (current === '' && href === 'index.html')) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    } else {
      link.classList.remove('active');
      link.removeAttribute('aria-current');
    }
  });
}

// Function calling another: uses getAstanaClubStatus to show venue badge
function renderAstanaStatusBadge() {
  const status = getAstanaClubStatus();
  const brand = document.querySelector('.navbar .navbar-brand');
  if (brand && !document.getElementById('club-live-status')) {
    const badge = document.createElement('span');
    badge.id = 'club-live-status';
    badge.className = 'badge bg-success bg-opacity-25 text-success border border-success ms-2 small d-none d-lg-inline-block';
    badge.textContent = `● ${status.timeText}`;
    brand.after(badge);
  }
}

// Back to top smooth scrolling
function setupBackToTop() {
  const btn = document.querySelector('.back-to-top-btn');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      btn.classList.remove('hidden', 'd-none');
    } else {
      btn.classList.add('hidden');
    }
  });

  btn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  syncActiveNavigation();
  renderAstanaStatusBadge();
  setupBackToTop();
});
