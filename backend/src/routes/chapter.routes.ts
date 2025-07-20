import express from 'express';
import * as chapterController from '../controllers/chapter.controller';
import authenticateToken from '../middleware/authenticateToken'
import authorizeRole from '../middleware/authorizeRole';

const chapterRouter = express.Router();

// Prefix all chapter routes with `/chapters`
chapterRouter.get('/chapters/book/:bookId', chapterController.getChaptersByBookId); //get all chapters title and chapterNo
chapterRouter.get('/chapters/book/:bookId/:chapterId/nav', chapterController.getChapterWithNavigation);//proper nav 

chapterRouter.post('/chapters/book/:bookId',authenticateToken, authorizeRole('admin'), chapterController.createChapter);
chapterRouter.put('/chapters/book/:bookId/:chapterId',authenticateToken, authorizeRole('admin'), chapterController.updateChapter);

chapterRouter.delete('/chapters/book/:bookId/:chapterId',authenticateToken, authorizeRole('admin'), chapterController.deleteChapter);
chapterRouter.delete('/chapters/book/:bookId', authenticateToken, authorizeRole('admin'), chapterController.deleteAllChapters);



export default chapterRouter;

