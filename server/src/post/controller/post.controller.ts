import {NextFunction, Request, Response} from "express";
import {getUserInformations} from "../../utils/getUserInformations";
import {IUser} from "../../types/user";
import {AddPostInput} from "../schema/post.schema";
import {addBlog} from "../service/post.service";
import {AddCategoryInput} from "../schema/post.schema";
export const addBlogHandler = async (
    req: Request<{}, {}, AddPostInput>,
    res: Response,
    next: NextFunction
) => {
  try {
    const user = (await getUserInformations(req, next)) as IUser;

    await addBlog({
      user,
      content: req.body.datas,
    });

    const message =
        req.language === 'fr' ? "Ajout de l'article" : 'Blog added';
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
    const user = (await getUserInformations(req, next)) as IUser;

    await addCategory({
      user,
      name: req.body.categoryName,
    });

    const message =
        req.language === 'fr' ? "Ajout de la catégorie" : 'Category added';
    res.status(200).json({
      status: 'success',
      message,
    });

  } catch (err: any) {
    next(err);
  }
};