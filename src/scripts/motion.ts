import { initTitleMotion } from './title-motion';
import { initRiverJourney } from './river-journey';

/** El movimiento se activa por defecto y respeta la preferencia del sistema. */
export function initMotion() {
  const titleMotion = initTitleMotion();
  initRiverJourney();
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');

  function update() {
    const active = !reduced.matches;
    document.documentElement.dataset.motion = active ? 'on' : 'off';
    titleMotion.setEnabled(active);
  }

  reduced.addEventListener('change', update);
  update();
}
