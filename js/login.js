/**
 * ================================================================================
 * QAZAQPEEK CYBER CLUB ASTANA — MEMBER SECURITY & AUTHENTICATION
 * File: js/login.js
 * Author: Adilet Ainadinov
 * Technology: 100% Plain JavaScript (Weeks 6–8)
 *
 * Requirements Covered:
 *   - Plain JavaScript DOM methods (createElement, appendChild, insertBefore, querySelector)
 *   - Accessible Show / Hide Password toggle buttons dynamically injected
 *   - Dynamic Confirm Password field injection
 *   - Live Regex Password Strength Checklist (8+ chars, upper, lower, digit, special)
 *   - Real-time password confirmation match verification
 *   - Client-side Session State Simulator (Sign In <-> Sign Out in Navbar)
 *   - Live Kazakhstani Phone Input Auto-Formatter (+7 (7XX) XXX-XX-XX)
 *   - Strict Data Security: Zero persistence of passwords in storage/console
 *   - Scope: One visitor, one site (100% client-side, zero backend requirement)
 * ================================================================================
 */

'use strict';

// Active simulated in-memory session (no backend / database required)
let activePlayerSession = null;

/**
 * Reusable Function: Formats raw input into Kazakhstani phone format: +7 (7XX) XXX-XX-XX
 * Called from multiple places: login phone input and registration phone input.
 * @param {string} raw
 * @returns {string}
 */
function formatKazakhstaniPhone(raw) {
  if (typeof raw !== 'string') return '';
  const digits = raw.replace(/\D/g, '');
  if (!digits) return '';

  let cleanDigits = digits;
  if (cleanDigits.startsWith('8')) {
    cleanDigits = '7' + cleanDigits.substring(1);
  } else if (!cleanDigits.startsWith('7')) {
    cleanDigits = '7' + cleanDigits;
  }

  const part1 = cleanDigits.substring(0, 1);
  const part2 = cleanDigits.substring(1, 4);
  const part3 = cleanDigits.substring(4, 7);
  const part4 = cleanDigits.substring(7, 9);
  const part5 = cleanDigits.substring(9, 11);

  let formatted = `+${part1}`;
  if (part2) formatted += ` (${part2}`;
  if (part2.length === 3) formatted += `) `;
  if (part3) formatted += `${part3}`;
  if (part4) formatted += `-${part4}`;
  if (part5) formatted += `-${part5}`;

  return formatted;
}

/**
 * Reusable Function: Adds accessible Show/Hide Password toggle button next to an input.
 * Called from multiple places: loginPassword, regPass, regPassConfirm.
 * @param {HTMLInputElement} input
 */
function addPasswordVisibilityToggle(input) {
  if (!input || !input.parentElement) return;

  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'btn btn-outline-secondary btn-sm mt-1';
  btn.textContent = '👁 Show Password';
  btn.setAttribute('aria-label', 'Toggle password visibility');

  btn.addEventListener('click', () => {
    const isPassword = input.type === 'password';
    input.type = isPassword ? 'text' : 'password';
    btn.textContent = isPassword ? '🙈 Hide Password' : '👁 Show Password';
  });

  input.parentElement.appendChild(btn);
}

/**
 * Reusable Function: Updates the top navbar with active session information.
 * Called from multiple places: login success, registration success, and sign-out.
 * @param {Object|null} session
 */
function updateSessionNavbar(session) {
  let sessionBadge = document.getElementById('navbar-player-session');
  const navContainer = document.querySelector('.navbar .container');
  if (!navContainer) return;

  if (session && session.isLoggedIn) {
    if (!sessionBadge) {
      sessionBadge = document.createElement('div');
      sessionBadge.id = 'navbar-player-session';
      sessionBadge.className = 'd-none d-lg-flex align-items-center gap-2 ms-3 py-1 px-2 rounded bg-dark border border-info small';
      const mainNavbar = document.getElementById('mainNavbar');
      if (mainNavbar) {
        mainNavbar.after(sessionBadge);
      } else {
        navContainer.appendChild(sessionBadge);
      }
    }

    sessionBadge.innerHTML = `
      <span class="text-accent fw-bold">👤 ${session.nickname}</span>
      <span class="badge bg-success text-dark">${session.balance} ₸</span>
      <button type="button" class="btn btn-outline-danger btn-sm py-0 px-2" id="btn-session-signout">Sign Out</button>
    `;

    const signoutBtn = sessionBadge.querySelector('#btn-session-signout');
    if (signoutBtn) {
      signoutBtn.addEventListener('click', () => {
        activePlayerSession = null;
        updateSessionNavbar(null);
        if (typeof displayGlobalToast === 'function') {
          displayGlobalToast('Signed Out', 'You have been signed out of the player session.', 'info');
        }
      });
    }
  } else {
    if (sessionBadge) {
      sessionBadge.remove();
    }
  }
}

