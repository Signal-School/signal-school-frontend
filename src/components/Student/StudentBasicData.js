import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  Chip,
  Button, // Import Button from MUI
  TextField,
  Skeleton,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import Autocomplete from "@mui/material/Autocomplete";
import axios from "axios";

const StudentBasicDetails = (props) => {
  const { student, editMode, setStudent, loading } = props;
 const token = localStorage.getItem('token');
  const tableRowStyle = {
    height: "50px", // Set a fixed height for the rows
  };

  const inputCellStyle = {
    height: "100%", // Set a fixed height for the cell containing the input
  };

  const [newSubject, setNewSubject] = useState(""); // State for the new subject input
  const [subjectsList, setSubjectsList] = useState([]); // State for the subjects list


  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  // Function to fetch subjects from your API (replace with your actual API endpoint)
  const fetchSubjects = async () => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/subject/`, config)
    .then((res) => {
      console.log(res.data.response);
      setSubjectsList(res.data.response);
    })
    .catch((err) => {
      console.log(err);
    });

    // setSubjectsList([
    //   { name: "Maths", id: 1 },
    //   { name: "Science", id: 2 },
    //   { name: "English", id: 3 },
    //   { name: "Hindi", id: 4 },
    //   { name: "Social Science", id: 5 },
    // ]);
  };

  useEffect(() => {
    // Fetch subjects when the component mounts
    fetchSubjects();
  }, []);

  //format date
  const formatMyDate = (date) => {
    //format in "yyyy-MM-dd".
    let d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

      if (month.length < 2)
      month = "0" + month;
    if (day.length < 2)
      day = "0" + day;

      return [year, month, day].join("-");
  };


  // Function to add a subject to the student's subjects list
  const addSubject = () => {
    if (newSubject.trim() !== "") {
      // Find the subject object from subjectsList based on the name
      const selectedSubject = subjectsList.find((subject) => subject.name === newSubject);
      if (selectedSubject) {
        setStudent({
          ...student,
          subjects: [
            ...student.subjects,
            { name: selectedSubject.name, _id: selectedSubject._id },
          ],
        });
        setNewSubject(""); // Clear the input field
      }
    }
  };

  // Function to remove a subject from the student's subjects list
  const removeSubject = (subjectId) => {
    const updatedSubjects = student.subjects.filter(
      (subject) => subject._id !== subjectId
    );
    setStudent({
      ...student,
      subjects: updatedSubjects,
    });
  };

  return (
    <TableContainer component={Paper} sx={{ backgroundColor: "#f1f1f180" }}>
      <Table>
        <TableHead>
          <TableRow style={tableRowStyle}>
            <TableCell>Field</TableCell>
            <TableCell>Value</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow style={tableRowStyle}>
            <TableCell>Class:</TableCell>
            <TableCell>
              {editMode ? (
                <TextField
                  variant="outlined"
                  value={student.class}
                  onChange={(e) =>
                    setStudent({ ...student, class: e.target.value })
                  }
                  size="small"
                  sx={inputCellStyle} // Apply fixed height to the cell containing the input
                />
              ) : (
                loading ? (
                  <Skeleton variant="text"  width={100} height={30} />
                ) : (
                <span>{student.class}</span>
                )
              )}


            </TableCell>
          </TableRow>
          <TableRow style={tableRowStyle}>
            <TableCell>Age:</TableCell>
            <TableCell>
              {editMode ? (
                <TextField
                  variant="outlined"
                  value={student.age}
                  onChange={(e) =>
                    setStudent({ ...student, age: e.target.value })
                  }
                  size="small"
                  sx={inputCellStyle} // Apply fixed height to the cell containing the input
                />
              ) : (
                 loading  ? (
                  <Skeleton variant="text"  width={100} height={30} />
                ) : (
                <span>{student.age}</span>
                )
              )}
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
          <TableRow style={tableRowStyle}>
            <TableCell>Date of Birth:</TableCell>
            <TableCell>
              {editMode ? (
                <TextField
                  variant="outlined"
                  value={formatMyDate(student.dob)}
                  onChange={(e) =>
                    setStudent({ ...student, dob: e.target.value })
                  }
                  size="small"
                  type="date"
                  sx={inputCellStyle} // Apply fixed height to the cell containing the input
                />
              ) : (
                 loading  ? (
                  <Skeleton variant="text"  width={100} height={30} />
                ) : (
                <span>{formatMyDate(student.dob)}</span>
                )
              )}
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
          <TableRow style={tableRowStyle}>
            <TableCell>Address:</TableCell>
            <TableCell>
              {editMode ? (
                <TextField
                  variant="outlined"
                  value={student.address}
                  onChange={(e) =>
                    setStudent({ ...student, address: e.target.value })
                  }
                  size="small"
                  sx={inputCellStyle} // Apply fixed height to the cell containing the input
                />
              ) : (
                 loading  ? (
                  <Skeleton variant="text"  width={100} height={30} />
                ) : (
                <span>{student.address}</span>
                )
              )}
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
          <TableRow style={tableRowStyle}>
            <TableCell>Subject:</TableCell>
            <TableCell colSpan={2}>
              
              {editMode ? (
                <>
                  <>
                {student.subjects.map((subject) => (
                  <Chip
                    key={subject._id}
                    label={subject.name}
                    onDelete={() => removeSubject(subject._id)} // Delete function here
                    style={{
                      backgroundColor: "#2B5035",
                      color: "#FFFFFF",
                      borderRadius: "10px",
                      padding: "0.25rem 0.5rem 0.1rem 0.5rem",
                      margin: "5px",
                      textAlign: "center",
                      display: "inline-block",
                    }}
                  />
                ))}
              </>
                  <Autocomplete
                    id="subject-autocomplete"
                    options={subjectsList.map((subject) => subject.name)}
                    value={newSubject}
                    onChange={(event, newValue) => setNewSubject(newValue)}
                    filterOptions={(options, state) => {
                      return options.filter(
                        (option) =>
                          option.toLowerCase().includes(state.inputValue.toLowerCase())
                      );
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Subject"
                        variant="outlined"
                        size="small"
                        sx={{
                          width: "200px", // Adjust the width of the input field
                        }}
                      />
                    )}
                  />
                  <Button
                    variant="outlined"
                    onClick={addSubject}
                    sx={{
                      margin: "8px 0", // Add some spacing to the button
                    }}
                  >
                    Add
                  </Button>
                </>
              ):(!loading ? (
              <>
                {student.subjects.map((subject) => (
                  <Chip
                    key={subject._id}
                    label={subject.name}
                    style={{
                      backgroundColor: "#2B5035",
                      color: "#FFFFFF",
                      borderRadius: "10px",
                      padding: "0.25rem 0.5rem 0.1rem 0.5rem",
                      margin: "5px",
                      textAlign: "center",
                      display: "inline-block",
                    }}
                  />
                ))}
              </>)
              :(
                <Skeleton variant="text"  width={100} height={30} />
              )
              )}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default StudentBasicDetails;