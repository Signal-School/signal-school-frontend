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


const AddTeacherDialog = ({ open, handleClose, handleAddTeacher }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');


  const handleAddClick = () => {
    // Create a new teacher object
    const newTeacher = {
      name,
      email,
      phone,
      password,
    };
    // Call the handleAddTeacher function passed as a prop
    // to add the new teacher
    handleAddTeacher(newTeacher);
    // Reset the form fields
    setName('');
    setEmail('');
    setPhone('');
    setPassword('');
  };


  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
      <DialogTitle>Add Teacher</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Name"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{marginTop:"0.5rem"}}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{marginTop:"0.6rem"}}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Phone"
              fullWidth
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              style={{marginTop:"0.6rem"}}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Password"
              type="password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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


export default AddTeacherDialog;


