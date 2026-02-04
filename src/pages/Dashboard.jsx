import React from 'react';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-2xl w-full p-8 text-center">
        <h1 className="text-3xl font-bold mb-4">Welcome{user?.name ? `, ${user.name}` : ''}!</h1>
        <p className="text-sm text-slate-600">This is your dashboard. Further UI to be implemented.</p>
      </div>
    </div>
  );
};

export default Dashboard;
