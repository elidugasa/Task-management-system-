// src/App.jsx
import React from "react";
import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom'; // Added Navigate here
import LandingPage from "./Landig";
import Signup from './auth/Signup';
import Login from './auth/Login';
import ForgetPassword from './auth/ForgetPassword';
import Dashboard from './pages/teamMember/Dashboard';

// Admin imports
import AdminLayout from './Component/admin/AdminLayout';
import AdminDashboard from './pages/admin/Admindashboard';
import DashboardOverview from './pages/admin/DashboardOverview';
import UsersManagement from './pages/admin/UsersManagement';
import TeamsManagement from './pages/admin/TeamsManagement';
import ProjectsManagement from './pages/admin/ProjectsManagement';
import Reports from './pages/admin/Reports';
import SettingsPage from './pages/admin/SettingsPage';
import TeamDetailsPage from './pages/admin/TeamDetailsPage';
// Project Manager imports
import ProjectManagerDashboard from './pages/projectManager/ProjectManagerDashboard';
import ManagerLayout from './Component/projectmanager/PromanagerLayout';
import Projects from './pages/projectmanager/Projects';
import CreateProject from './pages/projectmanager/CreateProject';
import ProjectDetails from './pages/projectmanager/ProjectDetails';
import Tasks from './pages/projectManager/Tasks';
import Reportpm from './pages/projectManager/Reports';
import CreateTask from './pages/projectManager/CreateTask';
import EditTask from './pages/projectManager/EditTask';
import TaskDetails from './pages/projectManager/TaskDetails';
import Progress from './pages/projectManager/Progress';
import Settings from './pages/projectManager/settings';

export default function App(){
  return(
    <Routes>
      <Route path="/" element={<LandingPage/>} />
      <Route path="/signup" element={<Signup/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/forgot-password" element={<ForgetPassword />} />
      <Route path="/dashboard" element={<Dashboard/>} />
      
      {/* All admin routes use AdminLayout */}
      <Route path="/admin" element={<AdminLayout />}>
        {/* UNCOMMENT THIS LINE - Add Dashboard route */}
        <Route index element={<DashboardOverview />} /> {/* /admin */}
        <Route path="users" element={<UsersManagement />} /> {/* /admin/users */}
       <Route path="teams" element={<TeamsManagement />} /> {/* /admin/teams */}
  <Route path="teams/:teamId" element={<TeamDetailsPage />} /> {/* /admin/teams/123 */}
        <Route path="projects" element={<ProjectsManagement />} /> {/* /admin/projects */}
        <Route path="reports" element={<Reports />} /> {/* /admin/reports */}
        <Route path="settings" element={<SettingsPage />} /> {/* /admin/settings */}
      </Route>
            <Route path="/project-manager" element={<Navigate to="/manager/dashboard" replace />} />
       {/* Project Manager Routes */}
       <Route path="/manager" element={<ManagerLayout />}>
  <Route index element={<Navigate to="dashboard" replace />} />
  <Route path="dashboard" element={<ProjectManagerDashboard />} />
  <Route path="projects" element={<Projects />} />
  <Route path="projects/create" element={<CreateProject />} />
  <Route path="projects/:id" element={<ProjectDetails />} />
  <Route path="tasks" element={<Tasks />} />
  <Route path="tasks/create" element={<CreateTask />} />
  <Route path="tasks/edit/:id" element={<EditTask />} /> {/* Add this line */}
  <Route path="tasks/:id" element={<TaskDetails />} />
  <Route path="progress" element={<Progress />} />
  <Route path="reports" element={<Reportpm />} />
  <Route path="settings" element={<Settings />} />
</Route>
    </Routes>
  )
}