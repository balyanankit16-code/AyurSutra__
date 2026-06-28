// import api from '../utils/axios.js';

// class WebRTCService {
//   constructor() {
//     this.peerConnection = null;
//     this.localStream = null;
//     this.remoteStream = null;
//     this.socket = null;
//     this.sessionId = null;
//     this.roomName = null;
//     this.config = {
//       iceServers: [
//         { urls: 'stun:stun.l.google.com:19302' },
//         { urls: 'stun:stun1.l.google.com:19302' }
//       ]
//     };
//     this.onRemoteStream = null;
//     this.onCallEnded = null;
//     this.onCallInitiated = null;
//   }

//   initialize(socket) {
//     this.socket = socket;
//     this.setupSocketListeners();
//   }

//   setupSocketListeners() {
//     // WebRTC signaling handlers
//     this.socket.on('webrtc-offer', async (data) => {
//       if (this.onIncomingCall) {
//         this.onIncomingCall(data);
//       }
//     });

//     this.socket.on('webrtc-answer', async (data) => {
//       await this.handleAnswer(data.answer);
//     });

//     this.socket.on('webrtc-ice-candidate', async (data) => {
//       await this.addIceCandidate(data.candidate);
//     });

//     this.socket.on('webrtc-user-joined', (data) => {
//       console.log('User joined:', data);
//     });

//     this.socket.on('webrtc-user-left', (data) => {
//       if (this.onCallEnded) {
//         this.onCallEnded(data);
//       }
//     });
//   }

//   async initializePeerConnection() {
//     this.peerConnection = new RTCPeerConnection(this.config);

//     // Add local stream to connection
//     if (this.localStream) {
//       this.localStream.getTracks().forEach(track => {
//         this.peerConnection.addTrack(track, this.localStream);
//       });
//     }

//     // Handle incoming stream
//     this.peerConnection.ontrack = (event) => {
//       this.remoteStream = event.streams[0];
//       if (this.onRemoteStream) {
//         this.onRemoteStream(this.remoteStream);
//       }
//     };

//     // Handle ICE candidates
//     this.peerConnection.onicecandidate = (event) => {
//       if (event.candidate) {
//         this.socket.emit('webrtc-ice-candidate', {
//           sessionId: this.sessionId,
//           candidate: event.candidate,
//           targetSocketId: this.targetSocketId
//         });
//       }
//     };
//   }

//   async getLocalStream() {
//     try {
//       this.localStream = await navigator.mediaDevices.getUserMedia({
//         video: true,
//         audio: true
//       });
//       return this.localStream;
//     } catch (error) {
//       console.error('Error accessing media devices:', error);
//       throw error;
//     }
//   }

//   async initiateCall(patientId, practitionerId) {
//     try {
//        const userResponse = await api.get('/auth/me');
//     const userId = userResponse.data.user._id;
//     const userRole = userResponse.data.user.role;

//     const response = await api.post('/webrtc/initiate', {
//       patientId,
//       practitionerId: userId, // Use the fetched userId here
//       scheduledSessionId: null
//     });

//     const { sessionId, roomName } = response.data.data;
//     this.sessionId = sessionId;
//     this.roomName = roomName;
      

//       // Join WebRTC room
//       this.socket.emit('webrtc-join-room', {
//         sessionId,
//         userId: practitionerId,
//         userRole: 'practitioner'
//       });

//       if (this.onCallInitiated) {
//         this.onCallInitiated(sessionId);
//       }

//       return { sessionId, roomName };
//     } catch (error) {
//       console.error('Error initiating call:', error);
//       throw error;
//     }
//   }

//   async createOffer(targetSocketId) {
//     this.targetSocketId = targetSocketId;
//     await this.initializePeerConnection();
//     const offer = await this.peerConnection.createOffer();
//     await this.peerConnection.setLocalDescription(offer);
    
//     this.socket.emit('webrtc-offer', {
//       sessionId: this.sessionId,
//       offer,
//       targetSocketId: this.targetSocketId,
//       userId: localStorage.getItem('userId')
//     });
//   }

