import express from 'express';
import {
  getTags,
  getTagById,
  createTag,
  updateTagById,
  deleteTagById,
} from '../controllers/tag';
import authMiddleware from '../middleware/authMiddleware';

const router = express.Router();

router.get('/', authMiddleware, getTags);
router.get('/:id', authMiddleware, getTagById);
router.post('/', authMiddleware, createTag);
router.put('/:id', authMiddleware, updateTagById);
router.delete('/:id', authMiddleware, deleteTagById);

export default router;
