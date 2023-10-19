import React from 'react';
import { Typography, Container, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';
//import schoolImage from '../assets/school.jpg';

const Home = () => {
  return (
    <Container maxWidth="md">
      <Box mt={4} mb={6} textAlign="center">
        <Typography variant="h4" component="h1" gutterBottom style={{marginTop: '5rem'}}>
          Welcome to Signal School
        </Typography>
        <Typography variant="h6" component="p" color="textSecondary">
          Empowering Education for the Future
        </Typography>
      </Box>
      {/* <Box mb={6} textAlign="center">
        <img src={schoolImage} alt="School" style={{ width: '100%', maxWidth: '500px', borderRadius: '12px' }} />
      </Box> */}
      <Box textAlign="center">
        <Typography variant="body1" component="p" gutterBottom>
          Signal School is a modern and innovative educational platform that connects teachers, students, and administrators in one seamless experience. With our advanced features and user-friendly interface, we aim to revolutionize the way education is delivered and accessed.
        </Typography>
        <Typography variant="body1" component="p" gutterBottom>
          Whether you are an administrator managing schools, a teacher delivering engaging lessons, or a student seeking knowledge and growth, Signal School provides the tools and resources you need to succeed.
        </Typography>
      </Box>
      <Box mt={6} textAlign="center">
        <Button variant="contained" color="primary" component={Link} to="/admin/login" sx={{ marginRight: 2 }}>
          Admin Login
        </Button>
        <Button variant="contained" color="primary" component={Link} to="/teacher/login">
          Teacher Login
        </Button>
      </Box>
    </Container>
  );
};

export default Home;
