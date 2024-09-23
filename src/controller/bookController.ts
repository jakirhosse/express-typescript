import { Request, Response } from 'express';
import Book from '../models/bookModel';
import { bookValidation } from '../validation/bookvalidation';

// POST: নতুন বই যোগ করা
export const createBook = async (req: Request, res: Response) => {
  const { error } = bookValidation.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { title, author, category, publishedYear } = req.body;

  try {
    const newBook = new Book({ title, author, category, publishedYear });
    await newBook.save();
    res.status(201).json(newBook);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// GET: সব বই নিয়ে আসা
export const getBooks = async (req: Request, res: Response) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// GET: নির্দিষ্ট বই নিয়ে আসা
export const getBookById = async (req: Request, res: Response) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.status(200).json(book);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// PUT: নির্দিষ্ট বই আপডেট করা
export const updateBook = async (req: Request, res: Response) => {
  const { error } = bookValidation.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedBook) return res.status(404).json({ message: 'Book not found' });
    res.status(200).json(updatedBook);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// DELETE: বই মুছে ফেলা
export const deleteBook = async (req: Request, res: Response) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    if (!deletedBook) return res.status(404).json({ message: 'Book not found' });
    res.status(200).json({ message: 'Book deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
