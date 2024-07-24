import express from 'express';
import { authenticateUser } from '../../middleware/authenticateUser';
import {readLanguage} from "../../middleware/readLanguage";
import {addBlogHandler} from "../controller/post.controller";
import {addCategoryHandler} from "../controller/post.controller";
import { validate } from '../../middleware/validate';
import {addPostSchema, addCategorySchema} from "../schema/post.schema";

const router = express.Router();

router.post('/' ,readLanguage ,validate(addPostSchema), authenticateUser, addBlogHandler);

router.post('/categories/create' ,readLanguage, validate(addCategorySchema), authenticateUser, addCategoryHandler);

export default router;
