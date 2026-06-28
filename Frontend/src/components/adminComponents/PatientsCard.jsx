
// import React, { useState, useEffect, useCallback } from 'react';
// import api from '../../utils/axios';

// const PatientCard = () => {
//   const [patients, setPatients] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [hasMore, setHasMore] = useState(true);
//   const [page, setPage] = useState(1);
//   const [searchTerm, setSearchTerm] = useState('');

//   // Fetch patients with infinite scroll
//   const fetchPatients = useCallback(async (pageNum = 1, search = '', isSearch = false) => {
//     if (loading) return;
    
//     setLoading(true);
//     try {
//       const params = { page: pageNum, limit: 10 };
//       if (search) params.search = search;

//       const response = await api.get('/admin/patients', { params });
      
//       if (response.data.success) {
//         const newPatients = response.data.data.patients;
        
//         if (isSearch) {
//           setPatients(newPatients);
//         } else {
//           setPatients(prev => pageNum === 1 ? newPatients : [...prev, ...newPatients]);
//         }
        
//         setHasMore(pageNum < response.data.data.totalPages);
//         setPage(pageNum);
//       }
//     } catch (err) {
//       console.error('Error fetching patients:', err);
//     } finally {
//       setLoading(false);
//     }
//   }, [loading]);

//   // Initial load and search
//   useEffect(() => {
//     fetchPatients(1, searchTerm, true);
//   }, [searchTerm]);

//   // Infinite scroll handler
//   const handleScroll = useCallback(() => {
//     if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || loading || !hasMore) {
//       return;
//     }
//     fetchPatients(page + 1, searchTerm);
//   }, [loading, hasMore, page, searchTerm, fetchPatients]);

//   useEffect(() => {
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, [handleScroll]);

//   // Calculate age from date of birth
//   const calculateAge = (dateOfBirth) => {
//     if (!dateOfBirth) return 'N/A';
//     const birthDate = new Date(dateOfBirth);
//     const today = new Date();
//     let age = today.getFullYear() - birthDate.getFullYear();
//     const monthDiff = today.getMonth() - birthDate.getMonth();
    
//     if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
//       age--;
//     }
//     return age;
//   };

//   // Format date
//   const formatDate = (dateString) => {
//     if (!dateString) return 'N/A';
//     return new Date(dateString).toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric'
//     });
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       {/* Header */}
//       <div className="mb-8">
//         <h1 className="text-3xl font-bold text-gray-900">Patient Management</h1>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
//         {/* Main Content */}
//         <div className="lg:col-span-4">
//           {/* Search Bar */}
//           <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
//             <div className="flex flex-col sm:flex-row gap-4">
//               <div className="flex-1">
//                 <input
//                   type="text"
//                   placeholder="Search patients by name, email, or phone..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 />
//               </div>
//               <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
//                 Search
//               </button>
//             </div>
//           </div>

//           {/* Patient Cards Grid */}
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//             {patients.map((patient) => (
//               <div 
//                 key={patient._id} 
//                 className="bg-green-50 rounded-lg shadow-sm border border-green-100 hover:shadow-md transition-shadow duration-200"
//               >
//                 {/* Card Header with Profile */}
//                 <div className="p-4 border-b border-green-200">
//                   <div className="flex items-center space-x-3">
//                     <img
//                       src={patient.profileImage}
//                       alt={patient.name}
//                       className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
//                     />
//                     <div className="flex-1 min-w-0">
//                       <h3 className="font-semibold text-gray-900 truncate">{patient.name}</h3>
//                       <p className="text-xs text-gray-500 truncate">ID: {patient._id.slice(-8)}</p>
//                     </div>
//                     <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
//                       patient.isActive 
//                         ? 'bg-green-100 text-green-800 border border-green-200' 
//                         : 'bg-red-100 text-red-800 border border-red-200'
//                     }`}>
//                       {patient.isActive ? 'Active' : 'Inactive'}
//                     </span>
//                   </div>
//                 </div>

//                 {/* Card Body */}
//                 <div className="p-4 space-y-3">
//                   {/* Contact Information */}
//                   <div className="space-y-1">
//                     <div className="flex items-center text-sm text-gray-700">
//                       <span className="font-medium w-20">Email:</span>
//                       <span className="truncate flex-1 ml-2">{patient.email || 'N/A'}</span>
//                     </div>
//                     <div className="flex items-center text-sm text-gray-700">
//                       <span className="font-medium w-20">Phone:</span>
//                       <span className="truncate flex-1 ml-2">{patient.phone || 'N/A'}</span>
//                     </div>
//                   </div>

//                   {/* Personal Details */}
//                   <div className="space-y-1">
//                     <div className="flex items-center text-sm text-gray-700">
//                       <span className="font-medium w-20">Gender:</span>
//                       <span className="capitalize flex-1 ml-2">{patient.gender || 'N/A'}</span>
//                     </div>
//                     <div className="flex items-center text-sm text-gray-700">
//                       <span className="font-medium w-20">Age:</span>
//                       <span className="flex-1 ml-2">
//                         {patient.dateOfBirth ? `${calculateAge(patient.dateOfBirth)} yrs` : 'N/A'}
//                       </span>
//                     </div>
//                     <div className="flex items-center text-sm text-gray-700">
//                       <span className="font-medium w-20">DOB:</span>
//                       <span className="flex-1 ml-2">{formatDate(patient.dateOfBirth)}</span>
//                     </div>
//                   </div>

