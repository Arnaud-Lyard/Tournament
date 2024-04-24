import express from 'express';
import { authenticateUser } from '../../middleware/authenticateUser';
import { validate } from '../../middleware/validate';
import {
  forgotPasswordHandler,
  loginUserHandler,
  logoutUserHandler,
  registerUserHandler,
  resetPasswordHandler,
  verifyEmailHandler,
} from '../controller/auth.controller';
import {
  forgotPasswordSchema,
  loginUserSchema,
  registerUserSchema,
  resetPasswordSchema,
  verifyEmailSchema,
} from '../schema/auth.schema';

const router = express.Router();

router.post('/register', validate(registerUserSchema), registerUserHandler);

router.post('/login', validate(loginUserSchema), loginUserHandler);

router.get(
  '/verifyemail/:verificationCode',
  validate(verifyEmailSchema),
  verifyEmailHandler
);

router.get('/logout', authenticateUser, logoutUserHandler);

router.post(
  '/forgotpassword',
  validate(forgotPasswordSchema),
  forgotPasswordHandler
);

router.patch(
  '/resetpassword/:resetToken',
  validate(resetPasswordSchema),
  resetPasswordHandler
);

export default router;
