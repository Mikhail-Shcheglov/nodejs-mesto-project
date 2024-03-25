import IUser from './models/user';

// eslint-disable-next-line no-unused-vars
declare namespace Express {
  export interface Request {
     user: Partial<IUser & {
      /** Уникальный идентификатор пользователя. */
      _id: string;
     }>
  }
}
