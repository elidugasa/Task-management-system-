// src/Component/projectmanager/PromanagerLayout.jsx (or ManagerLayout.jsx)
import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, FolderKanban, CheckSquare, 
  TrendingUp, FileText, Settings, LogOut,
  Bell, HelpCircle, Search, X,
  Menu, // Added Menu icon for mobile
  X as XIcon // Renamed for mobile close
} from 'lucide-react';

const ManagerLayout = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { path: '/manager/dashboard', icon: <LayoutDashboard className="w-5 h-5" />, label: 'Dashboard' },
    { path: '/manager/projects', icon: <FolderKanban className="w-5 h-5" />, label: 'Projects' },
    { path: '/manager/tasks', icon: <CheckSquare className="w-5 h-5" />, label: 'Tasks' },
    { path: '/manager/progress', icon: <TrendingUp className="w-5 h-5" />, label: 'Progress' },
    { path: '/manager/reports', icon: <FileText className="w-5 h-5" />, label: 'Reports' },
    { path: '/manager/settings', icon: <Settings className="w-5 h-5" />, label: 'Settings' },
  ];

  // Handle search submission
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/manager/projects?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  // Clear search input
  const clearSearch = () => {
    setSearchQuery('');
  };

  // Handle logout
  const handleLogout = () => {
    // Show confirmation dialog
    setShowLogoutConfirm(true);
  };

  const confirmLogout = () => {
    // Clear user session data
    localStorage.removeItem('userToken');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userData');
    
    // Clear all manager-related data if needed
    // localStorage.removeItem('managerTasks');
    // localStorage.removeItem('managerProjects');
    
    // Redirect to login page
    navigate('/login');
    
    // Close confirmation dialog
    setShowLogoutConfirm(false);
  };

  const cancelLogout = () => {
    setShowLogoutConfirm(false);
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile Menu Button */}
      <button
        onClick={toggleMobileMenu}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md"
      >
        {isMobileMenuOpen ? <XIcon className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
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
            <div className="w-8 h-8 bg-gradient-to-br from-[#4DA5AD] to-[#2D4A6B] rounded-lg flex items-center justify-center text-white font-bold mr-3">
              PM
            </div>
            <h1 className="text-xl font-bold text-gray-900">Project Manager</h1>
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

        {/* User Profile & Logout */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center p-3 rounded-lg bg-gray-50">
            <div className="w-10 h-10 bg-gradient-to-br from-[#4DA5AD] to-[#2D4A6B] rounded-full flex items-center justify-center text-white font-bold mr-3">
              JD
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-900">Diriba</p>
              <p className="text-sm text-gray-500">Project Manager</p>
            </div>
            <button 
              onClick={handleLogout}
              className="text-gray-400 hover:text-red-600 transition-colors p-2 hover:bg-red-50 rounded-lg"
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Overlay for mobile menu */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header with Working Search */}
        <header className="bg-white border-b border-gray-200 px-4 lg:px-6 py-4">
          <div className="flex justify-between items-center">
            {/* Mobile Logo */}
            <div className="lg:hidden">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gradient-to-br from-[#4DA5AD] to-[#2D4A6B] rounded-lg flex items-center justify-center text-white font-bold mr-2">
                  PM
                </div>
                <span className="font-bold text-gray-900">Manager</span>
              </div>
            </div>

            {/* Search Form */}
            <form onSubmit={handleSearch} className="flex-1 max-w-xl mx-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search projects, tasks..."
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
            
            <div className="flex items-center space-x-2 lg:space-x-4">
              <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              
              <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg">
                <HelpCircle className="w-5 h-5" />
              </button>
              
              {/* Mobile Logout Button */}
              <button 
                onClick={handleLogout}
                className="lg:hidden p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
              
              <div className="hidden lg:flex items-center space-x-3">
                <div className="text-right">
                  <p className="font-medium text-gray-900 text-sm">Diriba</p>
                  <p className="text-xs text-gray-500">Project Manager</p>
                </div>
                <div className="w-8 h-8 bg-gradient-to-br from-[#4DA5AD] to-[#2D4A6B] rounded-full flex items-center justify-center text-white font-bold">
                  JD
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <Outlet />
        </main>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                <LogOut className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Confirm Logout</h3>
              <p className="text-sm text-gray-500 mb-6">
                Are you sure you want to logout? You will need to login again to access the dashboard.
              </p>
              <div className="flex space-x-3">
                <button
                  onClick={cancelLogout}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmLogout}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
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

export default ManagerLayout;