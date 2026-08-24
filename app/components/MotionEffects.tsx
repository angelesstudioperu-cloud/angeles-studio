'use client';

import { useLayoutEffect } from 'react';

export function MotionEffects() {
  useLayoutEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const sections = Array.from(document.querySelectorAll<HTMLElement>('main > section:not(.hero), main > footer'));
    const blocks = sections.flatMap((section) => Array.from(section.children).filter((element): element is HTMLElement => element instanceof HTMLElement));
    const items = Array.from(document.querySelectorAll<HTMLElement>('.service-row, .mini-service-grid article, .steps article, .team-card'));

    if (reducedMotion || !('IntersectionObserver' in window)) {
      blocks.forEach((element) => element.classList.add('is-visible'));
      items.forEach((element) => element.classList.add('is-visible'));
      return;
    }

    blocks.forEach((element) => element.classList.add('reveal-block'));
    items.forEach((element, index) => {
      element.classList.add('reveal-item');
      element.style.setProperty('--reveal-delay', `${(index % 4) * 55}ms`);
    });

    [...blocks, ...items].forEach((element) => {
      if (element.getBoundingClientRect().top < window.innerHeight * 0.94) element.classList.add('is-visible');
    });
    document.documentElement.classList.add('motion-ready');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -4% 0px', threshold: 0.06 });

    [...blocks, ...items].forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return null;
}
