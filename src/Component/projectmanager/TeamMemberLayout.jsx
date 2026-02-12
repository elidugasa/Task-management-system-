// src/Component/projectmanager/TeamMemberLayout.jsx
import React, { useState, useEffect } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, CheckSquare, TrendingUp, FileText, 
  User, LogOut, Bell, HelpCircle, Search, X,
  Menu, Calendar, Settings, Home
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const TeamMemberLayout = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [employee, setEmployee] = useState({
    name: 'User',
    role: 'Team Member',
    avatar: 'U',
    team: 'Engineering',
    email: ''
  });

  useEffect(() => {
    if (user) {
      setEmployee({
        name: user.name || 'User',
        role: user.role === 'team-member' ? 'Developer' : 
              user.role === 'project-manager' ? 'Project Manager' : 
              user.role === 'admin' ? 'Admin' : 
              'Team Member',
        avatar: user.name ? user.name.split(' ').map(n => n[0]).join('') : 'U',
        team: user.team || 'Engineering',
        email: user.email || ''
      });
    }
  }, [user]);

  const navItems = [
    { path: '/team-member/dashboard', icon: <LayoutDashboard className="w-5 h-5" />, label: 'Dashboard' },
    { path: '/team-member/tasks', icon: <CheckSquare className="w-5 h-5" />, label: 'My Tasks' },
    { path: '/team-member/progress', icon: <TrendingUp className="w-5 h-5" />, label: 'Progress' },
    { path: '/team-member/reports', icon: <FileText className="w-5 h-5" />, label: 'Reports' },
    { path: '/team-member/profile', icon: <User className="w-5 h-5" />, label: 'Profile' },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/team-member/tasks?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  const clearSearch = () => setSearchQuery('');

  const handleLogout = () => setShowLogoutConfirm(true);
  
  const confirmLogout = () => {
    logout();
    navigate('/login');
    setShowLogoutConfirm(false);
  };

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4DA5AD] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile Menu Button */}
     <button
  onClick={toggleMobileMenu}
  className={`lg:hidden fixed top-4  z-50 p-2 bg-white rounded-lg shadow-md ${isMobileMenuOpen ? 'right-6' : 'left-4'}`}
>
  {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
</button>

      {/* Sidebar */}
      <div className={`
        fixed lg:relative inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 
        flex flex-col transform transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gradient-to-br from-[#4DA5AD] to-[#2D4A6B] rounded-lg flex items-center justify-center text-white font-bold mr-3">
              <Home className="w-5 h-5" />
            </div>
            <div>
              <h1 className="hidden md:block text-xl font-bold text-gray-900">Team Portal</h1>
              <p className="text-xs text-gray-500">
                {employee.role === 'Developer' ? 'Team Member' : employee.role} Dashboard
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={({ isActive }) =>
                `flex items-center px-4 py-3 rounded-lg transition ${
                  isActive
                    ? 'bg-[#4DA5AD]/10 text-[#4DA5AD] border-l-4 border-[#4DA5AD]'
                    : 'text-gray-700 hover:bg-gray-100'
                }`
              }
            >
              <span className="mr-3">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer"
               onClick={() => navigate('/team-member/profile')}>
            <div className="w-10 h-10 bg-gradient-to-br from-[#4DA5AD] to-[#2D4A6B] rounded-full flex items-center justify-center text-white font-bold mr-3">
              {employee.avatar}
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-900 truncate">{employee.name}</p>
              <p className="text-sm text-gray-500 truncate">{employee.role}</p>
            </div>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                handleLogout();
              }}
              className="text-gray-400 hover:text-red-600 transition-colors p-2 hover:bg-red-50 rounded-lg"
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-4 lg:px-6 py-4">
          <div className="flex justify-between items-center">
            {/* Mobile Logo */}
            <div className="lg:hidden">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gradient-to-br from-[#4DA5AD] to-[#2D4A6B] rounded-lg flex items-center justify-center text-white font-bold mr-2">
                  {employee.avatar}
                </div>
                <span className="font-bold text-gray-900">Team Portal</span>
              </div>
            </div>

            {/* Search */}
            <form onSubmit={handleSearch} className="flex-1 max-w-xl mx-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search tasks..."
                  className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#4DA5AD] focus:border-transparent text-sm lg:text-base"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={clearSearch}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </form>
            
            {/* Notifications & Profile */}
            <div className="flex items-center space-x-2 lg:space-x-4">
              <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              
              <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                <HelpCircle className="w-5 h-5" />
              </button>
              
              <div className="hidden lg:flex items-center space-x-3">
                <div className="text-right">
                  <p className="font-medium text-gray-900 text-sm">{employee.name}</p>
                  <p className="text-xs text-gray-500">{employee.role}</p>
                </div>
                <div 
                  className="w-8 h-8 bg-gradient-to-br from-[#4DA5AD] to-[#2D4A6B] rounded-full flex items-center justify-center text-white font-bold cursor-pointer hover:opacity-90 transition-opacity"
                  onClick={() => navigate('/team-member/profile')}
                >
                  {employee.avatar}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6 bg-gray-50">
          <Outlet />
        </main>
      </div>

      {/* Logout Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                <LogOut className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Confirm Logout</h3>
              <p className="text-sm text-gray-500 mb-6">Are you sure you want to logout?</p>
              <div className="flex space-x-3">
                <button onClick={() => setShowLogoutConfirm(false)} className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  Cancel
                </button>
                <button onClick={confirmLogout} className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamMemberLayout;