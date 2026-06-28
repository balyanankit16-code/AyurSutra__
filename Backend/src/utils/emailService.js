import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail', // or your email service
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS 
      }
    });
  }

  async sendOTP(email, otp, type = 'email-verification') {
    let subject, html;
    
    switch (type) {
      case 'email-verification':
        subject = 'Verify Your Email - Ayurveda Therapy';
        html = this.getVerificationTemplate(otp);
        break;
      case 'password-reset':
        subject = 'Reset Your Password - Ayurveda Therapy';
        html = this.getPasswordResetTemplate(otp);
        break;
      case 'login':
        subject = 'Your Login OTP - Ayurveda Therapy';
        html = this.getLoginTemplate(otp);
        break;
      default:
        subject = 'Your OTP Code';
        html = this.getDefaultTemplate(otp);
    }

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject,
      html
    };

    try {
      await this.transporter.sendMail(mailOptions);
      return true;
    } catch (error) {
      console.error('Email sending failed:', error);
      return false;
    }
  }

  getVerificationTemplate(otp) {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          .container { max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif; }
          .header { background: #10B981; color: white; padding: 20px; text-align: center; }
          .otp-code { font-size: 32px; font-weight: bold; color: #10B981; text-align: center; margin: 30px 0; }
          .footer { margin-top: 30px; padding: 20px; background: #F3F4F6; text-align: center; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Ayurveda Therapy</h1>
            <p>Verify Your Email Address</p>
          </div>
          <p>Hello,</p>
          <p>Thank you for registering with Ayurveda Therapy. Use the OTP below to verify your email address:</p>
          <div class="otp-code">${otp}</div>
          <p>This OTP will expire in 5 minutes.</p>
          <div class="footer">
            <p>If you didn't request this, please ignore this email.</p>
            <p>&copy; 2024 Ayurveda Therapy. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  getPasswordResetTemplate(otp) {
    return `
      <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
        <div style="background: #EF4444; color: white; padding: 20px; text-align: center;">
          <h1>Password Reset Request</h1>
        </div>
        <p>Hello,</p>
        <p>You requested to reset your password. Use the OTP below:</p>
        <div style="font-size: 32px; font-weight: bold; color: #EF4444; text-align: center; margin: 30px 0;">${otp}</div>
        <p>This OTP will expire in 5 minutes.</p>
        <div style="margin-top: 30px; padding: 20px; background: #F3F4F6; text-align: center;">
          <p>If you didn't request a password reset, please ignore this email.</p>
        </div>
      </div>
    `;
  }

  getLoginTemplate(otp) {
    return `
      <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
        <div style="background: #3B82F6; color: white; padding: 20px; text-align: center;">
          <h1>Login OTP</h1>
        </div>
        <p>Hello,</p>
        <p>Use the OTP below to login to your account:</p>
        <div style="font-size: 32px; font-weight: bold; color: #3B82F6; text-align: center; margin: 30px 0;">${otp}</div>
        <p>This OTP will expire in 5 minutes.</p>
      </div>
    `;
  }
}

export default new EmailService();