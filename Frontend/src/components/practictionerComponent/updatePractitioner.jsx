

// // import React, { useState, useEffect } from 'react';
// // import api from '../../utils/axios';

// // const UpdateProfileCard = () => {
// //   const [profile, setProfile] = useState(null);
// //   const [loading, setLoading] = useState(true);
  
// //   const [profileForm, setProfileForm] = useState({
// //     name: '',
// //     phone: '',
// //     bio: '',
// //     languages: ''
// //   });
  
// //   const [specializations, setSpecializations] = useState([]);
// //   const [newSpecialization, setNewSpecialization] = useState({
// //     therapyType: '',
// //     yearsOfExperience: '',
// //     certification: '',
// //     hourlyRate: ''
// //   });
// //   const [editingSpecialization, setEditingSpecialization] = useState(null);
  
// //   const [workingHours, setWorkingHours] = useState([]);
// //   const [newWorkingHour, setNewWorkingHour] = useState({
// //     dayOfWeek: '',
// //     startTime: '',
// //     endTime: '',
// //     isActive: true
// //   });
// //   const [editingWorkingHour, setEditingWorkingHour] = useState(null);
  
// //   const [durationEstimates, setDurationEstimates] = useState({});
// //   const [newDurationEstimate, setNewDurationEstimate] = useState({
// //     therapyType: '',
// //     duration: ''
// //   });

// //   const [updating, setUpdating] = useState(false);

// //   const daysOfWeek = [
// //     { value: 0, label: 'Sunday' },
// //     { value: 1, label: 'Monday' },
// //     { value: 2, label: 'Tuesday' },
// //     { value: 3, label: 'Wednesday' },
// //     { value: 4, label: 'Thursday' },
// //     { value: 5, label: 'Friday' },
// //     { value: 6, label: 'Saturday' }
// //   ];

// //   useEffect(() => {
// //     fetchAllData();
// //   }, []);

// //   const fetchAllData = async () => {
// //     try {
// //       setLoading(true);
// //       await Promise.all([
// //         fetchProfile(),
// //         fetchSpecializations(),
// //         fetchWorkingHours(),
// //         fetchDurationEstimates()
// //       ]);
// //     } catch (error) {
// //       console.error('Error fetching data:', error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const fetchProfile = async () => {
// //     try {
// //       const response = await api.get('/practitioner/profile');
// //       const data = response.data.data;
// //       setProfile(data);
// //       setProfileForm({
// //         name: data.name || '',
// //         phone: data.phone || '',
// //         bio: data.bio || '',
// //         languages: Array.isArray(data.languages) ? data.languages.join(', ') : ''
// //       });
// //     } catch (error) {
// //       console.error('Error fetching profile:', error);
// //     }
// //   };

// //   const fetchSpecializations = async () => {
// //     try {
// //       const response = await api.get('/practitioner/specializations');
// //       setSpecializations(response.data.data || []);
// //     } catch (error) {
// //       console.error('Error fetching specializations:', error);
// //     }
// //   };

// //   const fetchWorkingHours = async () => {
// //     try {
// //       const response = await api.get('/practitioner/working-hours');
// //       setWorkingHours(response.data.data || []);
// //     } catch (error) {
// //       console.error('Error fetching working hours:', error);
// //     }
// //   };

// //   const fetchDurationEstimates = async () => {
// //     try {
// //       const response = await api.get('/practitioner/duration-estimates');
// //       setDurationEstimates(response.data.data.durationEstimates || {});
// //     } catch (error) {
// //       console.error('Error fetching duration estimates:', error);
// //     }
// //   };

// //   // Profile Update Functions
// //   const handleProfileUpdate = async (e) => {
// //     e.preventDefault();
// //     setUpdating(true);
// //     try {
// //       const updateData = {
// //         ...profileForm,
// //         languages: profileForm.languages.split(',').map(lang => lang.trim()).filter(lang => lang)
// //       };
      
// //       const response = await api.put('/practitioner/profile', updateData);
// //       setProfile(response.data.data);
// //       alert('Profile updated successfully!');
// //     } catch (error) {
// //       console.error('Error updating profile:', error);
// //       alert('Error updating profile');
// //     } finally {
// //       setUpdating(false);
// //     }
// //   };

// //   // Specialization Functions
// //   const handleAddSpecialization = async () => {
// //     if (!newSpecialization.therapyType || !newSpecialization.yearsOfExperience) {
// //       alert('Please fill in all required fields');
// //       return;
// //     }

// //     const newSpec = {
// //       therapyType: newSpecialization.therapyType,
// //       yearsOfExperience: parseInt(newSpecialization.yearsOfExperience),
// //       certification: newSpecialization.certification,
// //       hourlyRate: parseInt(newSpecialization.hourlyRate) || 0
// //     };

// //     const updatedSpecializations = [...specializations, newSpec];
    
// //     try {
// //       const response = await api.put('/practitioner/specializations', {
// //         specialization: updatedSpecializations
// //       });
// //       setSpecializations(response.data.data);
// //       setNewSpecialization({
// //         therapyType: '',
// //         yearsOfExperience: '',
// //         certification: '',
// //         hourlyRate: ''
// //       });
// //       alert('Specialization added successfully!');
// //     } catch (error) {
// //       console.error('Error adding specialization:', error);
// //       alert('Error adding specialization');
// //     }
// //   };

// //   const handleEditSpecialization = (index) => {
// //     const spec = specializations[index];
// //     setEditingSpecialization({ index, ...spec });
// //     setNewSpecialization({
// //       therapyType: spec.therapyType,
// //       yearsOfExperience: spec.yearsOfExperience.toString(),
// //       certification: spec.certification,
// //       hourlyRate: spec.hourlyRate.toString()
// //     });
// //   };

// //   const handleUpdateSpecialization = async () => {
// //     if (!newSpecialization.therapyType || !newSpecialization.yearsOfExperience) {
// //       alert('Please fill in all required fields');
// //       return;
// //     }

// //     const updatedSpec = {
// //       therapyType: newSpecialization.therapyType,
// //       yearsOfExperience: parseInt(newSpecialization.yearsOfExperience),
// //       certification: newSpecialization.certification,
// //       hourlyRate: parseInt(newSpecialization.hourlyRate) || 0
// //     };

// //     const updatedSpecializations = [...specializations];
// //     updatedSpecializations[editingSpecialization.index] = updatedSpec;
    
// //     try {
// //       const response = await api.put('/practitioner/specializations', {
// //         specialization: updatedSpecializations
// //       });
// //       setSpecializations(response.data.data);
// //       setEditingSpecialization(null);
// //       setNewSpecialization({
// //         therapyType: '',
// //         yearsOfExperience: '',
// //         certification: '',
// //         hourlyRate: ''
// //       });
// //       alert('Specialization updated successfully!');
// //     } catch (error) {
// //       console.error('Error updating specialization:', error);
// //       alert('Error updating specialization');
// //     }
// //   };

// //   const handleDeleteSpecialization = async (index) => {
// //     const updatedSpecializations = specializations.filter((_, i) => i !== index);
    
// //     try {
// //       const response = await api.put('/practitioner/specializations', {
// //         specialization: updatedSpecializations
// //       });
// //       setSpecializations(response.data.data);
// //       alert('Specialization deleted successfully!');
// //     } catch (error) {
// //       console.error('Error deleting specialization:', error);
// //       alert('Error deleting specialization');
// //     }
// //   };

// //   const cancelEditSpecialization = () => {
// //     setEditingSpecialization(null);
// //     setNewSpecialization({
// //       therapyType: '',
// //       yearsOfExperience: '',
// //       certification: '',
// //       hourlyRate: ''
// //     });
// //   };

// //   // Working Hours Functions
// //   const handleAddWorkingHour = async () => {
// //     if (!newWorkingHour.dayOfWeek || !newWorkingHour.startTime || !newWorkingHour.endTime) {
// //       alert('Please fill in all required fields');
// //       return;
// //     }

// //     const newWorkingHourData = {
// //       dayOfWeek: parseInt(newWorkingHour.dayOfWeek),
// //       startTime: newWorkingHour.startTime,
// //       endTime: newWorkingHour.endTime,
// //       isActive: newWorkingHour.isActive
// //     };

// //     const updatedWorkingHours = [...workingHours, newWorkingHourData];
    
// //     try {
// //       const response = await api.put('/practitioner/working-hours', {
// //         workingHours: updatedWorkingHours
// //       });
// //       setWorkingHours(response.data.data);
// //       setNewWorkingHour({
// //         dayOfWeek: '',
// //         startTime: '',
// //         endTime: '',
// //         isActive: true
// //       });
// //       alert('Working hour added successfully!');
// //     } catch (error) {
// //       console.error('Error adding working hour:', error);
// //       alert('Error adding working hour');
// //     }
// //   };

// //   const handleEditWorkingHour = (index) => {
// //     const wh = workingHours[index];
// //     setEditingWorkingHour({ index, ...wh });
// //     setNewWorkingHour({
// //       dayOfWeek: wh.dayOfWeek.toString(),
// //       startTime: wh.startTime,
// //       endTime: wh.endTime,
// //       isActive: wh.isActive
// //     });
// //   };

// //   const handleUpdateWorkingHour = async () => {
// //     if (!newWorkingHour.dayOfWeek || !newWorkingHour.startTime || !newWorkingHour.endTime) {
// //       alert('Please fill in all required fields');
// //       return;
// //     }

