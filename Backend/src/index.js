

import dotenv from 'dotenv';
import app from './app.js';
import connectDB from './db/index.js';
import notificationsScheduler from './services/notifications.scheduler.js';
import './socketServer.js'
dotenv.config({ path: './.env' });

const PORT = process.env.PORT || 7000;


connectDB()
  .then(() => {
    const server = app.listen(PORT, () => {
      console.log(`Server is running at port: ${PORT}`);
    });

    server.on("error", (err) => {
      console.error("Server Error:", err);
      throw err;
    });
  })
  .catch((err) => {
    console.error("MongoDb connection failed:", err);
  });

  // app.js or server.js

// Start the notification scheduler when server starts
notificationsScheduler; // This will automatically start the cron jobs

console.log('🔔 Notification scheduler started');
