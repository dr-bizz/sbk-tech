import { createTheme } from '@mui/material/styles';

// Design tokens measured from the original WordPress site (southbrook-tech.com)
export const colors = {
  text: '#3D3C40', // rgb(61, 60, 64)
  dark: '#2C2C2E', // rgb(44, 44, 46) — buttons, CTA, footer
  lightBlue: '#F5F8FD', // rgb(245, 248, 253) — alternating section bg
  watermark: '#EBF2F9', // rgb(235, 242, 249) — large faded section text
  inputBorder: '#B2BDC9', // rgb(178, 189, 201)
  white: '#ffffff',
};

// The original site simply uses the browser's generic `sans-serif` stack.
const fontFamily = 'sans-serif';

const theme = createTheme({
  palette: {
    primary: { main: colors.dark, light: '#5A5A5C', dark: '#2C2C2E' },
    secondary: { main: '#808080', light: '#A0A0A0', dark: '#606060' },
    background: { default: colors.white, paper: colors.white },
    text: { primary: colors.text, secondary: colors.text },
  },
  typography: {
    fontFamily,
    fontSize: 16,
    h1: { fontFamily, fontSize: '30px', fontWeight: 400, color: colors.text, lineHeight: 1.5 },
    h2: { fontFamily, fontSize: '26px', fontWeight: 200, color: colors.text, lineHeight: 1.5 },
    h3: { fontFamily, fontSize: '30px', fontWeight: 300, color: colors.text, lineHeight: 1.5 },
    h4: { fontFamily, fontSize: '20px', fontWeight: 500, color: colors.text, lineHeight: 1.5 },
    body1: { fontFamily, fontSize: '16px', lineHeight: 1.5, color: colors.text },
    body2: { fontFamily, fontSize: '16px', lineHeight: 1.5, color: colors.text },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: { backgroundColor: colors.white, color: colors.text },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 40,
          fontWeight: 400,
          fontSize: '14px',
          padding: '9px 20px 10px',
          lineHeight: 1.4,
          transition: 'all 0.3s ease-in-out 0s',
        },
        // Dark pill that inverts to white-on-dark-text on hover (.btn:hover).
        contained: {
          boxShadow: 'none',
          backgroundColor: colors.dark,
          color: colors.white,
          border: `2px solid ${colors.dark}`,
          '&:hover': { backgroundColor: colors.white, color: colors.dark, borderColor: colors.dark, boxShadow: 'none' },
        },
        // White-outlined pill (dark CTA) that fills white on hover.
        outlined: {
          borderWidth: 2,
          borderColor: colors.dark,
          color: colors.text,
          '&:hover': { borderWidth: 2, backgroundColor: colors.dark, color: colors.white },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: { backgroundColor: colors.white, boxShadow: 'none', borderBottom: 'none' },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          maxWidth: '1200px',
          '@media (min-width:1200px)': { maxWidth: '1200px' },
          paddingLeft: '20px',
          paddingRight: '20px',
        },
      },
    },
  },
});

export default theme;
