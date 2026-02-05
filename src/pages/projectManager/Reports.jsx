// src/components/projectManager/Reports.jsx
import React, { useState } from 'react';
import { FileText, Download, Printer, Calendar, Filter, BarChart3, PieChart, TrendingUp } from 'lucide-react';
import EnhancedDataService from '../../services/enhencedDataservices';

const Reports = () => {
  const [selectedReport, setSelectedReport] = useState('progress');
  const [dateRange, setDateRange] = useState({
    start: '2024-01-01',
    end: '2024-12-31'
  });

  const reports = [
    {
      id: 'progress',
      name: 'Project Progress Report',
      description: 'Detailed progress of all projects',
      icon: <BarChart3 className="w-6 h-6" />,
      getMetrics: () => {
        const stats = EnhancedDataService.getDashboardStats();
        return [
          { label: 'Total Projects', value: stats.totalProjects },
          { label: 'Active Projects', value: stats.activeProjects },
          { label: 'Completed Projects', value: stats.completedProjects },
          { label: 'Overall Progress', value: `${stats.overallProgress}%` },
        ];
      }
    },
    {
      id: 'tasks',
      name: 'Task Completion Report',
      description: 'Task completion rates and performance',
      icon: <FileText className="w-6 h-6" />,
      getMetrics: () => {
        const stats = EnhancedDataService.getDashboardStats();
        return [
          { label: 'Total Tasks', value: stats.totalTasks },
          { label: 'Completed Tasks', value: stats.completedTasks },
          { label: 'Completion Rate', value: `${Math.round((stats.completedTasks / stats.totalTasks) * 100) || 0}%` },
          { label: 'Upcoming Deadlines', value: stats.upcomingDeadlines },
        ];
      }
    },
    {
      id: 'workload',
      name: 'Team Workload Report',
      description: 'Team member workload and distribution',
      icon: <PieChart className="w-6 h-6" />,
      getMetrics: () => {
        const teamPerformance = EnhancedDataService.getTeamPerformanceAnalytics();
        const totalTeams = teamPerformance.length;
        const avgPerformance = Math.round(teamPerformance.reduce((sum, team) => sum + team.performance, 0) / totalTeams);
        
        return [
          { label: 'Total Teams', value: totalTeams },
          { label: 'Avg Team Performance', value: `${avgPerformance}%` },
          { label: 'Total Team Members', value: teamPerformance.reduce((sum, team) => sum + team.memberCount, 0) },
          { label: 'Active Projects', value: teamPerformance.reduce((sum, team) => sum + team.activeProjects, 0) },
        ];
      }
    },
    {
      id: 'budget',
      name: 'Budget Utilization Report',
      description: 'Project budget tracking and spending',
      icon: <TrendingUp className="w-6 h-6" />,
      getMetrics: () => {
        const budgetAnalytics = EnhancedDataService.getBudgetAnalytics();
        return [
          { label: 'Total Budget', value: `$${budgetAnalytics.totalBudget.toLocaleString()}` },
          { label: 'Total Spent', value: `$${budgetAnalytics.totalSpent.toLocaleString()}` },
          { label: 'Remaining Budget', value: `$${budgetAnalytics.remainingBudget.toLocaleString()}` },
          { label: 'Avg Utilization', value: `${Math.round((budgetAnalytics.totalSpent / budgetAnalytics.totalBudget) * 100) || 0}%` },
        ];
      }
    }
  ];

  const currentReport = reports.find(r => r.id === selectedReport);
  const metrics = currentReport ? currentReport.getMetrics() : [];

  const handleDownload = (format) => {
    alert(`Downloading ${currentReport.name} as ${format}...`);
    // In real app: Generate and download report
  };

  const generateReport = () => {
    alert(`${currentReport.name} generated for ${dateRange.start} to ${dateRange.end}`);
    // In real app: Generate report with data
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-600">Generate and download project reports</p>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={generateReport}
            className="px-4 py-2 bg-[#4DA5AD] text-white rounded-lg hover:bg-[#3D8B93] flex items-center"
          >
            <FileText className="w-4 h-4 mr-2" />
            Generate Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Report Selection */}
        <div className="space-y-6">
          {/* Date Range */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              Date Range
            </h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Start Date</label>
                <input
                  type="date"
                  value={dateRange.start}
                  onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">End Date</label>
                <input
                  type="date"
                  value={dateRange.end}
                  onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
              </div>
            </div>
          </div>

          {/* Report Types */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="font-bold text-gray-900 mb-4">Report Types</h3>
            <div className="space-y-2">
              {reports.map(report => (
                <button
                  key={report.id}
                  onClick={() => setSelectedReport(report.id)}
                  className={`w-full text-left p-3 rounded-lg transition ${
                    selectedReport === report.id
                      ? 'bg-[#4DA5AD]/10 border border-[#4DA5AD]'
                      : 'border border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center">
                    <div className={`p-2 rounded-lg mr-3 ${
                      selectedReport === report.id ? 'bg-[#4DA5AD] text-white' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {report.icon}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{report.name}</div>
                      <div className="text-xs text-gray-500">{report.description}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Report Preview */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900">{currentReport?.name}</h2>
                <p className="text-gray-600">Generated: {new Date().toLocaleDateString()}</p>
              </div>
              <div className="flex space-x-2">
                {['PDF', 'Excel', 'CSV'].map(format => (
                  <button
                    key={format}
                    onClick={() => handleDownload(format)}
                    className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center"
                  >
                    <Download className="w-4 h-4 mr-1" />
                    {format}
                  </button>
                ))}
              </div>
            </div>

            {/* Report Content */}
            <div className="space-y-6">
              {/* Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {metrics.map((metric, index) => (
                  <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-gray-900">{metric.value}</div>
                    <div className="text-sm text-gray-600">{metric.label}</div>
                  </div>
                ))}
              </div>

              {/* Summary */}
              <div>
                <h3 className="font-bold text-gray-900 mb-3">Report Summary</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-700">
                    This {currentReport?.name.toLowerCase()} covers the period from {dateRange.start} to {dateRange.end}. 
                    {selectedReport === 'progress' && ' It provides detailed insights into project progress, completion rates, and overall performance.'}
                    {selectedReport === 'tasks' && ' It analyzes task completion rates, identifies bottlenecks, and tracks team performance on individual tasks.'}
                    {selectedReport === 'workload' && ' It examines team member workload distribution, identifies resource allocation issues, and suggests optimal resource planning.'}
                    {selectedReport === 'budget' && ' It tracks budget utilization across projects, identifies overspending patterns, and provides cost optimization recommendations.'}
                  </p>
                </div>
              </div>

              {/* Key Findings */}
              <div>
                <h3 className="font-bold text-gray-900 mb-3">Key Findings</h3>
                <ul className="space-y-2">
                  {selectedReport === 'progress' && (
                    <>
                      <li className="flex items-start">
                        <div className="bg-green-100 text-green-800 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mr-2 mt-0.5">
                          ✓
                        </div>
                        <span className="text-gray-700">Project completion rates have improved by 15% compared to last quarter</span>
                      </li>
                      <li className="flex items-start">
                        <div className="bg-yellow-100 text-yellow-800 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mr-2 mt-0.5">
                          !
                        </div>
                        <span className="text-gray-700">2 projects are behind schedule and require attention</span>
                      </li>
                    </>
                  )}
                  {selectedReport === 'tasks' && (
                    <>
                      <li className="flex items-start">
                        <div className="bg-green-100 text-green-800 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mr-2 mt-0.5">
                          ✓
                        </div>
                        <span className="text-gray-700">Task completion rate is at 87%, showing good progress</span>
                      </li>
                      <li className="flex items-start">
                        <div className="bg-red-100 text-red-800 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mr-2 mt-0.5">
                          ⚠
                        </div>
                        <span className="text-gray-700">12 tasks are overdue and require immediate attention</span>
                      </li>
                    </>
                  )}
                  {selectedReport === 'workload' && (
                    <>
                      <li className="flex items-start">
                        <div className="bg-green-100 text-green-800 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mr-2 mt-0.5">
                          ✓
                        </div>
                        <span className="text-gray-700">Workload distribution is balanced across most teams</span>
                      </li>
                      <li className="flex items-start">
                        <div className="bg-blue-100 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mr-2 mt-0.5">
                          ⚡
                        </div>
                        <span className="text-gray-700">Engineering team shows highest efficiency at 94%</span>
                      </li>
                    </>
                  )}
                  {selectedReport === 'budget' && (
                    <>
                      <li className="flex items-start">
                        <div className="bg-green-100 text-green-800 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mr-2 mt-0.5">
                          ✓
                        </div>
                        <span className="text-gray-700">Overall budget utilization is within limits at 85%</span>
                      </li>
                      <li className="flex items-start">
                        <div className="bg-yellow-100 text-yellow-800 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mr-2 mt-0.5">
                          $
                        </div>
                        <span className="text-gray-700">Mobile App v2 project is 10% over budget</span>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;