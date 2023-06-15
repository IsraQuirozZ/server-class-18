const errorHandler = (error, req, res, next) => {
  console.log(error);
  return res.status(500).json({
    seccess: false,
    response: error.message,
  });
};

export default errorHandler;
