import express from 'express';
const router = express.Router();
import * as authController from '../controllers/auth-controller';

router.post('/signup', authController.SignUp);
router.post('/login', authController.LogIn);

export default router;
