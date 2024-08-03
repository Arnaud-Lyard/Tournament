import express from 'express';
import { authenticateUser } from '../../middleware/authenticateUser';
import { readLanguage } from '../../middleware/readLanguage';
import { addPostHandler } from '../controller/post.controller';
import { addCategoryHandler } from '../controller/post.controller';
import { getCategoriesHandler } from '../controller/post.controller';
import { validate } from '../../middleware/validate';
import { addPostSchema, addCategorySchema } from '../schema/post.schema';
import { uploadFile } from '../../middleware/uploadFile';
import { getPostsHandler } from '../controller/post.controller';

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

export default router;
