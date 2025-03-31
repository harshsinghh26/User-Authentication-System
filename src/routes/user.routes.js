import { Router } from 'express';
import {
  changePassword,
  loginUser,
  logoutUser,
  registerUser,
} from '../controller/user.controller.js';
import { verifyJWT } from '../middlewares/auth.middlewares.js';

const router = Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').post(verifyJWT, logoutUser);
router.route('/change-password').post(verifyJWT, changePassword);

export default router;
