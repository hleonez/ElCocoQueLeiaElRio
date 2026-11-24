/** A single, reversible wave. Never replace characters or change their layout. */
export function initTitleMotion() {
  const title = document.querySelector<HTMLElement>('[data-animated-title]');
  const available = Boolean(title && typeof title.animate === 'function');
  let enabled = false;
  let animations: Animation[] = [];

  function cancel() {
    animations.forEach((animation) => animation.cancel());
    animations = [];
  }

  function play() {
    if (!enabled || !title || animations.length) return;
    const letters = title.querySelectorAll<HTMLElement>('.animated-title__letter');
    const amplitude = window.matchMedia('(max-width: 47.999rem)').matches ? 5 : 9;
    const wave = Array.from(letters, (letter, index) => letter.animate([
      { transform: 'translateY(0) rotate(0deg)', offset: 0 },
      { transform: `translateY(-${amplitude}px) rotate(-2deg)`, offset: 0.35 },
      { transform: `translateY(${amplitude / 3}px) rotate(1deg)`, offset: 0.7 },
      { transform: 'translateY(0) rotate(0deg)', offset: 1 },
    ], {
      duration: 480,
      delay: letters.length > 1 ? index * 240 / (letters.length - 1) : 0,
      easing: 'cubic-bezier(0.22, 0.61, 0.36, 1)',
    }));
    animations = wave;
    // Handle cancellation too; rapid pointer exits never create rejected promises.
    void Promise.allSettled(wave.map((animation) => animation.finished)).then(() => {
      if (animations === wave) cancel();
    });
  }

  if (available && title) {
    title.addEventListener('pointerenter', (event) => {
      if (event.pointerType === 'mouse' && window.matchMedia('(hover: hover)').matches) play();
    });
    title.addEventListener('pointerleave', cancel);
    title.addEventListener('pointercancel', cancel);
    document.addEventListener('visibilitychange', () => { if (document.hidden) cancel(); });
  }

  return {
    available,
    setEnabled(active: boolean) {
      enabled = available && active;
      if (!enabled) cancel();
    },
  };
}
