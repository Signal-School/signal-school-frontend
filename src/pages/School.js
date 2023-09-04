import React, { useEffect, useState } from 'react';
import { Tabs, Tab } from '@mui/material';
import SchoolList from '../components/Admin/SchoolList';
import CreateSchool from '../components/Admin/CreateSchool';

const School = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <div>
      <Tabs value={activeTab} onChange={handleTabChange}>
        <Tab label="School List" />
        <Tab label="Create New School" />
      </Tabs>
      {activeTab === 0 && <SchoolList />}
      {activeTab === 1 && <CreateSchool />}
    </div>
  );
};

export default School;
