const routes = require("express").Router();
const testController = require("./app/controllers/TestController");
const errorHandler = require("./app/middlewares/errorHandler");

routes.get("/test", testController.test);

routes.use(errorHandler);

module.exports = routes;