//   async handleOffer(offer, targetSocketId) {
//     this.targetSocketId = targetSocketId;
//     await this.initializePeerConnection();
//     await this.peerConnection.setRemoteDescription(offer);
    
//     const answer = await this.peerConnection.createAnswer();
//     await this.peerConnection.setLocalDescription(answer);
    
//     this.socket.emit('webrtc-answer', {
//       sessionId: this.sessionId,
//       answer,
//       targetSocketId: this.targetSocketId,
//       userId: localStorage.getItem('userId')
//     });
//   }

//   async handleAnswer(answer) {
//     await this.peerConnection.setRemoteDescription(answer);
//   }

//   async addIceCandidate(candidate) {
//     if (this.peerConnection) {
//       await this.peerConnection.addIceCandidate(candidate);
//     }
//   }

//   async endCall() {
//     if (this.localStream) {
//       this.localStream.getTracks().forEach(track => track.stop());
//     }
//     if (this.peerConnection) {
//       this.peerConnection.close();
//     }
    
//     if (this.sessionId) {
//       this.socket.emit('webrtc-leave-room', {
//         sessionId: this.sessionId
//       });
      
//       // Update session status to ended
//       try {
//         await api.put(`/api/webrtc/${this.sessionId}/end`);
//       } catch (error) {
//         console.error('Error ending session:', error);
//       }
//     }

//     this.sessionId = null;
//     this.roomName = null;
//     this.localStream = null;
//     this.remoteStream = null;
//     this.peerConnection = null;
//   }

//   // Set callback functions
//   setCallbacks(callbacks) {
//     if (callbacks.onRemoteStream) this.onRemoteStream = callbacks.onRemoteStream;
//     if (callbacks.onCallEnded) this.onCallEnded = callbacks.onCallEnded;
//     if (callbacks.onCallInitiated) this.onCallInitiated = callbacks.onCallInitiated;
//     if (callbacks.onIncomingCall) this.onIncomingCall = callbacks.onIncomingCall;
//   }
// }

// export default new WebRTCService();


import api from '../utils/axios.js';

class WebRTCService {
  constructor() {
    this.peerConnection = null;
    this.localStream = null;
    this.remoteStream = null;
    this.socket = null;
    this.sessionId = null;
    this.roomName = null;
    this.config = {
      iceServers: [
        { urls: 'stun:stun.l.google.com:19302' },
        { urls: 'stun:stun1.l.google.com:19302' }
      ]
    };
    this.onRemoteStream = null;
    this.onCallEnded = null;
    this.onCallInitiated = null;
  }

  initialize(socket) {
    this.socket = socket;
    this.setupSocketListeners();
  }

  setupSocketListeners() {
    // WebRTC signaling handlers
    this.socket.on('webrtc-offer', async (data) => {
      if (this.onIncomingCall) {
        this.onIncomingCall(data);
      }
    });

    this.socket.on('webrtc-answer', async (data) => {
      await this.handleAnswer(data.answer);
    });

    this.socket.on('webrtc-ice-candidate', async (data) => {
      await this.addIceCandidate(data.candidate);
    });

    this.socket.on('webrtc-user-joined', (data) => {
      console.log('User joined:', data);
    });

    this.socket.on('webrtc-user-left', (data) => {
      if (this.onCallEnded) {
        this.onCallEnded(data);
      }
    });
  }

