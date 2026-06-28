
// export default PractitionerCard;
import React, { useState, useEffect } from 'react';
import axios from '../../utils/axios';

const PractitionerCard = () => {
  const [practitioners, setPractitioners] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedPractitioner, setSelectedPractitioner] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    bio: '',
    experienceYears: '',
    maxPatientsPerDay: '',
    isActive: true,
    specialization: [{ therapyType: '', yearsOfExperience: '', certification: '', hourlyRate: '' }],
    qualifications: [{ degree: '', institution: '', year: '', certificateUrl: '' }],
    workingHours: [{ dayOfWeek: '', startTime: '', endTime: '', isActive: true }],
    durationEstimates: [{ therapyType: '', duration: '' }],
    languages: ['']
  });

  // Fetch all practitioners
  const fetchPractitioners = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get('/admin/practitioners');
      console.log("res get -> ", response);
      if (response.data.success) {
        setPractitioners(response.data.data.practitioners);
      }
    } catch (err) {
      console.error('Fetch error:', err);
      if (err.response?.status === 401) {
        setError('Please login to access this page');
      } else {
        setError(err.response?.data?.message || 'Failed to fetch practitioners');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPractitioners();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle array field changes
  const handleArrayChange = (index, field, value, arrayName) => {
    setFormData(prev => ({
      ...prev,
      [arrayName]: prev[arrayName].map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  // Add new entry to array
  const addArrayField = (arrayName, defaultItem) => {
    setFormData(prev => ({
      ...prev,
      [arrayName]: [...prev[arrayName], defaultItem]
    }));
  };

  // Remove entry from array
  const removeArrayField = (index, arrayName) => {
    setFormData(prev => ({
      ...prev,
      [arrayName]: prev[arrayName].filter((_, i) => i !== index)
    }));
  };

  // Handle language changes
  const handleLanguageChange = (index, value) => {
    setFormData(prev => ({
      ...prev,
      languages: prev.languages.map((lang, i) => i === index ? value : lang)
    }));
  };

  // Add new language
  const addLanguage = () => {
    setFormData(prev => ({
      ...prev,
      languages: [...prev.languages, '']
    }));
  };

  // Remove language
  const removeLanguage = (index) => {
    setFormData(prev => ({
      ...prev,
      languages: prev.languages.filter((_, i) => i !== index)
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    setError('');

    try {
      // Prepare data - filter out empty array entries and convert types
      const submitData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        bio: formData.bio,
        experienceYears: parseInt(formData.experienceYears) || 0,
        maxPatientsPerDay: parseInt(formData.maxPatientsPerDay) || 10,
        isActive: formData.isActive,
        specialization: formData.specialization
          .filter(s => s.therapyType.trim() !== '')
          .map(s => ({
            ...s,
            yearsOfExperience: parseInt(s.yearsOfExperience) || 0,
            hourlyRate: parseInt(s.hourlyRate) || 0
          })),
        qualifications: formData.qualifications.filter(q => q.degree.trim() !== ''),
        workingHours: formData.workingHours
          .filter(w => w.dayOfWeek !== '')
          .map(w => ({
            ...w,
            dayOfWeek: parseInt(w.dayOfWeek)
          })),
        durationEstimates: Object.fromEntries(
          formData.durationEstimates
            .filter(d => d.therapyType.trim() !== '')
            .map(d => [d.therapyType, parseInt(d.duration) || 0])
        ),
        languages: formData.languages.filter(l => l.trim() !== '')
      };

      console.log("Sending data:", submitData);

      const response = await axios.post('/admin/practitioners', submitData);
      
      if (response.data.success) {
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          password: '',
          bio: '',
          experienceYears: '',
          maxPatientsPerDay: '',
          isActive: true,
          specialization: [{ therapyType: '', yearsOfExperience: '', certification: '', hourlyRate: '' }],
          qualifications: [{ degree: '', institution: '', year: '', certificateUrl: '' }],
          workingHours: [{ dayOfWeek: '', startTime: '', endTime: '', isActive: true }],
          durationEstimates: [{ therapyType: '', duration: '' }],
          languages: ['']
        });
        setShowForm(false);
        
        // Refresh the practitioners list
        await fetchPractitioners();
        
        alert('Practitioner created successfully!');
      }
    } catch (err) {
      console.error("Create error:", err);
      if (err.response?.status === 401) {
        setError('Please login to create practitioners');
      } else {
        setError(err.response?.data?.message || 'Failed to create practitioner');
      }
    } finally {
      setFormLoading(false);
    }
  };

  // Day of week mapping
  const daysOfWeek = [
    { value: 0, label: 'Sunday' },
    { value: 1, label: 'Monday' },
    { value: 2, label: 'Tuesday' },
    { value: 3, label: 'Wednesday' },
    { value: 4, label: 'Thursday' },
    { value: 5, label: 'Friday' },
    { value: 6, label: 'Saturday' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Practitioner Management</h1>
        {error && error.includes('login') && (
          <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700">{error}</p>
            <button 
              onClick={() => window.location.href = '/auth'}
              className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Go to Login
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Navigation */}
        

<div className="bg-white rounded-lg shadow-sm p-6 mt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <button
              onClick={() => setShowForm(true)}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Add New Practitioner
            </button>
          </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {/* Practitioners Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {loading ? (
              <div className="col-span-2 p-8 text-center">
                <div className="animate-pulse">Loading practitioners...</div>
              </div>
            ) : error && !loading ? (
              <div className="col-span-2 p-8 text-center">
                <div className="text-red-600">{error}</div>
                <button 
                  onClick={fetchPractitioners}
                  className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Retry
                </button>
              </div>
            ) : practitioners.length === 0 ? (
              <div className="col-span-2 p-8 text-center text-gray-500">
                No practitioners found. Click "Add New Practitioner" to create one.
              </div>
            ) : (
              practitioners.map((practitioner) => (
                <div 
                  key={practitioner._id} 
                  className="bg-green-50 border border-green-200 rounded-lg p-6 hover:bg-green-100 transition-colors cursor-pointer"
                  onClick={() => setSelectedPractitioner(practitioner)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <img
                        src={practitioner.profileImage}
                        alt={practitioner.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{practitioner.name}</h3>
                        <p className="text-sm text-gray-600">{practitioner.email}</p>
                      </div>
                    </div>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      practitioner.isActive 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {practitioner.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Phone:</span>
                      <span className="text-gray-900">{practitioner.phone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Experience:</span>
                      <span className="text-gray-900">{practitioner.experienceYears} years</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Specializations:</span>
                      <span className="text-gray-900">{practitioner.specialization?.length || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Rating:</span>
                      <span className="text-gray-900">
                        {practitioner.ratings?.average || 0} ⭐ ({practitioner.ratings?.count || 0} reviews)
                      </span>
                    </div>
                  </div>

                  {practitioner.specialization?.length > 0 && (
                    <div className="mt-4">
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Therapies:</h4>
                      <div className="flex flex-wrap gap-1">
                        {practitioner.specialization.slice(0, 3).map((spec, index) => (
                          <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                            {spec.therapyType} (₹{spec.hourlyRate})
                          </span>
                        ))}
                        {practitioner.specialization.length > 3 && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800">
                            +{practitioner.specialization.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>

          {/* Create Practitioner Form Modal */}
          {showForm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-lg shadow-xl w-full max-w-6xl max-h-[90vh] overflow-y-auto">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-900">Add New Practitioner</h2>
                </div>

                <form onSubmit={handleSubmit} className="p-6">
                  {error && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700">
                      {error}
                    </div>
                  )}

                  {/* Basic Information */}
                  <div className="mb-8">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Enter name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Enter email"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Enter phone"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password *</label>
                        <input
                          type="password"
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Enter password"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Experience Years *</label>
                        <input
                          type="number"
                          name="experienceYears"
                          value={formData.experienceYears}
                          onChange={handleChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="e.g., 15"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Max Patients Per Day</label>
                        <input
                          type="number"
                          name="maxPatientsPerDay"
                          value={formData.maxPatientsPerDay}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="e.g., 18"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                        <textarea
                          name="bio"
                          value={formData.bio}
                          onChange={handleChange}
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Enter practitioner bio"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Specializations */}
                  <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-medium text-gray-900">Specializations</h3>
                      <button
                        type="button"
                        onClick={() => addArrayField('specialization', { therapyType: '', yearsOfExperience: '', certification: '', hourlyRate: '' })}
                        className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm"
                      >
                        Add Specialization
                      </button>
                    </div>
                    {formData.specialization.map((spec, index) => (
                      <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4 p-4 bg-gray-50 rounded-lg">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Therapy Type</label>
                          <input
                            type="text"
                            value={spec.therapyType}
                            onChange={(e) => handleArrayChange(index, 'therapyType', e.target.value, 'specialization')}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="e.g., Shirodhara"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Years</label>
                          <input
                            type="number"
                            value={spec.yearsOfExperience}
                            onChange={(e) => handleArrayChange(index, 'yearsOfExperience', e.target.value, 'specialization')}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="e.g., 7"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Certification</label>
                          <input
                            type="text"
                            value={spec.certification}
                            onChange={(e) => handleArrayChange(index, 'certification', e.target.value, 'specialization')}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="e.g., Kerala Healing School"
                          />
                        </div>
                        <div className="flex items-end space-x-2">
                          <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Hourly Rate (₹)</label>
                            <input
                              type="number"
                              value={spec.hourlyRate}
                              onChange={(e) => handleArrayChange(index, 'hourlyRate', e.target.value, 'specialization')}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder="e.g., 2000"
                            />
                          </div>
                          {formData.specialization.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeArrayField(index, 'specialization')}
                              className="px-3 py-2 bg-red-600 text-white rounded-lg text-sm"
                            >
                              Remove
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Working Hours */}
                  <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-medium text-gray-900">Working Hours</h3>
                      <button
                        type="button"
                        onClick={() => addArrayField('workingHours', { dayOfWeek: '', startTime: '', endTime: '', isActive: true })}
                        className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm"
                      >
                        Add Working Hours
                      </button>
                    </div>
                    {formData.workingHours.map((wh, index) => (
                      <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4 p-4 bg-gray-50 rounded-lg">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Day</label>
                          <select
                            value={wh.dayOfWeek}
                            onChange={(e) => handleArrayChange(index, 'dayOfWeek', e.target.value, 'workingHours')}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="">Select Day</option>
                            {daysOfWeek.map(day => (
                              <option key={day.value} value={day.value}>
                                {day.label}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
                          <input
                            type="time"
                            value={wh.startTime}
                            onChange={(e) => handleArrayChange(index, 'startTime', e.target.value, 'workingHours')}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">End Time</label>
                          <input
                            type="time"
                            value={wh.endTime}
                            onChange={(e) => handleArrayChange(index, 'endTime', e.target.value, 'workingHours')}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div className="flex items-end space-x-2">
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              checked={wh.isActive}
                              onChange={(e) => handleArrayChange(index, 'isActive', e.target.checked, 'workingHours')}
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <label className="ml-2 text-sm text-gray-700">Active</label>
                          </div>
                          {formData.workingHours.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeArrayField(index, 'workingHours')}
                              className="px-3 py-2 bg-red-600 text-white rounded-lg text-sm"
                            >
                              Remove
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Duration Estimates */}
                  <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-medium text-gray-900">Session Durations</h3>
                      <button
                        type="button"
                        onClick={() => addArrayField('durationEstimates', { therapyType: '', duration: '' })}
                        className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm"
                      >
                        Add Duration
                      </button>
                    </div>
                    {formData.durationEstimates.map((de, index) => (
                      <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 p-4 bg-gray-50 rounded-lg">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Therapy Type</label>
                          <input
                            type="text"
                            value={de.therapyType}
                            onChange={(e) => handleArrayChange(index, 'therapyType', e.target.value, 'durationEstimates')}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="e.g., Abhyanga"
                          />
                        </div>
                        <div className="flex items-end space-x-2">
                          <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Duration (minutes)</label>
                            <input
                              type="number"
                              value={de.duration}
                              onChange={(e) => handleArrayChange(index, 'duration', e.target.value, 'durationEstimates')}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder="e.g., 60"
                            />
                          </div>
                          {formData.durationEstimates.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeArrayField(index, 'durationEstimates')}
                              className="px-3 py-2 bg-red-600 text-white rounded-lg text-sm"
                            >
                              Remove
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Languages */}
                  <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-medium text-gray-900">Languages</h3>
                      <button
                        type="button"
                        onClick={addLanguage}
                        className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm"
                      >
                        Add Language
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {formData.languages.map((language, index) => (
                        <div key={index} className="flex items-end space-x-2">
                          <div className="flex-1">
                            <input
                              type="text"
                              value={language}
                              onChange={(e) => handleLanguageChange(index, e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder="e.g., English"
                            />
                          </div>
                          {formData.languages.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeLanguage(index)}
                              className="px-3 py-2 bg-red-600 text-white rounded-lg text-sm"
                            >
                              Remove
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Form Actions */}
                  <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={formLoading}
                      className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                    >
                      {formLoading ? 'Creating...' : 'Create Practitioner'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PractitionerCard;