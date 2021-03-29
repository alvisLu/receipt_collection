import express from 'express';
import tagRouter from './tagRouter';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Hello');
});

router.use('/tags', tagRouter);

export default router;
