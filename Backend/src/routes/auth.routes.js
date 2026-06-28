// routes/auth.routes.js
import express from 'express';
import asyncHandler from '../utils/asyncHandler.js';
import ApiResponse from '../utils/ApiResponse.js';
import ApiError from '../utils/ApiError.js';
import {
  registerPatient,
  registerPractitioner,
  registerAdmin,
  login,
  logout,
  refreshAccessToken,
  changePassword,
  getCurrentUser,
  verifyAuth
} from '../controllers/auth.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';
import OTPService from '../utils/otpService.js';
import Patient from '../models/Patient.models.js';
import Practitioner from '../models/Practitioner.models.js';
import Admin from '../models/Admin.models.js'; 
const router = express.Router();
// Public routes
router.post('/register/patient', registerPatient);
router.post('/register/practitioner', registerPractitioner);
router.post('/register/admin', registerAdmin);
router.post('/login', login);

// OTP Login routes
router.post('/login/patient-with-otp', asyncHandler(async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    throw new ApiError(400, 'Email and OTP are required');
  }

  // Verify OTP
  await OTPService.verifyOTP(email, otp, 'login');

  // Find user and login
  const user = await Patient.findOne({ email });
  if (!user) {
    throw new ApiError(404, 'Patient not found');
  }

  // Generate tokens
  const accessToken = await user.generateAccessToken();
  const refreshToken = await user.generateRefreshToken();

  // Save refresh token to user
  user.refreshToken = refreshToken;
  await user.save();

  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production'
  };

  res.status(200)
    .cookie('accessToken', accessToken, options)
    .cookie('refreshToken', refreshToken, options)
    .json(
      new ApiResponse(200, {
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          isVerified: user.isVerified
        },
        accessToken,
        refreshToken
      }, "Login successful with OTP")
    );
}));

router.post('/login/practitioner-with-otp', asyncHandler(async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    throw new ApiError(400, 'Email and OTP are required');
  }

  // Verify OTP
  await OTPService.verifyOTP(email, otp, 'login');

  // Find user and login
  const user = await Practitioner.findOne({ email });
  if (!user) {
    throw new ApiError(404, 'Practitioner not found');
  }

  // Generate tokens
  const accessToken = await user.generateAccessToken();
  const refreshToken = await user.generateRefreshToken();

  // Save refresh token to user
  user.refreshToken = refreshToken;
  await user.save();

  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production'
  };

  res.status(200)
    .cookie('accessToken', accessToken, options)
    .cookie('refreshToken', refreshToken, options)
    .json(
      new ApiResponse(200, {
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          isVerified: user.isVerified,
          specialization: user.specialization
        },
        accessToken,
        refreshToken
      }, "Login successful with OTP")
    );
}));
router.post('/login/admin-with-otp', asyncHandler(async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    throw new ApiError(400, 'Email and OTP are required');
  }

  // Verify OTP (Requires the Admin user to have been sent an OTP of type 'login')
  await OTPService.verifyOTP(email, otp, 'login');

  // Find Admin user and log them in
  const user = await Admin.findOne({ email });
  if (!user) {
    throw new ApiError(404, 'Admin not found');
  }

  // Generate tokens
  const accessToken = await user.generateAccessToken();
  const refreshToken = await user.generateRefreshToken();

  // Save refresh token to user
  user.refreshToken = refreshToken;
  await user.save();

  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production'
  };

  res.status(200)
    .cookie('accessToken', accessToken, options)
    .cookie('refreshToken', refreshToken, options)
    .json(
      new ApiResponse(200, {
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          permissions: user.permissions, // Include admin-specific fields
          // isVerified is usually not applicable to Admin but can be added if your schema supports it
        },
        accessToken,
        refreshToken
      }, "Login successful with OTP")
    );
}));
// Send OTP for login
router.post('/send-login-otp', asyncHandler(async (req, res) => {
  const { email, userType } = req.body; // userType: 'patient', 'practitioner', or 'admin'

  if (!email || !userType) {
    throw new ApiError(400, 'Email and user type are required');
  }

  // Check if user exists
  let user;
  if (userType === 'patient') {
    user = await Patient.findOne({ email });
  } else if (userType === 'practitioner') {
    user = await Practitioner.findOne({ email });
  } else if (userType === 'admin') { // ⬅️ ADDED ADMIN CHECK
    // NOTE: Ensure Admin model is imported in this file
    user = await Admin.findOne({ email }); 
  } else {
    throw new ApiError(400, 'Invalid user type');
  }

  if (!user) {
    throw new ApiError(404, 'User not found with this email');
  }

  // Send OTP
  const result = await OTPService.sendOTP(email, 'login');

  // NOTE: Consider logging this action using AuditLog here
  // AuditLog.create(...)

  res.status(200).json(
    new ApiResponse(200, result, "Login OTP sent successfully")
  );
}));
// Protected routes
router.post('/logout', authMiddleware, logout);
router.post('/refresh-token', refreshAccessToken);
router.post('/change-password', authMiddleware, changePassword);
router.get('/me', authMiddleware, getCurrentUser);
router.get('/verify', verifyAuth);

export default router;