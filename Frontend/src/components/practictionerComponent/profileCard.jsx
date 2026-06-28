
// import React, { useState, useEffect } from 'react';
// import api from '../../utils/axios';

// const ProfileCard = () => {
//   const [profile, setProfile] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchProfile();
//   }, []);

//   const fetchProfile = async () => {
//     try {
//       const response = await api.get('/practitioner/profile');
//       setProfile(response.data.data);
//     } catch (error) {
//       console.error('Error fetching profile:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center py-12">
//         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//         <span className="ml-3 text-gray-600">Loading profile...</span>
//       </div>
//     );
//   }

//   if (!profile) {
//     return (
//       <div className="text-center py-8 text-gray-500">
//         No profile data available
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-4xl mx-auto">
//       {/* Header Card */}
//       <div className="bg-white rounded-lg shadow-md p-6 mb-6">
//         <div className="flex items-center justify-between">
//           <div>
//             <h1 className="text-2xl font-bold text-gray-900">{profile.name}</h1>
//             <p className="text-gray-600 capitalize">{profile.role}</p>
//             <div className="flex items-center mt-2 space-x-2">
//               <span className={`px-3 py-1 rounded-full text-sm font-medium ${
//                 profile.isActive 
//                   ? 'bg-green-100 text-green-800' 
//                   : 'bg-red-100 text-red-800'
//               }`}>
//                 {profile.isActive ? 'Active' : 'Inactive'}
//               </span>
//               {profile.isVerified && (
//                 <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
//                   Verified
//                 </span>
//               )}
//             </div>
//           </div>
//           <div className="text-right">
//             <p className="text-sm text-gray-500">Experience</p>
//             <p className="text-xl font-bold text-gray-900">{profile.experienceYears} years</p>
//           </div>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {/* Contact Information */}
//         <div className="bg-white rounded-lg shadow-md p-6">
//           <h2 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h2>
//           <div className="space-y-3">
//             <div>
//               <label className="block text-sm font-medium text-gray-600">Email</label>
//               <p className="text-gray-900">{profile.email}</p>
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-600">Phone</label>
//               <p className="text-gray-900">{profile.phone}</p>
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-600">Languages</label>
//               <p className="text-gray-900">
//                 {profile.languages && profile.languages.length > 0 
//                   ? profile.languages.join(', ') 
//                   : 'Not specified'
//                 }
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Professional Details */}
//         <div className="bg-white rounded-lg shadow-md p-6">
//           <h2 className="text-lg font-semibold text-gray-900 mb-4">Professional Details</h2>
//           <div className="space-y-3">
//             <div>
//               <label className="block text-sm font-medium text-gray-600">Max Patients/Day</label>
//               <p className="text-gray-900">{profile.maxPatientsPerDay}</p>
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-600">Center</label>
//               <p className="text-gray-900">{profile.centerId ? profile.centerId.name : 'Not assigned'}</p>
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-600">Member Since</label>
//               <p className="text-gray-900">
//                 {new Date(profile.createdAt).toLocaleDateString()}
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Specializations */}
//         <div className="bg-white rounded-lg shadow-md p-6 md:col-span-2">
//           <h2 className="text-lg font-semibold text-gray-900 mb-4">Specializations</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             {profile.specialization.map((spec, index) => (
//               <div key={index} className="border border-gray-200 rounded-lg p-4">
//                 <h3 className="font-semibold text-gray-900 text-lg mb-2">{spec.therapyType}</h3>
//                 <div className="space-y-2 text-sm">
//                   <div className="flex justify-between">
//                     <span className="text-gray-600">Experience:</span>
//                     <span className="text-gray-900">{spec.yearsOfExperience} years</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-gray-600">Hourly Rate:</span>
//                     <span className="text-gray-900">₹{spec.hourlyRate}</span>
//                   </div>
//                   <div>
//                     <span className="text-gray-600">Certification:</span>
//                     <p className="text-gray-900 mt-1">{spec.certification}</p>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Ratings */}
//         <div className="bg-white rounded-lg shadow-md p-6">
//           <h2 className="text-lg font-semibold text-gray-900 mb-4">Ratings & Reviews</h2>
//           <div className="text-center">
//             <div className="text-4xl font-bold text-gray-900 mb-2">
//               {profile.ratings.average.toFixed(1)}
//             </div>
//             <div className="flex justify-center text-yellow-400 text-xl mb-2">
//               {'★'.repeat(Math.floor(profile.ratings.average))}
//               {'☆'.repeat(5 - Math.floor(profile.ratings.average))}
//             </div>
//             <p className="text-gray-600">Based on {profile.ratings.count} reviews</p>
//           </div>
//         </div>

