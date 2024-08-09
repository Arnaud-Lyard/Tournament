import { NextFunction, Request, Response } from 'express';
import { getUserInformations } from '../../utils/getUserInformations';
import { IUser } from '../../types/user';
import {
  AddPostInput,
  GetPostInput,
  PublishPostInput,
} from '../schema/post.schema';
import {
  addPost,
  changePostStatus,
  checkIfPostExist,
  getAllPosts,
  getPost,
} from '../service/post.service';
import { AddCategoryInput } from '../schema/post.schema';
import { addCategory } from '../service/post.service';
import { getAllCategories } from '../service/post.service';

export const addPostHandler = async (
  req: Request<{}, {}, AddPostInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = (await getUserInformations(req, next)) as IUser;

    await addPost({
      user,
      frenchContent: req.body.frenchContent,
      englishContent: req.body.englishContent,
      categoryIds: req.body.categoryIds,
      frenchTitle: req.body.frenchTitle,
      englishTitle: req.body.englishTitle,
      image: req.file,
    });

    const message = req.language === 'fr' ? "Ajout de l'article" : 'Blog added';
    res.status(200).json({
      status: 'success',
      message,
    });
  } catch (err: any) {
    next(err);
  }
};

export const addCategoryHandler = async (
  req: Request<{}, {}, AddCategoryInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    await addCategory({
      name: req.body.categoryName,
    });

    const message =
      req.language === 'fr' ? 'Ajout de la catégorie' : 'Category added';
    res.status(200).json({
      status: 'success',
      message,
    });
  } catch (err: any) {
    next(err);
  }
};

export const getCategoriesHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const categories = await getAllCategories();

    res.status(200).json({
      status: 'success',
      data: {
        categories,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

export const getPostsHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const posts = await getAllPosts();

    res.status(200).json({
      status: 'success',
      datas: {
        posts,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

export const getPublishPostHandler = async (
  req: Request<PublishPostInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const postExist = await checkIfPostExist(req.params.id);

    if (!postExist) {
      const message =
        req.language === 'fr' ? 'Article introuvable' : 'Post not found';
      return res.status(404).json({
        status: 'fail',
        message,
      });
    }

    await changePostStatus({
      id: req.params.id,
      status: 'published',
    });

    const message = req.language === 'fr' ? 'Article publié' : 'Post published';
    res.status(200).json({
      status: 'success',
      message,
    });
  } catch (err: any) {
    next(err);
  }
};

export const getDisablePostHandler = async (
  req: Request<PublishPostInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const postExist = await checkIfPostExist(req.params.id);

    if (!postExist) {
      const message =
        req.language === 'fr' ? 'Article introuvable' : 'Post not found';
      return res.status(404).json({
        status: 'fail',
        message,
      });
    }

    await changePostStatus({
      id: req.params.id,
      status: 'disabled',
    });

    const message =
      req.language === 'fr' ? 'Article désactivé' : 'Post disabled';
    res.status(200).json({
      status: 'success',
      message,
    });
  } catch (err: any) {
    next(err);
  }
};

export const getPostHandler = async (
  req: Request<GetPostInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const post = await getPost(req.params.id);

    res.status(200).json({
      status: 'success',
      data: {
        post,
      },
    });
  } catch (err: any) {
    next(err);
  }
};
