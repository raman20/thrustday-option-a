/* shared tiny motion helpers for options: horizontal only */
(() => {
  const SHOT = /shot=1/.test(location.search), R = matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.querySelectorAll('[data-marquee]').forEach(m => {
    const t = m.firstElementChild; t.innerHTML += t.innerHTML;
    const dir = +(m.dataset.marquee || -1), sp = +(m.dataset.speed || .6);
    let x = 0, half = 0; const ms = () => half = t.scrollWidth / 2; ms(); addEventListener('resize', ms); document.fonts && document.fonts.ready.then(ms);
    if (SHOT || R) { t.style.transform = `translateX(${-60}px)`; return; }
    let v = 0, ly = scrollY; addEventListener('wheel', e => v += Math.abs(e.deltaY) * .05, { passive: true });
    (function f() { v *= .92; x += (sp + v) ; if (half) x %= half; t.style.transform = `translate3d(${dir < 0 ? -x : x - half}px,0,0)`; requestAnimationFrame(f); })();
  });
  const ins = document.querySelectorAll('.in');
  if (SHOT || R) ins.forEach(e => e.classList.add('on'));
  else requestAnimationFrame(() => requestAnimationFrame(() => ins.forEach(e => e.classList.add('on'))));
})();
