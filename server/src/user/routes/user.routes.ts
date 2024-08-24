import express from 'express';
import { authenticateUser } from '../../middleware/authenticateUser';
import {
  getMeHandler,
  getProfileHandler,
  getUnsubscribeHandler,
  getUserHandler,
  updateUserHandler,
} from '../controller/user.controller';
import { uploadFile } from '../../middleware/uploadFile';
import { readLanguage } from '../../middleware/readLanguage';
import { unsubscribeUserSchema } from '../schema/user.schema';
import { validate } from '../../middleware/validate';

const router = express.Router();

router.get('/', authenticateUser, getUserHandler);

router.get('/me', getMeHandler);

router.post(
  '/update',
  readLanguage,
  authenticateUser,
  uploadFile,
  updateUserHandler
);

router.get('/profile', authenticateUser, getProfileHandler);

router.get(
  '/unsubscribe/:id',
  validate(unsubscribeUserSchema),
  readLanguage,
  getUnsubscribeHandler
);

export default router;
