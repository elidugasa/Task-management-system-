// src/pages/projectmanager/EditTask.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { X, Save, AlertCircle, Users } from 'lucide-react';
import DataService from '../../services/dataservices';

const EditTask = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  
  const [task, setTask] = useState({
    title: '',
    description: '',
    project: '',
    assigneeId: '',
    priority: 'medium',
    deadline: '',
    estimatedHours: '',
    tags: ''
  });

  const [projects, setProjects] = useState([]);
  const [availableMembers, setAvailableMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [originalTask, setOriginalTask] = useState(null);

  useEffect(() => {
    // Load projects
    const allProjects = DataService.getProjects();
    setProjects(allProjects);
    
    // Load task data
    loadTaskData();
  }, [id]);

  const loadTaskData = () => {
    setIsLoading(true);
    try {
      // Load from localStorage (same as Tasks.jsx)
      const savedTasks = localStorage.getItem('managerTasks');
      const tasks = savedTasks ? JSON.parse(savedTasks) : [];
      const existingTask = tasks.find(t => t.id === parseInt(id));
      
      if (!existingTask) {
        alert('Task not found!');
        navigate('/manager/tasks');
        return;
      }
      
      setOriginalTask(existingTask);
      
      // Find project by name in projects list
      const project = DataService.getProjects().find(p => p.name === existingTask.project);
      
      // Set initial task state
      setTask({
        title: existingTask.title,
        description: existingTask.description || '',
        project: project ? project.id.toString() : '',
        assigneeId: '', // Will be set after loading members
        priority: existingTask.priority,
        deadline: existingTask.deadline,
        estimatedHours: existingTask.estimatedHours?.toString() || '',
        tags: existingTask.tags?.join(', ') || ''
      });
      
    } catch (error) {
      console.error('Error loading task:', error);
      alert('Error loading task data');
    } finally {
      setIsLoading(false);
    }
  };

  // Load team members when project is selected
  useEffect(() => {
    if (task.project) {
      const projectId = parseInt(task.project);
      
      let members = [];
      try {
        members = DataService.getTeamMembersForProject(projectId);
      } catch (error) {
        console.warn('Could not get team members:', error);
        const project = DataService.getProjects().find(p => p.id === projectId);
        if (project && project.teamMembers) {
          const allMembers = DataService.getTeamMembers();
          members = allMembers.filter(member => 
            project.teamMembers.includes(member.id)
          );
        }
      }
      
      setAvailableMembers(members);
      
      // Set assignee if we have the original task
      if (originalTask && originalTask.assignee) {
        const member = members.find(m => m.name === originalTask.assignee);
        if (member) {
          setTask(prev => ({
            ...prev,
            assigneeId: member.id.toString()
          }));
        }
      }
    }
  }, [task.project, originalTask]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const selectedProject = projects.find(p => p.id === parseInt(task.project));
    if (!selectedProject) {
      alert('Please select a project');
      return;
    }

    const selectedMember = availableMembers.find(m => m.id === parseInt(task.assigneeId));
    if (!selectedMember) {
      alert('Please select a team member');
      return;
    }

    try {
      // Load existing tasks
      const savedTasks = localStorage.getItem('managerTasks');
      const tasks = savedTasks ? JSON.parse(savedTasks) : [];
      
      // Create updated task data
      const updatedTask = {
        ...originalTask, // Keep original data
        id: parseInt(id),
        title: task.title,
        description: task.description,
        project: selectedProject.name,
        projectId: selectedProject.id,
        assignee: selectedMember.name,
        priority: task.priority,
        deadline: task.deadline,
        estimatedHours: task.estimatedHours ? parseInt(task.estimatedHours) : 0,
        tags: task.tags ? task.tags.split(',').map(tag => tag.trim()).filter(tag => tag) : []
      };

      // Update task in array
      const updatedTasks = tasks.map(t => 
        t.id === parseInt(id) ? updatedTask : t
      );
      
      // Save to localStorage
      localStorage.setItem('managerTasks', JSON.stringify(updatedTasks));
      
      alert('Task updated successfully!');
      navigate('/manager/tasks');
      
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  if (isLoading) {
    return (
      <div className="p-6 max-w-4xl mx-auto flex justify-center items-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4DA5AD] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading task data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Edit Task</h1>
          <p className="text-gray-600">Update task details and assignment</p>
          <p className="text-sm text-gray-500 mt-1">Task ID: {id}</p>
        </div>
        <button
          onClick={() => navigate('/manager/tasks')}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Task Information</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Task Title *
              </label>
              <input
                type="text"
                name="title"
                value={task.title}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                placeholder="Enter task title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={task.description}
                onChange={handleChange}
                rows="3"
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                placeholder="Describe the task"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Project *
                </label>
                <select
                  name="project"
                  value={task.project}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                >
                  <option value="">Select project</option>
                  {projects.map(project => (
                    <option key={project.id} value={project.id}>
                      {project.name} ({project.teamName})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Assign To *
                </label>
                <select
                  name="assigneeId"
                  value={task.assigneeId}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  disabled={!task.project}
                >
                  <option value="">Select team member</option>
                  {availableMembers.map(member => (
                    <option key={member.id} value={member.id}>
                      {member.name} ({member.role}) - {member.team}
                    </option>
                  ))}
                </select>
                {!task.project ? (
                  <p className="text-sm text-gray-500 mt-1">Please select a project first</p>
                ) : availableMembers.length === 0 ? (
                  <p className="text-sm text-yellow-600 mt-1">No team members available</p>
                ) : (
                  <p className="text-sm text-green-600 mt-1">{availableMembers.length} members available</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Priority *
                </label>
                <select
                  name="priority"
                  value={task.priority}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Deadline *
                </label>
                <input
                  type="date"
                  name="deadline"
                  value={task.deadline}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Estimated Hours
                </label>
                <input
                  type="number"
                  name="estimatedHours"
                  value={task.estimatedHours}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  placeholder="e.g., 8"
                  min="0"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tags (comma separated)
              </label>
              <input
                type="text"
                name="tags"
                value={task.tags}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                placeholder="e.g., bug, frontend, urgent"
              />
            </div>

            {/* Original Task Info */}
            {originalTask && (
              <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-medium text-gray-900 mb-2">Original Task Information</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-gray-500">Status:</span>
                    <span className="ml-2 font-medium">{originalTask.status}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Progress:</span>
                    <span className="ml-2 font-medium">{originalTask.progress}%</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Actual Hours:</span>
                    <span className="ml-2 font-medium">{originalTask.actualHours || 0} hrs</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Original Assignee:</span>
                    <span className="ml-2 font-medium">{originalTask.assignee}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Selected Project Info */}
            {task.project && (
              <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center mb-2">
                  <Users className="w-4 h-4 text-blue-600 mr-2" />
                  <span className="font-medium text-blue-800">Project Team:</span>
                </div>
                {(() => {
                  const selectedProject = projects.find(p => p.id === parseInt(task.project));
                  return selectedProject ? (
                    <>
                      <p className="text-sm text-blue-700">
                        {selectedProject.teamName} - {availableMembers.length} members available
                      </p>
                      <p className="text-sm text-blue-600 mt-1">
                        Project Progress: {selectedProject.progress}%
                      </p>
                    </>
                  ) : null;
                })()}
              </div>
            )}

            {/* Priority Indicator */}
            <div className="mt-4 p-3 rounded-lg" style={{
              backgroundColor: 
                task.priority === 'high' ? '#FEF2F2' :
                task.priority === 'medium' ? '#FFFBEB' :
                '#F0FDF4',
              border: `1px solid ${
                task.priority === 'high' ? '#FECACA' :
                task.priority === 'medium' ? '#FDE68A' :
                '#BBF7D0'
              }`
            }}>
              <div className="flex items-center">
                <AlertCircle className={`w-4 h-4 mr-2 ${
                  task.priority === 'high' ? 'text-red-600' :
                  task.priority === 'medium' ? 'text-yellow-600' :
                  'text-green-600'
                }`} />
                <span className={`font-medium ${
                  task.priority === 'high' ? 'text-red-800' :
                  task.priority === 'medium' ? 'text-yellow-800' :
                  'text-green-800'
                }`}>
                  {task.priority === 'high' ? 'High Priority Task' :
                   task.priority === 'medium' ? 'Medium Priority Task' :
                   'Low Priority Task'}
                </span>
              </div>
              <p className={`text-sm mt-1 ${
                task.priority === 'high' ? 'text-red-700' :
                task.priority === 'medium' ? 'text-yellow-700' :
                'text-green-700'
              }`}>
                {task.priority === 'high' ? 'This task requires immediate attention.' :
                 task.priority === 'medium' ? 'This task should be completed soon.' :
                 'This task can be scheduled for later.'}
              </p>
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => navigate('/manager/tasks')}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-[#4DA5AD] text-white rounded-lg hover:bg-[#3D8B93] flex items-center"
          >
            <Save className="w-4 h-4 mr-2" />
            Update Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditTask;