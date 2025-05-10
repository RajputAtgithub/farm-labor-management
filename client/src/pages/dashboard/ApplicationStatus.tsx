import React from 'react';
import { 
  Box, 
  Card, 
  CardContent, 
  Chip, 
  Divider, 
  Grid, 
  Typography 
} from '@mui/material';
import { 
  LocationOn as LocationIcon,
  People as PeopleIcon,
  Schedule as ScheduleIcon,
  AttachMoney as MoneyIcon,
  Description as DescriptionIcon,
  CheckCircle as CheckCircleIcon,
  Pending as PendingIcon,
  Cancel as CancelIcon
} from '@mui/icons-material';

const ApplicationStatus = () => {
  // Sample application data
  const applications = [
    {
      id: 1,
      address: '123 Farm St, Agricultural Area',
      laborerNeeded: 5,
      duration: '2 weeks',
      paymentPerLaborer: 120,
      description: 'Harvesting wheat crops',
      status: 'accepted',
      appliedDate: '2023-06-01'
    },
    {
      id: 2,
      address: '456 Orchard Lane, Fruit Valley',
      laborerNeeded: 3,
      duration: '1 week',
      paymentPerLaborer: 150,
      description: 'Fruit picking season',
      status: 'pending',
      appliedDate: '2023-06-05'
    },
    {
      id: 3,
      address: '789 Dairy Farm Rd, Milk County',
      laborerNeeded: 2,
      duration: '3 days',
      paymentPerLaborer: 100,
      description: 'Dairy farm maintenance',
      status: 'rejected',
      appliedDate: '2023-05-28'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'accepted':
        return <CheckCircleIcon color="success" />;
      case 'pending':
        return <PendingIcon color="warning" />;
      case 'rejected':
        return <CancelIcon color="error" />;
      default:
        return null;
    }
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom>
        My Applications
      </Typography>

      <Grid container spacing={3}>
        {applications.map((application) => (
          <Grid size={{xs:12}} key={application.id}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="h6">
                    {application.address.split(',')[0]}
                  </Typography>
                  <Chip
                    icon={getStatusIcon(application.status) || undefined}
                    label={application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                    color={
                      application.status === 'accepted' ? 'success' : 
                      application.status === 'pending' ? 'warning' : 'error'
                    }
                  />
                </Box>

                <Grid container spacing={2}>
                  <Grid size={{xs:12, sm:6, md:3}}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <PeopleIcon color="action" sx={{ mr: 1 }} />
                      <Typography>
                        {application.laborerNeeded} laborers needed
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid size={{xs:12, sm:6, md:3}}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <ScheduleIcon color="action" sx={{ mr: 1 }} />
                      <Typography>
                        {application.duration}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid size={{xs:12, sm:6, md:3}}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <MoneyIcon color="action" sx={{ mr: 1 }} />
                      <Typography>
                        ${application.paymentPerLaborer}/person
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid size={{xs:12, sm:6, md:3}}>
                    <Typography variant="body2" color="text.secondary">
                      Applied on: {application.appliedDate}
                    </Typography>
                  </Grid>
                </Grid>

                <Divider sx={{ my: 2 }} />

                <Box sx={{ display: 'flex' }}>
                  <DescriptionIcon color="action" sx={{ mr: 1, mt: 0.5 }} />
                  <Typography>
                    {application.description}
                  </Typography>
                </Box>

                {application.status === 'accepted' && (
                  <Box sx={{ mt: 2, p: 2, backgroundColor: '#e8f5e9', borderRadius: 1 }}>
                    <Typography variant="subtitle2" color="success.main">
                      Your application has been accepted! Please contact the farm owner for further instructions.
                    </Typography>
                  </Box>
                )}

                {application.status === 'rejected' && (
                  <Box sx={{ mt: 2, p: 2, backgroundColor: '#ffebee', borderRadius: 1 }}>
                    <Typography variant="subtitle2" color="error.main">
                      Your application was not selected for this job.
                    </Typography>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ApplicationStatus;