// //     const updatedWorkingHourData = {
// //       dayOfWeek: parseInt(newWorkingHour.dayOfWeek),
// //       startTime: newWorkingHour.startTime,
// //       endTime: newWorkingHour.endTime,
// //       isActive: newWorkingHour.isActive
// //     };

// //     const updatedWorkingHours = [...workingHours];
// //     updatedWorkingHours[editingWorkingHour.index] = updatedWorkingHourData;
    
// //     try {
// //       const response = await api.put('/practitioner/working-hours', {
// //         workingHours: updatedWorkingHours
// //       });
// //       setWorkingHours(response.data.data);
// //       setEditingWorkingHour(null);
// //       setNewWorkingHour({
// //         dayOfWeek: '',
// //         startTime: '',
// //         endTime: '',
// //         isActive: true
// //       });
// //       alert('Working hour updated successfully!');
// //     } catch (error) {
// //       console.error('Error updating working hour:', error);
// //       alert('Error updating working hour');
// //     }
// //   };

// //   const handleDeleteWorkingHour = async (index) => {
// //     const updatedWorkingHours = workingHours.filter((_, i) => i !== index);
    
// //     try {
// //       const response = await api.put('/practitioner/working-hours', {
// //         workingHours: updatedWorkingHours
// //       });
// //       setWorkingHours(response.data.data);
// //       alert('Working hour deleted successfully!');
// //     } catch (error) {
// //       console.error('Error deleting working hour:', error);
// //       alert('Error deleting working hour');
// //     }
// //   };

// //   const cancelEditWorkingHour = () => {
// //     setEditingWorkingHour(null);
// //     setNewWorkingHour({
// //       dayOfWeek: '',
// //       startTime: '',
// //       endTime: '',
// //       isActive: true
// //     });
// //   };

// //   // Duration Estimates Functions
// //   const handleAddDurationEstimate = async () => {
// //     if (!newDurationEstimate.therapyType || !newDurationEstimate.duration) {
// //       alert('Please fill in all required fields');
// //       return;
// //     }

// //     const updatedEstimates = {
// //       ...durationEstimates,
// //       [newDurationEstimate.therapyType]: parseInt(newDurationEstimate.duration)
// //     };
    
// //     try {
// //       const response = await api.put('/practitioner/duration-estimates', {
// //         durationEstimates: updatedEstimates
// //       });
// //       setDurationEstimates(response.data.data);
// //       setNewDurationEstimate({
// //         therapyType: '',
// //         duration: ''
// //       });
// //       alert('Duration estimate added successfully!');
// //     } catch (error) {
// //       console.error('Error adding duration estimate:', error);
// //       alert('Error adding duration estimate');
// //     }
// //   };

// //   const handleDeleteDurationEstimate = async (therapyType) => {
// //     const updatedEstimates = { ...durationEstimates };
// //     delete updatedEstimates[therapyType];
    
// //     try {
// //       const response = await api.put('/practitioner/duration-estimates', {
// //         durationEstimates: updatedEstimates
// //       });
// //       setDurationEstimates(response.data.data);
// //       alert('Duration estimate deleted successfully!');
// //     } catch (error) {
// //       console.error('Error deleting duration estimate:', error);
// //       alert('Error deleting duration estimate');
// //     }
// //   };

// //   if (loading) {
// //     return (
// //       <div className="flex justify-center items-center py-12">
// //         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
// //         <span className="ml-3 text-gray-600">Loading...</span>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="space-y-6">
// //       {/* Profile Information Box */}
// //       <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
// //         <h2 className="text-xl font-semibold text-gray-900 mb-4">Profile Information</h2>
// //         <form onSubmit={handleProfileUpdate} className="space-y-4">
// //           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //             <div>
// //               <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
// //               <input
// //                 type="text"
// //                 value={profileForm.name}
// //                 onChange={(e) => setProfileForm({...profileForm, name: e.target.value})}
// //                 className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
// //               />
// //             </div>
// //             <div>
// //               <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
// //               <input
// //                 type="text"
// //                 value={profileForm.phone}
// //                 onChange={(e) => setProfileForm({...profileForm, phone: e.target.value})}
// //                 className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
// //               />
// //             </div>
// //             <div className="md:col-span-2">
// //               <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
// //               <textarea
// //                 value={profileForm.bio}
// //                 onChange={(e) => setProfileForm({...profileForm, bio: e.target.value})}
// //                 rows="3"
// //                 className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
// //               />
// //             </div>
// //             <div className="md:col-span-2">
// //               <label className="block text-sm font-medium text-gray-700 mb-1">Languages (comma separated)</label>
// //               <input
// //                 type="text"
// //                 value={profileForm.languages}
// //                 onChange={(e) => setProfileForm({...profileForm, languages: e.target.value})}
// //                 placeholder="English, Hindi, etc."
// //                 className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
// //               />
// //             </div>
// //           </div>
// //           <button
// //             type="submit"
// //             disabled={updating}
// //             className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
// //           >
// //             {updating ? 'Updating...' : 'Update Profile'}
// //           </button>
// //         </form>
// //       </div>

// //       {/* Specializations Box */}
// //       <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
// //         <h2 className="text-xl font-semibold text-gray-900 mb-4">Specializations</h2>
        
// //         {/* Add/Edit Specialization Form */}
// //         <div className="bg-gray-50 rounded-lg p-4 mb-4">
// //           <h3 className="text-lg font-medium text-gray-800 mb-3">
// //             {editingSpecialization ? 'Edit Specialization' : 'Add New Specialization'}
// //           </h3>
// //           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
// //             <input
// //               type="text"
// //               placeholder="Therapy Type"
// //               value={newSpecialization.therapyType}
// //               onChange={(e) => setNewSpecialization({...newSpecialization, therapyType: e.target.value})}
// //               className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
// //             />
// //             <input
// //               type="number"
// //               placeholder="Years Experience"
// //               value={newSpecialization.yearsOfExperience}
// //               onChange={(e) => setNewSpecialization({...newSpecialization, yearsOfExperience: e.target.value})}
// //               className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
// //             />
// //             <input
// //               type="text"
// //               placeholder="Certification"
// //               value={newSpecialization.certification}
// //               onChange={(e) => setNewSpecialization({...newSpecialization, certification: e.target.value})}
// //               className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
// //             />
// //             <input
// //               type="number"
// //               placeholder="Hourly Rate"
// //               value={newSpecialization.hourlyRate}
// //               onChange={(e) => setNewSpecialization({...newSpecialization, hourlyRate: e.target.value})}
// //               className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
// //             />
// //           </div>
// //           <div className="mt-3 flex space-x-2">
// //             {editingSpecialization ? (
// //               <>
// //                 <button
// //                   onClick={handleUpdateSpecialization}
// //                   className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
// //                 >
// //                   Update Specialization
// //                 </button>
// //                 <button
// //                   onClick={cancelEditSpecialization}
// //                   className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
// //                 >
// //                   Cancel
// //                 </button>
// //               </>
// //             ) : (
// //               <button
// //                 onClick={handleAddSpecialization}
// //                 className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
// //               >
// //                 Add Specialization
// //               </button>
// //             )}
// //           </div>
// //         </div>

// //         {/* Existing Specializations */}
// //         <div className="space-y-3">
// //           {specializations.map((spec, index) => (
// //             <div key={index} className="flex justify-between items-center bg-gray-50 rounded-lg p-4">
// //               <div>
// //                 <h4 className="font-semibold text-gray-900">{spec.therapyType}</h4>
// //                 <p className="text-sm text-gray-600">
// //                   {spec.yearsOfExperience} years • {spec.certification} • ₹{spec.hourlyRate}/hour
// //                 </p>
// //               </div>
// //               <div className="flex space-x-2">
// //                 <button
// //                   onClick={() => handleEditSpecialization(index)}
// //                   className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 text-sm"
// //                 >
// //                   Edit
// //                 </button>
// //                 <button
// //                   onClick={() => handleDeleteSpecialization(index)}
// //                   className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700 text-sm"
// //                 >
// //                   Delete
// //                 </button>
// //               </div>
// //             </div>
// //           ))}
// //           {specializations.length === 0 && (
// //             <p className="text-gray-500 text-center py-4">No specializations added</p>
// //           )}
// //         </div>
// //       </div>

// //       {/* Working Hours Box */}
// //       <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
// //         <h2 className="text-xl font-semibold text-gray-900 mb-4">Working Hours</h2>
        
