import { NextFunction, Request, Response } from 'express';

import User from '../models/user';
import NotFountError from '../errors/not-found';
import ERROR_MESSAGES from '../utils/error-messages';
import { HTTP_STATUS } from '../utils/constants';
import mapUser from '../utils/map-user';
import { RequestAuthorized } from '../interfaces/controller';

const { NOT_FOUND } = HTTP_STATUS;

export const createUser = (req: Request, res: Response, next: NextFunction) => {
  const { about, name, avatar } = req.body;

  return User.create({ about, name, avatar })
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
