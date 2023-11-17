module.exports = function (req, res, next) {
  res.status(404).json({
    message: "No, non qui e non ora!",
  });
};
