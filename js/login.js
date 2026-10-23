/**
 * ================================================================================
 * QAZAQPEEK CYBER CLUB ASTANA — MEMBER SECURITY PORTAL
 * File: js/login.js
 * Author: Adilet Ainadinov
 * Features:
 *   - Front-end validation for Member Login & Registration
 *   - Accessible Show / Hide Password toggle buttons dynamically injected via DOM
 *   - Live Regex Password Strength Checklist (8+ chars, upper, lower, digit, special)
 *   - Live Password Confirmation Match Verification
 *   - Strict Data Security: Zero persistence in storage/arrays/URL/console
 *   - Explicit Demonstration Disclaimers (No backend database)
 * ================================================================================
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

  // Phone input validation regex (+7 format)
  const phonePattern = /^\+?[0-9\s\-()]{10,18}$/;

  /**
   * Helper: Add accessible Show/Hide password toggle button next to an input
   * @param {HTMLInputElement} passwordInput
   */
  function addPasswordVisibilityToggle(passwordInput) {
    if (!passwordInput || !passwordInput.parentElement) return;

    // Wrap in input-group if not already wrapped
    const wrapper = passwordInput.parentElement;
    const toggleBtn = document.createElement('button');
    toggleBtn.type = 'button';
    toggleBtn.className = 'btn btn-outline-secondary btn-sm mt-1';
    toggleBtn.setAttribute('aria-label', 'Toggle password visibility');
    toggleBtn.textContent = '👁 Show Password';

    toggleBtn.addEventListener('click', () => {
      if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleBtn.textContent = '🙈 Hide Password';
      } else {
        passwordInput.type = 'password';
        toggleBtn.textContent = '👁 Show Password';
      }
    });

    wrapper.appendChild(toggleBtn);
  }

  // 1. DYNAMIC DOM INJECTION: PASSWORD CONFIRMATION & REGEX CHECKLIST
  let regPassConfirm = null;
  let checklistItems = {};

  if (registerForm && regPass) {
    // Inject Show/Hide on registration password
    addPasswordVisibilityToggle(regPass);

    // Create Password Confirmation Field
    const confirmGroup = document.createElement('div');
    confirmGroup.className = 'mb-3';

    const confirmLabel = document.createElement('label');
    confirmLabel.className = 'form-label text-light small fw-semibold';
    confirmLabel.htmlFor = 'regPassConfirm';
    confirmLabel.textContent = 'Confirm Password:';

    regPassConfirm = document.createElement('input');
    regPassConfirm.type = 'password';
    regPassConfirm.id = 'regPassConfirm';
    regPassConfirm.className = 'form-control bg-dark text-light border-secondary';
    regPassConfirm.placeholder = 'Re-enter your password';
    regPassConfirm.required = true;

    confirmGroup.appendChild(confirmLabel);
    confirmGroup.appendChild(regPassConfirm);

    // Add toggle for confirm field too
    addPasswordVisibilityToggle(regPassConfirm);

    // Insert confirm field directly after regPass parent or container
    const passParent = regPass.closest('.mb-3') || regPass.parentElement;
    passParent.parentNode.insertBefore(confirmGroup, passParent.nextSibling);

    // Create Live Regex Strength Checklist Box
    const checklistBox = document.createElement('div');
    checklistBox.id = 'password-live-checklist';
    checklistBox.className = 'p-3 bg-dark bg-opacity-75 rounded border border-secondary mb-3 small';

    const checklistTitle = document.createElement('strong');
    checklistTitle.className = 'd-block text-accent mb-2';
    checklistTitle.textContent = 'Password Security Requirements:';
    checklistBox.appendChild(checklistTitle);

    const checklistUl = document.createElement('ul');
    checklistUl.className = 'list-unstyled mb-0';

    const rules = [
      { key: 'length', text: 'At least 8 characters long', regex: /.{8,}/ },
      { key: 'upper', text: 'At least one uppercase letter (A-Z)', regex: /[A-Z]/ },
      { key: 'lower', text: 'At least one lowercase letter (a-z)', regex: /[a-z]/ },
      { key: 'digit', text: 'At least one numeric digit (0-9)', regex: /[0-9]/ },
      { key: 'special', text: 'At least one special character (!@#$%^&*)', regex: /[!@#$%^&*(),.?":{}|<>_\-]/ },
      { key: 'match', text: 'Passwords must match exactly', custom: true }
    ];

    rules.forEach(rule => {
      const li = document.createElement('li');
      li.className = 'text-muted mb-1 d-flex align-items-center';

      const iconSpan = document.createElement('span');
      iconSpan.className = 'me-2';
      iconSpan.textContent = '○';

      const textSpan = document.createElement('span');
      textSpan.textContent = rule.text;

      li.appendChild(iconSpan);
      li.appendChild(textSpan);
      checklistUl.appendChild(li);

      checklistItems[rule.key] = { li, iconSpan, textSpan, regex: rule.regex };
    });

    checklistBox.appendChild(checklistUl);
    confirmGroup.parentNode.insertBefore(checklistBox, confirmGroup.nextSibling);

    /**
     * Real-time password criteria evaluation
     */
    function evaluatePasswordSecurity() {
      const val = regPass.value;
      const confirmVal = regPassConfirm ? regPassConfirm.value : '';

      // Rule: Length
      toggleRuleState('length', val.length >= 8);
      // Rule: Uppercase
      toggleRuleState('upper', /[A-Z]/.test(val));
      // Rule: Lowercase
      toggleRuleState('lower', /[a-z]/.test(val));
      // Rule: Digit
      toggleRuleState('digit', /[0-9]/.test(val));
      // Rule: Special
      toggleRuleState('special', /[!@#$%^&*(),.?":{}|<>_\-]/.test(val));
      // Rule: Match
      const matches = val.length > 0 && val === confirmVal;
      toggleRuleState('match', matches);
    }

    function toggleRuleState(key, isPassing) {
      const item = checklistItems[key];
      if (!item) return;

      if (isPassing) {
        item.li.className = 'text-success mb-1 d-flex align-items-center fw-semibold';
        item.iconSpan.textContent = '✓';
      } else {
        item.li.className = 'text-muted mb-1 d-flex align-items-center';
        item.iconSpan.textContent = '○';
      }
    }

    regPass.addEventListener('input', evaluatePasswordSecurity);
    if (regPassConfirm) {
      regPassConfirm.addEventListener('input', evaluatePasswordSecurity);
    }
  }

  // Inject Show/Hide on Login password
  if (loginPassword) {
    addPasswordVisibilityToggle(loginPassword);
  }

  // 2. MEMBER LOGIN VALIDATION
  if (loginForm && loginPhone && loginPassword) {
    loginForm.noValidate = true;

    loginForm.addEventListener('submit', (event) => {
      event.preventDefault();

      if (loginFeedback) {
        loginFeedback.classList.add('d-none');
        loginFeedback.innerHTML = '';
      }

      const phoneVal = loginPhone.value.trim();
      const passVal = loginPassword.value;

      let firstInvalid = null;

      if (!phonePattern.test(phoneVal)) {
        loginPhone.classList.add('is-invalid');
        firstInvalid = loginPhone;
      } else {
        loginPhone.classList.remove('is-invalid');
      }

      if (passVal.length < 6) {
        loginPassword.classList.add('is-invalid');
        if (!firstInvalid) firstInvalid = loginPassword;
      } else {
        loginPassword.classList.remove('is-invalid');
      }

      if (firstInvalid) {
        firstInvalid.focus();
        if (loginFeedback) {
          loginFeedback.className = 'alert alert-danger mt-3 mb-0';
          loginFeedback.textContent = 'Please provide a valid Kazakh phone number and password.';
          loginFeedback.classList.remove('d-none');
        }
        return;
      }

      // Demonstration feedback (Strict security: password is never persisted or printed)
      if (loginFeedback) {
        loginFeedback.className = 'alert alert-info mt-3 mb-0';
        loginFeedback.innerHTML = `
          <strong>Demonstration Login Mode:</strong> Front-end format validation passed for phone <code>${phoneVal}</code>.<br>
          <small class="text-muted">No external server or database is connected. No user credentials have been stored.</small>
        `;
        loginFeedback.classList.remove('d-none');
      }

      loginForm.reset();
    });
  }

  // 3. MEMBER REGISTRATION VALIDATION
  if (registerForm && regNickname && regPhone && regPass) {
    registerForm.noValidate = true;

    registerForm.addEventListener('submit', (event) => {
      event.preventDefault();

      if (regFeedback) {
        regFeedback.classList.add('d-none');
        regFeedback.innerHTML = '';
      }

      const nickVal = regNickname.value.trim();
      const phoneVal = regPhone.value.trim();
      const passVal = regPass.value;
      const confirmVal = regPassConfirm ? regPassConfirm.value : '';

      const errors = [];
      let firstInvalid = null;

      // Field 1: Nickname (trimmed, min 3 chars)
      if (nickVal.length < 3) {
        errors.push('Gamer Tag / Nickname must be at least 3 characters.');
        regNickname.classList.add('is-invalid');
        if (!firstInvalid) firstInvalid = regNickname;
      } else {
        regNickname.classList.remove('is-invalid');
      }

      // Field 2: Phone number (+7 format)
      if (!phonePattern.test(phoneVal)) {
        errors.push('Phone number must be valid (+7 7XX XXX XX XX).');
        regPhone.classList.add('is-invalid');
        if (!firstInvalid) firstInvalid = regPhone;
      } else {
        regPhone.classList.remove('is-invalid');
      }

      // Field 3: Regex criteria checks
      const hasLength = passVal.length >= 8;
      const hasUpper = /[A-Z]/.test(passVal);
      const hasLower = /[a-z]/.test(passVal);
      const hasDigit = /[0-9]/.test(passVal);
      const hasSpecial = /[!@#$%^&*(),.?":{}|<>_\-]/.test(passVal);

      if (!hasLength || !hasUpper || !hasLower || !hasDigit || !hasSpecial) {
        errors.push('Password does not satisfy all required security criteria.');
        regPass.classList.add('is-invalid');
        if (!firstInvalid) firstInvalid = regPass;
      } else {
        regPass.classList.remove('is-invalid');
      }

      // Field 4: Confirmation match check
      if (passVal !== confirmVal) {
        errors.push('Passwords do not match.');
        if (regPassConfirm) {
          regPassConfirm.classList.add('is-invalid');
          if (!firstInvalid) firstInvalid = regPassConfirm;
        }
      } else if (regPassConfirm) {
        regPassConfirm.classList.remove('is-invalid');
      }

      if (errors.length > 0) {
        if (regFeedback) {
          regFeedback.className = 'alert alert-danger mt-3 mb-0';
          const errorList = document.createElement('ul');
          errorList.className = 'mb-0 ps-3';
          errors.forEach(err => {
            const li = document.createElement('li');
            li.textContent = err;
            errorList.appendChild(li);
          });
          regFeedback.appendChild(errorList);
          regFeedback.classList.remove('d-none');
        }
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      // Success Demonstration Feedback
      if (regFeedback) {
        regFeedback.className = 'alert alert-success mt-3 mb-0';
        regFeedback.innerHTML = `
          <strong>Demonstration Registration Passed!</strong><br>
          Gamer Tag <strong>${nickVal}</strong> format and credentials validated successfully.<br>
          <small class="text-muted">* In accordance with assignment instructions, no account was created and no password was stored in memory or storage.</small>
        `;
        regFeedback.classList.remove('d-none');
      }

      registerForm.reset();
      // Reset checklist styles
      if (typeof evaluatePasswordSecurity === 'function') {
        evaluatePasswordSecurity();
      }
    });
  }
});
