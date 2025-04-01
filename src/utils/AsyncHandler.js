const asyncHandler = (requestHanler) => async (req, res, next) => {
  try {
    await requestHanler(req, res, next);
  } catch (error) {
    res.status(error.code || 500).json({
      success: false,
      message: error.message,
    });
    process.exit(1);
  }
};

export { asyncHandler };
