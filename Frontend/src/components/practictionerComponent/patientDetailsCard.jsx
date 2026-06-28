// // import React, { useState, useEffect } from 'react';
// // import api from '../../utils/axios';

// // const PatientCard = () => {
// //   const [patients, setPatients] = useState([]);
// //   const [selectedPatient, setSelectedPatient] = useState(null);
// //   const [patientDetails, setPatientDetails] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [detailsLoading, setDetailsLoading] = useState(false);

// //   useEffect(() => {
// //     fetchPatients();
// //   }, []);

// //   const fetchPatients = async () => {
// //     try {
// //       const response = await api.get('/practitioner/patients');
// //       setPatients(response.data.data.patients);
// //     } catch (error) {
// //       console.error('Error fetching patients:', error);
// //       alert('Failed to fetch patients');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const fetchPatientDetails = async (patientId) => {
// //     setDetailsLoading(true);
// //     try {
// //       const response = await api.get(`/practitioner/patients/${patientId}`);
// //       setPatientDetails(response.data.data);
// //     } catch (error) {
// //       console.error('Error fetching patient details:', error);
// //       alert('Failed to fetch patient details');
// //     } finally {
// //       setDetailsLoading(false);
// //     }
// //   };

// //   const handlePatientClick = (patient) => {
// //     setSelectedPatient(patient);
// //     fetchPatientDetails(patient._id);
// //   };

// //   const calculateAge = (dateOfBirth) => {
// //     if (!dateOfBirth) return 'N/A';
// //     const today = new Date();
// //     const birthDate = new Date(dateOfBirth);
// //     let age = today.getFullYear() - birthDate.getFullYear();
// //     const monthDiff = today.getMonth() - birthDate.getMonth();
// //     if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
// //       age--;
// //     }
// //     return age;
// //   };

// //   if (loading) return <div className="text-center py-8">Loading patients...</div>;

// //   return (
// //     <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
// //       {/* Patient List */}
// //       <div className="lg:col-span-1">
// //         <div className="bg-white rounded-lg shadow-lg p-6">
// //           <h2 className="text-xl font-bold text-gray-800 mb-4">Assigned Patients</h2>
// //           <div className="space-y-3">
// //             {patients.map((patient) => (
// //               <div
// //                 key={patient._id}
// //                 onClick={() => handlePatientClick(patient)}
// //                 className={`p-4 border rounded-lg cursor-pointer transition-colors ${
// //                   selectedPatient?._id === patient._id 
// //                     ? 'border-blue-500 bg-blue-50' 
// //                     : 'border-gray-200 hover:bg-gray-50'
// //                 }`}
// //               >
// //                 <h3 className="font-semibold text-gray-800">{patient.name}</h3>
// //                 <p className="text-sm text-gray-600">
// //                   {patient.gender || 'N/A'} • {calculateAge(patient.dateOfBirth)} yrs
// //                 </p>
// //                 <p className="text-sm text-gray-600">{patient.phone || 'No phone'}</p>
// //               </div>
// //             ))}
// //             {patients.length === 0 && (
// //               <p className="text-center text-gray-500 py-4">No patients assigned</p>
// //             )}
// //           </div>
// //         </div>
// //       </div>

// //       {/* Patient Details */}
// //       <div className="lg:col-span-2">
// //         {detailsLoading ? (
// //           <div className="bg-white rounded-lg shadow-lg p-6 text-center">
// //             <p>Loading patient details...</p>
// //           </div>
// //         ) : patientDetails ? (
// //           <div className="bg-white rounded-lg shadow-lg p-6">
// //             <h2 className="text-xl font-bold text-gray-800 mb-6">
// //               Patient Details - {patientDetails.name}
// //             </h2>
            
