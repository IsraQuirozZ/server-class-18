const passwordValidator = (req, res, next) => {
  const { password } = req.body;
  if (password.length >= 8) {
    return next();
  }
  return res.status(400).json({
    success: false,
    response: "password must have at least 8 characters",
  });
};

export default passwordValidator;
