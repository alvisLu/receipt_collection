import express from 'express';
import authMiddleware from '../middleware/authMiddleware';
import {
  searchReceipts,
  createReceipt,
  updateReceipt,
} from '../controllers/receipt';

const router = express.Router();

router.get('/search', authMiddleware, searchReceipts);
router.post('/', authMiddleware, createReceipt);
router.put('/:id', authMiddleware, updateReceipt);

export default router;
