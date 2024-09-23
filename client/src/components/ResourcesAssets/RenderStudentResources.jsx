import React from 'react';

const RenderStudentResources = ({ resources, errorMessage, userId, handleViewResource }) => {
  if (!userId) {
    return <div className="alert alert-warning">Loading...</div>;
  }

  if (errorMessage) {
    return <div className="alert alert-danger">{errorMessage}</div>;
  }

  if (resources.length === 0) {
    return <div className="alert alert-info">No resources available.</div>;
  }

  return resources.map((resource) => {
    console.log('Resource:', resource); // Debug line

    return (
      <div key={resource._id} className="col-md-4 mb-4">
        <div className="card bg-white rounded-lg p-4 bg-gradient-to-br from-50% from-slate-900 to-slate-700 shadow-dark-gray-bottom-right">
          <div className="card-body">
            <h5 className="card-title text-gray-400 text-2xl font-bold">{resource.title}</h5>
            <p className="card-text py-2 text-gray-200">{resource.description}</p>
            <p className="card-text py-2 text-gray-200">Uploaded by: {resource.educator?.username || 'Unknown'}</p>
            <a href={`/resources/view/${userId}/show/${resource._id}`} className="btn bg-slate-950 text-gray-400 justify-start items-center p-3 rounded hover:bg-gray-300 hover:text-slate-800 transition duration-300 ease-in-out decoration-transparent border-none mt-3">
              View Resource
            </a>
          </div>
        </div>
      </div>
    );
  });
};

export default RenderStudentResources;
