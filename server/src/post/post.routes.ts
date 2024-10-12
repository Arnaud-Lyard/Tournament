import express from 'express';
import { authenticateUser } from '../middleware/authenticateUser';
import { readLanguage } from '../middleware/readLanguage';
import { uploadFile } from '../middleware/uploadFile';
import { validate } from '../middleware/validate';
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
  getNotificationHandler,
  getResetNotificationHandler,
  addCommentHandler,
  getCommentHandler,
  addResponseHandler,
} from './post.controller';
import {
  addCategorySchema,
  addCommentSchema,
  addResponseSchema,
  disablePostSchema,
  publishPostSchema,
} from './post.schema';
import { getPostBySlugHandler } from './post.controller';
import { uploadCropFile } from '../middleware/uploadCropFile';
import { authenticateAdmin } from '../middleware/authenticateAdmin';

const router = express.Router();

router.post(
  '/',
  readLanguage,
  authenticateAdmin,
  uploadCropFile,
  addPostHandler
);

router.get('/', readLanguage, getPostsHandler);

router.post(
  '/categories',
  readLanguage,
  validate(addCategorySchema),
  authenticateAdmin,
  addCategoryHandler
);

router.post(
  '/comment',
  readLanguage,
  validate(addCommentSchema),
  authenticateUser,
  addCommentHandler
);

router.post(
  '/response/:postid',
  readLanguage,
  validate(addResponseSchema),
  authenticateUser,
  addResponseHandler
);

router.get('/comment/:postid', readLanguage, getCommentHandler);

router.post('/image', authenticateUser, addImageHandler);

router.get('/categories', readLanguage, authenticateUser, getCategoriesHandler);

router.get('/publish', readLanguage, getPublishPostsHandler);

router.get('/slug/:slug', readLanguage, getPostBySlugHandler);

router.get('/new', readLanguage, authenticateUser, getNotificationHandler);

router.get(
  '/reset',
  readLanguage,
  authenticateUser,
  getResetNotificationHandler
);

router.get('/:id', readLanguage, getPostHandler);

router.post(
  '/publish/:id',
  readLanguage,
  validate(publishPostSchema),
  authenticateAdmin,
  getPublishPostHandler
);

router.post(
  '/disable/:id',
  readLanguage,
  validate(disablePostSchema),
  authenticateAdmin,
  getDisablePostHandler
);

router.put(
  '/:id',
  readLanguage,
  authenticateAdmin,
  uploadCropFile,
  editPostHandler
);

export default router;
