const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
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
  }
});

userSchema.pre("save", async function() {});

module.exports = mongoose.model("User", userSchema);
