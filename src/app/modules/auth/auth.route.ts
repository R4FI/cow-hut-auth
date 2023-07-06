import express from 'express';
import { AuthController } from './auth.controller';
import { AuthValidation } from './auth.validation';
import validateRequest from '../../middlewire/validateRequest';
import { userController } from '../user/user.controller';
const router = express.Router();

router.post('/signin', userController.createUser);
router.post(
  '/login',
  validateRequest(AuthValidation.loginZodSchema),
  AuthController.loginUser
);

router.post(
  '/refresh-token',
  validateRequest(AuthValidation.refreshTokenZodSchema),
  AuthController.refreshToken
);


export const authRoutes = router;