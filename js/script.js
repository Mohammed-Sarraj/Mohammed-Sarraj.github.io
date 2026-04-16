(function () {
  'use strict';

  /* ─── Scroll Animations (Intersection Observer) ─────────── */
  const prefersReducedMotion = window.matchMedia
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

  const animEls = document.querySelectorAll('.anim');

  if (prefersReducedMotion) {
    // If the user prefers no motion, display everything immediately
    animEls.forEach(el => el.classList.add('visible'));
  } else if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    animEls.forEach(el => observer.observe(el));
  } else {
    // Fallback for older browsers
    animEls.forEach(el => el.classList.add('visible'));
  }
}());