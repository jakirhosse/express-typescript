import express from 'express';
import { createBook, getBooks, getBookById, updateBook, deleteBook } from '../controller/bookController';

const router = express.Router();

router.post('/books', createBook);
router.get('/books', getBooks);
router.get('/books/:id', getBookById);
router.put('/books/:id', updateBook); 
router.delete('/books/:id', deleteBook);

export default router;
