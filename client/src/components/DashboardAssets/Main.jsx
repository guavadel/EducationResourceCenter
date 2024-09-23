import React from "react";
import useFetchUserData from "../hooks/fetchUserData";
import { format } from "date-fns";

const EducatorMain = () =>{
    const { userDetails} = useFetchUserData();
    const formatDate = (dateString) => {
      return format(new Date(dateString), 'PPpp'); // Format the date using date-fns
    };

    return(
  <div>
      <h2 className="text-6xl font-semibold text-gray-500">Educator Dashboard</h2>
      <div className="row mt-4">
        <div className="col">
          <h4 className="text-4xl font-bold text-white">Welcome, {userDetails.name}!</h4>
          <p className="text-lg pt-2 text-gray-500"><hr />Account created on: {userDetails.createdAt ? formatDate(userDetails.createdAt) : 'N/A'}</p>
        </div>
        
    </div>
  </div>
    );
};


export default EducatorMain;