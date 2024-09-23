import express from 'express';
import connectDB from './config/db';
import dotenv from 'dotenv';
import bookRoutes from './routers/bookRouter';
import authRouter from './routers/authRouter'

dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api', bookRoutes);

// MongoDB Connection
connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
