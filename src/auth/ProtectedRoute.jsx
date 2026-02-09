// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4DA5AD]"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  // Normalize user role to handle both formats
  const userRole = user.role === 'team_member' ? 'team-member' : 
                  user.role === 'project_manager' ? 'project-manager' : 
                  user.role;

  // Normalize allowed roles too
  const normalizedAllowedRoles = allowedRoles?.map(role => 
    role === 'team_member' ? 'team-member' : 
    role === 'project_manager' ? 'project-manager' : 
    role
  );

  // Check if user has allowed role
  if (normalizedAllowedRoles && !normalizedAllowedRoles.includes(userRole)) {
    // Redirect to appropriate dashboard based on role
    if (userRole === 'team-member') {
      return <Navigate to="/team-member/dashboard" />;
    } else if (userRole === 'project-manager') {
      return <Navigate to="/project-manager/dashboard" />;
    } else if (userRole === 'admin') {
      return <Navigate to="/admin/dashboard" />;
    }
    return <Navigate to={getUserDashboardPath()} />;
  }

  return children;
};

export default ProtectedRoute;