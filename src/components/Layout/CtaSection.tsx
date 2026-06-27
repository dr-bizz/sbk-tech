'use client';

import React from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import Link from 'next/link';
import Watermark from './Watermark';
import Reveal from './Reveal';
import { colors } from '@/styles/theme';

interface CtaSectionProps {
  heading: React.ReactNode;
  buttonLabel: string;
  href?: string;
  body?: React.ReactNode;
}

/** Dark-grey call-to-action band used at the bottom of most pages. */
const CtaSection: React.FC<CtaSectionProps> = ({
  heading,
  buttonLabel,
  href = '/contact',
  body,
}) => {
  return (
    <Box
      className="cta background--dark-grey"
      sx={{
        position: 'relative',
        backgroundColor: colors.dark,
        color: colors.white,
        py: { xs: '80px', md: '130px' },
        overflow: 'hidden',
        textAlign: 'center',
      }}
    >
      <Watermark />
      <Container sx={{ position: 'relative', zIndex: 1 }}>
        <Reveal delay={200} shift>
          <Typography
            variant="h3"
            component="h2"
            sx={{
              fontSize: '29px',
              fontWeight: 200,
              color: colors.white,
              mb: body ? 3 : 4,
              maxWidth: 760,
              mx: 'auto',
              lineHeight: 1.5,
            }}
          >
            {heading}
          </Typography>
          {body && (
            <Typography sx={{ color: colors.white, maxWidth: 760, mx: 'auto', mb: 4 }}>
              {body}
            </Typography>
          )}
          <Button
            component={Link}
            href={href}
            variant="outlined"
            sx={{
              color: colors.white,
              borderColor: colors.white,
              '&:hover': { borderColor: colors.white, backgroundColor: colors.white, color: colors.dark },
            }}
          >
            {buttonLabel}
          </Button>
        </Reveal>
      </Container>
    </Box>
  );
};

export default CtaSection;
