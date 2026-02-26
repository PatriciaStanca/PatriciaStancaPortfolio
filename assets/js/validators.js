// These are shared validation rules for form fields.
window.Validators = {
  name: /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/,
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  minLength: (len) => new RegExp(`^.{${len},}$`),
};
