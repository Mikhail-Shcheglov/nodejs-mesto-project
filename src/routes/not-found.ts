import {
  NextFunction, Request, Response, Router,
} from 'express';

import NotFountError from '../errors/not-found';
import { HTTP_STATUS } from '../utils';
import ERROR_MESSAGES from '../utils/error-messages';

const { NOT_FOUND } = HTTP_STATUS;

const router = Router();

router.all('*', (_req: Request, _res: Response, next: NextFunction) => {
  next(new NotFountError(ERROR_MESSAGES[NOT_FOUND]));
});

export default router;
