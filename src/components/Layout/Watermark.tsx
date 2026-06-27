'use client';

import React from 'react';

interface Word {
  text: string;
  /** Drives the original theme's per-word negative-margin stagger. */
  count: number;
}

interface WatermarkProps {
  words?: Word[];
}

/**
 * Large faded decorative text behind page sections, ported 1:1 from the
 * original WordPress theme (.background--section--text). Styling — including
 * the staggered negative-margin offsets and per-context top offsets — lives in
 * globals.css and is keyed off the data-letter-count attribute.
 */
const Watermark: React.FC<WatermarkProps> = ({
  words = [
    { text: 'South', count: 3 },
    { text: 'Brook', count: 3 },
    { text: 'Tech', count: 2 },
  ],
}) => {
  return (
    <div className="background--section--text" aria-hidden>
      {words.map((w) => (
        <span key={w.text} data-letter-count={w.count}>
          {w.text}
        </span>
      ))}
    </div>
  );
};

export default Watermark;
