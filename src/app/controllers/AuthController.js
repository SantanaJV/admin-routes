const { User, validateUser } = require("../models/User");
const {
  IncorrectPasswordError,
  UserNotFoundError,
  InvalidIdError,
  ValidationError
} = require("../errors/user.error");

class AuthController {
  async login(req, res, next) {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return next(new UserNotFoundError(email));

    const match = user.comparePassword(password);
    if (!match) return next(new IncorrectPasswordError());

    const token = user.generateToken();

    res.status(200).send({ message: "Logged in successfully!", token });
  }

  async read(req, res, next) {
    const id = req.user.id;

    const user = await User.findById(id);
    if (!user) return next(new InvalidIdError());

    res.status(200).json({ user });
  }

  async update(req, res, next) {
    const id = req.user.id;

    const errors = validateUser(req.body, {
      checkMissing: false,
      checkMatchPassword: true
    });
    if (errors.length) return next(new ValidationError(errors));

    const user = await User.findByIdAndUpdate(id, req.body, { new: true });
    if (!user) return next(new InvalidIdError());

    return res
      .status(200)
      .send({ message: "Your profile was successfully updated!", user });
  }

  async delete(req, res, next) {
    const id = req.user.id;

    const user = await User.findByIdAndRemove(id);
    if (!user) return next(new InvalidIdError());

    return res
      .status(200)
      .send({ message: "Your account was successfully deleted." });
  }
}

module.exports = new AuthController();
