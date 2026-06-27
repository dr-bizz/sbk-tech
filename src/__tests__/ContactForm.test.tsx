import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from '@mui/material/styles';
import { SnackbarProvider } from 'notistack';
import theme from '@/styles/theme';
import ContactForm from '@/components/ContactForm/ContactForm';

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={theme}>
      <SnackbarProvider maxSnack={3}>{component}</SnackbarProvider>
    </ThemeProvider>
  );
};

describe('ContactForm Component', () => {
  it('renders all form fields', () => {
    renderWithProviders(<ContactForm />);

    expect(screen.getByLabelText(/your name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/phone number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/your message/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument();
  });

  it('shows validation errors for required fields', async () => {
    const user = userEvent.setup();
    renderWithProviders(<ContactForm />);

    await user.click(screen.getByRole('button', { name: /send message/i }));

    expect(await screen.findByText(/name is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/email is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/message (is required|must be at least)/i)).toBeInTheDocument();
  });

  it('validates email format', async () => {
    const user = userEvent.setup();
    renderWithProviders(<ContactForm />);

    await user.type(screen.getByLabelText(/email address/i), 'invalid-email');
    await user.tab();

    expect(await screen.findByText(/invalid email address/i)).toBeInTheDocument();
  });

  it('validates phone number format', async () => {
    const user = userEvent.setup();
    renderWithProviders(<ContactForm />);

    await user.type(screen.getByLabelText(/phone number/i), '123');
    await user.tab();

    expect(await screen.findByText(/invalid phone number/i)).toBeInTheDocument();
  });

  it('submits form with valid data', async () => {
    const user = userEvent.setup();
    renderWithProviders(<ContactForm />);

    await user.type(screen.getByLabelText(/your name/i), 'John Doe');
    await user.type(screen.getByLabelText(/email address/i), 'john@example.com');
    await user.type(screen.getByLabelText(/phone number/i), '(770) 403-0914');
    await user.type(
      screen.getByLabelText(/your message/i),
      'This is a test message with enough characters'
    );

    await user.click(screen.getByRole('button', { name: /send message/i }));

    await waitFor(() => {
      expect(screen.getByText(/sending/i)).toBeInTheDocument();
    });
  });
});
