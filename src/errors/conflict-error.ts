import ErrorBase from '../interfaces/error';
import { HTTP_STATUS } from '../utils/constants';

class ConflictError extends Error implements ErrorBase {
  statusCode: HTTP_STATUS.CONFLICT;

  constructor(message: string) {
    super(message);

    this.statusCode = HTTP_STATUS.CONFLICT;
  }
}

export default ConflictError;
