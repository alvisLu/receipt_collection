import express from 'express';
import multer from 'multer';
import authMiddleware from '../middleware/authMiddleware';
import {
  searchReceipts,
  updateReceipt,
  uploadReceipt,
} from '../controllers/receipt';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.get('/search', authMiddleware, searchReceipts);
router.put('/:id', authMiddleware, updateReceipt);
router.post('/upload', upload.array('receiptFile', 5), uploadReceipt);

export default router;
