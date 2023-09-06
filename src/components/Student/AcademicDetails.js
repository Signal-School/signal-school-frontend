import { Typography, Card, CardContent, Grid } from "@mui/material";
import React from "react";

const AcademicDetails = ({ academicData }) => {
    const cardStyle = {
        backgroundColor: '#f1f1f1',
        borderRadius: '20px',
        marginBottom: '20px',
    };

    return (
        <div>
            {Object.keys(academicData[0]).map((subject, index) => (
                <Card key={index} style={cardStyle}>
                    <CardContent>
                        <Typography variant="h6" component="h6" style={{ fontWeight: 'bold' }}>
                            {subject}
                        </Typography>
                        <Grid container spacing={1}>
                            {Object.keys(academicData[0][subject]).map((category, categoryIndex) => (
                                <Grid item xs={6} key={categoryIndex}>
                                    <Typography variant="body1" style={{ fontWeight: 'bold' }}>
                                        {category}:
                                    </Typography>
                                    <Typography variant="body1">
                                        {academicData[0][subject][category]}
                                    </Typography>
                                </Grid>
                            ))}
                        </Grid>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}

export default AcademicDetails;