//         {/* Additional Info */}
//         <div className="bg-white rounded-lg shadow-md p-6">
//           <h2 className="text-lg font-semibold text-gray-900 mb-4">Additional Information</h2>
//           <div className="space-y-3">
//             <div>
//               <label className="block text-sm font-medium text-gray-600">Qualifications</label>
//               <p className="text-gray-900">
//                 {profile.qualifications && profile.qualifications.length > 0 
//                   ? `${profile.qualifications.length} qualification(s)` 
//                   : 'No qualifications added'
//                 }
//               </p>
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-600">Working Hours</label>
//               <p className="text-gray-900">
//                 {profile.workingHours && profile.workingHours.length > 0 
//                   ? `${profile.workingHours.length} schedule(s) set` 
//                   : 'No working hours set'
//                 }
//               </p>
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-600">Last Updated</label>
//               <p className="text-gray-900">
//                 {new Date(profile.updatedAt).toLocaleDateString()}
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// // };
// import React, { useState, useEffect, useRef } from 'react';
// import api from '../../utils/axios';

// const ProfileCard = () => {
//   const [profile, setProfile] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [uploadingImage, setUploadingImage] = useState(false);
//   const fileInputRef = useRef(null);

//   useEffect(() => {
//     fetchProfile();
//   }, []);

//   const fetchProfile = async () => {
//     try {
//       const response = await api.get('/practitioner/profile');
//       setProfile(response.data.data);
//     } catch (error) {
//       console.error('Error fetching profile:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDoubleClick = () => {
//     // Directly trigger the file input click
//     fileInputRef.current?.click();
//   };

//   const handleImageUpload = async (event) => {
//     const file = event.target.files[0];
//     if (!file) return;

//     // Validate file type
//     if (!file.type.startsWith('image/')) {
//       alert('Please select a valid image file');
//       return;
//     }

//     // Validate file size (max 5MB)
//     if (file.size > 5 * 1024 * 1024) {
//       alert('Image size should be less than 5MB');
//       return;
//     }

//     setUploadingImage(true);
    
//     try {
//       const formData = new FormData();
//       formData.append('image', file);

//       const response = await api.patch('/practitioner/profile/image', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       // Update profile with new image
//       setProfile(prev => ({
//         ...prev,
//         profileImage: response.data.data
//       }));
      
//       alert('Profile image updated successfully!');
//     } catch (error) {
//       console.error('Error uploading image:', error);
//       alert('Error uploading profile image');
//     } finally {
//       setUploadingImage(false);
//       // Reset file input
//       event.target.value = '';
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center py-12">
//         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//         <span className="ml-3 text-gray-600">Loading profile...</span>
//       </div>
//     );
//   }

//   if (!profile) {
//     return (
//       <div className="text-center py-8 text-gray-500">
//         No profile data available
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-4xl mx-auto">
//       {/* Hidden file input */}
//       <input
//         type="file"
//         ref={fileInputRef}
//         accept="image/*"
//         onChange={handleImageUpload}
//         style={{ display: 'none' }}
//       />

//       {/* Header Card */}
//       <div className="bg-white rounded-lg shadow-md p-6 mb-6">
//         <div className="flex items-center justify-between">
//           <div className="flex items-center space-x-6">
//             {/* Profile Image Section */}
//             <div className="relative">
//               <div 
//                 className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
//                 onDoubleClick={handleDoubleClick}
//                 title="Double click to change profile photo"
//               >
//                 {profile.profileImage ? (
//                   <img 
//                     src={profile.profileImage} 
//                     alt="Profile" 
//                     className="w-20 h-20 rounded-full object-cover"
//                   />
//                 ) : (
//                   <div className="text-2xl text-gray-400">
//                     👤
//                   </div>
//                 )}
//                 {uploadingImage && (
//                   <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
//                     <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
//                   </div>
//                 )}
//                 <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 rounded-full transition-all flex items-center justify-center">
//                   <span className="text-white text-xs opacity-0 hover:opacity-100 transition-opacity">
//                     Double click to change
//                   </span>
//                 </div>
//               </div>
//             </div>

