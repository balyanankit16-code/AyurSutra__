import React, { useEffect } from 'react';
import webrtcService from '../../services/webrtcService.js';

const IncomingCallModal = ({ isOpen, callData, onAccept, onReject }) => {
  useEffect(() => {
    if (isOpen) {
      // Auto-reject after 30 seconds if no action
      const timeout = setTimeout(() => {
        onReject();
      }, 30000);

      return () => clearTimeout(timeout);
    }
  }, [isOpen, onReject]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 text-center max-w-sm w-full mx-4">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <i className="fas fa-video text-green-600 text-2xl"></i>
        </div>
        
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Incoming Video Call</h2>
        <p className="text-gray-600 mb-2">Practitioner is calling you</p>
        
        <div className="flex justify-center space-x-4 mt-6">
          <button
            onClick={onReject}
            className="bg-red-600 hover:bg-red-700 text-white w-12 h-12 rounded-full flex items-center justify-center transition-colors"
          >
            <i className="fas fa-phone-slash"></i>
          </button>
          
          <button
            onClick={onAccept}
            className="bg-green-600 hover:bg-green-700 text-white w-12 h-12 rounded-full flex items-center justify-center transition-colors"
          >
            <i className="fas fa-phone"></i>
          </button>
        </div>
        
        <p className="text-sm text-gray-500 mt-4">
          This call will be automatically rejected in 30 seconds
        </p>
      </div>
    </div>
  );
};

export default IncomingCallModal;