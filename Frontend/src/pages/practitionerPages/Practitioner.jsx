

// import React, { useState, useEffect } from 'react';
// import { useAuth } from '../../utils/authContext';
// import ProfileCard from '../../components/practictionerComponent/profileCard.jsx';
// import PatientCard from '../../components/practictionerComponent/patientDetailsCard';
// import ProgressCard from '../../components/practictionerComponent/progressCard';
// import FeedbackCard from '../../components/practictionerComponent/feedbackCard';
// import UpdateProfileCard from '../../components/practictionerComponent/updatePractitioner';
// import NotificationCard from '../../components/practictionerComponent/notificationCards.jsx';
// const PractitionerDashboard = () => {
//   const [activeTab, setActiveTab] = useState('dashboard');
//   const { user } = useAuth();

//   const renderContent = () => {
//     switch (activeTab) {
//       case 'dashboard':
//         return <ProfileCard />;
//       case 'updateProfile':
//         return <UpdateProfileCard />;
//       case 'patients':
//         return <PatientCard />;
//       case 'progress':
//         return <ProgressCard />;
//       case 'notifications':
//         return <NotificationCard />;
//       case 'feedback':
//         return <FeedbackCard />;
//       default:
//         return <ProfileCard />;
//     }
//   };

//   // Mock data for the dashboard overview
//   const dashboardStats = {
//     totalSessions: 0,
//     completionRate: "0%",
//     therapiesCompleted: 0,
//     upcomingSessions: 0,
//     notifications: 0
//   };

//   const menuItems = [
//     { id: 'dashboard', label: 'Overview', icon: 'fas fa-chart-line' },
//     { id: 'updateProfile', label: 'Update Profile', icon: 'fas fa-user-edit' },
//     { id: 'patients', label: 'Patients', icon: 'fas fa-users' },
//     { id: 'progress', label: 'Progress', icon: 'fas fa-chart-bar' },
//     { id: 'notifications', label: 'Notifications', icon: 'fas fa-bell' },
//     { id: 'feedback', label: 'Feedback', icon: 'fas fa-comment-medical' }
//   ];

//   const quickActions = [
//     { label: 'Update Profile', icon: 'fas fa-user-edit', action: () => setActiveTab('updateProfile') },
//     { label: 'View Patients', icon: 'fas fa-users', action: () => setActiveTab('patients') },
//     { label: 'Session History', icon: 'fas fa-history', action: () => setActiveTab('progress') },
//     { label: 'Patient Feedback', icon: 'fas fa-comment-medical', action: () => setActiveTab('feedback') },
//     { label: 'Notifications', icon: 'fas fa-bell', action: () => setActiveTab('notifications') },
//     { label: 'Availability', icon: 'fas fa-calendar-alt', action: () => setActiveTab('updateProfile') }
//   ];

//   const StatsCard = ({ icon, title, value, subtitle, color = "green" }) => (
//     <div className="bg-white rounded-2xl p-6 shadow-lg border border-green-100 hover:shadow-xl transition-all duration-300">
//       <div className="flex items-center justify-between">
//         <div>
//           <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
//           <p className="text-2xl font-bold text-gray-900">{value}</p>
//           {subtitle && (
//             <p className={`text-sm font-medium mt-1 ${
//               color === 'green' ? 'text-green-600' : 
//               color === 'red' ? 'text-red-600' : 
//               'text-blue-600'
//             }`}>
//               {subtitle}
//             </p>
//           )}
//         </div>
//         <div className={`text-2xl ${
//           color === 'green' ? 'text-green-500' : 
//           color === 'red' ? 'text-red-500' : 
//           'text-blue-500'
//         }`}>
//           <i className={icon}></i>
//         </div>
//       </div>
//     </div>
//   );

//   const SidebarItem = ({ icon, label, isActive = false, onClick }) => (
//     <button
//       onClick={onClick}
//       className={`w-full flex items-center space-x-3 px-4 py-3 text-left rounded-xl transition-all ${
//         isActive 
//           ? 'bg-green-100 text-green-700 border-r-4 border-green-600 shadow-sm' 
//           : 'text-gray-600 hover:bg-green-50 hover:text-green-600'
//       }`}
//     >
//       <i className={`${icon} w-5 text-lg`}></i>
//       <span className="font-medium">{label}</span>
//     </button>
//   );

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100">
//       {/* Header */}
//       <header className="bg-white shadow-sm border-b border-green-200">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center py-4">
//             <div className="flex items-center space-x-3">
//               <i className="fas fa-leaf text-2xl text-green-600"></i>
//               <h1 className="text-2xl font-bold text-gray-800">Ayurveda Wellness</h1>
//             </div>
//             <div className="flex items-center space-x-4">
//               <div className="text-right">
//                 <p className="text-sm font-medium text-gray-700">Welcome back,</p>
//                 <p className="text-lg font-semibold text-green-600">{user?.name || 'Practitioner'}</p>
//               </div>
//               <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
//                 <span className="text-green-600 font-semibold">
//                   {(user?.name || 'P').charAt(0).toUpperCase()}
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </header>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="flex flex-col lg:flex-row gap-8">
//           {/* Sidebar */}
//           <div className="lg:w-1/4">
//             <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
//               <div className="text-center mb-6">
//                 <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
//                   <span className="text-2xl text-green-600 font-semibold">
//                     {(user?.name || 'P').charAt(0).toUpperCase()}
//                   </span>
//                 </div>
//                 <h2 className="text-xl font-bold text-gray-800">{user?.name || 'Practitioner'}</h2>
//                 <p className="text-green-600 font-medium">Ayurveda Practitioner</p>
//                 <p className="text-sm text-gray-500 mt-1">{user?.email || 'practitioner@ayurveda.com'}</p>
//               </div>

//               <nav className="space-y-2">
//                 {menuItems.map((item) => (
//                   <SidebarItem
//                     key={item.id}
//                     icon={item.icon}
//                     label={item.label}
//                     isActive={activeTab === item.id}
//                     onClick={() => setActiveTab(item.id)}
//                   />
//                 ))}
//               </nav>

//               {/* Quick Stats */}
//               <div className="mt-6 pt-6 border-t border-green-200">
//                 <h3 className="text-sm font-semibold text-gray-700 mb-3">Quick Stats</h3>
//                 <div className="space-y-2">
//                   <div className="flex justify-between items-center text-sm">
//                     <span className="text-gray-600">Today's Sessions</span>
//                     <span className="font-semibold text-green-600">0</span>
//                   </div>
//                   <div className="flex justify-between items-center text-sm">
//                     <span className="text-gray-600">Active Patients</span>
//                     <span className="font-semibold text-green-600">0</span>
//                   </div>
//                   <div className="flex justify-between items-center text-sm">
//                     <span className="text-gray-600">Avg. Rating</span>
//                     <span className="font-semibold text-green-600">-</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Main Content */}
//           <div className="lg:w-3/4">
//             {/* Dashboard Overview - Only show when dashboard tab is active */}
//             {activeTab === 'dashboard' && (
//               <div className="space-y-6">
//                 {/* Welcome Card */}
//                 <div className="bg-gradient-to-r from-green-600 to-green-700 text-white rounded-2xl p-6 shadow-lg">
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <h1 className="text-2xl font-bold mb-2">Welcome back, {user?.name || 'Practitioner'}!</h1>
//                       <p className="text-green-100">Your healing journey continues. Guide your patients with wisdom and compassion.</p>
//                     </div>
//                     <i className="fas fa-user-md text-4xl text-green-200"></i>
//                   </div>
//                 </div>

