import { NextFunction, Request, Response } from 'express';
import { IUser } from '../user/user.type';
import { getUserInformations } from '../utils/getUserInformations';
import {
  AddCategoryInput,
  AddCommentInput,
  AddPostInput,
  AddResponseInput,
  EditPostInput,
  GetCommentInput,
  GetPostInput,
  PublishPostInput,
} from './post.schema';
import { postService } from './post.service';

export const addPostHandler = async (
  req: Request<{}, {}, AddPostInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = (await getUserInformations(req, next)) as IUser;

    await postService.addPost({
      user,
      frenchContent: req.body.frenchContent,
      englishContent: req.body.englishContent,
      categoryIds: req.body.categoryIds,
      frenchTitle: req.body.frenchTitle,
      englishTitle: req.body.englishTitle,
      frenchDescription: req.body.frenchDescription,
      englishDescription: req.body.englishDescription,
      slug: req.body.slug,
      image: req.file,
    });

    res.status(200).json({
      status: 'success',
      message: req.language === 'fr' ? 'Article ajouté' : 'Post added',
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
    await postService.addCategory({
      name: req.body.categoryName,
    });

    res.status(200).json({
      status: 'success',
      message: req.language === 'fr' ? 'Catégorie ajoutée' : 'Category added',
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
    const categories = await postService.getAllCategories();

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
    const posts = await postService.getAllPosts();

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
    await postService.changePostStatus({
      req,
      status: 'published',
    });

    res.status(200).json({
      status: 'success',
      message: req.language === 'fr' ? 'Article publié' : 'Post published',
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
    await postService.changePostStatus({
      req,
      status: 'disabled',
    });

    res.status(200).json({
      status: 'success',
      message: req.language === 'fr' ? 'Article désactivé' : 'Post disabled',
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
    const post = await postService.getPost(req);

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

export const editPostHandler = async (
  req: Request<EditPostInput['params'], {}, EditPostInput['body']>,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = (await getUserInformations(req, next)) as IUser;
    await postService.editPost({
      user,
      req,
    });

    res.status(200).json({
      status: 'success',
      message: req.language === 'fr' ? 'Article modifié' : 'Post edited',
    });
  } catch (err: any) {
    next(err);
  }
};

export const getPublishPostsHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const posts = await postService.getPublishPosts();

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

export const getPostBySlugHandler = async (
  req: Request<{ slug: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const post = await postService.getPostBySlug(req);

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

export const addImageHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await postService.uploadImage(req, res, next);
  } catch (err: any) {
    next(err);
  }
};

export const getNotificationHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = (await getUserInformations(req, next)) as IUser;
    const posts = await postService.getNewPosts({ user });
    const comments = await postService.getNewComment({ user });

    res.status(200).json({
      status: 'success',
      data: {
        posts,
        comments,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

export async function getResetNotificationHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const user = (await getUserInformations(req, next)) as IUser;
    await postService.resetNewPosts({ user });
    await postService.resetNewComment({ user });

    res.status(200).json({
      status: 'success',
      message:
        req.language === 'fr'
          ? 'Notifications réinitialisées'
          : 'Notifications reset',
    });
  } catch (err: any) {
    next(err);
  }
}

export const addCommentHandler = async (
  req: Request<{}, {}, AddCommentInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = (await getUserInformations(req, next)) as IUser;
    await postService.addComment({
      user,
      req,
    });

    res.status(200).json({
      status: 'success',
      message: req.language === 'fr' ? 'Commentaire ajouté' : 'Comment added',
    });
  } catch (err: any) {
    next(err);
  }
};

export const getCommentHandler = async (
  req: Request<GetCommentInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const comments = await postService.getComment(req);

    res.status(200).json({
      status: 'success',
      data: {
        comments,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

export const addResponseHandler = async (
  req: Request<AddResponseInput['params'], {}, AddResponseInput['body']>,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = (await getUserInformations(req, next)) as IUser;

    await postService.addResponse({
      user,
      req,
    });

    res.status(200).json({
      status: 'success',
      message: req.language === 'fr' ? 'Réponse ajoutée' : 'Response added',
    });
  } catch (err: any) {
    next(err);
  }
};
