import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import theme from '@/styles/theme';
import Header from '@/components/Layout/Header';

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn(), pathname: '/' }),
  usePathname: () => '/',
}));

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('Header Component', () => {
  it('renders the logo linking home', () => {
    renderWithTheme(<Header />);
    expect(screen.getByAltText('SOUTHBROOK TECHNOLOGIES')).toBeInTheDocument();
  });

  it('renders navigation links on desktop', () => {
    renderWithTheme(<Header />);
    expect(screen.getByText('Consultancy')).toBeInTheDocument();
    expect(screen.getByText('Business Development')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  it('renders a mobile menu button on mobile', () => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: /max-width/.test(query),
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });

    renderWithTheme(<Header />);
    const menuButton = screen.getByRole('button', { name: /menu/i });
    expect(menuButton).toBeInTheDocument();
  });
});
