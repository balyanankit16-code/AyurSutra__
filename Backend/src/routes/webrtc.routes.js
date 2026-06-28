import express from 'express';
import {
  initiateSession,
  endSession,
  getSessionHistory
} from '../controllers/webrtc.controller.js';
import {authMiddleware} from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/initiate', authMiddleware, initiateSession);
router.put('/:sessionId/end', authMiddleware, endSession);
router.get('/sessions', authMiddleware, getSessionHistory);

export default router;