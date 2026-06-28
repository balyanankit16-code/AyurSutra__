// import React, { useState, useEffect, useCallback } from 'react';
// import api from '../../utils/axios';

// const AuditCard = () => {
//   const [auditLogs, setAuditLogs] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [hasMore, setHasMore] = useState(true);
//   const [page, setPage] = useState(1);
//   const [filters, setFilters] = useState({
//     action: '',
//     userModel: '',
//     resourceType: '',
//     startDate: '',
//     endDate: '',
//     userId: '',
//     sortBy: 'timestamp',
//     sortOrder: 'desc'
//   });
//   const [searchTerm, setSearchTerm] = useState('');
//   const [summary, setSummary] = useState(null);
//   const [exportLoading, setExportLoading] = useState(false);
//   const [summaryLoading, setSummaryLoading] = useState(false);

//   // Fetch audit logs with infinite scroll
//   const fetchAuditLogs = useCallback(async (pageNum = 1, filterParams = {}, isNewSearch = false) => {
//     if (loading) return;
    
//     setLoading(true);
//     try {
//       const params = { 
//         page: pageNum, 
//         limit: 20,
//         ...filterParams
//       };

//       const response = await api.get('/audit-logs/', { params });
      
//       if (response.data.success) {
//         const newAuditLogs = response.data.data.auditLogs;
        
//         if (isNewSearch) {
//           setAuditLogs(newAuditLogs);
//         } else {
//           setAuditLogs(prev => pageNum === 1 ? newAuditLogs : [...prev, ...newAuditLogs]);
//         }
        
//         setHasMore(pageNum < response.data.data.totalPages);
//         setPage(pageNum);
//       }
//     } catch (err) {
//       console.error('Error fetching audit logs:', err);
//     } finally {
//       setLoading(false);
//     }
//   }, [loading]);

//   // Fetch audit summary
//   const fetchAuditSummary = async () => {
//     setSummaryLoading(true);
//     try {
//       const response = await api.get('/audit-logs/summary', {
//         params: { days: 30 }
//       });
//       if (response.data.success) {
//         setSummary(response.data.data);
//       }
//     } catch (err) {
//       console.error('Error fetching audit summary:', err);
//     } finally {
//       setSummaryLoading(false);
//     }
//   };

//   // Export audit logs
//   const exportAuditLogs = async (format = 'csv') => {
//     setExportLoading(true);
//     try {
//       const response = await api.get('/audit-logs/export', {
//         params: {
//           format,
//           startDate: filters.startDate,
//           endDate: filters.endDate
//         },
//         responseType: 'blob'
//       });

//       // Create download link
//       const url = window.URL.createObjectURL(new Blob([response.data]));
//       const link = document.createElement('a');
//       link.href = url;
//       link.setAttribute('download', `audit-logs-${Date.now()}.${format}`);
//       document.body.appendChild(link);
//       link.click();
//       link.remove();
//       window.URL.revokeObjectURL(url);

//       alert(`Audit logs exported successfully as ${format.toUpperCase()}`);
//     } catch (err) {
//       console.error('Error exporting audit logs:', err);
//       alert('Failed to export audit logs');
//     } finally {
//       setExportLoading(false);
//     }
//   };

//   // Search audit logs
//   const handleSearch = async () => {
//     if (!searchTerm.trim()) return;
    
//     setLoading(true);
//     try {
//       const response = await api.get('/audit-logs/search', {
//         params: { q: searchTerm, page: 1, limit: 20 }
//       });
      
//       if (response.data.success) {
//         setAuditLogs(response.data.data.auditLogs);
//         setHasMore(response.data.data.currentPage < response.data.data.totalPages);
//         setPage(1);
//       }
//     } catch (err) {
//       console.error('Error searching audit logs:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Initial load
//   useEffect(() => {
//     fetchAuditLogs(1, {}, true);
//     fetchAuditSummary();
//   }, []);

//   // Infinite scroll handler
//   const handleScroll = useCallback(() => {
//     if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || loading || !hasMore) {
//       return;
//     }
//     fetchAuditLogs(page + 1, filters);
//   }, [loading, hasMore, page, filters, fetchAuditLogs]);

//   useEffect(() => {
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, [handleScroll]);

//   // Handle filter changes
//   const handleFilterChange = (e) => {
//     const { name, value } = e.target;
//     setFilters(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   // Apply filters
//   const applyFilters = () => {
//     fetchAuditLogs(1, filters, true);
//   };

