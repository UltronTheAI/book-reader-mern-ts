import express from 'express';
import * as authService from '../controllers/auth.controller';

const authRouter = express.Router();

authRouter.post('/auth/register', authService.registerUser);
authRouter.post('/auth/login', authService.loginuser);


export default authRouter;