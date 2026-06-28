





import asyncHandler from '../utils/asyncHandler.js';
import ApiResponse from '../utils/ApiResponse.js';
import ApiError from '../utils/ApiError.js';
import Admin from '../models/Admin.models.js';
import Patient from '../models/Patient.models.js';
import Practitioner from '../models/Practitioner.models.js';
import Session from '../models/Session.models.js';
import Feedback from '../models/Feedback.models.js';
import AuditLog from '../models/AuditLog.models.js';
import Notification from '../models/Notification.models.js';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import bcrypt from "bcryptjs";

export const getDashboard = asyncHandler(async (req, res) => {
  const { centerId } = req.user;
console.log("centerId",req.user);
const { name , email , role  } = req.user;


  const [
    totalPatients,
    totalPractitioners,
    totalSessions,
    upcomingSessions,
    recentFeedbacks,
    monthlyStats
  ] = await Promise.all([
    Patient.countDocuments({centerId , isActive: true }),
    Practitioner.countDocuments({ centerId, isActive: true }),
    Session.countDocuments({ centerId }),
    Session.countDocuments({ 
      centerId, 
      scheduledStart: { $gte: new Date() },
      status: { $in: ['booked', 'confirmed'] }
    }),
    Feedback.find()
      .populate('patientId', 'name')
      .populate('practitionerId', 'name')
      .sort({ createdAt: -1 })
      .limit(5),
    Session.aggregate([
      { $match: { centerId, scheduledStart: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) } } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$scheduledStart" } },
          sessions: { $sum: 1 },
          completed: { $sum: { $cond: [{ $eq: ["$status", "completed"] }, 1, 0] } }
        }
      },
      { $sort: { _id: 1 } }
    ])
  ]);

  const dashboardStats = {
    overview: {
      totalPatients,
      totalPractitioners,
      totalSessions,
      upcomingSessions,
      completionRate: totalSessions > 0 ? ((totalSessions - upcomingSessions) / totalSessions) * 100 : 0
    },
    recentFeedbacks,
    monthlyStats , 
    name , 
    email ,
    role    
  };

  res.status(200).json(
    new ApiResponse(200, dashboardStats, "Dashboard stats fetched successfully")
  );
});

export const createPractitioner = asyncHandler(async (req, res) => {
  if (!req.user || !req.user.centerId) {
    throw new ApiError(400, "User authentication failed or centerId missing");
  }
  
  const centerId  = req.user.centerId;
  const practitionerData = { ...req.body, centerId };

  const existingPractitioner = await Practitioner.findOne({ 
    $or: [{ email: practitionerData.email }, { phone: practitionerData.phone }] 
  });
  if (existingPractitioner) throw new ApiError(400, 'Practitioner with this email or phone already exists');

  if (!practitionerData.password) {
    throw new ApiError(400, "Password is required");
  }

  //  practitionerData.passwordHash = await bcrypt.hash(practitionerData.password, 10);
  // delete practitionerData.password;
  
   practitionerData.passwordHash = practitionerData.password;
  delete practitionerData.password;

  practitionerData.role = "practitioner";



  const practitioner = await Practitioner.create(practitionerData);

  const accessToken = practitioner.generateAccessToken();
  const refreshToken = practitioner.generateRefreshToken();
  await practitioner.storeRefreshToken(refreshToken);


  await AuditLog.create({
    userId: req.user._id,
    userModel: 'Admin',
    action: 'create',
    resourceType: 'Practitioner',
    resourceId: practitioner._id,
    description: 'Practitioner created by admin',
    ipAddress: req.ip
  });

  const createdPractitioner = await Practitioner.findById(practitioner._id)
    .select('-passwordHash -refreshToken');

 res.status(201).json(
    new ApiResponse(
      201,
      {
        user: createdPractitioner,
        accessToken,
        refreshToken
      },
      "Practitioner created successfully"
    )
  );
});

export const getAllPractitioners = asyncHandler(async (req, res) => {
  const { centerId } = req.user;
  const { page = 1, limit = 10, status } = req.query;

  const filter = { centerId };
  if (status === 'active') filter.isActive = true;
  if (status === 'inactive') filter.isActive = false;

  const practitioners = await Practitioner.find(filter)
    .select('-passwordHash -refreshToken')
    .populate('centerId', 'name')
    .sort({ createdAt: -1 })
    .limit(limit * 1)
    .skip((page - 1) * limit);

  const total = await Practitioner.countDocuments(filter);

  res.status(200).json(
    new ApiResponse(200, {
      practitioners,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    }, "Practitioners fetched successfully")
  );
});

