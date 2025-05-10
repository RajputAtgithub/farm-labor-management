import React, { useState } from 'react';
import { 
  Box, 
  Button, 
  Card, 
  CardActions, 
  CardContent, 
  Chip, 
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogTitle, 
  Grid, 
  IconButton, 
  Menu, 
  MenuItem, 
  Divider,
  Avatar,
  TextField, 
  Typography
} from '@mui/material';
import { 
  Add as AddIcon,
  MoreVert as MoreIcon,
  LocationOn as LocationIcon,
  People as PeopleIcon,
  Schedule as ScheduleIcon,
  AttachMoney as MoneyIcon,
  Description as DescriptionIcon,
  Check as CheckIcon,
  Close as CloseIcon,
  Search as SearchIcon,
  Person as PersonIcon,
  Pending as PendingIcon
} from '@mui/icons-material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Link as RouterLink } from 'react-router-dom';

const Applications = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Sample data
  const applications = [
    {
      id: 1,
      address: '123 Farm St, Agricultural Area',
      laborerNeeded: 5,
      duration: '2 weeks',
      paymentPerLaborer: 120,
      description: 'Harvesting wheat crops',
      status: 'open',
      applicants: 3,
      createdDate: '2023-06-01'
    },
    {
      id: 2,
      address: '456 Orchard Lane, Fruit Valley',
      laborerNeeded: 3,
      duration: '1 week',
      paymentPerLaborer: 150,
      description: 'Fruit picking season',
      status: 'open',
      applicants: 1,
      createdDate: '2023-06-05'
    },
    {
      id: 3,
      address: '789 Dairy Farm Rd, Milk County',
      laborerNeeded: 2,
      duration: '3 days',
      paymentPerLaborer: 100,
      description: 'Dairy farm maintenance',
      status: 'closed',
      applicants: 2,
      createdDate: '2023-05-28'
    }
  ];

  const applicantColumns: GridColDef[] = [
    { 
      field: 'name', 
      headerName: 'Name', 
      width: 200,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar sx={{ mr: 2, width: 32, height: 32 }}>
            {params.row.image ? (
              <img src={params.row.image} alt={params.row.name} style={{ width: '100%' }} />
            ) : (
              <PersonIcon />
            )}
          </Avatar>
          {params.row.name}
        </Box>
      )
    },
    { field: 'experience', headerName: 'Experience', width: 150 },
    { field: 'rating', headerName: 'Rating', width: 120 },
    { 
      field: 'status', 
      headerName: 'Status', 
      width: 150,
      renderCell: (params) => {
        return params.value === 'accepted' ? (
          <Chip icon={<CheckIcon />} label="Accepted" color="success" size="small" />
        ) : params.value === 'rejected' ? (
          <Chip icon={<CloseIcon />} label="Rejected" color="error" size="small" />
        ) : (
          <Chip icon={<PendingIcon />} label="Pending" color="warning" size="small" />
        );
      }
    },
    { 
      field: 'actions', 
      headerName: 'Actions', 
      width: 150,
      renderCell: (params) => (
        <Box>
          <IconButton 
            size="small" 
            color="success" 
            onClick={() => handleAccept(params.row.id)}
            disabled={params.row.status !== 'pending'}
          >
            <CheckIcon fontSize="small" />
          </IconButton>
          <IconButton 
            size="small" 
            color="error" 
            onClick={() => handleReject(params.row.id)}
            disabled={params.row.status !== 'pending'}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
      )
    }
  ];

  const applicantRows = [
    { id: 1, name: 'John Doe', experience: '5 years', rating: '4.8', status: 'pending', image: '' },
    { id: 2, name: 'Jane Smith', experience: '3 years', rating: '4.5', status: 'pending', image: '' },
    { id: 3, name: 'Robert Johnson', experience: '7 years', rating: '4.9', status: 'pending', image: '' }
  ];

  const filteredApplications = applications.filter(app =>
    app.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, application: any) => {
    setAnchorEl(event.currentTarget);
    setSelectedApplication(application);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleViewApplicants = () => {
    setOpenDialog(true);
    handleMenuClose();
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleAccept = (id: number) => {
    console.log(`Accepted applicant ${id}`);
    // API call to update applicant status
  };

  const handleReject = (id: number) => {
    console.log(`Rejected applicant ${id}`);
    // API call to update applicant status
  };

//   const handleCreateApplication = () => {
//     // Navigation to create new application form
//     console.log('Navigate to create new application');
//   };

  const handleCloseApplication = () => {
    if (selectedApplication) {
      console.log(`Closing application ${selectedApplication.id}`);
      // API call to close application
    }
    handleMenuClose();
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Job Applications</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <TextField
            variant="outlined"
            size="small"
            placeholder="Search applications..."
            value={searchTerm}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: <SearchIcon color="action" sx={{ mr: 1 }} />,
            }}
          />
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            component={RouterLink}
            to="/applications/new"
          >
            New Application
          </Button>
        </Box>
      </Box>
      
      <Grid container spacing={3}>
        {filteredApplications.map((application) => (
          <Grid container size={{xs:12,sm:6,md:4}} key={application.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography gutterBottom variant="h6" component="h2">
                    {application.address.split(',')[0]}
                  </Typography>
                  <IconButton
                    aria-label="more"
                    onClick={(e) => handleMenuOpen(e, application)}
                    size="small"
                  >
                    <MoreIcon />
                  </IconButton>
                </Box>
                
                <Box sx={{ mb: 2 }}>
                  <Chip
                    label={application.status === 'open' ? 'Open' : 'Closed'}
                    color={application.status === 'open' ? 'success' : 'error'}
                    size="small"
                    sx={{ mr: 1 }}
                  />
                  <Chip
                    label={`${application.applicants} applicants`}
                    color="info"
                    size="small"
                    variant="outlined"
                  />
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <LocationIcon color="action" sx={{ mr: 1 }} />
                  <Typography variant="body2" color="text.secondary">
                    {application.address}
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <PeopleIcon color="action" sx={{ mr: 1 }} />
                  <Typography variant="body2" color="text.secondary">
                    {application.laborerNeeded} laborers needed
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <ScheduleIcon color="action" sx={{ mr: 1 }} />
                  <Typography variant="body2" color="text.secondary">
                    {application.duration}
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <MoneyIcon color="action" sx={{ mr: 1 }} />
                  <Typography variant="body2" color="text.secondary">
                    ${application.paymentPerLaborer} per laborer
                  </Typography>
                </Box>
                
                <Divider sx={{ my: 1 }} />
                
                <Box sx={{ display: 'flex' }}>
                  <DescriptionIcon color="action" sx={{ mr: 1, mt: 0.5 }} />
                  <Typography variant="body2">
                    {application.description}
                  </Typography>
                </Box>
              </CardContent>
              <CardActions sx={{ justifyContent: 'space-between', p: 2 }}>
                <Typography variant="caption" color="text.secondary">
                  Created: {application.createdDate}
                </Typography>
                <Button 
                  size="small" 
                  color="primary"
                  onClick={() => {
                    setSelectedApplication(application);
                    setOpenDialog(true);
                  }}
                >
                  View Applicants
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Application Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleViewApplicants}>View Applicants</MenuItem>
        {selectedApplication?.status === 'open' && (
          <MenuItem onClick={handleCloseApplication}>Close Application</MenuItem>
        )}
        <MenuItem component={RouterLink} to={`/applications/edit/${selectedApplication?.id}`}>
          Edit Details
        </MenuItem>
      </Menu>

      {/* Applicants Dialog */}
      <Dialog 
        open={openDialog} 
        onClose={handleCloseDialog} 
        maxWidth="md" 
        fullWidth
      >
        <DialogTitle>
          Applicants for {selectedApplication?.address.split(',')[0]}
          <Chip 
            label={selectedApplication?.status === 'open' ? 'Open' : 'Closed'} 
            color={selectedApplication?.status === 'open' ? 'success' : 'error'} 
            size="small" 
            sx={{ ml: 2 }}
          />
        </DialogTitle>
        <DialogContent dividers>
          <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={applicantRows}
              columns={applicantColumns}
              initialState={{
                pagination: {
                  paginationModel: { pageSize: 5 },
                },
              }}
              paginationModel={{ page: 0, pageSize: 5 }}
              disableRowSelectionOnClick
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
          {selectedApplication?.status === 'open' && (
            <Button 
              variant="contained" 
              onClick={handleCloseApplication}
              color="error"
            >
              Close Application
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Applications;