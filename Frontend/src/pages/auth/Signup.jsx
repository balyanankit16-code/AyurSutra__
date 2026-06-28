// import React, { useState } from 'react';
// import { useForm, useFieldArray } from 'react-hook-form';
// import api from '../../utils/axios';

// const Signup = ({ switchToLogin }) => {
//   const [loading, setLoading] = useState(false);
//   const [selectedRole, setSelectedRole] = useState('patient');
  
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     setError,
//     clearErrors,
//     watch,
//     control
//   } = useForm({
//     defaultValues: {
//       role: 'patient',
//       name: '',
//       email: '',
//       phone: '',
//       password: '',
//       confirmPassword: '',
//       gender: '',
//       dateOfBirth: '',
      
//       // Practitioner specific
//       specialization: [{ therapyType: '', yearsOfExperience: '', certification: '', hourlyRate: '' }],
//       experienceYears: '',
//       qualifications: [{ degree: '', institution: '', year: '', certificateUrl: '' }],
//       workingHours: [{ dayOfWeek: '', startTime: '', endTime: '', isActive: true }],
//       maxPatientsPerDay: '',
//       durationEstimates: [{ therapyType: '', duration: '' }],
//       centerId: '',
//       bio: '',
//       languages: ['English', 'Hindi'],
      
//       // Admin specific
//       username: '',
//       permissions: [{ module: '', actions: [] }],
//       contactNumber: '',
//       profileImage: { url: '', publicId: '' }
//     }
//   });

//   // Field arrays for dynamic forms
//   const {
//     fields: specializationFields,
//     append: appendSpecialization,
//     remove: removeSpecialization
//   } = useFieldArray({
//     control,
//     name: 'specialization'
//   });

//   const {
//     fields: qualificationFields,
//     append: appendQualification,
//     remove: removeQualification
//   } = useFieldArray({
//     control,
//     name: 'qualifications'
//   });

//   const {
//     fields: workingHoursFields,
//     append: appendWorkingHours,
//     remove: removeWorkingHours
//   } = useFieldArray({
//     control,
//     name: 'workingHours'
//   });

//   const {
//     fields: durationFields,
//     append: appendDuration,
//     remove: removeDuration
//   } = useFieldArray({
//     control,
//     name: 'durationEstimates'
//   });

//   const {
//     fields: permissionFields,
//     append: appendPermission,
//     remove: removePermission
//   } = useFieldArray({
//     control,
//     name: 'permissions'
//   });

//   const watchPassword = watch('password');

//   const onSubmit = async (data) => {
//     setLoading(true);
//     clearErrors();

//     try {
//       let endpoint;
//       let payload;

//       switch (data.role) {
//         case 'patient':
//           endpoint = '/auth/register/patient';
//           payload = {
//             name: data.name,
//             email: data.email,
//             phone: data.phone,
//             password: data.password,
//             gender: data.gender,
//             dateOfBirth: data.dateOfBirth
//           };
//           break;
        
//         case 'practitioner':
//           endpoint = '/auth/register/practitioner';
//           payload = {
//             name: data.name,
//             email: data.email,
//             phone: data.phone,
//             password: data.password,
//             specialization: data.specialization.filter(s => s.therapyType), // Remove empty entries
//             experienceYears: parseInt(data.experienceYears),
//             qualifications: data.qualifications.filter(q => q.degree), // Remove empty entries
//             workingHours: data.workingHours.filter(w => w.dayOfWeek), // Remove empty entries
//             maxPatientsPerDay: parseInt(data.maxPatientsPerDay) || 10,
//             durationEstimates: Object.fromEntries(
//               data.durationEstimates
//                 .filter(d => d.therapyType && d.duration)
//                 .map(d => [d.therapyType, parseInt(d.duration)])
//             ),
//             centerId: data.centerId,
//             bio: data.bio,
//             languages: data.languages
//           };
//           break;
        
//         case 'admin':
//           endpoint = '/auth/register/admin';
//           payload = {
//             name: data.name,
//             username: data.username,
//             email: data.email,
//             password: data.password,
//             centerId: data.centerId,
//             permissions: data.permissions.filter(p => p.module), // Remove empty entries
//             contactNumber: data.contactNumber,
//             profileImage: data.profileImage
//           };
//           break;
        
//         default:
//           throw new Error('Invalid role selected');
//       }

//       const response = await api.post(endpoint, payload);
      
//       if (response.data.success) {
//         // Registration successful
//         switchToLogin();
//       }
//     } catch (err) {
//       setError('root', {
//         type: 'manual',
//         message: err.response?.data?.message || 'Registration failed. Please try again.'
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleRoleChange = (e) => {
//     setSelectedRole(e.target.value);
//   };

//   const actionOptions = ['create', 'read', 'update', 'delete'];
//   const moduleOptions = ['patients', 'practitioners', 'sessions', 'centers', 'appointments'];
//   const dayOptions = [
//     { value: 0, label: 'Sunday' },
//     { value: 1, label: 'Monday' },
//     { value: 2, label: 'Tuesday' },
//     { value: 3, label: 'Wednesday' },
//     { value: 4, label: 'Thursday' },
//     { value: 5, label: 'Friday' },
//     { value: 6, label: 'Saturday' }
//   ];

//   return (
//     <div className="fade-in">
//       <div className="text-center mb-8">
//         <h2 className="text-2xl font-bold text-gray-800">Create Account</h2>
//         <p className="mt-2 text-sm text-gray-600">
//           Join our wellness community and start your healing journey
//         </p>
//       </div>

//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
//         {/* Role Selection */}
//         <div>
//           <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
//             I want to register as
//           </label>
//           <select
//             {...register('role', { required: 'Role is required' })}
//             onChange={handleRoleChange}
//             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors appearance-none bg-white"
//           >
//             <option value="patient">Patient</option>
//             <option value="practitioner">Practitioner</option>
//             <option value="admin">Admin</option>
//           </select>
//           {errors.role && (
//             <p className="mt-1 text-sm text-red-600">{errors.role.message}</p>
//           )}
//         </div>

//         {/* Common Fields */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div>
//             <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
//               Full Name *
//             </label>
//             <input
//               {...register('name', { required: 'Name is required' })}
//               type="text"
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
//               placeholder="Enter your full name"
//             />
//             {errors.name && (
//               <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
//             )}
//           </div>

//           <div>
//             <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
//               Email Address *
//             </label>
//             <input
//               {...register('email', {
//                 required: 'Email is required',
//                 pattern: {
//                   value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
//                   message: 'Please enter a valid email address'
//                 }
//               })}
//               type="email"
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
//               placeholder="Enter your email"
//             />
//             {errors.email && (
//               <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
//             )}
//           </div>
//         </div>

//         {/* Phone Number (Patient & Practitioner) */}
//         {(selectedRole === 'patient' || selectedRole === 'practitioner') && (
//           <div>
//             <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
//               Phone Number *
//             </label>
//             <input
//               {...register('phone', {
//                 required: 'Phone number is required',
//                 pattern: {
//                   value: /^\+?[\d\s-]+$/,
//                   message: 'Please enter a valid phone number'
//                 }
//               })}
//               type="tel"
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
//               placeholder="Enter your phone number (e.g., +919876543210)"
//             />
//             {errors.phone && (
//               <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
//             )}
//           </div>
//         )}

//         {/* Patient Specific Fields */}
//         {selectedRole === 'patient' && (
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-2">
//                 Gender *
//               </label>
//               <select
//                 {...register('gender', { required: 'Gender is required' })}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
//               >
//                 <option value="">Select Gender</option>
//                 <option value="male">Male</option>
//                 <option value="female">Female</option>
//                 <option value="other">Other</option>
//               </select>
//               {errors.gender && (
//                 <p className="mt-1 text-sm text-red-600">{errors.gender.message}</p>
//               )}
//             </div>

//             <div>
//               <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 mb-2">
//                 Date of Birth *
//               </label>
//               <input
//                 {...register('dateOfBirth', { required: 'Date of birth is required' })}
//                 type="date"
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
//               />
//               {errors.dateOfBirth && (
//                 <p className="mt-1 text-sm text-red-600">{errors.dateOfBirth.message}</p>
//               )}
//             </div>
//           </div>
//         )}

//         {/* Practitioner Specific Fields */}
//         {selectedRole === 'practitioner' && (
//           <div className="space-y-6">
//             {/* Basic Info */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label htmlFor="experienceYears" className="block text-sm font-medium text-gray-700 mb-2">
//                   Total Years of Experience *
//                 </label>
//                 <input
//                   {...register('experienceYears', {
//                     required: 'Experience is required',
//                     min: { value: 0, message: 'Experience cannot be negative' }
//                   })}
//                   type="number"
//                   min="0"
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
//                   placeholder="Years of experience"
//                 />
//                 {errors.experienceYears && (
//                   <p className="mt-1 text-sm text-red-600">{errors.experienceYears.message}</p>
//                 )}
//               </div>

//               <div>
//                 <label htmlFor="maxPatientsPerDay" className="block text-sm font-medium text-gray-700 mb-2">
//                   Max Patients Per Day
//                 </label>
//                 <input
//                   {...register('maxPatientsPerDay', {
//                     min: { value: 1, message: 'Must be at least 1' }
//                   })}
//                   type="number"
//                   min="1"
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
//                   placeholder="Default: 10"
//                 />
//                 {errors.maxPatientsPerDay && (
//                   <p className="mt-1 text-sm text-red-600">{errors.maxPatientsPerDay.message}</p>
//                 )}
//               </div>
//             </div>

//             {/* Specializations */}
//             <div>
//               <div className="flex justify-between items-center mb-3">
//                 <label className="block text-sm font-medium text-gray-700">
//                   Specializations
//                 </label>
//                 <button
//                   type="button"
//                   onClick={() => appendSpecialization({ therapyType: '', yearsOfExperience: '', certification: '', hourlyRate: '' })}
//                   className="text-sm bg-green-100 text-green-700 px-3 py-1 rounded hover:bg-green-200 transition-colors"
//                 >
//                   + Add Specialization
//                 </button>
//               </div>
              
//               {specializationFields.map((field, index) => (
//                 <div key={field.id} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 p-4 border border-gray-200 rounded-lg">
//                   <div>
//                     <label className="block text-xs font-medium text-gray-600 mb-1">Therapy Type *</label>
//                     <input
//                       {...register(`specialization.${index}.therapyType`)}
//                       className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-green-500"
//                       placeholder="e.g., Abhyanga, Shirodhara"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-xs font-medium text-gray-600 mb-1">Years in this Therapy</label>
//                     <input
//                       {...register(`specialization.${index}.yearsOfExperience`)}
//                       type="number"
//                       min="0"
//                       className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-green-500"
//                       placeholder="Years"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-xs font-medium text-gray-600 mb-1">Certification</label>
//                     <input
//                       {...register(`specialization.${index}.certification`)}
//                       className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-green-500"
//                       placeholder="Certification name"
//                     />
//                   </div>
//                   <div className="flex items-end space-x-2">
//                     <div className="flex-1">
//                       <label className="block text-xs font-medium text-gray-600 mb-1">Hourly Rate (₹)</label>
//                       <input
//                         {...register(`specialization.${index}.hourlyRate`)}
//                         type="number"
//                         min="0"
//                         className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-green-500"
//                         placeholder="Rate"
//                       />
//                     </div>
//                     {index > 0 && (
//                       <button
//                         type="button"
//                         onClick={() => removeSpecialization(index)}
//                         className="text-red-600 hover:text-red-800 p-2"
//                       >
//                         <i className="fas fa-trash"></i>
//                       </button>
//                     )}
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* Qualifications */}
//             <div>
//               <div className="flex justify-between items-center mb-3">
//                 <label className="block text-sm font-medium text-gray-700">
//                   Qualifications
//                 </label>
//                 <button
//                   type="button"
//                   onClick={() => appendQualification({ degree: '', institution: '', year: '', certificateUrl: '' })}
//                   className="text-sm bg-green-100 text-green-700 px-3 py-1 rounded hover:bg-green-200 transition-colors"
//                 >
//                   + Add Qualification
//                 </button>
//               </div>
              
