import 'dotenv/config';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import UserModel, { IUser } from '../models/User';
import WrongCredentialsException from '../exceptions/WrongCredentialsException';

const { TOKEN_SECRET = '' } = process.env;

interface IToken {
  token: string;
  expiresIn: number;
}

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const oneDay = 1000 * 60 * 60 * 24;
  const loginData: IUser = req.body;
  const user = await UserModel.findOne({ email: loginData.email });
  if (user) {
    const isPasswordMatching = loginData.password === 'admin';
    if (isPasswordMatching) {
      const auth: IToken = {
        token: jwt.sign({ id: user._id }, TOKEN_SECRET, {
          expiresIn: oneDay,
        }),
        expiresIn: oneDay,
      };
      res.cookie('authorization', auth, { maxAge: oneDay, httpOnly: true });
      res.send(user);
    } else {
      next(new WrongCredentialsException());
    }
  } else {
    next(new WrongCredentialsException());
  }
};

export const logout = async (req: Request, res: Response) => {
  res.clearCookie('authorization', { path: '/' });
  res.status(204);
};
