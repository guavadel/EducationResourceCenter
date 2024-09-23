import React, {useEffect} from 'react';
import useFetchUserData from '../../components/hooks/fetchUserData';
import RecentActivities from '../../components/DashboardAssets/RecentActivities';
import OwnedResources from '../../components/DashboardAssets/OwnedResources';
import EducatorMain from '../../components/DashboardAssets/Main';
import DashboardSidebar from '../../components/DashboardAssets/SideBar';
import {toast} from "react-hot-toast"


const EducatorHome = () => {
  const { loading, errorMessage, userDetails, resources, userId } = useFetchUserData();

  React.useEffect(() => {
    if (loading) {
      // Show loading toast
      toast.loading('Loading user data...');
    }
    // Dismiss toast when loading is complete or an error occurs
    if (!loading) {
      toast.dismiss();
    }
  }, [loading]);

  if (errorMessage) {
    return <div>{errorMessage}</div>;
  }

  return (
    <div className="bg-slate-900 h-full w-full flex flex-row gap-x-7 px-0  py-0 ">
    <div className="w-1/6 min-h-screen bg-yellow ">
      {/* Sidebar */}
      <DashboardSidebar />
    </div>
    <div className="w-4/6 h-screen  flex flex-col gap-6 p-10">
      <EducatorMain />
      <div className=" mb-4 bg-blue ">
      <OwnedResources />
    </div>
    <div className="mt-auto">
          <p className="text-md text-right text-white"><hr />{userDetails.email} </p>
        </div>    </div>
    <div className="w-1/6 mb-4 bg-blue">
      <RecentActivities />
    </div>
  </div>
);
};


export default EducatorHome;
