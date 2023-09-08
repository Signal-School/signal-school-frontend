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
  IconButton,
  TextField,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import Autocomplete from "@mui/material/Autocomplete";

const StudentBasicDetails = (props) => {
  const { student, editMode, setStudent } = props;

  const tableRowStyle = {
    height: "50px", // Set a fixed height for the rows
  };

  const inputCellStyle = {
    height: "100%", // Set a fixed height for the cell containing the input
  };

  const [newSubject, setNewSubject] = useState(""); // State for the new subject input
  const [subjectsList, setSubjectsList] = useState([]); // State for the subjects list

  // Function to fetch subjects from your API (replace with your actual API endpoint)
  const fetchSubjects = async () => {
    // try {
    //   const response = await fetch("your_api_endpoint_here");
    //   if (response.ok) {
    //     const data = await response.json();
    //     setSubjectsList(data);
    //   } else {
    //     console.error("Failed to fetch subjects");
    //   }
    // } catch (error) {
    //   console.error("Error fetching subjects:", error);
    // }
    setSubjectsList([
        { name: "Maths", id: 1 },
        { name: "Science", id: 2 },
        { name: "English", id: 3 },
        { name: "Hindi", id: 4 },
        { name: "Social Science", id: 5 },
    ]);     
  };

  useEffect(() => {
    // Fetch subjects when the component mounts
    fetchSubjects();
  }, []);

  // Function to add a subject to the student's subjects list
  const addSubject = () => {
    if (newSubject.trim() !== "") {
      setStudent({
        ...student,
        subjects: [...student.subjects, { name: newSubject, id: Date.now() }],
      });
      setNewSubject(""); // Clear the input field
    }
  };

  // Function to remove a subject from the student's subjects list
  const removeSubject = (subjectId) => {
    const updatedSubjects = student.subjects.filter(
      (subject) => subject.id !== subjectId
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
                <span>{student.class}</span>
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
                <span>{student.age}</span>
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
                  value={student.dob}
                  onChange={(e) =>
                    setStudent({ ...student, dob: e.target.value })
                  }
                  size="small"
                  type="date"
                  sx={inputCellStyle} // Apply fixed height to the cell containing the input
                />
              ) : (
                <span>{student.dob}</span>
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
                <span>{student.address}</span>
              )}
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
          <TableRow style={tableRowStyle}>
            <TableCell>Subject:</TableCell>
            <TableCell colSpan={2}>
              {editMode ? (
                <div>
                  <div>
                    {student.subjects.map((subject) => (
                      <Chip
                        key={subject.id}
                        label={subject.name}
                        onDelete={() => removeSubject(subject.id)}
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
                  </div>
                  <div>
                    <Autocomplete
                      id="subject-autocomplete"
                      options={subjectsList.map((subject) => subject.name)}
                      value={newSubject}
                      onChange={(event, newValue) => setNewSubject(newValue)}
                      renderInput={(params) => <TextField {...params} label="Subject" variant="outlined" />}
                    />
                    <IconButton onClick={addSubject}>
                      <CancelIcon />
                    </IconButton>
                  </div>
                </div>
              ) : (
                <span>No subjects</span>
              )}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default StudentBasicDetails;