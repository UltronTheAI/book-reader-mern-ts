import express from 'express';
import * as authController from '../controllers/auth.controller';

const authRouter = express.Router();

authRouter.post('/auth/register', authController.registerUser);
authRouter.post('/auth/login', authController.loginuser);

authRouter.post('/auth/verify/:token', authController.verifyEmail);
authRouter.post('/auth/resend-verification', authController.resendVerificationEmail);

export default authRouter;