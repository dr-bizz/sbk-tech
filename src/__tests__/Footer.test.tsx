import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import theme from '@/styles/theme';
import Footer from '@/components/Layout/Footer';

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('Footer Component', () => {
  it('displays the copyright with the current year', () => {
    renderWithTheme(<Footer />);
    const currentYear = new Date().getFullYear();
    expect(
      screen.getByText(new RegExp(`© SouthBrook Technologies, ${currentYear}`))
    ).toBeInTheDocument();
  });
});
