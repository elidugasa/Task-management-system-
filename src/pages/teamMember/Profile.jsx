// src/pages/teamMember/Profile.jsx
import React, { useState, useEffect } from 'react';
import { 
  User, Mail, Phone, Calendar, MapPin, 
  Briefcase, Award, Edit, Save,
  Camera, Lock, Bell, Globe, Shield
} from 'lucide-react';
import DataService from '../../services/dataservices';
import { useAuth } from '../../context/AuthContext';

const TeamMemberProfile = () => {
  const { user, updateUserProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: '',
    role: '',
    email: '',
    phone: '+251 911 234 567',
    location: 'Addis Ababa, Ethiopia',
    team: 'Engineering',
    joinDate: '2024-01-01',
    bio: '',
    skills: ['React', 'TypeScript', 'JavaScript'],
    certifications: [],
    languages: ['Amharic (Native)', 'English (Fluent)']
  });

  const [notifications, setNotifications] = useState({
    taskUpdates: true,
    deadlineReminders: true,
    weeklyReports: true
  });

  useEffect(() => {
    if (user) {
      const teamMembers = DataService.getTeamMembers();
      const teamMember = teamMembers.find(member => 
        member.email === user.email || member.id === user.assigneeId || member.id === user.id
      ) || {};
      
      setProfile(prev => ({
        ...prev,
        name: user.name || teamMember.name || 'User',
        role: user.role === 'team-member' ? 'Developer' : 
              user.role === 'project-manager' ? 'Project Manager' : 
              user.role === 'admin' ? 'Administrator' : 
              'Team Member',
        email: user.email || '',
        team: user.team || teamMember.team || 'Engineering',
        joinDate: teamMember.joinDate || '2024-01-01',
        bio: teamMember.bio || `Team member with ${teamMember.skills ? teamMember.skills.length : 0} skills.`,
        skills: teamMember.skills || ['React', 'TypeScript', 'JavaScript']
      }));
    }
  }, [user]);

  const handleInputChange = (field, value) => {
    setProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    try {
      // Prepare data to update - EXCLUDE ROLE from updates
      const updatedData = {
        name: profile.name,
        team: profile.team,
        phone: profile.phone,
        location: profile.location,
        bio: profile.bio
        // DO NOT include role here - it should only be updated by admin
      };
      
      await updateUserProfile(updatedData);
      
      setIsEditing(false);
      alert('Profile updated successfully!\nNote: Role changes require administrator approval.');
      
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again.');
    }
  };

  const toggleNotification = (field) => {
    setNotifications(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const getRoleBadge = (role) => {
    switch (role.toLowerCase()) {
      case 'admin':
      case 'administrator':
        return { color: 'bg-purple-100 text-purple-800', icon: <Shield className="w-3 h-3 mr-1" /> };
      case 'project-manager':
      case 'project manager':
        return { color: 'bg-blue-100 text-blue-800', icon: <Award className="w-3 h-3 mr-1" /> };
      case 'team-member':
      case 'developer':
        return { color: 'bg-green-100 text-green-800', icon: <User className="w-3 h-3 mr-1" /> };
      default:
        return { color: 'bg-gray-100 text-gray-800', icon: <User className="w-3 h-3 mr-1" /> };
    }
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4DA5AD] mx-auto"></div>
          <p className="mt-4 text-gray-600">Please login to view profile...</p>
        </div>
      </div>
    );
  }

  const roleBadge = getRoleBadge(profile.role);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
          <p className="text-gray-600">Manage your profile and settings</p>
        </div>
        
        {isEditing ? (
          <div className="flex space-x-3">
            <button
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-[#4DA5AD] text-white rounded-lg hover:bg-[#3D8B93] flex items-center"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </button>
          </div>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 bg-[#4DA5AD] text-white rounded-lg hover:bg-[#3D8B93] flex items-center"
          >
            <Edit className="w-4 h-4 mr-2" />
            Edit Profile
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Profile Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-start gap-6 mb-6">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-br from-[#4DA5AD] to-[#2D4A6B] rounded-full flex items-center justify-center text-white text-xl font-bold">
                  {profile.name.split(' ').map(n => n[0]).join('')}
                </div>
                {isEditing && (
                  <label className="absolute bottom-0 right-0 p-2 bg-white border border-gray-300 rounded-full shadow-sm hover:bg-gray-50 cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                    />
                    <Camera className="w-3 h-3 text-gray-600" />
                  </label>
                )}
              </div>

              <div className="flex-1">
                {isEditing ? (
                  <div className="space-y-4">
                    <input
                      type="text"
                      value={profile.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4DA5AD]"
                      placeholder="Full Name"
                    />
                    
                    {/* Role Display - Non-editable */}
                    <div className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
                      <div className={`px-3 py-1 rounded-full text-sm font-medium flex items-center ${roleBadge.color}`}>
                        {roleBadge.icon}
                        {profile.role}
                      </div>
                      <span className="text-sm text-gray-500">
                        (Role can only be changed by administrator)
                      </span>
                    </div>
                  </div>
                ) : (
                  <>
                    <h2 className="text-2xl font-bold text-gray-900">{profile.name}</h2>
                    <div className="flex items-center gap-3 mt-2">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center ${roleBadge.color}`}>
                        {roleBadge.icon}
                        {profile.role}
                      </span>
                      <span className="text-lg text-[#4DA5AD] font-medium">{profile.team}</span>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Contact Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { icon: <Mail className="w-4 h-4" />, field: 'email', label: 'Email', editable: false },
                { icon: <Phone className="w-4 h-4" />, field: 'phone', label: 'Phone', editable: true },
                { icon: <MapPin className="w-4 h-4" />, field: 'location', label: 'Location', editable: true },
                { icon: <Briefcase className="w-4 h-4" />, field: 'team', label: 'Team', editable: true },
                { icon: <Calendar className="w-4 h-4" />, field: 'joinDate', label: 'Join Date', editable: false },
              ].map((item) => (
                <div key={item.field} className="flex items-center gap-3">
                  <div className="text-gray-400">{item.icon}</div>
                  {isEditing && item.editable ? (
                    <input
                      type="text"
                      value={profile[item.field]}
                      onChange={(e) => handleInputChange(item.field, e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4DA5AD]"
                      placeholder={item.label}
                    />
                  ) : (
                    <div className="flex-1">
                      <span className="text-gray-700">{profile[item.field]}</span>
                      {!item.editable && isEditing && (
                        <p className="text-xs text-gray-400 mt-1">Contact admin to change</p>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Skills & Bio */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">About</h3>
            
            {isEditing ? (
              <>
                <textarea
                  value={profile.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4DA5AD] mb-6"
                  placeholder="Tell us about yourself..."
                />
                
                {/* Role Change Notice */}
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg mb-6">
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-yellow-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-yellow-800 mb-1">Role Change Policy</h4>
                      <p className="text-sm text-yellow-700">
                        Role changes require administrator approval. Please contact your system administrator 
                        or project manager if you need a role update.
                      </p>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <p className="text-gray-600 mb-6">{profile.bio}</p>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Skills */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {profile.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Languages */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                  <Globe className="w-4 h-4 mr-2" />
                  Languages
                </h4>
                <div className="space-y-2">
                  {profile.languages.map((language, index) => (
                    <div key={index} className="text-gray-700">
                      {language}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Settings */}
        <div className="space-y-6">
          {/* Account Status */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
              <Shield className="w-5 h-5 mr-2" />
              Account Status
            </h3>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Role Level</span>
                <span className={`px-2 py-1 rounded text-xs font-medium ${roleBadge.color}`}>
                  {profile.role}
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Account Status</span>
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded font-medium">
                  Active
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Member Since</span>
                <span className="text-gray-600 text-sm">{profile.joinDate}</span>
              </div>
              
              <div className="pt-4 border-t border-gray-100">
                <p className="text-xs text-gray-500">
                  Need a role change? Contact your administrator with justification.
                </p>
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
              <Bell className="w-5 h-5 mr-2" />
              Notifications
            </h3>
            
            <div className="space-y-4">
              {Object.entries(notifications).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <span className="text-gray-700 capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                  <button
                    onClick={() => toggleNotification(key)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                      value ? 'bg-[#4DA5AD]' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                        value ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Security */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
              <Lock className="w-5 h-5 mr-2" />
              Security
            </h3>
            
            <button className="w-full px-4 py-3 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors mb-3">
              Change Password
            </button>
            
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamMemberProfile;