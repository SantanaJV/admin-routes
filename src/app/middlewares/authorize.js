const authenticate = require("./authenticate");
const { UnauthorizedError } = require("../errors/authorization.error");

function authorize(roles = []) {
  if (typeof roles === "string") {
    roles = [roles];
  }

  return [
    authenticate,
    (req, res, next) => {
      if (roles.length && !roles.includes(req.user.role))
        return next(new UnauthorizedError(req.user.role, roles));

      next();
    }
  ];
}

module.exports = authorize;
