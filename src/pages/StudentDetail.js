import { Avatar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useParams } from "react-router";
import StudentBasicDetails from "../components/Student/StudentBasicData";
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import SchoolIcon from '@mui/icons-material/School';
import AcademicDetails from "../components/Student/AcademicDetails";

const StudentDetail = () => {
    const { id } = useParams();
    let student = {
        "name": "Nimish Tiwari",
        "class": "8",
        "age": 14,
        "dob": "2008-05-10",
        "address": "Mumbai, Maharashtra",
        subjects: ['Maths', 'Science', 'English', 'Hindi', 'Social Science']
    }
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

    return (
        <div>
            <Box sx={{backgroundColor: '#2B5035', height: '30vh', margin: '0'}}>
            <div style={{textAlign: 'center', paddingTop: '10px'}}>
                <Avatar sx={{width: '100px', height: '100px', margin: 'auto' }}></Avatar>
                <h1 style={{color: '#FFFFFF', }}>{student.name}</h1>
               </div>
            </Box>
            <Box sx={{backgroundColor: '#F5E9BF', borderRadius: '20px', height: '70vh', marginTop: '-20px', padding: '30px',paddingBottom:'50px'}}>
                <div>
                    <div style={{display: 'flex', alignItems: 'center', marginBottom: '10px'}}>
                    <LibraryBooksIcon sx={{color: '#2B5035', fontSize: '30px',marginBottom:'0.25rem'}}></LibraryBooksIcon>
                    <Typography variant="h5" component="h5" style={{color: '#2B5035', fontWeight: 'bold', marginLeft: '10px'}}>Basic Details</Typography>                    </div>
                    <StudentBasicDetails student={student} />
                </div>
                <div style={{marginTop: '20px'}}>
                    <div style={{display: 'flex', alignItems: 'center', marginBottom: '10px'}}>
                    <SchoolIcon sx={{color: '#2B5035', fontSize: '30px',marginBottom:'0.25rem'}}></SchoolIcon>
                    <Typography variant="h5" component="h5" style={{color: '#2B5035', fontWeight: 'bold', marginLeft: '10px'}}>Academic Details</Typography>                    </div>
                    <AcademicDetails academicData={AcademicData} />
                </div>

                

            </Box>
        </div>
    );
    }

    

export default StudentDetail;



