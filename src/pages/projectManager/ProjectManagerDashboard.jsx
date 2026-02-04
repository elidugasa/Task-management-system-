// src/pages/manager/ProjectManagerDashboard.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FolderKanban, CheckSquare, Clock, AlertCircle, 
  Users, Calendar, TrendingUp, Plus,
  FileText, Download, ChevronRight, Activity,  // Added ChevronRight
  MoreVertical, Edit, Trash2
} from 'lucide-react';

const ProjectManagerDashboard = () => {
  const navigate = useNavigate();

  // Stats data
  const [stats, setStats] = useState({
    totalProjects: 8,
    totalTasks: 142,
    completedTasks: 89,
    overdueTasks: 12,
    activeTeamMembers: 24,
    upcomingDeadlines: 7
  });

  // Recent projects
  const [recentProjects, setRecentProjects] = useState([
    { 
      id: 1, 
      name: 'Mobile App v2', 
      progress: 75, 
      status: 'active', 
      dueDate: '2024-06-15',
      tasks: { total: 24, completed: 18, overdue: 2 },
      team: ['John', 'Jane', 'Mike']
    },
    { 
      id: 2, 
      name: 'Website Redesign', 
      progress: 45, 
      status: 'active', 
      dueDate: '2024-07-30',
      tasks: { total: 18, completed: 8, overdue: 1 },
      team: ['Alice', 'Tom']
    },
    { 
      id: 3, 
      name: 'API Migration', 
      progress: 90, 
      status: 'completed', 
      dueDate: '2024-03-01',
      tasks: { total: 32, completed: 32, overdue: 0 },
      team: ['Bob', 'Sarah']
    },
  ]);

  // Recent tasks
  const [recentTasks, setRecentTasks] = useState([
    { 
      id: 1, 
      title: 'Fix login authentication bug', 
      project: 'Mobile App v2', 
      assignee: 'John Doe',
      dueDate: 'Today',
      progress: 80,
      priority: 'high',
      status: 'in-progress'
    },
    { 
      id: 2, 
      title: 'Design homepage mockups', 
      project: 'Website Redesign', 
      assignee: 'Jane Smith',
      dueDate: 'Tomorrow',
      progress: 60,
      priority: 'medium',
      status: 'in-progress'
    },
    { 
      id: 3, 
      title: 'API documentation overdue', 
      project: 'API Migration', 
      assignee: 'Mike Wilson',
      dueDate: 'Yesterday',
      progress: 0,
      priority: 'high',
      status: 'overdue'
    },
  ]);

  // Quick actions
  const quickActions = [
    { title: 'Create New Project', icon: <Plus className="w-5 h-5" />, onClick: () => navigate('/manager/projects/create') },
    { title: 'Assign Task', icon: <CheckSquare className="w-5 h-5" />, onClick: () => navigate('/manager/tasks/create') },
    { title: 'View Progress', icon: <Activity className="w-5 h-5" />, onClick: () => navigate('/manager/progress') },
    { title: 'Generate Report', icon: <FileText className="w-5 h-5" />, onClick: () => navigate('/manager/reports') },
  ];

  // Stats cards data
  const statsCards = [
    { 
      title: 'Total Projects', 
      value: stats.totalProjects, 
      change: '+2 this month', 
      icon: <FolderKanban className="w-6 h-6" />,
      color: 'bg-blue-100 text-blue-600'
    },
    { 
      title: 'Total Tasks', 
      value: stats.totalTasks, 
      change: '42 active', 
      icon: <CheckSquare className="w-6 h-6" />,
      color: 'bg-green-100 text-green-600'
    },
    { 
      title: 'Completed Tasks', 
      value: stats.completedTasks, 
      change: '+15% from last month', 
      icon: <TrendingUp className="w-6 h-6" />,
      color: 'bg-purple-100 text-purple-600'
    },
    { 
      title: 'Overdue Tasks', 
      value: stats.overdueTasks, 
      change: 'Needs attention', 
      icon: <AlertCircle className="w-6 h-6" />,
      color: 'bg-red-100 text-red-600'
    },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Project Manager Dashboard</h1>
          <p className="text-gray-600">Monitor and manage projects and tasks</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center text-sm text-gray-600">
            <Users className="w-4 h-4 mr-2" />
            <span>Team: {stats.activeTeamMembers} members</span>
          </div>
          <button 
            onClick={() => navigate('/manager/projects/create')}
            className="px-4 py-2 bg-[#4DA5AD] text-white rounded-lg hover:bg-[#3D8B93] flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Project
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                <p className="text-sm text-gray-500 mt-1">{stat.change}</p>
              </div>
              <div className={`${stat.color} p-3 rounded-lg`}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h2>
            <div className="space-y-3">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  onClick={action.onClick}
                  className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-blue-200 transition"
                >
                  <div className="flex items-center">
                    <div className="text-blue-600 mr-3">{action.icon}</div>
                    <span className="font-medium text-gray-900">{action.title}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Project Progress */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-gray-900">Project Progress</h2>
              <button 
                onClick={() => navigate('/manager/projects')}
                className="text-sm text-[#4DA5AD] hover:underline flex items-center"
              >
                View All <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            </div>
            
            <div className="space-y-4">
              {recentProjects.map(project => (
                <div 
                  key={project.id} 
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition cursor-pointer"
                  onClick={() => navigate(`/manager/projects/${project.id}`)}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-medium text-gray-900">{project.name}</h3>
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <Users className="w-3 h-3 mr-1" />
                        <span>{project.team.length} members</span>
                        <span className="mx-2">•</span>
                        <Calendar className="w-3 h-3 mr-1" />
                        <span>Due: {project.dueDate}</span>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs ${
                      project.status === 'active' ? 'bg-green-100 text-green-800' :
                      project.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                  
                  <div className="mb-2">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Progress</span>
                      <span>{project.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-[#4DA5AD] h-2 rounded-full transition-all duration-300"
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Tasks: {project.tasks.completed}/{project.tasks.total} completed</span>
                    {project.tasks.overdue > 0 && (
                      <span className="text-red-500">{project.tasks.overdue} overdue</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Tasks */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold text-gray-900">Recent Tasks</h2>
          <button 
            onClick={() => navigate('/manager/tasks')}
            className="text-sm text-[#4DA5AD] hover:underline flex items-center"
          >
            View All Tasks <ChevronRight className="w-4 h-4 ml-1" />
          </button>
        </div>
        
        <div className="space-y-3">
          {recentTasks.map(task => (
            <div 
              key={task.id} 
              className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition cursor-pointer"
              onClick={() => navigate(`/manager/tasks/${task.id}`)}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{task.title}</h3>
                  <p className="text-sm text-gray-500">{task.project} • {task.assignee}</p>
                </div>
                <span className={`px-2 py-1 rounded text-xs ${
                  task.priority === 'high' ? 'bg-red-100 text-red-800' :
                  task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {task.priority}
                </span>
              </div>
              
              <div className="flex justify-between items-center mt-3">
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="w-3 h-3 mr-1" />
                  <span>{task.dueDate}</span>
                </div>
                <div className="flex items-center">
                  <div className="w-20 bg-gray-200 rounded-full h-1.5 mr-2">
                    <div 
                      className="bg-[#4DA5AD] h-1.5 rounded-full"
                      style={{ width: `${task.progress}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600">{task.progress}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectManagerDashboard;