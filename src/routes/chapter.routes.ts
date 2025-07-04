import express from 'express';
import * as chapterController from '../controllers/chapter.controller';
import authenticateToken from '../middleware/authenticateToken'
import authorizeRole from '../middleware/authorizeRole';

const router = express.Router();

// Prefix all chapter routes with `/chapters`
router.get('/chapters/book/:bookId', chapterController.getChaptersByBookId); //get all chapters title and chapterNo
router.get('/chapters/book/:bookId/:chapterId/nav', chapterController.getChapterWithNavigation);//proper nav 

router.post('/chapters/book/:bookId',authenticateToken, authorizeRole('admin'), chapterController.createChapter);
router.put('/chapters/book/:bookId/:chapterId',authenticateToken, authorizeRole('admin'), chapterController.updateChapter);

router.delete('/chapters/book/:bookId/:chapterId',authenticateToken, authorizeRole('admin'), chapterController.deleteChapter);
router.delete('/chapters/book/:bookId', authenticateToken, authorizeRole('admin'), chapterController.deleteAllChapters);



export default router;

