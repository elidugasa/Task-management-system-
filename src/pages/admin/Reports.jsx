// src/pages/admin/Reports.jsx
import React, { useState } from 'react';
import { Download, FileText, FileSpreadsheet, FileCode, Printer, TrendingUp, Users, Users2, FolderKanban, BarChart3, Calendar, Eye } from 'lucide-react';

const Reports = () => {
  const [selectedFormat, setSelectedFormat] = useState('pdf');
  const [dateRange, setDateRange] = useState({
    start: '2024-01-01',
    end: '2024-12-31'
  });

  // Mock report data with detailed content
  const reports = {
    overall: {
      id: 'overall',
      name: 'Overall System Report',
      description: 'Comprehensive system performance and key metrics',
      icon: <BarChart3 className="w-6 h-6" />,
      color: 'bg-blue-500',
      content: {
        summary: "The system has shown significant improvement in performance and user engagement over the selected period. Key metrics indicate healthy growth across all departments.",
        sections: [
          {
            title: "Performance Overview",
            metrics: [
              { label: 'System Uptime', value: '99.8%', target: '99.5%', status: 'exceeded' },
              { label: 'Response Time', value: '0.8s', target: '1.0s', status: 'exceeded' },
              { label: 'Error Rate', value: '0.2%', target: '0.5%', status: 'exceeded' },
            ]
          },
          {
            title: "User Engagement",
            metrics: [
              { label: 'Daily Active Users', value: '856', growth: '+12%' },
              { label: 'Avg Session Duration', value: '24m', growth: '+8%' },
              { label: 'Feature Adoption', value: '78%', growth: '+15%' },
            ]
          }
        ],
        recommendations: [
          "Continue monitoring server performance during peak hours",
          "Consider adding more granular permission controls",
          "Implement advanced analytics dashboard for admins"
        ]
      }
    },
    users: {
      id: 'users',
      name: 'Users Report',
      description: 'User statistics, roles, and activity',
      icon: <Users className="w-6 h-6" />,
      color: 'bg-green-500',
      content: {
        summary: "User base has grown steadily with high engagement rates. New features have been well-received by the community.",
        sections: [
          {
            title: "Demographics",
            metrics: [
              { label: 'Total Users', value: '1,245', growth: '+12%' },
              { label: 'Active Users', value: '987', growth: '+8%' },
              { label: 'New Signups', value: '156', growth: '+23%' },
            ]
          },
          {
            title: "Role Distribution",
            metrics: [
              { label: 'Administrators', value: '15', percentage: '1.2%' },
              { label: 'Project Managers', value: '42', percentage: '3.4%' },
              { label: 'Team Members', value: '1,188', percentage: '95.4%' },
            ]
          }
        ]
      }
    },
    teams: {
      id: 'teams',
      name: 'Teams Report',
      description: 'Team performance and collaboration metrics',
      icon: <Users2 className="w-6 h-6" />,
      color: 'bg-purple-500',
      content: {
        summary: "Team collaboration has improved significantly with the new project management features. Cross-team projects show highest success rates.",
        sections: [
          {
            title: "Team Statistics",
            metrics: [
              { label: 'Total Teams', value: '42', growth: '+5%' },
              { label: 'Active Members', value: '856', growth: '+9%' },
              { label: 'Projects/Team', value: '2.1', growth: '+0.3' },
            ]
          },
          {
            title: "Performance Metrics",
            metrics: [
              { label: 'Avg Team Score', value: '8.7/10', trend: 'up' },
              { label: 'Project Success Rate', value: '92%', trend: 'up' },
              { label: 'Cross-team Collaboration', value: '78%', trend: 'up' },
            ]
          }
        ]
      }
    },
    projects: {
      id: 'projects',
      name: 'Projects Report',
      description: 'Project progress, deadlines, and status',
      icon: <FolderKanban className="w-6 h-6" />,
      color: 'bg-orange-500',
      content: {
        summary: "Project completion rates have increased by 18% this quarter. Agile methodologies have proven effective for complex projects.",
        sections: [
          {
            title: "Project Overview",
            metrics: [
              { label: 'Total Projects', value: '89', growth: '+18%' },
              { label: 'Active Projects', value: '67', percentage: '75%' },
              { label: 'Completed Projects', value: '22', percentage: '25%' },
            ]
          },
          {
            title: "Timeline Performance",
            metrics: [
              { label: 'On-time Delivery', value: '85%', target: '90%' },
              { label: 'Avg Project Duration', value: '68 days', trend: '-5 days' },
              { label: 'Budget Adherence', value: '94%', target: '95%' },
            ]
          }
        ]
      }
    }
  };

  const [selectedReport, setSelectedReport] = useState('overall');
  const currentReport = reports[selectedReport];

  const formatOptions = [
    { id: 'pdf', name: 'PDF (Print)', icon: <FileText className="w-5 h-5" /> },
    { id: 'excel', name: 'Excel (.xls)', icon: <FileSpreadsheet className="w-5 h-5" /> },
    { id: 'csv', name: 'CSV (.csv)', icon: <FileSpreadsheet className="w-5 h-5" /> },
    { id: 'json', name: 'JSON (.json)', icon: <FileCode className="w-5 h-5" /> },
  ];

  const handleDownloadReport = () => {
    const selectedFormatData = formatOptions.find(f => f.id === selectedFormat);
    
    // Create a mock download with actual report content
    const filename = `${currentReport.name.replace(/\s+/g, '_')}_${dateRange.start}_${dateRange.end}.${selectedFormat}`;
    
    let content = `=== ${currentReport.name} ===\n`;
    content += `Date Range: ${dateRange.start} to ${dateRange.end}\n`;
    content += `Generated: ${new Date().toLocaleString()}\n\n`;
    content += `SUMMARY:\n${currentReport.content.summary}\n\n`;
    
    currentReport.content.sections.forEach(section => {
      content += `${section.title}:\n`;
      section.metrics.forEach(metric => {
        content += `  - ${metric.label}: ${metric.value}`;
        if (metric.growth) content += ` (${metric.growth})`;
        if (metric.target) content += ` | Target: ${metric.target}`;
        content += '\n';
      });
      content += '\n';
    });
    
    if (currentReport.content.recommendations) {
      content += "RECOMMENDATIONS:\n";
      currentReport.content.recommendations.forEach((rec, index) => {
        content += `  ${index + 1}. ${rec}\n`;
      });
    }
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    // Show success message
    alert(`Downloaded ${currentReport.name} as ${selectedFormatData.name}`);
  };

  const handlePrintReport = () => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>${currentReport.name}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h1 { color: #333; }
            .section { margin: 20px 0; }
            .metric { margin: 10px 0; padding: 10px; background: #f5f5f5; }
            .header { display: flex; justify-content: space-between; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>${currentReport.name}</h1>
            <p>Generated: ${new Date().toLocaleDateString()}</p>
          </div>
          <p><strong>Date Range:</strong> ${dateRange.start} to ${dateRange.end}</p>
          <p><strong>Summary:</strong> ${currentReport.content.summary}</p>
          ${currentReport.content.sections.map(section => `
            <div class="section">
              <h2>${section.title}</h2>
              ${section.metrics.map(metric => `
                <div class="metric">
                  <strong>${metric.label}:</strong> ${metric.value}
                  ${metric.growth ? `<br><small>Growth: ${metric.growth}</small>` : ''}
                  ${metric.target ? `<br><small>Target: ${metric.target}</small>` : ''}
                </div>
              `).join('')}
            </div>
          `).join('')}
          ${currentReport.content.recommendations ? `
            <div class="section">
              <h2>Recommendations</h2>
              <ul>
                ${currentReport.content.recommendations.map(rec => `<li>${rec}</li>`).join('')}
              </ul>
            </div>
          ` : ''}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Reports & Analytics</h1>
          <p className="text-gray-600">View and download system reports</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={handlePrintReport}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center"
          >
            <Printer className="w-4 h-4 mr-2" />
            Print Report
          </button>
          <button
            onClick={handleDownloadReport}
            className="px-4 py-2 bg-gradient-to-r from-[#4DA5AD] to-[#2D4A6B] text-white rounded-lg hover:opacity-90 transition font-medium flex items-center"
          >
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Panel - Report Selection */}
        <div className="lg:col-span-1 space-y-4">
          {/* Date Range */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <h3 className="font-bold text-gray-900 mb-3 flex items-center">
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
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">End Date</label>
                <input
                  type="date"
                  value={dateRange.end}
                  onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                />
              </div>
            </div>
          </div>

          {/* Report Types */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <h3 className="font-bold text-gray-900 mb-3">Select Report</h3>
            <div className="space-y-2">
              {Object.values(reports).map((report) => (
                <button
                  key={report.id}
                  onClick={() => setSelectedReport(report.id)}
                  className={`w-full flex items-center p-3 rounded-lg transition ${
                    selectedReport === report.id
                      ? 'bg-[#4DA5AD]/10 border border-[#4DA5AD] text-[#4DA5AD]'
                      : 'border border-gray-200 hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <div className={`p-2 rounded-lg mr-3 ${selectedReport === report.id ? 'bg-[#4DA5AD] text-white' : 'bg-gray-100 text-gray-600'}`}>
                    {report.icon}
                  </div>
                  <div className="text-left">
                    <div className="font-medium">{report.name}</div>
                    <div className="text-xs text-gray-500">{report.description}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Export Options */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <h3 className="font-bold text-gray-900 mb-3">Download as:</h3>
            <div className="space-y-2">
              {formatOptions.map((format) => (
                <button
                  key={format.id}
                  onClick={() => setSelectedFormat(format.id)}
                  className={`w-full flex items-center p-3 rounded-lg transition ${
                    selectedFormat === format.id
                      ? 'bg-blue-50 border border-blue-200 text-blue-700'
                      : 'border border-gray-200 hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <div className="mr-3">{format.icon}</div>
                  <div className="font-medium">{format.name}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Panel - Report Display */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {/* Report Header */}
            <div className="border-b border-gray-200 p-6">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center mb-2">
                    <div className={`p-2 rounded-lg ${currentReport.color} text-white mr-3`}>
                      {currentReport.icon}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">{currentReport.name}</h2>
                      <p className="text-gray-600">{currentReport.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center text-sm text-gray-500 mt-4">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>Date Range: {dateRange.start} to {dateRange.end}</span>
                    <span className="mx-2">•</span>
                    <span>Generated: {new Date().toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">Currently viewing</span>
                  <Eye className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            </div>

            {/* Report Content */}
            <div className="p-6">
              {/* Summary Section */}
              <div className="mb-8">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Executive Summary</h3>
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <p className="text-gray-700">{currentReport.content.summary}</p>
                </div>
              </div>

              {/* Metrics Sections */}
              {currentReport.content.sections.map((section, index) => (
                <div key={index} className="mb-8">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">{section.title}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {section.metrics.map((metric, metricIndex) => (
                      <div key={metricIndex} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition">
                        <div className="text-sm text-gray-500 mb-1">{metric.label}</div>
                        <div className="text-2xl font-bold text-gray-900 mb-2">{metric.value}</div>
                        <div className="flex items-center justify-between">
                          {metric.growth && (
                            <span className="text-sm text-green-600 flex items-center">
                              <TrendingUp className="w-3 h-3 mr-1" />
                              {metric.growth}
                            </span>
                          )}
                          {metric.target && (
                            <span className={`text-sm ${
                              metric.status === 'exceeded' ? 'text-green-600' : 'text-blue-600'
                            }`}>
                              Target: {metric.target}
                            </span>
                          )}
                          {metric.percentage && (
                            <span className="text-sm text-blue-600">{metric.percentage}</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              {/* Recommendations (if available) */}
              {currentReport.content.recommendations && (
                <div className="mb-8">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Recommendations</h3>
                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                    <ul className="space-y-2">
                      {currentReport.content.recommendations.map((rec, index) => (
                        <li key={index} className="flex items-start">
                          <div className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                            {index + 1}
                          </div>
                          <span className="text-gray-700">{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Export Note */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    This report can be exported in multiple formats using the export buttons above.
                  </div>
                  <div className="flex space-x-3">
                    <button
                      onClick={handlePrintReport}
                      className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center text-sm"
                    >
                      <Printer className="w-4 h-4 mr-2" />
                      Print
                    </button>
                    <button
                      onClick={handleDownloadReport}
                      className="px-4 py-2 bg-[#4DA5AD] text-white rounded-lg hover:bg-[#3D8B93] flex items-center text-sm"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download as {formatOptions.find(f => f.id === selectedFormat)?.name.split(' ')[0]}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Stats</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-gray-900">1,245</div>
            <div className="text-sm text-gray-600">Total Users</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-gray-900">42</div>
            <div className="text-sm text-gray-600">Active Teams</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-gray-900">89</div>
            <div className="text-sm text-gray-600">Active Projects</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-gray-900">99.8%</div>
            <div className="text-sm text-gray-600">System Uptime</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;