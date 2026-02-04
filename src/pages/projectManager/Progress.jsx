// src/pages/manager/Progress.jsx - MONITOR Progress
import React, { useState } from 'react';
import { BarChart3, TrendingUp, PieChart, Calendar, Download } from 'lucide-react';

const Progress = () => {
  const [timeRange, setTimeRange] = useState('month');

  const projectProgress = [
    { name: 'Mobile App v2', progress: 75, completed: 18, total: 24, color: '#4DA5AD' },
    { name: 'Website Redesign', progress: 45, completed: 8, total: 18, color: '#FF6B6B' },
    { name: 'API Migration', progress: 90, completed: 32, total: 32, color: '#51CF66' },
    { name: 'Payment Integration', progress: 60, completed: 10, total: 16, color: '#FF922B' },
  ];

  const teamPerformance = [
    { name: 'John Doe', completed: 24, inProgress: 3, overdue: 1, efficiency: 92 },
    { name: 'Jane Smith', completed: 18, inProgress: 2, overdue: 0, efficiency: 96 },
    { name: 'Mike Wilson', completed: 32, inProgress: 1, overdue: 0, efficiency: 98 },
    { name: 'Alice Brown', completed: 12, inProgress: 4, overdue: 2, efficiency: 78 },
  ];

  const stats = {
    totalProgress: Math.round(projectProgress.reduce((sum, p) => sum + p.progress, 0) / projectProgress.length),
    completedTasks: projectProgress.reduce((sum, p) => sum + p.completed, 0),
    totalTasks: projectProgress.reduce((sum, p) => sum + p.total, 0),
    avgEfficiency: Math.round(teamPerformance.reduce((sum, t) => sum + t.efficiency, 0) / teamPerformance.length),
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Progress Monitoring</h1>
          <p className="text-gray-600">Track project and team performance</p>
        </div>
        <div className="flex space-x-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
          </select>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center">
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Overall Progress</p>
              <p className="text-3xl font-bold text-gray-900">{stats.totalProgress}%</p>
              <p className="text-sm text-gray-500 mt-1">Across all projects</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg text-blue-600">
              <BarChart3 className="w-6 h-6" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Tasks Completed</p>
              <p className="text-3xl font-bold text-gray-900">{stats.completedTasks}/{stats.totalTasks}</p>
              <p className="text-sm text-gray-500 mt-1">
                {Math.round((stats.completedTasks / stats.totalTasks) * 100)}% completion rate
              </p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg text-green-600">
              <TrendingUp className="w-6 h-6" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Team Efficiency</p>
              <p className="text-3xl font-bold text-gray-900">{stats.avgEfficiency}%</p>
              <p className="text-sm text-gray-500 mt-1">Average performance</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg text-purple-600">
              <PieChart className="w-6 h-6" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">On-time Delivery</p>
              <p className="text-3xl font-bold text-gray-900">87%</p>
              <p className="text-sm text-gray-500 mt-1">Projects delivered on schedule</p>
            </div>
            <div className="bg-orange-100 p-3 rounded-lg text-orange-600">
              <Calendar className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Project Progress */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-6">Project Progress</h2>
          <div className="space-y-4">
            {projectProgress.map(project => (
              <div key={project.name} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-900">{project.name}</span>
                  <span className="text-gray-600">{project.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="h-3 rounded-full transition-all duration-300"
                    style={{ 
                      width: `${project.progress}%`,
                      backgroundColor: project.color
                    }}
                  ></div>
                </div>
                <div className="text-sm text-gray-500">
                  {project.completed}/{project.total} tasks completed
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Team Performance */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-6">Team Performance</h2>
          <div className="space-y-4">
            {teamPerformance.map(member => (
              <div key={member.name} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-center mb-3">
                  <span className="font-medium text-gray-900">{member.name}</span>
                  <span className={`px-2 py-1 rounded text-xs ${
                    member.efficiency >= 90 ? 'bg-green-100 text-green-800' :
                    member.efficiency >= 80 ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {member.efficiency}% efficiency
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="p-2 bg-green-50 rounded">
                    <div className="text-lg font-bold text-green-700">{member.completed}</div>
                    <div className="text-xs text-green-600">Completed</div>
                  </div>
                  <div className="p-2 bg-blue-50 rounded">
                    <div className="text-lg font-bold text-blue-700">{member.inProgress}</div>
                    <div className="text-xs text-blue-600">In Progress</div>
                  </div>
                  <div className="p-2 bg-red-50 rounded">
                    <div className="text-lg font-bold text-red-700">{member.overdue}</div>
                    <div className="text-xs text-red-600">Overdue</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Progress;