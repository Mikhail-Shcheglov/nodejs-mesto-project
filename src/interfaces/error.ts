import { HTTP_STATUS } from '../utils/constants';

interface ErrorBase extends Error {
  statusCode: HTTP_STATUS;
}

export default ErrorBase;
