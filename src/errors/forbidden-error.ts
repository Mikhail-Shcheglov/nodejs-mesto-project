import ErrorBase from '../interfaces/error';
import { HTTP_STATUS } from '../utils/constants';

class ForbiddenError extends Error implements ErrorBase {
  statusCode: HTTP_STATUS.FORBIDDEN;

  constructor(message: string) {
    super(message);

    this.statusCode = HTTP_STATUS.FORBIDDEN;
  }
}

export default ForbiddenError;
