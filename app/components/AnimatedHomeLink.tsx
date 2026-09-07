'use client';

import { useEffect, useRef, useState, type MouseEvent, type ReactNode } from 'react';
import { NativeLink as Link } from './NativeLink';

type AnimatedHomeLinkProps = {
  ariaLabel: string;
  children: ReactNode;
};

const FLIGHT_TIME = 500;

export function AnimatedHomeLink({ ariaLabel, children }: AnimatedHomeLinkProps) {
  const [isFlying, setIsFlying] = useState(false);
  const navigationTimer = useRef<number | null>(null);

  useEffect(() => () => {
    if (navigationTimer.current !== null) window.clearTimeout(navigationTimer.current);
  }, []);

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    const opensElsewhere = event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (opensElsewhere || reducedMotion) return;

    event.preventDefault();
    if (isFlying) return;

    setIsFlying(true);
    navigationTimer.current = window.setTimeout(() => window.location.assign('/'), FLIGHT_TIME);
  }

  return (
    <Link
      className={`brand${isFlying ? ' is-returning-home' : ''}`}
      href="/"
      aria-label={ariaLabel}
      onClick={handleClick}
    >
      {children}
    </Link>
  );
}
