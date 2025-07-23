import express from 'express';
import * as cController from '../controllers/comment.controller';
import authenticateToken from '../middleware/authenticateToken.middleware';
import authorizeRole, { requireEmailVerified } from '../middleware/userCheck.middleware';

const router = express.Router();

router.get('/chapters/:chapterId/comments', cController.readComments);

// post new comment using chapterId 
router.post('/chapters/:chapterId/comments', authenticateToken, requireEmailVerified, cController.addNewComment); 
router.put('/comments/:commentId', authenticateToken, requireEmailVerified, cController.updateComment);

router.delete('/comments/:commentId', authenticateToken, requireEmailVerified, cController.deleteCommentsContent);
router.delete('/comments/:commentId/hard', authenticateToken, authorizeRole("admin"), cController.deleteComment);

export default router;
