import { Router } from 'express';
import { register, login } from '../controllers/authController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

router.post('/register', register);
router.post('/login', login);

// Example of a protected route
router.get('/protected', authMiddleware, (req, res) => {
  res.json({ msg: "Protected route accessed", user: req.user });
});

export default router;
