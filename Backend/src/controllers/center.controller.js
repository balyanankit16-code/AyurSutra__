

import asyncHandler from '../utils/asyncHandler.js';
import ApiResponse from '../utils/ApiResponse.js';
import ApiError from '../utils/ApiError.js';
import Patient from '../models/Patient.models.js';
import Practitioner from '../models/Practitioner.models.js';
import Session from '../models/Session.models.js';
import AuditLog from '../models/AuditLog.models.js';
import Notification from '../models/Notification.models.js';
import Center from '../models/Center.models.js';
import mongoose from 'mongoose';

// Helper to dynamically get model
const getUserModel = (role) => {
  if (role === 'patient') return Patient;
  if (role === 'practitioner') return Practitioner;
  throw new ApiError(400, 'Invalid user role');
};

// ------------------------ JOIN CENTER ------------------------
export const joinCenter = asyncHandler(async (req, res) => {
  const { centerId } = req.body;
  const userId = req.user._id;
  const userRole = req.user.role;

  const Model = getUserModel(userRole);

  const center = await Center.findById(centerId);
  if (!center) throw new ApiError(404, 'Center not found');
  if (!center.isActive) throw new ApiError(400, 'Center is not active');

  const user = await Model.findById(userId);
  if (user.centerId && user.centerId.toString() === centerId)
    throw new ApiError(400, 'Already a member of this center');

  const updatedUser = await Model.findByIdAndUpdate(
    userId,
    { centerId },
    { new: true, runValidators: true }
  ).select('-passwordHash -refreshToken');

  await AuditLog.create({
    userId,
    userModel: userRole === 'patient' ? 'Patient' : 'Practitioner',
    action: 'update',
    resourceType: userRole === 'patient' ? 'Patient' : 'Practitioner',
    resourceId: userId,
    centerId,
    description: `${userRole} joined center: ${center.name}`,
    details: { previousCenterId: user.centerId, newCenterId: centerId },
    ipAddress: req.ip,
  });

  await Notification.create({
    userId,
    userModel: userRole === 'patient' ? 'Patient' : 'Practitioner',
    title: 'Center Joined Successfully',
    message: `You have successfully joined ${center.name}.`,
    type: 'system_alert',
    channel: 'in_app',
    data: { centerId, centerName: center.name },
  });

  res.status(200).json(
    new ApiResponse(200, updatedUser, `Successfully joined ${center.name}`)
  );
});

// ------------------------ LEAVE CENTER ------------------------
export const leaveCenter = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const userRole = req.user.role;
  const { reason } = req.body;

  const Model = getUserModel(userRole);
  const user = await Model.findById(userId);

  if (!user.centerId)
    throw new ApiError(400, 'You are not currently associated with any center');

  // Check for upcoming sessions (both patient or practitioner)
  const sessionFilter =
    userRole === 'patient'
      ? { patientId: userId }
      : { practitionerId: userId };

  const upcomingSessions = await Session.find({
    ...sessionFilter,
    scheduledStart: { $gte: new Date() },
    status: { $in: ['booked', 'confirmed'] },
  });

  if (upcomingSessions.length > 0)
    throw new ApiError(
      400,
      `Cannot leave center. You have ${upcomingSessions.length} upcoming session(s). Cancel them first.`
    );

  const center = await Center.findById(user.centerId);
  const centerName = center ? center.name : 'Unknown Center';

  const updatedUser = await Model.findByIdAndUpdate(
    userId,
    { centerId: null },
    { new: true, runValidators: true }
  ).select('-passwordHash -refreshToken');

  await AuditLog.create({
    userId,
    userModel: userRole === 'patient' ? 'Patient' : 'Practitioner',
    action: 'update',
    resourceType: userRole === 'patient' ? 'Patient' : 'Practitioner',
    resourceId: userId,
    centerId: user.centerId,
    description: `${userRole} left center: ${centerName}`,
    details: { previousCenterId: user.centerId, reason },
    ipAddress: req.ip,
  });

  await Notification.create({
    userId,
    userModel: userRole === 'patient' ? 'Patient' : 'Practitioner',
    title: 'Center Left Successfully',
    message: `You have left ${centerName}.`,
    type: 'system_alert',
    channel: 'in_app',
  });

  res
    .status(200)
    .json(new ApiResponse(200, updatedUser, `Left ${centerName} successfully`));
});

