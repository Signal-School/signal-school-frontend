import React, { useState } from 'react';
import {
  Box,
  Paper,
  TextField,
  Button,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  ThemeProvider,
  Snackbar,
} from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import axios from 'axios';
import theme from './theme';

const LoginPage = () => {
  const [userType, setUserType] = useState('admin');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleLogin = () => {
    const apiUrl =
      process.env.REACT_APP_API_URL + `/${userType}/login`;

    axios
      .post(apiUrl, {
        username: username,
        password: password,
      })
      .then((response) => {
        const { message, token } = response.data;
        setSnackbarMessage(message);
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
        localStorage.setItem('token', token);
        localStorage.setItem('userType', userType);
        localStorage.setItem('email', username);
      })
      .catch((error) => {
        const errorMessage =
          error.response && error.response.data
            ? error.response.data.message
            : 'An error occurred.';
        setSnackbarMessage(errorMessage);
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      });
  };

  return (
    <ThemeProvider theme={theme}>
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
          <form>
            <FormControl component="fieldset">
              <RadioGroup
                row
                value={userType}
                onChange={handleUserTypeChange}
                sx={{ marginBottom: 2 }}
              >
                <FormControlLabel
                  value="admin"
                  control={<Radio />}
                  label="Admin"
                />
                <FormControlLabel
                  value="teacher"
                  control={<Radio />}
                  label="Teacher"
                />
              </RadioGroup>
            </FormControl>
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
              Login as {userType.charAt(0).toUpperCase() + userType.slice(1)}
            </Button>
          </form>
        </Paper>
      </Box>
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
    </ThemeProvider>
  );
};

export default LoginPage;
