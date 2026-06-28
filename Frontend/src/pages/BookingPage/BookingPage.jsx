// // import React, { useState } from 'react';
// // import { useForm } from 'react-hook-form';
// // import api from '../../utils/axios';

// // const BookSession = () => {
// //   const [loading, setLoading] = useState(false);
// //   const [recommendations, setRecommendations] = useState([]);
// //   const [selectedSlot, setSelectedSlot] = useState(null);
// //   const [bookingSuccess, setBookingSuccess] = useState(false);

// //   const { register, handleSubmit, formState: { errors } } = useForm({
// //     defaultValues: {
// //       therapyType: '',
// //       preferredDays: 3,
// //       durationMinutes: 60
// //     }
// //   });

// //   const therapyTypes = [
// //     { value: 'vamana', label: 'Vamana (Therapeutic Emesis)' },
// //     { value: 'virechana', label: 'Virechana (Purgation Therapy)' },
// //     { value: 'basti', label: 'Basti (Enema Therapy)' },
// //     { value: 'nasya', label: 'Nasya (Nasal Administration)' },
// //     { value: 'raktmosha', label: 'Raktamokshana (Bloodletting)' }
// //   ];

// //   const onSubmitRecommend = async (data) => {
// //     try {
// //       setLoading(true);
// //       setRecommendations([]);
// //       setSelectedSlot(null);
// //       setBookingSuccess(false);

// //       const payload = {
// //         therapyType: data.therapyType,
// //         preferredDays: parseInt(data.preferredDays),
// //         durationMinutes: parseInt(data.durationMinutes)
// //       };

// //       const response = await api.post('/sessions/recommend', payload);
// //       console.log("hello",response)
// //       if (response.data.success) {
// //         setRecommendations(response.data.data.top || []);
// //         // Reservation token is automatically set in cookies by the backend
// //       } else {
// //         alert('Failed to get recommendations. Please try again.');
// //       }
// //     } catch (error) {
// //       console.error('Error getting recommendations:', error);
// //       alert('Error getting recommendations. Please try again.');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleBookSession = async () => {
// //     if (!selectedSlot) return;

// //     try {
// //       setLoading(true);
      
// //       // Only send candidateIndex, reservationToken is automatically sent via cookies
// //       const response = await api.post('/sessions/confirm', {
// //         candidateIndex: selectedSlot.index
// //       });