// ------------------------ SWITCH CENTER ------------------------
export const switchCenter = asyncHandler(async (req, res) => {
  const { centerId } = req.body;
  const userId = req.user._id;
  const userRole = req.user.role;

  const Model = getUserModel(userRole);
  const newCenter = await Center.findById(centerId);
  if (!newCenter) throw new ApiError(404, 'Center not found');
  if (!newCenter.isActive) throw new ApiError(400, 'Center is not active');

  const user = await Model.findById(userId);

  if (user.centerId && user.centerId.toString() === centerId)
    throw new ApiError(400, 'Already a member of this center');

  const sessionFilter =
    userRole === 'patient'
      ? { patientId: userId }
      : { practitionerId: userId };

  const upcomingSessions = await Session.find({
    ...sessionFilter,
    scheduledStart: { $gte: new Date() },
    status: { $in: ['booked', 'confirmed'] },
  });

  if (upcomingSessions.length > 0)
    throw new ApiError(
      400,
      `Cannot switch centers. You have ${upcomingSessions.length} upcoming sessions. Cancel them first.`
    );

  const previousCenter = await Center.findById(user.centerId);
  const previousCenterName = previousCenter ? previousCenter.name : 'No Center';

  const updatedUser = await Model.findByIdAndUpdate(
    userId,
    { centerId, availability: [] },
    { new: true, runValidators: true }
  ).select('-passwordHash -refreshToken');

  await AuditLog.create({
    userId,
    userModel: userRole === 'patient' ? 'Patient' : 'Practitioner',
    action: 'update',
    resourceType: userRole === 'patient' ? 'Patient' : 'Practitioner',
    resourceId: userId,
    centerId,
    description: `${userRole} switched from ${previousCenterName} to ${newCenter.name}`,
    details: { previousCenterId: user.centerId, newCenterId: centerId },
    ipAddress: req.ip,
  });

  await Notification.create({
    userId,
    userModel: userRole === 'patient' ? 'Patient' : 'Practitioner',
    title: 'Center Switched Successfully',
    message: `You have switched from ${previousCenterName} to ${newCenter.name}.`,
    type: 'system_alert',
    channel: 'in_app',
  });

  res.status(200).json(
    new ApiResponse(200, updatedUser, `Switched to ${newCenter.name} successfully`)
  );
});

// ------------------------ GET CURRENT CENTER ------------------------
export const getCurrentCenter = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const userRole = req.user.role;
  const Model = getUserModel(userRole);

  const user = await Model.findById(userId).populate('centerId');
  if (!user.centerId)
    throw new ApiError(404, 'You are not currently associated with any center');

  res.status(200).json(
    new ApiResponse(200, user.centerId, 'Current center fetched successfully')
  );
});

// ------------------------ GET AVAILABLE CENTERS ------------------------
export const getAvailableCenters = asyncHandler(async (req, res) => {
  const { search, page = 1, limit = 10 } = req.query;

  const filter = { isActive: true };
  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: 'i' } },
      { 'address.city': { $regex: search, $options: 'i' } },
      { 'address.state': { $regex: search, $options: 'i' } },
    ];
  }

  const centers = await Center.find(filter)
    .select('name address contact operatingHours')
    .sort({ name: 1 })
    .limit(limit * 1)
    .skip((page - 1) * limit);

  const total = await Center.countDocuments(filter);

  res.status(200).json(
    new ApiResponse(
      200,
      {
        centers,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
        total,
      },
      'Available centers fetched successfully'
    )
  );
});


export const createCenter = asyncHandler(async (req, res) => {
  const { name, address, contact, operatingHours, isActive } = req.body;

  // Check if user is admin
  if (req.user.role !== 'admin') {
    throw new ApiError(403, 'Only administrators can create centers');
  }

  // Check if admin already has a center assigned
  if (req.user.centerId) {
    throw new ApiError(400, 'You already have a center assigned. Please contact support to create additional centers.');
  }

  // Check if a center with same name already exists
  const existingCenter = await Center.findOne({ name: name.trim() });
  if (existingCenter) {
    throw new ApiError(400, 'Center with this name already exists');
  }

  // Create the center
  const center = await Center.create({
    name: name.trim(),
    address,
    contact,
    operatingHours,
    isActive: isActive ?? true
  });

  // Update the admin user with the centerId
  const Admin = mongoose.model('Admin');
  await Admin.findByIdAndUpdate(
    req.user.id,
    { centerId: center._id },
    { new: true, runValidators: true }
  );

  // Also update the current user object in the request if needed
  req.user.centerId = center._id;

  res
    .status(201)
    .json(new ApiResponse(201, center, 'Center created successfully and assigned to your account'));
});

// ------------------------ REMOVE CENTER ------------------------
export const removeCenter = asyncHandler(async (req, res) => {
  const { centerId } = req.params;

  const center = await Center.findById(centerId);
  if (!center) {
    throw new ApiError(404, 'Center not found');
  }

  await Center.findByIdAndDelete(centerId);

  res.status(200).json(new ApiResponse(200, null, 'Center removed successfully'));
});