//                 {/* Stats Grid */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//                   <StatsCard 
//                     icon="fas fa-calendar-check"
//                     title="Total Sessions"
//                     value={dashboardStats.totalSessions}
//                     subtitle="All time"
//                     color="green"
//                   />
//                   <StatsCard 
//                     icon="fas fa-check-circle"
//                     title="Completion Rate"
//                     value={dashboardStats.completionRate}
//                     subtitle="Successful sessions"
//                     color="green"
//                   />
//                   <StatsCard 
//                     icon="fas fa-spa"
//                     title="Therapies Completed"
//                     value={dashboardStats.therapiesCompleted}
//                     subtitle="This month"
//                     color="green"
//                   />
//                   <StatsCard 
//                     icon="fas fa-bell"
//                     title="Notifications"
//                     value={dashboardStats.notifications}
//                     subtitle="Unread"
//                     color="green"
//                   />
//                 </div>

//                 {/* Quick Actions */}
//                 <div className="bg-white rounded-2xl shadow-lg p-6 border border-green-100">
//                   <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
//                   <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
//                     {quickActions.map((action, index) => (
//                       <button
//                         key={index}
//                         onClick={action.action}
//                         className="flex flex-col items-center p-4 border border-green-200 rounded-xl hover:bg-green-50 transition-all duration-200 group"
//                       >
//                         <i className={`${action.icon} text-green-600 text-xl mb-2 group-hover:text-green-700`}></i>
//                         <span className="text-sm font-medium text-gray-700 text-center">{action.label}</span>
//                       </button>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Recent Activity */}
//                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//                   {/* Upcoming Sessions */}
//                   <div className="bg-white rounded-2xl shadow-lg p-6 border border-green-100">
//                     <div className="flex items-center justify-between mb-4">
//                       <h3 className="text-lg font-semibold text-gray-800">Today's Schedule</h3>
//                       <button className="text-green-600 hover:text-green-700 text-sm font-medium">
//                         View All
//                       </button>
//                     </div>
//                     <div className="space-y-4">
//                       <div className="text-center py-8">
//                         <i className="fas fa-calendar-plus text-3xl text-green-400 mb-3"></i>
//                         <p className="text-gray-500">No sessions scheduled for today</p>
//                         <p className="text-sm text-gray-400 mt-1">Your schedule is clear</p>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Recent Feedback */}
//                   <div className="bg-white rounded-2xl shadow-lg p-6 border border-green-100">
//                     <div className="flex items-center justify-between mb-4">
//                       <h3 className="text-lg font-semibold text-gray-800">Recent Feedback</h3>
//                       <button 
//                         onClick={() => setActiveTab('feedback')}
//                         className="text-green-600 hover:text-green-700 text-sm font-medium"
//                       >
//                         View All
//                       </button>
//                     </div>
//                     <div className="space-y-4">
//                       <div className="text-center py-8">
//                         <i className="fas fa-comment-slash text-3xl text-green-400 mb-3"></i>
//                         <p className="text-gray-500">No recent feedback</p>
//                         <p className="text-sm text-gray-400 mt-1">Patient feedback will appear here</p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Component Content for other tabs */}
//             {activeTab !== 'dashboard' && renderContent()}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PractitionerDashboard;


import React, { useState, useEffect } from 'react';
import { useAuth } from '../../utils/authContext';
import ProfileCard from '../../components/practictionerComponent/profileCard.jsx';
import PatientCard from '../../components/practictionerComponent/patientDetailsCard';
import ProgressCard from '../../components/practictionerComponent/progressCard';
import FeedbackCard from '../../components/practictionerComponent/feedbackCard';
import UpdateProfileCard from '../../components/practictionerComponent/updatePractitioner';
import NotificationCard from '../../components/practictionerComponent/notificationCards.jsx';
import PractitionerPerformance from '../../components/adminComponents/PractitionerPage.jsx';
import api from '../../utils/axios';  // Assuming this is where your axios instance is

const PractitionerDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [user, setUser] = useState(null);
  const [performanceData, setPerformanceData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserDetails();
    fetchPerformanceData();
  }, []);

  // Fetch user details
  const fetchUserDetails = async () => {
    try {
      const response = await api.get('/auth/me');
      setUser(response.data.data); // Assuming the user details are in response.data
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  // Fetch practitioner's performance data
  const fetchPerformanceData = async () => {
    try {
      const response = await api.get('/practitioner/performance');
      setPerformanceData(response.data.data); // Assuming performance data is in response.data
    } catch (error) {
      console.error('Error fetching performance data:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <ProfileCard />;
      case 'updateProfile':
        return <UpdateProfileCard />;
      case 'patients':
        return <PatientCard />;
      case 'progress':
        return <ProgressCard />;
      case 'notifications':
        return <NotificationCard />;
      case 'feedback':
        return <FeedbackCard />;
      case 'stats':
        return <PractitionerPerformance/>
      default:
        return <ProfileCard />;
    }
  };

  // Mock data for the dashboard overview
  const dashboardStats = performanceData || {
    totalSessions: 0,
    completionRate: "0%",
    therapiesCompleted: 0,
    upcomingSessions: 0,
    notifications: 0
  };

  const menuItems = [
    { id: 'dashboard', label: 'Overview', icon: 'fas fa-chart-line' },
    { id: 'updateProfile', label: 'Update Profile', icon: 'fas fa-user-edit' },
    { id: 'patients', label: 'Patients', icon: 'fas fa-users' },
    { id: 'progress', label: 'Progress', icon: 'fas fa-chart-bar' },
    { id: 'notifications', label: 'Notifications', icon: 'fas fa-bell' },
    { id: 'feedback', label: 'Feedback', icon: 'fas fa-comment-medical' },
    {
      id: 'stats', label: 'Your Stats',icon: 'fas fa-tachometer-alt'
    }
  ];

  const quickActions = [
    { label: 'Update Profile', icon: 'fas fa-user-edit', action: () => setActiveTab('updateProfile') },
    { label: 'View Patients', icon: 'fas fa-users', action: () => setActiveTab('patients') },
    { label: 'Session History', icon: 'fas fa-history', action: () => setActiveTab('progress') },
    { label: 'Patient Feedback', icon: 'fas fa-comment-medical', action: () => setActiveTab('feedback') },
    { label: 'Notifications', icon: 'fas fa-bell', action: () => setActiveTab('notifications') },
    { label: 'Availability', icon: 'fas fa-calendar-alt', action: () => setActiveTab('updateProfile') }
  ];

  const StatsCard = ({ icon, title, value, subtitle, color = "green" }) => (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-green-100 hover:shadow-xl transition-all duration-300">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {subtitle && (
            <p className={`text-sm font-medium mt-1 ${color === 'green' ? 'text-green-600' : color === 'red' ? 'text-red-600' : 'text-blue-600'}`}>
              {subtitle}
            </p>
          )}
        </div>
        <div className={`text-2xl ${color === 'green' ? 'text-green-500' : color === 'red' ? 'text-red-500' : 'text-blue-500'}`}>
          <i className={icon}></i>
        </div>
      </div>
    </div>
  );

  const SidebarItem = ({ icon, label, isActive = false, onClick }) => (
    <button
      onClick={onClick}
      className={`w-full flex items-center space-x-3 px-4 py-3 text-left rounded-xl transition-all ${isActive ? 'bg-green-100 text-green-700 border-r-4 border-green-600 shadow-sm' : 'text-gray-600 hover:bg-green-50 hover:text-green-600'}`}
    >
      <i className={`${icon} w-5 text-lg`}></i>
      <span className="font-medium">{label}</span>
    </button>
  );

  if (loading) {
    return <div>Loading...</div>; // You can replace this with a spinner or loading indicator
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-green-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <i className="fas fa-leaf text-2xl text-green-600"></i>
              <h1 className="text-2xl font-bold text-gray-800">Ayurveda Wellness</h1>
            </div>
            
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl text-green-600 font-semibold">
                    {(user?.name || 'P').charAt(0).toUpperCase()}
                  </span>
                </div>
                <h2 className="text-xl font-bold text-gray-800">{user?.name || 'Practitioner'}</h2>
                <p className="text-green-600 font-medium">Ayurveda Practitioner</p>
                <p className="text-sm text-gray-500 mt-1">{user?.email || 'practitioner@ayurveda.com'}</p>
              </div>

              <nav className="space-y-2">
                {menuItems.map((item) => (
                  <SidebarItem
                    key={item.id}
                    icon={item.icon}
                    label={item.label}
                    isActive={activeTab === item.id}
                    onClick={() => setActiveTab(item.id)}
                  />
                ))}
              </nav>

              {/* Quick Stats */}
              <div className="mt-6 pt-6 border-t border-green-200">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Quick Stats</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">Today's Sessions</span>
                    <span className="font-semibold text-green-600">{dashboardStats.totalSessions}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">Active Patients</span>
                    <span className="font-semibold text-green-600">0</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">Avg. Rating</span>
                    <span className="font-semibold text-green-600">-</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            {/* Dashboard Overview - Only show when dashboard tab is active */}
            {activeTab === 'dashboard' && (
              <div className="space-y-6">
                {/* Welcome Card */}
                <div className="bg-gradient-to-r from-green-600 to-green-700 text-white rounded-2xl p-6 shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h1 className="text-2xl font-bold mb-2">Welcome back, {user?.name || 'Practitioner'}!</h1>
                      <p className="text-green-100">Your healing journey continues. Guide your patients with wisdom and compassion.</p>
                    </div>
                    <i className="fas fa-user-md text-4xl text-green-200"></i>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <StatsCard 
                    icon="fas fa-calendar-check"
                    title="Total Sessions"
                    value={dashboardStats.totalSessions}
                    subtitle="All time"
                    color="green"
                  />
                  <StatsCard 
                    icon="fas fa-check-circle"
                    title="Completion Rate"
                    value={dashboardStats.completionRate}
                    subtitle="Successful sessions"
                    color="green"
                  />
                  <StatsCard 
                    icon="fas fa-spa"
                    title="Therapies Completed"
                    value={dashboardStats.therapiesCompleted}
                    subtitle="This month"
                    color="green"
                  />
                  <StatsCard 
                    icon="fas fa-bell"
                    title="Notifications"
                    value={dashboardStats.notifications}
                    subtitle="Unread"
                    color="green"
                  />
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-green-100">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    {quickActions.map((action, index) => (
                      <button
                        key={index}
                        onClick={action.action}
                        className="flex flex-col items-center p-4 border border-green-200 rounded-xl hover:bg-green-50 transition-all duration-200 group"
                      >
                        <i className={`${action.icon} text-green-600 text-xl mb-2 group-hover:text-green-700`}></i>
                        <span className="text-sm font-medium text-gray-700 text-center">{action.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Upcoming Sessions */}
                  <div className="bg-white rounded-2xl shadow-lg p-6 border border-green-100">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-800">Today's Schedule</h3>
                      <button className="text-green-600 hover:text-green-700 text-sm font-medium">
                        View All
                      </button>
                    </div>
                    <div className="space-y-4">
                      <div className="text-center py-8">
                        <i className="fas fa-calendar-plus text-3xl text-green-400 mb-3"></i>
                        <p className="text-gray-500">No sessions scheduled for today</p>
                        <p className="text-sm text-gray-400 mt-1">Your schedule is clear</p>
                      </div>
                    </div>
                  </div>

                  {/* Recent Feedback */}
                  <div className="bg-white rounded-2xl shadow-lg p-6 border border-green-100">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-800">Recent Feedback</h3>
                      <button 
                        onClick={() => setActiveTab('feedback')}
                        className="text-green-600 hover:text-green-700 text-sm font-medium"
                      >
                        View All
                      </button>
                    </div>
                    <div className="space-y-4">
                      <div className="text-center py-8">
                        <i className="fas fa-comment-slash text-3xl text-green-400 mb-3"></i>
                        <p className="text-gray-500">No recent feedback</p>
                        <p className="text-sm text-gray-400 mt-1">Patient feedback will appear here</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Component Content for other tabs */}
            {activeTab !== 'dashboard' && renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PractitionerDashboard;
