document.documentElement.classList.add('js');

const cards = [...document.querySelectorAll('.feature-card')];
const showcase = document.querySelector('.feature-showcase');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (cards.length && showcase) {
  let activeIndex = 0;
  let timer;
  let paused = false;

  const progress = document.createElement('div');
  progress.className = 'feature-progress';
  progress.setAttribute('aria-label', 'Feature slideshow controls');

  const dots = cards.map((card, index) => {
    card.tabIndex = 0;
    card.style.setProperty('--reveal-delay', `${index * 55}ms`);
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'feature-dot';
    dot.setAttribute('aria-label', `Show feature ${index + 1}: ${card.querySelector('h3')?.textContent ?? ''}`);
    dot.addEventListener('click', () => {
      activeIndex = index;
      updateSpotlight();
      restart();
    });
    progress.append(dot);
    return dot;
  });

  showcase.append(progress);

  const updateSpotlight = () => {
    cards.forEach((card, index) => card.classList.toggle('is-featured', index === activeIndex));
    dots.forEach((dot, index) => {
      dot.classList.toggle('is-active', index === activeIndex);
      dot.setAttribute('aria-current', index === activeIndex ? 'true' : 'false');
    });
  };

  const advance = () => {
    if (!paused) {
      activeIndex = (activeIndex + 1) % cards.length;
      updateSpotlight();
    }
  };

  const restart = () => {
    window.clearInterval(timer);
    if (!reduceMotion) timer = window.setInterval(advance, 2400);
  };

  showcase.addEventListener('mouseenter', () => { paused = true; });
  showcase.addEventListener('mouseleave', () => { paused = false; });
  showcase.addEventListener('focusin', () => { paused = true; });
  showcase.addEventListener('focusout', () => { paused = false; });

  const startShowcase = () => {
    cards.forEach((card) => card.classList.add('is-revealed'));
    updateSpotlight();
    restart();
  };

  if ('IntersectionObserver' in window) {
    const reveal = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        startShowcase();
        reveal.disconnect();
      }
    }, { threshold: 0.14 });
    reveal.observe(showcase);
  } else {
    startShowcase();
  }
}