// //       if (response.data.success) {
// //         setBookingSuccess(true);
// //         setRecommendations([]);
// //         setSelectedSlot(null);
// //       } else {
// //         alert('Failed to book session. Please try again.');
// //       }
// //     } catch (error) {
// //       console.error('Error booking session:', error);
// //       if (error.response?.status === 409) {
// //         alert('This slot is no longer available. Please select another slot.');
// //         setRecommendations([]);
// //         setSelectedSlot(null);
// //       } else if (error.response?.status === 410) {
// //         alert('Reservation expired. Please search for slots again.');
// //         setRecommendations([]);
// //         setSelectedSlot(null);
// //       } else {
// //         alert('Error booking session. Please try again.');
// //       }
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const formatDate = (dateString) => {
// //     const date = new Date(dateString);
// //     return date.toLocaleDateString('en-US', {
// //       weekday: 'long',
// //       year: 'numeric',
// //       month: 'long',
// //       day: 'numeric'
// //     });
// //   };

// //   const formatTime = (dateString) => {
// //     const date = new Date(dateString);
// //     return date.toLocaleTimeString('en-US', {
// //       hour: '2-digit',
// //       minute: '2-digit'
// //     });
// //   };

// //   const getScoreColor = (score) => {
// //     if (score >= 0.8) return 'text-green-600 bg-green-100';
// //     if (score >= 0.6) return 'text-yellow-600 bg-yellow-100';
// //     return 'text-red-600 bg-red-100';
// //   };

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 py-8">
// //       <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
// //         {/* Header */}
// //         <div className="text-center mb-8">
// //           <h1 className="text-3xl font-bold text-gray-800 mb-2">Book a Therapy Session</h1>
// //           <p className="text-lg text-gray-600">
// //             Find the perfect time for your Ayurvedic healing journey
// //           </p>
// //         </div>

// //         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
// //           {/* Left Side - Booking Form */}
// //           <div className="lg:col-span-1">
// //             <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
// //               <h2 className="text-xl font-bold text-gray-800 mb-6">Session Preferences</h2>
              
// //               <form onSubmit={handleSubmit(onSubmitRecommend)} className="space-y-6">
// //                 {/* Therapy Type */}
// //                 <div>
// //                   <label className="block text-sm font-medium text-gray-700 mb-2">
// //                     Therapy Type <span className="text-red-500">*</span>
// //                   </label>
// //                   <select
// //                     {...register("therapyType", { required: "Therapy type is required" })}
// //                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
// //                   >
// //                     <option value="">Select Therapy Type</option>
// //                     {therapyTypes.map((therapy) => (
// //                       <option key={therapy.value} value={therapy.value}>
// //                         {therapy.label}
// //                       </option>
// //                     ))}
// //                   </select>
// //                   {errors.therapyType && (
// //                     <p className="text-red-500 text-sm mt-1">{errors.therapyType.message}</p>
// //                   )}
// //                 </div>

// //                 {/* Duration */}
// //                 <div>
// //                   <label className="block text-sm font-medium text-gray-700 mb-2">
// //                     Duration (minutes) <span className="text-red-500">*</span>
// //                   </label>
// //                   <select
// //                     {...register("durationMinutes", { required: "Duration is required" })}
// //                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
// //                   >
// //                     <option value={45}>45 minutes</option>
// //                     <option value={60}>60 minutes</option>
// //                     <option value={90}>90 minutes</option>
// //                     <option value={120}>120 minutes</option>
// //                   </select>
// //                   {errors.durationMinutes && (
// //                     <p className="text-red-500 text-sm mt-1">{errors.durationMinutes.message}</p>
// //                   )}
// //                 </div>

// //                 {/* Preferred Days */}
// //                 <div>
// //                   <label className="block text-sm font-medium text-gray-700 mb-2">
// //                     Look for slots in next (days) <span className="text-red-500">*</span>
// //                   </label>
// //                   <select
// //                     {...register("preferredDays", { required: "Please select number of days" })}
// //                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
// //                   >
// //                     <option value={1}>1 day</option>
// //                     <option value={2}>2 days</option>
// //                     <option value={3}>3 days</option>
// //                     <option value={5}>5 days</option>
// //                     <option value={7}>7 days</option>
// //                   </select>
// //                   {errors.preferredDays && (
// //                     <p className="text-red-500 text-sm mt-1">{errors.preferredDays.message}</p>
// //                   )}
// //                 </div>

// //                 {/* Submit Button */}
// //                 <button
// //                   type="submit"
// //                   disabled={loading}
// //                   className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
// //                 >
// //                   {loading ? (
// //                     <>
// //                       <i className="fas fa-spinner fa-spin mr-2"></i>
// //                       Finding Slots...
// //                     </>
// //                   ) : (
// //                     <>
// //                       <i className="fas fa-search mr-2"></i>
// //                       Find Available Slots
// //                     </>
// //                   )}
// //                 </button>
// //               </form>

// //               {/* Success Message */}
// //               {bookingSuccess && (
// //                 <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
// //                   <div className="flex items-center space-x-3">
// //                     <i className="fas fa-check-circle text-green-600 text-xl"></i>
// //                     <div>
// //                       <h3 className="font-semibold text-green-800">Booking Confirmed!</h3>
// //                       <p className="text-sm text-green-600">
// //                         Your session has been successfully booked.
// //                       </p>
// //                     </div>
// //                   </div>
// //                 </div>
// //               )}

// //               {/* Reservation Info */}
// //               {recommendations.length > 0 && (
// //                 <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
// //                   <div className="flex items-center space-x-2">
// //                     <i className="fas fa-clock text-blue-600"></i>
// //                     <span className="text-sm text-blue-700">
// //                       Slots reserved for 10 minutes
// //                     </span>
// //                   </div>
// //                 </div>
// //               )}
// //             </div>
// //           </div>

// //           {/* Right Side - Recommendations */}
// //           <div className="lg:col-span-2">
// //             {recommendations.length > 0 ? (
// //               <div className="bg-white rounded-2xl shadow-lg p-6">
// //                 <div className="flex items-center justify-between mb-6">
// //                   <h2 className="text-xl font-bold text-gray-800">
// //                     Recommended Slots ({recommendations.length})
// //                   </h2>
// //                   <div className="flex items-center space-x-2 text-sm text-gray-600">
// //                     <span className="w-3 h-3 bg-green-500 rounded-full"></span>
// //                     <span>High Match</span>
// //                     <span className="w-3 h-3 bg-yellow-500 rounded-full ml-2"></span>
// //                     <span>Medium Match</span>
// //                     <span className="w-3 h-3 bg-red-500 rounded-full ml-2"></span>
// //                     <span>Low Match</span>
// //                   </div>
// //                 </div>

// //                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //                   {recommendations.map((slot, index) => (
// //                     <div
// //                       key={`${slot.practitionerId}-${slot.start}`}
// //                       className={`border-2 rounded-lg p-4 cursor-pointer transition-all hover:shadow-md ${
// //                         selectedSlot?.index === index
// //                           ? 'border-green-500 bg-green-50'
// //                           : 'border-gray-200 hover:border-green-300'
// //                       }`}
// //                       onClick={() => setSelectedSlot({ ...slot, index })}
// //                     >
// //                       <div className="flex justify-between items-start mb-3">
// //                         <div>
// //                           <h3 className="font-semibold text-gray-800">
// //                             {slot.practitionerName}
// //                           </h3>
// //                           <p className="text-sm text-gray-600 capitalize">
// //                             {slot.therapyType}
// //                           </p>
// //                         </div>
// //                         <span
// //                           className={`px-2 py-1 rounded-full text-xs font-medium ${getScoreColor(
// //                             slot.score
// //                           )}`}
// //                         >
// //                           {Math.round(slot.score * 100)}% Match
// //                         </span>
// //                       </div>

// //                       <div className="space-y-2">
// //                         <div className="flex items-center space-x-2 text-sm text-gray-600">
// //                           <i className="fas fa-calendar text-green-600"></i>
// //                           <span>{formatDate(slot.start)}</span>
// //                         </div>
// //                         <div className="flex items-center space-x-2 text-sm text-gray-600">
// //                           <i className="fas fa-clock text-green-600"></i>
// //                           <span>
// //                             {formatTime(slot.start)} - {formatTime(slot.end)}
// //                           </span>
// //                         </div>
// //                         <div className="flex items-center space-x-2 text-sm text-gray-600">
// //                           <i className="fas fa-stopwatch text-green-600"></i>
// //                           <span>{slot.durationMinutes} minutes</span>
// //                         </div>
// //                       </div>

// //                       {selectedSlot?.index === index && (
// //                         <div className="mt-3 pt-3 border-t border-green-200">
// //                           <button
// //                             onClick={handleBookSession}
// //                             disabled={loading}
// //                             className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
// //                           >
// //                             {loading ? (
// //                               <>
// //                                 <i className="fas fa-spinner fa-spin mr-2"></i>
// //                                 Booking...
// //                               </>
// //                             ) : (
// //                               <>
// //                                 <i className="fas fa-check mr-2"></i>
// //                                 Confirm Booking
// //                               </>
// //                             )}
// //                           </button>
// //                         </div>
// //                       )}
// //                     </div>
// //                   ))}
// //                 </div>

// //                 {selectedSlot && (
// //                   <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
// //                     <div className="flex items-center space-x-3">
// //                       <i className="fas fa-info-circle text-blue-600 text-xl"></i>
// //                       <div>
// //                         <h3 className="font-semibold text-blue-800">Selected Slot</h3>
// //                         <p className="text-sm text-blue-600">
// //                           {formatDate(selectedSlot.start)} at {formatTime(selectedSlot.start)} with {selectedSlot.practitionerName}
// //                         </p>
// //                       </div>
// //                     </div>
// //                   </div>
// //                 )}
// //               </div>
// //             ) : (
// //               <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
// //                 <div className="max-w-md mx-auto">
// //                   <i className="fas fa-calendar-plus text-4xl text-green-600 mb-4"></i>
// //                   <h3 className="text-xl font-semibold text-gray-800 mb-2">
// //                     Find Your Perfect Session Time
// //                   </h3>
// //                   <p className="text-gray-600 mb-6">
// //                     Fill out the form to discover available time slots that match your preferences.
// //                     Our AI will recommend the best options based on practitioner availability and your needs.
// //                   </p>
// //                   <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-500">
// //                     <div className="flex flex-col items-center">
// //                       <i className="fas fa-user-md text-green-600 text-xl mb-2"></i>
// //                       <span>Expert Practitioners</span>
// //                     </div>
// //                     <div className="flex flex-col items-center">
// //                       <i className="fas fa-brain text-green-600 text-xl mb-2"></i>
// //                       <span>AI-Powered Matching</span>
// //                     </div>
// //                     <div className="flex flex-col items-center">
// //                       <i className="fas fa-clock text-green-600 text-xl mb-2"></i>
// //                       <span>Flexible Scheduling</span>
// //                     </div>
// //                   </div>
// //                 </div>
// //               </div>
// //             )}

// //             {/* Loading State */}
// //             {loading && recommendations.length === 0 && (
// //               <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
// //                 <div className="flex flex-col items-center justify-center space-y-4">
// //                   <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
// //                   <p className="text-gray-600">Finding the best available slots for you...</p>
// //                   <p className="text-sm text-gray-500">
// //                     Analyzing practitioner schedules and your preferences
// //                   </p>
// //                 </div>
// //               </div>
// //             )}
// //           </div>
// //         </div>

// //         {/* Information Section */}
// //         <div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
// //           <h2 className="text-xl font-bold text-gray-800 mb-4">About Our Booking System</h2>
// //           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //             <div>
// //               <h3 className="font-semibold text-gray-800 mb-2 flex items-center">
// //                 <i className="fas fa-robot text-green-600 mr-2"></i>
// //                 AI-Powered Matching
// //               </h3>
// //               <p className="text-gray-600 text-sm">
// //                 Our intelligent system analyzes practitioner expertise, availability, and your therapy 
// //                 requirements to recommend the most suitable time slots for your healing journey.
// //               </p>
// //             </div>
// //             <div>
// //               <h3 className="font-semibold text-gray-800 mb-2 flex items-center">
// //                 <i className="fas fa-shield-alt text-green-600 mr-2"></i>
// //                 Secure Reservation
// //               </h3>
// //               <p className="text-gray-600 text-sm">
// //                 Selected slots are temporarily reserved while you complete your booking to ensure 
// //                 your preferred time remains available.
// //               </p>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default BookSession;


// import React, { useState, useEffect } from 'react';
// import { useForm } from 'react-hook-form';
// import { useNavigate } from 'react-router-dom';
// import api from '../../utils/axios';

// const BookSession = () => {
//   const [loading, setLoading] = useState(false);
//   const [authLoading, setAuthLoading] = useState(true);
//   const [recommendations, setRecommendations] = useState([]);
//   const [selectedSlot, setSelectedSlot] = useState(null);
//   const [bookingSuccess, setBookingSuccess] = useState(false);
//   const [user, setUser] = useState(null);
//   const navigate = useNavigate();

//   const { register, handleSubmit, formState: { errors } } = useForm({
//     defaultValues: {
//       therapyType: '',
//       preferredDays: 3,
//       durationMinutes: 60
//     }
//   });

//   const therapyTypes = [
//     { value: 'Vamana', label: 'Vamana (Therapeutic Emesis)' },
//     { value: 'Virechana', label: 'Virechana (Purgation Therapy)' },
//     { value: 'Basti', label: 'Basti (Enema Therapy)' },
//     { value: 'Nasya', label: 'Nasya (Nasal Administration)' },
//     { value: 'Raktmosha', label: 'Raktamokshana (Bloodletting)' }
//   ];

//   // Check authentication and role
//   useEffect(() => {
//     const checkAuth = async () => {
//       try {
//         setAuthLoading(true);
//         const response = await api.get('/auth/me');
        
//         if (response.data.success) {
//           const userData = response.data.data;
//           setUser(userData);
          
//           // Check if user is a patient
//           if (userData.role !== 'patient') {
//             // Not a patient, show access denied
//             return;
//           }
//         } else {
//           // Not authenticated, redirect to login
//           navigate('/auth');
//         }
//       } catch (error) {
//         console.error('Auth check failed:', error);
//         navigate('/auth');
//       } finally {
//         setAuthLoading(false);
//       }
//     };

//     checkAuth();
//   }, [navigate]);

//   const onSubmitRecommend = async (data) => {
//     try {
//       setLoading(true);
//       setRecommendations([]);
//       setSelectedSlot(null);
//       setBookingSuccess(false);

//       const payload = {
//         therapyType: data.therapyType,
//         preferredDays: parseInt(data.preferredDays),
//         durationMinutes: parseInt(data.durationMinutes)
//       };

//       const response = await api.post('/sessions/recommend', payload);
      
//       if (response.data.success) {
//         setRecommendations(response.data.data.top || []);
//       } else {
//         alert('Failed to get recommendations. Please try again.');
//       }
//     } catch (error) {
//       console.error('Error getting recommendations:', error);
//       alert('Error getting recommendations. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleBookSession = async () => {
//     if (!selectedSlot) return;

//     try {
//       setLoading(true);
      
//       const response = await api.post('/sessions/confirm', {
//         candidateIndex: selectedSlot.index
//       });

//       if (response.data.success) {
//         setBookingSuccess(true);
//         setRecommendations([]);
//         setSelectedSlot(null);
//       } else {
//         alert('Failed to book session. Please try again.');
//       }
//     } catch (error) {
//       console.error('Error booking session:', error);
//       if (error.response?.status === 409) {
//         alert('This slot is no longer available. Please select another slot.');
//         setRecommendations([]);
//         setSelectedSlot(null);
//       } else if (error.response?.status === 410) {
//         alert('Reservation expired. Please search for slots again.');
//         setRecommendations([]);
//         setSelectedSlot(null);
//       } else {
//         alert('Error booking session. Please try again.');
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-US', {
//       weekday: 'long',
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric'
//     });
//   };

//   const formatTime = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleTimeString('en-US', {
//       hour: '2-digit',
//       minute: '2-digit'
//     });
//   };

//   const getScoreColor = (score) => {
//     if (score >= 0.8) return 'text-green-600 bg-green-100';
//     if (score >= 0.6) return 'text-yellow-600 bg-yellow-100';
//     return 'text-red-600 bg-red-100';
//   };

//   // Loading state while checking authentication
//   if (authLoading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
//           <p className="text-gray-600">Checking authentication...</p>
//         </div>
//       </div>
//     );
//   }

//   // Access denied for non-patient users
//   if (user && user.role !== 'patient') {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center">
//         <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md text-center">
//           <i className="fas fa-exclamation-triangle text-4xl text-red-600 mb-4"></i>
//           <h2 className="text-2xl font-bold text-gray-800 mb-4">Access Denied</h2>
//           <p className="text-gray-600 mb-6">
//             You are not allowed to access this page. This page is only available for patients.
//           </p>
//           <button
//             onClick={() => navigate('/')}
//             className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
//           >
//             Go to Homepage
//           </button>
//         </div>
//       </div>
//     );
//   }

//   // Main content for authenticated patients
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 py-8">
//       <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Header */}
//         <div className="text-center mb-8">
//           <h1 className="text-3xl font-bold text-gray-800 mb-2">Book a Therapy Session</h1>
//           <p className="text-lg text-gray-600">
//             Find the perfect time for your Ayurvedic healing journey
//           </p>
//           {user && (
//             <div className="mt-4 inline-flex items-center space-x-2 bg-green-100 text-green-800 px-4 py-2 rounded-full">
//               <i className="fas fa-user-circle"></i>
//               <span className="text-sm font-medium">Welcome, {user.name}</span>
//             </div>
//           )}
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Left Side - Booking Form */}
//           <div className="lg:col-span-1">
//             <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
//               <h2 className="text-xl font-bold text-gray-800 mb-6">Session Preferences</h2>
              
