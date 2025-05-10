import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Layout from '../components/layout/Layout';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import ForgotPassword from '../pages/auth/ForgotPassword';
import ResetPassword from '../pages/auth/ResetPassword';
import Dashboard from '../pages/dashboard/Dashboard';
import Applications from '../pages/dashboard/Applications';
import ApplicationForm from '../pages/dashboard/ApplicationForm';
import ApplicationStatus from '../pages/dashboard/ApplicationStatus';
import Attendance from '../pages/dashboard/Attendance';
import Laborers from '../pages/dashboard/Laborers';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
      
      <Route path="/" element={<PrivateRoute><Layout /></PrivateRoute>}>
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        
        {/* Owner routes */}
        <Route path="applications" element={<Applications />} />
        <Route path="applications/new" element={<ApplicationForm />} />
        <Route path="attendance" element={<Attendance />} />
        <Route path="laborers" element={<Laborers />} />
        
        {/* Farm Laborer routes */}
        <Route path="my-applications" element={<ApplicationStatus />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;