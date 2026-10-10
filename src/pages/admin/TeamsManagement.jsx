// src/pages/admin/TeamsManagement.jsx
import React, { useState } from 'react';
import TeamCard from '../../Component/admin/TeamCard';
import { useNavigate } from 'react-router-dom';

const TeamsManagement = () => {
  const navigate = useNavigate();
  
  // Existing users to choose from
  const [users] = useState([
    { id: 1, name: 'chala', email: 'chala@company.com', role: 'team_member', team: 'Engineering', status: 'active', avatar: 'CH' },
    { id: 2, name: 'tola', email: 'tola@company.com', role: 'project_manager', team: 'Design', status: 'active', avatar: 'TO' },
    { id: 3, name: '', email: 'bob@company.com', role: 'admin', team: 'Management', status: 'active', avatar: 'BJ' },
    { id: 4, name: 'Hawwi', email: 'hawwi@company.com', role: 'team_member', team: 'QA', status: 'inactive', avatar: 'HA' },
    { id: 5, name: 'fedasa', email: 'fedasa@company.com', role: 'team_member', team: 'DevOps', status: 'active', avatar: 'FE' },
    { id: 6, name: 'Sarah Davis', email: 'sarah@company.com', role: 'project_manager', team: 'Engineering', status: 'active', avatar: 'SD' },
    { id: 7, name: 'Tom Clark', email: 'tom@company.com', role: 'team_member', team: 'Design', status: 'inactive', avatar: 'TC' },
  ]);

  const [teams, setTeams] = useState([
    { id: 1, name: 'Engineering', lead: 'chala', members: 3, projects: 4, color: '#4DA5AD' },
    { id: 2, name: 'Design', lead: 'tola', members: 2, projects: 1, color: '#FF6B6B' },
    { id: 3, name: 'QA', lead: 'Hawwi', members: 1, projects: 1, color: '#51CF66' },
    { id: 4, name: 'DevOps', lead: 'fedasa', members: 4, projects: 2, color: '#FF922B' },
  ]);

  const [showCreateTeamPopup, setShowCreateTeamPopup] = useState(false);
  const [newTeam, setNewTeam] = useState({
    name: '',
    lead: '',
    description: '',
    selectedMembers: []
  });

  const deleteTeam = (teamId) => {
    if (window.confirm('Are you sure you want to delete this team?')) {
      setTeams(teams.filter(team => team.id !== teamId));
    }
  };

  const handleViewTeam = (teamId) => {
    navigate(`/admin/teams/${teamId}`);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTeam(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const toggleMemberSelection = (userId) => {
    setNewTeam(prev => {
      const isSelected = prev.selectedMembers.includes(userId);
      return {
        ...prev,
        selectedMembers: isSelected
          ? prev.selectedMembers.filter(id => id !== userId)
          : [...prev.selectedMembers, userId]
      };
    });
  };

  const handleCreateTeam = (e) => {
    e.preventDefault();
    
    if (!newTeam.name.trim()) {
      alert('Please enter a team name');
      return;
    }

    const colors = ['#4DA5AD', '#FF6B6B', '#51CF66', '#FF922B', '#748FFC', '#F06595'];
    const newTeamObj = {
      id: teams.length + 1,
      name: newTeam.name,
      lead: newTeam.lead || 'Unassigned',
      members: newTeam.selectedMembers.length,
      projects: 0,
      color: colors[Math.floor(Math.random() * colors.length)],
      description: newTeam.description || 'No description provided'
    };

    setTeams([...teams, newTeamObj]);
    
    // Reset form
    setNewTeam({
      name: '',
      lead: '',
      description: '',
      selectedMembers: []
    });
    setShowCreateTeamPopup(false);
    
    alert('Team created successfully!');
  };

  return (
    <>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Team Management</h1>
            <p className="text-gray-600">Create and manage project teams</p>
          </div>
          <button
            onClick={() => setShowCreateTeamPopup(true)}
            className="px-4 py-2 bg-gradient-to-r from-[#4DA5AD] to-[#2D4A6B] text-white rounded-lg hover:opacity-90 transition font-medium"
          >
            + Create Team
          </button>
        </div>

       {/* // src/pages/admin/TeamsManagement.jsx (partial update) */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {teams.map((team) => (
    <TeamCard 
      key={team.id} 
      team={team} 
      showActions={true} // ← Add this to show action buttons
      onDelete={() => deleteTeam(team.id)}
      onClick={() => handleViewTeam(team.id)} // ← This is passed
    />
  ))}
</div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Team Statistics</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-gray-900">{teams.length}</div>
              <div className="text-sm text-gray-600">Total Teams</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-gray-900">
                {teams.reduce((sum, team) => sum + team.members, 0)}
              </div>
              <div className="text-sm text-gray-600">Total Members</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-gray-900">
                {teams.reduce((sum, team) => sum + team.projects, 0)}
              </div>
              <div className="text-sm text-gray-600">Total Projects</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-gray-900">
                {Math.round(teams.reduce((sum, team) => sum + team.members, 0) / teams.length) || 0}
              </div>
              <div className="text-sm text-gray-600">Avg. Team Size</div>
            </div>
          </div>
        </div>
      </div>

      {/* Create Team Popup - FIXED HEIGHT WITH VISIBLE BUTTONS */}
      {showCreateTeamPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl border border-gray-200 w-full max-w-3xl flex flex-col" style={{ maxHeight: '80vh' }}>
            {/* Header */}
            <div className="p-6 border-b border-gray-200 flex-shrink-0">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-900">Create New Team</h2>
                <button 
                  onClick={() => setShowCreateTeamPopup(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  &times;
                </button>
              </div>
            </div>
            
            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-6">
                {/* Basic Team Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Team Name *
                    </label>
                    <input 
                      type="text" 
                      name="name"
                      value={newTeam.name}
                      onChange={handleInputChange}
                      placeholder="Enter team name"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Team Lead
                    </label>
                    <select
                      name="lead"
                      value={newTeam.lead}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    >
                      <option value="">Select team lead (optional)</option>
                      {users
                        .filter(user => user.status === 'active')
                        .map(user => (
                          <option key={user.id} value={user.name}>
                            {user.name} ({user.role})
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea 
                    name="description"
                    value={newTeam.description}
                    onChange={handleInputChange}
                    placeholder="Enter team description (optional)"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    rows="3"
                  />
                </div>
                
                {/* Select Members */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Add Team Members ({newTeam.selectedMembers.length} selected)
                  </label>
                  
                  <div className="border border-gray-300 rounded-lg p-4" style={{ maxHeight: '200px', overflowY: 'auto' }}>
                    {users.filter(user => user.status === 'active').length === 0 ? (
                      <p className="text-gray-500 text-center py-4">No active users available</p>
                    ) : (
                      <div className="space-y-3">
                        {users
                          .filter(user => user.status === 'active')
                          .map(user => (
                            <div 
                              key={user.id}
                              className={`flex items-center p-3 rounded-lg border cursor-pointer transition ${
                                newTeam.selectedMembers.includes(user.id)
                                  ? 'bg-blue-50 border-blue-300'
                                  : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                              }`}
                              onClick={() => toggleMemberSelection(user.id)}
                            >
                              <div className="flex items-center flex-1">
                                <div className="w-8 h-8 bg-gradient-to-br from-[#4DA5AD] to-[#2D4A6B] rounded-full flex items-center justify-center text-white text-sm font-medium mr-3">
                                  {user.avatar}
                                </div>
                                <div>
                                  <p className="font-medium text-gray-900">{user.name}</p>
                                  <p className="text-xs text-gray-500">{user.role.replace('_', ' ')} • {user.team}</p>
                                </div>
                              </div>
                              <div className={`w-5 h-5 rounded border flex items-center justify-center ${
                                newTeam.selectedMembers.includes(user.id)
                                  ? 'bg-[#4DA5AD] border-[#4DA5AD]'
                                  : 'bg-white border-gray-300'
                              }`}>
                                {newTeam.selectedMembers.includes(user.id) && (
                                  <span className="text-white text-xs">✓</span>
                                )}
                              </div>
                            </div>
                          ))}
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-2 text-sm text-gray-500">
                    Click on users to select/deselect them for the team
                  </div>
                </div>
                
                {/* Selected Members Preview */}
                {newTeam.selectedMembers.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Selected Members:</h4>
                    <div className="flex flex-wrap gap-2 p-2 border border-gray-200 rounded-lg" style={{ maxHeight: '100px', overflowY: 'auto' }}>
                      {users
                        .filter(user => newTeam.selectedMembers.includes(user.id))
                        .map(user => (
                          <div 
                            key={user.id}
                            className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                          >
                            <span className="mr-2">{user.name}</span>
                            <button
                              type="button"
                              onClick={() => toggleMemberSelection(user.id)}
                              className="text-blue-600 hover:text-blue-800"
                            >
                              &times;
                            </button>
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Footer - ALWAYS VISIBLE */}
            <div className="p-6 border-t border-gray-200 flex-shrink-0">
              <div className="flex justify-end space-x-3">
                <button 
                  type="button"
                  onClick={() => setShowCreateTeamPopup(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleCreateTeam}
                  className="px-4 py-2 bg-[#4DA5AD] text-white rounded-lg hover:bg-[#3D8B93]"
                >
                  Create Team
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TeamsManagement;