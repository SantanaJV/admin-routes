const { IncorrectPasswordError } = require("../errors/authorization.error");

class TestController {
  test(req, res, next) {
    const sec = {
      err: new IncorrectPasswordError()
    };

    if (sec.err) return next(sec.err);

    return res.status(200).send(sec);
  }
}

module.exports = new TestController();
