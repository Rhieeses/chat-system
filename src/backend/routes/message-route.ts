import express from 'express';
const router = express.Router();
import * as messageController from '../controllers/message-controller';

router.post('/send-message', messageController.sendMessage);
router.get('/get-messages', messageController.getMessages);

export default router;
