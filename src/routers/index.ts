import express from 'express';
import tagRouter from './tagRouter';
import authRouter from './authRouter';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Hello');
});

router.use('/tags', tagRouter);
router.use('/', authRouter);

export default router;
