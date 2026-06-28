// // // FeedbackCard.jsx - Simple Static Design
// // const FeedbackCard = () => {
// //   return (
// //     <div className="min-h-screen bg-gray-50 p-6">
// //       <div className="mb-8">
// //         <h1 className="text-3xl font-bold text-gray-900">Feedback Reports</h1>
// //       </div>

// //       <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
// //         {/* Sidebar */}
  
// //         {/* Main Content */}
// //         <div className="lg:col-span-3">
// //           <div className="bg-white rounded-lg shadow-sm p-6">
// //             <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Feedback</h2>
            
// //             <div className="space-y-4">
// //               <div className="bg-green-50 border border-green-200 rounded-lg p-4">
// //                 <div className="flex justify-between items-start mb-2">
// //                   <span className="font-medium text-gray-900">John Doe</span>
// //                   <span className="text-yellow-500">★★★★★</span>
// //                 </div>
// //                 <p className="text-gray-700">Great session, very helpful!</p>
// //               </div>

// //               <div className="bg-green-50 border border-green-200 rounded-lg p-4">
// //                 <div className="flex justify-between items-start mb-2">
// //                   <span className="font-medium text-gray-900">Jane Smith</span>
// //                   <span className="text-yellow-500">★★★★☆</span>
// //                 </div>
// //                 <p className="text-gray-700">Good experience overall.</p>
// //               </div>
// //             </div>

// //             <div className="text-center py-8 text-gray-500">
// //               More feedback reports and analytics coming soon...
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default FeedbackCard;


// import React, { useEffect, useState } from 'react';
// import axios from '../../utils/axios';  
// import { useAuth } from '../../utils/authContext'; 
// import { toast } from 'react-toastify';

// const FeedbackCard = ({ practitionerId }) => {
//   const { user } = useAuth();
//   const [feedback, setFeedback] = useState([]);
//   const [practitioner, setPractitioner] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [totalFeedback, setTotalFeedback] = useState(0);
//   const [positiveFeedback, setPositiveFeedback] = useState(0);
//   const [needsAttention, setNeedsAttention] = useState(0);

//   // Fetch feedback details and practitioner information
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Fetch feedback for the practitioner
//         const feedbackData = await axios.get(`/feedback/practitioner/${practitionerId}`);
//         setFeedback(feedbackData.data.data);
//         setTotalFeedback(feedbackData.data.data.length);

//         // Count positive and needs attention feedbacks
//         const positive = feedbackData.data.data.filter(fb => fb.ratings.overall >= 4).length;
//         const needsAttention = feedbackData.data.data.filter(fb => fb.ratings.overall < 3).length;
//         setPositiveFeedback(positive);
//         setNeedsAttention(needsAttention);

//         // Fetch practitioner details
//         const practitionerData = await axios.get(`/admin/practitioners/${practitionerId}`);
//         setPractitioner(practitionerData.data.data);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//         toast.error('Error fetching feedback or practitioner data.');
//       }
//       setLoading(false);
//     };

//     fetchData();
//   }, [practitionerId]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="feedback-card" style={{ backgroundColor: '#E8F6F3', padding: '20px', borderRadius: '8px' }}>
//       <h3 style={{ marginBottom: '20px', fontWeight: 'bold' }}>Feedback Analytics</h3>
      
//       <div className="feedback-summary" style={{ display: 'flex', justifyContent: 'space-between' }}>
//         <div className="feedback-stat" style={{ textAlign: 'center' }}>
//           <div className="feedback-stat-title">Total Feedback</div>
//           <div className="feedback-stat-value" style={{ fontSize: '24px', fontWeight: 'bold' }}>{totalFeedback}</div>
//         </div>
//         <div className="feedback-stat" style={{ textAlign: 'center' }}>
//           <div className="feedback-stat-title">Average Rating</div>
//           <div className="feedback-stat-value" style={{ fontSize: '24px', fontWeight: 'bold' }}>{practitioner?.ratings?.average || 0}/5</div>
//         </div>
//         <div className="feedback-stat" style={{ textAlign: 'center' }}>
//           <div className="feedback-stat-title">Positive</div>
//           <div className="feedback-stat-value" style={{ fontSize: '24px', fontWeight: 'bold', color: 'green' }}>{positiveFeedback}</div>
//         </div>
//         <div className="feedback-stat" style={{ textAlign: 'center' }}>
//           <div className="feedback-stat-title">Needs Attention</div>
//           <div className="feedback-stat-value" style={{ fontSize: '24px', fontWeight: 'bold', color: 'red' }}>{needsAttention}</div>
//         </div>
//       </div>

