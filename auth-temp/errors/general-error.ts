import { CustomError } from './custom-error';

export class GeneralError extends CustomError {
  statusCode = 500;

  constructor(public error = "Some error occured") {
    super(error);

    // Only because we are extending a built in class
    Object.setPrototypeOf(this, GeneralError.prototype);
  }

  serializeErrors() {
    return [
      {
        message: this.error
      }
    ];
  }
}
