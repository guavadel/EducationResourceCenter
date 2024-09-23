// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const DeletedResourcesPage = () => {
//   const [deletedResources, setDeletedResources] = useState([]);
//   const [errorMessage, setErrorMessage] = useState('');

//   useEffect(() => {
//     fetchDeletedResources();
//   }, []);

//   const fetchDeletedResources = async () => {
//     try {
//       const response = await axios.get('http://localhost:3000/resources/deleted', {
//         withCredentials: true // Include credentials if needed
//       });

//       console.log('Fetched deleted resources:', response.data); // Debugging
//       setDeletedResources(response.data);
//     } catch (error) {
//       console.error('Error fetching deleted resources:', error);
//       setErrorMessage('Failed to fetch deleted resources.');
//     }
//   };

//   const handlePermanentDelete = async (resourceId) => {
//     try {
//       const response = await axios.delete(`http://localhost:3000/resources/deleted/${resourceId}`, {
//         withCredentials: true // Include credentials if needed
//       });

//       console.log('Resource permanently deleted:', response.data);
//       // Optionally update deletedResources state after deletion if needed
//     } catch (error) {
//       console.error('Error permanently deleting resource:', error);
//       setErrorMessage('Failed to permanently delete resource.');
//     }
//   };

//   if (errorMessage) {
//     return <div className="alert alert-danger">{errorMessage}</div>;
//   }

//   return (
//     <div className="container mt-5">
//       <h2>Recently Deleted Resources</h2>
//       <ul className="list-group mt-3">
//         {deletedResources.map((resource) => (
//           <li key={resource._id} className="list-group-item">
//             <h5>{resource.title}</h5>
//             <p>Description: {resource.description}</p>
//             <button className="btn btn-danger" onClick={() => handlePermanentDelete(resource._id)}>
//               Permanently Delete
//             </button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default DeletedResourcesPage;
