// src/pages/admin/UsersManagement.jsx
import React, { useState } from 'react';

const UsersManagement = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@company.com', role: 'team_member', team: 'Engineering', status: 'active', avatar: 'JD', joinDate: '2024-01-15' },
    { id: 2, name: 'Jane Smith', email: 'jane@company.com', role: 'project_manager', team: 'Design', status: 'active', avatar: 'JS', joinDate: '2023-11-20' },
    { id: 3, name: 'Bob Johnson', email: 'bob@company.com', role: 'admin', team: 'Management', status: 'active', avatar: 'BJ', joinDate: '2023-08-10' },
    { id: 4, name: 'Alice Brown', email: 'alice@company.com', role: 'team_member', team: 'QA', status: 'inactive', avatar: 'AB', joinDate: '2024-02-01' },
    { id: 5, name: 'Mike Wilson', email: 'mike@company.com', role: 'team_member', team: 'DevOps', status: 'active', avatar: 'MW', joinDate: '2024-01-05' },
  ]);

  const [showAddUserPopup, setShowAddUserPopup] = useState(false);
  const [showEditUserPopup, setShowEditUserPopup] = useState(false);
  const [showViewUserPopup, setShowViewUserPopup] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'team_member',
    team: 'Engineering',
    status: 'active'
  });

  const updateUserRole = (userId, newRole) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, role: newRole } : user
    ));
  };

  const updateUserStatus = (userId, newStatus) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, status: newStatus } : user
    ));
  };

  const deleteUser = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(user => user.id !== userId));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddUser = (e) => {
    e.preventDefault();
    
    if (!newUser.name.trim() || !newUser.email.trim()) {
      alert('Please fill in all required fields');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newUser.email)) {
      alert('Please enter a valid email address');
      return;
    }

    const userToAdd = {
      id: users.length + 1,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      team: newUser.team,
      status: newUser.status,
      avatar: newUser.name.split(' ').map(n => n[0]).join('').toUpperCase(),
      joinDate: new Date().toISOString().split('T')[0]
    };

    setUsers([...users, userToAdd]);
    
    setNewUser({
      name: '',
      email: '',
      role: 'team_member',
      team: 'Engineering',
      status: 'active'
    });
    setShowAddUserPopup(false);
    
    alert('User added successfully!');
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setShowEditUserPopup(true);
  };

  const handleViewUser = (user) => {
    setSelectedUser(user);
    setShowViewUserPopup(true);
  };

  const saveEditedUser = () => {
    if (!selectedUser.name.trim() || !selectedUser.email.trim()) {
      alert('Please fill in all required fields');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(selectedUser.email)) {
      alert('Please enter a valid email address');
      return;
    }

    setUsers(users.map(user => 
      user.id === selectedUser.id ? selectedUser : user
    ));
    
    setShowEditUserPopup(false);
    setSelectedUser(null);
    alert('User updated successfully!');
  };

  const getRoleColor = (role) => {
    switch(role) {
      case 'admin': return 'bg-purple-100 text-purple-800';
      case 'project_manager': return 'bg-blue-100 text-blue-800';
      case 'team_member': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status) => {
    return status === 'active' 
      ? 'bg-green-100 text-green-800'
      : 'bg-red-100 text-red-800';
  };

  return (
    <>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">User Management</h1>
            <p className="text-gray-600">Manage user roles, permissions, and access</p>
          </div>
          <button
            onClick={() => setShowAddUserPopup(true)}
            className="px-4 py-2 bg-gradient-to-r from-[#4DA5AD] to-[#2D4A6B] text-white rounded-lg hover:opacity-90 transition font-medium"
          >
            + Add User
          </button>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Team</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-br from-[#4DA5AD] to-[#2D4A6B] rounded-full flex items-center justify-center text-white font-medium mr-3">
                          {user.avatar}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{user.name}</div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={user.role}
                        onChange={(e) => updateUserRole(user.id, e.target.value)}
                        className={`px-3 py-1 rounded-full text-sm font-medium ${getRoleColor(user.role)} border-none focus:ring-2 focus:ring-[#4DA5AD]`}
                      >
                        <option value="team_member">Team Member</option>
                        <option value="project_manager">Project Manager</option>
                        <option value="admin">Admin</option>
                      </select>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
                        {user.team}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={user.status}
                        onChange={(e) => updateUserStatus(user.id, e.target.value)}
                        className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(user.status)} border-none focus:ring-2 focus:ring-[#4DA5AD]`}
                      >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </select>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        {/* View Button */}
                        <button
                          onClick={() => handleViewUser(user)}
                          className="p-2 hover:bg-blue-50 rounded-lg transition text-blue-600"
                          title="View User"
                        >
                          👁️
                        </button>
                        
                        {/* Edit Button */}
                        <button
                          onClick={() => handleEditUser(user)}
                          className="p-2 hover:bg-green-50 rounded-lg transition text-green-600"
                          title="Edit User"
                        >
                          ✏️
                        </button>
                        
                        {/* Delete Button */}
                        <button
                          onClick={() => deleteUser(user.id)}
                          className="p-2 hover:bg-red-50 rounded-lg transition text-red-600"
                          title="Delete User"
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-6">
            <div className="text-2xl font-bold text-[#4DA5AD] mb-2">
              {users.filter(u => u.role === 'admin').length}
            </div>
            <p className="font-medium text-gray-900">Administrators</p>
            <p className="text-sm text-gray-600">Full system access</p>
          </div>

          <div className="bg-green-50 border border-green-100 rounded-xl p-6">
            <div className="text-2xl font-bold text-green-600 mb-2">
              {users.filter(u => u.role === 'project_manager').length}
            </div>
            <p className="font-medium text-gray-900">Project Managers</p>
            <p className="text-sm text-gray-600">Project management access</p>
          </div>

          <div className="bg-purple-50 border border-purple-100 rounded-xl p-6">
            <div className="text-2xl font-bold text-purple-600 mb-2">
              {users.filter(u => u.role === 'team_member').length}
            </div>
            <p className="font-medium text-gray-900">Team Members</p>
            <p className="text-sm text-gray-600">Basic project access</p>
          </div>
        </div>
      </div>

      {/* Add User Popup */}
      {showAddUserPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl border border-gray-200 max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Add New User</h2>
              <button 
                onClick={() => setShowAddUserPopup(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                &times;
              </button>
            </div>
            
            <form onSubmit={handleAddUser} className="space-y-4">
              <input 
                type="text" 
                name="name"
                value={newUser.name}
                onChange={handleInputChange}
                placeholder="Full Name *"
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                required
              />
              
              <input 
                type="email" 
                name="email"
                value={newUser.email}
                onChange={handleInputChange}
                placeholder="Email Address *"
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                required
              />
              
              <select
                name="role"
                value={newUser.role}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              >
                <option value="team_member">Team Member</option>
                <option value="project_manager">Project Manager</option>
                <option value="admin">Administrator</option>
              </select>
              
              <select
                name="team"
                value={newUser.team}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              >
                <option value="Engineering">Engineering</option>
                <option value="Design">Design</option>
                <option value="Management">Management</option>
                <option value="QA">QA</option>
                <option value="DevOps">DevOps</option>
              </select>
              
              <div className="flex justify-end space-x-3 pt-4">
                <button 
                  type="button"
                  onClick={() => setShowAddUserPopup(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 bg-[#4DA5AD] text-white rounded-lg"
                >
                  Add User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View User Popup */}
      {showViewUserPopup && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl border border-gray-200 max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">User Details</h2>
              <button 
                onClick={() => setShowViewUserPopup(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                &times;
              </button>
            </div>
            
            <div className="space-y-6">
              {/* User Avatar & Name */}
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-[#4DA5AD] to-[#2D4A6B] rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  {selectedUser.avatar}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{selectedUser.name}</h3>
                  <p className="text-gray-600">{selectedUser.email}</p>
                </div>
              </div>
              
              {/* User Details */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-500">Role</p>
                  <p className="font-medium">{selectedUser.role.replace('_', ' ')}</p>
                </div>
                
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-500">Team</p>
                  <p className="font-medium">{selectedUser.team}</p>
                </div>
                
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-500">Status</p>
                  <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(selectedUser.status)}`}>
                    {selectedUser.status}
                  </span>
                </div>
                
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-500">Join Date</p>
                  <p className="font-medium">{selectedUser.joinDate}</p>
                </div>
              </div>
              
              <div className="pt-4 border-t border-gray-200">
                <button 
                  onClick={() => setShowViewUserPopup(false)}
                  className="w-full px-4 py-2 bg-[#4DA5AD] text-white rounded-lg"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit User Popup */}
      {showEditUserPopup && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl border border-gray-200 max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Edit User</h2>
              <button 
                onClick={() => setShowEditUserPopup(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                &times;
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input 
                  type="text" 
                  value={selectedUser.name}
                  onChange={(e) => setSelectedUser({...selectedUser, name: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input 
                  type="email" 
                  value={selectedUser.email}
                  onChange={(e) => setSelectedUser({...selectedUser, email: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                <select
                  value={selectedUser.role}
                  onChange={(e) => setSelectedUser({...selectedUser, role: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                >
                  <option value="team_member">Team Member</option>
                  <option value="project_manager">Project Manager</option>
                  <option value="admin">Administrator</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Team</label>
                <select
                  value={selectedUser.team}
                  onChange={(e) => setSelectedUser({...selectedUser, team: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                >
                  <option value="Engineering">Engineering</option>
                  <option value="Design">Design</option>
                  <option value="Management">Management</option>
                  <option value="QA">QA</option>
                  <option value="DevOps">DevOps</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={selectedUser.status}
                  onChange={(e) => setSelectedUser({...selectedUser, status: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              
              <div className="flex justify-end space-x-3 pt-4">
                <button 
                  onClick={() => setShowEditUserPopup(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg"
                >
                  Cancel
                </button>
                <button 
                  onClick={saveEditedUser}
                  className="px-4 py-2 bg-[#4DA5AD] text-white rounded-lg"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UsersManagement;