import React, { useState, useEffect } from 'react';
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
          { id: 1, name: 'John Doe' },
          { id: 2, name: 'Jane Smith' },
          // Add more teachers data as needed
        ];
        setTeachers(mockTeachersData);
      }, 1000);
    };

    fetchTeachers();
  }, []);

  return (
    <div>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5">Teachers List</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => setOpenAddDialog(true)}
        >
          Add Teacher
        </Button>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper>
            <List>
              {teachers.map((teacher) => (
                <React.Fragment key={teacher.id}>
                  <ListItem>
                    <ListItemText primary={teacher.name} />
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
      <AddTeacherDialog open={openAddDialog} handleClose={() => setOpenAddDialog(false)} handleAddTeacher={handleAddTeacher} />
    </div>
  );
};

export default TeachersList;
