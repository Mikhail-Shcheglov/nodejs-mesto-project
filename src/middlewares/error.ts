import { NextFunction, Request, Response } from 'express';

import ErrorBase from '../interfaces/error';
import { HTTP_STATUS } from '../utils/constants';

const handleError = (err: ErrorBase, _: Request, res: Response, next: NextFunction) => {
  const message = err?.message;
  let statusCode = err?.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR;

  if (err?.name === 'ValidationError') {
    statusCode = HTTP_STATUS.BAD_REQUEST;
  }

  res
    .status(statusCode)
    .send({
      message: statusCode === HTTP_STATUS.INTERNAL_SERVER_ERROR
        ? 'На сервере произошла ошибка'
        : message,
    });

  return next();
};

export default handleError;