//                   {/* Medical Information */}
//                   <div className="space-y-1">
//                     <div className="flex items-center text-sm text-gray-700">
//                       <span className="font-medium w-20">Conditions:</span>
//                       <span className="flex-1 ml-2">{patient.medicalHistory?.length || 0}</span>
//                     </div>
//                     <div className="flex items-center text-sm text-gray-700">
//                       <span className="font-medium w-20">Preferences:</span>
//                       <span className="flex-1 ml-2">{patient.therapyPreferences?.length || 0}</span>
//                     </div>
//                   </div>

//                   {/* Join Date */}
//                   <div className="flex items-center text-sm text-gray-700">
//                     <span className="font-medium w-20">Joined:</span>
//                     <span className="flex-1 ml-2">{formatDate(patient.createdAt)}</span>
//                   </div>
//                 </div>

//                 {/* Card Footer */}
                
//               </div>
//             ))}
//           </div>

//           {/* Loading Indicator */}
//           {loading && (
//             <div className="p-8 text-center">
//               <div className="animate-pulse text-gray-600">Loading more patients...</div>
//             </div>
//           )}

//           {/* No Patients Found */}
//           {!loading && patients.length === 0 && (
//             <div className="p-8 text-center bg-white rounded-lg shadow-sm">
//               <div className="text-gray-500 text-lg">No patients found.</div>
//               <div className="text-gray-400 text-sm mt-2">
//                 {searchTerm ? 'Try adjusting your search terms' : 'No patients in the system yet'}
//               </div>
//             </div>
//           )}

//           {/* End of List */}
//           {!hasMore && patients.length > 0 && (
//             <div className="p-6 text-center mt-6">
//               <div className="text-gray-500 text-sm bg-white rounded-lg py-4 shadow-sm">
//                 You've reached the end of the list. No more patients to load.
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Stats Summary */}
//       <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
//         <h3 className="text-lg font-semibold text-gray-900 mb-4">Patient Statistics</h3>
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//           <div className="text-center p-4 bg-blue-50 rounded-lg">
//             <div className="text-2xl font-bold text-blue-600">{patients.length}</div>
//             <div className="text-sm text-blue-800">Total Patients</div>
//           </div>
//           <div className="text-center p-4 bg-green-50 rounded-lg">
//             <div className="text-2xl font-bold text-green-600">
//               {patients.filter(p => p.isActive).length}
//             </div>
//             <div className="text-sm text-green-800">Active Patients</div>
//           </div>
//           <div className="text-center p-4 bg-purple-50 rounded-lg">
//             <div className="text-2xl font-bold text-purple-600">
//               {patients.filter(p => p.medicalHistory?.length > 0).length}
//             </div>
//             <div className="text-sm text-purple-800">With Medical History</div>
//           </div>
//           <div className="text-center p-4 bg-orange-50 rounded-lg">
//             <div className="text-2xl font-bold text-orange-600">
//               {patients.filter(p => p.gender === 'male').length}
//             </div>
//             <div className="text-sm text-orange-800">Male Patients</div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PatientCard;

import React, { useState, useEffect, useCallback } from 'react';
import api from '../../utils/axios';

