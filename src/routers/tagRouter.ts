import express from 'express';
import {
  getTags,
  getTagById,
  createTag,
  updateTagById,
  deleteTagById,
} from '../controllers/tag';

const router = express.Router();

router.get('/', getTags);
router.get('/:id', getTagById);
router.post('/', createTag);
router.put('/:id', updateTagById);
router.delete('/:id', deleteTagById);

export default router;
