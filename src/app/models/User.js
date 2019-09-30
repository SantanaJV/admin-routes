const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Roles = require("../utils/Roles");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    max: 255,
    min: 2
  },
  email: {
    type: String,
    required: true,
    max: 255
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: Roles.User
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

userSchema.pre("save", async function(next) {
  let user = this;

  if (!user.isModified("password")) return next();

  try {
    const hash = await bcrypt.hash(user.password, 12);

    user.password = hash;
    next();
  } catch (err) {
    throw err;
  }
});

userSchema.pre("findOneAndUpdate", async function(next) {
  if (this._update.password)
    this._update.password = await bcrypt.hash(this._update.password, 12);

  next();
});

userSchema.methods.comparePassword = function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.generateToken = function() {
  return jwt.sign({ id: this.id }, process.env.ADMIN_JWT_SECRET);
};

validateUser = (
  { email, password, name, matchPassword },
  validationOptions = {}
) => {
  errors = [];

  const { checkMissing = true, checkMatchPassword = true } = validationOptions;

  if (!email && checkMissing) errors.push("Email field is missing.");
  if (!password && checkMissing) errors.push("Password field is missing.");
  if (!name && checkMissing) errors.push("Name field is missing.");
  if (!matchPassword && password && checkMatchPassword)
    errors.push("Match password is missing.");

  if (email && email.length > 255)
    errors.push("Email field has too many characters (Max. 255)");
  if (password && password.length > 255)
    errors.push("Password field has too many characters (Max. 255)");
  if (name && name.length > 255)
    errors.push("Name field has too many characters (Max. 255)");

  if (
    email &&
    !RegExp(
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    ).exec(email)
  )
    errors.push("Email provided is invalid.");

  if (password && password.length < 8)
    errors.push("Please, provide a password with at least 8 characters.");
  if (name && name.length < 2)
    errors.push("Please, provide a Name with at least 2 characters.");

  if (matchPassword && password !== matchPassword)
    errors.push("Passwords doesn't match.");

  return errors;
};

module.exports = { User: mongoose.model("User", userSchema), validateUser };
