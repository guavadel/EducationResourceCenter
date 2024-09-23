import React from 'react';
import ProfileMain from '../../components/ProfileAssets/Main';
import DashboardSidebar from '../../components/DashboardAssets/SideBar';
import useFetchUserData from '../../components/hooks/fetchUserData';

const EducatorProfilePage = () => {
  const { userDetails } = useFetchUserData();

  return (
    <div>
      <div className="bg-slate-900 h-full w-full flex flex-row gap-x-7 px-0  py-0 ">
        <div className="w-1/6 min-h-screen bg-yellow ">
          {/* Sidebar */}
          <DashboardSidebar />
        </div>
        <div className="w-4/6 h-screen  flex flex-col gap-6 p-10">
          <ProfileMain />
        </div>
        <div className="mt-auto">
          <p className="text-md text-right text-white"><hr />{userDetails.email} </p>
        </div>
      </div>
    </div>
  );
};

export default EducatorProfilePage;
