// src/components/projectManager/CreateProject.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Save, Users } from 'lucide-react';
import DataService from '../../services/dataservices';
import { teams } from '../../data/teams';

const CreateProject = () => {
  const navigate = useNavigate();
  const [project, setProject] = useState({
    name: '',
    description: '',
    startDate: '',
    deadline: '',
    status: 'not-started',
    selectedTeam: '',
    priority: 'medium',
    budget: ''
  });

  // Get existing teams
  const [availableTeams] = useState(teams);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProject(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    try {
      // Use DataService to create project with team
      const newProject = DataService.createProjectWithTeam({
        name: project.name,
        description: project.description,
        startDate: project.startDate,
        deadline: project.deadline,
        status: 'active',
        priority: project.priority,
        budget: project.budget ? parseInt(project.budget) : 0
      }, parseInt(project.selectedTeam));

      alert(`Project created successfully! Assigned to ${newProject.teamName}`);
      navigate('/manager/projects');
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Create New Project</h1>
          <p className="text-gray-600">Create project and assign to a team</p>
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Priority
                </label>
                <select
                  name="priority"
                  value={project.priority}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              {/* <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Budget ($)
                </label>
                <input
                  type="number"
                  name="budget"
                  value={project.budget}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  placeholder="Enter budget amount"
                />
              </div> */}
            </div>
          </div>
        </div>

        {/* Team Assignment */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
            <Users className="w-5 h-5 mr-2" />
            Assign to Team
          </h2>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Team *
            </label>
            <select
              name="selectedTeam"
              value={project.selectedTeam}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            >
              <option value="">Choose a team</option>
              {availableTeams.map(team => (
                <option key={team.id} value={team.id}>
                  {team.name} (Lead: {team.lead}, Members: {team.memberCount})
                </option>
              ))}
            </select>
          </div>

          {/* Show selected team info */}
          {project.selectedTeam && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-3">Selected Team Details</h3>
              {(() => {
                const selectedTeam = availableTeams.find(t => t.id === parseInt(project.selectedTeam));
                return selectedTeam ? (
                  <>
                    <div className="space-y-2">
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Team Lead:</span> {selectedTeam.lead}
                      </p>
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Description:</span> {selectedTeam.description}
                      </p>
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Members:</span> {selectedTeam.memberCount}
                      </p>
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Performance:</span> {selectedTeam.performance}%
                      </p>
                    </div>
                    <p className="text-sm text-gray-500 mt-3">
                      Tasks can be assigned to team members when creating tasks.
                    </p>
                  </>
                ) : (
                  <p className="text-gray-500 text-center py-2">Team not found</p>
                );
              })()}
            </div>
          )}
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