import { NextFunction, Request, Response } from 'express';

export type RequestAuthorized = Request & {
  user: { _id: string };
};

// eslint-disable-next-line no-unused-vars
export type Controller<R> = (req: Request, res: Response, next: NextFunction) => Promise<R>;