// //         {/* Add/Edit Working Hour Form */}
// //         <div className="bg-gray-50 rounded-lg p-4 mb-4">
// //           <h3 className="text-lg font-medium text-gray-800 mb-3">
// //             {editingWorkingHour ? 'Edit Working Hour' : 'Add Working Hour'}
// //           </h3>
// //           <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
// //             <select
// //               value={newWorkingHour.dayOfWeek}
// //               onChange={(e) => setNewWorkingHour({...newWorkingHour, dayOfWeek: e.target.value})}
// //               className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
// //             >
// //               <option value="">Select Day</option>
// //               {daysOfWeek.map(day => (
// //                 <option key={day.value} value={day.value}>{day.label}</option>
// //               ))}
// //             </select>
// //             <input
// //               type="time"
// //               value={newWorkingHour.startTime}
// //               onChange={(e) => setNewWorkingHour({...newWorkingHour, startTime: e.target.value})}
// //               className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
// //             />
// //             <input
// //               type="time"
// //               value={newWorkingHour.endTime}
// //               onChange={(e) => setNewWorkingHour({...newWorkingHour, endTime: e.target.value})}
// //               className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
// //             />
// //             <div className="flex items-center">
// //               <input
// //                 type="checkbox"
// //                 checked={newWorkingHour.isActive}
// //                 onChange={(e) => setNewWorkingHour({...newWorkingHour, isActive: e.target.checked})}
// //                 className="mr-2"
// //               />
// //               <label className="text-sm text-gray-700">Active</label>
// //             </div>
// //           </div>
// //           <div className="mt-3 flex space-x-2">
// //             {editingWorkingHour ? (
// //               <>
// //                 <button
// //                   onClick={handleUpdateWorkingHour}
// //                   className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
// //                 >
// //                   Update Working Hour
// //                 </button>
// //                 <button
// //                   onClick={cancelEditWorkingHour}
// //                   className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
// //                 >
// //                   Cancel
// //                 </button>
// //               </>
// //             ) : (
// //               <button
// //                 onClick={handleAddWorkingHour}
// //                 className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
// //               >
// //                 Add Working Hour
// //               </button>
// //             )}
// //           </div>
// //         </div>

// //         {/* Existing Working Hours */}
// //         <div className="space-y-3">
// //           {workingHours.map((wh, index) => (
// //             <div key={index} className="flex justify-between items-center bg-gray-50 rounded-lg p-4">
// //               <div>
// //                 <h4 className="font-semibold text-gray-900">{daysOfWeek.find(d => d.value === wh.dayOfWeek)?.label}</h4>
// //                 <p className="text-sm text-gray-600">
// //                   {wh.startTime} - {wh.endTime} • {wh.isActive ? 'Active' : 'Inactive'}
// //                 </p>
// //               </div>
// //               <div className="flex space-x-2">
// //                 <button
// //                   onClick={() => handleEditWorkingHour(index)}
// //                   className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 text-sm"
// //                 >
// //                   Edit
// //                 </button>
// //                 <button
// //                   onClick={() => handleDeleteWorkingHour(index)}
// //                   className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700 text-sm"
// //                 >
// //                   Delete
// //                 </button>
// //               </div>
// //             </div>
// //           ))}
// //           {workingHours.length === 0 && (
// //             <p className="text-gray-500 text-center py-4">No working hours set</p>
// //           )}
// //         </div>
// //       </div>

// //       {/* Duration Estimates Box */}
// //       <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
// //         <h2 className="text-xl font-semibold text-gray-900 mb-4">Duration Estimates</h2>
        
// //         {/* Add New Duration Estimate Form */}
// //         <div className="bg-gray-50 rounded-lg p-4 mb-4">
// //           <h3 className="text-lg font-medium text-gray-800 mb-3">Add Duration Estimate</h3>
// //           <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
// //             <input
// //               type="text"
// //               placeholder="Therapy Type"
// //               value={newDurationEstimate.therapyType}
// //               onChange={(e) => setNewDurationEstimate({...newDurationEstimate, therapyType: e.target.value})}
// //               className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
// //             />
// //             <input
// //               type="number"
// //               placeholder="Duration (minutes)"
// //               value={newDurationEstimate.duration}
// //               onChange={(e) => setNewDurationEstimate({...newDurationEstimate, duration: e.target.value})}
// //               className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
// //             />
// //           </div>
// //           <button
// //             onClick={handleAddDurationEstimate}
// //             className="mt-3 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
// //           >
// //             Add Duration Estimate
// //           </button>
// //         </div>

// //         {/* Existing Duration Estimates */}
// //         <div className="space-y-3">
// //           {Object.entries(durationEstimates).map(([therapyType, duration]) => (
// //             <div key={therapyType} className="flex justify-between items-center bg-gray-50 rounded-lg p-4">
// //               <div>
// //                 <h4 className="font-semibold text-gray-900">{therapyType}</h4>
// //                 <p className="text-sm text-gray-600">{duration} minutes</p>
// //               </div>
// //               <button
// //                 onClick={() => handleDeleteDurationEstimate(therapyType)}
// //                 className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700 text-sm"
// //               >
// //                 Delete
// //               </button>
// //             </div>
// //           ))}
// //           {Object.keys(durationEstimates).length === 0 && (
// //             <p className="text-gray-500 text-center py-4">No duration estimates set</p>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default UpdateProfileCard;

// import React, { useState, useEffect } from 'react';
// import api from '../../utils/axios';

// const UpdateProfileCard = () => {
//   const [profile, setProfile] = useState(null);
//   const [loading, setLoading] = useState(true);
  
//   const [profileForm, setProfileForm] = useState({
//     name: '',
//     phone: '',
//     bio: '',
//     languages: ''
//   });
  
//   const [specializations, setSpecializations] = useState([]);
//   const [newSpecialization, setNewSpecialization] = useState({
//     therapyType: '',
//     yearsOfExperience: '',
//     certification: '',
//     hourlyRate: ''
//   });
//   const [editingSpecialization, setEditingSpecialization] = useState(null);
  
//   const [workingHours, setWorkingHours] = useState([]);
//   const [newWorkingHour, setNewWorkingHour] = useState({
//     dayOfWeek: '',
//     startTime: '',
//     endTime: '',
//     isActive: true
//   });
//   const [editingWorkingHour, setEditingWorkingHour] = useState(null);
  
//   const [durationEstimates, setDurationEstimates] = useState({});
//   const [newDurationEstimate, setNewDurationEstimate] = useState({
//     therapyType: '',
//     duration: ''
//   });

//   const [updating, setUpdating] = useState(false);

//   const daysOfWeek = [
//     { value: 0, label: 'Sunday' },
//     { value: 1, label: 'Monday' },
//     { value: 2, label: 'Tuesday' },
//     { value: 3, label: 'Wednesday' },
//     { value: 4, label: 'Thursday' },
//     { value: 5, label: 'Friday' },
//     { value: 6, label: 'Saturday' }
//   ];

//   useEffect(() => {
//     fetchAllData();
//   }, []);

//   const fetchAllData = async () => {
//     try {
//       setLoading(true);
//       await Promise.all([
//         fetchProfile(),
//         fetchSpecializations(),
//         fetchWorkingHours(),
//         fetchDurationEstimates()
//       ]);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchProfile = async () => {
//     try {
//       const response = await api.get('/practitioner/profile');
//       const data = response.data.data;
//       setProfile(data);
//       setProfileForm({
//         name: data.name || '',
//         phone: data.phone || '',
//         bio: data.bio || '',
//         languages: Array.isArray(data.languages) ? data.languages.join(', ') : ''
//       });
//     } catch (error) {
//       console.error('Error fetching profile:', error);
//     }
//   };

//   const fetchSpecializations = async () => {
//     try {
//       const response = await api.get('/practitioner/specializations');
//       setSpecializations(response.data.data || []);
//     } catch (error) {
//       console.error('Error fetching specializations:', error);
//     }
//   };

//   const fetchWorkingHours = async () => {
//     try {
//       const response = await api.get('/practitioner/working-hours');
//       setWorkingHours(response.data.data || []);
//     } catch (error) {
//       console.error('Error fetching working hours:', error);
//     }
//   };

//   const fetchDurationEstimates = async () => {
//     try {
//       const response = await api.get('/practitioner/duration-estimates');
//       setDurationEstimates(response.data.data.durationEstimates || {});
//     } catch (error) {
//       console.error('Error fetching duration estimates:', error);
//     }
//   };

//   // Profile Update Functions
//   const handleProfileUpdate = async (e) => {
//     e.preventDefault();
//     setUpdating(true);
//     try {
//       const updateData = {
//         ...profileForm,
//         languages: profileForm.languages.split(',').map(lang => lang.trim()).filter(lang => lang)
//       };
      
//       const response = await api.put('/practitioner/profile', updateData);
//       setProfile(response.data.data);
//       alert('Profile updated successfully!');
//     } catch (error) {
//       console.error('Error updating profile:', error);
//       alert('Error updating profile');
//     } finally {
//       setUpdating(false);
//     }
//   };

//   // Specialization Functions
//   const handleAddSpecialization = async () => {
//     if (!newSpecialization.therapyType || !newSpecialization.yearsOfExperience) {
//       alert('Please fill in all required fields');
//       return;
//     }

//     const newSpec = {
//       therapyType: newSpecialization.therapyType,
//       yearsOfExperience: parseInt(newSpecialization.yearsOfExperience),
//       certification: newSpecialization.certification,
//       hourlyRate: parseInt(newSpecialization.hourlyRate) || 0
//     };

//     const updatedSpecializations = [...specializations, newSpec];
    
//     try {
//       const response = await api.put('/practitioner/specializations', {
//         specialization: updatedSpecializations
//       });
//       setSpecializations(response.data.data);
//       setNewSpecialization({
//         therapyType: '',
//         yearsOfExperience: '',
//         certification: '',
//         hourlyRate: ''
//       });
//       alert('Specialization added successfully!');
//     } catch (error) {
//       console.error('Error adding specialization:', error);
//       alert('Error adding specialization');
//     }
//   };

