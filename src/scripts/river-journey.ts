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

  const phases = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting && passage) {
        passage.dataset.phase = (entry.target as HTMLElement).dataset.passageStep ?? 'signals';
      }
    }
  }, { rootMargin: '-40% 0px -30% 0px', threshold: 0 });
  document.querySelectorAll('[data-passage-step]').forEach((step) => phases.observe(step));

  const links = document.querySelectorAll<HTMLAnchorElement>('[data-waypoint]');
  const shores = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      const id = entry.target.id;
      document.body.dataset.riverTheme = ['historia', 'proposito'].includes(id) ? 'dark' : 'light';
      links.forEach((link) => {
        if (link.dataset.waypoint === id) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    }
  }, { rootMargin: '-40% 0px -40% 0px', threshold: 0 });
  document.querySelectorAll('[data-river-section], [data-passage]').forEach((section) => shores.observe(section));
}
