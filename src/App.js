import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import Navbar from './components/Shared/Navbar';
import PrivateRoute from './components/Shared/PrivateRoute';
import Home from './pages/Home';
import AdminLogin from './pages/AdminLogin';
import TeacherLogin from './pages/TeacherLogin';
import AdminDashboard from './pages/AdminDashboard';
import TeacherDashboard from './pages/TeacherDashboard';
import TeacherDetail from './pages/TeacherDetail';
import StudentDetail from './pages/StudentDetail';
import theme from './theme';
import School from './pages/School';
import TeacherList from './components/Admin/TeacherList';
import StudentList from './components/Student/StudentList';
import Logout from './Logout';
import Subject from './pages/Subject';



const App = () => {
  const [schoolName, setSchoolName] = useState('Please select a school');
  const [schoolLocation, setSchoolLocation] = useState('');
  const [showNav, setShowNav] = useState(true);


  const location = useLocation();
  const checkNavLocation = () => {
    if (location.pathname === '/admin/login' || location.pathname === '/teacher/login') {
      setShowNav(false);
    } else {
      setShowNav(true);
    }
    if (location.pathname === '/') {
      setSchoolName('My School');
    }
    console.log(location.pathname);

  }


  useEffect(() => {
    const schoolData = JSON.parse(localStorage.getItem('schoolData'));
    if (schoolData) {
      setSchoolName(schoolData.name);
      setSchoolLocation(schoolData.location);
    }
    checkNavLocation();
  }, [location]);
  return (
    <ThemeProvider theme={theme}>
      {
        //show nav if showNav is true
        showNav && <Navbar schoolName={schoolName} schoolLocation={schoolLocation} />
      }

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/teacher/login" element={<TeacherLogin />} />
        <Route path="/teacher/teacher-detail/:id" element={<TeacherDetail />} />
        <Route path="/student/student-list" element={<StudentList />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/school" element={<School />} />
        <Route path="/admin/teacher-list" element={<TeacherList />} />
        <Route path="/student/student-detail/:id" element={<StudentDetail />} />
        <Route path="/student/subject" element={<Subject />} />

        {/* <PrivateRoute path="/admin/dashboard" element={<AdminDashboard />} />
          <PrivateRoute path="/teacher/dashboard" element={<TeacherDashboard />} />
          <PrivateRoute path="/teacher/:id" element={<TeacherDetail />} />
          <PrivateRoute path="/student/:id" element={<StudentDetail />} /> */}
        {/* Add more routes for other pages */}
        <Route path='/logout' element={<Logout/>} />

        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>

    </ThemeProvider>
  );
};

export default App;
