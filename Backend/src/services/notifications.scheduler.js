// // services/notificationScheduler.js
// import cron from 'node-cron';
// import Session from '../models/Session.models.js';
// import Notification from '../models/Notification.models.js';
// import Practitioner from '../models/Practitioner.models.js';
// import Patient from '../models/Patient.models.js';

// class NotificationScheduler {
//   constructor() {
//     this.init();
//   }

//   init() {
//     // Run every 5 minutes to check sessions
//     cron.schedule('*/5 * * * *', () => {
//       console.log('🔔 Checking sessions for notifications...');
//       this.checkUpcomingSessions();
//       this.checkSessionCompletion();
//       this.checkUnconfirmedSessions();
//     });
//   }

//   // Check sessions that are about to start (confirmed sessions)
//  async checkUpcomingSessions() {
//   try {
//     const now = new Date();
//     const next30Min = new Date(now.getTime() + 30 * 60 * 1000);
    
//     // Find confirmed sessions starting in next 30 minutes
//     const upcomingSessions = await Session.find({
//       status: 'confirmed',
//       scheduledStart: { 
//         $gte: now, 
//         $lte: next30Min 
//       }
//     }).populate('patientId practitionerId');

//     for (const session of upcomingSessions) {
//       // Check if notification already created
//       const existingNotification = await Notification.findOne({
//         'data.sessionId': session._id,
//         type: 'session_reminder'
//       });

//       if (!existingNotification) {
//         await this.createSessionNotification(session);
//       }
//     }
//   } catch (error) {
//     console.error('Error checking upcoming sessions:', error);
//   }
// }

// // Just create notification without sending reminder
// async createSessionNotification(session) {
//   try {
//     const sessionTime = session.scheduledStart.toLocaleTimeString('en-IN', {
//       hour: '2-digit',
//       minute: '2-digit'
//     });

//     // Create notification for patient
//     await Notification.create({
//       userId: session.patientId._id,
//       userModel: 'Patient',
//       title: 'Session Reminder',
//       message: `Your ${session.therapyType} session starts at ${sessionTime}.`,
//       type: 'session_reminder',
//       status: 'sent',
//       data: {
//         sessionId: session._id,
//         scheduledStart: session.scheduledStart,
//         practitionerName: session.practitionerId.name
//       }
//     });

//     // Create notification for practitioner
//     await Notification.create({
//       userId: session.practitionerId._id,
//       userModel: 'Practitioner',
//       title: 'Upcoming Session',
//       message: `You have a ${session.therapyType} session at ${sessionTime}.`,
//       type: 'session_reminder',
//       status: 'sent',
//       data: {
//         sessionId: session._id,
//         scheduledStart: session.scheduledStart,
//         patientName: session.patientId.name
//       }
//     });

//     console.log(`📋 Created notifications for session ${session._id}`);
//   } catch (error) {
//     console.error('Error creating session notification:', error);
//   }
// }

//   // Check sessions that should be completed by now
//   async checkSessionCompletion() {
//     try {
//       const now = new Date();
//       const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
      
//       // Find confirmed sessions that ended more than 1 hour ago but not marked completed
//       const sessionsToComplete = await Session.find({
//         status: 'confirmed',
//         scheduledEnd: { $lte: oneHourAgo }
//       }).populate('patientId practitionerId');

//       for (const session of sessionsToComplete) {
//         // Mark session as completed and request feedback
//         session.status = 'completed';
//         await session.save();

//         // Send completion notification to patient
//         await Notification.create({
//           userId: session.patientId._id,
//           userModel: 'Patient',
//           title: 'Session Completed',
//           message: `Your ${session.therapyType} session has been completed. Please provide your feedback.`,
//           type: 'feedback_request',
//           data: {
//             sessionId: session._id,
//             practitionerId: session.practitionerId._id,
//             therapyType: session.therapyType
//           }
//         });

//         // Send completion notification to practitioner
//         await Notification.create({
//           userId: session.practitionerId._id,
//           userModel: 'Practitioner',
//           title: 'Session Completed',
//           message: `Your session with patient has been marked as completed.`,
//           type: 'session_completed',
//           data: {
//             sessionId: session._id,
//             patientId: session.patientId._id
//           }
//         });

//         console.log(`✅ Session ${session._id} marked as completed`);
//       }
//     } catch (error) {
//       console.error('Error checking session completion:', error);
//     }
//   }

//   // Check booked (not confirmed) sessions with 1 hour remaining
//   async checkUnconfirmedSessions() {
//     try {
//       const now = new Date();
//       const oneHourFromNow = new Date(now.getTime() + 60 * 60 * 1000);
      
//       // Find booked sessions (not confirmed) starting in 1 hour
//       const unconfirmedSessions = await Session.find({
//         status: 'booked', // Only booked, not confirmed
//         scheduledStart: { $lte: oneHourFromNow }
//       }).populate('patientId practitionerId');

