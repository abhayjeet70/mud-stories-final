import { useCallback, useEffect, useRef, useState } from 'react';

export const reducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* Shared slideshow behaviour: autoplay, arrow keys, swipe, and the rules for
   when autoplay must stop — the tab is hidden, the viewer took control, or
   reduced motion is requested. Returns handlers to spread onto the stage. */
export function useSlideshow(count, interval = 6000) {
  const [index, setIndex] = useState(0);
  const [held, setHeld] = useState(false); // viewer took control
  const touchX = useRef(null);

  const go = useCallback(
    (n) => setIndex(((n % count) + count) % count),
    [count]
  );

  // Any deliberate move stops autoplay for the rest of the visit.
  const take = useCallback(
    (n) => {
      setHeld(true);
      go(n);
    },
    [go]
  );

  useEffect(() => {
    if (held || reducedMotion() || count < 2) return;
    const id = setInterval(() => {
      if (!document.hidden) setIndex((v) => (v + 1) % count);
    }, interval);
    return () => clearInterval(id);
  }, [held, count, interval]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowLeft') take(index - 1);
      else if (e.key === 'ArrowRight') take(index + 1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [index, take]);

  const swipe = {
    onTouchStart: (e) => {
      touchX.current = e.touches[0].clientX;
    },
    onTouchEnd: (e) => {
      if (touchX.current === null) return;
      const d = e.changedTouches[0].clientX - touchX.current;
      if (Math.abs(d) > 45) take(d < 0 ? index + 1 : index - 1);
      touchX.current = null;
    },
  };

  return { index, go, take, swipe };
}

/* Pins the page to the viewport for slideshow routes. */
export function useNoScroll() {
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);
}
