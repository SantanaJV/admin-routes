const { User, validateUser } = require("../models/User");
const {
  ValidationError,
  UserAlreadyExistsError
} = require("../errors/user.error");

class UserController {
  async create(req, res, next) {
    const { email, name, password } = req.body;

    errors = validateUser(req.body);
    if (errors.length !== 0) return next(new ValidationError(errors));

    let user = await User.findOne({ email });
    if (user) return next(new UserAlreadyExistsError(email));

    user = await User.create({
      email,
      name,
      password
    });

    const token = user.generateToken();

    res.status(200).json({ token, user });
  }

  async read(req, res, next) {
    res.status(200).json({
      message: "Congratulations! You're authorized as a user!",
      user: req.user
    });
  }

  async update(req, res, next) {
    res.status(200).json({
      message: "Congratulations! You're authorized as a super admin!",
      user: req.user
    });
  }

  async delete(req, res, next) {}
}

module.exports = new UserController();
