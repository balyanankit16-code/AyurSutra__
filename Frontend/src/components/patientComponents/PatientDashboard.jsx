// import React, { useState, useEffect } from 'react';
// import { useAuth } from '../../utils/authContext';
// import api from '../../utils/axios';

// const PatientDashboard = () => {
//   const { user, logout } = useAuth();
//   const [activeTab, setActiveTab] = useState('overview');
//   const [profile, setProfile] = useState(null);
//   const [upcomingSessions, setUpcomingSessions] = useState([]);
//   const [notifications, setNotifications] = useState([]);
//   const [progress, setProgress] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchDashboardData();
//   }, []);

//   const fetchDashboardData = async () => {
//     try {
//       setLoading(true);
//       const [profileRes, sessionsRes, notificationsRes, progressRes] = await Promise.all([
//         api.get('/patient/profile'),
//         api.get('/patient/sessions/upcoming?limit=5'),
//         api.get('/patient/notifications?limit=5'),
//         api.get('/patient/progress')
//       ]);
//       console.log("hello",profile)
//       setProfile(profileRes.data.data);
//       setUpcomingSessions(sessionsRes.data.data.sessions || []);
//       setNotifications(notificationsRes.data.data.notifications || []);
//       setProgress(progressRes.data.data);
//     } catch (error) {
//       console.error('Error fetching dashboard data:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
//       </div>
//     );
//   }

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
//                 <p className="text-lg font-semibold text-green-600">{profile?.name}</p>
//               </div>
//               <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
//                 <span className="text-green-600 font-semibold">
//                   {profile?.name?.charAt(0).toUpperCase()}
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
//                     {profile?.name?.charAt(0).toUpperCase()}
//                   </span>
//                 </div>
//                 <h2 className="text-xl font-bold text-gray-800">{profile?.name}</h2>
//                 <p className="text-green-600">Patient</p>
//                 <p className="text-sm text-gray-500 mt-1">{profile?.email}</p>
//               </div>

//               <nav className="space-y-2">
//                 {[
//                   { id: 'overview', label: 'Overview', icon: 'fas fa-home' },
//                   { id: 'profile', label: 'Profile', icon: 'fas fa-user' },
//                   { id: 'sessions', label: 'My Sessions', icon: 'fas fa-calendar' },
//                   { id: 'medical', label: 'Medical History', icon: 'fas fa-file-medical' },
//                   { id: 'therapy', label: 'Therapy Preferences', icon: 'fas fa-spa' },
//                   { id: 'availability', label: 'Availability', icon: 'fas fa-clock' },
//                   { id: 'progress', label: 'Progress', icon: 'fas fa-chart-line' },
//                   { id: 'notifications', label: 'Notifications', icon: 'fas fa-bell' }
//                 ].map((item) => (
//                   <button
//                     key={item.id}
//                     onClick={() => setActiveTab(item.id)}
//                     className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
//                       activeTab === item.id
//                         ? 'bg-green-100 text-green-700 border-r-2 border-green-600'
//                         : 'text-gray-600 hover:bg-gray-50'
//                     }`}
//                   >
//                     <i className={`${item.icon} w-5`}></i>
//                     <span className="font-medium">{item.label}</span>
//                   </button>
//                 ))}
//               </nav>

//               <button
//                 onClick={logout}
//                 className="w-full mt-6 flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
//               >
//                 <i className="fas fa-sign-out-alt"></i>
//                 <span className="font-medium">Logout</span>
//               </button>
//             </div>
//           </div>

//           {/* Main Content */}
//           <div className="lg:w-3/4">
//             {activeTab === 'overview' && <OverviewTab 
//               profile={profile} 
//               upcomingSessions={upcomingSessions}
//               notifications={notifications}
//               progress={progress}
//             />}
//             {activeTab === 'profile' && <ProfileTab profile={profile} />}
//             {activeTab === 'sessions' && <SessionsTab />}
//             {activeTab === 'medical' && <MedicalHistoryTab />}
//             {activeTab === 'therapy' && <TherapyPreferencesTab />}
//             {activeTab === 'availability' && <AvailabilityTab />}
//             {activeTab === 'progress' && <ProgressTab progress={progress} />}
//             {activeTab === 'notifications' && <NotificationsTab />}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Overview Tab Component
// const OverviewTab = ({ profile, upcomingSessions, notifications, progress }) => {
//   return (
//     <div className="space-y-6">
//       {/* Welcome Card */}
//       <div className="bg-gradient-to-r from-green-600 to-green-700 text-white rounded-2xl p-6 shadow-lg">
//         <div className="flex items-center justify-between">
//           <div>
//             <h1 className="text-2xl font-bold mb-2">Welcome back, {profile?.name}!</h1>
//             <p className="text-green-100">Your wellness journey continues. Stay committed to your healing path.</p>
//           </div>
//           <i className="fas fa-spa text-4xl text-green-200"></i>
//         </div>
//       </div>

//       {/* Stats Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <div className="bg-white rounded-2xl p-6 shadow-lg border border-green-100">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm text-gray-500">Total Sessions</p>
//               <p className="text-2xl font-bold text-gray-800">{progress?.totalSessions || 0}</p>
//             </div>
//             <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
//               <i className="fas fa-calendar-check text-green-600"></i>
//             </div>
//           </div>
//         </div>

//         <div className="bg-white rounded-2xl p-6 shadow-lg border border-green-100">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm text-gray-500">Completion Rate</p>
//               <p className="text-2xl font-bold text-gray-800">
//                 {progress ? `${Math.round(progress.completionRate * 100)}%` : '0%'}
//               </p>
//             </div>
//             <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
//               <i className="fas fa-chart-line text-blue-600"></i>
//             </div>
//           </div>
//         </div>

//         <div className="bg-white rounded-2xl p-6 shadow-lg border border-green-100">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm text-gray-500">Therapies Completed</p>
//               <p className="text-2xl font-bold text-gray-800">
//                 {progress?.therapiesCompleted?.length || 0}
//               </p>
//             </div>
//             <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
//               <i className="fas fa-spa text-purple-600"></i>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         {/* Upcoming Sessions */}
//         <div className="bg-white rounded-2xl shadow-lg p-6">
//           <div className="flex items-center justify-between mb-4">
//             <h3 className="text-lg font-semibold text-gray-800">Upcoming Sessions</h3>
//             <button 
//               onClick={() => setActiveTab('sessions')}
//               className="text-green-600 hover:text-green-700 text-sm font-medium"
//             >
//               View All
//             </button>
//           </div>
//           <div className="space-y-4">
//             {upcomingSessions.length > 0 ? (
//               upcomingSessions.map((session) => (
//                 <div key={session._id} className="flex items-center justify-between p-3 border border-green-100 rounded-lg">
//                   <div>
//                     <p className="font-medium text-gray-800">{session.therapyType}</p>
//                     <p className="text-sm text-gray-500">
//                       with {session.practitionerId?.name}
//                     </p>
//                   </div>
//                   <div className="text-right">
//                     <p className="text-sm font-medium text-gray-800">
//                       {new Date(session.scheduledStart).toLocaleDateString()}
//                     </p>
//                     <p className="text-xs text-gray-500">
//                       {new Date(session.scheduledStart).toLocaleTimeString()}
//                     </p>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <p className="text-gray-500 text-center py-4">No upcoming sessions</p>
//             )}
//           </div>
//         </div>

//         {/* Recent Notifications */}
//         <div className="bg-white rounded-2xl shadow-lg p-6">
//           <div className="flex items-center justify-between mb-4">
//             <h3 className="text-lg font-semibold text-gray-800">Recent Notifications</h3>
//             <button 
//               onClick={() => setActiveTab('notifications')}
//               className="text-green-600 hover:text-green-700 text-sm font-medium"
//             >
//               View All
//             </button>
//           </div>
//           <div className="space-y-3">
//             {notifications.length > 0 ? (
//               notifications.map((notification) => (
//                 <div key={notification._id} className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
//                   <i className="fas fa-bell text-green-600 mt-1"></i>
//                   <div className="flex-1">
//                     <p className="text-sm font-medium text-gray-800">{notification.title}</p>
//                     <p className="text-xs text-gray-600">{notification.message}</p>
//                     <p className="text-xs text-gray-500 mt-1">
//                       {new Date(notification.createdAt).toLocaleDateString()}
//                     </p>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <p className="text-gray-500 text-center py-4">No notifications</p>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Quick Actions */}
//       <div className="bg-white rounded-2xl shadow-lg p-6">
//         <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//           <button 
//             onClick={() => setActiveTab('profile')}
//             className="flex flex-col items-center p-4 border border-green-200 rounded-lg hover:bg-green-50 transition-colors"
//           >
//             <i className="fas fa-user-edit text-green-600 text-xl mb-2"></i>
//             <span className="text-sm font-medium text-gray-700">Update Profile</span>
//           </button>
//           <button 
//             onClick={() => setActiveTab('medical')}
//             className="flex flex-col items-center p-4 border border-green-200 rounded-lg hover:bg-green-50 transition-colors"
//           >
//             <i className="fas fa-file-medical text-green-600 text-xl mb-2"></i>
//             <span className="text-sm font-medium text-gray-700">Medical History</span>
//           </button>
//           <button 
//             onClick={() => setActiveTab('therapy')}
//             className="flex flex-col items-center p-4 border border-green-200 rounded-lg hover:bg-green-50 transition-colors"
//           >
//             <i className="fas fa-spa text-green-600 text-xl mb-2"></i>
//             <span className="text-sm font-medium text-gray-700">Therapy Prefs</span>
//           </button>
//           <button 
//             onClick={() => setActiveTab('availability')}
//             className="flex flex-col items-center p-4 border border-green-200 rounded-lg hover:bg-green-50 transition-colors"
//           >
//             <i className="fas fa-clock text-green-600 text-xl mb-2"></i>
//             <span className="text-sm font-medium text-gray-700">Availability</span>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Profile Tab Component
// const ProfileTab = ({ profile }) => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [formData, setFormData] = useState({
//     name: profile?.name || '',
//     phone: profile?.phone || '',
//     gender: profile?.gender || '',
//     dateOfBirth: profile?.dateOfBirth ? new Date(profile.dateOfBirth).toISOString().split('T')[0] : '',
//     address: profile?.address || {
//       street: '',
//       city: '',
//       state: '',
//       zipCode: '',
//       country: 'India'
//     },
//     emergencyContact: profile?.emergencyContact || {
//       name: '',
//       relationship: '',
//       phone: ''
//     }
//   });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await api.put('/patient/profile', formData);
//       setIsEditing(false);
//       // Refresh profile data
//       window.location.reload();
//     } catch (error) {
//       console.error('Error updating profile:', error);
//     }
//   };

