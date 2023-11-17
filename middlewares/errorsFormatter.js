module.exports = function (req, res, err, next) {
  res.status(500).json({
    message: "Oops, mi sa che qualcosa è andato storto",
    error: err.message,
    errorInstance: err.name,
  });
};
