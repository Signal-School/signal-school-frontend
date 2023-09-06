import { Typography } from "@mui/material";
import React from "react";

const StudentBasicDetails = ({ student }) => {
    return (
        <div style={{ backgroundColor: '#f1f1f180', borderRadius: '20px', padding: '20px' }}>
            
            <Typography variant="h6" component="h6">
                <span style={{ fontWeight: 'bold' }}>Class:</span> {student.class}
            </Typography>
            <Typography variant="h6" component="h6">
                <span style={{ fontWeight: 'bold' }}>Age:</span> {student.age}
            </Typography>
            <Typography variant="h6" component="h6">
                <span style={{ fontWeight: 'bold' }}>Date of Birth:</span> {student.dob}
            </Typography>
            <Typography variant="h6" component="h6">
                <span style={{ fontWeight: 'bold' }}>Address:</span> {student.address}
            </Typography>
            <Typography variant="h6" component="h6" >
                        <span style={{ fontWeight: 'bold' }}>Subject :</span> 
            
            {student.subjects && student.subjects.length > 0 && (
                student.subjects.map((subject, index) => {
                    return (
                        <span key={index}
                        style={{ backgroundColor: '#2B5035', color: '#FFFFFF', borderRadius: '10px', padding: '5px', margin: '5px', textAlign: 'center', display: 'inline-block' }}
                        >{subject}</span>
                    )
                })
            )}

            </Typography>

        </div>
    );
}

export default StudentBasicDetails;
