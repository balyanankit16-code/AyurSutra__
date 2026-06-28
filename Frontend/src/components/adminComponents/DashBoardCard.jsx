// import React, { useState, useEffect } from 'react';
// import axios from '../../utils/axios';

// const DashboardCard = () => {
//   const [dashboardData, setDashboardData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchDashboardData();
//   }, []);

//   const fetchDashboardData = async () => {
//     try {
//       const response = await axios.get('/admin/dashboard');
//       setDashboardData(response.data.data);
//       setLoading(false);
//     } catch (error) {
//       console.error('Error fetching dashboard data:', error);
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 p-6">
//         <div className="animate-pulse">
//           <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//             {[...Array(4)].map((_, i) => (
//               <div key={i} className="bg-white p-6 rounded-lg shadow-sm h-32"></div>
//             ))}
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (!dashboardData) {
//     return (
//       <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
//         <div className="text-center">
//           <p className="text-gray-600">Failed to load dashboard data</p>
//           <button 
//             onClick={fetchDashboardData}
//             className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//           >
//             Retry
//           </button>
//         </div>
//       </div>
//     );
//   }

//   const { overview, recentFeedbacks } = dashboardData;

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       {/* Header */}
//       <div className="mb-8">
//         <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
//         <p className="text-gray-600 mt-2">Manage your wellness center efficiently with real-time insights and analytics.</p>
//       </div>

//       {/* User Info */}
//       <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
//         <div className="flex items-center space-x-4">
//           <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
//             <span className="text-blue-600 font-semibold text-lg">D</span>
//           </div>
//           <div>
//             <h2 className="text-xl font-semibold text-gray-900">Deepak</h2>
//             <p className="text-gray-600">Administrator</p>
//             <p className="text-gray-500 text-sm">deepak@gmail.com</p>
//           </div>
//         </div>
//       </div>

//       {/* Stats Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//         {/* Total Patients */}
//         <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-blue-500">
//           <h3 className="text-2xl font-bold text-gray-900 mb-2">{overview.totalPatients}</h3>
//           <p className="text-gray-600 font-medium">Total Patients</p>
//           <p className="text-gray-500 text-sm mt-1">Active patients in your center</p>
//         </div>

//         {/* Total Practitioners */}
//         <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-green-500">
//           <h3 className="text-2xl font-bold text-gray-900 mb-2">{overview.totalPractitioners}</h3>
//           <p className="text-gray-600 font-medium">Total Practitioners</p>
//           <p className="text-gray-500 text-sm mt-1">Upcoming Sessions</p>
//           <p className="text-gray-900 font-semibold mt-1">{overview.upcomingSessions}</p>
//         </div>

//         {/* Total Sessions */}
//         <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-purple-500">
//           <h3 className="text-2xl font-bold text-gray-900 mb-2">{overview.totalSessions}</h3>
//           <p className="text-gray-600 font-medium">Total Sessions</p>
//           <p className="text-gray-500 text-sm mt-1">Completion Rate</p>
//           <p className="text-gray-900 font-semibold mt-1">{overview.completionRate.toFixed(1)}%</p>
//         </div>

//         {/* Completion Rate - Additional Card */}
//         <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-orange-500">
//           <h3 className="text-2xl font-bold text-gray-900 mb-2">{overview.upcomingSessions}</h3>
//           <p className="text-gray-600 font-medium">Upcoming Sessions</p>
//           <p className="text-gray-500 text-sm mt-1">Scheduled for today and future</p>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//         {/* Sidebar Navigation */}
//         <div className="lg:col-span-1">
//           <div className="bg-white rounded-lg shadow-sm p-6">
//             <h3 className="text-lg font-semibold text-gray-900 mb-4">Dashboard</h3>
//             <ul className="space-y-3">
//               {['Practitioners', 'Patients', 'Sessions', 'Analytics', 'Feedback Reports', 'Broadcast', 'Audit Logs'].map((item) => (
//                 <li key={item}>
//                   <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50 text-gray-700 hover:text-gray-900 transition-colors">
//                     {item}
//                   </button>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Quick Actions */}
//           <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
//             <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
//             <ul className="space-y-3">
//               {['Add Practitioner', 'Send Broadcast', 'Manage Sessions', 'View Analytics'].map((action) => (
//                 <li key={action}>
//                   <button className="w-full text-left px-3 py-2 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors">
//                     {action}
//                   </button>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>

//         {/* Main Content */}
//         <div className="lg:col-span-2">
//           {/* Recent Feedbacks */}
//           <div className="bg-white rounded-lg shadow-sm p-6">
//             <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Feedbacks</h3>
//             {recentFeedbacks && recentFeedbacks.length > 0 ? (
//               <div className="space-y-4">
//                 {recentFeedbacks.map((feedback, index) => (
//                   <div key={index} className="border-b border-gray-200 pb-4 last:border-b-0 last:pb-0">
//                     <div className="flex justify-between items-start mb-2">
//                       <div>
//                         <p className="font-medium text-gray-900">
//                           {feedback.patientId?.name || 'Anonymous'}
//                         </p>
//                         <p className="text-sm text-gray-600">
//                           For {feedback.practitionerId?.name || 'Practitioner'}
//                         </p>
//                       </div>
//                       <span className="text-sm text-gray-500">
//                         {new Date(feedback.createdAt).toLocaleDateString()}
//                       </span>
//                     </div>
//                     <p className="text-gray-700">{feedback.comment}</p>
//                     {feedback.rating && (
//                       <div className="flex items-center mt-2">
//                         <span className="text-yellow-500">{"★".repeat(feedback.rating)}</span>
//                         <span className="text-gray-400">{"★".repeat(5 - feedback.rating)}</span>
//                       </div>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <div className="text-center py-8">
//                 <p className="text-gray-500">No recent feedbacks</p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DashboardCard;

import React, { useState, useEffect } from 'react';
import axios from '../../utils/axios';

const DashboardCard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await axios.get('/admin/dashboard');
      console.log('Dashboard data:', response.data);
      setDashboardData(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-50 p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-emerald-200 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white p-6 rounded-xl shadow-xs h-32 border border-emerald-100"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!dashboardData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-50 p-6 flex items-center justify-center">
        <div className="text-center">
          <p className="text-emerald-700">Failed to load dashboard data</p>
          <button 
            onClick={fetchDashboardData}
            className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors shadow-xs"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const { overview, recentFeedbacks } = dashboardData;

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-emerald-900">Ayursutra Dashboard</h1>
        <p className="text-emerald-700 mt-2">Manage your wellness center efficiently with real-time insights and analytics.</p>
      </div>

      {/* User Info */}
      <div className="bg-white rounded-xl shadow-xs p-6 mb-8 border border-emerald-100">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-500 rounded-full flex items-center justify-center shadow-xs">
            <span className="text-white font-semibold text-lg">D</span>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-emerald-900">Deepak</h2>
            <p className="text-emerald-600">Administrator</p>
            <p className="text-emerald-500 text-sm">deepak@gmail.com</p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Patients */}
        <div className="bg-white rounded-xl shadow-xs p-6 border-l-4 border-emerald-500">
          <h3 className="text-2xl font-bold text-emerald-900 mb-2">{overview.totalPatients}</h3>
          <p className="text-emerald-700 font-medium">Total Patients</p>
          <p className="text-emerald-600 text-sm mt-1">Active patients in your center</p>
        </div>

        {/* Total Practitioners */}
        <div className="bg-white rounded-xl shadow-xs p-6 border-l-4 border-green-500">
          <h3 className="text-2xl font-bold text-emerald-900 mb-2">{overview.totalPractitioners}</h3>
          <p className="text-emerald-700 font-medium">Total Practitioners</p>
          <p className="text-emerald-600 text-sm mt-1">Upcoming Sessions</p>
          <p className="text-emerald-900 font-semibold mt-1">{overview.upcomingSessions}</p>
        </div>

        {/* Total Sessions */}
        <div className="bg-white rounded-xl shadow-xs p-6 border-l-4 border-lime-500">
          <h3 className="text-2xl font-bold text-emerald-900 mb-2">{overview.totalSessions}</h3>
          <p className="text-emerald-700 font-medium">Total Sessions</p>
          <p className="text-emerald-600 text-sm mt-1">Completion Rate</p>
          <p className="text-emerald-900 font-semibold mt-1">{overview.completionRate.toFixed(1)}%</p>
        </div>

        {/* Completion Rate - Additional Card */}
        <div className="bg-white rounded-xl shadow-xs p-6 border-l-4 border-teal-500">
          <h3 className="text-2xl font-bold text-emerald-900 mb-2">{overview.upcomingSessions}</h3>
          <p className="text-emerald-700 font-medium">Upcoming Sessions</p>
          <p className="text-emerald-600 text-sm mt-1">Scheduled for today and future</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-xs p-6 border border-emerald-100">
            <h3 className="text-lg font-semibold text-emerald-900 mb-4">Dashboard</h3>
            <ul className="space-y-2">
              {['Practitioners', 'Patients', 'Sessions', 'Analytics', 'Feedback Reports', 'Broadcast', 'Audit Logs'].map((item) => (
                <li key={item}>
                  <button className="w-full text-left px-3 py-3 rounded-lg hover:bg-emerald-50 text-emerald-700 hover:text-emerald-900 transition-colors border border-transparent hover:border-emerald-200">
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-xs p-6 mt-6 border border-emerald-100">
            <h3 className="text-lg font-semibold text-emerald-900 mb-4">Quick Actions</h3>
            <ul className="space-y-2">
              {['Add Practitioner', 'Send Broadcast', 'Manage Sessions', 'View Analytics'].map((action) => (
                <li key={action}>
                  <button className="w-full text-left px-3 py-3 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors border border-emerald-200 hover:border-emerald-300">
                    {action}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Recent Feedbacks */}
          <div className="bg-white rounded-xl shadow-xs p-6 border border-emerald-100">
            <h3 className="text-lg font-semibold text-emerald-900 mb-4">Recent Feedbacks</h3>
            {recentFeedbacks && recentFeedbacks.length > 0 ? (
              <div className="space-y-4">
                {recentFeedbacks.map((feedback, index) => (
                  <div key={index} className="border-b border-emerald-100 pb-4 last:border-b-0 last:pb-0">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-medium text-emerald-900">
                          {feedback.patientId?.name || 'Anonymous'}
                        </p>
                        <p className="text-sm text-emerald-700">
                          For {feedback.practitionerId?.name || 'Practitioner'}
                        </p>
                      </div>
                      <span className="text-sm text-emerald-600 bg-emerald-50 px-2 py-1 rounded">
                        {new Date(feedback.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-emerald-800 bg-emerald-50 p-3 rounded-lg">{feedback.comment}</p>
                    {feedback.rating && (
                      <div className="flex items-center mt-2">
                        <span className="text-amber-500 text-lg">{"★".repeat(feedback.rating)}</span>
                        <span className="text-emerald-200 text-lg">{"★".repeat(5 - feedback.rating)}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-emerald-600 bg-emerald-50 inline-block px-4 py-2 rounded-lg">No recent feedbacks</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;

