// src/pages/manager/CreateTask.jsx - CREATE & ASSIGN Task
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Save, Calendar, User, AlertCircle } from 'lucide-react';

const CreateTask = () => {
  const navigate = useNavigate();
  const [task, setTask] = useState({
    title: '',
    description: '',
    project: '',
    assignee: '',
    priority: 'medium',
    deadline: '',
    estimatedHours: ''
  });

  const projects = [
    { id: 1, name: 'Mobile App v2' },
    { id: 2, name: 'Website Redesign' },
    { id: 3, name: 'API Migration' },
    { id: 4, name: 'Payment Integration' },
  ];

  const teamMembers = [
    { id: 1, name: 'John Doe', role: 'Frontend Developer' },
    { id: 2, name: 'Jane Smith', role: 'UI Designer' },
    { id: 3, name: 'Mike Wilson', role: 'Backend Developer' },
    { id: 4, name: 'Alice Brown', role: 'QA Engineer' },
    { id: 5, name: 'Bob Johnson', role: 'DevOps' },
  ];

  const handleChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In real app, save to backend
    alert('Task created and assigned successfully!');
    navigate('/manager/tasks');
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Create New Task</h1>
          <p className="text-gray-600">Create and assign tasks to team members</p>
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
                    <option key={project.id} value={project.name}>
                      {project.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Assign To *
                </label>
                <select
                  name="assignee"
                  value={task.assignee}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                >
                  <option value="">Select team member</option>
                  {teamMembers.map(member => (
                    <option key={member.id} value={member.name}>
                      {member.name} ({member.role})
                    </option>
                  ))}
                </select>
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
                />
              </div>
            </div>

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
            Create & Assign Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTask;