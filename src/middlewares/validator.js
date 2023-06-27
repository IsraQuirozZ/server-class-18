const validator = (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !password || !email) {
    return res.status(400).json({
      success: false,
      response: "name, password and email are required",
    });
  } else {
    return next();
  }
};

export default validator;
