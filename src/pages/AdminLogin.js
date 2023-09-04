import React, { useState } from 'react';
import { Box, Paper, TextField, Button, Snackbar, Typography } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';
import apiService from '../services/api';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleLogin = async () => {
    try {
      const response = await apiService.auth.login('admin', username, password);
      console.log(response);
      const { message, token, admin, school } = response.data;
      setSnackbarMessage(message);
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      localStorage.setItem('token', token);
      localStorage.setItem('userType', 'admin');
      localStorage.setItem('adminData', JSON.stringify(admin));
      localStorage.setItem('schoolData', JSON.stringify(school));
      setTimeout(() => {
      navigate('/admin/dashboard');
        }, 1000);
    } catch (error) {
      const errorMessage = error.response && error.response.data ? error.response.data.message : 'An error occurred.';
      setSnackbarMessage(errorMessage);
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: 'primary.main',
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: 300,
          padding: 2,
          borderRadius: 'borderRadius',
          backgroundColor: 'secondary.main',
        }}
      >
        <Typography variant="h5" align="center" sx={{ marginBottom: 2 }}>
          Admin Login
        </Typography>
        <form>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            value={username}
            onChange={handleUsernameChange}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={handlePasswordChange}
          />
          <Button
            variant="contained"
            fullWidth
            color="primary"
            onClick={handleLogin}
          >
            Login
          </Button>
        </form>
      </Paper>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          severity={snackbarSeverity}
          onClose={handleSnackbarClose}
        >
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </Box>
  );
};

export default AdminLogin;