export const getAllPatients = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, search } = req.query;

  const filter = { CenterId: req.user.center_id, isActive: true };
  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } },
      { phone: { $regex: search, $options: 'i' } }
    ];
  }

  const patients = await Patient.find(filter)
    .select('-passwordHash -refreshToken')
    .sort({ createdAt: -1 })
    .limit(limit * 1)
    .skip((page - 1) * limit);

  const total = await Patient.countDocuments(filter);

  res.status(200).json(
    new ApiResponse(200, {
      patients,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    }, "Patients fetched successfully")
  );
});

export const getAllSessions = asyncHandler(async (req, res) => {
  const { centerId } = req.user;
  const { page = 1, limit = 10, date, status, practitionerId } = req.query;

  const filter = { centerId };
  if (date) {
    const startDate = new Date(date);
    const endDate = new Date(date);
    endDate.setHours(23, 59, 59, 999);
    filter.scheduledStart = { $gte: startDate, $lte: endDate };
  }
  if (status) filter.status = status;
  if (practitionerId) filter.practitionerId = practitionerId;

  const sessions = await Session.find(filter)
    .populate('patientId', 'name phone')
    .populate('practitionerId', 'name specialization')
    .sort({ scheduledStart: -1 })
    .limit(limit * 1)
    .skip((page - 1) * limit);

  const total = await Session.countDocuments(filter);

  res.status(200).json(
    new ApiResponse(200, {
      sessions,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    }, "Sessions fetched successfully")
  );
});

//not using
export const forceBookSession = asyncHandler(async (req, res) => {
  const { centerId } = req.user;
  const sessionData = { ...req.body, centerId, conflictChecked: true };

  const session = await Session.create(sessionData);

  await AuditLog.create({
    userId: req.user._id,
    userModel: 'Admin',
    action: 'create',
    resourceType: 'Session',
    resourceId: session._id,
    description: 'Session force booked by admin',
    details: sessionData,
    ipAddress: req.ip
  });

  const createdSession = await Session.findById(session._id)
    .populate('patientId', 'name phone')
    .populate('practitionerId', 'name specialization');

  res.status(201).json(
    new ApiResponse(201, createdSession, "Session force booked successfully")
  );
});

//not using
export const reassignPractitioner = asyncHandler(async (req, res) => {
  const { sessionId } = req.params;
  const { practitionerId } = req.body;

  const session = await Session.findOneAndUpdate(
    { _id: sessionId, centerId: req.user.centerId },
    { practitionerId },
    { new: true, runValidators: true }
  )
    .populate('patientId', 'name phone')
    .populate('practitionerId', 'name specialization');

  if (!session) throw new ApiError(404, 'Session not found');

  await AuditLog.create({
    userId: req.user._id,
    userModel: 'Admin',
    action: 'update',
    resourceType: 'Session',
    resourceId: sessionId,
    description: 'Practitioner reassigned by admin',
    details: { newPractitionerId: practitionerId },
    ipAddress: req.ip
  });

  res.status(200).json(
    new ApiResponse(200, session, "Practitioner reassigned successfully")
  );
});


export const getFeedbackReports = asyncHandler(async (req, res) => {
  const { centerId } = req.user;
  const { days = 30 } = req.query;

  const startDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000);

  const feedbacks = await Feedback.aggregate([
    {
      $lookup: {
        from: 'sessions',
        localField: 'sessionId',
        foreignField: '_id',
        as: 'session'
      }
    },
    { $unwind: '$session' },
    { $match: { 'session.centerId': centerId, createdAt: { $gte: startDate } } },
    {
      $group: {
        _id: '$practitionerId',
        averageRating: { $avg: '$ratings.overall' },
        totalFeedbacks: { $sum: 1 },
        ratingsBreakdown: {
          $push: {
            overall: '$ratings.overall',
            professionalism: '$ratings.professionalism',
            effectiveness: '$ratings.effectiveness'
          }
        }
      }
    },
    {
      $lookup: {
        from: 'practitioners',
        localField: '_id',
        foreignField: '_id',
        as: 'practitioner'
      }
    },
    { $unwind: '$practitioner' },
    {
      $project: {
        practitionerName: '$practitioner.name',
        averageRating: { $round: ['$averageRating', 2] },
        totalFeedbacks: 1,
        ratingsBreakdown: 1
      }
    }
  ]);

  res.status(200).json(
    new ApiResponse(200, feedbacks, "Feedback reports fetched successfully")
  );
});