// //             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //               <div>
// //                 <h3 className="text-lg font-semibold text-gray-700 mb-4">Personal Information</h3>
// //                 <div className="space-y-3">
// //                   <div>
// //                     <label className="block text-sm font-medium text-gray-600">Full Name</label>
// //                     <p className="text-gray-900">{patientDetails.name}</p>
// //                   </div>
// //                   <div>
// //                     <label className="block text-sm font-medium text-gray-600">Email</label>
// //                     <p className="text-gray-900">{patientDetails.email || 'N/A'}</p>
// //                   </div>
// //                   <div>
// //                     <label className="block text-sm font-medium text-gray-600">Phone</label>
// //                     <p className="text-gray-900">{patientDetails.phone || 'N/A'}</p>
// //                   </div>
// //                   <div>
// //                     <label className="block text-sm font-medium text-gray-600">Gender</label>
// //                     <p className="text-gray-900">{patientDetails.gender || 'N/A'}</p>
// //                   </div>
// //                   <div>
// //                     <label className="block text-sm font-medium text-gray-600">Date of Birth</label>
// //                     <p className="text-gray-900">
// //                       {patientDetails.dateOfBirth 
// //                         ? new Date(patientDetails.dateOfBirth).toLocaleDateString() 
// //                         : 'N/A'
// //                       }
// //                     </p>
// //                   </div>
// //                 </div>
// //               </div>