//   const handleEditSpecialization = (index) => {
//     const spec = specializations[index];
//     setEditingSpecialization({ index, ...spec });
//     setNewSpecialization({
//       therapyType: spec.therapyType,
//       yearsOfExperience: spec.yearsOfExperience.toString(),
//       certification: spec.certification,
//       hourlyRate: spec.hourlyRate.toString()
//     });
//   };

//   const handleUpdateSpecialization = async () => {
//     if (!newSpecialization.therapyType || !newSpecialization.yearsOfExperience) {
//       alert('Please fill in all required fields');
//       return;
//     }

//     const updatedSpec = {
//       therapyType: newSpecialization.therapyType,
//       yearsOfExperience: parseInt(newSpecialization.yearsOfExperience),
//       certification: newSpecialization.certification,
//       hourlyRate: parseInt(newSpecialization.hourlyRate) || 0
//     };

//     const updatedSpecializations = [...specializations];
//     updatedSpecializations[editingSpecialization.index] = updatedSpec;
    
//     try {
//       const response = await api.put('/practitioner/specializations', {
//         specialization: updatedSpecializations
//       });
//       setSpecializations(response.data.data);
//       setEditingSpecialization(null);
//       setNewSpecialization({
//         therapyType: '',
//         yearsOfExperience: '',
//         certification: '',
//         hourlyRate: ''
//       });
//       alert('Specialization updated successfully!');
//     } catch (error) {
//       console.error('Error updating specialization:', error);
//       alert('Error updating specialization');
//     }
//   };

//   const handleDeleteSpecialization = async (index) => {
//     const updatedSpecializations = specializations.filter((_, i) => i !== index);
    
//     try {
//       const response = await api.put('/practitioner/specializations', {
//         specialization: updatedSpecializations
//       });
//       setSpecializations(response.data.data);
//       alert('Specialization deleted successfully!');
//     } catch (error) {
//       console.error('Error deleting specialization:', error);
//       alert('Error deleting specialization');
//     }
//   };

//   const cancelEditSpecialization = () => {
//     setEditingSpecialization(null);
//     setNewSpecialization({
//       therapyType: '',
//       yearsOfExperience: '',
//       certification: '',
//       hourlyRate: ''
//     });
//   };

//   // Working Hours Functions
//   const handleAddWorkingHour = async () => {
//     if (!newWorkingHour.dayOfWeek || !newWorkingHour.startTime || !newWorkingHour.endTime) {
//       alert('Please fill in all required fields');
//       return;
//     }

//     const newWorkingHourData = {
//       dayOfWeek: parseInt(newWorkingHour.dayOfWeek),
//       startTime: newWorkingHour.startTime,
//       endTime: newWorkingHour.endTime,
//       isActive: newWorkingHour.isActive
//     };

//     const updatedWorkingHours = [...workingHours, newWorkingHourData];
    
//     try {
//       const response = await api.put('/practitioner/working-hours', {
//         workingHours: updatedWorkingHours
//       });
//       setWorkingHours(response.data.data);
//       setNewWorkingHour({
//         dayOfWeek: '',
//         startTime: '',
//         endTime: '',
//         isActive: true
//       });
//       alert('Working hour added successfully!');
//     } catch (error) {
//       console.error('Error adding working hour:', error);
//       alert('Error adding working hour');
//     }
//   };

//   const handleEditWorkingHour = (index) => {
//     const wh = workingHours[index];
//     setEditingWorkingHour({ index, ...wh });
//     setNewWorkingHour({
//       dayOfWeek: wh.dayOfWeek.toString(),
//       startTime: wh.startTime,
//       endTime: wh.endTime,
//       isActive: wh.isActive
//     });
//   };

//   const handleUpdateWorkingHour = async () => {
//     if (!newWorkingHour.dayOfWeek || !newWorkingHour.startTime || !newWorkingHour.endTime) {
//       alert('Please fill in all required fields');
//       return;
//     }

//     const updatedWorkingHourData = {
//       dayOfWeek: parseInt(newWorkingHour.dayOfWeek),
//       startTime: newWorkingHour.startTime,
//       endTime: newWorkingHour.endTime,
//       isActive: newWorkingHour.isActive
//     };

//     const updatedWorkingHours = [...workingHours];
//     updatedWorkingHours[editingWorkingHour.index] = updatedWorkingHourData;
    
//     try {
//       const response = await api.put('/practitioner/working-hours', {
//         workingHours: updatedWorkingHours
//       });
//       setWorkingHours(response.data.data);
//       setEditingWorkingHour(null);
//       setNewWorkingHour({
//         dayOfWeek: '',
//         startTime: '',
//         endTime: '',
//         isActive: true
//       });
//       alert('Working hour updated successfully!');
//     } catch (error) {
//       console.error('Error updating working hour:', error);
//       alert('Error updating working hour');
//     }
//   };

//   const handleDeleteWorkingHour = async (index) => {
//     const updatedWorkingHours = workingHours.filter((_, i) => i !== index);
    
//     try {
//       const response = await api.put('/practitioner/working-hours', {
//         workingHours: updatedWorkingHours
//       });
//       setWorkingHours(response.data.data);
//       alert('Working hour deleted successfully!');
//     } catch (error) {
//       console.error('Error deleting working hour:', error);
//       alert('Error deleting working hour');
//     }
//   };

//   const cancelEditWorkingHour = () => {
//     setEditingWorkingHour(null);
//     setNewWorkingHour({
//       dayOfWeek: '',
//       startTime: '',
//       endTime: '',
//       isActive: true
//     });
//   };

//   // Duration Estimates Functions
//   const handleAddDurationEstimate = async () => {
//     if (!newDurationEstimate.therapyType || !newDurationEstimate.duration) {
//       alert('Please fill in all required fields');
//       return;
//     }

//     const updatedEstimates = {
//       ...durationEstimates,
//       [newDurationEstimate.therapyType]: parseInt(newDurationEstimate.duration)
//     };
    
//     try {
//       const response = await api.put('/practitioner/duration-estimates', {
//         durationEstimates: updatedEstimates
//       });
//       setDurationEstimates(response.data.data);
//       setNewDurationEstimate({
//         therapyType: '',
//         duration: ''
//       });
//       alert('Duration estimate added successfully!');
//     } catch (error) {
//       console.error('Error adding duration estimate:', error);
//       alert('Error adding duration estimate');
//     }
//   };

//   const handleDeleteDurationEstimate = async (therapyType) => {
//     const updatedEstimates = { ...durationEstimates };
//     delete updatedEstimates[therapyType];
    
//     try {
//       const response = await api.put('/practitioner/duration-estimates', {
//         durationEstimates: updatedEstimates
//       });
//       setDurationEstimates(response.data.data);
//       alert('Duration estimate deleted successfully!');
//     } catch (error) {
//       console.error('Error deleting duration estimate:', error);
//       alert('Error deleting duration estimate');
//     }
//   };

//   if (loading) {
//     return (
//       <div className="bg-white rounded-2xl shadow-lg p-6 border border-green-100">
//         <div className="flex items-center justify-center py-12">
//           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
//           <span className="ml-3 text-gray-600">Loading profile data...</span>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       {/* Profile Information Box */}
//       <div className="bg-white rounded-2xl shadow-lg p-6 border border-green-100">
//         <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center space-x-2">
//           <i className="fas fa-user-edit text-green-600"></i>
//           <span>Profile Information</span>
//         </h2>
//         <form onSubmit={handleProfileUpdate} className="space-y-6">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
//               <input
//                 type="text"
//                 value={profileForm.name}
//                 onChange={(e) => setProfileForm({...profileForm, name: e.target.value})}
//                 className="w-full border border-green-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
//                 placeholder="Enter your full name"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
//               <input
//                 type="text"
//                 value={profileForm.phone}
//                 onChange={(e) => setProfileForm({...profileForm, phone: e.target.value})}
//                 className="w-full border border-green-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
//                 placeholder="Your phone number"
//               />
//             </div>
//             <div className="md:col-span-2">
//               <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
//               <textarea
//                 value={profileForm.bio}
//                 onChange={(e) => setProfileForm({...profileForm, bio: e.target.value})}
//                 rows="4"
//                 className="w-full border border-green-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
//                 placeholder="Tell patients about your expertise and approach..."
//               />
//             </div>
//             <div className="md:col-span-2">
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Languages (comma separated)
//               </label>
//               <input
//                 type="text"
//                 value={profileForm.languages}
//                 onChange={(e) => setProfileForm({...profileForm, languages: e.target.value})}
//                 placeholder="English, Hindi, Sanskrit, etc."
//                 className="w-full border border-green-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
//               />
//             </div>
//           </div>
//           <button
//             type="submit"
//             disabled={updating}
//             className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 disabled:opacity-50 transition-colors flex items-center space-x-2"
//           >
//             {updating ? (
//               <>
//                 <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
//                 <span>Updating...</span>
//               </>
//             ) : (
//               <>
//                 <i className="fas fa-save"></i>
//                 <span>Update Profile</span>
//               </>
//             )}
//           </button>
//         </form>
//       </div>

