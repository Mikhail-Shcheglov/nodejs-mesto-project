import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import User from '../models/user';
import NotFountError from '../errors/not-found';
import ERROR_MESSAGES from '../utils/error-messages';
import { DEFAULT_JWT_SECRET, DEFAULT_SALT, HTTP_STATUS } from '../utils/constants';
import mapUser from '../utils/map-user';
import { RequestAuthorized } from '../interfaces/controller';
import UnauthorizedError from '../errors/unauthorized-error';
import ConflictError from '../errors/conflict-error';

const {
  JWT_SECRET = DEFAULT_JWT_SECRET,
  SALT = DEFAULT_SALT,
} = process.env;

const { UNAUTHORIZED, NOT_FOUND, CONFLICT } = HTTP_STATUS;

export const createUser = (req: Request, res: Response, next: NextFunction) => {
  const {
    about, avatar, email, name, password,
  } = req.body;

  return bcrypt.hash(password, SALT)
    .then((hash) => User.create({
      about,
      avatar,
      email,
      name,
      password: hash,
    }))
    .then((user) => {
      if (!user) {
        throw new NotFountError(ERROR_MESSAGES.USER[NOT_FOUND]);
      }

      res
        .status(HTTP_STATUS.CREATED)
        .send({
          data: mapUser(user),
        });
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError(ERROR_MESSAGES.USER.ADD[CONFLICT]));
      } else {
        next(err);
      }
    });
};

export const getProfile = (
  request: Request,
  res: Response,
  next: NextFunction,
) => {
  const req = request as RequestAuthorized;

  console.log('req.user?._id', req.user?._id);

  return User.findById(req.user?._id)
    .then((user) => {
      if (!user) {
        throw new NotFountError(ERROR_MESSAGES.USER[NOT_FOUND]);
      }

      res.send(mapUser(user));
    })
    .catch(next);
};

export const getUserById = (
  req: Request,
  res: Response,
  next: NextFunction,
) => User.findById(req.params.userId)
  .then((user) => {
    if (!user) {
      throw new NotFountError(ERROR_MESSAGES.USER[NOT_FOUND]);
    }

    res.send({ data: mapUser(user) });
  })
  .catch(next);

export const getUsers = (_: Request, res: Response, next: NextFunction) => User.find({})
  .then((users = []) => {
    res.send({ data: users.map(mapUser) });
  })
  .catch(next);

export const login = (request: Request, res: Response, next: NextFunction) => {
  const { email, password } = request.body;

  return User.findOne({ email }, {}, { runValidators: true }).select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError(ERROR_MESSAGES.USER.LOGIN[UNAUTHORIZED]);
      }

      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          throw new UnauthorizedError(ERROR_MESSAGES.USER.LOGIN[UNAUTHORIZED]);
        }

        const token = jwt.sign(
          { _id: user._id },
          JWT_SECRET,
          { expiresIn: '7d' },
        );

        res.cookie('jwt', token, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 }).end();
      });
    })
    .catch(next);
};

export const updateProfile = (request: Request, res: Response, next: NextFunction) => {
  const req = request as RequestAuthorized;
  const { about, name } = req.body;

  return User.findByIdAndUpdate(
    req.user?._id,
    { about, name },
    { new: true, runValidators: true },
  )
    .then((user): void => {
      if (!user) {
        throw new NotFountError(ERROR_MESSAGES.USER[NOT_FOUND]);
      }

      res.send({ data: mapUser(user) });
    })
    .catch(next);
};

export const updateProfileAvatar = (request: Request, res: Response, next: NextFunction) => {
  const req = request as RequestAuthorized;

  const { avatar } = req.body;

  return User.findByIdAndUpdate(
    req.user?._id,
    { avatar },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        throw new NotFountError(ERROR_MESSAGES.USER[NOT_FOUND]);
      }

      res.send({ data: mapUser(user) });
    })
    .catch(next);
};
