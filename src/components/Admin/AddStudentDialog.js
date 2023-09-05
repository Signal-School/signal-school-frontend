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

const AddStudentDialog = ({ open, handleClose, handleAddTeacher }) => {

  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [grade, setGrade] = useState('');

  const handleAddClick = () => {
    // Create a new student object
    const newStudent = {
      name,
      age,
      grade,
    };
    // Call the handleAddStudent function passed as a prop
    // to add the new student
    // handleAddStudent(newStudent);
    // Reset the form fields
    setName('');
    setAge('');
    setGrade('');
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
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Age"
              fullWidth
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Grade"
              fullWidth
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
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
