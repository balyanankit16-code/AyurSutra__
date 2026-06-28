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
  }

  initialize(socket) {
    this.socket = socket;
  }

  async initializePeerConnection() {
    this.peerConnection = new RTCPeerConnection(this.config);

    // Add local stream to connection
    if (this.localStream) {
      this.localStream.getTracks().forEach(track => {
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

  async createOffer() {
    await this.initializePeerConnection();
    const offer = await this.peerConnection.createOffer();
    await this.peerConnection.setLocalDescription(offer);
    
    this.socket.emit('webrtc-offer', {
      sessionId: this.sessionId,
      offer,
      targetSocketId: this.targetSocketId
    });
  }

  async handleOffer(offer) {
    await this.initializePeerConnection();
    await this.peerConnection.setRemoteDescription(offer);
    
    const answer = await this.peerConnection.createAnswer();
    await this.peerConnection.setLocalDescription(answer);
    
    this.socket.emit('webrtc-answer', {
      sessionId: this.sessionId,
      answer,
      targetSocketId: this.targetSocketId
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

  endCall() {
    if (this.localStream) {
      this.localStream.getTracks().forEach(track => track.stop());
    }
    if (this.peerConnection) {
      this.peerConnection.close();
    }
    this.socket.emit('webrtc-leave-room', {
      sessionId: this.sessionId
    });
  }
}

export default new WebRTCService();