//       {/* Specializations Box */}
//       <div className="bg-white rounded-2xl shadow-lg p-6 border border-green-100">
//         <div className="flex items-center justify-between mb-6">
//           <h2 className="text-xl font-bold text-gray-800 flex items-center space-x-2">
//             <i className="fas fa-spa text-green-600"></i>
//             <span>Specializations</span>
//           </h2>
//           <div className="flex items-center space-x-2 bg-green-100 text-green-800 px-3 py-1 rounded-full">
//             <i className="fas fa-graduation-cap text-sm"></i>
//             <span className="text-sm font-medium">{specializations.length} Specializations</span>
//           </div>
//         </div>
        
//         {/* Add/Edit Specialization Form */}
//         <div className="bg-green-50 rounded-xl p-6 mb-6 border border-green-200">
//           <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center space-x-2">
//             <i className={`fas ${editingSpecialization ? 'fa-edit' : 'fa-plus'} text-green-600`}></i>
//             <span>{editingSpecialization ? 'Edit Specialization' : 'Add New Specialization'}</span>
//           </h3>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Therapy Type</label>
//               <input
//                 type="text"
//                 placeholder="e.g., Panchakarma"
//                 value={newSpecialization.therapyType}
//                 onChange={(e) => setNewSpecialization({...newSpecialization, therapyType: e.target.value})}
//                 className="w-full border border-green-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Years Experience</label>
//               <input
//                 type="number"
//                 placeholder="5"
//                 value={newSpecialization.yearsOfExperience}
//                 onChange={(e) => setNewSpecialization({...newSpecialization, yearsOfExperience: e.target.value})}
//                 className="w-full border border-green-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Certification</label>
//               <input
//                 type="text"
//                 placeholder="Certification name"
//                 value={newSpecialization.certification}
//                 onChange={(e) => setNewSpecialization({...newSpecialization, certification: e.target.value})}
//                 className="w-full border border-green-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Hourly Rate (₹)</label>
//               <input
//                 type="number"
//                 placeholder="1500"
//                 value={newSpecialization.hourlyRate}
//                 onChange={(e) => setNewSpecialization({...newSpecialization, hourlyRate: e.target.value})}
//                 className="w-full border border-green-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
//               />
//             </div>
//           </div>
//           <div className="mt-4 flex space-x-3">
//             {editingSpecialization ? (
//               <>
//                 <button
//                   onClick={handleUpdateSpecialization}
//                   className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
//                 >
//                   <i className="fas fa-check"></i>
//                   <span>Update Specialization</span>
//                 </button>
//                 <button
//                   onClick={cancelEditSpecialization}
//                   className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors flex items-center space-x-2"
//                 >
//                   <i className="fas fa-times"></i>
//                   <span>Cancel</span>
//                 </button>
//               </>
//             ) : (
//               <button
//                 onClick={handleAddSpecialization}
//                 className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
//               >
//                 <i className="fas fa-plus"></i>
//                 <span>Add Specialization</span>
//               </button>
//             )}
//           </div>
//         </div>

//         {/* Existing Specializations */}
//         <div className="space-y-4">
//           {specializations.map((spec, index) => (
//             <div key={index} className="flex justify-between items-center bg-green-50 rounded-xl p-5 border border-green-200 hover:border-green-300 transition-colors">
//               <div className="flex-1">
//                 <div className="flex items-center space-x-3 mb-2">
//                   <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
//                     <i className="fas fa-spa text-green-600"></i>
//                   </div>
//                   <div>
//                     <h4 className="font-semibold text-gray-800 text-lg capitalize">{spec.therapyType}</h4>
//                     <p className="text-sm text-gray-600">
//                       {spec.yearsOfExperience} years experience • {spec.certification}
//                     </p>
//                   </div>
//                 </div>
//                 <div className="bg-white rounded-lg p-3 border border-green-200">
//                   <span className="text-green-600 font-bold">₹{spec.hourlyRate}/hour</span>
//                 </div>
//               </div>
//               <div className="flex space-x-2">
//                 <button
//                   onClick={() => handleEditSpecialization(index)}
//                   className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center space-x-2"
//                 >
//                   <i className="fas fa-edit"></i>
//                   <span>Edit</span>
//                 </button>
//                 <button
//                   onClick={() => handleDeleteSpecialization(index)}
//                   className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors flex items-center space-x-2"
//                 >
//                   <i className="fas fa-trash"></i>
//                   <span>Delete</span>
//                 </button>
//               </div>
//             </div>
//           ))}
//           {specializations.length === 0 && (
//             <div className="text-center py-8">
//               <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <i className="fas fa-spa text-2xl text-green-600"></i>
//               </div>
//               <h3 className="text-lg font-semibold text-gray-800 mb-2">No Specializations</h3>
//               <p className="text-gray-600">Add your therapy specializations to showcase your expertise</p>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Working Hours Box */}
//       <div className="bg-white rounded-2xl shadow-lg p-6 border border-green-100">
//         <div className="flex items-center justify-between mb-6">
//           <h2 className="text-xl font-bold text-gray-800 flex items-center space-x-2">
//             <i className="fas fa-clock text-green-600"></i>
//             <span>Working Hours</span>
//           </h2>
//           <div className="flex items-center space-x-2 bg-green-100 text-green-800 px-3 py-1 rounded-full">
//             <i className="fas fa-calendar text-sm"></i>
//             <span className="text-sm font-medium">{workingHours.length} Schedules</span>
//           </div>
//         </div>
        
//         {/* Add/Edit Working Hour Form */}
//         <div className="bg-green-50 rounded-xl p-6 mb-6 border border-green-200">
//           <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center space-x-2">
//             <i className={`fas ${editingWorkingHour ? 'fa-edit' : 'fa-plus'} text-green-600`}></i>
//             <span>{editingWorkingHour ? 'Edit Working Hour' : 'Add Working Hour'}</span>
//           </h3>
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Day</label>
//               <select
//                 value={newWorkingHour.dayOfWeek}
//                 onChange={(e) => setNewWorkingHour({...newWorkingHour, dayOfWeek: e.target.value})}
//                 className="w-full border border-green-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
//               >
//                 <option value="">Select Day</option>
//                 {daysOfWeek.map(day => (
//                   <option key={day.value} value={day.value}>{day.label}</option>
//                 ))}
//               </select>
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Start Time</label>
//               <input
//                 type="time"
//                 value={newWorkingHour.startTime}
//                 onChange={(e) => setNewWorkingHour({...newWorkingHour, startTime: e.target.value})}
//                 className="w-full border border-green-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">End Time</label>
//               <input
//                 type="time"
//                 value={newWorkingHour.endTime}
//                 onChange={(e) => setNewWorkingHour({...newWorkingHour, endTime: e.target.value})}
//                 className="w-full border border-green-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
//               />
//             </div>
//             <div className="flex items-end">
//               <label className="flex items-center space-x-2 bg-white p-3 rounded-lg border border-green-200 w-full">
//                 <input
//                   type="checkbox"
//                   checked={newWorkingHour.isActive}
//                   onChange={(e) => setNewWorkingHour({...newWorkingHour, isActive: e.target.checked})}
//                   className="rounded border-green-300 text-green-600 focus:ring-green-500"
//                 />
//                 <span className="text-sm font-medium text-gray-700">Active</span>
//               </label>
//             </div>
//           </div>
//           <div className="mt-4 flex space-x-3">
//             {editingWorkingHour ? (
//               <>
//                 <button
//                   onClick={handleUpdateWorkingHour}
//                   className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
//                 >
//                   <i className="fas fa-check"></i>
//                   <span>Update Schedule</span>
//                 </button>
//                 <button
//                   onClick={cancelEditWorkingHour}
//                   className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors flex items-center space-x-2"
//                 >
//                   <i className="fas fa-times"></i>
//                   <span>Cancel</span>
//                 </button>
//               </>
//             ) : (
//               <button
//                 onClick={handleAddWorkingHour}
//                 className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
//               >
//                 <i className="fas fa-plus"></i>
//                 <span>Add Schedule</span>
//               </button>
//             )}
//           </div>
//         </div>

//         {/* Existing Working Hours */}
//         <div className="space-y-4">
//           {workingHours.map((wh, index) => (
//             <div key={index} className="flex justify-between items-center bg-green-50 rounded-xl p-5 border border-green-200 hover:border-green-300 transition-colors">
//               <div className="flex items-center space-x-4">
//                 <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
//                   wh.isActive ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
//                 }`}>
//                   <i className="fas fa-calendar-day text-lg"></i>
//                 </div>
//                 <div>
//                   <h4 className="font-semibold text-gray-800 text-lg">
//                     {daysOfWeek.find(d => d.value === wh.dayOfWeek)?.label}
//                   </h4>
//                   <p className="text-gray-600">
//                     {wh.startTime} - {wh.endTime}
//                   </p>
//                 </div>
//               </div>
//               <div className="flex items-center space-x-4">
//                 <span className={`px-3 py-1 rounded-full text-sm font-medium ${
//                   wh.isActive 
//                     ? 'bg-green-100 text-green-800 border border-green-200' 
//                     : 'bg-gray-100 text-gray-600 border border-gray-200'
//                 }`}>
//                   {wh.isActive ? 'Active' : 'Inactive'}
//                 </span>
//                 <div className="flex space-x-2">
//                   <button
//                     onClick={() => handleEditWorkingHour(index)}
//                     className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center space-x-2"
//                   >
//                     <i className="fas fa-edit"></i>
//                     <span>Edit</span>
//                   </button>
//                   <button
//                     onClick={() => handleDeleteWorkingHour(index)}
//                     className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors flex items-center space-x-2"
//                   >
//                     <i className="fas fa-trash"></i>
//                     <span>Delete</span>
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//           {workingHours.length === 0 && (
//             <div className="text-center py-8">
//               <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <i className="fas fa-clock text-2xl text-green-600"></i>
//               </div>
//               <h3 className="text-lg font-semibold text-gray-800 mb-2">No Working Hours</h3>
//               <p className="text-gray-600">Add your availability schedule for patients to book sessions</p>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Duration Estimates Box */}
//       <div className="bg-white rounded-2xl shadow-lg p-6 border border-green-100">
//         <div className="flex items-center justify-between mb-6">
//           <h2 className="text-xl font-bold text-gray-800 flex items-center space-x-2">
//             <i className="fas fa-stopwatch text-green-600"></i>
//             <span>Duration Estimates</span>
//           </h2>
//           <div className="flex items-center space-x-2 bg-green-100 text-green-800 px-3 py-1 rounded-full">
//             <i className="fas fa-list text-sm"></i>
//             <span className="text-sm font-medium">{Object.keys(durationEstimates).length} Estimates</span>
//           </div>
//         </div>
        
