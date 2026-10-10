// src/pages/admin/ProjectsManagement.jsx
import React, { useState } from 'react';
import ProjectCard from '../../Component/admin/ProjectCard';

const ProjectsManagement = () => {
  const [filter, setFilter] = useState('all');
  
  const projects = [
    { id: 1, name: 'Website Redesign', team: 'Design', manager: 'Jane Smith', progress: 75, status: 'active', dueDate: '2024-06-15' },
    { id: 2, name: 'Mobile App v2', team: 'Engineering', manager: 'John Doe', progress: 45, status: 'active', dueDate: '2024-07-30' },
    { id: 3, name: 'API Migration', team: 'Engineering', manager: 'Bob Johnson', progress: 90, status: 'completed', dueDate: '2024-03-01' },
    { id: 4, name: 'Database Upgrade', team: 'DevOps', manager: 'Mike Wilson', progress: 30, status: 'active', dueDate: '2024-05-20' },
    { id: 5, name: 'Marketing Campaign', team: 'Marketing', manager: 'Sarah Davis', progress: 60, status: 'active', dueDate: '2024-04-15' },
    { id: 6, name: 'Sales Dashboard', team: 'Engineering', manager: 'John Doe', progress: 20, status: 'active', dueDate: '2024-08-10' },
  ];

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.status === filter);

  const stats = {
    total: projects.length,
    active: projects.filter(p => p.status === 'active').length,
    completed: projects.filter(p => p.status === 'completed').length,
    averageProgress: Math.round(projects.reduce((sum, p) => sum + p.progress, 0) / projects.length)
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Project Management</h1>
        <p className="text-gray-600">View and monitor all projects across teams</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="text-2xl font-bold text-gray-900 mb-2">{stats.total}</div>
          <p className="font-medium text-gray-900">Total Projects</p>
          <p className="text-sm text-gray-600">Across all teams</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="text-2xl font-bold text-green-600 mb-2">{stats.active}</div>
          <p className="font-medium text-gray-900">Active Projects</p>
          <p className="text-sm text-gray-600">Currently in progress</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="text-2xl font-bold text-blue-600 mb-2">{stats.completed}</div>
          <p className="font-medium text-gray-900">Completed</p>
          <p className="text-sm text-gray-600">Finished projects</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="text-2xl font-bold text-[#4DA5AD] mb-2">{stats.averageProgress}%</div>
          <p className="font-medium text-gray-900">Avg. Progress</p>
          <p className="text-sm text-gray-600">Across all projects</p>
        </div>
      </div>

      {/* Filter & Projects */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold text-gray-900">All Projects</h2>
          <div className="flex space-x-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg ${filter === 'all' ? 'bg-[#4DA5AD] text-white' : 'bg-gray-100 text-gray-700'}`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('active')}
              className={`px-4 py-2 rounded-lg ${filter === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-700'}`}
            >
              Active
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={`px-4 py-2 rounded-lg ${filter === 'completed' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-700'}`}
            >
              Completed
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📁</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No projects found</h3>
            <p className="text-gray-500">Try selecting a different filter</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectsManagement;