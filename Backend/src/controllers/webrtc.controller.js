import asyncHandler from '../utils/asyncHandler.js';
import ApiResponse from '../utils/ApiResponse.js';
import ApiError from '../utils/ApiError.js';
import WebRTCSession from '../models/WebRTCSession.models.js';
import Session from '../models/Session.models.js';
import AuditLog from '../models/AuditLog.models.js';

// POST /api/webrtc/initiate
export const initiateSession = asyncHandler(async (req, res) => {
  const { patientId, practitionerId, scheduledSessionId } = req.body;
  
  // Validate if users exist and have permission
  if (req.user.role === 'practitioner' && req.user._id.toString() !== practitionerId) {
    throw new ApiError(403, 'Not authorized to initiate session');
  }
  
  if (req.user.role === 'patient' && req.user._id.toString() !== patientId) {
    throw new ApiError(403, 'Not authorized to initiate session');
  }

  // Check if scheduled session exists and is valid
  if (scheduledSessionId) {
    const scheduledSession = await Session.findOne({
      _id: scheduledSessionId,
      $or: [
        { patientId: patientId, practitionerId: practitionerId },
        { patientId: practitionerId, practitionerId: patientId }
      ],
      status: { $in: ['booked', 'confirmed'] }
    });
    
    if (!scheduledSession) {
      throw new ApiError(400, 'No valid scheduled session found');
    }
  }

  const sessionId = `webrtc_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  const roomName = `room_${sessionId}`;

  const webRTCSession = await WebRTCSession.create({
    sessionId,
    patientId,
    practitionerId,
    scheduledSessionId,
    roomName,
    status: 'initiated'
  });

  await AuditLog.create({
    userId: req.user._id,
    userModel: req.user.role.charAt(0).toUpperCase() + req.user.role.slice(1),
    action: 'create',
    resourceType: 'WebRTCSession',
    resourceId: webRTCSession._id,
    description: 'WebRTC session initiated',
    ipAddress: req.ip
  });

  res.status(201).json(
    new ApiResponse(201, {
      sessionId: webRTCSession.sessionId,
      roomName: webRTCSession.roomName,
      status: webRTCSession.status
    }, "WebRTC session initiated successfully")
  );
});

// PUT /api/webrtc/:sessionId/end
export const endSession = asyncHandler(async (req, res) => {
  const { sessionId } = req.params;
  
  const webRTCSession = await WebRTCSession.findOne({ sessionId });
  if (!webRTCSession) {
    throw new ApiError(404, 'WebRTC session not found');
  }

  // Authorization check
  const isAuthorized = 
    webRTCSession.patientId.toString() === req.user._id.toString() ||
    webRTCSession.practitionerId.toString() === req.user._id.toString() ||
    req.user.role === 'admin';
  
  if (!isAuthorized) {
    throw new ApiError(403, 'Not authorized to end this session');
  }

  webRTCSession.status = 'ended';
  webRTCSession.endTime = new Date();
  webRTCSession.duration = Math.round((webRTCSession.endTime - webRTCSession.startTime) / (1000 * 60)); // minutes
  
  await webRTCSession.save();

  await AuditLog.create({
    userId: req.user._id,
    userModel: req.user.role.charAt(0).toUpperCase() + req.user.role.slice(1),
    action: 'update',
    resourceType: 'WebRTCSession',
    resourceId: webRTCSession._id,
    description: 'WebRTC session ended',
    ipAddress: req.ip
  });

  res.status(200).json(
    new ApiResponse(200, webRTCSession, "WebRTC session ended successfully")
  );
});

// GET /api/webrtc/sessions
export const getSessionHistory = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  
  let filter = {};
  if (req.user.role === 'patient') {
    filter.patientId = req.user._id;
  } else if (req.user.role === 'practitioner') {
    filter.practitionerId = req.user._id;
  }

  const sessions = await WebRTCSession.find(filter)
    .populate('patientId', 'name profileImage')
    .populate('practitionerId', 'name specialization profileImage')
    .populate('scheduledSessionId', 'therapyType scheduledStart')
    .sort({ createdAt: -1 })
    .limit(limit * 1)
    .skip((page - 1) * limit);

  const total = await WebRTCSession.countDocuments(filter);

  res.status(200).json(
    new ApiResponse(200, {
      sessions,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    }, "WebRTC sessions fetched successfully")
  );
});