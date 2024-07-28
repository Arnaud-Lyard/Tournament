import { NextFunction, Request, Response } from 'express';
import { getUserInformations } from '../../utils/getUserInformations';
import { IUser } from '../../types/user';
import { AddPostInput } from '../schema/post.schema';
import { addBlog } from '../service/post.service';
import { AddCategoryInput } from '../schema/post.schema';
import { addCategory } from '../service/post.service';
import { getAllCategories } from '../service/post.service';

export const addBlogHandler = async (
  req: Request<{}, {}, AddPostInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = (await getUserInformations(req, next)) as IUser;

    await addBlog({
      user,
      content: req.body.post,
      categoryIds: req.body.categoryIds,
      title: req.body.title,
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

export const getCategoryHandler = async (
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
