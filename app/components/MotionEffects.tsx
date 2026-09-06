'use client';

import { useEffect, useLayoutEffect } from 'react';

export function MotionEffects() {
  useLayoutEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const sections = Array.from(document.querySelectorAll<HTMLElement>('main > section:not(.hero), main > footer'));
    const blocks = sections.flatMap((section) =>
      Array.from(section.children).filter(
        // Los adornos decorativos ya traen su propia transformación: revelarlos se la borraría.
        (element): element is HTMLElement => element instanceof HTMLElement && element.dataset.reveal !== 'off',
      ),
    );
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

  // Con enrutado de cliente el navegador no siempre salta al ancla (#manos, #mirada…):
  // lo hacemos nosotras una vez que el layout ya está resuelto.
  useEffect(() => {
    if (!window.location.hash) return;
    const target = document.getElementById(decodeURIComponent(window.location.hash.slice(1)));
    if (!target) return;
    const frame = requestAnimationFrame(() => {
      target.scrollIntoView({ behavior: 'auto', block: 'start' });
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const menu = document.querySelector<HTMLDetailsElement>('.mobile-menu');
    if (!menu) return;
    const summary = menu.querySelector<HTMLElement>('summary');

    // The panel overlays the page, so it steps aside once it has done its job.
    const closeMenu = (event: PointerEvent) => {
      const target = event.target;
      if (!menu.open || !(target instanceof Element)) return;
      if (menu.contains(target) && !target.closest('.mobile-menu nav a')) return;
      menu.open = false;
    };

    const closeMenuWithKeyboard = (event: KeyboardEvent) => {
      if (event.key !== 'Escape' || !menu.open) return;
      menu.open = false;
      summary?.focus();
    };

    document.addEventListener('pointerdown', closeMenu);
    document.addEventListener('keydown', closeMenuWithKeyboard);
    return () => {
      document.removeEventListener('pointerdown', closeMenu);
      document.removeEventListener('keydown', closeMenuWithKeyboard);
    };
  }, []);

  return null;
}
