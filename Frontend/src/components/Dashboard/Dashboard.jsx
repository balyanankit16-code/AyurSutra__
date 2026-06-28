import React, { useState, useEffect } from 'react';
import { useAuth } from '../../utils/authContext';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/axios';
import PatientDashboard from '../patientComponents/PatientDashboard';
import AdminDashboard from '../../pages/adminPages/adminDashboard';
import PractitionerDashboard from '../../pages/practitionerPages/Practitioner';

const Dashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await api.get('/auth/me');
      if (response.data.success) {
        setUser(response.data.data);
      } else {
        // Immediately logout and redirect on API failure
        await logout();
        navigate('/auth');
      }
    } catch (err) {
      // Immediately logout and redirect on any error
      await logout();
      navigate('/auth');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (!user) {
    return null; // Already redirected in fetchUserData
  }

  // Render the appropriate dashboard based on user role
  switch (user.role) {
    case 'patient':
      return <PatientDashboard user={user} />;
    case 'admin':
      return <AdminDashboard user={user} />;
    case 'practitioner':
      return <PractitionerDashboard user={user} />;
    default:
      // Logout and redirect for unknown roles
      useEffect(() => {
        logout();
        navigate('/auth');
      }, []);
      return null;
  }
};

export default Dashboard;