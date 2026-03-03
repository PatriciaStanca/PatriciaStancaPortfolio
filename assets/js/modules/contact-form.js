(function () {
  const app = (window.SiteApp = window.SiteApp || { initializers: [] });
  app.initializers.push(() => {
// checks contact form fields before sending.
(function () {
  const form = document.querySelector('.contact-form');
  if (!form) return;
  const fields = Array.from(form.querySelectorAll('input, textarea, select'));

  const getMessage = (field) => {
    if (field.validity.valueMissing) return 'This field is required.';
    if (field.validity.typeMismatch) return 'Please enter a valid email address.';
    if (field.validity.patternMismatch) {
      if (field.name === 'phone') return 'Please enter a valid phone number.';
      if (field.name === 'first_name' || field.name === 'last_name') return 'Please use letters only (no numbers) in the name.';
      return 'Please enter a valid value.';
    }
    if (field.validity.tooShort) return `Please enter at least ${field.minLength} characters.`;
    return 'Please enter a valid value.';
  };

  // Extra checks with Validators.
  const validateWithRegex = (field) => {
    if (!window.Validators) return true;
    const value = field.value.trim();
    if (field.name === 'first_name' || field.name === 'last_name') return window.Validators.name.test(value);
    if (field.name === 'email') return window.Validators.email.test(value);
    if (field.name === 'message') return window.Validators.minLength(10).test(value);
    return true;
  };

  const showError = (field) => {
    field.classList.add('is-invalid');
    field.setAttribute('aria-invalid', 'true');
    let error = field.parentElement.querySelector('.form-error');
    if (!error) {
      error = document.createElement('div');
      error.className = 'form-error';
      error.setAttribute('role', 'alert');
      error.setAttribute('aria-live', 'polite');
      if (field.id) error.id = `${field.id}-error`;
      field.parentElement.appendChild(error);
    }
    error.textContent = getMessage(field);
    if (error.id) field.setAttribute('aria-describedby', error.id);
  };

  const clearError = (field) => {
    field.classList.remove('is-invalid');
    field.removeAttribute('aria-invalid');
    const error = field.parentElement.querySelector('.form-error');
    if (error) error.remove();
    if (field.getAttribute('aria-describedby') === `${field.id}-error`) {
      field.removeAttribute('aria-describedby');
    }
  };

  fields.forEach((field) => {
    field.addEventListener('input', () => {
      if (field.checkValidity() && validateWithRegex(field)) clearError(field);
    });
    field.addEventListener('blur', () => {
      if (!field.checkValidity() || !validateWithRegex(field)) showError(field);
    });
  });

  form.addEventListener('submit', async (event) => {
    let firstInvalid = null;
    fields.forEach((field) => {
      if (!field.checkValidity() || !validateWithRegex(field)) {
        showError(field);
        if (!firstInvalid) firstInvalid = field;
      } else {
        clearError(field);
      }
    });
    if (firstInvalid) {
      event.preventDefault();
      firstInvalid.focus();
      return;
    }

    // Sends with fetch when Formspree is on.
    if (!form.hasAttribute('data-formspree')) return;
    event.preventDefault();
    const formData = new FormData(form);
    try {
      const res = await fetch(form.action, {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: formData,
      });
      const feedback = form.querySelector('.form-feedback');
      if (res.ok) {
        form.reset();
        if (feedback) {
          feedback.textContent = 'Thanks! Your message has been sent.';
          feedback.classList.remove('is-error');
          feedback.classList.add('is-success');
        }
      } else {
        if (feedback) {
          feedback.textContent = 'Sorry, something went wrong. Please try again.';
          feedback.classList.remove('is-success');
          feedback.classList.add('is-error');
        }
      }
    } catch (err) {
      const feedback = form.querySelector('.form-feedback');
      if (feedback) {
        feedback.textContent = 'Network error. Please try again.';
        feedback.classList.remove('is-success');
        feedback.classList.add('is-error');
      }
    }
  });
})();
  });
})();
