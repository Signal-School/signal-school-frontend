import React  from "react";

const Logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
    localStorage.removeItem('adminData');
    localStorage.removeItem('teacherData');
    localStorage.removeItem('schoolData');
    window.location.href = '/';

    return (
        <>

        </>
    );
}

export default Logout;
