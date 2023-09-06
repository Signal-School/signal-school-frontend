import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, IconButton, Drawer, List, ListItem, ListItemText, ListItemIcon, Divider, Box } from '@mui/material';
import { Home as HomeIcon, Person as PersonIcon, ExitToApp as LogoutIcon, Menu as MenuIcon, AddBox as AddBoxIcon, Group as GroupIcon, School as SchoolIcon, ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import ProfileButton from './ProfileButton';

const Navbar = (props) => {
  const {schoolName, schoolLocation } = props;
  const location = useLocation();
  const theme = useTheme();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [userRole, setUserRole] = useState('none');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [endDialogOpen, setEndDialogOpen] = useState(false);
  const navigate = useNavigate();

  
  const checkUnauthLocation = (token) => {
    if (!token && location.pathname !== '/admin/login' && location.pathname !== '/teacher/login' && location.pathname !== '/') {
      navigate('/');
    }
  }


  const isCurrentPage = (pathname) => location.pathname === pathname;

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
  };

  const renderTeacherLinks = () => {
    return (
      <>
        <ListItem
          button
          component={Link}
          to="/teacher/dashboard"
          selected={isCurrentPage('/teacher/dashboard')}
        >
          <ListItemIcon sx={{ color: theme.palette.primary.contrastText }}>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Teacher Dashboard" />
        </ListItem>
        <ListItem
          button
          component={Link}
          to="/student/student-list"
          selected={isCurrentPage('/teacher/student-list')}
        >
          <ListItemIcon sx={{ color: theme.palette.primary.contrastText }}>
            <GroupIcon />
          </ListItemIcon>
          <ListItemText primary="Student List" />
        </ListItem>
        {/* <ListItem
          button
          component={Link}
          to="/teacher/add-student"
          selected={isCurrentPage('/teacher/add-student')}
        >
          <ListItemIcon sx={{ color: theme.palette.primary.contrastText }}>
            <AddBoxIcon />
          </ListItemIcon>
          <ListItemText primary="Add Student" />
        </ListItem> */}
      </>
    );
  };

  const renderAdminLinks = () => {
    return (
      <>
        <ListItem
          button
          component={Link}
          to="/admin/dashboard"
          selected={isCurrentPage('/admin/dashboard')}
        >
          <ListItemIcon sx={{ color: theme.palette.primary.contrastText }}>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Admin Dashboard" />
        </ListItem>
        <ListItem
          button
          component={Link}
          to="/admin/school"
          selected={isCurrentPage('/admin/school')}
        >
          <ListItemIcon sx={{ color: theme.palette.primary.contrastText }}>
            <SchoolIcon />
          </ListItemIcon>
          <ListItemText primary="School List" />
        </ListItem>
        <ListItem
          button
          component={Link}
          to="/admin/teacher-list"
          selected={isCurrentPage('/admin/teacher-list')}
        >
          <ListItemIcon sx={{ color: theme.palette.primary.contrastText }}>
            <GroupIcon />
          </ListItemIcon>
          <ListItemText primary="Teacher List" />
        </ListItem>
        {/* <ListItem
          button
          component={Link}
          to="/admin/add-teacher"
          selected={isCurrentPage('/admin/add-teacher')}
        >
          <ListItemIcon sx={{ color: theme.palette.primary.contrastText }}>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary="Add Teacher" />
        </ListItem> */}
        <ListItem
          button
          component={Link}
          to="/student/student-list"
          selected={isCurrentPage('/admin/student-list')}
        >
          <ListItemIcon sx={{ color: theme.palette.primary.contrastText }}>
            <GroupIcon />
          </ListItemIcon>
          <ListItemText primary="Student List" />
        </ListItem>
        {/* <ListItem
          button
          component={Link}
          to="/admin/add-student"
          selected={isCurrentPage('/admin/add-student')}
        >
          <ListItemIcon sx={{ color: theme.palette.primary.contrastText }}>
            <AddBoxIcon />
          </ListItemIcon>
          <ListItemText primary="Add Student" />
        </ListItem> */}
      </>
    );
  };

  const renderNavLinks = () => {
    return (
      <>
        {renderTeacherLinks()}
        {renderAdminLinks()}
        <ListItem
          button
          component={Link}
          to="/logout"
        >
          <ListItemIcon sx={{ color: theme.palette.primary.contrastText }}>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </>
    );
  };

  const renderLinksBasedOnRole = () => {
    if (!isLoggedIn) {
      return (
        <>
          <ListItem
            button
            component={Link}
            to="/admin/login"
            selected={isCurrentPage('/admin/login')}
          >
            <ListItemIcon sx={{ color: theme.palette.primary.contrastText }}>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="Admin Login" />
          </ListItem>
          <ListItem
            button
            component={Link}
            to="/teacher/login"
            selected={isCurrentPage('/teacher/login')}
          >
            <ListItemIcon sx={{ color: theme.palette.primary.contrastText }}>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="Teacher Login" />
          </ListItem>
        </>
      );
    }

    if (userRole === 'admin') {
      return renderAdminLinks();
    } else if (userRole === 'teacher') {
      return renderTeacherLinks();
    }

    return null;
  };

 
  useEffect(() => {
    const userRole = localStorage.getItem('userType');
    setUserRole(userRole);
    localStorage.getItem('token') ? setIsLoggedIn(true) : setIsLoggedIn(false);
    checkUnauthLocation(localStorage.getItem('token'));
  }, [location]);

  

  
  


  return (
    <AppBar position="static" color="primary">
      <Toolbar>
      <Drawer
          variant="temporary"
          anchor="left"
          open={drawerOpen}
          onClose={closeDrawer}
          PaperProps={{
            sx: {
              width: 250,
              color: theme.palette.primary.contrastText,
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
              backdropFilter: 'blur(10px)',
              paddingTop: 0,
            },
          }}
        >
          <List>
            <ListItem
              button
              onClick={closeDrawer}
            >
              <ListItemIcon sx={{ color: theme.palette.primary.contrastText }}>
                <ArrowBackIcon  />
              </ListItemIcon>
              <ListItemText primary="Close" />
            </ListItem>
          </List>
          <Divider />
          <List>
            {renderLinksBasedOnRole()}
          </List>
        </Drawer>
        <IconButton
          color="inherit"
          aria-label="menu"
          edge="end"
          onClick={toggleDrawer}
        >
          {drawerOpen ? <ArrowBackIcon /> : <MenuIcon />}
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, marginLeft: 2 }}>
          {schoolName} - {schoolLocation}
        </Typography>
        <IconButton
          component={Link}
          to="/"
          edge="end"
          color="inherit"
          aria-label="home"
          sx={{ marginLeft: 2 }}
        >
          <HomeIcon />
        </IconButton>
        
     <ProfileButton />

      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
