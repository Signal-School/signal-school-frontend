import React, { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';

import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Button,
  Grid,
  Paper,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import AddStudentForm from './AddStudentForm'; 
import axios from 'axios';

const StudentsList = () => {
  const [students, setStudents] = useState([]);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('User'));
  const schoolId = user._id;
  const theme = useTheme();

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const handleAddStudent = (newStudent) => {
    // Add your logic here to send the new student data to the server
    // and update the students list accordingly
    // Add school id to the new student object
    newStudent.schoolId = schoolId;
    console.log('Adding student:', newStudent);
    axios
      .post(`${process.env.REACT_APP_API_URL}/api/student/store`, newStudent, config)
      .then((res) => {
        console.log(res.data);
        setStudents([...students, res.data]);
        alert('Student added successfully');
      })
      .catch((err) => {
        console.log(err);
      });

    // Close the Add Student dialog
    setOpenAddDialog(false);
  };

  useEffect(() => {
    // Fetch the students list from the server
    // and update the students state
    // Replace this with your actual API call
    const fetchStudents = async () => {
      // Simulating API call delay with setTimeout
      setTimeout(() => {
        const mockStudentsData = [
          { id: 1, name: 'Rohan S.',age: 10, grade : 'A' },
          { id: 2, name: 'Aneeta K.',age: 8, grade : 'B' },
          // Add more students data as needed
        ];
        setStudents(mockStudentsData);
      }, 1000);
    };

    fetchStudents();
  }, []);

  function createData(id, name, subject) {
    return { id, name, subject };
  }

  return (
    <div>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5" style={{padding:'1.5rem'}}>Students List</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => setOpenAddDialog(true)}
          style={{margin:'1.5rem'}}
        >
          Add Student
        </Button>
      </Box>
      <Grid container spacing={2} style={{paddingLeft:'1rem',paddingRight:'1rem'}} >
        <Grid item xs={12} >
          <Paper>
            {/* <List>
              {students.map((student) => (
                <React.Fragment key={student.id}>
                  <ListItem>
                    <ListItemText primary={student.name} />
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
            </List> */}
            <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 ,backgroundColor: theme.palette.primary.main}} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{color: theme.palette.primary.contrastText,fontWeight:'bold',fontSize:16}}>Id</TableCell>
            <TableCell sx={{color: theme.palette.primary.contrastText,fontWeight:'bold',fontSize:16}} align="left">Name</TableCell>
            <TableCell sx={{color: theme.palette.primary.contrastText,fontWeight:'bold',fontSize:16}} align="left">Age</TableCell>
            <TableCell sx={{color: theme.palette.primary.contrastText,fontWeight:'bold',fontSize:16}} align="left">Grade</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {students.map((student) => (
            <TableRow
              key={student.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell sx={{color: theme.palette.primary.contrastText}} component="th" scope="row">
                {student.id}
              </TableCell>
              <TableCell sx={{color: theme.palette.primary.contrastText}} align="left">{student.name}</TableCell>
              <TableCell sx={{color: theme.palette.primary.contrastText}} align="left">{student.age}</TableCell>
              <TableCell sx={{color: theme.palette.primary.contrastText}} align="left">{student.grade}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
          </Paper>
        </Grid>
      </Grid>
      <AddStudentForm open={openAddDialog} handleClose={() => setOpenAddDialog(false)} handleAddStudent={handleAddStudent} />
    </div>
  );
};

export default StudentsList;
