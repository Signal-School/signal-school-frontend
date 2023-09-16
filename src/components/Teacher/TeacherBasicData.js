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
  Button,
  TextField,
  Skeleton,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import Autocomplete from "@mui/material/Autocomplete";
import axios from "axios";

const TeacherBasicDetails = (props) => {
  const { teacher, editMode, setTeacher, loading } = props;
  const token = localStorage.getItem("token");
  const tableRowStyle = {
    height: "50px",
  };

  const inputCellStyle = {
    height: "100%",
  };

  const [newSubject, setNewSubject] = useState("");
  const [subjectsList, setSubjectsList] = useState([]);

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const fetchSubjects = async () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/subject/`, config)
      .then((res) => {
        console.log(res.data.response);
        setSubjectsList(res.data.response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  const formatMyDate = (date) => {
    let d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  };

  const addSubject = () => {
    if (newSubject.trim() !== "") {
      const selectedSubject = subjectsList.find(
        (subject) => subject.name === newSubject
      );
      if (selectedSubject) {
        setTeacher({
          ...teacher,
          subjects: [
            ...teacher.subjects,
            { name: selectedSubject.name, _id: selectedSubject._id },
          ],
        });
        setNewSubject("");
      }
    }
  };

  const removeSubject = (subjectId) => {
    const updatedSubjects = teacher.subjects.filter(
      (subject) => subject._id !== subjectId
    );
    setTeacher({
      ...teacher,
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
            <TableCell>Name:</TableCell>
            <TableCell>
              {editMode ? (
                <TextField
                  variant="outlined"
                  value={teacher.name}
                  onChange={(e) =>
                    setTeacher({ ...teacher, name: e.target.value })
                  }
                  size="small"
                  sx={inputCellStyle}
                />
              ) : loading ? (
                <Skeleton variant="text" width={100} height={30} />
              ) : (
                <span>{teacher.name}</span>
              )}
            </TableCell>
          </TableRow>
          <TableRow style={tableRowStyle}>
            <TableCell>Age:</TableCell>
            <TableCell>
              {editMode ? (
                <TextField
                  variant="outlined"
                  value={teacher.age}
                  onChange={(e) =>
                    setTeacher({ ...teacher, age: e.target.value })
                  }
                  size="small"
                  sx={inputCellStyle}
                />
              ) : loading ? (
                <Skeleton variant="text" width={100} height={30} />
              ) : (
                <span>{teacher.age}</span>
              )}
            </TableCell>
          </TableRow>
          <TableRow style={tableRowStyle}>
            <TableCell>Date of Birth:</TableCell>
            <TableCell>
              {editMode ? (
                <TextField
                  variant="outlined"
                  value={formatMyDate(teacher.dob)}
                  onChange={(e) =>
                    setTeacher({ ...teacher, dob: e.target.value })
                  }
                  size="small"
                  type="date"
                  sx={inputCellStyle}
                />
              ) : loading ? (
                <Skeleton variant="text" width={100} height={30} />
              ) : (
                <span>{formatMyDate(teacher.dob)}</span>
              )}
            </TableCell>
          </TableRow>
          <TableRow style={tableRowStyle}>
            <TableCell>Address:</TableCell>
            <TableCell>
              {editMode ? (
                <TextField
                  variant="outlined"
                  value={teacher.address}
                  onChange={(e) =>
                    setTeacher({ ...teacher, address: e.target.value })
                  }
                  size="small"
                  sx={inputCellStyle}
                />
              ) : loading ? (
                <Skeleton variant="text" width={100} height={30} />
              ) : (
                <span>{teacher.address}</span>
              )}
            </TableCell>
          </TableRow>
          <TableRow style={tableRowStyle}>
            <TableCell>Subjects:</TableCell>
            <TableCell colSpan={2}>
              {editMode ? (
                <>
                  {teacher.subjects.map((subject) => (
                    <Chip
                      key={subject._id}
                      label={subject.name}
                      onDelete={() => removeSubject(subject._id)}
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
                          width: "200px",
                        }}
                      />
                    )}
                  />
                  <Button
                    variant="outlined"
                    onClick={addSubject}
                    sx={{
                      margin: "8px 0",
                    }}
                  >
                    Add
                  </Button>
                </>
              ) : !loading ? (
                <>
                  {teacher.subjects.map((subject) => (
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
                </>
              ) : (
                <Skeleton variant="text" width={100} height={30} />
              )}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TeacherBasicDetails;
