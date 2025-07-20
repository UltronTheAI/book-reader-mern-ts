
import express from 'express';
import * as userController from '../controllers/user.controller';
import authenticateToken from '../middleware/authenticateToken';
import authorizeRole from '../middleware/authorizeRole';


const userRouter = express.Router();

userRouter.put('/users/:id/role', authenticateToken, authorizeRole('admin'), userController.changeUserRole);
userRouter.put('/books/:bookId/like', authenticateToken, userController.likeOrUnlikeBook);
userRouter.put('/chapters/:chapterId/like', authenticateToken, userController.likeOrUnlikeChapter);
userRouter.put('/comments/:commentId/like', authenticateToken, userController.likeOrUnlikeComment);

export default userRouter;
