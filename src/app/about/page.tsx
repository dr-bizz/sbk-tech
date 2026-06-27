'use client';

import React from 'react';
import { Container, Typography, Box, Grid } from '@mui/material';
import Watermark from '@/components/Layout/Watermark';
import Reveal from '@/components/Layout/Reveal';
import { colors } from '@/styles/theme';

const columns: string[][] = [
  [
    'Mr. Zeller earned a B.A. Degree from Miami University in Oxford, Ohio and has studied Electronic Engineering Technology at Sinclair College in Dayton, Ohio. Mr. Zeller holds both FAA Pilot and Airframe and Powerplant Mechanics (A&P) licenses.',
    'Mr. Zeller worked in sales engineering for Garrett Airesearch (now Honeywell) in the Torrance, California and Atlanta, Georgia offices from 1983 to 1987',
    'Primary responsibilities included technical support on the Gulfstream GIV certification and Lockheed C5B programs.',
  ],
  [
    'In 1987, Mr Zeller assumed the position of Sales Manager for BP Advanced Materials Division (HITCO) Insulation Products and was responsible for both the Gardena, California and Atlanta, Georgia manufacturing facilities.',
    'It was at this time that Mr. Zeller became heavily involved in manufacturing tooling and process development in an effort to improve both product quality and profit margins.',
    'HITCO was struggling to compete in an increasingly difficult marketplace. Improvements in tooling and manufacturing process and the resulting reduction in production costs made it possible to win significant new business.',
  ],
  [
    'Since 1991, Southbrook Technologies has worked closely with composite manufacturing and repair customers in Aerospace, Industrial, Marine and Sporting Goods markets throughout the Southeastern United States, assisting with efforts to improve product yield, quality and profitability.',
  ],
];

const AboutPage: React.FC = () => {
  return (
    <Box>
      <Box sx={{ position: 'relative', overflow: 'hidden', pt: { xs: '30px', md: '70px' }, pb: { xs: '50px', md: '150px' } }}>
        <Watermark />
        <Container sx={{ position: 'relative', zIndex: 1 }}>
          <Reveal delay={200}>
            <Typography variant="h1" component="h1" sx={{ fontSize: '30px', fontWeight: 300, mb: 3 }}>
              About
            </Typography>
          </Reveal>

          <Reveal delay={300} sx={{ maxWidth: 760, mb: 5 }}>
            <Typography sx={{ fontSize: '18px', lineHeight: 1.6 }}>
              Southbrook Technologies was founded by Steven D. Zeller, bringing over 40 years of
              &ldquo;hands on&rdquo; aerospace manufacturing engineering experience.
            </Typography>
          </Reveal>

          <Grid container spacing={6}>
            {columns.map((col, i) => (
              <Grid size={{ xs: 12, md: 4 }} key={i}>
                <Reveal delay={400 + i * 100} shift>
                  {col.map((p, j) => (
                    <Typography key={j} sx={{ mb: 2, fontSize: '15px', lineHeight: 1.6 }}>
                      {p}
                    </Typography>
                  ))}
                </Reveal>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Empty light-blue band matching the original layout */}
      <Box sx={{ backgroundColor: colors.lightBlue, py: '40px' }} />
    </Box>
  );
};

export default AboutPage;
