import { NextFunction, Request, Response } from 'express';
import pick from 'lodash.pick';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import config from '../../config';
import User from '../models/user';
import ERROR_MESSAGES from '../utils/error-messages';
import { HTTP_STATUS } from '../utils/constants';
import mapUser from '../utils/map-user';
import { RequestAuthorized } from '../interfaces/controller';
import UnauthorizedError from '../errors/unauthorized-error';
import ConflictError from '../errors/conflict-error';
import { UserUpdatableKey } from '../interfaces/user';
import { handleUserResponse } from '../utils/decorators';

const { UNAUTHORIZED, CONFLICT } = HTTP_STATUS;

const updateUser = (keys: UserUpdatableKey[]) => (request: Request) => {
  const req = request as RequestAuthorized;
  const update = pick(req.body, keys);

  return User.updateUser(req.user._id, update);
};

export const createUser = (req: Request, res: Response, next: NextFunction) => {
  const {
    about, avatar, email, name, password,
  } = req.body;

  return bcrypt.hash(password, config.salt_length)
    .then((hash) => User.create({
      about,
      avatar,
      email,
      name,
      password: hash,
    }))
    .then((user) => {
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

export const getProfile = handleUserResponse((request: Request) => {
  const req = request as RequestAuthorized;

  return User.findById(req.user?._id);
});

export const getUserById = handleUserResponse((req: Request) => User.findById(req.params.userId));

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
          config.jwtSecret,
          { expiresIn: '7d' },
        );

        res.cookie('jwt', token, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 }).end();
      });
    })
    .catch(next);
};

export const updateProfile = handleUserResponse(updateUser(['about', 'name']));

export const updateProfileAvatar = handleUserResponse(updateUser(['avatar']));
