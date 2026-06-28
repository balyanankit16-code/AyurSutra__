import React, { useState, useEffect, useRef } from 'react';
import webrtcService from '../../services/webrtcService.js';
import api from '../../utils/axios.js';
const VideoCallModal = ({ isOpen, onClose, patient, onCallEnd }) => {
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [callStatus, setCallStatus] = useState('initializing');
  const [error, setError] = useState(null);

  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      initializeCall();
    } else {
      cleanup();
    }
  }, [isOpen]);

  useEffect(() => {
    if (localStream && localVideoRef.current) {
      localVideoRef.current.srcObject = localStream;
    }
  }, [localStream]);

  useEffect(() => {
    if (remoteStream && remoteVideoRef.current) {
      remoteVideoRef.current.srcObject = remoteStream;
    }
  }, [remoteStream]);

  const initializeCall = async () => {
  try {
    setCallStatus('initializing');
    
    // Get local media stream first
    try {
      const stream = await webrtcService.getLocalStream();
      setLocalStream(stream);
    } catch (mediaError) {
      if (mediaError.name === 'NotAllowedError') {
        setError('Camera/microphone access was denied. Please allow permissions and try again.');
      } else {
        setError('Failed to access camera/microphone. Please check your device permissions.');
      }
      setCallStatus('error');
      return;
    }

    // Get current user info
    // const currentUserId = localStorage.getItem('userId');
     const response = await api.get('/auth/me');
      const { _id: currentUserId } = response.data.data;
    
    // Initialize call with correct user IDs
    await webrtcService.initiateCall(patient._id, currentUserId);
    setCallStatus('calling');

    // Set up WebRTC callbacks
    webrtcService.setCallbacks({
      onRemoteStream: (stream) => {
        setRemoteStream(stream);
        setCallStatus('connected');
      },
      onCallEnded: () => {
        setCallStatus('ended');
        setTimeout(() => {
          onCallEnd();
          onClose();
        }, 2000);
      }
    });

  } catch (error) {
    console.error('Error initializing call:', error);
    
    // Better error messages based on status code
    if (error.response?.status === 403) {
      setError('You are not authorized to start a video call with this patient.');
    } else if (error.response?.status === 404) {
      setError('Patient not found or session invalid.');
    } else {
      setError('Failed to start video call. Please try again.');
    }
    
    setCallStatus('error');
  }
};

  const cleanup = () => {
    if (localStream) {
      localStream.getTracks().forEach(track => track.stop());
    }
    setLocalStream(null);
    setRemoteStream(null);
    setError(null);
  };

  const handleEndCall = async () => {
    setCallStatus('ending');
    await webrtcService.endCall();
    onCallEnd();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <i className="fas fa-video text-green-600"></i>
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">
                Video Call with {patient?.name}
              </h2>
              <p className="text-sm text-gray-600">
                {callStatus === 'initializing' && 'Initializing call...'}
                {callStatus === 'calling' && 'Calling patient...'}
                {callStatus === 'connected' && 'Call connected'}
                {callStatus === 'ending' && 'Ending call...'}
                {callStatus === 'ended' && 'Call ended'}
                {callStatus === 'error' && 'Call failed'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <i className="fas fa-times text-xl"></i>
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
            <div className="flex items-center space-x-2 text-red-800">
              <i className="fas fa-exclamation-circle"></i>
              <span className="font-medium">{error}</span>
            </div>
          </div>
        )}

        {/* Video Containers */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
          {/* Local Video */}
          <div className="bg-gray-900 rounded-lg overflow-hidden aspect-video relative">
            <video
              ref={localVideoRef}
              autoPlay
              muted
              playsInline
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
              You
            </div>
            {!localStream && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-white text-center">
                  <i className="fas fa-user text-4xl mb-2 opacity-50"></i>
                  <p className="text-sm">Loading your video...</p>
                </div>
              </div>
            )}
          </div>

          {/* Remote Video */}
          <div className="bg-gray-900 rounded-lg overflow-hidden aspect-video relative">
            <video
              ref={remoteVideoRef}
              autoPlay
              playsInline
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
              {patient?.name}
            </div>
            {!remoteStream && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-white text-center">
                  <i className="fas fa-user text-4xl mb-2 opacity-50"></i>
                  <p className="text-sm">
                    {callStatus === 'calling' ? 'Calling patient...' : 'Waiting for patient...'}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Call Controls */}
        <div className="flex justify-center space-x-4">
          <button
            onClick={handleEndCall}
            disabled={callStatus === 'ending'}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full flex items-center space-x-2 transition-colors disabled:opacity-50"
          >
            <i className="fas fa-phone-slash"></i>
            <span>End Call</span>
          </button>
        </div>

        {/* Call Status */}
        <div className="mt-4 text-center">
          <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-sm ${
            callStatus === 'connected' 
              ? 'bg-green-100 text-green-800' 
              : callStatus === 'error'
              ? 'bg-red-100 text-red-800'
              : 'bg-blue-100 text-blue-800'
          }`}>
            {callStatus === 'connected' && <i className="fas fa-check-circle"></i>}
            {callStatus === 'error' && <i className="fas fa-exclamation-circle"></i>}
            {['initializing', 'calling', 'ending'].includes(callStatus) && (
              <i className="fas fa-spinner animate-spin"></i>
            )}
            <span className="capitalize">{callStatus}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCallModal;