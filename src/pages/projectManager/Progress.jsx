// src/components/projectManager/Progress.jsx
import React, { useState } from 'react';
import { BarChart3, TrendingUp, PieChart, Calendar, Download, Users, Target } from 'lucide-react';
import EnhancedDataService from '../../services/enhencedDataservices';

const Progress = () => {
  const [timeRange, setTimeRange] = useState('month');

  // Get data from EnhancedDataService
  const stats = EnhancedDataService.getDashboardStats();
  const teamPerformance = EnhancedDataService.getTeamPerformanceAnalytics();
  const projectTimeline = EnhancedDataService.getProjectTimelineData();
  const memberWorkload = EnhancedDataService.getMemberWorkload();
  const budgetAnalytics = EnhancedDataService.getBudgetAnalytics();

  // Calculate derived stats
  const completedProjects = projectTimeline.filter(p => p.status === 'completed').length;
  const activeProjects = projectTimeline.filter(p => p.status === 'active').length;
  const overdueProjects = projectTimeline.filter(p => p.daysRemaining < 0 && p.status === 'active').length;
  const avgTeamPerformance = Math.round(teamPerformance.reduce((sum, team) => sum + team.performance, 0) / teamPerformance.length);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Progress Monitoring</h1>
          <p className="text-gray-600">Track project and team performance</p>
        </div>
        {/* <div className="flex space-x-3">
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
        </div> */}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Overall Progress</p>
              <p className="text-3xl font-bold text-gray-900">{stats.overallProgress}%</p>
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
              <p className="text-sm text-gray-500">Active Projects</p>
              <p className="text-3xl font-bold text-gray-900">{activeProjects}</p>
              <p className="text-sm text-gray-500 mt-1">{overdueProjects} overdue</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg text-green-600">
              <TrendingUp className="w-6 h-6" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Team Performance</p>
              <p className="text-3xl font-bold text-gray-900">{avgTeamPerformance}%</p>
              <p className="text-sm text-gray-500 mt-1">Average efficiency</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg text-purple-600">
              <Target className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Budget Utilization</p>
              <p className="text-3xl font-bold text-gray-900">
                {budgetAnalytics.totalBudget > 0 
                  ? Math.round((budgetAnalytics.totalSpent / budgetAnalytics.totalBudget) * 100)
                  : 0}%
              </p>
              <p className="text-sm text-gray-500 mt-1">${budgetAnalytics.remainingBudget.toLocaleString()} remaining</p>
            </div>
            <div className="bg-orange-100 p-3 rounded-lg text-orange-600">
              <Calendar className="w-6 h-6" />
            </div>
          </div>
        </div> */}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Project Progress */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-6">Project Progress</h2>
          <div className="space-y-4">
            {projectTimeline.map(project => (
              <div key={project.id} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-900">{project.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600">{project.progress}%</span>
                    {project.daysRemaining < 0 && project.status === 'active' && (
                      <span className="text-xs text-red-500">OVERDUE</span>
                    )}
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className={`h-3 rounded-full transition-all duration-300 ${
                      project.daysRemaining < 0 && project.status === 'active' ? 'bg-red-500' : 'bg-[#4DA5AD]'
                    }`}
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>{project.status}</span>
                  <span>{project.daysRemaining} days remaining</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Team Performance */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-6">Team Performance</h2>
          <div className="space-y-4">
            {teamPerformance.map(team => (
              <div key={team.teamId} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-center mb-3">
                  <div>
                    <h3 className="font-medium text-gray-900">{team.teamName}</h3>
                    <p className="text-sm text-gray-500">{team.memberCount} members</p>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs ${
                    team.performance >= 90 ? 'bg-green-100 text-green-800' :
                    team.performance >= 80 ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {team.performance}% efficiency
                  </span>
                </div>
                <div className="grid grid-cols-4 gap-2 text-center">
                  <div className="p-2 bg-green-50 rounded">
                    <div className="text-lg font-bold text-green-700">{team.tasks.completed}</div>
                    <div className="text-xs text-green-600">Completed</div>
                  </div>
                  <div className="p-2 bg-blue-50 rounded">
                    <div className="text-lg font-bold text-blue-700">{team.tasks.inProgress}</div>
                    <div className="text-xs text-blue-600">In Progress</div>
                  </div>
                  <div className="p-2 bg-red-50 rounded">
                    <div className="text-lg font-bold text-red-700">{team.tasks.overdue}</div>
                    <div className="text-xs text-red-600">Overdue</div>
                  </div>
                  <div className="p-2 bg-purple-50 rounded">
                    <div className="text-lg font-bold text-purple-700">{team.activeProjects}</div>
                    <div className="text-xs text-purple-600">Projects</div>
                  </div>
                </div>
                <div className="mt-3">
                  <div className="text-sm text-gray-600 mb-1">Top Skills:</div>
                  <div className="flex flex-wrap gap-1">
                    {team.skills.slice(0, 3).map((skill, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Member Workload */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-6">Member Workload Distribution</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {memberWorkload.slice(0, 6).map(member => (
            <div key={member.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 bg-gradient-to-br from-[#4DA5AD] to-[#2D4A6B] rounded-full flex items-center justify-center text-white font-medium mr-3">
                  {member.avatar}
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{member.name}</h3>
                  <p className="text-sm text-gray-500">{member.role} • {member.team}</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tasks:</span>
                  <span className="font-medium">{member.activeTasks} active</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Completed:</span>
                  <span className="font-medium text-green-600">{member.completedTasks}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Efficiency:</span>
                  <span className={`font-medium ${
                    member.efficiency >= 90 ? 'text-green-600' :
                    member.efficiency >= 80 ? 'text-yellow-600' :
                    'text-red-600'
                  }`}>
                    {member.efficiency}%
                  </span>
                </div>
              </div>
              
              {member.overdueTasks > 0 && (
                <div className="mt-3 p-2 bg-red-50 rounded text-center">
                  <span className="text-sm text-red-600 font-medium">
                    {member.overdueTasks} overdue task{member.overdueTasks > 1 ? 's' : ''}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Progress;