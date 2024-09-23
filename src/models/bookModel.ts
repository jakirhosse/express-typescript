import { Schema, model } from 'mongoose';

interface IBook {
  title: string;
  author: string;
  category: string;
  publishedYear: number;
}

const bookSchema = new Schema<IBook>({
  title: { type: String, required: true },
  author: { type: String, required: true },
  category: { type: String, required: true },
  publishedYear: { type: Number, required: true },
});

const Book = model<IBook>('Book', bookSchema);

export default Book;