//   // Clear filters
//   const clearFilters = () => {
//     const clearedFilters = {
//       action: '',
//       userModel: '',
//       resourceType: '',
//       startDate: '',
//       endDate: '',
//       userId: '',
//       sortBy: 'timestamp',
//       sortOrder: 'desc'
//     };
//     setFilters(clearedFilters);
//     setSearchTerm('');
//     fetchAuditLogs(1, clearedFilters, true);
//   };

//   // Get action badge color
//   const getActionColor = (action) => {
//     const colors = {
//       create: 'bg-green-100 text-green-800',
//       update: 'bg-blue-100 text-blue-800',
//       delete: 'bg-red-100 text-red-800',
//       login: 'bg-purple-100 text-purple-800',
//       logout: 'bg-gray-100 text-gray-800',
//       read: 'bg-yellow-100 text-yellow-800'
//     };
//     return colors[action] || 'bg-gray-100 text-gray-800';
//   };

//   // Get user model badge color
//   const getUserModelColor = (userModel) => {
//     const colors = {
//       Admin: 'bg-red-100 text-red-800',
//       Practitioner: 'bg-blue-100 text-blue-800',
//       Patient: 'bg-green-100 text-green-800'
//     };
//     return colors[userModel] || 'bg-gray-100 text-gray-800';
//   };

//   // Format timestamp
//   const formatTimestamp = (timestamp) => {
//     const date = new Date(timestamp);
//     return date.toLocaleString('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit'
//     });
//   };

//   // Format date for display
//   const formatDate = (dateString) => {
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
//         <h1 className="text-3xl font-bold text-gray-900">Audit Logs</h1>
//         <p className="text-gray-600 mt-2">Monitor and track all system activities</p>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
//         {/* Sidebar Navigation */}
//         <div className="lg:col-span-1">
          

//           {/* Quick Actions */}
//           <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
//             <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
//             <div className="space-y-3">
//               <button
//                 onClick={() => exportAuditLogs('csv')}
//                 disabled={exportLoading}
//                 className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors"
//               >
//                 {exportLoading ? 'Exporting...' : 'Export to CSV'}
//               </button>
//               <button
//                 onClick={() => exportAuditLogs('json')}
//                 disabled={exportLoading}
//                 className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
//               >
//                 {exportLoading ? 'Exporting...' : 'Export to JSON'}
//               </button>
//               <button
//                 onClick={fetchAuditSummary}
//                 disabled={summaryLoading}
//                 className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 transition-colors"
//               >
//                 {summaryLoading ? 'Refreshing...' : 'Refresh Summary'}
//               </button>
//             </div>
//           </div>

//           {/* Audit Summary */}
//           {summary && (
//             <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
//               <h3 className="text-lg font-semibold text-gray-900 mb-4">Audit Summary (30 days)</h3>
//               <div className="space-y-3">
//                 <div className="flex justify-between items-center">
//                   <span className="text-gray-600">Total Activities:</span>
//                   <span className="font-semibold text-gray-900">{summary.overview.totalActivities}</span>
//                 </div>
//                 <div className="flex justify-between items-center">
//                   <span className="text-gray-600">Unique Users:</span>
//                   <span className="font-semibold text-gray-900">{summary.overview.uniqueUsers}</span>
//                 </div>
                
//                 <div className="border-t pt-3">
//                   <h4 className="font-medium text-gray-900 mb-2">Action Distribution</h4>
//                   {Object.entries(summary.distributions.byAction).map(([action, count]) => (
//                     <div key={action} className="flex justify-between items-center text-sm">
//                       <span className="text-gray-600 capitalize">{action}:</span>
//                       <span className="font-medium">{count}</span>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Main Content */}
//         <div className="lg:col-span-3">
//           {/* Search Bar */}
//           <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
//             <div className="flex flex-col sm:flex-row gap-4">
//               <div className="flex-1">
//                 <input
//                   type="text"
//                   placeholder="Search audit logs by description, resource type, action, or IP..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 />
//               </div>
//               <button
//                 onClick={handleSearch}
//                 disabled={!searchTerm.trim()}
//                 className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
//               >
//                 Search
//               </button>
//               <button
//                 onClick={() => {
//                   setSearchTerm('');
//                   fetchAuditLogs(1, {}, true);
//                 }}
//                 className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
//               >
//                 Clear Search
//               </button>
//             </div>
//           </div>

