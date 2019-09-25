const path = require("path");

require("dotenv").config({
  path: process.env.NODE_ENV === "test" ? ".env.test" : ".env"
});

console.log(process.env.MESSAGE);
