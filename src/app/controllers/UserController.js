const { User, validateUser } = require("../models/User");
const {
  ValidationError,
  UserAlreadyExistsError,
  UserNotFoundError
} = require("../errors/user.error");

class UserController {
  async create(req, res, next) {
    const { email } = req.body;

    errors = validateUser(req.body);
    if (errors.length) return next(new ValidationError(errors));

    let user = await User.findOne({ email });
    if (user) return next(new UserAlreadyExistsError(email));

    user = await User.create(req.body);

    res.status(200).json({ message: "User created successfully!", user });
  }

  async read(req, res, next) {
    let user = await User.findById(req.params.id);

    if (!user) return next(new UserNotFoundError());

    res.status(200).json({ user });
  }

  async update(req, res, next) {
    const { email } = req.body;

    errors = validateUser(req.body, {
      checkMissing: false,
      checkMatchPassword: true
    });
    if (errors.length) return next(new ValidationError(errors));

    let user = await User.findOne({ email });
    if (user) return next(new UserAlreadyExistsError(email));

    user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    if (!user) return next(new InvalidIdError());

    res.status(200).json({ user });
  }

  async delete(req, res, next) {
    let user = await User.findByIdAndDelete(req.params.id);
    if (!user) return next(new InvalidIdError());

    res.status(200).json({ message: "User successfully deleted.", user });
  }
}

module.exports = new UserController();