//         {/* Add New Duration Estimate Form */}
//         <div className="bg-green-50 rounded-xl p-6 mb-6 border border-green-200">
//           <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center space-x-2">
//             <i className="fas fa-plus text-green-600"></i>
//             <span>Add Duration Estimate</span>
//           </h3>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Therapy Type</label>
//               <input
//                 type="text"
//                 placeholder="e.g., Abhyanga"
//                 value={newDurationEstimate.therapyType}
//                 onChange={(e) => setNewDurationEstimate({...newDurationEstimate, therapyType: e.target.value})}
//                 className="w-full border border-green-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Duration (minutes)</label>
//               <input
//                 type="number"
//                 placeholder="60"
//                 value={newDurationEstimate.duration}
//                 onChange={(e) => setNewDurationEstimate({...newDurationEstimate, duration: e.target.value})}
//                 className="w-full border border-green-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
//               />
//             </div>
//           </div>
//           <button
//             onClick={handleAddDurationEstimate}
//             className="mt-4 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
//           >
//             <i className="fas fa-plus"></i>
//             <span>Add Duration Estimate</span>
//           </button>
//         </div>

//         {/* Existing Duration Estimates */}
//         <div className="space-y-4">
//           {Object.entries(durationEstimates).map(([therapyType, duration]) => (
//             <div key={therapyType} className="flex justify-between items-center bg-green-50 rounded-xl p-5 border border-green-200 hover:border-green-300 transition-colors">
//               <div className="flex items-center space-x-4">
//                 <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
//                   <i className="fas fa-hourglass-half text-green-600"></i>
//                 </div>
//                 <div>
//                   <h4 className="font-semibold text-gray-800 text-lg capitalize">{therapyType}</h4>
//                   <p className="text-gray-600">Estimated session duration</p>
//                 </div>
//               </div>
//               <div className="flex items-center space-x-4">
//                 <div className="bg-white rounded-lg p-3 border border-green-200">
//                   <span className="text-green-600 font-bold text-lg">{duration} minutes</span>
//                 </div>
//                 <button
//                   onClick={() => handleDeleteDurationEstimate(therapyType)}
//                   className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors flex items-center space-x-2"
//                 >
//                   <i className="fas fa-trash"></i>
//                   <span>Delete</span>
//                 </button>
//               </div>
//             </div>
//           ))}
//           {Object.keys(durationEstimates).length === 0 && (
//             <div className="text-center py-8">
//               <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <i className="fas fa-stopwatch text-2xl text-green-600"></i>
//               </div>
//               <h3 className="text-lg font-semibold text-gray-800 mb-2">No Duration Estimates</h3>
//               <p className="text-gray-600">Add therapy duration estimates for better session planning</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UpdateProfileCard;

import React, { useState, useEffect } from 'react';
import api from '../../utils/axios';

