import express from 'express';
import { getAllUsers, getMessages, markMessagesAsSeen, sendMessage } from '../controllers/message.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/users', protectRoute, getAllUsers);
router.get('/:id', protectRoute, getMessages);
router.put('/mark/:id', protectRoute, markMessagesAsSeen);
router.post('/send/:id', protectRoute, sendMessage);

export default router;