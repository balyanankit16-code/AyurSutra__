// components/admin/CreateCenterForm.jsx
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import api from '../../utils/axios';

const CreateCenterForm = ({ onCenterCreated }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      setError('');

      // Prepare operating hours data
      const operatingHours = [
        { dayOfWeek: 0, dayName: 'Sunday', openTime: '09:00', closeTime: '17:00', isOpen: data.sundayOpen },
        { dayOfWeek: 1, dayName: 'Monday', openTime: data.mondayOpen || '09:00', closeTime: data.mondayClose || '17:00', isOpen: true },
        { dayOfWeek: 2, dayName: 'Tuesday', openTime: data.tuesdayOpen || '09:00', closeTime: data.tuesdayClose || '17:00', isOpen: true },
        { dayOfWeek: 3, dayName: 'Wednesday', openTime: data.wednesdayOpen || '09:00', closeTime: data.wednesdayClose || '17:00', isOpen: true },
        { dayOfWeek: 4, dayName: 'Thursday', openTime: data.thursdayOpen || '09:00', closeTime: data.thursdayClose || '17:00', isOpen: true },
        { dayOfWeek: 5, dayName: 'Friday', openTime: data.fridayOpen || '09:00', closeTime: data.fridayClose || '17:00', isOpen: true },
        { dayOfWeek: 6, dayName: 'Saturday', openTime: data.saturdayOpen || '09:00', closeTime: data.saturdayClose || '17:00', isOpen: data.saturdayOpen },
      ].filter(day => day.isOpen);

      const centerData = {
        name: data.name,
        address: {
          street: data.street,
          city: data.city,
          state: data.state,
          zipCode: data.zipCode,
          country: data.country || 'India'
        },
        contact: {
          phone: data.phone,
          email: data.email
        },
        operatingHours: operatingHours,
        isActive: true
      };

      const response = await api.post('/center/create', centerData);
      
      if (response.data.success) {
        onCenterCreated(response.data.data);
      } else {
        setError(response.data.message || 'Failed to create center');
      }
    } catch (err) {
      console.error('Error creating center:', err);
      setError(err.response?.data?.message || 'Error creating center');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-emerald-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-lg border border-emerald-100 overflow-hidden">
        {/* Header */}
        <div className="bg-emerald-600 p-6 text-white">
          <h1 className="text-2xl font-bold">Create Your Wellness Center</h1>
          <p className="text-emerald-100 mt-2">
            Set up your center to start managing practitioners and patients
          </p>
        </div>

        {/* Form */}
        <div className="p-6">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <div className="flex items-center">
                <span className="text-red-500 mr-2">⚠️</span>
                <p className="text-red-700">{error}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-emerald-900 border-b border-emerald-200 pb-2">
                Basic Information
              </h3>
              
              <div>
                <label className="block text-sm font-medium text-emerald-700 mb-2">
                  Center Name *
                </label>
                <input
                  type="text"
                  {...register('name', { required: 'Center name is required' })}
                  className="w-full px-4 py-3 border border-emerald-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                  placeholder="Enter center name"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-emerald-700 mb-2">
                    Contact Email *
                  </label>
                  <input
                    type="email"
                    {...register('email', { 
                      required: 'Email is required',
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: 'Invalid email address'
                      }
                    })}
                    className="w-full px-4 py-3 border border-emerald-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                    placeholder="contact@center.com"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-emerald-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    {...register('phone', { 
                      required: 'Phone number is required',
                      pattern: {
                        value: /^\d{10}$/,
                        message: 'Please enter a valid 10-digit phone number'
                      }
                    })}
                    className="w-full px-4 py-3 border border-emerald-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                    placeholder="9876543210"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Address Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-emerald-900 border-b border-emerald-200 pb-2">
                Address Information
              </h3>
              
              <div>
                <label className="block text-sm font-medium text-emerald-700 mb-2">
                  Street Address *
                </label>
                <input
                  type="text"
                  {...register('street', { required: 'Street address is required' })}
                  className="w-full px-4 py-3 border border-emerald-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                  placeholder="Enter street address"
                />
                {errors.street && (
                  <p className="text-red-500 text-sm mt-1">{errors.street.message}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-emerald-700 mb-2">
                    City *
                  </label>
                  <input
                    type="text"
                    {...register('city', { required: 'City is required' })}
                    className="w-full px-4 py-3 border border-emerald-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                    placeholder="City"
                  />
                  {errors.city && (
                    <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-emerald-700 mb-2">
                    State *
                  </label>
                  <input
                    type="text"
                    {...register('state', { required: 'State is required' })}
                    className="w-full px-4 py-3 border border-emerald-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                    placeholder="State"
                  />
                  {errors.state && (
                    <p className="text-red-500 text-sm mt-1">{errors.state.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-emerald-700 mb-2">
                    ZIP Code *
                  </label>
                  <input
                    type="text"
                    {...register('zipCode', { required: 'ZIP code is required' })}
                    className="w-full px-4 py-3 border border-emerald-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                    placeholder="ZIP Code"
                  />
                  {errors.zipCode && (
                    <p className="text-red-500 text-sm mt-1">{errors.zipCode.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-emerald-700 mb-2">
                  Country
                </label>
                <input
                  type="text"
                  {...register('country')}
                  defaultValue="India"
                  className="w-full px-4 py-3 border border-emerald-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                  placeholder="Country"
                />
              </div>
            </div>

            {/* Operating Hours */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-emerald-900 border-b border-emerald-200 pb-2">
                Operating Hours
              </h3>
              
              <div className="space-y-3">
                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map(day => (
                  <div key={day} className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg">
                    <span className="font-medium text-emerald-700 w-24">{day}</span>
                    <div className="flex items-center space-x-2 flex-1 justify-end">
                      <input
                        type="time"
                        {...register(`${day.toLowerCase()}Open`)}
                        defaultValue="09:00"
                        className="px-3 py-2 border border-emerald-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                      />
                      <span className="text-emerald-600">to</span>
                      <input
                        type="time"
                        {...register(`${day.toLowerCase()}Close`)}
                        defaultValue="17:00"
                        className="px-3 py-2 border border-emerald-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                  </div>
                ))}
                
                {/* Saturday */}
                <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      {...register('saturdayOpen')}
                      className="w-4 h-4 text-emerald-600 border-emerald-300 rounded focus:ring-emerald-500"
                    />
                    <span className="font-medium text-emerald-700">Saturday</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="time"
                      {...register('saturdayOpen')}
                      defaultValue="09:00"
                      className="px-3 py-2 border border-emerald-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                      disabled
                    />
                    <span className="text-emerald-600">to</span>
                    <input
                      type="time"
                      {...register('saturdayClose')}
                      defaultValue="17:00"
                      className="px-3 py-2 border border-emerald-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                      disabled
                    />
                  </div>
                </div>

                {/* Sunday */}
                <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      {...register('sundayOpen')}
                      className="w-4 h-4 text-emerald-600 border-emerald-300 rounded focus:ring-emerald-500"
                    />
                    <span className="font-medium text-emerald-700">Sunday</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="time"
                      {...register('sundayOpen')}
                      defaultValue="09:00"
                      className="px-3 py-2 border border-emerald-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                      disabled
                    />
                    <span className="text-emerald-600">to</span>
                    <input
                      type="time"
                      {...register('sundayClose')}
                      defaultValue="17:00"
                      className="px-3 py-2 border border-emerald-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                      disabled
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-emerald-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-emerald-700 focus:ring-4 focus:ring-emerald-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Creating Center...
                  </div>
                ) : (
                  'Create Center & Continue'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateCenterForm;