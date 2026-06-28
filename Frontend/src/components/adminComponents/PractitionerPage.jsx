// import React, { useState, useEffect } from 'react';
// import api from '../../utils/api';
// import { useNavigate } from 'react-router-dom';

// const PractitionerAnalytics = () => {
//   const [analytics, setAnalytics] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [authLoading, setAuthLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [filters, setFilters] = useState({
//     days: 30,
//     practitionerId: ''
//   });
//   const navigate = useNavigate();

//   // Check if user is authenticated and is admin
//   const checkAdminAccess = async () => {
//     try {
//       setAuthLoading(true);
//       const response = await api.get('/auth/verify');
      
//       if (!response.data.data.isAuthenticated) {
//         setError('Please login to access this page');
//         navigate('/auth');
//         return false;
//       }

//       // Get current user details to check role
//       const userResponse = await api.get('/auth/me');
//       const user = userResponse.data.data;
      
//       if (user.role !== 'admin') {
//         setError('Unauthorized: Admin access required');
//         return false;
//       }

//       return true;
//     } catch (err) {
//       console.error('Auth check failed:', err);
//       setError('Authentication failed. Please login again.');
//       navigate('/auth');
//       return false;
//     } finally {
//       setAuthLoading(false);
//     }
//   };

//   // Fetch practitioner analytics
//   const fetchAnalytics = async () => {
//     try {
//       setLoading(true);
//       setError('');
      
//       const params = new URLSearchParams();
//       if (filters.days) params.append('days', filters.days);
//       if (filters.practitionerId) params.append('practitionerId', filters.practitionerId);

//       const response = await api.get(`/admin/analytics/practitioners?${params}`);
      
//       if (response.data.success) {
//         setAnalytics(response.data.data);
//       } else {
//         setError('Failed to fetch analytics data');
//       }
//     } catch (err) {
//       console.error('Error fetching analytics:', err);
//       if (err.response?.status === 403) {
//         setError('Access denied: Admin privileges required');
//       } else if (err.response?.status === 401) {
//         setError('Please login again');
//         navigate('/auth');
//       } else {
//         setError(err.response?.data?.message || 'Failed to fetch analytics data');
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     const initializePage = async () => {
//       const hasAccess = await checkAdminAccess();
//       if (hasAccess) {
//         fetchAnalytics();
//       }
//     };

//     initializePage();
//   }, []);

//   const handleFilterChange = (key, value) => {
//     setFilters(prev => ({
//       ...prev,
//       [key]: value
//     }));
//   };

//   const handleApplyFilters = () => {
//     fetchAnalytics();
//   };

//   const handleResetFilters = () => {
//     setFilters({
//       days: 30,
//       practitionerId: ''
//     });
//   };

//   // Format duration
//   const formatDuration = (minutes) => {
//     if (!minutes) return 'N/A';
//     const hours = Math.floor(minutes / 60);
//     const mins = minutes % 60;
//     if (hours === 0) return `${Math.round(mins)}m`;
//     if (mins === 0) return `${hours}h`;
//     return `${hours}h ${Math.round(mins)}m`;
//   };

//   // Show loading during auth check
//   if (authLoading) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
//         <div className="bg-white rounded-lg shadow-sm p-8 max-w-md w-full text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
//           <div className="text-gray-600">Checking permissions...</div>
//         </div>
//       </div>
//     );
//   }

//   // Show error if not admin
//   if (error && !loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
//         <div className="bg-white rounded-lg shadow-sm p-8 max-w-md w-full text-center">
//           <div className="text-red-500 text-6xl mb-4">⛔</div>
//           <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
//           <p className="text-gray-600 mb-6">
//             {error}
//           </p>
//           <div className="flex gap-3">
//             <button
//               onClick={() => navigate(-1)}
//               className="flex-1 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
//             >
//               Go Back
//             </button>
//             <button
//               onClick={() => navigate('/auth')}
//               className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//             >
//               Login
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       {/* Header */}
//       <div className="mb-8">
//         <div className="flex justify-between items-center">
//           <div>
//             <h1 className="text-3xl font-bold text-gray-900">Practitioner Analytics</h1>
//             <p className="text-gray-600 mt-2">
//               Performance metrics and session analytics for practitioners
//             </p>
//           </div>
//           <div className="text-sm text-gray-500 bg-blue-50 px-3 py-1 rounded-full">
//             Admin Access
//           </div>
//         </div>
//       </div>

//       {/* Filters */}
//       <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           {/* Days Filter */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Time Period (Days)
//             </label>
//             <select
//               value={filters.days}
//               onChange={(e) => handleFilterChange('days', e.target.value)}
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               <option value="7">Last 7 days</option>
//               <option value="30">Last 30 days</option>
//               <option value="90">Last 90 days</option>
//               <option value="180">Last 180 days</option>
//               <option value="365">Last 365 days</option>
//             </select>
//           </div>

//           {/* Practitioner ID Filter */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Practitioner ID (Optional)
//             </label>
//             <input
//               type="text"
//               value={filters.practitionerId}
//               onChange={(e) => handleFilterChange('practitionerId', e.target.value)}
//               placeholder="Enter practitioner ID"
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           {/* Action Buttons */}
//           <div className="flex items-end gap-3">
//             <button
//               onClick={handleApplyFilters}
//               disabled={loading}
//               className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed"
//             >
//               {loading ? 'Loading...' : 'Apply Filters'}
//             </button>
//             <button
//               onClick={handleResetFilters}
//               disabled={loading}
//               className="flex-1 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
//             >
//               Reset
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Error Message */}
//       {error && (
//         <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
//           <div className="flex items-center">
//             <div className="text-red-500 mr-3">
//               <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
//                 <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
//               </svg>
//             </div>
//             <div className="text-red-800">{error}</div>
//           </div>
//         </div>
//       )}