const PatientCard = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [totalPatients, setTotalPatients] = useState(0);

  // Fetch patients with infinite scroll
  const fetchPatients = useCallback(async (pageNum = 1, search = '', isSearch = false) => {
    if (loading) return;
    
    setLoading(true);
    try {
      const params = { page: pageNum, limit: 10 };
      if (search) params.search = search;

      const response = await api.get('/admin/patients', { params });
      
      if (response.data.success) {
        const newPatients = response.data.data.patients;
        const total = response.data.data.total;
        
        if (isSearch) {
          setPatients(newPatients);
          setPage(1);
        } else {
          setPatients(prev => pageNum === 1 ? newPatients : [...prev, ...newPatients]);
        }
        
        setTotalPatients(total);
        setHasMore(pageNum < Math.ceil(total / 10));
        setPage(pageNum);
      }
    } catch (err) {
      console.error('Error fetching patients:', err);
    } finally {
      setLoading(false);
    }
  }, [loading]);

  // Initial load
  useEffect(() => {
    fetchPatients(1, '', false);
  }, []);

  // Search effect
  useEffect(() => {
    const searchTimer = setTimeout(() => {
      fetchPatients(1, searchTerm, true);
    }, 500); // Debounce search

    return () => clearTimeout(searchTimer);
  }, [searchTerm]);

  // Infinite scroll handler
  const handleScroll = useCallback(() => {
    if (window.innerHeight + document.documentElement.scrollTop < document.documentElement.offsetHeight - 100) {
      return;
    }
    if (loading || !hasMore) return;
    
    fetchPatients(page + 1, searchTerm, false);
  }, [loading, hasMore, page, searchTerm, fetchPatients]);

  // Add scroll event listener
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Calculate age from date of birth
  const calculateAge = (dateOfBirth) => {
    if (!dateOfBirth) return 'N/A';
    const birthDate = new Date(dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Patient Management</h1>
        <p className="text-gray-600 mt-2">Total Patients: {totalPatients}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-4">
          {/* Search Bar */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Search patients by name, email, or phone..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <button 
                onClick={() => fetchPatients(1, searchTerm, true)}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Search
              </button>
            </div>
          </div>

          {/* Patient Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {patients.map((patient) => (
              <div 
                key={patient._id} 
                className="bg-green-50 rounded-lg shadow-sm border border-green-100 hover:shadow-md transition-shadow duration-200"
              >
                {/* Card Header with Profile */}
                <div className="p-4 border-b border-green-200">
                  <div className="flex items-center space-x-3">
                    <img
                      src={patient.profileImage}
                      alt={patient.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
                      onError={(e) => {
                        e.target.src = 'https://res.cloudinary.com/dsibz6icl/image/upload/v1760112776/default-image_umwlvf.png';
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 truncate">{patient.name}</h3>
                      <p className="text-xs text-gray-500 truncate">ID: {patient._id?.slice(-8) || 'N/A'}</p>
                    </div>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      patient.isActive 
                        ? 'bg-green-100 text-green-800 border border-green-200' 
                        : 'bg-red-100 text-red-800 border border-red-200'
                    }`}>
                      {patient.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-4 space-y-3">
                  {/* Contact Information */}
                  <div className="space-y-1">
                    <div className="flex items-center text-sm text-gray-700">
                      <span className="font-medium w-20">Email:</span>
                      <span className="truncate flex-1 ml-2">{patient.email || 'N/A'}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-700">
                      <span className="font-medium w-20">Phone:</span>
                      <span className="truncate flex-1 ml-2">{patient.phone || 'N/A'}</span>
                    </div>
                  </div>

                  {/* Personal Details */}
                  <div className="space-y-1">
                    <div className="flex items-center text-sm text-gray-700">
                      <span className="font-medium w-20">Gender:</span>
                      <span className="capitalize flex-1 ml-2">{patient.gender || 'N/A'}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-700">
                      <span className="font-medium w-20">Age:</span>
                      <span className="flex-1 ml-2">
                        {patient.dateOfBirth ? `${calculateAge(patient.dateOfBirth)} yrs` : 'N/A'}
                      </span>
                    </div>
                    <div className="flex items-center text-sm text-gray-700">
                      <span className="font-medium w-20">DOB:</span>
                      <span className="flex-1 ml-2">{formatDate(patient.dateOfBirth)}</span>
                    </div>
                  </div>

                  {/* Medical Information */}
                  <div className="space-y-1">
                    <div className="flex items-center text-sm text-gray-700">
                      <span className="font-medium w-20">Conditions:</span>
                      <span className="flex-1 ml-2">{patient.medicalHistory?.length || 0}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-700">
                      <span className="font-medium w-20">Preferences:</span>
                      <span className="flex-1 ml-2">{patient.therapyPreferences?.length || 0}</span>
                    </div>
                  </div>

                  {/* Join Date */}
                  <div className="flex items-center text-sm text-gray-700">
                    <span className="font-medium w-20">Joined:</span>
                    <span className="flex-1 ml-2">{formatDate(patient.createdAt)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Loading Indicator */}
          {loading && (
            <div className="flex justify-center items-center p-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <span className="ml-3 text-gray-600">Loading more patients...</span>
            </div>
          )}

          {/* No Patients Found */}
          {!loading && patients.length === 0 && (
            <div className="p-8 text-center bg-white rounded-lg shadow-sm">
              <div className="text-gray-500 text-lg">No patients found.</div>
              <div className="text-gray-400 text-sm mt-2">
                {searchTerm ? 'Try adjusting your search terms' : 'No patients in the system yet'}
              </div>
            </div>
          )}

          {/* End of List */}
          {!hasMore && patients.length > 0 && (
            <div className="p-6 text-center mt-6">
              <div className="text-gray-500 text-sm bg-white rounded-lg py-4 shadow-sm">
                You've reached the end of the list. No more patients to load.
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Stats Summary */}
      <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Patient Statistics</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{totalPatients}</div>
            <div className="text-sm text-blue-800">Total Patients</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">
              {patients.filter(p => p.isActive).length}
            </div>
            <div className="text-sm text-green-800">Active Patients</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">
              {patients.filter(p => p.medicalHistory?.length > 0).length}
            </div>
            <div className="text-sm text-purple-800">With Medical History</div>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <div className="text-2xl font-bold text-orange-600">
              {patients.filter(p => p.gender === 'male').length}
            </div>
            <div className="text-sm text-orange-800">Male Patients</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientCard;