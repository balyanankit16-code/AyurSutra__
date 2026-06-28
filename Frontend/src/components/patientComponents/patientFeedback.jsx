// import React, { useEffect, useState } from 'react';
// import axios from '../../utils/axios';  // Import axios instance
// //import { toast } from 'react-toastify';

// const PatientFeedback = ({ patientId }) => {
//   const [feedbackList, setFeedbackList] = useState([]); // Store feedback data
//   const [newFeedback, setNewFeedback] = useState({ ratings: { overall: 0, professionalism: 0 }, comments: '' }); // New feedback form data
//   const [loading, setLoading] = useState(true);
//   const [isEditing, setIsEditing] = useState(false);  // To toggle between edit mode and add mode
//   const [feedbackToEdit, setFeedbackToEdit] = useState(null); // Feedback being edited

//   // Fetch all previous feedback for the patient
//   useEffect(() => {
//     const fetchFeedback = async () => {
//       try {
//         const response = await axios.get(`/feedback/my-feedback`);
//         setFeedbackList(response.data.data);
//       } catch (error) {
//         console.error('Error fetching feedback:', error);
//         toast.error('Error fetching feedback data.');
//       }
//       setLoading(false);
//     };

//     fetchFeedback();
//   }, []);

//   // Handle input change for feedback form
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewFeedback({
//       ...newFeedback,
//       [name]: value,
//     });
//   };

//   // Handle ratings change
//   const handleRatingsChange = (e) => {
//     const { name, value } = e.target;
//     setNewFeedback({
//       ...newFeedback,
//       ratings: { ...newFeedback.ratings, [name]: parseInt(value) },
//     });
//   };

//   // Create new feedback
//   const handleCreateFeedback = async () => {
//     try {
//       const response = await axios.post(`/feedback`, {
//         ...newFeedback,
//         patientId, // Add the patientId to the feedback
//       });

//       // Add new feedback at the end of the list
//       setFeedbackList([...feedbackList, response.data.data]);
//       setNewFeedback({ ratings: { overall: 0, professionalism: 0 }, comments: '' });
//       toast.success('Feedback submitted successfully!');
//     } catch (error) {
//       console.error('Error creating feedback:', error);
//       toast.error('Error submitting feedback.');
//     }
//   };

//   // Edit existing feedback
//   const handleEditFeedback = async () => {
//     try {
//       const response = await axios.put(`/feedback/${feedbackToEdit._id}`, {
//         ...newFeedback,
//         patientId, // Add patientId to ensure correct ownership
//       });

//       // Update the specific feedback in the array
//       const updatedFeedbackList = feedbackList.map((fb) =>
//         fb._id === feedbackToEdit._id ? response.data.data : fb
//       );
//       setFeedbackList(updatedFeedbackList);
//       setIsEditing(false);
//       setFeedbackToEdit(null);
//       setNewFeedback({ ratings: { overall: 0, professionalism: 0 }, comments: '' });
//       toast.success('Feedback updated successfully!');
//     } catch (error) {
//       console.error('Error updating feedback:', error);
//       toast.error('Error updating feedback.');
//     }
//   };

//   // Delete feedback
//   const handleDeleteFeedback = async (feedbackId) => {
//     try {
//       await axios.delete(`/feedback/${feedbackId}`);

//       // Remove the deleted feedback from the array
//       const updatedFeedbackList = feedbackList.filter((fb) => fb._id !== feedbackId);
//       setFeedbackList(updatedFeedbackList);
//       toast.success('Feedback deleted successfully!');
//     } catch (error) {
//       console.error('Error deleting feedback:', error);
//       toast.error('Error deleting feedback.');
//     }
//   };

//   // Start editing an existing feedback
//   const handleEditClick = (feedback) => {
//     setIsEditing(true);
//     setFeedbackToEdit(feedback);
//     setNewFeedback(feedback); // Pre-populate the form with the existing feedback
//   };

//   return (
//     <div className="feedback-container" style={{ backgroundColor: '#E8F6F3', padding: '20px', borderRadius: '8px' }}>
//       <h2>Feedback for Your Sessions</h2>

//       {/* Feedback Form */}
//       <div className="feedback-form">
//         <h3>{isEditing ? 'Edit Feedback' : 'Add Feedback'}</h3>
//         <div className="form-group">
//           <label>Overall Rating</label>
//           <input
//             type="number"
//             name="overall"
//             value={newFeedback.ratings.overall}
//             onChange={handleRatingsChange}
//             min="1"
//             max="5"
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label>Professionalism Rating</label>
//           <input
//             type="number"
//             name="professionalism"
//             value={newFeedback.ratings.professionalism}
//             onChange={handleRatingsChange}
//             min="1"
//             max="5"
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label>Comments</label>
//           <textarea
//             name="comments"
//             value={newFeedback.comments}
//             onChange={handleInputChange}
//             rows="4"
//             required
//           />
//         </div>
//         <button
//           onClick={isEditing ? handleEditFeedback : handleCreateFeedback}
//           style={{ backgroundColor: '#4CAF50', color: 'white', padding: '10px 20px', borderRadius: '5px' }}
//         >
//           {isEditing ? 'Update Feedback' : 'Submit Feedback'}
//         </button>
//       </div>

//       {/* Feedback List */}
//       <div className="feedback-list" style={{ marginTop: '30px' }}>
//         <h3>Your Previous Feedback</h3>
//         {loading ? (
//           <div>Loading...</div>
//         ) : feedbackList.length === 0 ? (
//           <div>No feedback submitted yet.</div>
//         ) : (
//           feedbackList.map((feedback) => (
//             <div key={feedback._id} className="feedback-item" style={{ marginBottom: '15px', padding: '15px', border: '1px solid #ddd', borderRadius: '8px' }}>
//               <div style={{ display: 'flex', justifyContent: 'space-between' }}>
//                 <strong>{feedback.sessionId?.therapyType}</strong>
//                 <span style={{ color: feedback.ratings.overall >= 4 ? 'green' : 'red', fontWeight: 'bold' }}>
//                   Rating: {feedback.ratings.overall}
//                 </span>
//               </div>
//               <p>{feedback.comments || 'No comments provided.'}</p>
//               <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
//                 <button
//                   onClick={() => handleEditClick(feedback)}
//                   style={{ backgroundColor: '#FFD700', color: 'white', marginRight: '10px', padding: '5px 10px', borderRadius: '5px' }}
//                 >
//                   Edit
//                 </button>
//                 <button
//                   onClick={() => handleDeleteFeedback(feedback._id)}
//                   style={{ backgroundColor: '#FF5252', color: 'white', padding: '5px 10px', borderRadius: '5px' }}
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default PatientFeedback;


import React, { useState, useEffect } from 'react';
import api from '../../utils/axios';

const FeedbackCard = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [editingFeedback, setEditingFeedback] = useState(null);
  const [formData, setFormData] = useState({
    sessionId: '',
    ratings: {
      overall: 0,
      professionalism: 0,
      cleanliness: 0,
      effectiveness: 0,
      communication: 0
    },
    comments: {
      strengths: '',
      improvements: '',
      additionalComments: ''
    },
    anonymous: false
  });

  // Fetch user's feedback
  const fetchFeedbacks = async () => {
    try {
      setLoading(true);
      const response = await api.get('/feedback/my-feedback');
      if (response.data.success) {
        setFeedbacks(response.data.data.feedbacks || []);
      }
    } catch (error) {
      console.error('Error fetching feedbacks:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  // Handle form input changes
  const handleInputChange = (path, value) => {
    const keys = path.split('.');
    setFormData(prev => {
      const newData = { ...prev };
      let current = newData;
      
      for (let i = 0; i < keys.length - 1; i++) {
        current[keys[i]] = { ...current[keys[i]] };
        current = current[keys[i]];
      }
      
      current[keys[keys.length - 1]] = value;
      return newData;
    });
  };

  // Handle rating star click
  const handleRatingChange = (category, rating) => {
    handleInputChange(`ratings.${category}`, rating);
  };

  // Submit feedback (create or update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate session ID for new feedback
    if (!editingFeedback && !formData.sessionId.trim()) {
      alert('Please enter a session ID');
      return;
    }

    try {
      if (editingFeedback) {
        // Update existing feedback
        const response = await api.put(`/feedback/${editingFeedback._id}`, {
          ratings: formData.ratings,
          comments: formData.comments
        });
        
        if (response.data.success) {
          // Update the feedback in the list
          setFeedbacks(prev => 
            prev.map(fb => 
              fb._id === editingFeedback._id ? response.data.data : fb
            )
          );
        }
      } else {
        // Create new feedback with sessionId
        const response = await api.post('/feedback', {
          sessionId: formData.sessionId.trim(),
          ratings: formData.ratings,
          comments: formData.comments,
          anonymous: formData.anonymous
        });
        
        if (response.data.success) {
          // Add new feedback to the list
          setFeedbacks(prev => [response.data.data, ...prev]);
        }
      }
      
      // Reset form and close
      setFormData({
        sessionId: '',
        ratings: {
          overall: 0,
          professionalism: 0,
          cleanliness: 0,
          effectiveness: 0,
          communication: 0
        },
        comments: {
          strengths: '',
          improvements: '',
          additionalComments: ''
        },
        anonymous: false
      });
      setEditingFeedback(null);
      setShowFeedbackForm(false);
    } catch (error) {
      console.error('Error submitting feedback:', error);
      alert(error.response?.data?.message || 'Error submitting feedback. Please try again.');
    }
  };

  // Edit feedback
  const handleEdit = (feedback) => {
    setEditingFeedback(feedback);
    setFormData({
      sessionId: feedback.sessionId?._id || '',
      ratings: feedback.ratings,
      comments: feedback.comments,
      anonymous: feedback.anonymous || false
    });
    setShowFeedbackForm(true);
  };

  // Delete feedback
  const handleDelete = async (feedbackId) => {
    if (window.confirm('Are you sure you want to delete this feedback?')) {
      try {
        const response = await api.delete(`/feedback/${feedbackId}`);
        if (response.data.success) {
          // Remove feedback from the list
          setFeedbacks(prev => prev.filter(fb => fb._id !== feedbackId));
        }
      } catch (error) {
        console.error('Error deleting feedback:', error);
        alert('Error deleting feedback. Please try again.');
      }
    }
  };

  // Star rating component
  const StarRating = ({ rating, onRatingChange, disabled = false }) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => !disabled && onRatingChange(star)}
            disabled={disabled}
            className={`text-2xl ${
              star <= rating ? 'text-yellow-400' : 'text-gray-300'
            } ${!disabled ? 'hover:text-yellow-300' : ''} transition-colors`}
          >
            ★
          </button>
        ))}
      </div>
    );
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-emerald-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header with Add New Button */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-emerald-900">My Feedback</h1>
          <button
            onClick={() => {
              setEditingFeedback(null);
              setShowFeedbackForm(true);
              setFormData({
                sessionId: '',
                ratings: {
                  overall: 0,
                  professionalism: 0,
                  cleanliness: 0,
                  effectiveness: 0,
                  communication: 0
                },
                comments: {
                  strengths: '',
                  improvements: '',
                  additionalComments: ''
                },
                anonymous: false
              });
            }}
            className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors font-medium"
          >
            + Add New Feedback
          </button>
        </div>

        {/* Feedback Form */}
        {showFeedbackForm && (
          <div className="bg-white rounded-xl shadow-lg border border-emerald-200 p-6 mb-8">
            <h2 className="text-2xl font-bold text-emerald-900 mb-6">
              {editingFeedback ? 'Edit Feedback' : 'Submit Feedback'}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Session ID Input */}
              <div>
                <label className="block text-sm font-medium text-emerald-700 mb-2">
                  Session ID
                </label>
                <input
                  type="text"
                  value={formData.sessionId}
                  onChange={(e) => handleInputChange('sessionId', e.target.value)}
                  placeholder="Enter session ID"
                  className="w-full p-3 border border-emerald-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white"
                  required={!editingFeedback}
                  disabled={!!editingFeedback}
                />
                <p className="text-sm text-emerald-600 mt-1">
                  Enter the session ID for which you want to provide feedback
                </p>
              </div>

              {/* Overall Rating */}
              <div>
                <label className="block text-sm font-medium text-emerald-700 mb-2">
                  Overall Rating
                </label>
                <StarRating
                  rating={formData.ratings.overall}
                  onRatingChange={(rating) => handleRatingChange('overall', rating)}
                />
              </div>

              {/* Additional Rating Categories */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-emerald-700 mb-2">
                    Professionalism
                  </label>
                  <StarRating
                    rating={formData.ratings.professionalism}
                    onRatingChange={(rating) => handleRatingChange('professionalism', rating)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-emerald-700 mb-2">
                    Cleanliness
                  </label>
                  <StarRating
                    rating={formData.ratings.cleanliness}
                    onRatingChange={(rating) => handleRatingChange('cleanliness', rating)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-emerald-700 mb-2">
                    Effectiveness
                  </label>
                  <StarRating
                    rating={formData.ratings.effectiveness}
                    onRatingChange={(rating) => handleRatingChange('effectiveness', rating)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-emerald-700 mb-2">
                    Communication
                  </label>
                  <StarRating
                    rating={formData.ratings.communication}
                    onRatingChange={(rating) => handleRatingChange('communication', rating)}
                  />
                </div>
              </div>

              {/* Comments Sections */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-emerald-700 mb-2">
                    Symptoms Reported
                  </label>
                  <textarea
                    value={formData.comments.strengths}
                    onChange={(e) => handleInputChange('comments.strengths', e.target.value)}
                    placeholder="Add symptom..."
                    className="w-full p-3 border border-emerald-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 resize-none"
                    rows="3"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-emerald-700 mb-2">
                    Side Effects (if any)
                  </label>
                  <textarea
                    value={formData.comments.improvements}
                    onChange={(e) => handleInputChange('comments.improvements', e.target.value)}
                    placeholder="Add side effect..."
                    className="w-full p-3 border border-emerald-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 resize-none"
                    rows="3"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-emerald-700 mb-2">
                    Improvements Noticed
                  </label>
                  <textarea
                    value={formData.comments.additionalComments}
                    onChange={(e) => handleInputChange('comments.additionalComments', e.target.value)}
                    placeholder="Add improvement..."
                    className="w-full p-3 border border-emerald-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 resize-none"
                    rows="3"
                  />
                </div>
              </div>

              {/* Anonymous Option */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="anonymous"
                  checked={formData.anonymous}
                  onChange={(e) => handleInputChange('anonymous', e.target.checked)}
                  className="w-4 h-4 text-emerald-600 border-emerald-300 rounded focus:ring-emerald-500"
                />
                <label htmlFor="anonymous" className="ml-2 text-sm text-emerald-700">
                  Submit anonymously
                </label>
              </div>

              {/* Form Actions */}
              <div className="flex space-x-4 pt-4">
                <button
                  type="submit"
                  className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors font-medium flex-1"
                >
                  {editingFeedback ? 'Update Feedback' : 'Submit Feedback'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowFeedbackForm(false);
                    setEditingFeedback(null);
                  }}
                  className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors font-medium flex-1"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Feedback List */}
        <div className="space-y-6">
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto"></div>
              <p className="text-emerald-600 mt-4">Loading feedback...</p>
            </div>
          ) : feedbacks.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl border border-emerald-200">
              <div className="text-6xl mb-4">💬</div>
              <h3 className="text-xl font-semibold text-emerald-900 mb-2">No Feedback Yet</h3>
              <p className="text-emerald-600">Submit your first feedback to get started.</p>
            </div>
          ) : (
            feedbacks.map((feedback) => (
              <div key={feedback._id} className="bg-white rounded-xl shadow-sm border border-emerald-200 p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-emerald-900">
                      Session: {feedback.sessionId?._id || 'N/A'}
                      {feedback.practitionerId?.name && ` with ${feedback.practitionerId.name}`}
                    </h3>
                    <p className="text-emerald-600 text-sm">
                      {formatDate(feedback.createdAt)}
                      {feedback.anonymous && ' • Submitted anonymously'}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(feedback)}
                      className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-lg hover:bg-emerald-200 transition-colors text-sm font-medium"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(feedback._id)}
                      className="bg-red-100 text-red-700 px-3 py-1 rounded-lg hover:bg-red-200 transition-colors text-sm font-medium"
                    >
                      Delete
                    </button>
                  </div>
                </div>

                {/* Ratings Display */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-emerald-700 font-medium">Overall</p>
                    <StarRating rating={feedback.ratings.overall} disabled={true} />
                  </div>
                  <div>
                    <p className="text-sm text-emerald-700 font-medium">Professionalism</p>
                    <StarRating rating={feedback.ratings.professionalism} disabled={true} />
                  </div>
                  <div>
                    <p className="text-sm text-emerald-700 font-medium">Effectiveness</p>
                    <StarRating rating={feedback.ratings.effectiveness} disabled={true} />
                  </div>
                </div>

                {/* Comments Display */}
                {feedback.comments && (
                  <div className="space-y-3">
                    {feedback.comments.strengths && (
                      <div>
                        <p className="text-sm font-medium text-emerald-700 mb-1">Symptoms Reported:</p>
                        <p className="text-emerald-600">{feedback.comments.strengths}</p>
                      </div>
                    )}
                    {feedback.comments.improvements && (
                      <div>
                        <p className="text-sm font-medium text-emerald-700 mb-1">Side Effects:</p>
                        <p className="text-emerald-600">{feedback.comments.improvements}</p>
                      </div>
                    )}
                    {feedback.comments.additionalComments && (
                      <div>
                        <p className="text-sm font-medium text-emerald-700 mb-1">Improvements Noticed:</p>
                        <p className="text-emerald-600">{feedback.comments.additionalComments}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default FeedbackCard;