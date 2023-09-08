import React, { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import { Avatar } from "@mui/material";
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
  TableRow,
  ListItemAvatar
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import AddStudentDialog from '../Admin/AddStudentDialog'; 
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



const StudentsList = () => {
  const [students, setStudents] = useState([]);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');
  const schoolData = JSON.parse(localStorage.getItem('schoolData'));
  const schoolId = schoolData._id;
  const theme = useTheme();
  const navigate = useNavigate();

  // const handleAddStudent = (newStudent) => {
  //   // Add your logic here to send the new student data to the server
  //   // and update the students list accordingly
  //   // Add school id to the new student object
  //   newStudent.schoolId = schoolId;
  //   console.log('Adding student:', newStudent);
  //   axios
  //     .post(`${process.env.REACT_APP_API_URL}/api/student/store`, newStudent, config)
  //     .then((res) => {
  //       console.log(res.data);
  //       setStudents([...students, res.data]);
  //       alert('Student added successfully');
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });


  //   // Close the Add Student dialog
  //   setOpenAddDialog(false);
  // };


  // const getSubjectList = () => {
  //   axios.post(`${process.env.REACT_APP_API_URL}/api/student/show`, StudentData, {studentId:""})
  // }
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const fetchStudents = async () => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/student/`, config)
      .then((res) => {
       setStudents(res.data.response);
       setLoading(false);
       console.log(students);
      }
      )
      .catch((err) => {
        console.log(err);
      }
      );

  };

  useEffect(() => {
   


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
          sx={{margin:'1.5rem'}}
        >
          Add Student
        </Button>
      </Box>
      <Grid style={{paddingLeft:'1rem',paddingRight:'1rem'}} container spacing={2}>
        <Grid item xs={12}>
          <Paper sx={{backgroundColor: theme.palette.primary.main}}>
            <List>
              {!loading && students.map((student) => (
                <React.Fragment key={student._id} >
                  <ListItem onClick={() => navigate(`/student/student-detail/${student._id}`)} style={{cursor:'pointer'}}>
                    <ListItemAvatar>
                      <Avatar sx={{width: '60px', height: '60px', margin: 'auto' }}></Avatar>
                    </ListItemAvatar>
                    <ListItemText 
                      primary="ID" 
                      secondary={student._id} 
                      primaryTypographyProps={{
                        fontSize: 22,
                        color: theme.palette.primary.darkGrey,
                      }}
                      secondaryTypographyProps={{
                        fontSize: 15,
                        color: 'green',
                      }}
                      align="center" 
                    />
                    <ListItemText 
                      primary="Name"  
                      secondary={student.name}
                      primaryTypographyProps={{
                        fontSize: 22,
                        color: theme.palette.primary.darkGrey,
                      }}
                      secondaryTypographyProps={{
                        fontSize: 15,
                        color: 'green',
                      }}
                      align="center" 
                    />
                    <ListItemText 
                      primary="Age"  
                      secondary={student.age}
                      primaryTypographyProps={{
                        fontSize: 22,
                        color: theme.palette.primary.darkGrey,
                      }}
                      secondaryTypographyProps={{
                        fontSize: 15,
                        color: 'green',
                      }}
                      align="center" 
                    />
                    <ListItemText 
                      primary="Class" 
                      secondary={student.class}
                      primaryTypographyProps={{
                        fontSize: 22,
                        color: theme.palette.primary.darkGrey,
                      }}
                      secondaryTypographyProps={{
                        fontSize: 15,
                        color: 'green',
                      }}
                      align="center" 
                    />
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
            </List>



            {/* <TableContainer component={Paper} >
              <Table sx={{ minWidth: 650 ,backgroundColor: theme.palette.primary.main}} aria-label="simple table">
                <TableHead>
                  <TableRow>
                  <TableCell sx={{color: theme.palette.primary.contrastText,fontWeight:'bold',fontSize:16}} align="left"></TableCell>
                    <TableCell sx={{color: theme.palette.primary.contrastText,fontWeight:'bold',fontSize:16}} align="left">ID</TableCell>
                    <TableCell sx={{color: theme.palette.primary.contrastText,fontWeight:'bold',fontSize:16}} align="left">Name</TableCell>
                    <TableCell sx={{color: theme.palette.primary.contrastText,fontWeight:'bold',fontSize:16}} align="left">Age</TableCell>
                    <TableCell sx={{color: theme.palette.primary.contrastText,fontWeight:'bold',fontSize:16}} align="left">Class</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {students.map((student) => (
                    <TableRow
                      key={student._id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell sx={{color: theme.palette.primary.contrastText}} component="th" scope="row" style={{width:"40px"}}>
                        <Avatar sx={{width: '60px', height: '60px', margin: 'auto' }}></Avatar>
                      </TableCell>
                      <TableCell sx={{color: theme.palette.primary.contrastText,fontWeight:'bold',fontSize:16}} align="left">{student._id}</TableCell>
                      <TableCell sx={{color: theme.palette.primary.contrastText}} align="left">{student.name}</TableCell>
                      <TableCell sx={{color: theme.palette.primary.contrastText}} align="left">{student.age}</TableCell>
                      <TableCell sx={{color: theme.palette.primary.contrastText}} align="left">{student.class}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer> */}



          </Paper>
        </Grid>
      </Grid>
      <AddStudentDialog open={openAddDialog} handleClose={() => setOpenAddDialog(false)}  />
    </div>
  );
};


export default StudentsList;


