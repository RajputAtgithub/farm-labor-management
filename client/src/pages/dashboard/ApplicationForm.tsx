import React, { useState } from 'react';
import { 
  Box, 
  Button, 
  Card, 
  CardContent, 
  Grid, 
  TextField, 
  Typography 
} from '@mui/material';
import { 
  LocationOn as LocationIcon,
  People as PeopleIcon,
  Schedule as ScheduleIcon,
  AttachMoney as MoneyIcon,
  Description as DescriptionIcon
} from '@mui/icons-material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const ApplicationForm = () => {
  const initialValues = {
    address: '',
    laborerNeeded: '',
    duration: '',
    paymentPerLaborer: '',
    description: ''
  };

  const validationSchema = Yup.object().shape({
    address: Yup.string().required('Address is required'),
    laborerNeeded: Yup.number().min(1, 'At least 1 laborer required').required('Number of laborers is required'),
    duration: Yup.string().required('Duration is required'),
    paymentPerLaborer: Yup.number().min(1, 'Payment must be at least $1').required('Payment is required'),
    description: Yup.string().required('Description is required')
  });

  const handleSubmit = (values: typeof initialValues) => {
    console.log(values);
    // Handle form submission logic here
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Create New Job Application
      </Typography>

      <Card>
        <CardContent>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched }) => (
              <Form>
                <Grid container spacing={3}>
                  <Grid size={{xs:12}}>
                    <Field
                      as={TextField}
                      fullWidth
                      variant="outlined"
                      id="address"
                      name="address"
                      label="Work Location Address"
                      error={touched.address && Boolean(errors.address)}
                      helperText={touched.address && errors.address}
                      InputProps={{
                        startAdornment: <LocationIcon color="action" sx={{ mr: 1 }} />,
                      }}
                    />
                  </Grid>

                  <Grid size={{xs:12, sm:6}}>
                    <Field
                      as={TextField}
                      fullWidth
                      variant="outlined"
                      id="laborerNeeded"
                      name="laborerNeeded"
                      label="Number of Laborers Needed"
                      type="number"
                      error={touched.laborerNeeded && Boolean(errors.laborerNeeded)}
                      helperText={touched.laborerNeeded && errors.laborerNeeded}
                      InputProps={{
                        startAdornment: <PeopleIcon color="action" sx={{ mr: 1 }} />,
                      }}
                    />
                  </Grid>

                  <Grid size={{xs:12, sm:6}}>
                    <Field
                      as={TextField}
                      fullWidth
                      variant="outlined"
                      id="duration"
                      name="duration"
                      label="Duration (e.g., 2 weeks)"
                      error={touched.duration && Boolean(errors.duration)}
                      helperText={touched.duration && errors.duration}
                      InputProps={{
                        startAdornment: <ScheduleIcon color="action" sx={{ mr: 1 }} />,
                      }}
                    />
                  </Grid>

                  <Grid size={{xs:12}}>
                    <Field
                      as={TextField}
                      fullWidth
                      variant="outlined"
                      id="paymentPerLaborer"
                      name="paymentPerLaborer"
                      label="Payment Per Laborer ($)"
                      type="number"
                      error={touched.paymentPerLaborer && Boolean(errors.paymentPerLaborer)}
                      helperText={touched.paymentPerLaborer && errors.paymentPerLaborer}
                      InputProps={{
                        startAdornment: <MoneyIcon color="action" sx={{ mr: 1 }} />,
                      }}
                    />
                  </Grid>

                  <Grid size={{xs:12}}>
                    <Field
                      as={TextField}
                      fullWidth
                      variant="outlined"
                      id="description"
                      name="description"
                      label="Job Description"
                      multiline
                      rows={4}
                      error={touched.description && Boolean(errors.description)}
                      helperText={touched.description && errors.description}
                      InputProps={{
                        startAdornment: <DescriptionIcon color="action" sx={{ mr: 1, alignSelf: 'flex-start' }} />,
                      }}
                    />
                  </Grid>

                  <Grid size={{xs:12}}>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                      <Button variant="outlined" sx={{ mr: 2 }}>
                        Cancel
                      </Button>
                      <Button type="submit" variant="contained" color="primary">
                        Post Application
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ApplicationForm;