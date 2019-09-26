class AuthorizationError extends Error {
  constructor(message) {
    super(message);

    this.name = this.constructor.name;

    Error.captureStackTrace(this, this.constructor);
  }
}

class UnauthorizedError extends AuthorizationError {
  constructor(request = "Not Provided") {
    super("User not authorized to perform this request.");
    this.data = { request };
    this.code = 403;
  }
}

class IncorrectPasswordError extends AuthorizationError {
  constructor() {
    super("Incorrect password.");
    this.code = 401;
  }
}

class UserNotFoundError extends AuthorizationError {
  constructor(email) {
    super(`User registered as ${email} was not found.`);
    this.code = 404;
    this.data = { email };
  }
}

module.exports = {
  UnauthorizedError,
  IncorrectPasswordError,
  UserNotFoundError
};
