import express from 'express';
import authenticateToken from '../middleware/authenticateToken';
import authorizeRole from '../middleware/authorizeRole';
import * as bookController from '../controllers/book.controller';

const bookRouter = express.Router();

// READ
bookRouter.get('/books/:id', bookController.getBook);
bookRouter.get('/books/filter', bookController.getBooksWithFilters);
bookRouter.get('/books/count', bookController.getBooksCount);

// CREATE
bookRouter.post('/books', authenticateToken, authorizeRole('admin'), bookController.createBook);

// UPDATE
bookRouter.put('/books/:id', authenticateToken, authorizeRole('admin'), bookController.updateBook);

// DELETE
bookRouter.delete('/books/:id', authenticateToken, authorizeRole('admin'), bookController.deleteBook);
bookRouter.delete('/books', authenticateToken, authorizeRole('admin'), bookController.deleteAllBooks);

export default bookRouter;
