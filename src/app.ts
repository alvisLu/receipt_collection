import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mondel, { connectDB } from './models';
import Router from './routers';

const app = express();
const db = mondel.connection;

db.once('open', () => {
  console.log(`[MongoDB] Connection opend.`);
});
connectDB();

app.use(cors());
app.use(bodyParser.json());

app.use('/', Router);

export default app;