// //               <div>
// //                 <h3 className="text-lg font-semibold text-gray-700 mb-4">Medical Information</h3>
// //                 <div className="space-y-3">
// //                   <div>
// //                     <label className="block text-sm font-medium text-gray-600">Medical History</label>
// //                     <p className="text-gray-900">
// //                       {patientDetails.medicalHistory?.condition || 'No condition specified'}
// //                     </p>
// //                   </div>
// //                   <div>
// //                     <label className="block text-sm font-medium text-gray-600">Therapy Preferences</label>
// //                     <div className="mt-1">
// //                       {patientDetails.therapyPreferences?.length > 0 ? (
// //                         patientDetails.therapyPreferences.map((pref, index) => (
// //                           <span key={index} className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm mr-2 mb-2 inline-block">
// //                             {pref}
// //                           </span>
// //                         ))
// //                       ) : (
// //                         <p className="text-gray-500">No preferences specified</p>
// //                       )}
// //                     </div>
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         ) : (
// //           <div className="bg-white rounded-lg shadow-lg p-6 text-center">
// //             <p className="text-gray-500">Select a patient to view details</p>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default PatientCard;

// import React, { useState, useEffect } from 'react';
// import api from '../../utils/axios';

// const PatientCard = () => {
//   const [patients, setPatients] = useState([]);
//   const [selectedPatient, setSelectedPatient] = useState(null);
//   const [patientDetails, setPatientDetails] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [detailsLoading, setDetailsLoading] = useState(false);

//   useEffect(() => {
//     fetchPatients();
//   }, []);

//   const fetchPatients = async () => {
//     try {
//       const response = await api.get('/practitioner/patients');
//       setPatients(response.data.data.patients);
//     } catch (error) {
//       console.error('Error fetching patients:', error);
//       alert('Failed to fetch patients');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchPatientDetails = async (patientId) => {
//     setDetailsLoading(true);
//     try {
//       const response = await api.get(`/practitioner/patients/${patientId}`);
//       setPatientDetails(response.data.data);
//     } catch (error) {
//       console.error('Error fetching patient details:', error);
//       alert('Failed to fetch patient details');
//     } finally {
//       setDetailsLoading(false);
//     }
//   };

//   const handlePatientClick = (patient) => {
//     setSelectedPatient(patient);
//     fetchPatientDetails(patient._id);
//   };

//   const calculateAge = (dateOfBirth) => {
//     if (!dateOfBirth) return 'N/A';
//     const today = new Date();
//     const birthDate = new Date(dateOfBirth);
//     let age = today.getFullYear() - birthDate.getFullYear();
//     const monthDiff = today.getMonth() - birthDate.getMonth();
//     if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
//       age--;
//     }
//     return age;
//   };

//   if (loading) {
//     return (
//       <div className="bg-white rounded-2xl shadow-lg p-6">
//         <div className="flex items-center justify-center py-8">
//           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
//           <span className="ml-3 text-gray-600">Loading patients...</span>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//       {/* Patient List */}
//       <div className="lg:col-span-1">
//         <div className="bg-white rounded-2xl shadow-lg p-6 border border-green-100">
//           <div className="flex items-center justify-between mb-6">
//             <h2 className="text-xl font-bold text-gray-800">Assigned Patients</h2>
//             <div className="flex items-center space-x-2 bg-green-100 text-green-800 px-3 py-1 rounded-full">
//               <i className="fas fa-users text-sm"></i>
//               <span className="text-sm font-medium">{patients.length}</span>
//             </div>
//           </div>
          
//           <div className="space-y-3">
//             {patients.map((patient) => (
//               <div
//                 key={patient._id}
//                 onClick={() => handlePatientClick(patient)}
//                 className={`p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
//                   selectedPatient?._id === patient._id 
//                     ? 'border-green-500 bg-green-50 shadow-md' 
//                     : 'border-green-100 hover:border-green-300 hover:bg-green-50'
//                 }`}
//               >
//                 <div className="flex items-center space-x-3">
//                   <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
//                     <i className="fas fa-user text-green-600"></i>
//                   </div>
//                   <div className="flex-1">
//                     <h3 className="font-semibold text-gray-800">{patient.name}</h3>
//                     <div className="flex items-center space-x-2 text-sm text-gray-600">
//                       <span className="flex items-center space-x-1">
//                         <i className="fas fa-venus-mars text-xs"></i>
//                         <span>{patient.gender || 'N/A'}</span>
//                       </span>
//                       <span>•</span>
//                       <span className="flex items-center space-x-1">
//                         <i className="fas fa-birthday-cake text-xs"></i>
//                         <span>{calculateAge(patient.dateOfBirth)} yrs</span>
//                       </span>
//                     </div>
//                     {patient.phone && (
//                       <div className="flex items-center space-x-1 text-sm text-gray-600 mt-1">
//                         <i className="fas fa-phone text-xs"></i>
//                         <span>{patient.phone}</span>
//                       </div>
//                     )}
//                   </div>
//                   {selectedPatient?._id === patient._id && (
//                     <i className="fas fa-check text-green-600"></i>
//                   )}
//                 </div>
//               </div>
//             ))}
            
//             {patients.length === 0 && (
//               <div className="text-center py-8">
//                 <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                   <i className="fas fa-user-slash text-2xl text-green-600"></i>
//                 </div>
//                 <h3 className="text-lg font-semibold text-gray-800 mb-2">No Patients Assigned</h3>
//                 <p className="text-gray-600 text-sm">
//                   Patients will appear here once they are assigned to your care.
//                 </p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Patient Details */}
//       <div className="lg:col-span-2">
//         {detailsLoading ? (
//           <div className="bg-white rounded-2xl shadow-lg p-6 border border-green-100">
//             <div className="flex items-center justify-center py-8">
//               <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
//               <span className="ml-3 text-gray-600">Loading patient details...</span>
//             </div>
//           </div>
//         ) : patientDetails ? (
//           <div className="bg-white rounded-2xl shadow-lg p-6 border border-green-100">
//             {/* Header */}
//             <div className="flex items-center justify-between mb-6">
//               <h2 className="text-xl font-bold text-gray-800">
//                 Patient Details - {patientDetails.name}
//               </h2>
//               <div className="flex items-center space-x-2 text-green-600">
//                 <i className="fas fa-stethoscope"></i>
//                 <span className="text-sm font-medium">Under Your Care</span>
//               </div>
//             </div>
            
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               {/* Personal Information */}
//               <div>
//                 <div className="bg-green-50 rounded-xl p-4 border border-green-200">
//                   <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center space-x-2">
//                     <i className="fas fa-user-circle text-green-600"></i>
//                     <span>Personal Information</span>
//                   </h3>
//                   <div className="space-y-4">
//                     <div className="flex items-center justify-between py-2 border-b border-green-100">
//                       <span className="text-sm font-medium text-gray-600">Full Name</span>
//                       <span className="text-gray-900 font-medium">{patientDetails.name}</span>
//                     </div>
//                     <div className="flex items-center justify-between py-2 border-b border-green-100">
//                       <span className="text-sm font-medium text-gray-600">Email</span>
//                       <span className="text-gray-900">{patientDetails.email || 'N/A'}</span>
//                     </div>
//                     <div className="flex items-center justify-between py-2 border-b border-green-100">
//                       <span className="text-sm font-medium text-gray-600">Phone</span>
//                       <span className="text-gray-900">{patientDetails.phone || 'N/A'}</span>
//                     </div>
//                     <div className="flex items-center justify-between py-2 border-b border-green-100">
//                       <span className="text-sm font-medium text-gray-600">Gender</span>
//                       <span className="text-gray-900 capitalize">{patientDetails.gender || 'N/A'}</span>
//                     </div>
//                     <div className="flex items-center justify-between py-2">
//                       <span className="text-sm font-medium text-gray-600">Date of Birth</span>
//                       <span className="text-gray-900">
//                         {patientDetails.dateOfBirth 
//                           ? new Date(patientDetails.dateOfBirth).toLocaleDateString() 
//                           : 'N/A'
//                         }
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Medical Information */}
//               <div>
//                 <div className="bg-green-50 rounded-xl p-4 border border-green-200">
//                   <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center space-x-2">
//                     <i className="fas fa-file-medical text-green-600"></i>
//                     <span>Medical Information</span>
//                   </h3>
//                   <div className="space-y-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-600 mb-2">
//                         Medical History
//                       </label>
//                       <div className="bg-white rounded-lg p-3 border border-green-200">
//                         <p className="text-gray-900">
//                           {patientDetails.medicalHistory?.condition || 'No condition specified'}
//                         </p>
//                         {patientDetails.medicalHistory?.severity && (
//                           <span className={`inline-block mt-2 px-2 py-1 rounded-full text-xs font-medium ${
//                             patientDetails.medicalHistory.severity === 'high' 
//                               ? 'bg-red-100 text-red-800'
//                               : patientDetails.medicalHistory.severity === 'medium'
//                               ? 'bg-yellow-100 text-yellow-800'
//                               : 'bg-green-100 text-green-800'
//                           }`}>
//                             {patientDetails.medicalHistory.severity} severity
//                           </span>
//                         )}
//                       </div>
//                     </div>
                    
