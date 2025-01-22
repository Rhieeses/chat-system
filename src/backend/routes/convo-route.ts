import express from 'express';
import * as convoController from '../controllers/convo-controller';

const router = express.Router();

router.get('/user-convo', convoController.fetchConvo);
router.get('/convo-list', convoController.getConvoList);

export default router;