//               {qualificationFields.map((field, index) => (
//                 <div key={field.id} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 p-4 border border-gray-200 rounded-lg">
//                   <div>
//                     <label className="block text-xs font-medium text-gray-600 mb-1">Degree *</label>
//                     <input
//                       {...register(`qualifications.${index}.degree`)}
//                       className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-green-500"
//                       placeholder="e.g., MD (Ayurveda)"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-xs font-medium text-gray-600 mb-1">Institution *</label>
//                     <input
//                       {...register(`qualifications.${index}.institution`)}
//                       className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-green-500"
//                       placeholder="Institution name"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-xs font-medium text-gray-600 mb-1">Year</label>
//                     <input
//                       {...register(`qualifications.${index}.year`)}
//                       type="number"
//                       min="1900"
//                       max="2030"
//                       className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-green-500"
//                       placeholder="Graduation year"
//                     />
//                   </div>
//                   <div className="flex items-end space-x-2">
//                     <div className="flex-1">
//                       <label className="block text-xs font-medium text-gray-600 mb-1">Certificate URL</label>
//                       <input
//                         {...register(`qualifications.${index}.certificateUrl`)}
//                         className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-green-500"
//                         placeholder="https://..."
//                       />
//                     </div>
//                     {index > 0 && (
//                       <button
//                         type="button"
//                         onClick={() => removeQualification(index)}
//                         className="text-red-600 hover:text-red-800 p-2"
//                       >
//                         <i className="fas fa-trash"></i>
//                       </button>
//                     )}
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* Working Hours */}
//             <div>
//               <div className="flex justify-between items-center mb-3">
//                 <label className="block text-sm font-medium text-gray-700">
//                   Working Hours
//                 </label>
//                 <button
//                   type="button"
//                   onClick={() => appendWorkingHours({ dayOfWeek: '', startTime: '', endTime: '', isActive: true })}
//                   className="text-sm bg-green-100 text-green-700 px-3 py-1 rounded hover:bg-green-200 transition-colors"
//                 >
//                   + Add Schedule
//                 </button>
//               </div>
              
//               {workingHoursFields.map((field, index) => (
//                 <div key={field.id} className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-4 p-4 border border-gray-200 rounded-lg">
//                   <div>
//                     <label className="block text-xs font-medium text-gray-600 mb-1">Day *</label>
//                     <select
//                       {...register(`workingHours.${index}.dayOfWeek`)}
//                       className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-green-500"
//                     >
//                       <option value="">Select Day</option>
//                       {dayOptions.map(day => (
//                         <option key={day.value} value={day.value}>{day.label}</option>
//                       ))}
//                     </select>
//                   </div>
//                   <div>
//                     <label className="block text-xs font-medium text-gray-600 mb-1">Start Time *</label>
//                     <input
//                       {...register(`workingHours.${index}.startTime`)}
//                       type="time"
//                       className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-green-500"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-xs font-medium text-gray-600 mb-1">End Time *</label>
//                     <input
//                       {...register(`workingHours.${index}.endTime`)}
//                       type="time"
//                       className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-green-500"
//                     />
//                   </div>
//                   <div className="flex items-end space-x-2">
//                     <div className="flex items-center">
//                       <input
//                         {...register(`workingHours.${index}.isActive`)}
//                         type="checkbox"
//                         className="mr-2"
//                         defaultChecked
//                       />
//                       <label className="text-xs text-gray-600">Active</label>
//                     </div>
//                     {index > 0 && (
//                       <button
//                         type="button"
//                         onClick={() => removeWorkingHours(index)}
//                         className="text-red-600 hover:text-red-800 p-2"
//                       >
//                         <i className="fas fa-trash"></i>
//                       </button>
//                     )}
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* Duration Estimates */}
//             <div>
//               <div className="flex justify-between items-center mb-3">
//                 <label className="block text-sm font-medium text-gray-700">
//                   Therapy Duration Estimates (minutes)
//                 </label>
//                 <button
//                   type="button"
//                   onClick={() => appendDuration({ therapyType: '', duration: '' })}
//                   className="text-sm bg-green-100 text-green-700 px-3 py-1 rounded hover:bg-green-200 transition-colors"
//                 >
//                   + Add Duration
//                 </button>
//               </div>
              
