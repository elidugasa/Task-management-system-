// src/pages/admin/TeamDetailsPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const TeamDetailsPage = () => {
  const { teamId } = useParams();
  const navigate = useNavigate();
  
  // Mock teams data - in real app, this would come from an API
  const mockTeams = [
    {
      id: 1,
      name: 'Engineering',
      lead: 'chala',
      members: 3,
      projects: 4,
      color: '#4DA5AD',
      description: 'Responsible for developing and maintaining software applications and infrastructure',
      teamMembers: [1, 5, 7],
      teamProjects: [
        { 
          id: 1, 
          name: 'Mobile App v2', 
          progress: 75, 
          status: 'active', 
          dueDate: '2024-06-15',
          description: 'Develop next generation mobile application with enhanced features',
          manager: 'Jane Smith',
          priority: 'high'
        },
        { 
          id: 2, 
          name: 'API Migration', 
          progress: 90, 
          status: 'completed', 
          dueDate: '2024-03-01',
          description: 'Migrate legacy APIs to microservices architecture',
          manager: 'Bob Johnson',
          priority: 'medium'
        },
        { 
          id: 3, 
          name: 'Database Optimization', 
          progress: 45, 
          status: 'active', 
          dueDate: '2024-07-30',
          description: 'Optimize database queries and improve performance',
          manager: 'wabi',
          priority: 'high'
        },
        { 
          id: 4, 
          name: 'Payment Integration', 
          progress: 60, 
          status: 'active', 
          dueDate: '2024-05-20',
          description: 'Integrate new payment gateway with enhanced security',
          manager: 'abdi',
          priority: 'medium'
        },
      ]
    },
    {
      id: 2,
      name: 'Design',
      lead: 'tola',
      members: 5,
      projects: 3,
      color: '#FF6B6B',
      description: 'Responsible for UI/UX design and user experience',
      teamMembers: [2, 6],
      teamProjects: [
        { 
          id: 5, 
          name: 'Website Redesign', 
          progress: 80, 
          status: 'active', 
          dueDate: '2024-05-10',
          description: 'Redesign company website with modern aesthetics',
          manager: 'tola',
          priority: 'high'
        },
      ]
    },
    {
      id: 3,
      name: 'QA',
      lead: 'Hawwi',
      members: 4,
      projects: 2,
      color: '#51CF66',
      description: 'Quality assurance and testing team',
      teamMembers: [4],
      teamProjects: [
        { 
          id: 6, 
          name: 'Testing Automation', 
          progress: 30, 
          status: 'active', 
          dueDate: '2024-08-15',
          description: 'Implement automated testing framework',
          manager: 'Hawwi',
          priority: 'medium'
        },
      ]
    },
    {
      id: 4,
      name: 'DevOps',
      lead: 'fedasa',
      members: 1,
      projects: 1,
      color: '#FF922B',
      description: 'Infrastructure and deployment management',
      teamMembers: [5],
      teamProjects: [
        { 
          id: 7, 
          name: 'CI/CD Pipeline', 
          progress: 70, 
          status: 'active', 
          dueDate: '2024-04-30',
          description: 'Build continuous integration and deployment pipeline',
          manager: 'fedasa',
          priority: 'high'
        },
      ]
    }
  ];

  const [users] = useState([
    { id: 1, name: 'chala', email: 'chala@company.com', role: 'team_member', status: 'active', avatar: 'CH' },
    { id: 2, name: 'tola', email: 'tola@company.com', role: 'project_manager', status: 'active', avatar: 'TO' },
    { id: 3, name: 'Ebbaa', email: 'ebbaa@company.com', role: 'admin', status: 'active', avatar: 'EB' },
    { id: 4, name: 'Hawwi', email: 'hawwi@company.com', role: 'team_member', status: 'inactive', avatar: 'HA' },
    { id: 5, name: 'fedasa', email: 'fedasa@company.com', role: 'team_member', status: 'active', avatar: 'FE' },
    { id: 6, name: 'wabi', email: 'wabi@company.com', role: 'project_manager', status: 'active', avatar: 'WA' },
    { id: 7, name: 'dula', email: 'dula@company.com', role: 'team_member', status: 'active', avatar: 'DU' },
    { id: 8, name: 'Emi', email: 'emi@company.com', role: 'team_member', status: 'active', avatar: 'EM' },
  ]);

  // Initialize team state and find the team based on teamId
  const [team, setTeam] = useState(null);
  const [showAddMemberPopup, setShowAddMemberPopup] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  // Find the team when component mounts or teamId changes
  useEffect(() => {
    const foundTeam = mockTeams.find(t => t.id === parseInt(teamId));
    if (foundTeam) {
      setTeam(foundTeam);
    } else {
      // If team not found, redirect to teams page
      navigate('/admin/teams');
    }
  }, [teamId, navigate]);

  // Show loading while team is being fetched
  if (!team) {
    return (
      <div className="p-6 flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#4DA5AD] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading team details...</p>
        </div>
      </div>
    );
  }

  const removeTeamMember = (userId) => {
    const updatedTeam = {
      ...team,
      teamMembers: team.teamMembers.filter(id => id !== userId),
      members: team.members - 1
    };
    setTeam(updatedTeam);
  };

  const addTeamMember = (userId) => {
    if (team.teamMembers.includes(userId)) {
      alert('User is already a member of this team');
      return;
    }
    
    const updatedTeam = {
      ...team,
      teamMembers: [...team.teamMembers, userId],
      members: team.members + 1
    };
    setTeam(updatedTeam);
    setShowAddMemberPopup(false);
  };

  const removeProject = (projectId) => {
    if (window.confirm('Are you sure you want to remove this project from the team?')) {
      const updatedTeam = {
        ...team,
        teamProjects: team.teamProjects.filter(project => project.id !== projectId),
        projects: team.projects - 1
      };
      setTeam(updatedTeam);
    }
  };

  const getTeamMemberDetails = (userId) => {
    return users.find(user => user.id === userId) || {};
  };

  const viewProjectDetails = (project) => {
    setSelectedProject(project);
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <button 
          onClick={() => navigate('/admin/teams')}
          className="flex items-center text-gray-600 hover:text-gray-900"
        >
          <span className="mr-2">←</span>
          Back to Teams
        </button>
        <button 
          onClick={() => navigate('/admin/teams')}
          className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          Close
        </button>
      </div>

      {/* Team Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4">
            <div 
              className="w-16 h-16 rounded-xl flex items-center justify-center text-white text-2xl font-bold"
              style={{ backgroundColor: team.color }}
            >
              {team.name.charAt(0)}
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900">{team.name} (ID: {team.id})</h1>
              <p className="text-gray-600">Team Lead: <span className="font-medium">{team.lead}</span></p>
              <p className="text-gray-500 mt-2">{team.description}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">{team.members}</div>
              <div className="text-sm text-gray-600">Members</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">{team.projects}</div>
              <div className="text-sm text-gray-600">Projects</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">
                {team.teamProjects.length > 0 
                  ? Math.round(team.teamProjects.reduce((sum, p) => sum + p.progress, 0) / team.teamProjects.length) 
                  : 0}%
              </div>
              <div className="text-sm text-gray-600">Avg. Progress</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Team Members Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">Team Members ({team.teamMembers.length})</h2>
            <button 
              onClick={() => setShowAddMemberPopup(true)}
              className="px-3 py-1 text-sm bg-[#4DA5AD] text-white rounded-lg hover:bg-[#3D8B93]"
            >
              + Add Member
            </button>
          </div>
          
          <div className="space-y-3">
            {team.teamMembers.map(userId => {
              const user = getTeamMemberDetails(userId);
              if (!user) return null;
              
              return (
                <div key={user.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#4DA5AD] to-[#2D4A6B] rounded-full flex items-center justify-center text-white font-medium mr-3">
                      {user.avatar}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{user.name}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                      <p className="text-xs text-gray-400">{user.role.replace('_', ' ')}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeTeamMember(user.id)}
                    className="px-3 py-1 text-sm bg-red-50 text-red-600 rounded-lg hover:bg-red-100"
                  >
                    Remove
                  </button>
                </div>
              );
            })}
          </div>
          
          {team.teamMembers.length === 0 && (
            <p className="text-center text-gray-500 py-4">No members in this team</p>
          )}
        </div>

        {/* Team Projects Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">Team Projects ({team.teamProjects.length})</h2>
          </div>
          
          <div className="space-y-4">
            {team.teamProjects.map(project => (
              <div key={project.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-medium text-gray-900 text-lg">{project.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">{project.description}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded text-xs ${getPriorityColor(project.priority)}`}>
                      {project.priority}
                    </span>
                    <span className={`px-2 py-1 rounded text-xs ${
                      project.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                </div>
                
                <div className="mb-3">
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
                
                <div className="flex justify-between items-center text-sm text-gray-600">
                  <div>
                    <span>Manager: {project.manager}</span>
                    <span className="mx-2">•</span>
                    <span>Due: {project.dueDate}</span>
                  </div>
                  <button
                    onClick={() => removeProject(project.id)}
                    className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          {team.teamProjects.length === 0 && (
            <p className="text-center text-gray-500 py-4">No projects assigned to this team</p>
          )}
        </div>
      </div>

      {/* Add Member Popup */}
      {showAddMemberPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl border border-gray-200 max-w-2xl w-full max-h-[80vh] flex flex-col">
            {/* Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-900">Add Members to Team</h2>
                <button 
                  onClick={() => setShowAddMemberPopup(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  &times;
                </button>
              </div>
              <p className="text-sm text-gray-500 mt-1">Select users to add to {team.name} team</p>
            </div>
            
            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {users
                  .filter(user => !team.teamMembers.includes(user.id) && user.status === 'active')
                  .map(user => (
                    <div key={user.id} className="border border-gray-200 rounded-lg p-4 hover:border-[#4DA5AD] transition">
                      <div className="flex items-center mb-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-[#4DA5AD] to-[#2D4A6B] rounded-full flex items-center justify-center text-white font-medium mr-3">
                          {user.avatar}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{user.name}</p>
                          <p className="text-sm text-gray-500">{user.email}</p>
                          <p className="text-xs text-gray-400">{user.role.replace('_', ' ')}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => addTeamMember(user.id)}
                        className="w-full py-2 text-sm bg-[#4DA5AD] text-white rounded-lg hover:bg-[#3D8B93]"
                      >
                        Add to Team
                      </button>
                    </div>
                  ))}
              </div>
              
              {users.filter(user => !team.teamMembers.includes(user.id) && user.status === 'active').length === 0 && (
                <div className="text-center py-8">
                  <div className="text-gray-400 text-4xl mb-3">👥</div>
                  <p className="text-gray-500">No available users to add</p>
                  <p className="text-sm text-gray-400 mt-1">All active users are already in this team</p>
                </div>
              )}
            </div>
            
            {/* Footer */}
            <div className="p-6 border-t border-gray-200">
              <button 
                onClick={() => setShowAddMemberPopup(false)}
                className="w-full py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Project Details Popup */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl border border-gray-200 max-w-2xl w-full p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">{selectedProject.name}</h2>
              <button 
                onClick={() => setSelectedProject(null)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                &times;
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <p className="text-gray-600">{selectedProject.description}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-500">Status</p>
                  <p className="font-medium">{selectedProject.status}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-500">Priority</p>
                  <p className="font-medium capitalize">{selectedProject.priority}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-500">Manager</p>
                  <p className="font-medium">{selectedProject.manager}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-500">Due Date</p>
                  <p className="font-medium">{selectedProject.dueDate}</p>
                </div>
              </div>
              
              <div>
                <p className="text-sm text-gray-500 mb-2">Progress: {selectedProject.progress}%</p>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-[#4DA5AD] h-3 rounded-full"
                    style={{ width: `${selectedProject.progress}%` }}
                  ></div>
                </div>
              </div>
              
              <button 
                onClick={() => setSelectedProject(null)}
                className="w-full py-2 bg-[#4DA5AD] text-white rounded-lg mt-6"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamDetailsPage;