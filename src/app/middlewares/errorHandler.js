function errorHandler(err, req, res, next) {
  console.error(err.stack);

  let response = {
    message:
      err.message ||
      "Internal error. Please try again later, or contact support for further information."
  };

  if (err.data) response.data = err.data;

  return res.status(err.code || 500).json(response);
}

module.exports = errorHandler;
