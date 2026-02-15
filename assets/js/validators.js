// Simple regex library for form validation (vanilla JS)
window.Validators = {
  name: /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/,
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  minLength: (len) => new RegExp(`^.{${len},}$`),
};
