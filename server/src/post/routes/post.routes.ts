import express from 'express';
import { authenticateUser } from '../../middleware/authenticateUser';
import { readLanguage } from '../../middleware/readLanguage';
import { uploadFile } from '../../middleware/uploadFile';
import { validate } from '../../middleware/validate';
import {
  addCategoryHandler,
  addPostHandler,
  editPostHandler,
  getCategoriesHandler,
  getDisablePostHandler,
  getPostHandler,
  getPostsHandler,
  getPublishPostHandler,
  getPublishPostsHandler,
  addImageHandler,
  getNewPostHandler,
  getResetNewPostsHandler,
} from '../controller/post.controller';
import {
  addCategorySchema,
  disablePostSchema,
  publishPostSchema,
} from '../schema/post.schema';
import { getPostBySlugHandler } from '../controller/post.controller';

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

router.post('/image', authenticateUser, addImageHandler);

router.get('/categories', readLanguage, authenticateUser, getCategoriesHandler);

router.get('/publish', readLanguage, getPublishPostsHandler);

router.get('/slug/:slug', readLanguage, getPostBySlugHandler);

router.get('/new', readLanguage, authenticateUser, getNewPostHandler);

router.get('/reset', readLanguage, authenticateUser, getResetNewPostsHandler);

router.get('/:id', readLanguage, getPostHandler);

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

router.put('/:id', readLanguage, authenticateUser, uploadFile, editPostHandler);

export default router;
