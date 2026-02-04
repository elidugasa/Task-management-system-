// src/pages/manager/Projects.jsx - MANAGE Projects List
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, Filter, MoreVertical, Edit, Trash2, Eye } from 'lucide-react';

const Projects = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([
    { id: 1, name: 'Mobile App v2', description: 'Next generation mobile application', progress: 75, status: 'active', startDate: '2024-01-15', deadline: '2024-06-15', tasks: 24, team: 5 },
    { id: 2, name: 'Website Redesign', description: 'Modern responsive website redesign', progress: 45, status: 'active', startDate: '2024-02-01', deadline: '2024-07-30', tasks: 18, team: 3 },
    { id: 3, name: 'API Migration', description: 'Migrate legacy APIs to microservices', progress: 90, status: 'completed', startDate: '2023-11-01', deadline: '2024-03-01', tasks: 32, team: 8 },
    { id: 4, name: 'Payment Integration', description: 'Integrate new payment gateway', progress: 60, status: 'active', startDate: '2024-01-20', deadline: '2024-05-20', tasks: 16, team: 4 },
  ]);

  const deleteProject = (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      setProjects(projects.filter(p => p.id !== id));
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Project Management</h1>
          <p className="text-gray-600">Create and manage your projects</p>
        </div>
        <button
          onClick={() => navigate('/manager/projects/create')}
          className="px-4 py-2 bg-[#4DA5AD] text-white rounded-lg hover:bg-[#3D8B93] flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Project
        </button>
      </div>

      {/* Search and Filter */}
      <div className="flex justify-between items-center mb-6">
        <div className="relative w-96">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search projects..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div className="flex space-x-3">
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </button>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map(project => (
          <div key={project.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-bold text-gray-900 text-lg">{project.name}</h3>
                <p className="text-sm text-gray-500 mt-1">{project.description}</p>
              </div>
              <div className="relative">
                <button className="p-1 hover:bg-gray-100 rounded">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>Progress</span>
                <span>{project.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-[#4DA5AD] h-2 rounded-full"
                  style={{ width: `${project.progress}%` }}
                ></div>
              </div>
            </div>

            {/* Project Details */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="text-center p-2 bg-gray-50 rounded">
                <div className="text-lg font-bold text-gray-900">{project.tasks}</div>
                <div className="text-xs text-gray-500">Tasks</div>
              </div>
              <div className="text-center p-2 bg-gray-50 rounded">
                <div className="text-lg font-bold text-gray-900">{project.team}</div>
                <div className="text-xs text-gray-500">Team</div>
              </div>
            </div>

            {/* Dates */}
            <div className="text-sm text-gray-500 mb-4">
              <div>Start: {project.startDate}</div>
              <div>Deadline: {project.deadline}</div>
            </div>

            {/* Actions */}
            <div className="flex space-x-2">
              <button
                onClick={() => navigate(`/manager/projects/${project.id}`)}
                className="flex-1 py-2 border border-[#4DA5AD] text-[#4DA5AD] rounded-lg hover:bg-[#4DA5AD]/10"
              >
                View Details
              </button>
              <button
                onClick={() => deleteProject(project.id)}
                className="px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;