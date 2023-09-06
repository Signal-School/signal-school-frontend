import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2B5035',
      darkGrey: '#989ca3'
    },
    secondary: {
      main: '#F5E9BF',
    },
    appBar: {
      background: '#F5E9BF', // Set the background color of the AppBar
    },
  },
  shape: {
    borderRadius: 12,
  },
  userTypeColors: {
    admin: {
      backgroundColor: '#FF0000',
      textColor: '#FFFFFF',
    },
    teacher: {
      backgroundColor: '#0000FF',
      textColor: '#FFFFFF',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#F5E9BF',
          margin: 0,
          padding: 0,
        },
      },
    },
  },
});

export default theme;
