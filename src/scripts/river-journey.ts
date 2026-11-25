/** Observación de escenas, sin interceptar rueda, teclado ni gestos de scroll. */
export function initRiverJourney() {
  const passage = document.querySelector<HTMLElement>('[data-passage]');
  const toggle = document.querySelector<HTMLButtonElement>('[data-reeds-toggle]');
  const caption = document.querySelector<HTMLElement>('[data-signal-caption]');

  if (passage && toggle && caption) {
    toggle.hidden = false;
    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-pressed') !== 'true';
      passage.dataset.reedsOpen = String(open);
      toggle.setAttribute('aria-pressed', String(open));
      toggle.textContent = (open ? toggle.dataset.closeLabel : toggle.dataset.openLabel) ?? '';
      caption.textContent = (open ? caption.dataset.open : caption.dataset.closed) ?? '';
    });
  }

  if (typeof IntersectionObserver === 'undefined') return;

  // Resolver una sola escena por entrega del observador, incluso al saltar varias orillas.
  function observeCurrent(selector: string, rootMargin: string, update: (element: HTMLElement) => void) {
    const visible = new Set<HTMLElement>();
    let current: HTMLElement | undefined;
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        const element = entry.target as HTMLElement;
        if (entry.isIntersecting) visible.add(element);
        else visible.delete(element);
      }
      const middle = window.innerHeight / 2;
      let nearest: HTMLElement | undefined;
      let distance = Infinity;
      for (const element of visible) {
        const rect = element.getBoundingClientRect();
        const nextDistance = Math.abs((rect.top + rect.bottom) / 2 - middle);
        if (nextDistance < distance) { nearest = element; distance = nextDistance; }
      }
      if (nearest && nearest !== current) {
        current = nearest;
        update(nearest);
      }
    }, { rootMargin, threshold: 0 });
    document.querySelectorAll<HTMLElement>(selector).forEach((element) => observer.observe(element));
  }
  observeCurrent('[data-passage-step]', '-40% 0px -30% 0px', (step) => {
    const phase = step.dataset.passageStep ?? 'signals';
    if (passage && passage.dataset.phase !== phase) passage.dataset.phase = phase;
  });

  const links = document.querySelectorAll<HTMLAnchorElement>('[data-waypoint]');
  observeCurrent('[data-river-section], [data-passage]', '-40% 0px -40% 0px', (section) => {
    const theme = ['historia', 'proposito'].includes(section.id) ? 'dark' : 'light';
    if (document.body.dataset.riverTheme !== theme) document.body.dataset.riverTheme = theme;
    links.forEach((link) => {
      if (link.dataset.waypoint === section.id) {
        if (!link.hasAttribute('aria-current')) link.setAttribute('aria-current', 'location');
      } else if (link.hasAttribute('aria-current')) link.removeAttribute('aria-current');
    });
  });

  // Preparar el movimiento un poco antes de entrar; las escenas lejanas quedan estáticas.
  const scenes = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      (entry.target as HTMLElement).dataset.sceneVisible = String(entry.isIntersecting);
    }
  }, { rootMargin: '200px 0px', threshold: 0 });
  document.querySelectorAll('.river-hero, .river-encounter, .mangrove-rest, .book-estuary')
    .forEach((section) => scenes.observe(section));
}