export const getPractitionerAnalytics = asyncHandler(async (req, res) => {
  const { centerId } = req.user;
  const { practitionerId, days = 30 } = req.query;

  const startDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000);

  const filter = { 
    centerId,
    scheduledStart: { $gte: startDate }
  };
  if (practitionerId) filter.practitionerId = practitionerId;

  const analytics = await Session.aggregate([
    { $match: filter },
    {
      $group: {
        _id: '$practitionerId',
        totalSessions: { $sum: 1 },
        completedSessions: { $sum: { $cond: [{ $eq: ["$status", "completed"] }, 1, 0] } },
        cancelledSessions: { $sum: { $cond: [{ $eq: ["$status", "cancelled"] }, 1, 0] } },
        averageSessionDuration: { $avg: '$durationMinutes' },
        uniquePatients: { $addToSet: '$patientId' }
      }
    },
    {
      $lookup: {
        from: 'practitioners',
        localField: '_id',
        foreignField: '_id',
        as: 'practitioner'
      }
    },
    { $unwind: '$practitioner' },
    {
      $project: {
        practitionerName: '$practitioner.name',
        totalSessions: 1,
        completedSessions: 1,
        cancelledSessions: 1,
        completionRate: { $round: [{ $multiply: [{ $divide: ['$completedSessions', '$totalSessions'] }, 100] }, 2] },
        averageSessionDuration: { $round: ['$averageSessionDuration', 2] },
        uniquePatientsCount: { $size: '$uniquePatients' }
      }
    }
  ]);

  res.status(200).json(
    new ApiResponse(200, analytics, "Practitioner analytics fetched successfully")
  );
});

export const sendBroadcastNotification = asyncHandler(async (req, res) => {
  const { title, message, targetUsers, type, channel, priority } = req.body;

  let users = [];
  const userModels = [];

  if (targetUsers.includes('patients')) {
    const patients = await Patient.find({  centerId: req.user.centerId,  isActive: true }).select('_id');
    users = [...users, ...patients];
    userModels.push('Patient');
  }

  if (targetUsers.includes('practitioners')) {
    const practitioners = await Practitioner.find({ 
      centerId: req.user.centerId, 
      isActive: true 
    }).select('_id');
    users = [...users, ...practitioners];
    userModels.push('Practitioner');
  }

  if (targetUsers.includes('admins')) {
    const admins = await Admin.find({ 
      centerId: req.user.centerId, 
      isActive: true 
    }).select('_id');
    users = [...users, ...admins];
    userModels.push('Admin');
  }

  if (users.length === 0) {
    throw new ApiError(400, 'No users found for the specified target groups');
  }

  const notificationPromises = users.map(user => 
    Notification.create({
      userId: user._id,
      userModel: user.constructor.modelName,
      title,
      message,
      type: type || 'system_alert',
      channel: channel || 'in_app',
      priority: priority || 'medium',
      sentAt: new Date()
    })
  );

  const notifications = await Promise.all(notificationPromises);

  await AuditLog.create({
    userId: req.user._id,
    userModel: 'Admin',
    action: 'create',
    resourceType: 'Notification',
    description: 'Broadcast notification sent',
    details: { 
      targetUsers, 
      userModels, 
      recipientCount: users.length,
      type,
      channel 
    },
    ipAddress: req.ip
  });

  res.status(201).json(
    new ApiResponse(201, { 
      sentCount: notifications.length,
      targetGroups: targetUsers,
      userModels 
    }, "Broadcast notification sent successfully")
  );
});

export const getAuditLogs = asyncHandler(async (req, res) => {
  const { page = 1, limit = 20, action, userModel, startDate, endDate } = req.query;

  const filter = {};
  if (action) filter.action = action;
  if (userModel) filter.userModel = userModel;
  if (startDate || endDate) {
    filter.timestamp = {};
    if (startDate) filter.timestamp.$gte = new Date(startDate);
    if (endDate) filter.timestamp.$lte = new Date(endDate);
  }

  const auditLogs = await AuditLog.find(filter)
    .populate('userId', 'name email')
    .sort({ timestamp: -1 })
    .limit(limit * 1)
    .skip((page - 1) * limit);

  const total = await AuditLog.countDocuments(filter);

  res.status(200).json(
    new ApiResponse(200, {
      auditLogs,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    }, "Audit logs fetched successfully")
  );
});