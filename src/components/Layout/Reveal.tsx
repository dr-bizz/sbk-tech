'use client';

import React from 'react';
import { Box, BoxProps } from '@mui/material';

interface RevealProps extends BoxProps {
  /** Stagger, in ms — mirrors the theme's data-fade-delay values. */
  delay?: number;
  /** Also slide up 20px while fading in (data-vertical-shift). */
  shift?: boolean;
}

/**
 * Scroll-triggered reveal, ported from the original theme's
 * [data-fade-delay] / [data-vertical-shift] behaviour: elements start hidden
 * (opacity 0, optionally shifted down 20px) and fade/slide in over 0.5s once
 * they enter the viewport, with a per-element delay for staggering.
 */
const Reveal = React.forwardRef<HTMLDivElement, RevealProps>(function Reveal(
  { delay = 0, shift = false, children, sx, ...rest },
  _ref
) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Respect users who prefer reduced motion — reveal immediately.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setShow(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShow(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Box
      ref={ref}
      sx={{
        opacity: show ? 1 : 0,
        transform: shift && !show ? 'translateY(20px)' : 'translateY(0)',
        transition: 'opacity 0.5s ease, transform 0.5s ease',
        transitionDelay: `${delay}ms`,
        ...sx,
      }}
      {...rest}
    >
      {children}
    </Box>
  );
});

export default Reveal;
