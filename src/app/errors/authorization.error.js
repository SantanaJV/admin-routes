class AuthorizationError extends Error {
  constructor(message) {
    super(message);

    this.name = this.constructor.name;

    Error.captureStackTrace(this, this.constructor);
  }
}

class UnauthorizedError extends AuthorizationError {
  constructor(userRole, requestedRole) {
    super("User not authorized to perform this request.");
    this.data = { userRole, requestedRole };
    this.code = 403;
  }
}

class MissingTokenError extends AuthorizationError {
  constructor() {
    super("No access token was provided.");
    this.code = 401;
  }
}

class InvalidTokenError extends AuthorizationError {
  constructor() {
    super("The access token provided is invalid.");
    this.code = 401;
  }
}

class ExpiredTokenError extends AuthorizationError {
  constructor() {
    super(
      "The access token provided is expired. Please, try to connect again."
    );
    this.code = 401;
  }
}

module.exports = {
  UnauthorizedError,
  MissingTokenError,
  InvalidTokenError,
  ExpiredTokenError
};