//             <div>
//               <h1 className="text-2xl font-bold text-gray-900">{profile.name}</h1>
//               <p className="text-gray-600 capitalize">{profile.role}</p>
//               <div className="flex items-center mt-2 space-x-2">
//                 <span className={`px-3 py-1 rounded-full text-sm font-medium ${
//                   profile.isActive 
//                     ? 'bg-green-100 text-green-800' 
//                     : 'bg-red-100 text-red-800'
//                 }`}>
//                   {profile.isActive ? 'Active' : 'Inactive'}
//                 </span>
//                 {profile.isVerified && (
//                   <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
//                     Verified
//                   </span>
//                 )}
//               </div>
//               <p className="text-xs text-gray-500 mt-1">
//                 Double click on profile picture to change
//               </p>
//             </div>
//           </div>

//           <div className="text-right">
//             <p className="text-sm text-gray-500">Experience</p>
//             <p className="text-xl font-bold text-gray-900">{profile.experienceYears} years</p>
//           </div>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {/* Contact Information */}
//         <div className="bg-white rounded-lg shadow-md p-6">
//           <h2 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h2>
//           <div className="space-y-3">
//             <div>
//               <label className="block text-sm font-medium text-gray-600">Email</label>
//               <p className="text-gray-900">{profile.email}</p>
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-600">Phone</label>
//               <p className="text-gray-900">{profile.phone}</p>
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-600">Languages</label>
//               <p className="text-gray-900">
//                 {profile.languages && profile.languages.length > 0 
//                   ? profile.languages.join(', ') 
//                   : 'Not specified'
//                 }
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Professional Details */}
//         <div className="bg-white rounded-lg shadow-md p-6">
//           <h2 className="text-lg font-semibold text-gray-900 mb-4">Professional Details</h2>
//           <div className="space-y-3">
//             <div>
//               <label className="block text-sm font-medium text-gray-600">Max Patients/Day</label>
//               <p className="text-gray-900">{profile.maxPatientsPerDay}</p>
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-600">Center</label>
//               <p className="text-gray-900">{profile.centerId ? profile.centerId.name : 'Not assigned'}</p>
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-600">Member Since</label>
//               <p className="text-gray-900">
//                 {new Date(profile.createdAt).toLocaleDateString()}
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Specializations */}
//         <div className="bg-white rounded-lg shadow-md p-6 md:col-span-2">
//           <h2 className="text-lg font-semibold text-gray-900 mb-4">Specializations</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             {profile.specialization && profile.specialization.length > 0 ? (
//               profile.specialization.map((spec, index) => (
//                 <div key={index} className="border border-gray-200 rounded-lg p-4">
//                   <h3 className="font-semibold text-gray-900 text-lg mb-2">{spec.therapyType}</h3>
//                   <div className="space-y-2 text-sm">
//                     <div className="flex justify-between">
//                       <span className="text-gray-600">Experience:</span>
//                       <span className="text-gray-900">{spec.yearsOfExperience} years</span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span className="text-gray-600">Hourly Rate:</span>
//                       <span className="text-gray-900">₹{spec.hourlyRate}</span>
//                     </div>
//                     <div>
//                       <span className="text-gray-600">Certification:</span>
//                       <p className="text-gray-900 mt-1">{spec.certification}</p>
//                     </div>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <p className="text-gray-500 col-span-2 text-center py-4">No specializations added</p>
//             )}
//           </div>
//         </div>

//         {/* Ratings */}
//         <div className="bg-white rounded-lg shadow-md p-6">
//           <h2 className="text-lg font-semibold text-gray-900 mb-4">Ratings & Reviews</h2>
//           <div className="text-center">
//             <div className="text-4xl font-bold text-gray-900 mb-2">
//               {(profile.ratings?.average || 0).toFixed(1)}
//             </div>
//             <div className="flex justify-center text-yellow-400 text-xl mb-2">
//               {'★'.repeat(Math.floor(profile.ratings?.average || 0))}
//               {'☆'.repeat(5 - Math.floor(profile.ratings?.average || 0))}
//             </div>
//             <p className="text-gray-600">Based on {profile.ratings?.count || 0} reviews</p>
//           </div>
//         </div>

