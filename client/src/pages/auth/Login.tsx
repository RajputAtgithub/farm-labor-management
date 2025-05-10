import { 
    Box, 
    Button, 
    Checkbox, 
    FormControlLabel, 
    Grid,
    Link, 
    TextField, 
    Typography 
  } from '@mui/material';
  import { LockOutlined } from '@mui/icons-material';
  import { Formik, Form, Field } from 'formik';
  import * as Yup from 'yup';
  import { Link as RouterLink } from 'react-router-dom';
  
  const Login = () => {
    const initialValues = {
      email: '',
      password: '',
      remember: false
    };
  
    const validationSchema = Yup.object().shape({
      email: Yup.string().email('Invalid email').required('Email is required'),
      password: Yup.string().required('Password is required')
    });
  
    const handleSubmit = (values: typeof initialValues) => {
      console.log(values);
      // Handle login logic here
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
          <LockOutlined sx={{ fontSize: 50, mb: 2, color: 'primary.main' }} />
          <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
            Sign in
          </Typography>
          
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched, handleBlur }) => (
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
                  onBlur={handleBlur}
                />
                <Field
                  as={TextField}
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                  onBlur={handleBlur}
                />
                <FormControlLabel
                  control={<Field as={Checkbox} name="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
                
                <Grid container spacing={2} columns={16}>
                <Grid size={8}>
                
                    <Link 
                      component={RouterLink} 
                      to="/forgot-password" 
                      variant="body2"
                    >
                      Forgot password?
                    </Link>
                   
                  </Grid>
                  <Grid size={8}>
                    <Link 
                      component={RouterLink} 
                      to="/register" 
                      variant="body2"
                    >
                      Don't have an account? Sign Up
                    </Link>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </Box>
      </Box>
    );
  };
  
  export default Login;