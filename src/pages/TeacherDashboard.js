import React, { useState, useEffect } from 'react';
import { Typography, Box, Grid, CircularProgress } from '@mui/material';
import apiService from '../services/api';

const TeacherDashboard = () => {
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch the list of teachers and students in the current school
  const fetchSchoolData = async () => {
    try {
      const adminData = JSON.parse(localStorage.getItem('adminData'));
      const schoolId = adminData.schoolId;
      const token = localStorage.getItem('token');
      const {getTeachers, getStudentsBySchool} = apiService.teacher;

    //  const teachersData = await getTeachersBySchool(); // Replace with your API call to get teachers by school
     // const studentsData = await getStudentsBySchool(); // Replace with your API call to get students by school
     const teachersData = await getTeachers(schoolId, token);
        const studentsData = await getStudentsBySchool(schoolId, token);
     console.log(teachersData);
      setTeachers(teachersData);
      setStudents(studentsData);
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
        <Grid container spacing={2}>
          {teachers.map((teacher) => (
            <Grid item xs={12} sm={6} md={4} key={teacher.id}>
              {/* Display teacher details */}
              <Box p={2} border={1} borderRadius={4}>
                <Typography variant="subtitle1" gutterBottom>
                  {teacher.name}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {teacher.email}
                </Typography>
                {/* Add more teacher details as needed */}
              </Box>
            </Grid>
          ))}
        </Grid>
      )}
      <Typography variant="h5" component="h3" gutterBottom mt={4}>
        Students in Current School
      </Typography>
      {students.length === 0 ? (
        <Typography variant="body1">No students found in the current school.</Typography>
      ) : (
        <Grid container spacing={2}>
          {students.map((student) => (
            <Grid item xs={12} sm={6} md={4} key={student.id}>
              {/* Display student details */}
              <Box p={2} border={1} borderRadius={4}>
                <Typography variant="subtitle1" gutterBottom>
                  {student.name}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {student.class}
                </Typography>
                {/* Add more student details as needed */}
              </Box>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default TeacherDashboard;
