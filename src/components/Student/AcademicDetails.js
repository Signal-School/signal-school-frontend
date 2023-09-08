import { Typography, Card, CardContent, Grid,Box } from "@mui/material";
import React from "react";
import '../../App.css';
const AcademicDetails = ({ academicData }) => {
    const cardStyle = {
        backgroundColor: '#f1f1f180',
        borderRadius: '20px',
        marginBottom: '20px',
        padding: '1rem',
        paddingBottom: '0rem'
    };

    return (
        <div className="flex-container" style={{backgroundColor: '#F5E9BF',display:'flex',flexDirection:'row',flexWrap:'wrap'}} >
            {Object.keys(academicData[0]).map((subject, index) => (
                <Card key={subject} style={cardStyle} sx={{display:'flex',width: "200px",marginRight:'2rem'}}>
                    <CardContent>
                        <Typography variant="h6" component="h6" style={{ fontWeight: 'bold',fontSize:'1.75rem' }}>
                            {subject}
                        </Typography>
                        <Box sx={{padding:'0.5rem'}}>
                            {Object.keys(academicData[0][subject]).map((category, categoryIndex) => (
                                <Box  style={{display:'flex',flexDirection:'column'}}  >
                                    <Typography variant="body1" style={{ fontWeight: 'bold' }}>
                                        {category}
                                    </Typography>
                                    <Typography variant="body2" style={{marginBottom:'1rem'}}>
                                        {academicData[0][subject][category]}
                                    </Typography>
                                </Box>
                            ))}
                        </Box>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}

export default AcademicDetails;
