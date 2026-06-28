// controllers/otp.controller.js
import asyncHandler from '../utils/asyncHandler.js';
import ApiResponse from '../utils/ApiResponse.js';
import ApiError from '../utils/ApiError.js';
import OTPService from '../utils/otpService.js';
import Patient from '../models/Patient.models.js';
import Practitioner from '../models/Practitioner.models.js';
import AuditLog from '../models/AuditLog.models.js';

// Send OTP for email verification
export const sendVerificationOTP = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    throw new ApiError(400, 'Email is required');
  }

  const result = await OTPService.sendOTP(email, 'email-verification');

  await AuditLog.create({
    userId: req.user?._id || null,
    userModel: req.user?.role ? req.user.role.charAt(0).toUpperCase() + req.user.role.slice(1) : 'Guest',
    action: 'create',
    resourceType: 'OTP',
    description: `Verification OTP sent to ${email}`,
    ipAddress: req.ip
  });

  res.status(200).json(
    new ApiResponse(200, result, "Verification OTP sent successfully")
  );
});

// Verify email with OTP
export const verifyEmail = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    throw new ApiError(400, 'Email and OTP are required');
  }

  await OTPService.verifyOTP(email, otp, 'email-verification');

  // Update user verification status
  let user = await Patient.findOne({ email });
  let userModel = 'Patient';

  if (!user) {
    user = await Practitioner.findOne({ email });
    userModel = 'Practitioner';
  }

  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  user.isVerified = true;
  await user.save();

  await AuditLog.create({
    userId: user._id,
    userModel,
    action: 'update',
    resourceType: userModel,
    resourceId: user._id,
    description: 'Email verified successfully',
    ipAddress: req.ip
  });

  res.status(200).json(
    new ApiResponse(200, { isVerified: true }, "Email verified successfully")
  );
});

// Send OTP for password reset
export const sendPasswordResetOTP = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    throw new ApiError(400, 'Email is required');
  }

  // Check if user exists
  let user = await Patient.findOne({ email });
  if (!user) {
    user = await Practitioner.findOne({ email });
  }

  if (!user) {
    throw new ApiError(404, 'User not found with this email');
  }

  const result = await OTPService.sendOTP(email, 'password-reset');

  await AuditLog.create({
    userId: user._id,
    userModel: user.role.charAt(0).toUpperCase() + user.role.slice(1),
    action: 'create',
    resourceType: 'OTP',
    description: `Password reset OTP sent to ${email}`,
    ipAddress: req.ip
  });

  res.status(200).json(
    new ApiResponse(200, result, "Password reset OTP sent successfully")
  );
});

// Verify password reset OTP
export const verifyPasswordResetOTP = asyncHandler(async (req, res) => {
  const { email, otp, newPassword } = req.body;

  if (!email || !otp || !newPassword) {
    throw new ApiError(400, 'Email, OTP and new password are required');
  }

  if (newPassword.length < 6) {
    throw new ApiError(400, 'Password must be at least 6 characters long');
  }

  await OTPService.verifyOTP(email, otp, 'password-reset');

  // Update password
  let user = await Patient.findOne({ email });
  let userModel = 'Patient';

  if (!user) {
    user = await Practitioner.findOne({ email });
    userModel = 'Practitioner';
  }

  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  user.passwordHash = await user.encryptPassword(newPassword);
  await user.save();

  await AuditLog.create({
    userId: user._id,
    userModel,
    action: 'update',
    resourceType: userModel,
    resourceId: user._id,
    description: 'Password reset successfully',
    ipAddress: req.ip
  });

  res.status(200).json(
    new ApiResponse(200, null, "Password reset successfully")
  );
});

// Resend OTP
export const resendOTP = asyncHandler(async (req, res) => {
  const { email, type } = req.body;

  if (!email || !type) {
    throw new ApiError(400, 'Email and OTP type are required');
  }

  const validTypes = ['email-verification', 'password-reset', 'login'];
  if (!validTypes.includes(type)) {
    throw new ApiError(400, 'Invalid OTP type');
  }

  const result = await OTPService.resendOTP(email, type);

  await AuditLog.create({
    userId: req.user?._id || null,
    userModel: req.user?.role ? req.user.role.charAt(0).toUpperCase() + req.user.role.slice(1) : 'Guest',
    action: 'create',
    resourceType: 'OTP',
    description: `OTP resent to ${email} for ${type}`,
    ipAddress: req.ip
  });

  res.status(200).json(
    new ApiResponse(200, result, "OTP resent successfully")
  );
});