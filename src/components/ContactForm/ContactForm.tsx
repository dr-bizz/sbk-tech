'use client';

import React, { useEffect, useRef, useState } from 'react';
import Script from 'next/script';
import { Box, Button, Typography, CircularProgress, InputBase } from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { colors } from '@/styles/theme';

declare global {
  interface Window {
    grecaptcha?: {
      render: (
        container: HTMLElement,
        params: {
          sitekey: string;
          callback: (token: string) => void;
          'expired-callback'?: () => void;
        }
      ) => number;
      reset: (widgetId?: number) => void;
    };
  }
}

// Set NEXT_PUBLIC_RECAPTCHA_SITE_KEY in the environment to enable reCAPTCHA.
// When unset (e.g. local dev / tests), the widget is skipped so the form still works.
const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

interface ContactFormValues {
  name: string;
  email: string;
  phone: string;
  message: string;
}

const validationSchema = Yup.object({
  name: Yup.string().min(2, 'Name must be at least 2 characters').required('Name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  phone: Yup.string().matches(
    /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
    'Invalid phone number'
  ),
  message: Yup.string().min(10, 'Message must be at least 10 characters').required('Message is required'),
});

const initialValues: ContactFormValues = { name: '', email: '', phone: '', message: '' };

const encode = (data: Record<string, string>) =>
  Object.keys(data)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
    .join('&');

const labelSx = { fontSize: '15px', fontWeight: 600, color: colors.text, mb: 0.75, display: 'block' };

const inputSx = {
  width: '100%',
  border: `1px solid ${colors.inputBorder}`,
  borderRadius: '3px',
  px: 1,
  py: 0.5,
  fontSize: '15px',
  backgroundColor: '#fff',
  '&.Mui-focused': { borderColor: colors.text },
};

const ContactForm: React.FC = () => {
  const { enqueueSnackbar } = useSnackbar();

  const recaptchaContainerRef = useRef<HTMLDivElement | null>(null);
  const recaptchaWidgetId = useRef<number | null>(null);
  const [recaptchaToken, setRecaptchaToken] = useState('');

  // Render the reCAPTCHA v2 widget once its script is available.
  const renderRecaptcha = () => {
    if (
      !RECAPTCHA_SITE_KEY ||
      !window.grecaptcha ||
      !recaptchaContainerRef.current ||
      recaptchaWidgetId.current !== null
    ) {
      return;
    }
    recaptchaWidgetId.current = window.grecaptcha.render(recaptchaContainerRef.current, {
      sitekey: RECAPTCHA_SITE_KEY,
      callback: (token) => setRecaptchaToken(token),
      'expired-callback': () => setRecaptchaToken(''),
    });
  };

  // Handles the case where the script was already loaded (cached) before mount.
  useEffect(() => {
    renderRecaptcha();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const resetRecaptcha = () => {
    setRecaptchaToken('');
    if (recaptchaWidgetId.current !== null) {
      window.grecaptcha?.reset(recaptchaWidgetId.current);
    }
  };

  const handleSubmit = async (
    values: ContactFormValues,
    { setSubmitting, resetForm }: { setSubmitting: (b: boolean) => void; resetForm: () => void }
  ) => {
    if (RECAPTCHA_SITE_KEY && !recaptchaToken) {
      enqueueSnackbar('Please confirm you are not a robot.', { variant: 'warning' });
      setSubmitting(false);
      return;
    }

    try {
      const res = await fetch('/__forms.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({
          'form-name': 'contact',
          'bot-field': '',
          'g-recaptcha-response': recaptchaToken,
          ...values,
        }),
      });
      if (!res.ok) throw new Error(`Submission failed with status ${res.status}`);
      enqueueSnackbar('Thank you for your message! We will get back to you soon.', { variant: 'success' });
      resetForm();
      resetRecaptcha();
    } catch {
      enqueueSnackbar('Failed to send message. Please try again.', { variant: 'error' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 640 }}>
      {RECAPTCHA_SITE_KEY && (
        <Script
          src="https://www.google.com/recaptcha/api.js?render=explicit"
          strategy="afterInteractive"
          onLoad={renderRecaptcha}
        />
      )}
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {({ isSubmitting, errors, touched, values, handleChange, handleBlur }) => {
          const field = (
            name: keyof ContactFormValues,
            label: string,
            opts: { required?: boolean; multiline?: boolean } = {}
          ) => (
            <Box sx={{ mb: 3 }}>
              <Typography component="label" htmlFor={name} sx={labelSx}>
                {label} {opts.required && <span>*</span>}
              </Typography>
              <InputBase
                id={name}
                name={name}
                value={values[name]}
                onChange={handleChange}
                onBlur={handleBlur}
                multiline={opts.multiline}
                minRows={opts.multiline ? 5 : undefined}
                sx={inputSx}
              />
              {touched[name] && errors[name] && (
                <Typography sx={{ color: '#c0392b', fontSize: '13px', mt: 0.5 }}>{errors[name]}</Typography>
              )}
            </Box>
          );

          return (
            <Form>
              {field('name', 'Your Name', { required: true })}
              {field('email', 'Email address', { required: true })}
              {field('phone', 'Phone Number')}
              {field('message', 'Your message', { required: true, multiline: true })}

              {RECAPTCHA_SITE_KEY && (
                <Box sx={{ mb: 3 }}>
                  <Typography component="label" sx={labelSx}>
                    reCAPTCHA <span>*</span>
                  </Typography>
                  <Box ref={recaptchaContainerRef} />
                </Box>
              )}

              <Button type="submit" variant="contained" disabled={isSubmitting} sx={{ px: 4 }}>
                {isSubmitting ? (
                  <>
                    <CircularProgress size={18} sx={{ mr: 1, color: '#fff' }} />
                    Sending...
                  </>
                ) : (
                  'Send message'
                )}
              </Button>
            </Form>
          );
        }}
      </Formik>
    </Box>
  );
};

export default ContactForm;