//       <div className="recent-feedback" style={{ marginTop: '20px' }}>
//         <h4>Recent Feedback</h4>
//         {feedback.length === 0 ? (
//           <div>No feedback yet.</div>
//         ) : (
//           feedback.slice(0, 2).map((item) => (
//             <div key={item._id} className="feedback-item" style={{ marginBottom: '15px' }}>
//               <div style={{ display: 'flex', justifyContent: 'space-between' }}>
//                 <div>
//                   <strong>{item.practitionerId?.name}</strong>
//                   <span style={{ fontSize: '12px', color: '#888' }}> - {item.sessionId?.therapyType}</span>
//                 </div>
//                 <div>
//                   <span style={{ fontWeight: 'bold' }}>Rating: {item.ratings?.overall}</span>
//                 </div>
//               </div>
//               <p>{item.comments?.additionalComments || 'No comments provided.'}</p>
//               <div>
//                 <span
//                   style={{
//                     backgroundColor: item.ratings?.overall >= 4 ? '#4CAF50' : '#FF5252',
//                     padding: '5px 10px',
//                     borderRadius: '5px',
//                     color: '#fff',
//                   }}
//                 >
//                   {item.ratings?.overall >= 4 ? 'Positive' : 'Needs Attention'}
//                 </span>
//               </div>
//             </div>
//           ))
//         )}
//       </div>

//       <div className="practitioner-performance" style={{ marginTop: '30px' }}>
//         <h4>Practitioner Performance</h4>
//         <div>
//           <div><strong>{practitioner?.name}</strong></div>
//           <div><strong>Specialization:</strong> {practitioner?.specialization.join(', ')}</div>
//           <div><strong>Experience:</strong> {practitioner?.experienceYears} years</div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FeedbackCard;


import React, { useEffect, useState } from 'react';
import axios from '../../utils/axios';  
import { useAuth } from '../../utils/authContext'; 

const FeedbackCard = ({ practitionerId }) => {
  const { user } = useAuth();
  const [feedback, setFeedback] = useState([]);
  const [practitioner, setPractitioner] = useState(null);
  const [loading, setLoading] = useState(true);
  const [totalFeedback, setTotalFeedback] = useState(0);
  const [positiveFeedback, setPositiveFeedback] = useState(0);
  const [needsAttention, setNeedsAttention] = useState(0);

  // Fetch feedback details and practitioner information
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch feedback for the practitioner
        const feedbackData = await axios.get(`/feedback/practitioner/${practitionerId}`);
        setFeedback(feedbackData.data.data);
        setTotalFeedback(feedbackData.data.data.length);

        // Count positive and needs attention feedbacks
        const positive = feedbackData.data.data.filter(fb => fb.ratings.overall >= 4).length;
        const needsAttention = feedbackData.data.data.filter(fb => fb.ratings.overall < 3).length;
        setPositiveFeedback(positive);
        setNeedsAttention(needsAttention);

        // Fetch practitioner details
        const practitionerData = await axios.get(`/admin/practitioners/${practitionerId}`);
        setPractitioner(practitionerData.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      setLoading(false);
    };

    fetchData();
  }, [practitionerId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-emerald-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-emerald-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm border border-emerald-200 p-6">
          <h3 className="text-2xl font-bold text-emerald-900 mb-6">Feedback Analytics</h3>
          
          {/* Feedback Summary Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-emerald-50 rounded-xl p-6 text-center border border-emerald-100">
              <div className="text-sm font-medium text-emerald-700 mb-2">Total Feedback</div>
              <div className="text-3xl font-bold text-emerald-900">{totalFeedback}</div>
            </div>
            <div className="bg-emerald-50 rounded-xl p-6 text-center border border-emerald-100">
              <div className="text-sm font-medium text-emerald-700 mb-2">Average Rating</div>
              <div className="text-3xl font-bold text-emerald-900">{practitioner?.ratings?.average || 0}/5</div>
            </div>
            <div className="bg-emerald-50 rounded-xl p-6 text-center border border-emerald-100">
              <div className="text-sm font-medium text-emerald-700 mb-2">Positive</div>
              <div className="text-3xl font-bold text-green-600">{positiveFeedback}</div>
            </div>
            <div className="bg-emerald-50 rounded-xl p-6 text-center border border-emerald-100">
              <div className="text-sm font-medium text-emerald-700 mb-2">Needs Attention</div>
              <div className="text-3xl font-bold text-red-600">{needsAttention}</div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Feedback Section */}
            <div className="bg-emerald-50 rounded-xl p-6 border border-emerald-100">
              <h4 className="text-xl font-semibold text-emerald-900 mb-4">Recent Feedback</h4>
              {feedback.length === 0 ? (
                <div className="text-center py-8">
                  <div className="text-4xl mb-2 text-emerald-400">💬</div>
                  <p className="text-emerald-600">No feedback yet.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {feedback.slice(0, 2).map((item) => (
                    <div key={item._id} className="bg-white rounded-lg p-4 border border-emerald-200">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <div className="font-semibold text-emerald-900">{item.practitionerId?.name}</div>
                          <div className="text-sm text-emerald-600 mt-1">
                            {item.sessionId?.therapyType}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-emerald-900">Rating: {item.ratings?.overall}</div>
                          <div className={`text-xs font-medium px-2 py-1 rounded-full mt-1 ${
                            item.ratings?.overall >= 4 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {item.ratings?.overall >= 4 ? 'Positive' : 'Needs Attention'}
                          </div>
                        </div>
                      </div>
                      <p className="text-emerald-700 text-sm">
                        {item.comments?.additionalComments || 'No comments provided.'}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Practitioner Performance Section */}
            <div className="bg-emerald-50 rounded-xl p-6 border border-emerald-100">
              <h4 className="text-xl font-semibold text-emerald-900 mb-4">Practitioner Performance</h4>
              {practitioner && (
                <div className="space-y-4">
                  <div className="bg-white rounded-lg p-4 border border-emerald-200">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                        <span className="text-emerald-600 font-semibold text-lg">
                          {practitioner.name?.charAt(0) || 'P'}
                        </span>
                      </div>
                      <div>
                        <div className="font-bold text-emerald-900 text-lg">{practitioner.name}</div>
                        <div className="text-sm text-emerald-600">Practitioner</div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-emerald-700 font-medium">Specialization:</span>
                        <span className="text-emerald-900">
                          {practitioner.specialization?.join(', ') || 'Not specified'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-emerald-700 font-medium">Experience:</span>
                        <span className="text-emerald-900">
                          {practitioner.experienceYears || 0} years
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-emerald-700 font-medium">Average Rating:</span>
                        <span className="text-emerald-900 font-bold">
                          {practitioner.ratings?.average || 0}/5
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Rating Breakdown */}
                  <div className="bg-white rounded-lg p-4 border border-emerald-200">
                    <h5 className="font-semibold text-emerald-900 mb-3">Rating Distribution</h5>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-emerald-700">Positive (4-5 stars)</span>
                        <span className="font-bold text-green-600">{positiveFeedback}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-emerald-700">Needs Attention (1-3 stars)</span>
                        <span className="font-bold text-red-600">{needsAttention}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* All Feedback List */}
          {feedback.length > 0 && (
            <div className="mt-8 bg-emerald-50 rounded-xl p-6 border border-emerald-100">
              <h4 className="text-xl font-semibold text-emerald-900 mb-4">All Feedback</h4>
              <div className="space-y-4">
                {feedback.map((item) => (
                  <div key={item._id} className="bg-white rounded-lg p-4 border border-emerald-200">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <div className="font-semibold text-emerald-900">{item.patientId?.name || 'Anonymous'}</div>
                        <div className="text-sm text-emerald-600 mt-1">
                          {new Date(item.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-1 mb-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <span
                              key={star}
                              className={`text-lg ${
                                star <= (item.ratings?.overall || 0) 
                                  ? 'text-yellow-400' 
                                  : 'text-gray-300'
                              }`}
                            >
                              ★
                            </span>
                          ))}
                        </div>
                        <div className={`text-xs font-medium px-2 py-1 rounded-full ${
                          item.ratings?.overall >= 4 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {item.ratings?.overall >= 4 ? 'Positive' : 'Needs Attention'}
                        </div>
                      </div>
                    </div>
                    
                    {/* Detailed Ratings */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                      <div>
                        <div className="text-xs text-emerald-600">Professionalism</div>
                        <div className="font-semibold text-emerald-900">{item.ratings?.professionalism || 'N/A'}</div>
                      </div>
                      <div>
                        <div className="text-xs text-emerald-600">Cleanliness</div>
                        <div className="font-semibold text-emerald-900">{item.ratings?.cleanliness || 'N/A'}</div>
                      </div>
                      <div>
                        <div className="text-xs text-emerald-600">Effectiveness</div>
                        <div className="font-semibold text-emerald-900">{item.ratings?.effectiveness || 'N/A'}</div>
                      </div>
                      <div>
                        <div className="text-xs text-emerald-600">Communication</div>
                        <div className="font-semibold text-emerald-900">{item.ratings?.communication || 'N/A'}</div>
                      </div>
                    </div>

                    {/* Comments */}
                    {item.comments && (
                      <div className="space-y-2">
                        {item.comments.strengths && (
                          <div>
                            <div className="text-sm font-medium text-emerald-700">Symptoms Reported:</div>
                            <div className="text-emerald-600 text-sm">{item.comments.strengths}</div>
                          </div>
                        )}
                        {item.comments.improvements && (
                          <div>
                            <div className="text-sm font-medium text-emerald-700">Side Effects:</div>
                            <div className="text-emerald-600 text-sm">{item.comments.improvements}</div>
                          </div>
                        )}
                        {item.comments.additionalComments && (
                          <div>
                            <div className="text-sm font-medium text-emerald-700">Improvements Noticed:</div>
                            <div className="text-emerald-600 text-sm">{item.comments.additionalComments}</div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeedbackCard;