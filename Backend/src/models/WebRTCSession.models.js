import mongoose from 'mongoose';

const webRTCSessionSchema = new mongoose.Schema({
  sessionId:{ 
    type: String, 
    required: true, 
    unique: true 
  },
  patientId:{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Patient', 
    required: true 
  },
  practitionerId:{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Practitioner', 
    required: true 
  },
  status: { 
    type: String, 
    enum: ['initiated', 'connecting', 'active', 'ended', 'failed'], 
    default: 'initiated' 
  },
  startTime:{ 
    type: Date, 
    default: Date.now 
  },
  endTime:{ 
    type: Date 
  },
  duration:{ 
    type: Number, 
    default: 0 
  }, 
  // WebRTC specific fields
  patientSocketId:{ 
    type: String 
  },
  practitionerSocketId: {
    type: String 
  },
  iceCandidates: [{
    candidate: String,
    sdpMLineIndex: Number,
    sdpMid: String,
    usernameFragment: String,
    timestamp: { type: Date, default: Date.now }
  }],
  // Session quality metrics
  qualityMetrics: {
    audioQuality: { type: String, enum: ['poor', 'fair', 'good', 'excellent'] },
    videoQuality: { type: String, enum: ['poor', 'fair', 'good', 'excellent'] },
    connectionStability: { type: String, enum: ['unstable', 'stable', 'very-stable'] },
    packetLoss: { type: Number }, // percentage
    jitter: { type: Number } // milliseconds
  },
  recording: {
    isRecorded: { type: Boolean, default: false },
    recordingUrl: { type: String },
    storagePath: { type: String }
  }
}, {
  timestamps: true
});

export default mongoose.model('WebRTCSession', webRTCSessionSchema);