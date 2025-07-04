
import express from 'express';
import * as commentController from '../controllers/comment.controller';
import authenticateToken from '../middleware/authenticateToken';
import authorizeRole from '../middleware/authorizeRole';


const commentRouter = express.Router();

commentRouter.get('/chapters/:chapterId/comments', commentController.readComments);

// post new comment using chapterId 
commentRouter.post('/chapters/:chapterId/comments', authenticateToken, commentController.addNewComment); 
commentRouter.put('/comments/:commentId', authenticateToken, commentController.updateComment);

commentRouter.delete('/comments/:commentId', authenticateToken, commentController.deleteCommentsContent);
commentRouter.delete('/comments/:commentId/hard', authenticateToken, authorizeRole("admin"), commentController.deleteComment);

export default commentRouter;
