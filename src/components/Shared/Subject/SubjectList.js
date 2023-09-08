import { Paper, Typography } from "@mui/material";
import React  from "react";

const SubjectList = (props) => {
    const {subjectList} = props;
    return (
        <div>
            <Paper elevation={3} style={{padding: '20px', margin: '20px', backgroundColor: '#ffffff73'}}>
                <div>
             <span style={{padding: '10px 0 10px 10px', fontWeight: 'bold'}}>Name: </span>
             <span style={{padding: '10px 10px 10px 0'}}>Science</span>
             </div>
                <div>
            <span style={{padding: '10px 0 10px 10px', fontWeight: 'bold'}}>Class: </span>
                <span style={{padding: '10px 10px 10px 0'}}>8</span>
                </div>
                <div>
            <span style={{padding: '10px 0 10px 10px', fontWeight: 'bold'}}>Detail: </span>
                <span style={{padding: '10px 10px 10px 0'}}>Science is best subject blah </span>
                </div>
            </Paper>
        </div>
    );
}

export default SubjectList;

