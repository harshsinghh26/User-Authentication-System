import { Router } from 'express';
import {
  changePassword,
  forgetPassword,
  getCurrentUser,
  loginUser,
  logoutUser,
  refreshTokens,
  registerUser,
} from '../controller/user.controller.js';
import { verifyJWT } from '../middlewares/auth.middlewares.js';

const router = Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').post(verifyJWT, logoutUser);
router.route('/change-password').post(verifyJWT, changePassword);
router.route('/get-user').get(getCurrentUser);
router.route('/forget-password').post(forgetPassword);
router.route('/refresh-token').post(verifyJWT, refreshTokens);

export default router;
