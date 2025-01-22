import express from 'express';
import * as userController from '../controllers/user-controller';

const router = express.Router();

router.get('/friend-suggestion', userController.friendSuggestion);
router.get('/user-info', userController.directMessageInfo);

export default router;
