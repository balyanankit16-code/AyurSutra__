// import React, { useState, useEffect } from 'react';
// import api from '../../utils/axios';

// const ProgressCard = () => {
//   const [stats, setStats] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchPerformanceStats();
//   }, []);

//   const fetchPerformanceStats = async () => {
//     try {
//       const response = await api.get('/practitioner/performance');
//       setStats(response.data.data);
//     } catch (error) {
//       console.error('Error fetching performance stats:', error);
//       alert('Failed to fetch performance data');
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) return <div className="text-center py-8">Loading performance data...</div>;
//   if (!stats) return <div className="text-center py-8">No performance data available</div>;

//   return (
//     <div className="space-y-6">
//       {/* Key Metrics */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//         <div className="bg-white rounded-lg shadow-lg p-6 text-center">
//           <h3 className="text-lg font-semibold text-gray-600">Total Sessions</h3>
//           <p className="text-3xl font-bold text-blue-600 mt-2">{stats.totalSessions}</p>
//         </div>
        
//         <div className="bg-white rounded-lg shadow-lg p-6 text-center">
//           <h3 className="text-lg font-semibold text-gray-600">Completion Rate</h3>
//           <p className="text-3xl font-bold text-green-600 mt-2">
//             {stats.completionRate.toFixed(1)}%
//           </p>
//         </div>
        
//         <div className="bg-white rounded-lg shadow-lg p-6 text-center">
//           <h3 className="text-lg font-semibold text-gray-600">Average Rating</h3>
//           <p className="text-3xl font-bold text-yellow-600 mt-2">
//             {stats.averageRating.toFixed(1)}/5
//           </p>
//         </div>
        
//         <div className="bg-white rounded-lg shadow-lg p-6 text-center">
//           <h3 className="text-lg font-semibold text-gray-600">Total Patients</h3>
//           <p className="text-3xl font-bold text-purple-600 mt-2">{stats.totalPatients}</p>
//         </div>
//       </div>

//       {/* Therapy Distribution */}
//       <div className="bg-white rounded-lg shadow-lg p-6">
//         <h2 className="text-xl font-bold text-gray-800 mb-4">Therapy Distribution</h2>
//         <div className="space-y-3">
//           {Object.entries(stats.therapyDistribution).map(([therapy, count]) => (
//             <div key={therapy} className="flex items-center justify-between">
//               <span className="text-gray-700">{therapy}</span>
//               <div className="flex items-center space-x-3">
//                 <div className="w-48 bg-gray-200 rounded-full h-2">
//                   <div 
//                     className="bg-blue-600 h-2 rounded-full" 
//                     style={{ 
//                       width: `${(count / stats.totalSessions) * 100}%` 
//                     }}
//                   ></div>
//                 </div>
//                 <span className="text-gray-600 font-medium">{count}</span>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Weekly Workload */}
//       <div className="bg-white rounded-lg shadow-lg p-6">
//         <h2 className="text-xl font-bold text-gray-800 mb-4">Weekly Workload</h2>
//         <div className="flex items-end justify-between h-40 space-x-2">
//           {stats.weeklyWorkload.map((day, index) => (
//             <div key={index} className="flex flex-col items-center flex-1">
//               <div 
//                 className="bg-green-500 rounded-t w-full transition-all duration-300 hover:bg-green-600"
//                 style={{ 
//                   height: Math.max(...stats.weeklyWorkload.map(d => d.sessions)) > 0 
//                     ? `${(day.sessions / Math.max(...stats.weeklyWorkload.map(d => d.sessions))) * 80}px` 
//                     : '0px' 
//                 }}
//               ></div>
//               <span className="text-xs text-gray-600 mt-2">
//                 {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][day.day]}
//               </span>
//               <span className="text-sm font-semibold text-gray-800">{day.sessions}</span>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProgressCard;

import React, { useState, useEffect } from 'react';
import api from '../../utils/axios';

