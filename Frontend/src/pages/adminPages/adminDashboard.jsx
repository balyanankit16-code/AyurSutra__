// // // import React, { useState, useEffect } from 'react';
// // // import { useAuth } from '../../utils/authContext';
// // // import api from '../../utils/axios';

// // // const AdminDashboard = () => {
// // //   const { user, logout } = useAuth();
// // //   const [activeTab, setActiveTab] = useState('overview');
// // //   const [dashboardStats, setDashboardStats] = useState(null);
// // //   const [loading, setLoading] = useState(true);

// // //   useEffect(() => {
// // //     fetchDashboardData();
// // //   }, []);

// // //   const fetchDashboardData = async () => {
// // //     try {
// // //       setLoading(true);
// // //       const [statsRes] = await Promise.all([
// // //         api.get('/admin/dashboard')
// // //       ]);

// // //       setDashboardStats(statsRes.data.data);
// // //     } catch (error) {
// // //       console.error('Error fetching dashboard data:', error);
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   if (loading) {
// // //     return (
// // //       <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center">
// // //         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
// // //       </div>
// // //     );
// // //   }

// // //   return (
// // //     <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100">
// // //       {/* Header */}
// // //       <header className="bg-white shadow-sm border-b border-green-200">
// // //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// // //           <div className="flex justify-between items-center py-4">
// // //             <div className="flex items-center space-x-3">
// // //               <i className="fas fa-leaf text-2xl text-green-600"></i>
// // //               <h1 className="text-2xl font-bold text-gray-800">Ayurveda Wellness Admin</h1>
// // //             </div>
            
// // //           </div>
// // //         </div>
// // //       </header>

// // //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
// // //         <div className="flex flex-col lg:flex-row gap-8">
// // //           {/* Sidebar */}
// // //           <div className="lg:w-1/4">
// // //             <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
// // //               <div className="text-center mb-6">
// // //                 <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
// // //                   <span className="text-2xl text-green-600 font-semibold">
// // //                     {user?.name?.charAt(0).toUpperCase()}
// // //                   </span>
// // //                 </div>
// // //                 <h2 className="text-xl font-bold text-gray-800">{user?.name}</h2>
// // //                 <p className="text-green-600">Administrator</p>
// // //                 <p className="text-sm text-gray-500 mt-1">{user?.email}</p>
// // //               </div>

// // //               <nav className="space-y-2">
// // //                 {[
// // //                   { id: 'overview', label: 'Dashboard', icon: 'fas fa-tachometer-alt' },
// // //                   { id: 'practitioners', label: 'Practitioners', icon: 'fas fa-user-md' },
// // //                   { id: 'patients', label: 'Patients', icon: 'fas fa-users' },
// // //                   { id: 'sessions', label: 'Sessions', icon: 'fas fa-calendar' },
// // //                   { id: 'analytics', label: 'Analytics', icon: 'fas fa-chart-bar' },
// // //                   { id: 'feedback', label: 'Feedback Reports', icon: 'fas fa-comments' },
// // //                   { id: 'notifications', label: 'Broadcast', icon: 'fas fa-bullhorn' },
// // //                   { id: 'audit', label: 'Audit Logs', icon: 'fas fa-clipboard-list' }
// // //                 ].map((item) => (
// // //                   <button
// // //                     key={item.id}
// // //                     onClick={() => setActiveTab(item.id)}
// // //                     className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
// // //                       activeTab === item.id
// // //                         ? 'bg-green-100 text-green-700 border-r-2 border-green-600'
// // //                         : 'text-gray-600 hover:bg-gray-50'
// // //                     }`}
// // //                   >
// // //                     <i className={`${item.icon} w-5`}></i>
// // //                     <span className="font-medium">{item.label}</span>
// // //                   </button>
// // //                 ))}
// // //               </nav>

// // //               <button
// // //                 onClick={logout}
// // //                 className="w-full mt-6 flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
// // //               >
// // //                 <i className="fas fa-sign-out-alt"></i>
// // //                 <span className="font-medium">Logout</span>
// // //               </button>
// // //             </div>
// // //           </div>

// // //           {/* Main Content */}
// // //           <div className="lg:w-3/4">
// // //             {activeTab === 'overview' && <OverviewTab dashboardStats={dashboardStats} />}
// // //             {activeTab === 'practitioners' && <PractitionersTab />}
// // //             {activeTab === 'patients' && <PatientsTab />}
// // //             {activeTab === 'sessions' && <SessionsTab />}
// // //             {activeTab === 'analytics' && <AnalyticsTab />}
// // //             {activeTab === 'feedback' && <FeedbackTab />}
// // //             {activeTab === 'notifications' && <NotificationsTab />}
// // //             {activeTab === 'audit' && <AuditTab />}
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // // Overview Tab Component
// // // const OverviewTab = ({ dashboardStats }) => {
// // //   return (
// // //     <div className="space-y-6">
// // //       {/* Welcome Card */}
// // //       <div className="bg-gradient-to-r from-green-600 to-green-700 text-white rounded-2xl p-6 shadow-lg">
// // //         <div className="flex items-center justify-between">
// // //           <div>
// // //             <h1 className="text-2xl font-bold mb-2">Admin Dashboard</h1>
// // //             <p className="text-green-100">Manage your wellness center efficiently with real-time insights and analytics.</p>
// // //           </div>
// // //           <i className="fas fa-chart-line text-4xl text-green-200"></i>
// // //         </div>
// // //       </div>

// // //       {/* Stats Grid */}
// // //       <div className="grid grid-cols-1 md:grid-rows-2 md:grid-cols-3 gap-6">
// // //         <div className="bg-white rounded-2xl p-6 shadow-lg border border-green-100 md:row-span-2">
// // //           <div className="flex items-center justify-between mb-4">
// // //             <div>
// // //               <p className="text-sm text-gray-500">Total Patients</p>
// // //               <p className="text-3xl font-bold text-gray-800">{dashboardStats?.overview?.totalPatients || 0}</p>
// // //             </div>
// // //             <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
// // //               <i className="fas fa-users text-green-600"></i>
// // //             </div>
// // //           </div>
// // //           <div className="text-sm text-gray-600">
// // //             Active patients in your center
// // //           </div>
// // //         </div>

// // //         <div className="bg-white rounded-2xl p-6 shadow-lg border border-green-100">
// // //           <div className="flex items-center justify-between">
// // //             <div>
// // //               <p className="text-sm text-gray-500">Total Practitioners</p>
// // //               <p className="text-3xl font-bold text-gray-800">{dashboardStats?.overview?.totalPractitioners || 0}</p>
// // //             </div>
// // //             <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
// // //               <i className="fas fa-user-md text-blue-600"></i>
// // //             </div>
// // //           </div>
// // //         </div>

// // //         <div className="bg-white rounded-2xl p-6 shadow-lg border border-green-100">
// // //           <div className="flex items-center justify-between">
// // //             <div>
// // //               <p className="text-sm text-gray-500">Total Sessions</p>
// // //               <p className="text-3xl font-bold text-gray-800">{dashboardStats?.overview?.totalSessions || 0}</p>
// // //             </div>
// // //             <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
// // //               <i className="fas fa-calendar-check text-purple-600"></i>
// // //             </div>
// // //           </div>
// // //         </div>

// // //         <div className="bg-white rounded-2xl p-6 shadow-lg border border-green-100">
// // //           <div className="flex items-center justify-between">
// // //             <div>
// // //               <p className="text-sm text-gray-500">Upcoming Sessions</p>
// // //               <p className="text-3xl font-bold text-gray-800">{dashboardStats?.overview?.upcomingSessions || 0}</p>
// // //             </div>
// // //             <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
// // //               <i className="fas fa-clock text-orange-600"></i>
// // //             </div>
// // //           </div>
// // //         </div>

// // //         <div className="bg-white rounded-2xl p-6 shadow-lg border border-green-100">
// // //           <div className="flex items-center justify-between">
// // //             <div>
// // //               <p className="text-sm text-gray-500">Completion Rate</p>
// // //               <p className="text-3xl font-bold text-gray-800">
// // //                 {dashboardStats?.overview?.completionRate ? 
// // //                   `${Math.round(dashboardStats.overview.completionRate)}%` : '0%'
// // //                 }
// // //               </p>
// // //             </div>
// // //             <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
// // //               <i className="fas fa-chart-pie text-teal-600"></i>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </div>

// // //       {/* Recent Feedbacks */}
// // //       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
// // //         <div className="bg-white rounded-2xl shadow-lg p-6">
// // //           <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Feedbacks</h3>
// // //           <div className="space-y-4">
// // //             {dashboardStats?.recentFeedbacks?.length > 0 ? (
// // //               dashboardStats.recentFeedbacks.map((feedback) => (
// // //                 <div key={feedback._id} className="flex items-start space-x-3 p-3 border border-green-100 rounded-lg">
// // //                   <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
// // //                     <i className="fas fa-user text-green-600"></i>
// // //                   </div>
// // //                   <div className="flex-1">
// // //                     <div className="flex items-center justify-between">
// // //                       <p className="font-medium text-gray-800">
// // //                         {feedback.patientId?.name || 'Anonymous'}
// // //                       </p>
// // //                       <div className="flex items-center space-x-1">
// // //                         <i className="fas fa-star text-yellow-400"></i>
// // //                         <span className="text-sm font-medium text-gray-700">
// // //                           {feedback.ratings?.overall || 0}
// // //                         </span>
// // //                       </div>
// // //                     </div>
// // //                     <p className="text-sm text-gray-600 mt-1 line-clamp-2">
// // //                       {feedback.comments || 'No comments provided'}
// // //                     </p>
// // //                     <p className="text-xs text-gray-500 mt-2">
// // //                       For {feedback.practitionerId?.name || 'Practitioner'}
// // //                     </p>
// // //                   </div>
// // //                 </div>
// // //               ))
// // //             ) : (
// // //               <p className="text-gray-500 text-center py-4">No recent feedbacks</p>
// // //             )}
// // //           </div>
// // //         </div>

// // //         {/* Quick Actions */}
// // //         <div className="bg-white rounded-2xl shadow-lg p-6">
// // //           <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
// // //           <div className="grid grid-cols-2 gap-4">
// // //             <button 
// // //               onClick={() => setActiveTab('practitioners')}
// // //               className="flex flex-col items-center p-4 border border-green-200 rounded-lg hover:bg-green-50 transition-colors"
// // //             >
// // //               <i className="fas fa-user-plus text-green-600 text-xl mb-2"></i>
// // //               <span className="text-sm font-medium text-gray-700">Add Practitioner</span>
// // //             </button>
// // //             <button 
// // //               onClick={() => setActiveTab('notifications')}
// // //               className="flex flex-col items-center p-4 border border-green-200 rounded-lg hover:bg-green-50 transition-colors"
// // //             >
// // //               <i className="fas fa-bullhorn text-green-600 text-xl mb-2"></i>
// // //               <span className="text-sm font-medium text-gray-700">Send Broadcast</span>
// // //             </button>
// // //             <button 
// // //               onClick={() => setActiveTab('sessions')}
// // //               className="flex flex-col items-center p-4 border border-green-200 rounded-lg hover:bg-green-50 transition-colors"
// // //             >
// // //               <i className="fas fa-calendar-plus text-green-600 text-xl mb-2"></i>
// // //               <span className="text-sm font-medium text-gray-700">Manage Sessions</span>
// // //             </button>
// // //             <button 
// // //               onClick={() => setActiveTab('analytics')}
// // //               className="flex flex-col items-center p-4 border border-green-200 rounded-lg hover:bg-green-50 transition-colors"
// // //             >
// // //               <i className="fas fa-chart-bar text-green-600 text-xl mb-2"></i>
// // //               <span className="text-sm font-medium text-gray-700">View Analytics</span>
// // //             </button>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // // Practitioners Tab Component
// // // const PractitionersTab = () => {
// // //   const [practitioners, setPractitioners] = useState([]);
// // //   const [loading, setLoading] = useState(false);
// // //   const [showAddForm, setShowAddForm] = useState(false);

// // //   useEffect(() => {
// // //     fetchPractitioners();
// // //   }, []);

// // //   const fetchPractitioners = async () => {
// // //     try {
// // //       setLoading(true);
// // //       const response = await api.get('/admin/practitioners');
// // //       setPractitioners(response.data.data.practitioners);
// // //     } catch (error) {
// // //       console.error('Error fetching practitioners:', error);
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   return (
// // //     <div className="bg-white rounded-2xl shadow-lg p-6">
// // //       <div className="flex items-center justify-between mb-6">
// // //         <h2 className="text-2xl font-bold text-gray-800">Practitioner Management</h2>
// // //         <button
// // //           onClick={() => setShowAddForm(true)}
// // //           className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
// // //         >
// // //           <i className="fas fa-user-plus"></i>
// // //           <span>Add Practitioner</span>
// // //         </button>
// // //       </div>

// // //       {showAddForm && (
// // //         <AddPractitionerForm 
// // //           onClose={() => setShowAddForm(false)}
// // //           onSuccess={() => {
// // //             setShowAddForm(false);
// // //             fetchPractitioners();
// // //           }}
// // //         />
// // //       )}

// // //       {loading ? (
// // //         <div className="flex justify-center py-8">
// // //           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
// // //         </div>
// // //       ) : (
// // //         <div className="overflow-x-auto">
// // //           <table className="w-full">
// // //             <thead>
// // //               <tr className="border-b border-gray-200">
// // //                 <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Name</th>
// // //                 <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Email</th>
// // //                 <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Phone</th>
// // //                 <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Specialization</th>
// // //                 <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Experience</th>
// // //                 <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Status</th>
// // //               </tr>
// // //             </thead>
// // //             <tbody>
// // //               {practitioners.map((practitioner) => (
// // //                 <tr key={practitioner._id} className="border-b border-gray-100 hover:bg-gray-50">
// // //                   <td className="py-3 px-4">
// // //                     <div className="flex items-center space-x-3">
// // //                       <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
// // //                         <span className="text-green-600 text-sm font-medium">
// // //                           {practitioner.name?.charAt(0).toUpperCase()}
// // //                         </span>
// // //                       </div>
// // //                       <span className="font-medium text-gray-800">{practitioner.name}</span>
// // //                     </div>
// // //                   </td>
// // //                   <td className="py-3 px-4 text-gray-600">{practitioner.email}</td>
// // //                   <td className="py-3 px-4 text-gray-600">{practitioner.phone}</td>
// // //                   <td className="py-3 px-4">
// // //                     <div className="flex flex-wrap gap-1">
// // //                       {practitioner.specialization?.slice(0, 2).map((spec, index) => (
// // //                         <span key={index} className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
// // //                           {spec.therapyType}
// // //                         </span>
// // //                       ))}
// // //                       {practitioner.specialization?.length > 2 && (
// // //                         <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
// // //                           +{practitioner.specialization.length - 2}
// // //                         </span>
// // //                       )}
// // //                     </div>
// // //                   </td>
// // //                   <td className="py-3 px-4 text-gray-600">{practitioner.experienceYears} years</td>
// // //                   <td className="py-3 px-4">
// // //                     <span className={`px-2 py-1 rounded-full text-xs font-medium ${
// // //                       practitioner.isActive 
// // //                         ? 'bg-green-100 text-green-700' 
// // //                         : 'bg-red-100 text-red-700'
// // //                     }`}>
// // //                       {practitioner.isActive ? 'Active' : 'Inactive'}
// // //                     </span>
// // //                   </td>
// // //                 </tr>
// // //               ))}
// // //             </tbody>
// // //           </table>
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // };

// // // // Add Practitioner Form Component
// // // const AddPractitionerForm = ({ onClose, onSuccess }) => {
// // //   const [loading, setLoading] = useState(false);
// // //   const [formData, setFormData] = useState({
// // //     name: '',
// // //     email: '',
// // //     phone: '',
// // //     password: '',
// // //     specialization: [{ therapyType: '', yearsOfExperience: '', certification: '', hourlyRate: '' }],
// // //     experienceYears: '',
// // //     qualifications: [{ degree: '', institution: '', year: '', certificateUrl: '' }],
// // //     workingHours: [{ dayOfWeek: '', startTime: '', endTime: '', isActive: true }],
// // //     maxPatientsPerDay: '',
// // //     durationEstimates: [{ therapyType: '', duration: '' }],
// // //     bio: '',
// // //     languages: ['English', 'Hindi']
// // //   });

// // //   const handleSubmit = async (e) => {
// // //     e.preventDefault();
// // //     try {
// // //       setLoading(true);
// // //       await api.post('/admin/practitioners', formData);
// // //       onSuccess();
// // //     } catch (error) {
// // //       console.error('Error creating practitioner:', error);
// // //       alert('Error creating practitioner. Please try again.');
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   return (
// // //     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
// // //       <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
// // //         <div className="p-6">
// // //           <div className="flex items-center justify-between mb-6">
// // //             <h3 className="text-xl font-bold text-gray-800">Add New Practitioner</h3>
// // //             <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
// // //               <i className="fas fa-times text-xl"></i>
// // //             </button>
// // //           </div>

// // //           <form onSubmit={handleSubmit} className="space-y-4">
// // //             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// // //               <div>
// // //                 <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
// // //                 <input
// // //                   type="text"
// // //                   required
// // //                   value={formData.name}
// // //                   onChange={(e) => setFormData({ ...formData, name: e.target.value })}
// // //                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
// // //                 />
// // //               </div>
// // //               <div>
// // //                 <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
// // //                 <input
// // //                   type="email"
// // //                   required
// // //                   value={formData.email}
// // //                   onChange={(e) => setFormData({ ...formData, email: e.target.value })}
// // //                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
// // //                 />
// // //               </div>
// // //               <div>
// // //                 <label className="block text-sm font-medium text-gray-700 mb-2">Phone *</label>
// // //                 <input
// // //                   type="tel"
// // //                   required
// // //                   value={formData.phone}
// // //                   onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
// // //                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
// // //                 />
// // //               </div>
// // //               <div>
// // //                 <label className="block text-sm font-medium text-gray-700 mb-2">Password *</label>
// // //                 <input
// // //                   type="password"
// // //                   required
// // //                   value={formData.password}
// // //                   onChange={(e) => setFormData({ ...formData, password: e.target.value })}
// // //                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
// // //                 />
// // //               </div>
// // //               <div>
// // //                 <label className="block text-sm font-medium text-gray-700 mb-2">Experience Years *</label>
// // //                 <input
// // //                   type="number"
// // //                   required
// // //                   min="0"
// // //                   value={formData.experienceYears}
// // //                   onChange={(e) => setFormData({ ...formData, experienceYears: e.target.value })}
// // //                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
// // //                 />
// // //               </div>
// // //               <div>
// // //                 <label className="block text-sm font-medium text-gray-700 mb-2">Max Patients/Day</label>
// // //                 <input
// // //                   type="number"
// // //                   min="1"
// // //                   value={formData.maxPatientsPerDay}
// // //                   onChange={(e) => setFormData({ ...formData, maxPatientsPerDay: e.target.value })}
// // //                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
// // //                 />
// // //               </div>
// // //             </div>

// // //             <div>
// // //               <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
// // //               <textarea
// // //                 rows="3"
// // //                 value={formData.bio}
// // //                 onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
// // //                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
// // //                 placeholder="Tell us about the practitioner's experience and specialization..."
// // //               />
// // //             </div>

// // //             <div className="flex justify-end space-x-4 pt-4 border-t">
// // //               <button
// // //                 type="button"
// // //                 onClick={onClose}
// // //                 className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
// // //               >
// // //                 Cancel
// // //               </button>
// // //               <button
// // //                 type="submit"
// // //                 disabled={loading}
// // //                 className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
// // //               >
// // //                 {loading ? 'Creating...' : 'Create Practitioner'}
// // //               </button>
// // //             </div>
// // //           </form>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // // Placeholder components for other tabs
// // // const PatientsTab = () => (
// // //   <div className="bg-white rounded-2xl shadow-lg p-6">
// // //     <h2 className="text-2xl font-bold text-gray-800 mb-6">Patient Management</h2>
// // //     <p className="text-gray-500">Patient management interface coming soon...</p>
// // //   </div>
// // // );

// // // const SessionsTab = () => (
// // //   <div className="bg-white rounded-2xl shadow-lg p-6">
// // //     <h2 className="text-2xl font-bold text-gray-800 mb-6">Session Management</h2>
// // //     <p className="text-gray-500">Session management interface coming soon...</p>
// // //   </div>
// // // );

// // // const AnalyticsTab = () => (
// // //   <div className="bg-white rounded-2xl shadow-lg p-6">
// // //     <h2 className="text-2xl font-bold text-gray-800 mb-6">Analytics</h2>
// // //     <p className="text-gray-500">Analytics interface coming soon...</p>
// // //   </div>
// // // );

// // // const FeedbackTab = () => (
// // //   <div className="bg-white rounded-2xl shadow-lg p-6">
// // //     <h2 className="text-2xl font-bold text-gray-800 mb-6">Feedback Reports</h2>
// // //     <p className="text-gray-500">Feedback reports interface coming soon...</p>
// // //   </div>
// // // );

// // // const NotificationsTab = () => (
// // //   <div className="bg-white rounded-2xl shadow-lg p-6">
// // //     <h2 className="text-2xl font-bold text-gray-800 mb-6">Broadcast Notifications</h2>
// // //     <p className="text-gray-500">Broadcast notifications interface coming soon...</p>
// // //   </div>
// // // );

// // // const AuditTab = () => (
// // //   <div className="bg-white rounded-2xl shadow-lg p-6">
// // //     <h2 className="text-2xl font-bold text-gray-800 mb-6">Audit Logs</h2>
// // //     <p className="text-gray-500">Audit logs interface coming soon...</p>
// // //   </div>
// // // );

// // // export default AdminDashboard;


// // import React, { useState, useEffect } from 'react';
// // import { useAuth } from '../../utils/authContext';
// // import DashboardCard from '../../components/adminComponents/DashBoardCard';
// // import PractitionersCard from '../../components/adminComponents/PractitionersCard';
// // import PatientsCard from '../../components/adminComponents/PatientsCard';
// // import SessionsCard from '../../components/adminComponents/SessionsCard';
// // import AnalyticsCard from '../../components/adminComponents/AnalyticsCard';
// // import FeedbackReportsCard from '../../components/adminComponents/FeedbackReportsCard';
// // import BroadcastCard from '../../components/adminComponents/BroadcastCard';
// // import AuditLogsCard from '../../components/adminComponents/AuditLogsCard';
// // import NotificationCard from '../../components/adminComponents/NotificationCards';
// // const AdminDashboard = () => {
// //   const [activeTab, setActiveTab] = useState('dashboard');
// //   const { user } = useAuth();

// //   const renderContent = () => {
// //     switch (activeTab) {
// //       case 'dashboard':
// //         return <DashboardCard />;
// //       case 'practitioners':
// //         return <PractitionersCard />;
// //       case 'patients':
// //         return <PatientsCard />;
// //       case 'sessions':
// //         return <SessionsCard />;
// //       case 'analytics':
// //         return <AnalyticsCard />;
// //       case 'notifications':
// //         return <NotificationCard />;
// //       case 'feedback':
// //         return <FeedbackReportsCard />;
// //       case 'broadcast':
// //         return <BroadcastCard />;
// //       case 'audit':
// //         return <AuditLogsCard />;
// //       default:
// //         return <DashboardCard />;
// //     }
// //   };

// //   const menuItems = [
// //     { id: 'dashboard', label: 'Dashboard', icon: '📊' },
// //     { id: 'practitioners', label: 'Practitioners', icon: '👨‍⚕️' },
// //     { id: 'patients', label: 'Patients', icon: '👥' },
// //     { id: 'sessions', label: 'Sessions', icon: '📅' },
// //     { id: 'analytics', label: 'Analytics', icon: '📈' },
// //     { id: 'notifications', label: 'Notifications', icon: '🔔' },
// //     { id: 'feedback', label: 'Feedback Reports', icon: '💬' },
// //     { id: 'broadcast', label: 'Broadcast', icon: '📢' },
// //     { id: 'audit', label: 'Audit Logs', icon: '📋' }
// //   ];

// //   const quickActions = [
// //     { label: 'Add Practitioner', icon: '👨‍⚕️', action: () => setActiveTab('practitioners') },
// //     { label: 'Send Broadcast', icon: '📢', action: () => setActiveTab('broadcast') },
// //     { label: 'Manage Sessions', icon: '📅', action: () => setActiveTab('sessions') },
// //     { label: 'View Analytics', icon: '📈', action: () => setActiveTab('analytics') }
// //   ];

// //   const MediaItem = ({ icon, title, value, subtitle, color = "blue" }) => (
// //     <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
// //       <div className="flex items-center justify-between">
// //         <div>
// //           <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
// //           <p className="text-2xl font-bold text-gray-900">{value}</p>
// //           {subtitle && (
// //             <p className={`text-sm font-medium mt-1 ${
// //               color === 'green' ? 'text-green-600' : 
// //               color === 'red' ? 'text-red-600' : 
// //               'text-blue-600'
// //             }`}>
// //               {subtitle}
// //             </p>
// //           )}
// //         </div>
// //         <div className={`text-2xl ${
// //           color === 'green' ? 'text-green-500' : 
// //           color === 'red' ? 'text-red-500' : 
// //           'text-blue-500'
// //         }`}>
// //           {icon}
// //         </div>
// //       </div>
// //     </div>
// //   );

// //   const SidebarItem = ({ icon, label, isActive = false, onClick }) => (
// //     <button
// //       onClick={onClick}
// //       className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-all ${
// //         isActive 
// //           ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-700' 
// //           : 'text-gray-700 hover:bg-gray-50'
// //       }`}
// //     >
// //       <span className="mr-3 text-lg">{icon}</span>
// //       <span className="font-medium">{label}</span>
// //     </button>
// //   );

// //   return (
// //     <div className="flex min-h-screen bg-gray-50">
// //       {/* Sidebar - Administrator Section */}
// //       <div className="w-80 bg-white shadow-sm border-r border-gray-200">
// //         <div className="p-6 border-b border-gray-200">
// //           <h1 className="text-2xl font-bold text-gray-900">Ayurveda Wellness</h1>
// //           <p className="text-sm text-gray-600 mt-1">Admin</p>
// //         </div>
        
// //         {/* Admin Profile */}
// //         <div className="p-6 border-b border-gray-200">
// //           <div className="flex items-center space-x-3">
// //             <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
// //               <span className="text-blue-600 font-semibold text-lg">
// //                 {user?.name?.charAt(0) || 'A'}
// //               </span>
// //             </div>
// //             <div>
// //               <h2 className="font-semibold text-gray-900">{user?.name || 'Administrator'}</h2>
// //               <p className="text-sm text-gray-600">Administrator</p>
// //               <p className="text-xs text-gray-500">{user?.email || 'admin@email.com'}</p>
// //             </div>
// //           </div>
// //         </div>

// //         <div className="p-6">
// //           <h2 className="text-lg font-semibold text-gray-900 mb-4">Dashboard</h2>
// //           <nav className="space-y-2">
// //             {menuItems.map((item) => (
// //               <SidebarItem
// //                 key={item.id}
// //                 icon={item.icon}
// //                 label={item.label}
// //                 isActive={activeTab === item.id}
// //                 onClick={() => setActiveTab(item.id)}
// //               />
// //             ))}
// //           </nav>
// //         </div>
// //       </div>

// //       {/* Main Content */}
// //       <div className="flex-1 p-8">
// //         {/* Header */}
// //         <div className="mb-8">
// //           <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
// //           <p className="text-gray-600 mt-2">
// //             Manage your wellness center efficiently with real-time insights and analytics.
// //           </p>
// //         </div>

// //         {/* Show dashboard overview OR component content based on activeTab */}
// //         {activeTab === 'dashboard' ? (
// //           <>
// //             {/* Stats Grid */}
// //             <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
// //               <MediaItem
// //                 icon="👥"
// //                 title="Total Patients"
// //                 value="4"
// //                 subtitle="Active patients in your center"
// //                 color="blue"
// //               />
// //               <MediaItem
// //                 icon="👨‍⚕️"
// //                 title="Total Practitioners"
// //                 value="0"
// //                 subtitle="Upcoming Sessions"
// //                 color="blue"
// //               />
// //               <MediaItem
// //                 icon="📅"
// //                 title="Total Sessions"
// //                 value="0"
// //                 subtitle="Completion Rate"
// //                 color="blue"
// //               />
// //               <MediaItem
// //                 icon="✅"
// //                 title="0%"
// //                 value=""
// //                 subtitle="All time"
// //                 color="green"
// //               />
// //             </div>

// //             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
// //               {/* Recent Feedbacks */}
// //               <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
// //                 <div className="flex justify-between items-center mb-6">
// //                   <h2 className="text-xl font-semibold text-gray-900">Recent Feedbacks</h2>
// //                 </div>
// //                 <div className="text-center py-8">
// //                   <div className="text-4xl mb-2">💬</div>
// //                   <p className="text-gray-500">No recent feedbacks</p>
// //                 </div>
// //               </div>

// //               {/* Quick Actions */}
// //               <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
// //                 <div className="flex justify-between items-center mb-6">
// //                   <h2 className="text-xl font-semibold text-gray-900">Quick Actions</h2>
// //                 </div>
// //                 <div className="grid grid-cols-2 gap-4">
// //                   {quickActions.map((action, index) => (
// //                     <button
// //                       key={index}
// //                       onClick={action.action}
// //                       className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all text-center group"
// //                     >
// //                       <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">
// //                         {action.icon}
// //                       </div>
// //                       <p className="text-sm font-medium text-gray-700">{action.label}</p>
// //                     </button>
// //                   ))}
// //                 </div>
// //               </div>
// //             </div>
// //           </>
// //         ) : (
// //           // Show component content for other tabs
// //           <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
// //             {renderContent()}
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default AdminDashboard;
// import React, { useState, useEffect } from 'react';
// import { useAuth } from '../../utils/authContext';
// import api from '../../utils/axios'; // Your axios instance
// import DashboardCard from '../../components/adminComponents/DashBoardCard';
// import PractitionersCard from '../../components/adminComponents/PractitionersCard';
// import PatientsCard from '../../components/adminComponents/PatientsCard';
// import SessionsCard from '../../components/adminComponents/SessionsCard';
// import AnalyticsCard from '../../components/adminComponents/AnalyticsCard';
// import FeedbackReportsCard from '../../components/adminComponents/FeedbackReportsCard';
// import BroadcastCard from '../../components/adminComponents/BroadcastCard';
// import AuditLogsCard from '../../components/adminComponents/AuditLogsCard';
// import NotificationCard from '../../components/adminComponents/NotificationCards';

// const AdminDashboard = () => {
//   const [activeTab, setActiveTab] = useState('dashboard');
//   const { user } = useAuth();
//   const [dashboardData, setDashboardData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   // Fetch dashboard data
//   const fetchDashboardData = async () => {
//     try {
//       setLoading(true);
//       setError('');
//       const response = await api.get('/admin/dashboard');
      
//       if (response.data.success) {
//         setDashboardData(response.data.data);
//       } else {
//         setError('Failed to fetch dashboard data');
//       }
//     } catch (err) {
//       console.error('Error fetching dashboard data:', err);
//       setError('Error loading dashboard data');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchDashboardData();
//   }, []);

//   const renderContent = () => {
//     switch (activeTab) {
//       case 'dashboard':
//         return <DashboardCard />;
//       case 'practitioners':
//         return <PractitionersCard />;
//       case 'patients':
//         return <PatientsCard />;
//       case 'sessions':
//         return <SessionsCard />;
//       case 'analytics':
//         return <AnalyticsCard />;
//       case 'notifications':
//         return <NotificationCard />;
//       case 'feedback':
//         return <FeedbackReportsCard />;
//       case 'broadcast':
//         return <BroadcastCard />;
//       case 'audit':
//         return <AuditLogsCard />;
//       default:
//         return <DashboardCard />;
//     }
//   };

//   const menuItems = [
//     { id: 'dashboard', label: 'Dashboard', icon: '📊' },
//     { id: 'practitioners', label: 'Practitioners', icon: '👨‍⚕️' },
//     { id: 'patients', label: 'Patients', icon: '👥' },
//     { id: 'sessions', label: 'Sessions', icon: '📅' },
//     { id: 'analytics', label: 'Analytics', icon: '📈' },
//     { id: 'notifications', label: 'Notifications', icon: '🔔' },
//     { id: 'feedback', label: 'Feedback Reports', icon: '💬' },
//     { id: 'broadcast', label: 'Broadcast', icon: '📢' },
//     { id: 'audit', label: 'Audit Logs', icon: '📋' }
//   ];

//   const quickActions = [
//     { label: 'Add Practitioner', icon: '👨‍⚕️', action: () => setActiveTab('practitioners') },
//     { label: 'Send Broadcast', icon: '📢', action: () => setActiveTab('broadcast') },
//     { label: 'Manage Sessions', icon: '📅', action: () => setActiveTab('sessions') },
//     { label: 'View Analytics', icon: '📈', action: () => setActiveTab('analytics') }
//   ];

//   const MediaItem = ({ icon, title, value, subtitle, color = "blue" }) => (
//     <div className="bg-emerald-50 rounded-xl p-6 shadow-sm border border-emerald-100 hover:shadow-md transition-all">
//       <div className="flex items-center justify-between">
//         <div>
//           <p className="text-sm font-medium text-emerald-700 mb-1">{title}</p>
//           <p className="text-2xl font-bold text-emerald-900">{value}</p>
//           {subtitle && (
//             <p className={`text-sm font-medium mt-1 ${
//               color === 'green' ? 'text-green-600' : 
//               color === 'red' ? 'text-red-600' : 
//               'text-emerald-600'
//             }`}>
//               {subtitle}
//             </p>
//           )}
//         </div>
//         <div className={`text-2xl ${
//           color === 'green' ? 'text-green-500' : 
//           color === 'red' ? 'text-red-500' : 
//           'text-emerald-500'
//         }`}>
//           {icon}
//         </div>
//       </div>
//     </div>
//   );

//   const SidebarItem = ({ icon, label, isActive = false, onClick }) => (
//     <button
//       onClick={onClick}
//       className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-all ${
//         isActive 
//           ? 'bg-emerald-100 text-emerald-800 border-l-4 border-emerald-600' 
//           : 'text-emerald-700 hover:bg-emerald-50'
//       }`}
//     >
//       <span className="mr-3 text-lg">{icon}</span>
//       <span className="font-medium">{label}</span>
//     </button>
//   );

//   // Loading state
//   if (loading) {
//     return (
//       <div className="flex min-h-screen bg-emerald-50">
//         <div className="w-80 bg-white shadow-sm border-r border-emerald-200">
//           {/* Sidebar skeleton */}
//           <div className="p-6 border-b border-emerald-200">
//             <div className="h-8 bg-emerald-200 rounded animate-pulse mb-2"></div>
//             <div className="h-4 bg-emerald-200 rounded animate-pulse"></div>
//           </div>
//         </div>
//         <div className="flex-1 p-8">
//           <div className="flex items-center justify-center h-64">
//             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Error state
//   if (error && !dashboardData) {
//     return (
//       <div className="flex min-h-screen bg-emerald-50">
//         <div className="w-80 bg-white shadow-sm border-r border-emerald-200">
//           {/* Sidebar */}
//           <div className="p-6 border-b border-emerald-200">
//             <h1 className="text-2xl font-bold text-emerald-900">Ayurveda Wellness</h1>
//             <p className="text-sm text-emerald-600 mt-1">Admin</p>
//           </div>
//         </div>
//         <div className="flex-1 p-8">
//           <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
//             <div className="text-red-500 text-4xl mb-4">⚠️</div>
//             <h2 className="text-xl font-semibold text-red-800 mb-2">Error Loading Dashboard</h2>
//             <p className="text-red-600 mb-4">{error}</p>
//             <button
//               onClick={fetchDashboardData}
//               className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
//             >
//               Retry
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="flex min-h-screen bg-emerald-50">
//       {/* Sidebar - Administrator Section */}
//       <div className="w-80 bg-white shadow-sm border-r border-emerald-200">
//         <div className="p-6 border-b border-emerald-200">
//           <h1 className="text-2xl font-bold text-emerald-900">Ayurveda Wellness</h1>
//           <p className="text-sm text-emerald-600 mt-1">Admin</p>
//         </div>
        
//         {/* Admin Profile */}
//         <div className="p-6 border-b border-emerald-200">
//           <div className="flex items-center space-x-3">
//             <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
//               <span className="text-emerald-600 font-semibold text-lg">
//                 {dashboardData?.name?.charAt(0) || user?.name?.charAt(0) || 'A'}
//               </span>
//             </div>
//             <div>
//               <h2 className="font-semibold text-emerald-900">
//                 {dashboardData?.name || user?.name || 'Administrator'}
//               </h2>
//               <p className="text-sm text-emerald-600">Administrator</p>
//               <p className="text-xs text-emerald-500">
//                 {dashboardData?.email || user?.email || 'admin@email.com'}
//               </p>
//             </div>
//           </div>
//         </div>

//         <div className="p-6">
//           <h2 className="text-lg font-semibold text-emerald-900 mb-4">Dashboard</h2>
//           <nav className="space-y-2">
//             {menuItems.map((item) => (
//               <SidebarItem
//                 key={item.id}
//                 icon={item.icon}
//                 label={item.label}
//                 isActive={activeTab === item.id}
//                 onClick={() => setActiveTab(item.id)}
//               />
//             ))}
//           </nav>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 p-8">
//         {/* Header */}
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-emerald-900">Admin Dashboard</h1>
//           <p className="text-emerald-600 mt-2">
//             Manage your wellness center efficiently with real-time insights and analytics.
//           </p>
//         </div>

//         {/* Show dashboard overview OR component content based on activeTab */}
//         {activeTab === 'dashboard' ? (
//           <>
//             {/* Stats Grid */}
//             <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
//               <MediaItem
//                 icon="👥"
//                 title="Total Patients"
//                 value={dashboardData?.overview?.totalPatients || 0}
//                 subtitle="Active patients in your center"
//                 color="blue"
//               />
//               <MediaItem
//                 icon="👨‍⚕️"
//                 title="Total Practitioners"
//                 value={dashboardData?.overview?.totalPractitioners || 0}
//                 subtitle="Active practitioners"
//                 color="blue"
//               />
//               <MediaItem
//                 icon="📅"
//                 title="Total Sessions"
//                 value={dashboardData?.overview?.totalSessions || 0}
//                 subtitle={`${dashboardData?.overview?.upcomingSessions || 0} upcoming`}
//                 color="blue"
//               />
//               <MediaItem
//                 icon="✅"
//                 title={`${dashboardData?.overview?.completionRate || 0}%`}
//                 value=""
//                 subtitle="Completion Rate"
//                 color="green"
//               />
//             </div>

//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//               {/* Recent Feedbacks */}
//               <div className="bg-white rounded-xl shadow-sm border border-emerald-100 p-6">
//                 <div className="flex justify-between items-center mb-6">
//                   <h2 className="text-xl font-semibold text-emerald-900">Recent Feedbacks</h2>
//                   <span className="bg-emerald-100 text-emerald-800 text-sm px-3 py-1 rounded-full">
//                     {dashboardData?.recentFeedbacks?.length || 0}
//                   </span>
//                 </div>
//                 {dashboardData?.recentFeedbacks?.length > 0 ? (
//                   <div className="space-y-4">
//                     {dashboardData.recentFeedbacks.map((feedback, index) => (
//                       <div key={index} className="border border-emerald-200 rounded-lg p-4 bg-emerald-50">
//                         <div className="flex justify-between items-start mb-2">
//                           <h3 className="font-semibold text-emerald-800">{feedback.patientName}</h3>
//                           <div className="flex items-center">
//                             {[...Array(5)].map((_, i) => (
//                               <span
//                                 key={i}
//                                 className={`text-lg ${
//                                   i < (feedback.rating || 0) 
//                                     ? 'text-yellow-400' 
//                                     : 'text-emerald-300'
//                                 }`}
//                               >
//                                 ★
//                               </span>
//                             ))}
//                           </div>
//                         </div>
//                         <p className="text-emerald-600 text-sm">{feedback.comment}</p>
//                         <p className="text-emerald-500 text-xs mt-2">
//                           {new Date(feedback.createdAt).toLocaleDateString()}
//                         </p>
//                       </div>
//                     ))}
//                   </div>
//                 ) : (
//                   <div className="text-center py-8">
//                     <div className="text-4xl mb-2 text-emerald-400">💬</div>
//                     <p className="text-emerald-500">No recent feedbacks</p>
//                   </div>
//                 )}
//               </div>

//               {/* Monthly Stats */}
//               <div className="bg-white rounded-xl shadow-sm border border-emerald-100 p-6">
//                 <div className="flex justify-between items-center mb-6">
//                   <h2 className="text-xl font-semibold text-emerald-900">Monthly Sessions</h2>
//                   <span className="text-sm text-emerald-500">
//                     {new Date().toLocaleDateString('default', { month: 'long', year: 'numeric' })}
//                   </span>
//                 </div>
//                 {dashboardData?.monthlyStats?.length > 0 ? (
//                   <div className="space-y-3">
//                     {dashboardData.monthlyStats.map((stat, index) => (
//                       <div key={index} className="flex justify-between items-center p-3 border border-emerald-200 rounded-lg bg-emerald-50">
//                         <div>
//                           <p className="font-medium text-emerald-800">
//                             {new Date(stat._id).toLocaleDateString('default', { weekday: 'short', month: 'short', day: 'numeric' })}
//                           </p>
//                           <p className="text-sm text-emerald-500">
//                             {stat.completed || 0} completed of {stat.sessions || 0} total
//                           </p>
//                         </div>
//                         <div className="text-right">
//                           <div className="w-24 bg-emerald-200 rounded-full h-2">
//                             <div 
//                               className="bg-green-600 h-2 rounded-full" 
//                               style={{ 
//                                 width: `${stat.sessions > 0 ? ((stat.completed || 0) / stat.sessions) * 100 : 0}%` 
//                               }}
//                             ></div>
//                           </div>
//                           <p className="text-xs text-emerald-500 mt-1">
//                             {stat.sessions > 0 ? Math.round(((stat.completed || 0) / stat.sessions) * 100) : 0}%
//                           </p>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 ) : (
//                   <div className="text-center py-8">
//                     <div className="text-4xl mb-2 text-emerald-400">📊</div>
//                     <p className="text-emerald-500">No session data for this month</p>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Quick Actions */}
//             <div className="bg-white rounded-xl shadow-sm border border-emerald-100 p-6 mt-8">
//               <div className="flex justify-between items-center mb-6">
//                 <h2 className="text-xl font-semibold text-emerald-900">Quick Actions</h2>
//               </div>
//               <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                 {quickActions.map((action, index) => (
//                   <button
//                     key={index}
//                     onClick={action.action}
//                     className="bg-emerald-50 rounded-xl p-4 shadow-sm border border-emerald-100 hover:shadow-md transition-all text-center group hover:bg-emerald-100"
//                   >
//                     <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">
//                       {action.icon}
//                     </div>
//                     <p className="text-sm font-medium text-emerald-700">{action.label}</p>
//                   </button>
//                 ))}
//               </div>
//             </div>
//           </>
//         ) : (
//           // Show component content for other tabs
//           <div className="bg-white rounded-xl shadow-sm border border-emerald-100 p-6">
//             {renderContent()}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;

import React, { useState, useEffect } from 'react';
import { useAuth } from '../../utils/authContext';
import api from '../../utils/axios';
import DashboardCard from '../../components/adminComponents/DashBoardCard';
import PractitionersCard from '../../components/adminComponents/PractitionersCard';
import PatientsCard from '../../components/adminComponents/PatientsCard';
import SessionsCard from '../../components/adminComponents/SessionsCard';
import AnalyticsCard from '../../components/adminComponents/AnalyticsCard';
import FeedbackReportsCard from '../../components/adminComponents/FeedbackReportsCard';
import BroadcastCard from '../../components/adminComponents/BroadcastCard';
import AuditLogsCard from '../../components/adminComponents/AuditLogsCard';
import NotificationCard from '../../components/adminComponents/NotificationCards';
import CreateCenterForm from './CreateCenterForm'; // We'll create this component

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const { user } = useAuth();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [centerId, setCenterId] = useState(null);
  const [showCreateCenter, setShowCreateCenter] = useState(false);

  // Fetch user data to get centerId
  const fetchUserData = async () => {
    try {
      setLoading(true);
      setError('');
      
      // First, get user data to check centerId
      const userResponse = await api.get('/auth/me');
      const userData = userResponse.data.data;
      
      if (userData.centerId) {
        setCenterId(userData.centerId);
        // If center exists, fetch dashboard data
        await fetchDashboardData(userData.centerId);
      } else {
        // No center assigned, show create center form
        setShowCreateCenter(true);
      }
    } catch (err) {
      console.error('Error fetching user data:', err);
      setError('Error loading user data');
    } finally {
      setLoading(false);
    }
  };

  // Fetch dashboard data
  const fetchDashboardData = async (userCenterId) => {
    try {
      const response = await api.get('/admin/dashboard');
      if (response.data.success) {
        setDashboardData(response.data.data);
      } else {
        setError('Failed to fetch dashboard data');
      }
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setError('Error loading dashboard data');
    }
  };

  // Handle center creation success
  const handleCenterCreated = (newCenter) => {
    setCenterId(newCenter._id);
    setShowCreateCenter(false);
    // Refresh dashboard data
    fetchDashboardData(newCenter._id);
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardCard />;
      case 'practitioners':
        return <PractitionersCard />;
      case 'patients':
        return <PatientsCard />;
      case 'sessions':
        return <SessionsCard />;
      case 'analytics':
        return <AnalyticsCard />;
      case 'notifications':
        return <NotificationCard />;
      case 'feedback':
        return <FeedbackReportsCard />;
      case 'broadcast':
        return <BroadcastCard />;
      case 'audit':
        return <AuditLogsCard />;
      default:
        return <DashboardCard />;
    }
  };

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'practitioners', label: 'Practitioners', icon: '👨‍⚕️' },
    { id: 'patients', label: 'Patients', icon: '👥' },
    { id: 'sessions', label: 'Sessions', icon: '📅' },
    { id: 'analytics', label: 'Analytics', icon: '📈' },
    { id: 'notifications', label: 'Notifications', icon: '🔔' },
    { id: 'feedback', label: 'Feedback Reports', icon: '💬' },
    { id: 'broadcast', label: 'Broadcast', icon: '📢' },
    { id: 'audit', label: 'Audit Logs', icon: '📋' }
  ];

  const quickActions = [
    { label: 'Add Practitioner', icon: '👨‍⚕️', action: () => setActiveTab('practitioners') },
    { label: 'Send Broadcast', icon: '📢', action: () => setActiveTab('broadcast') },
    { label: 'Manage Sessions', icon: '📅', action: () => setActiveTab('sessions') },
    { label: 'View Analytics', icon: '📈', action: () => setActiveTab('analytics') }
  ];

  const MediaItem = ({ icon, title, value, subtitle, color = "blue" }) => (
    <div className="bg-emerald-50 rounded-xl p-6 shadow-sm border border-emerald-100 hover:shadow-md transition-all">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-emerald-700 mb-1">{title}</p>
          <p className="text-2xl font-bold text-emerald-900">{value}</p>
          {subtitle && (
            <p className={`text-sm font-medium mt-1 ${
              color === 'green' ? 'text-green-600' : 
              color === 'red' ? 'text-red-600' : 
              'text-emerald-600'
            }`}>
              {subtitle}
            </p>
          )}
        </div>
        <div className={`text-2xl ${
          color === 'green' ? 'text-green-500' : 
          color === 'red' ? 'text-red-500' : 
          'text-emerald-500'
        }`}>
          {icon}
        </div>
      </div>
    </div>
  );

  const SidebarItem = ({ icon, label, isActive = false, onClick }) => (
    <button
      onClick={onClick}
      className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-all ${
        isActive 
          ? 'bg-emerald-100 text-emerald-800 border-l-4 border-emerald-600' 
          : 'text-emerald-700 hover:bg-emerald-50'
      }`}
    >
      <span className="mr-3 text-lg">{icon}</span>
      <span className="font-medium">{label}</span>
    </button>
  );

  // Show Create Center Form if no center assigned
  if (showCreateCenter) {
    return <CreateCenterForm onCenterCreated={handleCenterCreated} />;
  }

  // Loading state
  if (loading) {
    return (
      <div className="flex min-h-screen bg-emerald-50">
        <div className="w-80 bg-white shadow-sm border-r border-emerald-200">
          {/* Sidebar skeleton */}
          <div className="p-6 border-b border-emerald-200">
            <div className="h-8 bg-emerald-200 rounded animate-pulse mb-2"></div>
            <div className="h-4 bg-emerald-200 rounded animate-pulse"></div>
          </div>
        </div>
        <div className="flex-1 p-8">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error && !dashboardData) {
    return (
      <div className="flex min-h-screen bg-emerald-50">
        <div className="w-80 bg-white shadow-sm border-r border-emerald-200">
          {/* Sidebar */}
          <div className="p-6 border-b border-emerald-200">
            <h1 className="text-2xl font-bold text-emerald-900">Ayurveda Wellness</h1>
            <p className="text-sm text-emerald-600 mt-1">Admin</p>
          </div>
        </div>
        <div className="flex-1 p-8">
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
            <div className="text-red-500 text-4xl mb-4">⚠️</div>
            <h2 className="text-xl font-semibold text-red-800 mb-2">Error Loading Dashboard</h2>
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={fetchUserData}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-emerald-50">
      {/* Sidebar - Administrator Section */}
      <div className="w-80 bg-white shadow-sm border-r border-emerald-200">
        <div className="p-6 border-b border-emerald-200">
          <h1 className="text-2xl font-bold text-emerald-900">Ayurveda Wellness</h1>
          <p className="text-sm text-emerald-600 mt-1">Admin</p>
        </div>
        
        {/* Admin Profile */}
        <div className="p-6 border-b border-emerald-200">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
              <span className="text-emerald-600 font-semibold text-lg">
                {dashboardData?.name?.charAt(0) || user?.name?.charAt(0) || 'A'}
              </span>
            </div>
            <div>
              <h2 className="font-semibold text-emerald-900">
                {dashboardData?.name || user?.name || 'Administrator'}
              </h2>
              <p className="text-sm text-emerald-600">Administrator</p>
              <p className="text-xs text-emerald-500">
                {dashboardData?.email || user?.email || 'admin@email.com'}
              </p>
              {centerId && (
                <p className="text-xs text-emerald-400 mt-1">
                  Center ID: {centerId}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="p-6">
          <h2 className="text-lg font-semibold text-emerald-900 mb-4">Dashboard</h2>
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
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-emerald-900">Admin Dashboard</h1>
          <p className="text-emerald-600 mt-2">
            Manage your wellness center efficiently with real-time insights and analytics.
          </p>
        </div>

        {/* Show dashboard overview OR component content based on activeTab */}
        {activeTab === 'dashboard' ? (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <MediaItem
                icon="👥"
                title="Total Patients"
                value={dashboardData?.overview?.totalPatients || 0}
                subtitle="Active patients in your center"
                color="blue"
              />
              <MediaItem
                icon="👨‍⚕️"
                title="Total Practitioners"
                value={dashboardData?.overview?.totalPractitioners || 0}
                subtitle="Active practitioners"
                color="blue"
              />
              <MediaItem
                icon="📅"
                title="Total Sessions"
                value={dashboardData?.overview?.totalSessions || 0}
                subtitle={`${dashboardData?.overview?.upcomingSessions || 0} upcoming`}
                color="blue"
              />
              <MediaItem
                icon="✅"
                title={`${dashboardData?.overview?.completionRate || 0}%`}
                value=""
                subtitle="Completion Rate"
                color="green"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Recent Feedbacks */}
              <div className="bg-white rounded-xl shadow-sm border border-emerald-100 p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-emerald-900">Recent Feedbacks</h2>
                  <span className="bg-emerald-100 text-emerald-800 text-sm px-3 py-1 rounded-full">
                    {dashboardData?.recentFeedbacks?.length || 0}
                  </span>
                </div>
                {dashboardData?.recentFeedbacks?.length > 0 ? (
                  <div className="space-y-4">
                    {dashboardData.recentFeedbacks.map((feedback, index) => (
                      <div key={index} className="border border-emerald-200 rounded-lg p-4 bg-emerald-50">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold text-emerald-800">{feedback.patientName}</h3>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <span
                                key={i}
                                className={`text-lg ${
                                  i < (feedback.rating || 0) 
                                    ? 'text-yellow-400' 
                                    : 'text-emerald-300'
                                }`}
                              >
                                ★
                              </span>
                            ))}
                          </div>
                        </div>
                        <p className="text-emerald-600 text-sm">{feedback.comment}</p>
                        <p className="text-emerald-500 text-xs mt-2">
                          {new Date(feedback.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="text-4xl mb-2 text-emerald-400">💬</div>
                    <p className="text-emerald-500">No recent feedbacks</p>
                  </div>
                )}
              </div>

              {/* Monthly Stats */}
              <div className="bg-white rounded-xl shadow-sm border border-emerald-100 p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-emerald-900">Monthly Sessions</h2>
                  <span className="text-sm text-emerald-500">
                    {new Date().toLocaleDateString('default', { month: 'long', year: 'numeric' })}
                  </span>
                </div>
                {dashboardData?.monthlyStats?.length > 0 ? (
                  <div className="space-y-3">
                    {dashboardData.monthlyStats.map((stat, index) => (
                      <div key={index} className="flex justify-between items-center p-3 border border-emerald-200 rounded-lg bg-emerald-50">
                        <div>
                          <p className="font-medium text-emerald-800">
                            {new Date(stat._id).toLocaleDateString('default', { weekday: 'short', month: 'short', day: 'numeric' })}
                          </p>
                          <p className="text-sm text-emerald-500">
                            {stat.completed || 0} completed of {stat.sessions || 0} total
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="w-24 bg-emerald-200 rounded-full h-2">
                            <div 
                              className="bg-green-600 h-2 rounded-full" 
                              style={{ 
                                width: `${stat.sessions > 0 ? ((stat.completed || 0) / stat.sessions) * 100 : 0}%` 
                              }}
                            ></div>
                          </div>
                          <p className="text-xs text-emerald-500 mt-1">
                            {stat.sessions > 0 ? Math.round(((stat.completed || 0) / stat.sessions) * 100) : 0}%
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="text-4xl mb-2 text-emerald-400">📊</div>
                    <p className="text-emerald-500">No session data for this month</p>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-emerald-100 p-6 mt-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-emerald-900">Quick Actions</h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    onClick={action.action}
                    className="bg-emerald-50 rounded-xl p-4 shadow-sm border border-emerald-100 hover:shadow-md transition-all text-center group hover:bg-emerald-100"
                  >
                    <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">
                      {action.icon}
                    </div>
                    <p className="text-sm font-medium text-emerald-700">{action.label}</p>
                  </button>
                ))}
              </div>
            </div>
          </>
        ) : (
          // Show component content for other tabs
          <div className="bg-white rounded-xl shadow-sm border border-emerald-100 p-6">
            {renderContent()}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;