import { Request } from 'express';

export type RequestAuthorized = Request & {
  user: Partial<{ _id: string }>;
};
