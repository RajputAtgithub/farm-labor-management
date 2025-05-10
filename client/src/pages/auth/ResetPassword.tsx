import React from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { LockReset as LockResetIcon } from '@mui/icons-material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useParams } from 'react-router-dom';

const ResetPassword = () => {
  const { token } = useParams<{ token: string }>();

  const initialValues = {
    password: '',
    confirmPassword: ''
  };

  const validationSchema = Yup.object().shape({
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), undefined], 'Passwords must match')
      .required('Confirm password is required')
  });

  const handleSubmit = (values: typeof initialValues) => {
    console.log({ ...values, token });
    // Handle reset password logic here
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
        <LockResetIcon sx={{ fontSize: 50, mb: 2, color: 'primary.main' }} />
        <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
          Reset Password
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
                name="password"
                label="New Password"
                type="password"
                id="password"
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
              />
              <Field
                as={TextField}
                variant="outlined"
                margin="normal"
                fullWidth
                name="confirmPassword"
                label="Confirm New Password"
                type="password"
                id="confirmPassword"
                error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                helperText={touched.confirmPassword && errors.confirmPassword}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 3, mb: 2 }}
              >
                Reset Password
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default ResetPassword;