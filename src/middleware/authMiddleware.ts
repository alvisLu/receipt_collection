import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import WrongAuthenticationTokenException from '../exceptions/WrongAuthenticationTokenException';

const { TOKEN_SECRET = '' } = process.env;

interface IAuth {
  id: string;
  expiresIn: string;
}

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.cookies;
  if (authorization) {
    try {
      const decoded = jwt.verify(authorization.token, TOKEN_SECRET) as IAuth;
      res.locals.userId = decoded.id;
      next();
    } catch (e) {
      next(new WrongAuthenticationTokenException());
    }
  } else {
    next(new WrongAuthenticationTokenException());
  }
};

export default authMiddleware;
