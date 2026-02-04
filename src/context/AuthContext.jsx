import { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('taskflow_user')) || null);

  const login = (email, password) => {
    // Demo users with passwords for local validation
    const users = {
      'admin@taskflow.com': { id: 1, name: 'Admin', role: 'admin', team: 'Management', password: 'adminpass' },
      'pm@taskflow.com': { id: 2, name: 'Project Manager', role: 'project_manager', team: 'Engineering', password: 'pmpass' },
      'member@taskflow.com': { id: 3, name: 'Team Member', role: 'team_member', team: 'Engineering', password: 'memberpass' }
    };

    const found = users[email];

    // If a demo user exists, validate password
    if (found) {
      if (!password || password !== found.password) {
        throw new Error('Invalid email or password');
      }
      const { password: _pw, ...userData } = found;
      localStorage.setItem('taskflow_user', JSON.stringify(userData));
      setUser(userData);
      return userData;
    }

    // For non-demo emails, create a team_member user (no password validation)
    const userData = { 
      id: Date.now(), 
      name: 'User', 
      role: 'team_member', 
      team: 'General' 
    };
    localStorage.setItem('taskflow_user', JSON.stringify(userData));
    setUser(userData);
    return userData;
  };

  const signup = (data) => {
    const userData = { 
      id: Date.now(), 
      ...data, 
      role: 'team_member', // Force team_member role for signup
      team: data.team || 'Engineering'
    };
    localStorage.setItem('taskflow_user', JSON.stringify(userData));
    setUser(userData);
    return userData;
  };

  const logout = () => {
    localStorage.removeItem('taskflow_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};