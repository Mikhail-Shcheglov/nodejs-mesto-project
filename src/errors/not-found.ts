import ErrorBase from '../interfaces/error';
import { HTTP_STATUS } from '../utils/constants';

class NotFountError extends Error implements ErrorBase {
  statusCode: HTTP_STATUS.NOT_FOUND;

  constructor(message: string) {
    super(message);

    this.statusCode = HTTP_STATUS.NOT_FOUND;
  }
}

export default NotFountError;
