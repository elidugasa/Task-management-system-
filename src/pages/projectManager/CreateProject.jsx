// src/pages/manager/CreateProject.jsx - CREATE Project
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Save } from 'lucide-react';

const CreateProject = () => {
  const navigate = useNavigate();
  const [project, setProject] = useState({
    name: '',
    description: '',
    startDate: '',
    deadline: '',
    status: 'not-started',
    teamMembers: []
  });

  const teamMembers = [
    { id: 1, name: 'John Doe', role: 'Frontend Developer' },
    { id: 2, name: 'Jane Smith', role: 'UI Designer' },
    { id: 3, name: 'Mike Wilson', role: 'Backend Developer' },
    { id: 4, name: 'Alice Brown', role: 'QA Engineer' },
    { id: 5, name: 'Bob Johnson', role: 'DevOps' },
  ];

  const handleChange = (e) => {
    setProject({
      ...project,
      [e.target.name]: e.target.value
    });
  };

  const toggleTeamMember = (memberId) => {
    setProject(prev => ({
      ...prev,
      teamMembers: prev.teamMembers.includes(memberId)
        ? prev.teamMembers.filter(id => id !== memberId)
        : [...prev.teamMembers, memberId]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In real app, save to backend
    alert('Project created successfully!');
    navigate('/manager/projects');
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Create New Project</h1>
          <p className="text-gray-600">Fill in project details</p>
        </div>
        <button
          onClick={() => navigate('/manager/projects')}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Project Information</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Project Name *
              </label>
              <input
                type="text"
                name="name"
                value={project.name}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                placeholder="Enter project name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={project.description}
                onChange={handleChange}
                rows="3"
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                placeholder="Describe the project"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Start Date *
                </label>
                <input
                  type="date"
                  name="startDate"
                  value={project.startDate}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Deadline *
                </label>
                <input
                  type="date"
                  name="deadline"
                  value={project.deadline}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                name="status"
                value={project.status}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              >
                <option value="not-started">Not Started</option>
                <option value="in-progress">In Progress</option>
                <option value="on-hold">On Hold</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>
        </div>

        {/* Team Assignment */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Assign Team Members</h2>
          <p className="text-sm text-gray-500 mb-4">Select team members for this project</p>
          
          <div className="space-y-3">
            {teamMembers.map(member => (
              <div
                key={member.id}
                onClick={() => toggleTeamMember(member.id)}
                className={`flex items-center p-3 border rounded-lg cursor-pointer ${
                  project.teamMembers.includes(member.id)
                    ? 'border-[#4DA5AD] bg-[#4DA5AD]/5'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="w-8 h-8 bg-gradient-to-br from-[#4DA5AD] to-[#2D4A6B] rounded-full flex items-center justify-center text-white font-medium mr-3">
                  {member.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{member.name}</p>
                  <p className="text-sm text-gray-500">{member.role}</p>
                </div>
                <div className={`w-5 h-5 rounded border flex items-center justify-center ${
                  project.teamMembers.includes(member.id)
                    ? 'bg-[#4DA5AD] border-[#4DA5AD]'
                    : 'bg-white border-gray-300'
                }`}>
                  {project.teamMembers.includes(member.id) && (
                    <span className="text-white text-xs">✓</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => navigate('/manager/projects')}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-[#4DA5AD] text-white rounded-lg hover:bg-[#3D8B93] flex items-center"
          >
            <Save className="w-4 h-4 mr-2" />
            Create Project
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProject;