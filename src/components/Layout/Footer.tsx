'use client';

import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import { colors } from '@/styles/theme';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box component="footer" sx={{ backgroundColor: colors.dark, color: colors.white }}>
      <Container>
        <Box sx={{ py: 2 }}>
          <Typography sx={{ color: colors.white, fontSize: '14px' }}>
            © SouthBrook Technologies, {currentYear}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