//           {/* Filters */}
//           <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
//             <div className="flex items-center justify-between mb-4">
//               <h3 className="text-lg font-semibold text-gray-900">Filters & Sorting</h3>
//               <button
//                 onClick={clearFilters}
//                 className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm"
//               >
//                 Clear All
//               </button>
//             </div>
            
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
//               {/* Action Filter */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Action</label>
//                 <select
//                   name="action"
//                   value={filters.action}
//                   onChange={handleFilterChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 >
//                   <option value="">All Actions</option>
//                   <option value="create">Create</option>
//                   <option value="update">Update</option>
//                   <option value="delete">Delete</option>
//                   <option value="login">Login</option>
//                   <option value="logout">Logout</option>
//                   <option value="read">Read</option>
//                 </select>
//               </div>

//               {/* User Model Filter */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">User Type</label>
//                 <select
//                   name="userModel"
//                   value={filters.userModel}
//                   onChange={handleFilterChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 >
//                   <option value="">All Types</option>
//                   <option value="Admin">Admin</option>
//                   <option value="Practitioner">Practitioner</option>
//                   <option value="Patient">Patient</option>
//                 </select>
//               </div>

//               {/* Resource Type Filter */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Resource Type</label>
//                 <select
//                   name="resourceType"
//                   value={filters.resourceType}
//                   onChange={handleFilterChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 >
//                   <option value="">All Resources</option>
//                   <option value="Patient">Patient</option>
//                   <option value="Practitioner">Practitioner</option>
//                   <option value="Session">Session</option>
//                   <option value="Auth">Auth</option>
//                   <option value="MedicalHistory">Medical History</option>
//                   <option value="WorkingHours">Working Hours</option>
//                 </select>
//               </div>

//               {/* Sort By */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
//                 <select
//                   name="sortBy"
//                   value={filters.sortBy}
//                   onChange={handleFilterChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 >
//                   <option value="timestamp">Timestamp</option>
//                   <option value="action">Action</option>
//                   <option value="userModel">User Type</option>
//                 </select>
//               </div>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
//               {/* Start Date Filter */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
//                 <input
//                   type="date"
//                   name="startDate"
//                   value={filters.startDate}
//                   onChange={handleFilterChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 />
//               </div>

//               {/* End Date Filter */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
//                 <input
//                   type="date"
//                   name="endDate"
//                   value={filters.endDate}
//                   onChange={handleFilterChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 />
//               </div>

//               {/* Sort Order */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Sort Order</label>
//                 <select
//                   name="sortOrder"
//                   value={filters.sortOrder}
//                   onChange={handleFilterChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 >
//                   <option value="desc">Newest First</option>
//                   <option value="asc">Oldest First</option>
//                 </select>
//               </div>
//             </div>

//             {/* Filter Actions */}
//             <div className="flex space-x-3">
//               <button
//                 onClick={applyFilters}
//                 className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//               >
//                 Apply Filters
//               </button>
//             </div>
//           </div>

//           {/* Audit Logs List */}
//           <div className="space-y-4">
//             {auditLogs.map((log) => (
//               <div key={log._id} className="bg-green-50 border border-green-200 rounded-lg p-6 hover:bg-green-100 transition-colors">
//                 <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
//                   <div className="flex-1">
//                     <div className="flex flex-wrap items-center gap-2 mb-2">
//                       <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getUserModelColor(log.userModel)}`}>
//                         {log.userModel}
//                       </span>
//                       <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getActionColor(log.action)}`}>
//                         {log.action}
//                       </span>
//                       <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
//                         {log.resourceType}
//                       </span>
//                     </div>
                    
//                     <h3 className="text-lg font-semibold text-gray-900 mb-1">
//                       {log.userId?.name || 'System'} ({log.userId?.email || 'N/A'})
//                     </h3>
                    
//                     <p className="text-gray-700 mb-2">{log.description}</p>
                    
//                     {log.details && (
//                       <div className="bg-white rounded-lg p-3 mt-2 border border-gray-200">
//                         <h4 className="text-sm font-medium text-gray-900 mb-1">Details:</h4>
//                         <pre className="text-xs text-gray-600 whitespace-pre-wrap">
//                           {JSON.stringify(log.details, null, 2)}
//                         </pre>
//                       </div>
//                     )}
//                   </div>

