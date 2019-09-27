class UserError extends Error {
  constructor(message) {
    super(message);

    this.name = this.constructor.name;

    Error.captureStackTrace(this, this.constructor);
  }
}

class ValidationError extends UserError {
  constructor(errors = []) {
    super("Invalid request was sent.");
    this.code = 401;
    this.data = {
      errors
    };
  }
}

class IncorrectPasswordError extends UserError {
  constructor() {
    super("Incorrect password.");
    this.code = 401;
  }
}

class UserNotFoundError extends UserError {
  constructor(email) {
    super(`User registered as ${email} was not found.`);
    this.code = 404;
    this.data = { email };
  }
}

class UserAlreadyExistsError extends UserError {
  constructor(email) {
    super(`User registered as ${email} already exists.`);
    this.code = 409;
    this.data = { email };
  }
}

module.exports = {
  IncorrectPasswordError,
  UserNotFoundError,
  ValidationError,
  UserAlreadyExistsError
};
