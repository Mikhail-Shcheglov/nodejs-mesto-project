/* eslint-disable no-unused-vars */
import { NextFunction, Request, Response } from 'express';

export type Middleware = (
  req: Request & Partial<{ user: { _id: string } }>,
  res: Response,
  next: NextFunction
) => void;