//       for (const session of unconfirmedSessions) {
//         // Cancel the session
//         session.status = 'cancelled';
//         session.cancelReason = 'Auto-cancelled: Not confirmed 1 hour before session';
//         session.cancelledAt = new Date();
//         session.cancelledBy = 'system';
//         await session.save();

//         // Send cancellation notification to patient
//         await Notification.create({
//           userId: session.patientId._id,
//           userModel: 'Patient',
//           title: 'Session Cancelled',
//           message: `Your ${session.therapyType} session has been automatically cancelled as it was not confirmed.`,
//           type: 'cancellation',
//           priority: 'high',
//           data: {
//             sessionId: session._id,
//             reason: 'Not confirmed 1 hour before session time'
//           }
//         });

//         // Send cancellation notification to practitioner
//         await Notification.create({
//           userId: session.practitionerId._id,
//           userModel: 'Practitioner',
//           title: 'Session Auto-Cancelled',
//           message: `A session was automatically cancelled as it wasn't confirmed.`,
//           type: 'cancellation',
//           priority: 'medium',
//           data: {
//             sessionId: session._id,
//             patientId: session.patientId._id,
//             reason: 'Not confirmed 1 hour before session time'
//           }
//         });

//         console.log(`❌ Session ${session._id} auto-cancelled (not confirmed)`);
//       }
//     } catch (error) {
//       console.error('Error checking unconfirmed sessions:', error);
//     }
//   }

//   // Send session reminder to both patient and practitioner
//   async sendSessionReminder(session) {
//     try {
//       const sessionTime = session.scheduledStart.toLocaleTimeString('en-IN', {
//         hour: '2-digit',
//         minute: '2-digit'
//       });

//       // Patient reminder
//       await Notification.create({
//         userId: session.patientId._id,
//         userModel: 'Patient',
//         title: 'Session Reminder',
//         message: `Your ${session.therapyType} session starts at ${sessionTime}. Please be on time.`,
//         type: 'session_reminder',
//         data: {
//           sessionId: session._id,
//           scheduledStart: session.scheduledStart,
//           practitionerName: session.practitionerId.name
//         }
//       });

//       // Practitioner reminder
//       await Notification.create({
//         userId: session.practitionerId._id,
//         userModel: 'Practitioner',
//         title: 'Upcoming Session',
//         message: `You have a ${session.therapyType} session at ${sessionTime}.`,
//         type: 'session_reminder',
//         data: {
//           sessionId: session._id,
//           scheduledStart: session.scheduledStart,
//           patientName: session.patientId.name
//         }
//       });

//       console.log(`🔔 Sent reminders for session ${session._id}`);
//     } catch (error) {
//       console.error('Error sending session reminder:', error);
//     }
//   }
// }

// // Create and export singleton instance
// export default new NotificationScheduler();


// services/notificationScheduler.js
import cron from 'node-cron';
import Session from '../models/Session.models.js';
import Notification from '../models/Notification.models.js';
import Practitioner from '../models/Practitioner.models.js';
import Patient from '../models/Patient.models.js';

class NotificationScheduler {
  constructor() {
    this.init();
  }

  init() {
    // Run every 5 minutes to check sessions
    cron.schedule('*/5 * * * *', () => {
      console.log('🔔 Checking sessions for notifications...');
      this.checkUpcomingSessions();
      this.checkSessionCompletion();
      this.checkUnconfirmedSessions();
    });
  }

  // Check sessions that are about to start (confirmed sessions)
  async checkUpcomingSessions() {
    try {
      const now = new Date();
      const next30Min = new Date(now.getTime() + 30 * 60 * 1000);
      
      // Find confirmed sessions starting in next 30 minutes
      const upcomingSessions = await Session.find({
        status: 'confirmed',
        scheduledStart: { 
          $gte: now, 
          $lte: next30Min 
        }
      }).populate('patientId practitionerId');

      for (const session of upcomingSessions) {
        // Check if notification already created
        const existingNotification = await Notification.findOne({
          'data.sessionId': session._id,
          type: 'session_reminder',

        });

        if (!existingNotification) {
          await this.createSessionNotification(session);
        }
      }
    } catch (error) {
      console.error('Error checking upcoming sessions:', error);
    }
  }

  // Just create notification without sending reminder
  async createSessionNotification(session) {
    try {
      const sessionTime = session.scheduledStart.toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit'
      });

      // Create notification for patient
      await Notification.create({
        userId: session.patientId._id,
        userModel: 'Patient',
        title: 'Session Reminder',
        message: `Your ${session.therapyType} session starts at ${sessionTime}.`,
        type: 'session_reminder',
        status: 'sent',
        data: {
          sessionId: session._id,
          scheduledStart: session.scheduledStart,
          practitionerName: session.practitionerId.name
        }
      });

      // Create notification for practitioner
      await Notification.create({
        userId: session.practitionerId._id,
        userModel: 'Practitioner',
        title: 'Upcoming Session',
        message: `You have a ${session.therapyType} session at ${sessionTime}.`,
        type: 'session_reminder',
        status: 'sent',
        data: {
          sessionId: session._id,
          scheduledStart: session.scheduledStart,
          patientName: session.patientId.name
        }
      });

