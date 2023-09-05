import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
} from '@mui/material';
import axios from 'axios';


const token = localStorage.getItem('token');


const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },


};



const AddStudent = (data) => {
 
}


const AddStudentDialog = ({ open, handleClose, handleAddTeacher }) => {


  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [classs, setClasss] = useState('');
  const [dob, setDOB] = useState('');
  const [address, setAddress] = useState('');
  const [schoolId, setSchoolId] = useState("64c3dbaea6e8a36bab07a8c8");




  const handleAddClick = () => {
    // Create a new student object
    const newStudent = {
      name,
      age,
      class: classs,
      dob,
      address,
      schoolId
    };
    // Call the handleAddStudent function passed as a prop
    // to add the new student
    // handleAddStudent(newStudent);
    // Reset the form fields
    axios.post(
      `${process.env.REACT_APP_API_URL}/api/student/store`, newStudent, config
    )
    setName('');
    setAge('');
    setClasss('');
    setDOB('');
    setAddress('');
    setSchoolId('');
  };


  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
      <DialogTitle>Add Student</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Name"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{marginTop:"0.6rem"}}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Class"
              fullWidth
              value={classs}
              onChange={(e) => setClasss(e.target.value)}
              style={{marginTop:"0.6rem"}}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Age"
              fullWidth
              value={age}
              onChange={(e) => setAge(e.target.value)}
              style={{marginTop:"0.6rem"}}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="DOB"
              fullWidth
              value={dob}
              onChange={(e) => setDOB(e.target.value)}
              style={{marginTop:"0.6rem"}}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Address"
              fullWidth
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              style={{marginTop:"0.6rem"}}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleAddClick} color="primary">Add</Button>
      </DialogActions>
    </Dialog>
  );
};


export default AddStudentDialog;


