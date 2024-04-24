import express from 'express';
import { authenticateUser } from '../../middleware/authenticateUser';
import {
  getMeHandler,
  getUserHandler,
  updateUserHandler,
} from '../controller/user.controller';

const router = express.Router();

router.get('/', authenticateUser, getUserHandler);

router.get('/me', getMeHandler);

router.post('/update', authenticateUser, updateUserHandler);

export default router;
