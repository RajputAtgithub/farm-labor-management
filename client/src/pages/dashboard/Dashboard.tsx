import React from 'react';
import { Box, Grid, Paper, Typography } from '@mui/material';
import { 
  Assignment as AssignmentIcon,
  People as PeopleIcon,
  CalendarToday as CalendarIcon,
  AttachMoney as AttachMoneyIcon
} from '@mui/icons-material';
import { Chart } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';

ChartJS.register(...registerables);

const Dashboard = () => {
  // Sample data for charts
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Applications',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: 'Laborers',
        data: [8, 15, 10, 12, 14, 16],
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      },
    ],
  };

  const stats = [
    { title: 'Total Applications', value: '24', icon: <AssignmentIcon fontSize="large" />, color: 'primary.main' },
    { title: 'Active Laborers', value: '15', icon: <PeopleIcon fontSize="large" />, color: 'secondary.main' },
    { title: 'Upcoming Work', value: '8', icon: <CalendarIcon fontSize="large" />, color: 'error.main' },
    { title: 'Total Payments', value: '$2,450', icon: <AttachMoneyIcon fontSize="large" />, color: 'success.main' },
  ];

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      
      <Grid container spacing={3} sx={{ mb: 3 }}>
        {stats.map((stat, index) => (
          <Grid size={{xs:12, sm:6, md:3}} key={index}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                height: '100%',
                borderLeft: `4px solid ${stat.color}`
              }}
            >
              <Box sx={{ color: stat.color, mb: 1 }}>
                {stat.icon}
              </Box>
              <Typography variant="h6" component="div">
                {stat.value}
              </Typography>
              <Typography variant="subtitle2" color="text.secondary">
                {stat.title}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
      
      <Grid container spacing={3}>
        <Grid size={{xs:12, md:8}}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Monthly Overview
            </Typography>
            <Box sx={{ height: 300 }}>
              <Chart type="bar" data={data} options={{ maintainAspectRatio: false }} />
            </Box>
          </Paper>
        </Grid>
        <Grid size={{xs:12, md:4}}>
          <Paper sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Recent Activities
            </Typography>
            <Box>
              {/* Recent activities list would go here */}
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                - New application posted
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                - 3 laborers applied to your post
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                - Payment received for completed work
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;