//                     <div>
//                       <label className="block text-sm font-medium text-gray-600 mb-2">
//                         Therapy Preferences
//                       </label>
//                       <div className="bg-white rounded-lg p-3 border border-green-200">
//                         {patientDetails.therapyPreferences?.length > 0 ? (
//                           <div className="flex flex-wrap gap-2">
//                             {patientDetails.therapyPreferences.map((pref, index) => (
//                               <span 
//                                 key={index} 
//                                 className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1"
//                               >
//                                 <i className="fas fa-spa text-xs"></i>
//                                 <span>{pref.therapyType || pref}</span>
//                               </span>
//                             ))}
//                           </div>
//                         ) : (
//                           <p className="text-gray-500 text-sm">No preferences specified</p>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Additional Info Section */}
//             <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
//               <div className="bg-green-50 rounded-lg p-4 text-center border border-green-200">
//                 <i className="fas fa-calendar-check text-green-600 text-xl mb-2"></i>
//                 <div className="text-2xl font-bold text-green-600">0</div>
//                 <div className="text-sm text-gray-600">Upcoming Sessions</div>
//               </div>
//               <div className="bg-green-50 rounded-lg p-4 text-center border border-green-200">
//                 <i className="fas fa-history text-green-600 text-xl mb-2"></i>
//                 <div className="text-2xl font-bold text-green-600">0</div>
//                 <div className="text-sm text-gray-600">Completed Sessions</div>
//               </div>
//               <div className="bg-green-50 rounded-lg p-4 text-center border border-green-200">
//                 <i className="fas fa-star text-green-600 text-xl mb-2"></i>
//                 <div className="text-2xl font-bold text-green-600">-</div>
//                 <div className="text-sm text-gray-600">Average Rating</div>
//               </div>
//             </div>
//           </div>
//         ) : (
//           <div className="bg-white rounded-2xl shadow-lg p-6 border border-green-100">
//             <div className="text-center py-12">
//               <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <i className="fas fa-user-md text-3xl text-green-600"></i>
//               </div>
//               <h3 className="text-lg font-semibold text-gray-800 mb-2">Select a Patient</h3>
//               <p className="text-gray-600 max-w-md mx-auto">
//                 Choose a patient from the list to view their detailed medical information and treatment history.
//               </p>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PatientCard;


