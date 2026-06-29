'use client';

import React from 'react';
import { Container, Typography, Box, Grid } from '@mui/material';
import Image from 'next/image';
import ContactForm from '@/components/ContactForm/ContactForm';
import Reveal from '@/components/Layout/Reveal';
import { colors } from '@/styles/theme';

const ContactPage: React.FC = () => {
  return (
    <Box>
      {/* Google map */}
      <Box sx={{ width: '100%', height: { xs: 300, sm: 400 }, lineHeight: 0 }}>
        <iframe
          title="Southbrook Technologies location"
          src="https://maps.google.com/maps?q=110%20Celestial%20Way%20Alpharetta%20GA%2030004&t=&z=11&ie=UTF8&iwloc=&output=embed"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </Box>

      <Container sx={{ py: { xs: '30px', sm: '70px' } }}>
        <Grid container spacing={8}>
          {/* Left column — company info */}
          <Grid size={{ xs: 12, sm: 4 }}>
            <Reveal delay={200} shift>
            <Box sx={{ mb: 2 }}>
              <Image src="/images/logo.png" alt="SOUTHBROOK TECHNOLOGIES" width={80} height={74} />
            </Box>

            <Typography
              variant="h2"
              component="h2"
              sx={{ fontSize: '25px', fontWeight: 400, textTransform: 'uppercase', mb: 3, lineHeight: 1.3 }}
            >
              Southbrook Technologies
            </Typography>

            <Typography
              component="a"
              href="tel:7704030914"
              sx={{ display: 'block', color: colors.inputBorder, textDecoration: 'underline', fontSize: '14px', mb: 1 }}
            >
              (770) 403-0914
            </Typography>
            <Typography
              component="a"
              href="mailto:zeller@southbrook-tech.com"
              sx={{ display: 'block', color: colors.inputBorder, textDecoration: 'underline', fontSize: '14px', mb: 3 }}
            >
              zeller@southbrook-tech.com
            </Typography>

            <Typography sx={{ lineHeight: 1.7 }}>
              Southbrook Technologies
              <br />
              110 Celestrial Way
              <br />
              Alpharetta
              <br />
              Georgia, 30004
            </Typography>
            </Reveal>
          </Grid>

          {/* Right column — form */}
          <Grid size={{ xs: 12, sm: 8 }}>
            <Reveal delay={300} shift>
              <Typography
                variant="h3"
                component="h2"
                sx={{ fontSize: '24px', fontWeight: 300, mb: 4, lineHeight: 1.5 }}
              >
                Get in touch today to find out how we can help you.
              </Typography>
              <ContactForm />
            </Reveal>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ContactPage;
