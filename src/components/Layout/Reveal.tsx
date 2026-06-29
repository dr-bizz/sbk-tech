'use client';

import React from 'react';
import { Box, BoxProps } from '@mui/material';
import { keyframes } from '@mui/system';

interface RevealProps extends BoxProps {
  /** Stagger, in ms — mirrors the theme's data-fade-delay values. */
  delay?: number;
  /** Also slide up 20px while fading in (data-vertical-shift). */
  shift?: boolean;
}

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const fadeInShift = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

/**
 * On-load reveal. Every element renders visible in the server HTML (so search
 * crawlers and no-JS clients always see the content), then plays a one-time
 * fade/slide-in entrance animation on page load. Unlike the previous
 * scroll-triggered version, it never waits for the element to enter the
 * viewport — so nothing below the fold can get stuck hidden, which is better
 * for SEO. The per-element `delay` staggers the entrances, and
 * prefers-reduced-motion disables the animation entirely.
 */
const Reveal = React.forwardRef<HTMLDivElement, RevealProps>(function Reveal(
  { delay = 0, shift = false, children, sx, ...rest },
  ref
) {
  return (
    <Box
      ref={ref}
      sx={{
        animation: `${shift ? fadeInShift : fadeIn} 0.5s ease ${delay}ms both`,
        '@media (prefers-reduced-motion: reduce)': {
          animation: 'none',
        },
        ...sx,
      }}
      {...rest}
    >
      {children}
    </Box>
  );
});

export default Reveal;