//                   <div className="lg:text-right mt-4 lg:mt-0 lg:ml-4">
//                     <div className="text-sm text-gray-500 mb-1">
//                       {formatTimestamp(log.timestamp)}
//                     </div>
//                     <div className="text-xs text-gray-400">
//                       IP: {log.ipAddress}
//                     </div>
//                     {log.resourceId && (
//                       <div className="text-xs text-gray-400 mt-1">
//                         Resource ID: {log.resourceId.slice(-8)}
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 {/* Additional Information */}
//                 <div className="border-t border-green-200 pt-3 mt-3">
//                   <div className="flex flex-wrap gap-4 text-sm text-gray-600">
//                     <div>
//                       <span className="font-medium">Log ID:</span> {log._id.slice(-8)}
//                     </div>
//                     <div>
//                       <span className="font-medium">User ID:</span> {log.userId?._id?.slice(-8) || 'N/A'}
//                     </div>
//                     <div>
//                       <span className="font-medium">Created:</span> {formatTimestamp(log.createdAt)}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}

//             {/* Loading Indicator */}
//             {loading && (
//               <div className="text-center py-8">
//                 <div className="animate-pulse text-gray-600">Loading more audit logs...</div>
//               </div>
//             )}

//             {/* No Audit Logs Found */}
//             {!loading && auditLogs.length === 0 && (
//               <div className="bg-white rounded-lg shadow-sm p-8 text-center">
//                 <div className="text-gray-500 text-lg mb-2">No audit logs found</div>
//                 <p className="text-gray-400">Try adjusting your filters or check back later for new logs.</p>
//               </div>
//             )}

//             {/* End of List */}
//             {!hasMore && auditLogs.length > 0 && (
//               <div className="text-center py-4 border-t border-gray-200">
//                 <div className="text-gray-500 text-sm">No more audit logs to load.</div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AuditCard;

import React, { useState, useEffect, useCallback } from 'react';
import api from '../../utils/axios';

