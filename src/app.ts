import express from 'express';
import mondel, { connectDB } from './db';
import Router from './routers';

const app = express();
const db = mondel.connection;

db.once('open', () => {
  console.log(`[MongoDB] Connection opend.`);
});

app.use('/', Router);

connectDB();

export default app;
