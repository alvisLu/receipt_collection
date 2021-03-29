import express from 'express';
import mondel, { connectDB } from './models';
import Router from './routers';

const app = express();
const db = mondel.connection;

db.once('open', () => {
  console.log(`[MongoDB] Connection opend.`);
});
connectDB();

app.use('/', Router);

export default app;
