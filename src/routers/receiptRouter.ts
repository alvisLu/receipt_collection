import express from 'express';
// import authMiddleware from '../middleware/authMiddleware';
import {
  searchReceipts,
  createReceipt,
  updateReceipt,
} from '../controllers/receipt';

const router = express.Router();

router.get('/search', searchReceipts);
router.post('/', createReceipt);
router.put('/:id', updateReceipt);

export default router;
