import React, { useState, useEffect } from 'react';
import { Typography, Box, Grid, CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const AdminDashboard = () => {
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Sample data arrays (replace with your own dummy data)
  const dummyTeachers = [
    { id: 1, name: 'Teacher 1', email: 'teacher1@example.com' },
    { id: 2, name: 'Teacher 2', email: 'teacher2@example.com' },
  ];

  const dummyStudents = [
    { id: 1, name: 'Ram', class: 'Class A' },
    { id: 2, name: 'Shyam', class: 'Class B' },
  ];

  // Simulate API call with a delay
  const fetchSchoolData = async () => {
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Set dummy data
      setTeachers(dummyTeachers);
      setStudents(dummyStudents);
      setLoading(false);
    } catch (error) {
      console.log('Error fetching school data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchoolData();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box p={4}>
      <Typography variant="h4" component="h2" gutterBottom>
        Admin Dashboard
      </Typography>
      <Typography variant="h5" component="h3" gutterBottom>
        Teachers in Current School
      </Typography>
      {teachers.length === 0 ? (
        <Typography variant="body1">No teachers found in the current school.</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table aria-label="teachers table" style={{backgroundColor: '#2B5035'}}>
            <TableHead>
              <TableRow>
                <TableCell style={{color:'white'}}>Name</TableCell>
                <TableCell style={{color:'white'}}>Email</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {teachers.map((teacher) => (
                <TableRow key={teacher.id}>
                  <TableCell style={{color:'white'}}>{teacher.name}</TableCell>
                  <TableCell style={{color:'white'}}>{teacher.email}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <Typography variant="h5" component="h3" gutterBottom mt={4}>
        Students in Current School
      </Typography>
      {students.length === 0 ? (
        <Typography variant="body1">No students found in the current school.</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table aria-label="students table" style={{backgroundColor: '#2B5035', color: 'white'}}>
            <TableHead>
              <TableRow>
                <TableCell style={{color:'white'}}>Name</TableCell>
                <TableCell style={{color:'white'}}>Class</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student.id}>
                  <TableCell style={{color:'white'}}>{student.name}</TableCell>
                  <TableCell style={{color:'white'}}>{student.class}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default AdminDashboard;
