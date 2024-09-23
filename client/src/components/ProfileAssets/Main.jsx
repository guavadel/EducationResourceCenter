import React from "react";
import { useParams, useNavigate } from 'react-router-dom';
import useFetchEducatorProfile from "../hooks/fetchEducatorProfile";

const ProfileMain = () => {
    const { userId } = useParams();
    const navigate = useNavigate();
    const { educator, errorMessage } = useFetchEducatorProfile();

    const handleEdit = () => {
        navigate(`/educator/profile/${userId}/edit`);
    };

    if (!educator) {
        return (
            <div className="flex justify-center items-center h-screen">
                <span className="text-gray-500">Loading...</span>
            </div>
        ); // Show loading indicator while fetching data
    }

    return (
        <div className=" p-4 ">
            <h2 className="text-5xl font-semibold mb-4 text-slate-500">Educator Profile Details</h2>
            {errorMessage && (
                <div className="mb-4 p-3 bg-red-200 text-red-800 border border-red-300 rounded">
                    {errorMessage}
                </div>
            )}

            <div className="flex space-x-10 p-10">
                <img src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" className="h-96 rounded-full border-4 border-red-900" />
                <div className=" px-10 space-y-7">
                    <p className="text-2xl text-gray-500"><strong>Name:</strong> {educator.name}</p>
                    <p className="text-2xl text-gray-500"><strong>Email:</strong> {educator.email}</p>
                    <p className="text-2xl text-gray-500"><strong>Username:</strong> {educator.username}</p>
                    <p className="text-2xl text-gray-500"><strong>College Name:</strong> {educator.collegeName}</p>
                    <p className="text-2xl text-gray-500"><strong>Experience:</strong> {educator.experience}</p>
                    <button
                        className="w-28 bg-slate-950 text-gray-400 justify-start items-center p-3 rounded hover:bg-gray-300 hover:text-slate-800 transition duration-300 ease-in-out decoration-transparent border-none"
                        onClick={handleEdit}
                    >
                        Edit
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProfileMain;
