import React, { useState } from 'react';
import Login from './Login';
import Signup from './Signup';

const Auth = () => {
  const [activeTab, setActiveTab] = useState('login');

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="md:flex">
          {/* Left Section - Welcome/Info */}
          <div className="md:w-1/2 bg-gradient-to-br from-green-600 to-green-800 text-white p-8 md:p-12 flex flex-col justify-center">
            <div className="max-w-md mx-auto">
              <div className="flex items-center mb-6">
                <i className="fas fa-leaf text-3xl mr-3 text-green-200"></i>
                <h1 className="text-3xl font-bold">Ayurveda Wellness</h1>
              </div>
              <h2 className="text-2xl font-semibold mb-4">Holistic Healing for Mind, Body & Spirit</h2>
              <p className="mb-6 text-green-100">Join our community of wellness seekers and practitioners. Experience the ancient wisdom of Ayurveda in a modern context.</p>
              
              <div className="space-y-4 mt-8">
                <div className="flex items-start">
                  <i className="fas fa-check-circle text-green-200 mt-1 mr-3"></i>
                  <div>
                    <h3 className="font-semibold">Personalized Treatments</h3>
                    <p className="text-sm text-green-100">Tailored therapies based on your unique constitution</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <i className="fas fa-check-circle text-green-200 mt-1 mr-3"></i>
                  <div>
                    <h3 className="font-semibold">Expert Practitioners</h3>
                    <p className="text-sm text-green-100">Certified professionals with years of experience</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <i className="fas fa-check-circle text-green-200 mt-1 mr-3"></i>
                  <div>
                    <h3 className="font-semibold">Holistic Approach</h3>
                    <p className="text-sm text-green-100">Treating root causes, not just symptoms</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Section - Forms */}
          <div className="md:w-1/2 p-8 md:p-12">
            {/* Tabs for Login/Signup */}
            <div className="flex border-b border-gray-200 mb-8">
              <button
                onClick={() => setActiveTab('login')}
                className={`flex-1 py-3 font-medium text-center border-b-2 transition-colors ${
                  activeTab === 'login'
                    ? 'border-green-600 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Login
              </button>
              <button
                onClick={() => setActiveTab('signup')}
                className={`flex-1 py-3 font-medium text-center border-b-2 transition-colors ${
                  activeTab === 'signup'
                    ? 'border-green-600 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Sign Up
              </button>
            </div>
            
            {/* Form Content */}
            {activeTab === 'login' ? (
              <Login switchToSignup={() => setActiveTab('signup')} />
            ) : (
              <Signup switchToLogin={() => setActiveTab('login')} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
