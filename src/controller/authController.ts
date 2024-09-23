import { Request, Response } from 'express';
import User from '../models/User';
import { registerSchema, loginSchema } from '../validation';
import jwt from 'jsonwebtoken';

export const register = async (req: Request, res: Response): Promise<Response> => {
  const { error } = registerSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ msg: error.details[0].message });
  }

  const { name, email, password } = req.body;
  
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const newUser = new User({ name, email, password });
    await newUser.save();
    
    const token = jwt.sign({ id: newUser._id }, 'your_jwt_secret', { expiresIn: '1h' });
    
    return res.status(201).json({ token });
  } catch (error) {
    return res.status(500).json({ msg: "Server error" });
  }
};

export const login = async (req: Request, res: Response): Promise<Response> => {
  const { error } = loginSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ msg: error.details[0].message });
  }

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, 'your_jwt_secret', { expiresIn: '1h' });
    
    return res.json({ token });
  } catch (error) {
    return res.status(500).json({ msg: "Server error" });
  }
};
