// import React, { useState } from 'react';
// import axios from '../../utils/axios';

// const SendBroadcastCard = () => {
//   const [formData, setFormData] = useState({
//     title: '',
//     message: '',
//     targetUsers: [],
//     type: 'system_alert',
//     channel: 'in_app',
//     priority: 'medium'
//   });
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState('');
//   const [error, setError] = useState('');

//   // Target user options
//   const targetUserOptions = [
//     { value: 'patients', label: 'Patients' },
//     { value: 'practitioners', label: 'Practitioners' },
//     { value: 'admins', label: 'Admins' }
//   ];

//   // Notification type options
//   const typeOptions = [
//     { value: 'system_alert', label: 'System Alert' },
//     { value: 'session_reminder', label: 'Session Reminder' },
//     { value: 'booking_confirmation', label: 'Booking Confirmation' },
//     { value: 'cancellation', label: 'Cancellation' },
//     { value: 'feedback_request', label: 'Feedback Request' },
//     { value: 'promotional', label: 'Promotional' },
//     { value: 'session_confirmation', label: 'Session Confirmation' }
//   ];

//   // Channel options
//   const channelOptions = [
//     { value: 'in_app', label: 'In-App Notification' },
//     { value: 'email', label: 'Email' },
//     { value: 'sms', label: 'SMS' },
//     { value: 'push', label: 'Push Notification' }
//   ];

