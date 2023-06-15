const notFoundHandler = (req, res, next) => {
  return res.status(404).json({
    success: false,
    response: `${req.method} ${req.url} not found`,
  });
};

export default notFoundHandler;