const UpdateProfileCard = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const [profileForm, setProfileForm] = useState({
    name: '',
    phone: '',
    bio: '',
    languages: ''
  });
  
  const [specializations, setSpecializations] = useState([]);
  const [newSpecialization, setNewSpecialization] = useState({
    therapyType: '',
    yearsOfExperience: '',
    certification: '',
    hourlyRate: ''
  });
  const [editingSpecialization, setEditingSpecialization] = useState(null);
  
  const [workingHours, setWorkingHours] = useState([]);
  const [newWorkingHour, setNewWorkingHour] = useState({
    dayOfWeek: '',
    startTime: '',
    endTime: '',
    isActive: true
  });
  const [editingWorkingHour, setEditingWorkingHour] = useState(null);
  
  const [durationEstimates, setDurationEstimates] = useState({});
  const [newDurationEstimate, setNewDurationEstimate] = useState({
    therapyType: '',
    duration: ''
  });

  const [updating, setUpdating] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false); // ONLY THIS LINE ADDED

  const daysOfWeek = [
    { value: 0, label: 'Sunday' },
    { value: 1, label: 'Monday' },
    { value: 2, label: 'Tuesday' },
    { value: 3, label: 'Wednesday' },
    { value: 4, label: 'Thursday' },
    { value: 5, label: 'Friday' },
    { value: 6, label: 'Saturday' }
  ];

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      setLoading(true);
      await Promise.all([
        fetchProfile(),
        fetchSpecializations(),
        fetchWorkingHours(),
        fetchDurationEstimates()
      ]);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchProfile = async () => {
    try {
      const response = await api.get('/practitioner/profile');
      const data = response.data.data;
      setProfile(data);
      setProfileForm({
        name: data.name || '',
        phone: data.phone || '',
        bio: data.bio || '',
        languages: Array.isArray(data.languages) ? data.languages.join(', ') : ''
      });
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  // ONLY THIS FUNCTION ADDED - Profile Image Update
  const handleProfileImageUpdate = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('Image size should be less than 5MB');
      return;
    }

    setUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append('profileImage', file);

      const response = await api.patch('/practitioner/profile/image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        setProfile(prev => ({
          ...prev,
          profileImage: response.data.data
        }));
        alert('Profile image updated successfully!');
      }
    } catch (error) {
      console.error('Error updating profile image:', error);
      alert('Error updating profile image');
    } finally {
      setUploadingImage(false);
      event.target.value = '';
    }
  };

  const fetchSpecializations = async () => {
    try {
      const response = await api.get('/practitioner/specializations');
      setSpecializations(response.data.data || []);
    } catch (error) {
      console.error('Error fetching specializations:', error);
    }
  };

  const fetchWorkingHours = async () => {
    try {
      const response = await api.get('/practitioner/working-hours');
      setWorkingHours(response.data.data || []);
    } catch (error) {
      console.error('Error fetching working hours:', error);
    }
  };

  const fetchDurationEstimates = async () => {
    try {
      const response = await api.get('/practitioner/duration-estimates');
      setDurationEstimates(response.data.data.durationEstimates || {});
    } catch (error) {
      console.error('Error fetching duration estimates:', error);
    }
  };

  // Profile Update Functions
  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setUpdating(true);
    try {
      const updateData = {
        ...profileForm,
        languages: profileForm.languages.split(',').map(lang => lang.trim()).filter(lang => lang)
      };
      
      const response = await api.put('/practitioner/profile', updateData);
      setProfile(response.data.data);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Error updating profile');
    } finally {
      setUpdating(false);
    }
  };

  // Specialization Functions
  const handleAddSpecialization = async () => {
    if (!newSpecialization.therapyType || !newSpecialization.yearsOfExperience) {
      alert('Please fill in all required fields');
      return;
    }

    const newSpec = {
      therapyType: newSpecialization.therapyType,
      yearsOfExperience: parseInt(newSpecialization.yearsOfExperience),
      certification: newSpecialization.certification,
      hourlyRate: parseInt(newSpecialization.hourlyRate) || 0
    };

    const updatedSpecializations = [...specializations, newSpec];
    
    try {
      const response = await api.put('/practitioner/specializations', {
        specialization: updatedSpecializations
      });
      setSpecializations(response.data.data);
      setNewSpecialization({
        therapyType: '',
        yearsOfExperience: '',
        certification: '',
        hourlyRate: ''
      });
      alert('Specialization added successfully!');
    } catch (error) {
      console.error('Error adding specialization:', error);
      alert('Error adding specialization');
    }
  };

  const handleEditSpecialization = (index) => {
    const spec = specializations[index];
    setEditingSpecialization({ index, ...spec });
    setNewSpecialization({
      therapyType: spec.therapyType,
      yearsOfExperience: spec.yearsOfExperience.toString(),
      certification: spec.certification,
      hourlyRate: spec.hourlyRate.toString()
    });
  };

  const handleUpdateSpecialization = async () => {
    if (!newSpecialization.therapyType || !newSpecialization.yearsOfExperience) {
      alert('Please fill in all required fields');
      return;
    }

    const updatedSpec = {
      therapyType: newSpecialization.therapyType,
      yearsOfExperience: parseInt(newSpecialization.yearsOfExperience),
      certification: newSpecialization.certification,
      hourlyRate: parseInt(newSpecialization.hourlyRate) || 0
    };

    const updatedSpecializations = [...specializations];
    updatedSpecializations[editingSpecialization.index] = updatedSpec;
    
    try {
      const response = await api.put('/practitioner/specializations', {
        specialization: updatedSpecializations
      });
      setSpecializations(response.data.data);
      setEditingSpecialization(null);
      setNewSpecialization({
        therapyType: '',
        yearsOfExperience: '',
        certification: '',
        hourlyRate: ''
      });
      alert('Specialization updated successfully!');
    } catch (error) {
      console.error('Error updating specialization:', error);
      alert('Error updating specialization');
    }
  };

  const handleDeleteSpecialization = async (index) => {
    const updatedSpecializations = specializations.filter((_, i) => i !== index);
    
    try {
      const response = await api.put('/practitioner/specializations', {
        specialization: updatedSpecializations
      });
      setSpecializations(response.data.data);
      alert('Specialization deleted successfully!');
    } catch (error) {
      console.error('Error deleting specialization:', error);
      alert('Error deleting specialization');
    }
  };

  const cancelEditSpecialization = () => {
    setEditingSpecialization(null);
    setNewSpecialization({
      therapyType: '',
      yearsOfExperience: '',
      certification: '',
      hourlyRate: ''
    });
  };

  // Working Hours Functions
  const handleAddWorkingHour = async () => {
    if (!newWorkingHour.dayOfWeek || !newWorkingHour.startTime || !newWorkingHour.endTime) {
      alert('Please fill in all required fields');
      return;
    }

    const newWorkingHourData = {
      dayOfWeek: parseInt(newWorkingHour.dayOfWeek),
      startTime: newWorkingHour.startTime,
      endTime: newWorkingHour.endTime,
      isActive: newWorkingHour.isActive
    };

    const updatedWorkingHours = [...workingHours, newWorkingHourData];
    
    try {
      const response = await api.put('/practitioner/working-hours', {
        workingHours: updatedWorkingHours
      });
      setWorkingHours(response.data.data);
      setNewWorkingHour({
        dayOfWeek: '',
        startTime: '',
        endTime: '',
        isActive: true
      });
      alert('Working hour added successfully!');
    } catch (error) {
      console.error('Error adding working hour:', error);
      alert('Error adding working hour');
    }
  };

  const handleEditWorkingHour = (index) => {
    const wh = workingHours[index];
    setEditingWorkingHour({ index, ...wh });
    setNewWorkingHour({
      dayOfWeek: wh.dayOfWeek.toString(),
      startTime: wh.startTime,
      endTime: wh.endTime,
      isActive: wh.isActive
    });
  };

  const handleUpdateWorkingHour = async () => {
    if (!newWorkingHour.dayOfWeek || !newWorkingHour.startTime || !newWorkingHour.endTime) {
      alert('Please fill in all required fields');
      return;
    }

    const updatedWorkingHourData = {
      dayOfWeek: parseInt(newWorkingHour.dayOfWeek),
      startTime: newWorkingHour.startTime,
      endTime: newWorkingHour.endTime,
      isActive: newWorkingHour.isActive
    };

    const updatedWorkingHours = [...workingHours];
    updatedWorkingHours[editingWorkingHour.index] = updatedWorkingHourData;
    
    try {
      const response = await api.put('/practitioner/working-hours', {
        workingHours: updatedWorkingHours
      });
      setWorkingHours(response.data.data);
      setEditingWorkingHour(null);
      setNewWorkingHour({
        dayOfWeek: '',
        startTime: '',
        endTime: '',
        isActive: true
      });
      alert('Working hour updated successfully!');
    } catch (error) {
      console.error('Error updating working hour:', error);
      alert('Error updating working hour');
    }
  };

  const handleDeleteWorkingHour = async (index) => {
    const updatedWorkingHours = workingHours.filter((_, i) => i !== index);
    
    try {
      const response = await api.put('/practitioner/working-hours', {
        workingHours: updatedWorkingHours
      });
      setWorkingHours(response.data.data);
      alert('Working hour deleted successfully!');
    } catch (error) {
      console.error('Error deleting working hour:', error);
      alert('Error deleting working hour');
    }
  };

  const cancelEditWorkingHour = () => {
    setEditingWorkingHour(null);
    setNewWorkingHour({
      dayOfWeek: '',
      startTime: '',
      endTime: '',
      isActive: true
    });
  };

  // Duration Estimates Functions
  const handleAddDurationEstimate = async () => {
    if (!newDurationEstimate.therapyType || !newDurationEstimate.duration) {
      alert('Please fill in all required fields');
      return;
    }

    const updatedEstimates = {
      ...durationEstimates,
      [newDurationEstimate.therapyType]: parseInt(newDurationEstimate.duration)
    };
    
    try {
      const response = await api.put('/practitioner/duration-estimates', {
        durationEstimates: updatedEstimates
      });
      setDurationEstimates(response.data.data);
      setNewDurationEstimate({
        therapyType: '',
        duration: ''
      });
      alert('Duration estimate added successfully!');
    } catch (error) {
      console.error('Error adding duration estimate:', error);
      alert('Error adding duration estimate');
    }
  };

  const handleDeleteDurationEstimate = async (therapyType) => {
    const updatedEstimates = { ...durationEstimates };
    delete updatedEstimates[therapyType];
    
    try {
      const response = await api.put('/practitioner/duration-estimates', {
        durationEstimates: updatedEstimates
      });
      setDurationEstimates(response.data.data);
      alert('Duration estimate deleted successfully!');
    } catch (error) {
      console.error('Error deleting duration estimate:', error);
      alert('Error deleting duration estimate');
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-green-100">
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
          <span className="ml-3 text-gray-600">Loading profile data...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Profile Image Upload Section - ONLY THIS SECTION ADDED */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-green-100">
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center space-x-2">
          <i className="fas fa-camera text-green-600"></i>
          <span>Profile Photo</span>
        </h2>
        <div className="flex items-center space-x-6">
          <div className="relative">
            <img
              src={profile?.profileImage || "https://res.cloudinary.com/dsibz6icl/image/upload/v1760112776/default-image_umwlvf.png"}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
            />
            {uploadingImage && (
              <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
              </div>
            )}
          </div>
          <div className="flex-1">
            <p className="text-gray-600 mb-3">
              Update your profile picture to help patients recognize you. JPG, PNG files up to 5MB.
            </p>
            <label className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition-colors cursor-pointer inline-flex items-center space-x-2">
              <i className="fas fa-upload"></i>
              <span>{uploadingImage ? 'Uploading...' : 'Change Photo'}</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleProfileImageUpdate}
                disabled={uploadingImage}
                className="hidden"
              />
            </label>
          </div>
        </div>
      </div>

      {/* Profile Information Box - EXACTLY THE SAME AS BEFORE */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-green-100">
        <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center space-x-2">
          <i className="fas fa-user-edit text-green-600"></i>
          <span>Profile Information</span>
        </h2>
        <form onSubmit={handleProfileUpdate} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
              <input
                type="text"
                value={profileForm.name}
                onChange={(e) => setProfileForm({...profileForm, name: e.target.value})}
                className="w-full border border-green-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                placeholder="Enter your full name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
              <input
                type="text"
                value={profileForm.phone}
                onChange={(e) => setProfileForm({...profileForm, phone: e.target.value})}
                className="w-full border border-green-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                placeholder="Your phone number"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
              <textarea
                value={profileForm.bio}
                onChange={(e) => setProfileForm({...profileForm, bio: e.target.value})}
                rows="4"
                className="w-full border border-green-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                placeholder="Tell patients about your expertise and approach..."
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Languages (comma separated)
              </label>
              <input
                type="text"
                value={profileForm.languages}
                onChange={(e) => setProfileForm({...profileForm, languages: e.target.value})}
                placeholder="English, Hindi, Sanskrit, etc."
                className="w-full border border-green-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={updating}
            className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 disabled:opacity-50 transition-colors flex items-center space-x-2"
          >
            {updating ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Updating...</span>
              </>
            ) : (
              <>
                <i className="fas fa-save"></i>
                <span>Update Profile</span>
              </>
            )}
          </button>
        </form>
      </div>

      {/* Specializations Box - EXACTLY THE SAME AS BEFORE */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-green-100">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800 flex items-center space-x-2">
            <i className="fas fa-spa text-green-600"></i>
            <span>Specializations</span>
          </h2>
          <div className="flex items-center space-x-2 bg-green-100 text-green-800 px-3 py-1 rounded-full">
            <i className="fas fa-graduation-cap text-sm"></i>
            <span className="text-sm font-medium">{specializations.length} Specializations</span>
          </div>
        </div>
        
        {/* Add/Edit Specialization Form */}
        <div className="bg-green-50 rounded-xl p-6 mb-6 border border-green-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center space-x-2">
            <i className={`fas ${editingSpecialization ? 'fa-edit' : 'fa-plus'} text-green-600`}></i>
            <span>{editingSpecialization ? 'Edit Specialization' : 'Add New Specialization'}</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Therapy Type</label>
              <input
                type="text"
                placeholder="e.g., Panchakarma"
                value={newSpecialization.therapyType}
                onChange={(e) => setNewSpecialization({...newSpecialization, therapyType: e.target.value})}
                className="w-full border border-green-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Years Experience</label>
              <input
                type="number"
                placeholder="5"
                value={newSpecialization.yearsOfExperience}
                onChange={(e) => setNewSpecialization({...newSpecialization, yearsOfExperience: e.target.value})}
                className="w-full border border-green-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Certification</label>
              <input
                type="text"
                placeholder="Certification name"
                value={newSpecialization.certification}
                onChange={(e) => setNewSpecialization({...newSpecialization, certification: e.target.value})}
                className="w-full border border-green-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Hourly Rate (₹)</label>
              <input
                type="number"
                placeholder="1500"
                value={newSpecialization.hourlyRate}
                onChange={(e) => setNewSpecialization({...newSpecialization, hourlyRate: e.target.value})}
                className="w-full border border-green-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>
          </div>
          <div className="mt-4 flex space-x-3">
            {editingSpecialization ? (
              <>
                <button
                  onClick={handleUpdateSpecialization}
                  className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
                >
                  <i className="fas fa-check"></i>
                  <span>Update Specialization</span>
                </button>
                <button
                  onClick={cancelEditSpecialization}
                  className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors flex items-center space-x-2"
                >
                  <i className="fas fa-times"></i>
                  <span>Cancel</span>
                </button>
              </>
            ) : (
              <button
                onClick={handleAddSpecialization}
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
                >
                  <i className="fas fa-plus"></i>
                  <span>Add Specialization</span>
                </button>
            )}
          </div>
        </div>

        {/* Existing Specializations */}
        <div className="space-y-4">
          {specializations.map((spec, index) => (
            <div key={index} className="flex justify-between items-center bg-green-50 rounded-xl p-5 border border-green-200 hover:border-green-300 transition-colors">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <i className="fas fa-spa text-green-600"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 text-lg capitalize">{spec.therapyType}</h4>
                    <p className="text-sm text-gray-600">
                      {spec.yearsOfExperience} years experience • {spec.certification}
                    </p>
                  </div>
                </div>
                <div className="bg-white rounded-lg p-3 border border-green-200">
                  <span className="text-green-600 font-bold">₹{spec.hourlyRate}/hour</span>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEditSpecialization(index)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center space-x-2"
                >
                  <i className="fas fa-edit"></i>
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => handleDeleteSpecialization(index)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors flex items-center space-x-2"
                >
                  <i className="fas fa-trash"></i>
                  <span>Delete</span>
                </button>
              </div>
            </div>
          ))}
          {specializations.length === 0 && (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-spa text-2xl text-green-600"></i>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">No Specializations</h3>
              <p className="text-gray-600">Add your therapy specializations to showcase your expertise</p>
            </div>
          )}
        </div>
      </div>

      {/* Working Hours Box - EXACTLY THE SAME AS BEFORE */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-green-100">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800 flex items-center space-x-2">
            <i className="fas fa-clock text-green-600"></i>
            <span>Working Hours</span>
          </h2>
          <div className="flex items-center space-x-2 bg-green-100 text-green-800 px-3 py-1 rounded-full">
            <i className="fas fa-calendar text-sm"></i>
            <span className="text-sm font-medium">{workingHours.length} Schedules</span>
          </div>
        </div>
        
        {/* Add/Edit Working Hour Form */}
        <div className="bg-green-50 rounded-xl p-6 mb-6 border border-green-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center space-x-2">
            <i className={`fas ${editingWorkingHour ? 'fa-edit' : 'fa-plus'} text-green-600`}></i>
            <span>{editingWorkingHour ? 'Edit Working Hour' : 'Add Working Hour'}</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Day</label>
              <select
                value={newWorkingHour.dayOfWeek}
                onChange={(e) => setNewWorkingHour({...newWorkingHour, dayOfWeek: e.target.value})}
                className="w-full border border-green-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                <option value="">Select Day</option>
                {daysOfWeek.map(day => (
                  <option key={day.value} value={day.value}>{day.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Start Time</label>
              <input
                type="time"
                value={newWorkingHour.startTime}
                onChange={(e) => setNewWorkingHour({...newWorkingHour, startTime: e.target.value})}
                className="w-full border border-green-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">End Time</label>
              <input
                type="time"
                value={newWorkingHour.endTime}
                onChange={(e) => setNewWorkingHour({...newWorkingHour, endTime: e.target.value})}
                className="w-full border border-green-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <div className="flex items-end">
              <label className="flex items-center space-x-2 bg-white p-3 rounded-lg border border-green-200 w-full">
                <input
                  type="checkbox"
                  checked={newWorkingHour.isActive}
                  onChange={(e) => setNewWorkingHour({...newWorkingHour, isActive: e.target.checked})}
                  className="rounded border-green-300 text-green-600 focus:ring-green-500"
                />
                <span className="text-sm font-medium text-gray-700">Active</span>
              </label>
            </div>
          </div>
          <div className="mt-4 flex space-x-3">
            {editingWorkingHour ? (
              <>
                <button
                  onClick={handleUpdateWorkingHour}
                  className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
                >
                  <i className="fas fa-check"></i>
                  <span>Update Schedule</span>
                </button>
                <button
                  onClick={cancelEditWorkingHour}
                  className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors flex items-center space-x-2"
                >
                  <i className="fas fa-times"></i>
                  <span>Cancel</span>
                </button>
              </>
            ) : (
              <button
                onClick={handleAddWorkingHour}
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
              >
                <i className="fas fa-plus"></i>
                <span>Add Schedule</span>
              </button>
            )}
          </div>
        </div>

        {/* Existing Working Hours */}
        <div className="space-y-4">
          {workingHours.map((wh, index) => (
            <div key={index} className="flex justify-between items-center bg-green-50 rounded-xl p-5 border border-green-200 hover:border-green-300 transition-colors">
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  wh.isActive ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
                }`}>
                  <i className="fas fa-calendar-day text-lg"></i>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 text-lg">
                    {daysOfWeek.find(d => d.value === wh.dayOfWeek)?.label}
                  </h4>
                  <p className="text-gray-600">
                    {wh.startTime} - {wh.endTime}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  wh.isActive 
                    ? 'bg-green-100 text-green-800 border border-green-200' 
                    : 'bg-gray-100 text-gray-600 border border-gray-200'
                }`}>
                  {wh.isActive ? 'Active' : 'Inactive'}
                </span>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEditWorkingHour(index)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center space-x-2"
                  >
                    <i className="fas fa-edit"></i>
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => handleDeleteWorkingHour(index)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors flex items-center space-x-2"
                  >
                    <i className="fas fa-trash"></i>
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
          {workingHours.length === 0 && (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-clock text-2xl text-green-600"></i>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">No Working Hours</h3>
              <p className="text-gray-600">Add your availability schedule for patients to book sessions</p>
            </div>
          )}
        </div>
      </div>

      {/* Duration Estimates Box - EXACTLY THE SAME AS BEFORE */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-green-100">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800 flex items-center space-x-2">
            <i className="fas fa-stopwatch text-green-600"></i>
            <span>Duration Estimates</span>
          </h2>
          <div className="flex items-center space-x-2 bg-green-100 text-green-800 px-3 py-1 rounded-full">
            <i className="fas fa-list text-sm"></i>
            <span className="text-sm font-medium">{Object.keys(durationEstimates).length} Estimates</span>
          </div>
        </div>
        
        {/* Add New Duration Estimate Form */}
        <div className="bg-green-50 rounded-xl p-6 mb-6 border border-green-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center space-x-2">
            <i className="fas fa-plus text-green-600"></i>
            <span>Add Duration Estimate</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Therapy Type</label>
              <input
                type="text"
                placeholder="e.g., Abhyanga"
                value={newDurationEstimate.therapyType}
                onChange={(e) => setNewDurationEstimate({...newDurationEstimate, therapyType: e.target.value})}
                className="w-full border border-green-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Duration (minutes)</label>
              <input
                type="number"
                placeholder="60"
                value={newDurationEstimate.duration}
                onChange={(e) => setNewDurationEstimate({...newDurationEstimate, duration: e.target.value})}
                className="w-full border border-green-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>
          </div>
          <button
            onClick={handleAddDurationEstimate}
            className="mt-4 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
          >
            <i className="fas fa-plus"></i>
            <span>Add Duration Estimate</span>
          </button>
        </div>

        {/* Existing Duration Estimates */}
        <div className="space-y-4">
          {Object.entries(durationEstimates).map(([therapyType, duration]) => (
            <div key={therapyType} className="flex justify-between items-center bg-green-50 rounded-xl p-5 border border-green-200 hover:border-green-300 transition-colors">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <i className="fas fa-hourglass-half text-green-600"></i>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 text-lg capitalize">{therapyType}</h4>
                  <p className="text-gray-600">Estimated session duration</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="bg-white rounded-lg p-3 border border-green-200">
                  <span className="text-green-600 font-bold text-lg">{duration} minutes</span>
                </div>
                <button
                  onClick={() => handleDeleteDurationEstimate(therapyType)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors flex items-center space-x-2"
                >
                  <i className="fas fa-trash"></i>
                  <span>Delete</span>
                </button>
              </div>
            </div>
          ))}
          {Object.keys(durationEstimates).length === 0 && (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-stopwatch text-2xl text-green-600"></i>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">No Duration Estimates</h3>
              <p className="text-gray-600">Add therapy duration estimates for better session planning</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UpdateProfileCard;