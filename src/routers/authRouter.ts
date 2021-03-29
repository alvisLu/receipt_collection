import express from 'express';
import { login, logout } from '../controllers/auth';
import authMiddleware from '../middleware/authMiddleware';

const router = express.Router();

router.get('/login', login);
router.post('/logout', authMiddleware, logout);

export default router;
