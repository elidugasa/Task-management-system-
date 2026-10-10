// src/pages/projectmanager/SettingsPage.jsx
import React, { useState } from 'react';
import { 
  Save, 
  Edit, 
  User, 
  Mail, 
  Lock, 
  Camera,
  X,
  Check,
  Bell,
  BellOff,
  Mail as MailIcon,
  Shield
} from 'lucide-react';

const SettingsPage = () => {
  // Profile State
  const [profile, setProfile] = useState({
    name: 'John Smith',
    email: 'john.smith@company.com',
    password: '••••••••',
    profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John'
  });

  // Notification State
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    
    
    deadlineReminders: true,
    projectUpdates: false,
    teamMessages: true
  });

  // Edit States
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  
  // Temp values for editing
  const [tempName, setTempName] = useState(profile.name);
  const [tempEmail, setTempEmail] = useState(profile.email);
  const [tempPassword, setTempPassword] = useState('');
  const [tempConfirmPassword, setTempConfirmPassword] = useState('');

  // Start editing name
  const startEditingName = () => {
    setTempName(profile.name);
    setIsEditingName(true);
  };

  // Save name edit
  const saveNameEdit = () => {
    if (tempName.trim()) {
      setProfile(prev => ({ ...prev, name: tempName.trim() }));
    }
    setIsEditingName(false);
  };

  // Cancel name edit
  const cancelNameEdit = () => {
    setIsEditingName(false);
  };

  // Start editing email
  const startEditingEmail = () => {
    setTempEmail(profile.email);
    setIsEditingEmail(true);
  };

  // Save email edit
  const saveEmailEdit = () => {
    if (tempEmail.trim()) {
      setProfile(prev => ({ ...prev, email: tempEmail.trim() }));
    }
    setIsEditingEmail(false);
  };

  // Cancel email edit
  const cancelEmailEdit = () => {
    setIsEditingEmail(false);
  };

  // Start editing password
  const startEditingPassword = () => {
    setTempPassword('');
    setTempConfirmPassword('');
    setIsEditingPassword(true);
  };

  // Save password edit
  const savePasswordEdit = () => {
    if (tempPassword === tempConfirmPassword && tempPassword.length >= 6) {
      setProfile(prev => ({ ...prev, password: '••••••••' }));
      alert('Password updated successfully!');
      setIsEditingPassword(false);
    } else {
      alert('Passwords do not match or are too short (minimum 6 characters)');
    }
  };

  // Cancel password edit
  const cancelPasswordEdit = () => {
    setIsEditingPassword(false);
  };

  // Toggle notification
  const toggleNotification = (type) => {
    setNotifications(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  // Handle profile image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile(prev => ({ ...prev, profileImage: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Save all settings
  const handleSaveAll = () => {
    const settings = { 
      profile,
      notifications,
      savedAt: new Date().toISOString()
    };
    localStorage.setItem('pmSettings', JSON.stringify(settings));
    alert('Settings saved successfully!');
  };

  // Get notification label
  const getNotificationLabel = (key) => {
    const labels = {
      emailNotifications: 'Email Notifications',
      pushNotifications: 'Push Notifications',
      taskAssignments: 'Task Assignments',
      deadlineReminders: 'Deadline Reminders',
      projectUpdates: 'Project Updates',
      teamMessages: 'Team Messages'
    };
    return labels[key] || key;
  };

  // Get notification description
  const getNotificationDescription = (key) => {
    const descriptions = {
      emailNotifications: 'Receive notifications via email',
      pushNotifications: 'Receive browser/desktop notifications',
      taskAssignments: 'When new tasks are assigned to you',
      deadlineReminders: 'Before task deadlines approach',
      projectUpdates: 'Major project changes and updates',
      teamMessages: 'When team members send messages'
    };
    return descriptions[key] || '';
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Settings</h1>
        <p className="text-gray-600">Manage your profile and notification preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Profile */}
        <div className="lg:col-span-2">
          {/* Profile Section */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <User className="w-5 h-5 text-[#4DA5AD] mr-2" />
                <h2 className="text-lg font-semibold">Profile Information</h2>
              </div>
              <button
                onClick={handleSaveAll}
                className="px-4 py-2 bg-[#4DA5AD] text-white rounded-lg hover:bg-[#3D8B93] flex items-center text-sm"
              >
                <Save className="w-4 h-4 mr-2" />
                Save All
              </button>
            </div>

            {/* Profile Image */}
            <div className="flex flex-col items-center mb-8">
              <div className="relative">
                <img
                  src={profile.profileImage}
                  alt="Profile"
                  className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
                />
                <label className="absolute bottom-0 right-0 bg-[#4DA5AD] text-white p-2 rounded-full cursor-pointer hover:bg-[#3D8B93]">
                  <Camera className="w-4 h-4" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </div>
              <p className="text-sm text-gray-500 mt-2">Click camera icon to update photo</p>
            </div>

            {/* Name Field */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-700 flex items-center">
                  <User className="w-4 h-4 mr-2" />
                  Full Name
                </label>
                {!isEditingName && (
                  <button
                    onClick={startEditingName}
                    className="text-[#4DA5AD] hover:text-[#3D8B93] flex items-center text-sm"
                  >
                    <Edit className="w-3 h-3 mr-1" />
                    Edit
                  </button>
                )}
              </div>
              
              {isEditingName ? (
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={tempName}
                    onChange={(e) => setTempName(e.target.value)}
                    className="flex-1 border border-gray-300 rounded px-3 py-2"
                    placeholder="Enter your name"
                    autoFocus
                  />
                  <button
                    onClick={saveNameEdit}
                    className="p-2 bg-green-500 text-white rounded hover:bg-green-600"
                    title="Save"
                  >
                    <Check className="w-4 h-4" />
                  </button>
                  <button
                    onClick={cancelNameEdit}
                    className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
                    title="Cancel"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="border border-gray-200 rounded px-4 py-3 bg-gray-50">
                  <p className="text-gray-900">{profile.name}</p>
                </div>
              )}
            </div>

            {/* Email Field */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-700 flex items-center">
                  <MailIcon className="w-4 h-4 mr-2" />
                  Email Address
                </label>
                {!isEditingEmail && (
                  <button
                    onClick={startEditingEmail}
                    className="text-[#4DA5AD] hover:text-[#3D8B93] flex items-center text-sm"
                  >
                    <Edit className="w-3 h-3 mr-1" />
                    Edit
                  </button>
                )}
              </div>
              
              {isEditingEmail ? (
                <div className="flex items-center space-x-2">
                  <input
                    type="email"
                    value={tempEmail}
                    onChange={(e) => setTempEmail(e.target.value)}
                    className="flex-1 border border-gray-300 rounded px-3 py-2"
                    placeholder="Enter your email"
                    autoFocus
                  />
                  <button
                    onClick={saveEmailEdit}
                    className="p-2 bg-green-500 text-white rounded hover:bg-green-600"
                    title="Save"
                  >
                    <Check className="w-4 h-4" />
                  </button>
                  <button
                    onClick={cancelEmailEdit}
                    className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
                    title="Cancel"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="border border-gray-200 rounded px-4 py-3 bg-gray-50">
                  <p className="text-gray-900">{profile.email}</p>
                </div>
              )}
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-700 flex items-center">
                  <Lock className="w-4 h-4 mr-2" />
                  Password
                </label>
                {!isEditingPassword && (
                  <button
                    onClick={startEditingPassword}
                    className="text-[#4DA5AD] hover:text-[#3D8B93] flex items-center text-sm"
                  >
                    <Edit className="w-3 h-3 mr-1" />
                    Change Password
                  </button>
                )}
              </div>
              
              {isEditingPassword ? (
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <input
                      type="password"
                      value={tempPassword}
                      onChange={(e) => setTempPassword(e.target.value)}
                      className="flex-1 border border-gray-300 rounded px-3 py-2"
                      placeholder="New password"
                      autoFocus
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="password"
                      value={tempConfirmPassword}
                      onChange={(e) => setTempConfirmPassword(e.target.value)}
                      className="flex-1 border border-gray-300 rounded px-3 py-2"
                      placeholder="Confirm new password"
                    />
                  </div>
                  <div className="flex space-x-2 pt-2">
                    <button
                      onClick={savePasswordEdit}
                      className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 flex items-center"
                    >
                      <Check className="w-4 h-4 mr-1" />
                      Update Password
                    </button>
                    <button
                      onClick={cancelPasswordEdit}
                      className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 flex items-center"
                    >
                      <X className="w-4 h-4 mr-1" />
                      Cancel
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Password must be at least 6 characters long
                  </p>
                </div>
              ) : (
                <div className="border border-gray-200 rounded px-4 py-3 bg-gray-50">
                  <p className="text-gray-900">{profile.password}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column - Notifications */}
        <div>
          {/* Notification Section */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
            <div className="flex items-center mb-6">
              <Bell className="w-5 h-5 text-[#4DA5AD] mr-2" />
              <h2 className="text-lg font-semibold">Notifications</h2>
            </div>
            
            <div className="space-y-6">
              {Object.entries(notifications).map(([key, value]) => (
                <div key={key} className="flex items-start justify-between">
                  <div className="flex-1 mr-4">
                    <div className="flex items-center mb-1">
                      <span className="font-medium text-gray-900">
                        {getNotificationLabel(key)}
                      </span>
                      <span className="ml-2">
                        {value ? (
                          <Bell className="w-4 h-4 text-green-500" />
                        ) : (
                          <BellOff className="w-4 h-4 text-gray-400" />
                        )}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">
                      {getNotificationDescription(key)}
                    </p>
                  </div>
                  <button
                    onClick={() => toggleNotification(key)}
                    className={`w-12 h-6 rounded-full transition-colors ${
                      value ? 'bg-[#4DA5AD]' : 'bg-gray-300'
                    }`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full transform transition-transform ${
                      value ? 'translate-x-7' : 'translate-x-1'
                    }`} />
                  </button>
                </div>
              ))}
            </div>

            {/* Notification Preferences */}
           
            
          </div>

          {/* Account Info */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center mb-4">
              <Shield className="w-5 h-5 text-[#4DA5AD] mr-2" />
              <h2 className="text-lg font-semibold">Account Info</h2>
            </div>
            
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">Account Type</p>
                <p className="font-medium text-gray-900">Project Manager</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Member Since</p>
                <p className="font-medium text-gray-900">Jan 15, 2023</p>
              </div>
            </div>

           
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;