      console.log(`📋 Created notifications for session ${session._id}`);
    } catch (error) {
      console.error('Error creating session notification:', error);
    }
  }

  // Check sessions that should be completed by now
//   async checkSessionCompletion() {
//     try {
//       const now = new Date();
//       const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
      
//       // Find confirmed sessions that ended more than 1 hour ago but not marked completed
//       const sessionsToComplete = await Session.find({
//         status: 'confirmed',
//         scheduledEnd: { $lte: oneHourAgo }
//       }).populate('patientId practitionerId');

//       for (const session of sessionsToComplete) {
//         // Mark session as completed and request feedback
//         session.status = 'completed';
//         await session.save();

//         // Create completion notification for patient
//         await Notification.create({
//           userId: session.patientId._id,
//           userModel: 'Patient',
//           title: 'Session Completed',
//           message: `Your ${session.therapyType} session has been completed. Please provide your feedback.`,
//           type: 'feedback_request',
//           status: 'sent',
//           data: {
//             sessionId: session._id,
//             practitionerId: session.practitionerId._id,
//             therapyType: session.therapyType
//           }
//         });

//         // Create completion notification for practitioner
//         await Notification.create({
//           userId: session.practitionerId._id,
//           userModel: 'Practitioner',
//           title: 'Session Completed',
//           message: `Your session with patient has been marked as completed.`,
//           type: 'session_completed',
//           status: 'sent',
//           data: {
//             sessionId: session._id,
//             patientId: session.patientId._id
//           }
//         });

//         console.log(`✅ Session ${session._id} marked as completed`);
//       }
//     } catch (error) {
//       console.error('Error checking session completion:', error);
//     }
//   }

async checkSessionCompletion() {
  try {
    const now = new Date();
    const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
    console.log("complete ke ander gya")
    
    // Find confirmed sessions that ended more than 1 hour ago but not marked completed
    const sessionsToComplete = await Session.find({
      status: 'confirmed',
      scheduledEnd: { $lte: oneHourAgo }
    }).populate('patientId practitionerId');

    for (const session of sessionsToComplete) {
      // Mark session as completed
      session.status = 'completed';
      await session.save();

      // Create completion notification for patient with session ID in message
      await Notification.create({
        userId: session.patientId._id,
        userModel: 'Patient',
        title: 'Session Completed',
        message: `Your ${session.therapyType} session has been completed. Don't forget to share your feedback for the session ${session._id}.`,
        type: 'feedback_request',
        status: 'sent',
        data: {
          sessionId: session._id,
          practitionerId: session.practitionerId._id,
          therapyType: session.therapyType
        }
      });

      // Create completion notification for practitioner
      await Notification.create({
        userId: session.practitionerId._id,
        userModel: 'Practitioner',
        title: 'Session Completed',
        message: `Your session with patient has been marked as completed.`,
        type: 'session_completed',
        status: 'sent',
        data: {
          sessionId: session._id,
          patientId: session.patientId._id
        }
      });

      console.log(`✅ Session ${session._id} marked as completed`);
    }
  } catch (error) {
    console.error('Error checking session completion:', error);
  }
}

  // Check booked (not confirmed) sessions with 1 hour remaining
  async checkUnconfirmedSessions() {
    try {
      const now = new Date();
      const oneHourFromNow = new Date(now.getTime() + 60 * 60 * 1000);
      
      // Find booked sessions (not confirmed) starting in 1 hour
      const unconfirmedSessions = await Session.find({
        status: 'booked', // Only booked, not confirmed
        scheduledStart: { $lte: oneHourFromNow }
      }).populate('patientId practitionerId');

      for (const session of unconfirmedSessions) {
        // Cancel the session
        session.status = 'cancelled';
        session.cancelReason = 'Auto-cancelled: Not confirmed 1 hour before session';
        session.cancelledAt = new Date();
        await session.save();

        // Create cancellation notification for patient
        await Notification.create({
          userId: session.patientId._id,
          userModel: 'Patient',
          title: 'Session Cancelled',
          message: `Your ${session.therapyType} session has been automatically cancelled as it was not confirmed.`,
          type: 'cancellation',
          priority: 'high',
          status: 'sent',
          data: {
            sessionId: session._id,
            reason: 'Not confirmed 1 hour before session time'
          }
        });

        // Create cancellation notification for practitioner
        await Notification.create({
          userId: session.practitionerId._id,
          userModel: 'Practitioner',
          title: 'Session Auto-Cancelled',
          message: `A session was automatically cancelled as it wasn't confirmed.`,
          type: 'cancellation',
          priority: 'medium',
          status: 'sent',
          data: {
            sessionId: session._id,
            patientId: session.patientId._id,
            reason: 'Not confirmed 1 hour before session time'
          }
        });

        console.log(`❌ Session ${session._id} auto-cancelled (not confirmed)`);
      }
    } catch (error) {
      console.error('Error checking unconfirmed sessions:', error);
    }
  }
}

// Create and export singleton instance
export default new NotificationScheduler();