//   // Priority options
//   const priorityOptions = [
//     { value: 'low', label: 'Low' },
//     { value: 'medium', label: 'Medium' },
//     { value: 'high', label: 'High' },
//     { value: 'urgent', label: 'Urgent' }
//   ];

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleTargetUsersChange = (e) => {
//     const value = e.target.value;
//     setFormData(prev => ({
//       ...prev,
//       targetUsers: e.target.checked
//         ? [...prev.targetUsers, value]
//         : prev.targetUsers.filter(user => user !== value)
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');
//     setSuccess('');

//     // Validate at least one target user is selected
//     if (formData.targetUsers.length === 0) {
//       setError('Please select at least one target user group');
//       setLoading(false);
//       return;
//     }

//     try {
//       const response = await axios.post('/admin/notifications/broadcast', formData);
      
//       if (response.data.success) {
//         setSuccess(`Broadcast sent successfully to ${response.data.data.sentCount} users`);
//         setFormData({
//           title: '',
//           message: '',
//           targetUsers: [],
//           type: 'system_alert',
//           channel: 'in_app',
//           priority: 'medium'
//         });
//       }
//     } catch (err) {
//       setError(err.response?.data?.message || 'Failed to send broadcast');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getPriorityColor = (priority) => {
//     const colors = {
//       low: 'bg-gray-100 text-gray-800',
//       medium: 'bg-blue-100 text-blue-800',
//       high: 'bg-orange-100 text-orange-800',
//       urgent: 'bg-red-100 text-red-800'
//     };
//     return colors[priority] || 'bg-gray-100 text-gray-800';
//   };

//   const getChannelIcon = (channel) => {
//     const icons = {
//       email: '📧',
//       sms: '💬',
//       push: '📱',
//       in_app: '🔔'
//     };
//     return icons[channel] || '📢';
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       {/* Header */}
//       <div className="mb-8">
//         <h1 className="text-3xl font-bold text-gray-900">Broadcast Notifications</h1>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
//         {/* Sidebar Navigation */}
      

//         {/* Main Content - Broadcast Form */}
//         <div className="lg:col-span-3">
//           <div className="bg-white rounded-lg shadow-sm p-6">
//             <h2 className="text-xl font-semibold text-gray-900 mb-6">Send Broadcast Notification</h2>

//             {/* Success Message */}
//             {success && (
//               <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
//                 <div className="flex items-center">
//                   <div className="flex-shrink-0">
//                     <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
//                       <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//                     </svg>
//                   </div>
//                   <div className="ml-3">
//                     <p className="text-sm font-medium text-green-800">{success}</p>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Error Message */}
//             {error && (
//               <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
//                 <div className="flex items-center">
//                   <div className="flex-shrink-0">
//                     <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
//                       <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
//                     </svg>
//                   </div>
//                   <div className="ml-3">
//                     <p className="text-sm font-medium text-red-800">{error}</p>
//                   </div>
//                 </div>
//               </div>
//             )}

//             <form onSubmit={handleSubmit} className="space-y-6">
//               {/* Target Users */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-3">
//                   Target Users *
//                 </label>
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                   {targetUserOptions.map((option) => (
//                     <label key={option.value} className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
//                       <input
//                         type="checkbox"
//                         value={option.value}
//                         checked={formData.targetUsers.includes(option.value)}
//                         onChange={handleTargetUsersChange}
//                         className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//                       />
//                       <span className="text-sm font-medium text-gray-700">{option.label}</span>
//                     </label>
//                   ))}
//                 </div>
//                 {formData.targetUsers.length === 0 && (
//                   <p className="mt-1 text-sm text-red-600">Please select at least one target group</p>
//                 )}
//               </div>

//               {/* Notification Type and Channel */}
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 {/* Notification Type */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Notification Type
//                   </label>
//                   <select
//                     name="type"
//                     value={formData.type}
//                     onChange={handleChange}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   >
//                     {typeOptions.map(option => (
//                       <option key={option.value} value={option.value}>
//                         {option.label}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 {/* Channel */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Delivery Channel
//                   </label>
//                   <select
//                     name="channel"
//                     value={formData.channel}
//                     onChange={handleChange}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   >
//                     {channelOptions.map(option => (
//                       <option key={option.value} value={option.value}>
//                         {getChannelIcon(option.value)} {option.label}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//               </div>

//               {/* Priority */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Priority Level
//                 </label>
//                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                   {priorityOptions.map((option) => (
//                     <label key={option.value} className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
//                       <input
//                         type="radio"
//                         name="priority"
//                         value={option.value}
//                         checked={formData.priority === option.value}
//                         onChange={handleChange}
//                         className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
//                       />
//                       <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(option.value)}`}>
//                         {option.label}
//                       </span>
//                     </label>
//                   ))}
//                 </div>
//               </div>

//               {/* Title */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Notification Title *
//                 </label>
//                 <input
//                   type="text"
//                   name="title"
//                   value={formData.title}
//                   onChange={handleChange}
//                   required
//                   placeholder="Enter notification title"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 />
//               </div>

//               {/* Message */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Message *
//                 </label>
//                 <textarea
//                   name="message"
//                   value={formData.message}
//                   onChange={handleChange}
//                   required
//                   rows={6}
//                   placeholder="Enter your broadcast message here..."
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
//                 />
//                 <p className="mt-1 text-sm text-gray-500">
//                   This message will be sent to all selected user groups.
//                 </p>
//               </div>

//               {/* Preview Section */}
//               <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
//                 <h3 className="text-sm font-medium text-gray-700 mb-3">Preview</h3>
//                 <div className="bg-white rounded-lg p-4 border border-gray-300">
//                   <div className="flex items-start justify-between mb-2">
//                     <h4 className="font-semibold text-gray-900">
//                       {formData.title || 'Notification Title'}
//                     </h4>
//                     <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(formData.priority)}`}>
//                       {formData.priority}
//                     </span>
//                   </div>
//                   <p className="text-gray-700 text-sm">
//                     {formData.message || 'Your message will appear here...'}
//                   </p>
//                   <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-200">
//                     <span className="text-xs text-gray-500">
//                       {getChannelIcon(formData.channel)} {formData.channel}
//                     </span>
//                     <span className="text-xs text-gray-500">
//                       Type: {formData.type}
//                     </span>
//                   </div>
//                 </div>
//               </div>

//               {/* Submit Button */}
//               <div className="flex justify-end pt-6 border-t border-gray-200">
//                 <button
//                   type="submit"
//                   disabled={loading || formData.targetUsers.length === 0}
//                   className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//                 >
//                   {loading ? 'Sending Broadcast...' : 'Send Broadcast Notification'}
//                 </button>
//               </div>
//             </form>
//           </div>

//           {/* Additional Information */}
//           <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
//             <h3 className="text-lg font-semibold text-gray-900 mb-4">Broadcast Guidelines</h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div>
//                 <h4 className="font-medium text-gray-900 mb-2">Best Practices</h4>
//                 <ul className="text-sm text-gray-600 space-y-1">
//                   <li>• Keep titles clear and concise</li>
//                   <li>• Use appropriate priority levels</li>
//                   <li>• Test messages before broadcasting</li>
//                   <li>• Consider time zones for delivery</li>
//                 </ul>
//               </div>
//               <div>
//                 <h4 className="font-medium text-gray-900 mb-2">Delivery Channels</h4>
//                 <ul className="text-sm text-gray-600 space-y-1">
//                   <li>• In-App: App notifications only</li>
//                   <li>• Email: Email notifications</li>
//                   <li>• SMS: Text messages</li>
//                   <li>• Push: Mobile push notifications</li>
//                 </ul>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SendBroadcastCard;

import React, { useState } from 'react';
import axios from '../../utils/axios';

const SendBroadcastCard = () => {
  const [formData, setFormData] = useState({
    title: '',
    message: '',
    targetUsers: [],
    type: 'system_alert',
    channel: 'in_app',
    priority: 'medium'
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  // Target user options
  const targetUserOptions = [
    { value: 'patients', label: 'Patients' },
    { value: 'practitioners', label: 'Practitioners' },
    { value: 'admins', label: 'Admins' }
  ];

  // Notification type options
  const typeOptions = [
    { value: 'system_alert', label: 'System Alert' },
    { value: 'session_reminder', label: 'Session Reminder' },
    { value: 'booking_confirmation', label: 'Booking Confirmation' },
    { value: 'cancellation', label: 'Cancellation' },
    { value: 'feedback_request', label: 'Feedback Request' },
    { value: 'promotional', label: 'Promotional' },
    { value: 'session_confirmation', label: 'Session Confirmation' }
  ];

  // Channel options
  const channelOptions = [
    { value: 'in_app', label: 'In-App Notification' },
    { value: 'email', label: 'Email' },
    { value: 'sms', label: 'SMS' },
    { value: 'push', label: 'Push Notification' }
  ];

  // Priority options
  const priorityOptions = [
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' },
    { value: 'urgent', label: 'Urgent' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTargetUsersChange = (e) => {
    const value = e.target.value;
    setFormData(prev => ({
      ...prev,
      targetUsers: e.target.checked
        ? [...prev.targetUsers, value]
        : prev.targetUsers.filter(user => user !== value)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    // Validate at least one target user is selected
    if (formData.targetUsers.length === 0) {
      setError('Please select at least one target user group');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('/admin/notifications/broadcast', formData);
      
      if (response.data.success) {
        setSuccess(`Broadcast sent successfully to ${response.data.data.sentCount} users`);
        setFormData({
          title: '',
          message: '',
          targetUsers: [],
          type: 'system_alert',
          channel: 'in_app',
          priority: 'medium'
        });
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send broadcast');
    } finally {
      setLoading(false);
    }
  };

  const getPriorityColor = (priority) => {
    const colors = {
      low: 'bg-gray-100 text-gray-800',
      medium: 'bg-blue-100 text-blue-800',
      high: 'bg-orange-100 text-orange-800',
      urgent: 'bg-red-100 text-red-800'
    };
    return colors[priority] || 'bg-gray-100 text-gray-800';
  };

  const getChannelIcon = (channel) => {
    const icons = {
      email: '📧',
      sms: '💬',
      push: '📱',
      in_app: '🔔'
    };
    return icons[channel] || '📢';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Broadcast Notifications</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Content - Broadcast Form */}
        <div className="lg:col-span-4">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Send Broadcast Notification</h2>

            {/* Success Message */}
            {success && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-green-800">{success}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-red-800">{error}</p>
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Target Users */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Target Users *
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {targetUserOptions.map((option) => (
                    <label key={option.value} className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <input
                        type="checkbox"
                        value={option.value}
                        checked={formData.targetUsers.includes(option.value)}
                        onChange={handleTargetUsersChange}
                        className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                      />
                      <span className="text-sm font-medium text-gray-700">{option.label}</span>
                    </label>
                  ))}
                </div>
                {formData.targetUsers.length === 0 && (
                  <p className="mt-1 text-sm text-red-600">Please select at least one target group</p>
                )}
              </div>

              {/* Notification Type and Channel */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Notification Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Notification Type
                  </label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    {typeOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Channel */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Delivery Channel
                  </label>
                  <select
                    name="channel"
                    value={formData.channel}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    {channelOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {getChannelIcon(option.value)} {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Priority */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Priority Level
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {priorityOptions.map((option) => (
                    <label key={option.value} className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <input
                        type="radio"
                        name="priority"
                        value={option.value}
                        checked={formData.priority === option.value}
                        onChange={handleChange}
                        className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                      />
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(option.value)}`}>
                        {option.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Notification Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  placeholder="Enter notification title"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  placeholder="Enter your broadcast message here..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-vertical"
                />
                <p className="mt-1 text-sm text-gray-500">
                  This message will be sent to all selected user groups.
                </p>
              </div>

              {/* Preview Section */}
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <h3 className="text-sm font-medium text-gray-700 mb-3">Preview</h3>
                <div className="bg-white rounded-lg p-4 border border-gray-300">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold text-gray-800">
                      {formData.title || 'Notification Title'}
                    </h4>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(formData.priority)}`}>
                      {formData.priority}
                    </span>
                  </div>
                  <p className="text-gray-700 text-sm">
                    {formData.message || 'Your message will appear here...'}
                  </p>
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-200">
                    <span className="text-xs text-gray-500">
                      {getChannelIcon(formData.channel)} {formData.channel}
                    </span>
                    <span className="text-xs text-gray-500">
                      Type: {formData.type}
                    </span>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end pt-6 border-t border-gray-200">
                <button
                  type="submit"
                  disabled={loading || formData.targetUsers.length === 0}
                  className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {loading ? 'Sending Broadcast...' : 'Send Broadcast Notification'}
                </button>
              </div>
            </form>
          </div>

          {/* Additional Information */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Broadcast Guidelines</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-800 mb-2">Best Practices</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Keep titles clear and concise</li>
                  <li>• Use appropriate priority levels</li>
                  <li>• Test messages before broadcasting</li>
                  <li>• Consider time zones for delivery</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-gray-800 mb-2">Delivery Channels</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• In-App: App notifications only</li>
                  <li>• Email: Email notifications</li>
                  <li>• SMS: Text messages</li>
                  <li>• Push: Mobile push notifications</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendBroadcastCard;