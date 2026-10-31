/**
 * QazaqPeek Cyber Club Astana - Member Security & Auth
 * Author: Adilet Ainadinov
 */

'use strict';

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

  // Helper: append accessible Show/Hide Password toggle button
  function addToggle(input) {
    if (!input || !input.parentElement) return;
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'btn btn-outline-secondary btn-sm mt-1';
    btn.textContent = '👁 Show';
    btn.addEventListener('click', () => {
      const isPass = input.type === 'password';
      input.type = isPass ? 'text' : 'password';
      btn.textContent = isPass ? '🙈 Hide' : '👁 Show';
    });
    input.parentElement.appendChild(btn);
  }

  if (loginPassword) addToggle(loginPassword);

  // Registration Dynamic Elements: Confirm Password & Regex Checklist
  let regPassConfirm = null;
  const rules = [
    { id: 'rule-len', label: '8+ Characters', test: p => p.length >= 8 },
    { id: 'rule-upper', label: 'Uppercase Letter (A-Z)', test: p => /[A-Z]/.test(p) },
    { id: 'rule-lower', label: 'Lowercase Letter (a-z)', test: p => /[a-z]/.test(p) },
    { id: 'rule-num', label: 'Number (0-9)', test: p => /[0-9]/.test(p) },
    { id: 'rule-special', label: 'Special Character (!@#$...)', test: p => /[^A-Za-z0-9]/.test(p) }
  ];

  if (registerForm && regPass) {
    addToggle(regPass);

    // Confirm password field
    const confirmGroup = document.createElement('div');
    confirmGroup.className = 'mb-3';
    confirmGroup.innerHTML = `
      <label for="regPassConfirm" class="form-label fw-bold">Confirm Password:</label>
      <input type="password" id="regPassConfirm" class="form-control bg-dark text-light border-secondary" placeholder="Re-enter your password" required>
    `;
    const passParent = regPass.closest('.mb-3') || regPass.parentElement;
    passParent.after(confirmGroup);

    regPassConfirm = document.getElementById('regPassConfirm');
    addToggle(regPassConfirm);

    // Live regex checklist box
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

  // Login Form Submission
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

      // Demonstration success - zero persistence of password
      loginFeedback.className = 'alert alert-success mt-3 mb-0';
      loginFeedback.textContent = `Welcome back, ${phoneOrUser}! Session active (Demonstration Mode: No backend database).`;
      loginFeedback.classList.remove('d-none');
      loginForm.reset();
    });
  }

  // Registration Form Submission
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

      // Demonstration success - passwords never saved or logged
      regFeedback.className = 'alert alert-success mt-3 mb-0';
      regFeedback.textContent = `Account created for "${nick}"! 500 ₸ welcome bonus credited (Demonstration Mode).`;
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
    });
  }
  // Auth Tab Switcher (Log In <-> Register)
  const tabLoginBtn = document.getElementById('tab-login-btn');
  const tabRegisterBtn = document.getElementById('tab-register-btn');
  const loginPane = document.getElementById('auth-login-pane');
  const registerPane = document.getElementById('auth-register-pane');
  const switchToRegister = document.getElementById('switch-to-register');
  const switchToLogin = document.getElementById('switch-to-login');

  function showLogin() {
    if (loginPane && registerPane) {
      loginPane.classList.remove('d-none');
      registerPane.classList.add('d-none');
    }
    if (tabLoginBtn && tabRegisterBtn) {
      tabLoginBtn.classList.add('active', 'text-accent');
      tabLoginBtn.classList.remove('text-light');
      tabRegisterBtn.classList.remove('active', 'text-accent');
      tabRegisterBtn.classList.add('text-light');
    }
  }

  function showRegister() {
    if (loginPane && registerPane) {
      registerPane.classList.remove('d-none');
      loginPane.classList.add('d-none');
    }
    if (tabLoginBtn && tabRegisterBtn) {
      tabRegisterBtn.classList.add('active', 'text-accent');
      tabRegisterBtn.classList.remove('text-light');
      tabLoginBtn.classList.remove('active', 'text-accent');
      tabLoginBtn.classList.add('text-light');
    }
  }

  if (tabLoginBtn) tabLoginBtn.addEventListener('click', showLogin);
  if (tabRegisterBtn) tabRegisterBtn.addEventListener('click', showRegister);
  if (switchToRegister) {
    switchToRegister.addEventListener('click', (e) => {
      e.preventDefault();
      showRegister();
    });
  }
  if (switchToLogin) {
    switchToLogin.addEventListener('click', (e) => {
      e.preventDefault();
      showLogin();
    });
  }

  if (window.location.hash === '#register') {
    showRegister();
  }
});
