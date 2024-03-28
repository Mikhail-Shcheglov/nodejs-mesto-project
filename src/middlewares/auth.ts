import jwt from 'jsonwebtoken';

import IUser from '../interfaces/user';
import UnauthorizedError from '../errors/unauthorized-error';
import ERROR_MESSAGES from '../utils/error-messages';
import { Middleware } from '../interfaces/middlewares';
import { DEFAULT_JWT_SECRET, HTTP_STATUS } from '../utils';

const { JWT_SECRET = DEFAULT_JWT_SECRET } = process.env;

const { UNAUTHORIZED } = HTTP_STATUS;

const { USER } = ERROR_MESSAGES;

const auth: Middleware = (req, res, next) => {
  const token = req.cookies.jwt;

  try {
    req.user = jwt.verify(token, JWT_SECRET) as Pick<IUser, '_id'>;

    next();
  } catch (err) {
    next(new UnauthorizedError(USER[UNAUTHORIZED]));
  }
};

export default auth;
