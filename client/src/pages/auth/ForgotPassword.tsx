import React from 'react';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import { Email as EmailIcon } from '@mui/icons-material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Link as RouterLink } from 'react-router-dom';

const ForgotPassword = () => {
  const initialValues = {
    email: ''
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required')
  });

  const handleSubmit = (values: typeof initialValues) => {
    console.log(values);
    // Handle forgot password logic here
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        p: 3
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          maxWidth: 400,
          width: '100%'
        }}
      >
        <EmailIcon sx={{ fontSize: 50, mb: 2, color: 'primary.main' }} />
        <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
          Forgot Password
        </Typography>
        <Typography variant="body2" sx={{ mb: 3, textAlign: 'center' }}>
          Enter your email address and we'll send you a link to reset your password.
        </Typography>
        
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form style={{ width: '100%' }}>
              <Field
                as={TextField}
                variant="outlined"
                margin="normal"
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 3, mb: 2 }}
              >
                Send Reset Link
              </Button>
              <Grid container spacing={1} justifyContent="flex-end">
                <Grid >
                    <RouterLink to="/login" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <Typography variant="body2">
                            Remember your password? Sign in
                        </Typography>
                    </RouterLink>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default ForgotPassword;