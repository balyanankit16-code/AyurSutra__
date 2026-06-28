import { Server } from 'socket.io';
import http from 'http';

const socketServer = http.createServer();
const io = new Server(socketServer, {
  cors: {
    origin: "http://localhost:5173", // Your Vite frontend
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
  console.log('User connected to Socket.io:', socket.id);

  socket.on('webrtc-join-room', async (data) => {
    const { sessionId, userId, userRole } = data;
    console.log(`User ${userId} joined room for session ${sessionId}`);
    
    socket.join(sessionId);
    
    socket.to(sessionId).emit('webrtc-user-joined', {
      userId,
      userRole,
      sessionId,
      socketId: socket.id
    });
  });

  // WebRTC signaling: offer
  socket.on('webrtc-offer', (data) => {
    console.log('WebRTC offer for session:', data.sessionId);
    socket.to(data.targetSocketId).emit('webrtc-offer', {
      ...data,
      fromSocketId: socket.id
    });
  });

  socket.on('webrtc-answer', (data) => {
    console.log('WebRTC answer for session:', data.sessionId);
    socket.to(data.targetSocketId).emit('webrtc-answer', {
      ...data,
      fromSocketId: socket.id
    });
  });

  // WebRTC signaling: ice candidate
  socket.on('webrtc-ice-candidate', (data) => {
    socket.to(data.targetSocketId).emit('webrtc-ice-candidate', {
      ...data,
      fromSocketId: socket.id
    });
  });

  // Leave room
  socket.on('webrtc-leave-room', (data) => {
    console.log('User leaving room:', data.sessionId);
    socket.leave(data.sessionId);
    socket.to(data.sessionId).emit('webrtc-user-left', { 
      userId: data.userId,
      socketId: socket.id
    });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected from Socket.io:', socket.id);
  });
});

// Start Socket.io server on port 3000
const SOCKET_PORT = 3000;
socketServer.listen(SOCKET_PORT, () => {
  console.log(`Socket.io server running on port ${SOCKET_PORT}`);
});

export { io };