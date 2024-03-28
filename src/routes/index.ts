import { Router } from 'express';
import users from './users';
import cards from './cards';
import notFound from './not-found';

const routes = Router();

routes.use(users);
routes.use(cards);

routes.use(notFound);

export default routes;
