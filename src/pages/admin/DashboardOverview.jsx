import { useState, useEffect } from 'react';

const DashboardOverview  = () => {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    setTimeout(() => {
      setProjects([
        { 
          id: 1, 
          name: 'Website Redesign', 
          team: 'Design', 
          manager: 'Jane Smith', 
          status: 'in_progress', 
          startDate: '2024-01-15', 
          deadline: '2024-03-30',
          tasks: { total: 25, completed: 18 }
        },
        { 
          id: 2, 
          name: 'Mobile App', 
          team: 'Engineering', 
          manager: 'John Doe', 
          status: 'in_progress', 
          startDate: '2024-02-01', 
          deadline: '2024-05-15',
          tasks: { total: 42, completed: 19 }
        },
        { 
          id: 3, 
          name: 'API Migration', 
          team: 'Engineering', 
          manager: 'Bob Johnson', 
          status: 'completed', 
          startDate: '2023-11-01', 
          deadline: '2024-01-31',
          tasks: { total: 36, completed: 36 }
        },
        { 
          id: 4, 
          name: 'Database Upgrade', 
          team: 'DevOps', 
          manager: 'Mike Wilson', 
          status: 'to_do', 
          startDate: '2024-02-20', 
          deadline: '2024-04-10',
          tasks: { total: 15, completed: 4 }
        },
        { 
          id: 5, 
          name: 'UI/UX Redesign', 
          team: 'Design', 
          manager: 'Jane Smith', 
          status: 'to_do', 
          startDate: '2024-03-01', 
          deadline: '2024-06-30',
          tasks: { total: 28, completed: 2 }
        },
        { 
          id: 6, 
          name: 'Security Audit', 
          team: 'QA', 
          manager: 'Alice Brown', 
          status: 'in_progress', 
          startDate: '2024-02-10', 
          deadline: '2024-04-20',
          tasks: { total: 20, completed: 14 }
        },
      ]);
      setIsLoading(false);
    }, 500);
  }, []);

  const updateProjectStatus = (projectId, newStatus) => {
    setProjects(projects.map(project => 
      project.id === projectId ? { ...project, status: newStatus } : project
    ));
  };

  const getStatusConfig = (status) => {
    const configs = {
      'to_do': { 
        label: 'To Do', 
        color: 'bg-gray-100 text-gray-800',
        badgeColor: 'bg-gray-500',
        icon: '⏳'
      },
      'in_progress': { 
        label: 'In Progress', 
        color: 'bg-blue-100 text-blue-800',
        badgeColor: 'bg-blue-500',
        icon: '🚀'
      },
      'completed': { 
        label: 'Completed', 
        color: 'bg-green-100 text-green-800',
        badgeColor: 'bg-green-500',
        icon: '✅'
      }
    };
    return configs[status] || configs.to_do;
  };

  const getCompletionPercentage = (project) => {
    if (project.tasks && project.tasks.total > 0) {
      return Math.round((project.tasks.completed / project.tasks.total) * 100);
    }
    return project.status === 'completed' ? 100 : 0;
  };

  const getStatusOptions = () => [
    { value: 'to_do', label: 'To Do', color: 'text-gray-600' },
    { value: 'in_progress', label: 'In Progress', color: 'text-blue-600' },
    { value: 'completed', label: 'Completed', color: 'text-green-600' }
  ];

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(p => p.status === filter);

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4DA5AD]"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-lg font-bold text-gray-900">All Projects Overview</h2>
          <p className="text-sm text-gray-500 mt-1">View and manage project status across all teams</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-sm text-gray-500">
            {projects.filter(p => p.status === 'in_progress').length} In Progress
          </div>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#4DA5AD] focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="to_do">To Do</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Project</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Team</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Manager</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tasks</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Timeline</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredProjects.map((project) => {
              const statusConfig = getStatusConfig(project.status);
              const completion = getCompletionPercentage(project);
              
              return (
                <tr key={project.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{project.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                      {project.team}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                    {project.manager}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col gap-1">
                      <div className="text-sm text-gray-600">
                        {project.tasks?.completed || 0}/{project.tasks?.total || 0} tasks
                      </div>
                      <div className="w-32 bg-gray-200 rounded-full h-1.5">
                        <div
                          className={`h-1.5 rounded-full ${statusConfig.badgeColor}`}
                          style={{ width: `${completion}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <select
                        value={project.status}
                        onChange={(e) => updateProjectStatus(project.id, e.target.value)}
                        className={`text-sm ${statusConfig.color} px-3 py-1 rounded-full border-none focus:ring-2 focus:ring-[#4DA5AD] cursor-pointer`}
                      >
                        {getStatusOptions().map((option) => (
                          <option key={option.value} value={option.value} className={option.color}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                      <span className="text-sm">{statusConfig.icon}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {project.startDate} → {project.deadline}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Status Summary Cards */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h3 className="font-medium text-gray-900 mb-4">Project Status Summary</h3>
          <div className="space-y-4">
            {getStatusOptions().map((status) => {
              const count = projects.filter(p => p.status === status.value).length;
              const percentage = (count / projects.length) * 100;
              const config = getStatusConfig(status.value);
              
              return (
                <div key={status.value} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={config.color.includes('text') ? config.color.split(' ')[1] : ''}>
                      {config.icon}
                    </span>
                    <span className="text-sm font-medium text-gray-600">{status.label}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${config.badgeColor}`}
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-900">{count}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h3 className="font-medium text-gray-900 mb-4">Tasks Overview</h3>
          <div className="space-y-4">
            {projects.slice(0, 4).map((project) => {
              const completion = getCompletionPercentage(project);
              const statusConfig = getStatusConfig(project.status);
              
              return (
                <div key={project.id} className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900 truncate">{project.name}</div>
                    <div className="text-xs text-gray-500">
                      {project.tasks?.completed || 0}/{project.tasks?.total || 0} completed
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs px-2 py-1 rounded ${statusConfig.color}`}>
                      {statusConfig.label}
                    </span>
                    <span className="text-sm font-medium text-[#4DA5AD]">{completion}%</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h3 className="font-medium text-gray-900 mb-4">Status Legend</h3>
          <div className="space-y-3">
            {getStatusOptions().map((status) => {
              const config = getStatusConfig(status.value);
              return (
                <div key={status.value} className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                  <div className={`w-3 h-3 rounded-full ${config.badgeColor}`}></div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{status.label}</div>
                    <div className="text-xs text-gray-500">
                      {status.value === 'to_do' && 'Project is planned but not started'}
                      {status.value === 'in_progress' && 'Project is currently being worked on'}
                      {status.value === 'completed' && 'Project has been completed'}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview ;