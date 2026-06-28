import express from 'express';
import {
  sendVerificationOTP,
  verifyEmail,
  sendPasswordResetOTP,
  verifyPasswordResetOTP,
  resendOTP
} from '../controllers/otp.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const router = express.Router();

// Public routes
router.post('/send-verification', sendVerificationOTP);
router.post('/verify-email', verifyEmail);
router.post('/send-password-reset', sendPasswordResetOTP);
router.post('/verify-password-reset', verifyPasswordResetOTP);
router.post('/resend', resendOTP);

export default router;