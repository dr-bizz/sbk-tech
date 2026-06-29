'use client';

import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';
import CtaSection from '@/components/Layout/CtaSection';
import Watermark from '@/components/Layout/Watermark';
import Reveal from '@/components/Layout/Reveal';
import { colors } from '@/styles/theme';

interface Row {
  title: string;
  paras: string[];
  image: string;
  alt: string;
}

// Rows alternate: light-blue rows have the image on the LEFT, white rows on the RIGHT.
const rows: Row[] = [
  {
    title: 'Evaluating resin infusion flow media.',
    paras: ['The yellow media retains more resin than the red.'],
    image: '/images/consultancy-1.jpg',
    alt: 'Evaluating resin infusion flow media',
  },
  {
    title: 'Building High Temp Guitar Mold',
    paras: [
      'High temp carbon epoxy acoustic guitar mold being laid up on CNC machined aluminum master model. Waiting for the surface coat to “tack”, prior to lamination.',
    ],
    image: '/images/CompositeAcoustics.jpg',
    alt: 'Building High Temp Guitar Mold',
  },
  {
    title: 'No job is too small',
    paras: [
      'No job is too small for composite tooling and sometimes an oven, press or autoclave is not even needed. Shown here are a set of bladder molding tools. The part is laid up on an elastomeric bladder and the tool is assembled around the bladder. When the bladder is pressurized with compressed air, the laminate is tightly consolidated. Great parts can be cured with wet resin at room temperature, or with pre-preg materials in an oven.',
    ],
    image: '/images/consultancy-2.jpg',
    alt: 'Bladder molding tools',
  },
  {
    title: 'Another high-temp antenna mold',
    paras: ['This one is for a parabolic reflector.'],
    image: '/images/image2.jpg',
    alt: 'Another high-temp antenna mold for a parabolic reflector',
  },
  {
    title:
      'Urethane tooling board is often marketed for high temp applications',
    paras: [
      'Urethane tooling board is often marketed for high temp applications. It can become unstable at temperatures above about 200F. This 400F test sample has bowed 0.040” in the middle.',
    ],
    image: '/images/image5.jpg',
    alt: 'Urethane tooling board test sample',
  },
  {
    title: 'Tooling board materials are great for low temp master models',
    paras: [
      'Tooling board materials are great for low temp (<200F) master models, as long as you glue them up properly. Every gap in the glue line between boards is a potential vacuum leak.',
    ],
    image: '/images/image3.jpg',
    alt: 'Tooling board master model',
  },
  {
    title: 'Any geometry can be successfully infused',
    paras: [
      'Any geometry can be successfully infused, as long as you can pull at least 26” of leak free vacuum and the master model is dimensionally stable. This master was 3D printed.',
    ],
    image: '/images/image8.jpg',
    alt: 'Complex geometry infusion',
  },
  {
    title: 'Carbon fibre bow mold and limbs',
    paras: [
      'An R&D manager at one of the major archery companies once told me that you could not build bow limbs out of carbon fiber, due to its extreme stiffness. Using a dropped ply schedule of 3K unidirectional carbon fiber tape and 3K plain weave fabric, these bow limbs were autoclave cured at 45PSI. 50 pound draw weight and 200 FPS arrow velocity.',
    ],
    image: '/images/image4.jpg',
    alt: 'Carbon fibre bow mold and limbs',
  },
];

const ContentRow: React.FC<{ row: Row; imageLeft: boolean }> = ({
  row,
  imageLeft,
}) => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: { xs: 'column', sm: imageLeft ? 'row' : 'row-reverse' },
      alignItems: 'center',
      gap: { xs: 3, sm: 6 },
    }}
  >
    <Reveal
      delay={300}
      shift
      sx={{ width: { xs: '100%', sm: '50%' }, maxWidth: 600 }}
    >
      <Image
        src={row.image}
        alt={row.alt}
        width={600}
        height={450}
        style={{ width: '100%', height: 'auto', borderRadius: 8 }}
      />
    </Reveal>
    <Reveal delay={500} shift sx={{ width: { xs: '100%', sm: '50%' } }}>
      <Typography
        variant="h3"
        component="h3"
        sx={{ fontSize: '18px', fontWeight: 600, mb: 1.5, lineHeight: 1.5 }}
      >
        {row.title}
      </Typography>
      {row.paras.map((p, i) => (
        <Typography key={i} sx={{ mb: 1.5 }}>
          {p}
        </Typography>
      ))}
    </Reveal>
  </Box>
);

const ConsultancyPage: React.FC = () => {
  return (
    <Box>
      {/* Page header / intro */}
      <Box
        className="page-watermark"
        sx={{
          position: 'relative',
          overflow: 'hidden',
          pt: { xs: '30px', sm: '70px' },
          pb: { xs: '50px', sm: '100px' },
        }}
      >
        <Watermark
          words={[
            { text: 'Consu-', count: 3 },
            { text: 'ltancy', count: 4 },
          ]}
        />
        <Container sx={{ position: 'relative', zIndex: 1 }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row-reverse' },
              alignItems: 'center',
              gap: { xs: 3, sm: 6 },
            }}
          >
            <Reveal
              delay={100}
              shift
              sx={{ width: { xs: '100%', sm: '50%' }, maxWidth: 600 }}
            >
              <Image
                src="/images/consultancy-main.jpg"
                alt="Embraer EMB145 radome and repair mold"
                width={600}
                height={451}
                style={{ width: '100%', height: 'auto', borderRadius: 8 }}
                priority
              />
            </Reveal>
            <Reveal delay={200} sx={{ width: { xs: '100%', sm: '50%' } }}>
              <Typography
                variant="h1"
                component="h1"
                sx={{ fontSize: '30px', fontWeight: 500, mb: 2 }}
              >
                Consultancy
              </Typography>
              <Typography
                variant="h3"
                component="h2"
                sx={{
                  fontSize: '18px',
                  fontWeight: 600,
                  mb: 2,
                  lineHeight: 1.5,
                }}
              >
                Composite Tooling And Manufacturing Process Consulting
              </Typography>
              <Typography sx={{ mb: 1.5 }}>
                We have represented a lot of composite material and process
                equipment manufacturers over the past 30+ years and we have seen
                what works (and what doesn’t work). In the process of marketing
                and selling their products, some manufacturers can be
                “optimistic”. The last thing any company wants to do is commit
                their precious capital budget to a “beta test” technology.
              </Typography>
              <Typography sx={{ mb: 1.5 }}>
                The following scan shows an Embraer EMB145 radome and repair
                mold.
              </Typography>
              <Typography sx={{ mb: 1.5 }}>
                This job required that we first visit with the customer and
                examine the part (radome) that they were trying to repair.
                Southbrook Technologies personnel later returned and spent
                several days training customer composite technicians how to
                plan, set-up and build the required radome repair mold.
                Economics are such that a good bond repair mold will often pay
                for itself with the first repair part.
              </Typography>
            </Reveal>
          </Box>
        </Container>
      </Box>

      {/* Alternating content rows */}
      {rows.map((row, i) => {
        const imageLeft = i % 2 === 0; // light-blue rows (even) → image left
        return (
          <Box
            key={row.title}
            sx={{
              backgroundColor: imageLeft ? colors.lightBlue : colors.white,
              py: { xs: '30px', sm: '70px' },
            }}
          >
            <Container>
              <ContentRow row={row} imageLeft={imageLeft} />
            </Container>
          </Box>
        );
      })}

      {/* Pricing / important text */}
      <Box
        sx={{
          backgroundColor: colors.lightBlue,
          py: { xs: '30px', sm: '70px' },
        }}
      >
        <Container>
          <Reveal
            delay={200}
            shift
            sx={{ textAlign: 'center', maxWidth: 760, mx: 'auto' }}
          >
            <Typography sx={{ fontSize: '18px', mb: 3, lineHeight: 1.6 }}>
              Cost to our customers for consulting services is $85.00 per hour,
              plus actual travel and material expenses. We provide written
              estimates and detailed billing, along with receipt documentation.
            </Typography>
            <Button component={Link} href="/contact" variant="contained">
              Get in Touch
            </Button>
          </Reveal>
        </Container>
      </Box>

      {/* CTA */}
      <CtaSection
        heading="Need help with improving Tooling and Processes?"
        buttonLabel="Speak to a Consultant"
      />
    </Box>
  );
};

export default ConsultancyPage;