const ProgressCard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPerformanceStats();
  }, []);

  const fetchPerformanceStats = async () => {
    try {
      const response = await api.get('/practitioner/performance');
      setStats(response.data.data);
    } catch (error) {
      console.error('Error fetching performance stats:', error);
      alert('Failed to fetch performance data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-green-100">
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
          <span className="ml-3 text-gray-600">Loading performance data...</span>
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-green-100 text-center py-8">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <i className="fas fa-chart-line text-2xl text-green-600"></i>
        </div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">No Performance Data</h3>
        <p className="text-gray-600">Performance statistics will appear here as you conduct sessions</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-green-100 text-center hover:shadow-xl transition-shadow duration-300">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <i className="fas fa-calendar-check text-green-600 text-xl"></i>
          </div>
          <h3 className="text-sm font-semibold text-gray-600 mb-2">Total Sessions</h3>
          <p className="text-3xl font-bold text-green-600">{stats.totalSessions}</p>
          <p className="text-xs text-gray-500 mt-2">All time sessions</p>
        </div>
        
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-green-100 text-center hover:shadow-xl transition-shadow duration-300">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <i className="fas fa-check-circle text-green-600 text-xl"></i>
          </div>
          <h3 className="text-sm font-semibold text-gray-600 mb-2">Completion Rate</h3>
          <p className="text-3xl font-bold text-green-600">
            {stats.completionRate.toFixed(1)}%
          </p>
          <p className="text-xs text-gray-500 mt-2">Successful sessions</p>
        </div>
        
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-green-100 text-center hover:shadow-xl transition-shadow duration-300">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <i className="fas fa-star text-green-600 text-xl"></i>
          </div>
          <h3 className="text-sm font-semibold text-gray-600 mb-2">Average Rating</h3>
          <p className="text-3xl font-bold text-green-600">
            {stats.averageRating.toFixed(1)}/5
          </p>
          <div className="flex justify-center text-yellow-400 text-sm mt-1">
            {'★'.repeat(Math.floor(stats.averageRating))}
            {'☆'.repeat(5 - Math.floor(stats.averageRating))}
          </div>
        </div>
        
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-green-100 text-center hover:shadow-xl transition-shadow duration-300">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <i className="fas fa-users text-green-600 text-xl"></i>
          </div>
          <h3 className="text-sm font-semibold text-gray-600 mb-2">Total Patients</h3>
          <p className="text-3xl font-bold text-green-600">{stats.totalPatients}</p>
          <p className="text-xs text-gray-500 mt-2">Unique patients served</p>
        </div>
      </div>

      {/* Therapy Distribution */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-green-100">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800 flex items-center space-x-2">
            <i className="fas fa-spa text-green-600"></i>
            <span>Therapy Distribution</span>
          </h2>
          <div className="flex items-center space-x-2 bg-green-100 text-green-800 px-3 py-1 rounded-full">
            <i className="fas fa-chart-pie text-sm"></i>
            <span className="text-sm font-medium">{Object.keys(stats.therapyDistribution).length} Therapies</span>
          </div>
        </div>
        <div className="space-y-4">
          {Object.entries(stats.therapyDistribution).map(([therapy, count]) => {
            const percentage = (count / stats.totalSessions) * 100;
            return (
              <div key={therapy} className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200 hover:bg-green-100 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-200 rounded-full flex items-center justify-center">
                    <i className="fas fa-leaf text-green-600 text-sm"></i>
                  </div>
                  <span className="text-gray-700 font-medium capitalize">{therapy}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-32 bg-green-200 rounded-full h-2">
                    <div 
                      className="bg-green-600 h-2 rounded-full transition-all duration-500" 
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <div className="text-right">
                    <span className="text-green-600 font-bold text-sm">{count}</span>
                    <span className="text-gray-500 text-xs block">({percentage.toFixed(1)}%)</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Weekly Workload */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-green-100">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800 flex items-center space-x-2">
            <i className="fas fa-calendar-alt text-green-600"></i>
            <span>Weekly Workload</span>
          </h2>
          <div className="flex items-center space-x-2 text-green-600">
            <i className="fas fa-bullseye"></i>
            <span className="text-sm font-medium">
              {stats.weeklyWorkload.reduce((sum, day) => sum + day.sessions, 0)} sessions this week
            </span>
          </div>
        </div>
        <div className="flex items-end justify-between h-48 space-x-2 px-4">
          {stats.weeklyWorkload.map((day, index) => {
            const maxSessions = Math.max(...stats.weeklyWorkload.map(d => d.sessions));
            const height = maxSessions > 0 ? `${(day.sessions / maxSessions) * 120}px` : '0px';
            const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            const isToday = new Date().getDay() === day.day;
            
            return (
              <div key={index} className="flex flex-col items-center flex-1 group">
                <div 
                  className={`w-full rounded-t-lg transition-all duration-500 ${
                    isToday 
                      ? 'bg-green-600 hover:bg-green-700' 
                      : 'bg-green-400 hover:bg-green-500'
                  }`}
                  style={{ height }}
                >
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-white text-xs font-bold flex items-center justify-center h-full">
                    {day.sessions}
                  </div>
                </div>
                <div className={`w-full text-center py-2 rounded-b-lg ${
                  isToday ? 'bg-green-100 border border-green-200' : ''
                }`}>
                  <span className={`text-sm font-medium ${
                    isToday ? 'text-green-800' : 'text-gray-600'
                  }`}>
                    {dayNames[day.day]}
                  </span>
                  <div className="text-xs text-gray-500 mt-1">{day.sessions}</div>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Weekly Summary */}
        <div className="mt-6 pt-6 border-t border-green-200">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-lg font-bold text-green-600">
                {Math.max(...stats.weeklyWorkload.map(d => d.sessions))}
              </div>
              <div className="text-sm text-gray-600">Peak Day</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-green-600">
                {Math.min(...stats.weeklyWorkload.map(d => d.sessions))}
              </div>
              <div className="text-sm text-gray-600">Lowest Day</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-green-600">
                {(stats.weeklyWorkload.reduce((sum, day) => sum + day.sessions, 0) / 7).toFixed(1)}
              </div>
              <div className="text-sm text-gray-600">Daily Average</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-green-600">
                {stats.weeklyWorkload.filter(d => d.sessions > 0).length}
              </div>
              <div className="text-sm text-gray-600">Active Days</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressCard;