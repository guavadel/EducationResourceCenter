// src/pages/StudentResourcesIndexPage.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useFetchStudentResources from '../../components/hooks/fetchStudentResources';
import useHandleViewResource from '../../components/hooks/HandleViewResources'; // Handle view logic for students
import RenderStudentResources from '../../components/ResourcesAssets/RenderStudentResources';
import StudentSidebar from '../../components/DashboardAssets/StudentSidebar';

const StudentResourcesIndexPage = () => {
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('Users'));
    if (storedUser && storedUser._id) {
      setUserId(storedUser._id);
    }
  }, []);

  const { resources, errorMessage } = useFetchStudentResources(userId, navigate); // Make sure this is adapted for students
  const { handleViewResource } = useHandleViewResource(userId); // Ensure this handles student actions

  return (
    <div className="flex">
      <StudentSidebar /> {/* If there's a student-specific sidebar, use that */}
      <div className='m-3 p-5'>
        <h2 className='text-6xl font-semibold px-2 text-slate-500 pb-5'>All Resources</h2>
        <br />
        <div className="row">
          <RenderStudentResources
            resources={resources}
            errorMessage={errorMessage}
            userId={userId}
            handleViewResource={handleViewResource}
          />
        </div>
      </div>
    </div>
  );
};

export default StudentResourcesIndexPage;
