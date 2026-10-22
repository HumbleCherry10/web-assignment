/**
 * ================================================================================
 * QAZAQPEEK CYBER CLUB ASTANA — SHARED SITE-WIDE SCRIPTS
 * File: js/main.js
 * Authors: Dias Tursynbay & Adilet Ainadinov
 * Purpose: Global navigation highlighting, 24/7 Astana venue status,
 *          floating back-to-top behavior, and shared toast notifications.
 * ================================================================================
 */

'use strict';

/**
 * 1. REUSABLE UTILITY FUNCTIONS
 */

/**
 * Format an integer or float amount into Kazakhstani Tenge display string.
 * @param {number} amount - Monetary amount in KZT
 * @returns {string} Formatted currency string, e.g. "2,400 ₸"
 */
function formatKZT(amount) {
  if (typeof amount !== 'number' || isNaN(amount) || amount < 0) {
    return '0 ₸';
  }
  return amount.toLocaleString('ru-KZ') + ' ₸';
}

/**
 * Sanitize and trim a user-provided string to prevent whitespace issues.
 * @param {string} input - Raw text input
 * @returns {string} Trimmed text string
 */
function sanitizeString(input) {
  if (typeof input !== 'string') {
    return '';
  }
  return input.trim();
}

/**
 * Compute the current time in Astana (UTC+5) and operating status.
 * QazaqPeek Cyber Club operates 24/7.
 * @returns {{ timeString: string, isOpen: boolean, statusText: string }}
 */
function getAstanaClubStatus() {
  const now = new Date();
  // Format current time in Asia/Almaty (Astana timezone UTC+5)
  const timeFormatter = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Almaty',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });

  const timeString = timeFormatter.format(now);
  // Club is open 24 hours every day
  const isOpen = true;
  const statusText = `Open 24/7 • Astana Venue Time: ${timeString}`;

  return { timeString, isOpen, statusText };
}

/**
 * Render a non-intrusive accessible feedback toast or message container.
 * Calls sanitizeString() internally.
 * @param {string} title - Heading of the notice
 * @param {string} message - Feedback message
 * @param {'success'|'info'|'warning'|'error'} [type='info'] - State variant
 */
function displayGlobalToast(title, message, type = 'info') {
  const cleanTitle = sanitizeString(title);
  const cleanMessage = sanitizeString(message);

  let toastContainer = document.getElementById('qp-global-toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'qp-global-toast-container';
    toastContainer.className = 'position-fixed bottom-0 end-0 p-3';
    toastContainer.style.zIndex = '1080';
    document.body.appendChild(toastContainer);
  }

  const toastCard = document.createElement('div');
  toastCard.className = `alert alert-${type === 'error' ? 'danger' : type} alert-dismissible fade show shadow-lg mb-2`;
  toastCard.setAttribute('role', 'alert');

  const titleEl = document.createElement('strong');
  titleEl.className = 'd-block mb-1';
  titleEl.textContent = cleanTitle;

  const msgEl = document.createElement('span');
  msgEl.textContent = cleanMessage;

  const closeBtn = document.createElement('button');
  closeBtn.type = 'button';
  closeBtn.className = 'btn-close';
  closeBtn.setAttribute('aria-label', 'Close');
  closeBtn.addEventListener('click', () => {
    toastCard.remove();
  });

  toastCard.appendChild(titleEl);
  toastCard.appendChild(msgEl);
  toastCard.appendChild(closeBtn);
  toastContainer.appendChild(toastCard);

  // Auto-remove after 4.5 seconds
  setTimeout(() => {
    if (toastCard.parentElement) {
      toastCard.classList.remove('show');
      setTimeout(() => toastCard.remove(), 250);
    }
  }, 4500);
}

/**
 * 2. INITIALIZATION ROUTINES
 */

/**
 * Synchronize the active state on top navigation links based on current pathname.
 */
function syncActiveNavigation() {
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
  if (!navLinks || navLinks.length === 0) return;

  const currentPath = window.location.pathname.toLowerCase();
  const currentFile = currentPath.substring(currentPath.lastIndexOf('/') + 1) || 'index.html';

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;
    const linkFile = href.substring(href.lastIndexOf('/') + 1);

    if (linkFile === currentFile || (currentFile === '' && linkFile === 'index.html')) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    } else {
      link.classList.remove('active');
      link.removeAttribute('aria-current');
    }
  });
}

/**
 * Display club operating hours status badge in the navbar or top banner.
 */
function renderAstanaStatusBadge() {
  const statusInfo = getAstanaClubStatus();
  const brandEl = document.querySelector('.navbar .navbar-brand');

  if (brandEl && !document.getElementById('club-live-status')) {
    const statusBadge = document.createElement('span');
    statusBadge.id = 'club-live-status';
    statusBadge.className = 'badge bg-success bg-opacity-25 text-success border border-success ms-2 small d-none d-lg-inline-block';
    statusBadge.textContent = `● ${statusInfo.statusText}`;
    brandEl.parentNode.insertBefore(statusBadge, brandEl.nextSibling);
  }
}

/**
 * Initialize smooth scroll behavior on back-to-top floating button.
 */
function setupBackToTop() {
  const backToTopBtn = document.querySelector('.back-to-top-btn');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTopBtn.classList.remove('hidden', 'd-none');
    } else {
      backToTopBtn.classList.add('hidden');
    }
  });

  backToTopBtn.addEventListener('click', (event) => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// Global DOM Content Loaded Listener
document.addEventListener('DOMContentLoaded', () => {
  syncActiveNavigation();
  renderAstanaStatusBadge();
  setupBackToTop();
});