//       {/* Loading State */}
//       {loading && (
//         <div className="bg-white rounded-lg shadow-sm p-8 text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
//           <div className="text-gray-600">Loading practitioner analytics...</div>
//         </div>
//       )}

//       {/* Analytics Grid */}
//       {!loading && analytics.length > 0 && (
//         <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
//           {analytics.map((practitioner, index) => (
//             <div key={practitioner._id || index} className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
//               {/* Card Header */}
//               <div className="p-6 border-b border-gray-200">
//                 <div className="flex justify-between items-start">
//                   <div>
//                     <h3 className="text-lg font-semibold text-gray-900">
//                       {practitioner.practitionerName}
//                     </h3>
//                     <p className="text-sm text-gray-500 mt-1">
//                       Practitioner ID: {practitioner._id?.slice(-8) || 'N/A'}
//                     </p>
//                   </div>
//                   <div className={`px-3 py-1 rounded-full text-xs font-medium ${
//                     practitioner.completionRate >= 80 
//                       ? 'bg-green-100 text-green-800' 
//                       : practitioner.completionRate >= 60 
//                       ? 'bg-yellow-100 text-yellow-800' 
//                       : 'bg-red-100 text-red-800'
//                   }`}>
//                     {practitioner.completionRate || 0}% Complete
//                   </div>
//                 </div>
//               </div>

//               {/* Card Body */}
//               <div className="p-6">
//                 <div className="grid grid-cols-2 gap-4">
//                   {/* Total Sessions */}
//                   <div className="text-center p-4 bg-blue-50 rounded-lg">
//                     <div className="text-2xl font-bold text-blue-600">
//                       {practitioner.totalSessions}
//                     </div>
//                     <div className="text-sm text-blue-800">Total Sessions</div>
//                   </div>

//                   {/* Completed Sessions */}
//                   <div className="text-center p-4 bg-green-50 rounded-lg">
//                     <div className="text-2xl font-bold text-green-600">
//                       {practitioner.completedSessions}
//                     </div>
//                     <div className="text-sm text-green-800">Completed</div>
//                   </div>

//                   {/* Cancelled Sessions */}
//                   <div className="text-center p-4 bg-red-50 rounded-lg">
//                     <div className="text-2xl font-bold text-red-600">
//                       {practitioner.cancelledSessions}
//                     </div>
//                     <div className="text-sm text-red-800">Cancelled</div>
//                   </div>

