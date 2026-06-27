'use client';

import React from 'react';
import { Box, Button, Typography, CircularProgress, InputBase } from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { colors } from '@/styles/theme';

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

  const handleSubmit = async (
    values: ContactFormValues,
    { setSubmitting, resetForm }: { setSubmitting: (b: boolean) => void; resetForm: () => void }
  ) => {
    try {
      console.log('Form submitted:', values);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      enqueueSnackbar('Thank you for your message! We will get back to you soon.', { variant: 'success' });
      resetForm();
    } catch {
      enqueueSnackbar('Failed to send message. Please try again.', { variant: 'error' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 640 }}>
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

              <Box sx={{ mb: 3 }}>
                <Typography component="label" sx={labelSx}>
                  reCaptcha <span>*</span>
                </Typography>
                <Box
                  sx={{
                    width: 304,
                    maxWidth: '100%',
                    height: 78,
                    border: '1px solid #d3d3d3',
                    borderRadius: '3px',
                    display: 'flex',
                    alignItems: 'center',
                    px: 1.5,
                    gap: 1.5,
                    backgroundColor: '#f9f9f9',
                  }}
                >
                  <Box sx={{ width: 28, height: 28, border: '2px solid #c1c1c1', borderRadius: '2px' }} />
                  <Typography sx={{ fontSize: '14px', color: '#555' }}>I&apos;m not a robot</Typography>
                </Box>
              </Box>

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
