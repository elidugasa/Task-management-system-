// src/pages/manager/Reports.jsx - MONITOR Reports
import React, { useState } from 'react';
import { FileText, Download, Printer, Calendar, Filter } from 'lucide-react';

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
      icon: <FileText className="w-6 h-6" />,
      metrics: [
        { label: 'Total Projects', value: '8' },
        { label: 'Avg. Progress', value: '67.5%' },
        { label: 'Completed Projects', value: '2' },
        { label: 'Active Projects', value: '6' },
      ]
    },
    {
      id: 'tasks',
      name: 'Task Completion Report',
      description: 'Task completion rates and performance',
      icon: <FileText className="w-6 h-6" />,
      metrics: [
        { label: 'Total Tasks', value: '142' },
        { label: 'Completed Tasks', value: '89' },
        { label: 'Overdue Tasks', value: '12' },
        { label: 'Completion Rate', value: '62.7%' },
      ]
    },
    {
      id: 'workload',
      name: 'Team Workload Report',
      description: 'Team member workload and distribution',
      icon: <FileText className="w-6 h-6" />,
      metrics: [
        { label: 'Team Members', value: '24' },
        { label: 'Avg Tasks/Member', value: '5.9' },
        { label: 'Max Workload', value: '12 tasks' },
        { label: 'Min Workload', value: '2 tasks' },
      ]
    }
  ];

  const currentReport = reports.find(r => r.id === selectedReport);

  const handleDownload = (format) => {
    alert(`Downloading ${currentReport.name} as ${format}...`);
    // In real app: Generate and download report
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
          <p className="text-gray-600">Generate and download project reports</p>
        </div>
        <div className="flex space-x-3">
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center">
            <Printer className="w-4 h-4 mr-2" />
            Print
          </button>
          <button className="px-4 py-2 bg-[#4DA5AD] text-white rounded-lg hover:bg-[#3D8B93] flex items-center">
            <Download className="w-4 h-4 mr-2" />
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
                <h2 className="text-xl font-bold text-gray-900">{currentReport.name}</h2>
                <p className="text-gray-600">Generated: {new Date().toLocaleDateString()}</p>
              </div>
              <div className="flex space-x-2">
                {['PDF', 'Excel', 'CSV'].map(format => (
                  <button
                    key={format}
                    onClick={() => handleDownload(format)}
                    className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    {format}
                  </button>
                ))}
              </div>
            </div>

            {/* Report Content */}
            <div className="space-y-6">
              {/* Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {currentReport.metrics.map((metric, index) => (
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
                    This report covers the period from {dateRange.start} to {dateRange.end}. 
                    It provides insights into project performance, task completion rates, 
                    and team workload distribution for better resource planning and management.
                  </p>
                </div>
              </div>

              {/* Key Findings */}
              <div>
                <h3 className="font-bold text-gray-900 mb-3">Key Findings</h3>
                <ul className="space-y-2">
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
                    <span className="text-gray-700">12 tasks are currently overdue and require immediate attention</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-blue-100 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mr-2 mt-0.5">
                      ⚡
                    </div>
                    <span className="text-gray-700">Team efficiency is at 87%, showing consistent performance</span>
                  </li>
                </ul>
              </div>

              {/* Recommendations */}
              <div>
                <h3 className="font-bold text-gray-900 mb-3">Recommendations</h3>
                <div className="bg-blue-50 rounded-lg p-4">
                  <ul className="space-y-2">
                    <li>Reallocate resources to address overdue tasks</li>
                    <li>Consider adjusting deadlines for projects with less than 50% progress</li>
                    <li>Schedule team training sessions to improve efficiency further</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;