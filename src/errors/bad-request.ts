import ErrorBase from '../interfaces/error';
import { HTTP_STATUS } from '../utils/constants';

class BadRequestError extends Error implements ErrorBase {
  statusCode: HTTP_STATUS;

  constructor(message: string) {
    super(message);

    this.statusCode = HTTP_STATUS.BAD_REQUEST;
  }
}

export default BadRequestError;
