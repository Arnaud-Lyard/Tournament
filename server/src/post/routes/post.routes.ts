import express from 'express';
import { authenticateUser } from '../../middleware/authenticateUser';
import { readLanguage } from '../../middleware/readLanguage';
import {
  addPostHandler,
  getDisablePostHandler,
  getPublishPostHandler,
} from '../controller/post.controller';
import { addCategoryHandler } from '../controller/post.controller';
import { getCategoriesHandler } from '../controller/post.controller';
import { validate } from '../../middleware/validate';
import {
  addPostSchema,
  addCategorySchema,
  publishPostSchema,
  disablePostSchema,
} from '../schema/post.schema';
import { uploadFile } from '../../middleware/uploadFile';
import { getPostsHandler } from '../controller/post.controller';
import { get } from 'config';

const router = express.Router();

router.post('/', readLanguage, authenticateUser, uploadFile, addPostHandler);

router.get('/', readLanguage, getPostsHandler);

router.post(
  '/categories',
  readLanguage,
  validate(addCategorySchema),
  authenticateUser,
  addCategoryHandler
);

router.get('/categories', readLanguage, authenticateUser, getCategoriesHandler);

router.post(
  '/publish/:id',
  readLanguage,
  validate(publishPostSchema),
  authenticateUser,
  getPublishPostHandler
);

router.post(
  '/disable/:id',
  readLanguage,
  validate(disablePostSchema),
  authenticateUser,
  getDisablePostHandler
);

export default router;
