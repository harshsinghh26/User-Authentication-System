import { User } from '../models/user.models.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/AsyncHandler.js';

// GenerateTokens

const genrateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.createAccessWebToken();
    const refreshToken = user.createRefreshWebToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, 'Something went wrong while generating the tokens');
  }
};

// Register User

const registerUser = asyncHandler(async (req, res) => {
  const { fullName, username, email, password } = req.body;

  if (
    [fullName, username, email, password].some((field) => field?.trim() === '')
  ) {
    throw new ApiError(400, 'All fields are required');
  }

  const existingUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existingUser) {
    throw new ApiError(409, 'User already exists!');
  }

  const user = await User.create({
    fullName,
    email,
    username,
    password,
  });

  const createdUser = await User.findById(user._id).select(
    '-password -refreshToken',
  );

  if (!createdUser) {
    throw new ApiError(500, 'Internal error creating user!');
  }

  return res
    .status(201)
    .json(new ApiResponse(201, createdUser, 'User created successfully'));
});

// LoggedIn User

const loginUser = asyncHandler(async (req, res) => {
  const { email, password, username } = req.body;
  console.log(req.body);

  if (!(email || username)) {
    throw new ApiError(400, 'email or username are required');
  }

  const user = await User.findOne({
    $or: [{ email }, { username }],
  });

  if (!user) {
    throw new ApiError(401, 'Unauthorized request!');
  }

  const isPassword = await user.isPasswordCorrect(password);

  if (!isPassword) {
    throw new ApiError(401, 'Invalid User Credintials');
  }

  const { refreshToken, accessToken } = await genrateAccessAndRefreshToken(
    user._id,
  );

  const loggedinUser = await User.findById(user._id).select(
    '-password -refreshToken',
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie('refreshToken', refreshToken, options)
    .cookie('accessToken', accessToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedinUser,
          refreshToken,
          accessToken,
        },
        'User loggedin successfully!!',
      ),
    );
});

export { registerUser, loginUser };
