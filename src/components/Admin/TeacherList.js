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
import AddTeacherDialog from './AddTeacherDialog';
import axios from 'axios';

const TeachersList = () => {
  const [teachers, setTeachers] = useState([]);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const token = localStorage.getItem('token');
  const schoolData = JSON.parse(localStorage.getItem('schoolData'));
  const schoolId = schoolData._id;
  const theme = useTheme();

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };


  const handleAddTeacher = (newTeacher) => {
    // Add your logic here to send the new teacher data to the server
    // and update the teachers list accordingly
    //add school id to new teacher object
    newTeacher.schoolId = schoolId;
    console.log('Adding teacher:', newTeacher);
    axios.post(`${process.env.REACT_APP_API_URL}/api/teacher/store`, newTeacher, config)
      .then((res) => {
        console.log(res.data);
        setTeachers([...teachers, res.data]);
        alert('Teacher added successfully');
      })
      .catch((err) => {
        console.log(err);
      })



    // Close the Add Teacher dialog
    setOpenAddDialog(false);
  };

  useEffect(() => {
    // Fetch the teachers list from the server
    // and update the teachers state
    // Replace this with your actual API call
    const fetchTeachers = async () => {
      // Simulating API call delay with setTimeout
      setTimeout(() => {
        const mockTeachersData = [
          { id: 1, name: 'John Doe', subject: 'Maths' },
          { id: 2, name: 'Jane Smith', subject: 'English' },
          { id: 3, name: 'Matt Damon', subject: 'Chemistry' },
          { id: 4, name: 'Tom Cruise', subject: 'Physics' },
          { id: 1, name: 'John Doe', subject: 'Maths' },
          { id: 2, name: 'Jane Smith', subject: 'English' },
          { id: 3, name: 'Matt Damon', subject: 'Chemistry' },
          { id: 4, name: 'Tom Cruise', subject: 'Physics' },
          { id: 1, name: 'John Doe', subject: 'Maths' },
          { id: 2, name: 'Jane Smith', subject: 'English' },
          { id: 3, name: 'Matt Damon', subject: 'Chemistry' },
          { id: 4, name: 'Tom Cruise', subject: 'Physics' },
          { id: 1, name: 'John Doe', subject: 'Maths' },
          { id: 2, name: 'Jane Smith', subject: 'English' },
          { id: 3, name: 'Matt Damon', subject: 'Chemistry' },
          { id: 4, name: 'Tom Cruise', subject: 'Physics' },
          // Add more teachers data as needed
        ];
        setTeachers(mockTeachersData);
      }, 1000);
    };

    fetchTeachers();
  }, []);

  function createData(id, name, subject) {
    return { id, name, subject };
  }
  return (
    <div>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5" style={{ padding: '1.5rem' }}>Teachers List</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => setOpenAddDialog(true)}
          sx={{ margin: '1.5rem' }}
        >
          Add Teacher
        </Button>
      </Box>
      <Grid style={{ width: '90%', margin: '0 auto', paddingLeft: '1rem', paddingRight: '1rem' }} container spacing={2}>
        <Grid item xs={12}>
          <Paper sx={{ backgroundColor: theme.palette.primary.main }}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650, backgroundColor: theme.palette.primary.main}} aria-label="simple table">
                <TableHead sx = {{backgroundColor: theme.palette.primary.main}}>
                  <TableRow sx ={{ borderBottom: '5px solid #F5E9BF'}} >
                    <TableCell sx={{ color: theme.palette.primary.contrastText, fontWeight: 'bold', fontSize: 18 }}>Id</TableCell>
                    <TableCell sx={{ color: theme.palette.primary.contrastText, fontWeight: 'bold', fontSize: 18 }} align="left">Name</TableCell>
                    <TableCell sx={{ color: theme.palette.primary.contrastText, fontWeight: 'bold', fontSize: 18 }} align="left">Subject</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {teachers.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={3} sx={{ color: theme.palette.primary.contrastText }}>No teachers found</TableCell>
                    </TableRow>
                  ) : (
                    teachers.map((teacher) => (
                      <TableRow
                        key={teacher.id}
                        sx={{ '&:last-child td, &:last-child th': { borderBottom: 0 } }}
                      >
                        <TableCell sx={{ color: theme.palette.primary.contrastText, fontSize: 16 }} component="th" scope="row">
                          {teacher.id}
                        </TableCell>
                        <TableCell sx={{ color: theme.palette.primary.contrastText, fontSize: 16 }} align="left">{teacher.name}</TableCell>
                        {/* Create spacing between the table cells */}
                        
                        <TableCell sx={{ color: theme.palette.primary.contrastText, fontSize: 16 }} align="left">{teacher.subject}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>

              </Table>
            </TableContainer>

            {/* <List>
              {teachers.map((teacher) => (
                <React.Fragment key={teacher.id}>
                  <ListItem>
                    <ListItemText sx={{color: theme.palette.primary.contrastText}} primary={teacher.name} />
                  </ListItem>
                  <Divider sx={{backgroundColor: theme.palette.primary.contrastText, marginBottom:'1rem'}} />
                </React.Fragment>
              ))}
            </List> */}
          </Paper>
        </Grid>
      </Grid>
      <AddTeacherDialog open={openAddDialog} handleClose={() => setOpenAddDialog(false)} handleAddTeacher={handleAddTeacher} />
    </div>
  );
};

export default TeachersList;
