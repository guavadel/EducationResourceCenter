import React from "react"
import useFetchUserData from "../hooks/fetchUserData";

const RecentActivities = () => {
    const { userDetails } = useFetchUserData();

    const formatDate = (dateString) => {
        return format(new Date(dateString), 'PPpp'); // Format the date using date-fns
    };
    return (
        <div>
            <h5 className="mt-5 text-gray-400 text-xl font-bold">Recent Activities</h5>
            <ul className="list-group mt-3 ">
                {userDetails.recentActivities && userDetails.recentActivities.length > 0 ? (
                
                        userDetails.recentActivities.map((activity, index) => (
                        <li key={index} className="list-group-item">
                            <p>{activity.action}</p>
                            <p>Resource: <Link to={`/resources/${activity.resourceId}`}>{activity.resourceTitle}</Link></p>
                            <p>At: {formatDate(activity.timestamp)}</p>
                        </li>
                        ))
                   
                ) : (
                    
                        <li className="list-group-item bg-gradient-to-r from-slate-900 to-slate-700 text-gray-300">No recent activities.</li>
                 
                )}
            </ul>
        </div>);
}

export default RecentActivities;