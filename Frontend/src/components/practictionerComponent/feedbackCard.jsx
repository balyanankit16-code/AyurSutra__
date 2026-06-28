// import React, { useState, useEffect } from 'react';
// import api from '../../utils/axios';

// const FeedbackCard = () => {
//   const [feedbacks, setFeedbacks] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchFeedback();
//   }, []);

//   const fetchFeedback = async () => {
//     try {
//       const response = await api.get('/practitioner/feedback');
//       setFeedbacks(response.data.data.feedbacks);
//     } catch (error) {
//       console.error('Error fetching feedback:', error);
//       alert('Failed to fetch feedback');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const renderStars = (rating) => {
//     return Array.from({ length: 5 }, (_, i) => (
//       <span
//         key={i}
//         className={i < rating ? 'text-yellow-400 text-lg' : 'text-gray-300 text-lg'}
//       >
//         ★
//       </span>
//     ));
//   };

//   if (loading) return <div className="text-center py-8">Loading feedback...</div>;

//   return (
//     <div className="bg-white rounded-lg shadow-lg p-6">
//       <h2 className="text-xl font-bold text-gray-800 mb-6">Patient Feedback</h2>
      
//       <div className="space-y-6">
//         {feedbacks.map((feedback) => (
//           <div key={feedback._id} className="border-b border-gray-200 pb-6 last:border-0">
//             <div className="flex items-start justify-between mb-3">
//               <div>
//                 <h3 className="font-semibold text-gray-800">
//                   {feedback.patientId?.name || 'Anonymous Patient'}
//                 </h3>
//                 <p className="text-sm text-gray-600">
//                   {feedback.sessionId?.therapyType} •{' '}
//                   {feedback.sessionId?.scheduledStart 
//                     ? new Date(feedback.sessionId.scheduledStart).toLocaleDateString()
//                     : 'Date not available'
//                   }
//                 </p>
//               </div>
//               <div className="flex items-center space-x-1">
//                 {renderStars(feedback.ratings?.overall || 0)}
//               </div>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
//               <div>
//                 <label className="block text-sm font-medium text-gray-600">Symptoms Reported</label>
//                 <p className="text-gray-800">
//                   {feedback.symptomsReported?.join(', ') || 'None reported'}
//                 </p>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-600">Side Effects</label>
//                 <p className="text-gray-800">
//                   {feedback.sideEffects?.join(', ') || 'None reported'}
//                 </p>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-600">Improvements</label>
//                 <p className="text-gray-800">
//                   {feedback.improvementsNoticed?.join(', ') || 'None reported'}
//                 </p>
//               </div>
//             </div>

//             {feedback.additionalComments && (
//               <div>
//                 <label className="block text-sm font-medium text-gray-600">Additional Comments</label>
//                 <p className="text-gray-800 mt-1 italic">"{feedback.additionalComments}"</p>
//               </div>
//             )}

//             <p className="text-sm text-gray-500 mt-3">
//               {new Date(feedback.createdAt).toLocaleDateString()}
//             </p>
//           </div>
//         ))}

//         {feedbacks.length === 0 && (
//           <div className="text-center py-8">
//             <p className="text-gray-500">No feedback received yet</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default FeedbackCard;


import React, { useState, useEffect } from 'react';
import api from '../../utils/axios';

