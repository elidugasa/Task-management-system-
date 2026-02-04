// src/pages/manager/TaskDetails.jsx
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit, Clock, User, FileText, MessageSquare, CheckCircle } from 'lucide-react';

const TaskDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [task, setTask] = useState({
    id: id,
    title: 'Fix login authentication bug',
    description: 'Fix the authentication bug in the login flow that occurs when users try to login with incorrect credentials multiple times.',
    project: 'Mobile App v2',
    assignee: 'John Doe',
    priority: 'high',
    deadline: '2024-03-15',
    progress: 80,
    status: 'in-progress',
    estimatedHours: 8,
    actualHours: 6,
    createdAt: '2024-02-20'
  });

  const [comments, setComments] = useState([
    { id: 1, user: 'John Doe', text: 'Working on the bug fix', time: '2 hours ago' },
    { id: 2, user: 'Jane Smith', text: 'Please update the progress once completed', time: '1 hour ago' },
  ]);

  const updateProgress = (newProgress) => {
    setTask(prev => ({
      ...prev,
      progress: newProgress,
      status: newProgress === 100 ? 'completed' : 'in-progress'
    }));
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => navigate('/manager/tasks')}
          className="flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Tasks
        </button>
        <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center">
          <Edit className="w-4 h-4 mr-2" />
          Edit Task
        </button>
      </div>

      {/* Task Info */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{task.title}</h1>
            <p className="text-gray-600 mt-2">{task.description}</p>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            task.priority === 'high' ? 'bg-red-100 text-red-800' :
            task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
            'bg-green-100 text-green-800'
          }`}>
            {task.priority} priority
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center text-sm text-gray-500 mb-1">
              <User className="w-4 h-4 mr-2" />
              Assignee
            </div>
            <div className="font-medium text-gray-900">{task.assignee}</div>
          </div>
          
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center text-sm text-gray-500 mb-1">
              <FolderKanban className="w-4 h-4 mr-2" />
              Project
            </div>
            <div className="font-medium text-gray-900">{task.project}</div>
          </div>
          
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center text-sm text-gray-500 mb-1">
              <Clock className="w-4 h-4 mr-2" />
              Deadline
            </div>
            <div className="font-medium text-gray-900">{task.deadline}</div>
          </div>
          
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center text-sm text-gray-500 mb-1">
              <Clock className="w-4 h-4 mr-2" />
              Time Spent
            </div>
            <div className="font-medium text-gray-900">{task.actualHours}/{task.estimatedHours} hrs</div>
          </div>
        </div>

        {/* Progress */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium text-gray-900">Progress: {task.progress}%</span>
            <span className={`px-2 py-1 rounded text-xs ${
              task.status === 'completed' ? 'bg-green-100 text-green-800' :
              task.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              {task.status}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-[#4DA5AD] h-3 rounded-full transition-all duration-300"
              style={{ width: `${task.progress}%` }}
            ></div>
          </div>
          
          <div className="flex justify-between mt-4">
            {[0, 25, 50, 75, 100].map(percent => (
              <button
                key={percent}
                onClick={() => updateProgress(percent)}
                className={`px-3 py-1 rounded text-sm ${
                  task.progress === percent 
                    ? 'bg-[#4DA5AD] text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {percent}%
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Comments */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
          <MessageSquare className="w-5 h-5 mr-2" />
          Comments
        </h2>
        
        <div className="space-y-4 mb-6">
          {comments.map(comment => (
            <div key={comment.id} className="border-l-4 border-[#4DA5AD] pl-4 py-2">
              <div className="flex justify-between items-center mb-1">
                <span className="font-medium text-gray-900">{comment.user}</span>
                <span className="text-sm text-gray-500">{comment.time}</span>
              </div>
              <p className="text-gray-700">{comment.text}</p>
            </div>
          ))}
        </div>

        <div className="flex">
          <input
            type="text"
            placeholder="Add a comment..."
            className="flex-1 border border-gray-300 rounded-l-lg px-4 py-2"
          />
          <button className="px-4 py-2 bg-[#4DA5AD] text-white rounded-r-lg hover:bg-[#3D8B93]">
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;