//                   {/* Unique Patients */}
//                   <div className="text-center p-4 bg-purple-50 rounded-lg">
//                     <div className="text-2xl font-bold text-purple-600">
//                       {practitioner.uniquePatientsCount}
//                     </div>
//                     <div className="text-sm text-purple-800">Unique Patients</div>
//                   </div>
//                 </div>

//                 {/* Additional Metrics */}
//                 <div className="mt-4 space-y-3">
//                   <div className="flex justify-between items-center text-sm">
//                     <span className="text-gray-600">Average Duration:</span>
//                     <span className="font-semibold text-gray-900">
//                       {formatDuration(practitioner.averageSessionDuration)}
//                     </span>
//                   </div>
                  
//                   <div className="flex justify-between items-center text-sm">
//                     <span className="text-gray-600">Completion Rate:</span>
//                     <span className="font-semibold text-gray-900">
//                       {practitioner.completionRate || 0}%
//                     </span>
//                   </div>

//                   <div className="flex justify-between items-center text-sm">
//                     <span className="text-gray-600">Cancellation Rate:</span>
//                     <span className="font-semibold text-gray-900">
//                       {practitioner.totalSessions > 0 
//                         ? Math.round((practitioner.cancelledSessions / practitioner.totalSessions) * 100) 
//                         : 0
//                       }%
//                     </span>
//                   </div>
//                 </div>
//               </div>

//               {/* Card Footer */}
//               <div className="p-4 bg-gray-50 rounded-b-lg border-t border-gray-200">
//                 <div className="text-xs text-gray-500 text-center">
//                   Data for last {filters.days} days
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Empty State */}
//       {!loading && analytics.length === 0 && !error && (
//         <div className="bg-white rounded-lg shadow-sm p-8 text-center">
//           <div className="text-gray-400 text-6xl mb-4">📊</div>
//           <h3 className="text-lg font-semibold text-gray-900 mb-2">No Data Available</h3>
//           <p className="text-gray-600 mb-6">
//             No session data found for the selected filters and time period.
//           </p>
//           <button
//             onClick={handleResetFilters}
//             className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//           >
//             Reset Filters
//           </button>
//         </div>
//       )}

//       {/* Summary Stats */}
//       {!loading && analytics.length > 0 && (
//         <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
//           <h3 className="text-lg font-semibold text-gray-900 mb-4">Summary Statistics</h3>
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//             <div className="text-center p-4 bg-blue-50 rounded-lg">
//               <div className="text-2xl font-bold text-blue-600">
//                 {analytics.length}
//               </div>
//               <div className="text-sm text-blue-800">Total Practitioners</div>
//             </div>
//             <div className="text-center p-4 bg-green-50 rounded-lg">
//               <div className="text-2xl font-bold text-green-600">
//                 {analytics.reduce((sum, p) => sum + p.totalSessions, 0)}
//               </div>
//               <div className="text-sm text-green-800">Total Sessions</div>
//             </div>
//             <div className="text-center p-4 bg-purple-50 rounded-lg">
//               <div className="text-2xl font-bold text-purple-600">
//                 {Math.round(analytics.reduce((sum, p) => sum + (p.completionRate || 0), 0) / analytics.length)}%
//               </div>
//               <div className="text-sm text-purple-800">Avg Completion Rate</div>
//             </div>
//             <div className="text-center p-4 bg-orange-50 rounded-lg">
//               <div className="text-2xl font-bold text-orange-600">
//                 {analytics.reduce((sum, p) => sum + p.uniquePatientsCount, 0)}
//               </div>
//               <div className="text-sm text-orange-800">Total Unique Patients</div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default PractitionerAnalytics;

import React, { useState, useEffect } from 'react';
import api from '../../utils/axios';
import { useNavigate } from 'react-router-dom';

