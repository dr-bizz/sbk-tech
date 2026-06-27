'use client';

import React from 'react';
import { Container, Typography, Box, Button, Grid } from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';
import CtaSection from '@/components/Layout/CtaSection';
import Reveal from '@/components/Layout/Reveal';
import { colors } from '@/styles/theme';

const reasons = [
  {
    icon: '/images/presents.svg',
    title: 'Targeted Expertise',
    body: 'Decades of hands-on experience in advanced composites, focused specifically on tooling, materials, and production processes.',
  },
  {
    icon: '/images/keep-records.svg',
    title: 'Flexible Support, Real Results',
    body: 'Get expert-level guidance and technical support without the cost and commitment of hiring a full-time employee.',
  },
  {
    icon: '/images/save-money.svg',
    title: 'A Trusted Partner in Your Workflow',
    body: 'Seamless integration with your team to improve efficiency, troubleshoot challenges, and optimize production, without adding headcount.',
  },
];

export default function Home() {
  return (
    <Box>
      {/* Hero */}
      <Container sx={{ py: { xs: 5, md: 8 } }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: { xs: 4, md: 6 },
          }}
        >
          <Reveal delay={150} sx={{ width: '100%', maxWidth: { md: 480 } }}>
            <Typography
              variant="h1"
              component="h1"
              sx={{ fontSize: '32px', fontWeight: 400, textTransform: 'uppercase', mb: 2, lineHeight: 1.5 }}
            >
              Southbrook
              <br />
              Technologies
            </Typography>
            <Typography
              variant="h2"
              component="h2"
              sx={{ fontSize: '26px', fontWeight: 200, mb: 3, lineHeight: 1.5 }}
            >
              Composite Manufacturing Tooling
              <br />
              And Materials Specialist
            </Typography>
            <Typography sx={{ mb: 3 }}>
              Southbrook Technologies specializes in production and repair tooling and processes for
              the advanced composites industry. We have been providing skilled manufacturing
              expertise and technical support to our clients since 1991. Think of us as your most
              productive employee, who isn&apos;t even an employee.
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, flexWrap: 'wrap' }}>
              <Typography
                variant="h3"
                component="h3"
                sx={{ fontSize: '26px', fontWeight: 300, lineHeight: 1.5 }}
              >
                Book an appointment today
              </Typography>
              <Button component={Link} href="/contact" variant="contained">
                Book now
              </Button>
            </Box>
          </Reveal>

          <Reveal
            delay={300}
            shift
            sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'flex-end' }, flexShrink: 0 }}
          >
            <Image
              src="/images/new-homepage.jpg"
              alt="SOUTHBROOK TECHNOLOGIES, INC."
              width={480}
              height={727}
              style={{ maxWidth: '100%', height: 'auto', borderRadius: 8 }}
              priority
            />
          </Reveal>
        </Box>
      </Container>

      {/* Why work with a composite process specialist */}
      <Box sx={{ backgroundColor: colors.lightBlue, py: { xs: '30px', md: '70px' } }}>
        <Container>
          <Reveal delay={200}>
            <Typography
              variant="h3"
              component="h2"
              sx={{ fontSize: '30px', fontWeight: 300, mb: '30px' }}
            >
              Why Work with a Composite Process Specialist:
            </Typography>
          </Reveal>

          <Grid container spacing={6}>
            {reasons.map((r, i) => (
              <Grid size={{ xs: 12, md: 4 }} key={r.title}>
                <Reveal delay={200 + i * 150} shift sx={{ textAlign: 'center' }}>
                  <Box sx={{ mb: 2, display: 'flex', justifyContent: 'center' }}>
                    <Image src={r.icon} alt={r.title} width={110} height={110} />
                  </Box>
                  <Typography variant="h4" component="h4" sx={{ fontSize: '20px', fontWeight: 500, mb: 1.5 }}>
                    {r.title}
                  </Typography>
                  <Typography>{r.body}</Typography>
                </Reveal>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Testimonial */}
      <Container sx={{ py: { xs: '30px', md: '70px' } }}>
        <Reveal delay={200} shift sx={{ textAlign: 'center', maxWidth: 820, mx: 'auto' }}>
          <Image
            src="/images/quote-marks-1.png"
            alt="reviews"
            width={54}
            height={36}
            style={{ display: 'block', margin: '0 auto 24px' }}
          />
          <Typography sx={{ fontSize: '18px', lineHeight: 1.7 }}>
            &ldquo;You were able to help us select the proper material for both the stretch die and
            holding fixture which was a huge help and when our engineering group had questions you
            were able to answer every question with detail. Then you even offered to make a trip to
            our facility to ensure that the proper bonding techniques were used, so we did not have
            the same failures we encountered with your competitors.&rdquo;
          </Typography>
        </Reveal>
      </Container>

      {/* CTA */}
      <CtaSection
        heading="Find out how Southbrook Tech can help you today."
        buttonLabel="Get in touch"
      />
    </Box>
  );
}
