import axios from 'axios';
import { useEffect, useState } from 'react';


const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});


// Intercept request and add authorization header if token is available
// api.interceptors.request.use((config) => {
//   if (authToken) {
//     config.headers['Authorization'] = `Bearer ${authToken}`;
//   }
//   return config;
// });


api.interceptors.request.use((config) => {
  const authToken = localStorage.getItem('token');
  config.headers['Content-Type'] = 'application/json';
  if (authToken) {
    config.headers['Authorization'] = `Bearer ${authToken}`;
  }
  return config;
});


// API functions for authentication
const authAPI = {
  login: (userType, username, password) =>
    api.post(`/${userType}/login`, { username, password }),
  register: (userData) => api.post('/admin/register', userData),
  // Add more authentication-related API functions as needed
};

// API functions for student
const studentAPI = {
  getStudents: (schoolId) => api.get('/api/student', {
    params: {
      schoolId: schoolId,
    },
  }),
  getStudent: (studentId) => api.get(`/api/student/show/${studentId}`),
  addStudent: (studentData) => api.post('/api/student/store', studentData),
  updateStudent: (studentId, studentData) =>
    api.put(`/student/update/${studentId}`, studentData),
  deleteStudent: (studentId) => api.delete(`/api/student/delete/${studentId}`),
  // Add more student-related API functions as needed
};

// API functions for teacher
const teacherAPI = {
  getTeachers: (schoolId) => api.get('/api/teacher', {
    params: {
      schoolId: schoolId,
    },
  }),
  getTeacher: (teacherId) => api.get(`/api/teacher/show/${teacherId}`),
  addTeacher: (teacherData) => api.post('/api/teacher/store', teacherData),
  updateTeacher: (teacherId, teacherData) =>
    api.put(`/teacher/update/${teacherId}`, teacherData),
  deleteTeacher: (teacherId) => api.delete(`/api/teacher/delete/${teacherId}`),
  // Add more teacher-related API functions as needed
};

// API functions for school
const schoolAPI = {
  //get all schools with adminId as parameter and console.log adminId
  getSchools: (adminId) => api.post('/api/school', adminId),
  getSchool: (schoolId, adminId) => api.get('/api/school/show', { adminId: adminId, schoolId: schoolId }),
  addSchool: (schoolData) => api.post('/api/school/add', schoolData),
  updateSchool: (schoolId, schoolData) =>
    api.put(`/school/update/${schoolId}`, schoolData),
  deleteSchool: (schoolId) => api.delete(`/api/school/delete/${schoolId}`),
  changeSchool: (adminId, schoolId) => api.post('/api/school/change', { adminId: adminId, schoolId: schoolId }),
  // Add more school-related API functions as needed
};

const apiService = {
  auth: authAPI,
  student: studentAPI,
  teacher: teacherAPI,
  school: schoolAPI,
};

export default apiService;