//   return (
//     <div className="bg-white rounded-2xl shadow-lg p-6">
//       <div className="flex items-center justify-between mb-6">
//         <h2 className="text-2xl font-bold text-gray-800">Profile Information</h2>
//         <button
//           onClick={() => setIsEditing(!isEditing)}
//           className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
//         >
//           {isEditing ? 'Cancel' : 'Edit Profile'}
//         </button>
//       </div>

//       <form onSubmit={handleSubmit} className="space-y-6">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
//             <input
//               type="text"
//               value={formData.name}
//               onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//               disabled={!isEditing}
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 disabled:bg-gray-100"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
//             <input
//               type="email"
//               value={profile?.email}
//               disabled
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-500"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
//             <input
//               type="tel"
//               value={formData.phone}
//               onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
//               disabled={!isEditing}
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 disabled:bg-gray-100"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
//             <select
//               value={formData.gender}
//               onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
//               disabled={!isEditing}
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 disabled:bg-gray-100"
//             >
//               <option value="">Select Gender</option>
//               <option value="male">Male</option>
//               <option value="female">Female</option>
//               <option value="other">Other</option>
//             </select>
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
//             <input
//               type="date"
//               value={formData.dateOfBirth}
//               onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
//               disabled={!isEditing}
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 disabled:bg-gray-100"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
//             <input
//               type="text"
//               value={profile?.age ? `${profile.age} years` : 'N/A'}
//               disabled
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-500"
//             />
//           </div>
//         </div>

//         {/* Address Section */}
//         <div className="border-t pt-6">
//           <h3 className="text-lg font-semibold text-gray-800 mb-4">Address</h3>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div className="md:col-span-2">
//               <label className="block text-sm font-medium text-gray-700 mb-2">Street</label>
//               <input
//                 type="text"
//                 value={formData.address.street}
//                 onChange={(e) => setFormData({
//                   ...formData,
//                   address: { ...formData.address, street: e.target.value }
//                 })}
//                 disabled={!isEditing}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 disabled:bg-gray-100"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
//               <input
//                 type="text"
//                 value={formData.address.city}
//                 onChange={(e) => setFormData({
//                   ...formData,
//                   address: { ...formData.address, city: e.target.value }
//                 })}
//                 disabled={!isEditing}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 disabled:bg-gray-100"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
//               <input
//                 type="text"
//                 value={formData.address.state}
//                 onChange={(e) => setFormData({
//                   ...formData,
//                   address: { ...formData.address, state: e.target.value }
//                 })}
//                 disabled={!isEditing}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 disabled:bg-gray-100"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">ZIP Code</label>
//               <input
//                 type="text"
//                 value={formData.address.zipCode}
//                 onChange={(e) => setFormData({
//                   ...formData,
//                   address: { ...formData.address, zipCode: e.target.value }
//                 })}
//                 disabled={!isEditing}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 disabled:bg-gray-100"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
//               <input
//                 type="text"
//                 value={formData.address.country}
//                 disabled
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-500"
//               />
//             </div>
//           </div>
//         </div>

//         {/* Emergency Contact */}
//         <div className="border-t pt-6">
//           <h3 className="text-lg font-semibold text-gray-800 mb-4">Emergency Contact</h3>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
//               <input
//                 type="text"
//                 value={formData.emergencyContact.name}
//                 onChange={(e) => setFormData({
//                   ...formData,
//                   emergencyContact: { ...formData.emergencyContact, name: e.target.value }
//                 })}
//                 disabled={!isEditing}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 disabled:bg-gray-100"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Relationship</label>
//               <input
//                 type="text"
//                 value={formData.emergencyContact.relationship}
//                 onChange={(e) => setFormData({
//                   ...formData,
//                   emergencyContact: { ...formData.emergencyContact, relationship: e.target.value }
//                 })}
//                 disabled={!isEditing}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 disabled:bg-gray-100"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
//               <input
//                 type="tel"
//                 value={formData.emergencyContact.phone}
//                 onChange={(e) => setFormData({
//                   ...formData,
//                   emergencyContact: { ...formData.emergencyContact, phone: e.target.value }
//                 })}
//                 disabled={!isEditing}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 disabled:bg-gray-100"
//               />
//             </div>
//           </div>
//         </div>

//         {isEditing && (
//           <div className="flex justify-end space-x-4 pt-6 border-t">
//             <button
//               type="button"
//               onClick={() => setIsEditing(false)}
//               className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
//             >
//               Save Changes
//             </button>
//           </div>
//         )}
//       </form>
//     </div>
//   );
// };

// // Placeholder components for other tabs
// const SessionsTab = () => (
//   <div className="bg-white rounded-2xl shadow-lg p-6">
//     <h2 className="text-2xl font-bold text-gray-800 mb-6">My Sessions</h2>
//     <p className="text-gray-500">Session management interface coming soon...</p>
//   </div>
// );

// const MedicalHistoryTab = () => (
//   <div className="bg-white rounded-2xl shadow-lg p-6">
//     <h2 className="text-2xl font-bold text-gray-800 mb-6">Medical History</h2>
//     <p className="text-gray-500">Medical history management interface coming soon...</p>
//   </div>
// );

// const TherapyPreferencesTab = () => (
//   <div className="bg-white rounded-2xl shadow-lg p-6">
//     <h2 className="text-2xl font-bold text-gray-800 mb-6">Therapy Preferences</h2>
//     <p className="text-gray-500">Therapy preferences management interface coming soon...</p>
//   </div>
// );

// const AvailabilityTab = () => (
//   <div className="bg-white rounded-2xl shadow-lg p-6">
//     <h2 className="text-2xl font-bold text-gray-800 mb-6">Availability</h2>
//     <p className="text-gray-500">Availability management interface coming soon...</p>
//   </div>
// );

// const ProgressTab = ({ progress }) => (
//   <div className="bg-white rounded-2xl shadow-lg p-6">
//     <h2 className="text-2xl font-bold text-gray-800 mb-6">My Progress</h2>
//     {progress && (
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
//         <div className="text-center p-4 border border-green-200 rounded-lg">
//           <div className="text-3xl font-bold text-green-600 mb-2">{progress.totalSessions}</div>
//           <div className="text-sm text-gray-600">Total Sessions</div>
//         </div>
//         <div className="text-center p-4 border border-green-200 rounded-lg">
//           <div className="text-3xl font-bold text-green-600 mb-2">
//             {Math.round(progress.completionRate * 100)}%
//           </div>
//           <div className="text-sm text-gray-600">Completion Rate</div>
//         </div>
//         <div className="text-center p-4 border border-green-200 rounded-lg">
//           <div className="text-3xl font-bold text-green-600 mb-2">
//             {progress.therapiesCompleted?.length || 0}
//           </div>
//           <div className="text-sm text-gray-600">Therapies Completed</div>
//         </div>
//       </div>
//     )}
//   </div>
// );

// const NotificationsTab = () => (
//   <div className="bg-white rounded-2xl shadow-lg p-6">
//     <h2 className="text-2xl font-bold text-gray-800 mb-6">Notifications</h2>
//     <p className="text-gray-500">Notifications management interface coming soon...</p>
//   </div>
// );

// export default PatientDashboard;

import React, { useState, useEffect, act } from 'react';
import { useAuth } from '../../utils/authContext';
import api from '../../utils/axios';
import { Bell, Check, Trash2 } from "lucide-react";
//import PatientFeedback from './patientFeedback.jsx';

const PatientDashboard = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [profile, setProfile] = useState(null);
  const [upcomingSessions, setUpcomingSessions] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showFeedback, setShowFeedback] = useState(false);
  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [profileRes, sessionsRes, notificationsRes, progressRes] = await Promise.all([
        api.get('/patient/profile'),
        api.get('/patient/sessions/upcoming?limit=5'),
        api.get('/patient/notifications?limit=5'),
        api.get('/patient/progress')
      ]);

      setProfile(profileRes.data.data);
      setUpcomingSessions(sessionsRes.data.data.sessions || []);
      setNotifications(notificationsRes.data.data.notifications || []);
      setProgress(progressRes.data.data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100">
      {/* Header */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  {profile?.profileImage ? (
                    <img
                      src={profile.profileImage}
                      alt="Profile"
                      className="w-24 h-24 rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-2xl text-green-600 font-semibold">
                      {profile?.name?.charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>
                <h2 className="text-xl font-bold text-gray-800">{profile?.name}</h2>
                <p className="text-green-600">Patient</p>
                <p className="text-sm text-gray-500 mt-1">{profile?.email}</p>
              </div>

              <nav className="space-y-2">
                {[
                  { id: 'overview', label: 'Overview', icon: 'fas fa-home' },
                  { id: 'profile', label: 'Profile', icon: 'fas fa-user' },
                  { id: 'sessions', label: 'My Sessions', icon: 'fas fa-calendar' },
                  { id: 'medical', label: 'Medical History', icon: 'fas fa-file-medical' },
                  { id: 'therapy', label: 'Therapy Preferences', icon: 'fas fa-spa' },
                  { id: 'availability', label: 'Availability', icon: 'fas fa-clock' },
                  { id: 'progress', label: 'Progress', icon: 'fas fa-chart-line' },
                  { id: 'notifications', label: 'Notifications', icon: 'fas fa-bell' },
                  { id: 'feedback', label: 'Feedback', icon: 'fas fa-comment-dots' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${activeTab === item.id
                        ? 'bg-green-100 text-green-700 border-r-2 border-green-600'
                        : 'text-gray-600 hover:bg-gray-50'
                      }`}
                  >
                    <i className={`${item.icon} w-5`}></i>
                    <span className="font-medium">{item.label}</span>
                  </button>
                ))}
              </nav>

            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            {activeTab === 'overview' && <OverviewTab
              profile={profile}
              upcomingSessions={upcomingSessions}
              notifications={notifications}
              setActiveTab={setActiveTab}
            />}
            {activeTab === 'profile' && <ProfileTab profile={profile} />}
            {activeTab === 'sessions' && <SessionsTab />}
            {activeTab === 'medical' && <MedicalHistoryTab />}
            {activeTab === 'therapy' && <TherapyPreferencesTab />}
            {activeTab === 'availability' && <AvailabilityTab />}
            {activeTab === 'progress' && <ProgressTab progress={progress} />}
            {activeTab === 'notifications' && <NotificationsTab />}
            {activeTab === 'feedback' && <PatientFeedback patientId={profile?._id} />}
          </div>
        </div>
      </div>
    </div>
  );
};




const OverviewTab = ({ profile, upcomingSessions, notifications, setActiveTab }) => {
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [profileData, setProfileData] = useState(profile);

  // Fetch the latest dashboard data after activation/deactivation
  const fetchDashboardData = async () => {
    try {
      const response = await api.get('/admin/dashboard');
      setProfileData(response.data);  // Update state with fetched data
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  // Handle toggle for activation/deactivation of the account
  const toggleAccountStatus = async () => {
    if (!profileData) return;
    try {
      setUpdatingStatus(true);

      if (profileData.isActive) {
        // Deactivate the profile
        await api.patch('/patient/deactivate');
      } else {
        // Activate the profile
        await api.patch('/patient/activate');
      }

      // Re-fetch dashboard and update state after status change
      await fetchDashboardData();

      // Reload the page to reflect changes
      window.location.reload(); // This will reload the entire page
    } catch (error) {
      console.error('Error toggling account status:', error);
    } finally {
      setUpdatingStatus(false);
    }
  };

  useEffect(() => {
    // Initialize profile data if profile prop changes
    setProfileData(profile);
  }, [profile]);

  return (
    <div className="space-y-6">
      {/* Welcome Card */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white rounded-2xl p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">Welcome back, {profileData?.name}!</h1>
            <p className="text-green-100">Your wellness journey continues. Stay committed to your healing path.</p>
          </div>
          <i className="fas fa-spa text-4xl text-green-200"></i>
          <button
            onClick={toggleAccountStatus}
            disabled={updatingStatus}
            className={`px-4 py-2 rounded-lg text-white font-medium shadow transition-all duration-200 ${
              profileData?.isActive
                ? 'bg-red-800 hover:bg-red-600'
                : 'bg-green-900 hover:bg-green-300'
            }`}
          >
            {updatingStatus
              ? 'Updating...'
              : profileData?.isActive
              ? 'Deactivate'
              : 'Activate'}
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-green-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Upcoming Sessions</p>
              <p className="text-2xl font-bold text-gray-800">{upcomingSessions.length}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <i className="fas fa-calendar-check text-green-600"></i>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-green-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Unread Notifications</p>
              <p className="text-2xl font-bold text-gray-800">
                {notifications.filter((n) => n.status === 'sent').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <i className="fas fa-bell text-blue-600"></i>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-green-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Active Therapies</p>
              <p className="text-2xl font-bold text-gray-800">
                {new Set(upcomingSessions.map((s) => s.therapyType)).size}
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <i className="fas fa-spa text-purple-600"></i>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Sessions */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Upcoming Sessions</h3>
            <button
              onClick={() => setActiveTab('sessions')}
              className="text-green-600 hover:text-green-700 text-sm font-medium"
            >
              View All
            </button>
          </div>
          <div className="space-y-4">
            {upcomingSessions.length > 0 ? (
              upcomingSessions.slice(0, 5).map((session) => (
                <div key={session._id} className="flex items-center justify-between p-3 border border-green-100 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-800">{session.therapyType}</p>
                    <p className="text-sm text-gray-500">
                      with {session.practitionerId?.name || 'Practitioner'}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-800">
                      {new Date(session.scheduledStart).toLocaleDateString()}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(session.scheduledStart).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">No upcoming sessions</p>
            )}
          </div>
        </div>

        {/* Recent Notifications */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Recent Notifications</h3>
            <button
              onClick={() => setActiveTab('notifications')}
              className="text-green-600 hover:text-green-700 text-sm font-medium"
            >
              View All
            </button>
          </div>
          <div className="space-y-3">
            {notifications.length > 0 ? (
              notifications.slice(0, 5).map((notification) => (
                <div key={notification._id} className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                  <i
                    className={`fas fa-bell text-green-600 mt-1 ${
                      notification.status === 'sent' ? 'text-green-600' : 'text-gray-400'
                    }`}
                  ></i>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800">{notification.title}</p>
                    <p className="text-xs text-gray-600">{notification.message}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(notification.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">No notifications</p>
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button
            onClick={() => setActiveTab('profile')}
            className="flex flex-col items-center p-4 border border-green-200 rounded-lg hover:bg-green-50 transition-colors"
          >
            <i className="fas fa-user-edit text-green-600 text-xl mb-2"></i>
            <span className="text-sm font-medium text-gray-700">Update Profile</span>
          </button>
          <button
            onClick={() => setActiveTab('medical')}
            className="flex flex-col items-center p-4 border border-green-200 rounded-lg hover:bg-green-50 transition-colors"
          >
            <i className="fas fa-file-medical text-green-600 text-xl mb-2"></i>
            <span className="text-sm font-medium text-gray-700">Medical History</span>
          </button>
          <button
            onClick={() => setActiveTab('therapy')}
            className="flex flex-col items-center p-4 border border-green-200 rounded-lg hover:bg-green-50 transition-colors"
          >
            <i className="fas fa-spa text-green-600 text-xl mb-2"></i>
            <span className="text-sm font-medium text-gray-700">Therapy Prefs</span>
          </button>
          <button
            onClick={() => setActiveTab('availability')}
            className="flex flex-col items-center p-4 border border-green-200 rounded-lg hover:bg-green-50 transition-colors"
          >
            <i className="fas fa-clock text-green-600 text-xl mb-2"></i>
            <span className="text-sm font-medium text-gray-700">Availability</span>
          </button>
        </div>
      </div>
    </div>
  );
};



const ProfileTab = ({ profile }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [formData, setFormData] = useState({
    name: profile?.name || '',
    phone: profile?.phone || '',
    gender: profile?.gender || '',
    dateOfBirth: profile?.dateOfBirth ? new Date(profile.dateOfBirth).toISOString().split('T')[0] : '',
    address: profile?.address || {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'India'
    },
    emergencyContact: profile?.emergencyContact || {
      name: '',
      relationship: '',
      phone: ''
    }
  });

  // Initialize form data when profile changes
  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || '',
        phone: profile.phone || '',
        gender: profile.gender || '',
        dateOfBirth: profile.dateOfBirth ? new Date(profile.dateOfBirth).toISOString().split('T')[0] : '',
        address: profile.address || {
          street: '',
          city: '',
          state: '',
          zipCode: '',
          country: 'India'
        },
        emergencyContact: profile.emergencyContact || {
          name: '',
          relationship: '',
          phone: ''
        }
      });
    }
  }, [profile]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put('/patient/profile', formData);
      setIsEditing(false);
      // Refresh profile data
      window.location.reload();
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Error updating profile. Please try again.');
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size too large. Please select an image smaller than 5MB.');
      return;
    }

    // Check file type
    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file.');
      return;
    }

    try {
      setUploadingImage(true);
      const uploadFormData = new FormData();
      uploadFormData.append('profileImage', file);

      // Try different possible endpoints
      const response = await api.patch('/patient/profile/image', uploadFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        alert('Profile image updated successfully!');
        window.location.reload();
      }
    } catch (error) {
      console.error('Error uploading image:', error);

      // If image upload endpoint doesn't work, try updating profile with base64
      try {
        const reader = new FileReader();
        reader.onloadend = async () => {
          const base64Image = reader.result;
          await api.put('/patient/profile', {
            ...formData,
            profileImage: base64Image
          });
          alert('Profile image updated successfully!');
          window.location.reload();
        };
        reader.readAsDataURL(file);
      } catch (fallbackError) {
        console.error('Fallback image upload failed:', fallbackError);
        alert('Error uploading image. Please try again.');
      }
    } finally {
      setUploadingImage(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Profile Information</h2>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
        >
          {isEditing ? 'Cancel' : 'Edit Profile'}
        </button>
      </div>

      {/* Profile Image Upload */}
      <div className="flex items-center space-x-6 mb-8">
        <div className="relative">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center overflow-hidden">
            {profile?.profileImage ? (
              <img
                src={profile.profileImage}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover"
              />
            ) : (
              <span className="text-2xl text-green-600 font-semibold">
                {profile?.name?.charAt(0).toUpperCase()}
              </span>
            )}
          </div>
          {isEditing && (
            <>
              <label
                htmlFor="profileImage"
                className="absolute bottom-0 right-0 bg-green-600 text-white p-2 rounded-full cursor-pointer hover:bg-green-700 transition-colors"
                title="Change profile image"
              >
                <i className="fas fa-camera text-sm"></i>
              </label>
              <input
                id="profileImage"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                disabled={uploadingImage}
              />
            </>
          )}
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Profile Picture</h3>
          <p className="text-sm text-gray-600">
            {isEditing ? 'Click the camera icon to upload a new profile image' : 'Your profile picture'}
          </p>
          {uploadingImage && (
            <p className="text-sm text-green-600 mt-1">
              <i className="fas fa-spinner fa-spin mr-2"></i>
              Uploading image...
            </p>
          )}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              disabled={!isEditing}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 disabled:bg-gray-100"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={profile?.email || ''}
              disabled
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              disabled={!isEditing}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 disabled:bg-gray-100"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
            <select
              value={formData.gender}
              onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
              disabled={!isEditing}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 disabled:bg-gray-100"
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
            <input
              type="date"
              value={formData.dateOfBirth}
              onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
              disabled={!isEditing}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 disabled:bg-gray-100"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
            <input
              type="text"
              value={profile?.age ? `${profile.age} years` : 'N/A'}
              disabled
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-500"
            />
          </div>
        </div>

        {/* Address Section */}
        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Address</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Street</label>
              <input
                type="text"
                value={formData.address.street}
                onChange={(e) => setFormData({
                  ...formData,
                  address: { ...formData.address, street: e.target.value }
                })}
                disabled={!isEditing}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 disabled:bg-gray-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
              <input
                type="text"
                value={formData.address.city}
                onChange={(e) => setFormData({
                  ...formData,
                  address: { ...formData.address, city: e.target.value }
                })}
                disabled={!isEditing}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 disabled:bg-gray-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
              <input
                type="text"
                value={formData.address.state}
                onChange={(e) => setFormData({
                  ...formData,
                  address: { ...formData.address, state: e.target.value }
                })}
                disabled={!isEditing}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 disabled:bg-gray-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">ZIP Code</label>
              <input
                type="text"
                value={formData.address.zipCode}
                onChange={(e) => setFormData({
                  ...formData,
                  address: { ...formData.address, zipCode: e.target.value }
                })}
                disabled={!isEditing}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 disabled:bg-gray-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
              <input
                type="text"
                value={formData.address.country}
                disabled
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-500"
              />
            </div>
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Emergency Contact</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
              <input
                type="text"
                value={formData.emergencyContact.name}
                onChange={(e) => setFormData({
                  ...formData,
                  emergencyContact: { ...formData.emergencyContact, name: e.target.value }
                })}
                disabled={!isEditing}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 disabled:bg-gray-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Relationship</label>
              <input
                type="text"
                value={formData.emergencyContact.relationship}
                onChange={(e) => setFormData({
                  ...formData,
                  emergencyContact: { ...formData.emergencyContact, relationship: e.target.value }
                })}
                disabled={!isEditing}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 disabled:bg-gray-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
              <input
                type="tel"
                value={formData.emergencyContact.phone}
                onChange={(e) => setFormData({
                  ...formData,
                  emergencyContact: { ...formData.emergencyContact, phone: e.target.value }
                })}
                disabled={!isEditing}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 disabled:bg-gray-100"
              />
            </div>
          </div>
        </div>

        {isEditing && (
          <div className="flex justify-end space-x-4 pt-6 border-t">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Save Changes
            </button>
          </div>
        )}
      </form>
    </div>
  );
};


// Sessions Tab with Infinite Scroll
// const SessionsTab = () => {
//   const [activeView, setActiveView] = useState('upcoming');
//   const [sessions, setSessions] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [page, setPage] = useState(1);
//   const [hasMore, setHasMore] = useState(true);

//   const fetchSessions = async (pageNum = 1, append = false) => {
//     try {
//       setLoading(true);
//       const endpoint = activeView === 'upcoming' 
//         ? '/patient/sessions/upcoming' 
//         : '/patient/sessions/history';

//       const response = await api.get(`${endpoint}?page=${pageNum}&limit=10`);
//       const newSessions = response.data.data.sessions || [];

//       if (append) {
//         setSessions(prev => [...prev, ...newSessions]);
//       } else {
//         setSessions(newSessions);
//       }

//       setHasMore(newSessions.length === 10);
//     } catch (error) {
//       console.error('Error fetching sessions:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     setPage(1);
//     fetchSessions(1, false);
//   }, [activeView]);

//   const handleScroll = (e) => {
//     const { scrollTop, scrollHeight, clientHeight } = e.target;
//     if (scrollHeight - scrollTop <= clientHeight * 1.2 && !loading && hasMore) {
//       const nextPage = page + 1;
//       setPage(nextPage);
//       fetchSessions(nextPage, true);
//     }
//   };

//   return (
//     <div className="bg-white rounded-2xl shadow-lg p-6">
//       <div className="flex items-center justify-between mb-6">
//         <h2 className="text-2xl font-bold text-gray-800">My Sessions</h2>
//         <div className="flex space-x-2">
//           <button
//             onClick={() => setActiveView('upcoming')}
//             className={`px-4 py-2 rounded-lg transition-colors ${
//               activeView === 'upcoming'
//                 ? 'bg-green-600 text-white'
//                 : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//             }`}
//           >
//             Upcoming
//           </button>
//           <button
//             onClick={() => setActiveView('history')}
//             className={`px-4 py-2 rounded-lg transition-colors ${
//               activeView === 'history'
//                 ? 'bg-green-600 text-white'
//                 : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//             }`}
//           >
//             History
//           </button>
//         </div>
//       </div>

//       <div 
//         className="max-h-96 overflow-y-auto space-y-4"
//         onScroll={handleScroll}
//       >
//         {sessions.length > 0 ? (
//           sessions.map((session) => (
//             <div key={session._id} className="border border-green-100 rounded-lg p-4">
//               <div className="flex justify-between items-start">
//                 <div>
//                   <h3 className="font-semibold text-gray-800">{session.therapyType}</h3>
//                   <p className="text-sm text-gray-600">
//                     with {session.practitionerId?.name || 'Practitioner'}
//                   </p>
//                   <p className="text-sm text-gray-500">
//                     {new Date(session.scheduledStart).toLocaleString()}
//                   </p>
//                 </div>
//                 <span className={`px-3 py-1 rounded-full text-xs font-medium ${
//                   session.status === 'scheduled' 
//                     ? 'bg-green-100 text-green-800'
//                     : session.status === 'completed'
//                     ? 'bg-blue-100 text-blue-800'
//                     : 'bg-gray-100 text-gray-800'
//                 }`}>
//                   {session.status}
//                 </span>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p className="text-gray-500 text-center py-8">No sessions found</p>
//         )}

//         {loading && (
//           <div className="flex justify-center py-4">
//             <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-600"></div>
//           </div>
//         )}

//         {!hasMore && sessions.length > 0 && (
//           <p className="text-center text-gray-500 py-4">No more sessions to load</p>
//         )}
//       </div>
//     </div>
//   );
// };

// Sessions Tab with Cancel Functionality - Updated Version
// Sessions Tab with Cancel Functionality - Fixed Version
const SessionsTab = () => {
  const [activeView, setActiveView] = useState('upcoming');
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [cancellingSession, setCancellingSession] = useState(null);

  const fetchSessions = async (pageNum = 1, append = false) => {
    try {
      setLoading(true);
      const endpoint = activeView === 'upcoming'
        ? '/patient/sessions/upcoming'
        : '/patient/sessions/history';

      const response = await api.get(`${endpoint}?page=${pageNum}&limit=10`);
      const newSessions = response.data.data.sessions || [];

      if (append) {
        setSessions(prev => [...prev, ...newSessions]);
      } else {
        setSessions(newSessions);
      }

      setHasMore(newSessions.length === 10);
    } catch (error) {
      console.error('Error fetching sessions:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPage(1);
    fetchSessions(1, false);
  }, [activeView]);

  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    if (scrollHeight - scrollTop <= clientHeight * 1.2 && !loading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchSessions(nextPage, true);
    }
  };

  const handleCancelSession = async (sessionId) => {
    try {
      setCancellingSession(sessionId);
      await api.post(`/sessions/${sessionId}/cancel`);

      // Update the session status locally
      setSessions(prevSessions =>
        prevSessions.map(session =>
          session._id === sessionId
            ? { ...session, status: 'cancelled' }
            : session
        )
      );

      alert('Session cancelled successfully!');
    } catch (error) {
      console.error('Error cancelling session:', error);
      alert('Failed to cancel session. Please try again.');
    } finally {
      setCancellingSession(null);
    }
  };

  const confirmCancel = (session) => {
    if (window.confirm(`Are you sure you want to cancel your ${session.therapyType} session scheduled for ${new Date(session.scheduledStart).toLocaleString()}?`)) {
      handleCancelSession(session._id);
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      scheduled: { color: 'bg-green-100 text-green-800', text: 'Scheduled' },
      completed: { color: 'bg-blue-100 text-blue-800', text: 'Completed' },
      cancelled: { color: 'bg-red-100 text-red-800', text: 'Cancelled' },
      in_progress: { color: 'bg-yellow-100 text-yellow-800', text: 'In Progress' },
      pending: { color: 'bg-orange-100 text-orange-800', text: 'Pending' },
      confirmed: { color: 'bg-green-100 text-green-800', text: 'Confirmed' },
      booked: { color: 'bg-purple-100 text-purple-800', text: 'Booked' }
    };

    const config = statusConfig[status] || statusConfig.pending;
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${config.color}`}>
        {config.text}
      </span>
    );
  };

  const canCancelSession = (session) => {
    // Allow cancellation for various upcoming session statuses
    const cancellableStatuses = ['scheduled', 'pending', 'confirmed', 'booked'];
    const now = new Date();
    const sessionTime = new Date(session.scheduledStart);

    return cancellableStatuses.includes(session.status) && sessionTime > now;
  };

  // Calculate upcoming sessions count properly
  const getUpcomingCount = () => {
    const now = new Date();
    return sessions.filter(session => {
      const sessionTime = new Date(session.scheduledStart);
      const upcomingStatuses = ['scheduled', 'pending', 'confirmed', 'booked'];
      return upcomingStatuses.includes(session.status) && sessionTime > now;
    }).length;
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">My Sessions</h2>
        <div className="flex space-x-2">
          <button
            onClick={() => setActiveView('upcoming')}
            className={`px-4 py-2 rounded-lg transition-colors ${activeView === 'upcoming'
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
          >
            Upcoming
          </button>
          <button
            onClick={() => setActiveView('history')}
            className={`px-4 py-2 rounded-lg transition-colors ${activeView === 'history'
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
          >
            History
          </button>
        </div>
      </div>

      <div
        className="max-h-96 overflow-y-auto space-y-4"
        onScroll={handleScroll}
      >
        {sessions.length > 0 ? (
          sessions.map((session) => {
            const showCancelButton = canCancelSession(session);

            return (
              <div key={session._id} className="border border-green-100 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 text-lg">{session.therapyType}</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      with {session.practitionerId?.name || 'Practitioner'}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      <i className="fas fa-calendar mr-2"></i>
                      {new Date(session.scheduledStart).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                    <p className="text-sm text-gray-500">
                      <i className="fas fa-clock mr-2"></i>
                      {new Date(session.scheduledStart).toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>

                    {session.notes && (
                      <div className="mt-2 p-2 bg-blue-50 rounded">
                        <p className="text-xs text-blue-700">
                          <strong>Notes:</strong> {session.notes}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col items-end space-y-2 ml-4">
                    {getStatusBadge(session.status)}

                    {showCancelButton && (
                      <button
                        onClick={() => confirmCancel(session)}
                        disabled={cancellingSession === session._id}
                        className={`px-4 py-2 rounded text-sm font-medium transition-colors flex items-center ${cancellingSession === session._id
                            ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                            : 'bg-red-600 text-white hover:bg-red-700'
                          }`}
                      >
                        {cancellingSession === session._id ? (
                          <>
                            <i className="fas fa-spinner fa-spin mr-2"></i>
                            Cancelling...
                          </>
                        ) : (
                          <>
                            <i className="fas fa-times mr-2"></i>
                            Cancel Session
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>

                {/* Debug info - remove in production */}
                <div className="text-xs text-gray-400 mb-2">
                  Debug: Status: {session.status}, Can Cancel: {showCancelButton ? 'Yes' : 'No'}
                </div>

                {/* Additional session details */}
                <div className="flex justify-between items-center text-xs text-gray-500 border-t pt-2">
                  <span>Duration: {session.duration || '60'} mins</span>
                  <span>Session ID: {session._id?.slice(-8) || 'N/A'}</span>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-8">
            <i className="fas fa-calendar-times text-4xl text-gray-300 mb-4"></i>
            <p className="text-gray-500">No sessions found</p>
            <p className="text-sm text-gray-400 mt-1">
              {activeView === 'upcoming'
                ? 'You have no upcoming sessions scheduled.'
                : 'No session history available.'}
            </p>
          </div>
        )}

        {loading && (
          <div className="flex justify-center py-4">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-600"></div>
          </div>
        )}

        {!hasMore && sessions.length > 0 && (
          <p className="text-center text-gray-500 py-4">
            <i className="fas fa-check-circle text-green-500 mr-2"></i>
            All sessions loaded
          </p>
        )}
      </div>

      {/* Quick Stats */}
      {sessions.length > 0 && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-green-600">
                {getUpcomingCount()}
              </div>
              <div className="text-xs text-gray-500">Upcoming</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">
                {sessions.filter(s => s.status === 'completed').length}
              </div>
              <div className="text-xs text-gray-500">Completed</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-red-600">
                {sessions.filter(s => s.status === 'cancelled').length}
              </div>
              <div className="text-xs text-gray-500">Cancelled</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-600">
                {sessions.length}
              </div>
              <div className="text-xs text-gray-500">Total</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Medical History Tab
// const MedicalHistoryTab = () => {
//   const [medicalHistory, setMedicalHistory] = useState([]);
//   const [isEditing, setIsEditing] = useState(false);
//   const [formData, setFormData] = useState({
//     condition: '',
//     diagnosisDate: '',
//     severity: 'medium',
//     notes: '',
//     isActive: true
//   });

//   useEffect(() => {
//     fetchMedicalHistory();
//   }, []);

//   const fetchMedicalHistory = async () => {
//     try {
//       const response = await api.get('/patient/medical-history');
//       setMedicalHistory(response.data.data || []);
//     } catch (error) {
//       console.error('Error fetching medical history:', error);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await api.put('/patient/medical-history', {
//         medicalHistory: [...medicalHistory, formData]
//       });
//       setIsEditing(false);
//       setFormData({
//         condition: '',
//         diagnosisDate: '',
//         severity: 'medium',
//         notes: '',
//         isActive: true
//       });
//       fetchMedicalHistory();
//     } catch (error) {
//       console.error('Error updating medical history:', error);
//     }
//   };

//   return (
//     <div className="bg-white rounded-2xl shadow-lg p-6">
//       <div className="flex items-center justify-between mb-6">
//         <h2 className="text-2xl font-bold text-gray-800">Medical History</h2>
//         <button
//           onClick={() => setIsEditing(!isEditing)}
//           className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
//         >
//           {isEditing ? 'Cancel' : 'Add Condition'}
//         </button>
//       </div>

//       {isEditing && (
//         <form onSubmit={handleSubmit} className="mb-6 p-4 border border-green-200 rounded-lg">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Condition</label>
//               <input
//                 type="text"
//                 value={formData.condition}
//                 onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Diagnosis Date</label>
//               <input
//                 type="date"
//                 value={formData.diagnosisDate}
//                 onChange={(e) => setFormData({ ...formData, diagnosisDate: e.target.value })}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Severity</label>
//               <select
//                 value={formData.severity}
//                 onChange={(e) => setFormData({ ...formData, severity: e.target.value })}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
//               >
//                 <option value="low">Low</option>
//                 <option value="medium">Medium</option>
//                 <option value="high">High</option>
//               </select>
//             </div>
//             <div className="md:col-span-2">
//               <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
//               <textarea
//                 value={formData.notes}
//                 onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
//                 rows="3"
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
//               />
//             </div>
//           </div>
//           <div className="flex justify-end space-x-4 mt-4">
//             <button
//               type="button"
//               onClick={() => setIsEditing(false)}
//               className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
//             >
//               Add Condition
//             </button>
//           </div>
//         </form>
//       )}

//       <div className="space-y-4">
//         {medicalHistory.length > 0 ? (
//           medicalHistory.map((condition, index) => (
//             <div key={index} className="border border-green-100 rounded-lg p-4">
//               <div className="flex justify-between items-start">
//                 <div>
//                   <h3 className="font-semibold text-gray-800">{condition.condition}</h3>
//                   <p className="text-sm text-gray-600">
//                     Diagnosed: {new Date(condition.diagnosisDate).toLocaleDateString()}
//                   </p>
//                   <p className="text-sm text-gray-600">Notes: {condition.notes}</p>
//                 </div>
//                 <span className={`px-3 py-1 rounded-full text-xs font-medium ${
//                   condition.severity === 'high' 
//                     ? 'bg-red-100 text-red-800'
//                     : condition.severity === 'medium'
//                     ? 'bg-yellow-100 text-yellow-800'
//                     : 'bg-green-100 text-green-800'
//                 }`}>
//                   {condition.severity}
//                 </span>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p className="text-gray-500 text-center py-8">No medical conditions recorded</p>
//         )}
//       </div>
//     </div>
//   );
// };



 const MedicalHistoryTab = () => {
  const [medicalHistory, setMedicalHistory] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [formData, setFormData] = useState({
    condition: '',
    diagnosisDate: '',
    severity: 'medium',
    notes: '',
    isActive: true,
  });

  useEffect(() => {
    fetchMedicalHistory();
  }, []);

  const fetchMedicalHistory = async () => {
    try {
      const response = await api.get('/patient/medical-history');
      setMedicalHistory(response.data.data || []);
    } catch (error) {
      console.error('Error fetching medical history:', error);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const updatedHistory = [...medicalHistory, formData];
      await api.put('/patient/medical-history', { medicalHistory: updatedHistory });
      setMedicalHistory(updatedHistory);
      resetForm();
    } catch (error) {
      console.error('Error adding condition:', error);
    }
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setFormData(medicalHistory[index]);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const updatedHistory = medicalHistory.map((item, index) =>
        index === editingIndex ? formData : item
      );
      await api.put('/patient/medical-history', { medicalHistory: updatedHistory });
      setMedicalHistory(updatedHistory);
      resetForm();
    } catch (error) {
      console.error('Error updating condition:', error);
    }
  };

  const handleDelete = async (index) => {
    try {
      const updatedHistory = medicalHistory.filter((_, i) => i !== index);
      await api.put('/patient/medical-history', { medicalHistory: updatedHistory });
      setMedicalHistory(updatedHistory);
    } catch (error) {
      console.error('Error deleting condition:', error);
    }
  };

  const resetForm = () => {
    setEditingIndex(null);
    setFormData({
      condition: '',
      diagnosisDate: '',
      severity: 'medium',
      notes: '',
      isActive: true,
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Medical History</h2>

      {/* Add / Edit Form */}
      <form
        onSubmit={editingIndex !== null ? handleUpdate : handleAdd}
        className="mb-6 p-4 border border-green-200 rounded-lg"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Condition
            </label>
            <input
              type="text"
              value={formData.condition}
              onChange={(e) =>
                setFormData({ ...formData, condition: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Diagnosis Date
            </label>
            <input
              type="date"
              value={formData.diagnosisDate}
              onChange={(e) =>
                setFormData({ ...formData, diagnosisDate: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Severity
            </label>
            <select
              value={formData.severity}
              onChange={(e) =>
                setFormData({ ...formData, severity: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Notes
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) =>
                setFormData({ ...formData, notes: e.target.value })
              }
              rows="3"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>
        <div className="flex justify-end space-x-4 mt-4">
          {editingIndex !== null && (
            <button
              type="button"
              onClick={resetForm}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            {editingIndex !== null ? 'Update Condition' : 'Add Condition'}
          </button>
        </div>
      </form>

      {/* Condition List */}
      <div className="space-y-4">
        {medicalHistory.length > 0 ? (
          medicalHistory.map((condition, index) => (
            <div
              key={index}
              className="border border-green-100 rounded-lg p-4 flex justify-between items-start"
            >
              <div>
                <h3 className="font-semibold text-gray-800">
                  {condition.condition}
                </h3>
                <p className="text-sm text-gray-600">
                  Diagnosed: {new Date(condition.diagnosisDate).toLocaleDateString()}
                </p>
                {condition.notes && (
                  <p className="text-sm text-gray-600">Notes: {condition.notes}</p>
                )}
              </div>

              <div className="flex items-center space-x-2">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    condition.severity === 'high'
                      ? 'bg-red-100 text-red-800'
                      : condition.severity === 'medium'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-green-100 text-green-800'
                  }`}
                >
                  {condition.severity}
                </span>

                <button
                  onClick={() => handleEdit(index)}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(index)}
                  className="text-red-600 hover:text-red-800 text-sm font-medium"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center py-8">
            No medical conditions recorded
          </p>
        )}
      </div>
    </div>
  );
};


// Availability Tab
// const AvailabilityTab = () => {
//   const [availability, setAvailability] = useState([]);
//   const [isEditing, setIsEditing] = useState(false);
//   const [formData, setFormData] = useState({
//     dayOfWeek: 0,
//     startTime: '09:00',
//     endTime: '17:00',
//     isActive: true
//   });

//   const daysOfWeek = [
//     'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
//   ];

//   useEffect(() => {
//     fetchAvailability();
//   }, []);

//   const fetchAvailability = async () => {
//     try {
//       const response = await api.get('/patient/availability');
//       setAvailability(response.data.data || []);
//     } catch (error) {
//       console.error('Error fetching availability:', error);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await api.put('/patient/availability', {
//         availability: [...availability, formData]
//       });
//       setIsEditing(false);
//       setFormData({
//         dayOfWeek: 0,
//         startTime: '09:00',
//         endTime: '17:00',
//         isActive: true
//       });
//       fetchAvailability();
//     } catch (error) {
//       console.error('Error updating availability:', error);
//     }
//   };

//   return (
//     <div className="bg-white rounded-2xl shadow-lg p-6">
//       <div className="flex items-center justify-between mb-6">
//         <h2 className="text-2xl font-bold text-gray-800">Availability</h2>
//         <button
//           onClick={() => setIsEditing(!isEditing)}
//           className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
//         >
//           {isEditing ? 'Cancel' : 'Add Availability'}
//         </button>
//       </div>

//       {isEditing && (
//         <form onSubmit={handleSubmit} className="mb-6 p-4 border border-green-200 rounded-lg">
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Day</label>
//               <select
//                 value={formData.dayOfWeek}
//                 onChange={(e) => setFormData({ ...formData, dayOfWeek: parseInt(e.target.value) })}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
//               >
//                 {daysOfWeek.map((day, index) => (
//                   <option key={index} value={index}>{day}</option>
//                 ))}
//               </select>
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Start Time</label>
//               <input
//                 type="time"
//                 value={formData.startTime}
//                 onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">End Time</label>
//               <input
//                 type="time"
//                 value={formData.endTime}
//                 onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
//               />
//             </div>
//             <div className="flex items-end">
//               <label className="flex items-center">
//                 <input
//                   type="checkbox"
//                   checked={formData.isActive}
//                   onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
//                   className="rounded border-gray-300 text-green-600 focus:ring-green-500"
//                 />
//                 <span className="ml-2 text-sm text-gray-700">Active</span>
//               </label>
//             </div>
//           </div>
//           <div className="flex justify-end space-x-4 mt-4">
//             <button
//               type="button"
//               onClick={() => setIsEditing(false)}
//               className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
//             >
//               Add Availability
//             </button>
//           </div>
//         </form>
//       )}

//       <div className="space-y-4">
//         {availability.length > 0 ? (
//           availability.map((slot, index) => (
//             <div key={index} className="border border-green-100 rounded-lg p-4">
//               <div className="flex justify-between items-center">
//                 <div>
//                   <h3 className="font-semibold text-gray-800">{daysOfWeek[slot.dayOfWeek]}</h3>
//                   <p className="text-sm text-gray-600">
//                     {slot.startTime} - {slot.endTime}
//                   </p>
//                 </div>
//                 <span className={`px-3 py-1 rounded-full text-xs font-medium ${
//                   slot.isActive 
//                     ? 'bg-green-100 text-green-800'
//                     : 'bg-gray-100 text-gray-800'
//                 }`}>
//                   {slot.isActive ? 'Active' : 'Inactive'}
//                 </span>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p className="text-gray-500 text-center py-8">No availability set</p>
//         )}
//       </div>
//     </div>
//   );
// };

const AvailabilityTab = () => {
  const [availability, setAvailability] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [formData, setFormData] = useState({
    dayOfWeek: 0,
    startTime: '09:00',
    endTime: '17:00',
    isActive: true,
  });

  const daysOfWeek = [
    'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
  ];

  useEffect(() => {
    fetchAvailability();
  }, []);

  const fetchAvailability = async () => {
    try {
      const response = await api.get('/patient/availability');
      setAvailability(response.data.data || []);
    } catch (error) {
      console.error('Error fetching availability:', error);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const updatedAvailability = [...availability, formData];
      await api.put('/patient/availability', { availability: updatedAvailability });
      setAvailability(updatedAvailability);
      resetForm();
    } catch (error) {
      console.error('Error adding availability:', error);
    }
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setFormData(availability[index]);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const updatedAvailability = availability.map((item, index) =>
        index === editingIndex ? formData : item
      );
      await api.put('/patient/availability', { availability: updatedAvailability });
      setAvailability(updatedAvailability);
      resetForm();
    } catch (error) {
      console.error('Error updating availability:', error);
    }
  };

  const handleDelete = async (index) => {
    try {
      const updatedAvailability = availability.filter((_, i) => i !== index);
      await api.put('/patient/availability', { availability: updatedAvailability });
      setAvailability(updatedAvailability);
    } catch (error) {
      console.error('Error deleting availability:', error);
    }
  };

  const resetForm = () => {
    setEditingIndex(null);
    setFormData({
      dayOfWeek: 0,
      startTime: '09:00',
      endTime: '17:00',
      isActive: true,
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Availability</h2>

      {/* Add/Edit Form */}
      <form
        onSubmit={editingIndex !== null ? handleUpdate : handleAdd}
        className="mb-6 p-4 border border-green-200 rounded-lg"
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Day</label>
            <select
              value={formData.dayOfWeek}
              onChange={(e) =>
                setFormData({ ...formData, dayOfWeek: parseInt(e.target.value) })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            >
              {daysOfWeek.map((day, index) => (
                <option key={index} value={index}>{day}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Start Time</label>
            <input
              type="time"
              value={formData.startTime}
              onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">End Time</label>
            <input
              type="time"
              value={formData.endTime}
              onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="flex items-end">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.isActive}
                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                className="rounded border-gray-300 text-green-600 focus:ring-green-500"
              />
              <span className="ml-2 text-sm text-gray-700">Active</span>
            </label>
          </div>
        </div>

        <div className="flex justify-end space-x-4 mt-4">
          {editingIndex !== null && (
            <button
              type="button"
              onClick={resetForm}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            {editingIndex !== null ? 'Update Availability' : 'Add Availability'}
          </button>
        </div>
      </form>

      {/* Availability List */}
      <div className="space-y-4">
        {availability.length > 0 ? (
          availability.map((slot, index) => (
            <div key={index} className="border border-green-100 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold text-gray-800">{daysOfWeek[slot.dayOfWeek]}</h3>
                  <p className="text-sm text-gray-600">
                    {slot.startTime} - {slot.endTime}
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${slot.isActive
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-800'
                  }`}>
                  {slot.isActive ? 'Active' : 'Inactive'}
                </span>

                <button
                  onClick={() => handleEdit(index)}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(index)}
                  className="text-red-600 hover:text-red-800 text-sm font-medium"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center py-8">No availability set</p>
        )}
      </div>
    </div>
  );
};


// Notifications Tab with Infinite Scroll
// const NotificationsTab = () => {
//   const [notifications, setNotifications] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [page, setPage] = useState(1);
//   const [hasMore, setHasMore] = useState(true);

//   const fetchNotifications = async (pageNum = 1, append = false) => {
//     try {
//       setLoading(true);
//       const response = await api.get(`/patient/notifications?page=${pageNum}&limit=10`);
//       const newNotifications = response.data.data.notifications || [];

//       if (append) {
//         setNotifications(prev => [...prev, ...newNotifications]);
//       } else {
//         setNotifications(newNotifications);
//       }

//       setHasMore(newNotifications.length === 10);
//     } catch (error) {
//       console.error('Error fetching notifications:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchNotifications(1, false);
//   }, []);

//   const handleScroll = (e) => {
//     const { scrollTop, scrollHeight, clientHeight } = e.target;
//     if (scrollHeight - scrollTop <= clientHeight * 1.2 && !loading && hasMore) {
//       const nextPage = page + 1;
//       setPage(nextPage);
//       fetchNotifications(nextPage, true);
//     }
//   };

//   const getPriorityColor = (priority) => {
//     switch (priority) {
//       case 'high': return 'text-red-600';
//       case 'medium': return 'text-yellow-600';
//       case 'low': return 'text-green-600';
//       default: return 'text-gray-600';
//     }
//   };

//   return (
//     <div className="bg-white rounded-2xl shadow-lg p-6">
//       <h2 className="text-2xl font-bold text-gray-800 mb-6">Notifications</h2>

//       <div 
//         className="max-h-96 overflow-y-auto space-y-4"
//         onScroll={handleScroll}
//       >
//         {notifications.length > 0 ? (
//           notifications.map((notification) => (
//             <div key={notification._id} className="border border-green-100 rounded-lg p-4">
//               <div className="flex justify-between items-start mb-2">
//                 <h3 className="font-semibold text-gray-800">{notification.title}</h3>
//                 <i className={`fas fa-bell ${getPriorityColor(notification.priority)}`}></i>
//               </div>
//               <p className="text-sm text-gray-600 mb-2">{notification.message}</p>
//               <div className="flex justify-between items-center text-xs text-gray-500">
//                 <span className="capitalize">{notification.type.replace('_', ' ')}</span>
//                 <span>{new Date(notification.createdAt).toLocaleString()}</span>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p className="text-gray-500 text-center py-8">No notifications</p>
//         )}

//         {loading && (
//           <div className="flex justify-center py-4">
//             <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-600"></div>
//           </div>
//         )}

//         {!hasMore && notifications.length > 0 && (
//           <p className="text-center text-gray-500 py-4">No more notifications to load</p>
//         )}
//       </div>
//     </div>
//   );
// };

// Notifications Tab with Infinite Scroll
// const NotificationsTab = () => {
//   const [notifications, setNotifications] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [page, setPage] = useState(1);
//   const [hasMore, setHasMore] = useState(true);

//   const fetchNotifications = async (pageNum = 1, append = false) => {
//     try {
//       setLoading(true);
//       const response = await api.get(`/patient/notifications?page=${pageNum}&limit=10`);
//       const newNotifications = response.data.data.notifications || [];

//       if (append) {
//         setNotifications(prev => [...prev, ...newNotifications]);
//       } else {
//         setNotifications(newNotifications);
//       }

//       setHasMore(newNotifications.length === 10);
//     } catch (error) {
//       console.error('Error fetching notifications:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchNotifications(1, false);
//   }, []);

//   const handleScroll = (e) => {
//     const { scrollTop, scrollHeight, clientHeight } = e.target;
//     if (scrollHeight - scrollTop <= clientHeight * 1.2 && !loading && hasMore) {
//       const nextPage = page + 1;
//       setPage(nextPage);
//       fetchNotifications(nextPage, true);
//     }
//   };

//   const getPriorityColor = (priority) => {
//     switch (priority) {
//       case 'high': return 'text-red-600';
//       case 'medium': return 'text-yellow-600';
//       case 'low': return 'text-green-600';
//       default: return 'text-gray-600';
//     }
//   };

//   return (
//     <div className="bg-white rounded-2xl shadow-lg p-6">
//       <h2 className="text-2xl font-bold text-gray-800 mb-6">Notifications</h2>

//       <div 
//         className="max-h-96 overflow-y-auto space-y-4"
//         onScroll={handleScroll}
//       >
//         {notifications.length > 0 ? (
//           notifications.map((notification) => (
//             <div key={notification._id} className="border border-green-100 rounded-lg p-4">
//               <div className="flex justify-between items-start mb-2">
//                 <h3 className="font-semibold text-gray-800">{notification.title}</h3>
//                 <i className={`fas fa-bell ${getPriorityColor(notification.priority)}`}></i>
//               </div>
//               <p className="text-sm text-gray-600 mb-2">{notification.message}</p>
//               <div className="flex justify-between items-center text-xs text-gray-500">
//                 <span className="capitalize">{notification.type.replace('_', ' ')}</span>
//                 <span>{new Date(notification.createdAt).toLocaleString()}</span>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p className="text-gray-500 text-center py-8">No notifications</p>
//         )}

//         {loading && (
//           <div className="flex justify-center py-4">
//             <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-600"></div>
//           </div>
//         )}

//         {!hasMore && notifications.length > 0 && (
//           <p className="text-center text-gray-500 py-4">No more notifications to load</p>
//         )}
//       </div>
//     </div>
//   );
// };

const NotificationsTab = () => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  // Fetch notifications
  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const res = await api.get("/notifications");
      setNotifications(res.data.data.notifications);
      fetchUnreadCount();
    } catch (err) {
      console.error("Error fetching notifications:", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch unread count
  const fetchUnreadCount = async () => {
    try {
      const res = await api.get("/notifications/unread-count");
      setUnreadCount(res.data.data.unreadCount);
    } catch (err) {
      console.error("Error fetching unread count:", err);
    }
  };

  // Mark notification as read
  const markAsRead = async (id) => {
    try {
      await api.patch(`/notifications/${id}/read`);
      fetchNotifications();
    } catch (err) {
      console.error("Error marking as read:", err);
    }
  };

  // Mark all as read
  const markAllAsRead = async () => {
    try {
      await api.patch("/notifications/read-all");
      fetchNotifications();
    } catch (err) {
      console.error("Error marking all as read:", err);
    }
  };

  // Delete notification
  const deleteNotification = async (id) => {
    try {
      await api.delete(`/notifications/${id}`);
      fetchNotifications();
    } catch (err) {
      console.error("Error deleting notification:", err);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  // Filter notifications
  const filteredNotifications =
    filter === "unread"
      ? notifications.filter(
        (n) => n.status === "sent" || n.status === "delivered"
      )
      : notifications;

  return (
    <div className="min-h-screen bg-green-50 flex flex-col items-center py-8">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-2xl p-6 border border-green-100">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <Bell className="text-green-600 w-7 h-7" />
            <h2 className="text-2xl font-semibold text-green-800">
              Notifications
            </h2>
          </div>

          <button
            onClick={markAllAsRead}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm rounded-lg shadow"
          >
            Mark all as read
          </button>
        </div>

        {/* Filter Tabs */}
        <div className="flex mb-6 border-b border-green-200">
          <button
            className={`px-6 py-2 text-sm font-medium ${filter === "all"
                ? "text-green-700 border-b-2 border-green-600"
                : "text-green-500"
              }`}
            onClick={() => setFilter("all")}
          >
            All Notifications
          </button>
          <button
            className={`px-6 py-2 text-sm font-medium ${filter === "unread"
                ? "text-green-700 border-b-2 border-green-600"
                : "text-green-500"
              }`}
            onClick={() => setFilter("unread")}
          >
            Unread ({unreadCount})
          </button>
        </div>

        {/* Notifications List */}
        {loading ? (
          <div className="text-center text-green-600 py-8">Loading...</div>
        ) : filteredNotifications.length === 0 ? (
          <div className="text-center text-green-500 py-8">
            No notifications found.
          </div>
        ) : (
          <div className="space-y-4">
            {filteredNotifications.map((notif) => (
              <div
                key={notif._id}
                className={`p-4 rounded-xl shadow-sm border flex justify-between items-start ${notif.status === "read"
                    ? "bg-green-100"
                    : "bg-green-50 border-green-200"
                  }`}
              >
                <div>
                  <h3 className="font-semibold text-green-800">
                    {notif.title}
                  </h3>
                  <p className="text-green-700 text-sm mt-1">
                    {notif.message}
                  </p>
                  <p className="text-xs text-green-500 mt-2">
                    {new Date(notif.createdAt).toLocaleString()}
                  </p>
                </div>

                <div className="flex flex-col items-end gap-2">
                  {notif.status !== "read" && (
                    <button
                      onClick={() => markAsRead(notif._id)}
                      className="text-green-600 hover:text-green-800 text-sm flex items-center gap-1"
                    >
                      <Check className="w-4 h-4" /> Mark as read
                    </button>
                  )}
                  <button
                    onClick={() => deleteNotification(notif._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Progress Tab (unchanged from your original)
const ProgressTab = ({ progress }) => (
  <div className="bg-white rounded-2xl shadow-lg p-6">
    <h2 className="text-2xl font-bold text-gray-800 mb-6">My Progress</h2>
    {progress && (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="text-center p-4 border border-green-200 rounded-lg">
          <div className="text-3xl font-bold text-green-600 mb-2">{progress.totalSessions}</div>
          <div className="text-sm text-gray-600">Total Sessions</div>
        </div>
        <div className="text-center p-4 border border-green-200 rounded-lg">
          <div className="text-3xl font-bold text-green-600 mb-2">
            {Math.round(progress.completionRate * 100)}%
          </div>
          <div className="text-sm text-gray-600">Completion Rate</div>
        </div>
        <div className="text-center p-4 border border-green-200 rounded-lg">
          <div className="text-3xl font-bold text-green-600 mb-2">
            {progress.therapiesCompleted?.length || 0}
          </div>
          <div className="text-sm text-gray-600">Therapies Completed</div>
        </div>
      </div>
    )}
  </div>
);

// const PatientFeedback = ({ patientId }) => {
//   const [feedbackList, setFeedbackList] = useState([]); // Store feedback data
//   const [newFeedback, setNewFeedback] = useState({ ratings: { overall: 0, professionalism: 0 }, comments: '' }); // New feedback form data
//   const [loading, setLoading] = useState(true);
//   const [isEditing, setIsEditing] = useState(false);  // To toggle between edit mode and add mode
//   const [feedbackToEdit, setFeedbackToEdit] = useState(null); // Feedback being edited
//   console.log("Patient ID:", patientId);
//   // Fetch all previous feedback for the patient
//   useEffect(() => {
//     const fetchFeedback = async () => {
//       try {
//         const response = await api.get(`/feedback/my-feedback`);
//         setFeedbackList(response.data.data);
//       } catch (error) {
//         console.error('Error fetching feedback:', error);
//         toast.error('Error fetching feedback data.');
//       }
//       setLoading(false);
//     };

//     fetchFeedback();
//   }, []);

//   // Handle input change for feedback form
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewFeedback({
//       ...newFeedback,
//       [name]: value,
//     });
//   };

//   // Handle ratings change
//   const handleRatingsChange = (e) => {
//     const { name, value } = e.target;
//     setNewFeedback({
//       ...newFeedback,
//       ratings: { ...newFeedback.ratings, [name]: parseInt(value) },
//     });
//   };

//   // Create new feedback
//   const handleCreateFeedback = async () => {
//     try {
//       const response = await api.post(`/feedback/`, {
//         ...newFeedback,
//         patientId, // Add the patientId to the feedback
//       });

//       // Add new feedback at the end of the list
//       setFeedbackList([...feedbackList, response.data.data]);
//       setNewFeedback({ ratings: { overall: 0, professionalism: 0 }, comments: '' });
//       toast.success('Feedback submitted successfully!');
//     } catch (error) {
//       console.error('Error creating feedback:', error);
//       toast.error('Error submitting feedback.');
//     }
//   };

//   // Edit existing feedback
//   const handleEditFeedback = async () => {
//     try {
//       const response = await api.put(`/feedback/${feedbackToEdit._id}`, {
//         ...newFeedback,
//         patientId, // Add patientId to ensure correct ownership
//       });

//       // Update the specific feedback in the array
//       const updatedFeedbackList = feedbackList.map((fb) =>
//         fb._id === feedbackToEdit._id ? response.data.data : fb
//       );
//       setFeedbackList(updatedFeedbackList);
//       setIsEditing(false);
//       setFeedbackToEdit(null);
//       setNewFeedback({ ratings: { overall: 0, professionalism: 0 }, comments: '' });
//       toast.success('Feedback updated successfully!');
//     } catch (error) {
//       console.error('Error updating feedback:', error);
//       toast.error('Error updating feedback.');
//     }
//   };

//   // Delete feedback
//   const handleDeleteFeedback = async (feedbackId) => {
//     try {
//       await api.delete(`/feedback/${feedbackId}`);

//       // Remove the deleted feedback from the array
//       const updatedFeedbackList = feedbackList.filter((fb) => fb._id !== feedbackId);
//       setFeedbackList(updatedFeedbackList);
//       toast.success('Feedback deleted successfully!');
//     } catch (error) {
//       console.error('Error deleting feedback:', error);
//       toast.error('Error deleting feedback.');
//     }
//   };

//   // Start editing an existing feedback
//   const handleEditClick = (feedback) => {
//     setIsEditing(true);
//     setFeedbackToEdit(feedback);
//     setNewFeedback(feedback); // Pre-populate the form with the existing feedback
//   };

//   return (
//     <div className="feedback-container" style={{ backgroundColor: '#E8F6F3', padding: '20px', borderRadius: '8px' }}>
//       <h2>Feedback for Your Sessions</h2>

//       {/* Feedback Form */}
//       <div className="feedback-form">
//         <h3>{isEditing ? 'Edit Feedback' : 'Add Feedback'}</h3>
//         <div className="form-group">
//           <label>Overall Rating</label>
//           <input
//             type="number"
//             name="overall"
//             value={newFeedback.ratings.overall}
//             onChange={handleRatingsChange}
//             min="1"
//             max="5"
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label>Professionalism Rating</label>
//           <input
//             type="number"
//             name="professionalism"
//             value={newFeedback.ratings.professionalism}
//             onChange={handleRatingsChange}
//             min="1"
//             max="5"
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label>Comments</label>
//           <textarea
//             name="comments"
//             value={newFeedback.comments}
//             onChange={handleInputChange}
//             rows="4"
//             required
//           />
//         </div>
//         <button
//           onClick={isEditing ? handleEditFeedback : handleCreateFeedback}
//           style={{ backgroundColor: '#4CAF50', color: 'white', padding: '10px 20px', borderRadius: '5px' }}
//         >
//           {isEditing ? 'Update Feedback' : 'Submit Feedback'}
//         </button>
//       </div>

//       {/* Feedback List */}
//       <div className="feedback-list" style={{ marginTop: '30px' }}>
//         <h3>Your Previous Feedback</h3>
//         {loading ? (
//           <div>Loading...</div>
//         ) : feedbackList.length === 0 ? (
//           <div>No feedback submitted yet.</div>
//         ) : (
//           feedbackList.map((feedback) => (
//             <div key={feedback._id} className="feedback-item" style={{ marginBottom: '15px', padding: '15px', border: '1px solid #ddd', borderRadius: '8px' }}>
//               <div style={{ display: 'flex', justifyContent: 'space-between' }}>
//                 <strong>{feedback.sessionId?.therapyType}</strong>
//                 <span style={{ color: feedback.ratings.overall >= 4 ? 'green' : 'red', fontWeight: 'bold' }}>
//                   Rating: {feedback.ratings.overall}
//                 </span>
//               </div>
//               <p>{feedback.comments || 'No comments provided.'}</p>
//               <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
//                 <button
//                   onClick={() => handleEditClick(feedback)}
//                   style={{ backgroundColor: '#FFD700', color: 'white', marginRight: '10px', padding: '5px 10px', borderRadius: '5px' }}
//                 >
//                   Edit
//                 </button>
//                 <button
//                   onClick={() => handleDeleteFeedback(feedback._id)}
//                   style={{ backgroundColor: '#FF5252', color: 'white', padding: '5px 10px', borderRadius: '5px' }}
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

const PatientFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [editingFeedback, setEditingFeedback] = useState(null);
  const [formData, setFormData] = useState({
    sessionId: '',
    ratings: {
      overall: 0,
      professionalism: 0,
      cleanliness: 0,
      effectiveness: 0,
      communication: 0
    },
    comments: {
      strengths: '',
      improvements: '',
      additionalComments: ''
    },
    anonymous: false
  });

  // Fetch user's feedback
  const fetchFeedbacks = async () => {
    try {
      setLoading(true);
      const response = await api.get('/feedback/my-feedback');
      if (response.data.success) {
        setFeedbacks(response.data.data.feedbacks || []);
      }
    } catch (error) {
      console.error('Error fetching feedbacks:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  // Handle form input changes
  const handleInputChange = (path, value) => {
    const keys = path.split('.');
    setFormData(prev => {
      const newData = { ...prev };
      let current = newData;

      for (let i = 0; i < keys.length - 1; i++) {
        current[keys[i]] = { ...current[keys[i]] };
        current = current[keys[i]];
      }

      current[keys[keys.length - 1]] = value;
      return newData;
    });
  };

  // Handle rating star click
  const handleRatingChange = (category, rating) => {
    handleInputChange(`ratings.${category}`, rating);
  };

  // Submit feedback (create or update)
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate session ID for new feedback
    if (!editingFeedback && !formData.sessionId.trim()) {
      alert('Please enter a session ID');
      return;
    }

    try {
      if (editingFeedback) {
        // Update existing feedback
        const response = await api.put(`/feedback/${editingFeedback._id}`, {
          ratings: formData.ratings,
          comments: formData.comments
        });

        if (response.data.success) {
          // Update the feedback in the list
          setFeedbacks(prev =>
            prev.map(fb =>
              fb._id === editingFeedback._id ? response.data.data : fb
            )
          );
        }
      } else {
        // Create new feedback with sessionId
        const response = await api.post('/feedback', {
          sessionId: formData.sessionId.trim(),
          ratings: formData.ratings,
          comments: formData.comments,
          anonymous: formData.anonymous
        });

        if (response.data.success) {
          // Add new feedback to the list
          setFeedbacks(prev => [response.data.data, ...prev]);
        }
      }

      // Reset form and close
      setFormData({
        sessionId: '',
        ratings: {
          overall: 0,
          professionalism: 0,
          cleanliness: 0,
          effectiveness: 0,
          communication: 0
        },
        comments: {
          strengths: '',
          improvements: '',
          additionalComments: ''
        },
        anonymous: false
      });
      setEditingFeedback(null);
      setShowFeedbackForm(false);
    } catch (error) {
      console.error('Error submitting feedback:', error);
      alert(error.response?.data?.message || 'Error submitting feedback. Please try again.');
    }
  };

  // Edit feedback
  const handleEdit = (feedback) => {
    setEditingFeedback(feedback);
    setFormData({
      sessionId: feedback.sessionId?._id || '',
      ratings: feedback.ratings,
      comments: feedback.comments,
      anonymous: feedback.anonymous || false
    });
    setShowFeedbackForm(true);
  };

  // Delete feedback
  const handleDelete = async (feedbackId) => {
    if (window.confirm('Are you sure you want to delete this feedback?')) {
      try {
        const response = await api.delete(`/feedback/${feedbackId}`);
        if (response.data.success) {
          // Remove feedback from the list
          setFeedbacks(prev => prev.filter(fb => fb._id !== feedbackId));
        }
      } catch (error) {
        console.error('Error deleting feedback:', error);
        alert('Error deleting feedback. Please try again.');
      }
    }
  };

  // Star rating component
  const StarRating = ({ rating, onRatingChange, disabled = false }) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => !disabled && onRatingChange(star)}
            disabled={disabled}
            className={`text-2xl ${star <= rating ? 'text-yellow-400' : 'text-gray-300'
              } ${!disabled ? 'hover:text-yellow-300' : ''} transition-colors`}
          >
            ★
          </button>
        ))}
      </div>
    );
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-emerald-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header with Add New Button */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-emerald-900">My Feedback</h1>
          <button
            onClick={() => {
              setEditingFeedback(null);
              setShowFeedbackForm(true);
              setFormData({
                sessionId: '',
                ratings: {
                  overall: 0,
                  professionalism: 0,
                  cleanliness: 0,
                  effectiveness: 0,
                  communication: 0
                },
                comments: {
                  strengths: '',
                  improvements: '',
                  additionalComments: ''
                },
                anonymous: false
              });
            }}
            className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors font-medium"
          >
            + Add New Feedback
          </button>
        </div>

        {/* Feedback Form */}
        {showFeedbackForm && (
          <div className="bg-white rounded-xl shadow-lg border border-emerald-200 p-6 mb-8">
            <h2 className="text-2xl font-bold text-emerald-900 mb-6">
              {editingFeedback ? 'Edit Feedback' : 'Submit Feedback'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Session ID Input */}
              <div>
                <label className="block text-sm font-medium text-emerald-700 mb-2">
                  Session ID
                </label>
                <input
                  type="text"
                  value={formData.sessionId}
                  onChange={(e) => handleInputChange('sessionId', e.target.value)}
                  placeholder="Enter session ID"
                  className="w-full p-3 border border-emerald-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white"
                  required={!editingFeedback}
                  disabled={!!editingFeedback}
                />
                <p className="text-sm text-emerald-600 mt-1">
                  Enter the session ID for which you want to provide feedback
                </p>
              </div>

              {/* Overall Rating */}
              <div>
                <label className="block text-sm font-medium text-emerald-700 mb-2">
                  Overall Rating
                </label>
                <StarRating
                  rating={formData.ratings.overall}
                  onRatingChange={(rating) => handleRatingChange('overall', rating)}
                />
              </div>

              {/* Additional Rating Categories */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-emerald-700 mb-2">
                    Professionalism
                  </label>
                  <StarRating
                    rating={formData.ratings.professionalism}
                    onRatingChange={(rating) => handleRatingChange('professionalism', rating)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-emerald-700 mb-2">
                    Cleanliness
                  </label>
                  <StarRating
                    rating={formData.ratings.cleanliness}
                    onRatingChange={(rating) => handleRatingChange('cleanliness', rating)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-emerald-700 mb-2">
                    Effectiveness
                  </label>
                  <StarRating
                    rating={formData.ratings.effectiveness}
                    onRatingChange={(rating) => handleRatingChange('effectiveness', rating)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-emerald-700 mb-2">
                    Communication
                  </label>
                  <StarRating
                    rating={formData.ratings.communication}
                    onRatingChange={(rating) => handleRatingChange('communication', rating)}
                  />
                </div>
              </div>

              {/* Comments Sections */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-emerald-700 mb-2">
                    Symptoms Reported
                  </label>
                  <textarea
                    value={formData.comments.strengths}
                    onChange={(e) => handleInputChange('comments.strengths', e.target.value)}
                    placeholder="Add symptom..."
                    className="w-full p-3 border border-emerald-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 resize-none"
                    rows="3"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-emerald-700 mb-2">
                    Side Effects (if any)
                  </label>
                  <textarea
                    value={formData.comments.improvements}
                    onChange={(e) => handleInputChange('comments.improvements', e.target.value)}
                    placeholder="Add side effect..."
                    className="w-full p-3 border border-emerald-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 resize-none"
                    rows="3"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-emerald-700 mb-2">
                    Improvements Noticed
                  </label>
                  <textarea
                    value={formData.comments.additionalComments}
                    onChange={(e) => handleInputChange('comments.additionalComments', e.target.value)}
                    placeholder="Add improvement..."
                    className="w-full p-3 border border-emerald-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 resize-none"
                    rows="3"
                  />
                </div>
              </div>

              {/* Anonymous Option */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="anonymous"
                  checked={formData.anonymous}
                  onChange={(e) => handleInputChange('anonymous', e.target.checked)}
                  className="w-4 h-4 text-emerald-600 border-emerald-300 rounded focus:ring-emerald-500"
                />
                <label htmlFor="anonymous" className="ml-2 text-sm text-emerald-700">
                  Submit anonymously
                </label>
              </div>

              {/* Form Actions */}
              <div className="flex space-x-4 pt-4">
                <button
                  type="submit"
                  className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors font-medium flex-1"
                >
                  {editingFeedback ? 'Update Feedback' : 'Submit Feedback'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowFeedbackForm(false);
                    setEditingFeedback(null);
                  }}
                  className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors font-medium flex-1"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Feedback List */}
        <div className="space-y-6">
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto"></div>
              <p className="text-emerald-600 mt-4">Loading feedback...</p>
            </div>
          ) : feedbacks.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl border border-emerald-200">
              <div className="text-6xl mb-4">💬</div>
              <h3 className="text-xl font-semibold text-emerald-900 mb-2">No Feedback Yet</h3>
              <p className="text-emerald-600">Submit your first feedback to get started.</p>
            </div>
          ) : (
            feedbacks.map((feedback) => (
              <div key={feedback._id} className="bg-white rounded-xl shadow-sm border border-emerald-200 p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-emerald-900">
                      Session: {feedback.sessionId?._id || 'N/A'}
                      {feedback.practitionerId?.name && ` with ${feedback.practitionerId.name}`}
                    </h3>
                    <p className="text-emerald-600 text-sm">
                      {formatDate(feedback.createdAt)}
                      {feedback.anonymous && ' • Submitted anonymously'}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(feedback)}
                      className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-lg hover:bg-emerald-200 transition-colors text-sm font-medium"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(feedback._id)}
                      className="bg-red-100 text-red-700 px-3 py-1 rounded-lg hover:bg-red-200 transition-colors text-sm font-medium"
                    >
                      Delete
                    </button>
                  </div>
                </div>

                {/* Ratings Display */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-emerald-700 font-medium">Overall</p>
                    <StarRating rating={feedback.ratings.overall} disabled={true} />
                  </div>
                  <div>
                    <p className="text-sm text-emerald-700 font-medium">Professionalism</p>
                    <StarRating rating={feedback.ratings.professionalism} disabled={true} />
                  </div>
                  <div>
                    <p className="text-sm text-emerald-700 font-medium">Effectiveness</p>
                    <StarRating rating={feedback.ratings.effectiveness} disabled={true} />
                  </div>
                </div>

                {/* Comments Display */}
                {feedback.comments && (
                  <div className="space-y-3">
                    {feedback.comments.strengths && (
                      <div>
                        <p className="text-sm font-medium text-emerald-700 mb-1">Symptoms Reported:</p>
                        <p className="text-emerald-600">{feedback.comments.strengths}</p>
                      </div>
                    )}
                    {feedback.comments.improvements && (
                      <div>
                        <p className="text-sm font-medium text-emerald-700 mb-1">Side Effects:</p>
                        <p className="text-emerald-600">{feedback.comments.improvements}</p>
                      </div>
                    )}
                    {feedback.comments.additionalComments && (
                      <div>
                        <p className="text-sm font-medium text-emerald-700 mb-1">Improvements Noticed:</p>
                        <p className="text-emerald-600">{feedback.comments.additionalComments}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};



export default PatientDashboard;