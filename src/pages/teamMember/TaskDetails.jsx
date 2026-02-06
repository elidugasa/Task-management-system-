// src/pages/teamMember/TaskDetails.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Clock, User, FileText, MessageSquare, 
  CheckCircle, FolderKanban, Calendar, AlertCircle,
  PlayCircle, Send, Save, X
} from 'lucide-react';

// Mock data since we don't have the actual DataService
const mockTasks = [
  {
    id: 1,
    title: 'Fix Authentication Bug',
    description: 'Fix the authentication middleware issue causing login failures',
    priority: 'high',
    status: 'in-progress',
    progress: 75,
    assignee: 'You',
    project: 'E-commerce Platform',
    deadline: '2024-03-15',
    estimatedHours: 8,
    actualHours: 6,
    createdAt: 'Mar 10, 2024',
    startedAt: 'Mar 11, 2024',
    updatedAt: 'Mar 12, 2024',
    tags: ['bug-fix', 'authentication', 'security'],
    comments: [
      {
        id: 1,
        user: 'Project Manager',
        role: 'Manager',
        text: 'Please make sure to test thoroughly before marking as complete.',
        time: '2 days ago',
        avatar: 'PM'
      }
    ]
  },
  {
    id: 2,
    title: 'Update Dashboard UI',
    description: 'Redesign the dashboard with new components',
    priority: 'medium',
    status: 'pending',
    progress: 0,
    assignee: 'You',
    project: 'Admin Panel',
    deadline: '2024-03-20',
    estimatedHours: 12,
    actualHours: 0,
    createdAt: 'Mar 11, 2024',
    tags: ['ui', 'dashboard', 'design']
  }
];

const TeamMemberTaskDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [task, setTask] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updateData, setUpdateData] = useState({
    progress: 0,
    status: '',
    whatCompleted: '',
    hoursSpent: 0,
    notes: ''
  });

  useEffect(() => {
    // Find the task from mock data
    const foundTask = mockTasks.find(t => t.id === parseInt(id));
    
    if (foundTask) {
      setTask(foundTask);
      setUpdateData({
        progress: foundTask.progress || 0,
        status: foundTask.status,
        whatCompleted: '',
        hoursSpent: foundTask.actualHours || 0,
        notes: ''
      });
      
      // Load comments
      setComments(foundTask.comments || []);
    } else {
      navigate('/team-member/tasks');
    }
  }, [id, navigate]);

  // Open update modal with pre-filled data
  const handleOpenUpdate = (newStatus, newProgress) => {
    setUpdateData({
      progress: newProgress,
      status: newStatus,
      whatCompleted: '',
      hoursSpent: task.actualHours || 0,
      notes: ''
    });
    setShowUpdateModal(true);
  };

  // Handle task update with completion details
  const handleUpdateTask = () => {
    if (!task) return;

    // Validate completion requires description
    if (updateData.status === 'completed' && !updateData.whatCompleted.trim()) {
      alert('Please describe what was completed before marking as complete.');
      return;
    }

    // Calculate new hours - add new hours to existing
    const newHoursSpent = updateData.hoursSpent;

    // Create updated task
    const updatedTask = {
      ...task,
      progress: updateData.progress,
      status: updateData.status,
      actualHours: newHoursSpent,
      updatedAt: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    };

    // Set completion date if completing
    if (updateData.status === 'completed') {
      updatedTask.completedAt = updatedTask.updatedAt;
      updatedTask.progress = 100;
      updatedTask.status = 'completed';
    }

    // Set start date if starting
    if (task.status === 'pending' && updateData.status === 'in-progress') {
      updatedTask.startedAt = updatedTask.updatedAt;
    }

    // Update local state
    setTask(updatedTask);

    // Add update comment
    addUpdateComment();

    // Close modal
    setShowUpdateModal(false);
    
    // Show success message
    alert(`Task ${updateData.status === 'completed' ? 'completed' : 'updated'} successfully!\nHours spent: ${newHoursSpent}\nProgress: ${updateData.progress}%`);
  };

  // Add detailed comment about the update
  const addUpdateComment = () => {
    let commentText = '';
    
    if (updateData.status === 'completed') {
      commentText = `✅ Task marked as completed (100%). `;
      commentText += `Hours spent: ${updateData.hoursSpent}. `;
      if (updateData.whatCompleted) {
        commentText += `Completed: ${updateData.whatCompleted}. `;
      }
      if (updateData.notes) {
        commentText += `Notes: ${updateData.notes}`;
      }
    } else if (updateData.status === 'in-progress') {
      commentText = `🔄 Task progress updated to ${updateData.progress}%. `;
      if (updateData.whatCompleted) {
        commentText += `Work done: ${updateData.whatCompleted}. `;
      }
      if (updateData.notes) {
        commentText += `Notes: ${updateData.notes}`;
      }
    }

    const updateComment = {
      id: Date.now(),
      user: 'You',
      role: 'Team Member',
      text: commentText,
      time: 'Just now',
      avatar: 'TM'
    };

    setComments(prev => [...prev, updateComment]);
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    
    const comment = {
      id: Date.now(),
      user: 'You',
      role: 'Team Member',
      text: newComment,
      time: 'Just now',
      avatar: 'TM'
    };
    
    setComments(prev => [...prev, comment]);
    setNewComment('');
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-green-100 text-green-800';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const isOverdue = task && new Date(task.deadline) < new Date() && task.status !== 'completed';

  if (!task) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4DA5AD] mx-auto"></div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => navigate('/team-member/tasks')}
          className="flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Tasks
        </button>
        
        <div className="flex gap-2">
          <button
            onClick={() => handleOpenUpdate(task.status, task.progress)}
            className="px-4 py-2 bg-[#4DA5AD] text-white rounded-lg hover:bg-[#3D8B93] flex items-center"
          >
            <FileText className="w-4 h-4 mr-2" />
            Update Task
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Task Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-6">
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">{task.title}</h1>
                <p className="text-gray-600">{task.description}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(task.priority)}`}>
                  {task.priority} priority
                </span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(task.status)}`}>
                  {task.status}
                </span>
              </div>
            </div>

            {/* Task Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
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
                  <Calendar className="w-4 h-4 mr-2" />
                  Deadline
                </div>
                <div className="font-medium text-gray-900">{task.deadline}</div>
                {isOverdue && (
                  <div className="text-xs text-red-600 mt-1 flex items-center">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    Overdue
                  </div>
                )}
              </div>
              
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center text-sm text-gray-500 mb-1">
                  <Clock className="w-4 h-4 mr-2" />
                  Time Spent
                </div>
                <div className="font-medium text-gray-900">
                  {task.actualHours || 0}/{task.estimatedHours || 0} hours
                </div>
              </div>
            </div>

            {/* Progress */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-gray-900">Progress: {task.progress}%</span>
                <span className="text-sm text-gray-500">{task.status}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-[#4DA5AD] h-3 rounded-full"
                  style={{ width: `${task.progress}%` }}
                ></div>
              </div>
              
              {/* Progress Buttons */}
              <div className="flex flex-wrap gap-2 mt-4">
                {task.status === 'pending' && (
                  <button
                    onClick={() => handleOpenUpdate('in-progress', 25)}
                    className="px-3 py-1.5 bg-blue-100 text-blue-800 rounded-lg hover:bg-blue-200 text-sm"
                  >
                    Start (25%)
                  </button>
                )}
                
                {task.status === 'in-progress' && (
                  <>
                    <button
                      onClick={() => handleOpenUpdate('in-progress', 50)}
                      className="px-3 py-1.5 bg-blue-100 text-blue-800 rounded-lg hover:bg-blue-200 text-sm"
                    >
                      Halfway (50%)
                    </button>
                    <button
                      onClick={() => handleOpenUpdate('in-progress', 75)}
                      className="px-3 py-1.5 bg-blue-100 text-blue-800 rounded-lg hover:bg-blue-200 text-sm"
                    >
                      Almost Done (75%)
                    </button>
                    <button
                      onClick={() => handleOpenUpdate('completed', 100)}
                      className="px-3 py-1.5 bg-green-100 text-green-800 rounded-lg hover:bg-green-200 text-sm"
                    >
                      Complete (100%)
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Tags */}
            {task.tags && task.tags.length > 0 && (
              <div className="pt-6 border-t border-gray-200">
                <h3 className="font-medium text-gray-900 mb-3">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {task.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Comments */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-gray-900">Comments</h2>
              <span className="text-sm text-gray-500">{comments.length} comments</span>
            </div>
            
            <div className="space-y-4 mb-6">
              {comments.map(comment => (
                <div key={comment.id} className="border-l-4 border-[#4DA5AD] pl-4 py-3">
                  <div className="flex justify-between items-center mb-1">
                    <div className="flex items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium mr-2 ${
                        comment.user === 'You' 
                          ? 'bg-[#4DA5AD] text-white' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {comment.avatar}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{comment.user}</div>
                        <div className="text-xs text-gray-500">{comment.role}</div>
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">{comment.time}</span>
                  </div>
                  <p className="text-gray-700 mt-2 ml-10">{comment.text}</p>
                </div>
              ))}
            </div>

            <div className="flex">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddComment()}
                placeholder="Add a comment..."
                className="flex-1 border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#4DA5AD]"
              />
              <button 
                onClick={handleAddComment}
                className="px-4 py-2 bg-[#4DA5AD] text-white rounded-r-lg hover:bg-[#3D8B93]"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="font-bold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              {task.status === 'pending' && (
                <button
                  onClick={() => handleOpenUpdate('in-progress', 25)}
                  className="w-full px-4 py-3 bg-blue-100 text-blue-800 rounded-lg hover:bg-blue-200 flex items-center justify-center"
                >
                  <PlayCircle className="w-4 h-4 mr-2" />
                  Start Task (25%)
                </button>
              )}
              
              {task.status === 'in-progress' && (
                <>
                  <button
                    onClick={() => handleOpenUpdate('completed', 100)}
                    className="w-full px-4 py-3 bg-green-100 text-green-800 rounded-lg hover:bg-green-200 flex items-center justify-center"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Complete Task (100%)
                  </button>
                  
                  <button
                    onClick={() => handleOpenUpdate('in-progress', 75)}
                    className="w-full px-4 py-3 bg-blue-100 text-blue-800 rounded-lg hover:bg-blue-200 flex items-center justify-center"
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    Update to 75%
                  </button>
                </>
              )}
              
              <button
                onClick={() => handleOpenUpdate(task.status, task.progress)}
                className="w-full px-4 py-3 bg-[#4DA5AD] text-white rounded-lg hover:bg-[#3D8B93] flex items-center justify-center"
              >
                <FileText className="w-4 h-4 mr-2" />
                Custom Update
              </button>
            </div>
          </div>

          {/* Task History */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="font-bold text-gray-900 mb-4">Task History</h3>
            <div className="space-y-4">
              {task.createdAt && (
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-[#4DA5AD] rounded-full mt-2 mr-3"></div>
                  <div>
                    <div className="font-medium text-gray-900">Created</div>
                    <div className="text-sm text-gray-500">{task.createdAt}</div>
                  </div>
                </div>
              )}
              
              {task.startedAt && (
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></div>
                  <div>
                    <div className="font-medium text-gray-900">Started</div>
                    <div className="text-sm text-gray-500">{task.startedAt}</div>
                  </div>
                </div>
              )}
              
              {task.updatedAt && (
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3"></div>
                  <div>
                    <div className="font-medium text-gray-900">Last Updated</div>
                    <div className="text-sm text-gray-500">{task.updatedAt}</div>
                  </div>
                </div>
              )}

              {task.completedAt && (
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3"></div>
                  <div>
                    <div className="font-medium text-gray-900">Completed</div>
                    <div className="text-sm text-gray-500">{task.completedAt}</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Update Modal */}
      {showUpdateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-gray-900">
                  {updateData.status === 'completed' ? 'Complete Task' : 'Update Task'}
                </h3>
                <button
                  onClick={() => setShowUpdateModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-4">
                {/* Progress */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Progress: {updateData.progress}%
                  </label>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                    <div 
                      className="bg-[#4DA5AD] h-2 rounded-full"
                      style={{ width: `${updateData.progress}%` }}
                    ></div>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="5"
                    value={updateData.progress}
                    onChange={(e) => setUpdateData(prev => ({ ...prev, progress: parseInt(e.target.value) }))}
                    className="w-full"
                  />
                </div>

                {/* What was completed - Required for completion */}
                {updateData.status === 'completed' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      What was completed? *
                      <span className="text-red-500 ml-1">*</span>
                    </label>
                    <textarea
                      value={updateData.whatCompleted}
                      onChange={(e) => setUpdateData(prev => ({ ...prev, whatCompleted: e.target.value }))}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#4DA5AD]"
                      rows="3"
                      placeholder="Describe what was finished, features implemented, bugs fixed..."
                      required
                    />
                    {!updateData.whatCompleted.trim() && (
                      <p className="text-xs text-red-500 mt-1">
                        Please describe what was completed
                      </p>
                    )}
                  </div>
                )}

                {/* What progress was made - Optional for in-progress */}
                {updateData.status === 'in-progress' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      What progress was made? (Optional)
                    </label>
                    <textarea
                      value={updateData.whatCompleted}
                      onChange={(e) => setUpdateData(prev => ({ ...prev, whatCompleted: e.target.value }))}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#4DA5AD]"
                      rows="2"
                      placeholder="Describe progress made, components completed..."
                    />
                  </div>
                )}

                {/* Hours Spent */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Hours spent on this update
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.5"
                    value={updateData.hoursSpent}
                    onChange={(e) => setUpdateData(prev => ({ ...prev, hoursSpent: parseFloat(e.target.value) || 0 }))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#4DA5AD]"
                    placeholder="e.g., 2.5"
                  />
                </div>

                {/* Additional Notes */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Additional notes (optional)
                  </label>
                  <textarea
                    value={updateData.notes}
                    onChange={(e) => setUpdateData(prev => ({ ...prev, notes: e.target.value }))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#4DA5AD]"
                    rows="2"
                    placeholder="Any challenges, blockers, or additional information..."
                  />
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-200 p-6">
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowUpdateModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdateTask}
                  className="flex-1 px-4 py-2 bg-[#4DA5AD] text-white rounded-lg hover:bg-[#3D8B93] flex items-center justify-center"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {updateData.status === 'completed' ? 'Complete Task' : 'Update Task'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamMemberTaskDetails;