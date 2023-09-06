import React, { useState } from 'react';
import { Typography, Box, Button, TextField, Grid, Snackbar } from '@mui/material';
import { Alert } from '@mui/material';
import axios from 'axios';

const CreateSchool = () => {
  const [schoolName, setSchoolName] = useState('');
  const [location, setLocation] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const adminData = JSON.parse(localStorage.getItem('adminData'));

  const handleSchoolNameChange = (event) => {
    setSchoolName(event.target.value);
  };

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/school/add`,{
        name: schoolName,
        location: location,
        adminId: adminData._id,
        role: 'admin'
      });
      console.log('response', response);
      // Handle the successful creation of the school
      console.log('School created:', response.data);

      // Reset the form fields
      setSchoolName('');
      setLocation('');

      // Show success snackbar
      setSnackbarMessage('School created successfully');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Error creating school:', error);

      // Show error snackbar
      setSnackbarMessage('Error creating school');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  return (
    <div style={{padding:'1rem'}}>
      <Typography variant="h5" gutterBottom>
        Create School
      </Typography>
      <Box sx={{ p: 2 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                id="schoolName"
                label="School Name"
                fullWidth
                value={schoolName}
                onChange={handleSchoolNameChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="location"
                label="Location"
                fullWidth
                value={location}
                onChange={handleLocationChange}
              />
            </Grid>
          </Grid>
          <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
            Create
          </Button>
        </form>
      </Box>
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default CreateSchool;
