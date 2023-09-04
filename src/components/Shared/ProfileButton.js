import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from '@mui/icons-material/Logout';
import { Link, useNavigate, useLocation } from "react-router-dom";
import Avatar from '@mui/material/Avatar';

const StyledMenu = styled((props) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        {...props}
    />
))(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 250,

        color:
            theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
        boxShadow:
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenu-list': {
            padding: '4px 0',
        },
        '& .MuiMenuItem-root': {
            '& .MuiSvgIcon-root': {
                fontSize: 18,
                color: theme.palette.text.secondary,
                marginRight: theme.spacing(1.5),
            },
            '&:active': {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    theme.palette.action.selectedOpacity,
                ),
            },
        },
    },
}));

export default function ProfileButton({ preload }) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const adminData = JSON.parse(localStorage.getItem('adminData'));
    const navigate = useNavigate();
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const logoutHandler = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userType');
        localStorage.removeItem('adminData');
        localStorage.removeItem('teacherData');
        localStorage.removeItem('schoolData');
        window.location.href = '/';
      };

    return (
        <div>
            {
                adminData && <>
                    <Button
                        id="demo-customized-button"
                        aria-controls={open ? 'demo-customized-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        disableElevation
                        onClick={handleClick}
                        endIcon={<KeyboardArrowDownIcon />}
                        style={{ color: "white", margin: "auto" }}
                        fullWidth
                        className="profile-button"
                    >
                        {preload ? <><Avatar src="/broken-image.jpg" /> <span style={{ marginLeft: "0.5rem", fontSize: "1rem" }}>N/A</span></> : <>
                            <img src={`https://avatar.oxro.io/avatar.svg?name=${adminData.name.toUpperCase()}&background=random`} alt="avatar" style={{ width: "2.5rem", marginRight: "0.5rem", borderRadius: "50%" }} />
                            <span style={{
                                textTransform: "lowercase", whiteSpace: "nowrap", width: "8rem", overflow: "hidden",
                                textOverflow: "ellipsis"
                            }}>
                                {adminData.name}
                            </span>
                        </>
                        }
                    </Button>
                    <StyledMenu
                        disableScrollLock={true}
                        id="demo-customized-menu"
                        MenuListProps={{
                            'aria-labelledby': 'demo-customized-button',
                        }}
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={handleClose} disableRipple style={{ margin: "auto" }}>
                            <SettingsIcon style={{ transform: "scale(1.3)", marginRight: "1.5rem" }} />
                            My Account
                        </MenuItem>
                        <Divider sx={{ my: 0.5 }} />
                        <MenuItem disableRipple style={{ margin: "auto" }} onClick={logoutHandler}>
                            <LogoutIcon style={{ transform: "scale(1.3)", marginRight: "1.5rem" }} />
                            Sign out
                        </MenuItem>
                    </StyledMenu>
                </>
            }
        </div>
    );
}