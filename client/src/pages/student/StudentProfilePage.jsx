import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import StudentSidebar from '../../components/DashboardAssets/StudentSidebar';
import ProfileStudentMain from '../../components/ProfileAssets/StudentMain';
import useFetchStudentUserData from '../../components/hooks/fetchStudentUserData';

const StudentProfilePage = () => {
  const { userDetails} = useFetchStudentUserData();



  return (
    <div className="bg-slate-900 h-full w-full flex flex-row gap-x-7 px-0 py-0">
      <div className="w-1/6 min-h-screen bg-yellow">
        <StudentSidebar />
      </div>
      <div className="w-4/6 h-screen flex flex-col gap-6 p-10">
        <ProfileStudentMain userDetails={userDetails} />
      </div>
      <div className="mt-auto">
        <p className="text-md text-right text-white">
          {userDetails.email}
        </p>
      </div>
    </div>
  );
};

export default StudentProfilePage;