//         {/* Additional Info */}
//         <div className="bg-white rounded-lg shadow-md p-6">
//           <h2 className="text-lg font-semibold text-gray-900 mb-4">Additional Information</h2>
//           <div className="space-y-3">
//             <div>
//               <label className="block text-sm font-medium text-gray-600">Qualifications</label>
//               <p className="text-gray-900">
//                 {profile.qualifications && profile.qualifications.length > 0 
//                   ? `${profile.qualifications.length} qualification(s)` 
//                   : 'No qualifications added'
//                 }
//               </p>
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-600">Working Hours</label>
//               <p className="text-gray-900">
//                 {profile.workingHours && profile.workingHours.length > 0 
//                   ? `${profile.workingHours.length} schedule(s) set` 
//                   : 'No working hours set'
//                 }
//               </p>
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-600">Last Updated</label>
//               <p className="text-gray-900">
//                 {new Date(profile.updatedAt).toLocaleDateString()}
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProfileCard;

import React, { useState, useEffect, useRef } from 'react';
import api from '../../utils/axios';

const ProfileCard = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploadingImage, setUploadingImage] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await api.get('/practitioner/profile');
      setProfile(response.data.data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  console.log(profile)

  const handleDoubleClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageUpload = async (event) => {
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

      setProfile(prev => ({
        ...prev,
        profileImage: response.data.data
      }));
      
      alert('Profile image updated successfully!');
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Error uploading profile image');
    } finally {
      setUploadingImage(false);
      event.target.value = '';
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-green-100">
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
          <span className="ml-3 text-gray-600">Loading profile...</span>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-green-100 text-center py-8">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <i className="fas fa-user-slash text-2xl text-green-600"></i>
        </div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">No Profile Data</h3>
        <p className="text-gray-600">Profile information is not available</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        onChange={handleImageUpload}
        style={{ display: 'none' }}
      />

      {/* Header Card */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-green-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            {/* Profile Image Section */}
            <div className="relative">
              <div 
                className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center cursor-pointer hover:opacity-80 transition-all duration-200 border-4 border-green-200"
                onDoubleClick={handleDoubleClick}
                title="Double click to change profile photo"
              >
                {profile.profileImage ? (
                  <img 
                    src={profile.profileImage} 
                    alt="Profile" 
                    className="w-24 h-24 rounded-full object-cover"
                  />
                ) : (
                  <div className="text-2xl text-green-600">
                    <i className="fas fa-user-md"></i>
                  </div>
                )}
                {uploadingImage && (
                  <div className="absolute inset-0 bg-green-600 bg-opacity-50 rounded-full flex items-center justify-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                  </div>
                )}
                <div className="absolute inset-0 bg-green-600 bg-opacity-0 hover:bg-opacity-20 rounded-full transition-all flex items-center justify-center">
                  <span className="text-white text-xs opacity-0 hover:opacity-100 transition-opacity text-center px-2">
                    Double click to change
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h1 className="text-2xl font-bold text-gray-900">{profile.name}</h1>
              <p className="text-green-600 capitalize font-medium">{profile.role}</p>
              <div className="flex items-center mt-3 space-x-2">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  profile.isActive 
                    ? 'bg-green-100 text-green-800 border border-green-200' 
                    : 'bg-red-100 text-red-800 border border-red-200'
                }`}>
                  <i className={`fas ${profile.isActive ? 'fa-check-circle' : 'fa-times-circle'} mr-1`}></i>
                  {profile.isActive ? 'Active' : 'Inactive'}
                </span>
                {profile.isVerified && (
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 border border-blue-200">
                    <i className="fas fa-shield-check mr-1"></i>
                    Verified
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-2 flex items-center">
                <i className="fas fa-info-circle mr-1"></i>
                Double click on profile picture to change
              </p>
            </div>
          </div>

          <div className="text-right">
            <div className="bg-green-50 rounded-xl p-4 border border-green-200">
              <p className="text-sm text-gray-600 mb-1">Experience</p>
              <p className="text-2xl font-bold text-green-600">{profile.experienceYears} years</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Contact Information */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-green-100">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center space-x-2">
            <i className="fas fa-address-card text-green-600"></i>
            <span>Contact Information</span>
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-2 border-b border-green-100">
              <span className="text-sm font-medium text-gray-600 flex items-center space-x-2">
                <i className="fas fa-envelope text-green-500"></i>
                <span>Email</span>
              </span>
              <span className="text-gray-900">{profile.email}</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-green-100">
              <span className="text-sm font-medium text-gray-600 flex items-center space-x-2">
                <i className="fas fa-phone text-green-500"></i>
                <span>Phone</span>
              </span>
              <span className="text-gray-900">{profile.phone}</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-sm font-medium text-gray-600 flex items-center space-x-2">
                <i className="fas fa-language text-green-500"></i>
                <span>Languages</span>
              </span>
              <span className="text-gray-900 text-right">
                {profile.languages && profile.languages.length > 0 
                  ? profile.languages.join(', ') 
                  : 'Not specified'
                }
              </span>
            </div>
          </div>
        </div>

        {/* Professional Details */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-green-100">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center space-x-2">
            <i className="fas fa-briefcase-medical text-green-600"></i>
            <span>Professional Details</span>
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-2 border-b border-green-100">
              <span className="text-sm font-medium text-gray-600">Max Patients/Day</span>
              <span className="text-gray-900 font-semibold">{profile.maxPatientsPerDay}</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-green-100">
              <span className="text-sm font-medium text-gray-600">Center</span>
              <span className="text-gray-900">{profile.centerId ? profile.centerId.name : 'Not assigned'}</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-sm font-medium text-gray-600">Member Since</span>
              <span className="text-gray-900">
                {new Date(profile.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>

        {/* Specializations */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-green-100 md:col-span-2">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center space-x-2">
            <i className="fas fa-star text-green-600"></i>
            <span>Specializations</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {profile.specialization && profile.specialization.length > 0 ? (
              profile.specialization.map((spec, index) => (
                <div key={index} className="bg-green-50 rounded-xl p-4 border border-green-200 hover:border-green-300 transition-colors">
                  <h3 className="font-semibold text-gray-800 text-lg mb-3 flex items-center space-x-2">
                    <i className="fas fa-spa text-green-600"></i>
                    <span className="capitalize">{spec.therapyType}</span>
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between items-center py-1 border-b border-green-100">
                      <span className="text-gray-600">Experience:</span>
                      <span className="text-gray-900 font-medium">{spec.yearsOfExperience} years</span>
                    </div>
                    <div className="flex justify-between items-center py-1 border-b border-green-100">
                      <span className="text-gray-600">Hourly Rate:</span>
                      <span className="text-green-600 font-bold">₹{spec.hourlyRate}</span>
                    </div>
                    <div className="pt-1">
                      <span className="text-gray-600 block mb-1">Certification:</span>
                      <p className="text-gray-900 bg-white rounded-lg p-2 border border-green-200">
                        {spec.certification}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-2 text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-graduation-cap text-2xl text-green-600"></i>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">No Specializations</h3>
                <p className="text-gray-600">Add your therapy specializations to get started</p>
              </div>
            )}
          </div>
        </div>

        {/* Ratings */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-green-100">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center space-x-2">
            <i className="fas fa-chart-line text-green-600"></i>
            <span>Ratings & Reviews</span>
          </h2>
          <div className="text-center">
            <div className="text-4xl font-bold text-green-600 mb-2">
              {(profile.ratings?.average || 0).toFixed(1)}
            </div>
            <div className="flex justify-center text-yellow-400 text-xl mb-3">
              {'★'.repeat(Math.floor(profile.ratings?.average || 0))}
              {'☆'.repeat(5 - Math.floor(profile.ratings?.average || 0))}
            </div>
            <div className="bg-green-50 rounded-lg p-3 border border-green-200">
              <p className="text-gray-600 text-sm">Based on</p>
              <p className="text-green-600 font-bold text-lg">{profile.ratings?.count || 0} reviews</p>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-green-100">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center space-x-2">
            <i className="fas fa-info-circle text-green-600"></i>
            <span>Additional Information</span>
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-2 border-b border-green-100">
              <span className="text-sm font-medium text-gray-600">Qualifications</span>
              <span className="text-gray-900">
                {profile.qualifications && profile.qualifications.length > 0 
                  ? `${profile.qualifications.length} qualification(s)` 
                  : 'None'
                }
              </span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-green-100">
              <span className="text-sm font-medium text-gray-600">Working Hours</span>
              <span className="text-gray-900">
                {profile.workingHours && profile.workingHours.length > 0 
                  ? `${profile.workingHours.length} schedule(s)` 
                  : 'Not set'
                }
              </span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-sm font-medium text-gray-600">Last Updated</span>
              <span className="text-gray-900">
                {new Date(profile.updatedAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;