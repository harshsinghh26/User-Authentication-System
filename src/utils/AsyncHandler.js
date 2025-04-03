const asyncHandler = (requestHanler) => async (req, res, next) => {
  try {
    await requestHanler(req, res, next);
  } catch (error) {
    console.error('Error caught in asyncHandler:', error);
    res.status(error?.code || 500).json({
      success: false,
      message: error?.message || 'Internal Server Error!',
    });
    process.exit(1);
  }
};

export { asyncHandler };
