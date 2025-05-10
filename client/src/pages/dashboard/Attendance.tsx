import React, { useState } from 'react';
import { 
  Box, 
  Button, 
  Card, 
  CardContent, 
  Chip, 
  Divider, 
  Grid, 
  IconButton, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Typography 
} from '@mui/material';
import { 
  CalendarMonth as CalendarIcon,
  Check as CheckIcon,
  Close as CloseIcon,
  ArrowBack as ArrowBackIcon,
  ArrowForward as ArrowForwardIcon,
  Person as PersonIcon
} from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers';
import { format, addDays, isSameDay } from 'date-fns';

const Attendance = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Sample laborer data
  const laborers = [
    { id: 1, name: 'John Doe', position: 'Harvester' },
    { id: 2, name: 'Jane Smith', position: 'Planter' },
    { id: 3, name: 'Robert Johnson', position: 'Irrigation Specialist' },
    { id: 4, name: 'Maria Garcia', position: 'Fruit Picker' },
  ];

  // Sample attendance data
  const attendanceData = [
    { laborerId: 1, date: new Date(2023, 5, 1), status: 'present' },
    { laborerId: 1, date: new Date(2023, 5, 2), status: 'present' },
    { laborerId: 1, date: new Date(2023, 5, 3), status: 'absent' },
    { laborerId: 2, date: new Date(2023, 5, 1), status: 'present' },
    { laborerId: 2, date: new Date(2023, 5, 2), status: 'present' },
    { laborerId: 2, date: new Date(2023, 5, 3), status: 'present' },
    { laborerId: 3, date: new Date(2023, 5, 1), status: 'absent' },
    { laborerId: 3, date: new Date(2023, 5, 2), status: 'present' },
    { laborerId: 3, date: new Date(2023, 5, 3), status: 'absent' },
    { laborerId: 4, date: new Date(2023, 5, 1), status: 'present' },
    { laborerId: 4, date: new Date(2023, 5, 2), status: 'absent' },
    { laborerId: 4, date: new Date(2023, 5, 3), status: 'present' },
  ];

  // Generate 7 days from current date
  const days = Array.from({ length: 7 }, (_, i) => addDays(currentDate, i));

  const handlePreviousWeek = () => {
    setCurrentDate(addDays(currentDate, -7));
  };

  const handleNextWeek = () => {
    setCurrentDate(addDays(currentDate, 7));
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
  };

  const getAttendanceStatus = (laborerId: number, date: Date) => {
    const attendance = attendanceData.find(
      (a) => a.laborerId === laborerId && isSameDay(a.date, date)
    );
    return attendance ? attendance.status : null;
  };

  const handleMarkAttendance = (laborerId: number, date: Date, status: string) => {
    console.log(`Marking ${status} for laborer ${laborerId} on ${date}`);
    // API call to update attendance would go here
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Attendance Management
      </Typography>

      <Grid container spacing={3}>
        <Grid size={{xs:12,md:8}}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6">Weekly Attendance</Typography>
                <Box>
                  <IconButton onClick={handlePreviousWeek}>
                    <ArrowBackIcon />
                  </IconButton>
                  <Button
                    startIcon={<CalendarIcon />}
                    onClick={() => setShowDatePicker(!showDatePicker)}
                  >
                    {format(currentDate, 'MMM d')} - {format(addDays(currentDate, 6), 'MMM d, yyyy')}
                  </Button>
                  <IconButton onClick={handleNextWeek}>
                    <ArrowForwardIcon />
                  </IconButton>
                </Box>
              </Box>

              {showDatePicker && (
                <Box sx={{ mb: 3 }}>
                  <DatePicker
                    label="Jump to date"
                    value={currentDate}
                    onChange={(newValue) => {
                      if (newValue) {
                        setCurrentDate(newValue);
                        setShowDatePicker(false);
                      }
                    }}
                    slotProps={{ textField: { fullWidth: true } }}
                  />
                </Box>
              )}

              <TableContainer component={Paper}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Laborer</TableCell>
                      {days.map((day) => (
                        <TableCell key={day.toString()} align="center">
                          {format(day, 'EEE')}
                          <br />
                          {format(day, 'd')}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {laborers.map((laborer) => (
                      <TableRow key={laborer.id}>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <PersonIcon sx={{ mr: 1 }} />
                            {laborer.name}
                            <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
                              ({laborer.position})
                            </Typography>
                          </Box>
                        </TableCell>
                        {days.map((day) => {
                          const status = getAttendanceStatus(laborer.id, day);
                          return (
                            <TableCell key={day.toString()} align="center">
                              {status === 'present' ? (
                                <Chip
                                  icon={<CheckIcon />}
                                  label="Present"
                                  color="success"
                                  size="small"
                                  onClick={() => handleMarkAttendance(laborer.id, day, 'absent')}
                                />
                              ) : status === 'absent' ? (
                                <Chip
                                  icon={<CloseIcon />}
                                  label="Absent"
                                  color="error"
                                  size="small"
                                  onClick={() => handleMarkAttendance(laborer.id, day, 'present')}
                                />
                              ) : (
                                <Button
                                  size="small"
                                  variant="outlined"
                                  onClick={() => handleMarkAttendance(laborer.id, day, 'present')}
                                >
                                  Mark
                                </Button>
                              )}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{xs:12, md:4}}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Attendance Summary - {format(selectedDate, 'MMMM d, yyyy')}
              </Typography>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography>Present:</Typography>
                <Typography>12</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography>Absent:</Typography>
                <Typography>3</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography>Total Laborers:</Typography>
                <Typography>15</Typography>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Typography variant="subtitle1" gutterBottom>
                Absent Today
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                <Chip label="John Doe" size="small" />
                <Chip label="Maria Garcia" size="small" />
                <Chip label="Tom Wilson" size="small" />
              </Box>
            </CardContent>
          </Card>

          <Card sx={{ mt: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Monthly Statistics
              </Typography>
              <Box sx={{ height: 200 }}>
                {/* Placeholder for monthly attendance chart */}
                <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 8 }}>
                  Attendance chart would be displayed here
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Attendance;