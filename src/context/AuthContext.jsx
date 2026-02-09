// src/context/AuthContext.jsx
import { createContext, useState, useContext, useEffect } from 'react';
import DataService from '../services/dataservices';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('current_user');
      return saved ? JSON.parse(saved) : null;
    }
    return null;
  });
  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing user on mount
    const savedUser = localStorage.getItem('current_user');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        // Ensure role is normalized when loading from localStorage
        if (parsedUser.role === 'team_member') {
          parsedUser.role = 'team-member';
        } else if (parsedUser.role === 'project_manager') {
          parsedUser.role = 'project-manager';
        }
        setUser(parsedUser);
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('current_user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      // Use DataService for authentication
      const users = DataService.getUsers() || [];
      const foundUser = users.find(u => u.email === email);
      
      // If user exists in DataService, validate password
      if (foundUser) {
        if (foundUser.password !== password) {
          throw new Error('Invalid email or password');
        }
        
        // Remove password from user object before storing
        const { password: _, ...userData } = foundUser;
        
        // Ensure consistent role format
        let normalizedUserData = { ...userData };
        if (userData.role === 'team_member') {
          normalizedUserData.role = 'team-member';
        } else if (userData.role === 'project_manager') {
          normalizedUserData.role = 'project-manager';
        }
        
        localStorage.setItem('current_user', JSON.stringify(normalizedUserData));
        setUser(normalizedUserData);
        return normalizedUserData;
      }
      
      // Fallback to hardcoded demo users
      const demoUsers = {
        'admin@taskflow.com': { 
          id: 1, 
          name: 'Admin', 
          role: 'admin',
          team: 'Management', 
          password: 'adminpass',
          assigneeId: 101 
        },
        'pm@task.com': { 
          id: 2, 
          name: 'Project Manager', 
          role: 'project-manager',
          team: 'Engineering', 
          password: 'pmpass',
          assigneeId: 102 
        },
        'member@task.com': { 
          id: 3, 
          name: 'Team Member', 
          role: 'team-member',
          team: 'Engineering', 
          password: 'memberpass',
          assigneeId: 103 
        }
      };

      const demoUser = demoUsers[email];
      
      if (demoUser) {
        if (demoUser.password !== password) {
          throw new Error('Invalid email or password');
        }
        const { password: _pw, ...userData } = demoUser;
        localStorage.setItem('current_user', JSON.stringify(userData));
        setUser(userData);
        return userData;
      }

      throw new Error('Invalid email or password');
      
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const signup = async (data) => {
    try {
      // Use DataService to create user
      const newUser = DataService.createUser({
        name: data.name,
        email: data.email,
        password: data.password,
        role: 'team-member', // Always create as team-member
        team: 'Engineering'
      });
      
      // Store user without password in auth context
      const { password, ...userData } = newUser;
      localStorage.setItem('current_user', JSON.stringify(userData));
      setUser(userData);
      
      return userData;
      
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('current_user');
    setUser(null);
  };

  // Helper function to get user role for redirection
  const getUserDashboardPath = () => {
    if (!user) return '/login';
    
    const userRole = user.role === 'team_member' ? 'team-member' : 
                    user.role === 'project_manager' ? 'project-manager' : 
                    user.role;
    
    switch (userRole) {
      case 'admin':
        return '/admin/dashboard';
      case 'project-manager':
        return '/manager/dashboard';
      case 'team-member':
        return '/team-member/dashboard';
      default:
        return '/login';
    }
  };

  const value = {
    user,
    loading,
    login,
    signup,
    logout,
    getUserDashboardPath
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};