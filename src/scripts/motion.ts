/** CSS owns the scroll timelines; JavaScript only manages the visitor's preference. */
export function initMotionControls() {
  if (!CSS.supports('animation-timeline: view()') || !CSS.supports('animation-range: contain')) return;

  const controls = document.querySelectorAll<HTMLButtonElement>('[data-motion-control]');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const storageKey = 'drilo-motion';
  let enabled = true;
  try { enabled = localStorage.getItem(storageKey) !== 'off'; } catch { /* Storage is optional. */ }

  function update() {
    const active = enabled && !reduced.matches;
    document.documentElement.dataset.motion = active ? 'on' : 'off';
    controls.forEach((button) => {
      button.hidden = false;
      button.disabled = reduced.matches;
      button.setAttribute('aria-pressed', String(active));
      const label = button.querySelector('span');
      if (label) label.textContent = (reduced.matches ? button.dataset.reduced : active ? button.dataset.disable : button.dataset.enable) ?? '';
    });
  }

  controls.forEach((button) => button.addEventListener('click', () => {
    enabled = !enabled;
    try { localStorage.setItem(storageKey, enabled ? 'on' : 'off'); } catch { /* Keep this session working. */ }
    update();
  }));
  reduced.addEventListener('change', update);
  update();
}
