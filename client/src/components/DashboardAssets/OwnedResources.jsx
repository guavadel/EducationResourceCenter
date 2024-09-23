import React, { useState } from "react";
import useFetchUserData from "../hooks/fetchUserData";
import { Link, useNavigate } from 'react-router-dom';

const OwnedResources = () => {
    const [showThirdResource, setShowThirdResource] = useState(false);
    const { resources, userId } = useFetchUserData();
    const navigate = useNavigate();

    const handleViewMoreResources = () => {
        setShowThirdResource(true); // Update state to show the third resource
    };

    const handleViewAllResources = () => {
        navigate(`/educator/resources`); // Redirect to the "View All" page
    };

    return (
        <div>
            <h5 className="text-gray-400 text-xl font-bold">Your Resources: {resources.length}</h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-3 ">
                {resources.slice(0, showThirdResource ? 3 : 2).map((resource) => (
                    <div key={resource._id} className="bg-white rounded-lg p-4 bg-gradient-to-br from-50% from-slate-900 to-slate-700 shadow-dark-gray-bottom-right">
                        <Link className="text-2xl text-gray-100" to={`/educator/resources/${userId}/show/${resource._id}`}>
                            <strong>{resource.title}</strong>
                        </Link>
                        <p className="text-base text-gray-400"><span className="font-semibold text-gray-300">Description:</span> {resource.description}</p>
                        <p className="text-base text-gray-400"><span className="font-semibold text-gray-300">Uploaded At:</span> {new Date(resource.createdAt).toLocaleString()}</p>
                    </div>
                ))}
            </div>
           
            {resources.length > 2 && !showThirdResource && (
                
                <button className="btn btn-link text-gray-200 decoration-transparent hover:text-blue-900 mt-4" onClick={handleViewMoreResources}>
                    
                    View More
                </button>
            )}
            {resources.length > 3 && showThirdResource && (
                <button className="btn btn-link text-gray-200 decoration-transparent hover:text-blue-900 mt-4" onClick={handleViewAllResources}>
                     View All Resources
                </button>
            )}
        </div>
    );
};

export default OwnedResources;
