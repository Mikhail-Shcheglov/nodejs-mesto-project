import ErrorBase from '../interfaces/error';
import { HTTP_STATUS } from '../utils/constants';

class UnauthorizedError extends Error implements ErrorBase {
  statusCode: HTTP_STATUS.UNAUTHORIZED;

  constructor(message: string) {
    super(message);

    this.statusCode = HTTP_STATUS.UNAUTHORIZED;
  }
}

export default UnauthorizedError;