import React, { useState, useEffect } from 'react';
import api from '../../utils/axios.js';
import VideoCallModal from './VideoCallModal.jsx';
import webrtcService from '../../services/webrtcService.js';
import socketService from '../../utils/socket.js';

const PatientCard = () => {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [patientDetails, setPatientDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [showVideoCall, setShowVideoCall] = useState(false);
  const [selectedPatientForCall, setSelectedPatientForCall] = useState(null);

  useEffect(() => {
    fetchPatients();
    
    // Initialize socket connection
    const socket = socketService.connect();
    webrtcService.initialize(socket);

    return () => {
      socketService.disconnect();
    };
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await api.get('/practitioner/patients');
      setPatients(response.data.data.patients);
    } catch (error) {
      console.error('Error fetching patients:', error);
      alert('Failed to fetch patients');
    } finally {
      setLoading(false);
    }
  };

  const fetchPatientDetails = async (patientId) => {
    setDetailsLoading(true);
    try {
      const response = await api.get(`/practitioner/patients/${patientId}`);
      setPatientDetails(response.data.data);
    } catch (error) {
      console.error('Error fetching patient details:', error);
      alert('Failed to fetch patient details');
    } finally {
      setDetailsLoading(false);
    }
  };

  const handlePatientClick = (patient) => {
    setSelectedPatient(patient);
    fetchPatientDetails(patient._id);
  };

  const handleStartVideoCall = (patient) => {
    setSelectedPatientForCall(patient);
    setShowVideoCall(true);
  };

  const calculateAge = (dateOfBirth) => {
    if (!dateOfBirth) return 'N/A';
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
          <span className="ml-3 text-gray-600">Loading patients...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Patient List */}
      <div className="lg:col-span-1">
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-green-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800">Assigned Patients</h2>
            <div className="flex items-center space-x-2 bg-green-100 text-green-800 px-3 py-1 rounded-full">
              <i className="fas fa-users text-sm"></i>
              <span className="text-sm font-medium">{patients.length}</span>
            </div>
          </div>
          
          <div className="space-y-3">
            {patients.map((patient) => (
              <div
                key={patient._id}
                onClick={() => handlePatientClick(patient)}
                className={`p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                  selectedPatient?._id === patient._id 
                    ? 'border-green-500 bg-green-50 shadow-md' 
                    : 'border-green-100 hover:border-green-300 hover:bg-green-50'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <i className="fas fa-user text-green-600"></i>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">{patient.name}</h3>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <span className="flex items-center space-x-1">
                        <i className="fas fa-venus-mars text-xs"></i>
                        <span>{patient.gender || 'N/A'}</span>
                      </span>
                      <span>•</span>
                      <span className="flex items-center space-x-1">
                        <i className="fas fa-birthday-cake text-xs"></i>
                        <span>{calculateAge(patient.dateOfBirth)} yrs</span>
                      </span>
                    </div>
                    {patient.phone && (
                      <div className="flex items-center space-x-1 text-sm text-gray-600 mt-1">
                        <i className="fas fa-phone text-xs"></i>
                        <span>{patient.phone}</span>
                      </div>
                    )}
                  </div>
                  {selectedPatient?._id === patient._id && (
                    <i className="fas fa-check text-green-600"></i>
                  )}
                </div>
              </div>
            ))}
            
            {patients.length === 0 && (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-user-slash text-2xl text-green-600"></i>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">No Patients Assigned</h3>
                <p className="text-gray-600 text-sm">
                  Patients will appear here once they are assigned to your care.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Patient Details */}
      <div className="lg:col-span-2">
        {detailsLoading ? (
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-green-100">
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
              <span className="ml-3 text-gray-600">Loading patient details...</span>
            </div>
          </div>
        ) : patientDetails ? (
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-green-100">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">
                Patient Details - {patientDetails.name}
              </h2>
              <div className="flex items-center space-x-2 text-green-600">
                <i className="fas fa-stethoscope"></i>
                <span className="text-sm font-medium">Under Your Care</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Personal Information */}
              <div>
                <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center space-x-2">
                    <i className="fas fa-user-circle text-green-600"></i>
                    <span>Personal Information</span>
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between py-2 border-b border-green-100">
                      <span className="text-sm font-medium text-gray-600">Full Name</span>
                      <span className="text-gray-900 font-medium">{patientDetails.name}</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-green-100">
                      <span className="text-sm font-medium text-gray-600">Email</span>
                      <span className="text-gray-900">{patientDetails.email || 'N/A'}</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-green-100">
                      <span className="text-sm font-medium text-gray-600">Phone</span>
                      <span className="text-gray-900">{patientDetails.phone || 'N/A'}</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-green-100">
                      <span className="text-sm font-medium text-gray-600">Gender</span>
                      <span className="text-gray-900 capitalize">{patientDetails.gender || 'N/A'}</span>
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <span className="text-sm font-medium text-gray-600">Date of Birth</span>
                      <span className="text-gray-900">
                        {patientDetails.dateOfBirth 
                          ? new Date(patientDetails.dateOfBirth).toLocaleDateString() 
                          : 'N/A'
                        }
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Medical Information */}
              <div>
                <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center space-x-2">
                    <i className="fas fa-file-medical text-green-600"></i>
                    <span>Medical Information</span>
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-2">
                        Medical History
                      </label>
                      <div className="bg-white rounded-lg p-3 border border-green-200">
                        <p className="text-gray-900">
                          {patientDetails.medicalHistory?.condition || 'No condition specified'}
                        </p>
                        {patientDetails.medicalHistory?.severity && (
                          <span className={`inline-block mt-2 px-2 py-1 rounded-full text-xs font-medium ${
                            patientDetails.medicalHistory.severity === 'high' 
                              ? 'bg-red-100 text-red-800'
                              : patientDetails.medicalHistory.severity === 'medium'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-green-100 text-green-800'
                          }`}>
                            {patientDetails.medicalHistory.severity} severity
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-2">
                        Therapy Preferences
                      </label>
                      <div className="bg-white rounded-lg p-3 border border-green-200">
                        {patientDetails.therapyPreferences?.length > 0 ? (
                          <div className="flex flex-wrap gap-2">
                            {patientDetails.therapyPreferences.map((pref, index) => (
                              <span 
                                key={index} 
                                className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1"
                              >
                                <i className="fas fa-spa text-xs"></i>
                                <span>{pref.therapyType || pref}</span>
                              </span>
                            ))}
                          </div>
                        ) : (
                          <p className="text-gray-500 text-sm">No preferences specified</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Info Section */}
            <div className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-green-50 rounded-lg p-4 text-center border border-green-200">
                  <i className="fas fa-calendar-check text-green-600 text-xl mb-2"></i>
                  <div className="text-2xl font-bold text-green-600">0</div>
                  <div className="text-sm text-gray-600">Upcoming Sessions</div>
                </div>
                <div className="bg-green-50 rounded-lg p-4 text-center border border-green-200">
                  <i className="fas fa-history text-green-600 text-xl mb-2"></i>
                  <div className="text-2xl font-bold text-green-600">0</div>
                  <div className="text-sm text-gray-600">Completed Sessions</div>
                </div>
                <div className="bg-green-50 rounded-lg p-4 text-center border border-green-200">
                  <i className="fas fa-star text-green-600 text-xl mb-2"></i>
                  <div className="text-2xl font-bold text-green-600">-</div>
                  <div className="text-sm text-gray-600">Average Rating</div>
                </div>
              </div>
              
              {/* Video Call Button */}
              <div className="flex justify-center">
                <button
                  onClick={() => handleStartVideoCall(patientDetails)}
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full flex items-center space-x-2 transition-colors shadow-lg"
                >
                  <i className="fas fa-video"></i>
                  <span className="font-medium">Start Video Call</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-green-100">
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-user-md text-3xl text-green-600"></i>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Select a Patient</h3>
              <p className="text-gray-600 max-w-md mx-auto">
                Choose a patient from the list to view their detailed medical information and treatment history.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Video Call Modal */}
      <VideoCallModal
        isOpen={showVideoCall}
        onClose={() => setShowVideoCall(false)}
        patient={selectedPatientForCall}
        onCallEnd={() => {
          // Refresh patient data or update UI as needed
          if (selectedPatientForCall) {
            fetchPatientDetails(selectedPatientForCall._id);
          }
        }}
      />
    </div>
  );
};

export default PatientCard;