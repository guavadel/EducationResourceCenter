import React from 'react';
import useHandleViewResource from '../hooks/HandleViewResources';

const RenderResources = ({ resources, errorMessage, userId, handleViewResource }) => {
  if (!userId) {
    return <div className="alert alert-warning">Loading...</div>;
  }

  if (errorMessage) {
    return <div className="alert alert-danger">{errorMessage}</div>;
  }

  if (resources.length === 0) {
    return <div className="alert alert-info">No resources available.</div>;
  }

  return (
    <div className="row">
      {resources.map((resource) => (
        <div key={resource._id} className="col-md-4 mb-4">
          <div className="card bg-white rounded-lg p-4 bg-gradient-to-br from-50% from-slate-900 to-slate-700 shadow-dark-gray-bottom-right">
            <div className="card-body">
              <h5 className="card-title text-gray-400 text-2xl font-bold">{resource.title}</h5>
              <p className="card-text text-gray-200">{resource.description}</p>
              <button
                className="bg-slate-950 text-gray-400 justify-start items-center p-3 rounded hover:bg-gray-300 hover:text-slate-800 transition duration-300 ease-in-out decoration-transparent border-none mt-3"
                onClick={() => handleViewResource(resource._id)}
              >
                View Resource
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RenderResources;