//               {durationFields.map((field, index) => (
//                 <div key={field.id} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 p-4 border border-gray-200 rounded-lg">
//                   <div>
//                     <label className="block text-xs font-medium text-gray-600 mb-1">Therapy Type *</label>
//                     <input
//                       {...register(`durationEstimates.${index}.therapyType`)}
//                       className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-green-500"
//                       placeholder="e.g., Abhyanga, Shirodhara"
//                     />
//                   </div>
//                   <div className="flex items-end space-x-2">
//                     <div className="flex-1">
//                       <label className="block text-xs font-medium text-gray-600 mb-1">Duration (minutes) *</label>
//                       <input
//                         {...register(`durationEstimates.${index}.duration`)}
//                         type="number"
//                         min="1"
//                         className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-green-500"
//                         placeholder="Duration in minutes"
//                       />
//                     </div>
//                     {index > 0 && (
//                       <button
//                         type="button"
//                         onClick={() => removeDuration(index)}
//                         className="text-red-600 hover:text-red-800 p-2"
//                       >
//                         <i className="fas fa-trash"></i>
//                       </button>
//                     )}
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* Additional Info */}
//             <div className="grid grid-cols-1 gap-4">
//               <div>
//                 <label htmlFor="centerId" className="block text-sm font-medium text-gray-700 mb-2">
//                   Center ID *
//                 </label>
//                 <input
//                   {...register('centerId', { required: 'Center ID is required' })}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
//                   placeholder="Enter center ID"
//                 />
//                 {errors.centerId && (
//                   <p className="mt-1 text-sm text-red-600">{errors.centerId.message}</p>
//                 )}
//               </div>

//               <div>
//                 <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-2">
//                   Bio
//                 </label>
//                 <textarea
//                   {...register('bio')}
//                   rows="3"
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
//                   placeholder="Tell us about your experience and approach..."
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Languages
//                 </label>
//                 <div className="flex flex-wrap gap-2">
//                   {['English', 'Hindi', 'Malayalam', 'Tamil', 'Telugu', 'Kannada', 'Marathi', 'Gujarati'].map(lang => (
//                     <label key={lang} className="flex items-center space-x-2">
//                       <input
//                         type="checkbox"
//                         value={lang}
//                         {...register('languages')}
//                         className="rounded text-green-600 focus:ring-green-500"
//                       />
//                       <span className="text-sm text-gray-700">{lang}</span>
//                     </label>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Admin Specific Fields */}
//         {selectedRole === 'admin' && (
//           <div className="space-y-6">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
//                   Username *
//                 </label>
//                 <input
//                   {...register('username', { required: 'Username is required' })}
//                   type="text"
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
//                   placeholder="Choose a username"
//                 />
//                 {errors.username && (
//                   <p className="mt-1 text-sm text-red-600">{errors.username.message}</p>
//                 )}
//               </div>

//               <div>
//                 <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-700 mb-2">
//                   Contact Number
//                 </label>
//                 <input
//                   {...register('contactNumber')}
//                   type="tel"
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
//                   placeholder="Contact number"
//                 />
//               </div>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label htmlFor="centerId" className="block text-sm font-medium text-gray-700 mb-2">
//                   Center ID *
//                 </label>
//                 <input
//                   {...register('centerId', { required: 'Center ID is required' })}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
//                   placeholder="Enter center ID"
//                 />
//                 {errors.centerId && (
//                   <p className="mt-1 text-sm text-red-600">{errors.centerId.message}</p>
//                 )}
//               </div>
//             </div>

//             {/* Profile Image */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label htmlFor="profileImage.url" className="block text-sm font-medium text-gray-700 mb-2">
//                   Profile Image URL
//                 </label>
//                 <input
//                   {...register('profileImage.url')}
//                   type="url"
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
//                   placeholder="https://example.com/image.jpg"
//                 />
//               </div>
//               <div>
//                 <label htmlFor="profileImage.publicId" className="block text-sm font-medium text-gray-700 mb-2">
//                   Image Public ID
//                 </label>
//                 <input
//                   {...register('profileImage.publicId')}
//                   type="text"
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
//                   placeholder="image_public_id"
//                 />
//               </div>
//             </div>

//             {/* Permissions */}
//             <div>
//               <div className="flex justify-between items-center mb-3">
//                 <label className="block text-sm font-medium text-gray-700">
//                   Permissions
//                 </label>
//                 <button
//                   type="button"
//                   onClick={() => appendPermission({ module: '', actions: [] })}
//                   className="text-sm bg-green-100 text-green-700 px-3 py-1 rounded hover:bg-green-200 transition-colors"
//                 >
//                   + Add Permission
//                 </button>
//               </div>
              
