// src/pages/manager/Tasks.jsx - MANAGE Tasks List
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, Filter, Eye, MoreVertical } from 'lucide-react';

const Tasks = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Fix login authentication bug', project: 'Mobile App v2', assignee: 'John Doe', priority: 'high', deadline: '2024-03-15', progress: 80, status: 'in-progress' },
    { id: 2, title: 'Design homepage mockups', project: 'Website Redesign', assignee: 'Jane Smith', priority: 'medium', deadline: '2024-03-20', progress: 60, status: 'in-progress' },
    { id: 3, title: 'Write API documentation', project: 'API Migration', assignee: 'Mike Wilson', priority: 'low', deadline: '2024-03-01', progress: 100, status: 'completed' },
    { id: 4, title: 'Database optimization', project: 'Payment Integration', assignee: 'Alice Brown', priority: 'high', deadline: '2024-03-10', progress: 40, status: 'pending' },
    { id: 5, title: 'Mobile testing phase 2', project: 'Mobile App v2', assignee: 'John Doe', priority: 'medium', deadline: '2024-03-25', progress: 20, status: 'pending' },
  ]);

  const [filter, setFilter] = useState('all');

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    if (filter === 'completed') return task.status === 'completed';
    if (filter === 'in-progress') return task.status === 'in-progress';
    if (filter === 'pending') return task.status === 'pending';
    return true;
  });

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Task Management</h1>
          <p className="text-gray-600">Create and assign tasks to team members</p>
        </div>
        <button
          onClick={() => navigate('/manager/tasks/create')}
          className="px-4 py-2 bg-[#4DA5AD] text-white rounded-lg hover:bg-[#3D8B93] flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Task
        </button>
      </div>

      {/* Filters */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex space-x-2">
          {['all', 'pending', 'in-progress', 'completed'].map(status => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg ${
                filter === status
                  ? 'bg-[#4DA5AD] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
        
        <div className="flex space-x-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search tasks..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </button>
        </div>
      </div>

      {/* Tasks List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Task</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assignee</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deadline</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Progress</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredTasks.map(task => (
              <tr key={task.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div>
                    <div className="font-medium text-gray-900">{task.title}</div>
                    <div className="text-sm text-gray-500">{task.status}</div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-gray-900">{task.project}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-gradient-to-br from-[#4DA5AD] to-[#2D4A6B] rounded-full flex items-center justify-center text-white text-sm font-medium mr-2">
                      {task.assignee.charAt(0)}
                    </div>
                    <span>{task.assignee}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    task.priority === 'high' ? 'bg-red-100 text-red-800' :
                    task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {task.priority}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="text-gray-900">{task.deadline}</div>
                  <div className={`text-xs ${
                    task.status === 'completed' ? 'text-green-600' :
                    new Date(task.deadline) < new Date() ? 'text-red-600' :
                    'text-gray-500'
                  }`}>
                    {task.status === 'completed' ? 'Completed' : 
                     new Date(task.deadline) < new Date() ? 'Overdue' : 'Active'}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                      <div 
                        className="bg-[#4DA5AD] h-2 rounded-full"
                        style={{ width: `${task.progress}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600">{task.progress}%</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => navigate(`/manager/tasks/${task.id}`)}
                    className="text-[#4DA5AD] hover:text-[#3D8B93]"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Tasks;