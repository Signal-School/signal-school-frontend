import { Avatar, IconButton, Skeleton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import StudentBasicDetails from "../components/Student/StudentBasicData";
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import SchoolIcon from '@mui/icons-material/School';
import AcademicDetails from "../components/Student/AcademicDetails";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import axios from "axios";

// let student = {
//     "name": "Nimish Tiwari",
//     "class": "8",
//     "age": 14,
//     "dob": "2008-05-10",
//     "address": "Mumbai, Maharashtra",
//     "subjects": [
//         {
//             "name": "Maths",
//             "id": "1",
//         },
//         {
//             "name": "Science",
//             "id": "2",
//         },
//         {
//             "name": "English",
//             "id": "3",
//         },
//         {
//             "name": "Hindi",
//             "id": "4",
//         },
//         {
//             "name": "Social Science",
//             "id": "5",
//         },
//         {
//             "name": "Computer",
//             "id": "6",
//         },
//         {
//             "name": "Physics",
//             "id": "7",
//         }
//     ]
// }
let AcademicData = [
    {
        "Maths": {
            "Speaking": "Good",
            "Writing": "Good",
            "Reading": "Good"
        },
        "Science": {
            "Speaking": "Good",
            "Writing": "Good",
            "Practical": "Good"
        },
        "English": {
            "Speaking": "Good",
            "Writing": "Good",
            "Reading": "Good"
        },
    }
]


const StudentDetail = () => {
    const { id } = useParams();
    const [StudentBasicData, setStudentBasicData] = useState([]);
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
    
    const handleStudentUpdate = (student) => {
        console.log(student);
          let subjects = [];
        student.subjects.forEach((subject) => {
            if(subject._id){
                subjects.push(subject._id);
            }
        });
        student.subjectIds =  [...new Set(subjects)];
        //rmoeve sutdent.subjects
        delete student.subjects;
        student.schoolId = schoolId;
        student.studentId = params.id;
        console.log(student);
        axios.post(`${process.env.REACT_APP_API_URL}/api/student/update`, student, config)
            .then((res) => {
                console.log(res.data);
                fetchStudent();
                setBasicDetailEditMode(false);
            }
            )
            .catch((err) => {
                console.log(err);
            }
            );

    }

    const fetchStudent = () => {
        setLoading(true);
        const data = {
            studentId: params.id
        }
        axios.post(`${process.env.REACT_APP_API_URL}/api/student/getStudentDetails`, data, config)
            .then((res) => {
                setStudentBasicData(res.data.student.BasicDetails);
                setLoading(false);
            }
            )
            .catch((err) => {
                console.log(err);
            }
            );
    };

    useEffect(() => {
        fetchStudent();
    }, []);

    
    return (
        <div>
            <Box sx={{ backgroundColor: '#2B5035', height: '30vh', margin: '0' }}>
                <div style={{ textAlign: 'center', paddingTop: '10px' }}>
                    <Avatar sx={{ width: '100px', height: '100px', margin: 'auto' }}></Avatar>
                    {/* <h1 style={{ color: '#FFFFFF', }}></h1> */}
                    {
                        !loading ? (
                            <h1 style={{ color: '#FFFFFF', }}>{StudentBasicData.name}</h1>
                        ) : (
                           <div style={{margin: "10px auto", width: "fit-content"}}> <Skeleton variant="text" width={200} height={50} /> </div>
                        )
                    }
                </div>
            </Box>
            <Box sx={{ backgroundColor: '#F5E9BF', borderRadius: '20px', height: '70vh', marginTop: '-20px', padding: '30px', paddingBottom: '50px' }}>
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                        <LibraryBooksIcon sx={{ color: '#2B5035', fontSize: '30px', marginBottom: '0.25rem' }}></LibraryBooksIcon>
                        <Typography variant="h5" component="h5" style={{ color: '#2B5035', fontWeight: 'bold', marginLeft: '10px' }}>Basic Details {basicDetailEditMode ? (
                            <IconButton aria-label="save" onClick={() => handleStudentUpdate(StudentBasicData)}>
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

                    <StudentBasicDetails student={StudentBasicData} editMode={basicDetailEditMode} setStudent={setStudentBasicData} loading={loading} />
                </div>
                {/* <div style={{ marginTop: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                        <SchoolIcon sx={{ color: '#2B5035', fontSize: '30px', marginBottom: '0.25rem' }}></SchoolIcon>
                        <Typography variant="h5" component="h5" style={{ color: '#2B5035', fontWeight: 'bold', marginLeft: '10px' }}>Academic Details</Typography>                    </div>
                    <AcademicDetails academicData={AcademicData} />
                </div> */}



            </Box>
        </div>
    );
}



export default StudentDetail;



