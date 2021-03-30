import express from 'express';
import tagRouter from './tagRouter';
import authRouter from './authRouter';
import receiptRouter from './receiptRouter';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Hello');
});

router.use('/tags', tagRouter);
router.use('/', authRouter);
router.use('/receipts', receiptRouter);

export default router;