// Main Page Execution on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');
  const loginPhone = document.getElementById('loginPhone');
  const loginPassword = document.getElementById('loginPassword');
  const loginFeedback = document.getElementById('login-feedback');

  const registerForm = document.getElementById('register-form');
  const regNickname = document.getElementById('regNickname');
  const regPhone = document.getElementById('regPhone');
  const regPass = document.getElementById('regPass');
  const regFeedback = document.getElementById('register-feedback');

  const phoneRegex = /^\+?[0-9\s\-()]{10,18}$/;

  // 1. Live Phone Input Auto-Formatting Listeners
  if (loginPhone) {
    loginPhone.addEventListener('input', (e) => {
      const val = e.target.value;
      if (val.replace(/\D/g, '').length >= 4) {
        loginPhone.value = formatKazakhstaniPhone(val);
      }
    });
  }

  if (regPhone) {
    regPhone.addEventListener('input', (e) => {
      const val = e.target.value;
      if (val.replace(/\D/g, '').length >= 4) {
        regPhone.value = formatKazakhstaniPhone(val);
      }
    });
  }

  // 2. Add Show/Hide Toggle to Login Password
  if (loginPassword) {
    addPasswordVisibilityToggle(loginPassword);
  }

  // 3. Dynamic Registration Fields: Confirm Password & Regex Checklist
  let regPassConfirm = null;
  const rules = [
    { id: 'rule-len', label: '8+ Characters', test: p => p.length >= 8 },
    { id: 'rule-upper', label: 'Uppercase Letter (A-Z)', test: p => /[A-Z]/.test(p) },
    { id: 'rule-lower', label: 'Lowercase Letter (a-z)', test: p => /[a-z]/.test(p) },
    { id: 'rule-num', label: 'Number (0-9)', test: p => /[0-9]/.test(p) },
    { id: 'rule-special', label: 'Special Character (!@#$...)', test: p => /[^A-Za-z0-9]/.test(p) }
  ];

  if (registerForm && regPass) {
    addPasswordVisibilityToggle(regPass);

    // Confirm password input group injected dynamically
    const confirmGroup = document.createElement('div');
    confirmGroup.className = 'mb-3';
    confirmGroup.innerHTML = `
      <label for="regPassConfirm" class="form-label fw-bold">Confirm Password:</label>
      <input type="password" id="regPassConfirm" class="form-control bg-dark text-light border-secondary" placeholder="Re-enter your password" required>
    `;
    const passParent = regPass.closest('.mb-3') || regPass.parentElement;
    passParent.after(confirmGroup);

    regPassConfirm = document.getElementById('regPassConfirm');
    addPasswordVisibilityToggle(regPassConfirm);

    // Live regex password checklist box injected dynamically
    const checklistBox = document.createElement('div');
    checklistBox.id = 'password-live-checklist';
    checklistBox.className = 'p-3 bg-dark bg-opacity-75 rounded border border-secondary mb-3 small';
    checklistBox.innerHTML = `
      <div class="fw-bold mb-2 text-accent">Password Requirements:</div>
      <ul class="list-unstyled mb-0" id="checklist-rules-list">
        ${rules.map(r => `<li id="${r.id}" class="text-muted"><span class="me-1">✕</span> ${r.label}</li>`).join('')}
        <li id="rule-match" class="text-muted"><span class="me-1">✕</span> Passwords Match</li>
      </ul>
    `;
    confirmGroup.after(checklistBox);

    // Live evaluation on typing
    function evaluatePassword() {
      const val = regPass.value;
      const confVal = regPassConfirm ? regPassConfirm.value : '';

      rules.forEach(r => {
        const passed = r.test(val);
        const li = document.getElementById(r.id);
        if (li) {
          li.className = passed ? 'text-success fw-semibold' : 'text-muted';
          li.innerHTML = `<span class="me-1">${passed ? '✓' : '✕'}</span> ${r.label}`;
        }
      });

      const matchLi = document.getElementById('rule-match');
      if (matchLi) {
        const matches = val.length > 0 && val === confVal;
        matchLi.className = matches ? 'text-success fw-semibold' : 'text-muted';
        matchLi.innerHTML = `<span class="me-1">${matches ? '✓' : '✕'}</span> Passwords Match`;
      }
    }

    regPass.addEventListener('input', evaluatePassword);
    if (regPassConfirm) regPassConfirm.addEventListener('input', evaluatePassword);
  }

  // 4. Login Form Submission Handler
  if (loginForm && loginPhone && loginPassword && loginFeedback) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const phoneOrUser = loginPhone.value.trim();

      if (phoneOrUser.length < 3) {
        loginFeedback.className = 'alert alert-danger mt-3 mb-0';
        loginFeedback.textContent = 'Please enter a valid phone number or username (min 3 chars).';
        loginFeedback.classList.remove('d-none');
        loginPhone.focus();
        return;
      }

      if (loginPassword.value.length < 4) {
        loginFeedback.className = 'alert alert-danger mt-3 mb-0';
        loginFeedback.textContent = 'Password must be at least 4 characters.';
        loginFeedback.classList.remove('d-none');
        loginPassword.focus();
        return;
      }

      // Demonstration success - passwords never stored or logged
      activePlayerSession = {
        nickname: phoneOrUser,
        balance: 1500,
        isLoggedIn: true
      };
      updateSessionNavbar(activePlayerSession);

      loginFeedback.className = 'alert alert-success mt-3 mb-0';
      loginFeedback.innerHTML = `
        <h4 class="alert-heading h6 fw-bold mb-1">✓ Welcome back, ${phoneOrUser}!</h4>
        <p class="small mb-0">Player session active &bull; Balance: <strong>1,500 ₸</strong>. (Demonstration Mode: No backend database).</p>
      `;
      loginFeedback.classList.remove('d-none');
      loginForm.reset();

      if (typeof displayGlobalToast === 'function') {
        displayGlobalToast('Session Started', `Welcome back, ${phoneOrUser}!`, 'success');
      }
    });
  }

  // 5. Registration Form Submission Handler
  if (registerForm && regNickname && regPhone && regPass && regFeedback) {
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nick = regNickname.value.trim();
      const phone = regPhone.value.trim();
      const pass = regPass.value;
      const conf = regPassConfirm ? regPassConfirm.value : '';

      if (nick.length < 3) {
        regFeedback.className = 'alert alert-danger mt-3 mb-0';
        regFeedback.textContent = 'Gamer Nickname must be at least 3 characters.';
        regFeedback.classList.remove('d-none');
        regNickname.focus();
        return;
      }

      if (!phoneRegex.test(phone)) {
        regFeedback.className = 'alert alert-danger mt-3 mb-0';
        regFeedback.textContent = 'Please enter a valid phone number (e.g. +7 706 605 5465).';
        regFeedback.classList.remove('d-none');
        regPhone.focus();
        return;
      }

      const allPassed = rules.every(r => r.test(pass));
      if (!allPassed) {
        regFeedback.className = 'alert alert-danger mt-3 mb-0';
        regFeedback.textContent = 'Please satisfy all password strength requirements in the checklist.';
        regFeedback.classList.remove('d-none');
        regPass.focus();
        return;
      }

      if (pass !== conf) {
        regFeedback.className = 'alert alert-danger mt-3 mb-0';
        regFeedback.textContent = 'Password confirmation does not match.';
        regFeedback.classList.remove('d-none');
        if (regPassConfirm) regPassConfirm.focus();
        return;
      }

      // Demonstration success - passwords never saved or transmitted
      activePlayerSession = {
        nickname: nick,
        balance: 500,
        isLoggedIn: true
      };
      updateSessionNavbar(activePlayerSession);

      regFeedback.className = 'alert alert-success mt-3 mb-0';
      regFeedback.innerHTML = `
        <h4 class="alert-heading h6 fw-bold mb-1">🎉 Account Created for "${nick}"!</h4>
        <p class="small mb-0"><strong>500 ₸</strong> introductory credit has been added to your balance. (Demonstration Mode).</p>
      `;
      regFeedback.classList.remove('d-none');
      registerForm.reset();

      // Reset checklist styles
      rules.forEach(r => {
        const li = document.getElementById(r.id);
        if (li) {
          li.className = 'text-muted';
          li.innerHTML = `<span class="me-1">✕</span> ${r.label}`;
        }
      });
      const matchLi = document.getElementById('rule-match');
      if (matchLi) {
        matchLi.className = 'text-muted';
        matchLi.innerHTML = `<span class="me-1">✕</span> Passwords Match`;
      }

      if (typeof displayGlobalToast === 'function') {
        displayGlobalToast('Account Registered', `Welcome to QazaqPeek, ${nick}! 500 ₸ bonus active.`, 'success');
      }
    });
  }
});
