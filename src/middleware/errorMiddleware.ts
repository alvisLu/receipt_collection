import { Request, Response } from 'express';
import HttpException from '../exceptions/HttpException';

const errorMiddleware = (error: HttpException, req: Request, res: Response) => {
  const status = error.status || 500;
  const message = error.message || 'Something went wrong';
  console.log(status, message);
  res.status(status).send({
    message,
    status,
  });
};

export default errorMiddleware;
