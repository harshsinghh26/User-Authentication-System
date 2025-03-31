import { asyncHandler } from '../utils/AsyncHandler';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.models';
import { ApiError } from '../utils/ApiError';

export const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      throw new ApiError(401, 'Unauthorize Request!');
    }
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decodedToken?._id).select(
      '-password, -refreshToken',
    );

    if (!user) {
      throw new ApiError(401, 'Invailid user!');
    }
    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || 'Invalid Access!');
  }
});