const AuditCard = () => {
  const [auditLogs, setAuditLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    action: '',
    userModel: '',
    resourceType: '',
    startDate: '',
    endDate: '',
    userId: '',
    sortBy: 'timestamp',
    sortOrder: 'desc'
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [summary, setSummary] = useState(null);
  const [exportLoading, setExportLoading] = useState(false);
  const [summaryLoading, setSummaryLoading] = useState(false);

  // Fetch audit logs with infinite scroll
  const fetchAuditLogs = useCallback(async (pageNum = 1, filterParams = {}, isNewSearch = false) => {
    if (loading) return;
    
    setLoading(true);
    try {
      const params = { 
        page: pageNum, 
        limit: 20,
        ...filterParams
      };

      const response = await api.get('/audit-logs/', { params });
      
      if (response.data.success) {
        const newAuditLogs = response.data.data.auditLogs;
        
        if (isNewSearch) {
          setAuditLogs(newAuditLogs);
        } else {
          setAuditLogs(prev => pageNum === 1 ? newAuditLogs : [...prev, ...newAuditLogs]);
        }
        
        setHasMore(pageNum < response.data.data.totalPages);
        setPage(pageNum);
      }
    } catch (err) {
      console.error('Error fetching audit logs:', err);
    } finally {
      setLoading(false);
    }
  }, [loading]);

  // Fetch audit summary
  const fetchAuditSummary = async () => {
    setSummaryLoading(true);
    try {
      const response = await api.get('/audit-logs/summary', {
        params: { days: 30 }
      });
      if (response.data.success) {
        setSummary(response.data.data);
      }
    } catch (err) {
      console.error('Error fetching audit summary:', err);
    } finally {
      setSummaryLoading(false);
    }
  };

  // Export audit logs
  const exportAuditLogs = async (format = 'csv') => {
    setExportLoading(true);
    try {
      const response = await api.get('/audit-logs/export', {
        params: {
          format,
          startDate: filters.startDate,
          endDate: filters.endDate
        },
        responseType: 'blob'
      });

      // Create download link
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `audit-logs-${Date.now()}.${format}`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      alert(`Audit logs exported successfully as ${format.toUpperCase()}`);
    } catch (err) {
      console.error('Error exporting audit logs:', err);
      alert('Failed to export audit logs');
    } finally {
      setExportLoading(false);
    }
  };

  // Search audit logs
  const handleSearch = async () => {
    if (!searchTerm.trim()) return;
    
    setLoading(true);
    try {
      const response = await api.get('/audit-logs/search', {
        params: { q: searchTerm, page: 1, limit: 20 }
      });
      
      if (response.data.success) {
        setAuditLogs(response.data.data.auditLogs);
        setHasMore(response.data.data.currentPage < response.data.data.totalPages);
        setPage(1);
      }
    } catch (err) {
      console.error('Error searching audit logs:', err);
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    fetchAuditLogs(1, {}, true);
    fetchAuditSummary();
  }, []);

  // Infinite scroll handler
  const handleScroll = useCallback(() => {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || loading || !hasMore) {
      return;
    }
    fetchAuditLogs(page + 1, filters);
  }, [loading, hasMore, page, filters, fetchAuditLogs]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Apply filters
  const applyFilters = () => {
    fetchAuditLogs(1, filters, true);
  };

  // Clear filters
  const clearFilters = () => {
    const clearedFilters = {
      action: '',
      userModel: '',
      resourceType: '',
      startDate: '',
      endDate: '',
      userId: '',
      sortBy: 'timestamp',
      sortOrder: 'desc'
    };
    setFilters(clearedFilters);
    setSearchTerm('');
    fetchAuditLogs(1, clearedFilters, true);
  };

  // Get action badge color
  const getActionColor = (action) => {
    const colors = {
      create: 'bg-green-100 text-green-800',
      update: 'bg-blue-100 text-blue-800',
      delete: 'bg-red-100 text-red-800',
      login: 'bg-purple-100 text-purple-800',
      logout: 'bg-gray-100 text-gray-800',
      read: 'bg-yellow-100 text-yellow-800'
    };
    return colors[action] || 'bg-gray-100 text-gray-800';
  };

  // Get user model badge color
  const getUserModelColor = (userModel) => {
    const colors = {
      Admin: 'bg-red-100 text-red-800',
      Practitioner: 'bg-blue-100 text-blue-800',
      Patient: 'bg-green-100 text-green-800'
    };
    return colors[userModel] || 'bg-gray-100 text-gray-800';
  };

  // Format timestamp
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Format date for display
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Audit Logs</h1>
        <p className="text-gray-600 mt-2">Monitor and track all system activities</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1">
          {/* Quick Actions */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button
                onClick={() => exportAuditLogs('csv')}
                disabled={exportLoading}
                className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors"
              >
                {exportLoading ? 'Exporting...' : 'Export to CSV'}
              </button>
              <button
                onClick={() => exportAuditLogs('json')}
                disabled={exportLoading}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
              >
                {exportLoading ? 'Exporting...' : 'Export to JSON'}
              </button>
              <button
                onClick={fetchAuditSummary}
                disabled={summaryLoading}
                className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 transition-colors"
              >
                {summaryLoading ? 'Refreshing...' : 'Refresh Summary'}
              </button>
            </div>
          </div>

          {/* Audit Summary */}
          {summary && (
            <div className="bg-white rounded-2xl shadow-lg p-6 mt-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Audit Summary (30 days)</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Activities:</span>
                  <span className="font-semibold text-gray-800">{summary.overview.totalActivities}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Unique Users:</span>
                  <span className="font-semibold text-gray-800">{summary.overview.uniqueUsers}</span>
                </div>
                
                <div className="border-t pt-3">
                  <h4 className="font-medium text-gray-800 mb-2">Action Distribution</h4>
                  {Object.entries(summary.distributions.byAction).map(([action, count]) => (
                    <div key={action} className="flex justify-between items-center text-sm">
                      <span className="text-gray-600 capitalize">{action}:</span>
                      <span className="font-medium">{count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {/* Search Bar */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Search audit logs by description, resource type, action, or IP..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <button
                onClick={handleSearch}
                disabled={!searchTerm.trim()}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors"
              >
                Search
              </button>
              <button
                onClick={() => {
                  setSearchTerm('');
                  fetchAuditLogs(1, {}, true);
                }}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Clear Search
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Filters & Sorting</h3>
              <button
                onClick={clearFilters}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm"
              >
                Clear All
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              {/* Action Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Action</label>
                <select
                  name="action"
                  value={filters.action}
                  onChange={handleFilterChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="">All Actions</option>
                  <option value="create">Create</option>
                  <option value="update">Update</option>
                  <option value="delete">Delete</option>
                  <option value="login">Login</option>
                  <option value="logout">Logout</option>
                  <option value="read">Read</option>
                </select>
              </div>

              {/* User Model Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">User Type</label>
                <select
                  name="userModel"
                  value={filters.userModel}
                  onChange={handleFilterChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="">All Types</option>
                  <option value="Admin">Admin</option>
                  <option value="Practitioner">Practitioner</option>
                  <option value="Patient">Patient</option>
                </select>
              </div>

              {/* Resource Type Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Resource Type</label>
                <select
                  name="resourceType"
                  value={filters.resourceType}
                  onChange={handleFilterChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="">All Resources</option>
                  <option value="Patient">Patient</option>
                  <option value="Practitioner">Practitioner</option>
                  <option value="Session">Session</option>
                  <option value="Auth">Auth</option>
                  <option value="MedicalHistory">Medical History</option>
                  <option value="WorkingHours">Working Hours</option>
                </select>
              </div>

              {/* Sort By */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
                <select
                  name="sortBy"
                  value={filters.sortBy}
                  onChange={handleFilterChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="timestamp">Timestamp</option>
                  <option value="action">Action</option>
                  <option value="userModel">User Type</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              {/* Start Date Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                <input
                  type="date"
                  name="startDate"
                  value={filters.startDate}
                  onChange={handleFilterChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              {/* End Date Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                <input
                  type="date"
                  name="endDate"
                  value={filters.endDate}
                  onChange={handleFilterChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              {/* Sort Order */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sort Order</label>
                <select
                  name="sortOrder"
                  value={filters.sortOrder}
                  onChange={handleFilterChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="desc">Newest First</option>
                  <option value="asc">Oldest First</option>
                </select>
              </div>
            </div>

            {/* Filter Actions */}
            <div className="flex space-x-3">
              <button
                onClick={applyFilters}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Apply Filters
              </button>
            </div>
          </div>

          {/* Audit Logs List */}
          <div className="space-y-4">
            {auditLogs.map((log) => (
              <div key={log._id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getUserModelColor(log.userModel)}`}>
                        {log.userModel}
                      </span>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getActionColor(log.action)}`}>
                        {log.action}
                      </span>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {log.resourceType}
                      </span>
                    </div>
                    
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">
                      {log.userId?.name || 'System'} ({log.userId?.email || 'N/A'})
                    </h3>
                    
                    <p className="text-gray-700 mb-2">{log.description}</p>
                    
                    {log.details && (
                      <div className="bg-gray-50 rounded-lg p-3 mt-2 border border-gray-200">
                        <h4 className="text-sm font-medium text-gray-800 mb-1">Details:</h4>
                        <pre className="text-xs text-gray-600 whitespace-pre-wrap">
                          {JSON.stringify(log.details, null, 2)}
                        </pre>
                      </div>
                    )}
                  </div>

                  <div className="lg:text-right mt-4 lg:mt-0 lg:ml-4">
                    <div className="text-sm text-gray-500 mb-1">
                      {formatTimestamp(log.timestamp)}
                    </div>
                    <div className="text-xs text-gray-400">
                      IP: {log.ipAddress}
                    </div>
                    {log.resourceId && (
                      <div className="text-xs text-gray-400 mt-1">
                        Resource ID: {log.resourceId.slice(-8)}
                      </div>
                    )}
                  </div>
                </div>

                {/* Additional Information */}
                <div className="border-t border-gray-200 pt-3 mt-3">
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    <div>
                      <span className="font-medium">Log ID:</span> {log._id.slice(-8)}
                    </div>
                    <div>
                      <span className="font-medium">User ID:</span> {log.userId?._id?.slice(-8) || 'N/A'}
                    </div>
                    <div>
                      <span className="font-medium">Created:</span> {formatTimestamp(log.createdAt)}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Loading Indicator */}
            {loading && (
              <div className="text-center py-8">
                <div className="animate-pulse text-gray-600">Loading more audit logs...</div>
              </div>
            )}

            {/* No Audit Logs Found */}
            {!loading && auditLogs.length === 0 && (
              <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
                <div className="text-gray-500 text-lg mb-2">No audit logs found</div>
                <p className="text-gray-400">Try adjusting your filters or check back later for new logs.</p>
              </div>
            )}

            {/* End of List */}
            {!hasMore && auditLogs.length > 0 && (
              <div className="text-center py-4 border-t border-gray-200">
                <div className="text-gray-500 text-sm">No more audit logs to load.</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuditCard;