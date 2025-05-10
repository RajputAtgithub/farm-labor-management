import React, { useState } from 'react';
import { 
  Avatar, 
  Box, 
  Button, 
  Card, 
  CardContent, 
  Chip, 
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogTitle, 
  Grid, 
  IconButton, 
  MenuItem, 
  TextField, 
  Typography 
} from '@mui/material';
import { 
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Person as PersonIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  Star as StarIcon
} from '@mui/icons-material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

const Laborers = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedLaborer, setSelectedLaborer] = useState<any>(null);

  // Sample laborer data
  const laborers = [
    { 
      id: 1, 
      name: 'John Doe', 
      position: 'Harvester', 
      experience: '5 years', 
      rating: 4.8, 
      phone: '+1 234 567 8901', 
      email: 'john@example.com',
      status: 'active',
      image: ''
    },
    { 
      id: 2, 
      name: 'Jane Smith', 
      position: 'Planter', 
      experience: '3 years', 
      rating: 4.5, 
      phone: '+1 234 567 8902', 
      email: 'jane@example.com',
      status: 'active',
      image: ''
    },
    { 
      id: 3, 
      name: 'Robert Johnson', 
      position: 'Irrigation Specialist', 
      experience: '7 years', 
      rating: 4.9, 
      phone: '+1 234 567 8903', 
      email: 'robert@example.com',
      status: 'inactive',
      image: ''
    },
    { 
      id: 4, 
      name: 'Maria Garcia', 
      position: 'Fruit Picker', 
      experience: '2 years', 
      rating: 4.2, 
      phone: '+1 234 567 8904', 
      email: 'maria@example.com',
      status: 'active',
      image: ''
    },
  ];

  const columns: GridColDef[] = [
    { 
      field: 'name', 
      headerName: 'Laborer', 
      width: 200,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar sx={{ mr: 2 }}>
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
    { field: 'position', headerName: 'Position', width: 150 },
    { field: 'experience', headerName: 'Experience', width: 120 },
    { 
      field: 'rating', 
      headerName: 'Rating', 
      width: 120,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <StarIcon sx={{ color: '#ffc107', mr: 0.5 }} />
          {params.row.rating}
        </Box>
      )
    },
    { 
      field: 'status', 
      headerName: 'Status', 
      width: 120,
      renderCell: (params) => (
        <Chip 
          label={params.row.status} 
          color={params.row.status === 'active' ? 'success' : 'error'} 
          size="small" 
        />
      )
    },
    { 
      field: 'actions', 
      headerName: 'Actions', 
      width: 150,
      renderCell: (params) => (
        <Box>
          <IconButton onClick={() => handleViewDetails(params.row)}>
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton onClick={() => handleDelete(params.row.id)}>
            <DeleteIcon fontSize="small" color="error" />
          </IconButton>
        </Box>
      )
    }
  ];

  const handleViewDetails = (laborer: any) => {
    setSelectedLaborer(laborer);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleDelete = (id: number) => {
    console.log(`Delete laborer ${id}`);
    // API call to delete laborer would go here
  };

  const handleAddNew = () => {
    setSelectedLaborer(null);
    setOpenDialog(true);
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Laborers</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddNew}
        >
          Add Laborer
        </Button>
      </Box>

      <Card>
        <CardContent>
          <Box sx={{ height: 600, width: '100%' }}>
            <DataGrid
              rows={laborers}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { pageSize: 10 },
                },
              }}
              pageSizeOptions={[10]}
              checkboxSelection
              disableRowSelectionOnClick
            />
          </Box>
        </CardContent>
      </Card>

      {/* Laborer Details Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          {selectedLaborer ? 'Edit Laborer Details' : 'Add New Laborer'}
        </DialogTitle>
        <DialogContent dividers>
          {selectedLaborer ? (
            <Grid container spacing={3}>
              <Grid size={{xs:12, md:4}}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Avatar sx={{ width: 120, height: 120, mb: 2 }}>
                    {selectedLaborer.image ? (
                      <img src={selectedLaborer.image} alt={selectedLaborer.name} style={{ width: '100%' }} />
                    ) : (
                      <PersonIcon sx={{ fontSize: 60 }} />
                    )}
                  </Avatar>
                  <Button variant="outlined" sx={{ mt: 2 }}>
                    Change Photo
                  </Button>
                </Box>
              </Grid>
              <Grid size={{xs:12, md:8}}>
                <Grid container spacing={2}>
                  <Grid size={{xs:12, sm:6}}>
                    <TextField
                      fullWidth
                      label="Full Name"
                      defaultValue={selectedLaborer.name}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid size={{xs:12, sm:6}}>
                    <TextField
                      fullWidth
                      label="Position"
                      defaultValue={selectedLaborer.position}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid size={{xs:12, sm:6}}>
                    <TextField
                      fullWidth
                      label="Experience"
                      defaultValue={selectedLaborer.experience}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid size={{xs:12, sm:6}}>
                    <TextField
                      fullWidth
                      label="Rating"
                      defaultValue={selectedLaborer.rating}
                      variant="outlined"
                      InputProps={{
                        startAdornment: <StarIcon color="action" sx={{ mr: 1 }} />,
                      }}
                    />
                  </Grid>
                  <Grid size={{xs:12, sm:6}}>
                    <TextField
                      fullWidth
                      label="Phone"
                      defaultValue={selectedLaborer.phone}
                      variant="outlined"
                      InputProps={{
                        startAdornment: <PhoneIcon color="action" sx={{ mr: 1 }} />,
                      }}
                    />
                  </Grid>
                  <Grid size={{xs:12, sm:6}}>
                    <TextField
                      fullWidth
                      label="Email"
                      defaultValue={selectedLaborer.email}
                      variant="outlined"
                      InputProps={{
                        startAdornment: <EmailIcon color="action" sx={{ mr: 1 }} />,
                      }}
                    />
                  </Grid>
                  <Grid size={{xs:12}}>
                    <TextField
                      fullWidth
                      label="Status"
                      defaultValue={selectedLaborer.status}
                      variant="outlined"
                      select
                    >
                      <MenuItem value="active">Active</MenuItem>
                      <MenuItem value="inactive">Inactive</MenuItem>
                    </TextField>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          ) : (
            <Typography>Add new laborer form would go here</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button variant="contained" onClick={handleCloseDialog}>
            {selectedLaborer ? 'Save Changes' : 'Add Laborer'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Laborers;