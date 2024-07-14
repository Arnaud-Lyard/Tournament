import express from 'express';
import { authenticateUser } from '../../middleware/authenticateUser';
import {
  getMeHandler,
  getProfileHandler,
  getUserHandler,
  updateUserHandler,
} from '../controller/user.controller';
import { uploadFile } from '../../middleware/uploadFile';
import {readLanguage} from "../../middleware/readLanguage";

const router = express.Router();

router.get('/', authenticateUser, getUserHandler);

router.get('/me', getMeHandler);

router.post('/update', readLanguage, authenticateUser, uploadFile, updateUserHandler);

router.get('/profile', authenticateUser, getProfileHandler);

export default router;
