import test from 'node:test';
import assert from 'node:assert/strict';
import { initRiverJourney } from '../src/scripts/river-journey.ts';

class Element extends EventTarget {
  constructor(id, dataset = {}) { super(); this.id = id; this.dataset = dataset; this.attributes = new Map(); this.hidden = true; this.textContent = ''; }
  getAttribute(key) { return this.attributes.get(key) ?? null; }
  setAttribute(key, value) { this.attributes.set(key, value); }
  removeAttribute(key) { this.attributes.delete(key); }
}

test('El visitante puede despejar y volver a cubrir las señales sin cambiar de página', () => {
  const passage = new Element('historia');
  const toggle = new Element('', { openLabel: 'Apartar los juncos', closeLabel: 'Volver a mirar' });
  const caption = new Element('', { open: 'La señal ya se ve.', closed: 'Las pistas no parecen claras.' });
  toggle.setAttribute('aria-pressed', 'false');
  globalThis.document = { querySelector: (key) => ({ '[data-passage]': passage, '[data-reeds-toggle]': toggle, '[data-signal-caption]': caption })[key] };
  initRiverJourney(); // También funciona cuando IntersectionObserver no está disponible.
  assert.equal(toggle.hidden, false);
  toggle.dispatchEvent(new Event('click'));
  assert.equal(toggle.getAttribute('aria-pressed'), 'true');
  assert.equal(passage.dataset.reedsOpen, 'true');
  assert.equal(caption.textContent, 'La señal ya se ve.');
  assert.equal(toggle.textContent, 'Volver a mirar');
  toggle.dispatchEvent(new Event('click'));
  assert.equal(toggle.getAttribute('aria-pressed'), 'false');
  assert.equal(caption.textContent, 'Las pistas no parecen claras.');
  assert.equal(toggle.textContent, 'Apartar los juncos');
  delete globalThis.document;
});

test('El paisaje y el mapa siguen las escenas al avanzar y al regresar', () => {
  const passage = new Element('historia');
  const steps = ['signals', 'small', 'listening'].map((key) => new Element('', { passageStep: key }));
  const links = ['inicio', 'historia', 'proposito', 'autora'].map((key) => new Element('', { waypoint: key }));
  const sections = links.map((link) => new Element(link.dataset.waypoint));
  const observers = [];
  globalThis.IntersectionObserver = class {
    constructor(callback) { this.callback = callback; this.targets = []; observers.push(this); }
    observe(target) { this.targets.push(target); }
  };
  globalThis.document = {
    body: { dataset: {} },
    querySelector: (key) => key === '[data-passage]' ? passage : null,
    querySelectorAll: (key) => key === '[data-passage-step]' ? steps : key === '[data-waypoint]' ? links : sections,
  };
  initRiverJourney();
  for (const index of [0, 1, 2, 1, 0]) {
    observers[0].callback([{ target: steps[index], isIntersecting: true }]);
    assert.equal(passage.dataset.phase, steps[index].dataset.passageStep);
  }
  observers[0].callback([{ target: steps[2], isIntersecting: false }]);
  assert.equal(passage.dataset.phase, 'signals');
  observers[1].callback([{ target: sections[1], isIntersecting: true }]);
  assert.equal(document.body.dataset.riverTheme, 'dark');
  assert.equal(links[1].getAttribute('aria-current'), 'location');
  observers[1].callback([{ target: sections[3], isIntersecting: true }]);
  assert.equal(document.body.dataset.riverTheme, 'light');
  assert.equal(links[1].getAttribute('aria-current'), null);
  assert.equal(links[3].getAttribute('aria-current'), 'location');
  delete globalThis.document;
  delete globalThis.IntersectionObserver;
});
