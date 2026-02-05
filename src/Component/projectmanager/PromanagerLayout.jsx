// src/Component/projectmanager/PromanagerLayout.jsx (or ManagerLayout.jsx)
import React, { useState } from 'react'; // Added useState
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, FolderKanban, CheckSquare, 
  TrendingUp, FileText, Settings, LogOut,
  Bell, HelpCircle, Search, X // Added X icon
} from 'lucide-react';

const ManagerLayout = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState(''); // State for search input

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
      // Navigate to search results page or filter current page
      // For now, let's just log it and show an alert
      console.log('Searching for:', searchQuery);
      
      // You can implement different search behaviors:
      // Option 1: Navigate to filtered projects page
      navigate(`/manager/projects?search=${encodeURIComponent(searchQuery)}`);
      
      // Option 2: Filter current page (if on projects/tasks page)
      // This would require passing the search query to child components
      
      // Option 3: Show search results in a modal
      // alert(`Search results for: ${searchQuery}`);
    }
  };

  // Clear search input
  const clearSearch = () => {
    setSearchQuery('');
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
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
          <div className="flex items-center p-3 rounded-lg bg-gray-50">
            <div className="w-10 h-10 bg-gradient-to-br from-[#4DA5AD] to-[#2D4A6B] rounded-full flex items-center justify-center text-white font-bold mr-3">
              JD
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-900">John Doe</p>
              <p className="text-sm text-gray-500">Project Manager</p>
            </div>
            <button className="text-gray-400 hover:text-gray-600">
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header with Working Search */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex justify-between items-center">
            <form onSubmit={handleSearch} className="flex-1 max-w-xl">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search projects"
                  className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#4DA5AD] focus:border-transparent"
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
              {/* Hidden submit button for form submission on Enter */}
              <button type="submit" className="hidden">Search</button>
            </form>
            
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              
              <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg">
                <HelpCircle className="w-5 h-5" />
              </button>
              
              <div className="w-8 h-8 bg-gradient-to-br from-[#4DA5AD] to-[#2D4A6B] rounded-full flex items-center justify-center text-white font-bold">
                JD
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default ManagerLayout;