//               <form onSubmit={handleSubmit(onSubmitRecommend)} className="space-y-6">
//                 {/* Therapy Type */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Therapy Type <span className="text-red-500">*</span>
//                   </label>
//                   <select
//                     {...register("therapyType", { required: "Therapy type is required" })}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
//                   >
//                     <option value="">Select Therapy Type</option>
//                     {therapyTypes.map((therapy) => (
//                       <option key={therapy.value} value={therapy.value}>
//                         {therapy.label}
//                       </option>
//                     ))}
//                   </select>
//                   {errors.therapyType && (
//                     <p className="text-red-500 text-sm mt-1">{errors.therapyType.message}</p>
//                   )}
//                 </div>

//                 {/* Duration */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Duration (minutes) <span className="text-red-500">*</span>
//                   </label>
//                   <select
//                     {...register("durationMinutes", { required: "Duration is required" })}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
//                   >
//                     <option value={45}>45 minutes</option>
//                     <option value={60}>60 minutes</option>
//                     <option value={90}>90 minutes</option>
//                     <option value={120}>120 minutes</option>
//                   </select>
//                   {errors.durationMinutes && (
//                     <p className="text-red-500 text-sm mt-1">{errors.durationMinutes.message}</p>
//                   )}
//                 </div>

//                 {/* Preferred Days */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Look for slots in next (days) <span className="text-red-500">*</span>
//                   </label>
//                   <select
//                     {...register("preferredDays", { required: "Please select number of days" })}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
//                   >
//                     <option value={1}>1 day</option>
//                     <option value={2}>2 days</option>
//                     <option value={3}>3 days</option>
//                     <option value={5}>5 days</option>
//                     <option value={7}>7 days</option>
//                   </select>
//                   {errors.preferredDays && (
//                     <p className="text-red-500 text-sm mt-1">{errors.preferredDays.message}</p>
//                   )}
//                 </div>

