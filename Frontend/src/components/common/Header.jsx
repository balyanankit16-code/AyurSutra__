import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Leaf } from "lucide-react";
import { useAuth } from '../../utils/authContext';
import api from '../../utils/axios';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      fetchUserData();
    }
  }, [isAuthenticated]);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const response = await api.get('/auth/me');
      if (response.data.success) {
        setUser(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      // If there's an error fetching user data, logout the user
      await handleLogout();
    } finally {
      setLoading(false);
    }
  };

  const handleTherapiesClick = (e) => {
    if (location.pathname === "/") {
      e.preventDefault();
      const therapiesSection = document.getElementById('therapies-section');
      if (therapiesSection) {
        therapiesSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null); // Clear user data
      navigate('/auth');
    } catch (error) {
      console.error('Logout error:', error);
      navigate('/auth');
    }
  };

  const handleDashboardClick = () => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  };

  return (
    <nav className="bg-white/90 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-20">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <Leaf className="w-10 h-10 text-emerald-600" />
          <div>
            <span className="text-3xl font-bold text-emerald-700 block">AyurSutra</span>
            <span className="text-xs text-emerald-500 block -mt-1">Panchakarma Center</span>
          </div>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-10">
          <Link to="/" className="text-lg font-semibold text-gray-700 hover:text-emerald-600 transition-colors duration-200">
            Home
          </Link>
          <Link 
            to="/#therapies-section" 
            onClick={handleTherapiesClick}
            className="text-lg font-semibold text-gray-700 hover:text-emerald-600 transition-colors duration-200"
          >
            Therapies
          </Link>
          <Link to="/about" className="text-lg font-semibold text-gray-700 hover:text-emerald-600 transition-colors duration-200">
            About
          </Link>
          <Link to="/contact" className="text-lg font-semibold text-gray-700 hover:text-emerald-600 transition-colors duration-200">
            Contact
          </Link>
          
          {/* Dashboard Link (only show when authenticated) */}
          {isAuthenticated && (
            <button
              onClick={handleDashboardClick}
              className="text-lg font-semibold text-gray-700 hover:text-emerald-600 transition-colors duration-200"
            >
              Dashboard
            </button>
          )}
        </div>

        {/* User Section */}
        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            /* Logged In State */
            <div className="flex items-center space-x-4">
              {loading ? (
                /* Loading State */
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse"></div>
                  <div className="hidden lg:block text-right">
                    <div className="h-4 w-20 bg-gray-200 rounded animate-pulse mb-1"></div>
                    <div className="h-3 w-16 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                </div>
              ) : user ? (
                /* User Info Loaded */
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                    <span className="text-emerald-600 font-semibold text-sm">
                      {user.name?.charAt(0).toUpperCase() || 'U'}
                    </span>
                  </div>
                  <div className="hidden lg:block text-right">
                    <p className="text-sm font-medium text-gray-700">Welcome back,</p>
                    <p className="text-sm font-semibold text-emerald-600 capitalize">
                      {user.name || 'User'}
                    </p>
                    <p className="text-xs text-gray-500 capitalize">{user.role}</p>
                  </div>
                </div>
              ) : (
                /* User Data Failed to Load */
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                    <span className="text-red-600 font-semibold text-sm">!</span>
                  </div>
                  <div className="hidden lg:block text-right">
                    <p className="text-sm font-medium text-gray-700">Error loading</p>
                  </div>
                </div>
              )}
              
              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-xl font-semibold text-sm transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center space-x-2"
                disabled={loading}
              >
                {loading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <span>Logout</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                  </>
                )}
              </button>
            </div>
          ) : (
            /* Logged Out State */
            <Link
              to="/auth"
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-xl font-bold text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Register/Login
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden bg-white border-t border-gray-200">
        <div className="px-4 py-3 flex justify-between items-center space-x-4">
          <Link to="/" className="text-sm font-semibold text-gray-700 hover:text-emerald-600 transition-colors">
            Home
          </Link>
          <Link 
            to="/#therapies-section" 
            onClick={handleTherapiesClick}
            className="text-sm font-semibold text-gray-700 hover:text-emerald-600 transition-colors"
          >
            Therapies
          </Link>
          <Link to="/about" className="text-sm font-semibold text-gray-700 hover:text-emerald-600 transition-colors">
            About
          </Link>
          <Link to="/contact" className="text-sm font-semibold text-gray-700 hover:text-emerald-600 transition-colors">
            Contact
          </Link>
          {isAuthenticated && (
            <button
              onClick={handleDashboardClick}
              className="text-sm font-semibold text-gray-700 hover:text-emerald-600 transition-colors"
            >
              Dashboard
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;