//               {permissionFields.map((field, index) => (
//                 <div key={field.id} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 p-4 border border-gray-200 rounded-lg">
//                   <div>
//                     <label className="block text-xs font-medium text-gray-600 mb-1">Module *</label>
//                     <select
//                       {...register(`permissions.${index}.module`)}
//                       className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-green-500"
//                     >
//                       <option value="">Select Module</option>
//                       {moduleOptions.map(module => (
//                         <option key={module} value={module}>{module}</option>
//                       ))}
//                     </select>
//                   </div>
//                   <div className="flex items-end space-x-2">
//                     <div className="flex-1">
//                       <label className="block text-xs font-medium text-gray-600 mb-1">Actions</label>
//                       <div className="flex flex-wrap gap-2">
//                         {actionOptions.map(action => (
//                           <label key={action} className="flex items-center space-x-1">
//                             <input
//                               type="checkbox"
//                               value={action}
//                               {...register(`permissions.${index}.actions`)}
//                               className="rounded text-green-600 focus:ring-green-500"
//                             />
//                             <span className="text-xs text-gray-700 capitalize">{action}</span>
//                           </label>
//                         ))}
//                       </div>
//                     </div>
//                     {index > 0 && (
//                       <button
//                         type="button"
//                         onClick={() => removePermission(index)}
//                         className="text-red-600 hover:text-red-800 p-2"
//                       >
//                         <i className="fas fa-trash"></i>
//                       </button>
//                     )}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Password Fields */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div>
//             <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
//               Password *
//             </label>
//             <input
//               {...register('password', {
//                 required: 'Password is required',
//                 minLength: {
//                   value: 6,
//                   message: 'Password must be at least 6 characters'
//                 }
//               })}
//               type="password"
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
//               placeholder="Create a password"
//             />
//             {errors.password && (
//               <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
//             )}
//           </div>

//           <div>
//             <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
//               Confirm Password *
//             </label>
//             <input
//               {...register('confirmPassword', {
//                 required: 'Please confirm your password',
//                 validate: value =>
//                   value === watchPassword || 'Passwords do not match'
//               })}
//               type="password"
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
//               placeholder="Confirm your password"
//             />
//             {errors.confirmPassword && (
//               <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
//             )}
//           </div>
//         </div>

//         {/* Root Error */}
//         {errors.root && (
//           <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center">
//             <i className="fas fa-exclamation-circle mr-2"></i>
//             <span className="text-sm">{errors.root.message}</span>
//           </div>
//         )}

//         {/* Submit Button */}
//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
//         >
//           {loading ? (
//             <div className="flex items-center justify-center">
//               <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
//               Creating Account...
//             </div>
//           ) : (
//             'Create Account'
//           )}
//         </button>

//         {/* Switch to Login */}
//         <div className="text-center">
//           <p className="text-sm text-gray-600">
//             Already have an account?{' '}
//             <button
//               type="button"
//               onClick={switchToLogin}
//               className="text-green-600 hover:text-green-500 font-medium transition-colors"
//             >
//               Sign in
//             </button>
//           </p>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default Signup;

import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import api from '../../utils/axios';
import { useAuth } from '../../utils/authContext';
import { useNavigate } from 'react-router-dom';

