import WebRTCSession from '../models/WebRTCSession.models.js';
export const setupWebRTCHandlers = (io, socket) => {
  
  // Join WebRTC room
  socket.on('webrtc-join-room', async (data) => {
    const { sessionId, userId, userRole } = data;
    
    try {
      const session = await WebRTCSession.findOne({ sessionId });
      if (!session) {
        socket.emit('webrtc-error', { message: 'Session not found' });
        return;
      }

      // Update socket IDs
      if (userRole === 'patient') {
        session.patientSocketId = socket.id;
      } else if (userRole === 'practitioner') {
        session.practitionerSocketId = socket.id;
      }
      await session.save();

      // Join room
      socket.join(session.roomName);
      
      // Notify others in room
      socket.to(session.roomName).emit('webrtc-user-joined', {
        userId,
        userRole,
        sessionId
      });

      // Update session status
      if (session.status === 'initiated') {
        session.status = 'connecting';
        await session.save();
      }

    } catch (error) {
      socket.emit('webrtc-error', { message: 'Failed to join room' });
    }
  });

  // WebRTC signaling: offer
  socket.on('webrtc-offer', (data) => {
    const { sessionId, offer, userId } = data;
    socket.to(data.targetSocketId).emit('webrtc-offer', {
      offer,
      fromUserId: userId,
      sessionId
    });
  });

  // WebRTC signaling: answer
  socket.on('webrtc-answer', (data) => {
    const { sessionId, answer, userId } = data;
    socket.to(data.targetSocketId).emit('webrtc-answer', {
      answer,
      fromUserId: userId,
      sessionId
    });
  });

  // WebRTC signaling: ice candidate
  socket.on('webrtc-ice-candidate', (data) => {
    const { sessionId, candidate, userId } = data;
    socket.to(data.targetSocketId).emit('webrtc-ice-candidate', {
      candidate,
      fromUserId: userId,
      sessionId
    });
  });

  // Leave room
  socket.on('webrtc-leave-room', async (data) => {
    const { sessionId, userId } = data;
    
    try {
      const session = await WebRTCSession.findOne({ sessionId });
      if (session) {
        socket.leave(session.roomName);
        
        // Notify others
        socket.to(session.roomName).emit('webrtc-user-left', { userId });
      }
    } catch (error) {
      console.error('Error leaving room:', error);
    }
  });
};