const PractitionerPerformance = () => {
  const [performance, setPerformance] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authLoading, setAuthLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    days: 30
  });
  const navigate = useNavigate();

  // Check if user is authenticated and is practitioner
  const checkPractitionerAccess = async () => {
    try {
      setAuthLoading(true);
      const response = await api.get('/auth/verify');
      
      if (!response.data.data.isAuthenticated) {
        setError('Please login to access this page');
        navigate('/auth');
        return false;
      }

      // Get current user details to check role
      const userResponse = await api.get('/auth/me');
      const user = userResponse.data.data;
      
      if (user.role !== 'practitioner') {
        setError('Unauthorized: Practitioner access required');
        return false;
      }

      return true;
    } catch (err) {
      console.error('Auth check failed:', err);
      setError('Authentication failed. Please login again.');
      navigate('/auth');
      return false;
    } finally {
      setAuthLoading(false);
    }
  };

  // Fetch performance stats
  const fetchPerformance = async () => {
    try {
      setLoading(true);
      setError('');
      
      const params = new URLSearchParams();
      if (filters.days) params.append('days', filters.days);

      const response = await api.get(`/practitioner/performance?${params}`);
      
      if (response.data.success) {
        setPerformance(response.data.data);
      } else {
        setError('Failed to fetch performance data');
      }
    } catch (err) {
      console.error('Error fetching performance:', err);
      if (err.response?.status === 403) {
        setError('Access denied: Practitioner privileges required');
      } else if (err.response?.status === 401) {
        setError('Please login again');
        navigate('/auth');
      } else {
        setError(err.response?.data?.message || 'Failed to fetch performance data');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const initializePage = async () => {
      const hasAccess = await checkPractitionerAccess();
      if (hasAccess) {
        fetchPerformance();
      }
    };

    initializePage();
  }, []);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleApplyFilters = () => {
    fetchPerformance();
  };

  const handleResetFilters = () => {
    setFilters({
      days: 30
    });
  };

  // Get day name from number
  const getDayName = (dayNumber) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[dayNumber];
  };

  // Show loading during auth check
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-lg shadow-sm p-8 max-w-md w-full text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <div className="text-gray-600">Checking permissions...</div>
        </div>
      </div>
    );
  }

  // Show error if not practitioner
  if (error && !loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-lg shadow-sm p-8 max-w-md w-full text-center">
          <div className="text-red-500 text-6xl mb-4">⛔</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-600 mb-6">
            {error}
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => navigate(-1)}
              className="flex-1 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Go Back
            </button>
            <button
              onClick={() => navigate('/auth')}
              className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Performance</h1>
            <p className="text-gray-600 mt-2">
              Track your session performance and patient feedback
            </p>
          </div>
          <div className="text-sm text-gray-500 bg-green-50 px-3 py-1 rounded-full">
            Practitioner Dashboard
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Days Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Time Period (Days)
            </label>
            <select
              value={filters.days}
              onChange={(e) => handleFilterChange('days', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="7">Last 7 days</option>
              <option value="30">Last 30 days</option>
              <option value="90">Last 90 days</option>
              <option value="180">Last 180 days</option>
              <option value="365">Last 365 days</option>
            </select>
          </div>

          {/* Action Buttons */}
          <div className="flex items-end gap-3">
            <button
              onClick={handleApplyFilters}
              disabled={loading}
              className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:bg-green-400 disabled:cursor-not-allowed"
            >
              {loading ? 'Loading...' : 'Apply Filters'}
            </button>
            <button
              onClick={handleResetFilters}
              disabled={loading}
              className="flex-1 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <div className="flex items-center">
            <div className="text-red-500 mr-3">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="text-red-800">{error}</div>
          </div>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <div className="text-gray-600">Loading performance data...</div>
        </div>
      )}

      {/* Performance Stats */}
      {!loading && performance && (
        <div className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Total Sessions */}
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Sessions</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">
                    {performance.totalSessions}
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 text-xl">📅</span>
                </div>
              </div>
              <div className="mt-4 text-sm text-gray-500">
                Sessions conducted in last {filters.days} days
              </div>
            </div>

            {/* Completion Rate */}
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Completion Rate</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">
                    {performance.completionRate.toFixed(1)}%
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 text-xl">✅</span>
                </div>
              </div>
              <div className="mt-4 text-sm text-gray-500">
                {performance.completedSessions} of {performance.totalSessions} sessions completed
              </div>
            </div>

            {/* Average Rating */}
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Average Rating</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">
                    {performance.averageRating.toFixed(1)}/5
                  </p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                  <span className="text-yellow-600 text-xl">⭐</span>
                </div>
              </div>
              <div className="mt-4 text-sm text-gray-500">
                Based on patient feedback
              </div>
            </div>

            {/* Unique Patients */}
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Unique Patients</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">
                    {performance.totalPatients}
                  </p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-purple-600 text-xl">👥</span>
                </div>
              </div>
              <div className="mt-4 text-sm text-gray-500">
                Different patients served
              </div>
            </div>
          </div>

          {/* Therapy Distribution */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Therapy Distribution</h3>
            <div className="space-y-3">
              {Object.entries(performance.therapyDistribution).map(([therapyType, count]) => (
                <div key={therapyType} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700 capitalize">
                    {therapyType}
                  </span>
                  <div className="flex items-center space-x-3">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-600 h-2 rounded-full" 
                        style={{ 
                          width: `${(count / performance.totalSessions) * 100}%` 
                        }}
                      ></div>
                    </div>
                    <span className="text-sm font-semibold text-gray-900 w-8 text-right">
                      {count}
                    </span>
                  </div>
                </div>
              ))}
              {Object.keys(performance.therapyDistribution).length === 0 && (
                <p className="text-gray-500 text-center py-4">No therapy data available</p>
              )}
            </div>
          </div>

          {/* Weekly Workload */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Workload Distribution</h3>
            <div className="grid grid-cols-2 md:grid-cols-7 gap-4">
              {performance.weeklyWorkload.map((dayData) => (
                <div key={dayData.day} className="text-center">
                  <div className="text-sm font-medium text-gray-600 mb-2">
                    {getDayName(dayData.day).slice(0, 3)}
                  </div>
                  <div className={`p-3 rounded-lg ${
                    dayData.sessions > 0 
                      ? 'bg-green-100 text-green-800 border border-green-200' 
                      : 'bg-gray-100 text-gray-500 border border-gray-200'
                  }`}>
                    <div className="text-xl font-bold">{dayData.sessions}</div>
                    <div className="text-xs">sessions</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Detailed Stats */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Detailed Statistics</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Completed Sessions</span>
                  <span className="font-semibold text-gray-900">
                    {performance.completedSessions}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Cancelled Sessions</span>
                  <span className="font-semibold text-gray-900">
                    {performance.totalSessions - performance.completedSessions}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Cancellation Rate</span>
                  <span className="font-semibold text-gray-900">
                    {performance.totalSessions > 0 
                      ? (((performance.totalSessions - performance.completedSessions) / performance.totalSessions) * 100).toFixed(1) 
                      : 0
                    }%
                  </span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Sessions per Patient</span>
                  <span className="font-semibold text-gray-900">
                    {performance.totalPatients > 0 
                      ? (performance.totalSessions / performance.totalPatients).toFixed(1) 
                      : 0
                    }
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Different Therapies</span>
                  <span className="font-semibold text-gray-900">
                    {Object.keys(performance.therapyDistribution).length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Busiest Day</span>
                  <span className="font-semibold text-gray-900 capitalize">
                    {performance.weeklyWorkload.reduce((max, day) => 
                      day.sessions > max.sessions ? day : max, 
                      {sessions: 0, day: 0}
                    ).sessions > 0 
                      ? getDayName(performance.weeklyWorkload.reduce((max, day) => 
                          day.sessions > max.sessions ? day : max, 
                          {sessions: 0, day: 0}
                        ).day) 
                      : 'N/A'
                    }
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!loading && !performance && !error && (
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <div className="text-gray-400 text-6xl mb-4">📊</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Performance Data</h3>
          <p className="text-gray-600 mb-6">
            No session data found for the selected time period.
          </p>
          <button
            onClick={handleResetFilters}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default PractitionerPerformance;