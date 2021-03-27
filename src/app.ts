import express from 'express';
import mondel, { connectDB } from './db';

const app = express();
const db = mondel.connection;

db.once('open', () => {
  console.log(`[MongoDB] Connection opend.`);
});
connectDB();

export default app;
