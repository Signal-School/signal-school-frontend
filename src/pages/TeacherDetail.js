import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import TeacherBasicDetails from "../components/Teacher/TeacherBasicData"; 
import StudentTimeline from "../components/Student/StudentTimeline"; 
import axios from "axios";
import { Avatar, IconButton } from "@mui/material";
import Skeleton from '@mui/material/Skeleton';
import AcademicDetails from "../components/Student/AcademicDetails"; 

const academicData = [
    {
    "1st Grade": {
        "No of Students": "30",
        "Subject Taught": "English",
        "Overall Grade": "A"
    },
    "2nd Grade": {
        "No of Students": "26",
        "Subject Taught": "Maths",
        "Overall Grade": "B"
    },
    "3rd Grade": {
        "No of Students": "32",
        "Subject Taught": "Science",
        "Overall Grade": "A+"
    }
    },
    {
    "English": {
        "Grade": "B",
        "Credits": 3,
        "Professor": "Dr. Wilson"
    },
    "Physics": {
        "Grade": "A",
        "Credits": 4,
        "Professor": "Dr. Clark"
    },
    "Chemistry": {
        "Grade": "B-",
        "Credits": 3,
        "Professor": "Dr. Turner"
    }
    }
]

const TeacherDetail = () => {
    const { id } = useParams();
    const [TeacherBasicData, setTeacherBasicData] = useState([]);
    const [basicDetailEditMode, setBasicDetailEditMode] = useState(false);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem('token');
    const params = useParams();

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const schoolData = JSON.parse(localStorage.getItem('schoolData'));
    const schoolId = schoolData._id;
    
    const handleTeacherUpdate = (teacher) => {
        console.log(teacher);
        let subjects = [];
        teacher.subjects.forEach((subject) => {
            if(subject._id){
                subjects.push(subject._id);
            }
        });
        teacher.subjectIds =  [...new Set(subjects)];
        // Remove student.subjects
        delete teacher.subjects;
        teacher.schoolId = schoolId;
        teacher.studentId = params.id;
        console.log(teacher);
        axios.post(`${process.env.REACT_APP_API_URL}/api/teacher/update`, teacher, config)
            .then((res) => {
                console.log(res.data);
                fetchTeacher(); // Call fetchTeacher to update data
                setBasicDetailEditMode(false);
            })
            .catch((err) => {
                console.log(err);
            });

    }

    const fetchTeacher = () => {
        setLoading(true);
        const data = {
            teacherId: params.id
        }
        axios.post(`${process.env.REACT_APP_API_URL}/api/teacher/getTeacherDetails`, data, config)
            .then((res) => {
                setTeacherBasicData(res.data.teacher.BasicDetails);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        fetchTeacher();
    }, []);

    const [currentTab, setCurrentTab] = useState(0);

    const handleTabChange = (event, newValue) => {
        setCurrentTab(newValue);
    };

    return (
        <div>
            <Box sx={{ backgroundColor: '#2B5035', height: '30vh', margin: '0' }}>
                <div style={{ textAlign: 'center', paddingTop: '10px' }}>
                    <Avatar sx={{ width: '100px', height: '100px', margin: 'auto' }}></Avatar>
                    { !loading ? (
                        <h1 style={{ color: '#FFFFFF', }}>{TeacherBasicData.name}</h1>
                    ) : (
                        <div style={{margin: "10px auto", width: "fit-content"}}> <Skeleton variant="text" width={200} height={50} /> </div>
                    )}
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' , marginTop: '-20px'}}>
                        <Tabs value={currentTab} onChange={handleTabChange} indicatorColor="primary">
                            <Tab label="Details" sx={{color: '#fff', '&.Mui-selected': {backgroundColor: '#F5E9BF', color: '#2B5035', borderRadius: '20px', underline: "none"}}} />
                            <Tab label="Timeline" sx={{color: '#fff', '&.Mui-selected': {backgroundColor: '#F5E9BF', color: '#2B5035' , borderRadius: '20px'}}} />
                        </Tabs>
                    </div>
                </div>
            </Box>

            <Box sx={{ backgroundColor: '#F5E9BF', borderRadius: '20px', height: '70vh', marginTop: '-20px', padding: '30px', paddingBottom: '50px' }}>
                {currentTab === 0 && (
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                                <LibraryBooksIcon sx={{ color: '#2B5035', fontSize: '30px', marginBottom: '0.25rem' }}></LibraryBooksIcon>
                                <Typography variant="h5" component="h5" style={{ color: '#2B5035', fontWeight: 'bold', marginLeft: '10px' }}>Basic Details {basicDetailEditMode ? (
                                    <IconButton aria-label="save" onClick={() => handleTeacherUpdate(TeacherBasicData)}>
                                        <SaveIcon sx={{ color: '#2B5035' }} />
                                    </IconButton>
                                ) : (
                                    <IconButton
                                        aria-label="edit"
                                        onClick={() => setBasicDetailEditMode(true)}
                                    >
                                        <EditIcon sx={{ color: '#2B5035' }} />
                                    </IconButton>
                                )}
                                </Typography>
                            </div>
                        </div>
                        <TeacherBasicDetails teacher={TeacherBasicData} editMode={basicDetailEditMode} setTeacher={setTeacherBasicData} loading={loading} />
                        <div style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
                            <AcademicDetails academicData={academicData} />
                        </div>
                    </div>
                )}

                {currentTab === 1 && (
                    <div>
                        <StudentTimeline />
                    </div>
                )}
            </Box>
        </div>  
    );
}

export default TeacherDetail;
