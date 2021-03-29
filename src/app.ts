import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import mondel, { connectDB } from './models';
import Router from './routers';
import errorMiddleware from './middleware/errorMiddleware';

const app = express();
const db = mondel.connection;

db.once('open', () => {
  console.log(`[MongoDB] Connection opend.`);
});
connectDB();

app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/', Router);

app.use(errorMiddleware);

export default app;
