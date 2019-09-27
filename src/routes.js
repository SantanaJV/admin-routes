const routes = require("express").Router();

const UserController = require("./app/controllers/UserController");
const AuthController = require("./app/controllers/AuthController");
const authorize = require("./app/middlewares/authorize");
const Roles = require("./app/utils/Roles");
const errorHandler = require("./app/middlewares/errorHandler");

routes.post("/user", UserController.create); // Create new user (Anyone can create a new user)
routes.get("/user/:id", authorize(), UserController.read); // Read any user (Only admins and super admins can read any user)
routes.put("/user/:id", authorize(Roles.SuperAdmin), UserController.update); // Update any user (Only admins and super admins can update any user)
routes.delete("/user/:id", UserController.delete); // Delete any user (Only admins and super admins can delete any user)

routes.post("/login", AuthController.login); // Login into your account
routes.get("/user", AuthController.read); // Read your own profile
routes.put("/user", AuthController.update); // Update your own profile
routes.delete("/user", AuthController.delete); // Delete your own account

routes.use(errorHandler);

module.exports = routes;
