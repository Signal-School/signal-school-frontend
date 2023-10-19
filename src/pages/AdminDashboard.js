import { Box, Card, CardContent, Grid, Paper, Typography, useMediaQuery } from '@mui/material';
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import React from 'react';
import { Line } from 'react-chartjs-2';

const AdminDashboard = () => {

  // const fetchSchoolData = async () => {
  //   try {
  //     await new Promise((resolve) => setTimeout(resolve, 1000));
  //     setTeachers(dummyTeachers);
  //     setStudents(dummyStudents);
  //     setLoading(false);
  //   } catch (error) {
  //     console.log('Error fetching school data:', error);
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchSchoolData();
  // }, []);

  // if (loading) {
  //   return (
  //     <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
  //       <CircularProgress />
  //     </Box>
  //   );
  // }

  const activeSchool = 'Signal School'

  const attendanceData = [
    { date: '01-Oct', attendance: getRandomAttendance(0, 50) },
    { date: '02-Oct', attendance: getRandomAttendance(0, 50) },
    { date: '03-Oct', attendance: getRandomAttendance(0, 50) },
    { date: '04-Oct', attendance: getRandomAttendance(0, 50) },
    { date: '05-Oct', attendance: getRandomAttendance(0, 50) },
    { date: '06-Oct', attendance: getRandomAttendance(0, 50) },
    { date: '07-10', attendance: getRandomAttendance(0, 50) },
    { date: '08-Oct', attendance: getRandomAttendance(0, 50) },
    { date: '09-Oct', attendance: getRandomAttendance(0, 50) },
    { date: '10-Oct', attendance: getRandomAttendance(0, 50) },
  ];

  function getRandomAttendance(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  const chartData = {
    labels: attendanceData.map((data) => data.date),
    datasets: [
      {
        label: 'Attendance',
        data: attendanceData.map((data) => data.attendance),
        borderColor: 'rgba(80, 80, 80)',
        backgroundColor: 'green',
        pointRadius: 4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        height: 1,
      },
      // title: {
      //   display: true,
      //   text: 'Daily Attendance',
      //   fontSize: 30,
      // },
    },
  };

  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const chartHeight = isSmallScreen ? '13rem' : '17rem';
  const paperWidth = isSmallScreen ? '85%' : '90%';
  const flexDirection = isSmallScreen ? 'column' : 'row';
  const cardWidth = isSmallScreen ? '98%' : '45%';
  const cardHeight = isSmallScreen ? '11rem' : '10rem';
  const cardFont = isSmallScreen ? 'h4' : 'h3';
  const cardMargin = isSmallScreen ? '1.5rem auto' : '0.5rem';

  return (
    <Grid container justifyContent="center" alignItems="center" style={{marginTop: '3rem'}}>
      <Grid item style={{ width: '80vw'}}>
        <Box mt={2} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: flexDirection, padding: '2rem 0' }}>
          <Card style={{ width: cardWidth, 'height': cardHeight, margin: '1rem auto' }}>
            <CardContent>
              <Typography variant={cardFont} component="div" style={{ textAlign: 'center', margin: cardMargin }}>
                Students Present
              </Typography>
              <Typography variant={cardFont} component="div" style={{ textAlign: 'center', fontWeight: '700' }}>
                50
              </Typography>
            </CardContent>
          </Card>
          <Card style={{ width: cardWidth, height: cardHeight, margin: '1rem auto' }}>
            <CardContent>
              <Typography variant={cardFont} component="div" style={{ textAlign: 'center', margin: cardMargin }}>
                Teachers Present
              </Typography>
              <Typography variant={cardFont} component="div" style={{ textAlign: 'center', fontWeight: '700' }}>
                8
              </Typography>
            </CardContent>
          </Card>
        </Box>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Paper elevation={3} style={{ padding: '2rem', textAlign: 'center', width: paperWidth }}>
            <Typography variant={isSmallScreen ? 'h6' : 'h4'} component="h3" gutterBottom>
              Daily Attendance for {activeSchool}
            </Typography>
            {attendanceData.length === 0 ? (
              <Typography variant="body1">No attendance data available.</Typography>
            ) : (
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', marginTop: '2rem' }}>
                <Line data={chartData} options={chartOptions} style={{ maxHeight: chartHeight, width: '100%', maxWidth: '100%' }} />
              </div>
            )}
          </Paper>
        </div>
      </Grid>
    </Grid>
  );
};

export default AdminDashboard;