  async initializePeerConnection() {
    this.peerConnection = new RTCPeerConnection(this.config);

    // Add local stream to connection
    if (this.localStream) {
      this.localStream.getTracks().forEach((track) => {
        this.peerConnection.addTrack(track, this.localStream);
      });
    }

    // Handle incoming stream
    this.peerConnection.ontrack = (event) => {
      this.remoteStream = event.streams[0];
      if (this.onRemoteStream) {
        this.onRemoteStream(this.remoteStream);
      }
    };

    // Handle ICE candidates
    this.peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        this.socket.emit('webrtc-ice-candidate', {
          sessionId: this.sessionId,
          candidate: event.candidate,
          targetSocketId: this.targetSocketId
        });
      }
    };
  }

  async getLocalStream() {
    try {
      this.localStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      });
      return this.localStream;
    } catch (error) {
      console.error('Error accessing media devices:', error);
      throw error;
    }
  }

  // Function to fetch user details from the backend
  async fetchUserDetails() {
    try {
      const response = await api.get('/auth/me');
      const { _id: userId, role: userRole } = response.data.data;
      return { userId, userRole };
    } catch (error) {
      console.error('Error fetching user details:', error);
      throw error;
    }
  }

  async initiateCall(patientId, practitionerId) {
    try {
      // Fetch user details from /auth/me
      const { userId, userRole } = await this.fetchUserDetails();

      const response = await api.post('/webrtc/initiate', {
        patientId,
        practitionerId: userId, // Use the fetched userId here
        scheduledSessionId: null
      });

      const { sessionId, roomName } = response.data.data;
      this.sessionId = sessionId;
      this.roomName = roomName;

      // Join WebRTC room
      this.socket.emit('webrtc-join-room', {
        sessionId,
        userId: practitionerId, // You may want to use userId here as well for current user
        userRole: userRole // Use the fetched userRole
      });

      if (this.onCallInitiated) {
        this.onCallInitiated(sessionId);
      }

      return { sessionId, roomName };
    } catch (error) {
      console.error('Error initiating call:', error);
      throw error;
    }
  }

  async createOffer(targetSocketId) {
    this.targetSocketId = targetSocketId;
    await this.initializePeerConnection();
    const offer = await this.peerConnection.createOffer();
    await this.peerConnection.setLocalDescription(offer);

    // Get userId from /auth/me
    const { userId } = await this.fetchUserDetails();

    this.socket.emit('webrtc-offer', {
      sessionId: this.sessionId,
      offer,
      targetSocketId: this.targetSocketId,
      userId // Use the fetched userId here
    });
  }

  async handleOffer(offer, targetSocketId) {
    this.targetSocketId = targetSocketId;
    await this.initializePeerConnection();
    await this.peerConnection.setRemoteDescription(offer);

    const answer = await this.peerConnection.createAnswer();
    await this.peerConnection.setLocalDescription(answer);

    // Get userId from /auth/me
    const { userId } = await this.fetchUserDetails();

    this.socket.emit('webrtc-answer', {
      sessionId: this.sessionId,
      answer,
      targetSocketId: this.targetSocketId,
      userId // Use the fetched userId here
    });
  }

  async handleAnswer(answer) {
    await this.peerConnection.setRemoteDescription(answer);
  }

  async addIceCandidate(candidate) {
    if (this.peerConnection) {
      await this.peerConnection.addIceCandidate(candidate);
    }
  }

  async endCall() {
    if (this.localStream) {
      this.localStream.getTracks().forEach((track) => track.stop());
    }
    if (this.peerConnection) {
      this.peerConnection.close();
    }

    if (this.sessionId) {
      this.socket.emit('webrtc-leave-room', { sessionId: this.sessionId });

      // Update session status to ended
      try {
        await api.put(`/api/webrtc/${this.sessionId}/end`);
      } catch (error) {
        console.error('Error ending session:', error);
      }
    }

    this.sessionId = null;
    this.roomName = null;
    this.localStream = null;
    this.remoteStream = null;
    this.peerConnection = null;
  }

  // Set callback functions
  setCallbacks(callbacks) {
    if (callbacks.onRemoteStream) this.onRemoteStream = callbacks.onRemoteStream;
    if (callbacks.onCallEnded) this.onCallEnded = callbacks.onCallEnded;
    if (callbacks.onCallInitiated) this.onCallInitiated = callbacks.onCallInitiated;
    if (callbacks.onIncomingCall) this.onIncomingCall = callbacks.onIncomingCall;
  }
}

export default new WebRTCService();