const FeedbackCard = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeedback();
  }, []);

  const fetchFeedback = async () => {
    try {
      const response = await api.get('/practitioner/feedback');
      setFeedbacks(response.data.data.feedbacks);
    } catch (error) {
      console.error('Error fetching feedback:', error);
      alert('Failed to fetch feedback');
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={i < rating ? 'text-yellow-400 text-lg' : 'text-gray-300 text-lg'}
      >
        ★
      </span>
    ));
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
          <span className="ml-3 text-gray-600">Loading feedback...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-green-100">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800">Patient Feedback</h2>
        <div className="flex items-center space-x-2 bg-green-100 text-green-800 px-3 py-1 rounded-full">
          <i className="fas fa-comment-medical text-sm"></i>
          <span className="text-sm font-medium">{feedbacks.length} Reviews</span>
        </div>
      </div>
      
      <div className="space-y-6">
        {feedbacks.map((feedback) => (
          <div 
            key={feedback._id} 
            className="border border-green-100 rounded-xl p-5 bg-green-50 hover:bg-green-100 transition-colors duration-200"
          >
            {/* Patient Info and Rating */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <i className="fas fa-user text-green-600"></i>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">
                    {feedback.patientId?.name || 'Anonymous Patient'}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {feedback.sessionId?.therapyType} •{' '}
                    {feedback.sessionId?.scheduledStart 
                      ? new Date(feedback.sessionId.scheduledStart).toLocaleDateString()
                      : 'Date not available'
                    }
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <div className="flex items-center space-x-1 mb-1">
                  {renderStars(feedback.ratings?.overall || 0)}
                </div>
                <span className="text-sm text-green-600 font-medium">
                  {feedback.ratings?.overall || 0}/5
                </span>
              </div>
            </div>

            {/* Feedback Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="bg-white rounded-lg p-3 border border-green-200">
                <div className="flex items-center space-x-2 mb-2">
                  <i className="fas fa-notes-medical text-green-600 text-sm"></i>
                  <label className="block text-sm font-medium text-gray-700">Symptoms Reported</label>
                </div>
                <p className="text-gray-800 text-sm">
                  {feedback.symptomsReported?.join(', ') || 'None reported'}
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-3 border border-green-200">
                <div className="flex items-center space-x-2 mb-2">
                  <i className="fas fa-exclamation-triangle text-green-600 text-sm"></i>
                  <label className="block text-sm font-medium text-gray-700">Side Effects</label>
                </div>
                <p className="text-gray-800 text-sm">
                  {feedback.sideEffects?.join(', ') || 'None reported'}
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-3 border border-green-200">
                <div className="flex items-center space-x-2 mb-2">
                  <i className="fas fa-chart-line text-green-600 text-sm"></i>
                  <label className="block text-sm font-medium text-gray-700">Improvements</label>
                </div>
                <p className="text-gray-800 text-sm">
                  {feedback.improvementsNoticed?.join(', ') || 'None reported'}
                </p>
              </div>
            </div>

            {/* Additional Comments */}
            {feedback.additionalComments && (
              <div className="bg-white rounded-lg p-4 border border-green-200">
                <div className="flex items-center space-x-2 mb-2">
                  <i className="fas fa-comment text-green-600"></i>
                  <label className="block text-sm font-medium text-gray-700">Additional Comments</label>
                </div>
                <p className="text-gray-800 italic">"{feedback.additionalComments}"</p>
              </div>
            )}

            {/* Footer */}
            <div className="flex justify-between items-center mt-4 pt-3 border-t border-green-200">
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <i className="fas fa-clock"></i>
                <span>{new Date(feedback.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}</span>
              </div>
              <div className="flex items-center space-x-1">
                <i className="fas fa-heart text-green-600"></i>
                <span className="text-sm text-green-600 font-medium">Thank you!</span>
              </div>
            </div>
          </div>
        ))}

        {feedbacks.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-comment-slash text-2xl text-green-600"></i>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">No Feedback Yet</h3>
            <p className="text-gray-600 max-w-md mx-auto">
              Patient feedback will appear here once patients start sharing their experiences with your therapies.
            </p>
          </div>
        )}
      </div>

      {/* Stats Summary */}
      {feedbacks.length > 0 && (
        <div className="mt-6 pt-6 border-t border-green-200">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{feedbacks.length}</div>
              <div className="text-sm text-gray-600">Total Reviews</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {Math.round(feedbacks.reduce((acc, f) => acc + (f.ratings?.overall || 0), 0) / feedbacks.length * 10) / 10}
              </div>
              <div className="text-sm text-gray-600">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {feedbacks.filter(f => f.additionalComments).length}
              </div>
              <div className="text-sm text-gray-600">With Comments</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {new Set(feedbacks.map(f => f.patientId?._id)).size}
              </div>
              <div className="text-sm text-gray-600">Unique Patients</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeedbackCard;