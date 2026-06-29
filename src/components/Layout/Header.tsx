'use client';

import React from 'react';
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  useTheme,
  useMediaQuery,
  IconButton,
  Container,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Close as CloseIcon,
  Phone as PhoneIcon,
} from '@mui/icons-material';
import Link from 'next/link';
import Image from 'next/image';
import { colors } from '@/styles/theme';

const navigationItems = [
  { label: 'Consultancy', href: '/consultancy' },
  { label: 'Business Development', href: '/business-development' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

const PHONE = '(770) 403-0914';

const Logo = ({ scrolled }: { scrolled: boolean }) => (
  <Box
    component={Link}
    href="/"
    sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}
  >
    {/* Logo shrinks 70px → 60px on scroll, mirroring the original theme. */}
    <Box sx={{ display: 'flex', width: scrolled ? 60 : 70, transition: 'width 0.3s ease' }}>
      <Image
        src="/images/logo.png"
        alt="SOUTHBROOK TECHNOLOGIES"
        width={70}
        height={65}
        priority
        style={{ width: '100%', height: 'auto' }}
      />
    </Box>
  </Box>
);

const Header: React.FC = () => {
  const theme = useTheme();
  // The original theme collapses to the mobile layout below 600px.
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [open, setOpen] = React.useState(false);

  // The original theme adds a `scrolled` class to <body> past 50px of scroll
  // and shrinks the header via CSS. Replicate that toggle here.
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AppBar
      position="sticky"
      color="default"
      elevation={0}
      sx={{ top: 0, backgroundColor: colors.white, borderBottom: '1px solid #ececec' }}
    >
      <Container>
        <Toolbar
          disableGutters
          sx={{
            minHeight: scrolled ? '60px !important' : '75px !important',
            height: scrolled ? 60 : 75,
            transition: 'min-height 0.3s ease, height 0.3s ease',
          }}
        >
          {isMobile ? (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
              }}
            >
              <IconButton
                component="a"
                href={`tel:${PHONE}`}
                aria-label="call us"
                edge="end"
                sx={{ color: colors.text, width: 48 }}
              >
                <PhoneIcon sx={{ fontSize: scrolled ? 24 : 28, transition: 'font-size 0.3s ease' }} />
              </IconButton>

              <Logo scrolled={scrolled} />

              <IconButton
                aria-label="menu"
                edge="start"
                onClick={() => setOpen(true)}
                sx={{ color: colors.text, width: 48 }}
              >
                <MenuIcon sx={{ fontSize: scrolled ? 28 : 32, transition: 'font-size 0.3s ease' }} />
              </IconButton>
            </Box>
          ) : (
            <>
              <Logo scrolled={scrolled} />
              <Box sx={{ display: 'flex', gap: 4, ml: 5 }}>
                {navigationItems.map((item) => (
                  <Button
                    key={item.href}
                    component={Link}
                    href={item.href}
                    disableRipple
                    sx={{
                      textTransform: 'none',
                      color: colors.text,
                      fontSize: '16px',
                      fontWeight: 400,
                      minWidth: 'auto',
                      p: 0,
                      borderRadius: 0,
                      position: 'relative',
                      '&:hover': { backgroundColor: 'transparent' },
                      // Animated underline that grows in from the left on hover.
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        height: '2px',
                        width: 0,
                        backgroundColor: '#000',
                        bottom: '-4px',
                        left: 0,
                        transition: 'width 0.3s ease 0s',
                      },
                      '&:hover::after': { width: '100%' },
                    }}
                  >
                    {item.label}
                  </Button>
                ))}
              </Box>
            </>
          )}
        </Toolbar>
      </Container>

      {/* Full-screen mobile menu overlay */}
      {isMobile && open && (
        <Box
          sx={{
            position: 'fixed',
            inset: 0,
            backgroundColor: colors.white,
            zIndex: 2000,
            display: 'flex',
            flexDirection: 'column',
            pt: '14px',
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', px: 1.5 }}>
            <IconButton
              aria-label="close menu"
              onClick={() => setOpen(false)}
              sx={{ color: colors.text }}
            >
              <CloseIcon sx={{ fontSize: 32 }} />
            </IconButton>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            {navigationItems.map((item) => (
              <Box
                key={item.href}
                component={Link}
                href={item.href}
                onClick={() => setOpen(false)}
                sx={{
                  fontSize: '30px',
                  color: colors.text,
                  textDecoration: 'none',
                  p: '20px',
                }}
              >
                {item.label}
              </Box>
            ))}
          </Box>
        </Box>
      )}
    </AppBar>
  );
};

export default Header;
