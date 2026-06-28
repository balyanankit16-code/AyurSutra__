// import { io } from 'socket.io-client';

// class SocketService {
//   constructor() {
//     this.socket = null;
//     this.isConnected = false;
//   }

//  connect() {
//     if (!this.socket) {
//       // Use the same port as your backend (5000)
//       const socketUrl = 'http://localhost:3000';

//       console.log('Connecting to socket at:', socketUrl);

//       this.socket = io(socketUrl, {

//         transports: ['websocket', 'polling']
//       });

//       this.socket.on('connect', () => {
//         this.isConnected = true;
//         console.log('Socket connected');
//       });

//       this.socket.on('disconnect', () => {
//         this.isConnected = false;
//         console.log('Socket disconnected');
//       });

//       this.socket.on('connect_error', (error) => {
//         console.error('Socket connection error:', error);
//       });
//     }
//     return this.socket;
//   }

//   disconnect() {
//     if (this.socket) {
//       this.socket.disconnect();
//       this.socket = null;
//       this.isConnected = false;
//     }
//   }

//   getSocket() {
//     return this.socket;
//   }
// }

// export default new SocketService();

import { io } from 'socket.io-client';

class SocketService {
  constructor() {
    this.socket = null;
    this.isConnected = false;
  }

  connect() {
    if (!this.socket) {
      // Socket.io on port 3000, API on port 5000
      const socketUrl = 'http://localhost:3000';
      
      console.log('🔌 Connecting to Socket.io on port 3000');
      
      this.socket = io(socketUrl, {
        auth: {
          token: localStorage.getItem('token')
        },
        transports: ['websocket', 'polling']
      });

      this.socket.on('connect', () => {
        this.isConnected = true;
        console.log('✅ Connected to Socket.io on port 3000');
      });

      this.socket.on('disconnect', () => {
        this.isConnected = false;
        console.log('🔌 Socket disconnected');
      });

      this.socket.on('connect_error', (error) => {
        console.error('❌ Socket connection failed:', error.message);
      });
    }
    return this.socket;
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.isConnected = false;
    }
  }

  getSocket() {
    return this.socket;
  }
}

export default new SocketService();