const jwt = require("jsonwebtoken");
const { User } = require("../models/User");
const {
  MissingTokenError,
  InvalidTokenError,
  ExpiredTokenError
} = require("../errors/authorization.error");

module.exports = async (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization) return next(new MissingTokenError());

  const [, token] = authorization.split(" ");
  if (!token) return next(new InvalidTokenError());

  let payload;
  try {
    payload = jwt.verify(token, process.env.ADMIN_JWT_SECRET);
  } catch (err) {
    return next(new InvalidTokenError());
  }
  if (!payload) return next(new InvalidTokenError());

  const user = await User.findById(payload.id);
  if (!user)
    return next(
      new Error("Something went wrong. Please, restart your session.")
    );

  req.user = {
    id: payload.id,
    role: user.role
  };

  next();
};
