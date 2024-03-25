import { Middleware } from '../interfaces/middlewares';

/**
 * Временное решение.
 */
const auth: Middleware = (req, res, next) => {
  req.user = {
    _id: '65ff7ae98c5e851e9c28f080', // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
};

export default auth;
