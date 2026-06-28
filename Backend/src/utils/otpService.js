import crypto from 'crypto';
import OTP from '../models/OTP.models.js';
import EmailService from './emailService.js';

class OTPService {
  generateOTP() {
    return crypto.randomInt(100000, 999999).toString();
  }

  // Send OTP to email
  async sendOTP(email, type = 'email-verification') {
    try {
      // Delete any existing OTPs for this email and type
      await OTP.deleteMany({ email, type });

      const otp = this.generateOTP();
      const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

      // Create OTP record
      const otpRecord = await OTP.create({
        email,
        otp,
        type,
        expiresAt
      });

      // Send email
      const emailSent = await EmailService.sendOTP(email, otp, type);

      if (!emailSent) {
        await OTP.findByIdAndDelete(otpRecord._id);
        throw new Error('Failed to send OTP email');
      }

      return {
        success: true,
        message: 'OTP sent successfully',
        expiresIn: '5 minutes'
      };
    } catch (error) {
      console.error('OTP sending error:', error);
      throw new Error('Failed to send OTP');
    }
  }

  // Verify OTP
  async verifyOTP(email, otp, type = 'email-verification') {
    try {
      const otpRecord = await OTP.findOne({
        email,
        type,
        used: false,
        expiresAt: { $gt: new Date() }
      });

      if (!otpRecord) {
        throw new Error('OTP not found or expired');
      }

      // Check attempts
      if (otpRecord.attempts >= otpRecord.maxAttempts) {
        await OTP.findByIdAndDelete(otpRecord._id);
        throw new Error('Maximum OTP attempts exceeded');
      }

      // Verify OTP
      if (otpRecord.otp !== otp) {
        otpRecord.attempts += 1;
        await otpRecord.save();
        throw new Error('Invalid OTP');
      }

      // Mark OTP as used
      otpRecord.used = true;
      await otpRecord.save();

      return {
        success: true,
        message: 'OTP verified successfully'
      };
    } catch (error) {
      throw error;
    }
  }

  // Resend OTP
  async resendOTP(email, type = 'email-verification') {
    return await this.sendOTP(email, type);
  }
}

export default new OTPService();