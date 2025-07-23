
import express from 'express';
import * as userController from '../controllers/user.controller';
import authenticateToken from '../middleware/authenticateToken.middleware';
import authorizeRole, { requireEmailVerified } from '../middleware/userCheck.middleware';


const userRouter = express.Router();

userRouter.put('/users/:id/role', authenticateToken, authorizeRole('admin'), userController.changeUserRole);
userRouter.put('/books/:bookId/like', authenticateToken, requireEmailVerified, userController.likeOrUnlikeBook);
userRouter.put('/chapters/:chapterId/like', authenticateToken, requireEmailVerified, userController.likeOrUnlikeChapter);
userRouter.put('/comments/:commentId/like', authenticateToken, requireEmailVerified, userController.likeOrUnlikeComment);

//resend email verification token

export default userRouter;
