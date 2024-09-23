// App.jsx

import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import StudentHomePage from './pages/student/StudentHome';
import StudentLoginPage from './pages/student/StudentLoginPage';
import StudentRegisterPage from './pages/student/StudentRegisterPage';
import StudentProfilePage from './pages/student/StudentProfilePage';
import StudentProfileEdit from './pages/student/StudentProfileEdit';
import StudentResourcesIndexPage from './pages/student/StudentResourcesIndexPage';
import StudentResourcesShowPage from './pages/student/StudentResourcesShowPage';
import EducatorHome from './pages/educator/EducatorHome';
import EducatorLoginPage from './pages/educator/EducatorLoginPage';
import EducatorRegisterPage from './pages/educator/EducatorRegisterPage';
import EducatorProfilePage from './pages/educator/EducatorProfilePage';
import EducatorProfileEdit from './pages/educator/EducatorProfileEdit';
import EducatorResourcesIndexPage from './pages/educator/EducatorResourcesIndexPage';
import EducatorResourcesShowPage from './pages/educator/EducatorResourcesShowPage';
import EducatorAddNewResourcePage from './pages/educator/EducatorAddNewResourcePage';
import EducatorEditResourcePage from './pages/educator/EducatorEditResourcePage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import "./css/index.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import TestComponent from './components/TestComponent';
import ProtectedRoute from './components/ProtectedRoute';
import userRole from './components/hooks/userRole';
import { Toaster } from 'react-hot-toast';
import Educator from './pages/educator/Educator';

const App = () => {
  const { user, role, loading } = userRole();
console.log("usduifhsudhfiushdfi",user);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-slate-900">
      <Navbar user={user} role={role} /> 
        <>
          <Routes>
            {/* Home Page */}
            <Route path="/home" element={<Home />} />
            <Route path="/test" element={<TestComponent />} />

            {/* Student Routes */}
            <Route path="/resources/view/:userId/show/:resourceId" element={<StudentResourcesShowPage />} />
            <Route
              path="/student/*"
              element={
                <ProtectedRoute user={user} role="student">
                  <Routes>
                    <Route path="/" element={<StudentHomePage />} />
                    <Route path="/profile/:userId" element={<StudentProfilePage />} />
                    <Route path="/profile/:userId/edit" element={<StudentProfileEdit />} />
                    <Route path="/resources" element={<StudentResourcesIndexPage />} />
                    
                  </Routes>
                </ProtectedRoute>
              }
            />
            

            {/* Educator Routes */}
            <Route
              path="/educator/*"
              element={
                <ProtectedRoute user={user} role="educator">
                  <Routes>
                  <Route path="/" element={<Educator/>}/>
                    <Route path="/dashboard" element={<EducatorHome />} />
                    <Route path="/profile/:userId" element={<EducatorProfilePage />} />
                    <Route path="/profile/:userId/edit" element={<EducatorProfileEdit />} />
                    <Route path="/resources" element={<EducatorResourcesIndexPage />} />
                    <Route path="/resources/:userId/show/:resourceId" element={<EducatorResourcesShowPage />} />
                    <Route path="/resources/:userId/new" element={<EducatorAddNewResourcePage />} />
                    <Route path="/resources/:userId/edit/:resourceId" element={<EducatorEditResourcePage />} />
                  </Routes>
                </ProtectedRoute>
              }
            />

            {/* Conditional Routes for Login and Register */}

                <Route path="/student/login" element={<StudentLoginPage />} />
                <Route path="/student/register" element={<StudentRegisterPage />} />
                <Route path="/educator/login" element={<EducatorLoginPage />} />
                <Route path="/educator/register" element={<EducatorRegisterPage />} />
                <Route path="*" element={<Navigate to="/home" />} />


            {/* Redirect to home page if route not found */}
            <Route path="*" element={<Navigate to="/home" />} />
          </Routes>
        </>

        <Footer />
        <Toaster />
      </div>
    </BrowserRouter>
  );
};

export default App;
