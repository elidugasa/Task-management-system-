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
      const users = DataService.getUsers() || [];
      const foundUser = users.find(u => u.email === email);
      
      if (foundUser) {
        if (foundUser.password !== password) {
          throw new Error('Invalid email or password');
        }
        
        const { password: _, ...userData } = foundUser;
        
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
      const newUser = DataService.createUser({
        name: data.name,
        email: data.email,
        password: data.password,
        role: 'team-member',
        team: 'Engineering'
      });
      
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

  // ADD THIS FUNCTION: Update user profile
  const updateUserProfile = async (updatedData) => {
    try {
      // Get current user
      const users = DataService.getUsers() || [];
      const userIndex = users.findIndex(u => u.email === user.email);
      
      if (userIndex !== -1) {
        // Update in DataService
        const { role, ...safeUpdatedData } = updatedData;
        users[userIndex] = {
          ...users[userIndex],
          ...updatedData,
          updatedAt: new Date().toISOString()
        };
        DataService.saveUsers(users);
        
        // Also update team member if exists
        const teamMembers = DataService.getTeamMembers();
        const memberIndex = teamMembers.findIndex(m => m.email === user.email);
        if (memberIndex !== -1) {
          teamMembers[memberIndex] = {
            ...teamMembers[memberIndex],
            name: updatedData.name || teamMembers[memberIndex].name,
            // role: updatedData.role ? 
            //       (updatedData.role === 'team-member' ? 'Developer' : 
            //        updatedData.role === 'project-manager' ? 'Project Manager' : 
            //        updatedData.role) : 
            //       teamMembers[memberIndex].role,
            team: updatedData.team || teamMembers[memberIndex].team
          };
          DataService.saveTeamMembers(teamMembers);
        }
      }
      
      // Update local state and localStorage
      const { role: _, ...safeUserData } = updatedData;
      const updatedUser = { ...user, ...updatedData };
      localStorage.setItem('current_user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      
      return updatedUser;
      
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  };

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
    updateUserProfile, // ADD THIS
    getUserDashboardPath
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};