import React from 'react';
import { Box, Button, Grid, MenuItem, TextField, Typography } from '@mui/material';
import { PersonAdd as PersonAddIcon } from '@mui/icons-material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import {  Link as RouterLink } from 'react-router-dom';

const Register = () => {
  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    age: '',
    gender: '',
    mobileNo: '',
    password: '',
    confirmPassword: '',
    role: '',
    image: null
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    age: Yup.number().min(18, 'Must be at least 18 years old').required('Age is required'),
    gender: Yup.string().required('Gender is required'),
    mobileNo: Yup.string().required('Mobile number is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), undefined], 'Passwords must match')
      .required('Confirm password is required'),
    role: Yup.string().required('Role is required')
  });

  const handleSubmit = (values: typeof initialValues) => {
    console.log(values);
    // Handle registration logic here
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
          maxWidth: 500,
          width: '100%'
        }}
      >
        <PersonAddIcon sx={{ fontSize: 50, mb: 2, color: 'primary.main' }} />
        <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
          Register
        </Typography>
        
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, setFieldValue }) => (
            <Form style={{ width: '100%' }}>
              <Grid container spacing={2}>
                <Grid size={{  xs:12, sm:6}}>
                  <Field
                    as={TextField}
                    variant="outlined"
                    fullWidth
                    id="firstName"
                    label="First Name"
                    name="firstName"
                    error={touched.firstName && Boolean(errors.firstName)}
                    helperText={touched.firstName && errors.firstName}
                  />
                </Grid>
                <Grid size={{  xs:12, sm:6}}>
                  <Field
                    as={TextField}
                    variant="outlined"
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    error={touched.lastName && Boolean(errors.lastName)}
                    helperText={touched.lastName && errors.lastName}
                  />
                </Grid>
                <Grid size={{  xs:12 }}>
                  <Field
                    as={TextField}
                    variant="outlined"
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                  />
                </Grid>
                <Grid size={{  xs:12, sm:6}}>
                  <Field
                    as={TextField}
                    variant="outlined"
                    fullWidth
                    id="age"
                    label="Age"
                    name="age"
                    type="number"
                    error={touched.age && Boolean(errors.age)}
                    helperText={touched.age && errors.age}
                  />
                </Grid>
                <Grid size={{  xs:12, sm:6}}>
                  <Field
                    as={TextField}
                    variant="outlined"
                    fullWidth
                    id="gender"
                    label="Gender"
                    name="gender"
                    select
                    error={touched.gender && Boolean(errors.gender)}
                    helperText={touched.gender && errors.gender}
                  >
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                  </Field>
                </Grid>
                <Grid size={{  xs:12 }}>
                  <Field
                    as={TextField}
                    variant="outlined"
                    fullWidth
                    id="mobileNo"
                    label="Mobile Number"
                    name="mobileNo"
                    error={touched.mobileNo && Boolean(errors.mobileNo)}
                    helperText={touched.mobileNo && errors.mobileNo}
                  />
                </Grid>
                <Grid size={{  xs:12 }}>
                  <Field
                    as={TextField}
                    variant="outlined"
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    error={touched.password && Boolean(errors.password)}
                    helperText={touched.password && errors.password}
                  />
                </Grid>
                <Grid size={{  xs:12 }}>
                  <Field
                    as={TextField}
                    variant="outlined"
                    fullWidth
                    name="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    id="confirmPassword"
                    error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                    helperText={touched.confirmPassword && errors.confirmPassword}
                  />
                </Grid>
                <Grid size={{  xs:12 }}>
                  <Field
                    as={TextField}
                    variant="outlined"
                    fullWidth
                    id="role"
                    label="Role"
                    name="role"
                    select
                    error={touched.role && Boolean(errors.role)}
                    helperText={touched.role && errors.role}
                  >
                    <MenuItem value="owner">Owner</MenuItem>
                    <MenuItem value="farm_laborer">Farm Laborer</MenuItem>
                  </Field>
                </Grid>
                <Grid size={{  xs:12 }}>
                  <input
                    accept="image/*"
                    style={{ display: 'none' }}
                    id="raised-button-file"
                    type="file"
                    onChange={(event) => {
                      if (event.currentTarget.files) {
                        setFieldValue("image", event.currentTarget.files[0]);
                      }
                    }}
                  />
                  <label htmlFor="raised-button-file">
                    <Button variant="outlined" component="span" fullWidth>
                      Upload Profile Image
                    </Button>
                  </label>
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid >
                  <RouterLink to="/login" style={{ textDecoration: 'none', color: 'inherit' }}>
                    Already have an account? Sign in
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

export default Register;