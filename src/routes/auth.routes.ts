import express from 'express';
import * as authService from '../controllers/auth.controller';

const userRouter = express.Router();

userRouter.post('/auth/register', authService.registerUser);
userRouter.post('/auth/login', authService.loginuser);


export default userRouter;