const Signup = ({ switchToLogin }) => {
  const [loading, setLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState('patient');
  const { autoLogin } = useAuth();
  const navigate = useNavigate();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
    watch,
    control
  } = useForm({
    defaultValues: {
      role: 'patient',
      name: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      gender: '',
      dateOfBirth: '',
      
      // Practitioner specific
      specialization: [{ therapyType: '', yearsOfExperience: '', certification: '', hourlyRate: '' }],
      experienceYears: '',
      qualifications: [{ degree: '', institution: '', year: '', certificateUrl: '' }],
      workingHours: [{ dayOfWeek: '', startTime: '', endTime: '', isActive: true }],
      maxPatientsPerDay: '',
      durationEstimates: [{ therapyType: '', duration: '' }],
      centerId: '',
      bio: '',
      languages: ['English', 'Hindi'],
      
      // Admin specific
      permissions: [{ module: '', actions: [] }],
      contactNumber: ''
    }
  });

  // Field arrays for dynamic forms
  const {
    fields: specializationFields,
    append: appendSpecialization,
    remove: removeSpecialization
  } = useFieldArray({
    control,
    name: 'specialization'
  });

  const {
    fields: qualificationFields,
    append: appendQualification,
    remove: removeQualification
  } = useFieldArray({
    control,
    name: 'qualifications'
  });

  const {
    fields: workingHoursFields,
    append: appendWorkingHours,
    remove: removeWorkingHours
  } = useFieldArray({
    control,
    name: 'workingHours'
  });

  const {
    fields: durationFields,
    append: appendDuration,
    remove: removeDuration
  } = useFieldArray({
    control,
    name: 'durationEstimates'
  });

  const {
    fields: permissionFields,
    append: appendPermission,
    remove: removePermission
  } = useFieldArray({
    control,
    name: 'permissions'
  });

  const watchPassword = watch('password');

  const onSubmit = async (data) => {
    setLoading(true);
    clearErrors();

    try {
      let endpoint;
      let payload;

      switch (data.role) {
        case 'patient':
          endpoint = '/auth/register/patient';
          payload = {
            name: data.name,
            email: data.email,
            phone: data.phone,
            password: data.password,
            gender: data.gender,
            dateOfBirth: data.dateOfBirth
          };
          break;
        
        case 'practitioner':
          endpoint = '/auth/register/practitioner';
          payload = {
            name: data.name,
            email: data.email,
            phone: data.phone,
            password: data.password,
            specialization: data.specialization.filter(s => s.therapyType), // Remove empty entries
            experienceYears: parseInt(data.experienceYears),
            qualifications: data.qualifications.filter(q => q.degree), // Remove empty entries
            workingHours: data.workingHours.filter(w => w.dayOfWeek), // Remove empty entries
            maxPatientsPerDay: parseInt(data.maxPatientsPerDay) || 10,
            durationEstimates: Object.fromEntries(
              data.durationEstimates
                .filter(d => d.therapyType && d.duration)
                .map(d => [d.therapyType, parseInt(d.duration)])
            ),
            centerId: data.centerId,
            bio: data.bio,
            languages: data.languages
          };
          break;
        
        case 'admin':
          endpoint = '/auth/register/admin';
          payload = {
            name: data.name,
            email: data.email,
            password: data.password,
            centerId: data.centerId || null,
            permissions: data.permissions.filter(p => p.module), // Remove empty entries
            contactNumber: data.contactNumber
          };
          break;
        
        default:
          throw new Error('Invalid role selected');
      }

      const response = await api.post(endpoint, payload);
      
      if (response.data.success) {
        // Auto-login after successful registration
        const userData = response.data.data.user;
        autoLogin(userData);
        
        
            navigate('/dashboard');
        
      }
    } catch (err) {
      setError('root', {
        type: 'manual',
        message: err.response?.data?.message || 'Registration failed. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };


  const handleRoleChange = (e) => {
    setSelectedRole(e.target.value);
  };

  const actionOptions = ['create', 'read', 'update', 'delete'];
  const moduleOptions = ['patients', 'practitioners', 'sessions', 'centers', 'appointments'];
  const dayOptions = [
    { value: 0, label: 'Sunday' },
    { value: 1, label: 'Monday' },
    { value: 2, label: 'Tuesday' },
    { value: 3, label: 'Wednesday' },
    { value: 4, label: 'Thursday' },
    { value: 5, label: 'Friday' },
    { value: 6, label: 'Saturday' }
  ];

  return (
    <div className="fade-in">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Create Account</h2>
        <p className="mt-2 text-sm text-gray-600">
          Join our wellness community and start your healing journey
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Role Selection */}
        <div>
          <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
            I want to register as
          </label>
          <select
            {...register('role', { required: 'Role is required' })}
            onChange={handleRoleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors appearance-none bg-white"
          >
            <option value="patient">Patient</option>
            <option value="practitioner">Practitioner</option>
            <option value="admin">Admin</option>
          </select>
          {errors.role && (
            <p className="mt-1 text-sm text-red-600">{errors.role.message}</p>
          )}
        </div>

        {/* Common Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Full Name *
            </label>
            <input
              {...register('name', { required: 'Name is required' })}
              type="text"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
              placeholder="Enter your full name"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address *
            </label>
            <input
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                  message: 'Please enter a valid email address'
                }
              })}
              type="email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>
        </div>

        {/* Phone Number (Patient & Practitioner) */}
        {(selectedRole === 'patient' || selectedRole === 'practitioner') && (
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number *
            </label>
            <input
              {...register('phone', {
                required: 'Phone number is required',
                pattern: {
                  value: /^\+?[\d\s-]+$/,
                  message: 'Please enter a valid phone number'
                }
              })}
              type="tel"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
              placeholder="Enter your phone number (e.g., +919876543210)"
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
            )}
          </div>
        )}

        {/* Patient Specific Fields */}
        {selectedRole === 'patient' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-2">
                Gender *
              </label>
              <select
                {...register('gender', { required: 'Gender is required' })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              {errors.gender && (
                <p className="mt-1 text-sm text-red-600">{errors.gender.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 mb-2">
                Date of Birth *
              </label>
              <input
                {...register('dateOfBirth', { required: 'Date of birth is required' })}
                type="date"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
              />
              {errors.dateOfBirth && (
                <p className="mt-1 text-sm text-red-600">{errors.dateOfBirth.message}</p>
              )}
            </div>
          </div>
        )}

        {/* Practitioner Specific Fields */}
        {selectedRole === 'practitioner' && (
          <div className="space-y-6">
            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="experienceYears" className="block text-sm font-medium text-gray-700 mb-2">
                  Total Years of Experience *
                </label>
                <input
                  {...register('experienceYears', {
                    required: 'Experience is required',
                    min: { value: 0, message: 'Experience cannot be negative' }
                  })}
                  type="number"
                  min="0"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                  placeholder="Years of experience"
                />
                {errors.experienceYears && (
                  <p className="mt-1 text-sm text-red-600">{errors.experienceYears.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="maxPatientsPerDay" className="block text-sm font-medium text-gray-700 mb-2">
                  Max Patients Per Day
                </label>
                <input
                  {...register('maxPatientsPerDay', {
                    min: { value: 1, message: 'Must be at least 1' }
                  })}
                  type="number"
                  min="1"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                  placeholder="Default: 10"
                />
                {errors.maxPatientsPerDay && (
                  <p className="mt-1 text-sm text-red-600">{errors.maxPatientsPerDay.message}</p>
                )}
              </div>
            </div>

            {/* Specializations */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="block text-sm font-medium text-gray-700">
                  Specializations
                </label>
                <button
                  type="button"
                  onClick={() => appendSpecialization({ therapyType: '', yearsOfExperience: '', certification: '', hourlyRate: '' })}
                  className="text-sm bg-green-100 text-green-700 px-3 py-1 rounded hover:bg-green-200 transition-colors"
                >
                  + Add Specialization
                </button>
              </div>
              
              {specializationFields.map((field, index) => (
                <div key={field.id} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 p-4 border border-gray-200 rounded-lg">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Therapy Type *</label>
                    <input
                      {...register(`specialization.${index}.therapyType`)}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="e.g., Abhyanga, Shirodhara"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Years in this Therapy</label>
                    <input
                      {...register(`specialization.${index}.yearsOfExperience`)}
                      type="number"
                      min="0"
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="Years"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Certification</label>
                    <input
                      {...register(`specialization.${index}.certification`)}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="Certification name"
                    />
                  </div>
                  <div className="flex items-end space-x-2">
                    <div className="flex-1">
                      <label className="block text-xs font-medium text-gray-600 mb-1">Hourly Rate (₹)</label>
                      <input
                        {...register(`specialization.${index}.hourlyRate`)}
                        type="number"
                        min="0"
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        placeholder="Rate"
                      />
                    </div>
                    {index > 0 && (
                      <button
                        type="button"
                        onClick={() => removeSpecialization(index)}
                        className="text-red-600 hover:text-red-800 p-2"
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Qualifications */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="block text-sm font-medium text-gray-700">
                  Qualifications
                </label>
                <button
                  type="button"
                  onClick={() => appendQualification({ degree: '', institution: '', year: '', certificateUrl: '' })}
                  className="text-sm bg-green-100 text-green-700 px-3 py-1 rounded hover:bg-green-200 transition-colors"
                >
                  + Add Qualification
                </button>
              </div>
              
              {qualificationFields.map((field, index) => (
                <div key={field.id} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 p-4 border border-gray-200 rounded-lg">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Degree *</label>
                    <input
                      {...register(`qualifications.${index}.degree`)}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="e.g., MD (Ayurveda)"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Institution *</label>
                    <input
                      {...register(`qualifications.${index}.institution`)}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="Institution name"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Year</label>
                    <input
                      {...register(`qualifications.${index}.year`)}
                      type="number"
                      min="1900"
                      max="2030"
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="Graduation year"
                    />
                  </div>
                  <div className="flex items-end space-x-2">
                    <div className="flex-1">
                      <label className="block text-xs font-medium text-gray-600 mb-1">Certificate URL</label>
                      <input
                        {...register(`qualifications.${index}.certificateUrl`)}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        placeholder="https://..."
                      />
                    </div>
                    {index > 0 && (
                      <button
                        type="button"
                        onClick={() => removeQualification(index)}
                        className="text-red-600 hover:text-red-800 p-2"
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Working Hours */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="block text-sm font-medium text-gray-700">
                  Working Hours
                </label>
                <button
                  type="button"
                  onClick={() => appendWorkingHours({ dayOfWeek: '', startTime: '', endTime: '', isActive: true })}
                  className="text-sm bg-green-100 text-green-700 px-3 py-1 rounded hover:bg-green-200 transition-colors"
                >
                  + Add Schedule
                </button>
              </div>
              
              {workingHoursFields.map((field, index) => (
                <div key={field.id} className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-4 p-4 border border-gray-200 rounded-lg">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Day *</label>
                    <select
                      {...register(`workingHours.${index}.dayOfWeek`)}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    >
                      <option value="">Select Day</option>
                      {dayOptions.map(day => (
                        <option key={day.value} value={day.value}>{day.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Start Time *</label>
                    <input
                      {...register(`workingHours.${index}.startTime`)}
                      type="time"
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">End Time *</label>
                    <input
                      {...register(`workingHours.${index}.endTime`)}
                      type="time"
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                  <div className="flex items-end space-x-2">
                    <div className="flex items-center">
                      <input
                        {...register(`workingHours.${index}.isActive`)}
                        type="checkbox"
                        className="mr-2"
                        defaultChecked
                      />
                      <label className="text-xs text-gray-600">Active</label>
                    </div>
                    {index > 0 && (
                      <button
                        type="button"
                        onClick={() => removeWorkingHours(index)}
                        className="text-red-600 hover:text-red-800 p-2"
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Duration Estimates */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="block text-sm font-medium text-gray-700">
                  Therapy Duration Estimates (minutes)
                </label>
                <button
                  type="button"
                  onClick={() => appendDuration({ therapyType: '', duration: '' })}
                  className="text-sm bg-green-100 text-green-700 px-3 py-1 rounded hover:bg-green-200 transition-colors"
                >
                  + Add Duration
                </button>
              </div>
              
              {durationFields.map((field, index) => (
                <div key={field.id} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 p-4 border border-gray-200 rounded-lg">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Therapy Type *</label>
                    <input
                      {...register(`durationEstimates.${index}.therapyType`)}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="e.g., Abhyanga, Shirodhara"
                    />
                  </div>
                  <div className="flex items-end space-x-2">
                    <div className="flex-1">
                      <label className="block text-xs font-medium text-gray-600 mb-1">Duration (minutes) *</label>
                      <input
                        {...register(`durationEstimates.${index}.duration`)}
                        type="number"
                        min="1"
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        placeholder="Duration in minutes"
                      />
                    </div>
                    {index > 0 && (
                      <button
                        type="button"
                        onClick={() => removeDuration(index)}
                        className="text-red-600 hover:text-red-800 p-2"
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Additional Info */}
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label htmlFor="centerId" className="block text-sm font-medium text-gray-700 mb-2">
                  Center ID *
                </label>
                <input
                  {...register('centerId', { required: 'Center ID is required' })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                  placeholder="Enter center ID"
                />
                {errors.centerId && (
                  <p className="mt-1 text-sm text-red-600">{errors.centerId.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-2">
                  Bio
                </label>
                <textarea
                  {...register('bio')}
                  rows="3"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                  placeholder="Tell us about your experience and approach..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Languages
                </label>
                <div className="flex flex-wrap gap-2">
                  {['English', 'Hindi', 'Malayalam', 'Tamil', 'Telugu', 'Kannada', 'Marathi', 'Gujarati'].map(lang => (
                    <label key={lang} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        value={lang}
                        {...register('languages')}
                        className="rounded text-green-600 focus:ring-green-500"
                      />
                      <span className="text-sm text-gray-700">{lang}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Admin Specific Fields */}
        {selectedRole === 'admin' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-700 mb-2">
                  Contact Number
                </label>
                <input
                  {...register('contactNumber')}
                  type="tel"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                  placeholder="Contact number"
                />
              </div>

              <div>
                <label htmlFor="centerId" className="block text-sm font-medium text-gray-700 mb-2">
                  Center ID (Optional)
                </label>
                <input
                  {...register('centerId')}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                  placeholder="Enter center ID (optional)"
                />
              </div>
            </div>

            {/* Permissions */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="block text-sm font-medium text-gray-700">
                  Permissions
                </label>
                <button
                  type="button"
                  onClick={() => appendPermission({ module: '', actions: [] })}
                  className="text-sm bg-green-100 text-green-700 px-3 py-1 rounded hover:bg-green-200 transition-colors"
                >
                  + Add Permission
                </button>
              </div>
              
              {permissionFields.map((field, index) => (
                <div key={field.id} className="mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="text-sm font-medium text-gray-700">Permission #{index + 1}</h4>
                    {index > 0 && (
                      <button
                        type="button"
                        onClick={() => removePermission(index)}
                        className="text-red-600 hover:text-red-800 text-sm"
                      >
                        <i className="fas fa-trash mr-1"></i>
                        Remove
                      </button>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Module Selection */}
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Module *</label>
                      <select
                        {...register(`permissions.${index}.module`, { 
                          required: 'Module is required' 
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      >
                        <option value="">Select Module</option>
                        {moduleOptions.map(module => (
                          <option key={module} value={module}>{module}</option>
                        ))}
                      </select>
                      {errors.permissions?.[index]?.module && (
                        <p className="mt-1 text-xs text-red-600">{errors.permissions[index].module.message}</p>
                      )}
                    </div>

                    {/* Actions Selection */}
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Actions *</label>
                      <div className="flex flex-wrap gap-3">
                        {actionOptions.map(action => (
                          <label key={action} className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              value={action}
                              {...register(`permissions.${index}.actions`, {
                                validate: value => value.length > 0 || 'At least one action is required'
                              })}
                              className="rounded text-green-600 focus:ring-green-500"
                            />
                            <span className="text-sm text-gray-700 capitalize">{action}</span>
                          </label>
                        ))}
                      </div>
                      {errors.permissions?.[index]?.actions && (
                        <p className="mt-1 text-xs text-red-600">{errors.permissions[index].actions.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Selected Actions Preview */}
                  <div className="mt-3">
                    <label className="block text-xs font-medium text-gray-600 mb-1">Selected Actions:</label>
                    <div className="flex flex-wrap gap-1">
                      {watch(`permissions.${index}.actions`)?.map((action, actionIndex) => (
                        <span
                          key={actionIndex}
                          className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800"
                        >
                          {action}
                        </span>
                      ))}
                      {(!watch(`permissions.${index}.actions`) || watch(`permissions.${index}.actions`).length === 0) && (
                        <span className="text-xs text-gray-500 italic">No actions selected</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Password Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password *
            </label>
            <input
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters'
                }
              })}
              type="password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
              placeholder="Create a password"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
              Confirm Password *
            </label>
            <input
              {...register('confirmPassword', {
                required: 'Please confirm your password',
                validate: value =>
                  value === watchPassword || 'Passwords do not match'
              })}
              type="password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
              placeholder="Confirm your password"
            />
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
            )}
          </div>
        </div>

        {/* Root Error */}
        {errors.root && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center">
            <i className="fas fa-exclamation-circle mr-2"></i>
            <span className="text-sm">{errors.root.message}</span>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Creating Account...
            </div>
          ) : (
            'Create Account'
          )}
        </button>

        {/* Switch to Login */}
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <button
              type="button"
              onClick={switchToLogin}
              className="text-green-600 hover:text-green-500 font-medium transition-colors"
            >
              Sign in
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Signup;

