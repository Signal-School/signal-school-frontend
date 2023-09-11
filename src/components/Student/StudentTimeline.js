import React from 'react';
import { Paper, Typography } from '@mui/material';
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot } from '@mui/lab';

const dummyData = [
  {
    day: 'Monday',
    activities: ['Learned ABC', 'Learned Addition'],
  },
  {
    day: 'Tuesday',
    activities: ['Learned Shapes', 'Learned Subtraction'],
  },
  {
    day: 'Wednesday',
    activities: ['Learned Colors', 'Practice Multiplication'],
  },
  {
    day: 'Thursday',
    activities: ['Learned Numbers', 'Solve Math Problems'],
  },
  {
    day: 'Friday',
    activities: ['Learned Vocabulary', 'Read a Book'],
  },
  {
    day: 'Saturday',
    activities: ['Science Experiments', 'Write an Essay'],
  },
  {
    day: 'Sunday',
    activities: ['Outdoor Activities', 'Review Week\'s Work'],
  },
];

function StudentLearningPath() {
  return (
    <Paper elevation={3} style={{ padding: '20px', width: '400px', margin:"auto", backgroundColor: "#f1f1f180" }}>
      <Typography variant="h5" gutterBottom>
        Student Learning Path (1 Week)
      </Typography>
      <Timeline>
        {dummyData.map((dayData, index) => (
          <TimelineItem key={index}>
            <TimelineSeparator>
              <TimelineDot />
              {index < dummyData.length - 1 && <TimelineConnector />}
            </TimelineSeparator>
            <TimelineContent>
              <Typography variant="subtitle1">{dayData.day}</Typography>
              <Typography variant="body2" color="textSecondary">
                {dayData.activities.join(', ')}
              </Typography>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </Paper>
  );
}

export default StudentLearningPath;