//                 {/* Submit Button */}
//                 <button
//                   type="submit"
//                   disabled={loading}
//                   className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
//                 >
//                   {loading ? (
//                     <>
//                       <i className="fas fa-spinner fa-spin mr-2"></i>
//                       Finding Slots...
//                     </>
//                   ) : (
//                     <>
//                       <i className="fas fa-search mr-2"></i>
//                       Find Available Slots
//                     </>
//                   )}
//                 </button>
//               </form>

//               {/* Success Message */}
//               {bookingSuccess && (
//                 <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
//                   <div className="flex items-center space-x-3">
//                     <i className="fas fa-check-circle text-green-600 text-xl"></i>
//                     <div>
//                       <h3 className="font-semibold text-green-800">Booking Confirmed!</h3>
//                       <p className="text-sm text-green-600">
//                         Your session has been successfully booked.
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {/* Reservation Info */}
//               {recommendations.length > 0 && (
//                 <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
//                   <div className="flex items-center space-x-2">
//                     <i className="fas fa-clock text-blue-600"></i>
//                     <span className="text-sm text-blue-700">
//                       Slots reserved for 10 minutes
//                     </span>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Right Side - Recommendations */}
//           <div className="lg:col-span-2">
//             {recommendations.length > 0 ? (
//               <div className="bg-white rounded-2xl shadow-lg p-6">
//                 <div className="flex items-center justify-between mb-6">
//                   <h2 className="text-xl font-bold text-gray-800">
//                     Recommended Slots ({recommendations.length})
//                   </h2>
//                   <div className="flex items-center space-x-2 text-sm text-gray-600">
//                     <span className="w-3 h-3 bg-green-500 rounded-full"></span>
//                     <span>High Match</span>
//                     <span className="w-3 h-3 bg-yellow-500 rounded-full ml-2"></span>
//                     <span>Medium Match</span>
//                     <span className="w-3 h-3 bg-red-500 rounded-full ml-2"></span>
//                     <span>Low Match</span>
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   {recommendations.map((slot, index) => (
//                     <div
//                       key={`${slot.practitionerId}-${slot.start}`}
//                       className={`border-2 rounded-lg p-4 cursor-pointer transition-all hover:shadow-md ${
//                         selectedSlot?.index === index
//                           ? 'border-green-500 bg-green-50'
//                           : 'border-gray-200 hover:border-green-300'
//                       }`}
//                       onClick={() => setSelectedSlot({ ...slot, index })}
//                     >
//                       <div className="flex justify-between items-start mb-3">
//                         <div>
//                           <h3 className="font-semibold text-gray-800">
//                             {slot.practitionerName}
//                           </h3>
//                           <p className="text-sm text-gray-600 capitalize">
//                             {slot.therapyType}
//                           </p>
//                         </div>
//                         <span
//                           className={`px-2 py-1 rounded-full text-xs font-medium ${getScoreColor(
//                             slot.score
//                           )}`}
//                         >
//                           {Math.round(slot.score * 100)}% Match
//                         </span>
//                       </div>

//                       <div className="space-y-2">
//                         <div className="flex items-center space-x-2 text-sm text-gray-600">
//                           <i className="fas fa-calendar text-green-600"></i>
//                           <span>{formatDate(slot.start)}</span>
//                         </div>
//                         <div className="flex items-center space-x-2 text-sm text-gray-600">
//                           <i className="fas fa-clock text-green-600"></i>
//                           <span>
//                             {formatTime(slot.start)} - {formatTime(slot.end)}
//                           </span>
//                         </div>
//                         <div className="flex items-center space-x-2 text-sm text-gray-600">
//                           <i className="fas fa-stopwatch text-green-600"></i>
//                           <span>{slot.durationMinutes} minutes</span>
//                         </div>
//                       </div>

//                       {selectedSlot?.index === index && (
//                         <div className="mt-3 pt-3 border-t border-green-200">
//                           <button
//                             onClick={handleBookSession}
//                             disabled={loading}
//                             className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
//                           >
//                             {loading ? (
//                               <>
//                                 <i className="fas fa-spinner fa-spin mr-2"></i>
//                                 Booking...
//                               </>
//                             ) : (
//                               <>
//                                 <i className="fas fa-check mr-2"></i>
//                                 Confirm Booking
//                               </>
//                             )}
//                           </button>
//                         </div>
//                       )}
//                     </div>
//                   ))}
//                 </div>

//                 {selectedSlot && (
//                   <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
//                     <div className="flex items-center space-x-3">
//                       <i className="fas fa-info-circle text-blue-600 text-xl"></i>
//                       <div>
//                         <h3 className="font-semibold text-blue-800">Selected Slot</h3>
//                         <p className="text-sm text-blue-600">
//                           {formatDate(selectedSlot.start)} at {formatTime(selectedSlot.start)} with {selectedSlot.practitionerName}
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             ) : (
//               <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
//                 <div className="max-w-md mx-auto">
//                   <i className="fas fa-calendar-plus text-4xl text-green-600 mb-4"></i>
//                   <h3 className="text-xl font-semibold text-gray-800 mb-2">
//                     Find Your Perfect Session Time
//                   </h3>
//                   <p className="text-gray-600 mb-6">
//                     Fill out the form to discover available time slots that match your preferences.
//                     Our AI will recommend the best options based on practitioner availability and your needs.
//                   </p>
//                   <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-500">
//                     <div className="flex flex-col items-center">
//                       <i className="fas fa-user-md text-green-600 text-xl mb-2"></i>
//                       <span>Expert Practitioners</span>
//                     </div>
//                     <div className="flex flex-col items-center">
//                       <i className="fas fa-brain text-green-600 text-xl mb-2"></i>
//                       <span>AI-Powered Matching</span>
//                     </div>
//                     <div className="flex flex-col items-center">
//                       <i className="fas fa-clock text-green-600 text-xl mb-2"></i>
//                       <span>Flexible Scheduling</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Loading State */}
//             {loading && recommendations.length === 0 && (
//               <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
//                 <div className="flex flex-col items-center justify-center space-y-4">
//                   <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
//                   <p className="text-gray-600">Finding the best available slots for you...</p>
//                   <p className="text-sm text-gray-500">
//                     Analyzing practitioner schedules and your preferences
//                   </p>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Information Section */}
//         <div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
//           <h2 className="text-xl font-bold text-gray-800 mb-4">About Our Booking System</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div>
//               <h3 className="font-semibold text-gray-800 mb-2 flex items-center">
//                 <i className="fas fa-robot text-green-600 mr-2"></i>
//                 AI-Powered Matching
//               </h3>
//               <p className="text-gray-600 text-sm">
//                 Our intelligent system analyzes practitioner expertise, availability, and your therapy 
//                 requirements to recommend the most suitable time slots for your healing journey.
//               </p>
//             </div>
//             <div>
//               <h3 className="font-semibold text-gray-800 mb-2 flex items-center">
//                 <i className="fas fa-shield-alt text-green-600 mr-2"></i>
//                 Secure Reservation
//               </h3>
//               <p className="text-gray-600 text-sm">
//                 Selected slots are temporarily reserved while you complete your booking to ensure 
//                 your preferred time remains available.
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BookSession;


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import api from "../../utils/axios"; // your Axios instance

const BookSession = () => {
  const navigate = useNavigate();
  const [authLoading, setAuthLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const { register, handleSubmit, reset } = useForm();

  // ✅ Check auth with local fallback
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
          if (parsedUser.role !== "patient") {
            toast.error("Only patients can book sessions");
            navigate("/dashboard");
            return;
          }
          setAuthLoading(false);
          return;
        }

        const response = await api.get("/auth/me");
        const fetchedUser = response.data.user;
        setUser(fetchedUser);

        if (fetchedUser.role !== "patient") {
          toast.error("Only patients can book sessions");
          navigate("/dashboard");
          return;
        }

        localStorage.setItem("user", JSON.stringify(fetchedUser));
        setAuthLoading(false);
      } catch (error) {
        console.error("Auth check failed:", error);
        if (error.response?.status === 401) {
          navigate("/auth");
        } else {
          toast.error("Authentication failed. Please login again.");
          navigate("/auth");
        }
      }
    };

    checkAuth();
  }, [navigate]);

  // ✅ Handle booking form submit
  const onSubmit = async (data) => {
    try {
      const res = await api.post("/sessions/recommend", data);
      setRecommendations(res.data.recommendations || []);
      if (!res.data.recommendations?.length) {
        toast("No slots available right now. Try again later.", { icon: "ℹ️" });
      }
      reset();
    } catch (err) {
      console.error("Recommendation error:", err);
      toast.error("Failed to fetch recommendations. Try again later.");
    }
  };

  // ✅ Confirm selected slot
  const confirmBooking = async (slot, index) => {
    try {
      await api.post("/sessions/confirm", {
        candidateIndex: index,
      });
      setBookingSuccess(true);
      toast.success("Session booked successfully!");
      setRecommendations((prev) => prev.filter((_, i) => i !== index));
      setSelectedSlot(null);

      // optional: redirect after 2s
      setTimeout(() => navigate("/patient/sessions"), 2000);
    } catch (err) {
      console.error("Booking error:", err);
      toast.error(err.response?.data?.message || "Booking failed.");
    }
  };

  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-950 text-gray-200">
        <div className="text-xl font-medium">Checking authentication...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center py-10 px-4">
      <Toaster position="top-right" reverseOrder={false} />

      <h1 className="text-3xl font-bold mb-8 text-purple-400">
        Book Your Therapy Session
      </h1>

      {/* ✅ Booking form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-gray-900 p-6 rounded-2xl shadow-lg w-full max-w-md space-y-5"
      >
        <div>
          <label className="block mb-2 text-sm font-medium">Therapy Type</label>
          <input
            type="text"
            {...register("therapyType", { required: true })}
            className="w-full p-2 rounded bg-gray-800 text-gray-100 focus:ring-2 focus:ring-purple-500"
            placeholder="Enter therapy type (e.g., Panchkarma)"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium">Preferred Date</label>
          <input
            type="date"
            {...register("date", { required: true })}
            className="w-full p-2 rounded bg-gray-800 text-gray-100 focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-purple-600 hover:bg-purple-700 transition rounded-lg font-semibold"
        >
          Get Recommendations
        </button>
      </form>

      {/* ✅ Recommendations section */}
      {recommendations.length > 0 && (
        <div className="mt-10 w-full max-w-3xl">
          <h2 className="text-2xl mb-4 text-purple-300">Available Slots</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {recommendations.map((slot, index) => (
              <div
                key={`${slot.practitionerId}-${slot.start}-${index}`}
                className={`p-5 rounded-xl bg-gray-900 border ${
                  selectedSlot === index
                    ? "border-purple-500"
                    : "border-gray-700"
                } hover:border-purple-400 transition`}
              >
                <p>
                  <span className="font-semibold text-purple-300">
                    Practitioner:
                  </span>{" "}
                  {slot.practitionerName}
                </p>
                <p>
                  <span className="font-semibold text-purple-300">Center:</span>{" "}
                  {slot.centerName}
                </p>
                <p>
                  <span className="font-semibold text-purple-300">Start:</span>{" "}
                  {new Date(slot.start).toLocaleString()}
                </p>

                <button
                  onClick={() => confirmBooking(slot, index)}
                  className="mt-4 w-full py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition"
                >
                  Confirm Slot
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ✅ Booking success message */}
      {bookingSuccess && (
        <div className="mt-8 text-green-400 text-center animate-pulse">
          🎉 Session booked successfully! Redirecting...
        </div>
      )}
    </div>
  );
};

export default BookSession;
