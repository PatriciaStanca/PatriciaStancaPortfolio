document.addEventListener('DOMContentLoaded', () => {
  const root = document.querySelector('[data-hero-typewriter]');
  const output = root?.querySelector('.hero-typewriter-output');
  const phrases = root ? Array.from(root.querySelectorAll('[data-hero-phrase]'), (item) => item.textContent.trim()) : [];

  if (!root || !output || !phrases.length) return;

  root.classList.add('is-typewriter');

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    output.textContent = phrases[0];
    return;
  }

  let phraseIndex = 0;
  let characterIndex = 0;
  let deleting = false;

  const tick = () => {
    const phrase = phrases[phraseIndex];

    if (!deleting) {
      characterIndex += 1;
      output.textContent = phrase.slice(0, characterIndex);

      if (characterIndex >= phrase.length) {
        deleting = true;
        root.classList.add('is-holding');
        window.setTimeout(tick, 1800);
        return;
      }

      window.setTimeout(tick, 65);
      return;
    }

    root.classList.remove('is-holding');
    characterIndex -= 1;
    output.textContent = phrase.slice(0, characterIndex);

    if (characterIndex <= 0) {
      deleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      window.setTimeout(tick, 400);
      return;
    }

    window.setTimeout(tick, 35);
  };

  tick();
});
